import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [podcasts, setPodcasts] = useState([]);

  useEffect(() => {
    fetch('https://podcast-api.netlify.app/')
      .then(res => res.json())
      .then(data => setPodcasts(data))
      .catch(err => console.error('Error fetching podcasts:', err));
  }, []);

  return (
    <div className="app-wrapper">
      {/* 🌟 HEADER */}
      <header className="header">
        <div className="logo-section">
          <img src="/logo.png" alt="PodcastApp logo" className="app-logo" />
          <span className="app-name">PodcastApp</span>
        </div>
        <div className="header-actions">
          <button className="icon-btn"><img src="/face-icon.png" alt="Profile" /></button>
          <button className="icon-btn"><img src="/theme-toggle.png" alt="Toggle Theme" /></button>
          <button className="icon-btn"><img src="/heart-icon.png" alt="Favourites" /></button>
          <button className="icon-btn"><img src="/search-icon.png" alt="Search" /></button>
        </div>
      </header>

      {/* 🎙️ APP TITLE */}
      <h1 className="page-title">PodcastApp</h1>

      {/* 🔽 FILTERS */}
      <div className="filters-bar">
        <select className="filter-select">
          <option value="">Sort by: Recently Updated</option>
          <option value="">Alphabetically</option>
          <option value="">Most Popular</option>
        </select>

        <select className="filter-select">
          <option value="">All Genres</option>
          <option value="Tech">Technology</option>
          <option value="Business">Business</option>
          <option value="Crime">True Crime</option>
        </select>
      </div>

      {/* 🎧 PODCAST CARDS */}
      <div className="podcast-grid">
        {podcasts.map(podcast => (
          <div key={podcast.id} className="podcast-card">
            <img src={podcast.image} alt={podcast.title} className="podcast-image" />
            <h2 className="podcast-title">{podcast.title}</h2>
            <p className="podcast-info">
              Seasons: {podcast.seasons ?? 'N/A'} | Genre: {podcast.genre} | Updated: {podcast.updated}
            </p>
          </div>
        ))}
      </div>

      {/* 🧭 FOOTER */}
      <footer className="footer">
        <p>Connect with us:</p>
        <div className="social-icons">
          <a href="#"><img src="/twitter.svg" alt="Twitter" /></a>
          <a href="#"><img src="/instagram.svg" alt="Instagram" /></a>
          <a href="#"><img src="/linkedin.svg" alt="LinkedIn" /></a>
        </div>
      </footer>
    </div>
  );
}

export default App;




