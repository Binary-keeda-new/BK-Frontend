export const CHAPTER19_DEBUG = [
  {
    instructions: "Fix the capacity check in the 0/1 Knapsack 2D DP transition.",
    buggy: "for(int w=1; w<=W; w++) {\n    if (wt[i-1] > w) {\n        dp[i][w] = dp[i-1][w] + val[i-1];\n    } else {\n        dp[i][w] = max(dp[i-1][w], dp[i-1][w-wt[i-1] + val[i-1]);\n    }\n}",
    fixed: "for(int w=1; w<=W; w++) {\n    if (wt[i-1] > w) {\n        dp[i][w] = dp[i-1][w];\n    } else {\n        dp[i][w] = max(dp[i-1][w], dp[i-1][w-wt[i-1] + val[i-1]);\n    }\n}",
    hints: ["If the item's weight is greater than current capacity 'w', we CANNOT include it.", "Just inherit the value from the previous row without adding val[i-1]."],
    expectedOutput: "Knapsack respects weight constraints."
  },
  {
    instructions: "Correct the string matching condition in Longest Common Subsequence.",
    buggy: "if (S1[i-1] == S2[j-1]) {\n    dp[i][j] = dp[i-1][j-1];\n} else {\n    dp[i][j] = max(dp[i-1][j], dp[i][j-1]);\n}",
    fixed: "if (S1[i-1] == S2[j-1]) {\n    dp[i][j] = dp[i-1][j-1] + 1;\n} else {\n    dp[i][j] = max(dp[i-1][j], dp[i][j-1]);\n}",
    hints: ["If the characters match, the sequence length increases by 1.", "You forgot to add 1 to the diagonal DP value."],
    expectedOutput: "LCS accurately increments."
  },
  {
    instructions: "Fix the Unbounded Knapsack row transition.",
    buggy: "if (wt[i-1] <= w) {\n    dp[i][w] = max(dp[i-1][w], dp[i-1][w-wt[i-1] + val[i-1]);\n}",
    fixed: "if (wt[i-1] <= w) {\n    dp[i][w] = max(dp[i-1][w], dp[i][w-wt[i-1] + val[i-1]);\n}",
    hints: ["In Unbounded Knapsack, you can use the same item multiple times.", "Look at the CURRENT row `dp[i]` instead of the previous row `dp[i-1]` when including."],
    expectedOutput: "Items can be reused infinitely up to weight W."
  }
];