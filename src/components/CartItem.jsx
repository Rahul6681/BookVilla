import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import '../styles/cartItem.css';

export default function CartItem({ item }) {
  const [imgError, setImgError] = useState(false);
  const { updateQuantity, removeItem } = useCart();

  const itemTotal = item.price * item.quantity;

  return (
    <div className="cart-item-row" role="row">
      <div className="cart-item-img-wrapper">
        {!imgError && item.coverImage ? (
          <img
            src={item.coverImage}
            alt={item.title}
            className="cart-item-img"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="cart-item-fallback">
            <span>{item.title}</span>
          </div>
        )}
      </div>

      <div className="cart-item-info">
        <h4 className="cart-item-title">
          <Link to={`/book/${item.id}`}>{item.title}</Link>
        </h4>
        <span className="cart-item-author">by {item.author}</span>
        <span className="cart-item-format">{item.format || 'Paperback'} • ₹{item.price} each</span>
      </div>

      <div className="cart-quantity-stepper" role="group" aria-label={`Quantity for ${item.title}`}>
        <button
          type="button"
          className="stepper-btn"
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
          aria-label="Decrease quantity"
        >
          −
        </button>
        <span className="stepper-value" aria-live="polite">{item.quantity}</span>
        <button
          type="button"
          className="stepper-btn"
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>

      <div className="cart-item-total" aria-label={`Item total: ₹${itemTotal}`}>
        ₹{itemTotal}
      </div>

      <button
        type="button"
        className="cart-item-remove-btn"
        onClick={() => removeItem(item.id)}
        aria-label={`Remove ${item.title} from basket`}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2M10 11v6M14 11v6" />
        </svg>
      </button>
    </div>
  );
}
