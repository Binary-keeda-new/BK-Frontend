import { CHAPTER1_BASICS } from './CHAPTER1_BASICS';
import { CHAPTER1_MCQ } from './CHAPTER1_MCQ';
import { CHAPTER1_DEBUG } from './CHAPTER1_DEBUG';
import { CHAPTER1_DRAG } from './CHAPTER1_DRAG';
import { CHAPTER1_COMPLETE } from './CHAPTER1_COMPLETE';
import { CHAPTER2_CONTENT } from './CHAPTER2_CONTENT_PREMIUM';
import { CHAPTER2_MCQ } from './CHAPTER2_MCQ';
import { CHAPTER2_DEBUG } from './CHAPTER2_DEBUG';
import { CHAPTER2_DRAG } from './CHAPTER2_DRAG';
import { CHAPTER2_COMPLETE } from './CHAPTER2_COMPLETE';
import { CHAPTER3_CONTENT } from './CHAPTER3_CONTENT';
import { CHAPTER3_MCQ } from './CHAPTER3_MCQ';
import { CHAPTER3_DEBUG } from './CHAPTER3_DEBUG';
import { CHAPTER3_DRAG } from './CHAPTER3_DRAG';
import { CHAPTER3_COMPLETE } from './CHAPTER3_COMPLETE';
import { CHAPTER4_CONTENT } from './CHAPTER4_CONTENT';
import { CHAPTER4_MCQ } from './CHAPTER4_MCQ';
import { CHAPTER4_DEBUG } from './CHAPTER4_DEBUG';
import { CHAPTER4_DRAG } from './CHAPTER4_DRAG';
import { CHAPTER4_COMPLETE } from './CHAPTER4_COMPLETE';
import { CHAPTER5_CONTENT } from './CHAPTER5_CONTENT';
import { CHAPTER5_MCQ } from './CHAPTER5_MCQ';
import { CHAPTER5_DEBUG } from './CHAPTER5_DEBUG';
import { CHAPTER5_DRAG } from './CHAPTER5_DRAG';
import { CHAPTER5_COMPLETE } from './CHAPTER5_COMPLETE';

import { CHAPTER6_CONTENT } from './CHAPTER6_CONTENT';
import { CHAPTER6_MCQ } from './CHAPTER6_MCQ';
import { CHAPTER6_DEBUG } from './CHAPTER6_DEBUG';
import { CHAPTER6_DRAG } from './CHAPTER6_DRAG';
import { CHAPTER6_COMPLETE } from './CHAPTER6_COMPLETE';

import { CHAPTER7_CONTENT } from './CHAPTER7_CONTENT';
import { CHAPTER7_MCQ } from './CHAPTER7_MCQ';
import { CHAPTER7_DEBUG } from './CHAPTER7_DEBUG';
import { CHAPTER7_DRAG } from './CHAPTER7_DRAG';
import { CHAPTER7_COMPLETE } from './CHAPTER7_COMPLETE';



import { CHAPTER8_CONTENT } from './CHAPTER8_CONTENT';
import { CHAPTER8_MCQ } from './CHAPTER8_MCQ';
import { CHAPTER8_DEBUG } from './CHAPTER8_DEBUG';
import { CHAPTER8_DRAG } from './CHAPTER8_DRAG';
import { CHAPTER8_COMPLETE } from './CHAPTER8_COMPLETE';
import { CHAPTER9_CONTENT } from './CHAPTER9_CONTENT';
import { CHAPTER9_MCQ } from './CHAPTER9_MCQ';
import { CHAPTER9_DEBUG } from './CHAPTER9_DEBUG';
import { CHAPTER9_DRAG } from './CHAPTER9_DRAG';
import { CHAPTER9_COMPLETE } from './CHAPTER9_COMPLETE';
import { CHAPTER10_CONTENT } from './CHAPTER10_CONTENT';
import { CHAPTER10_MCQ } from './CHAPTER10_MCQ';
import { CHAPTER10_DEBUG } from './CHAPTER10_DEBUG';
import { CHAPTER10_DRAG } from './CHAPTER10_DRAG';
import { CHAPTER10_COMPLETE } from './CHAPTER10_COMPLETE';
import { CHAPTER11_CONTENT } from './CHAPTER11_CONTENT';
import { CHAPTER11_MCQ } from './CHAPTER11_MCQ';
import { CHAPTER11_DEBUG } from './CHAPTER11_DEBUG';
import { CHAPTER11_DRAG } from './CHAPTER11_DRAG';
import { CHAPTER11_COMPLETE } from './CHAPTER11_COMPLETE';
import { CHAPTER12_CONTENT } from './CHAPTER12_CONTENT';
import { CHAPTER12_MCQ } from './CHAPTER12_MCQ';
import { CHAPTER12_DEBUG } from './CHAPTER12_DEBUG';
import { CHAPTER12_DRAG } from './CHAPTER12_DRAG';
import { CHAPTER12_COMPLETE } from './CHAPTER12_COMPLETE';
import { CHAPTER13_CONTENT } from './CHAPTER13_CONTENT';
import { CHAPTER13_MCQ } from './CHAPTER13_MCQ';
import { CHAPTER13_DEBUG } from './CHAPTER13_DEBUG';
import { CHAPTER13_DRAG } from './CHAPTER13_DRAG';
import { CHAPTER13_COMPLETE } from './CHAPTER13_COMPLETE';
import { CHAPTER14_CONTENT } from './CHAPTER14_CONTENT';
import { CHAPTER14_MCQ } from './CHAPTER14_MCQ';
import { CHAPTER14_DEBUG } from './CHAPTER14_DEBUG';
import { CHAPTER14_DRAG } from './CHAPTER14_DRAG';
import { CHAPTER14_COMPLETE } from './CHAPTER14_COMPLETE';
import { CHAPTER15_CONTENT } from './CHAPTER15_CONTENT';
import { CHAPTER15_MCQ } from './CHAPTER15_MCQ';
import { CHAPTER15_DEBUG } from './CHAPTER15_DEBUG';
import { CHAPTER15_DRAG } from './CHAPTER15_DRAG';
import { CHAPTER15_COMPLETE } from './CHAPTER15_COMPLETE';
import { CHAPTER16_CONTENT } from './CHAPTER16_CONTENT';
import { CHAPTER16_MCQ } from './CHAPTER16_MCQ';
import { CHAPTER16_DEBUG } from './CHAPTER16_DEBUG';
import { CHAPTER16_DRAG } from './CHAPTER16_DRAG';
import { CHAPTER16_COMPLETE } from './CHAPTER16_COMPLETE';
import { CHAPTER17_CONTENT } from './CHAPTER17_CONTENT';
import { CHAPTER17_MCQ } from './CHAPTER17_MCQ';
import { CHAPTER17_DEBUG } from './CHAPTER17_DEBUG';
import { CHAPTER17_DRAG } from './CHAPTER17_DRAG';
import { CHAPTER17_COMPLETE } from './CHAPTER17_COMPLETE';

// --- TYPES & INTERFACES ---
export interface Point {
  heading: string;
  body: string;
}

export interface ChapterContent {
  title: string;
  description: string;
  points: Point[];
  code: string;
  codeDescription?: string;
}

export interface MCQQuestion {
  q: string;
  options: string[];
  ans: number;
  explanation: string;
}

export interface DebugExercise {
  instructions: string;
  buggy: string;
  fixed: string;
  hints: string[];
  expectedOutput: string;
}

export interface DragLine {
  id: string;
  text: string;
}

export interface DragExercise {
  instructions: string;
  lines: DragLine[];
  order: string[];
}

export interface CompleteExercise {
  template: string;
  answer: string;
  blanks: string[];
  instruction: string;
}

// --- CURRICULUM DATA ---

export const CONTENT: Record<string, ChapterContent> = {
  basics: CHAPTER1_BASICS as any,
  variables: CHAPTER2_CONTENT as any,
  operators: CHAPTER3_CONTENT as any,
  io: CHAPTER4_CONTENT as any,
  "control-flow": CHAPTER5_CONTENT as any,
  loops: CHAPTER6_CONTENT as any,
  functions: CHAPTER7_CONTENT as any,
  arrays: CHAPTER8_CONTENT as any,
  strings: CHAPTER9_CONTENT as any,
  pointers: CHAPTER10_CONTENT as any,
  structures: CHAPTER11_CONTENT as any,
  memory: CHAPTER12_CONTENT as any,
  "file-handling": CHAPTER13_CONTENT as any,
  bitwise: CHAPTER14_CONTENT as any,
  preprocessor: CHAPTER15_CONTENT as any,
  "linked-lists": CHAPTER16_CONTENT as any,
  "stacks-queues": CHAPTER17_CONTENT as any,
};

export const MCQ: Record<string, MCQQuestion[]> = {
  basics: CHAPTER1_MCQ as any,
  variables: CHAPTER2_MCQ as any,
  operators: CHAPTER3_MCQ as any,
  io: CHAPTER4_MCQ as any,
  "control-flow": CHAPTER5_MCQ as any,
  loops: CHAPTER6_MCQ as any,
  functions: CHAPTER7_MCQ as any,
  arrays: CHAPTER8_MCQ as any,
  strings: CHAPTER9_MCQ as any,
  pointers: CHAPTER10_MCQ as any,
  structures: CHAPTER11_MCQ as any,
  memory: CHAPTER12_MCQ as any,
  "file-handling": CHAPTER13_MCQ as any,
  bitwise: CHAPTER14_MCQ as any,
  preprocessor: CHAPTER15_MCQ as any,
  "linked-lists": CHAPTER16_MCQ as any,
  "stacks-queues": CHAPTER17_MCQ as any,
};

export const DEBUG: Record<string, DebugExercise[]> = {
  basics: CHAPTER1_DEBUG as any,
  variables: CHAPTER2_DEBUG as any,
  operators: CHAPTER3_DEBUG as any,
  io: CHAPTER4_DEBUG as any,
  "control-flow": CHAPTER5_DEBUG as any,
  loops: CHAPTER6_DEBUG as any,
  functions: CHAPTER7_DEBUG as any,
  arrays: CHAPTER8_DEBUG as any,
  strings: CHAPTER9_DEBUG as any,
  pointers: CHAPTER10_DEBUG as any,
  structures: CHAPTER11_DEBUG as any,
  memory: CHAPTER12_DEBUG as any,
  "file-handling": CHAPTER13_DEBUG as any,
  bitwise: CHAPTER14_DEBUG as any,
  preprocessor: CHAPTER15_DEBUG as any,
  "linked-lists": CHAPTER16_DEBUG as any,
  "stacks-queues": CHAPTER17_DEBUG as any,
};

export const COMPLETE_EXERCISES: Record<string, CompleteExercise[]> = {
  basics: CHAPTER1_COMPLETE as any,
  variables: CHAPTER2_COMPLETE as any,
  operators: CHAPTER3_COMPLETE as any,
  io: CHAPTER4_COMPLETE as any,
  "control-flow": CHAPTER5_COMPLETE as any,
  loops: CHAPTER6_COMPLETE as any,
  functions: CHAPTER7_COMPLETE as any,
  arrays: CHAPTER8_COMPLETE as any,
  strings: CHAPTER9_COMPLETE as any,
  pointers: CHAPTER10_COMPLETE as any,
  structures: CHAPTER11_COMPLETE as any,
  memory: CHAPTER12_COMPLETE as any,
  "file-handling": CHAPTER13_COMPLETE as any,
  bitwise: CHAPTER14_COMPLETE as any,
  preprocessor: CHAPTER15_COMPLETE as any,
  "linked-lists": CHAPTER16_COMPLETE as any,
  "stacks-queues": CHAPTER17_COMPLETE as any,
};

export const DRAG_DROP: Record<string, DragExercise> = {
  basics: CHAPTER1_DRAG as any,
  variables: CHAPTER2_DRAG as any,
  operators: CHAPTER3_DRAG as any,
  io: CHAPTER4_DRAG as any,
  "control-flow": CHAPTER5_DRAG as any,
  loops: CHAPTER6_DRAG as any,
  functions: CHAPTER7_DRAG as any,
  arrays: CHAPTER8_DRAG as any,
  strings: CHAPTER9_DRAG as any,
  pointers: CHAPTER10_DRAG as any,
  structures: CHAPTER11_DRAG as any,
  memory: CHAPTER12_DRAG as any,
  "file-handling": CHAPTER13_DRAG as any,
  bitwise: CHAPTER14_DRAG as any,
  preprocessor: CHAPTER15_DRAG as any,
  "linked-lists": CHAPTER16_DRAG as any,
  "stacks-queues": CHAPTER17_DRAG as any,
};

export const CHAPTERS = [
  { id: "basics", label: "01 \u00B7 Basics" },
  { id: "variables", label: "02 \u00B7 Variables" },
  { id: "io", label: "03 \u00B7 Input / Output" },
  { id: "operators", label: "04 \u00B7 Operators" },
  { id: "control-flow", label: "05 \u00B7 Control Flow" },
  { id: "loops", label: "06 \u00B7 Loops" },
  { id: "functions", label: "07 \u00B7 Functions" },
  { id: "arrays", label: "08 \u00B7 Arrays" },
  { id: "strings", label: "09 \u00B7 Strings" },
  { id: "pointers", label: "10 \u00B7 Pointers" },
  { id: "structures", label: "11 \u00B7 Structures and Unions" },
  { id: "memory", label: "12 \u00B7 Dynamic Memory Allocation" },
  { id: "file-handling", label: "13 \u00B7 File Handling" },
  { id: "bitwise", label: "14 \u00B7 Bitwise Programming" },
  { id: "preprocessor", label: "15 \u00B7 Preprocessor Directives" },
  { id: "linked-lists", label: "16 \u00B7 Linked Lists" },
  { id: "stacks-queues", label: "17 \u00B7 Stacks and Queues in C" }
];

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
