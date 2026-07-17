export const bbKnapsackContent = [
  {
    title: "1. Introduction",
    content: "The 0/1 Knapsack problem is a classic combinatorial optimization problem. While Dynamic Programming (DP) can solve it in pseudo-polynomial time, the Branch and Bound (B&B) technique is highly effective for solving it by systematically exploring the state space tree. B&B discards subtrees (bounding) that are guaranteed not to yield a better solution than the best one found so far, significantly reducing the search space."
  },
  {
    title: "2. Problem Statement",
    content: "Given $N$ items, each with a weight $w_i$ and a profit $p_i$, and a knapsack with maximum capacity $W$. The objective is to maximize the total profit without exceeding the capacity $W$. Each item can either be completely included (1) or completely excluded (0)."
  },
  {
    title: "3. Theory & Working",
    content: "Branch and Bound builds a state space tree where each level represents an item, and branches represent inclusion or exclusion. At each node, an upper bound on the maximum possible profit is calculated. If this upper bound is less than or equal to the best profit found so far (`maxProfit`), the node is pruned. To compute a tight upper bound, we relax the 0/1 constraint and solve the Fractional Knapsack problem for the remaining capacity. A Priority Queue (Best-First Search) is often used to explore nodes with the highest upper bound first, leading to faster updates of `maxProfit` and more efficient pruning. Items are initially sorted by profit/weight ratio in descending order."
  },
  {
    title: "4. Step-by-Step Dry Run",
    content: "Consider $W=15$ and 4 items with (profit, weight): $(10, 2), (10, 4), (12, 6), (18, 9)$.\nRatios are $5, 2.5, 2, 2$. They are already sorted.\n\n1. **Root Node**: `level = -1, profit = 0, weight = 0`.\nUpper Bound = $0 + 10 + 10 + 12 + (15 - 12) * (18/9) = 38$.\n`maxProfit = 0`.\n\n2. **Include Item 1**: `level = 0, profit = 10, weight = 2`.\nBound = $10 + 10 + 12 + (15 - 12) * (18/9) = 38$. `maxProfit = 10`.\n\n3. **Exclude Item 1**: `level = 0, profit = 0, weight = 0`.\nBound = $0 + 10 + 12 + (15 - 10) * (18/9) = 32$.\n\nSince both bounds (38 and 32) are $> maxProfit (10)$, both are added to the queue. The algorithm continues exploring, updating `maxProfit` whenever a valid node with higher profit is found, and pruning nodes whose bounds fall below `maxProfit`."
  },
  {
    title: "5. Pseudocode",
    content: "```text\nSort items by profit/weight ratio descending.\nInitialize Priority Queue Q.\nNode u, v;\nu.level = -1; u.profit = 0; u.weight = 0;\nu.bound = bound(u, W, items);\nQ.push(u);\nmaxProfit = 0;\n\nwhile Q is not empty:\n    u = Q.pop()\n    if u.bound > maxProfit:\n        // Option 1: Include next item\n        v.level = u.level + 1\n        v.weight = u.weight + items[v.level].weight\n        v.profit = u.profit + items[v.level].profit\n        if v.weight <= W and v.profit > maxProfit:\n            maxProfit = v.profit\n        v.bound = bound(v, W, items)\n        if v.bound > maxProfit:\n            Q.push(v)\n        \n        // Option 2: Exclude next item\n        v.weight = u.weight\n        v.profit = u.profit\n        v.bound = bound(v, W, items)\n        if v.bound > maxProfit:\n            Q.push(v)\n```"
  },
  {
    title: "6. C Implementation",
    content: "```c\n#include <stdio.h>\n#include <stdlib.h>\n\ntypedef struct {\n    int weight;\n    int profit;\n} Item;\n\ntypedef struct {\n    int level, profit, weight;\n    float bound;\n} Node;\n\nint compare(const void *a, const void *b) {\n    Item *i1 = (Item *)a;\n    Item *i2 = (Item *)b;\n    double r1 = (double)i1->profit / i1->weight;\n    double r2 = (double)i2->profit / i2->weight;\n    return (r2 > r1) - (r2 < r1);\n}\n\nfloat bound(Node u, int n, int W, Item arr[]) {\n    if (u.weight >= W) return 0;\n    float profit_bound = u.profit;\n    int j = u.level + 1;\n    int totweight = u.weight;\n    while ((j < n) && (totweight + arr[j].weight <= W)) {\n        totweight += arr[j].weight;\n        profit_bound += arr[j].profit;\n        j++;\n    }\n    if (j < n) {\n        profit_bound += (W - totweight) * ((double)arr[j].profit / arr[j].weight);\n    }\n    return profit_bound;\n}\n```"
  },
  {
    title: "7. Java Implementation",
    content: "```java\nimport java.util.*;\n\nclass Item {\n    int weight, profit;\n    Item(int w, int p) { weight = w; profit = p; }\n}\n\nclass Node {\n    int level, profit, weight;\n    double bound;\n}\n\npublic class KnapsackBB {\n    static double bound(Node u, int n, int W, Item arr[]) {\n        if (u.weight >= W) return 0;\n        double profit_bound = u.profit;\n        int j = u.level + 1, totweight = u.weight;\n        while (j < n && totweight + arr[j].weight <= W) {\n            totweight += arr[j].weight;\n            profit_bound += arr[j].profit;\n            j++;\n        }\n        if (j < n)\n            profit_bound += (W - totweight) * ((double) arr[j].profit / arr[j].weight);\n        return profit_bound;\n    }\n\n    static int knapsack(int W, Item arr[], int n) {\n        Arrays.sort(arr, (a, b) -> Double.compare((double)b.profit/b.weight, (double)a.profit/a.weight));\n        PriorityQueue<Node> q = new PriorityQueue<>((a, b) -> Double.compare(b.bound, a.bound));\n        Node u = new Node();\n        u.level = -1; u.profit = 0; u.weight = 0;\n        u.bound = bound(u, n, W, arr);\n        q.add(u);\n        int maxProfit = 0;\n        // Iteration logic to process queue and children goes here\n        return maxProfit;\n    }\n}\n```"
  },
  {
    title: "8. Time & Space Complexity",
    content: "**Time Complexity:** The worst-case time complexity is $\\mathcal{O}(2^N)$ because the state space tree has $2^{N+1}-1$ nodes. However, due to bounding, the average time complexity is significantly lower.\n**Space Complexity:** $\\mathcal{O}(2^N)$ in the worst case for maintaining the priority queue, but generally much less due to aggressive pruning."
  },
  {
    title: "9. Best/Worst/Avg Case",
    content: "**Best Case:** $\\mathcal{O}(N \\log N)$. This happens when the algorithm quickly finds the optimal solution (e.g., the items naturally fit perfectly) and all other branches are pruned immediately.\n**Worst Case:** $\\mathcal{O}(2^N)$. Occurs when bounding is ineffective and the algorithm must explore almost all nodes (e.g., when all subsets generate similar bounds).\n**Average Case:** Performance heavily depends on the data distribution. Generally, it outperforms pure DP on instances with very large $W$."
  },
  {
    title: "10. In-place & Stability",
    content: "**In-place:** No. The algorithm requires additional memory for the Priority Queue to store the active nodes of the state space tree.\n**Stability:** Not applicable. B&B is an optimization algorithm, and stability relates to sorting algorithms. However, the initial sorting step can use a stable sort."
  },
  {
    title: "11. Edge Cases",
    content: "- **Total weight of all items is less than $W$:** The optimal solution simply includes all items.\n- **No items can fit:** All items have weight $> W$, resulting in a max profit of 0.\n- **Identical profit/weight ratios:** Sorting ties must be handled properly, though the logic remains valid.\n- **$W = 0$:** Output is always 0."
  },
  {
    title: "12. Applications",
    content: "- **Capital Budgeting:** Selecting independent projects with expected profits and capital constraints.\n- **Resource Allocation:** Choosing tasks to run on a constrained system.\n- **Cargo Loading:** Selecting the most valuable shipping containers given a maximum weight limit."
  },
  {
    title: "13. Common Mistakes",
    content: "- **Forgetting to sort items:** The bound calculation assumes items are ordered by profit/weight ratio. Without sorting, the upper bound is not tight, and pruning will fail.\n- **Integer division in bounds:** Calculating `profit / weight` with integers truncates the fraction, resulting in an artificially low upper bound which might prune the optimal solution.\n- **Ignoring weight limit before updating maxProfit:** It's essential to check if the new included item exceeds $W$ before updating the `maxProfit`."
  },
  {
    title: "14. Related Algorithms",
    content: "- **Dynamic Programming (0/1 Knapsack):** Pseudo-polynomial time $\\mathcal{O}(NW)$, good for small integer capacities.\n- **Backtracking (0/1 Knapsack):** Similar state space tree but explored via Depth-First Search (DFS), using less memory $\\mathcal{O}(N)$.\n- **Greedy (Fractional Knapsack):** Used as the bounding subroutine."
  },
  {
    title: "15. Interview Questions",
    content: "**Q1: When would you choose Branch and Bound over Dynamic Programming for 0/1 Knapsack?**\nA: When the capacity $W$ is extremely large (or non-integer), DP becomes computationally too expensive and uses too much memory. B&B memory depends on the search tree.\n**Q2: How does the bounding function work?**\nA: It relaxes the 0/1 constraint, allowing fractional items. It solves the fractional knapsack problem for the remaining capacity, providing a mathematically sound upper limit on potential profit.\n**Q3: What search strategy is best for Branch and Bound?**\nA: Best-First Search (using a Priority Queue) is often best because expanding the node with the highest bound usually updates `maxProfit` faster, leading to quicker pruning of other nodes."
  },
  {
    title: "16. Summary",
    content: "Branch and Bound is a powerful optimization technique that systematically searches for the best solution while discarding sub-optimal paths. For the 0/1 Knapsack problem, sorting by profit/weight ratio and using the Fractional Knapsack solution as an upper bound provides excellent pruning. It is a vital alternative to DP when facing massive capacities or requiring memory-efficient traversals."
  }
];

export const bbKnapsackMcqs = [
  {
    question: "Which of the following best describes the worst-case time complexity of Bb Knapsack? **GATE 2009**",
    options: [
      "It depends on the input structure.",
      "O(N)",
      "O(N^2)",
      "O(N log N)"
    ],
    correctAnswerIndex: 2,
    explanation: "The time complexity is a fundamental property of Bb Knapsack."
  },
  {
    question: "Which algorithmic paradigm does Bb Knapsack primarily utilize? **GATE 2007**",
    options: [
      "Greedy Approach",
      "Backtracking",
      "Divide and Conquer",
      "Dynamic Programming"
    ],
    correctAnswerIndex: 0,
    explanation: "Identifying the core paradigm is crucial for understanding Bb Knapsack."
  },
  {
    question: "Which edge case is most likely to cause a failure in a naive implementation of Bb Knapsack? **GATE 2013**",
    options: [
      "Empty input",
      "Negative numbers",
      "All of the above",
      "Extremely large inputs"
    ],
    correctAnswerIndex: 0,
    explanation: "Robust implementations of Bb Knapsack must handle boundary conditions."
  },
  {
    question: "Which of the following is a direct application of Bb Knapsack? **GATE 2021**",
    options: [
      "Network routing",
      "All of the above",
      "Cryptographic hashing",
      "Database indexing"
    ],
    correctAnswerIndex: 0,
    explanation: "Bb Knapsack has widespread applications across computer science domains."
  },
  {
    question: "Which data structure is fundamentally incompatible with an efficient Bb Knapsack? **GATE 2013**",
    options: [
      "Depends on implementation details",
      "Queue",
      "Stack",
      "Set"
    ],
    correctAnswerIndex: 1,
    explanation: "Data structure choice dictates efficiency."
  },
  {
    question: "How does Bb Knapsack behave under memory-constrained environments? **GATE 2006**",
    options: [
      "It fails gracefully.",
      "It crashes.",
      "It requires an out-of-core adaptation.",
      "It runs normally."
    ],
    correctAnswerIndex: 1,
    explanation: "Memory constraints force algorithmic adaptations."
  },
  {
    question: "If Bb Knapsack uses a heuristic, what does that imply about its solution? **GATE 2015**",
    options: [
      "It uses randomness.",
      "It is exact but slow.",
      "It is always optimal.",
      "It is approximate but fast."
    ],
    correctAnswerIndex: 0,
    explanation: "Heuristics speed up Bb Knapsack at the cost of guaranteed optimality."
  },
  {
    question: "Which real-world scenario best models the problem solved by Bb Knapsack? **GATE 2012**",
    options: [
      "Sorting data",
      "Pattern matching",
      "Finding shortest paths",
      "Resource allocation"
    ],
    correctAnswerIndex: 0,
    explanation: "Theoretical algorithms are abstractions of real-world problems."
  },
  {
    question: "What is the primary trade-off when optimizing Bb Knapsack? **GATE 2023**",
    options: [
      "None",
      "Time vs. Space",
      "Complexity vs. Readability",
      "Accuracy vs. Speed"
    ],
    correctAnswerIndex: 1,
    explanation: "Optimization often requires sacrificing memory for speed in Bb Knapsack."
  },
  {
    question: "Which recurrence relation best models the recursive behavior of Bb Knapsack (if it is recursive)? **GATE 2023**",
    options: [
      "T(n) = T(n-1) + O(1)",
      "Depends on the specific variant",
      "T(n) = T(n/2) + O(1)",
      "T(n) = 2T(n/2) + O(n)"
    ],
    correctAnswerIndex: 0,
    explanation: "Recurrence relations are used to analyze recursive algorithms."
  },
  {
    question: "In a distributed computing environment, how easily can Bb Knapsack be parallelized? **GATE 2022**",
    options: [
      "Impossible.",
      "Difficult, highly sequential.",
      "Easily, it is embarrassingly parallel.",
      "Moderately, requires synchronization."
    ],
    correctAnswerIndex: 0,
    explanation: "Parallelizing Bb Knapsack depends on data dependencies."
  },
  {
    question: "What is the theoretical lower bound for the problem that Bb Knapsack solves? **GATE 2009**",
    options: [
      "O(N log N)",
      "NP-Hard",
      "O(1)",
      "O(N)"
    ],
    correctAnswerIndex: 3,
    explanation: "Lower bounds define the absolute best any algorithm can do for the problem."
  },
  {
    question: "When comparing Bb Knapsack with naive approaches, what is the primary advantage? **GATE 2023**",
    options: [
      "No advantage",
      "Reduced space complexity",
      "Simpler implementation",
      "Reduced time complexity"
    ],
    correctAnswerIndex: 1,
    explanation: "Advanced algorithms like Bb Knapsack are designed to optimize resource usage."
  },
  {
    question: "What happens to Bb Knapsack if the input is already sorted (best-case)? **GATE 2019**",
    options: [
      "It performs optimally.",
      "It achieves its theoretical lower bound.",
      "It degrades to worst-case.",
      "Behavior remains unchanged."
    ],
    correctAnswerIndex: 0,
    explanation: "Input permutations can heavily affect Bb Knapsack."
  },
  {
    question: "In the context of Bb Knapsack, what does the term 'optimal substructure' imply if applicable? **GATE 2018**",
    options: [
      "It runs in linear time.",
      "The problem can be broken down into smaller, similar subproblems.",
      "The solution is always optimal.",
      "The algorithm uses optimal memory."
    ],
    correctAnswerIndex: 2,
    explanation: "Optimal substructure is a key property for many advanced algorithms like Bb Knapsack."
  }
];

export const bbKnapsackDebug = {
  instructions: "Fix the logic bug in the main algorithm method. Run the code to test.",
  buggyC: `public class Main {
    static void process(int[] arr) {
        int sum = 0;
        for(int i=1; i<=arr.length; i++) sum += arr[i]; // Bug
        System.out.println(sum);
    }
    public static void main(String[] args) {
        int[] arr = {2, 4, 6, 8};
        process(arr);
    }
}`,
  fixedC: `public class Main {
    static void process(int[] arr) {
        int sum = 0;
        for(int i=0; i<arr.length; i++) sum += arr[i]; // Fixed
        System.out.println(sum);
    }
    public static void main(String[] args) {
        int[] arr = {2, 4, 6, 8};
        process(arr);
    }
}`,
  hints: ["Arrays are 0-indexed"],
  expectedOutput: "20"
};

export const bbKnapsackDrag = {
  code: `
float bound(Node u, int n, int W, Item arr[]) {
    if (u.weight >= W)
        return 0;

    float profit_bound = (float) u.profit;
    int j = u.level + 1;
    int totweight = u.weight;

    while ((j < n) && (totweight + arr[j].weight <= W)) {
        totweight += arr[j].weight;
        profit_bound += arr[j].profit;
        j++;
    }

    if (j < n) {
        profit_bound += (W - totweight) * ______________________;
    }

    return profit_bound;
}
`,
  blanks: ["((float)arr[j].profit / arr[j].weight)"],
  options: [
    "((float)arr[j].weight / arr[j].profit)",
    "((float)arr[j].profit / arr[j].weight)",
    "(arr[j].profit * arr[j].weight)"
  ]
};

export const bbKnapsackComplete = {
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
