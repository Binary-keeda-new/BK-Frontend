export const CHAPTER19_COMPLETE = [
  {
    template: "dp[i][j] = ____(dp[i-1][j], dp[i][j-1]);",
    answer: ["max"],
    blanks: ["____"],
    instructions: "Identify the DP state transition function for LCS mismatch."
  },
  {
    template: "int dp[n + 1][____ + 1];",
    answer: ["W","capacity"],
    blanks: ["____"],
    instructions: "Identify the array dimension required for 0/1 Knapsack."
  }
];