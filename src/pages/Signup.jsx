import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import '../styles/auth.css';

export default function Signup() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');

  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full legal name is required.';
    if (!formData.email.trim() || !formData.email.includes('@')) newErrors.email = 'A valid email is required.';
    if (!formData.password || formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters.';
    if (!formData.phone.trim()) newErrors.phone = 'Valid Indian mobile number is required.';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match.';
    if (!formData.termsAccepted) newErrors.termsAccepted = 'You must accept the BookVilla Reader Charter.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');

    if (!validate()) return;

    setSubmitting(true);
    try {
      await signup({
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        phone: formData.phone
      });
      navigate('/account');
    } catch (err) {
      setSubmitError(err.message || 'Signup failed.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="auth-page container" id="main-content">
      <div className="auth-card">
        <header className="auth-header">
          <h1 className="auth-title">Join BookVilla Rasika Club</h1>
          <p className="auth-subtitle">Register for personalized book curation, festival privileges, and instant tracking.</p>
        </header>

        {submitError && (
          <div className="badge badge-danger" style={{ width: '100%', padding: '0.5rem', justifyContent: 'center' }}>
            {submitError}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="signup-name" className="form-label">Full Name *</label>
            <input
              id="signup-name"
              name="fullName"
              type="text"
              className={`form-input ${errors.fullName ? 'has-error' : ''}`}
              placeholder="e.g. Priya Sharma"
              value={formData.fullName}
              onChange={handleChange}
            />
            {errors.fullName && <span className="form-error">{errors.fullName}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="signup-email" className="form-label">Email Address *</label>
            <input
              id="signup-email"
              name="email"
              type="email"
              className={`form-input ${errors.email ? 'has-error' : ''}`}
              placeholder="e.g. priya.sharma@gmail.com"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <span className="form-error">{errors.email}</span>}
          </div>

          <div className="form-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label htmlFor="signup-password" className="form-label">Create Password *</label>
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
                id="signup-password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                className={`form-input ${errors.password ? 'has-error' : ''}`}
                placeholder="At least 6 characters"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            {errors.password && <span className="form-error">{errors.password}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="signup-confirm-password" className="form-label">Confirm Password *</label>
            <input
              id="signup-confirm-password"
              name="confirmPassword"
              type={showPassword ? 'text' : 'password'}
              className={`form-input ${errors.confirmPassword ? 'has-error' : ''}`}
              placeholder="Re-enter password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && <span className="form-error">{errors.confirmPassword}</span>}
          </div>

          <div className="form-group" style={{ flexDirection: 'row', alignItems: 'flex-start', gap: '0.6rem' }}>
            <input
              id="termsAccepted"
              name="termsAccepted"
              type="checkbox"
              checked={formData.termsAccepted}
              onChange={handleChange}
              style={{ marginTop: '0.25rem', accentColor: 'var(--color-primary)' }}
            />
            <label htmlFor="termsAccepted" style={{ fontSize: '0.85rem', color: 'var(--text-charcoal)', cursor: 'pointer' }}>
              I agree to the BookVilla Reader's Charter and acknowledge delivery terms.
            </label>
          </div>
          {errors.termsAccepted && <span className="form-error" style={{ display: 'block', marginTop: '-0.5rem', marginBottom: '0.5rem' }}>{errors.termsAccepted}</span>}

          <button type="submit" className="btn btn-primary btn-lg" disabled={submitting} style={{ width: '100%', marginTop: '0.5rem' }}>
            {submitting ? 'Registering with MongoDB...' : 'Complete Registration →'}
          </button>
        </form>

        <div className="auth-footer-prompt">
          Already registered with BookVilla?{' '}
          <Link to="/login">Sign In Instead</Link>
        </div>
      </div>
    </main>
  );
}
