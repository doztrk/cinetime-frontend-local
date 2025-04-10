// src/components/features/movies/MovieList.jsx
import React from 'react';
import MovieCard from './MovieCard';

const MovieList = () => {
  const movies = [
    {
      id: 1,
      title: "Movie Title 1",
      description: "This is a movie description",
      rating: 4.5
    },
    {
      id: 2,
      title: "Movie Title 2",
      description: "This is another movie description",
      rating: 4.7
    }
  ];

  return (
    <div className="row">
      {movies.map(movie => (
        <div key={movie.id} className="col-md-4 mb-4">
          <MovieCard movie={movie} />
        </div>
      ))}
    </div>
  );
};

export default MovieList;