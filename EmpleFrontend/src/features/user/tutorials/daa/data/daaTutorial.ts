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
  { id: "sort_quick", label: "Quick Sort", module: "Module 3: Sorting Algorithms" }
];

export const CONTENT: Record<string, any> = {
  intro_basics: introBasicsContent,
  intro_asymptotic: asymptoticContent,
  search_linear: linearSearchContent,
  search_binary: binarySearchContent,
  search_jump: jumpSearchContent,
  search_interpolation: interpolationSearchContent,
  search_exponential: exponentialSearchContent,
  sort_bubble: { title: "Bubble Sort", description: "Learn the simplest sorting algorithm that repeatedly steps through the list, comparing adjacent elements and swapping them if they are in the wrong order.", points: sortBubbleContent as any, code: "" },
  sort_selection: { title: "Selection Sort", description: "Understand how to sort an array by repeatedly finding the minimum element from the unsorted part and putting it at the beginning.", points: sortSelectionContent as any, code: "" },
  sort_insertion: { title: "Insertion Sort", description: "Master the algorithm that builds the final sorted array one item at a time, much like sorting playing cards in your hands.", points: sortInsertionContent as any, code: "" },
  sort_merge: { title: "Merge Sort", description: "Explore the Divide and Conquer algorithm that divides the array into halves, sorts them, and then merges the sorted halves.", points: sortMergeContent as any, code: "" },
  sort_quick: { title: "Quick Sort", description: "Learn the highly efficient sorting algorithm that picks an element as pivot and partitions the given array around the picked pivot.", points: sortQuickContent as any, code: "" },
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
};
