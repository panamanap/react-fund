import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFetching } from '../hooks/useFetching';
import { PostService } from '../API/PostService';
import Loader from '../component/UI/loader/Loader';

const PostIdPage = () => {
    const params = useParams();
    const newParams = params.id.slice(0,1)
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const [fetchPostById, isLoading, error] = useFetching(async () => {
        const response = await PostService.getById(newParams);
        setPost(response.data);
    });
    const [fetchComments, isComLoading, comError] = useFetching(async () => {
        const response = await PostService.getCommentsByPostId(newParams);
        setComments(response.data);
    });

    useEffect(() => {
        fetchPostById(newParams);
        fetchComments(newParams);
    }, []);

    console.log(comments);

    return (
        <div>
            <h1>Вы открыли страницу поста c ID {newParams}</h1>
            {isLoading ? (
                <Loader />
            ) : (
                <div>
                    {post.id}. {post.title}
                </div>
            )}
            <h1>Комментарии</h1>
            {isComLoading ? (
                <Loader />
            ) : (
                <div>
                    {comments.map((comm) => (
                        <div key={comm.id} style={{ marginTop: 15 }}>
                            <h5>{comm.email}</h5>
                            <div>{comm.body}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PostIdPage;
