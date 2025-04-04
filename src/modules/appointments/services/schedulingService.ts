import { apiService, ApiResponse } from '../../../services/apiService';
import { API_ENDPOINTS } from '../../../constants/api';

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

export type AvailableSlotsResponse = AvailableSlot[];
export type EndTimeCalculationResponse = EndTimeCalculation;

export class SchedulingService {
  static async getAvailableSlots(params: {
    date: string;
    serviceIds: string[];
  }): Promise<AvailableSlotsResponse> {
    return await apiService.get<AvailableSlotsResponse>(
      API_ENDPOINTS.SCHEDULING.AVAILABLE_SLOTS,
      params
    );
  }

  static async calculateEndTime(params: {
    startDate: string;
    startTime: string;
    serviceIds: string[];
  }): Promise<EndTimeCalculationResponse> {
    return await apiService.get<EndTimeCalculationResponse>(
      API_ENDPOINTS.SCHEDULING.CALCULATE_END_TIME,
      params
    );
  }
} 