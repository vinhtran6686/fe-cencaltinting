import { apiService } from '../../../services/apiService';
import { API_ENDPOINTS } from '../../../constants/api';
import { MetaData } from './appointmentsService';

export interface ServiceItem {
  _id: string;
  name: string;
  price: number;
  estimatedTime: number;
}

export interface ServicePackage {
  _id: string;
  name: string;
  description: string;
  totalPrice: number;
  estimatedTime: number;
  services: ServiceItem[];
  tags: string[];
}

export interface ServicePackagesData {
  data: ServicePackage[];
  meta: MetaData;
}

export interface ServiceTagsData {
  data: string[];
}

export class ServicesService {
  static async getServicePackages(params?: {
    search?: string;
    tag?: string;
  }): Promise<ServicePackagesData> {
    const response = await apiService.get<ServicePackagesData>(
      API_ENDPOINTS.SERVICES.PACKAGES,
      params
    ); 
    return response;
  }

  static async getServiceTags(): Promise<ServiceTagsData> {
    const response = await apiService.get<ServiceTagsData>(
      API_ENDPOINTS.SERVICES.TAGS
    );
    return response;
  }

  static async getPackageDetails(id: string): Promise<ServicePackage> {
    const response = await apiService.get<ServicePackage>(
      API_ENDPOINTS.SERVICES.PACKAGE_DETAILS(id)
    );
    return response;
  }
} 