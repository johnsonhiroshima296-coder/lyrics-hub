import React, { useState } from 'react';
import './SearchBar.css';

function SearchBar({ onSearch, initialQuery = '' }) {
  const [query, setQuery] = useState(initialQuery);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div className="search-bar-container">
      <div className="search-box">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="search-input"
            placeholder="Search by song title or artist..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          <button type="submit" className="search-btn">
            🔍 Search
          </button>
        </form>
      </div>
      <div className="search-tips">
        <small>💡 Tip: Search for "Song Title - Artist" for better results</small>
      </div>
    </div>
  );
}

export default SearchBar;
