export type SessionCategory = 'workshop' | 'yt-session';

export interface Session {
  id: string;
  _id?: string;
  title: string;
  description: string;
  category: SessionCategory;
  videoLink: string;
  thumbnail: string;
  createdAt?: string;
}

export type SessionFilter = 'all' | 'workshop' | 'yt-session';