import axiosClient from './axiosClient';
import { LoginRequest, LoginResponse } from '../types/auth';

export const login = (payload: LoginRequest) =>
  axiosClient.post<LoginResponse>('/api/auth/login', payload);

const authApi = { login };
export default authApi;
