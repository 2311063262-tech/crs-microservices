import React from 'react';
import { Course } from '../types/course';

type CourseState = 'loading' | 'success' | 'empty' | 'error';
interface CourseListProps {
  courses: Course[];
  state: CourseState;
  errorMessage: string | null;
  onRetry: () => void;
  onEdit?: (course: Course) => void;
  onDelete?: (course: Course) => void | Promise<void>;
  onRegister?: (course: Course) => void;
  registeringId?: number | null;
}

const CourseList: React.FC<CourseListProps> = ({ courses, state, errorMessage, onRetry, onEdit, onDelete, onRegister, registeringId }) => {
  if (state === 'loading') return <div style={styles.messageContainer}><p style={styles.loadingText}>⏳ Đang tải danh sách môn học...</p></div>;
  if (state === 'error') return <div style={styles.errorContainer}><p style={styles.errorText}>❌ Lỗi: {errorMessage}</p><button style={styles.retryButton} onClick={onRetry}>🔄 Thử lại</button></div>;
  if (state === 'empty') return <div style={styles.messageContainer}><p style={styles.emptyText}>📭 Không tìm thấy môn học nào phù hợp.</p></div>;

  const showActions = !!onEdit || !!onDelete || !!onRegister;
  return <div style={styles.tableContainer}><table style={styles.table}><thead><tr style={styles.headerRow}><th style={styles.th}>Tên môn học</th><th style={styles.th}>Số tín chỉ</th><th style={styles.th}>Số chỗ còn lại</th>{showActions && <th style={styles.th}>Thao tác</th>}</tr></thead><tbody>{courses.map((course, index) => { const registering = registeringId === course.id; const disabled = course.soChoConLai === 0 || registering; return <tr key={course.id} style={index % 2 === 0 ? styles.evenRow : {}}><td style={styles.td}>{course.tenMonHoc}</td><td style={styles.td}>{course.soTinChi}</td><td style={{ ...styles.td, ...(course.soChoConLai === 0 ? styles.redCell : {}) }}>{course.soChoConLai}</td>{showActions && <td style={styles.td}>{onEdit && <button onClick={() => onEdit(course)}>Sửa</button>}{onDelete && <button onClick={() => onDelete(course)} style={{ marginLeft: 8 }}>Xóa</button>}{onRegister && <button disabled={disabled} onClick={() => onRegister(course)} style={{ marginLeft: 8 }}>{registering ? 'Đang đăng ký...' : course.soChoConLai === 0 ? 'Hết chỗ' : 'Đăng ký'}</button>}</td>}</tr>; })}</tbody></table></div>;
};

const styles = { messageContainer: { textAlign: 'center' as const, padding: '40px 20px', color: '#666' }, loadingText: { fontSize: 16, fontWeight: 'bold' as const, color: '#0066cc' }, emptyText: { fontSize: 16, color: '#888' }, errorContainer: { backgroundColor: '#ffe6e6', border: '2px solid #ff4444', padding: 20, borderRadius: 5, textAlign: 'center' as const }, errorText: { margin: '0 0 15px', fontSize: 16, color: '#cc0000' }, retryButton: { padding: '8px 20px' }, tableContainer: { overflowX: 'auto' as const, marginTop: 20 }, table: { width: '100%', borderCollapse: 'collapse' as const, backgroundColor: '#fff' }, headerRow: { backgroundColor: '#0066cc', color: 'white' }, th: { padding: 12, textAlign: 'left' as const }, td: { padding: 12, borderBottom: '1px solid #ddd' }, evenRow: { backgroundColor: '#f9f9f9' }, redCell: { backgroundColor: '#ffcccc', color: '#cc0000', fontWeight: 'bold' as const } };
export default CourseList;
