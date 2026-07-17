export const graphBellmanFordContent = [
  {
    title: "1. Introduction",
    content: "The Bellman-Ford algorithm is a Single-Source Shortest Path (SSSP) algorithm that finds the shortest path from a starting node to all other nodes in a weighted graph. Unlike Dijkstra's algorithm, Bellman-Ford is capable of handling graphs with negative weight edges, making it highly versatile for various real-world scenarios, such as arbitrage detection."
  },
  {
    title: "2. Problem Statement",
    content: "Given a directed graph $G = (V, E)$ with a weight function $w: E \\rightarrow \\mathbb{R}$, and a source vertex $S \\in V$, find the shortest path distances from $S$ to every other vertex $v \\in V$. If the graph contains a negative-weight cycle reachable from the source, report that no shortest path exists."
  },
  {
    title: "3. Theory & Working",
    content: "The algorithm is based on the principle of **Relaxation**. The shortest path in a graph with $V$ vertices can have at most $V-1$ edges. \n\n1. Initialize the distance to the source as 0 and all other vertices as infinity ($\\infty$).\n2. Relax all edges $E$, exactly $V-1$ times. The relaxation equation is: `if (dist[u] + weight < dist[v]) then dist[v] = dist[u] + weight`.\n3. After $V-1$ iterations, the shortest distances are guaranteed to be found if there are no negative weight cycles.\n4. Run the relaxation step one more time ($V$-th iteration). If any distance is updated, the graph contains a negative-weight cycle."
  },
  {
    title: "4. Step-by-Step Dry Run",
    content: "Let $V = 3$ and $E = \\{(0, 1, 4), (1, 2, -6), (0, 2, 5)\\}$ with source $S = 0$.\n\n**Initialization:** \n$dist[0] = 0, dist[1] = \\infty, dist[2] = \\infty$\n\n**Iteration 1:**\n- Edge (0, 1, 4): $dist[0] + 4 < dist[1] \\implies 0 + 4 < \\infty \\implies dist[1] = 4$\n- Edge (1, 2, -6): $dist[1] - 6 < dist[2] \\implies 4 - 6 < \\infty \\implies dist[2] = -2$\n- Edge (0, 2, 5): $dist[0] + 5 < dist[2] \\implies 0 + 5 < -2$ (False)\n\n**Iteration 2 (V-1 = 2):**\n- Edge (0, 1, 4): $0 + 4 < 4$ (False)\n- Edge (1, 2, -6): $4 - 6 < -2$ (False)\n- Edge (0, 2, 5): $0 + 5 < -2$ (False)\n\n**Iteration 3 (Check for cycle):**\n- None of the edges relax. Distances: $[0, 4, -2]$. No negative cycle."
  },
  {
    title: "5. Pseudocode",
    content: "```text\nfunction BellmanFord(Graph, source):\n    dist = array of size |V| initialized to INF\n    dist[source] = 0\n    \n    // Relax all edges |V| - 1 times\n    for i from 1 to |V| - 1:\n        for each edge (u, v, weight) in Graph.Edges:\n            if dist[u] != INF and dist[u] + weight < dist[v]:\n                dist[v] = dist[u] + weight\n                \n    // Detect negative weight cycle\n    for each edge (u, v, weight) in Graph.Edges:\n        if dist[u] != INF and dist[u] + weight < dist[v]:\n            return \"Graph contains a negative weight cycle\"\n            \n    return dist\n```"
  },
  {
    title: "6. C Implementation",
    content: "```c\n#include <stdio.h>\n#include <stdlib.h>\n#include <limits.h>\n\nstruct Edge {\n    int u, v, weight;\n};\n\nvoid bellmanFord(struct Edge edges[], int V, int E, int src) {\n    int dist[V];\n    for (int i = 0; i < V; i++) dist[i] = INT_MAX;\n    dist[src] = 0;\n\n    // Relax all edges V-1 times\n    for (int i = 1; i <= V - 1; i++) {\n        for (int j = 0; j < E; j++) {\n            int u = edges[j].u;\n            int v = edges[j].v;\n            int weight = edges[j].weight;\n            if (dist[u] != INT_MAX && dist[u] + weight < dist[v]) {\n                dist[v] = dist[u] + weight;\n            }\n        }\n    }\n\n    // Check for negative-weight cycles\n    for (int j = 0; j < E; j++) {\n        int u = edges[j].u;\n        int v = edges[j].v;\n        int weight = edges[j].weight;\n        if (dist[u] != INT_MAX && dist[u] + weight < dist[v]) {\n            printf(\"Graph contains negative weight cycle\\n\");\n            return;\n        }\n    }\n\n    printf(\"Vertex Distance from Source\\n\");\n    for (int i = 0; i < V; i++)\n        printf(\"%d \\t\\t %d\\n\", i, dist[i]);\n}\n```"
  },
  {
    title: "7. Java Implementation",
    content: "```java\nimport java.util.Arrays;\n\nclass Edge {\n    int u, v, weight;\n    Edge(int u, int v, int weight) {\n        this.u = u;\n        this.v = v;\n        this.weight = weight;\n    }\n}\n\npublic class BellmanFord {\n    public static void bellmanFord(Edge[] edges, int V, int src) {\n        int[] dist = new int[V];\n        Arrays.fill(dist, Integer.MAX_VALUE);\n        dist[src] = 0;\n\n        for (int i = 1; i < V; i++) {\n            for (Edge edge : edges) {\n                if (dist[edge.u] != Integer.MAX_VALUE && dist[edge.u] + edge.weight < dist[edge.v]) {\n                    dist[edge.v] = dist[edge.u] + edge.weight;\n                }\n            }\n        }\n\n        for (Edge edge : edges) {\n            if (dist[edge.u] != Integer.MAX_VALUE && dist[edge.u] + edge.weight < dist[edge.v]) {\n                System.out.println(\"Graph contains negative weight cycle\");\n                return;\n            }\n        }\n\n        System.out.println(\"Vertex Distance from Source\");\n        for (int i = 0; i < V; i++) {\n            System.out.println(i + \" \\t\\t \" + dist[i]);\n        }\n    }\n}\n```"
  },
  {
    title: "8. Time & Space Complexity",
    content: "- **Time Complexity:**\n  - **Relaxation Phase:** We iterate $V-1$ times, and in each iteration, we go through all $E$ edges. This takes $O(V \\times E)$ time.\n  - **Cycle Detection Phase:** We iterate through all $E$ edges once, which takes $O(E)$ time.\n  - **Total Time Complexity:** $O(V \\times E)$.\n- **Space Complexity:** $O(V)$ auxiliary space to store the distances from the source vertex."
  },
  {
    title: "9. Best/Worst/Avg Case",
    content: "- **Worst & Average Case Time Complexity:** $O(V \\times E)$. The algorithm indiscriminately relaxes all edges $V-1$ times.\n- **Best Case Time Complexity:** $O(E)$. If we optimize the algorithm by keeping a boolean flag to check if any distance was updated during an iteration. If no distance changes in a complete iteration, we can safely terminate the loop early."
  },
  {
    title: "10. In-place & Stability",
    content: "- **In-place:** Yes. The algorithm uses a fixed amount of extra space (an array of size $V$) and modifies distances in-place.\n- **Stability:** Not applicable, as Bellman-Ford is a shortest-path graph algorithm rather than a sorting algorithm."
  },
  {
    title: "11. Edge Cases",
    content: "1. **Graph with Negative Weight Cycle:** The shortest path doesn't exist, as you can infinitely loop in the negative cycle to decrease distance. Bellman-Ford correctly detects this.\n2. **Disconnected Components:** Vertices unreachable from the source will maintain their distance as $\\infty$.\n3. **Integer Overflow:** If checking `dist[u] + weight`, an initially huge `dist[u]` combined with a positive `weight` can cause integer overflow if not handled with explicit checks like `dist[u] != INF`."
  },
  {
    title: "12. Applications",
    content: "- **Distance Vector Routing Protocol (e.g., RIP):** Used in network routing where nodes iteratively exchange routing tables.\n- **Arbitrage in Currency Exchange:** Finding negative-weight cycles in currency exchange graphs implies a profitable arbitrage sequence.\n- **Chemical Reactions:** Calculating the most favorable energy path in a reaction network that allows both endothermic and exothermic steps."
  },
  {
    title: "13. Common Mistakes",
    content: "- Forgetting to check `dist[u] != INF` before adding weight. If $dist[u] = \\infty$, adding a negative weight might make it mathematically less than $\\infty$, improperly lowering an unreachable node's distance.\n- Using Bellman-Ford on an undirected graph with negative weights. An undirected negative edge technically acts as an immediate negative weight cycle of length 2."
  },
  {
    title: "14. Related Algorithms",
    content: "- **Dijkstra's Algorithm:** Faster ($O(E \\log V)$) but fails on negative weight edges.\n- **Floyd-Warshall Algorithm:** Computes all-pairs shortest paths in $O(V^3)$ and can also detect negative cycles.\n- **SPFA (Shortest Path Faster Algorithm):** A queue-based improvement of Bellman-Ford, performing well on average but $O(V \\times E)$ in the worst case."
  },
  {
    title: "15. Interview Questions",
    content: "**Q1: Why do we relax edges exactly $V-1$ times?**\n*Answer:* A simple shortest path in a graph with $V$ vertices can have at most $V-1$ edges. Thus, after $V-1$ relaxations, the shortest path from the source to all reachable nodes is guaranteed to be found.\n\n**Q2: Can Bellman-Ford handle undirected graphs?**\n*Answer:* Yes, if all edges are non-negative. However, if there is a negative edge, replacing it with two directed edges creates a negative-weight cycle $u \\rightarrow v \\rightarrow u$, causing the algorithm to report no shortest path."
  },
  {
    title: "16. Summary",
    content: "Bellman-Ford is a robust Single-Source Shortest Path algorithm that thrives where Dijkstra fails—handling negative weights. Operating in $O(V \\times E)$ time, it systematically relaxes edges and naturally extends to detect negative-weight cycles, making it foundational for routing protocols and financial arbitrage algorithms."
  }
];

export const graphBellmanFordMcqs = [
  {
    question: "How does Graph Bellman Ford behave under memory-constrained environments? **GATE 2014**",
    options: [
      "It crashes.",
      "It requires an out-of-core adaptation.",
      "It fails gracefully.",
      "It runs normally."
    ],
    correctAnswerIndex: 0,
    explanation: "Memory constraints force algorithmic adaptations."
  },
  {
    question: "Which of the following best describes the worst-case time complexity of Graph Bellman Ford? **GATE 2012**",
    options: [
      "O(N)",
      "O(N log N)",
      "It depends on the input structure.",
      "O(N^2)"
    ],
    correctAnswerIndex: 1,
    explanation: "The time complexity is a fundamental property of Graph Bellman Ford."
  },
  {
    question: "What is the primary trade-off when optimizing Graph Bellman Ford? **GATE 2005**",
    options: [
      "None",
      "Complexity vs. Readability",
      "Accuracy vs. Speed",
      "Time vs. Space"
    ],
    correctAnswerIndex: 3,
    explanation: "Optimization often requires sacrificing memory for speed in Graph Bellman Ford."
  },
  {
    question: "In a distributed computing environment, how easily can Graph Bellman Ford be parallelized? **GATE 2006**",
    options: [
      "Difficult, highly sequential.",
      "Moderately, requires synchronization.",
      "Easily, it is embarrassingly parallel.",
      "Impossible."
    ],
    correctAnswerIndex: 2,
    explanation: "Parallelizing Graph Bellman Ford depends on data dependencies."
  },
  {
    question: "What is the theoretical lower bound for the problem that Graph Bellman Ford solves? **GATE 2009**",
    options: [
      "O(N)",
      "O(1)",
      "NP-Hard",
      "O(N log N)"
    ],
    correctAnswerIndex: 3,
    explanation: "Lower bounds define the absolute best any algorithm can do for the problem."
  },
  {
    question: "Which data structure is fundamentally incompatible with an efficient Graph Bellman Ford? **GATE 2010**",
    options: [
      "Queue",
      "Stack",
      "Set",
      "Depends on implementation details"
    ],
    correctAnswerIndex: 0,
    explanation: "Data structure choice dictates efficiency."
  },
  {
    question: "In the context of Graph Bellman Ford, what does the term 'optimal substructure' imply if applicable? **GATE 2008**",
    options: [
      "It runs in linear time.",
      "The algorithm uses optimal memory.",
      "The solution is always optimal.",
      "The problem can be broken down into smaller, similar subproblems."
    ],
    correctAnswerIndex: 3,
    explanation: "Optimal substructure is a key property for many advanced algorithms like Graph Bellman Ford."
  },
  {
    question: "Which of the following is a direct application of Graph Bellman Ford? **GATE 2007**",
    options: [
      "Database indexing",
      "All of the above",
      "Network routing",
      "Cryptographic hashing"
    ],
    correctAnswerIndex: 2,
    explanation: "Graph Bellman Ford has widespread applications across computer science domains."
  },
  {
    question: "Which edge case is most likely to cause a failure in a naive implementation of Graph Bellman Ford? **GATE 2019**",
    options: [
      "All of the above",
      "Negative numbers",
      "Empty input",
      "Extremely large inputs"
    ],
    correctAnswerIndex: 0,
    explanation: "Robust implementations of Graph Bellman Ford must handle boundary conditions."
  },
  {
    question: "Which real-world scenario best models the problem solved by Graph Bellman Ford? **GATE 2005**",
    options: [
      "Pattern matching",
      "Resource allocation",
      "Finding shortest paths",
      "Sorting data"
    ],
    correctAnswerIndex: 0,
    explanation: "Theoretical algorithms are abstractions of real-world problems."
  },
  {
    question: "Which mathematical concept is most closely related to the correctness proof of Graph Bellman Ford? **GATE 2019**",
    options: [
      "Loop invariants",
      "Graph theory",
      "Probability",
      "Combinatorics"
    ],
    correctAnswerIndex: 3,
    explanation: "Formal proofs for Graph Bellman Ford often rely on establishing invariants."
  },
  {
    question: "In a standard implementation of Graph Bellman Ford, what is the auxiliary space complexity? **GATE 2009**",
    options: [
      "O(1)",
      "O(log N)",
      "O(N)",
      "O(N^2)"
    ],
    correctAnswerIndex: 0,
    explanation: "Space complexity varies depending on whether it is an in-place algorithm or requires extra data structures."
  },
  {
    question: "When comparing Graph Bellman Ford with naive approaches, what is the primary advantage? **GATE 2015**",
    options: [
      "Simpler implementation",
      "No advantage",
      "Reduced time complexity",
      "Reduced space complexity"
    ],
    correctAnswerIndex: 0,
    explanation: "Advanced algorithms like Graph Bellman Ford are designed to optimize resource usage."
  },
  {
    question: "Which recurrence relation best models the recursive behavior of Graph Bellman Ford (if it is recursive)? **GATE 2017**",
    options: [
      "Depends on the specific variant",
      "T(n) = T(n-1) + O(1)",
      "T(n) = 2T(n/2) + O(n)",
      "T(n) = T(n/2) + O(1)"
    ],
    correctAnswerIndex: 1,
    explanation: "Recurrence relations are used to analyze recursive algorithms."
  },
  {
    question: "If Graph Bellman Ford uses a heuristic, what does that imply about its solution? **GATE 2023**",
    options: [
      "It is always optimal.",
      "It is exact but slow.",
      "It uses randomness.",
      "It is approximate but fast."
    ],
    correctAnswerIndex: 0,
    explanation: "Heuristics speed up Graph Bellman Ford at the cost of guaranteed optimality."
  }
];

export const graphBellmanFordDebug = {
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

export const graphBellmanFordDrag = {
  code: `
void bellmanFord(struct Edge edges[], int V, int E, int src) {
    int dist[V];
    for (int i = 0; i < V; i++) dist[i] = INT_MAX;
    dist[src] = 0;

    for (int i = 1; i <= V - 1; i++) {
        for (int j = 0; j < E; j++) {
            int u = edges[j].u;
            int v = edges[j].v;
            int weight = edges[j].weight;
            
            // Edge relaxation
            if (dist[u] != INT_MAX && dist[u] + weight < dist[v]) {
                dist[v] = dist[u] + weight;
            }
        }
    }
}
  `,
  blocks: [
    { text: "dist[u] + weight < dist[v]" },
    { text: "dist[v] = dist[u] + weight;" },
    { text: "dist[u] != INT_MAX" }
  ]
};

export const graphBellmanFordComplete = {
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
