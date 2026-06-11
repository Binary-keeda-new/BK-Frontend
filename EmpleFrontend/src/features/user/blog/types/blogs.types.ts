export interface ContentBlock {
  type: 'text' | 'heading' | 'image' | 'quote' | 'divider';
  content: string;
  metadata?: any;
}

export interface Blog {
  _id: string;
  title: string;
  content: string;
  blocks?: ContentBlock[];
  author: string;
  tags: string[];
  coverImage?: string;
  published: boolean;
  createdAt: string;
}
