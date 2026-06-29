import { apiRequest } from '@/shared/utils/api';
import { UserProfile } from '../types';

export const getMyProfile = async (): Promise<{ success: boolean; data: UserProfile }> => {
  return apiRequest('/api/v1/profile');
};

export const upsertProfile = async (data: Partial<UserProfile>): Promise<{ success: boolean; data: UserProfile }> => {
  return apiRequest('/api/v1/profile', {
    method: 'PUT',
    body: JSON.stringify(data),
  });
};

export const getPublicProfile = async (username: string): Promise<{ success: boolean; data: UserProfile }> => {
  return apiRequest(`/api/v1/profile/u/${username}`);
};