import { apiService } from '../../../services/apiService';
import { API_ENDPOINTS } from '../../../constants/api'; 

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
    return await apiService.get<VehicleYearsData>(
      API_ENDPOINTS.VEHICLES.YEARS
    );
  }

  static async getVehicleMakes(): Promise<VehicleMakesData> {
    return await apiService.get<VehicleMakesData>(
      API_ENDPOINTS.VEHICLES.MAKES
    );
  }

  static async getVehicleModels(): Promise<VehicleModelsData> {
    return await apiService.get<VehicleModelsData>(
      API_ENDPOINTS.VEHICLES.MODELS
    );
  }

  static async getVehicleTypes(): Promise<VehicleTypesData> {
    return await apiService.get<VehicleTypesData>(
      API_ENDPOINTS.VEHICLES.TYPES
    );
  }
} 