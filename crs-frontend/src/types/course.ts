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
