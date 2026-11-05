import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import BookCard from '../components/BookCard';
import { CATEGORIES, MOCK_BOOKS } from '../data/mockBooks';
import { api } from '../services/api';
import { useFetch } from '../hooks/useFetch';
import '../styles/shop.css';

const ITEMS_PER_PAGE = 6;

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const initialSearch = searchParams.get('search') || '';

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [minRating, setMinRating] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [currentPage, setCurrentPage] = useState(1);

  // Sync state if query params change from external links
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
    const searchParam = searchParams.get('search');
    if (searchParam !== null) {
      setSearchQuery(searchParam);
    }
  }, [searchParams]);

  // Reset pagination on filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery, maxPrice, minRating, inStockOnly, sortBy]);

  const { data: rawBooks, loading } = useFetch(
    async () => {
      const res = await api.getBooks({ limit: 50 });
      return res.books;
    },
    [],
    120
  );

  // Filter and sort computation
  const filteredBooks = useMemo(() => {
    if (!rawBooks) return [];

    return rawBooks
      .filter(book => {
        // Category filter
        if (selectedCategory !== 'all' && book.category !== selectedCategory) {
          return false;
        }
        // Search filter (title, author, or ISBN)
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase();
          const matchesTitle = book.title.toLowerCase().includes(query);
          const matchesAuthor = book.author.toLowerCase().includes(query);
          const matchesIsbn = book.isbn.toLowerCase().includes(query);
          if (!matchesTitle && !matchesAuthor && !matchesIsbn) return false;
        }
        // Price filter
        if (book.price > maxPrice) {
          return false;
        }
        // Rating filter
        if (book.rating < minRating) {
          return false;
        }
        // In-stock filter
        if (inStockOnly && !book.inStock) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'newest') return b.publishYear - a.publishYear;
        // Default: featured first
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [rawBooks, selectedCategory, searchQuery, maxPrice, minRating, inStockOnly, sortBy]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredBooks.length / ITEMS_PER_PAGE) || 1;
  const paginatedBooks = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredBooks.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredBooks, currentPage]);

  const handleClearFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setMaxPrice(1000);
    setMinRating(0);
    setInStockOnly(false);
    setSortBy('featured');
    setSearchParams({});
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    const newParams = new URLSearchParams(searchParams);
    if (categoryId === 'all') {
      newParams.delete('category');
    } else {
      newParams.set('category', categoryId);
    }
    setSearchParams(newParams);
  };

  return (
    <main className="shop-page container" id="main-content">
      {/* Header */}
      <header className="shop-header">
        <span className="shop-eyebrow">The Complete Stacks</span>
        <h1 className="shop-title">The BookVilla Catalog</h1>
        <p className="shop-subtitle">
          Explore our complete collection of Indian fiction, sacred epics, modern translations, history, and international bestsellers.
        </p>
      </header>

      <div className="shop-layout">
        {/* Sidebar Filters */}
        <aside className="shop-sidebar" aria-label="Catalog filters">
          <div className="sidebar-header">
            <h2 className="sidebar-title">Refine Selection</h2>
            <button
              type="button"
              className="clear-all-btn"
              onClick={handleClearFilters}
            >
              Clear All
            </button>
          </div>

          {/* Search within catalog */}
          <div className="filter-section">
            <label htmlFor="shop-search-input" className="filter-label">Search Books</label>
            <input
              id="shop-search-input"
              type="search"
              className="form-input"
              placeholder="Title or author..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Department / Category */}
          <fieldset className="filter-section" style={{ border: 'none', padding: 0 }}>
            <legend className="filter-label">Collection</legend>
            <div className="filter-options-list">
              {CATEGORIES.map(cat => (
                <label key={cat.id} className="filter-radio-label">
                  <input
                    type="radio"
                    name="category"
                    checked={selectedCategory === cat.id}
                    onChange={() => handleCategorySelect(cat.id)}
                  />
                  <span>{cat.name}</span>
                </label>
              ))}
            </div>
          </fieldset>

          {/* Price Range Slider in INR */}
          <div className="filter-section">
            <div className="filter-label">
              <span>Maximum Price</span>
              <span>₹{maxPrice}</span>
            </div>
            <input
              type="range"
              min="200"
              max="1000"
              step="50"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="price-range-slider"
              aria-label="Filter books by maximum price in Indian Rupees"
            />
            <div className="price-indicator">
              <span>₹200</span>
              <span>₹1,000</span>
            </div>
          </div>

          {/* Rating Filter */}
          <fieldset className="filter-section" style={{ border: 'none', padding: 0 }}>
            <legend className="filter-label">Minimum Rating</legend>
            <div className="filter-options-list">
              <label className="filter-radio-label">
                <input
                  type="radio"
                  name="rating"
                  checked={minRating === 0}
                  onChange={() => setMinRating(0)}
                />
                <span>All Ratings</span>
              </label>
              <label className="filter-radio-label">
                <input
                  type="radio"
                  name="rating"
                  checked={minRating === 4.5}
                  onChange={() => setMinRating(4.5)}
                />
                <span>★ 4.5 Stars &amp; Above</span>
              </label>
              <label className="filter-radio-label">
                <input
                  type="radio"
                  name="rating"
                  checked={minRating === 4.8}
                  onChange={() => setMinRating(4.8)}
                />
                <span>★ 4.8 Stars &amp; Above</span>
              </label>
            </div>
          </fieldset>

          {/* In-stock toggle */}
          <div className="filter-section">
            <label className="filter-radio-label">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
              />
              <span style={{ fontWeight: 600 }}>In-Stock Titles Only</span>
            </label>
          </div>
        </aside>

        {/* Results Area */}
        <section className="shop-results-area" aria-label="Book catalog results">
          {/* Toolbar */}
          <div className="shop-toolbar">
            <span className="results-count">
              Showing <strong>{paginatedBooks.length}</strong> of <strong>{filteredBooks.length}</strong> books
            </span>

            <div className="shop-sort-wrap">
              <label htmlFor="sort-select" className="sort-label">Sort by:</label>
              <select
                id="sort-select"
                className="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="featured">BookVilla Recommendation</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Reader Praise</option>
                <option value="newest">Publication Year</option>
              </select>
            </div>
          </div>

          {/* Active Filters Chips */}
          {(selectedCategory !== 'all' || searchQuery || maxPrice < 1000 || minRating > 0 || inStockOnly) && (
            <div className="active-filters-row">
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Active filters:</span>
              {selectedCategory !== 'all' && (
                <span className="filter-chip">
                  Collection: {CATEGORIES.find(c => c.id === selectedCategory)?.name}
                  <button type="button" className="filter-chip-remove" onClick={() => handleCategorySelect('all')}>&times;</button>
                </span>
              )}
              {searchQuery && (
                <span className="filter-chip">
                  Query: "{searchQuery}"
                  <button type="button" className="filter-chip-remove" onClick={() => setSearchQuery('')}>&times;</button>
                </span>
              )}
              {maxPrice < 1000 && (
                <span className="filter-chip">
                  Under ₹{maxPrice}
                  <button type="button" className="filter-chip-remove" onClick={() => setMaxPrice(1000)}>&times;</button>
                </span>
              )}
              {minRating > 0 && (
                <span className="filter-chip">
                  ★ {minRating}+
                  <button type="button" className="filter-chip-remove" onClick={() => setMinRating(0)}>&times;</button>
                </span>
              )}
              {inStockOnly && (
                <span className="filter-chip">
                  In Stock Only
                  <button type="button" className="filter-chip-remove" onClick={() => setInStockOnly(false)}>&times;</button>
                </span>
              )}
            </div>
          )}

          {/* Book Grid or Empty State */}
          {loading ? (
            <div className="skeleton-loader">
              <div className="spinner" />
              <p>Perusing the stacks...</p>
            </div>
          ) : paginatedBooks.length === 0 ? (
            <div className="empty-results-box">
              <div className="empty-results-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  <line x1="8" y1="11" x2="14" y2="11" />
                </svg>
              </div>
              <h3>No Volumes Matched Your Query</h3>
              <p style={{ maxWidth: '420px', color: 'var(--text-muted)' }}>
                We could not find any titles meeting all selected criteria. Try adjusting your price bounds or resetting filters.
              </p>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleClearFilters}
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="books-grid">
              {paginatedBooks.map(book => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <nav className="pagination-nav" aria-label="Catalog pages">
              <button
                type="button"
                className="pagination-btn"
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                aria-label="Previous page"
              >
                &larr;
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
                <button
                  key={pageNumber}
                  type="button"
                  className={`pagination-btn ${currentPage === pageNumber ? 'active' : ''}`}
                  onClick={() => setCurrentPage(pageNumber)}
                  aria-label={`Page ${pageNumber}`}
                  aria-current={currentPage === pageNumber ? 'page' : undefined}
                >
                  {pageNumber}
                </button>
              ))}

              <button
                type="button"
                className="pagination-btn"
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                aria-label="Next page"
              >
                &rarr;
              </button>
            </nav>
          )}
        </section>
      </div>
    </main>
  );
}
