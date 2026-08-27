import axiosClient from './axiosClient';
import { Course, PagedResponse } from '../types/course';

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
