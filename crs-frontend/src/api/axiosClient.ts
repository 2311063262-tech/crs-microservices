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
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor response - xử lý lỗi chung
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Có thể thêm xử lý chung cho lỗi ở đây nếu cần
    return Promise.reject(error);
  }
);

export default axiosClient;
