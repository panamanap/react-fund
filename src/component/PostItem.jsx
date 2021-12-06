import React from 'react';
import { useHistory } from 'react-router';
import MyButton from './UI/button/MyButton';

const PostItem = ({ number, post, remove }) => {
    const router = useHistory();

    return (
        <div className="post">
            <div className="post__content">
                <strong>
                    {post.id}.{post.title}
                </strong>
                <div>{post.body}</div>
            </div>
            <div className="post__btns">
                <MyButton onClick={() => router.push(`/posts/${post.id}}`)}>
                    Отрыть
                </MyButton>
                <MyButton onClick={() => remove(post)}>Удалить</MyButton>
            </div>
        </div>
    );
};

export default PostItem;
