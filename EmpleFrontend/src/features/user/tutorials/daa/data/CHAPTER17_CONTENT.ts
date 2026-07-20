export const CHAPTER17_CONTENT = {
  title: "DP Fundamentals",
  description: "An introduction to the powerful concept of Dynamic Programming. You will learn how DP solves complex problems by breaking them down into simpler subproblems and caching their results to avoid redundant work. We will thoroughly cover both Top-Down (Memoization) and Bottom-Up (Tabulation) approaches, identifying overlapping subproblems, and optimal substructure.",
  points: [
    {
      heading: "Concepts",
      body: "Dynamic Programming (DP) is an optimization technique used to solve complex problems by breaking them down into simpler, overlapping subproblems. Unlike Divide and Conquer (which solves independent subproblems), DP is utilized when subproblems share sub-subproblems. By solving each subproblem only once and storing the result, DP prevents the exponential explosion of recursive calls."
    },
    {
      heading: "Overlapping Subproblems",
      body: "A problem has **Overlapping Subproblems** if a recursive algorithm visits the exact same subproblems repeatedly. For example, in computing the 5th Fibonacci number `F(5)`, we compute `F(4)` and `F(3)`. But `F(4)` also requires computing `F(3)`. Instead of calculating `F(3)` twice, DP stores the answer the first time."
    },
    {
      heading: "Optimal Substructure",
      body: "A problem exhibits **Optimal Substructure** if the optimal solution to the main problem can be constructed directly from the optimal solutions of its subproblems. If a problem lacks this (like finding the Longest Simple Path in a graph), DP cannot be used."
    },
    {
      heading: "Memoization",
      body: "**Memoization (Top-Down):** We write the procedure recursively but add a cache (usually an array or hash map). Before computing a subproblem, we check the cache. If the answer is there, we return it immediately. If not, we compute it, save it in the cache, and then return it. It is highly intuitive because it keeps the recursive structure."
    },
    {
      heading: "Tabulation",
      body: "**Tabulation (Bottom-Up):** We eliminate recursion entirely. We build a table (array) and fill it iteratively starting from the smallest subproblems (base cases) up to the main problem. Since we fill the table in a strategic order, we guarantee that whenever we need the answer to a subproblem, it is already computed in the table. This completely avoids function call overhead and stack overflows."
    },
    {
      heading: "State Definition",
      body: "Defining the **State** is the most crucial step in DP. A state represents a specific subproblem. We define it using variables (parameters). For example, in the Knapsack problem, the state `dp[i][w]` might represent \"the maximum profit using the first `i` items with a maximum weight capacity of `w`.\""
    },
    {
      heading: "State Transition",
      body: "The **State Transition** (or Recurrence Relation) defines how to compute the answer for the current state using the answers from smaller, already computed states. It represents the mathematical logic of the choices available. For example: `dp[i] = dp[i-1] + dp[i-2]`."
    },
    {
      heading: "Base Cases",
      body: "The **Base Cases** are the simplest, smallest valid subproblems that can be answered immediately without further calculation. These initialize the DP table in Tabulation or act as the stopping condition in Memoization. If base cases are incorrect, the entire DP table will compute faulty results."
    },
    {
      heading: "Space Optimization",
      body: "Often, computing the current state only requires looking back at a few previous states, not the entire table. For example, Fibonacci `dp[i]` only needs `dp[i-1]` and `dp[i-2]`. Instead of an $O(n)$ array, we can use two variables, reducing space complexity from $O(n)$ to $O(1)$. This is a critical final step in mastering DP."
    }
  ],
  code: "// Bottom-Up Tabulation for Fibonacci\n#include <stdio.h>\n\nint fib(int n) {\n    if (n <= 1) return n;\n    // State Definition: dp array\n    int dp[n + 1];\n    \n    // Base Cases\n    dp[0] = 0;\n    dp[1] = 1;\n    \n    // State Transition\n    for (int i = 2; i <= n; i++) {\n        dp[i] = dp[i - 1] + dp[i - 2];\n    }\n    return dp[n];\n}\n"
};