export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  username: string;
  role: 'ADMIN' | 'STUDENT';
}

export interface AuthUser {
  username: string;
  role: 'ADMIN' | 'STUDENT';
}
