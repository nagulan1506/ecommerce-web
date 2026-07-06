import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { User, Mail, Lock, ShieldAlert, CheckCircle } from 'lucide-react';
import { ShopContext } from '../context/ShopContext';

export const Auth = () => {
  const { login, register, token } = useContext(ShopContext);
  const [isLogin, setIsLogin] = useState(true);
  
  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Status states
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // If already logged in, redirect away
  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setSubmitting(true);

    if (isLogin) {
      const result = await login(email, password);
      setSubmitting(false);
      if (result.success) {
        setSuccess('Logged in successfully!');
        setTimeout(() => {
          // If user was heading to checkout, redirect back there
          const redirect = new URLSearchParams(location.search).get('redirect') || '/';
          navigate(redirect);
        }, 1000);
      } else {
        setError(result.error);
      }
    } else {
      if (password.length < 6) {
        setError('Password must be at least 6 characters long');
        setSubmitting(false);
        return;
      }
      const result = await register(name, email, password);
      setSubmitting(false);
      if (result.success) {
        setSuccess('Account created successfully!');
        setTimeout(() => {
          const redirect = new URLSearchParams(location.search).get('redirect') || '/';
          navigate(redirect);
        }, 1000);
      } else {
        setError(result.error);
      }
    }
  };

  return (
    <div className="container">
      <div className="auth-page">
        <div className="auth-header">
          <h2>{isLogin ? 'Sign In' : 'Create Account'}</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '6px' }}>
            {isLogin
              ? 'Access your premium orders and checkout dashboard'
              : 'Join the club for heirloom collections and custom gifts'}
          </p>
        </div>

        {/* Status Alerts */}
        {error && (
          <div
            style={{
              backgroundColor: '#fef2f2',
              border: '1px solid #fee2e2',
              color: '#ef4444',
              padding: '12px 16px',
              borderRadius: 'var(--radius-sm)',
              marginBottom: '20px',
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <ShieldAlert size={18} />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div
            style={{
              backgroundColor: 'var(--success-bg)',
              border: '1px solid #c8e6c9',
              color: 'var(--success)',
              padding: '12px 16px',
              borderRadius: 'var(--radius-sm)',
              marginBottom: '20px',
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <CheckCircle size={18} />
            <span>{success}</span>
          </div>
        )}

        {/* Input fields form */}
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group">
              <label>Full Name</label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  style={{ paddingLeft: '40px' }}
                />
                <User size={18} style={{ position: 'absolute', left: '14px', color: 'var(--text-muted)' }} />
              </div>
            </div>
          )}

          <div className="form-group">
            <label>Email Address</label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <input
                type="email"
                placeholder="example@mail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ paddingLeft: '40px' }}
              />
              <Mail size={18} style={{ position: 'absolute', left: '14px', color: 'var(--text-muted)' }} />
            </div>
          </div>

          <div className="form-group">
            <label>Password</label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ paddingLeft: '40px' }}
              />
              <Lock size={18} style={{ position: 'absolute', left: '14px', color: 'var(--text-muted)' }} />
            </div>
          </div>

          <button type="submit" className="btn-accent auth-btn" disabled={submitting}>
            {submitting ? 'Please wait...' : isLogin ? 'Sign In' : 'Sign Up'}
          </button>
        </form>

        <div className="auth-switch">
          {isLogin ? (
            <p>
              New to Wonderland?{' '}
              <span onClick={() => { setIsLogin(false); setError(''); }}>Create an Account</span>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <span onClick={() => { setIsLogin(true); setError(''); }}>Sign In</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
