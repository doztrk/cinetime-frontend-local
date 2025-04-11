// src/app/movies/page.js
import React from 'react';
import { Container } from 'react-bootstrap';
import MovieList from '../../components/features/movies/MovieList';

export default function MoviesPage() {
  return (
    <main>
      <Container className='py-5'>
        <h1 className='text-center py-5'>Movies</h1>
        <MovieList />
      </Container>
    </main>
  );
}