import { ApiResponse, apiService } from '../../../services/apiService';
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

export interface TechniciansData {
  data: Technician[];
  meta: MetaData;
}

export interface TechnicianAvailabilityData {
  data: TechnicianAvailability;
}

export class TechniciansService {
  static async getTechnicians(): Promise<TechniciansData> {
    const response = await apiService.get<TechniciansData>(
      API_ENDPOINTS.TECHNICIANS.LIST
    );
    return response;
  }

  static async getTechnicianAvailability(
    id: string,
    params: {
      startDate: string;
      endDate: string;
    }
  ): Promise<TechnicianAvailabilityData> {
    const response = await apiService.get<TechnicianAvailabilityData>(
      API_ENDPOINTS.TECHNICIANS.AVAILABILITY(id),
      params
    );
    return response;
  }
} 