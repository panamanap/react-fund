import React from 'react';

import { usePost } from '../component/hooks/usePost';
import { usePagination } from '../component/hooks/usePagination';
import { useFetching } from '../component/hooks/useFetching';

import { PostService } from '../API/PostService';
import { getPageCount } from '../utils/getPageCount';

import MyButton from '../component/UI/button/MyButton';
import MyModal from '../component/UI/modal/MyModal';
import Loader from '../component/UI/loader/Loader';

import PostForm from '../component/PostForm';
import PostFilter from '../component/PostFilter';
import PostList from '../component/PostList';

function Posts() {
    const [posts, setPosts] = React.useState([]);
    const [filter, setFilter] = React.useState({ sort: '', query: '' });
    const [modal, setModal] = React.useState(false);
    const sortedAndSearchedPosts = usePost(posts, filter.sort, filter.query);
    const [totalPages, setTotalPages] = React.useState(0);
    const [limit, setLimit] = React.useState(10);
    const [page, setPage] = React.useState(1);
    const getPagesArray = usePagination(totalPages);
    const [fetchPosts, isPostLoading, postError] = useFetching(async () => {
        const response = await PostService.getAll(limit, page);
        setPosts(response.data);
        const totalCount = response.headers['x-total-count'];
        setTotalPages(getPageCount(totalCount, limit));
    });

    console.log();

    const createPost = (newPost) => {
        setPosts([...posts, newPost]);
        setModal(false);
    };

    React.useEffect(() => {
        fetchPosts();
    }, [page]);

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
            {isPostLoading ? (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: 50,
                    }}
                >
                    <Loader />
                </div>
            ) : (
                <PostList
                    title="Посты про JS"
                    posts={sortedAndSearchedPosts}
                    remove={removePost}
                />
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
