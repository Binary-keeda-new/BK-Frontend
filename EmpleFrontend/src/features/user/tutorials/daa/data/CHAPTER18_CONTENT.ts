export const CHAPTER18_CONTENT = {
  title: "1D Dynamic Programming",
  description: "Dive into 1-Dimensional Dynamic Programming applications. You will tackle classic problems like the Climbing Stairs problem, computing Fibonacci numbers efficiently, and the Coin Change problem. You will learn to define 1D state vectors, establish transition equations, and write highly optimized iterative solutions.",
  points: [
    {
      heading: "Fibonacci",
      body: "The Fibonacci sequence is the classic \"Hello World\" of Dynamic Programming. \n- **State:** `dp[i]` is the $i$-th Fibonacci number.\n- **Transition:** `dp[i] = dp[i-1] + dp[i-2]`.\n- **Base cases:** `dp[0] = 0`, `dp[1] = 1`.\nBy storing previous results in a 1D array, we reduce the time complexity from $O(2^n)$ down to $O(n)$."
    },
    {
      heading: "Minimum Coins",
      body: "Given a target amount and an array of coin denominations, find the minimum number of coins needed to make the amount.\n- **State:** `dp[i]` is the minimum coins to make amount `i`.\n- **Transition:** For each coin $c$, `dp[i] = min(dp[i], 1 + dp[i - c])`.\n- **Base case:** `dp[0] = 0` (0 coins to make amount 0). All other states initialized to infinity."
    },
    {
      heading: "Rod Cutting",
      body: "Given a rod of length $N$ and prices for all smaller piece lengths, determine the maximum revenue obtainable by cutting up the rod.\n- **State:** `dp[i]` is the max profit for a rod of length `i`.\n- **Transition:** `dp[i] = max(price[j] + dp[i - j - 1])` for all possible cuts $j$.\n- **Base case:** `dp[0] = 0` (a rod of length 0 has 0 profit)."
    },
    {
      heading: "Integer Break",
      body: "Given an integer $N$, break it into the sum of $k$ positive integers ($k \\ge 2$) and maximize the product of those integers.\n- **State:** `dp[i]` is the maximum product obtainable from breaking integer `i`.\n- **Transition:** We iterate through a cut $j$ from 1 to $i/2$. For each cut, we compare the product of just $j \\times (i-j)$ with breaking it further $j \\times dp[i-j]$. `dp[i] = max(dp[i], max(j * (i-j), j * dp[i-j]))`."
    },
    {
      heading: "Longest Increasing Subsequence",
      body: "Find the length of the longest strictly increasing subsequence in an array.\n- **State:** `dp[i]` is the length of the LIS ending precisely at index `i`.\n- **Transition:** For each element `arr[i]`, we look back at all previous elements `arr[j]` where $j < i$. If `arr[j] < arr[i]`, we can append `arr[i]` to the sequence ending at `j`. So, `dp[i] = max(dp[i], dp[j] + 1)`.\n- **Base case:** `dp[i] = 1` for all $i$, since a single element is a sequence of length 1."
    }
  ],
  code: "// 1D DP: Minimum Coins (Coin Change)\n#include <stdio.h>\n#define INF 99999\n\nint min(int a, int b) { return a < b ? a : b; }\n\nint minCoins(int coins[], int m, int V) {\n    int dp[V + 1];\n    dp[0] = 0;\n    for (int i = 1; i <= V; i++) dp[i] = INF;\n\n    for (int i = 1; i <= V; i++) {\n        for (int j = 0; j < m; j++) {\n            if (coins[j] <= i) {\n                int sub_res = dp[i - coins[j]];\n                if (sub_res != INF && sub_res + 1 < dp[i])\n                    dp[i] = sub_res + 1;\n            }\n        }\n    }\n    return dp[V];\n}\n"
};