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
    question: "Dijkstra's algorithm is based on which of the following paradigms?",
    options: ["Divide and Conquer", "Dynamic Programming", "Greedy Approach", "Backtracking"],
    correctAnswer: 2,
    explanation: "Dijkstra's algorithm makes the locally optimal choice by picking the vertex with the minimum distance at each step, making it a greedy algorithm."
  },
  {
    question: "What is the time complexity of Dijkstra's algorithm when implemented using a binary min-heap and an adjacency list?",
    options: ["$O(V^2)$", "$O(V + E)$", "$O((V + E) \\log V)$", "$O(V \\log E)$"],
    correctAnswer: 2,
    explanation: "Using an adjacency list and binary min-heap, inserting/updating takes $O(\\log V)$. For V vertices and E edges, it takes $O((V + E) \\log V)$."
  },
  {
    question: "Why does Dijkstra's algorithm fail for graphs with negative weight edges?",
    options: [
      "It cannot handle cyclic graphs.",
      "It assumes that once a vertex is finalized, its shortest distance cannot be reduced further.",
      "The priority queue cannot store negative numbers.",
      "It uses adjacency matrix which does not allow negative weights."
    ],
    correctAnswer: 1,
    explanation: "Dijkstra's algorithm is greedy. It finalizes a node when extracted from the heap, assuming paths can only grow longer. A negative edge can make a path shorter, violating this assumption."
  },
  {
    question: "Consider a complete bipartite graph $K_{3,3}$. If all edge weights are 1, what is the maximum number of edges in any shortest path from a source $S$ to any other node $V$ using Dijkstra's algorithm?",
    options: ["1", "2", "3", "4"],
    correctAnswer: 1,
    explanation: "In $K_{3,3}$, the distance between nodes in different sets is 1, and nodes in the same set is 2. The maximum number of edges in a shortest path is 2."
  },
  {
    question: "Which data structure is most optimal for implementing Dijkstra's algorithm to achieve $O(E + V \\log V)$ time complexity?",
    options: ["Binary Heap", "Binomial Heap", "Fibonacci Heap", "Adjacency Matrix"],
    correctAnswer: 2,
    explanation: "Fibonacci heap provides $O(1)$ amortized time complexity for decrease-key operations, resulting in overall $O(E + V \\log V)$ time."
  },
  {
    question: "In Dijkstra's algorithm, a decrease-key operation is performed. In which step does this conceptually happen?",
    options: [
      "When extracting the minimum element from the queue.",
      "When initializing distances to infinity.",
      "When a shorter path to an adjacent vertex is found during edge relaxation.",
      "When marking a vertex as visited."
    ],
    correctAnswer: 2,
    explanation: "Decrease-key happens when relaxing an edge $(u,v)$ reduces the tentative distance `dist[v]`."
  },
  {
    question: "Dijkstra's algorithm cannot be used to find the longest path in a graph with non-negative edges by simply negating all edge weights. Why?",
    options: [
      "Negating edge weights introduces negative weights, which Dijkstra cannot handle.",
      "The longest path problem is NP-Hard in general.",
      "Both A and B.",
      "Neither A nor B."
    ],
    correctAnswer: 2,
    explanation: "Negating weights creates negative edges (violating Dijkstra's requirement) and the Longest Path problem itself is NP-Hard."
  },
  {
    question: "Let $G = (V,E)$ be a directed graph. Which algorithm is best suited to find the shortest path from a single source if $G$ is a Directed Acyclic Graph (DAG)?",
    options: ["Dijkstra's Algorithm", "Bellman-Ford Algorithm", "Topological Sort based algorithm", "Floyd-Warshall Algorithm"],
    correctAnswer: 2,
    explanation: "For DAGs, topological sorting can compute shortest paths in $O(V+E)$ time, which is asymptotically faster than Dijkstra's algorithm."
  },
  {
    question: "Suppose we add a constant $C$ to every edge weight in a graph. Will Dijkstra's algorithm find the same shortest paths?",
    options: [
      "Yes, always.",
      "No, paths with more edges will be penalized more, potentially changing the shortest path.",
      "Yes, as long as $C > 0$.",
      "No, because the algorithm's time complexity increases."
    ],
    correctAnswer: 1,
    explanation: "Adding a constant increases the cost of a path by $C \\times$ (number of edges). Paths with fewer edges become relatively cheaper, changing the shortest path."
  },
  {
    question: "Which of the following problems is Dijkstra's algorithm NOT suitable for?",
    options: [
      "Finding the shortest path in a network routing protocol.",
      "Finding the shortest path in a graph with some negative edges but no negative cycles.",
      "Finding the shortest path between two specific cities on a map.",
      "Solving a maze with weighted cells."
    ],
    correctAnswer: 1,
    explanation: "Dijkstra's algorithm assumes all edge weights are non-negative. It can fail if negative edges exist, even if there are no negative cycles."
  }
];

export const graphDijkstraDebug = {
  instructions: "Fix the syntax error so the code compiles correctly.",
  buggyC: "#include <stdio.h>\n\nint main() {\n    printf(\"Hello World\")\n    return 0;\n}",
  fixedC: "#include <stdio.h>\n\nint main() {\n    printf(\"Hello World\\n\");\n    return 0;\n}",
  buggyJava: "public class Main {\n    public static void main(String[] args) {\n        System.out.printl(\"Hello World\");\n    }\n}",
  fixedJava: "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello World\");\n    }\n}",
  hints: ["Check the print statement.","Missing semicolon or wrong spelling?","Fix it!"],
  expectedOutput: "Hello World"
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
  problem: "Complete the Java code snippet for Dijkstra's edge relaxation step using an adjacency list and Priority Queue.",
  code: `while (!pq.isEmpty()) {
    Node current = pq.poll();
    int u = current.node;
    
    for (Node neighbor : adj.get(u)) {
        int v = neighbor.node;
        int weight = neighbor.cost;
        
        if (dist[u] + weight < __________) {
            __________ = dist[u] + weight;
            pq.add(new Node(v, __________));
        }
    }
}`,
  blanks: [
    "dist[v]",
    "dist[v]",
    "dist[v]"
  ]
};
