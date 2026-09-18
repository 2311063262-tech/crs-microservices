import axiosClient from './axiosClient';
import { Course, PagedResponse, CourseFormValues } from '../types/course';

export const getCourses = async (keyword?: string, page: number = 0, size: number = 10): Promise<PagedResponse<Course>> => {
  const params: Record<string, any> = { page, size };
  if (keyword) params.keyword = keyword;
  const response = await axiosClient.get<PagedResponse<Course>>('/api/courses', { params });
  return response.data;
};

export const getCourseById = async (id: number): Promise<Course> => {
  const response = await axiosClient.get<Course>(`/api/courses/${id}`);
  return response.data;
};

const toPayload = (values: CourseFormValues) => ({
  tenMonHoc: values.tenMonHoc,
  soTinChi: Number(values.soTinChi),
  soChoToiDa: Number(values.soChoToiDa),
});

export const createCourse = async (values: CourseFormValues): Promise<Course> => {
  const response = await axiosClient.post<Course>('/api/courses', toPayload(values));
  return response.data;
};

export const updateCourse = async (id: number, values: CourseFormValues): Promise<Course> => {
  const response = await axiosClient.put<Course>(`/api/courses/${id}`, toPayload(values));
  return response.data;
};

export const deleteCourse = async (id: number): Promise<void> => {
  await axiosClient.delete(`/api/courses/${id}`);
};
