import React, { useEffect, useState } from 'react';
import { Course } from '../types/course';
import { CourseFormValues, emptyCourseForm } from '../types/course';

interface CourseFormProps {
  editingCourse: Course | null;
  onSubmit: (values: CourseFormValues) => Promise<void>;
  onCancel: () => void;
  submitting: boolean;
  serverError?: string | null;
}

/**
 * CourseForm - Controlled component CHUNG cho Thêm va Sửa
 */
const CourseForm: React.FC<CourseFormProps> = ({
  editingCourse,
  onSubmit,
  onCancel,
  submitting,
  serverError,
}) => {
  const [form, setForm] = useState<CourseFormValues>(emptyCourseForm);
  const [errors, setErrors] = useState<Partial<Record<keyof CourseFormValues, string>>>({});

  // Khi editingCourse thay doi: neu co -> do du lieu, neu null -> reset
  useEffect(() => {
    if (editingCourse) {
      setForm({
        tenMonHoc: editingCourse.tenMonHoc,
        soTinChi: String(editingCourse.soTinChi),
        soChoToiDa: String(editingCourse.soChoToiDa),
      });
      setErrors({});
    } else {
      setForm(emptyCourseForm);
      setErrors({});
    }
  }, [editingCourse]);

  const handleChange = (field: keyof CourseFormValues) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const validate = (): boolean => {
    const newErrors: typeof errors = {};

    if (!form.tenMonHoc.trim()) {
      newErrors.tenMonHoc = 'Tên môn học không được để trống';
    }

    const stc = Number(form.soTinChi);
    if (!form.soTinChi.trim() || Number.isNaN(stc) || stc <= 0) {
      newErrors.soTinChi = 'Số tín chỉ phải là số lớn hơn 0';
    }

    const sco = Number(form.soChoToiDa);
    if (!form.soChoToiDa.trim() || Number.isNaN(sco) || sco <= 0) {
      newErrors.soChoToiDa = 'Số chỗ tối đa phải là số lớn hơn 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }
    try {
      await onSubmit(form);
      // Không reset tại đây; App sẽ quản lý đóng form / reset khi cần
    } catch (err) {
      // Lỗi server sẽ được truyền qua serverError prop
    }
  };

  const isEditing = Boolean(editingCourse);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>{isEditing ? '✏️ Cập nhật môn học' : '➕ Thêm môn học mới'}</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.row}>
          <label style={styles.label}>Tên môn học</label>
          <input
            style={styles.input}
            value={form.tenMonHoc}
            onChange={handleChange('tenMonHoc')}
            placeholder="Ví dụ: Lập trình Web"
            disabled={submitting}
          />
          {errors.tenMonHoc && <div style={styles.fieldError}>{errors.tenMonHoc}</div>}
        </div>

        <div style={styles.row}>
          <label style={styles.label}>Số tín chỉ</label>
          <input
            style={styles.input}
            value={form.soTinChi}
            onChange={handleChange('soTinChi')}
            placeholder="Ví dụ: 3"
            disabled={submitting}
          />
          {errors.soTinChi && <div style={styles.fieldError}>{errors.soTinChi}</div>}
        </div>

        <div style={styles.row}>
          <label style={styles.label}>Số chỗ tối đa</label>
          <input
            style={styles.input}
            value={form.soChoToiDa}
            onChange={handleChange('soChoToiDa')}
            placeholder="Ví dụ: 30"
            disabled={submitting}
          />
          {errors.soChoToiDa && <div style={styles.fieldError}>{errors.soChoToiDa}</div>}
        </div>

        {serverError && <div style={styles.serverError}>❌ {serverError}</div>}

        <div style={styles.actions}>
          <button type="submit" style={styles.submitButton} disabled={submitting}>
            {submitting ? (isEditing ? 'Đang cập nhật...' : 'Đang thêm...') : (isEditing ? 'Cập nhật' : 'Thêm mới')}
          </button>
          <button type="button" style={styles.cancelButton} onClick={onCancel} disabled={submitting}>
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#fff',
    padding: '16px',
    borderRadius: '6px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
    marginBottom: '16px',
  } as React.CSSProperties,
  title: {
    margin: '0 0 10px 0',
    fontSize: '16px',
  } as React.CSSProperties,
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
  },
  row: {
    marginBottom: '10px',
    display: 'flex',
    flexDirection: 'column' as const,
  } as React.CSSProperties,
  label: {
    marginBottom: '6px',
    fontSize: '14px',
    fontWeight: 600,
  } as React.CSSProperties,
  input: {
    padding: '8px 10px',
    fontSize: '14px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  } as React.CSSProperties,
  fieldError: {
    marginTop: '6px',
    color: '#cc0000',
    fontSize: '13px',
  } as React.CSSProperties,
  serverError: {
    marginTop: '8px',
    padding: '10px',
    backgroundColor: '#ffecec',
    border: '1px solid #ffbcbc',
    color: '#cc0000',
    borderRadius: '4px',
  } as React.CSSProperties,
  actions: {
    marginTop: '12px',
    display: 'flex',
    gap: '8px',
  } as React.CSSProperties,
  submitButton: {
    padding: '8px 14px',
    backgroundColor: '#0066cc',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 700,
  } as React.CSSProperties,
  cancelButton: {
    padding: '8px 14px',
    backgroundColor: '#eee',
    color: '#333',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  } as React.CSSProperties,
};

export default CourseForm;
