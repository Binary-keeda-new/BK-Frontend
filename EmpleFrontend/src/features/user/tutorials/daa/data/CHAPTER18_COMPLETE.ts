export const CHAPTER18_COMPLETE = [
  {
    instruction: "Complete the memoization check at the beginning of a Top-Down DP function.",
    template: `int solve(int n, int memo[]) {
    // Base cases...
    
    // Check if the result is already in the cache (assume initialized to -1)
    if (memo[n] != ________) {
        return memo[n]; // Return cached result
    }
    
    // ... calculate and store in memo[n] ...
}`,
    answer: "-1",
    blanks: ["-1"]
  },
  {
    instruction: "Complete the state transition for Bottom-Up Fibonacci.",
    template: `int fib(int n) {
    int dp[n + 1];
    dp[0] = 0;
    dp[1] = 1;
    
    for (int i = 2; i <= n; i++) {
        // Current value is the sum of the two previous values
        dp[i] = dp[________] + dp[i - 2];
    }
    return dp[n];
}`,
    answer: "i - 1",
    blanks: ["i - 1", "i-1"]
  }
];