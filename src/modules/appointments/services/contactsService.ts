import { apiService } from '../../../services/apiService';
import { API_ENDPOINTS } from '../../../constants/api';
import { MetaData } from './appointmentsService';

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

export interface CreateContactPayload {
  name: string;
  email?: string;
  phone?: string;
  additionalPhone?: string;
  additionalInformation?: string;
  notes?: string;
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

  static async createContact(
    data: CreateContactPayload,
    options?: { showSuccessNotification?: boolean }
  ): Promise<ContactResponse> {
    const response = await apiService.post<ContactResponse>(
      API_ENDPOINTS.CONTACTS.CREATE,
      data,
      { showSuccessNotification: options?.showSuccessNotification }
    );
    return response;
  }
} 