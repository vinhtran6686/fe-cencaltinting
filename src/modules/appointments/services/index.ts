import { apiService } from '../../../services/apiService';
import { Appointment } from '../redux/appointmentTypes';

const API_ENDPOINT = '/appointments';

export const appointmentsService = {
  getAll: async (): Promise<Appointment[]> => {
    return await apiService.get<Appointment[]>(API_ENDPOINT);
  },
  
  getById: async (id: string): Promise<Appointment> => {
    return await apiService.get<Appointment>(`${API_ENDPOINT}/${id}`);
  },
  
  create: async (appointment: Omit<Appointment, 'id'>): Promise<Appointment> => {
    return await apiService.post<Appointment>(API_ENDPOINT, appointment);
  },
  
  update: async (id: string, changes: Partial<Appointment>): Promise<Appointment> => {
    return await apiService.patch<Appointment>(`${API_ENDPOINT}/${id}`, changes);
  },
  
  delete: async (id: string): Promise<void> => {
    await apiService.delete(`${API_ENDPOINT}/${id}`);
  }
};

export default appointmentsService;

export * from './appointmentsService';
export * from './contactsService';
export * from './vehiclesService';
export * from './servicesService';
export * from './techniciansService';
export * from './schedulingService'; 