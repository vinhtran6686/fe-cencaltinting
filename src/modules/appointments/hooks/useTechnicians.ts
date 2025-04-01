import { useQuery } from '@tanstack/react-query';
import { 
  TechniciansService, 
  TechniciansData,
  TechnicianAvailabilityData
} from '../services/techniciansService';

export const useTechnicians = () => {
  return useQuery<TechniciansData, Error>({
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
  return useQuery<TechnicianAvailabilityData, Error>({
    queryKey: ['technician', 'availability', id, params],
    queryFn: () => TechniciansService.getTechnicianAvailability(id, params),
    enabled: !!id && !!params.startDate && !!params.endDate,
  });
}; 