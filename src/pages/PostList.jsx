import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import usePosts from '../hooks/usePosts';
import { excerpt, readingTime, formatDate } from '../utils/helpers';

export default function PostList() {
  const { posts, deletePost } = usePosts();
  const [search, setSearch] = useState('');
  const [filterTag, setFilterTag] = useState('');

  const allTags = useMemo(() => {
    const set = new Set();
    posts.forEach((p) => p.tags?.forEach((t) => set.add(t)));
    return [...set].sort();
  }, [posts]);

  const filtered = useMemo(() => {
    return posts.filter((p) => {
      const matchSearch = !search ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.content.toLowerCase().includes(search.toLowerCase());
      const matchTag = !filterTag || p.tags?.includes(filterTag);
      return matchSearch && matchTag;
    });
  }, [posts, search, filterTag]);

  return (
    <div className="post-list-page">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search posts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
      </div>

      {allTags.length > 0 && (
        <div className="tag-filter">
          <button
            className={`tag-btn ${!filterTag ? 'active' : ''}`}
            onClick={() => setFilterTag('')}
          >
            All
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              className={`tag-btn ${filterTag === tag ? 'active' : ''}`}
              onClick={() => setFilterTag(filterTag === tag ? '' : tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="empty-state">
          {posts.length === 0 ? (
            <>
              <h2>No posts yet</h2>
              <p>Start writing your first blog post!</p>
              <Link to="/new" className="btn btn-primary">Write Post</Link>
            </>
          ) : (
            <p>No posts match your search.</p>
          )}
        </div>
      ) : (
        <div className="posts-grid">
          {filtered.map((post) => (
            <article key={post.id} className="post-card">
              <div className="post-card-body">
                <Link to={`/post/${post.id}`} className="post-card-title">{post.title}</Link>
                <p className="post-card-excerpt">{excerpt(post.content)}</p>
                <div className="post-card-tags">
                  {post.tags?.map((tag) => (
                    <span key={tag} className="tag small" onClick={() => setFilterTag(tag)}>{tag}</span>
                  ))}
                </div>
              </div>
              <div className="post-card-footer">
                <span className="post-meta">{formatDate(post.createdAt)} · {readingTime(post.content)}</span>
                <div className="post-card-actions">
                  <Link to={`/edit/${post.id}`} className="btn btn-small btn-secondary">Edit</Link>
                  <button className="btn btn-small btn-danger" onClick={() => deletePost(post.id)}>Delete</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
