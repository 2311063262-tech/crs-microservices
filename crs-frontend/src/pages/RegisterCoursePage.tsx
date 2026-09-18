import React from 'react';
import SearchBox from '../components/SearchBox';
import CourseList from '../components/CourseList';
import Pagination from '../components/Pagination';
import Toast from '../components/Toast';
import { useCourses } from '../api/useCourses';
import { registerCourse } from '../api/registrationApi';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../hooks/useToast';
import { ApiErrorResponse } from '../types/apiError';
import axios from 'axios';
import { Course } from '../types/course';

const RegisterCoursePage: React.FC = () => {
  const [keyword, setKeyword] = React.useState('');
  const [page, setPage] = React.useState(0);
  const [registeringId, setRegisteringId] = React.useState<number | null>(null);
  const { courses, totalPages, state, errorMessage, refetch } = useCourses(keyword, page, 10);
  const { user } = useAuth();
  const { toast, showToast, clearToast } = useToast();

  const handleRegister = async (course: Course) => {
    if (!user) return;
    setRegisteringId(course.id);
    try {
      await registerCourse({ studentId: user.id, courseId: course.id });
      showToast('Đăng ký học phần thành công.', 'success');
      refetch();
    } catch (err) {
      const message = axios.isAxiosError<ApiErrorResponse>(err) ? err.response?.data?.message : undefined;
      showToast(message || 'Đăng ký học phần thất bại.', 'error');
    } finally {
      setRegisteringId(null);
    }
  };

  return <div style={styles.container}><main style={styles.main}><h1>Đăng ký học phần</h1><SearchBox onSearch={(value) => { setKeyword(value); setPage(0); }} /><CourseList courses={courses} state={state} errorMessage={errorMessage} onRetry={refetch} onRegister={handleRegister} registeringId={registeringId} /><Pagination currentPage={page} totalPages={totalPages} onPageChange={(nextPage) => { setPage(nextPage); window.scrollTo(0, 0); }} /></main>{toast && <Toast message={toast.message} type={toast.type} onClose={clearToast} />}</div>;
};
const styles = { container: { minHeight: '100vh', backgroundColor: '#f5f5f5' }, main: { maxWidth: 1200, margin: '0 auto', padding: 20 } };
export default RegisterCoursePage;
