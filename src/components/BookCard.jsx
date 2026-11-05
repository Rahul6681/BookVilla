import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import '../styles/bookCard.css';

export default function BookCard({ book }) {
  const [imageFailed, setImageFailed] = useState(false);
  const { addItem } = useCart();
  const { user, toggleWishlist } = useAuth();

  const bookId = book.slug || book.id || book._id;
  const isWishlisted = user?.wishlist?.includes(bookId);

  const discountPercent = book.originalPrice && book.originalPrice > book.price
    ? Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100)
    : (book.discountPercent || null);

  const handleWishlistClick = (e) => {
    e.preventDefault();
    toggleWishlist(bookId);
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    addItem({ ...book, id: bookId }, 1);
  };

  return (
    <article className="book-card" aria-label={`${book.title} by ${book.author}`}>
      <div className="book-cover-wrapper">
        {discountPercent && (
          <span className="book-discount-badge" aria-label={`${discountPercent}% discount`}>
            -{discountPercent}%
          </span>
        )}

        <button
          type="button"
          className={`book-wishlist-btn ${isWishlisted ? 'active' : ''}`}
          onClick={handleWishlistClick}
          aria-label={isWishlisted ? `Remove ${book.title} from wishlist` : `Add ${book.title} to wishlist`}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill={isWishlisted ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
        </button>

        <Link to={`/book/${bookId}`} tabIndex="-1" aria-hidden="true">
          {!imageFailed && book.coverImage ? (
            <img
              src={book.coverImage}
              alt={`Cover of ${book.title}`}
              className="book-cover-img"
              loading="lazy"
              onError={() => setImageFailed(true)}
            />
          ) : (
            <div className="book-cover-fallback">
              <span className="fallback-author">{book.author}</span>
              <span className="fallback-title">{book.title}</span>
              <span style={{ fontSize: '0.65rem', opacity: 0.85 }}>BookVilla India</span>
            </div>
          )}
        </Link>
      </div>

      <div className="book-card-content">
        <div className="book-card-meta">
          <span className="book-category-tag">{book.category}</span>
          <span className="book-format-tag">{book.format}</span>
        </div>

        <h3 className="book-card-title">
          <Link to={`/book/${bookId}`}>{book.title}</Link>
        </h3>

        <p className="book-card-author">by {book.author}</p>

        <div className="book-card-rating" aria-label={`Rated ${book.rating} out of 5 stars from ${book.reviewsCount} reviews`}>
          <span className="star-icon" aria-hidden="true">★</span>
          <strong>{book.rating}</strong>
          <span className="rating-count">({book.reviewsCount})</span>
        </div>

        <div className="book-card-footer">
          <div className="book-price-box">
            <span className="book-current-price">₹{book.price}</span>
            {book.originalPrice && (
              <span className="book-original-price">₹{book.originalPrice}</span>
            )}
          </div>

          <button
            type="button"
            className="book-add-btn"
            onClick={handleAddToCart}
            aria-label={`Add ${book.title} to cart`}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5v14" />
            </svg>
            <span>Add</span>
          </button>
        </div>
      </div>
    </article>
  );
}
