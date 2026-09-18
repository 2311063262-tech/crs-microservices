import React, { useEffect } from 'react';

type ToastType = 'success' | 'error';

interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = window.setTimeout(onClose, 3500);
    return () => window.clearTimeout(timer);
  }, [message, onClose]);

  return (
    <div style={{ ...styles.toast, backgroundColor: type === 'success' ? '#15803d' : '#b91c1c' }} role="alert">
      <span>{message}</span>
      <button type="button" onClick={onClose} style={styles.close}>✕</button>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  toast: { position: 'fixed', right: 20, bottom: 20, zIndex: 1000, color: '#fff', padding: '12px 16px', borderRadius: 6, display: 'flex', gap: 16, alignItems: 'center', boxShadow: '0 4px 12px rgba(0,0,0,.2)' },
  close: { border: 0, background: 'transparent', color: '#fff', cursor: 'pointer', fontSize: 16 },
};

export default Toast;
