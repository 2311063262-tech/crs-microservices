// Interface cho login request
export interface LoginRequest {
  username: string;
  password: string;
}

// Interface cho login response
export interface LoginResponse {
  token: string;
  username: string;
  role: 'ADMIN' | 'STUDENT';
}
