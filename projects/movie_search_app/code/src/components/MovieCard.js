import React, { useState } from 'react';

const PLACEHOLDER_IMG = process.env.PUBLIC_URL + '/placeholder/no_image.svg';

function MovieCard({ movie, onClick }) {
  const [imgSrc, setImgSrc] = useState(movie.Poster !== 'N/A' ? movie.Poster : PLACEHOLDER_IMG);
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <div
      style={{
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '1rem',
        margin: '0.5rem',
        width: '220px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: '#fff',
        cursor: 'pointer' 
      }}
      onClick={onClick} 
    >
      {!imgLoaded && (
        <div style={{
          width: '100px',
          height: '150px',
          background: '#f5f5f5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '4px',
          marginBottom: '1rem'
        }}>
          <img
            src={PLACEHOLDER_IMG}
            alt="No poster"
            style={{
              width: '100px',
              height: '150px',
              objectFit: 'contain',
              opacity: 0.7
            }}
          />
        </div>
      )}
      <img
        src={imgSrc}
        alt={movie.Title}
        style={{
          width: '100px',
          height: '150px',
          objectFit: 'cover',
          marginBottom: '1rem',
          borderRadius: '4px',
          display: imgLoaded ? 'block' : 'none'
        }}
        onLoad={() => setImgLoaded(true)}
        onError={() => {
          setImgSrc(PLACEHOLDER_IMG);
          setImgLoaded(true);
        }}
      />
      <strong style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{movie.Title}</strong>
      <span style={{ color: '#555' }}>{movie.Year}</span>
    </div>
  );
}

export default MovieCard;