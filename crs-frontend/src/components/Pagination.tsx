import React from 'react';

interface PaginationProps {
  currentPage: number;    // So trang hien tai (bat dau tu 0)
  totalPages: number;     // Tong so trang
  onPageChange: (page: number) => void; // Ham callback khi user click trang
}

/**
 * Pagination component - hien thi cac nut phan trang
 * 
 * Logic:
 * - An hoang toan (return null) neu totalPages <= 1 (khong can phan trang)
 * - Hien thi nut "Trang truoc" voi disable=true neu currentPage = 0
 * - Hien thi cac nut so trang (0, 1, 2, ..., totalPages-1)
 * - Trang hien tai se in dam/gach chan (background highlight)
 * - Hien thi nut "Trang sau" voi disable=true neu currentPage = totalPages-1
 * 
 * @param currentPage - so trang hien tai (0-based)
 * @param totalPages - tong so trang
 * @param onPageChange - callback(page) khi user click nut trang
 */
const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  // An neu chi co 1 trang hoac khong co trang nao
  if (totalPages <= 1) {
    return null;
  }

  // Tao mang so trang: [0, 1, 2, ..., totalPages-1]
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i);

  return (
    <div style={styles.container}>
      {/* Nut "Trang truoc" */}
      <button
        style={{
          ...styles.button,
          opacity: currentPage === 0 ? 0.5 : 1,
          cursor: currentPage === 0 ? 'not-allowed' : 'pointer',
        }}
        disabled={currentPage === 0}
        onClick={() => onPageChange(currentPage - 1)}
      >
        ← Trang trước
      </button>

      {/* Cac nut so trang */}
      <div style={styles.pageNumbers}>
        {pageNumbers.map((page) => (
          <button
            key={page}
            style={{
              ...styles.pageButton,
              ...(page === currentPage ? styles.activePageButton : {}),
            }}
            onClick={() => onPageChange(page)}
          >
            {page + 1}
          </button>
        ))}
      </div>

      {/* Nut "Trang sau" */}
      <button
        style={{
          ...styles.button,
          opacity: currentPage === totalPages - 1 ? 0.5 : 1,
          cursor: currentPage === totalPages - 1 ? 'not-allowed' : 'pointer',
        }}
        disabled={currentPage === totalPages - 1}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Trang sau →
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    marginTop: '30px',
    flexWrap: 'wrap',
  } as React.CSSProperties,
  button: {
    padding: '8px 12px',
    fontSize: '14px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    backgroundColor: '#f5f5f5',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  } as React.CSSProperties,
  pageNumbers: {
    display: 'flex',
    gap: '5px',
    flexWrap: 'wrap',
  } as React.CSSProperties,
  pageButton: {
    padding: '6px 10px',
    fontSize: '14px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    backgroundColor: '#f5f5f5',
    cursor: 'pointer',
    transition: 'all 0.2s',
  } as React.CSSProperties,
  activePageButton: {
    backgroundColor: '#0066cc',
    color: 'white',
    fontWeight: 'bold',
    textDecoration: 'underline',
    borderColor: '#0066cc',
  } as React.CSSProperties,
};

export default Pagination;
