export type TestSectionType = 'mcq' | 'coding';

export type UserTestSection = {
  _id: string;
  title: string;
  type: TestSectionType;
  duration: number;
  numberOfQuestions: number;
};

export type UserTest = {
  _id: string;
  title: string;
  description?: string;
  totalSections: number;
  totalDuration: number;
  attempted: boolean;
  status?: 'not_started' | 'in_progress' | 'completed';
  attemptId?: string;
  sections: UserTestSection[];
};