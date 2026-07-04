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
    question: "In the Floyd-Warshall algorithm, if the outer loop for the intermediate vertex $k$ is swapped with the inner loops for vertices $i$ and $j$, what is the consequence on the algorithm's correctness?",
    options: [
      "The algorithm will remain correct but run slower due to cache locality issues.",
      "The algorithm fails to find the shortest path for all pairs because it doesn't correctly build upon previous intermediate vertex sets.",
      "The algorithm will compute the single-source shortest path instead of all-pairs.",
      "The algorithm will incorrectly detect negative cycles even if they do not exist."
    ],
    correctAnswerIndex: 1,
    explanation: "Floyd-Warshall is a DP algorithm. The state $D^{(k)}[i][j]$ relies on $D^{(k-1)}[i][k]$ and $D^{(k-1)}[k][j]$. The outermost loop must be $k$ to ensure that all shortest paths using intermediate vertices $\\{1 \\dots k-1\\}$ are fully computed before introducing vertex $k$."
  },
  {
    question: "Consider a complete directed graph with $n$ vertices. The weights of the edges are arbitrary but there are no negative-weight cycles. How many additions does the standard Floyd-Warshall algorithm perform in the worst case?",
    options: [
      "$n^3$",
      "$n^2(n-1)$",
      "$\\Theta(n^3)$",
      "$2n^3$"
    ],
    correctAnswerIndex: 2,
    explanation: "The algorithm contains three nested loops each running $n$ times. The inner core evaluates `dist[i][k] + dist[k][j] < dist[i][j]`. The addition happens exactly $n^3$ times (excluding infinity checks). Thus, it is $\\Theta(n^3)$."
  },
  {
    question: "Which of the following statements about detecting a negative-weight cycle using the Floyd-Warshall algorithm is correct?",
    options: [
      "A negative cycle is present if and only if there is a negative value in the distance matrix anywhere.",
      "A negative cycle is present if and only if any element on the main diagonal of the distance matrix becomes strictly less than zero.",
      "The algorithm must be run a second time; if the matrix changes, a negative cycle exists.",
      "Floyd-Warshall cannot detect negative-weight cycles; it is only designed for graphs with non-negative edges."
    ],
    correctAnswerIndex: 1,
    explanation: "The distance from a vertex to itself `dist[i][i]` is initially 0. If a negative cycle exists that is reachable from $i$ and can reach back to $i$, the algorithm will eventually update `dist[i][i]` to a value less than 0."
  },
  {
    question: "If Johnson's algorithm is used instead of Floyd-Warshall for the All-Pairs Shortest Path problem, under what condition is Johnson's algorithm asymptotically faster?",
    options: [
      "When the graph is dense, meaning $|E| = \\Theta(|V|^2)$.",
      "When the graph is sparse, meaning $|E| = \\mathcal{O}(|V| \\log |V|)$ or similar.",
      "When there are multiple negative-weight cycles in the graph.",
      "Johnson's algorithm is always asymptotically faster than Floyd-Warshall."
    ],
    correctAnswerIndex: 1,
    explanation: "Johnson's algorithm runs in $\\mathcal{O}(|V|^2 \\log |V| + |V||E|)$. Floyd-Warshall runs in $\\Theta(|V|^3)$. For a sparse graph where $|E| = \\mathcal{O}(|V|)$, Johnson's time complexity becomes $\\mathcal{O}(|V|^2 \\log |V|)$, which is strictly better than $\\mathcal{O}(|V|^3)$."
  },
  {
    question: "To reconstruct the shortest path between any pair of vertices $i$ and $j$ in Floyd-Warshall, an auxiliary matrix `next[i][j]` is maintained. Which of the following updates correctly maintains this matrix during relaxation?",
    options: [
      "If `dist[i][j] > dist[i][k] + dist[k][j]`, then `next[i][j] = k`",
      "If `dist[i][j] > dist[i][k] + dist[k][j]`, then `next[i][j] = next[i][k]`",
      "If `dist[i][j] > dist[i][k] + dist[k][j]`, then `next[i][j] = next[k][j]`",
      "If `dist[i][j] > dist[i][k] + dist[k][j]`, then `next[i][j] = i`"
    ],
    correctAnswerIndex: 1,
    explanation: "The `next[i][j]` matrix stores the next node to visit on the shortest path from $i$ to $j$. If the path goes through $k$, the immediate next node to visit from $i$ towards $j$ is the same as the next node to visit from $i$ towards $k$. Thus, `next[i][j] = next[i][k]`."
  },
  {
    question: "What is the primary reason the 3D dynamic programming state $D^{(k)}[i][j]$ in Floyd-Warshall can be optimized to a 2D state $D[i][j]$?",
    options: [
      "Because $k$ is irrelevant for the calculation of the final distance.",
      "Because the elements $D^{(k)}[i][k]$ and $D^{(k)}[k][j]$ do not change during the $k$-th phase.",
      "Because the maximum possible distance can be bounded by a constant, eliminating the need for historical states.",
      "Because a 3D matrix exceeds memory limits in modern architectures."
    ],
    correctAnswerIndex: 1,
    explanation: "During the $k$-th iteration, we evaluate $D^{(k)}[i][j] = \\min(D^{(k-1)}[i][j], D^{(k-1)}[i][k] + D^{(k-1)}[k][j])$. Notice that $D^{(k)}[i][k] = D^{(k-1)}[i][k]$, because the shortest path from $i$ to $k$ using intermediate vertices $\\{1 \\dots k\\}$ is exactly the same as using $\\{1 \\dots k-1\\}$ (a shortest path without cycles will not visit $k$ twice). Therefore, the required dependencies are not overwritten erroneously."
  },
  {
    question: "Let $G=(V, E)$ be a directed graph. The adjacency matrix acts as the initial distance matrix. If we wish to compute the Transitive Closure of the graph (reachability), how should the Floyd-Warshall relaxation condition be modified?",
    options: [
      "`reach[i][j] = reach[i][j] + (reach[i][k] * reach[k][j])`",
      "`reach[i][j] = reach[i][j] AND (reach[i][k] OR reach[k][j])`",
      "`reach[i][j] = reach[i][j] OR (reach[i][k] AND reach[k][j])`",
      "`reach[i][j] = min(reach[i][j], reach[i][k] + reach[k][j])`"
    ],
    correctAnswerIndex: 2,
    explanation: "This defines Warshall's algorithm for transitive closure. There is a path from $i$ to $j$ if there already is a known path from $i$ to $j$, OR if there is a path from $i$ to $k$ AND a path from $k$ to $j$."
  },
  {
    question: "A directed graph is represented by an adjacency matrix where missing edges are designated by infinity. When evaluating `dist[i][k] + dist[k][j]`, a naive C implementation using `INT_MAX` for infinity may yield unexpected results. Why?",
    options: [
      "`INT_MAX` forces the compiler to switch to floating-point arithmetic.",
      "Adding any positive integer to `INT_MAX` causes integer overflow, resulting in a large negative number.",
      "`INT_MAX` acts as an absorbing element for addition, evaluating to `INT_MAX`, breaking the conditional checks.",
      "A direct equality check against `INT_MAX` is invalid due to dynamic memory alignment."
    ],
    correctAnswerIndex: 1,
    explanation: "In two's complement arithmetic, adding a positive number to `INT_MAX` causes an overflow to a negative value. The condition `dist[i][k] + dist[k][j] < dist[i][j]` might unexpectedly evaluate to true because the sum overflowed to a large negative number."
  },
  {
    question: "Consider using $N$ independent runs of Dijkstra's algorithm versus one run of Floyd-Warshall on a dense graph with non-negative edge weights. Which approach is preferred asymptotically and why?",
    options: [
      "Floyd-Warshall, because $\\mathcal{O}(V^3)$ is better than Dijkstra's $\\mathcal{O}(V^3 \\log V)$.",
      "Dijkstra, because $V$ runs with Fibonacci heap take $\\mathcal{O}(V^2 \\log V + VE) = \\mathcal{O}(V^3)$, and it has better hidden constants.",
      "Floyd-Warshall, because Dijkstra's algorithm fails to find all-pairs shortest paths.",
      "Both algorithms have identical time complexities and hidden constant overheads in this scenario."
    ],
    correctAnswerIndex: 1,
    explanation: "For dense graphs ($E = V^2$), Dijkstra with Fibonacci heaps gives $\\mathcal{O}(V(V \\log V + E)) = \\mathcal{O}(V^2 \\log V + V^3) = \\mathcal{O}(V^3)$. While asymptotically similar, Floyd-Warshall has highly cache-efficient sequential memory access, often making it practically faster for reasonable $V$, but Dijkstra's strictly theoretical bound is competitive without negative edges."
  },
  {
    question: "Suppose Floyd-Warshall operates on a graph containing an undirected edge with a negative weight. What happens?",
    options: [
      "The algorithm halts correctly and outputs negative distances.",
      "The algorithm ignores undirected edges.",
      "The algorithm interprets it as a negative weight cycle of length 2 and reports infinitely decreasing distances on the diagonal.",
      "The algorithm is immune to this issue because $k$ acts as a directed intermediate vertex."
    ],
    correctAnswerIndex: 2,
    explanation: "An undirected negative edge between $U$ and $V$ is equivalent to a directed edge $U \\to V$ and $V \\to U$, both with negative weights. This forms a cycle $U \\to V \\to U$ with negative sum, which is a negative-weight cycle."
  },
  {
    question: "In the context of the Floyd-Warshall algorithm, if the distance matrix $D$ is updated such that at iteration $k$, the elements of the $k$-th row and $k$-th column change, what can be deduced?",
    options: [
      "A negative-weight cycle exists.",
      "The graph is disconnected.",
      "The algorithm's implementation contains an error.",
      "This is normal behavior if $k$ acts as a bridge."
    ],
    correctAnswerIndex: 2,
    explanation: "During the $k$-th phase, we compute $D^{(k)}[i][j] = \\min(D^{(k-1)}[i][j], D^{(k-1)}[i][k] + D^{(k-1)}[k][j])$. If $i=k$ or $j=k$, the new value evaluates to the old value (assuming no negative cycles). The $k$-th row and $k$-th column values strictly remain invariant during the $k$-th phase."
  },
  {
    question: "Which invariant holds true just before the $k$-th iteration (where $k$ ranges from 1 to $V$) of the outermost loop in the Floyd-Warshall algorithm?",
    options: [
      "`dist[i][j]` contains the shortest path from $i$ to $j$ passing through exactly $k-1$ edges.",
      "`dist[i][j]` contains the shortest path from $i$ to $j$ using any subset of the vertices $\\{1, 2, \\dots, k-1\\}$ as intermediate vertices.",
      "`dist[i][j]` contains the shortest path from $i$ to $j$ considering only paths of length at most $k-1$.",
      "`dist[i][j]` contains the shortest path from $i$ to $j$ without visiting any vertex more than $k$ times."
    ],
    correctAnswerIndex: 1,
    explanation: "This is the core definition of the dynamic programming state in Floyd-Warshall. At the start of the $k$-th phase, `dist[i][j]` stores the length of the shortest path from $i$ to $j$ that uses only intermediate vertices from the set $\\{1, 2, \\dots, k-1\\}$."
  }
];

export const graphFloydWarshallDebug = {
  instructions: "Fix the syntax error so the code compiles correctly.",
  buggyC: "#include <stdio.h>\n\nint main() {\n    printf(\"Hello World\")\n    return 0;\n}",
  fixedC: "#include <stdio.h>\n\nint main() {\n    printf(\"Hello World\\n\");\n    return 0;\n}",
  buggyJava: "public class Main {\n    public static void main(String[] args) {\n        System.out.printl(\"Hello World\");\n    }\n}",
  fixedJava: "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello World\");\n    }\n}",
  hints: ["Check the print statement.","Missing semicolon or wrong spelling?","Fix it!"],
  expectedOutput: "Hello World"
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
  problem: "Complete the code to check for negative-weight cycles after the standard Floyd-Warshall algorithm has completed.",
  code: `boolean hasNegativeCycle(int[][] dist, int V) {
    // Check main diagonal for negative values
    for (int i = 0; i < V; i++) {
        if (//?//) {
            return true;
        }
    }
    return false;
}`,
  solution: "dist[i][i] < 0",
  explanation: "A negative cycle reachable from node $i$ back to $i$ will eventually reduce the distance `dist[i][i]` below its initial value of 0. Checking the main diagonal of the distance matrix is a sufficient and necessary condition for negative cycle detection."
};
