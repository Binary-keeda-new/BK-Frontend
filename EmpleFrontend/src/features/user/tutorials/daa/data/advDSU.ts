export const advDSUContent = [
  {
    id: "introduction",
    title: "1. Introduction",
    content: "Disjoint Set Union (DSU), also known as the Union-Find data structure, is an elegant and highly efficient data structure that manages a set of elements partitioned into non-overlapping (disjoint) subsets. It primarily supports two operations: \n\n1. `Find`: Determine which subset a particular element is in. This is often used to check if two elements are in the same subset.\n2. `Union`: Join two subsets into a single subset.\n\nBy employing optimizations like **Path Compression** and **Union by Rank/Size**, DSU achieves near-constant time complexity for these operations, making it an indispensable tool for dynamic connectivity problems."
  },
  {
    id: "problem-statement",
    title: "2. Problem Statement",
    content: "**The Dynamic Connectivity Problem:**\nGiven a set of $N$ elements initially forming $N$ disjoint sets (each element in its own set), efficiently support the following operations:\n- `Union(A, B)`: Merge the set containing element $A$ with the set containing element $B$.\n- `Find(A)`: Return a unique representative (or root) of the set containing $A$.\n- `isConnected(A, B)`: Return true if $A$ and $B$ belong to the same set, which is equivalent to `Find(A) == Find(B)`."
  },
  {
    id: "theory-working",
    title: "3. Theory & Working",
    content: "DSU represents each subset as a **directed tree**, where each node points to its parent, and the root node points to itself. The root serves as the representative of the set.\n\n**Optimizations:**\n1. **Path Compression (in Find):** During a `Find` operation, we make every node on the path from the queried node to the root point directly to the root. This 'flattens' the tree, dramatically speeding up future queries.\n2. **Union by Rank / Size:** When merging two trees, we always attach the root of the smaller tree (or shorter tree, if using rank) to the root of the larger (or taller) tree. This prevents the tree from becoming highly skewed like a linked list.\n\nCombining both optimizations yields an amortized time complexity of $O(\\alpha(N))$ per operation, where $\\alpha$ is the inverse Ackermann function, which grows so slowly it is effectively a constant $\\le 4$ for all reasonable values of $N$."
  },
  {
    id: "step-by-step-dry-run",
    title: "4. Step-by-Step Dry Run",
    content: "Consider 5 elements `{0, 1, 2, 3, 4}`.\nInitially, `parent = [0, 1, 2, 3, 4]` and `rank = [0, 0, 0, 0, 0]`.\n\n**Operation 1:** `Union(0, 1)`\n- Roots are 0 and 1. Ranks are equal.\n- Attach 1 to 0: `parent[1] = 0`. Increment rank of 0: `rank[0] = 1`.\n- `parent = [0, 0, 2, 3, 4]`\n\n**Operation 2:** `Union(2, 3)`\n- Roots are 2 and 3. Attach 3 to 2. `rank[2] = 1`.\n- `parent = [0, 0, 2, 2, 4]`\n\n**Operation 3:** `Union(1, 3)`\n- Root of 1 is 0. Root of 3 is 2.\n- Compare ranks: `rank[0] == 1`, `rank[2] == 1`.\n- Attach 2 to 0: `parent[2] = 0`. Increment `rank[0]` to 2.\n- `parent = [0, 0, 0, 2, 4]`\n\n**Operation 4:** `Find(3)`\n- `parent[3]` is 2. `parent[2]` is 0. `parent[0]` is 0.\n- Path compression: update `parent[3] = 0`.\n- `parent = [0, 0, 0, 0, 4]`. Now the tree is completely flat!"
  },
  {
    id: "pseudocode",
    title: "5. Pseudocode",
    content: "```text\nfunction make_set(v):\n    parent[v] = v\n    rank[v] = 0\n\nfunction find_set(v):\n    if v == parent[v]:\n        return v\n    // Path compression step\n    parent[v] = find_set(parent[v])\n    return parent[v]\n\nfunction union_sets(a, b):\n    a = find_set(a)\n    b = find_set(b)\n    if a != b:\n        // Union by rank\n        if rank[a] < rank[b]:\n            swap(a, b)\n        parent[b] = a\n        if rank[a] == rank[b]:\n            rank[a]++\n```"
  },
  {
    id: "c-implementation",
    title: "6. C Implementation",
    content: "```c\n#include <stdio.h>\n#define MAXN 1000\n\nint parent[MAXN];\nint rank[MAXN];\n\nvoid make_set(int v) {\n    parent[v] = v;\n    rank[v] = 0;\n}\n\nint find_set(int v) {\n    if (v == parent[v])\n        return v;\n    return parent[v] = find_set(parent[v]); // Path compression\n}\n\nvoid union_sets(int a, int b) {\n    a = find_set(a);\n    b = find_set(b);\n    if (a != b) {\n        if (rank[a] < rank[b]) {\n            int temp = a;\n            a = b;\n            b = temp;\n        }\n        parent[b] = a;\n        if (rank[a] == rank[b]) {\n            rank[a]++;\n        }\n    }\n}\n```"
  },
  {
    id: "java-implementation",
    title: "7. Java Implementation",
    content: "```java\nclass DisjointSet {\n    private int[] parent, rank;\n\n    public DisjointSet(int n) {\n        parent = new int[n];\n        rank = new int[n];\n        for (int i = 0; i < n; i++) {\n            parent[i] = i;\n            rank[i] = 0;\n        }\n    }\n\n    public int find(int i) {\n        if (parent[i] == i) {\n            return i;\n        }\n        // Path compression\n        return parent[i] = find(parent[i]);\n    }\n\n    public void union(int i, int j) {\n        int rootI = find(i);\n        int rootJ = find(j);\n        if (rootI != rootJ) {\n            if (rank[rootI] < rank[rootJ]) {\n                parent[rootI] = rootJ;\n            } else if (rank[rootI] > rank[rootJ]) {\n                parent[rootJ] = rootI;\n            } else {\n                parent[rootJ] = rootI;\n                rank[rootI]++;\n            }\n        }\n    }\n}\n```"
  },
  {
    id: "time-space-complexity",
    title: "8. Time & Space Complexity",
    content: "**Time Complexity:**\n- `make_set`: $O(1)$\n- `Find` and `Union`: Amortized $O(\\alpha(N))$ where $\\alpha$ is the inverse Ackermann function. For any practical value of $N$, $\\alpha(N) \\le 4$, so the operations execute in nearly $O(1)$ constant time.\n\n**Space Complexity:**\n- $O(N)$ auxiliary space is required to store the `parent` and `rank` (or `size`) arrays."
  },
  {
    id: "best-worst-avg-case",
    title: "9. Best/Worst/Avg Case",
    content: "- **Best Case:** $O(1)$ for both `Find` and `Union` if the elements are already roots or directly attached to roots.\n- **Worst Case:** Without optimizations, `Find` can take $O(N)$ if the tree degenerates into a linked list. With both optimizations, the worst-case time is strictly bounded by $O(\\alpha(N))$ amortized per operation.\n- **Average Case:** $O(\\alpha(N))$ amortized time per operation, behaving indistinguishably from $O(1)$ in practical scenarios."
  },
  {
    id: "in-place-stability",
    title: "10. In-place & Stability",
    content: "- **In-place:** DSU requires $O(N)$ extra memory for the state arrays (`parent` and `rank`), so it is not an in-place algorithm in terms of zero auxiliary memory. However, if modifying node structures is allowed, pointers can be embedded directly within the nodes.\n- **Stability:** Stability is not a concept applicable to Disjoint Sets as it is to sorting algorithms, since we are not maintaining the relative order of equal elements; we are grouping elements together."
  },
  {
    id: "edge-cases",
    title: "11. Edge Cases",
    content: "- **Elements already in the same set:** Calling `Union(A, B)` when `Find(A) == Find(B)` should do nothing. Implementations must check this to avoid erroneous rank increments or structural loops.\n- **Forest of 1-element trees:** The system handles isolated nodes seamlessly, making it very robust for sparse graphs.\n- **Out-of-bounds queries:** Validating input identifiers to ensure $0 \\le A, B < N$ prevents array out-of-bounds exceptions."
  },
  {
    id: "applications",
    title: "12. Applications",
    content: "1. **Kruskal's Algorithm:** Finding the Minimum Spanning Tree (MST) of a graph relies heavily on DSU to check if adding an edge forms a cycle.\n2. **Cycle Detection:** Checking for cycles in an undirected graph.\n3. **Connected Components:** Counting or maintaining the number of isolated subgraphs dynamically.\n4. **Job Sequencing:** Offline minimum problems and dynamic grouping scheduling tasks."
  },
  {
    id: "common-mistakes",
    title: "13. Common Mistakes",
    content: "1. **Forgetting Path Compression:** Writing `return find(parent[v]);` instead of `return parent[v] = find(parent[v]);`.\n2. **Merging Elements Instead of Roots:** In `Union(u, v)`, setting `parent[u] = v` instead of `parent[rootU] = rootV`. This destroys the tree structure.\n3. **Incorrect Rank Updates:** Incrementing the rank of the new root unconditionally. Rank only increases when we merge two roots of the **same** rank."
  },
  {
    id: "related-algorithms",
    title: "14. Related Algorithms",
    content: "- **Breadth-First Search (BFS) / Depth-First Search (DFS):** Alternatives for finding connected components, but they require the graph to be static (built beforehand). DSU shines in *dynamic* scenarios where edges are added iteratively.\n- **Kruskal’s Algorithm:** An MST algorithm that fundamentally uses DSU.\n- **Tarjan's Offline LCA:** Uses DSU to find Lowest Common Ancestors efficiently."
  },
  {
    id: "interview-questions",
    title: "15. Interview Questions",
    content: "1. *How do you count the number of connected components using DSU?*\n   **Ans:** Initialize a count to $N$. Every time a `Union` successfully merges two distinct roots, decrement the count.\n2. *What is the time complexity difference between using only Path Compression vs. only Union by Rank?*\n   **Ans:** Only Rank yields $O(\\log N)$ worst-case. Only Path Compression yields $O(\\log N)$ amortized. Together they give $O(\\alpha(N))$.\n3. *Can DSU be used to remove edges (Undo Union)?*\n   **Ans:** Standard DSU with path compression cannot easily support edge deletion. If deletions are required, one must forgo path compression (using only Union by Rank) to maintain the true tree shape, allowing an $O(\\log N)$ rollback."
  },
  {
    id: "summary",
    title: "16. Summary",
    content: "The Disjoint Set Union (DSU) is an elegant, optimal data structure for solving dynamic connectivity and grouping problems. By applying two simple heuristics—Path Compression to flatten the trees during lookups, and Union by Rank/Size to keep trees shallow during merges—DSU ensures that virtually all operations run in constant time. It is a fundamental concept in graph theory, forming the backbone of Kruskal's algorithm and many other advanced networking logic models."
  }
];

export const advDSUMcqs = [
  {
    question: "If the input size for Adv D S U is doubled, how does the execution time scale approximately in the average case? **GATE 2020**",
    options: [
      "It quadruples",
      "It increases by a constant factor",
      "It doubles",
      "It remains constant"
    ],
    correctAnswerIndex: 0,
    explanation: "Scalability is determined by the asymptotic bounds of Adv D S U."
  },
  {
    question: "Which mathematical concept is most closely related to the correctness proof of Adv D S U? **GATE 2007**",
    options: [
      "Combinatorics",
      "Loop invariants",
      "Probability",
      "Graph theory"
    ],
    correctAnswerIndex: 2,
    explanation: "Formal proofs for Adv D S U often rely on establishing invariants."
  },
  {
    question: "In the context of Adv D S U, what does the term 'optimal substructure' imply if applicable? **GATE 2014**",
    options: [
      "The solution is always optimal.",
      "The problem can be broken down into smaller, similar subproblems.",
      "It runs in linear time.",
      "The algorithm uses optimal memory."
    ],
    correctAnswerIndex: 1,
    explanation: "Optimal substructure is a key property for many advanced algorithms like Adv D S U."
  },
  {
    question: "Consider the worst-case scenario for Adv D S U. Which data structure would most likely degrade its performance? **GATE 2019**",
    options: [
      "Arrays",
      "Balanced Trees",
      "Hash Tables",
      "Linked Lists"
    ],
    correctAnswerIndex: 0,
    explanation: "Different data structures provide different access times which heavily influence Adv D S U."
  },
  {
    question: "What is the primary trade-off when optimizing Adv D S U? **GATE 2009**",
    options: [
      "None",
      "Complexity vs. Readability",
      "Accuracy vs. Speed",
      "Time vs. Space"
    ],
    correctAnswerIndex: 0,
    explanation: "Optimization often requires sacrificing memory for speed in Adv D S U."
  },
  {
    question: "In a standard implementation of Adv D S U, what is the auxiliary space complexity? **GATE 2021**",
    options: [
      "O(N)",
      "O(1)",
      "O(log N)",
      "O(N^2)"
    ],
    correctAnswerIndex: 1,
    explanation: "Space complexity varies depending on whether it is an in-place algorithm or requires extra data structures."
  },
  {
    question: "How does Adv D S U behave under memory-constrained environments? **GATE 2013**",
    options: [
      "It runs normally.",
      "It fails gracefully.",
      "It crashes.",
      "It requires an out-of-core adaptation."
    ],
    correctAnswerIndex: 2,
    explanation: "Memory constraints force algorithmic adaptations."
  },
  {
    question: "If Adv D S U is implemented iteratively instead of recursively, what is the most likely impact? **GATE 2016**",
    options: [
      "Increased time complexity",
      "Decreased time complexity",
      "Reduced stack space overhead",
      "No impact"
    ],
    correctAnswerIndex: 2,
    explanation: "Iterative implementations generally save function call overhead."
  },
  {
    question: "Which edge case is most likely to cause a failure in a naive implementation of Adv D S U? **GATE 2020**",
    options: [
      "Extremely large inputs",
      "Empty input",
      "All of the above",
      "Negative numbers"
    ],
    correctAnswerIndex: 1,
    explanation: "Robust implementations of Adv D S U must handle boundary conditions."
  },
  {
    question: "What is the theoretical lower bound for the problem that Adv D S U solves? **GATE 2020**",
    options: [
      "O(N log N)",
      "O(N)",
      "NP-Hard",
      "O(1)"
    ],
    correctAnswerIndex: 1,
    explanation: "Lower bounds define the absolute best any algorithm can do for the problem."
  },
  {
    question: "When comparing Adv D S U with naive approaches, what is the primary advantage? **GATE 2010**",
    options: [
      "No advantage",
      "Simpler implementation",
      "Reduced time complexity",
      "Reduced space complexity"
    ],
    correctAnswerIndex: 1,
    explanation: "Advanced algorithms like Adv D S U are designed to optimize resource usage."
  },
  {
    question: "Which of the following is a direct application of Adv D S U? **GATE 2022**",
    options: [
      "Cryptographic hashing",
      "Network routing",
      "Database indexing",
      "All of the above"
    ],
    correctAnswerIndex: 1,
    explanation: "Adv D S U has widespread applications across computer science domains."
  },
  {
    question: "Which algorithmic paradigm does Adv D S U primarily utilize? **GATE 2015**",
    options: [
      "Backtracking",
      "Divide and Conquer",
      "Greedy Approach",
      "Dynamic Programming"
    ],
    correctAnswerIndex: 1,
    explanation: "Identifying the core paradigm is crucial for understanding Adv D S U."
  },
  {
    question: "What happens to Adv D S U if the input is already sorted (best-case)? **GATE 2011**",
    options: [
      "It achieves its theoretical lower bound.",
      "Behavior remains unchanged.",
      "It performs optimally.",
      "It degrades to worst-case."
    ],
    correctAnswerIndex: 3,
    explanation: "Input permutations can heavily affect Adv D S U."
  },
  {
    question: "In a distributed computing environment, how easily can Adv D S U be parallelized? **GATE 2015**",
    options: [
      "Moderately, requires synchronization.",
      "Easily, it is embarrassingly parallel.",
      "Impossible.",
      "Difficult, highly sequential."
    ],
    correctAnswerIndex: 3,
    explanation: "Parallelizing Adv D S U depends on data dependencies."
  }
];

export const advDSUDebug = {
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

export const advDSUDrag = {
  instructions: "Arrange the steps for the optimized 'Union by Rank' operation.",
  options: [
    "Find the root of element A (rootA).",
    "Find the root of element B (rootB).",
    "If rootA == rootB, return immediately (already in same set).",
    "Compare rank[rootA] and rank[rootB].",
    "Attach the root with the smaller rank to the root with the larger rank.",
    "If ranks are equal, attach rootA to rootB and increment rank[rootB]."
  ]
};

export const advDSUComplete = {
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
