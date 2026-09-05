import React from 'react';
import './LyricsView.css';

function LyricsView({ song, lyrics, onBackClick }) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(lyrics);
    alert('Lyrics copied to clipboard!');
  };

  return (
    <div className="lyrics-view-container">
      <button className="back-btn" onClick={onBackClick}>
        ← Back to Results
      </button>

      <div className="lyrics-display">
        <div className="song-header">
          <h1>{song.title}</h1>
          <p className="artist-name">by {song.artist.name}</p>
          {song.album?.name && (
            <p className="album-name">Album: {song.album.name}</p>
          )}
        </div>

        <div className="lyrics-actions">
          <button className="copy-btn" onClick={copyToClipboard}>
            📋 Copy Lyrics
          </button>
          <button className="share-btn" onClick={() => alert('Share feature coming soon!')}>
            🔗 Share
          </button>
        </div>

        <div className="lyrics-content">
          {lyrics.split('\n').map((line, index) => (
            <p key={index} className="lyrics-line">
              {line}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LyricsView;
