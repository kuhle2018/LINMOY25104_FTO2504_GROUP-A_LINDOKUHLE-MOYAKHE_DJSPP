import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [podcasts, setPodcasts] = useState([]);
  const [theme, setTheme] = useState('dark');
  const [selectedPodcast, setSelectedPodcast] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    fetch('https://podcast-api.netlify.app/')
      .then(res => res.json())
      .then(data => setPodcasts(data))
      .catch(err => console.error('Fetch error:', err));
  }, []);

  const handleToggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const openModal = (podcast) => {
    setSelectedPodcast(podcast);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedPodcast(null);
    setIsModalOpen(false);
  };

  const openSearch = () => setIsSearchOpen(true);
  const closeSearch = () => setIsSearchOpen(false);

  return (
    <div className="app-wrapper">
      {/* 🌟 HEADER */}
      <header className="header">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDWC5SM8O6vu0ymMG_8DTiA203Uqva4v-lhg&s"
          alt="Podcast App Logo"
          className="header-logo"
        />
        <h1>Podcast App</h1>
        <div className="header-right">
          <div id="search" onClick={openSearch}>🔍</div>
          <input id="search-input" type="text" placeholder="Search podcasts..." />
          <img
            src="https://img.freepik.com/premium-vector/woman-profile-icon-with-voice-waves-symbol-podcast-audiobook-with-female-head-audio-translator_653980-388.jpg?w=360"
            alt="User"
            className="user-face"
          />
          <button className="theme-toggle-btn" onClick={handleToggleTheme}>
            <img src="/theme-icon.png" alt="Toggle theme" />
          </button>
          <button className="icon-btn">
            <img src="/heart-icon.png" alt="Favorites" />
          </button>
        </div>
      </header>

      {/* 🔽 FILTERS */}
      <div className="filters">
        <label htmlFor="genre-select">Filter by:</label>
        <select id="genre-select" className="genre-dropdown">
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

        <select id="sort-select" className="recent-dropdown">
          <option>Recently Updated</option>
          <option>Most Popular</option>
          <option>Newest</option>
          <option>Oldest</option>
          <option>A-Z</option>
          <option>Z-A</option>
        </select>
      </div>

      {/* 🎧 PODCAST GRID */}
      <main>
        <div id="podcast-container" className="podcast-grid">
          {podcasts.map((podcast) => (
            <div
              key={podcast.id}
              className="podcast-card"
              onClick={() => openModal(podcast)}
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

      {/* 🧩 PODCAST MODAL */}
      {isModalOpen && selectedPodcast && (
        <div className="modal" id="podcast-modal">
          <div className="modal-content">
            <span className="close-btn" onClick={closeModal}>&times;</span>
            <div className="modal-header">
              <h2>{selectedPodcast.title}</h2>
            </div>
            <div className="modal-body">
              <div className="modal-cover">
                <img src={selectedPodcast.image} alt="Podcast Cover" />
              </div>
              <div className="modal-info">
                <div className="modal-description">
                  <h3>Description</h3>
                  <p>{selectedPodcast.description || 'No description available'}</p>
                </div>
                <div className="modal-genres">
                  <h4>Genres</h4>
                  <div className="genres-list">{selectedPodcast.genre}</div>
                  <div className="modal-updated">
                    <span>
                      📅 Last updated: {selectedPodcast.updated}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-seasons">
              <h3>Seasons</h3>
              <div className="season-list">
                {selectedPodcast.seasons ?? 'N/A'}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 🔎 SEARCH MODAL */}
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

      {/* 🚀 FOOTER */}
      <footer className="footer">
        <div className="footer-content">
          <span>&copy; 2025 Podcast App. All rights reserved.</span>
          <span>Created by Lindokuhle Moyakhe</span>
        </div>
        <div className="footer-social">
          <a
            href="https://www.facebook.com/lindokuhle.moyakhe"
            target="_blank"
            aria-label="Facebook"
          >
            <img
              src="https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/facebook.svg"
              alt="facebook"
              height="40"
            />
          </a>
          <a
            href="https://github.com/kuhle2018"
            target="_blank"
            aria-label="Github"
          >
            <img
              src="https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/github.svg"
              alt="github"
              height="40"
            />
          </a>
          <a
            href="https://www.linkedin.com/in/lindokuhle-moyakhe-60366125/"
            target="_blank"
            aria-label="linkedin"
          >
            <img
              src="https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/linkedin.svg"
              alt="linkedin"
              height="40"
            />
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;

