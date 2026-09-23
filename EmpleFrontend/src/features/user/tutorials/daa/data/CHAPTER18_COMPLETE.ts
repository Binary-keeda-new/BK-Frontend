export const CHAPTER18_COMPLETE = [
  {
    template: "dp[i] = min(dp[i], dp[i - ____] + 1);",
    answer: ["coin"],
    blanks: ["____"],
    instructions: "Complete the state transition for Minimum Coins."
  },
  {
    template: "for(int i=1; i<=n; i++) dp[i] = ____; // Initialize to negative infinity",
    answer: ["-1"],
    blanks: ["____"],
    instructions: "Complete the initialization for 1D DP arrays where we seek a maximum."
  }
];