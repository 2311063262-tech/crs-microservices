import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import authApi from '../api/authApi';
import { useAuth } from '../context/AuthContext';
import { ApiErrorResponse } from '../types/apiError';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const response = await authApi.login({ username, password });
      login(response.data);
      navigate('/courses');
    } catch (err) {
      if (axios.isAxiosError<ApiErrorResponse>(err)) {
        setError(err.response?.data?.message || 'Dang nhap that bai, vui long thu lai.');
      } else {
        setError('Dang nhap that bai, vui long thu lai.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main style={styles.container}>
      <h1>Đăng nhập</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label>Tên đăng nhập<input value={username} onChange={(e) => setUsername(e.target.value)} required /></label>
        <label>Mật khẩu<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required /></label>
        {error && <p style={styles.error}>{error}</p>}
        <button type="submit" disabled={submitting}>{submitting ? 'Đang đăng nhập...' : 'Đăng nhập'}</button>
      </form>
    </main>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: { maxWidth: 420, margin: '40px auto', padding: 20 },
  form: { display: 'flex', flexDirection: 'column', gap: 16 },
  error: { color: '#c00' },
};

export default LoginPage;
