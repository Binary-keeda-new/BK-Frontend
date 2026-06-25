import { apiRequest } from '@/shared/utils/api';
import { UserProfile } from '../../user/profile/types';

export interface PaginatedProfiles {
  profiles: UserProfile[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export const getAdminProfiles = async (page: number = 1, limit: number = 10, search: string = ''): Promise<{ success: boolean; data: PaginatedProfiles }> => {
  return apiRequest(`/api/v1/admin/profiles?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`);
};

export const updateAdminProfileStatus = async (id: string, isPublished: boolean): Promise<{ success: boolean; data: UserProfile }> => {
  return apiRequest(`/api/v1/admin/profiles/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ isPublished }),
  });
};
