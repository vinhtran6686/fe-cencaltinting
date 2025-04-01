import { apiService } from '../../../services/apiService';
import { API_ENDPOINTS } from '../../../constants/api';
import { ApiResponse } from './appointmentsService';

export interface VehicleYear {
  id: string;
  value: string;
}

export interface VehicleMake {
  id: string;
  value: string; 
}

export interface VehicleModel {
  id: string;
  value: string; 
}

export interface VehicleType {
  id: string;
  value: string;
}

export interface VehicleYearsData {
  data: VehicleYear[];
}

export interface VehicleMakesData {
  data: VehicleMake[];
}

export interface VehicleModelsData {
  data: VehicleModel[];
}

export interface VehicleTypesData {
  data: VehicleType[];
}

export class VehiclesService {
  static async getVehicleYears(): Promise<VehicleYearsData> {
    const response = await apiService.get<ApiResponse<VehicleYearsData>>(
      API_ENDPOINTS.VEHICLES.YEARS
    );
    return response.data.data;
  }

  static async getVehicleMakes(): Promise<VehicleMakesData> {
    const response = await apiService.get<ApiResponse<VehicleMakesData>>(
      API_ENDPOINTS.VEHICLES.MAKES
    );
    return response.data.data;
  }

  static async getVehicleModels(): Promise<VehicleModelsData> {
    const response = await apiService.get<ApiResponse<VehicleModelsData>>(
      API_ENDPOINTS.VEHICLES.MODELS
    );
    return response.data.data;
  }

  static async getVehicleTypes(): Promise<VehicleTypesData> {
    const response = await apiService.get<ApiResponse<VehicleTypesData>>(
      API_ENDPOINTS.VEHICLES.TYPES
    );
    return response.data.data;
  }
} 