// API Configuration
const API_CONFIG = {
    GENIUS_API: 'https://api.genius.com',
    LYRICS_API: 'https://api.lyrics.dev/api/lyrics',
    // Using a fallback lyrics API
};

// DOM Elements
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const backBtn = document.getElementById('backBtn');
const loadingSection = document.getElementById('loadingSection');
const errorSection = document.getElementById('errorSection');
const errorMessage = document.getElementById('errorMessage');
const resultsSection = document.getElementById('resultsSection');
const songResults = document.getElementById('songResults');
const lyricsSection = document.getElementById('lyricsSection');
const lyricsContent = document.getElementById('lyricsContent');

// Event Listeners
searchBtn.addEventListener('click', handleSearch);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSearch();
});
backBtn.addEventListener('click', () => {
    lyricsSection.style.display = 'none';
    resultsSection.style.display = 'block';
});

// Main Search Handler
async function handleSearch() {
    const query = searchInput.value.trim();
    
    if (!query) {
        showError('Please enter a song title or artist name');
        return;
    }

    showLoading();
    hideError();
    hideResults();
    hideLyrics();

    try {
        const results = await searchSongs(query);
        if (results.length > 0) {
            displayResults(results);
        } else {
            showError('No songs found. Try a different search term.');
        }
    } catch (error) {
        console.error('Search error:', error);
        showError('Error searching songs. Please try again.');
    } finally {
        hideLoading();
    }
}

// Search Songs using Genius API
async function searchSongs(query) {
    try {
        // Using a free alternative approach with lyrics.ovh API
        const response = await fetch(`https://api.lyrics.ovh/suggest/${encodeURIComponent(query)}`);
        const data = await response.json();
        return data.data || [];
    } catch (error) {
        console.error('Fetch error:', error);
        return [];
    }
}

// Display Search Results
function displayResults(results) {
    songResults.innerHTML = '';
    
    results.slice(0, 12).forEach((song) => {
        const card = document.createElement('div');
        card.className = 'song-card';
        card.innerHTML = `
            <h3>${sanitizeHtml(song.title || 'Unknown Title')}</h3>
            <p class="artist">🎤 ${sanitizeHtml(song.artist.name || 'Unknown Artist')}</p>
            <p><small>${song.artist.name}</small></p>
        `;
        card.addEventListener('click', () => {
            fetchAndDisplayLyrics(song.artist.name, song.title);
        });
        songResults.appendChild(card);
    });
    
    resultsSection.style.display = 'block';
}

// Fetch and Display Lyrics
async function fetchAndDisplayLyrics(artist, title) {
    showLoading();
    resultsSection.style.display = 'none';
    lyricsSection.style.display = 'none';

    try {
        const lyrics = await getLyrics(artist, title);
        
        if (lyrics) {
            const lyricsHTML = `
                <div class="lyrics-header">
                    <h2>${sanitizeHtml(title)}</h2>
                    <p>by ${sanitizeHtml(artist)}</p>
                </div>
                <div class="lyrics-content">${sanitizeHtml(lyrics)}</div>
            `;
            lyricsContent.innerHTML = lyricsHTML;
            lyricsSection.style.display = 'block';
        } else {
            showError('Lyrics not found for this song. Try searching for another song.');
            resultsSection.style.display = 'block';
        }
    } catch (error) {
        console.error('Lyrics fetch error:', error);
        showError('Error fetching lyrics. Please try again.');
        resultsSection.style.display = 'block';
    } finally {
        hideLoading();
    }
}

// Get Lyrics from API
async function getLyrics(artist, title) {
    try {
        // Using lyrics.ovh API
        const response = await fetch(
            `https://api.lyrics.ovh/v1/${encodeURIComponent(artist)}/${encodeURIComponent(title)}`
        );
        
        if (!response.ok) {
            return null;
        }
        
        const data = await response.json();
        return data.lyrics || null;
    } catch (error) {
        console.error('Error fetching lyrics:', error);
        return null;
    }
}

// Utility Functions
function showLoading() {
    loadingSection.style.display = 'flex';
}

function hideLoading() {
    loadingSection.style.display = 'none';
}

function showError(message) {
    errorMessage.textContent = message;
    errorSection.style.display = 'block';
}

function hideError() {
    errorSection.style.display = 'none';
}

function hideResults() {
    resultsSection.style.display = 'none';
}

function hideLyrics() {
    lyricsSection.style.display = 'none';
}

function sanitizeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Focus on search input on page load
window.addEventListener('load', () => {
    searchInput.focus();
});