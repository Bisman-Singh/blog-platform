import { useParams, Link, useNavigate } from 'react-router-dom';
import usePosts from '../hooks/usePosts';
import MarkdownPreview from '../components/MarkdownPreview';
import { readingTime, formatDate } from '../utils/helpers';

export default function PostView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getPost, deletePost } = usePosts();
  const post = getPost(id);

  if (!post) {
    return (
      <div className="empty-state">
        <h2>Post not found</h2>
        <Link to="/" className="btn btn-primary">Back to Posts</Link>
      </div>
    );
  }

  const handleDelete = () => {
    deletePost(post.id);
    navigate('/');
  };

  return (
    <article className="post-view">
      <div className="post-view-header">
        <Link to="/" className="back-link">← Back to Posts</Link>
        <div className="post-view-actions">
          <Link to={`/edit/${post.id}`} className="btn btn-secondary">Edit</Link>
          <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
        </div>
      </div>

      <h1 className="post-view-title">{post.title}</h1>

      <div className="post-view-meta">
        <span>{formatDate(post.createdAt)}</span>
        <span>·</span>
        <span>{readingTime(post.content)}</span>
        {post.updatedAt !== post.createdAt && (
          <>
            <span>·</span>
            <span>Updated {formatDate(post.updatedAt)}</span>
          </>
        )}
      </div>

      {post.tags?.length > 0 && (
        <div className="post-view-tags">
          {post.tags.map((tag) => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
      )}

      <div className="post-view-content">
        <MarkdownPreview content={post.content} />
      </div>
    </article>
  );
}
