import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import CartItem from '../components/CartItem';
import '../styles/cart.css';

export default function Cart() {
  const {
    items,
    totalItems,
    subtotal,
    discountAmount,
    discountPercent,
    couponCode,
    shipping,
    tax,
    grandTotal,
    applyCoupon,
    removeCoupon,
    clearCart
  } = useCart();

  const [inputCoupon, setInputCoupon] = useState('');

  const freeShippingThreshold = 499;
  const shippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (inputCoupon.trim()) {
      applyCoupon(inputCoupon);
      setInputCoupon('');
    }
  };

  return (
    <main className="cart-page container" id="main-content">
      <header className="cart-header">
        <h1 className="cart-title">Your BookVilla Basket</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', margin: 0 }}>
          {totalItems === 0
            ? 'Your basket is currently empty.'
            : `You have selected ${totalItems} ${totalItems === 1 ? 'volume' : 'volumes'} for dispatch.`}
        </p>
      </header>

      {items.length === 0 ? (
        <div className="cart-items-container cart-empty-state">
          <div className="empty-cart-icon" aria-hidden="true">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
          </div>
          <h2>Your Basket is Awaiting Books</h2>
          <p style={{ maxWidth: '420px', color: 'var(--text-muted)' }}>
            No titles have been added yet. Browse our curated collection of Indian literature, epics, and bestsellers.
          </p>
          <Link to="/shop" className="btn btn-primary btn-lg" style={{ marginTop: '0.5rem' }}>
            Browse Full Catalog
          </Link>
        </div>
      ) : (
        <div className="cart-layout">
          {/* Main items column */}
          <div>
            {/* Free Shipping Meter for INR */}
            <div className="shipping-meter-card" role="region" aria-label="Shipping threshold progress">
              <span className="meter-text">
                {subtotal >= freeShippingThreshold ? (
                  '✓ You qualify for Free Express Courier Delivery across India!'
                ) : (
                  <>Add books worth <strong>₹{remainingForFreeShipping}</strong> more to enjoy Free Courier Delivery.</>
                )}
              </span>
              <div className="meter-bar-track">
                <div
                  className="meter-bar-fill"
                  style={{ width: `${shippingProgress}%` }}
                  role="progressbar"
                  aria-valuenow={shippingProgress}
                  aria-valuemin="0"
                  aria-valuemax="100"
                />
              </div>
            </div>

            <div className="cart-items-container">
              <div className="cart-table-header">
                <span>Selected Volumes ({totalItems})</span>
                <button
                  type="button"
                  onClick={clearCart}
                  style={{ fontSize: '0.8rem', color: 'var(--color-danger)', fontWeight: 600 }}
                >
                  Empty Basket
                </button>
              </div>

              <div role="table" aria-label="Cart items table">
                {items.map(item => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'var(--space-lg)' }}>
                <Link to="/shop" className="btn btn-secondary btn-sm">
                  &larr; Continue Exploring Stacks
                </Link>
              </div>
            </div>
          </div>

          {/* Order Summary Column */}
          <aside className="cart-summary-card" aria-label="Basket Order Summary">
            <h2 className="summary-title">Acquisition Summary</h2>

            <div className="summary-line">
              <span>Books Subtotal</span>
              <span>₹{subtotal}</span>
            </div>

            {discountAmount > 0 && (
              <div className="summary-line discount">
                <span>Patron Discount ({discountPercent}%)</span>
                <span>-₹{discountAmount}</span>
              </div>
            )}

            <div className="summary-line">
              <span>GST &amp; Handling (5%)</span>
              <span>₹{tax}</span>
            </div>

            <div className="summary-line">
              <span>Courier Delivery</span>
              <span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
            </div>

            <div className="summary-total">
              <span>Total Payable</span>
              <span>₹{grandTotal}</span>
            </div>

            {/* Coupon Code Entry */}
            {couponCode ? (
              <div className="coupon-applied-badge">
                <span>Code <strong>{couponCode}</strong> applied ({discountPercent}% off)</span>
                <button
                  type="button"
                  onClick={removeCoupon}
                  style={{ color: 'var(--color-danger)', fontSize: '0.9rem', fontWeight: 'bold' }}
                  aria-label="Remove coupon"
                >
                  &times;
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="coupon-box" aria-label="Coupon code form">
                <input
                  type="text"
                  placeholder="COUPON (e.g. BOOKVILLA15)"
                  className="coupon-input"
                  value={inputCoupon}
                  onChange={(e) => setInputCoupon(e.target.value)}
                  aria-label="Promotional coupon code"
                />
                <button type="submit" className="btn btn-secondary btn-sm">
                  Apply
                </button>
              </form>
            )}

            <Link to="/checkout" className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: '0.5rem' }}>
              Proceed to Checkout &rarr;
            </Link>

            <div className="cart-guarantees">
              <span>🔒 256-Bit Encrypted UPI, Cards &amp; NetBanking</span>
              <span>🇮🇳 Fast Dispatch via Blue Dart &amp; Delhivery</span>
              <span>💵 Cash on Delivery Available</span>
            </div>
          </aside>
        </div>
      )}
    </main>
  );
}
