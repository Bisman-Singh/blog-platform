import { useState, useCallback } from 'react';

function loadPosts() {
  try {
    return JSON.parse(localStorage.getItem('blog_posts')) || [];
  } catch {
    return [];
  }
}

function savePosts(posts) {
  localStorage.setItem('blog_posts', JSON.stringify(posts));
}

export default function usePosts() {
  const [posts, setPosts] = useState(loadPosts);

  const createPost = useCallback((post) => {
    const newPost = {
      ...post,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setPosts((prev) => {
      const updated = [newPost, ...prev];
      savePosts(updated);
      return updated;
    });
    return newPost.id;
  }, []);

  const updatePost = useCallback((id, data) => {
    setPosts((prev) => {
      const updated = prev.map((p) =>
        p.id === id ? { ...p, ...data, updatedAt: new Date().toISOString() } : p
      );
      savePosts(updated);
      return updated;
    });
  }, []);

  const deletePost = useCallback((id) => {
    setPosts((prev) => {
      const updated = prev.filter((p) => p.id !== id);
      savePosts(updated);
      return updated;
    });
  }, []);

  const getPost = useCallback((id) => {
    return posts.find((p) => p.id === id) || null;
  }, [posts]);

  return { posts, createPost, updatePost, deletePost, getPost };
}
