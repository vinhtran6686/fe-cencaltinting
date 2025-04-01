import { apiService } from '../../../services/apiService';
import { API_ENDPOINTS } from '../../../constants/api';
import { ApiResponse } from './appointmentsService';

export interface AvailableSlot {
  startTime: string;
  endTime: string;
  available: boolean;
  technicians: string[];
}

export interface EndTimeCalculation {
  endDate: string;
  endTime: string;
  totalDuration: number;
}

export interface AvailableSlotsData {
  data: AvailableSlot[];
}

export interface EndTimeCalculationData {
  data: EndTimeCalculation;
}

export class SchedulingService {
  static async getAvailableSlots(params: {
    date: string;
    serviceIds: string[];
  }): Promise<AvailableSlotsData> {
    const response = await apiService.get<ApiResponse<AvailableSlotsData>>(
      API_ENDPOINTS.SCHEDULING.AVAILABLE_SLOTS,
      params
    );
    return response.data.data;
  }

  static async calculateEndTime(params: {
    startDate: string;
    startTime: string;
    serviceIds: string[];
  }): Promise<EndTimeCalculationData> {
    const response = await apiService.get<ApiResponse<EndTimeCalculationData>>(
      API_ENDPOINTS.SCHEDULING.CALCULATE_END_TIME,
      params
    );
    return response.data.data;
  }
} 