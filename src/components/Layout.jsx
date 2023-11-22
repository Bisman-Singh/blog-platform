import { Link, useLocation } from 'react-router-dom';

export default function Layout({ children }) {
  const location = useLocation();

  return (
    <div className="app">
      <nav className="navbar">
        <Link to="/" className="nav-brand">BlogPlatform</Link>
        <div className="nav-links">
          <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>Posts</Link>
          <Link to="/new" className="btn btn-primary">Write Post</Link>
        </div>
      </nav>
      <main className="main-content">{children}</main>
    </div>
  );
}
