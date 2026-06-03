export interface Blog {
  _id: string;
  title: string;
  content: string;
  author: string;
  tags: string[];
  coverImage?: string | null;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export type BlogPayload = Omit<Blog, '_id' | 'createdAt' | 'updatedAt'>;
