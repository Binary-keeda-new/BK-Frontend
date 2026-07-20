export const CHAPTER18_DEBUG = [
  {
    instructions: "This Top-Down DP (Memoization) for Fibonacci forgets to actually SAVE the calculated value into the memo table. Fix it.",
    buggy: `int fib(int n, int memo[]) {
    if (n <= 1) return n;
    
    // Return cached result if available
    if (memo[n] != -1) return memo[n];
    
    // Bug: Calculates the result, but returns it without saving it to memo[n]!
    return fib(n - 1, memo) + fib(n - 2, memo);
}`,
    fixed: `int fib(int n, int memo[]) {
    if (n <= 1) return n;
    
    // Return cached result if available
    if (memo[n] != -1) return memo[n];
    
    // Fix: Save the result into the memo table before returning
    memo[n] = fib(n - 1, memo) + fib(n - 2, memo);
    return memo[n];
}`,
    hints: [
      "The point of memoization is to cache the result so future calls are fast.",
      "If you just return 'fib(n-1) + fib(n-2)', the memo table is never updated.",
      "Assign the result to 'memo[n]' before returning."
    ],
    expectedOutput: "Executes in O(n) time instead of O(2^n)."
  },
  {
    instructions: "This Bottom-Up DP for Fibonacci calculates the sequence but goes out of bounds on the array. Fix it.",
    buggy: `int fibBottomUp(int n) {
    if (n <= 1) return n;
    
    // Bug: Allocates an array of size n, which only has indices 0 to n-1
    int dp[n]; 
    dp[0] = 0;
    dp[1] = 1;
    
    for (int i = 2; i <= n; i++) {
        // Bug: When i = n, dp[n] is out of bounds!
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    return dp[n];
}`,
    fixed: `int fibBottomUp(int n) {
    if (n <= 1) return n;
    
    // Fix: Allocate an array of size n + 1 to include index n
    int dp[n + 1]; 
    dp[0] = 0;
    dp[1] = 1;
    
    for (int i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    return dp[n];
}`,
    hints: [
      "If you want to calculate up to the 'n'th Fibonacci number, you need an array that goes up to index 'n'.",
      "An array of size 'n' only goes up to index 'n-1'.",
      "Allocate the array with size 'n + 1'."
    ],
    expectedOutput: "Safely returns the nth Fibonacci number without segfaults."
  },
  {
    instructions: "This DP solution for 0/1 Knapsack has a logic error in its state transition formula.",
    buggy: `int knapsack(int W, int wt[], int val[], int n) {
    int dp[n+1][W+1];
    
    for (int i = 0; i <= n; i++) {
        for (int w = 0; w <= W; w++) {
            if (i == 0 || w == 0)
                dp[i][w] = 0;
            else if (wt[i-1] <= w)
                // Bug: It adds val[i-1], but looks at the WRONG previous state!
                dp[i][w] = max(val[i-1] + dp[i][w - wt[i-1]], dp[i-1][w]);
            else
                dp[i][w] = dp[i-1][w];
        }
    }
    return dp[n][W];
}`,
    fixed: `int knapsack(int W, int wt[], int val[], int n) {
    int dp[n+1][W+1];
    
    for (int i = 0; i <= n; i++) {
        for (int w = 0; w <= W; w++) {
            if (i == 0 || w == 0)
                dp[i][w] = 0;
            else if (wt[i-1] <= w)
                // Fix: Look at the previous row (i-1) when including the item
                dp[i][w] = max(val[i-1] + dp[i-1][w - wt[i-1]], dp[i-1][w]);
            else
                dp[i][w] = dp[i-1][w];
        }
    }
    return dp[n][W];
}`,
    hints: [
      "In 0/1 Knapsack, you can only pick each item ONCE.",
      "If you pick item 'i', the remaining capacity is solved using the FIRST 'i-1' items.",
      "Look at dp[i][w - wt[i-1]]. It should be dp[i-1][w - wt[i-1]] to prevent picking the same item infinitely."
    ],
    expectedOutput: "Calculates the correct maximum value for the 0/1 Knapsack."
  }
];