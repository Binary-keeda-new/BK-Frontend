import { SocialPost } from '../types/socialFeed.types';

const API_BASE = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/social-feed`;

type ApiResponse<T> = { success: boolean; message?: string; data: T };

export async function getSocialFeed(): Promise<SocialPost[]> {
  const res = await fetch(API_BASE, { cache: 'no-store' });
  const result: ApiResponse<SocialPost[]> = await res.json();
  
  if (!res.ok || !result.success) {
    throw new Error(result.message || 'Failed to fetch social feed');
  }
  
  return result.data;
}
