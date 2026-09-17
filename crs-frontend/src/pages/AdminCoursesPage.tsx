import React, { useState } from 'react';
import axios from 'axios';
import { useCourses } from '../api/useCourses';
import { createCourse, deleteCourse, updateCourse } from '../api/courseApi';
import CourseForm from '../components/CourseForm';
import CourseList from '../components/CourseList';
import Pagination from '../components/Pagination';
import SearchBox from '../components/SearchBox';
import { Course, CourseFormValues } from '../types/course';
import { ApiErrorResponse } from '../types/apiError';

const AdminCoursesPage: React.FC = () => {
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(0);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const { courses, totalPages, state, errorMessage, refetch } = useCourses(keyword, page, 10);

  const handleSubmit = async (values: CourseFormValues) => {
    setSubmitting(true);
    setServerError(null);
    try {
      if (editingCourse) await updateCourse(editingCourse.id, values);
      else await createCourse(values);
      setEditingCourse(null);
      refetch();
    } catch (err) {
      setServerError(axios.isAxiosError<ApiErrorResponse>(err) ? (err.response?.data?.message || 'Không thể lưu môn học.') : 'Không thể lưu môn học.');
      throw err;
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (course: Course) => {
    if (!window.confirm(`Bạn có chắc muốn xóa môn ${course.tenMonHoc}?`)) return;
    setServerError(null);
    try {
      await deleteCourse(course.id);
      refetch();
    } catch (err) {
      setServerError(axios.isAxiosError<ApiErrorResponse>(err) ? (err.response?.data?.message || 'Không thể xóa môn học.') : 'Không thể xóa môn học.');
    }
  };

  return (
    <main style={styles.main}>
      <h1>Quản trị môn học</h1>
      <CourseForm editingCourse={editingCourse} onSubmit={handleSubmit} onCancel={() => { setEditingCourse(null); setServerError(null); }} submitting={submitting} serverError={serverError} />
      <SearchBox onSearch={(value) => { setKeyword(value); setPage(0); }} />
      {serverError && <p style={styles.error}>{serverError}</p>}
      <CourseList courses={courses} state={state} errorMessage={errorMessage} onRetry={refetch} onEdit={setEditingCourse} onDelete={handleDelete} />
      <Pagination currentPage={page} totalPages={totalPages} onPageChange={(nextPage) => { setPage(nextPage); window.scrollTo(0, 0); }} />
    </main>
  );
};

const styles = { main: { maxWidth: 1200, margin: '0 auto', padding: 20 }, error: { color: '#c00' } };
export default AdminCoursesPage;
