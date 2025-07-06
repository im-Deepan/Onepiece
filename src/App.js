import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TopNavbar from './components/Navbar';
import './App.css';
import SearchBar from './components/SearchBar';
import EpisodeGrid from './components/EpisodeGrid';
import EpisodePage from './components/EpisodePage';

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const toggleDarkMode = () => setDarkMode(prev => !prev);

  const handleEpisodeJump = (ep) => {
    const el = document.getElementById(`ep-${ep}`);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Router>
      <div
        className={`app-wrapper ${darkMode ? 'dark' : 'light'}`}
        style={{
          backgroundImage: "url('/luffy-vs-kaido.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
          color: darkMode ? '#fff' : '#111',
        }}
      >
        <TopNavbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <Routes>
          {/* 🎥 Episode Player Page */}
          <Route path="/episode/:id" element={<EpisodePage />} />

          {/* 🏠 Home Page with Search + Grid */}
          <Route
            path="/"
            element={
              <div className="container py-4 text-center">
                <h2 className="fw-bold">🍿 One Piece Episodes</h2>
                <p className="lead">Scroll or search to watch your favorite fight!</p>
                <SearchBar onSearch={handleEpisodeJump} />
                <EpisodeGrid onEpisodeClick={handleEpisodeJump} />
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
