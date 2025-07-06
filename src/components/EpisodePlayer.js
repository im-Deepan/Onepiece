import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';

const EpisodePlayer = () => {
  const { number } = useParams();
  const [videoUrl, setVideoUrl] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/videos')
      .then(res => res.json())
      .then(data => {
        const filename = data[number - 1]?.url;
        setVideoUrl(filename);
        setLoading(false);
      });
  }, [number]);

  if (loading) return <p className="text-center mt-5">Loading video...</p>;

  return (
    <Container className="text-center mt-4">
      <h2>Episode {number}</h2>
      <video width="640" controls className="mt-3 mb-4">
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <br />
      <Link to="/">
        <Button variant="secondary">🔙 Back to Episodes</Button>
      </Link>
    </Container>
  );
};

export default EpisodePlayer;
