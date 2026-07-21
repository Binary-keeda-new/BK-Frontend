export const CHAPTER19_COMPLETE = [
  {
    instruction: "Complete the statement to safely update variables in O(1) space Fibonacci.",
    template: `int fibOpt(int n) {
    if (n <= 1) return n;
    int prev2 = 0, prev1 = 1, curr;
    
    for (int i = 2; i <= n; i++) {
        curr = prev1 + prev2;
        // Shift values for the next iteration
        ________ = prev1;
        prev1 = curr;
    }
    return curr;
}`,
    answer: "prev2",
    blanks: ["prev2"]
  },
  {
    instruction: "Complete the loop condition for the 1D space-optimized 0/1 Knapsack DP.",
    template: `int knapsackOpt(int W, int wt[], int val[], int n) {
    int dp[W + 1] = {0};

    for (int i = 0; i < n; i++) {
        // Iterate BACKWARDS to prevent overwriting previous state
        for (int w = W; w ________ wt[i]; w--) {
            dp[w] = max(dp[w], dp[w - wt[i]] + val[i]);
        }
    }
    return dp[W];
}`,
    answer: ">=",
    blanks: [">="]
  }
];