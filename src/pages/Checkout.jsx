import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import { api } from '../services/api';
import '../styles/checkout.css';

const INDIAN_STATES = [
  'Karnataka', 'Maharashtra', 'Delhi NCR', 'West Bengal', 'Tamil Nadu',
  'Uttar Pradesh', 'Gujarat', 'Telangana', 'Kerala', 'Rajasthan',
  'Madhya Pradesh', 'Punjab', 'Haryana', 'Bihar', 'Odisha', 'Assam', 'Goa'
];

export default function Checkout() {
  const { items, subtotal, discountAmount, discountPercent, tax, clearCart } = useCart();
  const { user, addOrder } = useAuth();
  const navigate = useNavigate();

  // Form states with Indian user defaults
  const [formData, setFormData] = useState({
    fullName: user?.fullName || 'Aarav Sharma',
    email: user?.email || 'aarav.sharma@bookvilla.in',
    phone: user?.phone || '+91 98765 43210',
    address: 'Flat 402, Shanti Nilayam, 14th Main, Indiranagar',
    city: 'Bengaluru',
    state: 'Karnataka',
    postalCode: '560038',
    country: 'India',
    shippingMethod: 'standard', // 'standard' | 'priority'
    paymentMethod: 'upi',       // 'upi' | 'card' | 'cod' | 'netbanking'
    upiId: 'aarav@okaxis',
    cardNumber: '6074 •••• •••• 1290',
    cardHolder: user?.fullName || 'Aarav Sharma',
    cardExp: '09/29',
    cardCvc: '412',
    bankName: 'HDFC Bank'
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  // Dynamic courier fee
  const baseShipping = subtotal === 0 || subtotal >= 499 ? 0 : 49;
  const shippingFee = formData.shippingMethod === 'priority' ? baseShipping + 99 : baseShipping;
  const grandTotal = subtotal - discountAmount + tax + shippingFee;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full recipient name is required.';
    if (!formData.email.trim() || !formData.email.includes('@')) newErrors.email = 'A valid email is required for the order invoice.';
    if (!formData.phone.trim() || formData.phone.trim().length < 10) newErrors.phone = 'A valid 10-digit Indian mobile number is required.';
    if (!formData.address.trim()) newErrors.address = 'Street / Society address is required.';
    if (!formData.city.trim()) newErrors.city = 'City / Town is required.';
    if (!formData.postalCode.trim() || formData.postalCode.trim().length !== 6) newErrors.postalCode = 'Please enter a valid 6-digit PIN code.';

    if (formData.paymentMethod === 'upi') {
      if (!formData.upiId.trim() || !formData.upiId.includes('@')) {
        newErrors.upiId = 'Please enter a valid UPI ID (e.g. name@okhdfcbank or phone@paytm).';
      }
    } else if (formData.paymentMethod === 'card') {
      if (!formData.cardNumber.trim()) newErrors.cardNumber = 'Card number is required.';
      if (!formData.cardHolder.trim()) newErrors.cardHolder = 'Cardholder name is required.';
      if (!formData.cardExp.trim()) newErrors.cardExp = 'Expiry date is required.';
      if (!formData.cardCvc.trim()) newErrors.cardCvc = 'CVV code is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    const orderPayload = {
      customerName: formData.fullName,
      customerEmail: formData.email,
      customerPhone: formData.phone,
      shippingAddress: {
        fullName: formData.fullName,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        postalCode: formData.postalCode,
        country: 'India'
      },
      items: items.map(item => ({
        bookId: item.id || item.slug || item._id,
        title: item.title,
        author: item.author,
        price: item.price,
        quantity: item.quantity,
        coverImage: item.coverImage
      })),
      subtotal,
      tax,
      shippingCost: shippingFee,
      discount: discountAmount,
      totalAmount: grandTotal,
      paymentMethod: formData.paymentMethod,
      upiId: formData.upiId || '',
      shippingMethod: formData.shippingMethod === 'priority' ? 'Speed Post Air Express (24h)' : 'Blue Dart Surface Express'
    };

    try {
      const createdOrder = await api.createOrder(orderPayload);
      const displayOrder = {
        ...createdOrder,
        id: createdOrder.orderNumber || createdOrder._id || `BV-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        total: createdOrder.totalAmount || grandTotal,
        shipping: createdOrder.shippingCost || shippingFee,
        status: createdOrder.orderStatus || 'Order Placed & Vault Reserved'
      };

      addOrder(displayOrder);
      clearCart();
      setConfirmedOrder(displayOrder);
    } catch (err) {
      console.error('Order creation error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0 && !confirmedOrder) {
    return (
      <main className="checkout-page container" style={{ textAlign: 'center', padding: '5rem 1rem' }}>
        <h2>No Books in Basket for Checkout</h2>
        <p style={{ margin: '1rem 0 2rem', color: 'var(--text-muted)' }}>
          Please add books to your basket before proceeding to acquisition.
        </p>
        <Link to="/shop" className="btn btn-primary">
          Browse BookVilla Stacks
        </Link>
      </main>
    );
  }

  return (
    <main className="checkout-page container" id="main-content">
      <header className="checkout-header">
        <h1 className="checkout-title">Book Delivery &amp; Payment</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', margin: 0 }}>
          Enter your delivery destination and select your preferred Indian payment mode.
        </p>
      </header>

      <div className="checkout-layout">
        {/* Checkout Form */}
        <form onSubmit={handleSubmitOrder} noValidate>
          {/* 1. Recipient & Shipping Address */}
          <section className="checkout-section-card" aria-labelledby="step-shipping">
            <h2 id="step-shipping" className="checkout-section-title">
              <span className="step-circle" aria-hidden="true">1</span>
              Delivery Address &amp; Recipient Details
            </h2>

            <div className="form-row-2">
              <div className="form-group">
                <label htmlFor="fullName" className="form-label">Full Name *</label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  className={`form-input ${errors.fullName ? 'has-error' : ''}`}
                  value={formData.fullName}
                  onChange={handleChange}
                />
                {errors.fullName && <span className="form-error">{errors.fullName}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">Email Address (for Tax Invoice) *</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className={`form-input ${errors.email ? 'has-error' : ''}`}
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <span className="form-error">{errors.email}</span>}
              </div>
            </div>

            <div className="form-row-2">
              <div className="form-group">
                <label htmlFor="phone" className="form-label">Delivery Contact Mobile (+91) *</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  className={`form-input ${errors.phone ? 'has-error' : ''}`}
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                />
                {errors.phone && <span className="form-error">{errors.phone}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="state" className="form-label">State / Union Territory *</label>
                <select
                  id="state"
                  name="state"
                  className="form-select"
                  value={formData.state}
                  onChange={handleChange}
                >
                  {INDIAN_STATES.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="address" className="form-label">House / Flat No., Apartment, Street Address *</label>
              <input
                id="address"
                name="address"
                type="text"
                className={`form-input ${errors.address ? 'has-error' : ''}`}
                value={formData.address}
                onChange={handleChange}
              />
              {errors.address && <span className="form-error">{errors.address}</span>}
            </div>

            <div className="form-row-2">
              <div className="form-group">
                <label htmlFor="city" className="form-label">City / Town *</label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  className={`form-input ${errors.city ? 'has-error' : ''}`}
                  value={formData.city}
                  onChange={handleChange}
                />
                {errors.city && <span className="form-error">{errors.city}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="postalCode" className="form-label">PIN Code (6 digits) *</label>
                <input
                  id="postalCode"
                  name="postalCode"
                  type="text"
                  maxLength="6"
                  className={`form-input ${errors.postalCode ? 'has-error' : ''}`}
                  value={formData.postalCode}
                  onChange={handleChange}
                  placeholder="e.g. 560038"
                />
                {errors.postalCode && <span className="form-error">{errors.postalCode}</span>}
              </div>
            </div>
          </section>

          {/* 2. Courier Selection */}
          <section className="checkout-section-card" aria-labelledby="step-courier">
            <h2 id="step-courier" className="checkout-section-title">
              <span className="step-circle" aria-hidden="true">2</span>
              Courier Partner Method
            </h2>

            <div className="option-selector-group" role="radiogroup" aria-label="Courier dispatch method">
              <label className={`selectable-option-card ${formData.shippingMethod === 'standard' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="shippingMethod"
                  value="standard"
                  checked={formData.shippingMethod === 'standard'}
                  onChange={handleChange}
                  className="option-radio"
                />
                <div className="option-details">
                  <span className="option-title">Blue Dart / Delhivery Express</span>
                  <p className="option-desc">Reinforced packaging with bubble padding. Estimated delivery in 2-4 business days.</p>
                </div>
                <span className="option-price">{baseShipping === 0 ? 'FREE' : `₹${baseShipping}`}</span>
              </label>

              <label className={`selectable-option-card ${formData.shippingMethod === 'priority' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="shippingMethod"
                  value="priority"
                  checked={formData.shippingMethod === 'priority'}
                  onChange={handleChange}
                  className="option-radio"
                />
                <div className="option-details">
                  <span className="option-title">Speed Post Air Express (Priority 24h Dispatch)</span>
                  <p className="option-desc">Same-day dispatch from nearest state repository with priority flight routing.</p>
                </div>
                <span className="option-price">₹{baseShipping + 99}</span>
              </label>
            </div>
          </section>

          {/* 3. Indian Payment Methods */}
          <section className="checkout-section-card" aria-labelledby="step-payment">
            <h2 id="step-payment" className="checkout-section-title">
              <span className="step-circle" aria-hidden="true">3</span>
              Payment Method (India)
            </h2>

            <div className="option-selector-group" role="radiogroup" aria-label="Payment method">
              <label className={`selectable-option-card ${formData.paymentMethod === 'upi' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="upi"
                  checked={formData.paymentMethod === 'upi'}
                  onChange={handleChange}
                  className="option-radio"
                />
                <div className="option-details">
                  <span className="option-title">⚡ Instant UPI (Google Pay, PhonePe, Paytm, BHIM)</span>
                  <p className="option-desc">Zero transaction fee. Pay with any UPI app on your phone.</p>
                </div>
              </label>

              <label className={`selectable-option-card ${formData.paymentMethod === 'card' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={formData.paymentMethod === 'card'}
                  onChange={handleChange}
                  className="option-radio"
                />
                <div className="option-details">
                  <span className="option-title">💳 RuPay, Debit or Credit Card</span>
                  <p className="option-desc">Encrypted transmission via Visa, MasterCard, and domestic RuPay cards.</p>
                </div>
              </label>

              <label className={`selectable-option-card ${formData.paymentMethod === 'cod' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={formData.paymentMethod === 'cod'}
                  onChange={handleChange}
                  className="option-radio"
                />
                <div className="option-details">
                  <span className="option-title">💵 Cash on Delivery (COD)</span>
                  <p className="option-desc">Pay at your doorstep using Cash or scanning the delivery agent's UPI QR code.</p>
                </div>
              </label>
            </div>

            {/* UPI Details Input */}
            {formData.paymentMethod === 'upi' && (
              <div style={{ marginTop: 'var(--space-md)', paddingTop: 'var(--space-md)', borderTop: '1px solid var(--bg-muted)' }}>
                <div className="form-group">
                  <label htmlFor="upiId" className="form-label">Enter UPI ID / VPA *</label>
                  <input
                    id="upiId"
                    name="upiId"
                    type="text"
                    className={`form-input ${errors.upiId ? 'has-error' : ''}`}
                    value={formData.upiId}
                    onChange={handleChange}
                    placeholder="e.g. mobile@upi or username@okhdfcbank"
                  />
                  {errors.upiId && <span className="form-error">{errors.upiId}</span>}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  A payment request will be triggered on your UPI app upon order placement.
                </div>
              </div>
            )}

            {/* Card Inputs */}
            {formData.paymentMethod === 'card' && (
              <div style={{ marginTop: 'var(--space-md)', paddingTop: 'var(--space-md)', borderTop: '1px solid var(--bg-muted)' }}>
                <div className="form-group">
                  <label htmlFor="cardHolder" className="form-label">Name on Card *</label>
                  <input
                    id="cardHolder"
                    name="cardHolder"
                    type="text"
                    className={`form-input ${errors.cardHolder ? 'has-error' : ''}`}
                    value={formData.cardHolder}
                    onChange={handleChange}
                  />
                  {errors.cardHolder && <span className="form-error">{errors.cardHolder}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="cardNumber" className="form-label">Card Number (RuPay, Visa, Mastercard) *</label>
                  <input
                    id="cardNumber"
                    name="cardNumber"
                    type="text"
                    className={`form-input ${errors.cardNumber ? 'has-error' : ''}`}
                    value={formData.cardNumber}
                    onChange={handleChange}
                    placeholder="6074 1234 5678 9012"
                  />
                  {errors.cardNumber && <span className="form-error">{errors.cardNumber}</span>}
                </div>

                <div className="form-row-2">
                  <div className="form-group">
                    <label htmlFor="cardExp" className="form-label">Expiry MM/YY *</label>
                    <input
                      id="cardExp"
                      name="cardExp"
                      type="text"
                      className={`form-input ${errors.cardExp ? 'has-error' : ''}`}
                      value={formData.cardExp}
                      onChange={handleChange}
                      placeholder="MM/YY"
                    />
                    {errors.cardExp && <span className="form-error">{errors.cardExp}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="cardCvc" className="form-label">CVV (3 digits) *</label>
                    <input
                      id="cardCvc"
                      name="cardCvc"
                      type="password"
                      maxLength="3"
                      className={`form-input ${errors.cardCvc ? 'has-error' : ''}`}
                      value={formData.cardCvc}
                      onChange={handleChange}
                      placeholder="•••"
                    />
                    {errors.cardCvc && <span className="form-error">{errors.cardCvc}</span>}
                  </div>
                </div>
              </div>
            )}
          </section>

          <button
            type="submit"
            className="btn btn-primary btn-lg"
            style={{ width: '100%' }}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Authenticating Order...' : `Place Order — ₹${grandTotal}`}
          </button>
        </form>

        {/* Order Review Sidebar */}
        <aside className="cart-summary-card" aria-label="Review basket order">
          <h2 className="summary-title">Order Items ({items.length})</h2>

          <div style={{ maxHeight: '260px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {items.map(item => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                <div>
                  <strong>{item.title}</strong>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.775rem' }}>Qty: {item.quantity}</div>
                </div>
                <span>₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>

          <div className="summary-line" style={{ borderTop: '1px solid var(--bg-muted)', paddingTop: '0.5rem' }}>
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>

          {discountAmount > 0 && (
            <div className="summary-line discount">
              <span>Coupon Discount ({discountPercent}%)</span>
              <span>-₹{discountAmount}</span>
            </div>
          )}

          <div className="summary-line">
            <span>GST &amp; Handling (5%)</span>
            <span>₹{tax}</span>
          </div>

          <div className="summary-line">
            <span>Courier Delivery</span>
            <span>{shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}</span>
          </div>

          <div className="summary-total">
            <span>Total Amount</span>
            <span>₹{grandTotal}</span>
          </div>
        </aside>
      </div>

      {/* Order Confirmation Modal */}
      {confirmedOrder && (
        <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="confirmation-heading">
          <div className="order-confirmation-card">
            <div className="confirmation-icon" aria-hidden="true">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </div>

            <h2 id="confirmation-heading" className="confirmation-title">
              Order Confirmed! Badhai Ho!
            </h2>

            <p style={{ color: 'var(--text-charcoal)', fontSize: '0.95rem' }}>
              Your order has been registered in the BookVilla dispatch queue. Sourced volumes are being securely packed for dispatch.
            </p>

            <div>
              <span className="order-code-badge">{confirmedOrder.id}</span>
            </div>

            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '0.5rem 0 1.5rem' }}>
              Tracking: <strong>{confirmedOrder.trackingNumber}</strong> • Total: <strong>₹{confirmedOrder.total}</strong>
            </p>

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => navigate('/account')}
              >
                View Account Orders &rarr;
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate('/shop')}
              >
                Return to Stacks
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
