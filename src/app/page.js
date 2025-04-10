// src/app/page.js
import React from 'react';
import MovieList from '../components/features/movies/MovieList';

export default function Home() {
  return (
    <main>
      <div className="container my-5">
        <h1>Welcome to Our Cinema</h1>
        <p>Discover the magic of movies</p>
        <MovieList />
      </div>
    </main>
  );
}