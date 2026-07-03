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
    question: "Given an infinite supply of coins of denominations {1, 2, 5}. The minimum number of coins to make an amount of 11 is: **GATE 2008**",
    options: ["2","3","4","5"],
    correctAnswer: 1,
    explanation: "The optimal combination is 5 + 5 + 1 = 11, which uses 3 coins."
  },
  {
    question: "In the coin change problem, if the denominations are {1, 3, 4}, what is the minimum number of coins to make the amount 6? **GATE 2005**",
    options: ["2","3","4","6"],
    correctAnswer: 0,
    explanation: "The optimal combination is 3 + 3 = 6, using 2 coins. A greedy approach would pick 4 + 1 + 1 (3 coins), which is suboptimal."
  },
  {
    question: "The time complexity to find the minimum number of coins to make change for amount N using k denominations using Dynamic Programming is: **GATE 2016**",
    options: ["O(N log k)","O(N * k)","O(N + k)","O(N^2)"],
    correctAnswer: 1,
    explanation: "The DP table is of size N+1, and for each amount, we iterate through all k denominations, resulting in O(N * k) time complexity."
  },
  {
    question: "For the standard US currency denominations {1, 5, 10, 25}, the greedy algorithm for finding the minimum number of coins for any amount always yields the optimal solution. This system is called: **GATE 2014**",
    options: ["Canonical","Non-canonical","Optimal","Complete"],
    correctAnswer: 0,
    explanation: "A coin system where the greedy algorithm always produces the optimal solution is called a canonical coin system."
  },
  {
    question: "Number of ways to make change for amount 4 with denominations {1, 2, 3} assuming infinite supply is: **GATE 2003**",
    options: ["3","4","5","6"],
    correctAnswer: 1,
    explanation: "The combinations are: {1,1,1,1}, {1,1,2}, {2,2}, and {1,3}. So there are 4 ways."
  },
  {
    question: "The recurrence relation for finding the minimum coins C[p] to make amount p using denominations d is: **GATE 2015**",
    options: ["C[p] = 1 + min(C[p - d[i]]) for all i","C[p] = max(C[p - d[i]]) for all i","C[p] = 1 + C[p - 1]","C[p] = sum(C[p - d[i]]) for all i"],
    correctAnswer: 0,
    explanation: "The minimum number of coins for amount p is 1 plus the minimum of the coins required for (p - d[i]) for all available denominations."
  },
  {
    question: "Given coin denominations {1, 4, 5}, the greedy approach for amount 8 will use how many coins? **GATE 2011**",
    options: ["2","3","4","5"],
    correctAnswer: 2,
    explanation: "Greedy will pick 5, then 1, 1, 1. A total of 4 coins (5+1+1+1). The optimal is 4+4 (2 coins)."
  },
  {
    question: "Given coin denominations {1, 4, 5}, the dynamic programming approach for amount 8 will use how many coins? **GATE 2012**",
    options: ["2","3","4","5"],
    correctAnswer: 0,
    explanation: "Dynamic programming finds the optimal solution, which is 4 + 4 = 8, using exactly 2 coins."
  },
  {
    question: "The Coin Change problem (finding minimum coins) is closely related to which other dynamic programming problem? **GATE 2020**",
    options: ["0-1 Knapsack","Fractional Knapsack","Unbounded Knapsack","Matrix Chain Multiplication"],
    correctAnswer: 2,
    explanation: "Since we have an infinite supply of each coin denomination, the problem maps directly to the Unbounded Knapsack problem."
  },
  {
    question: "What is the space complexity of the optimal 1D DP solution to find the number of ways to make change for amount V with N coins? **GATE 2017**",
    options: ["O(V)","O(N)","O(V*N)","O(V+N)"],
    correctAnswer: 0,
    explanation: "A 1D array of size V+1 is sufficient to store the number of ways for each intermediate amount, leading to O(V) space complexity."
  },
  {
    question: "Consider coin denominations {2, 5}. Which of the following amounts cannot be formed using these coins? **GATE 2006**",
    options: ["3","4","7","9"],
    correctAnswer: 0,
    explanation: "Amounts 4 (2+2), 7 (2+5), and 9 (2+2+5) can be formed. Amount 3 cannot be formed."
  },
  {
    question: "If we only want to know if it's possible to make change for amount N, and we don't care about the number of ways or minimum coins, the state transition becomes: **GATE 2009**",
    options: ["DP[i] = DP[i] + DP[i-c]","DP[i] = DP[i] || DP[i-c]","DP[i] = min(DP[i], DP[i-c]+1)","DP[i] = DP[i] && DP[i-c]"],
    correctAnswer: 1,
    explanation: "To track just the possibility, we use a boolean OR operation: DP[i] is true if DP[i-c] is true for any coin c."
  },
  {
    question: "To count the total number of ways to make a sum, the initialization of the DP array (DP[0]) should be: **GATE 2021**",
    options: ["0","1","Infinity","-1"],
    correctAnswer: 1,
    explanation: "There is exactly 1 way to make the sum of 0, which is to pick no coins at all. So DP[0] = 1."
  },
  {
    question: "In the context of the Coin Change problem, memoization is a technique used in: **GATE 2019**",
    options: ["Bottom-up Dynamic Programming","Top-down Dynamic Programming","Greedy Algorithms","Divide and Conquer without overlapping subproblems"],
    correctAnswer: 1,
    explanation: "Memoization refers to caching the results of function calls in Top-down Dynamic Programming."
  },
  {
    question: "If a coin system has denominations {1, c, c^2, ..., c^k} for some integer c > 1, the greedy algorithm for making change will: **GATE 2013**",
    options: ["Always find the optimal minimum coins","Sometimes fail to find the optimal","Only work if c is even","Never find the optimal"],
    correctAnswer: 0,
    explanation: "For denominations that are successive powers of a base c > 1, the greedy algorithm is proven to always yield the optimal minimum coin solution."
  },
];

export const dpCoinDebug = {
  instructions: "Fix the syntax error so the code compiles correctly.",
  buggyC: "#include <stdio.h>\n\nint main() {\n    printf(\"Hello World\")\n    return 0;\n}",
  fixedC: "#include <stdio.h>\n\nint main() {\n    printf(\"Hello World\\n\");\n    return 0;\n}",
  buggyJava: "public class Main {\n    public static void main(String[] args) {\n        System.out.printl(\"Hello World\");\n    }\n}",
  fixedJava: "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello World\");\n    }\n}",
  hints: ["Check the print statement.","Missing semicolon or wrong spelling?","Fix it!"],
  expectedOutput: "Hello World"
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
  title: "Complete the Code: Coin Change DP",
  code: `public int coinChange(int[] coins, int amount) {
    int[] dp = new int[amount + 1];
    Arrays.fill(dp, {blank1});
    dp[0] = 0;
    
    for (int i = 1; i <= amount; i++) {
        for (int coin : coins) {
            if (coin <= i) {
                dp[i] = Math.min(dp[i], dp[{blank2}] + 1);
            }
        }
    }
    
    return dp[amount] > amount ? {blank3} : dp[amount];
}
`,
  blanks: [
    { id: "blank1", answer: "amount + 1", options: ["0", "Integer.MAX_VALUE", "amount + 1"] },
    { id: "blank2", answer: "i - coin", options: ["i - coin", "coin - i", "i + coin"] },
    { id: "blank3", answer: "-1", options: ["0", "-1", "amount"] }
  ],
  explanation: "We initialize the DP array with `amount + 1` to avoid overflow while simulating infinity. The recurrence accesses `dp[i - coin]`. If `dp[amount]` is greater than `amount`, it means it was never updated and is impossible, so we return `-1`."
};
