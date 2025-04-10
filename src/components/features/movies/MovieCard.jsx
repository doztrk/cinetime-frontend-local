// src/components/features/movies/MovieCard.jsx
import React from 'react';

const MovieCard = ({ movie }) => {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{movie.title}</h5>
        <p className="card-text">Rating: {movie.rating}/5</p>
        <p className="card-text">{movie.description}</p>
        <a href={`/movies/${movie.id}`} className="btn btn-primary">View Details</a>
      </div>
    </div>
  );
};

export default MovieCard;