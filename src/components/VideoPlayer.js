import React from 'react';
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';

function VideoPlayer({ videos }) {
  const { id } = useParams();
  const video = videos[id];

  if (!video) return <Container><h4>Video not found</h4></Container>;

  return (
    <Container>
      <h3 className="mb-3">{video.title}</h3>
      <video width="100%" height="auto" controls>
        <source src={video.url} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </Container>
  );
}

export default VideoPlayer;
