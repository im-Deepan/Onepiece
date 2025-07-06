import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function EpisodeGrid() {
  const [rangeStart, setRangeStart] = useState(1);
  const rangeSize = 100;

  const handleNext = () => setRangeStart(prev => prev + rangeSize);
  const handlePrev = () => setRangeStart(prev => Math.max(1, prev - rangeSize));

  const episodes = Array.from({ length: rangeSize }, (_, i) => rangeStart + i);

  return (
    <div className="text-center my-4">
      <div className="d-flex flex-wrap justify-content-center gap-5 mb-3">
        {episodes.map((ep) => (
          <Link
            to={`/episode/${ep}`}
            key={ep}
            className="btn btn-outline-primary"
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '60%',
              fontWeight: 'bold',
              fontSize: '1.2rem',
              background: 'lightblue',
              padding: '14.5px',
              color: '#000',
              gap:'5px',
            }}
          >
            {ep}
          </Link>
        ))}
      </div>

      {/* Pagination Arrows */}
      <div className="d-flex justify-content-center gap-3 mt-3">
        <Button variant="dark" onClick={handlePrev} disabled={rangeStart === 1}>
          ◀️ Prev
        </Button>
        <Button variant="dark" onClick={handleNext}>
          Next ▶️
        </Button>
      </div>
    </div>
  );
}

export default EpisodeGrid;
