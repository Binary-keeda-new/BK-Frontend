export interface Example {
  input: string;
  output: string;
  explanation: string;
}

export interface TestCase {
  input: string;
  output: string;
}

export interface CodingProblem {
  _id: string;

  title: string;

  difficulty: 'Easy' | 'Medium' | 'Hard';

  topics: string[];

  recommendedTime: number;

  statement: string;

  examples: Example[];

  constraints: string[];

  languages: string[];

  codeTemplates: {
    Java: string;
    Python: string;
    C: string;
    'C++': string;
  };

  lockedPrefixTemplates: {
  Java: string;
  Python: string;
  C: string;
  'C++': string;
};

lockedSuffixTemplates: {
  Java: string;
  Python: string;
  C: string;
  'C++': string;
};

  visibleTestCases: TestCase[];

  hiddenTestCases: TestCase[];

  hints: string[];

  editorial: string;
}