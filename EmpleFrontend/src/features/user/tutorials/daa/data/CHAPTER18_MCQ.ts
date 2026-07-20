export const CHAPTER18_MCQ = [
  {
    q: "Dynamic Programming is most heavily used when a problem exhibits which two properties? (GATE 2006)",
    options: ["Greedy Choice and Optimal Substructure", "Overlapping Subproblems and Optimal Substructure", "Non-overlapping Subproblems and Optimal Substructure", "Divide and Conquer and Memoization"],
    ans: 1,
    explanation: "DP solves problems by combining solutions to subproblems. If those subproblems overlap (are computed multiple times) and exhibit optimal substructure, DP is the perfect fit to cache (memoize) their results."
  },
  {
    q: "In Dynamic Programming, what does 'Memoization' refer to? (GATE 2010)",
    options: ["Memorizing the algorithm's code.", "Storing the results of expensive function calls and returning the cached result when the same inputs occur again.", "Solving the problem bottom-up iteratively.", "A memory leak caused by deep recursion."],
    ans: 1,
    explanation: "Memoization (top-down DP) involves caching the results of recursive subproblem calls in a table (like an array or hash map) so they are only calculated once."
  },
  {
    q: "What is the primary difference between Top-Down DP (Memoization) and Bottom-Up DP (Tabulation)?",
    options: ["Top-down uses recursion; bottom-up uses iteration.", "Top-down uses iteration; bottom-up uses recursion.", "Top-down is always faster.", "Bottom-up requires more memory."],
    ans: 0,
    explanation: "Top-down starts at the main problem and recursively calls smaller subproblems, caching results. Bottom-up starts at the base cases and iteratively builds up to the main problem using a table."
  },
  {
    q: "Which of the following problems is a classic example of Dynamic Programming? (GATE 2012)",
    options: ["Binary Search", "Merge Sort", "Fibonacci Sequence", "Quick Sort"],
    ans: 2,
    explanation: "The naive recursive Fibonacci function recalculates the same values repeatedly (overlapping subproblems). DP solves this by caching the sequence values, turning O(2^n) time into O(n)."
  },
  {
    q: "In the 0/1 Knapsack Problem, what does the DP table typically store? (GATE 2015)",
    options: ["The weights of the items.", "The maximum value achievable for a given capacity and subset of items.", "The items that have been selected.", "The fractional ratios."],
    ans: 1,
    explanation: "The state dp[i][w] represents the maximum value that can be obtained using a subset of the first 'i' items with a total weight capacity of 'w'."
  },
  {
    q: "Why does the Greedy approach fail for the Coin Change problem (finding minimum coins) with arbitrary denominations?",
    options: ["Because it always finds a solution with too few coins.", "Because it might pick a large coin that prevents a perfect fit, leading to no solution or a suboptimal count.", "Because the Greedy approach only works for fractional coins.", "Because it takes exponential time."],
    ans: 1,
    explanation: "For denominations {1, 3, 4} and amount 6, Greedy picks 4, leaving 2, which requires two 1s (total 3 coins). DP explores all options and finds {3, 3} (total 2 coins)."
  },
  {
    q: "What is the time complexity of the standard Dynamic Programming solution to find the Longest Common Subsequence of two strings of lengths m and n? (GATE 2004)",
    options: ["O(m + n)", "O(m * n)", "O(max(m, n))", "O(2^(m+n))"],
    ans: 1,
    explanation: "The DP approach builds a 2D table of size (m+1) x (n+1), filling each cell in O(1) time. Thus, the total time complexity is O(m * n)."
  },
  {
    q: "When a recursive algorithm has a time complexity of O(2^n) due to overlapping subproblems, what is the typical time complexity after applying Dynamic Programming? (GATE 2008)",
    options: ["O(n log n)", "O(n^2) or O(n)", "O(n!)", "O(log n)"],
    ans: 1,
    explanation: "DP typically reduces exponential time complexities (like Fibonacci or Knapsack) down to polynomial time (like O(n) or O(n^2) or O(n*W)) by avoiding redundant calculations."
  },
  {
    q: "What is the main drawback of Dynamic Programming? (GATE 2014)",
    options: ["It cannot find the optimal solution.", "It requires a lot of extra memory to store the DP table.", "It only works on sorting problems.", "It is slower than exponential naive recursion."],
    ans: 1,
    explanation: "DP trades memory for speed. It requires extra space (O(n), O(n^2), etc.) to store the results of subproblems (the memoization table or tabulation array)."
  },
  {
    q: "In Bottom-Up Dynamic Programming (Tabulation), how are the subproblems solved?",
    options: ["Randomly.", "From largest to smallest.", "From smallest to largest.", "Concurrently on multiple threads."],
    ans: 2,
    explanation: "Bottom-up DP solves the smallest subproblems first (the base cases), and uses their solutions to iteratively calculate the answers to progressively larger subproblems."
  }
];