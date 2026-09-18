export interface Registration {
  id: number;
  studentId: number;
  courseId: number;
  ngayDangKy: string;
  trangThai: 'DA_DANG_KY' | string;
}

export interface RegistrationRequest {
  studentId: number;
  courseId: number;
}
