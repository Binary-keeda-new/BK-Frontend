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
import { dcIntroContent, dcIntroMcqs, dcIntroDebug, dcIntroDrag, dcIntroComplete } from "./dcIntro";
import { greedyIntroContent, greedyIntroMcqs, greedyIntroDebug, greedyIntroDrag, greedyIntroComplete } from "./greedyIntro";
import { stringMatchingContent, stringMatchingMcqs, stringMatchingDebug, stringMatchingDrag, stringMatchingComplete } from "./stringMatching";
import { stringKMPContent, stringKMPMcqs, stringKMPDebug, stringKMPDrag, stringKMPComplete } from "./stringKMP";
import { stringRabinKarpContent, stringRabinKarpMcqs, stringRabinKarpDebug, stringRabinKarpDrag, stringRabinKarpComplete } from "./stringRabinKarp";
import { stringTrieContent, stringTrieMcqs, stringTrieDebug, stringTrieDrag, stringTrieComplete } from "./stringTrie";
import { stringZContent, stringZMcqs, stringZDebug, stringZDrag, stringZComplete } from "./stringZ";
import { sortMergeContent, sortMergeMcqs, sortMergeDebug, sortMergeDrag, sortMergeComplete } from "./sortMerge";
import { sortQuickContent, sortQuickMcqs, sortQuickDebug, sortQuickDrag, sortQuickComplete } from "./sortQuick";
import { dpFibonacciContent, dpFibonacciMcqs, dpFibonacciDebug, dpFibonacciDrag, dpFibonacciComplete } from "./dpFibonacci";
import { dpLCSContent, dpLCSMcqs, dpLCSDebug, dpLCSDrag, dpLCSComplete } from "./dpLCS";
import { dpKnapsackContent, dpKnapsackMcqs, dpKnapsackDebug, dpKnapsackDrag, dpKnapsackComplete } from "./dpKnapsack";
import { dpCoinContent, dpCoinMcqs, dpCoinDebug, dpCoinDrag, dpCoinComplete } from "./dpCoin";
import { dpEditDistanceContent, dpEditDistanceMcqs, dpEditDistanceDebug, dpEditDistanceDrag, dpEditDistanceComplete } from "./dpEditDistance";
import { dpMatrixContent, dpMatrixMcqs, dpMatrixDebug, dpMatrixDrag, dpMatrixComplete } from "./dpMatrix";
import { dcMaxSubarrayContent, dcMaxSubarrayMcqs, dcMaxSubarrayDebug, dcMaxSubarrayDrag, dcMaxSubarrayComplete } from "./dcMaxSubarray";
import { dcClosestPairContent, dcClosestPairMcqs, dcClosestPairDebug, dcClosestPairDrag, dcClosestPairComplete } from "./dcClosestPair";
import { greedyActivityContent, greedyActivityMcqs, greedyActivityDebug, greedyActivityDrag, greedyActivityComplete } from "./greedyActivity";
import { greedyFractionalKnapsackContent, greedyFractionalKnapsackMcqs, greedyFractionalKnapsackDebug, greedyFractionalKnapsackDrag, greedyFractionalKnapsackComplete } from "./greedyFractionalKnapsack";
import { greedyHuffmanContent, greedyHuffmanMcqs, greedyHuffmanDebug, greedyHuffmanDrag, greedyHuffmanComplete } from "./greedyHuffman";
import { greedyJobContent, greedyJobMcqs, greedyJobDebug, greedyJobDrag, greedyJobComplete } from "./greedyJob";
import { greedyCoinContent, greedyCoinMcqs, greedyCoinDebug, greedyCoinDrag, greedyCoinComplete } from "./greedyCoin";


import { backtrackNQueensContent, backtrackNQueensMcqs, backtrackNQueensDebug, backtrackNQueensDrag, backtrackNQueensComplete } from "./backtrackNQueens";
import { backtrackSudokuContent, backtrackSudokuMcqs, backtrackSudokuDebug, backtrackSudokuDrag, backtrackSudokuComplete } from "./backtrackSudoku";
import { backtrackMazeContent, backtrackMazeMcqs, backtrackMazeDebug, backtrackMazeDrag, backtrackMazeComplete } from "./backtrackMaze";
import { backtrackColoringContent, backtrackColoringMcqs, backtrackColoringDebug, backtrackColoringDrag, backtrackColoringComplete } from "./backtrackColoring";
import { bbKnapsackContent, bbKnapsackMcqs, bbKnapsackDebug, bbKnapsackDrag, bbKnapsackComplete } from "./bbKnapsack";
import { bbTSPContent, bbTSPMcqs, bbTSPDebug, bbTSPDrag, bbTSPComplete } from "./bbTSP";
import { bbJobContent, bbJobMcqs, bbJobDebug, bbJobDrag, bbJobComplete } from "./bbJob";
import { graphTraversalContent, graphTraversalMcqs, graphTraversalDebug, graphTraversalDrag, graphTraversalComplete } from "./graphTraversal";
import { graphDijkstraContent, graphDijkstraMcqs, graphDijkstraDebug, graphDijkstraDrag, graphDijkstraComplete } from "./graphDijkstra";
import { graphBellmanFordContent, graphBellmanFordMcqs, graphBellmanFordDebug, graphBellmanFordDrag, graphBellmanFordComplete } from "./graphBellmanFord";
import { graphFloydWarshallContent, graphFloydWarshallMcqs, graphFloydWarshallDebug, graphFloydWarshallDrag, graphFloydWarshallComplete } from "./graphFloydWarshall";
import { graphMSTContent, graphMSTMcqs, graphMSTDebug, graphMSTDrag, graphMSTComplete } from "./graphMST";
import { graphTopologicalContent, graphTopologicalMcqs, graphTopologicalDebug, graphTopologicalDrag, graphTopologicalComplete } from "./graphTopological";
import { advSegmentTreeContent, advSegmentTreeMcqs, advSegmentTreeDebug, advSegmentTreeDrag, advSegmentTreeComplete } from "./advSegmentTree";
import { advBITContent, advBITMcqs, advBITDebug, advBITDrag, advBITComplete } from "./advBIT";
import { advDSUContent, advDSUMcqs, advDSUDebug, advDSUDrag, advDSUComplete } from "./advDSU";
import { advSparseTableContent, advSparseTableMcqs, advSparseTableDebug, advSparseTableDrag, advSparseTableComplete } from "./advSparseTable";

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
  { id: "dc_intro", label: "Divide and Conquer Introduction", module: "Module 4: Divide and Conquer" },
  { id: "dc_binary", label: "Binary Search", module: "Module 4: Divide and Conquer" },
  { id: "dc_merge", label: "Merge Sort", module: "Module 4: Divide and Conquer" },
  { id: "dc_quick", label: "Quick Sort", module: "Module 4: Divide and Conquer" },
  { id: "dc_max_subarray", label: "Maximum Subarray", module: "Module 4: Divide and Conquer" },
  { id: "dc_closest_pair", label: "Closest Pair Problem", module: "Module 4: Divide and Conquer" },

  // Module 5
  { id: "greedy_intro", label: "Greedy Algorithms Introduction", module: "Module 5: Greedy Algorithms" },
  { id: "greedy_activity", label: "Activity Selection", module: "Module 5: Greedy Algorithms" },
  { id: "greedy_fractional_knapsack", label: "Fractional Knapsack", module: "Module 5: Greedy Algorithms" },
  { id: "greedy_huffman", label: "Huffman Coding", module: "Module 5: Greedy Algorithms" },
  { id: "greedy_job", label: "Job Sequencing", module: "Module 5: Greedy Algorithms" },
  { id: "greedy_coin", label: "Coin Change", module: "Module 5: Greedy Algorithms" },

  // Module 6
  { id: "dp_fibonacci", label: "Fibonacci Numbers", module: "Module 6: Dynamic Programming" },
  { id: "dp_knapsack", label: "0/1 Knapsack", module: "Module 6: Dynamic Programming" },
  { id: "dp_coin", label: "Coin Change", module: "Module 6: Dynamic Programming" },
  { id: "dp_lcs", label: "Longest Common Subsequence", module: "Module 6: Dynamic Programming" },
  { id: "dp_matrix", label: "Matrix Chain Multiplication", module: "Module 6: Dynamic Programming" },
  { id: "dp_edit", label: "Edit Distance", module: "Module 6: Dynamic Programming" },

  
  // Module 7
  { id: "backtrack_nqueens", label: "N-Queens", module: "Module 7: Backtracking" },
  { id: "backtrack_sudoku", label: "Sudoku Solver", module: "Module 7: Backtracking" },
  { id: "backtrack_maze", label: "Rat in a Maze", module: "Module 7: Backtracking" },
  { id: "backtrack_coloring", label: "Graph Coloring", module: "Module 7: Backtracking" },

  // Module 8
  { id: "bb_knapsack", label: "0/1 Knapsack", module: "Module 8: Branch and Bound" },
  { id: "bb_tsp", label: "Travelling Salesman Problem", module: "Module 8: Branch and Bound" },
  { id: "bb_job", label: "Job Assignment", module: "Module 8: Branch and Bound" },

  // Module 9
  { id: "graph_traversal", label: "BFS & DFS", module: "Module 9: Graph Algorithms" },
  { id: "graph_dijkstra", label: "Dijkstra's Algorithm", module: "Module 9: Graph Algorithms" },
  { id: "graph_bellman_ford", label: "Bellman-Ford Algorithm", module: "Module 9: Graph Algorithms" },
  { id: "graph_floyd_warshall", label: "Floyd-Warshall Algorithm", module: "Module 9: Graph Algorithms" },
  { id: "graph_mst", label: "Prim's & Kruskal's Algorithms", module: "Module 9: Graph Algorithms" },
  { id: "graph_topological", label: "Topological Sorting", module: "Module 9: Graph Algorithms" },

  // Module 10
  { id: "string_matching", label: "String Matching Basics", module: "Module 10: String Algorithms" },
  { id: "string_kmp", label: "KMP Algorithm", module: "Module 10: String Algorithms" },
  { id: "string_rabin_karp", label: "Rabin-Karp Algorithm", module: "Module 10: String Algorithms" },
  { id: "string_trie", label: "Trie", module: "Module 10: String Algorithms" },
  { id: "string_z", label: "Z Algorithm", module: "Module 10: String Algorithms" },

  // Module 11
  { id: "adv_segment_tree", label: "Segment Tree", module: "Module 11: Advanced Topics" },
  { id: "adv_bit", label: "Binary Indexed Tree (BIT)", module: "Module 11: Advanced Topics" },
  { id: "adv_dsu", label: "Disjoint Set Union (DSU)", module: "Module 11: Advanced Topics" },
  { id: "adv_sparse_table", label: "Sparse Table", module: "Module 11: Advanced Topics" }

];

function formatContent(content: any, defaultTitle: string) {
  if (Array.isArray(content)) {
    return { title: defaultTitle, description: "Learn about this topic in detail.", points: content, code: "" };
  }
  return content;
}

export const CONTENT: Record<string, any> = {

  backtrack_nqueens: formatContent(backtrackNQueensContent, "N-Queens"),
  backtrack_sudoku: formatContent(backtrackSudokuContent, "Sudoku Solver"),
  backtrack_maze: formatContent(backtrackMazeContent, "Rat in a Maze"),
  backtrack_coloring: formatContent(backtrackColoringContent, "Graph Coloring"),
  bb_knapsack: formatContent(bbKnapsackContent, "0/1 Knapsack"),
  bb_tsp: formatContent(bbTSPContent, "Travelling Salesman Problem"),
  bb_job: formatContent(bbJobContent, "Job Assignment"),
  graph_traversal: formatContent(graphTraversalContent, "BFS & DFS"),
  graph_dijkstra: formatContent(graphDijkstraContent, "Dijkstra's Algorithm"),
  graph_bellman_ford: formatContent(graphBellmanFordContent, "Bellman-Ford Algorithm"),
  graph_floyd_warshall: formatContent(graphFloydWarshallContent, "Floyd-Warshall Algorithm"),
  graph_mst: formatContent(graphMSTContent, "Prim's & Kruskal's Algorithms"),
  graph_topological: formatContent(graphTopologicalContent, "Topological Sorting"),
  adv_segment_tree: formatContent(advSegmentTreeContent, "Segment Tree"),
  adv_bit: formatContent(advBITContent, "Binary Indexed Tree (BIT)"),
  adv_dsu: formatContent(advDSUContent, "Disjoint Set Union (DSU)"),
  adv_sparse_table: formatContent(advSparseTableContent, "Sparse Table"),

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
  dc_intro: formatContent(dcIntroContent, "Divide and Conquer"),
  greedy_intro: formatContent(greedyIntroContent, "Greedy Algorithms"),
  string_matching: formatContent(stringMatchingContent, "String Matching Basics"),
  string_kmp: formatContent(stringKMPContent, "KMP Algorithm"),
  string_rabin_karp: formatContent(stringRabinKarpContent, "Rabin-Karp Algorithm"),
  string_trie: formatContent(stringTrieContent, "Trie"),
  string_z: formatContent(stringZContent, "Z Algorithm"),
  dc_binary: formatContent(binarySearchContent, "Binary Search"),
  dc_merge: formatContent(sortMergeContent, "Merge Sort"),
  dc_quick: formatContent(sortQuickContent, "Quick Sort"),
  dc_max_subarray: formatContent(dcMaxSubarrayContent, "Maximum Subarray"),
  dc_closest_pair: formatContent(dcClosestPairContent, "Closest Pair Problem"),
  greedy_activity: formatContent(greedyActivityContent, "Activity Selection"),
  greedy_fractional_knapsack: formatContent(greedyFractionalKnapsackContent, "Fractional Knapsack"),
  greedy_huffman: formatContent(greedyHuffmanContent, "Huffman Coding"),
  greedy_job: formatContent(greedyJobContent, "Job Sequencing"),
  greedy_coin: formatContent(greedyCoinContent, "Coin Change"),
};

export const MCQS: Record<string, any> = {

  backtrack_nqueens: backtrackNQueensMcqs,
  backtrack_sudoku: backtrackSudokuMcqs,
  backtrack_maze: backtrackMazeMcqs,
  backtrack_coloring: backtrackColoringMcqs,
  bb_knapsack: bbKnapsackMcqs,
  bb_tsp: bbTSPMcqs,
  bb_job: bbJobMcqs,
  graph_traversal: graphTraversalMcqs,
  graph_dijkstra: graphDijkstraMcqs,
  graph_bellman_ford: graphBellmanFordMcqs,
  graph_floyd_warshall: graphFloydWarshallMcqs,
  graph_mst: graphMSTMcqs,
  graph_topological: graphTopologicalMcqs,
  adv_segment_tree: advSegmentTreeMcqs,
  adv_bit: advBITMcqs,
  adv_dsu: advDSUMcqs,
  adv_sparse_table: advSparseTableMcqs,

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
  dc_intro: dcIntroMcqs,
  greedy_intro: greedyIntroMcqs,
  string_matching: stringMatchingMcqs,
  string_kmp: stringKMPMcqs,
  string_rabin_karp: stringRabinKarpMcqs,
  string_trie: stringTrieMcqs,
  string_z: stringZMcqs,
  dc_binary: binarySearchMcqs,
  dc_merge: sortMergeMcqs,
  dc_quick: sortQuickMcqs,
  dc_max_subarray: dcMaxSubarrayMcqs,
  dc_closest_pair: dcClosestPairMcqs,
  greedy_activity: greedyActivityMcqs,
  greedy_fractional_knapsack: greedyFractionalKnapsackMcqs,
  greedy_huffman: greedyHuffmanMcqs,
  greedy_job: greedyJobMcqs,
  greedy_coin: greedyCoinMcqs,
};

export const DEBUG_EXERCISES: Record<string, any> = {

  backtrack_nqueens: backtrackNQueensDebug,
  backtrack_sudoku: backtrackSudokuDebug,
  backtrack_maze: backtrackMazeDebug,
  backtrack_coloring: backtrackColoringDebug,
  bb_knapsack: bbKnapsackDebug,
  bb_tsp: bbTSPDebug,
  bb_job: bbJobDebug,
  graph_traversal: graphTraversalDebug,
  graph_dijkstra: graphDijkstraDebug,
  graph_bellman_ford: graphBellmanFordDebug,
  graph_floyd_warshall: graphFloydWarshallDebug,
  graph_mst: graphMSTDebug,
  graph_topological: graphTopologicalDebug,
  adv_segment_tree: advSegmentTreeDebug,
  adv_bit: advBITDebug,
  adv_dsu: advDSUDebug,
  adv_sparse_table: advSparseTableDebug,

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
  dc_intro: dcIntroDebug,
  greedy_intro: greedyIntroDebug,
  string_matching: stringMatchingDebug,
  string_kmp: stringKMPDebug,
  string_rabin_karp: stringRabinKarpDebug,
  string_trie: stringTrieDebug,
  string_z: stringZDebug,
  dc_binary: binarySearchDebug,
  dc_merge: sortMergeDebug,
  dc_quick: sortQuickDebug,
  dc_max_subarray: dcMaxSubarrayDebug,
  dc_closest_pair: dcClosestPairDebug,
  greedy_activity: greedyActivityDebug,
  greedy_fractional_knapsack: greedyFractionalKnapsackDebug,
  greedy_huffman: greedyHuffmanDebug,
  greedy_job: greedyJobDebug,
  greedy_coin: greedyCoinDebug,
};

export const DRAG_EXERCISES: Record<string, any> = {

  backtrack_nqueens: backtrackNQueensDrag,
  backtrack_sudoku: backtrackSudokuDrag,
  backtrack_maze: backtrackMazeDrag,
  backtrack_coloring: backtrackColoringDrag,
  bb_knapsack: bbKnapsackDrag,
  bb_tsp: bbTSPDrag,
  bb_job: bbJobDrag,
  graph_traversal: graphTraversalDrag,
  graph_dijkstra: graphDijkstraDrag,
  graph_bellman_ford: graphBellmanFordDrag,
  graph_floyd_warshall: graphFloydWarshallDrag,
  graph_mst: graphMSTDrag,
  graph_topological: graphTopologicalDrag,
  adv_segment_tree: advSegmentTreeDrag,
  adv_bit: advBITDrag,
  adv_dsu: advDSUDrag,
  adv_sparse_table: advSparseTableDrag,

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
  dc_intro: dcIntroDrag,
  greedy_intro: greedyIntroDrag,
  string_matching: stringMatchingDrag,
  string_kmp: stringKMPDrag,
  string_rabin_karp: stringRabinKarpDrag,
  string_trie: stringTrieDrag,
  string_z: stringZDrag,
  dc_binary: binarySearchDrag,
  dc_merge: sortMergeDrag,
  dc_quick: sortQuickDrag,
  dc_max_subarray: dcMaxSubarrayDrag,
  dc_closest_pair: dcClosestPairDrag,
  greedy_activity: greedyActivityDrag,
  greedy_fractional_knapsack: greedyFractionalKnapsackDrag,
  greedy_huffman: greedyHuffmanDrag,
  greedy_job: greedyJobDrag,
  greedy_coin: greedyCoinDrag,
};

export const COMPLETE_EXERCISES: Record<string, any> = {

  backtrack_nqueens: backtrackNQueensComplete,
  backtrack_sudoku: backtrackSudokuComplete,
  backtrack_maze: backtrackMazeComplete,
  backtrack_coloring: backtrackColoringComplete,
  bb_knapsack: bbKnapsackComplete,
  bb_tsp: bbTSPComplete,
  bb_job: bbJobComplete,
  graph_traversal: graphTraversalComplete,
  graph_dijkstra: graphDijkstraComplete,
  graph_bellman_ford: graphBellmanFordComplete,
  graph_floyd_warshall: graphFloydWarshallComplete,
  graph_mst: graphMSTComplete,
  graph_topological: graphTopologicalComplete,
  adv_segment_tree: advSegmentTreeComplete,
  adv_bit: advBITComplete,
  adv_dsu: advDSUComplete,
  adv_sparse_table: advSparseTableComplete,

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
  dc_intro: dcIntroComplete,
  greedy_intro: greedyIntroComplete,
  string_matching: stringMatchingComplete,
  string_kmp: stringKMPComplete,
  string_rabin_karp: stringRabinKarpComplete,
  string_trie: stringTrieComplete,
  string_z: stringZComplete,
  dc_binary: binarySearchComplete,
  dc_merge: sortMergeComplete,
  dc_quick: sortQuickComplete,
  dc_max_subarray: dcMaxSubarrayComplete,
  dc_closest_pair: dcClosestPairComplete,
  greedy_activity: greedyActivityComplete,
  greedy_fractional_knapsack: greedyFractionalKnapsackComplete,
  greedy_huffman: greedyHuffmanComplete,
  greedy_job: greedyJobComplete,
  greedy_coin: greedyCoinComplete,
};
