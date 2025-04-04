import { useQuery } from '@tanstack/react-query';
import { 
  TechniciansService, 
  TechniciansResponse,
  TechnicianAvailabilityResponse
} from '../services/techniciansService';

export const useTechnicians = () => {
  return useQuery<TechniciansResponse, Error>({
    queryKey: ['technicians'],
    queryFn: () => TechniciansService.getTechnicians(),
  });
};

export const useTechnicianAvailability = (
  id: string,
  params: {
    startDate: string;
    endDate: string;
  }
) => {
  return useQuery<TechnicianAvailabilityResponse, Error>({
    queryKey: ['technician', 'availability', id, params],
    queryFn: () => TechniciansService.getTechnicianAvailability(id, params),
    enabled: !!id && !!params.startDate && !!params.endDate,
  });
}; 