import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/footer.css';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 6000);
    }
  };

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container">
        <div className="footer-top">
          {/* Brand Column */}
          <div className="footer-brand-col">
            <span className="footer-brand-title">BookVilla</span>
            <p className="footer-tagline">
              India’s cherished sanctuary for readers, thinkers, and seekers. Curating rare Indian literature, timeless epics, regional translations, and celebrated global classics with devotion.
            </p>
            <div className="footer-store-info">
              <span>📍 College Street, Kolkata • Phagwara, Punjab • Daryaganj, Delhi • Church St, Bengaluru</span>
              <span>🕒 Support: Mon – Sat: 9:30 AM – 7:30 PM IST</span>
              <span>📞 Helpline: +91 (800) 555-BOOK / +91 98765 43210</span>
              <span>🇮🇳 Delivering across 19,000+ PIN codes via Blue Dart &amp; Delhivery</span>
            </div>
          </div>

          {/* Curated Collections */}
          <div>
            <h4 className="footer-heading">Collections</h4>
            <ul className="footer-links">
              <li><Link to="/shop?category=indian-literature" className="footer-link">Indian Fiction &amp; Contemporary</Link></li>
              <li><Link to="/shop?category=heritage-epics" className="footer-link">Heritage, Epics &amp; Philosophy</Link></li>
              <li><Link to="/shop?category=history-biography" className="footer-link">History &amp; Biographies</Link></li>
              <li><Link to="/shop?category=poetry-classics" className="footer-link">Poetry &amp; Hindi/Bengali Translations</Link></li>
              <li><Link to="/shop?category=global-bestsellers" className="footer-link">World Classics &amp; Bestsellers</Link></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="footer-heading">Patron Care</h4>
            <ul className="footer-links">
              <li><Link to="/account" className="footer-link">Track Order &amp; Blue Dart Dispatch</Link></li>
              <li><Link to="/cart" className="footer-link">Shopping Basket &amp; COD Details</Link></li>
              <li><Link to="/shop" className="footer-link">Rare Indian Edition Sourcing</Link></li>
              <li><Link to="/login" className="footer-link">BookVilla Rasika Club</Link></li>
              <li><Link to="/shop" className="footer-link">Colleges &amp; Library Bulk Orders</Link></li>
            </ul>
          </div>

          {/* Newsletter - The BookVilla Patrika */}
          <div>
            <h4 className="footer-heading">The BookVilla Patrika</h4>
            <p style={{ color: '#C8BDB2', fontSize: '0.875rem', marginBottom: '0.75rem' }}>
              Subscribe to our monthly literary newsletter featuring author interviews, Sahitya Akademi picks, and festival promotions.
            </p>
            <form onSubmit={handleSubscribe} className="newsletter-form" aria-label="Newsletter sign up">
              <div className="newsletter-input-group">
                <input
                  type="email"
                  className="newsletter-input"
                  placeholder="Enter your email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  aria-label="Email address for Indian literary newsletter"
                />
                <button type="submit" className="newsletter-btn">
                  Join
                </button>
              </div>
              {subscribed ? (
                <span className="newsletter-success">✓ Dhanyawaad! You have been inscribed in the Patrika roster.</span>
              ) : (
                <span className="newsletter-note">Zero spam. Pure literature and festival book recommendations.</span>
              )}
            </form>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} BookVilla Retail India Pvt. Ltd. Made with ❤️ for Indian bibliophiles.</p>
          <div className="footer-bottom-links">
            <Link to="/shop" className="footer-link">Terms of Service</Link>
            <Link to="/shop" className="footer-link">Privacy Policy</Link>
            <Link to="/shop" className="footer-link">GST &amp; Invoicing</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
