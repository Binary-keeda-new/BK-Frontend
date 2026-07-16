export const advBITContent = [
  {
    title: "1. Introduction",
    content: "A Binary Indexed Tree (BIT), also known as a Fenwick Tree, is a highly space-efficient and fast data structure used to compute prefix sums and perform point updates on an array of numbers. It was proposed by Peter Fenwick in 1994. Unlike an ordinary array where updates are $O(1)$ but prefix sums are $O(N)$, or a prefix sum array where prefix sums are $O(1)$ but updates are $O(N)$, a BIT performs both in $O(\\log N)$ time."
  },
  {
    title: "2. Problem Statement",
    content: "Given an array of $N$ elements, we need to efficiently support two operations:\n1. **Point Update:** Add a value $v$ to the element at index $i$.\n2. **Prefix Sum Query:** Find the sum of elements from index $1$ to $i$.\n\nFurthermore, we can extend this to answer **Range Sum Queries** from $L$ to $R$ by computing `query(R) - query(L-1)`."
  },
  {
    title: "3. Theory & Working",
    content: "A Fenwick Tree conceptually builds a tree using the binary representation of array indices. The core idea relies on the Least Significant Bit (LSB) of an index. In two's complement arithmetic, the LSB of a number `x` can be isolated using `x & (-x)`.\n\nEvery index $i$ in the BIT stores the sum of a specific range of elements. Specifically, the element at index $i$ is responsible for the range `[i - (i & -i) + 1, i]`. The length of this range is exactly `i & -i`.\n\n- To **query** the prefix sum up to $i$, we add the value at BIT[$i$], and then strip the LSB from $i$ (`i = i - (i & -i)`) to find the next relevant range.\n- To **update** the element at $i$, we update BIT[$i$], and then add the LSB to $i$ (`i = i + (i & -i)`) to update all subsequent ranges that encompass $i$."
  },
  {
    title: "4. Step-by-Step Dry Run",
    content: "Consider an array `A = [0, 3, 2, -1, 6]` (1-based index). We want to build a BIT of size 4.\nInitially `BIT = [0, 0, 0, 0, 0]`.\n\n**Update index 1 with 3:**\n- `i = 1 (001)`: `BIT[1] += 3` -> `BIT = [0, 3, 0, 0, 0]`\n- `i = 1 + (1 & -1) = 2 (010)`: `BIT[2] += 3` -> `BIT = [0, 3, 3, 0, 0]`\n- `i = 2 + (2 & -2) = 4 (100)`: `BIT[4] += 3` -> `BIT = [0, 3, 3, 0, 3]`\n\n**Update index 2 with 2:**\n- `i = 2 (010)`: `BIT[2] += 2` -> `BIT = [0, 3, 5, 0, 3]`\n- `i = 4 (100)`: `BIT[4] += 2` -> `BIT = [0, 3, 5, 0, 5]`\n\n**Query prefix sum at index 3:**\n- `ans = 0`\n- `i = 3 (011)`: `ans += BIT[3]` (which is 0)\n- `i = 3 - (3 & -3) = 2 (010)`: `ans += BIT[2]` (which is 5)\n- `i = 2 - (2 & -2) = 0`. End loop.\nResult = 5. (Matches `3 + 2`)."
  },
  {
    title: "5. Pseudocode",
    content: "```text\n// 1-based indexing is assumed for the BIT array of size N+1\n\nfunction update(index, val):\n    while index <= N:\n        BIT[index] = BIT[index] + val\n        index = index + (index & (-index))\n\nfunction query(index):\n    sum = 0\n    while index > 0:\n        sum = sum + BIT[index]\n        index = index - (index & (-index))\n    return sum\n```"
  },
  {
    title: "6. C Implementation",
    content: "```c\n#include <stdio.h>\n#include <stdlib.h>\n\nvoid update(int* BIT, int N, int index, int val) {\n    while (index <= N) {\n        BIT[index] += val;\n        index += index & (-index);\n    }\n}\n\nint query(int* BIT, int index) {\n    int sum = 0;\n    while (index > 0) {\n        sum += BIT[index];\n        index -= index & (-index);\n    }\n    return sum;\n}\n\nint main() {\n    int N = 4;\n    int* BIT = (int*)calloc(N + 1, sizeof(int));\n    \n    update(BIT, N, 1, 5);\n    update(BIT, N, 2, 3);\n    update(BIT, N, 3, -1);\n    update(BIT, N, 4, 7);\n    \n    printf(\"Prefix sum up to 3: %d\\n\", query(BIT, 3));\n    free(BIT);\n    return 0;\n}\n```"
  },
  {
    title: "7. Java Implementation",
    content: "```java\npublic class FenwickTree {\n    private int[] BIT;\n    private int n;\n\n    public FenwickTree(int size) {\n        this.n = size;\n        BIT = new int[n + 1];\n    }\n\n    public void update(int index, int val) {\n        while (index <= n) {\n            BIT[index] += val;\n            index += index & (-index);\n        }\n    }\n\n    public int query(int index) {\n        int sum = 0;\n        while (index > 0) {\n            sum += BIT[index];\n            index -= index & (-index);\n        }\n        return sum;\n    }\n\n    public static void main(String[] args) {\n        FenwickTree bit = new FenwickTree(4);\n        bit.update(1, 5);\n        bit.update(2, 3);\n        bit.update(3, -1);\n        bit.update(4, 7);\n        System.out.println(\"Prefix sum up to 3: \" + bit.query(3));\n    }\n}\n```"
  },
  {
    title: "8. Time & Space Complexity",
    content: "**Time Complexity:**\n- **Update:** $O(\\log N)$. At each step, we add a power of 2, so the index increases and can at most undergo $\\approx \\log_2 N$ transitions before exceeding $N$.\n- **Query:** $O(\\log N)$. At each step, we drop the lowest set bit, and an integer $\\le N$ has at most $\\approx \\log_2 N$ set bits.\n- **Build:** Iteratively updating each element takes $O(N \\log N)$. A faster approach exists to build it in $O(N)$ by propagating values to immediate parents.\n\n**Space Complexity:** $O(N)$, as we only need an array of size $N+1$."
  },
  {
    title: "9. Best/Worst/Avg Case",
    content: "Because Fenwick Tree operations depend strictly on the binary representation of the indices:\n- **Worst Case:** Operations take exactly $O(\\log N)$ steps (e.g., querying an index like $2^k - 1$ which has all bits set, or updating $1$ which cascades up).\n- **Best Case:** Operations can take $O(1)$ steps (e.g., querying index $2^k$ only takes 1 step because it has only one set bit, or updating $N$ where it immediately exits bounds).\n- **Average Case:** Both update and query average $\\approx \\frac{\\log_2 N}{2}$ operations, which is still $O(\\log N)$ asymptotically."
  },
  {
    title: "10. In-place & Stability",
    content: "These concepts traditionally apply to sorting algorithms.\nFor a Fenwick Tree:\n- **In-place:** You technically require an additional array of size $N+1$ (the BIT itself). However, if the original array is not needed after initialization, the BIT can be constructed in-place within the given 1-indexed array in $O(N)$ time.\n- **Stability:** Not applicable, as Fenwick Tree is a data structure for prefix aggregates, not a sorting algorithm."
  },
  {
    title: "11. Edge Cases",
    content: "- **0-indexing:** The algorithm fundamentally breaks down if index $0$ is used because `0 & -0` is $0$. Attempting to update or query at index $0$ results in an infinite loop (`index += 0`). Thus, the BIT must always be 1-indexed.\n- **Out of Bounds:** The update function loops while `index <= N`. Ensure $N$ is accurately passed or stored to prevent writing out of bounds.\n- **Negative Values:** Fenwick Tree handles negative array values perfectly fine since it relies on addition/subtraction, which are commutative and invertible."
  },
  {
    title: "12. Applications",
    content: "1. **Dynamic Prefix Sums:** Extremely useful when array elements change over time and prefix queries are frequent.\n2. **Counting Inversions:** In an array, we can use a BIT to keep track of element frequencies and efficiently count elements smaller/larger than the current element as we iterate.\n3. **Range Updates and Point Queries:** By maintaining a Difference Array instead of the original array, BIT can process range updates in $O(\\log N)$ and point queries in $O(\\log N)$.\n4. **Range Updates and Range Queries:** Achievable using two synchronized Fenwick Trees."
  },
  {
    title: "13. Common Mistakes",
    content: "- **Using 0-based indexing:** Forgetting to convert a 0-indexed array from the problem input to a 1-indexed BIT.\n- **Incorrect LSB isolation:** Writing `index & (~index)` or similar flawed logic instead of `index & (-index)`.\n- **Re-initializing lazily:** Forgetting to clear the BIT array between test cases, leading to leftover garbage values.\n- **Querying `L to R` incorrectly:** It must be `query(R) - query(L - 1)`, often people mistakenly use `query(R) - query(L)`."
  },
  {
    title: "14. Related Algorithms",
    content: "- **Segment Tree:** A more versatile but heavier tree that can handle non-invertible range queries (like Range Minimum/Maximum). BIT is lighter, easier to code, and faster in practice for sums.\n- **Prefix Sum Array:** $O(1)$ query but $O(N)$ update. BIT is a dynamic version of this.\n- **Square Root Decomposition:** Handles dynamic queries in $O(\\sqrt{N})$. Much slower than BIT but can accommodate queries that BIT cannot.\n- **Difference Arrays:** Used alongside BIT to extend its functionality to range updates."
  },
  {
    title: "15. Interview Questions",
    content: "1. How does a Fenwick Tree handle updates efficiently compared to an ordinary array?\n2. Explain the intuition behind the expression `x & (-x)`.\n3. How would you modify a Fenwick Tree to handle Range Updates instead of Point Updates?\n4. Can a Fenwick Tree be used for Range Minimum Queries (RMQ)? Why or why not?\n5. Explain an algorithm to count the number of inversions in an array using a Fenwick Tree."
  },
  {
    title: "16. Summary",
    content: "The Binary Indexed Tree (Fenwick Tree) is an elegant, implicitly defined tree structure stored in a simple array. By leveraging the bitwise representation of indices, it enables both point updates and prefix sum queries in $O(\\log N)$ time with only $O(N)$ space. Its small constant factor, minimal memory overhead, and brief implementation make it a preferred tool in competitive programming and system optimizations over heavier structures like Segment Trees when dealing with cumulative frequency tables or dynamic prefix sums."
  }
];

export const advBITMcqs = [
  {
    question: "Which real-world scenario best models the problem solved by Adv B I T? **GATE 2017**",
    options: [
      "Finding shortest paths",
      "Pattern matching",
      "Resource allocation",
      "Sorting data"
    ],
    correctAnswerIndex: 2,
    explanation: "Theoretical algorithms are abstractions of real-world problems."
  },
  {
    question: "If Adv B I T uses a heuristic, what does that imply about its solution? **GATE 2010**",
    options: [
      "It is exact but slow.",
      "It is always optimal.",
      "It is approximate but fast.",
      "It uses randomness."
    ],
    correctAnswerIndex: 2,
    explanation: "Heuristics speed up Adv B I T at the cost of guaranteed optimality."
  },
  {
    question: "What is the theoretical lower bound for the problem that Adv B I T solves? **GATE 2021**",
    options: [
      "O(N)",
      "O(1)",
      "O(N log N)",
      "NP-Hard"
    ],
    correctAnswerIndex: 0,
    explanation: "Lower bounds define the absolute best any algorithm can do for the problem."
  },
  {
    question: "Which recurrence relation best models the recursive behavior of Adv B I T (if it is recursive)? **GATE 2012**",
    options: [
      "T(n) = T(n/2) + O(1)",
      "T(n) = T(n-1) + O(1)",
      "Depends on the specific variant",
      "T(n) = 2T(n/2) + O(n)"
    ],
    correctAnswerIndex: 3,
    explanation: "Recurrence relations are used to analyze recursive algorithms."
  },
  {
    question: "What is the primary trade-off when optimizing Adv B I T? **GATE 2012**",
    options: [
      "None",
      "Time vs. Space",
      "Accuracy vs. Speed",
      "Complexity vs. Readability"
    ],
    correctAnswerIndex: 1,
    explanation: "Optimization often requires sacrificing memory for speed in Adv B I T."
  },
  {
    question: "When comparing Adv B I T with naive approaches, what is the primary advantage? **GATE 2020**",
    options: [
      "Simpler implementation",
      "Reduced space complexity",
      "Reduced time complexity",
      "No advantage"
    ],
    correctAnswerIndex: 2,
    explanation: "Advanced algorithms like Adv B I T are designed to optimize resource usage."
  },
  {
    question: "Which mathematical concept is most closely related to the correctness proof of Adv B I T? **GATE 2011**",
    options: [
      "Probability",
      "Graph theory",
      "Loop invariants",
      "Combinatorics"
    ],
    correctAnswerIndex: 2,
    explanation: "Formal proofs for Adv B I T often rely on establishing invariants."
  },
  {
    question: "Which of the following best describes the worst-case time complexity of Adv B I T? **GATE 2021**",
    options: [
      "O(N^2)",
      "O(N)",
      "It depends on the input structure.",
      "O(N log N)"
    ],
    correctAnswerIndex: 1,
    explanation: "The time complexity is a fundamental property of Adv B I T."
  },
  {
    question: "Which algorithmic paradigm does Adv B I T primarily utilize? **GATE 2021**",
    options: [
      "Divide and Conquer",
      "Dynamic Programming",
      "Backtracking",
      "Greedy Approach"
    ],
    correctAnswerIndex: 0,
    explanation: "Identifying the core paradigm is crucial for understanding Adv B I T."
  },
  {
    question: "Consider the worst-case scenario for Adv B I T. Which data structure would most likely degrade its performance? **GATE 2009**",
    options: [
      "Arrays",
      "Linked Lists",
      "Hash Tables",
      "Balanced Trees"
    ],
    correctAnswerIndex: 0,
    explanation: "Different data structures provide different access times which heavily influence Adv B I T."
  },
  {
    question: "How does Adv B I T behave under memory-constrained environments? **GATE 2020**",
    options: [
      "It crashes.",
      "It requires an out-of-core adaptation.",
      "It fails gracefully.",
      "It runs normally."
    ],
    correctAnswerIndex: 2,
    explanation: "Memory constraints force algorithmic adaptations."
  },
  {
    question: "If the input size for Adv B I T is doubled, how does the execution time scale approximately in the average case? **GATE 2006**",
    options: [
      "It quadruples",
      "It increases by a constant factor",
      "It doubles",
      "It remains constant"
    ],
    correctAnswerIndex: 3,
    explanation: "Scalability is determined by the asymptotic bounds of Adv B I T."
  },
  {
    question: "What happens to Adv B I T if the input is already sorted (best-case)? **GATE 2022**",
    options: [
      "It degrades to worst-case.",
      "It achieves its theoretical lower bound.",
      "It performs optimally.",
      "Behavior remains unchanged."
    ],
    correctAnswerIndex: 1,
    explanation: "Input permutations can heavily affect Adv B I T."
  },
  {
    question: "In a distributed computing environment, how easily can Adv B I T be parallelized? **GATE 2021**",
    options: [
      "Difficult, highly sequential.",
      "Easily, it is embarrassingly parallel.",
      "Impossible.",
      "Moderately, requires synchronization."
    ],
    correctAnswerIndex: 1,
    explanation: "Parallelizing Adv B I T depends on data dependencies."
  },
  {
    question: "In the context of Adv B I T, what does the term 'optimal substructure' imply if applicable? **GATE 2008**",
    options: [
      "The problem can be broken down into smaller, similar subproblems.",
      "It runs in linear time.",
      "The solution is always optimal.",
      "The algorithm uses optimal memory."
    ],
    correctAnswerIndex: 0,
    explanation: "Optimal substructure is a key property for many advanced algorithms like Adv B I T."
  }
];

export const advBITDebug = {
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

export const advBITDrag = {
  instructions: "Drag the mathematical expression or operation to its correct role in a Fenwick Tree.",
  options: [
    "x & (-x)",
    "i += i & (-i)",
    "i -= i & (-i)",
    "query(R) - query(L - 1)"
  ],
  correctOrder: [
    { text: "Extracting the Least Significant Bit", option: "x & (-x)" },
    { text: "Finding the next node to update", option: "i += i & (-i)" },
    { text: "Finding the next node to query", option: "i -= i & (-i)" },
    { text: "Computing sum of range [L, R]", option: "query(R) - query(L - 1)" }
  ]
};

export const advBITComplete = {
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
