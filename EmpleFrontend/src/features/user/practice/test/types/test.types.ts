export type TestSectionType = 'mcq' | 'coding';

export type UserTestSection = {
  id: string;
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
  sections: UserTestSection[];
};