// This file will export all API services related to appointments
// Ví dụ:

import axios from 'axios';
import { Appointment } from '../redux/appointmentTypes';

const API_URL = '/api/appointments';

export const appointmentsService = {
  getAll: async (): Promise<Appointment[]> => {
    // TODO: Implement real API call
    const response = await axios.get(API_URL);
    return response.data;
  },
  
  getById: async (id: string): Promise<Appointment> => {
    // TODO: Implement real API call
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  },
  
  create: async (appointment: Omit<Appointment, 'id'>): Promise<Appointment> => {
    // TODO: Implement real API call
    const response = await axios.post(API_URL, appointment);
    return response.data;
  },
  
  update: async (id: string, changes: Partial<Appointment>): Promise<Appointment> => {
    // TODO: Implement real API call
    const response = await axios.patch(`${API_URL}/${id}`, changes);
    return response.data;
  },
  
  delete: async (id: string): Promise<void> => {
    // TODO: Implement real API call
    await axios.delete(`${API_URL}/${id}`);
  }
};

export default appointmentsService; 