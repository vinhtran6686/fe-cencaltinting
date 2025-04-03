import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ContactsService, ContactListData, CreateContactPayload } from '../services/contactsService';

export const useContacts = (params?: {
  page?: number;
  limit?: number;
  search?: string;
}) => {
  return useQuery<ContactListData, Error>({
    queryKey: ['contacts', params],
    queryFn: () => ContactsService.getContacts(params),
  });
};

export const useContactDetails = (id: string) => {
  return useQuery({
    queryKey: ['contact', id],
    queryFn: () => ContactsService.getContactDetails(id),
    enabled: !!id,
  });
};

export const useCreateContact = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (params: { 
      data: CreateContactPayload, 
      options?: { showSuccessNotification?: boolean }
    }) => ContactsService.createContact(params.data, params.options),
    onSuccess: () => {
      // Invalidate contacts query to refetch
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
    },
  });
}; 