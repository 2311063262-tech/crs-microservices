// Interface cho Course - khop voi CourseDTO tu backend
export interface Course {
  id: number;
  tenMonHoc: string;
  soTinChi: number;
  soChoToiDa: number;
  soChoConLai: number;
}

// Interface cho paged response - khop voi Page<T> tu Spring Data JPA
export interface PagedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}

// Interface cho form values su dung o frontend - luu la string de de xu ly input rong
export interface CourseFormValues {
  tenMonHoc: string;
  soTinChi: string; // luu so luong la string de cho phep input rong
  soChoToiDa: string;
}

// Gia tri rong mac dinh de reset form
export const emptyCourseForm: CourseFormValues = {
  tenMonHoc: '',
  soTinChi: '',
  soChoToiDa: '',
};
