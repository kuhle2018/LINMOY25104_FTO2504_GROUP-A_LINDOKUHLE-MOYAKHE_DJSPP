 import './App.css';
import { useEffect, useState } from 'react';
import ThemeToggle from "./components/ThemeToggle";

function App() {
  const [podcasts, setPodcasts] = useState([]);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark";
  });

  // ✅ Here's the hardcoded mockPodcast for modal testing
  const mockPodcast = {
    title: "Hardcoded Podcast",
    image: "https://via.placeholder.com/300x300.png?text=Podcast+Image",
    description: "This is a mock description.",
    genre: "Technology",
    updated: "2025-07-25",
    seasons: ["Season 1", "Season 2"]
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    fetch('https://podcast-api.netlify.app/')
      .then(res => res.json())
      .then(data => setPodcasts(data))
      .catch(err => console.error('Fetch error:', err));
  }, []);

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleToggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const openSearch = () => setIsSearchOpen(true);
  const closeSearch = () => setIsSearchOpen(false);

  return (
    <div className="app-wrapper">
      {/* HEADER */}
      <header className="header">
        <div className="logo-section">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDWC5SM8O6vu0ymMG_8DTiA203Uqva4v-lhg&s"
            alt="Podcast App Logo"
            className="app-logo"
          />
          <span className="app-name">Podcast App</span>
        </div>
        <div className="header-actions">
          <div id="search" onClick={openSearch} className="icon-btn">🔍</div>
          <img
            src="https://img.freepik.com/premium-vector/woman-profile-icon-with-voice-waves-symbol-podcast-audiobook-with-female-head-audio-translator_653980-388.jpg?w=360"
            alt="User"
            className="user-face"
          />
          <ThemeToggle toggleTheme={handleToggleTheme} />
          <button className="icon-btn">
            <img
              src="https://cdn-icons-png.flaticon.com/512/833/833472.png"
              alt="Heart Icon"
            />
          </button>
        </div>
      </header>

      {/* FILTERS */}
      <div className="filters-bar">
        <select id="genre-select" className="filter-select">
          <option>All Genres</option>
          <option>Comedy</option>
          <option>News</option>
          <option>Sports</option>
          <option>Music</option>
          <option>Technology</option>
          <option>Business</option>
          <option>Education</option>
          <option>Health</option>
          <option>True Crime</option>
          <option>Society & Culture</option>
          <option>History</option>
          <option>Kids & Family</option>
          <option>Science</option>
          <option>TV & Film</option>
        </select>
        <select id="sort-select" className="filter-select">
          <option>Recently Updated</option>
          <option>Most Popular</option>
          <option>Newest</option>
          <option>Oldest</option>
          <option>A-Z</option>
          <option>Z-A</option>
        </select>
      </div>

      {/* PODCAST GRID */}
      <main>
        <div id="podcast-container" className="podcast-grid">
          {podcasts.map((podcast) => (
            <div
              key={podcast.id}
              className="podcast-card"
              onClick={openModal}
            >
              <img src={podcast.image} alt={podcast.title} className="podcast-image" />
              <h2 className="podcast-title">{podcast.title}</h2>
              <p className="podcast-info">
                Genre: {podcast.genre} | Updated: {podcast.updated}
              </p>
            </div>
          ))}
        </div>
      </main>

      {/* MODAL */}
      {isModalOpen && (
        <div className="modal" id="podcast-modal">
          <div className="modal-content">
            <span className="close-btn" onClick={closeModal}>&times;</span>
            <div className="modal-header">
              <h2>{mockPodcast.title}</h2>
            </div>
            <div className="modal-body">
              <img src={mockPodcast.image} alt="Podcast Cover" />
              <div className="modal-description">
                <h3>Description</h3>
                <p>{mockPodcast.description}</p>
              </div>
              <div className="modal-genres">
                <h4>Genres</h4>
                <p>{mockPodcast.genre}</p>
              </div>
              <div className="modal-updated">
                <span>📅 Last updated: {mockPodcast.updated}</span>
              </div>
              <audio controls style={{ marginTop: '1rem' }}>
                <source src="https://podcast-api.netlify.app/placeholder-audio.mp3" type="audio/mpeg" />
              </audio>
            </div>
            <div className="modal-seasons">
              <h3>Seasons</h3>
              <div>{mockPodcast.seasons.join(', ')}</div>
            </div>
          </div>
        </div>
      )}

      {/* SEARCH MODAL */}
      {isSearchOpen && (
        <div className="modal" id="search-modal">
          <div className="modal-content" style={{ maxWidth: '400px' }}>
            <span className="close-btn" onClick={closeSearch}>&times;</span>
            <h2>Search Podcasts</h2>
            <input
              id="modal-search-input"
              type="text"
              placeholder="Type to search..."
              style={{ width: '100%', padding: '10px', fontSize: '1.1em' }}
            />
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-content">
          <span>&copy; 2025 Podcast App. All rights reserved.</span>
          <span>Created by Lindokuhle Moyakhe</span>
        </div>
        <div className="social-icons">
          <a href="https://facebook.com/lindokuhle.moyakhe" target="_blank">
            <img src="https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/facebook.svg" alt="Facebook" />
          </a>
          <a href="https://github.com/kuhle2018" target="_blank">
            <img src="https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/github.svg" alt="GitHub" />
          </a>
          <a href="https://linkedin.com/in/lindokuhle-moyakhe-60366125" target="_blank">
            <img src="https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/linkedin.svg" alt="LinkedIn" />
          </a>
        </div>
        <div style={{ marginTop: '2rem' }}>
          <audio controls>
            <source src="https://podcast-api.netlify.app/placeholder-audio.mp3" type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      </footer>
    </div>
  );
}

export default App;

