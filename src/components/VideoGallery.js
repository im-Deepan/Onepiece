import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const VideoGallery = ({ videos }) => {
  return (
    <Container className="my-4">
      <Row >
        {videos.map((video, index) => (
          <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <div className="card shadow-sm">
              <video width="100%" controls>
                <source src={video.url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="p-2 text-center fw-bold">{video.title}</div>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default VideoGallery;
