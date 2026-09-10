import React from 'react';
import SearchBox from '../components/SearchBox';
import CourseList from '../components/CourseList';
import Pagination from '../components/Pagination';
import { useCourses } from '../api/useCourses';

const CoursesPage: React.FC = () => {
  const [keyword, setKeyword] = React.useState('');
  const [page, setPage] = React.useState(0);

  const { courses, totalPages, state, errorMessage, refetch } = useCourses(
    keyword,
    page,
    10
  );

  const handleSearch = (newKeyword: string) => {
    setKeyword(newKeyword);
    setPage(0);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo(0, 0);
  };

  const handleRetry = () => refetch();

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>📚 Hệ thống đăng ký môn học (CRS)</h1>
        <p style={styles.subtitle}>Danh sách môn học (công khai)</p>
      </header>

      <main style={styles.main}>
        <SearchBox onSearch={handleSearch} />

        <CourseList
          courses={courses}
          state={state}
          errorMessage={errorMessage}
          onRetry={handleRetry}
          // onEdit/onDelete intentionally not passed on public page
        />

        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </main>

      <footer style={styles.footer}>
        <p>
          💡 Hiện tại: Từ khóa = "{keyword}" | Trang = {page + 1} / {totalPages}
        </p>
      </footer>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
    display: 'flex',
    flexDirection: 'column' as const,
  },
  header: {
    backgroundColor: '#0066cc',
    color: 'white',
    padding: '20px',
    textAlign: 'center' as const,
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  title: {
    margin: '0 0 5px 0',
    fontSize: '28px',
  },
  subtitle: {
    margin: '0',
    fontSize: '14px',
    opacity: 0.9,
  },
  main: {
    flex: 1,
    maxWidth: '1200px',
    width: '100%',
    margin: '0 auto',
    padding: '20px',
    boxSizing: 'border-box' as const,
  },
  footer: {
    backgroundColor: '#333',
    color: '#ccc',
    padding: '15px 20px',
    textAlign: 'center' as const,
    fontSize: '12px',
  },
};

export default CoursesPage;
