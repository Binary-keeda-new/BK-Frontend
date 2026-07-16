export type SessionCategory = 'workshop' | 'yt-session' | 'bk-session';

export interface Session {
  id: string;
  _id?: string;
  title: string;
  description: string;
  category: SessionCategory;
  videoLink: string;
  thumbnail: string;
  meetingLink?: string;
  scheduledAt?: string;
  createdAt?: string;
}

export type SessionFilter = 'all' | 'workshop' | 'yt-session' | 'bk-session';