export const CHAPTER18_DEBUG = [
  {
    instructions: "Fix the transition logic in Longest Increasing Subsequence (1D DP).",
    buggy: "for (int i = 1; i < n; i++) {\n    for (int j = 0; j < i; j++) {\n        if (arr[i] > arr[j]) {\n            dp[i] = dp[j] + 1;\n        }\n    }\n}",
    fixed: "for (int i = 1; i < n; i++) {\n    for (int j = 0; j < i; j++) {\n        if (arr[i] > arr[j] && dp[i] < dp[j] + 1) {\n            dp[i] = dp[j] + 1;\n        }\n    }\n}",
    hints: ["You are constantly overwriting dp[i] with dp[j]+1.", "You must take the MAXIMUM of the current dp[i] and dp[j]+1."],
    expectedOutput: "Correct LIS length calculated."
  },
  {
    instructions: "Correct the initialization for the Minimum Coin Change DP array.",
    buggy: "int coin_change(int coins[], int n, int amount) {\n    int dp[amount + 1];\n    for(int i=0; i<=amount; i++) dp[i] = 0;\n    dp[0] = 0;\n    // ... transition\n}",
    fixed: "int coin_change(int coins[], int n, int amount) {\n    int dp[amount + 1];\n    for(int i=0; i<=amount; i++) dp[i] = 99999;\n    dp[0] = 0;\n    // ... transition\n}",
    hints: ["We want to find the MINIMUM coins.", "Initializing with 0 will make the min() function always return 0. Initialize with a very large number (infinity)."],
    expectedOutput: "Proper minimum values stored in DP array."
  },
  {
    instructions: "Fix the boundary condition in the Rod Cutting problem.",
    buggy: "for (int i = 1; i <= n; i++) {\n    int max_val = -1;\n    for (int j = 0; j <= i; j++) {\n        max_val = max(max_val, price[j] + dp[i-j-1]);\n    }\n    dp[i] = max_val;\n}",
    fixed: "for (int i = 1; i <= n; i++) {\n    int max_val = -1;\n    for (int j = 0; j < i; j++) {\n        max_val = max(max_val, price[j] + dp[i-j-1]);\n    }\n    dp[i] = max_val;\n}",
    hints: ["If j goes up to i, i-j-1 becomes -1, crashing the program.", "j must be strictly less than i."],
    expectedOutput: "Maximum profit calculated safely."
  }
];