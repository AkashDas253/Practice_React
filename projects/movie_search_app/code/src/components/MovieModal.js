import React, { useEffect, useState } from 'react';

const PLACEHOLDER_IMG = process.env.PUBLIC_URL + '/placeholder/no_image.svg';

function MovieModal({ imdbID, onClose }) {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchDetails() {
      setLoading(true);
      setError('');
      try {
        const apiKey = process.env.REACT_APP_OMDB_API_KEY;
        const res = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}&plot=full`);
        const data = await res.json();
        if (data.Response === "False") {
          setError(data.Error || "No details found.");
          setDetails(null);
        } else {
          setDetails(data);
        }
      } catch {
        setError('Failed to fetch details.');
        setDetails(null);
      }
      setLoading(false);
    }
    fetchDetails();
  }, [imdbID]);

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        background: '#fff',
        borderRadius: '8px',
        padding: '2rem',
        maxWidth: '400px',
        width: '90%',
        boxShadow: '0 2px 16px rgba(0,0,0,0.2)',
        position: 'relative'
      }}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'transparent',
            border: 'none',
            fontSize: '1.5rem',
            cursor: 'pointer'
          }}
        >
          &times;
        </button>
        {loading ? (
          <div style={{ textAlign: 'center' }}>Loading...</div>
        ) : error ? (
          <div style={{ textAlign: 'center', color: 'red' }}>{error}</div>
        ) : (
          <>
            <img
              src={details.Poster !== 'N/A' ? details.Poster : PLACEHOLDER_IMG}
              alt={details.Title}
              style={{
                width: '100px',
                height: '150px',
                objectFit: 'cover',
                borderRadius: '4px',
                marginBottom: '1rem',
                display: 'block',
                marginLeft: 'auto',
                marginRight: 'auto'
              }}
            />
            <h2 style={{ textAlign: 'center' }}>{details.Title}</h2>
            <p><strong>Year:</strong> {details.Year}</p>
            <p><strong>Genre:</strong> {details.Genre}</p>
            <p><strong>Actors:</strong> {details.Actors}</p>
            <p><strong>Plot:</strong> {details.Plot}</p>
            <p><strong>IMDB Rating:</strong> {details.imdbRating}</p>
          </>
        )}
      </div>
    </div>
  );
}

export default MovieModal;