import { CHAPTER1_CONTENT } from './CHAPTER1_CONTENT';
import { CHAPTER1_MCQ } from './CHAPTER1_MCQ';
import { CHAPTER1_DEBUG } from './CHAPTER1_DEBUG';
import { CHAPTER1_DRAG } from './CHAPTER1_DRAG';
import { CHAPTER1_COMPLETE } from './CHAPTER1_COMPLETE';
import { CHAPTER2_CONTENT } from './CHAPTER2_CONTENT';
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
import { CHAPTER18_CONTENT } from './CHAPTER18_CONTENT';
import { CHAPTER18_MCQ } from './CHAPTER18_MCQ';
import { CHAPTER18_DEBUG } from './CHAPTER18_DEBUG';
import { CHAPTER18_DRAG } from './CHAPTER18_DRAG';
import { CHAPTER18_COMPLETE } from './CHAPTER18_COMPLETE';
import { CHAPTER19_CONTENT } from './CHAPTER19_CONTENT';
import { CHAPTER19_MCQ } from './CHAPTER19_MCQ';
import { CHAPTER19_DEBUG } from './CHAPTER19_DEBUG';
import { CHAPTER19_DRAG } from './CHAPTER19_DRAG';
import { CHAPTER19_COMPLETE } from './CHAPTER19_COMPLETE';

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

// --- CURRICULUM DAT---

export const CONTENT: Record<string, ChapterContent> = {
  "chapter1": CHAPTER1_CONTENT as any,
  "chapter2": CHAPTER2_CONTENT as any,
  "chapter3": CHAPTER3_CONTENT as any,
  "chapter4": CHAPTER4_CONTENT as any,
  "chapter5": CHAPTER5_CONTENT as any,
  "chapter6": CHAPTER6_CONTENT as any,
  "chapter7": CHAPTER7_CONTENT as any,
  "chapter8": CHAPTER8_CONTENT as any,
  "chapter9": CHAPTER9_CONTENT as any,
  "chapter10": CHAPTER10_CONTENT as any,
  "chapter11": CHAPTER11_CONTENT as any,
  "chapter12": CHAPTER12_CONTENT as any,
  "chapter13": CHAPTER13_CONTENT as any,
  "chapter14": CHAPTER14_CONTENT as any,
  "chapter15": CHAPTER15_CONTENT as any,
  "chapter16": CHAPTER16_CONTENT as any,
  "chapter17": CHAPTER17_CONTENT as any,
  "chapter18": CHAPTER18_CONTENT as any,
  "chapter19": CHAPTER19_CONTENT as any,
};

export const MCQ: Record<string, MCQQuestion[]> = {
  "chapter1": CHAPTER1_MCQ as any,
  "chapter2": CHAPTER2_MCQ as any,
  "chapter3": CHAPTER3_MCQ as any,
  "chapter4": CHAPTER4_MCQ as any,
  "chapter5": CHAPTER5_MCQ as any,
  "chapter6": CHAPTER6_MCQ as any,
  "chapter7": CHAPTER7_MCQ as any,
  "chapter8": CHAPTER8_MCQ as any,
  "chapter9": CHAPTER9_MCQ as any,
  "chapter10": CHAPTER10_MCQ as any,
  "chapter11": CHAPTER11_MCQ as any,
  "chapter12": CHAPTER12_MCQ as any,
  "chapter13": CHAPTER13_MCQ as any,
  "chapter14": CHAPTER14_MCQ as any,
  "chapter15": CHAPTER15_MCQ as any,
  "chapter16": CHAPTER16_MCQ as any,
  "chapter17": CHAPTER17_MCQ as any,
  "chapter18": CHAPTER18_MCQ as any,
  "chapter19": CHAPTER19_MCQ as any,
};

export const DEBUG: Record<string, DebugExercise[]> = {
  "chapter1": CHAPTER1_DEBUG as any,
  "chapter2": CHAPTER2_DEBUG as any,
  "chapter3": CHAPTER3_DEBUG as any,
  "chapter4": CHAPTER4_DEBUG as any,
  "chapter5": CHAPTER5_DEBUG as any,
  "chapter6": CHAPTER6_DEBUG as any,
  "chapter7": CHAPTER7_DEBUG as any,
  "chapter8": CHAPTER8_DEBUG as any,
  "chapter9": CHAPTER9_DEBUG as any,
  "chapter10": CHAPTER10_DEBUG as any,
  "chapter11": CHAPTER11_DEBUG as any,
  "chapter12": CHAPTER12_DEBUG as any,
  "chapter13": CHAPTER13_DEBUG as any,
  "chapter14": CHAPTER14_DEBUG as any,
  "chapter15": CHAPTER15_DEBUG as any,
  "chapter16": CHAPTER16_DEBUG as any,
  "chapter17": CHAPTER17_DEBUG as any,
  "chapter18": CHAPTER18_DEBUG as any,
  "chapter19": CHAPTER19_DEBUG as any,
};

export const COMPLETE_EXERCISES: Record<string, CompleteExercise[]> = {
  "chapter1": CHAPTER1_COMPLETE as any,
  "chapter2": CHAPTER2_COMPLETE as any,
  "chapter3": CHAPTER3_COMPLETE as any,
  "chapter4": CHAPTER4_COMPLETE as any,
  "chapter5": CHAPTER5_COMPLETE as any,
  "chapter6": CHAPTER6_COMPLETE as any,
  "chapter7": CHAPTER7_COMPLETE as any,
  "chapter8": CHAPTER8_COMPLETE as any,
  "chapter9": CHAPTER9_COMPLETE as any,
  "chapter10": CHAPTER10_COMPLETE as any,
  "chapter11": CHAPTER11_COMPLETE as any,
  "chapter12": CHAPTER12_COMPLETE as any,
  "chapter13": CHAPTER13_COMPLETE as any,
  "chapter14": CHAPTER14_COMPLETE as any,
  "chapter15": CHAPTER15_COMPLETE as any,
  "chapter16": CHAPTER16_COMPLETE as any,
  "chapter17": CHAPTER17_COMPLETE as any,
  "chapter18": CHAPTER18_COMPLETE as any,
  "chapter19": CHAPTER19_COMPLETE as any,
};

export const DRAG_DROP: Record<string, DragExercise[]> = {
  "chapter1": CHAPTER1_DRAG as any,
  "chapter2": CHAPTER2_DRAG as any,
  "chapter3": CHAPTER3_DRAG as any,
  "chapter4": CHAPTER4_DRAG as any,
  "chapter5": CHAPTER5_DRAG as any,
  "chapter6": CHAPTER6_DRAG as any,
  "chapter7": CHAPTER7_DRAG as any,
  "chapter8": CHAPTER8_DRAG as any,
  "chapter9": CHAPTER9_DRAG as any,
  "chapter10": CHAPTER10_DRAG as any,
  "chapter11": CHAPTER11_DRAG as any,
  "chapter12": CHAPTER12_DRAG as any,
  "chapter13": CHAPTER13_DRAG as any,
  "chapter14": CHAPTER14_DRAG as any,
  "chapter15": CHAPTER15_DRAG as any,
  "chapter16": CHAPTER16_DRAG as any,
  "chapter17": CHAPTER17_DRAG as any,
  "chapter18": CHAPTER18_DRAG as any,
  "chapter19": CHAPTER19_DRAG as any,
};

export const CHAPTERS = [
  { id: "chapter1", label: "01 · Introduction to Algorithms", module: "1. Algorithmic Time Complexity & Analysis" },
  { id: "chapter2", label: "02 · Mathematical Foundations", module: "1. Algorithmic Time Complexity & Analysis" },
  { id: "chapter3", label: "03 · Asymptotic Analysis", module: "1. Algorithmic Time Complexity & Analysis" },
  { id: "chapter4", label: "04 · Recurrence Relations", module: "1. Algorithmic Time Complexity & Analysis" },
  { id: "chapter5", label: "05 · Linear Search", module: "1. Algorithmic Time Complexity & Analysis" },
  { id: "chapter6", label: "06 · Binary Search", module: "1. Algorithmic Time Complexity & Analysis" },
  { id: "chapter7", label: "07 · Searching Variations", module: "1. Algorithmic Time Complexity & Analysis" },
  { id: "chapter8", label: "08 · Introduction to Sorting", module: "2. Sorting Algorithms" },
  { id: "chapter9", label: "09 · Bubble Sort", module: "2. Sorting Algorithms" },
  { id: "chapter10", label: "10 · Selection Sort", module: "2. Sorting Algorithms" },
  { id: "chapter11", label: "11 · Insertion Sort", module: "2. Sorting Algorithms" },
  { id: "chapter12", label: "12 · Merge Sort", module: "2. Sorting Algorithms" },
  { id: "chapter13", label: "13 · Quick Sort", module: "2. Sorting Algorithms" },
  { id: "chapter14", label: "14 · Heap Sort", module: "2. Sorting Algorithms" },
  { id: "chapter15", label: "15 · Non-Comparison Sorting", module: "2. Sorting Algorithms" },
  { id: "chapter16", label: "16 · Greedy Paradigm", module: "3. Greedy Algorithms" },
  { id: "chapter17", label: "17 · DP Fundamentals", module: "4. Dynamic Programming" },
  { id: "chapter18", label: "18 · 1D Dynamic Programming", module: "4. Dynamic Programming" },
  { id: "chapter19", label: "19 · 2D Dynamic Programming", module: "4. Dynamic Programming" },
];

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
