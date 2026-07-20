export const CHAPTER16_MCQ = [
  {
    q: "Which of the following problems is NOT typically solved using the Divide and Conquer paradigm? (GATE 2007)",
    options: ["Merge Sort", "Binary Search", "0/1 Knapsack Problem", "Strassen's Matrix Multiplication"],
    ans: 2,
    explanation: "0/1 Knapsack is typically solved using Dynamic Programming because it has overlapping subproblems. Divide and conquer algorithms usually have non-overlapping subproblems."
  },
  {
    q: "What are the three core steps of the Divide and Conquer paradigm?",
    options: ["Divide, Conquer, Combine", "Divide, Compare, Swap", "Initialize, Iterate, Terminate", "Partition, Sort, Search"],
    ans: 0,
    explanation: "The paradigm involves: Dividing the problem into smaller subproblems, Conquering (solving) them recursively, and Combining their solutions to form the final answer."
  },
  {
    q: "The Master Theorem can be used to solve recurrence relations of the form: (GATE 2004)",
    options: ["T(n) = T(n-1) + O(n)", "T(n) = aT(n/b) + f(n)", "T(n) = T(n-1) + T(n-2)", "T(n) = nT(n/2) + O(1)"],
    ans: 1,
    explanation: "The Master Theorem applies to recurrences where a problem of size n is divided into 'a' subproblems, each of size 'n/b', with 'f(n)' cost for dividing and combining."
  },
  {
    q: "What is the time complexity of Strassen's Matrix Multiplication algorithm? (GATE 2011)",
    options: ["O(n^3)", "O(n^2.81)", "O(n^2)", "O(n log n)"],
    ans: 1,
    explanation: "Standard matrix multiplication takes O(n^3). Strassen's divide-and-conquer algorithm reduces the 8 recursive multiplications to 7, bringing the time down to O(n^log_2(7)) ≈ O(n^2.81)."
  },
  {
    q: "In a Divide and Conquer algorithm, if the subproblems overlap significantly, which paradigm is a better alternative? (GATE 2009)",
    options: ["Greedy Algorithm", "Dynamic Programming", "Backtracking", "Branch and Bound"],
    ans: 1,
    explanation: "When subproblems overlap (are computed repeatedly), Dynamic Programming is much more efficient as it memoizes (caches) the results to avoid redundant work."
  },
  {
    q: "Binary Search is a classic example of Divide and Conquer. How many recursive subproblems does it create per step? (GATE 2003)",
    options: ["0", "1", "2", "log n"],
    ans: 1,
    explanation: "Unlike Merge Sort which creates 2 subproblems, Binary Search only ever pursues 1 of the 2 halves, making its recurrence relation T(n) = T(n/2) + O(1)."
  },
  {
    q: "Which step in Merge Sort represents the 'Combine' phase of Divide and Conquer?",
    options: ["Calculating the midpoint.", "The recursive calls to mergeSort.", "The merge() function.", "Returning from the base case."],
    ans: 2,
    explanation: "The merge() function takes two individually sorted arrays and combines them into a single sorted array, fulfilling the 'Combine' step."
  },
  {
    q: "Consider a Divide and Conquer algorithm where T(n) = 4T(n/2) + O(n). What is the time complexity using the Master Theorem?",
    options: ["O(n)", "O(n log n)", "O(n^2)", "O(n^3)"],
    ans: 2,
    explanation: "Here a=4, b=2, f(n)=O(n). log_b(a) = log_2(4) = 2. Since f(n) = O(n) is polynomially smaller than n^2, Case 1 applies, and the complexity is Theta(n^2)."
  },
  {
    q: "For the Closest Pair of Points problem, what time complexity does the Divide and Conquer approach achieve?",
    options: ["O(n^2)", "O(n log n)", "O(n)", "O(log n)"],
    ans: 1,
    explanation: "The naive approach takes O(n^2) by comparing every pair. The Divide and Conquer approach sorts the points and cleverly merges across the dividing line in O(n), giving O(n log n) total."
  },
  {
    q: "Which of the following is NOT true about Divide and Conquer?",
    options: ["It naturally maps to recursive implementations.", "It can easily be parallelized.", "It always results in O(n log n) algorithms.", "It requires a base case to terminate."],
    ans: 2,
    explanation: "Divide and conquer does not always yield O(n log n). For example, Strassen's is O(n^2.81), and Quick Sort worst-case is O(n^2)."
  }
];