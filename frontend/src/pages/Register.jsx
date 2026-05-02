import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('MEMBER');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('auth/register/', { username, email, password, role });
      localStorage.setItem('access_token', res.data.access);
      localStorage.setItem('refresh_token', res.data.refresh);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.username?.[0] || 'Registration failed');
    }
  };

  return (
    <div className="app-container" style={{ alignItems: 'center', justifyContent: 'center' }}>
      <div className="glass-panel animate-fade-in" style={{ padding: '40px', width: '100%', maxWidth: '400px' }}>
        <h2 className="text-center mb-4">Create Account</h2>
        {error && <div className="mb-3" style={{ color: 'var(--danger)', textAlign: 'center' }}>{error}</div>}
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label>Username</label>
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label>Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          <div className="mb-4">
            <label>Role</label>
            <select value={role} onChange={e => setRole(e.target.value)}>
              <option value="MEMBER">Member</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary w-full mb-3">Sign Up</button>
        </form>
        <div className="text-center">
          <span style={{ color: 'var(--text-muted)' }}>Already have an account? </span>
          <Link to="/login">Sign In</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
