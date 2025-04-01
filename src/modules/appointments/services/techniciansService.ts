import { apiService } from '../../../services/apiService';
import { API_ENDPOINTS } from '../../../constants/api';
import { ApiResponse } from './appointmentsService';

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
}

export interface TechnicianAvailabilityData {
  data: TechnicianAvailability;
}

export class TechniciansService {
  static async getTechnicians(): Promise<TechniciansData> {
    const response = await apiService.get<ApiResponse<TechniciansData>>(
      API_ENDPOINTS.TECHNICIANS.LIST
    );
    return response.data.data;
  }

  static async getTechnicianAvailability(
    id: string,
    params: {
      startDate: string;
      endDate: string;
    }
  ): Promise<TechnicianAvailabilityData> {
    const response = await apiService.get<ApiResponse<TechnicianAvailabilityData>>(
      API_ENDPOINTS.TECHNICIANS.AVAILABILITY(id),
      params
    );
    return response.data.data;
  }
} 