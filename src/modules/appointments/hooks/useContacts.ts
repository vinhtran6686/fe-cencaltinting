import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ContactsService, ContactListData, CreateContactPayload } from '../services/contactsService';

export const useContacts = (params?: {
  page?: number;
  limit?: number;
  search?: string;
  enabled?: boolean;
}) => {
  const { enabled = true, ...queryParams } = params || {};
  
  return useQuery<ContactListData & { _fetchTime?: number }, Error>({
    queryKey: ['contacts', queryParams],
    queryFn: async () => {
      const data = await ContactsService.getContacts(queryParams);
      // Add fetch timestamp to track data freshness
      return { ...data, _fetchTime: Date.now() };
    },
    enabled: enabled,
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
      options?: { 
        showSuccessNotification?: boolean;
        refreshOnSuccess?: boolean;
      }
    }) => ContactsService.createContact(params.data, params.options),
    onSuccess: (_, variables) => {
      // Only invalidate contacts query if refreshOnSuccess is true or not specified
      if (variables.options?.refreshOnSuccess !== false) {
        queryClient.invalidateQueries({ queryKey: ['contacts'] });
      }
    },
  });
}; 