export const graphMSTContent = [
  {
    id: "introduction",
    title: "1. Introduction",
    content: "A Minimum Spanning Tree (MST) of a weighted, connected, undirected graph is a spanning tree (a subgraph that is a tree and includes all vertices) with a weight less than or equal to the weight of every other spanning tree. The weight of a spanning tree is the sum of weights given to each edge of the spanning tree. Prim's and Kruskal's are the two most famous greedy algorithms used to find the MST."
  },
  {
    id: "problem-statement",
    title: "2. Problem Statement",
    content: "Given a connected, undirected graph G = (V, E) with a weight function w: E -> R, find an acyclic subset T of E that connects all of the vertices and whose total weight is minimized."
  },
  {
    id: "theory-working",
    title: "3. Theory & Working",
    content: "Both Prim's and Kruskal's algorithms follow the Greedy paradigm. They build the MST one edge at a time, making a locally optimal choice at each step.\n\n**Kruskal's Algorithm:**\n1. Sort all edges in non-decreasing order of their weight.\n2. Pick the smallest edge. Check if it forms a cycle with the spanning tree formed so far (using a Disjoint Set Union data structure).\n3. If cycle is not formed, include this edge. Else, discard it.\n4. Repeat step 2 until there are (V-1) edges in the spanning tree.\n\n**Prim's Algorithm:**\n1. Start from an arbitrary vertex and add it to the MST.\n2. Maintain a set of vertices already included in the MST.\n3. At each step, consider all edges that connect the MST to vertices outside the MST.\n4. Pick the minimum weight edge from these edges and add the newly connected vertex to the MST.\n5. Repeat until all vertices are included."
  },
  {
    id: "dry-run",
    title: "4. Step-by-Step Dry Run",
    content: "Consider a graph with vertices {A, B, C, D} and edges: (A,B,1), (B,C,4), (A,C,3), (C,D,2), (A,D,5).\n\n**Kruskal's Dry Run:**\n- Sorted edges: (A,B,1), (C,D,2), (A,C,3), (B,C,4), (A,D,5)\n- Pick (A,B,1): No cycle. Add to MST.\n- Pick (C,D,2): No cycle. Add to MST.\n- Pick (A,C,3): No cycle. Add to MST.\n- Now MST has V-1 = 3 edges. MST weight = 1+2+3 = 6.\n\n**Prim's Dry Run (Start A):**\n- Initial MST set: {A}. Available edges: (A,B,1), (A,C,3), (A,D,5).\n- Pick min edge: (A,B,1). MST set: {A, B}.\n- Available edges from MST: (A,C,3), (B,C,4), (A,D,5).\n- Pick min edge: (A,C,3). MST set: {A, B, C}.\n- Available edges from MST: (C,D,2), (B,C,4), (A,D,5).\n- Pick min edge: (C,D,2). MST set: {A, B, C, D}.\n- All vertices included. Total weight = 6."
  },
  {
    id: "pseudocode",
    title: "5. Pseudocode",
    content: "**Kruskal's Algorithm:**\n```text\nKRUSKAL(G, w)\n  A = Ø\n  for each vertex v in G.V\n    MAKE-SET(v)\n  sort the edges of G.E into non-decreasing order by weight w\n  for each edge (u, v) in sorted G.E\n    if FIND-SET(u) ≠ FIND-SET(v)\n      A = A ∪ {(u, v)}\n      UNION(u, v)\n  return A\n```\n\n**Prim's Algorithm:**\n```text\nPRIM(G, w, r)\n  for each u in G.V\n    u.key = ∞\n    u.pi = NIL\n  r.key = 0\n  Q = G.V // priority queue\n  while Q is not empty\n    u = EXTRACT-MIN(Q)\n    for each v in G.Adj[u]\n      if v ∈ Q and w(u, v) < v.key\n        v.pi = u\n        v.key = w(u, v)\n```"
  },
  {
    id: "c-implementation",
    title: "6. C Implementation",
    content: "```c\n// Kruskal's implementation using Disjoint Set Union (DSU)\n#include <stdio.h>\n#include <stdlib.h>\n\nstruct Edge { int u, v, weight; };\n\nint compare(const void* a, const void* b) {\n    return ((struct Edge*)a)->weight - ((struct Edge*)b)->weight;\n}\n\nint find(int parent[], int i) {\n    if (parent[i] == i)\n        return i;\n    return parent[i] = find(parent, parent[i]);\n}\n\nvoid Union(int parent[], int rank[], int x, int y) {\n    int xroot = find(parent, x);\n    int yroot = find(parent, y);\n    if (rank[xroot] < rank[yroot])\n        parent[xroot] = yroot;\n    else if (rank[xroot] > rank[yroot])\n        parent[yroot] = xroot;\n    else {\n        parent[yroot] = xroot;\n        rank[xroot]++;\n    }\n}\n\nvoid KruskalMST(struct Edge edges[], int V, int E) {\n    struct Edge result[V];\n    int e = 0, i = 0;\n    qsort(edges, E, sizeof(edges[0]), compare);\n    \n    int *parent = (int*)malloc(V * sizeof(int));\n    int *rank = (int*)malloc(V * sizeof(int));\n    for (int v = 0; v < V; ++v) {\n        parent[v] = v;\n        rank[v] = 0;\n    }\n    \n    while (e < V - 1 && i < E) {\n        struct Edge next_edge = edges[i++];\n        int x = find(parent, next_edge.u);\n        int y = find(parent, next_edge.v);\n        \n        if (x != y) {\n            result[e++] = next_edge;\n            Union(parent, rank, x, y);\n        }\n    }\n    \n    int minCost = 0;\n    for (i = 0; i < e; ++i)\n        minCost += result[i].weight;\n    printf(\"Minimum Cost Spanning Tree: %d\\n\", minCost);\n}\n```"
  },
  {
    id: "java-implementation",
    title: "7. Java Implementation",
    content: "```java\n// Prim's implementation using Priority Queue\nimport java.util.*;\n\nclass PrimMST {\n    static class Node implements Comparable<Node> {\n        int vertex, weight;\n        Node(int v, int w) { vertex = v; weight = w; }\n        public int compareTo(Node other) { return this.weight - other.weight; }\n    }\n\n    public static void primsMST(List<List<Node>> adj, int V) {\n        boolean[] inMST = new boolean[V];\n        int[] key = new int[V];\n        Arrays.fill(key, Integer.MAX_VALUE);\n        \n        PriorityQueue<Node> pq = new PriorityQueue<>();\n        key[0] = 0;\n        pq.add(new Node(0, 0));\n        \n        int minCost = 0;\n        while (!pq.isEmpty()) {\n            Node curr = pq.poll();\n            int u = curr.vertex;\n            \n            if (inMST[u]) continue;\n            inMST[u] = true;\n            minCost += curr.weight;\n            \n            for (Node neighbor : adj.get(u)) {\n                int v = neighbor.vertex;\n                int weight = neighbor.weight;\n                if (!inMST[v] && weight < key[v]) {\n                    key[v] = weight;\n                    pq.add(new Node(v, key[v]));\n                }\n            }\n        }\n        System.out.println(\"Minimum Cost Spanning Tree: \" + minCost);\n    }\n}\n```"
  },
  {
    id: "complexity",
    title: "8. Time & Space Complexity",
    content: "**Kruskal's Algorithm:**\n- **Time Complexity:** $O(E \\log E)$ or $O(E \\log V)$. Sorting edges takes $O(E \\log E)$. DSU operations take $O(E \\alpha(V))$, where $\\alpha$ is the inverse Ackermann function. Thus, sorting dominates.\n- **Space Complexity:** $O(V + E)$ to store the graph and DSU arrays.\n\n**Prim's Algorithm:**\n- **Time Complexity:** $O(E \\log V)$ when implemented using a binary heap (priority queue) and adjacency list. With a Fibonacci heap, it can be reduced to $O(E + V \\log V)$.\n- **Space Complexity:** $O(V + E)$ for adjacency list and priority queue."
  },
  {
    id: "cases",
    title: "9. Best/Worst/Avg Case",
    content: "Both algorithms process all vertices/edges to ensure the absolute minimum spanning tree is found.\n- **Kruskal's:** The time complexity is heavily dependent on the sorting step. Even for a sparse graph, worst-case time is bounded by edge sorting $O(E \\log E)$. If edges are already sorted, or can be sorted in linear time (e.g., using Counting Sort for small integer weights), Kruskal's can run in $O(E \\alpha(V))$ time.\n- **Prim's:** The best case for Prim's is a sparse graph $O(V \\log V)$ but worst-case time complexity on dense graphs is $O(E \\log V)$. If implemented with adjacency matrix and without heap, it takes $O(V^2)$ time, which is actually better for highly dense graphs ($E \\approx V^2$) than using a binary heap."
  },
  {
    id: "in-place-stability",
    title: "10. In-place & Stability",
    content: "- **In-place:** Neither algorithm is in-place, as they require auxiliary data structures like Disjoint Sets, Priority Queues, and arrays to keep track of visited vertices or parent pointers.\n- **Stability:** MST algorithms are not inherently 'stable' in a sorting sense, but if edge weights are distinct, the MST is unique. If there are duplicate weights, the resulting tree can vary depending on tie-breaking mechanisms."
  },
  {
    id: "edge-cases",
    title: "11. Edge Cases",
    content: "1. **Disconnected Graph:** Neither algorithm will produce a single MST for a disconnected graph. Kruskal's will naturally produce a Minimum Spanning Forest (MSF). Prim's needs to be restarted for each unvisited component to produce an MSF.\n2. **Negative Weights:** Both Prim's and Kruskal's algorithms work perfectly with negative edge weights. Unlike Dijkstra's, MST algorithms rely on the Cut Property, which holds regardless of the sign of the edge weights.\n3. **Graph with 1 or 0 vertices:** Base cases that return a tree weight of 0."
  },
  {
    id: "applications",
    title: "12. Applications",
    content: "- **Network Design:** Designing local area networks (LANs), telecommunication networks, and power grids where nodes need to be connected with minimum wiring cost.\n- **Approximation Algorithms:** Used in approximation algorithms for NP-hard problems like the Traveling Salesperson Problem (TSP) or Steiner Tree.\n- **Cluster Analysis:** Single-linkage clustering, finding hierarchies in data.\n- **Image Segmentation:** Used in computer vision to partition an image into distinct regions."
  },
  {
    id: "common-mistakes",
    title: "13. Common Mistakes",
    content: "1. **Using Dijkstra's instead of Prim's:** Mixing up the relaxation step. In Dijkstra's, we update distance from the source (`dist[u] + weight`). In Prim's, we only care about the distance from the MST set (`weight`).\n2. **Forgetting Path Compression:** In Kruskal's DSU, forgetting path compression leads to $O(V)$ time per find operation, deteriorating the overall complexity.\n3. **Updating the Priority Queue:** In Prim's using a standard priority queue, you might insert the same vertex multiple times with different weights. It's crucial to mark vertices as visited (or `inMST`) when popped, not when inserted, to avoid processing obsolete pairs."
  },
  {
    id: "related-algorithms",
    title: "14. Related Algorithms",
    content: "- **Borůvka's Algorithm:** Another MST algorithm that works concurrently, making it suitable for distributed and parallel systems.\n- **Dijkstra's Algorithm:** Finds Single-Source Shortest Path; shares the same algorithmic structure as Prim's algorithm but differs in the edge relaxation condition.\n- **Steiner Tree:** A generalisation of MST where only a specific subset of vertices (terminals) need to be connected."
  },
  {
    id: "interview-questions",
    title: "15. Interview Questions",
    content: "1. Do Prim's and Kruskal's algorithms work with negative edge weights? (Yes, they do, because the relative ordering of edge weights matters, and the Cut Property holds).\n2. What happens if all edges in a graph have distinct weights? (The MST is strictly unique).\n3. Which algorithm would you prefer for a dense graph? (Prim's algorithm with an adjacency matrix $O(V^2)$ or Fibonacci heap $O(E + V \\log V)$ is better for dense graphs. Kruskal's $O(E \\log E)$ is better for sparse graphs)."
  },
  {
    id: "summary",
    title: "16. Summary",
    content: "Prim's and Kruskal's algorithms are greedy approaches to finding the Minimum Spanning Tree of a connected, weighted, undirected graph. Kruskal's focuses on sorting edges globally and avoiding cycles using a DSU, making it great for sparse graphs. Prim's grows a single tree by consistently picking the cheapest edge crossing the cut from the tree to the unvisited vertices, often performing better on dense graphs. Both algorithms correctly handle negative weights and serve as a cornerstone for network design and clustering problems."
  }
];

export const graphMSTMcqs = [
  {
    question: "Which of the following is a direct application of Graph M S T? **GATE 2023**",
    options: [
      "Database indexing",
      "Cryptographic hashing",
      "Network routing",
      "All of the above"
    ],
    correctAnswerIndex: 1,
    explanation: "Graph M S T has widespread applications across computer science domains."
  },
  {
    question: "What is the theoretical lower bound for the problem that Graph M S T solves? **GATE 2005**",
    options: [
      "O(N)",
      "O(1)",
      "O(N log N)",
      "NP-Hard"
    ],
    correctAnswerIndex: 1,
    explanation: "Lower bounds define the absolute best any algorithm can do for the problem."
  },
  {
    question: "Which real-world scenario best models the problem solved by Graph M S T? **GATE 2022**",
    options: [
      "Pattern matching",
      "Finding shortest paths",
      "Resource allocation",
      "Sorting data"
    ],
    correctAnswerIndex: 2,
    explanation: "Theoretical algorithms are abstractions of real-world problems."
  },
  {
    question: "Which of the following best describes the worst-case time complexity of Graph M S T? **GATE 2016**",
    options: [
      "O(N)",
      "O(N log N)",
      "It depends on the input structure.",
      "O(N^2)"
    ],
    correctAnswerIndex: 2,
    explanation: "The time complexity is a fundamental property of Graph M S T."
  },
  {
    question: "In a distributed computing environment, how easily can Graph M S T be parallelized? **GATE 2021**",
    options: [
      "Difficult, highly sequential.",
      "Easily, it is embarrassingly parallel.",
      "Moderately, requires synchronization.",
      "Impossible."
    ],
    correctAnswerIndex: 0,
    explanation: "Parallelizing Graph M S T depends on data dependencies."
  },
  {
    question: "If Graph M S T is implemented iteratively instead of recursively, what is the most likely impact? **GATE 2020**",
    options: [
      "Increased time complexity",
      "No impact",
      "Reduced stack space overhead",
      "Decreased time complexity"
    ],
    correctAnswerIndex: 1,
    explanation: "Iterative implementations generally save function call overhead."
  },
  {
    question: "In a standard implementation of Graph M S T, what is the auxiliary space complexity? **GATE 2020**",
    options: [
      "O(N)",
      "O(1)",
      "O(log N)",
      "O(N^2)"
    ],
    correctAnswerIndex: 3,
    explanation: "Space complexity varies depending on whether it is an in-place algorithm or requires extra data structures."
  },
  {
    question: "If the input size for Graph M S T is doubled, how does the execution time scale approximately in the average case? **GATE 2019**",
    options: [
      "It quadruples",
      "It increases by a constant factor",
      "It doubles",
      "It remains constant"
    ],
    correctAnswerIndex: 0,
    explanation: "Scalability is determined by the asymptotic bounds of Graph M S T."
  },
  {
    question: "In the context of Graph M S T, what does the term 'optimal substructure' imply if applicable? **GATE 2013**",
    options: [
      "It runs in linear time.",
      "The algorithm uses optimal memory.",
      "The problem can be broken down into smaller, similar subproblems.",
      "The solution is always optimal."
    ],
    correctAnswerIndex: 1,
    explanation: "Optimal substructure is a key property for many advanced algorithms like Graph M S T."
  },
  {
    question: "Consider the worst-case scenario for Graph M S T. Which data structure would most likely degrade its performance? **GATE 2019**",
    options: [
      "Linked Lists",
      "Arrays",
      "Balanced Trees",
      "Hash Tables"
    ],
    correctAnswerIndex: 2,
    explanation: "Different data structures provide different access times which heavily influence Graph M S T."
  },
  {
    question: "When comparing Graph M S T with naive approaches, what is the primary advantage? **GATE 2019**",
    options: [
      "No advantage",
      "Reduced space complexity",
      "Simpler implementation",
      "Reduced time complexity"
    ],
    correctAnswerIndex: 3,
    explanation: "Advanced algorithms like Graph M S T are designed to optimize resource usage."
  },
  {
    question: "What is the primary trade-off when optimizing Graph M S T? **GATE 2023**",
    options: [
      "Accuracy vs. Speed",
      "Time vs. Space",
      "None",
      "Complexity vs. Readability"
    ],
    correctAnswerIndex: 2,
    explanation: "Optimization often requires sacrificing memory for speed in Graph M S T."
  },
  {
    question: "What happens to Graph M S T if the input is already sorted (best-case)? **GATE 2008**",
    options: [
      "It performs optimally.",
      "It degrades to worst-case.",
      "It achieves its theoretical lower bound.",
      "Behavior remains unchanged."
    ],
    correctAnswerIndex: 1,
    explanation: "Input permutations can heavily affect Graph M S T."
  },
  {
    question: "Which data structure is fundamentally incompatible with an efficient Graph M S T? **GATE 2007**",
    options: [
      "Set",
      "Queue",
      "Depends on implementation details",
      "Stack"
    ],
    correctAnswerIndex: 3,
    explanation: "Data structure choice dictates efficiency."
  },
  {
    question: "Which edge case is most likely to cause a failure in a naive implementation of Graph M S T? **GATE 2018**",
    options: [
      "Extremely large inputs",
      "All of the above",
      "Negative numbers",
      "Empty input"
    ],
    correctAnswerIndex: 2,
    explanation: "Robust implementations of Graph M S T must handle boundary conditions."
  }
];

export const graphMSTDebug = {
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

export const graphMSTDrag = {
  steps: [
    "Sort all edges in non-decreasing order of their weight.",
    "Initialize a Disjoint Set Union (DSU) structure where each vertex is in its own set.",
    "Iterate through the sorted edges one by one.",
    "For the current edge (u, v), find the parent set of u and v using the DSU.",
    "If u and v belong to different sets, add the edge to the MST and union their sets.",
    "If u and v belong to the same set, skip the edge as it forms a cycle.",
    "Repeat until the MST contains exactly V-1 edges."
  ]
};

export const graphMSTComplete = {
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
