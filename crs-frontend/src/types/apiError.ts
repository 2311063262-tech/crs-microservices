// Interface cho API error response - bao gom ca loi nghiep vu va loi validation
export interface ApiErrorResponse {
  message?: string;
  // Index signature cho loi validation theo field (vd: tenMonHoc: "Tên môn học không được để trống")
  [key: string]: any;
}
