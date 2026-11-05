import React, { useState, useEffect } from 'react';
import { api } from '../services/api';

export default function Portal() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploadResult, setUploadResult] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  // Email inquiry test state
  const [emailForm, setEmailForm] = useState({
    name: 'Prof. Evaluator',
    email: 'evaluator@cap646.in',
    subject: 'CAP646 Unit IV & Unit V Verification',
    message: 'Testing Nodemailer and MongoDB full stack integration for BookVilla.'
  });
  const [emailSending, setEmailSending] = useState(false);
  const [emailSuccess, setEmailSuccess] = useState(false);

  useEffect(() => {
    async function loadStats() {
      try {
        const data = await api.getStats();
        setStats(data);
      } catch (err) {
        console.error('Failed to load stats:', err);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
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
      setUploadError(err.message || 'Multer upload failed');
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
      alert(`Error sending email: ${err.message}`);
    } finally {
      setEmailSending(false);
    }
  };

  return (
    <main className="container" style={{ padding: '2.5rem 1rem 5rem', maxWidth: '1200px' }} id="main-content">
      {/* Header Banner */}
      <header style={{ marginBottom: '2.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
          <span className="badge badge-gold" style={{ fontSize: '0.85rem' }}>CAP646 Full Stack Web Development</span>
          <span className="badge badge-forest" style={{ fontSize: '0.85rem' }}>Unit IV &amp; Unit V Live Architecture</span>
        </div>
        <h1 style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-primary-dark)', fontSize: '2.2rem', margin: '0.5rem 0' }}>
          Backend &amp; Database Architecture Portal
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: '850px', lineHeight: '1.6' }}>
          Direct verification panel demonstrating server-side development with Node.js &amp; Express.js (MVC, Multer, Nodemailer, Swagger)
          and database integration with MongoDB &amp; Mongoose (ODM, Schema Validation, Aggregation Pipelines, Transactions).
        </p>

        <div style={{ display: 'flex', gap: '1rem', marginTop: '1.25rem', flexWrap: 'wrap' }}>
          <a
            href="http://localhost:5000/api-docs"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <span>📖 Interactive Swagger OpenAPI Explorer</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          </a>

          <a
            href="http://localhost:5000/api/health"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <span>🩺 API Health JSON</span>
          </a>
        </div>
      </header>

      {/* Grid of Demonstrations */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
        
        {/* Section 1: MongoDB Aggregation Pipeline Showcase */}
        <section style={{ background: '#FFFFFF', padding: '1.75rem', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', border: '1px solid #EAE0D5' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <span style={{ fontSize: '1.5rem' }}>📊</span>
            <div>
              <h2 style={{ fontSize: '1.25rem', margin: 0, fontFamily: 'var(--font-serif)', color: 'var(--color-primary-dark)' }}>
                Unit V: MongoDB Aggregation Pipeline
              </h2>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Live computation via Book.aggregate([...])</span>
            </div>
          </div>

          {loading ? (
            <p>Loading database aggregates...</p>
          ) : stats?.overview ? (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
                <div style={{ background: '#F8F5F0', padding: '1rem', borderRadius: '6px' }}>
                  <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Total Folios</span>
                  <div style={{ fontSize: '1.6rem', fontWeight: 'bold', color: 'var(--color-primary)' }}>
                    {stats.overview.overview?.totalBooks || 0}
                  </div>
                </div>

                <div style={{ background: '#F8F5F0', padding: '1rem', borderRadius: '6px' }}>
                  <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Stock Valuation</span>
                  <div style={{ fontSize: '1.6rem', fontWeight: 'bold', color: '#8F2D19' }}>
                    ₹{(stats.overview.overview?.totalValuationINR || 0).toLocaleString('en-IN')}
                  </div>
                </div>

                <div style={{ background: '#F8F5F0', padding: '1rem', borderRadius: '6px' }}>
                  <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Average Price</span>
                  <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: 'var(--color-primary-dark)' }}>
                    ₹{Math.round(stats.overview.overview?.averagePrice || 0)}
                  </div>
                </div>

                <div style={{ background: '#F8F5F0', padding: '1rem', borderRadius: '6px' }}>
                  <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Total In-Stock Units</span>
                  <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: 'var(--color-forest)' }}>
                    {stats.overview.overview?.totalStockUnits || 0}
                  </div>
                </div>
              </div>

              <h4 style={{ margin: '1rem 0 0.5rem', fontSize: '0.95rem', color: 'var(--color-primary)' }}>
                Category Distribution ($group &amp; $project)
              </h4>
              <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                <table style={{ width: '100%', fontSize: '0.85rem', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: '#ECE3D4', textAlign: 'left' }}>
                      <th style={{ padding: '6px 8px' }}>Category</th>
                      <th style={{ padding: '6px 8px', textAlign: 'center' }}>Count</th>
                      <th style={{ padding: '6px 8px', textAlign: 'right' }}>Avg (₹)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.categories?.map((cat, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid #EAE0D5' }}>
                        <td style={{ padding: '6px 8px' }}>{cat.category}</td>
                        <td style={{ padding: '6px 8px', textAlign: 'center', fontWeight: 'bold' }}>{cat.count}</td>
                        <td style={{ padding: '6px 8px', textAlign: 'right', color: '#8F2D19' }}>₹{cat.avgPrice}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <p style={{ color: 'var(--text-muted)' }}>Connect MongoDB to view live aggregation pipeline.</p>
          )}
        </section>

        {/* Section 2: Multer File Upload Studio */}
        <section style={{ background: '#FFFFFF', padding: '1.75rem', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', border: '1px solid #EAE0D5' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <span style={{ fontSize: '1.5rem' }}>🖼️</span>
            <div>
              <h2 style={{ fontSize: '1.25rem', margin: 0, fontFamily: 'var(--font-serif)', color: 'var(--color-primary-dark)' }}>
                Unit IV: Multer File Upload
              </h2>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Multipart/form-data upload to /uploads/books/</span>
            </div>
          </div>

          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
            Upload a book cover folio (JPEG, PNG, WebP up to 5MB). The file is processed with Multer diskStorage, hashed, and served statically.
          </p>

          <label
            style={{
              display: 'block',
              border: '2px dashed #C5A059',
              borderRadius: '8px',
              padding: '1.5rem',
              textAlign: 'center',
              cursor: 'pointer',
              background: '#FDFBF7',
              marginBottom: '1rem'
            }}
          >
            <input
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleFileUpload}
              disabled={uploading}
            />
            <span style={{ fontSize: '2rem', display: 'block', marginBottom: '0.5rem' }}>📂</span>
            <span style={{ fontWeight: 600, color: 'var(--color-primary)' }}>
              {uploading ? 'Processing & Hashing with Multer...' : 'Click to Upload Book Folio Cover'}
            </span>
            <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              Accepts PNG, JPG, WEBP (Max 5MB)
            </span>
          </label>

          {uploadError && (
            <div className="badge badge-rust" style={{ display: 'block', padding: '0.5rem', marginBottom: '1rem' }}>
              ⚠️ {uploadError}
            </div>
          )}

          {uploadResult && (
            <div style={{ background: '#F4EBE1', padding: '1rem', borderRadius: '6px', border: '1px solid #C5A059' }}>
              <span style={{ fontWeight: 'bold', color: 'var(--color-primary-dark)', display: 'block', marginBottom: '0.5rem' }}>
                ✓ Multer Upload Succeeded!
              </span>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <img
                  src={uploadResult.url}
                  alt="Uploaded Folio"
                  style={{ width: '60px', height: '80px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #DDD' }}
                />
                <div style={{ fontSize: '0.8rem', overflow: 'hidden' }}>
                  <p style={{ margin: '2px 0' }}><strong>File:</strong> {uploadResult.fileName}</p>
                  <p style={{ margin: '2px 0' }}><strong>Size:</strong> {(uploadResult.size / 1024).toFixed(1)} KB</p>
                  <p style={{ margin: '2px 0' }}><strong>URL:</strong> <code>{uploadResult.url}</code></p>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Section 3: Nodemailer Email Integration */}
        <section style={{ background: '#FFFFFF', padding: '1.75rem', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', border: '1px solid #EAE0D5' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <span style={{ fontSize: '1.5rem' }}>📧</span>
            <div>
              <h2 style={{ fontSize: '1.25rem', margin: 0, fontFamily: 'var(--font-serif)', color: 'var(--color-primary-dark)' }}>
                Unit IV: Nodemailer Email Service
              </h2>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Automated SMTP Dispatch &amp; Indian Invoicing</span>
            </div>
          </div>

          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
            Whenever an order is placed on BookVilla, an HTML invoice with Indian PIN codes, Blue Dart tracking, and 5% GST is sent via Nodemailer. Test the mailer below:
          </p>

          <form onSubmit={handleSendEmail} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Recipient Name</label>
              <input
                type="text"
                value={emailForm.name}
                onChange={(e) => setEmailForm({ ...emailForm, name: e.target.value })}
                required
                style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #CCC' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Recipient Email</label>
              <input
                type="email"
                value={emailForm.email}
                onChange={(e) => setEmailForm({ ...emailForm, email: e.target.value })}
                required
                style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #CCC' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Inquiry / Subject</label>
              <input
                type="text"
                value={emailForm.subject}
                onChange={(e) => setEmailForm({ ...emailForm, subject: e.target.value })}
                required
                style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #CCC' }}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={emailSending}
              style={{ marginTop: '0.5rem' }}
            >
              {emailSending ? 'Dispatching via Nodemailer...' : 'Send Test Email via Nodemailer'}
            </button>

            {emailSuccess && (
              <div className="badge badge-forest" style={{ padding: '0.5rem', textAlign: 'center' }}>
                ✓ Email dispatched! Check backend console for Ethereal preview link.
              </div>
            )}
          </form>
        </section>

      </div>
    </main>
  );
}
