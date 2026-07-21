export const CHAPTER19_DEBUG = [
  {
    instructions: "This space-optimized Fibonacci function attempts to use O(1) space instead of an O(n) array, but the variables are updated in the wrong order.",
    buggy: `int fibOpt(int n) {
    if (n <= 1) return n;
    
    int prev2 = 0;
    int prev1 = 1;
    int curr;
    
    for (int i = 2; i <= n; i++) {
        curr = prev1 + prev2;
        // Bug: Updating prev1 before prev2 causes data loss!
        prev1 = curr;
        prev2 = prev1;
    }
    return curr;
}`,
    fixed: `int fibOpt(int n) {
    if (n <= 1) return n;
    
    int prev2 = 0;
    int prev1 = 1;
    int curr;
    
    for (int i = 2; i <= n; i++) {
        curr = prev1 + prev2;
        // Fix: Update prev2 FIRST, then update prev1
        prev2 = prev1;
        prev1 = curr;
    }
    return curr;
}`,
    hints: [
      "Look at how the variables are shifted for the next iteration.",
      "If you do prev1 = curr first, the old value of prev1 is overwritten.",
      "Then prev2 = prev1 assigns the NEW 'curr' value to prev2!"
    ],
    expectedOutput: "Calculates Fibonacci in O(n) time and O(1) space."
  },
  {
    instructions: "This space-optimized 1D array approach for 0/1 Knapsack fails because it iterates in the wrong direction.",
    buggy: `int knapsackOpt(int W, int wt[], int val[], int n) {
    int dp[W + 1];
    memset(dp, 0, sizeof(dp));

    for (int i = 0; i < n; i++) {
        // Bug: Iterating left-to-right overwrites data needed for the current row!
        for (int w = wt[i]; w <= W; w++) {
            dp[w] = max(dp[w], dp[w - wt[i]] + val[i]);
        }
    }
    return dp[W];
}`,
    fixed: `int knapsackOpt(int W, int wt[], int val[], int n) {
    int dp[W + 1];
    memset(dp, 0, sizeof(dp));

    for (int i = 0; i < n; i++) {
        // Fix: Iterate right-to-left to use values from the previous 'i' iteration
        for (int w = W; w >= wt[i]; w--) {
            dp[w] = max(dp[w], dp[w - wt[i]] + val[i]);
        }
    }
    return dp[W];
}`,
    hints: [
      "In a 1D DP table for Knapsack, dp[w] represents the current item (row i), and dp[w - wt[i]] represents the PREVIOUS item (row i-1).",
      "If you iterate left-to-right, you overwrite dp[w - wt[i]] with the CURRENT row's calculation before you use it!",
      "Iterate right-to-left (from W down to wt[i])."
    ],
    expectedOutput: "Calculates the knapsack correctly using only O(W) space."
  },
  {
    instructions: "This algorithm tries to trade space for time by using a lookup table (hash map logic) to find duplicates, but it forgets to initialize the table.",
    buggy: `int hasDuplicate(int arr[], int n) {
    // Attempting O(n) time using O(max_val) space
    int lookup[1000]; // Assuming values are 0-999
    
    // Bug: The lookup array is uninitialized! It contains garbage memory.
    
    for (int i = 0; i < n; i++) {
        if (lookup[arr[i]] == 1) {
            return 1; // Duplicate found
        }
        lookup[arr[i]] = 1;
    }
    return 0;
}`,
    fixed: `int hasDuplicate(int arr[], int n) {
    // Attempting O(n) time using O(max_val) space
    int lookup[1000]; // Assuming values are 0-999
    
    // Fix: Initialize the lookup table to 0
    memset(lookup, 0, sizeof(lookup));
    // Alternatively: int lookup[1000] = {0};
    
    for (int i = 0; i < n; i++) {
        if (lookup[arr[i]] == 1) {
            return 1; // Duplicate found
        }
        lookup[arr[i]] = 1;
    }
    return 0;
}`,
    hints: [
      "In C, local arrays declared without initialization contain garbage values (whatever was left in memory).",
      "If lookup[5] happens to contain '1' from garbage data, it will falsely report a duplicate.",
      "Use memset() or = {0} to zero out the array."
    ],
    expectedOutput: "Reliably detects duplicates in O(n) time using a lookup table."
  }
];