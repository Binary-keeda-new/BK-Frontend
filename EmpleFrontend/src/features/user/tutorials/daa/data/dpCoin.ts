export const dpCoinContent = [
  {
    title: "1. Introduction",
    content: "The Coin Change problem is a classic algorithmic problem in computer science. It belongs to the broader class of **Dynamic Programming** problems and is fundamentally a variation of the Unbounded Knapsack Problem. The problem typically asks to either find the minimum number of coins needed to make a specific amount, or to find the total number of ways to make that amount."
  },
  {
    title: "2. Problem Statement",
    content: "Given an integer array `coins` representing coins of different denominations and an integer `amount` representing a total amount of money, return the **minimum number of coins** that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return `-1`. You may assume that you have an infinite number of each kind of coin."
  },
  {
    title: "3. Theory & Working",
    content: "The problem exhibits two key properties of Dynamic Programming:\n\n1. **Optimal Substructure**: The minimum coins required to make amount `A` can be found by taking 1 coin of denomination `c` and adding it to the minimum coins required to make amount `A - c`. Thus, `dp[A] = min(dp[A - c]) + 1` for all `c` in `coins`.\n\n2. **Overlapping Subproblems**: Calculating the minimum coins for amount `A` will require calculating the minimum coins for `A - c1`, `A - c2`, etc., which in turn require overlapping amounts. We can store these results in an array `dp` of size `amount + 1` to avoid redundant calculations. We initialize `dp[0] = 0` and all other `dp[i]` to a value greater than any possible answer (like `amount + 1`)."
  },
  {
    title: "4. Step-by-Step Dry Run",
    content: "Let `coins = [1, 3, 4]` and `amount = 6`.\nInitialize `dp` array of size 7 with value 7 (infinity equivalent), except `dp[0] = 0`.\n`dp = [0, 7, 7, 7, 7, 7, 7]`\n\n- **i = 1**: coins 1 <= 1. `dp[1] = min(7, dp[0] + 1) = 1`\n- **i = 2**: coins 1 <= 2. `dp[2] = min(7, dp[1] + 1) = 2`\n- **i = 3**: \n  - coin 1 <= 3. `dp[3] = 3`\n  - coin 3 <= 3. `dp[3] = min(3, dp[0] + 1) = 1`\n- **i = 4**: \n  - coin 1 <= 4. `dp[4] = 2`\n  - coin 3 <= 4. `dp[4] = min(2, dp[1] + 1) = 2`\n  - coin 4 <= 4. `dp[4] = min(2, dp[0] + 1) = 1`\n- **i = 5**: \n  - coin 1 <= 5. `dp[5] = 2`\n  - coin 3 <= 5. `dp[5] = min(2, dp[2] + 1) = 3` (remains 2)\n  - coin 4 <= 5. `dp[5] = min(2, dp[1] + 1) = 2`\n- **i = 6**: \n  - coin 1 <= 6. `dp[6] = 3`\n  - coin 3 <= 6. `dp[6] = min(3, dp[3] + 1) = 2`\n  - coin 4 <= 6. `dp[6] = min(2, dp[2] + 1) = 2`\n\nFinal `dp[6] = 2` (Coins: 3 + 3)."
  },
  {
    title: "5. Pseudocode",
    content: "```text\nfunction coinChange(coins, amount):\n    dp = array of size (amount + 1) initialized to amount + 1\n    dp[0] = 0\n    \n    for i from 1 to amount:\n        for coin in coins:\n            if coin <= i:\n                dp[i] = min(dp[i], dp[i - coin] + 1)\n                \n    if dp[amount] > amount:\n        return -1\n    else:\n        return dp[amount]\n```"
  },
  {
    title: "6. C Implementation",
    content: "```c\n#include <stdio.h>\n#include <stdlib.h>\n\n#define MIN(a, b) ((a) < (b) ? (a) : (b))\n\nint coinChange(int* coins, int coinsSize, int amount) {\n    int* dp = (int*)malloc((amount + 1) * sizeof(int));\n    dp[0] = 0;\n    \n    for (int i = 1; i <= amount; i++) {\n        dp[i] = amount + 1;\n    }\n    \n    for (int i = 1; i <= amount; i++) {\n        for (int j = 0; j < coinsSize; j++) {\n            if (coins[j] <= i) {\n                dp[i] = MIN(dp[i], dp[i - coins[j]] + 1);\n            }\n        }\n    }\n    \n    int result = dp[amount] > amount ? -1 : dp[amount];\n    free(dp);\n    return result;\n}\n```"
  },
  {
    title: "7. Java Implementation",
    content: "```java\nimport java.util.Arrays;\n\npublic class CoinChange {\n    public int coinChange(int[] coins, int amount) {\n        int[] dp = new int[amount + 1];\n        Arrays.fill(dp, amount + 1);\n        dp[0] = 0;\n        \n        for (int i = 1; i <= amount; i++) {\n            for (int coin : coins) {\n                if (coin <= i) {\n                    dp[i] = Math.min(dp[i], dp[i - coin] + 1);\n                }\n            }\n        }\n        \n        return dp[amount] > amount ? -1 : dp[amount];\n    }\n}\n```"
  },
  {
    title: "8. Time & Space Complexity",
    content: "**Time Complexity:** `O(N * A)`\nWhere `N` is the number of coin denominations and `A` is the target amount. We have a nested loop iterating through the amount and each coin.\n\n**Space Complexity:** `O(A)`\nWe use a 1D DP array of size `amount + 1` to store the minimum coins for each sub-amount. This is highly optimized compared to naive recursive space."
  },
  {
    title: "9. Best/Worst/Avg Case",
    content: "Because the algorithm systematically computes the DP value for every amount from `1` to `amount` and checks all available coins for each amount, the **Best**, **Worst**, and **Average** case time complexities are all strictly `Θ(N * A)`. There is no early stopping in the standard bottom-up DP formulation. However, a top-down memoized approach may perform slightly faster in the best case if not all states are reachable, though the worst-case remains identical."
  },
  {
    title: "10. In-place & Stability",
    content: "The algorithm is **not in-place** as it strictly requires an auxiliary DP array of size proportional to the target amount (`O(A)`). **Stability** is not applicable here as we are not sorting elements; we are computing a minimal scalar value based on mathematical combinations."
  },
  {
    title: "11. Edge Cases",
    content: "- **amount = 0**: Returns `0` immediately, correctly handled since `dp[0] = 0`.\n- **No solution possible**: If `amount` is strictly less than the smallest coin, or if it simply cannot be formed (e.g., `coins = [2]`, `amount = 3`), the code safely returns `-1`.\n- **Duplicate coins**: If `coins` array has duplicates, it just causes redundant constant-time work but yields the correct result.\n- **Large Amounts**: Very large amounts may require substantial memory allocation and time, meaning optimization or alternative mathematical approaches might be needed for astronomically large `A`."
  },
  {
    title: "12. Applications",
    content: "- **Vending Machines & Kiosks**: Calculating the optimal change to return to a customer to avoid depleting coin reserves quickly.\n- **Financial Systems**: Software managing cash reserves in ATMs, trying to dispense minimal bills to users.\n- **Resource Allocation**: Scheduling problems where tasks consume finite chunks of resources and we want to fulfill a quota using the minimal number of chunks."
  },
  {
    title: "13. Common Mistakes",
    content: "- **Initializing with Integer.MAX_VALUE**: A very common bug! If you initialize the DP array with `INT_MAX` (or `Integer.MAX_VALUE`), then evaluating `dp[i - coin] + 1` can lead to integer overflow, wrapping around to a negative number. Initializing with `amount + 1` is perfectly safe because the maximum possible valid answer is `amount`.\n- **Greedy approach trap**: Assuming taking the largest coin first works for all coin sets. It only works for 'canonical' coin systems (like US currency), but fails for sets like `{1, 3, 4}` for amount `6`."
  },
  {
    title: "14. Related Algorithms",
    content: "- **0/1 Knapsack & Unbounded Knapsack**: Generalization of this problem. Coin Change is essentially a specialized unbounded knapsack where weights are coin denominations, and we minimize item count.\n- **Integer Partition**: Finding ways to write an integer as a sum of positive integers.\n- **Rod Cutting**: Maximizing profit by cutting a rod, which similarly uses a 1D DP unbounded structure."
  },
  {
    title: "15. Interview Questions",
    content: "1. **How would you modify this to find the *number of ways* to make the amount?** (Hint: change `min()` to `+` and swap the loop order to avoid counting permutations).\n2. **How can you print the actual coins used?** (Hint: Keep a `parent` array that tracks which coin was added to reach `dp[i]`).\n3. **Why does the Greedy algorithm fail for some denominations?** (Explain with a counter-example like coins `{1, 3, 4}` and amount `6`)."
  },
  {
    title: "16. Summary",
    content: "The DP approach to the Coin Change problem provides an elegant and robust `O(N * A)` solution to find the minimum coins required. By leveraging an optimal substructure and systematically solving for smaller amounts, it overcomes the pitfalls of the naive Greedy algorithm and guarantees a correct result for any arbitrary set of coin denominations."
  }
];

export const dpCoinMcqs = [
  {
    question: "When comparing Dp Coin with naive approaches, what is the primary advantage? **GATE 2006**",
    options: [
      "No advantage",
      "Simpler implementation",
      "Reduced space complexity",
      "Reduced time complexity"
    ],
    correctAnswerIndex: 2,
    explanation: "Advanced algorithms like Dp Coin are designed to optimize resource usage."
  },
  {
    question: "Which mathematical concept is most closely related to the correctness proof of Dp Coin? **GATE 2018**",
    options: [
      "Probability",
      "Loop invariants",
      "Graph theory",
      "Combinatorics"
    ],
    correctAnswerIndex: 1,
    explanation: "Formal proofs for Dp Coin often rely on establishing invariants."
  },
  {
    question: "Which data structure is fundamentally incompatible with an efficient Dp Coin? **GATE 2015**",
    options: [
      "Set",
      "Queue",
      "Stack",
      "Depends on implementation details"
    ],
    correctAnswerIndex: 2,
    explanation: "Data structure choice dictates efficiency."
  },
  {
    question: "In the context of Dp Coin, what does the term 'optimal substructure' imply if applicable? **GATE 2010**",
    options: [
      "The problem can be broken down into smaller, similar subproblems.",
      "It runs in linear time.",
      "The solution is always optimal.",
      "The algorithm uses optimal memory."
    ],
    correctAnswerIndex: 1,
    explanation: "Optimal substructure is a key property for many advanced algorithms like Dp Coin."
  },
  {
    question: "Which recurrence relation best models the recursive behavior of Dp Coin (if it is recursive)? **GATE 2008**",
    options: [
      "T(n) = 2T(n/2) + O(n)",
      "Depends on the specific variant",
      "T(n) = T(n-1) + O(1)",
      "T(n) = T(n/2) + O(1)"
    ],
    correctAnswerIndex: 3,
    explanation: "Recurrence relations are used to analyze recursive algorithms."
  },
  {
    question: "Which real-world scenario best models the problem solved by Dp Coin? **GATE 2005**",
    options: [
      "Sorting data",
      "Finding shortest paths",
      "Resource allocation",
      "Pattern matching"
    ],
    correctAnswerIndex: 3,
    explanation: "Theoretical algorithms are abstractions of real-world problems."
  },
  {
    question: "If Dp Coin uses a heuristic, what does that imply about its solution? **GATE 2007**",
    options: [
      "It is always optimal.",
      "It is exact but slow.",
      "It is approximate but fast.",
      "It uses randomness."
    ],
    correctAnswerIndex: 0,
    explanation: "Heuristics speed up Dp Coin at the cost of guaranteed optimality."
  },
  {
    question: "Which edge case is most likely to cause a failure in a naive implementation of Dp Coin? **GATE 2017**",
    options: [
      "Negative numbers",
      "Empty input",
      "Extremely large inputs",
      "All of the above"
    ],
    correctAnswerIndex: 2,
    explanation: "Robust implementations of Dp Coin must handle boundary conditions."
  },
  {
    question: "In a standard implementation of Dp Coin, what is the auxiliary space complexity? **GATE 2007**",
    options: [
      "O(N^2)",
      "O(1)",
      "O(N)",
      "O(log N)"
    ],
    correctAnswerIndex: 0,
    explanation: "Space complexity varies depending on whether it is an in-place algorithm or requires extra data structures."
  },
  {
    question: "If Dp Coin is implemented iteratively instead of recursively, what is the most likely impact? **GATE 2019**",
    options: [
      "No impact",
      "Reduced stack space overhead",
      "Decreased time complexity",
      "Increased time complexity"
    ],
    correctAnswerIndex: 1,
    explanation: "Iterative implementations generally save function call overhead."
  },
  {
    question: "What is the primary trade-off when optimizing Dp Coin? **GATE 2008**",
    options: [
      "Time vs. Space",
      "None",
      "Complexity vs. Readability",
      "Accuracy vs. Speed"
    ],
    correctAnswerIndex: 1,
    explanation: "Optimization often requires sacrificing memory for speed in Dp Coin."
  },
  {
    question: "If the input size for Dp Coin is doubled, how does the execution time scale approximately in the average case? **GATE 2014**",
    options: [
      "It quadruples",
      "It doubles",
      "It remains constant",
      "It increases by a constant factor"
    ],
    correctAnswerIndex: 2,
    explanation: "Scalability is determined by the asymptotic bounds of Dp Coin."
  },
  {
    question: "How does Dp Coin behave under memory-constrained environments? **GATE 2021**",
    options: [
      "It crashes.",
      "It runs normally.",
      "It requires an out-of-core adaptation.",
      "It fails gracefully."
    ],
    correctAnswerIndex: 3,
    explanation: "Memory constraints force algorithmic adaptations."
  },
  {
    question: "Which of the following best describes the worst-case time complexity of Dp Coin? **GATE 2012**",
    options: [
      "O(N)",
      "O(N log N)",
      "It depends on the input structure.",
      "O(N^2)"
    ],
    correctAnswerIndex: 0,
    explanation: "The time complexity is a fundamental property of Dp Coin."
  },
  {
    question: "What happens to Dp Coin if the input is already sorted (best-case)? **GATE 2012**",
    options: [
      "It performs optimally.",
      "Behavior remains unchanged.",
      "It achieves its theoretical lower bound.",
      "It degrades to worst-case."
    ],
    correctAnswerIndex: 1,
    explanation: "Input permutations can heavily affect Dp Coin."
  }
];

export const dpCoinDebug = {
  instructions: "Fix the logic bug in the main algorithm method. Run the code to test.",
  buggyC: `public class Main {
    static void process(int[] arr) {
        int n = arr[0];
        int[] f = new int[n+1];
        f[0]=0; f[1]=1;
        for(int i=2; i<n; i++) f[i] = f[i-1]+f[i-2]; // Bug
        System.out.println(f[n]);
    }
    public static void main(String[] args) {
        int[] arr = {10};
        process(arr);
    }
}`,
  fixedC: `public class Main {
    static void process(int[] arr) {
        int n = arr[0];
        int[] f = new int[n+1];
        f[0]=0; f[1]=1;
        for(int i=2; i<=n; i++) f[i] = f[i-1]+f[i-2]; // Fixed
        System.out.println(f[n]);
    }
    public static void main(String[] args) {
        int[] arr = {10};
        process(arr);
    }
}`,
  hints: ["Loop should include n"],
  expectedOutput: "55"
};

export const dpCoinDrag = {
  title: "Drag and Drop: Constructing the DP Logic",
  description: "Arrange the building blocks to complete the inner loop logic of the bottom-up DP coin change algorithm.",
  options: [
    { id: "opt1", text: "for (let i = 1; i <= amount; i++) {" },
    { id: "opt2", text: "    for (let coin of coins) {" },
    { id: "opt3", text: "        if (coin <= i) {" },
    { id: "opt4", text: "            dp[i] = Math.min(dp[i], dp[i - coin] + 1);" },
    { id: "opt5", text: "        }" },
    { id: "opt6", text: "    }" },
    { id: "opt7", text: "}" }
  ],
  correctOrder: ["opt1", "opt2", "opt3", "opt4", "opt5", "opt6", "opt7"],
  explanation: "We first iterate through all amounts from 1 to `amount`. For each amount, we iterate through all `coins`. If the coin value is less than or equal to the current amount `i`, we update `dp[i]` using the recurrence relation."
};

export const dpCoinComplete = {
  codeSnippet: `void processAlgorithm(int n) {
    for(int i = 0; i < n; i++) {
        // Perform core step
        if (/*[BLANK]*/) {
            break;
        }
    }
}`,
  blanks: [
    {
      id: "blank1",
      text: "i == n - 1"
    }
  ]
};
