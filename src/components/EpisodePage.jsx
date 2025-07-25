import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Spinner, Button } from 'react-bootstrap';
import { useUser } from '../context/UserContext';
import './EpisodePage.css';

function EpisodePage() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useUser(); // ✅ use logged-in user

  useEffect(() => {
    fetch('http://localhost:5000/api/videos')
      .then(res => res.json())
      .then(data => {
        const ep = parseInt(id);
        const file = data[ep - 1];
        if (file) setVideo(file);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error:", err);
        setLoading(false);
      });
  }, [id]);

  // ✅ Send watch progress to backend when episode is loaded
  useEffect(() => {
    if (user && id) {
      fetch('http://localhost:5000/api/user/watch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sub: user.sub, episode: parseInt(id) })
      })
      .then(res => res.json())
      .then(data => console.log("✅ Watch progress saved:", data))
      .catch(err => console.error("❌ Watch save error:", err));
    }
  }, [user, id]);

  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" variant="light" />
        <p className="mt-2">Loading Episode {id}...</p>
      </div>
    );
  }

  if (!video) {
    return <div className="text-center mt-5 text-danger">❌ Episode {id} not found</div>;
  }

  return (
    <div className="text-center py-4 container">
      <h2 className="mb-3">🎬 Episode {id}: {video.title}</h2>

      <video
        width="80%"
        height="auto"
        controls
        style={{ maxWidth: '900px', borderRadius: '12px' }}
      >
        <source src={video.url} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="options">
        <div className="mt-4">
          <a href={video.url} download>
            <Button variant="success">⬇️ Download Episode</Button>
          </a>
        </div>
        <div className="mt-4">
          <Link to="/" className="btn btn-outline-light">← Back to Episode List</Link>
        </div>
      </div>
    </div>
  );
}

export default EpisodePage;
