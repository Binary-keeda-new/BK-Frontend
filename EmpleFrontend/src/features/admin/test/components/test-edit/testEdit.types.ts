import type { TestSettings } from '../TestSettingsCard';

export type SectionType = 'mcq' | 'coding';

export type CodingProblemOption = {
  _id: string;
  title: string;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
  topics?: string[];
  status?: 'draft' | 'published';
};

export type TestSection = {
  _id: string;
  type: SectionType;
  numberOfQuestions: number;
  duration: number;
  order?: number;
  codingProblemIds?: Array<CodingProblemOption | string>;
};

export type TestForm = {
  title: string;
  description: string;
  totalSections: string;
};

export type SectionForm = {
  type: SectionType;
  numberOfQuestions: string;
  duration: string;
  codingProblemIds: string[];
};

export type ToastType = 'success' | 'error';

export type ToastItem = {
  id: string;
  message: string;
  type: ToastType;
};

export type TestResponse = {
  success: boolean;
  message: string;
  data: {
    _id: string;
    title: string;
    description: string;
    totalSections: number;
    status?: 'draft' | 'published';
    settings?: Partial<TestSettings>;
  };
};

export type TestSectionListResponse = {
  success: boolean;
  message: string;
  data: TestSection[];
};

export type TestSectionSingleResponse = {
  success: boolean;
  message: string;
  data: TestSection;
};