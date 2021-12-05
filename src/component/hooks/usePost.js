import React from 'react';

export const useSortedPosts = (posts, sort) => {
  console.log(posts)
    const sortedPosts = React.useMemo(() => {
        if (sort) {
            return [...posts].sort((a, b) => a[sort].localeCompare(b[sort]));
        }
        return posts;
    }, [sort, posts]);
    return sortedPosts;
};

export const usePost = (posts, sort, query) => {
  console.log(posts)

    const sortedPosts = useSortedPosts(posts, sort);
    console.log('sortedPosts', sortedPosts)
    const sortedAndSearchedPosts = React.useMemo(() => {
        return sortedPosts.filter((post) =>
            post.title.toLowerCase().includes(query)
        );
    }, [query, sortedPosts]);
    console.log('sortedAndSearchedPosts',sortedAndSearchedPosts)
    return sortedAndSearchedPosts;
};
