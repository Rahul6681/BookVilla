import React from 'react';
import { Link } from 'react-router-dom';
import BookCard from '../components/BookCard';
import { useFetch } from '../hooks/useFetch';
import { api } from '../services/api';
import { MOCK_BOOKS } from '../data/mockBooks';
import '../styles/home.css';

export default function Home() {
  const { data: books, loading } = useFetch(
    async () => {
      const result = await api.getBooks({ limit: 12 });
      return result.books;
    },
    [],
    100
  );

  const featuredBook = books?.find(b => b.slug === 'god-of-small-things' || b.id === 'god-of-small-things') || books?.[0] || MOCK_BOOKS[0];
  const trendingBooks = books?.filter(b => b.trending).slice(0, 4) || [];
  const newArrivals = books?.filter(b => b.newArrival).slice(0, 4) || [];

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

          {/* Featured Book Showcase */}
          <div className="hero-book-showcase">
            <div className="hero-featured-card">
              <span className="hero-ribbon">Book of the Month</span>
              <img
                src={featuredBook.coverImage}
                alt={`Cover of ${featuredBook.title}`}
                className="hero-book-img"
              />
              <h3 className="hero-card-title">{featuredBook.title}</h3>
              <span className="hero-card-author">by {featuredBook.author}</span>
              <p style={{ fontSize: '0.825rem', color: '#D6CEC5', margin: 0 }}>
                {featuredBook.edition}
              </p>
              <Link to={`/book/${featuredBook.id}`} className="btn btn-gold btn-sm" style={{ width: '100%', marginTop: '0.5rem' }}>
                Inspect Folio — ₹{featuredBook.price}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Literary Collections Overview */}
      <section className="home-section container" aria-labelledby="collections-heading">
        <header className="section-header">
          <div className="section-title-wrap">
            <span className="section-eyebrow">Curated Indian Stacks</span>
            <h2 id="collections-heading" className="section-title">Explore by Department</h2>
          </div>
          <Link to="/shop" className="section-link">
            Full Catalog View &rarr;
          </Link>
        </header>

        <div className="categories-grid">
          <Link to="/shop?category=indian-literature" className="category-card">
            <div className="category-icon-box">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
                <path d="M6 6h10" />
                <path d="M6 10h10" />
              </svg>
            </div>
            <h3 className="category-card-title">Indian Fiction</h3>
            <p className="category-card-desc">Arundhati Roy, R.K. Narayan, Ruskin Bond, Khushwant Singh, and contemporary masterworks.</p>
            <span className="category-card-link">Explore Indian Fiction &rarr;</span>
          </Link>

          <Link to="/shop?category=heritage-epics" className="category-card">
            <div className="category-icon-box">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                <path d="M2 12h20" />
              </svg>
            </div>
            <h3 className="category-card-title">Heritage, Epics &amp; Gita</h3>
            <p className="category-card-desc">The Bhagavad Gita, Divakaruni’s Palace of Illusions, the Mahabharata, and Vedantic philosophy.</p>
            <span className="category-card-link">Explore Heritage &rarr;</span>
          </Link>

          <Link to="/shop?category=history-biography" className="category-card">
            <div className="category-icon-box">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m12 3-1.9 5.8a2 2 0 0 1-1.287 1.288L3 12l5.8 1.9a2 2 0 0 1 1.288 1.287L12 21l1.9-5.8a2 2 0 0 1 1.287-1.288L21 12l-5.8-1.9a2 2 0 0 1-1.288-1.287Z" />
              </svg>
            </div>
            <h3 className="category-card-title">History &amp; Biographies</h3>
            <p className="category-card-desc">Dr. Kalam’s Wings of Fire, Guha’s India After Gandhi, Nehru, and Babasaheb Ambedkar.</p>
            <span className="category-card-link">Explore History &rarr;</span>
          </Link>

          <Link to="/shop?category=poetry-classics" className="category-card">
            <div className="category-icon-box">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </div>
            <h3 className="category-card-title">Poetry &amp; Translations</h3>
            <p className="category-card-desc">Tagore’s Gitanjali, Premchand’s Godan, regional vernacular translations, and classical verses.</p>
            <span className="category-card-link">Explore Translations &rarr;</span>
          </Link>
        </div>
      </section>

      {/* Trending Books */}
      <section className="home-section container" aria-labelledby="trending-heading">
        <header className="section-header">
          <div className="section-title-wrap">
            <span className="section-eyebrow">Reader Favorites</span>
            <h2 id="trending-heading" className="section-title">Trending Across India</h2>
          </div>
          <Link to="/shop" className="section-link">
            Explore All Books &rarr;
          </Link>
        </header>

        {loading ? (
          <div className="skeleton-loader">
            <div className="spinner" />
            <p>Bringing volumes from the BookVilla stacks...</p>
          </div>
        ) : (
          <div className="books-grid">
            {trendingBooks.map(book => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        )}
      </section>

      {/* Indian Literary Quote Banner */}
      <div className="container">
        <aside className="quote-banner" aria-label="Indian literary reflection">
          <blockquote className="quote-text">
            “One best book is equal to a hundred good friends, but one good friend is equal to a library.”
          </blockquote>
          <cite className="quote-author">— Dr. A.P.J. Abdul Kalam, Former President of India</cite>
        </aside>
      </div>

      {/* New Acquisitions */}
      <section className="home-section container" aria-labelledby="new-arrivals-heading">
        <header className="section-header">
          <div className="section-title-wrap">
            <span className="section-eyebrow">Fresh Additions</span>
            <h2 id="new-arrivals-heading" className="section-title">New to BookVilla Shelves</h2>
          </div>
          <Link to="/shop" className="section-link">
            View Recent Arrivals &rarr;
          </Link>
        </header>

        {loading ? (
          <div className="skeleton-loader">
            <div className="spinner" />
          </div>
        ) : (
          <div className="books-grid">
            {newArrivals.map(book => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        )}
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
