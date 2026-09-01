import axiosClient from './axiosClient';
import { Course, PagedResponse, CourseFormValues } from '../types/course';

/**
 * Gọi API lấy danh sách khóa học
 * Hỗ trợ tìm kiếm theo từ khóa, phân trang
 * @param keyword - từ khóa tìm kiếm (optional)
 * @param page - số trang (bắt đầu từ 0)
 * @param size - số bản ghi trên 1 trang
 * @returns PagedResponse<Course>
 */
export const getCourses = async (
  keyword?: string,
  page: number = 0,
  size: number = 10
): Promise<PagedResponse<Course>> => {
  try {
    const params: Record<string, any> = {
      page,
      size,
    };

    if (keyword) {
      params.keyword = keyword;
    }

    const response = await axiosClient.get<PagedResponse<Course>>(
      '/api/courses',
      { params }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Chuyen CourseFormValues (string) -> payload voi so la number
 */
const toPayload = (values: CourseFormValues) => {
  return {
    tenMonHoc: values.tenMonHoc,
    soTinChi: Number(values.soTinChi),
    soChoToiDa: Number(values.soChoToiDa),
  };
};

/**
 * Tao moi course
 * POST /api/courses
 */
export const createCourse = async (values: CourseFormValues): Promise<Course> => {
  try {
    const payload = toPayload(values);
    const response = await axiosClient.post<Course>('/api/courses', payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Cap nhat course
 * PUT /api/courses/:id
 */
export const updateCourse = async (id: number, values: CourseFormValues): Promise<Course> => {
  try {
    const payload = toPayload(values);
    const response = await axiosClient.put<Course>(`/api/courses/${id}`, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Xoa course
 * DELETE /api/courses/:id
 */
export const deleteCourse = async (id: number): Promise<void> => {
  try {
    await axiosClient.delete(`/api/courses/${id}`);
  } catch (error) {
    throw error;
  }
};
