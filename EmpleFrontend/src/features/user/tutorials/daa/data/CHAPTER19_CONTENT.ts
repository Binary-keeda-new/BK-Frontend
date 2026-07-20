export const CHAPTER19_CONTENT = {
  title: "2D Dynamic Programming",
  description: "Advance to 2-Dimensional Dynamic Programming, which forms the backbone for solving highly complex optimization problems. Covered topics include the 0/1 Knapsack problem, Unbounded Knapsack, Subset Sum, Longest Common Subsequence (LCS), and Matrix Chain Multiplication. You will learn to visualize 2D DP grids, formulate complex state transitions, and optimize space where possible.",
  points: [
    {
      heading: "0/1 Knapsack",
      body: "Given weights and values of $n$ items, put these items in a knapsack of capacity $W$ to maximize total value. Items cannot be broken (0/1). \n- **State:** `dp[i][w]` is the maximum value using the first `i` items and a weight limit of `w`.\n- **Transition:** For item `i`, we can exclude it: `dp[i-1][w]`, or include it (if it fits): `value[i] + dp[i-1][w - weight[i]]`. We take the maximum of these two choices."
    },
    {
      heading: "Unbounded Knapsack",
      body: "Similar to 0/1 Knapsack, but we have an infinite supply of each item.\n- **State:** `dp[w]` is the max value for capacity `w` (can be optimized to 1D array).\n- **Transition:** If we include an item, we don't move to `i-1` because we can pick the same item again. `dp[i][w] = max(dp[i-1][w], val[i] + dp[i][w - wt[i]])`."
    },
    {
      heading: "Subset Sum",
      body: "Determine if there is a subset of the given array with a sum equal to a given target.\n- **State:** `dp[i][j]` is a boolean (true/false) indicating if a subset of the first `i` elements can sum to exactly `j`.\n- **Transition:** We either exclude the current element (`dp[i-1][j]`) or include it (`dp[i-1][j - arr[i]]`). If either is true, `dp[i][j]` is true."
    },
    {
      heading: "Longest Common Subsequence",
      body: "Find the length of the longest subsequence present in both strings $X$ and $Y$.\n- **State:** `dp[i][j]` is the length of the LCS of strings $X[0..i-1]$ and $Y[0..j-1]$.\n- **Transition:** If the characters match (`X[i-1] == Y[j-1]`), then `dp[i][j] = 1 + dp[i-1][j-1]`. If they don't match, we take the max of skipping a character in $X$ or skipping one in $Y$: `max(dp[i-1][j], dp[i][j-1])`."
    },
    {
      heading: "Longest Common Substring",
      body: "Find the length of the longest strictly contiguous substring shared by two strings.\n- **State:** `dp[i][j]` is the length of the longest common suffix ending at `X[i-1]` and `Y[j-1]`.\n- **Transition:** If `X[i-1] == Y[j-1]`, then `dp[i][j] = 1 + dp[i-1][j-1]`. If they don't match, the sequence breaks, so `dp[i][j] = 0`. The final answer is the maximum value anywhere in the DP table."
    },
    {
      heading: "Shortest Common Supersequence",
      body: "Find the length of the shortest string that has both given strings as subsequences.\n- The optimal approach directly uses the Longest Common Subsequence (LCS).\n- Length of SCS = `Length(X) + Length(Y) - Length(LCS(X, Y))`."
    },
    {
      heading: "Edit Distance",
      body: "Find the minimum number of operations (insert, remove, replace) required to convert string $X$ into string $Y$.\n- **State:** `dp[i][j]` is the minimum operations to convert $X[0..i-1]$ to $Y[0..j-1]$.\n- **Transition:** If characters match, `dp[i][j] = dp[i-1][j-1]`. If not, we take `1 + min(Insert, Remove, Replace)`, which translates to `1 + min(dp[i][j-1], dp[i-1][j], dp[i-1][j-1])`."
    },
    {
      heading: "Matrix Chain Multiplication",
      body: "Given a sequence of matrices, find the most efficient way to multiply them together by minimizing scalar multiplications. Parenthesization matters because matrix multiplication is associative but dimensions dictate costs.\n- **State:** `dp[i][j]` is the minimum cost to multiply matrices from index `i` to `j`.\n- **Transition:** We try splitting the chain at every possible index `k` between `i` and `j`. `dp[i][j] = min(dp[i][k] + dp[k+1][j] + cost_to_multiply_results)`."
    }
  ],
  code: "// 0/1 Knapsack (2D DP)\n#include <stdio.h>\n\nint max(int a, int b) { return (a > b) ? a : b; }\n\nint knapSack(int W, int wt[], int val[], int n) {\n    int dp[n + 1][W + 1];\n\n    for (int i = 0; i <= n; i++) {\n        for (int w = 0; w <= W; w++) {\n            if (i == 0 || w == 0)\n                dp[i][w] = 0;\n            else if (wt[i - 1] <= w)\n                dp[i][w] = max(val[i - 1] + dp[i - 1][w - wt[i - 1]], dp[i - 1][w]);\n            else\n                dp[i][w] = dp[i - 1][w];\n        }\n    }\n    return dp[n][W];\n}\n"
};