import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import PostList from './pages/PostList';
import PostView from './pages/PostView';
import PostEditor from './pages/PostEditor';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/post/:id" element={<PostView />} />
        <Route path="/new" element={<PostEditor />} />
        <Route path="/edit/:id" element={<PostEditor />} />
      </Routes>
    </Layout>
  );
}
