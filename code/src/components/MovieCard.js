import React from 'react';

function MovieCard({ movie }) {
  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '1rem',
      margin: '0.5rem',
      width: '220px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      background: '#fff'
    }}>
      <img
        src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/100x150?text=No+Image'}
        alt={movie.Title}
        style={{ width: '100px', height: '150px', objectFit: 'cover', marginBottom: '1rem', borderRadius: '4px' }}
      />
      <strong style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{movie.Title}</strong>
      <span style={{ color: '#555' }}>{movie.Year}</span>
    </div>
  );
}

export default MovieCard;