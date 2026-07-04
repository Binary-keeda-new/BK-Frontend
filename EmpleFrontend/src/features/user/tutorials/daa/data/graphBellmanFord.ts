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
    question: "What is the worst-case time complexity of the standard Bellman-Ford algorithm for a graph with $V$ vertices and $E$ edges?",
    options: [
      "O(V + E)",
      "O(V^2)",
      "O(V \\times E)",
      "O(E \\log V)"
    ],
    correctAnswerIndex: 2,
    explanation: "The Bellman-Ford algorithm relaxes every edge $V-1$ times, taking $O(V \\times E)$ time."
  },
  {
    question: "Why does the standard Bellman-Ford algorithm relax all edges exactly $V-1$ times?",
    options: [
      "Because negative cycles always have a length of V-1.",
      "Because a simple path in a graph with V vertices can have at most V-1 edges.",
      "To ensure that all disjoint subgraphs are visited.",
      "Because the number of edges E is always bounded by V-1."
    ],
    correctAnswerIndex: 1,
    explanation: "The shortest path between any two nodes in a graph with V vertices without cycles can contain at most V-1 edges."
  },
  {
    question: "Which of the following is true regarding Bellman-Ford and Dijkstra's algorithm?",
    options: [
      "Dijkstra's is slower but handles negative weights.",
      "Bellman-Ford is faster but cannot detect negative cycles.",
      "Bellman-Ford can handle negative weight edges, whereas standard Dijkstra's cannot.",
      "Both have the same time complexity for sparse graphs."
    ],
    correctAnswerIndex: 2,
    explanation: "Bellman-Ford specifically solves the problem of negative-weight edges which break the greedy assumption of Dijkstra's algorithm."
  },
  {
    question: "How does Bellman-Ford detect a negative weight cycle?",
    options: [
      "By checking if any node is visited more than V times.",
      "By performing a V-th relaxation over all edges and checking if any distance is updated.",
      "By maintaining a count of visited edges per node and throwing an error if it exceeds V-1.",
      "By running a Depth First Search after the main algorithm."
    ],
    correctAnswerIndex: 1,
    explanation: "After V-1 relaxations, optimal distances are found. If a V-th relaxation yields a shorter path, a negative weight cycle must exist."
  },
  {
    question: "Consider a complete directed graph $K_V$ where every edge has a negative weight. What will be the output of Bellman-Ford?",
    options: [
      "The exact negative distances from source to all vertices.",
      "It will report that a negative weight cycle exists.",
      "It will return all distances as 0.",
      "It will fail due to integer underflow."
    ],
    correctAnswerIndex: 1,
    explanation: "A complete directed graph with all negative weights will trivially contain multiple negative-weight cycles (e.g., between any two vertices). The algorithm will detect this."
  },
  {
    question: "An optimized version of Bellman-Ford terminates early if no distances are updated in a given pass. What is its best-case time complexity?",
    options: [
      "O(1)",
      "O(V)",
      "O(E)",
      "O(V \\times E)"
    ],
    correctAnswerIndex: 2,
    explanation: "In the best case (e.g., edges are processed in topological order of shortest paths), the optimal distances are found in the first pass. The second pass will do 0 updates, terminating the algorithm in O(E) time."
  },
  {
    question: "In Bellman-Ford, why is it crucial to check `if dist[u] != \\infty` before attempting a relaxation `dist[v] = dist[u] + weight`?",
    options: [
      "To prevent positive infinity from becoming negative infinity.",
      "To avoid integer overflow/underflow anomalies, particularly when the edge weight is negative.",
      "Because unvisited nodes have weight 0.",
      "Because the graph may be undirected."
    ],
    correctAnswerIndex: 1,
    explanation: "If `dist[u]` is infinity and weight is negative, `dist[u] + weight` could evaluate to a value slightly less than infinity, incorrectly updating an unreachable node's distance."
  },
  {
    question: "If Bellman-Ford is applied to an undirected graph containing at least one edge with a negative weight, what happens?",
    options: [
      "It finds the correct shortest paths.",
      "It behaves normally and ignores the sign.",
      "It detects a negative-weight cycle because the undirected negative edge acts as a 2-cycle.",
      "It gets stuck in an infinite loop during the V-1 relaxations."
    ],
    correctAnswerIndex: 2,
    explanation: "An undirected edge (u, v) with negative weight -W implies directed edges u->v and v->u both with weight -W. Path u->v->u has weight -2W, which is a negative cycle."
  },
  {
    question: "Consider a graph where Bellman-Ford is executed, and distances are stored in an array D. If $D[v]$ is updated during the $k$-th iteration of the outer loop, what does this imply?",
    options: [
      "The shortest path to v consists of exactly k edges.",
      "A path of at most k edges to v has been found that is shorter than any previously known path of fewer edges.",
      "There is a negative cycle reachable from v.",
      "Node v is disconnected from the source."
    ],
    correctAnswerIndex: 1,
    explanation: "The k-th iteration guarantees finding shortest paths that use at most k edges. An update means a shorter path (using up to k edges) was discovered."
  },
  {
    question: "Which well-known routing protocol is based directly on a distributed version of the Bellman-Ford algorithm?",
    options: [
      "OSPF (Open Shortest Path First)",
      "BGP (Border Gateway Protocol)",
      "RIP (Routing Information Protocol)",
      "ARP (Address Resolution Protocol)"
    ],
    correctAnswerIndex: 2,
    explanation: "RIP uses the distance-vector routing algorithm, which is fundamentally a distributed version of Bellman-Ford."
  },
  {
    question: "Can Bellman-Ford algorithm be used to find the longest path in a Directed Acyclic Graph (DAG)?",
    options: [
      "No, because Bellman-Ford only computes minimum distances.",
      "Yes, by negating all edge weights and then running Bellman-Ford.",
      "Yes, but only if all weights are positive.",
      "No, finding the longest path is always NP-Hard."
    ],
    correctAnswerIndex: 1,
    explanation: "By negating all weights, the shortest path algorithm yields the longest path. Since a DAG has no cycles, it won't have negative cycles after negation, so Bellman-Ford will work (though a topological sort approach is faster)."
  }
];

export const graphBellmanFordDebug = {
  instructions: "Fix the syntax error so the code compiles correctly.",
  buggyC: "#include <stdio.h>\n\nint main() {\n    printf(\"Hello World\")\n    return 0;\n}",
  fixedC: "#include <stdio.h>\n\nint main() {\n    printf(\"Hello World\\n\");\n    return 0;\n}",
  buggyJava: "public class Main {\n    public static void main(String[] args) {\n        System.out.printl(\"Hello World\");\n    }\n}",
  fixedJava: "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello World\");\n    }\n}",
  hints: ["Check the print statement.","Missing semicolon or wrong spelling?","Fix it!"],
  expectedOutput: "Hello World"
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
  problem: "Complete the cycle detection step in the Bellman-Ford algorithm.",
  code: `
    // Detect negative-weight cycles
    for (int j = 0; j < E; j++) {
        int u = edges[j].u;
        int v = edges[j].v;
        int weight = edges[j].weight;
        if (dist[u] != INT_MAX && 🚀) {
            printf("Graph contains negative weight cycle\\n");
            return;
        }
    }
  `,
  solution: "dist[u] + weight < dist[v]",
  explanation: "After V-1 relaxations, if there are no negative cycles, all shortest paths are optimal. If we can still relax any edge (i.e., `dist[u] + weight < dist[v]`), it strictly means a negative-weight cycle exists."
};
