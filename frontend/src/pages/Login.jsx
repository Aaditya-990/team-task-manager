import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post('auth/login/', { username, password });
      localStorage.setItem('access_token', res.data.access);
      localStorage.setItem('refresh_token', res.data.refresh);
      const userRes = await api.get('auth/me/', {
        headers: { Authorization: `Bearer ${res.data.access}` }
      });
      localStorage.setItem('user', JSON.stringify(userRes.data));
      navigate('/');
    } catch (err) {
      setError('Invalid credentials. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '20px', position: 'relative', overflow: 'hidden',
    }}>
      {/* Decorative blobs */}
      <div style={{ position: 'fixed', top: '-20%', left: '-10%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(79,70,229,0.25) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'fixed', bottom: '-20%', right: '-10%', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'fixed', top: '40%', right: '20%', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(6,182,212,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div className="animate-fade-in" style={{ width: '100%', maxWidth: '440px', position: 'relative', zIndex: 1 }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '12px',
            padding: '14px 28px',
            background: 'linear-gradient(135deg, rgba(79,70,229,0.2), rgba(139,92,246,0.2))',
            borderRadius: '20px',
            border: '1px solid rgba(79,70,229,0.4)',
            marginBottom: '20px',
            boxShadow: '0 8px 32px rgba(79,70,229,0.2)',
          }}>
            <span style={{ fontSize: '2rem' }}>⚡</span>
            <span style={{
              fontFamily: 'Outfit, sans-serif', fontWeight: 900, fontSize: '1.8rem',
              background: 'linear-gradient(135deg, #a5b4fc, #7c3aed)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>TeamTask</span>
          </div>
          <h1 style={{
            fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '2rem',
            background: 'linear-gradient(135deg, #fff 0%, #a5b4fc 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            marginBottom: '8px',
          }}>Welcome Back</h1>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '1rem' }}>Sign in to your workspace</p>
        </div>

        {/* Card */}
        <div style={{
          background: 'linear-gradient(145deg, rgba(30,41,59,0.9), rgba(15,23,42,0.95))',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderTop: '1px solid rgba(255,255,255,0.2)',
          borderRadius: '24px',
          padding: '40px',
          boxShadow: '0 25px 50px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)',
        }}>
          {error && (
            <div style={{
              marginBottom: '20px', padding: '14px 18px', borderRadius: '12px',
              background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
              color: '#FCA5A5', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px',
            }}>
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Username</label>
              <input
                type="text" value={username} onChange={e => setUsername(e.target.value)} required
                placeholder="Enter your username"
                style={{ width: '100%', padding: '14px 18px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', color: 'white', fontSize: '1rem', outline: 'none', transition: 'all 0.3s ease', boxSizing: 'border-box' }}
                onFocus={e => { e.target.style.borderColor = 'rgba(79,70,229,0.8)'; e.target.style.boxShadow = '0 0 0 4px rgba(79,70,229,0.15)'; }}
                onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.08)'; e.target.style.boxShadow = 'none'; }}
              />
            </div>

            <div style={{ marginBottom: '28px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Password</label>
              <input
                type="password" value={password} onChange={e => setPassword(e.target.value)} required
                placeholder="Enter your password"
                style={{ width: '100%', padding: '14px 18px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', color: 'white', fontSize: '1rem', outline: 'none', transition: 'all 0.3s ease', boxSizing: 'border-box' }}
                onFocus={e => { e.target.style.borderColor = 'rgba(79,70,229,0.8)'; e.target.style.boxShadow = '0 0 0 4px rgba(79,70,229,0.15)'; }}
                onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.08)'; e.target.style.boxShadow = 'none'; }}
              />
            </div>

            <button type="submit" disabled={loading} style={{
              width: '100%', padding: '15px', borderRadius: '14px', border: 'none',
              background: loading ? 'rgba(79,70,229,0.5)' : 'linear-gradient(135deg, #4F46E5 0%, #8B5CF6 100%)',
              color: 'white', fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '1.1rem',
              cursor: loading ? 'not-allowed' : 'pointer', transition: 'all 0.3s ease',
              boxShadow: '0 4px 20px rgba(79,70,229,0.4), inset 0 1px 0 rgba(255,255,255,0.2)',
              letterSpacing: '0.02em',
            }}
            onMouseEnter={e => { if (!loading) { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 8px 30px rgba(79,70,229,0.6)'; }}}
            onMouseLeave={e => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = '0 4px 20px rgba(79,70,229,0.4)'; }}
            >
              {loading ? '⏳ Signing in...' : '🚀 Sign In'}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '24px', color: 'rgba(255,255,255,0.4)', fontSize: '0.95rem' }}>
            Don't have an account?{' '}
            <Link to="/register" style={{ color: '#a5b4fc', fontWeight: 700, textDecoration: 'none' }}>
              Create one →
            </Link>
          </div>
        </div>

        {/* Feature badges */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '24px', flexWrap: 'wrap' }}>
          {['🔒 JWT Secured', '⚡ Real-time', '🎯 Role-Based'].map(badge => (
            <span key={badge} style={{
              padding: '6px 14px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600,
              background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
              color: 'rgba(255,255,255,0.5)',
            }}>{badge}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Login;
