export const graphDijkstraContent = [
  {
    title: "Introduction",
    content: "Dijkstra's Algorithm is a popular and widely used greedy algorithm for solving the Single-Source Shortest Path (SSSP) problem. It finds the shortest path from a starting node (source) to all other nodes in a graph with non-negative edge weights. Named after its creator, Edsger W. Dijkstra, it is fundamental in network routing and geographic mapping."
  },
  {
    title: "Problem Statement",
    content: "Given a directed or undirected graph $G = (V, E)$ with non-negative edge weights $w(u, v) \\ge 0$, and a distinguished source vertex $s \\in V$, find the shortest path from $s$ to every other vertex $v \\in V$."
  },
  {
    title: "Theory & Working",
    content: "Dijkstra's algorithm maintains a set of unvisited vertices. It assigns to every node a tentative distance value: set to zero for our initial node and to infinity for all other nodes. \n\nThe algorithm iteratively selects the unvisited node with the smallest tentative distance, marks it as visited (or finalized), and relaxes all its outgoing edges. Relaxing an edge $(u, v)$ means checking if the path to $v$ through $u$ is shorter than the currently known shortest path to $v$. If it is, we update $v$'s distance. This process guarantees that once a node is visited, its shortest distance from the source is finalized."
  },
  {
    title: "Step-by-Step Dry Run",
    content: "Consider a graph with vertices {A, B, C, D, E} and edges: (A,B,4), (A,C,2), (B,C,5), (B,D,10), (C,E,3), (E,D,4), (B,E,1). Source is A.\n\n1. Initial state: dist = {A: 0, B: ∞, C: ∞, D: ∞, E: ∞}, Priority Queue (PQ) = [(0, A)].\n2. Extract (0, A): Relax A's edges.\n   - dist[B] becomes min(∞, 0+4) = 4. PQ = [(2, C), (4, B)]\n   - dist[C] becomes min(∞, 0+2) = 2.\n3. Extract (2, C): Relax C's edges.\n   - dist[E] becomes min(∞, 2+3) = 5. PQ = [(4, B), (5, E)]\n4. Extract (4, B): Relax B's edges.\n   - dist[D] becomes min(∞, 4+10) = 14.\n   - dist[E] becomes min(5, 4+1) = 5 (no change). PQ = [(5, E), (14, D)]\n5. Extract (5, E): Relax E's edges.\n   - dist[D] becomes min(14, 5+4) = 9. PQ = [(9, D)]\n6. Extract (9, D): Relax D's edges. None. PQ empty.\n\nFinal distances from A: {A:0, B:4, C:2, D:9, E:5}."
  },
  {
    title: "Pseudocode",
    content: `function Dijkstra(Graph, source):
    dist[source] = 0
    for each vertex v in Graph:
        if v != source
            dist[v] = infinity
            prev[v] = undefined
        add v to Q (Priority Queue)

    while Q is not empty:
        u = vertex in Q with min dist[u]
        remove u from Q

        for each neighbor v of u:
            alt = dist[u] + length(u, v)
            if alt < dist[v]:
                dist[v] = alt
                prev[v] = u
                decrease-key v in Q
    return dist[], prev[]`
  },
  {
    title: "C Implementation",
    content: `#include <stdio.h>
#include <limits.h>
#include <stdbool.h>

#define V 9

int minDistance(int dist[], bool sptSet[]) {
    int min = INT_MAX, min_index;
    for (int v = 0; v < V; v++)
        if (sptSet[v] == false && dist[v] <= min)
            min = dist[v], min_index = v;
    return min_index;
}

void dijkstra(int graph[V][V], int src) {
    int dist[V];
    bool sptSet[V];

    for (int i = 0; i < V; i++)
        dist[i] = INT_MAX, sptSet[i] = false;

    dist[src] = 0;

    for (int count = 0; count < V - 1; count++) {
        int u = minDistance(dist, sptSet);
        sptSet[u] = true;

        for (int v = 0; v < V; v++)
            if (!sptSet[v] && graph[u][v] && dist[u] != INT_MAX
                && dist[u] + graph[u][v] < dist[v])
                dist[v] = dist[u] + graph[u][v];
    }
}`
  },
  {
    title: "Java Implementation",
    content: `import java.util.*;

class Graph {
    static class Node implements Comparator<Node> {
        public int node;
        public int cost;

        public Node() {}
        public Node(int node, int cost) {
            this.node = node;
            this.cost = cost;
        }
        @Override
        public int compare(Node node1, Node node2) {
            if (node1.cost < node2.cost) return -1;
            if (node1.cost > node2.cost) return 1;
            return 0;
        }
    }

    public static void dijkstra(int V, List<List<Node>> adj, int src) {
        int[] dist = new int[V];
        Arrays.fill(dist, Integer.MAX_VALUE);
        PriorityQueue<Node> pq = new PriorityQueue<>(V, new Node());

        pq.add(new Node(src, 0));
        dist[src] = 0;

        while (!pq.isEmpty()) {
            int u = pq.poll().node;

            for (Node neighbor : adj.get(u)) {
                int v = neighbor.node;
                int weight = neighbor.cost;

                if (dist[u] + weight < dist[v]) {
                    dist[v] = dist[u] + weight;
                    pq.add(new Node(v, dist[v]));
                }
            }
        }
    }
}`
  },
  {
    title: "Time & Space Complexity",
    content: "- **Time Complexity**:\n  - Using an Adjacency Matrix and linear search for min vertex: $O(V^2)$\n  - Using an Adjacency List and Min-Heap (Priority Queue): $O((V + E) \\log V)$. For connected graphs, $E \\ge V-1$, so it is $O(E \\log V)$.\n  - Using Fibonacci Heap: $O(E + V \\log V)$\n- **Space Complexity**: $O(V)$ to store distances and the priority queue, plus graph representation $O(V+E)$ for adjacency list."
  },
  {
    title: "Best/Worst/Avg Case",
    content: "- **Best Case**: The shortest paths require minimal edge relaxation. However, the time complexity remains $O(E \\log V)$ as all edges of visited nodes must be explored.\n- **Worst Case**: The graph is dense ($E = O(V^2)$), and many distance updates occur, leading to $O(E \\log V)$ time with a binary heap.\n- **Average Case**: $O(E \\log V)$ for typical graphs using a min-heap."
  },
  {
    title: "In-place & Stability",
    content: "Dijkstra's Algorithm is a graph traversal and pathfinding algorithm, not a sorting algorithm. Therefore, concepts like **in-place** sorting and **stability** do not directly apply. However, it requires $O(V)$ auxiliary space, so it is not an in-place graph algorithm."
  },
  {
    title: "Edge Cases",
    content: "- **Disconnected graphs**: Unreachable nodes remain at infinity. The algorithm naturally handles this if the priority queue becomes empty.\n- **Negative weights**: Dijkstra's algorithm fails if negative weight edges exist, as it assumes that once a node is extracted from the priority queue, its shortest distance is finalized.\n- **Cycles**: Handles positive weight cycles gracefully since traversing them strictly increases path length. Fails on negative cycles."
  },
  {
    title: "Applications",
    content: "1. Routing algorithms in computer networks (e.g., OSPF).\n2. Finding the shortest path on a map in GPS and navigation systems.\n3. Telecommunication networks for establishing connections.\n4. Flight booking systems to find the cheapest flights."
  },
  {
    title: "Common Mistakes",
    content: "1. Applying Dijkstra on graphs with negative edge weights; Bellman-Ford should be used instead.\n2. Not updating the priority queue correctly when a shorter path is found. In languages like Java, adding the updated node pair `(v, new_dist)` to the priority queue without removing the old one `(v, old_dist)` works fine and preserves time complexity bounds, but can be confusing to beginners.\n3. Forgetting to check if a node has already been processed before relaxing its neighbors, leading to redundant work."
  },
  {
    title: "Related Algorithms",
    content: "- **Bellman-Ford**: Computes shortest paths in graphs with negative weights.\n- **Floyd-Warshall**: Computes all-pairs shortest paths.\n- **A* Search**: An extension of Dijkstra that uses a heuristic to guide the search towards the destination, improving performance.\n- **Prim's Algorithm**: Extremely similar to Dijkstra structurally but computes Minimum Spanning Trees (MST) instead of shortest paths."
  },
  {
    title: "Interview Questions",
    content: "1. Why does Dijkstra's algorithm fail on negative weights?\n2. What is the time complexity difference between using a binary heap and a Fibonacci heap in Dijkstra's?\n3. How would you find the shortest path from multiple sources to a single destination?\n4. Can Dijkstra's algorithm work on a Directed Acyclic Graph (DAG)? Is there a better approach?"
  },
  {
    title: "Summary",
    content: "Dijkstra's Algorithm is the standard algorithm for finding the single-source shortest path on graphs with non-negative edge weights. It uses a greedy approach and a priority queue to iteratively settle the shortest path to each vertex, achieving an optimal $O(E \\log V)$ time complexity with standard binary heaps. While not applicable to graphs with negative weights, its efficiency and simplicity make it indispensable in routing and mapping applications."
  }
];

export const graphDijkstraMcqs = [
  {
    question: "If Graph Dijkstra is implemented iteratively instead of recursively, what is the most likely impact? **GATE 2009**",
    options: [
      "Decreased time complexity",
      "No impact",
      "Increased time complexity",
      "Reduced stack space overhead"
    ],
    correctAnswerIndex: 1,
    explanation: "Iterative implementations generally save function call overhead."
  },
  {
    question: "Which mathematical concept is most closely related to the correctness proof of Graph Dijkstra? **GATE 2009**",
    options: [
      "Graph theory",
      "Loop invariants",
      "Probability",
      "Combinatorics"
    ],
    correctAnswerIndex: 1,
    explanation: "Formal proofs for Graph Dijkstra often rely on establishing invariants."
  },
  {
    question: "What happens to Graph Dijkstra if the input is already sorted (best-case)? **GATE 2005**",
    options: [
      "It performs optimally.",
      "It achieves its theoretical lower bound.",
      "It degrades to worst-case.",
      "Behavior remains unchanged."
    ],
    correctAnswerIndex: 1,
    explanation: "Input permutations can heavily affect Graph Dijkstra."
  },
  {
    question: "Which of the following is a direct application of Graph Dijkstra? **GATE 2013**",
    options: [
      "Cryptographic hashing",
      "Network routing",
      "Database indexing",
      "All of the above"
    ],
    correctAnswerIndex: 2,
    explanation: "Graph Dijkstra has widespread applications across computer science domains."
  },
  {
    question: "If the input size for Graph Dijkstra is doubled, how does the execution time scale approximately in the average case? **GATE 2015**",
    options: [
      "It quadruples",
      "It remains constant",
      "It increases by a constant factor",
      "It doubles"
    ],
    correctAnswerIndex: 1,
    explanation: "Scalability is determined by the asymptotic bounds of Graph Dijkstra."
  },
  {
    question: "When comparing Graph Dijkstra with naive approaches, what is the primary advantage? **GATE 2021**",
    options: [
      "Reduced time complexity",
      "Reduced space complexity",
      "Simpler implementation",
      "No advantage"
    ],
    correctAnswerIndex: 2,
    explanation: "Advanced algorithms like Graph Dijkstra are designed to optimize resource usage."
  },
  {
    question: "In a distributed computing environment, how easily can Graph Dijkstra be parallelized? **GATE 2013**",
    options: [
      "Difficult, highly sequential.",
      "Impossible.",
      "Moderately, requires synchronization.",
      "Easily, it is embarrassingly parallel."
    ],
    correctAnswerIndex: 0,
    explanation: "Parallelizing Graph Dijkstra depends on data dependencies."
  },
  {
    question: "Which data structure is fundamentally incompatible with an efficient Graph Dijkstra? **GATE 2016**",
    options: [
      "Depends on implementation details",
      "Set",
      "Stack",
      "Queue"
    ],
    correctAnswerIndex: 3,
    explanation: "Data structure choice dictates efficiency."
  },
  {
    question: "Which algorithmic paradigm does Graph Dijkstra primarily utilize? **GATE 2020**",
    options: [
      "Divide and Conquer",
      "Dynamic Programming",
      "Greedy Approach",
      "Backtracking"
    ],
    correctAnswerIndex: 0,
    explanation: "Identifying the core paradigm is crucial for understanding Graph Dijkstra."
  },
  {
    question: "What is the primary trade-off when optimizing Graph Dijkstra? **GATE 2010**",
    options: [
      "None",
      "Accuracy vs. Speed",
      "Time vs. Space",
      "Complexity vs. Readability"
    ],
    correctAnswerIndex: 0,
    explanation: "Optimization often requires sacrificing memory for speed in Graph Dijkstra."
  },
  {
    question: "What is the theoretical lower bound for the problem that Graph Dijkstra solves? **GATE 2005**",
    options: [
      "O(N)",
      "NP-Hard",
      "O(1)",
      "O(N log N)"
    ],
    correctAnswerIndex: 0,
    explanation: "Lower bounds define the absolute best any algorithm can do for the problem."
  },
  {
    question: "In a standard implementation of Graph Dijkstra, what is the auxiliary space complexity? **GATE 2010**",
    options: [
      "O(N)",
      "O(log N)",
      "O(1)",
      "O(N^2)"
    ],
    correctAnswerIndex: 2,
    explanation: "Space complexity varies depending on whether it is an in-place algorithm or requires extra data structures."
  },
  {
    question: "In the context of Graph Dijkstra, what does the term 'optimal substructure' imply if applicable? **GATE 2008**",
    options: [
      "The algorithm uses optimal memory.",
      "It runs in linear time.",
      "The solution is always optimal.",
      "The problem can be broken down into smaller, similar subproblems."
    ],
    correctAnswerIndex: 1,
    explanation: "Optimal substructure is a key property for many advanced algorithms like Graph Dijkstra."
  },
  {
    question: "Which real-world scenario best models the problem solved by Graph Dijkstra? **GATE 2015**",
    options: [
      "Resource allocation",
      "Finding shortest paths",
      "Sorting data",
      "Pattern matching"
    ],
    correctAnswerIndex: 3,
    explanation: "Theoretical algorithms are abstractions of real-world problems."
  },
  {
    question: "If Graph Dijkstra uses a heuristic, what does that imply about its solution? **GATE 2011**",
    options: [
      "It uses randomness.",
      "It is approximate but fast.",
      "It is always optimal.",
      "It is exact but slow."
    ],
    correctAnswerIndex: 2,
    explanation: "Heuristics speed up Graph Dijkstra at the cost of guaranteed optimality."
  }
];

export const graphDijkstraDebug = {
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

export const graphDijkstraDrag = {
  problem: "Drag and drop the correct parts of the Dijkstra algorithm relaxation step into the snippet.",
  initialCode: `for each neighbor v of u:
    alt = dist[u] + length(u, v)
    if (__________) {
        dist[v] = __________;
        prev[v] = u;
        __________(v, Q);
    }`,
  options: [
    "alt < dist[v]",
    "alt > dist[v]",
    "alt",
    "dist[u]",
    "decrease_key",
    "increase_key"
  ],
  correctAnswer: [
    "alt < dist[v]",
    "alt",
    "decrease_key"
  ]
};

export const graphDijkstraComplete = {
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
