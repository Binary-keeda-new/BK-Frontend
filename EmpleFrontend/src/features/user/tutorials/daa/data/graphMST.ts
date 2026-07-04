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
    question: "Which of the following statements is TRUE regarding Prim's and Kruskal's algorithms?",
    options: [
      "Prim's algorithm can handle negative edge weights, but Kruskal's algorithm cannot.",
      "Both Prim's and Kruskal's algorithms fail if the graph contains negative edge weights.",
      "Kruskal's algorithm works with negative edge weights, but Prim's algorithm requires all weights to be non-negative.",
      "Both Prim's and Kruskal's algorithms work correctly even if the graph contains negative edge weights."
    ],
    correctAnswerIndex: 3,
    explanation: "Both Prim's and Kruskal's algorithms rely on the Cut Property and relative ordering of edge weights. They do not calculate cumulative path lengths from a source (unlike Dijkstra's), so they work perfectly with negative edge weights."
  },
  {
    question: "Let G = (V, E) be a connected undirected graph with distinct edge weights. Which of the following statements is always FALSE?",
    options: [
      "The Minimum Spanning Tree of G is unique.",
      "The edge with the maximum weight in G cannot be present in the MST.",
      "The edge with the minimum weight in G must be present in the MST.",
      "Prim's and Kruskal's algorithms will produce the exact same spanning tree."
    ],
    correctAnswerIndex: 1,
    explanation: "If an edge with the maximum weight is the only edge connecting a specific vertex to the rest of the graph (a bridge), it MUST be included in the MST. Therefore, stating it cannot be present is FALSE."
  },
  {
    question: "In Kruskal's algorithm, what is the most time-consuming operation in the worst-case scenario when an Adjacency List is given?",
    options: [
      "Finding the parent of a vertex using Disjoint Set Union.",
      "Taking the union of two sets in Disjoint Set Union.",
      "Sorting the edges based on their weights.",
      "Iterating through all vertices to initialize the DSU."
    ],
    correctAnswerIndex: 2,
    explanation: "Sorting the E edges takes O(E log E) time, which heavily dominates the DSU operations that take nearly linear time O(E α(V))."
  },
  {
    question: "Which data structure is most optimally used to implement Prim's algorithm for finding an MST of a dense graph where E = O(V^2)?",
    options: [
      "Binary Heap and Adjacency List",
      "Fibonacci Heap and Adjacency List",
      "Adjacency Matrix and a simple array to store minimum weights",
      "Disjoint Set Union and Edge List"
    ],
    correctAnswerIndex: 2,
    explanation: "For a dense graph (E ≈ V^2), an Adjacency Matrix with a simple array for keys takes O(V^2) time, which is better than a Binary Heap taking O(E log V) = O(V^2 log V). Fibonacci Heap gives O(E + V log V) which is also O(V^2) but has higher constant factors."
  },
  {
    question: "Consider a graph G with 100 vertices and 300 edges. If we run Kruskal’s algorithm using path compression and union by rank, what is the tightest upper bound for the time complexity?",
    options: [
      "O(V + E)",
      "O(E log V)",
      "O(V log E)",
      "O(E^2)"
    ],
    correctAnswerIndex: 1,
    explanation: "Kruskal's algorithm runs in O(E log E) which is equivalent to O(E log V) because E <= V^2 and log(V^2) = 2 log V."
  },
  {
    question: "Let T be the Minimum Spanning Tree of graph G. If we add a constant C to the weights of all edges in G, which of the following is true?",
    options: [
      "The Minimum Spanning Tree T might change depending on the value of C.",
      "The Minimum Spanning Tree T will remain exactly the same.",
      "The MST remains the same only if C is positive.",
      "The structure of the graph dictates that shortest paths and MSTs both remain unchanged."
    ],
    correctAnswerIndex: 1,
    explanation: "Adding a constant to all edges increases the weight of every spanning tree by exactly C * (V-1). The relative ordering of spanning tree weights does not change, so the MST remains the same. (Note: Shortest paths might change, but MST does not)."
  },
  {
    question: "A graph has vertices {A, B, C, D} with edges (A,B,2), (B,C,3), (C,D,1), (A,D,4), (A,C,5). What is the total weight of the MST?",
    options: [
      "5",
      "6",
      "7",
      "10"
    ],
    correctAnswerIndex: 1,
    explanation: "Edges sorted: (C,D,1), (A,B,2), (B,C,3), (A,D,4), (A,C,5). Include CD(1), AB(2), BC(3). All vertices are connected. MST weight = 1 + 2 + 3 = 6."
  },
  {
    question: "Suppose in a connected graph G, all edge weights are distinct. Let e be the heaviest edge in a cycle C within G. Which of the following is true?",
    options: [
      "e must be part of the MST.",
      "e cannot be part of the MST.",
      "e may or may not be part of the MST depending on other edges.",
      "e is definitely a bridge."
    ],
    correctAnswerIndex: 1,
    explanation: "Cycle Property: The heaviest edge in any cycle of a graph with distinct edge weights cannot belong to the Minimum Spanning Tree."
  },
  {
    question: "In Prim’s algorithm, how many times can a vertex be inserted into the priority queue (if using a standard priority queue without decrease-key)?",
    options: [
      "Exactly once.",
      "At most the degree of the vertex.",
      "At most V times.",
      "At most E times."
    ],
    correctAnswerIndex: 1,
    explanation: "In a standard PQ implementation, whenever we find a shorter edge to an unvisited vertex, we push the new pair (vertex, weight) to the PQ. A vertex can be pushed at most once for each of its incident edges (its degree)."
  },
  {
    question: "Which of the following problems can be reduced to finding a Minimum Spanning Tree?",
    options: [
      "Single-Source Shortest Path",
      "Maximum Flow",
      "Minimum Bottleneck Spanning Tree",
      "Maximum Bipartite Matching"
    ],
    correctAnswerIndex: 2,
    explanation: "An MST is always a Minimum Bottleneck Spanning Tree (a tree that minimizes the maximum edge weight in the tree). Thus finding an MST solves the MBST problem."
  },
  {
    question: "Consider a disconnected graph with K connected components, V vertices, and E edges. What is the maximum number of edges in a Minimum Spanning Forest of this graph?",
    options: [
      "V - 1",
      "V - K",
      "E - K",
      "V + K - 1"
    ],
    correctAnswerIndex: 1,
    explanation: "Each component i with V_i vertices will have a spanning tree of V_i - 1 edges. The total number of edges is sum(V_i - 1) = sum(V_i) - sum(1) = V - K."
  },
  {
    question: "When applying Kruskal's algorithm, what happens if two edges have the same weight?",
    options: [
      "The algorithm enters an infinite loop.",
      "The algorithm fails and throws an error.",
      "The MST produced may not be unique, but its total weight is guaranteed to be minimal.",
      "The algorithm skips one of the edges."
    ],
    correctAnswerIndex: 2,
    explanation: "If edge weights are not distinct, there can be multiple valid MSTs with the same minimum total weight. Kruskal's will arbitrarily pick one based on the sorting algorithm's tie-breaking."
  }
];

export const graphMSTDebug = {
  instructions: "Fix the syntax error so the code compiles correctly.",
  buggyC: "#include <stdio.h>\n\nint main() {\n    printf(\"Hello World\")\n    return 0;\n}",
  fixedC: "#include <stdio.h>\n\nint main() {\n    printf(\"Hello World\\n\");\n    return 0;\n}",
  buggyJava: "public class Main {\n    public static void main(String[] args) {\n        System.out.printl(\"Hello World\");\n    }\n}",
  fixedJava: "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello World\");\n    }\n}",
  hints: ["Check the print statement.","Missing semicolon or wrong spelling?","Fix it!"],
  expectedOutput: "Hello World"
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
  problem: "Complete Prim's algorithm implementation. The code uses an Adjacency Matrix and arrays to maintain the MST.",
  skeletonCode: `
import java.util.Arrays;

public class PrimAlgorithm {
    public static void primMST(int[][] graph, int V) {
        int[] parent = new int[V];
        int[] key = new int[V];
        boolean[] inMST = new boolean[V];

        Arrays.fill(key, Integer.MAX_VALUE);
        
        key[0] = 0;
        parent[0] = -1;

        for (int count = 0; count < V - 1; count++) {
            int u = ____; // Find vertex with minimum key
            inMST[u] = true;

            for (int v = 0; v < V; v++) {
                if (graph[u][v] != 0 && ____ && graph[u][v] < key[v]) {
                    parent[v] = u;
                    ____ = graph[u][v];
                }
            }
        }
    }

    private static int minKey(int[] key, boolean[] inMST, int V) {
        int min = Integer.MAX_VALUE, min_index = -1;
        for (int v = 0; v < V; v++)
            if (!inMST[v] && key[v] < min) {
                min = key[v];
                min_index = v;
            }
        return min_index;
    }
}
`,
  correctCode: `
import java.util.Arrays;

public class PrimAlgorithm {
    public static void primMST(int[][] graph, int V) {
        int[] parent = new int[V];
        int[] key = new int[V];
        boolean[] inMST = new boolean[V];

        Arrays.fill(key, Integer.MAX_VALUE);
        
        key[0] = 0;
        parent[0] = -1;

        for (int count = 0; count < V - 1; count++) {
            int u = minKey(key, inMST, V); // Find vertex with minimum key
            inMST[u] = true;

            for (int v = 0; v < V; v++) {
                if (graph[u][v] != 0 && !inMST[v] && graph[u][v] < key[v]) {
                    parent[v] = u;
                    key[v] = graph[u][v];
                }
            }
        }
    }

    private static int minKey(int[] key, boolean[] inMST, int V) {
        int min = Integer.MAX_VALUE, min_index = -1;
        for (int v = 0; v < V; v++)
            if (!inMST[v] && key[v] < min) {
                min = key[v];
                min_index = v;
            }
        return min_index;
    }
}
`,
  blanks: [
    "minKey(key, inMST, V)",
    "!inMST[v]",
    "key[v]"
  ]
};
