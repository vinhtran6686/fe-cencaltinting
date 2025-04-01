import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { 
  AppointmentsService, 
  AppointmentCreateInput, 
  AppointmentListData 
} from '../services/appointmentsService';

export const useAppointments = (params?: {
  page?: number;
  limit?: number;
  status?: string;
  startDate?: string;
  endDate?: string;
  search?: string;
}) => {
  return useQuery<AppointmentListData, Error>({
    queryKey: ['appointments', params],
    queryFn: () => AppointmentsService.getAppointments(params),
  });
};

export const useAppointmentDetails = (id: string) => {
  return useQuery({
    queryKey: ['appointment', id],
    queryFn: () => AppointmentsService.getAppointmentDetails(id),
    enabled: !!id,
  });
};

export const useCreateAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AppointmentCreateInput) => AppointmentsService.createAppointment(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
    },
  });
};

export const useUpdateAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<AppointmentCreateInput> }) =>
      AppointmentsService.updateAppointment(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
      queryClient.invalidateQueries({ queryKey: ['appointment', variables.id] });
    },
  });
};

export const useCancelAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => AppointmentsService.cancelAppointment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
    },
  });
}; 