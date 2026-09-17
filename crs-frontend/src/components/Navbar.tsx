import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.links}>
        <Link to="/courses" style={styles.link}>Courses</Link>
        {isAuthenticated && user?.role === 'ADMIN' && (
          <Link to="/admin/courses" style={styles.link}>Quản trị môn học</Link>
        )}
        {isAuthenticated && user?.role === 'STUDENT' && (
          <Link to="/register-course" style={styles.link}>Đăng ký môn học</Link>
        )}
      </div>
      <div style={styles.account}>
        {isAuthenticated && user ? (
          <>
            <span>Xin chao, {user.username} ({user.role})</span>
            <button type="button" onClick={handleLogout} style={styles.button}>Đăng xuất</button>
          </>
        ) : (
          <Link to="/login" style={styles.link}>Đăng nhập</Link>
        )}
      </div>
    </nav>
  );
};

const styles: Record<string, React.CSSProperties> = {
  nav: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, padding: '12px 20px', backgroundColor: '#173f73', color: 'white' },
  links: { display: 'flex', gap: 16, alignItems: 'center' },
  account: { display: 'flex', gap: 12, alignItems: 'center' },
  link: { color: 'white', textDecoration: 'none', fontWeight: 600 },
  button: { padding: '6px 10px', border: 0, borderRadius: 4, cursor: 'pointer' },
};

export default Navbar;
