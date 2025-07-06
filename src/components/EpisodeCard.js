// src/components/EpisodeCard.js
import React from 'react';
import { Card } from '@mui/material';

function EpisodeCard({ number, onClick }) {
  return (
    <Card
      onClick={onClick}
      sx={{
        backgroundColor: '#b3e5fc',
        borderRadius: 2,
        textAlign: 'center',
        padding: 2,
        boxShadow: '0 0 5px #4caf50',
        cursor: 'pointer',
        fontWeight: 'bold',
        '&:hover': { backgroundColor: '#aee7ff' }
      }}
    >
      Episode {number}
    </Card>
  );
}

export default EpisodeCard;
