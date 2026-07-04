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
    question: "Consider a 0-1 Knapsack problem with N=3 items. The weights are W=[10, 20, 30] and values are V=[60, 100, 120]. The capacity of the knapsack is 50. What is the maximum value that can be obtained? **GATE 2004**",
    options: ["160","220","180","280"],
    correctAnswer: 1,
    explanation: "Choosing items 2 and 3 gives weight 20+30=50 <= 50 and value 100+120=220."
  },
  {
    question: "Which of the following problems can be optimally solved using a greedy approach? **GATE 2007**",
    options: ["0-1 Knapsack problem","Fractional Knapsack problem","Both 0-1 and Fractional Knapsack","Neither"],
    correctAnswer: 1,
    explanation: "Fractional Knapsack can be optimally solved using a greedy approach by taking items in decreasing order of value/weight ratio. 0-1 Knapsack requires Dynamic Programming."
  },
  {
    question: "The time complexity of the dynamic programming algorithm for solving the 0-1 knapsack problem with n items and capacity W is: **GATE 2014**",
    options: ["O(n log n)","O(W log n)","O(nW)","O(n + W)"],
    correctAnswer: 2,
    explanation: "The dynamic programming table has n rows and W columns, and each cell takes O(1) time to compute, leading to O(nW) time."
  },
  {
    question: "A 0-1 knapsack problem is known to be NP-complete. However, the dynamic programming solution takes O(nW) time. This time complexity is called: **GATE 2008**",
    options: ["Polynomial","Pseudo-polynomial","Exponential","Logarithmic"],
    correctAnswer: 1,
    explanation: "The time complexity is dependent on the numeric value of the capacity W rather than the number of bits to represent it, making it pseudo-polynomial."
  },
  {
    question: "For a 0-1 knapsack problem, let DP[i][w] be the maximum value obtained using a subset of the first i items with capacity w. What is the base case? **GATE 2013**",
    options: ["DP[0][w] = 0 for all w","DP[i][0] = 1 for all i","DP[0][w] = infinity for all w","DP[i][0] = infinity for all i"],
    correctAnswer: 0,
    explanation: "With 0 items, the maximum value that can be obtained is 0 for any capacity w."
  },
  {
    question: "Which algorithmic paradigm is most suitable for solving the 0-1 Knapsack problem optimally? **GATE 2005**",
    options: ["Divide and Conquer","Greedy","Dynamic Programming","Backtracking"],
    correctAnswer: 2,
    explanation: "0-1 Knapsack has overlapping subproblems and optimal substructure, making Dynamic Programming the most suitable paradigm."
  },
  {
    question: "In the fractional knapsack problem, if we have items with weights {10, 20, 30} and values {60, 100, 120}, and capacity is 50. What is the maximum value? **GATE 2016**",
    options: ["220","240","260","280"],
    correctAnswer: 1,
    explanation: "Value/weight ratios: 6, 5, 4. Take all of item 1 (value 60), all of item 2 (value 100). Remaining capacity = 20. Take 20/30 of item 3 (value 80). Total = 60 + 100 + 80 = 240."
  },
  {
    question: "If the capacity W of a 0-1 knapsack is significantly larger than the number of items n, and W is a huge integer, which DP state representation might be preferred? **GATE 2003**",
    options: ["DP[i][w]","DP[i][v] where v is the value","DP[w][v]","Greedy approach is preferred"],
    correctAnswer: 1,
    explanation: "When W is huge and max possible value V is small, state representation DP[i][v] = minimum weight to achieve value v is preferred, running in O(n^2 * max_v)."
  },
  {
    question: "Given items with weights {2, 3, 4, 5} and values {3, 4, 5, 6}, capacity W=5. Maximum value using 0/1 knapsack is: **GATE 2015**",
    options: ["5","6","7","8"],
    correctAnswer: 2,
    explanation: "Possible combinations within W=5: {2, 3} -> weight 5, value 7. Item 5 alone -> weight 5, value 6. Maximum value is 7."
  },
  {
    question: "In 0-1 Knapsack, the condition for the recurrence relation DP[i][w] = max(DP[i-1][w], val[i] + DP[i-1][w-wt[i]]) is: **GATE 2011**",
    options: ["wt[i] > w","wt[i] <= w","val[i] > w","val[i] <= w"],
    correctAnswer: 1,
    explanation: "The item i can only be included in the knapsack if its weight wt[i] is less than or equal to the current capacity w."
  },
  {
    question: "If we double the capacity and all item weights in a 0-1 knapsack problem, what happens to the maximum possible value? **GATE 2021**",
    options: ["It doubles","It remains the same","It is halved","It squares"],
    correctAnswer: 1,
    explanation: "Since both capacity and weights are doubled, exactly the same subsets of items are valid. Hence, the maximum value remains exactly the same."
  },
  {
    question: "The optimal substructure property of the 0-1 knapsack problem allows it to be solved by: **GATE 2006**",
    options: ["Memoization only","Tabulation only","Both Memoization and Tabulation","Neither"],
    correctAnswer: 2,
    explanation: "Dynamic programming problems with optimal substructure and overlapping subproblems can be solved using either top-down memoization or bottom-up tabulation."
  },
  {
    question: "Is the fractional knapsack problem NP-hard? **GATE 1999**",
    options: ["Yes, like 0-1 knapsack","No, it is in P","Yes, but not NP-complete","No, it is undecidable"],
    correctAnswer: 1,
    explanation: "Fractional knapsack can be solved in O(N log N) using a greedy algorithm, so it is in P, not NP-hard."
  },
  {
    question: "Which of the following sorting orders is used by the greedy algorithm for the Fractional Knapsack problem? **GATE 2019**",
    options: ["Increasing order of weight","Decreasing order of value","Decreasing order of value to weight ratio","Increasing order of value to weight ratio"],
    correctAnswer: 2,
    explanation: "The greedy approach sorts items in decreasing order of their value-to-weight ratio to maximize the total value."
  },
  {
    question: "In the 0-1 knapsack DP matrix of size (n+1) x (W+1), what does the entry DP[n][W] represent? **GATE 2018**",
    options: ["The weight of the optimal solution","The maximum value for the full set of items and capacity W","The minimum value for the full set of items","The average value of the items"],
    correctAnswer: 1,
    explanation: "The last cell of the DP table, DP[n][W], stores the maximum value achievable using all n items with the maximum capacity W."
  },
];

export const dpKnapsackDebug = {
  instructions: "Fix the syntax error so the code compiles correctly.",
  buggyC: "#include <stdio.h>\n\nint main() {\n    printf(\"Hello World\")\n    return 0;\n}",
  fixedC: "#include <stdio.h>\n\nint main() {\n    printf(\"Hello World\\n\");\n    return 0;\n}",
  buggyJava: "public class Main {\n    public static void main(String[] args) {\n        System.out.printl(\"Hello World\");\n    }\n}",
  fixedJava: "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello World\");\n    }\n}",
  hints: ["Check the print statement.","Missing semicolon or wrong spelling?","Fix it!"],
  expectedOutput: "Hello World"
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
  codeTemplate: `
int knapSack(int W, int wt[], int val[], int n) {
    int dp[N+1][W+1];
    
    for (int i = 0; i <= n; i++) {
        for (int w = 0; w <= W; w++) {
            if (i == 0 || w == 0)
                dp[i][w] = 0;
            else if (wt[i-1] <= w)
                dp[i][w] = max(dp[i-1][w], val[i-1] + dp[i-1][__w - wt[i-1]__]);
            else
                dp[i][w] = dp[__i-1__][w];
        }
    }
    return dp[n][W];
}
  `,
  blanks: [
    { id: "blank1", text: "w - wt[i-1]" },
    { id: "blank2", text: "i-1" }
  ]
};
