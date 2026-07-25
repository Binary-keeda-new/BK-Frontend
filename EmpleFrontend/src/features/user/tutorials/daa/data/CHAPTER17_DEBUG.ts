export const CHAPTER17_DEBUG = [
  {
    instructions: "Fix the memoization cache check for calculating Fibonacci using Top-Down DP.",
    buggy: "int fib(int n, int memo[]) {\n    if (n <= 1) return n;\n    if (memo[n] == 0) return memo[n];\n    memo[n] = fib(n-1, memo) + fib(n-2, memo);\n    return memo[n];\n}",
    fixed: "int fib(int n, int memo[]) {\n    if (n <= 1) return n;\n    if (memo[n] != -1) return memo[n];\n    memo[n] = fib(n-1, memo) + fib(n-2, memo);\n    return memo[n];\n}",
    hints: ["You are returning if the memo is 0, which means UNCALCULATED.", "You should return if memo[n] is NOT equal to the initialized value (e.g. -1)."],
    expectedOutput: "Fibonacci computed in O(n) without redundant subproblems."
  },
  {
    instructions: "Correct the state initialization in a Bottom-Up Tabulation approach.",
    buggy: "int solve_dp(int n) {\n    int dp[n];\n    dp[0] = 0;\n    dp[1] = 1;\n    for(int i=2; i<=n; i++) dp[i] = dp[i-1] + dp[i-2];\n    return dp[n];\n}",
    fixed: "int solve_dp(int n) {\n    int dp[n+1];\n    dp[0] = 0;\n    dp[1] = 1;\n    for(int i=2; i<=n; i++) dp[i] = dp[i-1] + dp[i-2];\n    return dp[n];\n}",
    hints: ["Array of size n goes from index 0 to n-1.", "To access dp[n], the array must be of size n+1."],
    expectedOutput: "Buffer Overflow prevented."
  },
  {
    instructions: "Fix the base case overlap in a DP recurrence.",
    buggy: "int count_ways(int n) {\n    int dp[n+1];\n    dp[0] = 1;\n    for(int i=1; i<=n; i++) {\n        dp[i] = dp[i-1] + dp[i-2];\n    }\n    return dp[n];\n}",
    fixed: "int count_ways(int n) {\n    int dp[n+1];\n    dp[0] = 1;\n    dp[1] = 1;\n    for(int i=2; i<=n; i++) {\n        dp[i] = dp[i-1] + dp[i-2];\n    }\n    return dp[n];\n}",
    hints: ["When i=1, dp[i-2] tries to access dp[-1].", "Initialize dp[1] explicitly and start loop from 2."],
    expectedOutput: "State transition avoids negative indexing."
  }
];