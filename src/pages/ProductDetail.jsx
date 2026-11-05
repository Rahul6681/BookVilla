import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_BOOKS } from '../data/mockBooks';
import { api } from '../services/api';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import BookCard from '../components/BookCard';
import '../styles/productDetail.css';

export default function ProductDetail() {
  const { id } = useParams();
  const [book, setBook] = useState(() => MOCK_BOOKS.find(b => b.id === id || b.slug === id) || null);
  const [loading, setLoading] = useState(!book);

  const [quantity, setQuantity] = useState(1);
  const [imageError, setImageError] = useState(false);
  const [localReviews, setLocalReviews] = useState(book?.reviews || []);
  const [reviewName, setReviewName] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  // Indian Pincode Delivery Checker
  const [pincode, setPincode] = useState('560038');
  const [pincodeMessage, setPincodeMessage] = useState('✓ Delivery in 2-3 business days via Blue Dart Express to 560038.');

  const { addItem } = useCart();
  const { user, toggleWishlist } = useAuth();

  useEffect(() => {
    let isMounted = true;
    async function loadBook() {
      try {
        const fetched = await api.getBookById(id);
        if (isMounted && fetched) {
          setBook(fetched);
          setLocalReviews(fetched.reviews || []);
        }
      } catch (e) {
        console.warn('Using local book cache:', e.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadBook();
    return () => { isMounted = false; };
  }, [id]);

  if (loading) {
    return (
      <main className="container detail-page" style={{ textAlign: 'center', padding: '5rem 1rem' }}>
        <h2>Retrieving Folio from Archives...</h2>
      </main>
    );
  }

  if (!book) {
    return (
      <main className="container detail-page" style={{ textAlign: 'center', padding: '5rem 1rem' }}>
        <h2>Volume Not Found in the Stacks</h2>
        <p style={{ margin: '1rem 0 2rem', color: 'var(--text-muted)' }}>
          The requested book folio could not be retrieved from our archives.
        </p>
        <Link to="/shop" className="btn btn-primary">
          Return to Catalog
        </Link>
      </main>
    );
  }

  const bookIdentifier = book.slug || book.id || book._id;
  const isWishlisted = user?.wishlist?.includes(bookIdentifier);

  const discountPercent = book.originalPrice && book.originalPrice > book.price
    ? Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100)
    : (book.discountPercent || null);

  const relatedBooks = MOCK_BOOKS
    .filter(b => b.id !== book.id && b.slug !== book.slug && (b.category === book.category || b.featured))
    .slice(0, 3);

  const handleAddToCart = () => {
    addItem({ ...book, id: bookIdentifier }, quantity);
  };

  const handlePincodeCheck = (e) => {
    e.preventDefault();
    if (pincode.trim().length === 6 && /^\d+$/.test(pincode.trim())) {
      setPincodeMessage(`✓ Available for Cash on Delivery & Express Courier to ${pincode.trim()} (2-3 days).`);
    } else {
      setPincodeMessage('⚠️ Please enter a valid 6-digit Indian PIN code.');
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!reviewName.trim() || !reviewComment.trim()) return;

    const newReview = {
      id: `rev-${Date.now()}`,
      userName: reviewName.trim(),
      rating: Number(reviewRating),
      date: new Intl.DateTimeFormat('en-IN', { month: 'long', day: '2-digit', year: 'numeric' }).format(new Date()),
      comment: reviewComment.trim()
    };

    setLocalReviews(prev => [newReview, ...prev]);

    // Send to backend MongoDB
    try {
      await api.addReview(bookIdentifier, {
        userName: reviewName.trim(),
        rating: Number(reviewRating),
        comment: reviewComment.trim()
      });
    } catch (err) {
      console.warn('Review saved locally:', err.message);
    }

    setReviewName('');
    setReviewComment('');
    setReviewSubmitted(true);
    setTimeout(() => setReviewSubmitted(false), 5000);
  };

  return (
    <main className="detail-page container" id="main-content">
      {/* Breadcrumbs */}
      <nav className="breadcrumb-nav" aria-label="Breadcrumb">
        <Link to="/" className="breadcrumb-link">BookVilla</Link>
        <span className="breadcrumb-separator">/</span>
        <Link to="/shop" className="breadcrumb-link">Stacks</Link>
        <span className="breadcrumb-separator">/</span>
        <Link to={`/shop?category=${book.category}`} className="breadcrumb-link" style={{ textTransform: 'capitalize' }}>
          {book.category.replace('-', ' ')}
        </Link>
        <span className="breadcrumb-separator">/</span>
        <span className="breadcrumb-current" aria-current="page">{book.title}</span>
      </nav>

      {/* Main Grid */}
      <div className="detail-grid">
        {/* Book Visual Presentation */}
        <div className="detail-visual">
          <div className="detail-cover-card">
            {!imageError && book.coverImage ? (
              <img
                src={book.coverImage}
                alt={`Cover of ${book.title}`}
                className="detail-cover-img"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="book-cover-fallback" style={{ width: '220px', height: '330px', padding: '2rem' }}>
                <span className="fallback-author" style={{ fontSize: '0.9rem' }}>{book.author}</span>
                <span className="fallback-title" style={{ fontSize: '1.25rem' }}>{book.title}</span>
                <span style={{ fontSize: '0.8rem', opacity: 0.85 }}>BookVilla India</span>
              </div>
            )}
          </div>

          <div className="detail-guarantee-badge">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold)" strokeWidth="2.5">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span>100% Genuine Publisher Stock with pristine binding</span>
          </div>
        </div>

        {/* Book Info */}
        <section className="detail-info" aria-label="Book specifications and acquisition">
          <div className="detail-header-meta">
            <span className="badge badge-gold">{book.category.replace('-', ' ')}</span>
            <span className="badge badge-burgundy">{book.format}</span>
            {discountPercent && (
              <span className="badge badge-forest">Save {discountPercent}%</span>
            )}
          </div>

          <h1 className="detail-title">{book.title}</h1>
          {book.subtitle && <p className="detail-subtitle">{book.subtitle}</p>}

          <div className="detail-author-line">
            By <strong>{book.author}</strong> • Published by {book.publisher} ({book.publishYear})
          </div>

          <div className="detail-ratings-row">
            <div className="star-rating-box" aria-label={`Rating ${book.rating} out of 5 stars`}>
              <span>★</span>
              <span>{book.rating}</span>
            </div>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Based on {localReviews.length} reader reviews from India
            </span>
          </div>

          {/* Pricing in INR */}
          <div className="detail-price-box">
            <span className="detail-price">₹{book.price}</span>
            {book.originalPrice && (
              <span className="detail-original-price">₹{book.originalPrice}</span>
            )}
            <span style={{ fontSize: '0.85rem', color: 'var(--color-success)', fontWeight: 600 }}>
              (Inclusive of all taxes)
            </span>
          </div>

          {/* Purchase Box */}
          <div className="purchase-box">
            <div className={`stock-status-row ${book.inStock ? 'in-stock' : 'out-of-stock'}`}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                {book.inStock ? (
                  <path d="M20 6 9 17l-5-5" />
                ) : (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </>
                )}
              </svg>
              <span>
                {book.inStock
                  ? `In Stock at Indian Vault — ${book.stockCount} copies ready for immediate dispatch`
                  : 'Currently Out of Print'}
              </span>
            </div>

            <div className="purchase-controls">
              <div className="quantity-picker" role="group" aria-label="Select quantity">
                <button
                  type="button"
                  className="qty-btn"
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="qty-display">{quantity}</span>
                <button
                  type="button"
                  className="qty-btn"
                  onClick={() => setQuantity(prev => Math.min(book.stockCount || 10, prev + 1))}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <button
                type="button"
                className="btn btn-primary btn-add-large"
                onClick={handleAddToCart}
                disabled={!book.inStock}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                  <path d="M3 6h18" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
                <span>Add {quantity} to Basket</span>
              </button>

              <button
                type="button"
                className={`btn btn-secondary ${isWishlisted ? 'active' : ''}`}
                onClick={() => toggleWishlist(book.id)}
                aria-label="Add to wishlist"
                style={{ padding: '0.85rem 1.25rem' }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill={isWishlisted ? 'var(--color-primary)' : 'none'} stroke="currentColor" strokeWidth="2">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
                <span>{isWishlisted ? 'Saved' : 'Wishlist'}</span>
              </button>
            </div>

            {/* Indian PIN Code Delivery Checker */}
            <div style={{ marginTop: '0.5rem', borderTop: '1px solid var(--bg-muted)', paddingTop: '0.75rem' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-charcoal)' }}>
                Check Delivery &amp; COD to Your PIN Code:
              </span>
              <form onSubmit={handlePincodeCheck} style={{ display: 'flex', gap: '0.5rem', marginTop: '0.4rem' }}>
                <input
                  type="text"
                  maxLength="6"
                  placeholder="e.g. 110001 or 560038"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  style={{ width: '160px', padding: '0.4rem 0.75rem', fontSize: '0.85rem', border: '1px solid var(--bg-muted)', borderRadius: '4px' }}
                />
                <button type="submit" className="btn btn-secondary btn-sm">
                  Check
                </button>
              </form>
              {pincodeMessage && (
                <p style={{ fontSize: '0.8rem', color: pincodeMessage.includes('⚠️') ? 'var(--color-danger)' : 'var(--color-success)', marginTop: '0.35rem', margin: '0.35rem 0 0' }}>
                  {pincodeMessage}
                </p>
              )}
            </div>
          </div>

          {/* Synopsis */}
          <div className="detail-synopsis-wrap">
            <h2 className="synopsis-heading">Synopsis &amp; Literary Overview</h2>
            <p className="detail-synopsis-text">{book.synopsis}</p>
          </div>

          {/* Bibliographical Specifications */}
          <table className="specs-table" aria-label="Book publication specifications">
            <tbody>
              <tr>
                <th>Standard ISBN-13</th>
                <td>{book.isbn}</td>
              </tr>
              <tr>
                <th>Publisher &amp; Imprint</th>
                <td>{book.publisher}</td>
              </tr>
              <tr>
                <th>Total Pages</th>
                <td>{book.pages} pages</td>
              </tr>
              <tr>
                <th>Format &amp; Binding</th>
                <td>{book.format} ({book.edition})</td>
              </tr>
              <tr>
                <th>Language</th>
                <td>English</td>
              </tr>
              <tr>
                <th>Country of Origin</th>
                <td>India 🇮🇳</td>
              </tr>
            </tbody>
          </table>

          {/* Author Bio */}
          {book.authorBio && (
            <div className="author-bio-card">
              <h3 className="author-bio-title">About the Author</h3>
              <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-charcoal)' }}>
                {book.authorBio}
              </p>
            </div>
          )}
        </section>
      </div>

      {/* Customer Reviews Section */}
      <section className="reviews-section" aria-labelledby="reviews-heading">
        <div className="reviews-header">
          <div>
            <h2 id="reviews-heading" className="section-title">Critical Praise &amp; Reader Reviews</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>
              Reflections shared by readers across India.
            </p>
          </div>
        </div>

        {/* Existing Reviews List */}
        <div className="reviews-list">
          {localReviews.map(rev => (
            <article key={rev.id} className="review-item-card">
              <div className="review-item-top">
                <span className="reviewer-name">{rev.userName}</span>
                <span className="review-date">{rev.date}</span>
              </div>
              <div style={{ color: '#D4AF37', fontSize: '0.85rem' }}>
                {'★'.repeat(rev.rating)}
                {'☆'.repeat(5 - rev.rating)}
              </div>
              <p className="review-text">{rev.comment}</p>
            </article>
          ))}
        </div>

        {/* Inscribe a Review Form */}
        <div className="review-form-card">
          <h3 style={{ fontFamily: 'var(--font-serif)', marginBottom: '0.5rem', color: 'var(--color-primary)' }}>
            Inscribe Your Review
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
            Share your reading experience with the BookVilla community.
          </p>

          <form onSubmit={handleReviewSubmit}>
            <div className="form-group">
              <label htmlFor="review-author-name" className="form-label">Your Name</label>
              <input
                id="review-author-name"
                type="text"
                className="form-input"
                placeholder="e.g., Vikramaditya Roy"
                value={reviewName}
                onChange={(e) => setReviewName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="review-rating-select" className="form-label">Rating</label>
              <select
                id="review-rating-select"
                className="form-select"
                value={reviewRating}
                onChange={(e) => setReviewRating(Number(e.target.value))}
              >
                <option value="5">★★★★★ — Exceptional Masterwork (5/5)</option>
                <option value="4">★★★★☆ — Splendid and Thoughtful (4/5)</option>
                <option value="3">★★★☆☆ — Worthwhile Reading (3/5)</option>
                <option value="2">★★☆☆☆ — Average Execution (2/5)</option>
                <option value="1">★☆☆☆☆ — Not Recommended (1/5)</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="review-text-area" className="form-label">Your Review &amp; Reflections</label>
              <textarea
                id="review-text-area"
                className="form-textarea"
                rows="4"
                placeholder="Write your reflections on the prose, characters, and binding..."
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Submit Review
            </button>

            {reviewSubmitted && (
              <span style={{ marginLeft: '1rem', color: 'var(--color-success)', fontSize: '0.875rem', fontWeight: 600 }}>
                ✓ Dhanyawaad! Your review has been recorded.
              </span>
            )}
          </form>
        </div>
      </section>

      {/* Related Books */}
      <section className="home-section" aria-labelledby="related-heading" style={{ marginTop: 'var(--space-2xl)' }}>
        <header className="section-header">
          <div className="section-title-wrap">
            <span className="section-eyebrow">Complementary Reading</span>
            <h2 id="related-heading" className="section-title">You May Also Cherish</h2>
          </div>
          <Link to="/shop" className="section-link">
            Explore Collection &rarr;
          </Link>
        </header>

        <div className="books-grid">
          {relatedBooks.map(relBook => (
            <BookCard key={relBook.id} book={relBook} />
          ))}
        </div>
      </section>
    </main>
  );
}
