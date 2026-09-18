import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { cancelRegistration, getMyRegistrations } from '../api/registrationApi';
import { getCourseById } from '../api/courseApi';
import Toast from '../components/Toast';
import { useToast } from '../hooks/useToast';
import { ApiErrorResponse } from '../types/apiError';
import { Registration } from '../types/registration';

interface RegistrationRow extends Registration { courseName: string }

const MyRegistrationsPage: React.FC = () => {
  const [rows, setRows] = useState<RegistrationRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [cancellingId, setCancellingId] = useState<number | null>(null);
  const { toast, showToast, clearToast } = useToast();

  const loadData = useCallback(async () => {
    setLoading(true); setLoadError(null);
    try {
      const registrations = (await getMyRegistrations()).filter((item) => item.trangThai === 'DA_DANG_KY');
      const result = await Promise.all(registrations.map(async (registration) => {
        try { const course = await getCourseById(registration.courseId); return { ...registration, courseName: course.tenMonHoc }; }
        catch { return { ...registration, courseName: `Môn học #${registration.courseId} (không tìm thấy thông tin)` }; }
      }));
      setRows(result);
    } catch (err) {
      const message = axios.isAxiosError<ApiErrorResponse>(err) ? err.response?.data?.message : undefined;
      setLoadError(message || 'Không thể tải danh sách học phần đã đăng ký.');
    } finally { setLoading(false); }
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  const handleCancel = async (row: RegistrationRow) => {
    if (!window.confirm(`Bạn có chắc muốn huỷ đăng ký môn ${row.courseName}?`)) return;
    setCancellingId(row.id);
    try { await cancelRegistration(row.id); showToast('Huỷ đăng ký thành công.', 'success'); await loadData(); }
    catch (err) { const message = axios.isAxiosError<ApiErrorResponse>(err) ? err.response?.data?.message : undefined; showToast(message || 'Huỷ đăng ký thất bại.', 'error'); }
    finally { setCancellingId(null); }
  };

  return <main style={styles.main}><h1>Môn học đã đăng ký</h1>{loading && <p>Đang tải danh sách...</p>}{!loading && loadError && <p style={styles.error}>{loadError}</p>}{!loading && !loadError && rows.length === 0 && <p>Chưa có môn học đang đăng ký.</p>}{!loading && !loadError && rows.length > 0 && <div style={styles.tableWrap}><table style={styles.table}><thead><tr><th style={styles.cell}>Tên môn học</th><th style={styles.cell}>Ngày đăng ký</th><th style={styles.cell}>Thao tác</th></tr></thead><tbody>{rows.map((row) => <tr key={row.id}><td style={styles.cell}>{row.courseName}</td><td style={styles.cell}>{new Date(row.ngayDangKy).toLocaleString('vi-VN')}</td><td style={styles.cell}><button disabled={cancellingId === row.id} onClick={() => handleCancel(row)}>{cancellingId === row.id ? 'Đang huỷ...' : 'Huỷ đăng ký'}</button></td></tr>)}</tbody></table></div>}{toast && <Toast message={toast.message} type={toast.type} onClose={clearToast} />}</main>;
};
const styles = { main: { maxWidth: 1200, margin: '0 auto', padding: 20 }, tableWrap: { overflowX: 'auto' as const }, table: { width: '100%', borderCollapse: 'collapse' as const, background: '#fff' }, cell: { padding: 12, borderBottom: '1px solid #ddd', textAlign: 'left' as const }, error: { color: '#b91c1c' } };
export default MyRegistrationsPage;
