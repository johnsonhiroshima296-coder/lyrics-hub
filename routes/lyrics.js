import express from 'express';
import axios from 'axios';

const router = express.Router();
const LYRICS_API_BASE_URL = process.env.LYRICS_API_BASE_URL || 'https://api.lyrics.ovh';

// Get lyrics for a specific song
router.get('/get', async (req, res) => {
  try {
    const { artist, title } = req.query;

    if (!artist || !title) {
      return res.status(400).json({ 
        error: 'Both artist and title are required',
        example: '/api/lyrics/get?artist=The%20Beatles&title=Yesterday'
      });
    }

    const response = await axios.get(
      `${LYRICS_API_BASE_URL}/v1/${encodeURIComponent(artist)}/${encodeURIComponent(title)}`
    );

    const data = response.data;

    if (!data.lyrics) {
      return res.status(404).json({
        error: 'Lyrics not found',
        artist,
        title
      });
    }

    res.json({
      success: true,
      artist,
      title,
      lyrics: data.lyrics,
      fetchedAt: new Date()
    });
  } catch (error) {
    console.error('Lyrics fetch error:', error.message);
    
    if (error.response?.status === 404) {
      return res.status(404).json({
        error: 'Lyrics not found',
        artist: req.query.artist,
        title: req.query.title
      });
    }

    res.status(500).json({
      error: 'Failed to fetch lyrics',
      message: error.message
    });
  }
});

// Search within lyrics
router.post('/search', async (req, res) => {
  try {
    const { artist, title, keyword } = req.body;

    if (!artist || !title || !keyword) {
      return res.status(400).json({ 
        error: 'artist, title, and keyword are required'
      });
    }

    const response = await axios.get(
      `${LYRICS_API_BASE_URL}/v1/${encodeURIComponent(artist)}/${encodeURIComponent(title)}`
    );

    const data = response.data;

    if (!data.lyrics) {
      return res.status(404).json({
        error: 'Lyrics not found',
        artist,
        title
      });
    }

    // Search for keyword in lyrics
    const lyrics = data.lyrics;
    const linesWithKeyword = lyrics
      .split('\n')
      .map((line, index) => ({
        lineNumber: index + 1,
        text: line,
        match: line.toLowerCase().includes(keyword.toLowerCase())
      }))
      .filter(line => line.match);

    res.json({
      success: true,
      artist,
      title,
      keyword,
      matchCount: linesWithKeyword.length,
      matches: linesWithKeyword
    });
  } catch (error) {
    console.error('Search lyrics error:', error.message);
    res.status(500).json({
      error: 'Failed to search lyrics',
      message: error.message
    });
  }
});

export default router;
