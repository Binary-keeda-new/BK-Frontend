import { apiRequest } from '@/shared/utils/api';

export const getAllRequests = async (): Promise<{ success: boolean; count: number; data: any[] }> => {
  return apiRequest('/api/v1/admin/requests');
};

export const updateRequestStatus = async (id: string, status: 'pending' | 'resolved'): Promise<{ success: boolean; data: any }> => {
  return apiRequest(`/api/v1/admin/requests/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  });
};

export const deleteRequest = async (id: string): Promise<{ success: boolean; message: string }> => {
  return apiRequest(`/api/v1/admin/requests/${id}`, {
    method: 'DELETE',
  });
};
