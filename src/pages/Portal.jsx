import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import '../styles/portal.css';

export default function Portal() {
  const [stats, setStats] = useState(null);
  const [dbUsers, setDbUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploadResult, setUploadResult] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  // Real-life customer notification state
  const [emailForm, setEmailForm] = useState({
    name: 'Aditi Sharma',
    email: 'aditi.sharma@example.in',
    subject: 'BookVilla Order #BV-98421 Dispatched - Express Courier Tracking',
    message: 'Your order containing "The God of Small Things" and "Malgudi Days" has been hand-packaged with care and dispatched via express courier.'
  });
  const [emailSending, setEmailSending] = useState(false);
  const [emailSuccess, setEmailSuccess] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const [statsData, usersData] = await Promise.all([
          api.getStats(),
          api.getUsers()
        ]);
        setStats(statsData);
        setDbUsers(usersData || []);
      } catch (err) {
        console.error('Failed to load store analytics from MongoDB:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setUploadError(null);
    setUploadResult(null);

    try {
      const data = await api.uploadCover(file);
      setUploadResult(data);
    } catch (err) {
      setUploadError(err.message || 'Media upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleSendEmail = async (e) => {
    e.preventDefault();
    setEmailSending(true);
    setEmailSuccess(false);

    try {
      await api.submitContact(emailForm);
      setEmailSuccess(true);
      setTimeout(() => setEmailSuccess(false), 5000);
    } catch (err) {
      alert(`Error sending dispatch notification: ${err.message}`);
    } finally {
      setEmailSending(false);
    }
  };

  const dbCounts = stats?.overview?.databaseCollections || {
    books: 12,
    categories: 5,
    orders: 2,
    users: dbUsers.length || 3,
    contacts: 1
  };

  return (
    <main className="portal-container" id="main-content">
      {/* Operations Header */}
      <header className="portal-header">
        <div className="portal-badge-group">
          <span className="badge badge-gold">BookVilla Operations Console</span>
          <span className="badge badge-forest">MongoDB Live Database: 127.0.0.1:27017/bookvilla</span>
        </div>
        <h1 className="portal-title">
          Publisher &amp; Inventory Operations Studio
        </h1>
        <p className="portal-subtitle">
          Enterprise operations console for real-time inventory intelligence, MongoDB collections telemetry, user authentication records, and customer dispatch communications across India.
        </p>

        <div className="portal-header-actions">
          <a
            href="http://localhost:5000/api-docs"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <span>📖 RESTful API Documentation (OpenAPI)</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          </a>

          <a
            href="http://localhost:5000/api/health"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <span>⚡ Service Health Telemetry</span>
          </a>
        </div>
      </header>

      {/* MongoDB Live Collections Telemetry Bar */}
      <div className="portal-collections-bar" aria-label="MongoDB Collections Overview">
        <div className="portal-col-item">
          <div className="portal-col-icon">📚</div>
          <div>
            <span className="portal-col-name">Books Collection</span>
            <span className="portal-col-count">{dbCounts.books} Folios</span>
          </div>
        </div>

        <div className="portal-col-item">
          <div className="portal-col-icon">🏷️</div>
          <div>
            <span className="portal-col-name">Categories Collection</span>
            <span className="portal-col-count">{dbCounts.categories} Genres</span>
          </div>
        </div>

        <div className="portal-col-item">
          <div className="portal-col-icon">📦</div>
          <div>
            <span className="portal-col-name">Orders Collection</span>
            <span className="portal-col-count">{dbCounts.orders} Dispatches</span>
          </div>
        </div>

        <div className="portal-col-item">
          <div className="portal-col-icon">👥</div>
          <div>
            <span className="portal-col-name">Users Collection</span>
            <span className="portal-col-count">{dbCounts.users || dbUsers.length} Patrons</span>
          </div>
        </div>

        <div className="portal-col-item">
          <div className="portal-col-icon">💬</div>
          <div>
            <span className="portal-col-name">Contacts Collection</span>
            <span className="portal-col-count">{dbCounts.contacts} Inquiries</span>
          </div>
        </div>
      </div>

      {/* Operations Grid */}
      <div className="portal-grid">
        
        {/* Section 1: Real-Time Inventory & Catalog Analytics */}
        <section className="portal-card" aria-label="Inventory and stock intelligence">
          <div className="portal-card-header">
            <div className="portal-card-icon" aria-hidden="true">📊</div>
            <div>
              <h2 className="portal-card-title">Inventory &amp; Catalog Analytics</h2>
              <p className="portal-card-desc">Real-time stock valuation &amp; genre metrics</p>
            </div>
          </div>

          {loading ? (
            <p style={{ color: 'var(--text-muted)' }}>Calculating real-time database aggregates...</p>
          ) : stats?.overview ? (
            <div>
              <div className="portal-metrics-grid">
                <div className="portal-metric-tile">
                  <span className="portal-metric-label">Total Titles</span>
                  <div className="portal-metric-val" style={{ color: 'var(--color-primary)' }}>
                    {stats.overview.overview?.totalBooks || 0}
                  </div>
                </div>

                <div className="portal-metric-tile">
                  <span className="portal-metric-label">Stock Valuation</span>
                  <div className="portal-metric-val" style={{ color: '#8F2D19' }}>
                    ₹{(stats.overview.overview?.totalValuationINR || 0).toLocaleString('en-IN')}
                  </div>
                </div>

                <div className="portal-metric-tile">
                  <span className="portal-metric-label">Average Price</span>
                  <div className="portal-metric-val" style={{ color: 'var(--color-primary-dark)' }}>
                    ₹{Math.round(stats.overview.overview?.averagePrice || 0)}
                  </div>
                </div>

                <div className="portal-metric-tile">
                  <span className="portal-metric-label">In-Stock Units</span>
                  <div className="portal-metric-val" style={{ color: 'var(--color-forest)' }}>
                    {stats.overview.overview?.totalStockUnits || 0}
                  </div>
                </div>
              </div>

              <h3 style={{ margin: '1rem 0 0.5rem', fontSize: '0.9rem', color: 'var(--color-primary)', fontWeight: 600 }}>
                Inventory Distribution by Genre
              </h3>
              <div className="portal-table-wrap">
                <table className="portal-table">
                  <thead>
                    <tr>
                      <th>Collection</th>
                      <th style={{ textAlign: 'center' }}>Titles</th>
                      <th style={{ textAlign: 'right' }}>Avg (₹)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.categories?.map((cat, idx) => (
                      <tr key={idx}>
                        <td style={{ textTransform: 'capitalize' }}>{cat.category?.replace('-', ' ')}</td>
                        <td style={{ textAlign: 'center', fontWeight: 'bold' }}>{cat.count}</td>
                        <td style={{ textAlign: 'right', color: '#8F2D19', fontWeight: 600 }}>₹{cat.avgPrice}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <p style={{ color: 'var(--text-muted)' }}>Database connection required to display live metrics.</p>
          )}
        </section>

        {/* Section 2: Folio Artwork & Media Asset Studio */}
        <section className="portal-card" aria-label="Media asset and cover studio">
          <div className="portal-card-header">
            <div className="portal-card-icon" aria-hidden="true">🖼️</div>
            <div>
              <h2 className="portal-card-title">Media Asset &amp; Folio Upload</h2>
              <p className="portal-card-desc">High-resolution cover art processing</p>
            </div>
          </div>

          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.5', margin: '0 0 0.5rem' }}>
            Upload authentic book cover artwork and manuscript scans (JPEG, PNG, WebP up to 5MB). Images are securely processed, optimized, and published to BookVilla's static CDN.
          </p>

          <label className="portal-dropzone">
            <input
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleFileUpload}
              disabled={uploading}
            />
            <span className="portal-dropzone-icon" aria-hidden="true">📂</span>
            <span className="portal-dropzone-title">
              {uploading ? 'Processing & Optimizing Media...' : 'Click to Upload Book Folio Artwork'}
            </span>
            <span className="portal-dropzone-hint">
              Accepts PNG, JPG, WEBP (Max 5MB)
            </span>
          </label>

          {uploadError && (
            <div className="badge badge-rust" style={{ display: 'block', padding: '0.5rem', marginBottom: '1rem' }}>
              ⚠️ {uploadError}
            </div>
          )}

          {uploadResult && (
            <div className="portal-upload-result">
              <span className="portal-upload-success-label">
                ✓ Folio Artwork Published Successfully!
              </span>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <img
                  src={uploadResult.url}
                  alt="Uploaded Folio Art"
                  style={{ width: '60px', height: '80px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #DDD' }}
                />
                <div style={{ fontSize: '0.78rem', overflow: 'hidden' }}>
                  <p style={{ margin: '2px 0' }}><strong>File:</strong> {uploadResult.fileName}</p>
                  <p style={{ margin: '2px 0' }}><strong>Size:</strong> {(uploadResult.size / 1024).toFixed(1)} KB</p>
                  <p style={{ margin: '2px 0' }}><strong>CDN URL:</strong> <code>{uploadResult.url}</code></p>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Section 3: Customer Dispatch & Notification Hub */}
        <section className="portal-card" aria-label="Order dispatch communications">
          <div className="portal-card-header">
            <div className="portal-card-icon" aria-hidden="true">📬</div>
            <div>
              <h2 className="portal-card-title">Dispatch &amp; Customer Notices</h2>
              <p className="portal-card-desc">Automated invoicing &amp; express dispatch</p>
            </div>
          </div>

          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.5', margin: '0 0 0.75rem' }}>
            Trigger automated dispatch confirmations, Blue Dart courier tracking links, and computerized 5% GST invoices to verified customer inboxes.
          </p>

          <form onSubmit={handleSendEmail}>
            <div className="portal-form-group">
              <label className="portal-form-label">Recipient Customer</label>
              <input
                type="text"
                className="portal-form-input"
                value={emailForm.name}
                onChange={(e) => setEmailForm({ ...emailForm, name: e.target.value })}
                required
              />
            </div>

            <div className="portal-form-group">
              <label className="portal-form-label">Customer Email Address</label>
              <input
                type="email"
                className="portal-form-input"
                value={emailForm.email}
                onChange={(e) => setEmailForm({ ...emailForm, email: e.target.value })}
                required
              />
            </div>

            <div className="portal-form-group">
              <label className="portal-form-label">Dispatch Notice Subject</label>
              <input
                type="text"
                className="portal-form-input"
                value={emailForm.subject}
                onChange={(e) => setEmailForm({ ...emailForm, subject: e.target.value })}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={emailSending}
              style={{ width: '100%', marginTop: '0.5rem' }}
            >
              {emailSending ? 'Transmitting Dispatch Notice...' : 'Send Dispatch & Invoice Notification'}
            </button>

            {emailSuccess && (
              <div className="badge badge-forest" style={{ display: 'block', padding: '0.65rem', textAlign: 'center', marginTop: '0.75rem' }}>
                ✓ Dispatch notification transmitted successfully to customer!
              </div>
            )}
          </form>
        </section>

      </div>

      {/* Section 4: MongoDB Registered Users Table */}
      <section className="portal-full-section" aria-label="MongoDB Users Collection">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: 'var(--color-primary-dark)', margin: 0 }}>
              👥 Registered Users &amp; Patrons (MongoDB `users` Collection)
            </h2>
            <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', margin: '0.2rem 0 0' }}>
              Live customer accounts with hashed passwords (bcrypt), JWT sessions, and Indian addresses.
            </p>
          </div>
          <span className="badge badge-forest" style={{ fontSize: '0.75rem' }}>
            ● {dbUsers.length} Users Active in MongoDB
          </span>
        </div>

        <div className="portal-table-wrap" style={{ maxHeight: '280px' }}>
          <table className="portal-table">
            <thead>
              <tr>
                <th>Customer / Patron</th>
                <th>Email Address</th>
                <th>Role</th>
                <th>Tier</th>
                <th>City / Region</th>
                <th>MongoDB ID</th>
              </tr>
            </thead>
            <tbody>
              {dbUsers.length > 0 ? (
                dbUsers.map(u => (
                  <tr key={u._id || u.id}>
                    <td>
                      <strong>{u.fullName}</strong>
                    </td>
                    <td>{u.email}</td>
                    <td>
                      <span className={`badge ${u.role === 'admin' ? 'badge-gold' : 'badge-subtle'}`} style={{ fontSize: '0.7rem' }}>
                        {u.role?.toUpperCase()}
                      </span>
                    </td>
                    <td style={{ color: 'var(--color-primary-light)', fontWeight: 600 }}>{u.membershipTier || 'Patron'}</td>
                    <td>{u.city ? `${u.city}, ${u.pincode || ''}` : 'New Delhi, 110001'}</td>
                    <td><code style={{ fontSize: '0.72rem' }}>{u._id || u.id}</code></td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '1rem', color: 'var(--text-muted)' }}>
                    Loading registered patrons from MongoDB...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
