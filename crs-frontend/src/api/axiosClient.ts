import axios, { AxiosInstance } from 'axios';

/**
 * Axios client instance - day la NOI DUY NHAT khai bao baseURL
 * Toàn bộ API calls sau này dùng đường dẫn tương đối như /api/courses
 * không hardcode URL ở đâu khác
 */
const axiosClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor request - thêm token vào header nếu có
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('crs_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor response - xử lý lỗi chung (thêm xử lý 401/403)
// Nếu nhận 401/403: xóa crs_token + crs_user, redirect về /login
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const resp = error?.response;
    if (resp && (resp.status === 401 || resp.status === 403)) {
      try {
        localStorage.removeItem('crs_token');
        localStorage.removeItem('crs_user');
      } catch (e) {
        // ignore
      }
      // Force redirect to login page so app resets (use full reload)
      window.location.href = '/login';
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
