import { AxiosInstance } from 'axios';
import axios from 'axios';

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

// Interceptor request - giữ nguyên cơ chế thêm token hiện có.
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

// Chỉ hết phiên (401) mới tự động xóa thông tin đăng nhập và đưa về login.
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      localStorage.removeItem('crs_token');
      localStorage.removeItem('crs_user');

      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
