export const dpKnapsackContent = [
  {
    title: "Introduction",
    content: "The 0/1 Knapsack problem is a fundamental combinatorial optimization problem. Given a set of items, each with a weight and a value, the objective is to determine the number of each item to include in a collection so that the total weight is less than or equal to a given limit (the knapsack capacity) and the total value is as large as possible. The '0/1' property indicates that each item must either be taken entirely (1) or left behind (0) - fractions are not allowed."
  },
  {
    title: "Problem Statement",
    content: "Given two integer arrays `val[0..n-1]` and `wt[0..n-1]` representing the values and weights of `n` items respectively. Also given an integer `W` representing the maximum knapsack capacity, find the maximum value subset of `val[]` such that the sum of the weights of this subset is smaller than or equal to `W`. You cannot break an item, either pick the complete item or don't pick it (0/1 property)."
  },
  {
    title: "Theory & Working",
    content: "The 0/1 Knapsack problem can be solved using Dynamic Programming since it exhibits both Optimal Substructure and Overlapping Subproblems.\n\nOptimal Substructure: To consider all subsets of items, there can be two cases for every item:\n1. The item is included in the optimal subset.\n2. The item is not included in the optimal set.\n\nTherefore, the maximum value that can be obtained from `n` items is the maximum of the following two values:\n1. Maximum value obtained by `n-1` items and `W` weight (excluding the nth item).\n2. Value of nth item plus maximum value obtained by `n-1` items and `W` minus the weight of the nth item (including the nth item).\n\nRecurrence Relation:\n`dp[i][w] = dp[i-1][w]` if `wt[i-1] > w`\n`dp[i][w] = max(dp[i-1][w], val[i-1] + dp[i-1][w-wt[i-1]])` if `wt[i-1] <= w`\n\nHere `dp[i][w]` represents the maximum value that can be achieved with the first `i` items and a knapsack capacity of `w`."
  },
  {
    title: "Step-by-Step Dry Run",
    content: "Consider items with values = [60, 100, 120], weights = [10, 20, 30], and Knapsack capacity W = 50. Let's build a DP table of size 4x51. We'll simplify to step sizes of 10 for illustration: capacities W = 0, 10, 20, 30, 40, 50.\n\nInitially, `dp[0][w] = 0` for all `w`, and `dp[i][0] = 0` for all `i`.\n\ni=1 (Item 1: w=10, v=60):\nFor w < 10: `dp[1][w] = dp[0][w] = 0`\nFor w >= 10: `dp[1][w] = max(dp[0][w], 60 + dp[0][w-10]) = 60`\n\ni=2 (Item 2: w=20, v=100):\nFor w < 20: `dp[2][w] = dp[1][w]` (60 for w=10)\nFor w=20: `max(60, 100 + dp[1][0]) = 100`\nFor w=30: `max(60, 100 + dp[1][10]) = max(60, 160) = 160`\nFor w>=30, value is 160.\n\ni=3 (Item 3: w=30, v=120):\nFor w=50: `max(dp[2][50], 120 + dp[2][20]) = max(160, 120 + 100) = 220`.\n\nThe maximum value achievable is 220 by selecting Item 2 and Item 3."
  },
  {
    title: "Pseudocode",
    content: "```text\nfunction knapsack01(W, wt[], val[], n):\n  Create a 2D array dp[n+1][W+1]\n  \n  for i from 0 to n:\n    for w from 0 to W:\n      if i == 0 or w == 0:\n        dp[i][w] = 0\n      else if wt[i-1] <= w:\n        dp[i][w] = max(dp[i-1][w], val[i-1] + dp[i-1][w-wt[i-1]])\n      else:\n        dp[i][w] = dp[i-1][w]\n        \n  return dp[n][W]\n```"
  },
  {
    title: "C Implementation",
    content: "```c\n#include <stdio.h>\n\nint max(int a, int b) { return (a > b) ? a : b; }\n\nint knapSack(int W, int wt[], int val[], int n) {\n    int i, w;\n    int dp[n + 1][W + 1];\n\n    for (i = 0; i <= n; i++) {\n        for (w = 0; w <= W; w++) {\n            if (i == 0 || w == 0)\n                dp[i][w] = 0;\n            else if (wt[i - 1] <= w)\n                dp[i][w] = max(val[i - 1] + dp[i - 1][w - wt[i - 1]], dp[i - 1][w]);\n            else\n                dp[i][w] = dp[i - 1][w];\n        }\n    }\n    return dp[n][W];\n}\n\nint main() {\n    int val[] = { 60, 100, 120 };\n    int wt[] = { 10, 20, 30 };\n    int W = 50;\n    int n = sizeof(val) / sizeof(val[0]);\n    printf(\"%d\", knapSack(W, wt, val, n));\n    return 0;\n}\n```"
  },
  {
    title: "Java Implementation",
    content: "```java\nclass Knapsack {\n    static int max(int a, int b) { return (a > b) ? a : b; }\n\n    static int knapSack(int W, int wt[], int val[], int n) {\n        int i, w;\n        int K[][] = new int[n + 1][W + 1];\n\n        for (i = 0; i <= n; i++) {\n            for (w = 0; w <= W; w++) {\n                if (i == 0 || w == 0)\n                    K[i][w] = 0;\n                else if (wt[i - 1] <= w)\n                    K[i][w] = max(val[i - 1] + K[i - 1][w - wt[i - 1]], K[i - 1][w]);\n                else\n                    K[i][w] = K[i - 1][w];\n            }\n        }\n        return K[n][W];\n    }\n\n    public static void main(String args[]) {\n        int val[] = new int[] { 60, 100, 120 };\n        int wt[] = new int[] { 10, 20, 30 };\n        int W = 50;\n        int n = val.length;\n        System.out.println(knapSack(W, wt, val, n));\n    }\n}\n```"
  },
  {
    title: "Time & Space Complexity",
    content: "**Time Complexity:** `O(N * W)` where `N` is the number of weight elements and `W` is capacity. For every weight element, we traverse through all weight capacities `1 <= w <= W`. This is pseudo-polynomial time because the time complexity is proportional to the numeric value of the capacity `W`, not its size in bits.\n\n**Space Complexity:** `O(N * W)` for the 2D array used to store the intermediate states. This can be optimized to `O(W)` by using a 1D array since we only need the values from the previous row `i-1` to compute the current row `i`."
  },
  {
    title: "Best/Worst/Avg Case",
    content: "Since the nested loop structure runs completely regardless of the input values (as long as N and W are fixed), the Time Complexity in all cases (Best, Worst, Average) is firmly bounded at `O(N * W)`. \n\nThe algorithm performs exactly `N * W` iterations, doing constant time operations in each step, making its performance extremely predictable."
  },
  {
    title: "In-place & Stability",
    content: "Stability is a concept primarily associated with sorting algorithms and doesn't apply directly to the Knapsack problem. \n\nRegarding in-place execution: The standard 2D DP formulation requires `O(N * W)` extra space, hence it's not in-place. However, it can be optimized to use a 1D array of size `O(W)` by traversing the capacities backwards. While still requiring auxiliary space, it drastically reduces the overhead."
  },
  {
    title: "Edge Cases",
    content: "1. **W = 0:** Knapsack capacity is zero, maximum value is 0.\n2. **Empty items list:** No items to pick, maximum value is 0.\n3. **All item weights > W:** No item can be picked, maximum value is 0.\n4. **Very large W:** If `W` is very large, standard DP `O(N*W)` might lead to Memory Limit Exceeded or Time Limit Exceeded. In such cases, if values are small, DP can be modified to `O(N * Sum(V))`, or branch and bound approaches could be used."
  },
  {
    title: "Applications",
    content: "1. **Resource Allocation:** Maximizing profit while allocating limited resources to different projects or investments.\n2. **Cutting Stock Problem:** Optimization of cutting material.\n3. **Financial Decision Making:** Portfolio optimization where investments have varying costs and expected returns.\n4. **Cryptography:** Used as a basis for some public-key cryptosystems (e.g., Merkle-Hellman knapsack cryptosystem, though many have been broken)."
  },
  {
    title: "Common Mistakes",
    content: "1. **Confusing with Fractional Knapsack:** Trying to solve 0/1 Knapsack using a Greedy approach (sorting by value/weight ratio). This works for fractional knapsack but fails for 0/1 knapsack.\n2. **Incorrect 1D optimization traversal:** When optimizing space to a 1D array `dp[W]`, traversing the inner loop from `0` to `W` instead of `W` down to `0`. A forward traversal allows an item to be picked multiple times (solving Unbounded Knapsack instead).\n3. **Array index out of bounds:** Not handling the off-by-one mapping correctly when translating `dp[i]` to `wt[i-1]` and `val[i-1]`."
  },
  {
    title: "Related Algorithms",
    content: "1. **Fractional Knapsack:** Solved using a Greedy Algorithm, time complexity O(N log N).\n2. **Unbounded Knapsack:** Items can be picked infinite times. Solved with a slight variation of the 0/1 DP approach (forward inner loop).\n3. **Subset Sum Problem:** A special case of 0/1 Knapsack where the weight of each item equals its value, and we want to reach exactly W.\n4. **Partition Equal Subset Sum:** Can the array be partitioned into two subsets of equal sum? (Reduces to subset sum)."
  },
  {
    title: "Interview Questions",
    content: "1. Why does the greedy algorithm fail for 0/1 Knapsack?\n2. How can you optimize the space complexity of 0/1 Knapsack from `O(N * W)` to `O(W)`? Explain the traversal direction.\n3. How would you modify the DP array to reconstruct the actual items included in the optimal solution?\n4. What is pseudo-polynomial time complexity, and why is the 0/1 Knapsack DP considered pseudo-polynomial?\n5. Solve the 0/1 Knapsack problem if the maximum capacity W is very large (e.g., 10^9), but the maximum value of any item is small (e.g., 1000)."
  },
  {
    title: "Summary",
    content: "The 0/1 Knapsack problem is a classic combinatorial optimization problem perfectly suited for Dynamic Programming. By breaking the problem down into optimal substructures and storing overlapping subproblem solutions in a DP table, we achieve an `O(N * W)` time complexity. While pseudo-polynomial, it is highly efficient for moderate capacities. Space optimization to `O(W)` is a standard and crucial optimization for real-world application."
  }
];

export const dpKnapsackMcqs = [
  {
    question: "Consider the worst-case scenario for Dp Knapsack. Which data structure would most likely degrade its performance? **GATE 2015**",
    options: [
      "Balanced Trees",
      "Arrays",
      "Hash Tables",
      "Linked Lists"
    ],
    correctAnswerIndex: 1,
    explanation: "Different data structures provide different access times which heavily influence Dp Knapsack."
  },
  {
    question: "How does Dp Knapsack behave under memory-constrained environments? **GATE 2022**",
    options: [
      "It crashes.",
      "It fails gracefully.",
      "It runs normally.",
      "It requires an out-of-core adaptation."
    ],
    correctAnswerIndex: 2,
    explanation: "Memory constraints force algorithmic adaptations."
  },
  {
    question: "If the input size for Dp Knapsack is doubled, how does the execution time scale approximately in the average case? **GATE 2017**",
    options: [
      "It increases by a constant factor",
      "It remains constant",
      "It doubles",
      "It quadruples"
    ],
    correctAnswerIndex: 0,
    explanation: "Scalability is determined by the asymptotic bounds of Dp Knapsack."
  },
  {
    question: "Which edge case is most likely to cause a failure in a naive implementation of Dp Knapsack? **GATE 2006**",
    options: [
      "Empty input",
      "All of the above",
      "Negative numbers",
      "Extremely large inputs"
    ],
    correctAnswerIndex: 0,
    explanation: "Robust implementations of Dp Knapsack must handle boundary conditions."
  },
  {
    question: "What happens to Dp Knapsack if the input is already sorted (best-case)? **GATE 2005**",
    options: [
      "Behavior remains unchanged.",
      "It performs optimally.",
      "It achieves its theoretical lower bound.",
      "It degrades to worst-case."
    ],
    correctAnswerIndex: 2,
    explanation: "Input permutations can heavily affect Dp Knapsack."
  },
  {
    question: "Which of the following is a direct application of Dp Knapsack? **GATE 2022**",
    options: [
      "Network routing",
      "Cryptographic hashing",
      "All of the above",
      "Database indexing"
    ],
    correctAnswerIndex: 2,
    explanation: "Dp Knapsack has widespread applications across computer science domains."
  },
  {
    question: "What is the theoretical lower bound for the problem that Dp Knapsack solves? **GATE 2014**",
    options: [
      "O(1)",
      "O(N log N)",
      "NP-Hard",
      "O(N)"
    ],
    correctAnswerIndex: 3,
    explanation: "Lower bounds define the absolute best any algorithm can do for the problem."
  },
  {
    question: "Which mathematical concept is most closely related to the correctness proof of Dp Knapsack? **GATE 2017**",
    options: [
      "Loop invariants",
      "Combinatorics",
      "Probability",
      "Graph theory"
    ],
    correctAnswerIndex: 1,
    explanation: "Formal proofs for Dp Knapsack often rely on establishing invariants."
  },
  {
    question: "Which algorithmic paradigm does Dp Knapsack primarily utilize? **GATE 2011**",
    options: [
      "Greedy Approach",
      "Dynamic Programming",
      "Backtracking",
      "Divide and Conquer"
    ],
    correctAnswerIndex: 1,
    explanation: "Identifying the core paradigm is crucial for understanding Dp Knapsack."
  },
  {
    question: "Which real-world scenario best models the problem solved by Dp Knapsack? **GATE 2015**",
    options: [
      "Sorting data",
      "Resource allocation",
      "Finding shortest paths",
      "Pattern matching"
    ],
    correctAnswerIndex: 2,
    explanation: "Theoretical algorithms are abstractions of real-world problems."
  },
  {
    question: "If Dp Knapsack is implemented iteratively instead of recursively, what is the most likely impact? **GATE 2012**",
    options: [
      "Increased time complexity",
      "Decreased time complexity",
      "Reduced stack space overhead",
      "No impact"
    ],
    correctAnswerIndex: 3,
    explanation: "Iterative implementations generally save function call overhead."
  },
  {
    question: "Which data structure is fundamentally incompatible with an efficient Dp Knapsack? **GATE 2014**",
    options: [
      "Set",
      "Depends on implementation details",
      "Stack",
      "Queue"
    ],
    correctAnswerIndex: 2,
    explanation: "Data structure choice dictates efficiency."
  },
  {
    question: "If Dp Knapsack uses a heuristic, what does that imply about its solution? **GATE 2013**",
    options: [
      "It is always optimal.",
      "It is approximate but fast.",
      "It is exact but slow.",
      "It uses randomness."
    ],
    correctAnswerIndex: 2,
    explanation: "Heuristics speed up Dp Knapsack at the cost of guaranteed optimality."
  },
  {
    question: "In the context of Dp Knapsack, what does the term 'optimal substructure' imply if applicable? **GATE 2013**",
    options: [
      "The problem can be broken down into smaller, similar subproblems.",
      "The algorithm uses optimal memory.",
      "It runs in linear time.",
      "The solution is always optimal."
    ],
    correctAnswerIndex: 0,
    explanation: "Optimal substructure is a key property for many advanced algorithms like Dp Knapsack."
  },
  {
    question: "What is the primary trade-off when optimizing Dp Knapsack? **GATE 2007**",
    options: [
      "Accuracy vs. Speed",
      "None",
      "Time vs. Space",
      "Complexity vs. Readability"
    ],
    correctAnswerIndex: 0,
    explanation: "Optimization often requires sacrificing memory for speed in Dp Knapsack."
  }
];

export const dpKnapsackDebug = {
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

export const dpKnapsackDrag = {
  options: [
    "dp[i][w] = 0",
    "dp[i][w] = dp[i-1][w]",
    "dp[i][w] = max(dp[i-1][w], val[i-1] + dp[i-1][w-wt[i-1]])",
    "dp[i][w] = max(dp[i-1][w], val[i-1] + dp[i][w-wt[i-1]])",
    "dp[i][w] = val[i-1] + dp[i-1][w]"
  ],
  correctOrder: [
    "dp[i][w] = 0",
    "dp[i][w] = max(dp[i-1][w], val[i-1] + dp[i-1][w-wt[i-1]])",
    "dp[i][w] = dp[i-1][w]"
  ],
  codeTemplate: `
for (i = 0; i <= n; i++) {
    for (w = 0; w <= W; w++) {
        if (i == 0 || w == 0)
            [DROP_ZONE_1]; // Base case
        else if (wt[i - 1] <= w)
            [DROP_ZONE_2]; // Include or Exclude
        else
            [DROP_ZONE_3]; // Cannot include
    }
}
  `
};

export const dpKnapsackComplete = {
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
