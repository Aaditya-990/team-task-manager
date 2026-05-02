import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';

function Layout() {
  const navigate = useNavigate();
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="app-container">
      <aside className="sidebar glass-panel">
        <div className="mb-4">
          <h2 className="text-center" style={{ color: 'var(--primary)' }}>TeamTask</h2>
        </div>
        <nav className="flex flex-col gap-2" style={{ flex: 1, flexDirection: 'column' }}>
          <Link to="/" className="btn btn-secondary w-full" style={{ justifyContent: 'flex-start' }}>Dashboard</Link>
          <Link to="/projects" className="btn btn-secondary w-full" style={{ justifyContent: 'flex-start' }}>Projects</Link>
        </nav>
        <div className="mt-4 pt-4" style={{ borderTop: '1px solid var(--card-border)' }}>
          <div className="mb-2">
            <strong>{user?.username}</strong>
            <div className={`badge badge-${user?.role?.toLowerCase()}`}>{user?.role}</div>
          </div>
          <button onClick={handleLogout} className="btn btn-danger w-full">Logout</button>
        </div>
      </aside>
      
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
