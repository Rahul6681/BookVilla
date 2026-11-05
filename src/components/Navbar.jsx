import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import '../styles/navbar.css';

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItems, notification, clearNotification } = useCart();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="navbar-header" role="banner">
      {/* Indian Festive & Express Delivery Announcement */}
      <div className="announcement-bar" role="region" aria-label="Store announcement">
        <span>🚚 Free Express Courier Delivery across 19,000+ Indian Pincodes on orders over ₹499</span>
        <span aria-hidden="true">•</span>
        <span>Use coupon <strong>BOOKVILLA15</strong> for 15% off</span>
      </div>

      <div className="container navbar-container">
        {/* Brand */}
        <Link to="/" className="navbar-brand" aria-label="BookVilla India Home">
          <div className="brand-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
              <path d="M6 6h10" />
              <path d="M6 10h10" />
              <path d="M6 14h6" />
            </svg>
          </div>
          <div className="brand-text">
            <span className="brand-title">BookVilla</span>
            <span className="brand-subtitle">India's Online Bookstore </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="navbar-nav" aria-label="Primary Navigation">
          <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} end>
            Home
          </NavLink>
          <NavLink to="/shop" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Browse Stacks
          </NavLink>
          <NavLink to="/shop?category=indian-literature" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Indian Fiction
          </NavLink>
          <NavLink to="/shop?category=heritage-epics" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Heritage &amp; Epics
          </NavLink>
          <NavLink to="/portal" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Publisher Studio
          </NavLink>
        </nav>

        {/* Search Bar */}
        <div className="navbar-search">
          <form onSubmit={handleSearch} role="search">
            <span className="search-icon-btn" aria-hidden="true">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </span>
            <input
              type="search"
              className="search-input-field"
              placeholder="Search title, author (Tagore, Roy...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search BookVilla catalog"
            />
          </form>
        </div>

        {/* User & Cart Actions */}
        <div className="navbar-actions">
          {isAuthenticated ? (
            <Link to="/account" className="user-profile-badge" aria-label="Customer Account Dashboard">
              <span className="user-avatar-circle" aria-hidden="true">
                {user.fullName ? user.fullName.charAt(0) : 'U'}
              </span>
              <span>{user.fullName.split(' ')[0]}</span>
            </Link>
          ) : (
            <Link to="/login" className="action-btn" aria-label="Sign In to account">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <span>Sign In</span>
            </Link>
          )}

          <Link to="/cart" className="action-btn cart-btn-wrapper" aria-label={`Shopping cart with ${totalItems} items`}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            <span className="cart-badge" aria-hidden="true">{totalItems}</span>
          </Link>

          {/* Mobile hamburger button */}
          <button
            type="button"
            className="mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(prev => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {mobileMenuOpen ? (
                <path d="M18 6 6 18M6 6l12 12" />
              ) : (
                <path d="M4 12h16M4 6h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-menu-drawer">
          <form onSubmit={handleSearch} role="search" className="navbar-search">
            <input
              type="search"
              className="search-input-field"
              placeholder="Search title, author, ISBN..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search BookVilla catalog mobile"
            />
          </form>
          <nav className="navbar-nav" aria-label="Mobile Navigation">
            <NavLink to="/" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Home</NavLink>
            <NavLink to="/shop" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Browse Stacks</NavLink>
            <NavLink to="/shop?category=indian-literature" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Indian Fiction</NavLink>
            <NavLink to="/shop?category=heritage-epics" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Heritage &amp; Epics</NavLink>
            <NavLink to="/shop?category=history-biography" className="nav-link" onClick={() => setMobileMenuOpen(false)}>History &amp; Biographies</NavLink>
            <NavLink to="/portal" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Publisher Studio</NavLink>
            <NavLink to="/account" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Account &amp; Orders</NavLink>
          </nav>
        </div>
      )}

      {/* Notification Toast */}
      {notification && (
        <div className="cart-toast" role="status" aria-live="polite">
          <span>{notification}</span>
          <button type="button" className="toast-close-btn" onClick={clearNotification} aria-label="Dismiss message">
            &times;
          </button>
        </div>
      )}
    </header>
  );
}
