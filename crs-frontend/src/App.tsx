import { useEffect, useState } from 'react';
import { getCourses } from './api/courseApi';
import { PagedResponse, Course } from './types/course';
import axios from 'axios';
import { ApiErrorResponse } from './types/apiError';
import './App.css';

/**
 * App.tsx - PHIÊN BẢN TEST TẠM cho Buổi 5
 * Mục đích: test kết nối API, hiển thị JSON để xác nhận data
 * Sẽ được thay thế hoàn toàn bằng giao diện thật ở Buổi 6
 */
function App() {
  const [courses, setCourses] = useState<PagedResponse<Course> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getCourses();
        setCourses(data);
      } catch (err) {
        // Kiểm tra xem có phải lỗi Axios không, và trích xuất thông báo lỗi
        if (axios.isAxiosError<ApiErrorResponse>(err)) {
          if (err.response?.data?.message) {
            // Lỗi nghiệp vụ từ backend
            setError(`Lỗi backend: ${err.response.data.message}`);
          } else if (!err.response) {
            // Lỗi mạng - không nhận được response nào
            setError('Không kết nối được tới hệ thống. Vui lòng thử lại sau.');
          } else {
            // Lỗi khác
            setError(`Lỗi: ${err.message}`);
          }
        } else {
          // Lỗi không phải từ Axios
          setError('Lỗi không xác định xảy ra');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div style={styles.container}>
      <h1>CRS Frontend - Buổi 5 Test</h1>
      <p style={styles.subtitle}>
        Đây là phiên bản test tạm. Mục đích: kiểm tra kết nối API gateway
      </p>

      {loading && <p style={styles.loading}>Đang tải dữ liệu...</p>}

      {error && (
        <div style={styles.errorBox}>
          <strong>❌ Lỗi:</strong> {error}
        </div>
      )}

      {courses && (
        <div style={styles.responseBox}>
          <h3>✅ Phản hồi từ API:</h3>
          <pre style={styles.jsonPre}>
            {JSON.stringify(courses, null, 2)}
          </pre>
          <p style={styles.info}>
            Số khóa học: {courses.content.length} / Tổng cộng:{' '}
            {courses.totalElements}
          </p>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  } as React.CSSProperties,
  subtitle: {
    color: '#888',
    fontStyle: 'italic',
  } as React.CSSProperties,
  loading: {
    color: '#0066cc',
    fontSize: '16px',
    fontWeight: 'bold',
  } as React.CSSProperties,
  errorBox: {
    backgroundColor: '#ffcccc',
    border: '2px solid #ff0000',
    color: '#cc0000',
    padding: '15px',
    borderRadius: '5px',
    marginBottom: '20px',
  } as React.CSSProperties,
  responseBox: {
    backgroundColor: '#e6ffe6',
    border: '2px solid #00cc00',
    color: '#003300',
    padding: '15px',
    borderRadius: '5px',
    marginTop: '20px',
  } as React.CSSProperties,
  jsonPre: {
    backgroundColor: '#f0f0f0',
    border: '1px solid #ccc',
    padding: '10px',
    borderRadius: '3px',
    overflow: 'auto',
    maxHeight: '400px',
    fontSize: '12px',
  } as React.CSSProperties,
  info: {
    marginTop: '10px',
    fontSize: '14px',
    color: '#004400',
  } as React.CSSProperties,
};

export default App;
