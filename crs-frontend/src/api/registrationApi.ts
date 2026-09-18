import axiosClient from './axiosClient';
import { Registration, RegistrationRequest } from '../types/registration';

export const registerCourse = async (payload: RegistrationRequest): Promise<Registration> => {
  const response = await axiosClient.post<Registration>('/api/registrations', payload);
  return response.data;
};

export const cancelRegistration = async (id: number): Promise<void> => {
  await axiosClient.delete(`/api/registrations/${id}`);
};

export const getMyRegistrations = async (): Promise<Registration[]> => {
  const response = await axiosClient.get<Registration[]>('/api/registrations/my');
  return response.data;
};
