// Interface cho Registration
export interface Registration {
  id: number;
  studentId: number;
  courseId: number;
  trangThai: 'DA_DANG_KY' | 'DA_HUY';
  ngayDangKy: string;
}

// Interface cho registration request
export interface RegistrationRequest {
  studentId: number;
  courseId: number;
}
