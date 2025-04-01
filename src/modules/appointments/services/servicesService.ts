import { apiService } from '../../../services/apiService';
import { API_ENDPOINTS } from '../../../constants/api';
import { ApiResponse } from './appointmentsService';

export interface ServiceItem {
  _id: string;
  name: string;
  duration: number;
}

export interface ServicePackage {
  _id: string;
  name: string;
  description: string;
  price: number;
  estimatedTime: number;
  services: ServiceItem[];
  tags: string[];
}

export interface ServiceTag {
  _id: string;
  name: string;
}

export interface ServicePackagesData {
  data: ServicePackage[];
}

export interface ServiceTagsData {
  data: ServiceTag[];
}

export class ServicesService {
  static async getServicePackages(params?: {
    search?: string;
    tag?: string;
  }): Promise<ServicePackagesData> {
    const response = await apiService.get<ApiResponse<ServicePackagesData>>(
      API_ENDPOINTS.SERVICES.PACKAGES,
      params
    );
    return response.data.data;
  }

  static async getServiceTags(): Promise<ServiceTagsData> {
    const response = await apiService.get<ApiResponse<ServiceTagsData>>(
      API_ENDPOINTS.SERVICES.TAGS
    );
    return response.data.data;
  }

  static async getPackageDetails(id: string): Promise<ServicePackage> {
    const response = await apiService.get<ApiResponse<ServicePackage>>(
      API_ENDPOINTS.SERVICES.PACKAGE_DETAILS(id)
    );
    return response.data.data;
  }
} 