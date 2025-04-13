// src/components/features/movies/MovieList.jsx
import React from 'react';
import MovieCard from './MovieCard';
import { Col, Container, Row } from 'react-bootstrap';
import movies from "@/helpers/data/movies.json";

const MovieList = () => {
 

  return (
  
    <Container>
      <Row xs={1} md={2} lg={3} xl={4} className="g-4">
        {movies.map((item)=>(
          <Col key={item.id}>
            <MovieCard {...item}/>
         </Col>
        ))}
        
      </Row>
    </Container>
  );
};

export default MovieList;