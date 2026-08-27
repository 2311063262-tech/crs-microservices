import React, { useState } from 'react';
import { getRandomJoke } from '../api/jokeApi';

/**
 * JokeGenerator component - random joke generator voi external API
 * 
 * Chuc nang:
 * - Goi getRandomJoke() de lay tro cuoi random
 * - Hien thi loading state khi dang tai
 * - Hien thi joke sau khi nhan response
 * - Xu ly loi va hien thi thong bao
 * - Co nut "Tro cuoi khac" de lay tro cuoi moi
 */
const JokeGenerator: React.FC = () => {
  const [joke, setJoke] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [jokeCount, setJokeCount] = useState<number>(0);

  /**
   * Fetch random joke tu API
   */
  const handleGetJoke = async () => {
    setLoading(true);
    setError(null);
    setJoke('');

    try {
      const result = await getRandomJoke();

      if (result.success) {
        setJoke(result.text);
        setJokeCount((prev) => prev + 1);
      } else {
        setError(result.text);
      }
    } catch (err) {
      setError('Co loi xay ra. Vui long thu lai sau.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>😂 Random Joke Generator</h2>
        <p style={styles.subtitle}>
          Nhan nut duoi de lay tro cuoi random tu JokeAPI
        </p>

        {/* Joke Display */}
        <div style={styles.jokeBox}>
          {loading && (
            <p style={styles.loadingText}>⏳ Dang tai tro cuoi...</p>
          )}

          {error && (
            <p style={styles.errorText}>❌ {error}</p>
          )}

          {joke && !loading && (
            <p style={styles.jokeText}>{joke}</p>
          )}

          {!joke && !loading && !error && (
            <p style={styles.placeholderText}>
              Nhan nut "Tro cuoi moi" de bat dau!
            </p>
          )}
        </div>

        {/* Stats */}
        {jokeCount > 0 && (
          <p style={styles.statsText}>
            📊 Ban da xem {jokeCount} tro cuoi
          </p>
        )}

        {/* Button */}
        <button
          style={{
            ...styles.button,
            opacity: loading ? 0.6 : 1,
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
          onClick={handleGetJoke}
          disabled={loading}
        >
          {loading ? '⏳ Dang tai...' : '😂 Tro cuoi moi'}
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f0f4f8',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  } as React.CSSProperties,
  card: {
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    padding: '40px',
    maxWidth: '600px',
    width: '100%',
    textAlign: 'center' as const,
  },
  title: {
    margin: '0 0 10px 0',
    fontSize: '28px',
    color: '#333',
  },
  subtitle: {
    margin: '0 0 30px 0',
    fontSize: '14px',
    color: '#777',
    fontStyle: 'italic',
  },
  jokeBox: {
    backgroundColor: '#f9f9f9',
    border: '2px solid #e0e0e0',
    borderRadius: '8px',
    padding: '30px 20px',
    marginBottom: '25px',
    minHeight: '120px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  } as React.CSSProperties,
  jokeText: {
    fontSize: '16px',
    color: '#333',
    lineHeight: '1.6',
    margin: 0,
    whiteSpace: 'pre-wrap',
  } as React.CSSProperties,
  loadingText: {
    fontSize: '16px',
    color: '#0066cc',
    fontWeight: 'bold',
    margin: 0,
  } as React.CSSProperties,
  errorText: {
    fontSize: '16px',
    color: '#cc0000',
    margin: 0,
  } as React.CSSProperties,
  placeholderText: {
    fontSize: '16px',
    color: '#999',
    margin: 0,
    fontStyle: 'italic',
  } as React.CSSProperties,
  statsText: {
    fontSize: '13px',
    color: '#0066cc',
    marginBottom: '15px',
  } as React.CSSProperties,
  button: {
    padding: '12px 30px',
    fontSize: '16px',
    fontWeight: 'bold',
    backgroundColor: '#0066cc',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  } as React.CSSProperties,
};

export default JokeGenerator;
