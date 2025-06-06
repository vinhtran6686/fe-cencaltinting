import { useQuery } from '@tanstack/react-query';
import { 
  SchedulingService, 
  AvailableSlotsResponse,
  EndTimeCalculationResponse
} from '../services/schedulingService';

export const useAvailableSlots = (params: {
  date: string;
  serviceIds: string[];
}) => {
  return useQuery<AvailableSlotsResponse, Error>({
    queryKey: ['scheduling', 'available-slots', params],
    queryFn: () => SchedulingService.getAvailableSlots(params),
    enabled: !!params.date && !!params.serviceIds.length,
  });
};

export const useCalculateEndTime = (params: {
  startDate: string;
  startTime: string;
  serviceIds: string[];
}) => {
  return useQuery<EndTimeCalculationResponse, Error>({
    queryKey: ['scheduling', 'calculate-end-time', params],
    queryFn: () => SchedulingService.calculateEndTime(params),
    enabled: !!params.startDate && !!params.startTime && !!params.serviceIds.length,
  });
}; 