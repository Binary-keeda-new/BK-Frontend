export type TestSectionType = 'mcq' | 'coding';


export type UserTestSection = {
  _id: string;
  title: string;
  type: TestSectionType;
  duration: number;
  numberOfQuestions: number;
  codingProblemIds?: UserCodingProblem[];
};

export type UserTest = {
  _id: string;
  title: string;
  description?: string;
  totalSections: number;
  totalDuration: number;
  attempted: boolean;
  sections: UserTestSection[];

  status?: 'not_started' | 'in_progress' | 'completed';
  attemptId?: string;
  settings?: UserTestSettings;
};

export type UserTestSettings = {
  blockKeyboard?: boolean;
  allowVirtualKeyboard?: boolean;
  allowCalculator?: boolean;
  noExitScreen?: boolean;
  ipBinding?: boolean;
  noCopyPaste?: boolean;
  noMinimize?: boolean;
  noDevTools?: boolean;
  noLostFocus?: boolean;
  navigationMode?: 'free' | 'sequential';
  minTimeBeforeSubmit?: number;
  deadline?: string;
  duration?: number;
  passwordProtected?: boolean;
};

export type UserCodingProblem = {
  _id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  topics: string[];
  recommendedTime: number;
  status?: 'draft' | 'published';
};