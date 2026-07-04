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
    question: "What is the bounding function typically used for the 0/1 Knapsack problem in Branch and Bound?",
    options: [
      "Dynamic Programming solution of the remaining items",
      "Fractional Knapsack solution of the remaining items",
      "Sum of profits of all remaining items",
      "Minimum profit of remaining items"
    ],
    correctAnswer: 1,
    explanation: "The upper bound is calculated by relaxing the 0/1 constraint and solving the continuous (fractional) knapsack problem, giving the maximum possible theoretical profit."
  },
  {
    question: "In the worst-case scenario, what is the time complexity of the Branch and Bound approach for the 0/1 Knapsack problem?",
    options: [
      "O(N W)",
      "O(N log N)",
      "O(2^N)",
      "O(N!)"
    ],
    correctAnswer: 2,
    explanation: "In the worst case (e.g., bounds do not prune effectively), the algorithm generates all subsets of the items, leading to an exploration of O(2^N) nodes."
  },
  {
    question: "Which queue strategy is generally optimal to minimize the number of explored nodes in the Branch and Bound approach?",
    options: [
      "FIFO Queue (Breadth-First Search)",
      "LIFO Queue (Depth-First Search)",
      "Priority Queue (Best-First Search)",
      "Double-Ended Queue"
    ],
    correctAnswer: 2,
    explanation: "Best-First Search (using a Max-Priority Queue based on the upper bound) explores the most promising nodes first, accelerating the update of maxProfit and pruning more nodes."
  },
  {
    question: "Why might Branch and Bound be preferred over Dynamic Programming for the 0/1 Knapsack problem?",
    options: [
      "It always runs in strictly polynomial time.",
      "DP uses memory proportional to the knapsack capacity, which is impractical for very large W.",
      "DP cannot solve the 0/1 Knapsack problem.",
      "B&B does not require any initial sorting of the items."
    ],
    correctAnswer: 1,
    explanation: "DP is pseudo-polynomial O(NW), meaning its time and space scale with W. For massive or continuous W, B&B is far more practical."
  },
  {
    question: "Before building the state space tree for B&B 0/1 Knapsack, the items MUST be sorted in descending order of:",
    options: [
      "Weight",
      "Profit",
      "Profit-to-Weight ratio",
      "Weight-to-Profit ratio"
    ],
    correctAnswer: 2,
    explanation: "To ensure the bounding function works optimally (using the greedy strategy for fractional knapsack), items must be sorted by their profit-to-weight ratio."
  },
  {
    question: "When calculating the upper bound for a node in the state space tree, if the next item cannot fully fit in the remaining capacity, what does the algorithm do?",
    options: [
      "Skips the item entirely.",
      "Takes a fraction of the item to fill the remaining capacity.",
      "Includes the item and allows capacity to be exceeded.",
      "Stops computing the bound and returns the current profit."
    ],
    correctAnswer: 1,
    explanation: "The bounding function uses the Fractional Knapsack approach, taking a fraction of the item to precisely fill the knapsack for a theoretical upper bound."
  },
  {
    question: "A node in the state space tree is aggressively pruned if:",
    options: [
      "Its weight exceeds the knapsack capacity.",
      "Its upper bound is less than or equal to the maximum profit found so far.",
      "Both A and B are valid pruning conditions.",
      "Its accumulated profit is zero."
    ],
    correctAnswer: 2,
    explanation: "A node is discarded if its weight is invalid (exceeds W) or if its theoretical best (bound) cannot beat the current known maxProfit."
  },
  {
    question: "If a node has a calculated upper bound of 45, and the current known maximum profit (maxProfit) is 50, what should the algorithm do?",
    options: [
      "Continue exploring its children.",
      "Prune the node.",
      "Update maxProfit to 45.",
      "Halt the algorithm immediately."
    ],
    correctAnswer: 1,
    explanation: "Since the absolute maximum profit this path can yield is 45, and we already know a solution that yields 50, there is no point in exploring this path."
  },
  {
    question: "What is the worst-case space complexity of Best-First Search Branch and Bound for 0/1 Knapsack?",
    options: [
      "O(N)",
      "O(N W)",
      "O(2^N)",
      "O(1)"
    ],
    correctAnswer: 2,
    explanation: "In the worst case, the Priority Queue may have to store nodes corresponding to every possible subset, leading to O(2^N) memory consumption."
  },
  {
    question: "Consider 3 items: (p=60, w=10), (p=100, w=20), (p=120, w=30) and W=50. If we are at the root node (level -1, weight 0, profit 0), what is the upper bound?",
    options: [
      "220",
      "240",
      "280",
      "160"
    ],
    correctAnswer: 1,
    explanation: "Ratios: 6, 5, 4. Sorted. Include item 1 (w=10, p=60, W_rem=40). Include item 2 (w=20, p=100, W_rem=20). Include fraction of item 3 (20/30 * 120 = 80). Total bound = 60 + 100 + 80 = 240."
  },
  {
    question: "What is a key disadvantage of the Best-First Search Branch and Bound strategy compared to Depth-First Search (Backtracking) for the 0/1 Knapsack problem?",
    options: [
      "It may explore a larger number of nodes in total.",
      "It does not guarantee an optimal solution.",
      "It requires exponential memory to store the Priority Queue in the worst case.",
      "It inherently cannot handle fractional values in upper bounds."
    ],
    correctAnswer: 2,
    explanation: "Best-First Search maintains all active nodes across different levels in memory (the Priority Queue), which can grow to O(2^N). Backtracking (DFS) only needs memory proportional to the depth of the tree, O(N)."
  },
  {
    question: "The 0/1 Knapsack optimization problem belongs to which complexity class?",
    options: [
      "P",
      "NP-Complete",
      "NP-Hard",
      "Undecidable"
    ],
    correctAnswer: 2,
    explanation: "The optimization version of 0/1 Knapsack (finding the maximum profit) is NP-Hard, whereas its decision version (is there a subset with profit >= K) is NP-Complete."
  }
];

export const bbKnapsackDebug = {
  instructions: "Fix the syntax error so the code compiles correctly.",
  buggyC: "#include <stdio.h>\n\nint main() {\n    printf(\"Hello World\")\n    return 0;\n}",
  fixedC: "#include <stdio.h>\n\nint main() {\n    printf(\"Hello World\\n\");\n    return 0;\n}",
  buggyJava: "public class Main {\n    public static void main(String[] args) {\n        System.out.printl(\"Hello World\");\n    }\n}",
  fixedJava: "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello World\");\n    }\n}",
  hints: ["Check the print statement.","Missing semicolon or wrong spelling?","Fix it!"],
  expectedOutput: "Hello World"
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
  code: `
while (!q.empty()) {
    Node u = q.front();
    q.pop();

    if (u.level == n - 1)
        continue;

    Node v;
    v.level = u.level + 1;
    
    // Branch 1: Include the item
    v.weight = u.weight + arr[v.level].weight;
    v.profit = u.profit + arr[v.level].profit;

    if (v.weight <= W && v.profit > maxProfit)
        maxProfit = v.profit;

    v.bound = bound(v, n, W, arr);

    if (v.bound > maxProfit)
        q.push(v);

    // Branch 2: Exclude the item
    v.weight = u.weight;
    v.profit = u.profit;
    v.bound = bound(v, n, W, arr);

    if (__________) {
        q.push(v);
    }
}
`,
  missingParts: ["v.bound > maxProfit"]
};
