export type Example = {
  input: string;
  output: string;
  explanation?: string;
};

export type PreviewCodingProblem = {
  _id: string;
  title: string;
  statement: string;

  difficulty: 'Easy' | 'Medium' | 'Hard';

  constraints: string[];
  examples: Example[];
  topics: string[];
  recommendedTime?: number;

  editorial: string;
  hints: string[];

  languages: string[];
  codeTemplates: Record<string, string>;
};