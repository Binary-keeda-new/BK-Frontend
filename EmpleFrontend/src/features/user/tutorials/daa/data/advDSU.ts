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
    question: "What is the worst-case time complexity of the Find operation in a Disjoint Set Data Structure if NO optimizations (neither path compression nor union by rank) are used?",
    options: [
      "O(1)",
      "O(log N)",
      "O(N)",
      "O(N log N)"
    ],
    correctAnswerIndex: 2,
    explanation: "Without optimizations, the sets can degenerate into a linked list structure, making the worst-case time complexity for finding the root O(N)."
  },
  {
    question: "In DSU with only the 'Union by Rank' optimization (no path compression), what is the maximum height of the tree formed by N elements?",
    options: [
      "O(1)",
      "O(log N)",
      "O(sqrt(N))",
      "O(N)"
    ],
    correctAnswerIndex: 1,
    explanation: "Union by Rank guarantees that the height of a tree only increases when two trees of the same rank are merged. Thus, to reach a height of h, at least 2^h nodes are required, strictly bounding the maximum height to O(log N)."
  },
  {
    question: "Let α(N) be the inverse Ackermann function. Which of the following best describes the amortized time complexity of a sequence of M operations (Find/Union) on N elements when BOTH Path Compression and Union by Rank are used?",
    options: [
      "O(M + N)",
      "O(M log N)",
      "O(M α(N))",
      "O(M log* N)"
    ],
    correctAnswerIndex: 2,
    explanation: "With both optimizations, a sequence of M operations on N elements takes O(M α(N)) time, where α(N) is the exceedingly slow-growing inverse Ackermann function."
  },
  {
    question: "Consider the standard Union by Rank algorithm. Initially, we have disjoint sets. We perform a series of unions. Under what condition is the rank of a root node strictly incremented?",
    options: [
      "Whenever any node is attached to it.",
      "Only when a tree of lower rank is attached to it.",
      "Only when a tree of the exact same rank is attached to it.",
      "Only when a leaf node is directly attached to it."
    ],
    correctAnswerIndex: 2,
    explanation: "In Union by Rank, if we merge two sets with different ranks, the smaller rank tree is attached under the root of the larger rank tree, and the rank remains unchanged. The rank of a root increases by 1 only when merging two trees of the same rank."
  },
  {
    question: "A graph has V vertices and E edges. If we use DSU to detect if there is a cycle, how many Find operations will we perform in the worst case?",
    options: [
      "Exactly V",
      "Exactly E",
      "Exactly 2 * E",
      "Exactly V + E"
    ],
    correctAnswerIndex: 2,
    explanation: "For every edge (u, v) in the graph, we must perform exactly two Find operations (Find(u) and Find(v)) to check if they belong to the same component. Therefore, for E edges, we perform 2*E Find operations."
  },
  {
    question: "Which classical algorithm fundamentally relies on the Disjoint Set Union data structure for efficient execution?",
    options: [
      "Dijkstra's Algorithm",
      "Bellman-Ford Algorithm",
      "Kruskal's Algorithm",
      "Floyd-Warshall Algorithm"
    ],
    correctAnswerIndex: 2,
    explanation: "Kruskal's Algorithm sorts edges by weight and uses DSU to repeatedly check for cycles and merge disjoint spanning trees."
  },
  {
    question: "If 'Union by Size' is used instead of 'Union by Rank', and we merge a tree of size 10 with a tree of size 15, what will be the size of the new root after the union?",
    options: [
      "10",
      "15",
      "16",
      "25"
    ],
    correctAnswerIndex: 3,
    explanation: "In Union by Size, the size of the new tree is simply the sum of the sizes of the two merged trees. Thus, 10 + 15 = 25."
  },
  {
    question: "What structural change happens in the tree due to Path Compression during a Find(x) operation?",
    options: [
      "All nodes in the tree are made direct children of the root.",
      "Only node x is made a direct child of the root.",
      "Node x and all its ancestors up to the root are made direct children of the root.",
      "The rank of the root is reduced by the distance from x to the root."
    ],
    correctAnswerIndex: 2,
    explanation: "Path Compression updates the parent pointer of every node along the path from x to the root, making them all direct children of the root."
  },
  {
    question: "In an undirected graph with N vertices, we initially have N disjoint sets. If we perform K valid Union operations (where each operation successfully merges two different sets), how many connected components remain?",
    options: [
      "N - K",
      "K",
      "N - K + 1",
      "N / K"
    ],
    correctAnswerIndex: 0,
    explanation: "Each successful Union operation merges two separate sets into one, thereby reducing the total number of disjoint sets (or connected components) by exactly 1. After K valid operations, N - K sets remain."
  },
  {
    question: "Why is path compression usually omitted in implementations of DSU that need to support 'Undo' (rollback) operations?",
    options: [
      "Because path compression increases the time complexity of the undo operation.",
      "Because path compression modifies the tree structure permanently, making it difficult to reverse without extra O(N) space overhead per operation.",
      "Because path compression is incompatible with union by rank.",
      "Because undoing a union with path compression causes infinite loops."
    ],
    correctAnswerIndex: 1,
    explanation: "Path compression heavily modifies the internal tree structure by flattening multiple nodes along a path. To 'undo', one would need to remember the original parents of all modified nodes, which is memory-intensive. Hence, rollback is typically implemented using only Union by Rank/Size, where a single link change is easily reversed."
  }
];

export const advDSUDebug = {
  instructions: "Fix the syntax error so the code compiles correctly.",
  buggyC: "#include <stdio.h>\n\nint main() {\n    printf(\"Hello World\")\n    return 0;\n}",
  fixedC: "#include <stdio.h>\n\nint main() {\n    printf(\"Hello World\\n\");\n    return 0;\n}",
  buggyJava: "public class Main {\n    public static void main(String[] args) {\n        System.out.printl(\"Hello World\");\n    }\n}",
  fixedJava: "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello World\");\n    }\n}",
  hints: ["Check the print statement.","Missing semicolon or wrong spelling?","Fix it!"],
  expectedOutput: "Hello World"
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
  instructions: "Complete the `find_set` function by filling in the blanks to correctly implement Path Compression.",
  codeBlocks: [
    {
      code: "int find_set(int v) {\n    if (v == parent[v]) {\n        return v;\n    }\n    // Implement path compression\n    return ",
      isBlank: true,
      correctValue: "parent[v] = find_set(parent[v])"
    },
    {
      code: ";\n}",
      isBlank: false
    }
  ]
};
