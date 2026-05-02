import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('MEMBER');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post('auth/register/', { username, email, password, role });
      localStorage.setItem('access_token', res.data.access);
      localStorage.setItem('refresh_token', res.data.refresh);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.username?.[0] || 'Registration failed. Please try again.');
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%', padding: '14px 18px', background: 'rgba(0,0,0,0.3)',
    border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px',
    color: 'white', fontSize: '1rem', outline: 'none',
    transition: 'all 0.3s ease', boxSizing: 'border-box',
  };

  const handleFocus = e => { e.target.style.borderColor = 'rgba(79,70,229,0.8)'; e.target.style.boxShadow = '0 0 0 4px rgba(79,70,229,0.15)'; };
  const handleBlur = e => { e.target.style.borderColor = 'rgba(255,255,255,0.08)'; e.target.style.boxShadow = 'none'; };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '20px', position: 'relative', overflow: 'hidden',
    }}>
      {/* Decorative blobs */}
      <div style={{ position: 'fixed', top: '-20%', right: '-10%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.25) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'fixed', bottom: '-20%', left: '-10%', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(79,70,229,0.2) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'fixed', top: '30%', left: '15%', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(236,72,153,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div className="animate-fade-in" style={{ width: '100%', maxWidth: '440px', position: 'relative', zIndex: 1 }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '12px',
            padding: '12px 24px',
            background: 'linear-gradient(135deg, rgba(79,70,229,0.2), rgba(139,92,246,0.2))',
            borderRadius: '20px', border: '1px solid rgba(79,70,229,0.4)',
            marginBottom: '18px', boxShadow: '0 8px 32px rgba(79,70,229,0.2)',
          }}>
            <span style={{ fontSize: '1.8rem' }}>⚡</span>
            <span style={{
              fontFamily: 'Outfit, sans-serif', fontWeight: 900, fontSize: '1.6rem',
              background: 'linear-gradient(135deg, #a5b4fc, #7c3aed)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>TeamTask</span>
          </div>
          <h1 style={{
            fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '1.9rem',
            background: 'linear-gradient(135deg, #fff 0%, #a5b4fc 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            marginBottom: '6px',
          }}>Create Account</h1>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.95rem' }}>Join your team's workspace today</p>
        </div>

        {/* Card */}
        <div style={{
          background: 'linear-gradient(145deg, rgba(30,41,59,0.9), rgba(15,23,42,0.95))',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderTop: '1px solid rgba(255,255,255,0.2)',
          borderRadius: '24px', padding: '36px',
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

          <form onSubmit={handleRegister}>
            <div style={{ marginBottom: '18px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.82rem', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Username</label>
              <input type="text" value={username} onChange={e => setUsername(e.target.value)} required placeholder="Choose a username" style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
            </div>

            <div style={{ marginBottom: '18px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.82rem', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="your@email.com" style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
            </div>

            <div style={{ marginBottom: '18px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.82rem', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="Create a strong password" style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
            </div>

            <div style={{ marginBottom: '28px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.82rem', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Role</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                {[
                  { value: 'MEMBER', label: '👤 Member', desc: 'View & update tasks' },
                  { value: 'ADMIN', label: '👑 Admin', desc: 'Full access' },
                ].map(({ value, label, desc }) => (
                  <div key={value} onClick={() => setRole(value)} style={{
                    padding: '14px', borderRadius: '12px', cursor: 'pointer',
                    border: `2px solid ${role === value ? 'rgba(79,70,229,0.8)' : 'rgba(255,255,255,0.08)'}`,
                    background: role === value ? 'linear-gradient(135deg, rgba(79,70,229,0.2), rgba(139,92,246,0.2))' : 'rgba(0,0,0,0.2)',
                    transition: 'all 0.3s ease',
                    boxShadow: role === value ? '0 0 20px rgba(79,70,229,0.2)' : 'none',
                  }}>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem', color: role === value ? '#a5b4fc' : 'rgba(255,255,255,0.7)', marginBottom: '3px' }}>{label}</div>
                    <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)' }}>{desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <button type="submit" disabled={loading} style={{
              width: '100%', padding: '15px', borderRadius: '14px', border: 'none',
              background: loading ? 'rgba(79,70,229,0.5)' : 'linear-gradient(135deg, #4F46E5 0%, #8B5CF6 100%)',
              color: 'white', fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '1.1rem',
              cursor: loading ? 'not-allowed' : 'pointer', transition: 'all 0.3s ease',
              boxShadow: '0 4px 20px rgba(79,70,229,0.4), inset 0 1px 0 rgba(255,255,255,0.2)',
            }}
            onMouseEnter={e => { if (!loading) { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 8px 30px rgba(79,70,229,0.6)'; }}}
            onMouseLeave={e => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = '0 4px 20px rgba(79,70,229,0.4)'; }}
            >
              {loading ? '⏳ Creating account...' : '✨ Create Account'}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '24px', color: 'rgba(255,255,255,0.4)', fontSize: '0.95rem' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: '#a5b4fc', fontWeight: 700, textDecoration: 'none' }}>
              Sign In →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
