export type QuestionType = 'MCQ' | 'MSQ' | 'NAT';

export type Option = {
  id: string;
  text: string;
  isImage?: boolean;
  imageUrl?: string;
};

export type TestEditorQuestion = {
  id: string;
  question: string;
  type: QuestionType;
  options: Option[];
  correct: string[];
  natAnswer?: string;
  positiveMarks: number;
  negativeMarks: number;
  imageUrl?: string;
  solution?: string;
  solutionMedia?: string | null;
  isPersisted?: boolean;
};

export type ImportedTestQuestionInput = {
  question: string;
  questionType?: QuestionType;
  options?: string[];
  correctOptions?: string[];
  positiveMarks?: number;
  negativeMarks?: number;
  imageUrl?: string | null;
  solution?: string | null;
  solutionMedia?: string | null;
};