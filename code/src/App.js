import React, { useState } from 'react';
import MovieCard from './components/MovieCard';
import MovieModal from './components/MovieModal';

const PAGE_SIZE = 10;

function App() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [recentSearches, setRecentSearches] = useState([]);

  const apiKey = process.env.REACT_APP_OMDB_API_KEY;

  const fetchMovies = async (searchQuery, pageNum = 1) => {
    setError('');
    setLoading(true);
    setMovies([]);
    setPage(pageNum);

    if (!searchQuery.trim()) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(searchQuery)}&page=${pageNum}`
      );
      const data = await response.json();
      if (data.Response === "False") {
        setError(data.Error || "No movies found.");
        setMovies([]);
        setTotalResults(0);
      } else {
        setMovies(data.Search);
        setTotalResults(parseInt(data.totalResults, 10));
        setRecentSearches(prev => [searchQuery, ...prev.filter(q => q !== searchQuery)].slice(0, 5));
      }
    } catch (err) {
      setError('Failed to fetch movies. Please try again.');
    }
    setLoading(false);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    fetchMovies(query, 1);
  };

  const handlePageChange = async (newPage) => {
    setPage(newPage);
    fetchMovies(query, newPage);
  };

  const handleClear = () => {
    setQuery('');
    setMovies([]);
    setError('');
    setPage(1);
    setTotalResults(0);
    setSelectedMovie(null);
  };

  return (
    <div style={{
      padding: '2rem',
      fontFamily: 'Arial, sans-serif',
      background: '#f7f7f7',
      minHeight: '100vh',
      maxWidth: '900px',
      margin: '0 auto'
    }}>
      <h1 style={{ textAlign: 'center' }}>Movie Search App</h1>
      <form onSubmit={handleSearch} style={{ marginBottom: '1rem', textAlign: 'center', display: 'flex', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search for a movie..."
          style={{ padding: '0.5rem', width: '250px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <button type="submit" style={{ padding: '0.5rem 1rem', borderRadius: '4px', background: '#007bff', color: '#fff', border: 'none' }}>Search</button>
        <button type="button" onClick={handleClear} style={{ padding: '0.5rem 1rem', borderRadius: '4px', background: '#6c757d', color: '#fff', border: 'none' }}>Clear</button>
      </form>
      {recentSearches.length > 0 && (
        <div style={{ marginBottom: '1rem', textAlign: 'center' }}>
          <strong>Recent Searches:</strong>
          {recentSearches.map((item, idx) => (
            <button
              key={idx}
              style={{ margin: '0 0.25rem', padding: '0.25rem 0.5rem', borderRadius: '4px', border: '1px solid #ccc', background: '#fff', cursor: 'pointer' }}
              onClick={() => {
                setQuery(item);
                fetchMovies(item, 1);
                setSelectedMovie(null);
              }}
            >
              {item}
            </button>
          ))}
        </div>
      )}
      {loading && (
        <div style={{ textAlign: 'center', color: '#007bff', marginBottom: '1rem' }}>
          Loading...
        </div>
      )}
      {error && (
        <div style={{ textAlign: 'center', color: 'red', marginBottom: '1rem' }}>
          {error}
        </div>
      )}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '1rem'
      }}>
        {movies.map(movie => (
          <MovieCard key={movie.imdbID} movie={movie} onClick={() => setSelectedMovie(movie)} />
        ))}
      </div>
      {/* Pagination */}
      {totalResults > PAGE_SIZE && (
        <div style={{ textAlign: 'center', margin: '2rem 0' }}>
          <button
            disabled={page === 1}
            onClick={() => handlePageChange(page - 1)}
            style={{ marginRight: '1rem', padding: '0.5rem 1rem', borderRadius: '4px', border: '1px solid #ccc', background: page === 1 ? '#eee' : '#fff' }}
          >
            Prev
          </button>
          <span>Page {page} of {Math.ceil(totalResults / PAGE_SIZE)}</span>
          <button
            disabled={page === Math.ceil(totalResults / PAGE_SIZE)}
            onClick={() => handlePageChange(page + 1)}
            style={{ marginLeft: '1rem', padding: '0.5rem 1rem', borderRadius: '4px', border: '1px solid #ccc', background: page === Math.ceil(totalResults / PAGE_SIZE) ? '#eee' : '#fff' }}
          >
            Next
          </button>
        </div>
      )}
      {/* Movie Details Modal */}
      {selectedMovie && (
        <MovieModal imdbID={selectedMovie.imdbID} onClose={() => setSelectedMovie(null)} />
      )}
    </div>
  );
}

export default App;