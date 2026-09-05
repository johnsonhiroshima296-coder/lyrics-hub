import React, { useState, useCallback } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import SongResults from './components/SongResults';
import LyricsView from './components/LyricsView';
import Loading from './components/Loading';
import ErrorMessage from './components/ErrorMessage';

function App() {
  const [view, setView] = useState('search'); // 'search', 'results', 'lyrics'
  const [songs, setSongs] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  const [lyrics, setLyrics] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  const handleSearch = useCallback(async (query) => {
    if (!query.trim()) {
      setError('Please enter a search term');
      return;
    }

    setSearchQuery(query);
    setLoading(true);
    setError('');
    setView('search');

    try {
      const response = await fetch(`${API_BASE_URL}/search/songs?q=${encodeURIComponent(query)}`);
      const data = await response.json();

      if (data.success && data.results.length > 0) {
        setSongs(data.results);
        setView('results');
      } else {
        setError('No songs found. Try another search term.');
        setSongs([]);
      }
    } catch (err) {
      setError('Error searching songs. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [API_BASE_URL]);

  const handleSongSelect = useCallback(async (song) => {
    setSelectedSong(song);
    setLoading(true);
    setError('');

    try {
      const response = await fetch(
        `${API_BASE_URL}/lyrics/get?artist=${encodeURIComponent(song.artist.name)}&title=${encodeURIComponent(song.title)}`
      );
      const data = await response.json();

      if (data.success) {
        setLyrics(data.lyrics);
        setView('lyrics');
      } else {
        setError('Lyrics not found for this song.');
      }
    } catch (err) {
      setError('Error fetching lyrics. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [API_BASE_URL]);

  const handleBackToResults = useCallback(() => {
    setView('results');
    setLyrics('');
    setSelectedSong(null);
  }, []);

  const handleBackToSearch = useCallback(() => {
    setView('search');
    setSongs([]);
    setSearchQuery('');
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1>🎵 LYRICS HUB</h1>
          <p className="tagline">Search and discover song lyrics instantly</p>
        </div>
      </header>

      <main className="app-main">
        {error && <ErrorMessage message={error} onClose={() => setError('')} />}
        {loading && <Loading />}

        {view === 'search' && !loading && (
          <SearchBar onSearch={handleSearch} initialQuery={searchQuery} />
        )}

        {view === 'results' && !loading && (
          <SongResults
            songs={songs}
            onSelectSong={handleSongSelect}
            onBackClick={handleBackToSearch}
            searchQuery={searchQuery}
          />
        )}

        {view === 'lyrics' && !loading && selectedSong && (
          <LyricsView
            song={selectedSong}
            lyrics={lyrics}
            onBackClick={handleBackToResults}
          />
        )}
      </main>

      <footer className="app-footer">
        <p>LYRICS HUB © 2026 | Music lyrics at your fingertips</p>
      </footer>
    </div>
  );
}

export default App;
