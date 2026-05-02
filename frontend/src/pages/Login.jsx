import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('auth/login/', { username, password });
      localStorage.setItem('access_token', res.data.access);
      localStorage.setItem('refresh_token', res.data.refresh);
      
      // Fetch user profile
      const userRes = await api.get('auth/me/', {
        headers: { Authorization: `Bearer ${res.data.access}` }
      });
      localStorage.setItem('user', JSON.stringify(userRes.data));
      navigate('/');
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="app-container" style={{ alignItems: 'center', justifyContent: 'center' }}>
      <div className="glass-panel animate-fade-in" style={{ padding: '40px', width: '100%', maxWidth: '400px' }}>
        <h2 className="text-center mb-4">Welcome Back</h2>
        {error && <div className="mb-3" style={{ color: 'var(--danger)', textAlign: 'center' }}>{error}</div>}
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label>Username</label>
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} required />
          </div>
          <div className="mb-4">
            <label>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn-primary w-full mb-3">Sign In</button>
        </form>
        <div className="text-center">
          <span style={{ color: 'var(--text-muted)' }}>Don't have an account? </span>
          <Link to="/register">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
