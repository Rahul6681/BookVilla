import React from 'react';
import { Link } from 'react-router-dom';
import BookCard from '../components/BookCard';
import { useFetch } from '../hooks/useFetch';
import { api } from '../services/api';
import { MOCK_BOOKS } from '../data/mockBooks';
import '../styles/home.css';

export default function Home() {
  const { data: books } = useFetch(
    async () => {
      const result = await api.getBooks({ limit: 12 });
      return result.books;
    },
    [],
    MOCK_BOOKS
  );

  const bookList = books || MOCK_BOOKS;
  const featuredBook = bookList.find(b => b.slug === 'god-of-small-things' || b.id === 'god-of-small-things') || bookList[0];
  const trendingBooks = bookList.filter(b => b.trending).slice(0, 4);
  const newArrivals = bookList.filter(b => b.newArrival).slice(0, 4);

  return (
    <main className="main-content" id="main-content">
      {/* Hero Section */}
      <section className="hero-section" aria-label="BookVilla Welcome & Featured Book">
        <div className="container hero-grid">
          <div className="hero-content">
            <div className="hero-curation-pill">
              <span aria-hidden="true">🇮🇳</span> India's Premier Online Bookstore
            </div>

            <h1 className="hero-title">
              Where Indian Thought &amp; Words <em>Find Their Sanctuary.</em>
            </h1>

            <p className="hero-subtitle">
              From the historic book stalls of College Street and Daryaganj to timeless epics, regional translations, and modern bestsellers. Hand-packaged with care and dispatched across 19,000+ PIN codes in India.
            </p>

            <div className="hero-cta-group">
              <Link to="/shop" className="btn btn-gold btn-lg">
                Explore The Stacks
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <Link to={`/book/${featuredBook.slug || featuredBook.id || featuredBook._id}`} className="btn btn-secondary btn-lg" style={{ color: '#FDFBF7', borderColor: 'rgba(255, 255, 255, 0.4)' }}>
                View Book of the Month
              </Link>
            </div>

            <div className="hero-stats">
              <div className="hero-stat-item">
                <span className="hero-stat-num">10,000+</span>
                <span className="hero-stat-label">Indian &amp; Global Titles</span>
              </div>
              <div className="hero-stat-item">
                <span className="hero-stat-num">19,000+</span>
                <span className="hero-stat-label">PIN Codes Served</span>
              </div>
              <div className="hero-stat-item">
                <span className="hero-stat-num">100%</span>
                <span className="hero-stat-label">Original Editions</span>
              </div>
            </div>
          </div>

          {/* Hero Featured Book Spotlight */}
          <div className="hero-book-showcase">
            <div className="showcase-card">
              <div className="showcase-badge">Folio of the Month</div>
              <div className="showcase-cover-wrapper">
                <img
                  src={featuredBook.coverImage}
                  alt={featuredBook.title}
                  className="showcase-cover-img"
                  loading="eager"
                  decoding="async"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = 'https://upload.wikimedia.org/wikipedia/en/1/1e/Thegodofsmallthings.jpg';
                  }}
                />
              </div>
              <div className="showcase-info">
                <span className="showcase-meta">{featuredBook.category?.replace('-', ' ')} • {featuredBook.publisher}</span>
                <h2 className="showcase-title">{featuredBook.title}</h2>
                <p className="showcase-author">by {featuredBook.author}</p>
                <p className="showcase-synopsis">{featuredBook.synopsis?.slice(0, 160)}...</p>
                <div className="showcase-actions">
                  <span className="showcase-price">₹{featuredBook.price}</span>
                  <Link to={`/book/${featuredBook.slug || featuredBook.id || featuredBook._id}`} className="showcase-btn">
                    Read Folio Details &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Indian Genre Curations */}
      <section className="container categories-strip" aria-label="Literary collections">
        <div className="category-chips">
          <Link to="/shop?category=indian-literature" className="cat-chip">
            <span className="cat-chip-icon">🇮🇳</span>
            <span>Indian Fiction</span>
          </Link>
          <Link to="/shop?category=heritage-epics" className="cat-chip">
            <span className="cat-chip-icon">🕉️</span>
            <span>Heritage &amp; Epics</span>
          </Link>
          <Link to="/shop?category=history-biography" className="cat-chip">
            <span className="cat-chip-icon">🏛️</span>
            <span>History &amp; Biographies</span>
          </Link>
          <Link to="/shop?category=poetry-classics" className="cat-chip">
            <span className="cat-chip-icon">🪶</span>
            <span>Poetry &amp; Classics</span>
          </Link>
          <Link to="/shop?category=global-bestsellers" className="cat-chip">
            <span className="cat-chip-icon">🌟</span>
            <span>Bestsellers &amp; Mythos</span>
          </Link>
        </div>
      </section>

      {/* Trending Across India Section - Instant rendering */}
      <section className="container section-gap" aria-label="Trending books in India">
        <header className="section-header">
          <div>
            <span className="section-pill">Reader Favorites</span>
            <h2 className="section-title">Trending Across India</h2>
          </div>
          <Link to="/shop?sort=trending" className="section-link">
            View All Trending
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </Link>
        </header>

        <div className="books-grid">
          {trendingBooks.map(book => (
            <BookCard key={book.slug || book.id || book._id} book={book} />
          ))}
        </div>
      </section>

      {/* Indian Literary Quote Banner */}
      <section className="quote-banner-wrapper" aria-label="Indian thought inspiration">
        <div className="container">
          <blockquote className="heritage-quote">
            <p className="quote-text">
              &ldquo;Where the mind is without fear and the head is held high; Where knowledge is free; Where the world has not been broken up into fragments by narrow domestic walls... Into that heaven of freedom, my Father, let my country awake.&rdquo;
            </p>
            <cite className="quote-author">— Rabindranath Tagore, <em>Gitanjali (Song Offerings)</em>, 1912</cite>
          </blockquote>
        </div>
      </section>

      {/* New Folios & Rare Arrivals - Instant rendering */}
      <section className="container section-gap" aria-label="Newly added books">
        <header className="section-header">
          <div>
            <span className="section-pill">Fresh From Press</span>
            <h2 className="section-title">New Folios &amp; Collector Editions</h2>
          </div>
          <Link to="/shop?sort=newest" className="section-link">
            Explore All New Arrivals
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </Link>
        </header>

        <div className="books-grid">
          {newArrivals.map(book => (
            <BookCard key={book.slug || book.id || book._id} book={book} />
          ))}
        </div>
      </section>

      {/* BookVilla Indian Promises Bar */}
      <div className="container">
        <section className="perks-bar" aria-label="BookVilla service promises">
          <div className="perk-item">
            <div className="perk-icon" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
              </svg>
            </div>
            <div>
              <h4 className="perk-title">19,000+ PIN Codes</h4>
              <p className="perk-desc">Fast courier dispatch via Blue Dart &amp; Delhivery. Free delivery over ₹499.</p>
            </div>
          </div>

          <div className="perk-item">
            <div className="perk-icon" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <div>
              <h4 className="perk-title">Cash on Delivery (COD)</h4>
              <p className="perk-desc">Pay upon receiving your books at your doorstep with Cash or instant UPI QR.</p>
            </div>
          </div>

          <div className="perk-item">
            <div className="perk-icon" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <div>
              <h4 className="perk-title">100% Genuine Publisher Stock</h4>
              <p className="perk-desc">Authentic copies directly from Penguin India, Rupa, HarperCollins, and Jaico.</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
