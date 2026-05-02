import React from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';

function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const navItems = [
    { to: '/', label: 'Dashboard', icon: '📊', exact: true },
    { to: '/projects', label: 'Projects', icon: '🗂️', exact: false },
  ];

  return (
    <div className="app-container">
      <aside className="sidebar">
        {/* Brand Logo */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            padding: '12px 16px',
            background: 'linear-gradient(135deg, rgba(79,70,229,0.2), rgba(139,92,246,0.2))',
            borderRadius: '14px',
            border: '1px solid rgba(79,70,229,0.3)',
          }}>
            <span style={{ fontSize: '1.5rem' }}>⚡</span>
            <span style={{
              fontFamily: 'Outfit, sans-serif',
              fontWeight: 800,
              fontSize: '1.3rem',
              background: 'linear-gradient(135deg, #a5b4fc, #7c3aed)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>TeamTask</span>
          </div>
        </div>

        {/* Nav Items */}
        <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {navItems.map(({ to, label, icon, exact }) => {
            const isActive = exact ? location.pathname === to : location.pathname.startsWith(to);
            return (
              <Link key={to} to={to} style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                padding: '12px 16px',
                borderRadius: '12px',
                textDecoration: 'none',
                fontFamily: 'Outfit, sans-serif',
                fontWeight: 600,
                fontSize: '1rem',
                transition: 'all 0.3s ease',
                background: isActive
                  ? 'linear-gradient(135deg, rgba(79,70,229,0.4), rgba(139,92,246,0.3))'
                  : 'rgba(255,255,255,0.03)',
                color: isActive ? '#a5b4fc' : 'rgba(255,255,255,0.6)',
                border: `1px solid ${isActive ? 'rgba(79,70,229,0.5)' : 'rgba(255,255,255,0.05)'}`,
                boxShadow: isActive ? '0 4px 15px rgba(79,70,229,0.2)' : 'none',
              }}>
                <span style={{ fontSize: '1.1rem' }}>{icon}</span>
                {label}
              </Link>
            );
          })}
        </nav>

        {/* User Profile */}
        <div style={{
          marginTop: '16px', paddingTop: '16px',
          borderTop: '1px solid rgba(255,255,255,0.07)',
        }}>
          <div style={{
            padding: '12px 16px', borderRadius: '12px',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            marginBottom: '12px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '36px', height: '36px', borderRadius: '50%',
                background: 'linear-gradient(135deg, #4F46E5, #8B5CF6)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 700, fontSize: '1rem', color: 'white',
              }}>
                {user?.username?.[0]?.toUpperCase()}
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'white' }}>{user?.username}</div>
                <div style={{
                  fontSize: '0.75rem', fontWeight: 600,
                  color: user?.role === 'ADMIN' ? '#a5b4fc' : '#6ee7b7',
                  textTransform: 'uppercase', letterSpacing: '0.05em',
                }}>{user?.role}</div>
              </div>
            </div>
          </div>
          <button onClick={handleLogout} style={{
            width: '100%', padding: '11px',
            background: 'rgba(239,68,68,0.1)',
            color: '#FCA5A5',
            border: '1px solid rgba(239,68,68,0.3)',
            borderRadius: '12px',
            fontFamily: 'Outfit, sans-serif',
            fontWeight: 700, fontSize: '0.95rem',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
          }}
          onMouseEnter={e => { e.target.style.background = '#EF4444'; e.target.style.color = 'white'; e.target.style.boxShadow = '0 4px 15px rgba(239,68,68,0.4)'; }}
          onMouseLeave={e => { e.target.style.background = 'rgba(239,68,68,0.1)'; e.target.style.color = '#FCA5A5'; e.target.style.boxShadow = 'none'; }}
          >
            🚪 Logout
          </button>
        </div>
      </aside>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
