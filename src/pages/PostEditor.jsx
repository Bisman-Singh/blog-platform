import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import usePosts from '../hooks/usePosts';
import MarkdownPreview from '../components/MarkdownPreview';
import TagInput from '../components/TagInput';

export default function PostEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getPost, createPost, updatePost } = usePosts();
  const isEditing = Boolean(id);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState([]);

  useEffect(() => {
    if (isEditing) {
      const post = getPost(id);
      if (post) {
        setTitle(post.title);
        setContent(post.content);
        setTags(post.tags || []);
      }
    }
  }, [id, isEditing, getPost]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    if (isEditing) {
      updatePost(id, { title, content, tags });
      navigate(`/post/${id}`);
    } else {
      const newId = createPost({ title, content, tags });
      navigate(`/post/${newId}`);
    }
  };

  return (
    <div className="editor-page">
      <form onSubmit={handleSubmit}>
        <div className="editor-header">
          <h2>{isEditing ? 'Edit Post' : 'New Post'}</h2>
          <div className="editor-actions">
            <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>Cancel</button>
            <button type="submit" className="btn btn-primary">
              {isEditing ? 'Update' : 'Publish'}
            </button>
          </div>
        </div>

        <input
          type="text"
          className="editor-title-input"
          placeholder="Post title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <TagInput tags={tags} onChange={setTags} />

        <div className="editor-split">
          <div className="editor-pane">
            <div className="pane-header">Markdown</div>
            <textarea
              className="editor-textarea"
              placeholder="Write your post in markdown..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>
          <div className="preview-pane">
            <div className="pane-header">Preview</div>
            <div className="preview-content">
              <MarkdownPreview content={content} />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
