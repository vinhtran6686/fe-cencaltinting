import { apiService } from '../../../services/apiService';
import { API_ENDPOINTS } from '../../../constants/api';

// Interface chung cho API response
export interface ApiResponse<T> {
  data: T;
  message: string;
  statusCode: number;
  timestamp: string;
}

export interface AppointmentService {
  packageId: string;
  serviceIds: string[];
  estimatedTime: number;
  technicianId: string;
  startDate: string;
  startTime: string;
  estimatedEndDate?: string;
}

export interface VehicleDetails {
  year: string;
  make: string;
  model: string;
  vehicleType: string;
  isCustomEntry: boolean;
}

export interface AppointmentResponse {
  _id: string;
  contactId: string;
  vehicleDetails: VehicleDetails;
  services: AppointmentService[];
  status: 'scheduled' | 'in-progress' | 'completed' | 'canceled';
  startDate: string;
  endDate: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface MetaData {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface AppointmentListData {
  data: AppointmentResponse[];
  meta: MetaData;
}

export interface AppointmentCreateInput {
  contactId: string;
  vehicleDetails: {
    year: string;
    make: string;
    model: string;
    vehicleType: string;
    isCustomEntry: boolean;
  };
  services: {
    packageId: string;
    serviceIds: string[];
    estimatedTime: number;
    technicianId: string;
    startDate: string;
    startTime: string;
  }[];
  startDate: string;
  notes?: string;
}

export class AppointmentsService {
  static async getAppointments(params?: {
    page?: number;
    limit?: number;
    status?: string;
    startDate?: string;
    endDate?: string;
    search?: string;
  }): Promise<AppointmentListData> {
    const response = await apiService.get<ApiResponse<AppointmentListData>>(
      API_ENDPOINTS.APPOINTMENTS.LIST,
      params
    );
    return response.data.data;
  }

  static async getAppointmentDetails(id: string): Promise<AppointmentResponse> {
    const response = await apiService.get<ApiResponse<AppointmentResponse>>(
      API_ENDPOINTS.APPOINTMENTS.DETAILS(id)
    );
    return response.data.data;
  }

  static async createAppointment(data: AppointmentCreateInput): Promise<AppointmentResponse> {
    const response = await apiService.post<ApiResponse<AppointmentResponse>>(
      API_ENDPOINTS.APPOINTMENTS.CREATE,
      data
    );
    return response.data.data;
  }

  static async updateAppointment(id: string, data: Partial<AppointmentCreateInput>): Promise<AppointmentResponse> {
    const response = await apiService.put<ApiResponse<AppointmentResponse>>(
      API_ENDPOINTS.APPOINTMENTS.UPDATE(id),
      data
    );
    return response.data.data;
  }

  static async cancelAppointment(id: string): Promise<{ message: string }> {
    const response = await apiService.delete<ApiResponse<{ message: string }>>(
      API_ENDPOINTS.APPOINTMENTS.DELETE(id)
    );
    return response.data.data;
  }
} 