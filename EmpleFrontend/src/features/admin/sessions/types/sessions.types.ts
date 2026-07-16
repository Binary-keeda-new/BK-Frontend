export type SessionCategory = 'workshop' | 'yt-session' | 'bk-session';

export interface Session {
  _id: string;
  id?: string;
  title: string;
  description: string;
  category: SessionCategory;
  videoLink: string;
  thumbnail: string;
  meetingLink?: string;
  scheduledAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface SessionFormData {
  title: string;
  description: string;
  category: SessionCategory;
  videoLink: string;
  thumbnail: string;
  meetingLink: string;
  scheduledAt: string;
}