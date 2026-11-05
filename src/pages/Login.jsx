import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import '../styles/auth.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [authError, setAuthError] = useState('');

  const [submitting, setSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/account';

  const fillDemoCredentials = () => {
    setEmail('rahul.pandit@bookvilla.in');
    setPassword('BookVilla2026!');
    setErrors({});
    setAuthError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAuthError('');

    const newErrors = {};
    if (!email.trim()) newErrors.email = 'Email address is required.';
    if (!password.trim()) newErrors.password = 'Password is required.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSubmitting(true);
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setAuthError(err.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="auth-page container" id="main-content">
      <div className="auth-card">
        <header className="auth-header">
          <h1 className="auth-title">Enter The BookVilla Adda</h1>
          <p className="auth-subtitle">Sign in to your account to track book orders and saved wishlists.</p>
        </header>

        {/* Demo credentials helper */}
        <div className="demo-credentials-banner">
          <div>
            <strong>Indian Demo Account</strong>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>rahul.pandit@bookvilla.in</div>
          </div>
          <button type="button" className="demo-btn" onClick={fillDemoCredentials}>
            Auto Fill
          </button>
        </div>

        {authError && (
          <div className="badge badge-danger" style={{ width: '100%', padding: '0.5rem', justifyContent: 'center' }}>
            {authError}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="login-email" className="form-label">Registered Email Address</label>
            <input
              id="login-email"
              type="email"
              className={`form-input ${errors.email ? 'has-error' : ''}`}
              placeholder="e.g. rahul.pandit@bookvilla.in"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors(prev => ({ ...prev, email: null }));
              }}
            />
            {errors.email && <span className="form-error">{errors.email}</span>}
          </div>

          <div className="form-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label htmlFor="login-password" className="form-label">Password</label>
              <button
                type="button"
                className="password-toggle-btn"
                style={{ position: 'static' }}
                onClick={() => setShowPassword(prev => !prev)}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            <div className="password-input-wrap">
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                className={`form-input ${errors.password ? 'has-error' : ''}`}
                placeholder="Enter your confidential password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors(prev => ({ ...prev, password: null }));
                }}
              />
            </div>
            {errors.password && <span className="form-error">{errors.password}</span>}
          </div>

          <button type="submit" className="btn btn-primary btn-lg" disabled={submitting} style={{ width: '100%', marginTop: '0.5rem' }}>
            {submitting ? 'Authenticating with MongoDB...' : 'Sign In to BookVilla'}
          </button>
        </form>

        <div className="auth-footer-prompt">
          New to BookVilla?{' '}
          <Link to="/signup">Create an Account</Link>
        </div>
      </div>
    </main>
  );
}
