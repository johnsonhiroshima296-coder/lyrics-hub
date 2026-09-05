import React from 'react';
import './SongResults.css';

function SongResults({ songs, onSelectSong, onBackClick, searchQuery }) {
  return (
    <div className="results-container">
      <button className="back-btn" onClick={onBackClick}>
        ← Back to Search
      </button>
      
      <div className="results-header">
        <h2>Search Results for "{searchQuery}"</h2>
        <p className="result-count">{songs.length} songs found</p>
      </div>

      <div className="songs-grid">
        {songs.map((song, index) => (
          <div
            key={index}
            className="song-card"
            onClick={() => onSelectSong(song)}
          >
            <h3>{song.title}</h3>
            <p className="artist">🎤 {song.artist.name}</p>
            <p className="album">
              {song.album?.name && `💿 ${song.album.name}`}
            </p>
            <button className="view-btn">View Lyrics →</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SongResults;
