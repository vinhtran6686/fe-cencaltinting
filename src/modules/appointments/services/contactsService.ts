import { apiService } from '../../../services/apiService';
import { API_ENDPOINTS } from '../../../constants/api';
import { ApiResponse, MetaData } from './appointmentsService';

export interface ContactResponse {
  _id: string;
  name: string;
  email: string;
  phone: string;
  additionalInformation?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ContactListData {
  data: ContactResponse[];
  meta: MetaData;
}

export class ContactsService {
  static async getContacts(params?: {
    page?: number;
    limit?: number;
    search?: string;
  }): Promise<ContactListData> {
    const response = await apiService.get<ContactListData>(
      API_ENDPOINTS.CONTACTS.LIST,
      params
    );
    return response;
  }

  static async getContactDetails(id: string): Promise<ContactResponse> {
    const response = await apiService.get<ContactResponse>(
      API_ENDPOINTS.CONTACTS.DETAILS(id)
    );
    return response;
  }
} 