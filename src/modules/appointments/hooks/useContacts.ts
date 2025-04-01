import { useQuery } from '@tanstack/react-query';
import { ContactsService, ContactListData } from '../services/contactsService';

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