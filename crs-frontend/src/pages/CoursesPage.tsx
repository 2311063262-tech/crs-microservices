import React from 'react';
import SearchBox from '../components/SearchBox';
import CourseList from '../components/CourseList';
import Pagination from '../components/Pagination';
import { useCourses } from '../api/useCourses';

const CoursesPage: React.FC = () => {
  const [keyword, setKeyword] = React.useState('');
  const [page, setPage] = React.useState(0);
  const { courses, totalPages, state, errorMessage, refetch } = useCourses(keyword, page, 10);

  return (
    <div style={styles.container}>
      <header style={styles.header}><h1>📚 Hệ thống đăng ký môn học (CRS)</h1><p>Danh sách môn học (công khai)</p></header>
      <main style={styles.main}>
        <SearchBox onSearch={(value) => { setKeyword(value); setPage(0); }} />
        <CourseList courses={courses} state={state} errorMessage={errorMessage} onRetry={refetch} />
        <Pagination currentPage={page} totalPages={totalPages} onPageChange={(nextPage) => { setPage(nextPage); window.scrollTo(0, 0); }} />
      </main>
      <footer style={styles.footer}>Từ khóa = "{keyword}" | Trang = {page + 1} / {totalPages}</footer>
    </div>
  );
};

const styles = {
  container: { minHeight: '100vh', backgroundColor: '#f5f5f5', display: 'flex', flexDirection: 'column' as const },
  header: { backgroundColor: '#0066cc', color: 'white', padding: 20, textAlign: 'center' as const },
  main: { flex: 1, maxWidth: 1200, width: '100%', margin: '0 auto', padding: 20, boxSizing: 'border-box' as const },
  footer: { backgroundColor: '#333', color: '#ccc', padding: 15, textAlign: 'center' as const },
};

export default CoursesPage;
