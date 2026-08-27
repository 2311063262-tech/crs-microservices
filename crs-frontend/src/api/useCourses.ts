import { useEffect, useState, useCallback } from 'react';
import { getCourses } from './courseApi';
import { Course, PagedResponse } from '../types/course';
import axios from 'axios';
import { ApiErrorResponse } from '../types/apiError';

/**
 * Trang thai cua hook useCourses
 * - loading: dang goi API
 * - success: co du lieu, mang khong rong
 * - empty: goi thanh cong nhung mang rong
 * - error: loi mang hoac loi tu backend
 */
type CourseState = 'loading' | 'success' | 'empty' | 'error';

interface UseCourseReturn {
  courses: Course[];
  totalPages: number;
  state: CourseState;
  errorMessage: string | null;
  refetch: () => void;
}

/**
 * Custom hook quan ly danh sach khoa hoc va trang thai tai
 * 
 * Giai thich logic:
 * 1. Khi keyword hoac page thay doi -> useEffect chay, goi getCourses()
 * 2. Neu er.response?.data?.message co gia tri -> dung message do (loi tu backend)
 * 3. Neu !err.response -> khong nhan response -> hien thi "Khong ket noi duoc toi he thong"
 * 4. Phan biet 4 trang thai: loading, success (co data), empty (data rong), error
 * 
 * @param keyword - tu khoa tim kiem
 * @param page - so trang (bat dau tu 0)
 * @param size - so ban ghi tren 1 trang (mac dinh 10)
 * @returns Object chua courses, totalPages, state, errorMessage, refetch
 */
export const useCourses = (
  keyword: string,
  page: number,
  size: number = 10
): UseCourseReturn => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [state, setState] = useState<CourseState>('loading');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // useCallback de tranh tao ham moi o moi render
  const fetchCourses = useCallback(async () => {
    setState('loading');
    setErrorMessage(null);

    try {
      // Neu keyword la chuoi rong, khong gui len API
      const keywordParam = keyword.trim() || undefined;
      const data = await getCourses(keywordParam, page, size);

      setCourses(data.content);
      setTotalPages(data.totalPages);

      // Phan biet success va empty
      if (data.content.length === 0) {
        setState('empty');
      } else {
        setState('success');
      }
    } catch (err) {
      // Xu ly loi Axios
      if (axios.isAxiosError<ApiErrorResponse>(err)) {
        if (err.response?.data?.message) {
          // Loi nghiep vu tu backend (VD: invalid keyword, ...)
          setErrorMessage(err.response.data.message);
        } else if (!err.response) {
          // Loi mang: khong nhan duoc response tao
          // => khong ket noi duoc toi gateway/service
          setErrorMessage(
            'Khong ket noi duoc toi he thong. Vui long thu lai sau.'
          );
        } else {
          // Loi khac (VD: status 500 ma khong co message)
          setErrorMessage(
            `Loi server: ${err.response?.status || 'Unknown'}`
          );
        }
      } else {
        // Loi khong phai tu Axios (rare case)
        setErrorMessage('Loi khong xac dinh xay ra');
      }

      setCourses([]);
      setState('error');
    }
  }, [keyword, page, size]);

  // useEffect chay khi keyword hoac page thay doi
  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  // Refetch function de user co the goi lai API (VD khi bam "Thu lai")
  const refetch = useCallback(() => {
    fetchCourses();
  }, [fetchCourses]);

  return {
    courses,
    totalPages,
    state,
    errorMessage,
    refetch,
  };
};
