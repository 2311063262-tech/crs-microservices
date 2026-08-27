import { useState } from 'react';
import { useCourses } from './api/useCourses';
import SearchBox from './components/SearchBox';
import CourseList from './components/CourseList';
import Pagination from './components/Pagination';
import './App.css';

/**
 * App.tsx - Component chinh rap toan bo giao dien Buoi 6
 * 
 * Quang ly state:
 * - keyword: tu khoa tim kiem (state o App)
 * - page: so trang hien tai (state o App)
 * - useCourses hook: goi API, tra ve courses, totalPages, state, errorMessage, refetch
 * 
 * Luong xu ly:
 * 1. User gop tu khoa -> SearchBox debounce -> handleSearch -> setKeyword + setPage(0)
 *    (QUAN TRONG: phai reset page ve 0 de khong bi ket o trang cu)
 * 2. Keyword hoac page thay doi -> useCourses hook useEffect chay -> goi getCourses()
 * 3. Ket qua tra ve -> CourseList hien thi theo state (loading/success/empty/error)
 * 4. User click trang -> handlePageChange -> setPage -> useCourses goi API
 * 5. User bam "Thu lai" -> handleRetry -> useCourses.refetch()
 */
function App() {
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(0);

  // Custom hook quan ly danh sach khoa hoc
  const { courses, totalPages, state, errorMessage, refetch } = useCourses(
    keyword,
    page,
    10
  );

  /**
   * Xu ly tim kiem - QUAN TRONG: phai setPage(0) de khong bi ket o trang cu
   */
  const handleSearch = (newKeyword: string) => {
    setKeyword(newKeyword);
    setPage(0); // Reset ve trang dau
  };

  /**
   * Xu ly doi trang
   */
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    // Auto scroll den top de user thay trang moi
    window.scrollTo(0, 0);
  };

  /**
   * Xu ly "Thu lai" - goi refetch tu hook
   */
  const handleRetry = () => {
    refetch();
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>📚 Hệ thống đăng ký môn học (CRS)</h1>
        <p style={styles.subtitle}>Buổi 6 - Danh sách, tìm kiếm, phân trang</p>
      </header>

      <main style={styles.main}>
        {/* SearchBox - tim kiem voi debounce 400ms */}
        <SearchBox onSearch={handleSearch} />

        {/* CourseList - hien thi danh sach theo 4 trang thai */}
        <CourseList
          courses={courses}
          state={state}
          errorMessage={errorMessage}
          onRetry={handleRetry}
        />

        {/* Pagination - phan trang */}
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
}

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

export default App;
