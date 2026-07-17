export const graphTraversalContent = [
  {
    title: "Introduction",
    content: "Graph traversal is the process of visiting all the nodes in a graph systematically. The two fundamental traversal algorithms are Breadth-First Search (BFS) and Depth-First Search (DFS). BFS explores the graph layer by layer, while DFS explores as deep as possible before backtracking. These algorithms serve as the foundation for complex graph problems like shortest paths, cycle detection, and connectivity."
  },
  {
    title: "Problem Statement",
    content: "Given a graph $G = (V, E)$, starting from a given source vertex $S$, systematically visit every vertex exactly once. If the graph is disconnected, ensure that all connected components are visited by initiating the traversal from unvisited vertices."
  },
  {
    title: "Theory & Working",
    content: "**Breadth-First Search (BFS):**\nBFS uses a Queue data structure. It starts at a source node, explores all its unvisited neighbors, and then moves to the next level of neighbors. It guarantees the shortest path in an unweighted graph.\n\n**Depth-First Search (DFS):**\nDFS uses a Stack data structure (or recursion). It starts at a source node and explores along each branch as far as possible before backtracking. It relies heavily on discovering and finishing times to classify edges (tree, back, forward, cross)."
  },
  {
    title: "Step-by-Step Dry Run",
    content: "Consider Graph: A - B, A - C, B - D, C - E, D - E.\n**BFS (Start A):**\n1. Enqueue A. Queue: [A]. Visited: {A}\n2. Dequeue A, Enqueue neighbors B, C. Queue: [B, C]. Output: A\n3. Dequeue B, Enqueue D. Queue: [C, D]. Output: B\n4. Dequeue C, Enqueue E. Queue: [D, E]. Output: C\n5. Dequeue D (E already visited by C? No, C just enqueued it. Wait. C enqueues E. D's neighbor E is already in queue/visited). Output: D\n6. Dequeue E. Output: E\nResult: A B C D E\n\n**DFS (Start A):**\n1. Visit A, mark visited. Output: A\n2. Go to B, mark visited. Output: B\n3. Go to D, mark visited. Output: D\n4. Go to E, mark visited. Output: E\n5. Go to C (from E), mark visited. Output: C\nResult: A B D E C"
  },
  {
    title: "Pseudocode",
    content: "```text\n// BFS\nBFS(G, start):\n  let Q be a queue\n  Q.enqueue(start)\n  mark start as visited\n  while Q is not empty:\n    v = Q.dequeue()\n    process(v)\n    for all neighbors w of v:\n      if w is not visited:\n        mark w as visited\n        Q.enqueue(w)\n\n// DFS\nDFS(G, u):\n  mark u as visited\n  process(u)\n  for all neighbors w of u:\n    if w is not visited:\n      DFS(G, w)\n```"
  },
  {
    title: "C Implementation",
    content: "```c\n#include <stdio.h>\n#include <stdlib.h>\n#define MAX 100\n\nint adj[MAX][MAX], visited[MAX], n;\n\nvoid DFS(int u) {\n    printf(\"%d \", u);\n    visited[u] = 1;\n    for(int i = 0; i < n; i++) {\n        if(adj[u][i] && !visited[i]) {\n            DFS(i);\n        }\n    }\n}\n\nvoid BFS(int start) {\n    int q[MAX], front = 0, rear = 0;\n    int vis[MAX] = {0};\n    \n    q[rear++] = start;\n    vis[start] = 1;\n    \n    while(front < rear) {\n        int u = q[front++];\n        printf(\"%d \", u);\n        for(int i = 0; i < n; i++) {\n            if(adj[u][i] && !vis[i]) {\n                vis[i] = 1;\n                q[rear++] = i;\n            }\n        }\n    }\n}\n```"
  },
  {
    title: "Java Implementation",
    content: "```java\nimport java.util.*;\n\npublic class GraphTraversal {\n    private int V;\n    private LinkedList<Integer> adj[];\n\n    GraphTraversal(int v) {\n        V = v;\n        adj = new LinkedList[v];\n        for (int i = 0; i < v; ++i)\n            adj[i] = new LinkedList();\n    }\n\n    void addEdge(int v, int w) {\n        adj[v].add(w);\n    }\n\n    void DFSUtil(int v, boolean visited[]) {\n        visited[v] = true;\n        System.out.print(v + \" \");\n        for (int n : adj[v]) {\n            if (!visited[n]) DFSUtil(n, visited);\n        }\n    }\n\n    void BFS(int s) {\n        boolean visited[] = new boolean[V];\n        LinkedList<Integer> queue = new LinkedList<Integer>();\n        visited[s] = true;\n        queue.add(s);\n\n        while (queue.size() != 0) {\n            s = queue.poll();\n            System.out.print(s + \" \");\n            for (int n : adj[s]) {\n                if (!visited[n]) {\n                    visited[n] = true;\n                    queue.add(n);\n                }\n            }\n        }\n    }\n}\n```"
  },
  {
    title: "Time & Space Complexity",
    content: "**Time Complexity:** \n- Adjacency List: $O(V + E)$ where $V$ is the number of vertices and $E$ is the number of edges.\n- Adjacency Matrix: $O(V^2)$\n\n**Space Complexity:**\n- Both BFS and DFS require $O(V)$ auxiliary space. BFS uses space for the queue (at most $O(V)$ in a dense graph). DFS uses space for the call stack, which can be up to $O(V)$ in a skewed graph (e.g., a path graph)."
  },
  {
    title: "Best/Worst/Avg Case",
    content: "Since graph traversal requires visiting all vertices and edges in the connected component, the time complexity remains $O(V + E)$ across best, average, and worst cases (using an Adjacency List). The graph's topology affects the maximum space utilized: for BFS, a star graph yields worst-case $O(V)$ queue size. For DFS, a path graph yields worst-case $O(V)$ recursion depth."
  },
  {
    title: "In-place & Stability",
    content: "Graph traversal algorithms are **not** in-place because they require auxiliary data structures like `visited` arrays and queues (for BFS) or recursion stacks (for DFS), both taking $O(V)$ space. Stability is not applicable as these are not sorting algorithms. The order of traversal depends entirely on how the adjacency list/matrix is constructed."
  },
  {
    title: "Edge Cases",
    content: "- **Disconnected Graphs:** A single traversal won't visit all nodes. Must iterate over all vertices and launch traversal if unvisited.\n- **Cyclic Graphs:** Handled smoothly by the `visited` array to prevent infinite loops.\n- **Single Node Graph:** Traverses correctly without exceptions.\n- **Empty Graph:** Handled with appropriate zero checks."
  },
  {
    title: "Applications",
    content: "**BFS Applications:**\n- Finding the shortest path in unweighted graphs.\n- Web crawling.\n- Social networking features (e.g., finding people at $k$ distance).\n\n**DFS Applications:**\n- Cycle detection in directed and undirected graphs.\n- Topological sorting.\n- Finding Strongly Connected Components (Tarjan's or Kosaraju's algorithms).\n- Solving puzzles like mazes."
  },
  {
    title: "Common Mistakes",
    content: "1. Forgetting to mark a node as visited when pushing it into the BFS queue, resulting in identical nodes being enqueued multiple times and causing exponential time complexity or Out-of-Memory errors.\n2. In DFS, not returning or terminating correctly, though recursion limits typically handle finite graphs naturally if the visited array is used.\n3. Failing to handle disconnected components by missing the outer loop iterating through all $V$ vertices."
  },
  {
    title: "Related Algorithms",
    content: "- **Dijkstra's Algorithm:** An extension of BFS for weighted graphs using a Priority Queue.\n- **Prim's Algorithm:** Similar to BFS but builds a Minimum Spanning Tree.\n- **Topological Sort:** An application of DFS for Directed Acyclic Graphs (DAGs).\n- **A* Search:** A heuristic-driven traversal."
  },
  {
    title: "Interview Questions",
    content: "1. Find the number of islands (Connected Components) in a 2D matrix.\n2. Given an unweighted graph, find the shortest path from source to target.\n3. Detect a cycle in a Directed/Undirected graph.\n4. Check if a graph is Bipartite.\n5. Clone a graph."
  },
  {
    title: "Summary",
    content: "BFS and DFS are the twin pillars of graph algorithms. BFS offers level-by-level exploration, making it ideal for shortest-path scenarios. DFS dives deep, naturally fitting recursive patterns and pathfinding tasks. Mastery of how to maintain visited states and manage queues/stacks is essential for technical interviews and competitive programming."
  }
];

export const graphTraversalMcqs = [
  {
    question: "How does Graph Traversal behave under memory-constrained environments? **GATE 2008**",
    options: [
      "It requires an out-of-core adaptation.",
      "It fails gracefully.",
      "It crashes.",
      "It runs normally."
    ],
    correctAnswerIndex: 0,
    explanation: "Memory constraints force algorithmic adaptations."
  },
  {
    question: "In the context of Graph Traversal, what does the term 'optimal substructure' imply if applicable? **GATE 2018**",
    options: [
      "The problem can be broken down into smaller, similar subproblems.",
      "The solution is always optimal.",
      "It runs in linear time.",
      "The algorithm uses optimal memory."
    ],
    correctAnswerIndex: 0,
    explanation: "Optimal substructure is a key property for many advanced algorithms like Graph Traversal."
  },
  {
    question: "Which mathematical concept is most closely related to the correctness proof of Graph Traversal? **GATE 2007**",
    options: [
      "Combinatorics",
      "Loop invariants",
      "Probability",
      "Graph theory"
    ],
    correctAnswerIndex: 1,
    explanation: "Formal proofs for Graph Traversal often rely on establishing invariants."
  },
  {
    question: "What happens to Graph Traversal if the input is already sorted (best-case)? **GATE 2012**",
    options: [
      "It achieves its theoretical lower bound.",
      "It degrades to worst-case.",
      "Behavior remains unchanged.",
      "It performs optimally."
    ],
    correctAnswerIndex: 3,
    explanation: "Input permutations can heavily affect Graph Traversal."
  },
  {
    question: "What is the theoretical lower bound for the problem that Graph Traversal solves? **GATE 2010**",
    options: [
      "O(N log N)",
      "NP-Hard",
      "O(N)",
      "O(1)"
    ],
    correctAnswerIndex: 1,
    explanation: "Lower bounds define the absolute best any algorithm can do for the problem."
  },
  {
    question: "If Graph Traversal uses a heuristic, what does that imply about its solution? **GATE 2011**",
    options: [
      "It is always optimal.",
      "It uses randomness.",
      "It is approximate but fast.",
      "It is exact but slow."
    ],
    correctAnswerIndex: 1,
    explanation: "Heuristics speed up Graph Traversal at the cost of guaranteed optimality."
  },
  {
    question: "Which of the following best describes the worst-case time complexity of Graph Traversal? **GATE 2014**",
    options: [
      "O(N log N)",
      "It depends on the input structure.",
      "O(N^2)",
      "O(N)"
    ],
    correctAnswerIndex: 0,
    explanation: "The time complexity is a fundamental property of Graph Traversal."
  },
  {
    question: "Which edge case is most likely to cause a failure in a naive implementation of Graph Traversal? **GATE 2016**",
    options: [
      "All of the above",
      "Extremely large inputs",
      "Negative numbers",
      "Empty input"
    ],
    correctAnswerIndex: 1,
    explanation: "Robust implementations of Graph Traversal must handle boundary conditions."
  },
  {
    question: "Which of the following is a direct application of Graph Traversal? **GATE 2014**",
    options: [
      "Database indexing",
      "Cryptographic hashing",
      "All of the above",
      "Network routing"
    ],
    correctAnswerIndex: 0,
    explanation: "Graph Traversal has widespread applications across computer science domains."
  },
  {
    question: "Consider the worst-case scenario for Graph Traversal. Which data structure would most likely degrade its performance? **GATE 2010**",
    options: [
      "Hash Tables",
      "Balanced Trees",
      "Linked Lists",
      "Arrays"
    ],
    correctAnswerIndex: 3,
    explanation: "Different data structures provide different access times which heavily influence Graph Traversal."
  },
  {
    question: "What is the primary trade-off when optimizing Graph Traversal? **GATE 2007**",
    options: [
      "Complexity vs. Readability",
      "Accuracy vs. Speed",
      "None",
      "Time vs. Space"
    ],
    correctAnswerIndex: 1,
    explanation: "Optimization often requires sacrificing memory for speed in Graph Traversal."
  },
  {
    question: "When comparing Graph Traversal with naive approaches, what is the primary advantage? **GATE 2023**",
    options: [
      "Reduced time complexity",
      "Simpler implementation",
      "No advantage",
      "Reduced space complexity"
    ],
    correctAnswerIndex: 0,
    explanation: "Advanced algorithms like Graph Traversal are designed to optimize resource usage."
  },
  {
    question: "Which data structure is fundamentally incompatible with an efficient Graph Traversal? **GATE 2010**",
    options: [
      "Queue",
      "Stack",
      "Depends on implementation details",
      "Set"
    ],
    correctAnswerIndex: 0,
    explanation: "Data structure choice dictates efficiency."
  },
  {
    question: "Which recurrence relation best models the recursive behavior of Graph Traversal (if it is recursive)? **GATE 2005**",
    options: [
      "T(n) = 2T(n/2) + O(n)",
      "T(n) = T(n/2) + O(1)",
      "Depends on the specific variant",
      "T(n) = T(n-1) + O(1)"
    ],
    correctAnswerIndex: 2,
    explanation: "Recurrence relations are used to analyze recursive algorithms."
  },
  {
    question: "In a standard implementation of Graph Traversal, what is the auxiliary space complexity? **GATE 2008**",
    options: [
      "O(1)",
      "O(log N)",
      "O(N^2)",
      "O(N)"
    ],
    correctAnswerIndex: 1,
    explanation: "Space complexity varies depending on whether it is an in-place algorithm or requires extra data structures."
  }
];

export const graphTraversalDebug = {
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

export const graphTraversalDrag = {
  items: [
    "Initialize a Queue and push the starting vertex.",
    "Mark the starting vertex as visited.",
    "While the Queue is not empty, dequeue a vertex u.",
    "Process the vertex u.",
    "Iterate over all unvisited adjacent vertices of u.",
    "Push unvisited adjacent vertices into the Queue and mark them as visited."
  ]
};

export const graphTraversalComplete = {
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
