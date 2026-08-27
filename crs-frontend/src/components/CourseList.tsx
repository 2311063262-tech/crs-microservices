import React from 'react';
import { Course } from '../types/course';

type CourseState = 'loading' | 'success' | 'empty' | 'error';

interface CourseListProps {
  courses: Course[];
  state: CourseState;
  errorMessage: string | null;
  onRetry: () => void; // Ham goi lai khi user bam "Thu lai"
}

/**
 * CourseList component - THUAN HIEN THI (khong tu goi API)
 * 
 * Logic 4 trang thai:
 * 1. loading: hien thi "Dang tai danh sach mon hoc..."
 * 2. error: hien thi errorMessage + nut "Thu lai" goi onRetry
 * 3. empty: hien thi "Khong tim thay mon hoc nao phu hop."
 * 4. success: hien thi bang voi cot Tên môn học / Số tín chỉ / Số chỗ còn lại
 *    - Co to mau do o "So cho con lai" neu gia tri = 0 (het cho)
 * 
 * @param courses - danh sach khoa hoc
 * @param state - trang thai hien tai (loading/success/empty/error)
 * @param errorMessage - thong bao loi (neu state=error)
 * @param onRetry - callback goi khi user bam nut "Thu lai"
 */
const CourseList: React.FC<CourseListProps> = ({
  courses,
  state,
  errorMessage,
  onRetry,
}) => {
  // Trang thai LOADING
  if (state === 'loading') {
    return (
      <div style={styles.messageContainer}>
        <p style={styles.loadingText}>⏳ Đang tải danh sách môn học...</p>
      </div>
    );
  }

  // Trang thai ERROR
  if (state === 'error') {
    return (
      <div style={styles.errorContainer}>
        <p style={styles.errorText}>❌ Lỗi: {errorMessage}</p>
        <button style={styles.retryButton} onClick={onRetry}>
          🔄 Thử lại
        </button>
      </div>
    );
  }

  // Trang thai EMPTY
  if (state === 'empty') {
    return (
      <div style={styles.messageContainer}>
        <p style={styles.emptyText}>
          📭 Không tìm thấy môn học nào phù hợp.
        </p>
      </div>
    );
  }

  // Trang thai SUCCESS - hien thi bang
  return (
    <div style={styles.tableContainer}>
      <table style={styles.table}>
        <thead>
          <tr style={styles.headerRow}>
            <th style={styles.th}>Tên môn học</th>
            <th style={styles.th}>Số tín chỉ</th>
            <th style={styles.th}>Số chỗ còn lại</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course, index) => (
            <tr key={course.id} style={index % 2 === 0 ? styles.evenRow : {}}>
              <td style={styles.td}>{course.tenMonHoc}</td>
              <td style={styles.td}>{course.soTinChi}</td>
              <td
                style={{
                  ...styles.td,
                  ...(course.soChoConLai === 0 ? styles.redCell : {}),
                }}
              >
                {course.soChoConLai}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  messageContainer: {
    textAlign: 'center',
    padding: '40px 20px',
    color: '#666',
  } as React.CSSProperties,
  loadingText: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#0066cc',
  } as React.CSSProperties,
  emptyText: {
    fontSize: '16px',
    color: '#888',
  } as React.CSSProperties,
  errorContainer: {
    backgroundColor: '#ffe6e6',
    border: '2px solid #ff4444',
    color: '#cc0000',
    padding: '20px',
    borderRadius: '5px',
    textAlign: 'center',
  } as React.CSSProperties,
  errorText: {
    margin: '0 0 15px 0',
    fontSize: '16px',
  } as React.CSSProperties,
  retryButton: {
    padding: '8px 20px',
    fontSize: '14px',
    backgroundColor: '#ff4444',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background-color 0.2s',
  } as React.CSSProperties,
  tableContainer: {
    overflowX: 'auto',
    marginTop: '20px',
  } as React.CSSProperties,
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  } as React.CSSProperties,
  headerRow: {
    backgroundColor: '#0066cc',
    color: 'white',
  } as React.CSSProperties,
  th: {
    padding: '12px',
    textAlign: 'left',
    fontWeight: 'bold',
    borderBottom: '2px solid #0066cc',
  } as React.CSSProperties,
  td: {
    padding: '12px',
    borderBottom: '1px solid #ddd',
  } as React.CSSProperties,
  evenRow: {
    backgroundColor: '#f9f9f9',
  } as React.CSSProperties,
  redCell: {
    backgroundColor: '#ffcccc',
    color: '#cc0000',
    fontWeight: 'bold',
  } as React.CSSProperties,
};

export default CourseList;
