import { useEffect, useState } from 'react';
import React from 'react';

interface SearchBoxProps {
  onSearch: (keyword: string) => void;
  placeholder?: string;
}

/**
 * SearchBox component - input tim kiem voi DEBOUNCE 400ms
 * 
 * Giai thich debounce:
 * - Khi user gop phim, moi phim nhap se tao mot timeout 400ms
 * - Neu user tiep tuc gop phim trong 400ms, timeout cu se bi cancel (clearTimeout)
 * - Chi khi user dung gop phim 400ms tro len -> setTimeout chay -> goi onSearch
 * - Nhan dung: tranh goi API sau moi phim, chi goi khi user dung gop/pause
 * 
 * @param onSearch - ham callback goi khi search (sau 400ms debounce)
 * @param placeholder - text placeholder cua input (mac dinh "Tim kiem...")
 */
const SearchBox: React.FC<SearchBoxProps> = ({
  onSearch,
  placeholder = 'Tim kiem theo ten mon hoc...',
}) => {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    // Set timeout de debounce 400ms
    const timeoutId = setTimeout(() => {
      onSearch(inputValue);
    }, 400);

    // Cleanup function: cancel timeout neu component unmount hoac inputValue thay doi
    // Dieu nay tranh tao request liên tuc khi user dang gop phim
    return () => clearTimeout(timeoutId);
  }, [inputValue, onSearch]);

  return (
    <div style={styles.container}>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={placeholder}
        style={styles.input}
      />
    </div>
  );
};

const styles = {
  container: {
    marginBottom: '20px',
  } as React.CSSProperties,
  input: {
    width: '100%',
    padding: '10px 15px',
    fontSize: '16px',
    border: '2px solid #ddd',
    borderRadius: '5px',
    boxSizing: 'border-box',
    transition: 'border-color 0.3s',
  } as React.CSSProperties,
};

export default SearchBox;
