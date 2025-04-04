import { apiService } from '../../../services/apiService';
import { API_ENDPOINTS } from '../../../constants/api'; 
import { MetaData } from './appointmentsService';

export interface Technician {
  _id: string;
  name: string;
  specialties: string[];
  availability: {
    [day: string]: { start: string; end: string };
  };
  avatar?: string;
}

export interface TechnicianAvailability {
  [date: string]: {
    start: string;
    end: string;
    available: boolean;
  }[];
}

export type TechniciansResponse = Technician[];
export type TechnicianAvailabilityResponse = TechnicianAvailability;

export class TechniciansService {
  static async getTechnicians(): Promise<TechniciansResponse> {
    return await apiService.get<TechniciansResponse>(
      API_ENDPOINTS.TECHNICIANS.LIST
    );
  }

  static async getTechnicianAvailability(
    id: string,
    params: {
      startDate: string;
      endDate: string;
    }
  ): Promise<TechnicianAvailabilityResponse> {
    return await apiService.get<TechnicianAvailabilityResponse>(
      API_ENDPOINTS.TECHNICIANS.AVAILABILITY(id),
      params
    );
  }
} 