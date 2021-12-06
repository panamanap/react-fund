import React from 'react';

import { usePost } from '../hooks/usePost';
import { usePagination } from '../hooks/usePagination';
import { useFetching } from '../hooks/useFetching';

import { PostService } from '../API/PostService';
import { getPageCount } from '../utils/getPageCount';

import MyButton from '../component/UI/button/MyButton';
import MyModal from '../component/UI/modal/MyModal';
import Loader from '../component/UI/loader/Loader';

import PostForm from '../component/PostForm';
import PostFilter from '../component/PostFilter';
import PostList from '../component/PostList';
import { useObserver } from '../hooks/useObserver';
import MySelect from '../component/UI/select/MySelect';

function Posts() {
    const [posts, setPosts] = React.useState([]);
    const [filter, setFilter] = React.useState({ sort: '', query: '' });
    const [modal, setModal] = React.useState(false);
    const sortedAndSearchedPosts = usePost(posts, filter.sort, filter.query);
    const [totalPages, setTotalPages] = React.useState(0);
    const [limit, setLimit] = React.useState(10);
    const [page, setPage] = React.useState(1);
    const getPagesArray = usePagination(totalPages);
    const lastElement = React.useRef();

    const [fetchPosts, isPostLoading, postError] = useFetching(async () => {
        const response = await PostService.getAll(limit, page);
        setPosts([...posts, ...response.data]);
        const totalCount = response.headers['x-total-count'];
        setTotalPages(getPageCount(totalCount, limit));
    });

    useObserver(lastElement, page < totalPages, isPostLoading, () => {
        setPage(page + 1);
    });

    const createPost = (newPost) => {
        setPosts([...posts, newPost]);
        setModal(false);
    };

    React.useEffect(() => {
        fetchPosts();
    }, [page, limit]);

    const removePost = (post) => {
        setPosts(posts.filter((p) => p.id !== post.id));
    };

    const changePage = (page) => {
        setPage(page);
    };

    return (
        <div className="App">
            <MyButton
                style={{ marginTop: '15px' }}
                onClick={() => setModal(true)}
            >
                Создать пользователя
            </MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm create={createPost} />
            </MyModal>

            <hr style={{ margin: '15px' }} />
            <PostFilter filter={filter} setFilter={setFilter} />
            {postError && (
                <h1 style={{ display: 'flex', justifyContent: 'center' }}>
                    Произошла ошибка ${postError}
                </h1>
            )}
            <MySelect
                value={limit}
                onChange={(value) => setLimit(value)}
                defaultValue="Кол-во элемеентов на странице"
                options={[
                    { value: 5, name: '5' },
                    { value: 10, name: '10' },
                    { value: 25, name: '25' },
                    { value: -1, name: 'Показать всё' },
                ]}
            ></MySelect>
            <PostList
                title="Посты про JS"
                posts={sortedAndSearchedPosts}
                remove={removePost}
            />
            <div
                ref={lastElement}
                style={{ height: '20px', background: 'red' }}
            ></div>
            {isPostLoading && (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: 50,
                    }}
                >
                    <Loader />
                </div>
            )}

            <div className="page__wrapper">
                {getPagesArray.map((p) => (
                    <span
                        key={p}
                        className={p === page ? 'page page__current' : 'page'}
                        onClick={() => changePage(p)}
                    >
                        {p}
                    </span>
                ))}
            </div>
        </div>
    );
}

export default Posts;
