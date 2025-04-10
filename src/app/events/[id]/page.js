// src/app/events/[id]/page.js
import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

export default function EventDetailPage({ params }) {
  // In a real app, you would fetch event details based on params.id
  const event = {
    id: params.id,
    title: `Event ${params.id}`,
    image: '/images/placeholder.jpg',
    description: 'This is a detailed event description. In a real application, this data would come from an API.',
    date: 'April 15, 2025',
    time: '7:00 PM',
    location: 'Main Theater',
    ticketPrice: '$20'
  };

  return (
    <main>
      <Container className="py-5">
        <Row>
          <Col md={4}>
            <img 
              src={event.image} 
              alt={event.title}
              className="img-fluid rounded" 
              style={{ width: '100%', maxHeight: '500px', objectFit: 'cover' }}
            />
          </Col>
          <Col md={8}>
            <h1>{event.title}</h1>
            <p className="lead">
              <strong>Date:</strong> {event.date} | <strong>Time:</strong> {event.time}
            </p>
            <p><strong>Location:</strong> {event.location}</p>
            <p><strong>Ticket Price:</strong> {event.ticketPrice}</p>
            <div className="my-4">
              <h3>Event Details</h3>
              <p>{event.description}</p>
            </div>
            <Button variant="primary" size="lg">Buy Tickets</Button>
          </Col>
        </Row>
      </Container>
    </main>
  );
}