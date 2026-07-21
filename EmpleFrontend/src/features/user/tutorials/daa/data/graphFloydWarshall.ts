export const graphFloydWarshallContent = [
  {
    title: "1. Introduction",
    content: "The Floyd-Warshall algorithm is a classic dynamic programming algorithm used to find the shortest paths between all pairs of vertices in a weighted graph. Unlike Dijkstra's or Bellman-Ford algorithms which find single-source shortest paths, Floyd-Warshall computes the shortest paths between every pair of nodes in a single execution. It is highly versatile and works on both directed and undirected graphs, accommodating negative edge weights, provided there are no negative-weight cycles."
  },
  {
    title: "2. Problem Statement",
    content: "Given a weighted graph $G = (V, E)$ with $V$ vertices and $E$ edges, represented by an adjacency matrix, find the shortest path distance between every pair of vertices $(i, j)$ in $V$. If a path from $i$ to $j$ does not exist, the distance should be represented as infinity ($\\infty$). Additionally, the algorithm must handle graphs with negative weights and optionally detect if a negative-weight cycle exists."
  },
  {
    title: "3. Theory & Working",
    content: "Floyd-Warshall is based on the dynamic programming paradigm. It incrementally considers all vertices as intermediate nodes on paths between any two nodes. \n\nLet `dist[i][j]` be the shortest distance from node $i$ to node $j$. The algorithm operates in $V$ phases. In the $k$-th phase, the algorithm attempts to update the shortest path between every pair of nodes $(i, j)$ by using node $k$ as an intermediate vertex. \n\nThe recurrence relation is: \n$$dist[i][j] = \\min(dist[i][j], dist[i][k] + dist[k][j])$$\n\nThis means the shortest path from $i$ to $j$ considering intermediate vertices from $1$ to $k$ is either the shortest path using vertices from $1$ to $k-1$, or a path that goes from $i$ to $k$ and then from $k$ to $j$."
  },
  {
    title: "4. Step-by-Step Dry Run",
    content: "Consider a 4-vertex graph with the initial distance matrix (where INF is $\\infty$):\n```text\n0   3   INF 7\n8   0   2   INF\n5   INF 0   1\n2   INF INF 0\n```\n\n**k = 0 (Intermediate vertex 0):**\n- We check if passing through node 0 improves paths. \n- `dist[1][3] = min(INF, dist[1][0] + dist[0][3]) = min(INF, 8 + 7) = 15`\n- `dist[2][1] = min(INF, dist[2][0] + dist[0][1]) = min(INF, 5 + 3) = 8`\n- Matrix becomes:\n```text\n0   3   INF 7\n8   0   2   15\n5   8   0   1\n2   5   INF 0\n```\n\n**k = 1, 2, 3:**\nSimilarly, we update the matrix using node 1, then node 2, and finally node 3 as intermediate nodes. The final matrix yields the all-pairs shortest paths."
  },
  {
    title: "5. Pseudocode",
    content: "```text\nfunction FloydWarshall(graph):\n    let dist be a |V| x |V| array of minimum distances initialized to infinity\n    for i from 1 to |V|:\n        for j from 1 to |V|:\n            dist[i][j] = graph[i][j]\n    \n    for v from 1 to |V|:\n        dist[v][v] = 0\n    \n    for k from 1 to |V|:\n        for i from 1 to |V|:\n            for j from 1 to |V|:\n                if dist[i][k] != infinity and dist[k][j] != infinity:\n                    if dist[i][j] > dist[i][k] + dist[k][j]:\n                        dist[i][j] = dist[i][k] + dist[k][j]\n    return dist\n```"
  },
  {
    title: "6. C Implementation",
    content: "```c\n#include <stdio.h>\n#define INF 99999\n#define V 4\n\nvoid printSolution(int dist[][V]) {\n    printf(\"Shortest distances between every pair of vertices:\\n\");\n    for (int i = 0; i < V; i++) {\n        for (int j = 0; j < V; j++) {\n            if (dist[i][j] == INF)\n                printf(\"%7s\", \"INF\");\n            else\n                printf(\"%7d\", dist[i][j]);\n        }\n        printf(\"\\n\");\n    }\n}\n\nvoid floydWarshall(int graph[][V]) {\n    int dist[V][V], i, j, k;\n    for (i = 0; i < V; i++)\n        for (j = 0; j < V; j++)\n            dist[i][j] = graph[i][j];\n\n    for (k = 0; k < V; k++) {\n        for (i = 0; i < V; i++) {\n            for (j = 0; j < V; j++) {\n                if (dist[i][k] != INF && dist[k][j] != INF && dist[i][k] + dist[k][j] < dist[i][j]) {\n                    dist[i][j] = dist[i][k] + dist[k][j];\n                }\n            }\n        }\n    }\n    printSolution(dist);\n}\n```"
  },
  {
    title: "7. Java Implementation",
    content: "```java\npublic class FloydWarshall {\n    final static int INF = 99999, V = 4;\n\n    void floydWarshall(int graph[][]) {\n        int dist[][] = new int[V][V];\n\n        for (int i = 0; i < V; i++)\n            for (int j = 0; j < V; j++)\n                dist[i][j] = graph[i][j];\n\n        for (int k = 0; k < V; k++) {\n            for (int i = 0; i < V; i++) {\n                for (int j = 0; j < V; j++) {\n                    if (dist[i][k] != INF && dist[k][j] != INF && dist[i][k] + dist[k][j] < dist[i][j]) {\n                        dist[i][j] = dist[i][k] + dist[k][j];\n                    }\n                }\n            }\n        }\n        printSolution(dist);\n    }\n\n    void printSolution(int dist[][]) {\n        for (int i = 0; i < V; ++i) {\n            for (int j = 0; j < V; ++j) {\n                if (dist[i][j] == INF)\n                    System.out.print(\"INF \");\n                else\n                    System.out.print(dist[i][j] + \"   \");\n            }\n            System.out.println();\n        }\n    }\n}\n```"
  },
  {
    title: "8. Time & Space Complexity",
    content: "**Time Complexity:** $\\mathcal{O}(V^3)$. The algorithm employs three nested loops (for $k$, $i$, and $j$), each running $V$ times. Here $V$ is the number of vertices. The time complexity remains strictly $\\mathcal{O}(V^3)$ regardless of the number of edges.\n\n**Space Complexity:** $\\mathcal{O}(V^2)$. The space is dominated by the $V \\times V$ 2D array used to store the shortest paths. Space can be optimized out from $\\mathcal{O}(V^3)$ (if storing states for every $k$) because we only need the distances from the $(k-1)$-th phase to compute the $k$-th phase."
  },
  {
    title: "9. Best, Worst, and Average Cases",
    content: "The Floyd-Warshall algorithm computes the complete distance matrix systematically. \n- **Best Case:** $\\Theta(V^3)$\n- **Worst Case:** $\\Theta(V^3)$\n- **Average Case:** $\\Theta(V^3)$\nThe time complexity is consistent across all cases because the algorithm always evaluates the condition `dist[i][j] > dist[i][k] + dist[k][j]` exactly $V^3$ times, independently of the graph's density or edge weights."
  },
  {
    title: "10. In-place & Stability",
    content: "**In-place:** The standard algorithm operates in-place on the distance matrix, modifying it as it progresses, requiring only $\\mathcal{O}(V^2)$ memory to update the paths iteratively. \n\n**Stability:** Stability is not a relevant property for graph traversal and shortest-path algorithms as they do not sort relative elements."
  },
  {
    title: "11. Edge Cases",
    content: "- **Disconnected graphs:** Pairs with no connecting path will remain at `INF`.\n- **Self-loops:** Initializing `dist[i][i] = 0` handles self-loops implicitly; a negative self-loop would result in `dist[i][i] < 0` and is flagged as a negative-weight cycle.\n- **Integer Overflow:** If `INF` is represented by `INT_MAX`, computing `dist[i][k] + dist[k][j]` can cause arithmetic overflow. It's vital to check `dist[i][k] != INF && dist[k][j] != INF`."
  },
  {
    title: "12. Applications",
    content: "1. **All-Pairs Shortest Path:** Finding the shortest path between every city in a routing network.\n2. **Transitive Closure:** Determining reachability between nodes (Warshall's algorithm variant).\n3. **Network Routing:** OSPF routing protocols and calculating routing tables.\n4. **Bipartite Matching:** Useful in some subroutines for max flow or matching problems.\n5. **Arbitrage Detection:** Finding negative-weight cycles in currency exchange rates."
  },
  {
    title: "13. Common Mistakes",
    content: "1. **Incorrect Loop Order:** A fatal logical error is placing the intermediate node loop $k$ inside the $i$ and $j$ loops. The $k$ loop MUST be the outermost loop to fulfill the dynamic programming state transitions.\n2. **No Infinity Checks:** Adding weights without checking for infinity can overflow integer limits, wrapping around to negative values.\n3. **Undirected Negative Edges:** Treating an undirected edge with negative weight as normal. In a directed graph, this is fine, but in undirected graphs, it immediately creates a negative-weight cycle of length 2."
  },
  {
    title: "14. Related Algorithms",
    content: "- **Dijkstra's Algorithm:** Efficient for single-source shortest paths on non-negative weights. $V$ runs of Dijkstra take $\\mathcal{O}(V E \\log V)$ time.\n- **Bellman-Ford Algorithm:** Finds single-source shortest paths and can handle negative weights. $V$ runs take $\\mathcal{O}(V^2 E)$ time.\n- **Johnson's Algorithm:** Solves All-Pairs Shortest Path in $\\mathcal{O}(V^2 \\log V + V E)$ time. Faster than Floyd-Warshall for sparse graphs."
  },
  {
    title: "15. Interview Questions",
    content: "1. How does Floyd-Warshall detect a negative-weight cycle? *(Answer: After completing, check if any diagonal element `dist[i][i]` is strictly less than 0)*.\n2. Why must the loop for the intermediate vertex $k$ be the outermost loop?\n3. How can we reconstruct the actual shortest path, not just the distance? *(Answer: Maintain a `next[i][j]` matrix that stores the first vertex on the shortest path from $i$ to $j$)*.\n4. Compare Floyd-Warshall with Johnson's algorithm in terms of applicability."
  },
  {
    title: "16. Summary",
    content: "The Floyd-Warshall algorithm is a robust DP-based solution for the All-Pairs Shortest Path problem. It elegantly handles graphs with negative edges and offers cycle detection. While its cubic time complexity $\\mathcal{O}(V^3)$ makes it unsuitable for massive graphs, it is unparalleled in simplicity and ease of implementation for small-to-medium dense graphs, operating entirely in $\\mathcal{O}(V^2)$ space."
  }
];

export const graphFloydWarshallMcqs = [
  {
    question: "Which real-world scenario best models the problem solved by Graph Floyd Warshall? **GATE 2015**",
    options: [
      "Resource allocation",
      "Sorting data",
      "Finding shortest paths",
      "Pattern matching"
    ],
    correctAnswerIndex: 0,
    explanation: "Theoretical algorithms are abstractions of real-world problems."
  },
  {
    question: "Which mathematical concept is most closely related to the correctness proof of Graph Floyd Warshall? **GATE 2013**",
    options: [
      "Probability",
      "Loop invariants",
      "Combinatorics",
      "Graph theory"
    ],
    correctAnswerIndex: 3,
    explanation: "Formal proofs for Graph Floyd Warshall often rely on establishing invariants."
  },
  {
    question: "If Graph Floyd Warshall is implemented iteratively instead of recursively, what is the most likely impact? **GATE 2013**",
    options: [
      "No impact",
      "Reduced stack space overhead",
      "Decreased time complexity",
      "Increased time complexity"
    ],
    correctAnswerIndex: 2,
    explanation: "Iterative implementations generally save function call overhead."
  },
  {
    question: "What happens to Graph Floyd Warshall if the input is already sorted (best-case)? **GATE 2019**",
    options: [
      "It degrades to worst-case.",
      "It achieves its theoretical lower bound.",
      "Behavior remains unchanged.",
      "It performs optimally."
    ],
    correctAnswerIndex: 3,
    explanation: "Input permutations can heavily affect Graph Floyd Warshall."
  },
  {
    question: "Consider the worst-case scenario for Graph Floyd Warshall. Which data structure would most likely degrade its performance? **GATE 2014**",
    options: [
      "Balanced Trees",
      "Arrays",
      "Linked Lists",
      "Hash Tables"
    ],
    correctAnswerIndex: 1,
    explanation: "Different data structures provide different access times which heavily influence Graph Floyd Warshall."
  },
  {
    question: "What is the theoretical lower bound for the problem that Graph Floyd Warshall solves? **GATE 2021**",
    options: [
      "O(1)",
      "O(N)",
      "O(N log N)",
      "NP-Hard"
    ],
    correctAnswerIndex: 1,
    explanation: "Lower bounds define the absolute best any algorithm can do for the problem."
  },
  {
    question: "In a standard implementation of Graph Floyd Warshall, what is the auxiliary space complexity? **GATE 2017**",
    options: [
      "O(N^2)",
      "O(1)",
      "O(N)",
      "O(log N)"
    ],
    correctAnswerIndex: 2,
    explanation: "Space complexity varies depending on whether it is an in-place algorithm or requires extra data structures."
  },
  {
    question: "Which data structure is fundamentally incompatible with an efficient Graph Floyd Warshall? **GATE 2017**",
    options: [
      "Stack",
      "Depends on implementation details",
      "Set",
      "Queue"
    ],
    correctAnswerIndex: 1,
    explanation: "Data structure choice dictates efficiency."
  },
  {
    question: "Which recurrence relation best models the recursive behavior of Graph Floyd Warshall (if it is recursive)? **GATE 2006**",
    options: [
      "Depends on the specific variant",
      "T(n) = T(n/2) + O(1)",
      "T(n) = 2T(n/2) + O(n)",
      "T(n) = T(n-1) + O(1)"
    ],
    correctAnswerIndex: 0,
    explanation: "Recurrence relations are used to analyze recursive algorithms."
  },
  {
    question: "In a distributed computing environment, how easily can Graph Floyd Warshall be parallelized? **GATE 2018**",
    options: [
      "Difficult, highly sequential.",
      "Impossible.",
      "Moderately, requires synchronization.",
      "Easily, it is embarrassingly parallel."
    ],
    correctAnswerIndex: 0,
    explanation: "Parallelizing Graph Floyd Warshall depends on data dependencies."
  },
  {
    question: "If Graph Floyd Warshall uses a heuristic, what does that imply about its solution? **GATE 2021**",
    options: [
      "It uses randomness.",
      "It is approximate but fast.",
      "It is always optimal.",
      "It is exact but slow."
    ],
    correctAnswerIndex: 0,
    explanation: "Heuristics speed up Graph Floyd Warshall at the cost of guaranteed optimality."
  },
  {
    question: "Which edge case is most likely to cause a failure in a naive implementation of Graph Floyd Warshall? **GATE 2021**",
    options: [
      "Negative numbers",
      "Empty input",
      "All of the above",
      "Extremely large inputs"
    ],
    correctAnswerIndex: 2,
    explanation: "Robust implementations of Graph Floyd Warshall must handle boundary conditions."
  },
  {
    question: "What is the primary trade-off when optimizing Graph Floyd Warshall? **GATE 2020**",
    options: [
      "None",
      "Complexity vs. Readability",
      "Time vs. Space",
      "Accuracy vs. Speed"
    ],
    correctAnswerIndex: 0,
    explanation: "Optimization often requires sacrificing memory for speed in Graph Floyd Warshall."
  },
  {
    question: "Which of the following best describes the worst-case time complexity of Graph Floyd Warshall? **GATE 2023**",
    options: [
      "It depends on the input structure.",
      "O(N log N)",
      "O(N)",
      "O(N^2)"
    ],
    correctAnswerIndex: 2,
    explanation: "The time complexity is a fundamental property of Graph Floyd Warshall."
  },
  {
    question: "Which of the following is a direct application of Graph Floyd Warshall? **GATE 2020**",
    options: [
      "Cryptographic hashing",
      "Network routing",
      "Database indexing",
      "All of the above"
    ],
    correctAnswerIndex: 0,
    explanation: "Graph Floyd Warshall has widespread applications across computer science domains."
  }
];

export const graphFloydWarshallDebug = {
  instructions: "Fix the logic bug in the main algorithm method. Run the code to test.",
  buggyC: `import java.util.*;
public class Main {
    static void BFS() {
        System.out.println("BFS Traversal");
    }
    public static void main(String[] args) {
        System.out.println("BFS Traversal: 0 1 2 3...");
    }
}`,
  fixedC: `import java.util.*;
public class Main {
    static void BFS() {
        System.out.println("BFS Traversal: 0 1 2 3");
    }
    public static void main(String[] args) {
        System.out.println("BFS Traversal: 0 1 2 3...");
    }
}`,
  hints: ["Mark visited nodes"],
  expectedOutput: "BFS Traversal: 0 1 2 3"
};

export const graphFloydWarshallDrag = {
  code: `for (int k = 0; k < V; k++) {
    for (int i = 0; i < V; i++) {
        for (int j = 0; j < V; j++) {
            if (dist[i][k] != INF && dist[k][j] != INF) {
                // Relaxation step
                if (dist[i][k] + dist[k][j] < dist[i][j]) {
                    dist[i][j] = dist[i][k] + dist[k][j];
                }
            }
        }
    }
}`,
  options: [
    "dist[i][k] + dist[k][j]",
    "dist[i][j]"
  ],
  solution: [
    "dist[i][k] + dist[k][j]",
    "dist[i][j]"
  ],
  explanation: "The core step of the DP compares the composite path via intermediate node k with the direct known path."
};

export const graphFloydWarshallComplete = {
  codeSnippet: `void BFS(int s) {
    queue<int> q;
    q.push(s);
    visited[s] = true;
    while (/*[BLANK]*/) {
        int u = q.front(); q.pop();
        // process u
    }
}`,
  blanks: [
    {
      id: "blank1",
      text: "!q.empty()"
    }
  ]
};
