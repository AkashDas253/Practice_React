import React, { useState } from 'react';
import MovieCard from './components/MovieCard';

function App() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false); // Add loading state

  const handleSearch = async (e) => {
    e.preventDefault();
    const apiKey = process.env.REACT_APP_OMDB_API_KEY;
    if (!apiKey) {
      alert('API key not found. Please set REACT_APP_OMDB_API_KEY in your .env file.');
      return;
    }
    if (!query.trim()) {
      setMovies([]);
      return;
    }
    setLoading(true); // Start loading
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(query)}`
      );
      const data = await response.json();
      setMovies(data.Search || []);
    } catch (error) {
      setMovies([]);
    }
    setLoading(false); // End loading
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif', background: '#f7f7f7', minHeight: '100vh' }}>
      <h1 style={{ textAlign: 'center' }}>Movie Search App</h1>
      <form onSubmit={handleSearch} style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search for a movie..."
          style={{ padding: '0.5rem', width: '250px', marginRight: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <button type="submit" style={{ padding: '0.5rem 1rem', borderRadius: '4px', background: '#007bff', color: '#fff', border: 'none' }}>Search</button>
      </form>
      {loading && (
        <div style={{ textAlign: 'center', color: '#007bff', marginBottom: '1rem' }}>
          Loading...
        </div>
      )}
      {movies.length === 0 && query && !loading && (
        <div style={{ textAlign: 'center', color: '#888' }}>No movies found.</div>
      )}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '1rem'
      }}>
        {movies.map(movie => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default App;