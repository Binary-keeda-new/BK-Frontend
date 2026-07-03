// --- TYPES & INTERFACES ---
export interface Point {
  heading?: string;
  body?: string;
  title?: string;
  content?: string;
  code?: string;
}

export interface ChapterContent {
  title: string;
  description: string;
  points: Point[];
  code?: string;
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

import { introBasicsContent, introBasicsMcqs, introBasicsDebug, introBasicsDrag, introBasicsComplete } from "./introBasics";
import { asymptoticContent, asymptoticMcqs, asymptoticDebug, asymptoticDrag, asymptoticComplete } from "./asymptotic";
import { linearSearchContent, linearSearchMcqs, linearSearchDebug, linearSearchDrag, linearSearchComplete } from "./linearSearch";
import { binarySearchContent, binarySearchMcqs, binarySearchDebug, binarySearchDrag, binarySearchComplete } from "./binarySearch";
import { jumpSearchContent, jumpSearchMcqs, jumpSearchDebug, jumpSearchDrag, jumpSearchComplete } from "./jumpSearch";
import { interpolationSearchContent, interpolationSearchMcqs, interpolationSearchDebug, interpolationSearchDrag, interpolationSearchComplete } from "./interpolationSearch";
import { exponentialSearchContent, exponentialSearchMcqs, exponentialSearchDebug, exponentialSearchDrag, exponentialSearchComplete } from "./exponentialSearch";
import { sortBubbleContent, sortBubbleMcqs, sortBubbleDebug, sortBubbleDrag, sortBubbleComplete } from "./sortBubble";
import { sortSelectionContent, sortSelectionMcqs, sortSelectionDebug, sortSelectionDrag, sortSelectionComplete } from "./sortSelection";
import { sortInsertionContent, sortInsertionMcqs, sortInsertionDebug, sortInsertionDrag, sortInsertionComplete } from "./sortInsertion";
import { sortMergeContent, sortMergeMcqs, sortMergeDebug, sortMergeDrag, sortMergeComplete } from "./sortMerge";
import { sortQuickContent, sortQuickMcqs, sortQuickDebug, sortQuickDrag, sortQuickComplete } from "./sortQuick";
import { dpFibonacciContent, dpFibonacciMcqs, dpFibonacciDebug, dpFibonacciDrag, dpFibonacciComplete } from "./dpFibonacci";
import { dpLCSContent, dpLCSMcqs, dpLCSDebug, dpLCSDrag, dpLCSComplete } from "./dpLCS";
import { dpKnapsackContent, dpKnapsackMcqs, dpKnapsackDebug, dpKnapsackDrag, dpKnapsackComplete } from "./dpKnapsack";
import { dpCoinContent, dpCoinMcqs, dpCoinDebug, dpCoinDrag, dpCoinComplete } from "./dpCoin";
import { dpEditDistanceContent, dpEditDistanceMcqs, dpEditDistanceDebug, dpEditDistanceDrag, dpEditDistanceComplete } from "./dpEditDistance";
import { dpMatrixContent, dpMatrixMcqs, dpMatrixDebug, dpMatrixDrag, dpMatrixComplete } from "./dpMatrix";

export const CHAPTERS = [
  // Module 1
  { id: "intro_basics", label: "Basics of Algorithms", module: "Module 1: Introduction to DAA" },
  { id: "intro_asymptotic", label: "Asymptotic Analysis", module: "Module 1: Introduction to DAA" },
  
  // Module 2
  { id: "search_linear", label: "Linear Search", module: "Module 2: Searching Algorithms" },
  { id: "search_binary", label: "Binary Search", module: "Module 2: Searching Algorithms" },
  { id: "search_jump", label: "Jump Search", module: "Module 2: Searching Algorithms" },
  { id: "search_interpolation", label: "Interpolation Search", module: "Module 2: Searching Algorithms" },
  { id: "search_exponential", label: "Exponential Search", module: "Module 2: Searching Algorithms" },

  // Module 3
  { id: "sort_bubble", label: "Bubble Sort", module: "Module 3: Sorting Algorithms" },
  { id: "sort_selection", label: "Selection Sort", module: "Module 3: Sorting Algorithms" },
  { id: "sort_insertion", label: "Insertion Sort", module: "Module 3: Sorting Algorithms" },
  { id: "sort_merge", label: "Merge Sort", module: "Module 3: Sorting Algorithms" },
  { id: "sort_quick", label: "Quick Sort", module: "Module 3: Sorting Algorithms" },

  // Module 4
  { id: "dp_fibonacci", label: "Fibonacci Numbers", module: "Module 4: Dynamic Programming" },
  { id: "dp_lcs", label: "Longest Common Subsequence", module: "Module 4: Dynamic Programming" },
  { id: "dp_knapsack", label: "0/1 Knapsack", module: "Module 4: Dynamic Programming" },
  { id: "dp_coin", label: "Coin Change", module: "Module 4: Dynamic Programming" },
  { id: "dp_edit", label: "Edit Distance", module: "Module 4: Dynamic Programming" },
  { id: "dp_matrix", label: "Matrix Chain Multiplication", module: "Module 4: Dynamic Programming" }
];

function formatContent(content: any, defaultTitle: string) {
  if (Array.isArray(content)) {
    return { title: defaultTitle, description: "Learn about this topic in detail.", points: content, code: "" };
  }
  return content;
}

export const CONTENT: Record<string, any> = {
  intro_basics: formatContent(introBasicsContent, "Basics of Algorithms"),
  intro_asymptotic: formatContent(asymptoticContent, "Asymptotic Analysis"),
  search_linear: formatContent(linearSearchContent, "Linear Search"),
  search_binary: formatContent(binarySearchContent, "Binary Search"),
  search_jump: formatContent(jumpSearchContent, "Jump Search"),
  search_interpolation: formatContent(interpolationSearchContent, "Interpolation Search"),
  search_exponential: formatContent(exponentialSearchContent, "Exponential Search"),
  sort_bubble: formatContent(sortBubbleContent, "Bubble Sort"),
  sort_selection: formatContent(sortSelectionContent, "Selection Sort"),
  sort_insertion: formatContent(sortInsertionContent, "Insertion Sort"),
  sort_merge: formatContent(sortMergeContent, "Merge Sort"),
  sort_quick: formatContent(sortQuickContent, "Quick Sort"),
  dp_fibonacci: formatContent(dpFibonacciContent, "Fibonacci Numbers"),
  dp_lcs: formatContent(dpLCSContent, "Longest Common Subsequence"),
  dp_knapsack: formatContent(dpKnapsackContent, "0/1 Knapsack"),
  dp_coin: formatContent(dpCoinContent, "Coin Change"),
  dp_edit: formatContent(dpEditDistanceContent, "Edit Distance"),
  dp_matrix: formatContent(dpMatrixContent, "Matrix Chain Multiplication"),
};

export const MCQS: Record<string, any> = {
  intro_basics: introBasicsMcqs,
  intro_asymptotic: asymptoticMcqs,
  search_linear: linearSearchMcqs,
  search_binary: binarySearchMcqs,
  search_jump: jumpSearchMcqs,
  search_interpolation: interpolationSearchMcqs,
  search_exponential: exponentialSearchMcqs,
  sort_bubble: sortBubbleMcqs,
  sort_selection: sortSelectionMcqs,
  sort_insertion: sortInsertionMcqs,
  sort_merge: sortMergeMcqs,
  sort_quick: sortQuickMcqs,
  dp_fibonacci: dpFibonacciMcqs,
  dp_lcs: dpLCSMcqs,
  dp_knapsack: dpKnapsackMcqs,
  dp_coin: dpCoinMcqs,
  dp_edit: dpEditDistanceMcqs,
  dp_matrix: dpMatrixMcqs,
};

export const DEBUG_EXERCISES: Record<string, any> = {
  intro_basics: introBasicsDebug,
  intro_asymptotic: asymptoticDebug,
  search_linear: linearSearchDebug,
  search_binary: binarySearchDebug,
  search_jump: jumpSearchDebug,
  search_interpolation: interpolationSearchDebug,
  search_exponential: exponentialSearchDebug,
  sort_bubble: sortBubbleDebug,
  sort_selection: sortSelectionDebug,
  sort_insertion: sortInsertionDebug,
  sort_merge: sortMergeDebug,
  sort_quick: sortQuickDebug,
  dp_fibonacci: dpFibonacciDebug,
  dp_lcs: dpLCSDebug,
  dp_knapsack: dpKnapsackDebug,
  dp_coin: dpCoinDebug,
  dp_edit: dpEditDistanceDebug,
  dp_matrix: dpMatrixDebug,
};

export const DRAG_EXERCISES: Record<string, any> = {
  intro_basics: introBasicsDrag,
  intro_asymptotic: asymptoticDrag,
  search_linear: linearSearchDrag,
  search_binary: binarySearchDrag,
  search_jump: jumpSearchDrag,
  search_interpolation: interpolationSearchDrag,
  search_exponential: exponentialSearchDrag,
  sort_bubble: sortBubbleDrag,
  sort_selection: sortSelectionDrag,
  sort_insertion: sortInsertionDrag,
  sort_merge: sortMergeDrag,
  sort_quick: sortQuickDrag,
  dp_fibonacci: dpFibonacciDrag,
  dp_lcs: dpLCSDrag,
  dp_knapsack: dpKnapsackDrag,
  dp_coin: dpCoinDrag,
  dp_edit: dpEditDistanceDrag,
  dp_matrix: dpMatrixDrag,
};

export const COMPLETE_EXERCISES: Record<string, any> = {
  intro_basics: introBasicsComplete,
  intro_asymptotic: asymptoticComplete,
  search_linear: linearSearchComplete,
  search_binary: binarySearchComplete,
  search_jump: jumpSearchComplete,
  search_interpolation: interpolationSearchComplete,
  search_exponential: exponentialSearchComplete,
  sort_bubble: sortBubbleComplete,
  sort_selection: sortSelectionComplete,
  sort_insertion: sortInsertionComplete,
  sort_merge: sortMergeComplete,
  sort_quick: sortQuickComplete,
  dp_fibonacci: dpFibonacciComplete,
  dp_lcs: dpLCSComplete,
  dp_knapsack: dpKnapsackComplete,
  dp_coin: dpCoinComplete,
  dp_edit: dpEditDistanceComplete,
  dp_matrix: dpMatrixComplete,
};
