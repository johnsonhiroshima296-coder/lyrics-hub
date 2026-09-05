import express from 'express';
import axios from 'axios';

const router = express.Router();
const LYRICS_API_BASE_URL = process.env.LYRICS_API_BASE_URL || 'https://api.lyrics.ovh';

// Search for songs
router.get('/songs', async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || q.trim().length === 0) {
      return res.status(400).json({ error: 'Search query is required' });
    }

    const response = await axios.get(`${LYRICS_API_BASE_URL}/suggest/${encodeURIComponent(q)}`);
    const data = response.data;

    res.json({
      success: true,
      query: q,
      results: data.data || [],
      count: (data.data || []).length
    });
  } catch (error) {
    console.error('Search error:', error.message);
    res.status(500).json({
      error: 'Failed to search songs',
      message: error.message
    });
  }
});

// Get autocomplete suggestions
router.get('/autocomplete', async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || q.trim().length < 2) {
      return res.status(400).json({ error: 'Query must be at least 2 characters' });
    }

    const response = await axios.get(`${LYRICS_API_BASE_URL}/suggest/${encodeURIComponent(q)}`);
    const data = response.data;
    
    // Return only first 10 suggestions
    const suggestions = (data.data || []).slice(0, 10).map(song => ({
      id: `${song.artist.name}-${song.title}`,
      title: song.title,
      artist: song.artist.name
    }));

    res.json({
      success: true,
      suggestions
    });
  } catch (error) {
    console.error('Autocomplete error:', error.message);
    res.status(500).json({
      error: 'Failed to get suggestions',
      message: error.message
    });
  }
});

export default router;
