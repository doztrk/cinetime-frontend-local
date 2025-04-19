'use client';

import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
// The Header import should be removed

export default function MovieDetailPage({ params }) {
  const router = useRouter();
  
  // In a real app, you would fetch movie details based on params.id
  const movie = {
    id: params.id,
    title: `Movie ${params.id}`,
    poster: '/images/placeholder.jpg',
    description: 'This is a detailed movie description. In a real application, this data would come from an API.',
    rating: 4.5,
    director: 'Director Name',
    cast: ['Actor 1', 'Actor 2', 'Actor 3'],
    releaseDate: '2023-01-01',
    duration: '120 min'
  };

  const handleBuyTickets = () => {
    router.push(`/seat-selection?movieId=${params.id}`);
  };

  return (
    <main>
      {/* The <Header /> component should NOT be here */}
      <Container className="py-5">
        <Row>
          <Col md={4}>
            <img 
              src={movie.poster} 
              alt={movie.title}
              className="img-fluid rounded" 
              style={{ width: '100%', maxHeight: '500px', objectFit: 'cover' }}
            />
          </Col>
          <Col md={8}>
            <h1>{movie.title}</h1>
            <p className="lead">Rating: {movie.rating}/5</p>
            <p><strong>Director:</strong> {movie.director}</p>
            <p><strong>Cast:</strong> {movie.cast.join(', ')}</p>
            <p><strong>Release Date:</strong> {movie.releaseDate}</p>
            <p><strong>Duration:</strong> {movie.duration}</p>
            <div className="my-4">
              <h3>Synopsis</h3>
              <p>{movie.description}</p>
            </div>
            <Button 
              variant="primary" 
              size="lg"
              onClick={handleBuyTickets}
            >
              Buy Tickets
            </Button>
          </Col>
        </Row>
      </Container>
      {/* The <Footer /> component should NOT be here either */}
    </main>
  );
}
