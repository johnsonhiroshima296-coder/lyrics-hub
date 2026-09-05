# 🎵 LYRICS HUB

A beautiful, responsive web application to search and discover song lyrics instantly!

## Features

✨ **Key Features:**
- 🔍 **Quick Song Search** - Search by song title or artist name
- 📱 **Fully Responsive** - Works seamlessly on desktop, tablet, and mobile
- 🎨 **Beautiful UI** - Modern gradient design with smooth animations
- ⚡ **Fast Performance** - Instant search results and lyrics loading
- 🎯 **Easy Navigation** - Intuitive interface for easy browsing
- 💫 **Smooth Animations** - Engaging transitions and effects

## How to Use

1. **Clone the repository**
   ```bash
   git clone https://github.com/johnsonhiroshima296-coder/lyrics-hub.git
   cd lyrics-hub
   ```

2. **Open the app**
   - Simply open `index.html` in your web browser
   - Or use a local server:
     ```bash
     python -m http.server 8000
     # Then navigate to http://localhost:8000
     ```

3. **Search for lyrics**
   - Enter a song title or artist name in the search box
   - Click the search button or press Enter
   - Click on any song result to view the lyrics
   - Use the back button to return to search results

## Project Structure

```
lyrics-hub/
├── index.html      # Main HTML file
├── styles.css      # Styling and animations
├── script.js       # JavaScript logic and API integration
└── README.md       # This file
```

## Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with gradients and animations
- **JavaScript (ES6+)** - Dynamic functionality
- **Lyrics.ovh API** - Free lyrics database

## API Used

This app uses the **[Lyrics.ovh API](https://lyrics.ovh/)** for fetching song lyrics and suggestions.

### API Endpoints:
- `GET https://api.lyrics.ovh/suggest/{query}` - Suggest songs based on query
- `GET https://api.lyrics.ovh/v1/{artist}/{title}` - Fetch lyrics for a specific song

## Browser Support

- Chrome/Chromium (Latest)
- Firefox (Latest)
- Safari (Latest)
- Edge (Latest)

## Features Explained

### Search Functionality
- Type any song title or artist name
- Get instant suggestions from our lyrics database
- See results displayed in an attractive card grid

### Lyrics Display
- Clean, readable lyrics formatting
- Song title and artist information
- Line-by-line lyrics with proper spacing
- Smooth transitions between pages

### Responsive Design
- Adapts to all screen sizes
- Touch-friendly buttons and inputs
- Optimized mobile experience

## Future Enhancements

- 🎵 Favorite songs functionality
- 💾 Local storage for search history
- 🌙 Dark mode toggle
- 🎤 Karaoke mode
- 📊 Popular songs/trending section
- 🔗 Share lyrics on social media
- 🎼 Display music metadata (album, release date)

## Known Limitations

- Lyrics availability depends on the Lyrics.ovh API database
- Some songs may not have lyrics available
- API rate limiting may apply for heavy usage

## Contributing

Contributions are welcome! Feel free to:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is open source and available under the MIT License.

## Support

If you encounter any issues or have suggestions, please open an issue on GitHub.

## Author

Created by [johnsonhiroshima296-coder](https://github.com/johnsonhiroshima296-coder)

---

**Enjoy discovering song lyrics with LYRICS HUB!** 🎵✨