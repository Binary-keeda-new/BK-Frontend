export interface Section {
  title: string;
  content: string;
}

export interface Point {
  heading: string;
  body: string;
}

export interface ChapterContent {
  title: string;
  description: string;
  sections?: Section[];
  points?: Point[];
  code?: string;
  videoUrl?: string;
}

export interface MCQQuestion {
  q: string;
  options: string[];
  ans: number;
  explanation: string;
}

export interface DebugExercise {
  instructions: string;
  initialCode?: string;
  solution?: string;
  buggy?: string;
  fixed?: string;
  hints: string[];
  expectedOutput: string;
}

export interface DragItem {
  id: string;
  text: string;
}

export interface DragExercise {
  instructions: string;
  lines: DragItem[];
  order: string[];
}

export interface CompleteExercise {
  template: string;
  answer: string;
  blanks: string[];
  instruction: string;
}
