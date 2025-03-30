import { apiService } from '../../../services/apiService';
import { Appointment } from '../redux/appointmentTypes';

const API_ENDPOINT = '/appointments';

export const appointmentsService = {
  getAll: async (): Promise<Appointment[]> => {
    const response = await apiService.get<Appointment[]>(API_ENDPOINT);
    return response.data;
  },
  
  getById: async (id: string): Promise<Appointment> => {
    const response = await apiService.get<Appointment>(`${API_ENDPOINT}/${id}`);
    return response.data;
  },
  
  create: async (appointment: Omit<Appointment, 'id'>): Promise<Appointment> => {
    const response = await apiService.post<Appointment>(API_ENDPOINT, appointment);
    return response.data;
  },
  
  update: async (id: string, changes: Partial<Appointment>): Promise<Appointment> => {
    const response = await apiService.patch<Appointment>(`${API_ENDPOINT}/${id}`, changes);
    return response.data;
  },
  
  delete: async (id: string): Promise<void> => {
    await apiService.delete(`${API_ENDPOINT}/${id}`);
  }
};

export default appointmentsService; 