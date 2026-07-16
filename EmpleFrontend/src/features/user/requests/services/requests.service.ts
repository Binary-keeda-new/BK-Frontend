import { apiRequest } from '@/shared/utils/api';

export interface RequestPayload {
  title: string;
  description: string;
  name: string;
  contact: string;
  email: string;
}

export const submitRequest = async (data: RequestPayload): Promise<{ success: boolean; data: any }> => {
  return apiRequest('/api/v1/requests', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};
