export const greedyCoinContent = [
  {
    title: "1. Introduction",
    content: "The **Coin Change Problem** using the Greedy Approach is a classic algorithmic problem. It asks for the minimum number of coins needed to make up a given sum, assuming we have an infinite supply of coins of specific denominations. The greedy strategy tackles this by always picking the highest denomination coin that is less than or equal to the remaining sum. While incredibly fast and memory-efficient, this approach relies heavily on the mathematical properties of the coin system (canonical systems like US currency or INR) to guarantee an optimal answer."
  },
  {
    title: "2. Problem Statement",
    content: "Given a target amount `V` and an array of `n` distinct coin denominations `C = {c1, c2, ..., cn}`, find the minimum number of coins required to form the exact amount `V`. You may use an infinite number of each denomination. If it is impossible to make the amount `V` using the given denominations, the algorithm should indicate failure. In the greedy approach, we aim to minimize the count by prioritizing the largest available denominations."
  },
  {
    title: "3. Theory & Working",
    content: "The Greedy approach for the Coin Change problem operates on the principle of local optimization hoping for a global optimum. \n\n**Steps:**\n1. **Sort** the array of denominations in descending order.\n2. **Initialize** an empty result list (or a counter) for the coins.\n3. **Iterate** through the sorted denominations:\n   - While the current denomination is less than or equal to the remaining amount `V`:\n     - Subtract the denomination from `V`.\n     - Add the denomination to the result list.\n4. **Check** if `V == 0`. If so, the algorithm successfully found a solution. If `V > 0` after checking all coins, the greedy algorithm failed to make the exact change."
  },
  {
    title: "4. Step-by-Step Dry Run",
    content: "Let's make change for `V = 93` using Indian Currency denominations: `{1000, 500, 100, 50, 20, 10, 5, 2, 1}`.\n\n- **Step 1:** Sort in descending order (already sorted).\n- **Step 2:** Compare 1000, 500, 100 (all > 93).\n- **Step 3:** Current coin = 50. Since 50 <= 93, take one 50. `V = 93 - 50 = 43`.\n- **Step 4:** Compare 50 ( > 43). Move to 20.\n- **Step 5:** Current coin = 20. Since 20 <= 43, take one 20. `V = 43 - 20 = 23`.\n- **Step 6:** Still on 20. 20 <= 23, take another 20. `V = 23 - 20 = 3`.\n- **Step 7:** Move past 10, 5. Current coin = 2.\n- **Step 8:** 2 <= 3, take one 2. `V = 3 - 2 = 1`.\n- **Step 9:** Current coin = 1. 1 <= 1, take one 1. `V = 1 - 1 = 0`.\n- **Result:** `{50, 20, 20, 2, 1}`. Total 5 coins."
  },
  {
    title: "5. Pseudocode",
    content: "```text\nfunction GreedyCoinChange(coins[], n, V):\n    Sort coins in descending order\n    count = 0\n    result_coins = empty list\n    \n    for i from 0 to n-1:\n        while V >= coins[i]:\n            V = V - coins[i]\n            result_coins.append(coins[i])\n            count = count + 1\n            \n    if V == 0:\n        return count, result_coins\n    else:\n        return \"Failure: Cannot make exact change\"\n```"
  },
  {
    title: "6. C Implementation",
    content: "```c\n#include <stdio.h>\n\nvoid findMinCoins(int coins[], int n, int V) {\n    int count = 0;\n    printf(\"Coins used: \");\n    // Assuming coins array is already sorted in descending order\n    for (int i = 0; i < n; i++) {\n        while (V >= coins[i]) {\n            V -= coins[i];\n            printf(\"%d \", coins[i]);\n            count++;\n        }\n    }\n    if (V == 0)\n        printf(\"\\nTotal minimum coins: %d\\n\", count);\n    else\n        printf(\"\\nCannot make exact change!\\n\");\n}\n\nint main() {\n    int coins[] = {50, 20, 10, 5, 2, 1};\n    int n = sizeof(coins) / sizeof(coins[0]);\n    int V = 93;\n    findMinCoins(coins, n, V);\n    return 0;\n}\n```"
  },
  {
    title: "7. Java Implementation",
    content: "```java\nimport java.util.ArrayList;\nimport java.util.Arrays;\nimport java.util.Collections;\n\npublic class GreedyCoinChange {\n    public static void findMinCoins(Integer[] coins, int V) {\n        // Sort coins in descending order\n        Arrays.sort(coins, Collections.reverseOrder());\n        \n        ArrayList<Integer> result = new ArrayList<>();\n        for (int i = 0; i < coins.length; i++) {\n            while (V >= coins[i]) {\n                V -= coins[i];\n                result.add(coins[i]);\n            }\n        }\n        \n        if (V == 0) {\n            System.out.println(\"Total minimum coins: \" + result.size());\n            System.out.println(\"Coins used: \" + result);\n        } else {\n            System.out.println(\"Cannot make exact change!\");\n        }\n    }\n\n    public static void main(String[] args) {\n        Integer[] coins = {1, 2, 5, 10, 20, 50};\n        int V = 93;\n        findMinCoins(coins, V);\n    }\n}\n```"
  },
  {
    title: "8. Time & Space Complexity",
    content: "**Time Complexity:** \n- If the coins are unsorted, sorting takes $O(N \\log N)$ where $N$ is the number of denominations.\n- The greedy selection phase takes $O(V)$ in the worst-case if implemented with repeated subtraction (e.g., sum is 1000, max coin is 1). However, if implemented with division (`V / coins[i]` and `V % coins[i]`), the selection phase takes exactly $O(N)$ time.\n- Overall Time Complexity: $O(N \\log N)$ (due to sorting). If pre-sorted, it is $O(N)$ with division/modulo.\n\n**Space Complexity:** \n- $O(1)$ auxiliary space if we only keep a counter, or $O(K)$ where $K$ is the number of coins chosen if we store the result."
  },
  {
    title: "9. Best, Worst, & Average Case",
    content: "**Best Case:** $O(1)$ during the selection phase. This happens when the target amount `V` is perfectly divisible by the largest denomination, returning the answer in the first iteration.\n\n**Worst Case:** $O(V)$ (with subtraction logic). If `V` is huge and we only have a coin of denomination `1`, the while loop runs `V` times. Using division and modulo bounds the worst-case to $O(N)$.\n\n**Average Case:** Operates well within $O(N)$ iterations since standard currency systems quickly reduce the remaining amount `V`."
  },
  {
    title: "10. In-place & Stability",
    content: "- **In-place:** Yes, the algorithm strictly uses a few variables (counter, loop indices, remainder) and modifies `V` in place without requiring external data structures for logic overhead.\n- **Stability:** Stability is generally a property of sorting algorithms. For this optimization problem, the concept of stability is not applicable."
  },
  {
    title: "11. Edge Cases",
    content: "- **Target `V = 0`:** The algorithm successfully skips all loops and returns `0` coins.\n- **Non-Canonical Coin Systems:** Systems where Greedy FAILS to yield the optimal result. Example: `coins = {1, 3, 4}`, `V = 6`. Greedy gives `4 + 1 + 1` (3 coins), but optimal is `3 + 3` (2 coins).\n- **Missing Unit Coin:** If `coins = {2, 5}` and `V = 3`. Greedy tries to pick `2`, leaves `1`, and then fails to make the exact change (returns failure), even though no optimal solution exists either."
  },
  {
    title: "12. Applications",
    content: "1. **Point of Sale (POS) Systems:** Cash registers automatically calculate the exact minimal notes/coins to give back as change.\n2. **Vending Machines:** Fast hardware-level calculations to dispense change.\n3. **Fractional Knapsack Alignment:** The same greedy property applies structurally to continuous allocation problems where objects can be infinitely divided."
  },
  {
    title: "13. Common Mistakes",
    content: "1. **Assuming Greedy is Always Optimal:** This is the #1 pitfall. The greedy algorithm ONLY yields the optimal solution for **canonical** coin systems (like US, EU, and Indian currency). For arbitrary denominations, Dynamic Programming is required.\n2. **Not Sorting the Array:** If denominations are unordered, the algorithm fails entirely. It must evaluate from largest to smallest.\n3. **Using Subtraction Instead of Modulo:** While mathematically correct, using `V -= coin[i]` in a loop can cause TLE (Time Limit Exceeded) for very large `V`. Use `count += V / coins[i]` and `V = V % coins[i]`."
  },
  {
    title: "14. Related Algorithms",
    content: "- **Dynamic Programming Coin Change:** Computes the exact optimal change for *any* arbitrary set of denominations in $O(N \\times V)$ time.\n- **Fractional Knapsack:** Another greedy algorithm that sorts items by value-to-weight ratio to maximize profit.\n- **Activity Selection Problem:** Demonstrates the greedy choice property where local optimization guarantees the global optimal solution."
  },
  {
    title: "15. Interview Questions",
    content: "**Q: Under what mathematical condition does the greedy coin change algorithm guarantee an optimal solution?**\n*A: When the coin system forms a canonical system (often satisfied if every coin is a multiple of the previous denomination, e.g., $c_i = k \\cdot c_{i-1}$, though this is a sufficient but not strictly necessary condition).* \n\n**Q: What happens if you try to make V = 8 with coins {1, 4, 5} using Greedy vs DP?**\n*A: Greedy selects 5, leaving 3, taking three 1s (total 4 coins). DP computes optimal 4 + 4 (total 2 coins).*"
  },
  {
    title: "16. Summary",
    content: "The Greedy Coin Change algorithm is a brilliant, ultra-fast heuristic for calculating minimum denominations for standard real-world currencies. Operating in $O(N)$ time (post-sorting) with minimal memory, it simulates human intuition. However, software engineers must recognize its limitations: when deployed on non-canonical systems, the greedy approach breaks, returning sub-optimal results or even failing to find valid combinations, necessitating Dynamic Programming."
  }
];

export const greedyCoinMcqs = [
  {
    question: "Consider a coin denomination set C = {1, 3, 4} and a target sum V = 6. What is the difference in the number of coins used by the Greedy approach versus the optimal (Dynamic Programming) approach?",
    options: [
      "0",
      "1",
      "2",
      "3"
    ],
    answer: 1,
    explanation: "Greedy will pick 4, then two 1s (total 3 coins). Optimal approach will pick two 3s (total 2 coins). The difference is 3 - 2 = 1."
  },
  {
    question: "Which of the following conditions definitively guarantees that the greedy algorithm will ALWAYS find the optimal solution for the coin change problem?",
    options: [
      "The denominations form an arithmetic progression.",
      "The denominations are all prime numbers.",
      "Each denomination is a multiple of the immediately smaller denomination.",
      "The sum V is an even number."
    ],
    answer: 2,
    explanation: "If each coin denomination is a strict multiple of the next smaller one (e.g., 1, 5, 10, 50), the system behaves like a standard matroid/canonical system, mathematically guaranteeing the greedy choice is optimal."
  },
  {
    question: "A cashier needs to return change for Rs. 2893 using Indian currency notes: {1000, 500, 100, 50, 20, 10, 5, 2, 1}. Using the greedy approach, how many notes in total will be dispensed?",
    options: [
      "10",
      "11",
      "12",
      "13"
    ],
    answer: 1,
    explanation: "2893 = 1000x2 + 500x1 + 100x3 + 50x1 + 20x2 + 2x1 + 1x1. Coins/notes = 2 + 1 + 3 + 1 + 2 + 1 + 1 = 11 notes."
  },
  {
    question: "Let V be the target amount and n be the number of sorted distinct coin denominations. If the greedy coin change is implemented using division and modulo operators rather than repeated subtraction, what is its asymptotic time complexity?",
    options: [
      "O(1)",
      "O(n)",
      "O(V)",
      "O(n log n)"
    ],
    answer: 1,
    explanation: "With division and modulo, processing each of the n denominations takes O(1) time. Thus, checking all n denominations takes exactly O(n) time."
  },
  {
    question: "Consider the coin denominations {2, 3} and a target sum V = 4. What happens when the standard Greedy algorithm (selecting the largest possible coin first) is applied?",
    options: [
      "It returns 2 coins (2, 2).",
      "It returns 1 coin (3) and leaves a remainder of 1, failing to find the exact change.",
      "It falls into an infinite loop.",
      "It automatically backtracks to find the optimal solution."
    ],
    answer: 1,
    explanation: "Greedy takes the largest coin ≤ 4, which is 3. The remainder is 1. No coin is ≤ 1, so the algorithm terminates with V=1, reporting a failure. It does not backtrack."
  },
  {
    question: "In the context of the Coin Change problem, what is a 'Canonical Coin System'?",
    options: [
      "A system where the number of denominations is less than 5.",
      "A system where the Greedy algorithm always yields the optimal (minimum coins) solution.",
      "A system that exclusively uses coins of power 2 (1, 2, 4, 8...).",
      "A system where Dynamic Programming is impossible to implement."
    ],
    answer: 1,
    explanation: "A coin system is called 'canonical' if the greedy algorithm always produces the optimal result (minimum number of coins) for any given amount."
  },
  {
    question: "If a developer uses the greedy approach on the denominations {1, 5, 10, 25} to make change for 30, what will be the output sequence of coins?",
    options: [
      "10, 10, 10",
      "25, 5",
      "25, 1, 1, 1, 1, 1",
      "10, 5, 5, 5, 5"
    ],
    answer: 1,
    explanation: "Greedy picks 25 first (remainder 5). Then it picks 5 (remainder 0). The sequence is 25, 5. This happens to be optimal."
  },
  {
    question: "When applying the greedy algorithm to find the minimum number of coins, which sorting order MUST the denominations array be in before the selection process begins?",
    options: [
      "Ascending order",
      "Descending order",
      "Randomized order",
      "Sorted by the number of factors of the coin value"
    ],
    answer: 1,
    explanation: "The greedy strategy relies on picking the largest possible coin first, which requires iterating through the denominations in descending order."
  },
  {
    question: "Compare the space complexity of the Greedy Coin Change (returning just the count) and the Dynamic Programming Coin Change algorithm (bottom-up table for sum V).",
    options: [
      "Greedy: O(V), DP: O(V)",
      "Greedy: O(1), DP: O(1)",
      "Greedy: O(1), DP: O(V)",
      "Greedy: O(n), DP: O(V^2)"
    ],
    answer: 2,
    explanation: "Greedy only requires a few variables for counting (O(1) space). The DP approach requires a 1D array of size V+1 to store overlapping subproblems (O(V) space)."
  },
  {
    question: "Which of the following problems conceptually shares the SAME local-optimum selection strategy (Greedy Property) as the Greedy Coin Change?",
    options: [
      "0/1 Knapsack Problem",
      "Fractional Knapsack Problem",
      "Longest Common Subsequence",
      "Matrix Chain Multiplication"
    ],
    answer: 1,
    explanation: "Fractional Knapsack uses a greedy strategy (sorting by value/weight ratio and taking the max possible). 0/1 Knapsack, LCS, and Matrix Chain Multiplication strictly require Dynamic Programming."
  }
];

export const greedyCoinDebug = {
  instructions: "Fix the syntax error so the code compiles correctly.",
  buggyC: "#include <stdio.h>\n\nint main() {\n    printf(\"Hello World\")\n    return 0;\n}",
  fixedC: "#include <stdio.h>\n\nint main() {\n    printf(\"Hello World\\n\");\n    return 0;\n}",
  buggyJava: "public class Main {\n    public static void main(String[] args) {\n        System.out.printl(\"Hello World\");\n    }\n}",
  fixedJava: "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello World\");\n    }\n}",
  hints: ["Check the print statement.","Missing semicolon or wrong spelling?","Fix it!"],
  expectedOutput: "Hello World"
};

export const greedyCoinDrag = {
  description: "Arrange the steps to construct a robust and optimized O(n) Greedy Coin Change iteration (assuming array is already sorted descending).",
  options: [
    "Initialize a counter `count = 0`.",
    "Iterate `i` from 0 to `n-1` (over each coin denomination).",
    "Add `V / coins[i]` to `count` to take as many coins of this denomination as possible.",
    "Update `V = V % coins[i]` to keep the remainder.",
    "If `V == 0` after the loop, return `count`, else return failure."
  ]
};

export const greedyCoinComplete = {
  description: "Complete the snippet to implement the optimized greedy selection using division and modulo operations instead of repeated subtraction.",
  code: `int getMinCoinsFast(int coins[], int n, int V) {
    int count = 0;
    // Assuming coins array is sorted in descending order
    for (int i = 0; i < n; i++) {
        if (V == 0) break;
        
        // Add max possible coins of denomination coins[i]
        count += 1️⃣;
        
        // Update remaining V
        V = 2️⃣;
    }
    
    return (V == 0) ? 3️⃣ : -1;
}`,
  options: [
    "V / coins[i]",
    "V % coins[i]",
    "count",
    "coins[i] / V",
    "V - coins[i]"
  ],
  blanks: [
    { id: 1, text: "V / coins[i]" },
    { id: 2, text: "V % coins[i]" },
    { id: 3, text: "count" }
  ]
};
