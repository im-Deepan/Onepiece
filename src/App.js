import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TopNavbar from './components/Navbar';
import './App.css';
import SearchBar from './components/SearchBar';
import EpisodeGrid from './components/EpisodeGrid';
import EpisodePage from './components/EpisodePage';
import ProtectedRoute from './components/ProtectedRoute';
import { useUser } from './context/UserContext';

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const toggleDarkMode = () => setDarkMode(prev => !prev);
  const { user } = useUser(); // 👤 Get logged-in user
  const [lastWatched, setLastWatched] = useState(null);

  const handleEpisodeJump = (ep) => {
    const el = document.getElementById(`ep-${ep}`);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // 🔁 Fetch last watched episode if user is logged in
  useEffect(() => {
    if (user?.sub) {
      fetch(`http://localhost:5000/api/auth/user/${user.sub}`)
        .then(res => res.json())
        .then(data => {
          if (data?.user?.lastWatched) {
            setLastWatched(data.user.lastWatched);
          }
        })
        .catch(err => console.error("❌ Failed to fetch last watched:", err));
    }
  }, [user]);

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
          {/* 🎥 Protected Episode Page */}
          <Route
            path="/episode/:id"
            element={
              <ProtectedRoute>
                <EpisodePage />
              </ProtectedRoute>
            }
          />

          {/* 🏠 Home Page */}
          <Route
            path="/"
            element={
              <div className="container py-4 text-center">
                <h2 className="fw-bold">🍿 One Piece Episodes</h2>
                <p className="lead">Scroll or search to watch your favorite fight!</p>

                {/* ⏯️ Continue Watching Button */}
                {lastWatched && (
                  <div className="mb-3">
                    <Link to={`/episode/${lastWatched}`} className="btn btn-warning">
                      ⏯️ Continue from Episode {lastWatched}
                    </Link>
                  </div>
                )}

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
