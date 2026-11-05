import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useCart } from '../hooks/useCart';
import { MOCK_BOOKS } from '../data/mockBooks';
import { api } from '../services/api';
import BookCard from '../components/BookCard';
import '../styles/account.css';

export default function Account() {
  const { user, orders, logout, updateProfile, addOrder } = useAuth();
  const { addItem } = useCart();
  const navigate = useNavigate();

  const [liveOrders, setLiveOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'wishlist' | 'settings'
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({
    fullName: user?.fullName || '',
    phone: user?.phone || '',
    address: user?.address || ''
  });
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    async function loadLiveOrders() {
      try {
        const fetched = await api.getOrders(user?.email);
        if (fetched && fetched.length) {
          setLiveOrders(fetched);
        }
      } catch (e) {
        console.warn('Using local orders state');
      }
    }
    loadLiveOrders();
  }, [user?.email]);

  const displayOrders = liveOrders.length ? liveOrders : orders;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateProfile(profileForm);
    setEditingProfile(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 4000);
  };

  const wishlistedBooks = MOCK_BOOKS.filter(book => user?.wishlist?.includes(book.id));

  return (
    <main className="account-page container" id="main-content">
      <header className="account-header">
        <div>
          <span className="badge badge-gold" style={{ marginBottom: '0.5rem' }}>Account details</span>
          <h1 className="account-title">Namaste, {user?.fullName || 'Distinguished Patron'}</h1>
        </div>
        <button
          type="button"
          className="btn btn-secondary btn-sm"
          onClick={handleLogout}
        >
          Sign Out of BookVilla
        </button>
      </header>

      <div className="account-layout">
        {/* Patron Dossier Card */}
        <aside className="patron-card" aria-label="Patron Information Card">
          <div className="patron-avatar-header">
            <div className="patron-avatar-large" aria-hidden="true">
              {user?.fullName ? user.fullName.charAt(0) : 'P'}
            </div>
            <div className="patron-meta">
              <h2 className="patron-name">{user?.fullName}</h2>
              <span className="patron-tier">{user?.membershipTier || 'BookVilla Rasika Patron'}</span>
            </div>
          </div>

          <div className="patron-detail-list">
            <div className="patron-detail-item">
              <span className="detail-k">Registered Email</span>
              <span className="detail-v">{user?.email}</span>
            </div>
            <div className="patron-detail-item">
              <span className="detail-k">Member Since</span>
              <span className="detail-v">{user?.joinDate || 'September 2024'}</span>
            </div>
            <div className="patron-detail-item">
              <span className="detail-k">Courier Contact Mobile</span>
              <span className="detail-v">{user?.phone || '+91 98765 43210'}</span>
            </div>
            <div className="patron-detail-item">
              <span className="detail-k">Delivery Destination</span>
              <span className="detail-v">{user?.address || 'Flat 402, Indiranagar, Bengaluru 560038'}</span>
            </div>
          </div>

          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => {
              setActiveTab('settings');
              setEditingProfile(true);
            }}
            style={{ marginTop: '0.5rem' }}
          >
            Update Profile &amp; Address
          </button>
        </aside>

        {/* Tabs & Content Area */}
        <section aria-label="Account details and orders">
          <nav className="account-nav-tabs" role="tablist" aria-label="Account sections">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'orders'}
              className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
              onClick={() => setActiveTab('orders')}
            >
              Order History ({orders.length})
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'wishlist'}
              className={`tab-btn ${activeTab === 'wishlist' ? 'active' : ''}`}
              onClick={() => setActiveTab('wishlist')}
            >
              Curated Wishlist ({wishlistedBooks.length})
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'settings'}
              className={`tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
              onClick={() => setActiveTab('settings')}
            >
              Delivery Preferences
            </button>
          </nav>

          {savedSuccess && (
            <div className="badge badge-forest" style={{ width: '100%', padding: '0.6rem', marginBottom: '1rem' }}>
              ✓ Your BookVilla profile details have been updated successfully.
            </div>
          )}

          {/* Tab 1: Orders */}
          {activeTab === 'orders' && (
            <div className="orders-list">
              {displayOrders.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem 1rem', background: '#FFFFFF', borderRadius: '8px' }}>
                  <h3>No Orders Recorded Yet</h3>
                  <p style={{ color: 'var(--text-muted)' }}>You have not completed any acquisitions yet.</p>
                  <Link to="/shop" className="btn btn-primary" style={{ marginTop: '1rem' }}>
                    Browse Bookstore Catalog
                  </Link>
                </div>
              ) : (
                displayOrders.map(order => {
                  const orderCode = order.orderNumber || order.id || order._id;
                  const orderStatus = order.orderStatus || order.status;
                  const orderTotal = order.totalAmount || order.total;
                  return (
                    <article key={orderCode} className="order-deed-card" aria-label={`Order ${orderCode}`}>
                      <div className="order-deed-header">
                        <div>
                          <span className="order-code">{orderCode}</span>
                          <span style={{ marginLeft: '0.75rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                            Placed on {order.date}
                          </span>
                        </div>
                        <span className="badge badge-forest">{orderStatus}</span>
                      </div>

                      <div className="order-items-grid">
                        {order.items.map((item, idx) => (
                          <div key={item.id || item.bookId || idx} className="order-item-mini">
                            <div className="order-item-left">
                              <img
                                src={item.coverImage}
                                alt={item.title}
                                className="order-thumb"
                                onError={(e) => { e.target.style.display = 'none'; }}
                              />
                              <div>
                                <strong style={{ fontSize: '0.95rem' }}>{item.title}</strong>
                                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                  by {item.author} • Qty: {item.quantity}
                                </div>
                              </div>
                            </div>
                            <span style={{ fontWeight: 600 }}>₹{item.price * item.quantity}</span>
                          </div>
                        ))}
                      </div>

                      <div className="order-deed-footer">
                        <div>
                          <span>Tracking: <strong>{order.trackingNumber}</strong></span>
                          <span style={{ marginLeft: '1rem' }}>Courier: {order.shippingMethod}</span>
                        </div>
                        <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-primary-dark)' }}>
                          Total Paid: ₹{orderTotal}
                        </div>
                      </div>
                    </article>
                  );
                })
              )}
            </div>
          )}

          {/* Tab 2: Wishlist */}
          {activeTab === 'wishlist' && (
            <div>
              {wishlistedBooks.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem 1rem', background: '#FFFFFF', borderRadius: '8px' }}>
                  <h3>Your Wishlist is Empty</h3>
                  <p style={{ color: 'var(--text-muted)' }}>Bookmark titles as you browse through the BookVilla stacks.</p>
                  <Link to="/shop" className="btn btn-primary" style={{ marginTop: '1rem' }}>
                    Peruse Catalog
                  </Link>
                </div>
              ) : (
                <div className="books-grid">
                  {wishlistedBooks.map(book => (
                    <BookCard key={book.id} book={book} />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Tab 3: Settings */}
          {activeTab === 'settings' && (
            <div className="order-deed-card">
              <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-primary)' }}>
                Edit Delivery Address &amp; Mobile
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                Ensure your shipping address and contact number are accurate for Blue Dart / Delhivery courier dispatch.
              </p>

              <form onSubmit={handleSaveProfile}>
                <div className="form-group">
                  <label htmlFor="pref-name" className="form-label">Full Name</label>
                  <input
                    id="pref-name"
                    type="text"
                    className="form-input"
                    value={profileForm.fullName}
                    onChange={(e) => setProfileForm(prev => ({ ...prev, fullName: e.target.value }))}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="pref-phone" className="form-label">Mobile Number (+91)</label>
                  <input
                    id="pref-phone"
                    type="tel"
                    className="form-input"
                    value={profileForm.phone}
                    onChange={(e) => setProfileForm(prev => ({ ...prev, phone: e.target.value }))}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="pref-address" className="form-label">Default Shipping Address (with PIN Code)</label>
                  <textarea
                    id="pref-address"
                    rows="3"
                    className="form-textarea"
                    value={profileForm.address}
                    onChange={(e) => setProfileForm(prev => ({ ...prev, address: e.target.value }))}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
              </form>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
