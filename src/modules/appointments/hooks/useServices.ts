import { useQuery } from '@tanstack/react-query';
import { 
  ServicesService, 
  ServicePackage, 
  ServicePackagesData,
  ServiceTagsData
} from '../services/servicesService';

export const useServicePackages = (params?: {
  search?: string;
  tag?: string;
}) => {
  return useQuery<ServicePackagesData, Error>({
    queryKey: ['services', 'packages', params?.search, params?.tag],
    queryFn: () => ServicesService.getServicePackages(params),
    refetchOnWindowFocus: false,
  });
};

export const useServiceTags = () => {
  return useQuery<ServiceTagsData, Error>({
    queryKey: ['services', 'tags'],
    queryFn: () => ServicesService.getServiceTags(),
    refetchOnWindowFocus: false,
  });
};

export const usePackageDetails = (id: string) => {
  return useQuery<ServicePackage, Error>({
    queryKey: ['services', 'package', id],
    queryFn: () => ServicesService.getPackageDetails(id),
    enabled: !!id,
  });
}; 