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
    question: "Let $G = (V,E)$ be a simple undirected graph, and let $T$ be a Depth First Search (DFS) tree of $G$. Let $u$ and $v$ be two vertices in $G$ such that $u$ is an ancestor of $v$ in $T$. Which of the following statements is strictly TRUE regarding the edges of $G$?",
    options: [
      "Any edge $(x,y)$ in $G$ not in $T$ must be a cross edge.",
      "If there is an edge $(u,v)$ in $G$ that is not in $T$, it must be a back edge.",
      "DFS tree $T$ can contain forward edges in an undirected graph.",
      "The discovery time of $v$ is less than the discovery time of $u$."
    ],
    correctAnswerIndex: 1,
    explanation: "In an undirected graph, a DFS tree has only tree edges and back edges. There are no cross edges or forward edges. Since $u$ is an ancestor of $v$, an edge between them not in the tree is a back edge."
  },
  {
    question: "Consider a directed graph $G$. In a Depth First Search (DFS) traversal, an edge $(u,v)$ is classified as a cross edge if:",
    options: [
      "v is an ancestor of u in the DFS tree.",
      "v is a descendant of u in the DFS tree.",
      "v has been completely explored before u is discovered, and u is not an ancestor of v.",
      "u and v are discovered at the exact same time."
    ],
    correctAnswerIndex: 2,
    explanation: "In a directed graph, if $(u,v)$ is a cross edge, it connects two nodes where neither is an ancestor of the other, and $v$ was completely explored (finished) before $u$ discovered it."
  },
  {
    question: "What is the worst-case time complexity of Breadth-First Search (BFS) on a graph represented using an Adjacency Matrix?",
    options: [
      "$O(V + E)$",
      "$O(E^2)$",
      "$O(V^2)$",
      "$O(V \\log V)$"
    ],
    correctAnswerIndex: 2,
    explanation: "When an Adjacency Matrix is used, for every vertex dequeued, we must iterate through all $V$ possible neighbors in the matrix, leading to $V$ operations per vertex. Thus, the total time complexity is $O(V^2)$."
  },
  {
    question: "Let $G$ be an unweighted, connected, undirected graph. The shortest path distance between vertex $S$ and vertex $T$ is $d$. If we perform BFS starting from $S$, at which level of the BFS tree will vertex $T$ be discovered?",
    options: [
      "Level $d-1$",
      "Level $d$",
      "Level $d+1$",
      "Level $\\log d$"
    ],
    correctAnswerIndex: 1,
    explanation: "BFS explores vertices level by level. The source $S$ is at level 0. The neighbors of $S$ are at level 1, and so on. A node at distance $d$ will be discovered exactly at level $d$."
  },
  {
    question: "Which of the following problems cannot be solved using a standard Depth First Search (DFS)?",
    options: [
      "Detecting a cycle in a directed graph.",
      "Finding the shortest path in an unweighted graph.",
      "Topological sorting of a Directed Acyclic Graph.",
      "Finding Strongly Connected Components."
    ],
    correctAnswerIndex: 1,
    explanation: "DFS does not guarantee the shortest path in an unweighted graph because it traverses as deep as possible before exploring shallower nodes. BFS must be used to find the shortest path."
  },
  {
    question: "Consider a binary tree with $N$ nodes. The maximum auxiliary space required for a Breadth-First Search (Level Order Traversal) is bounded by:",
    options: [
      "$O(1)$",
      "$O(\\log N)$",
      "$O(N)$",
      "$O(N^2)$"
    ],
    correctAnswerIndex: 2,
    explanation: "The queue holds nodes level by level. In the worst case (a perfect binary tree), the lowest level contains $N/2$ nodes, requiring $O(N)$ maximum space in the queue."
  },
  {
    question: "In a directed graph, if a DFS reveals no back edges, what can be definitively concluded about the graph?",
    options: [
      "The graph is strongly connected.",
      "The graph contains at least one cycle.",
      "The graph is a Directed Acyclic Graph (DAG).",
      "The graph is a bipartite graph."
    ],
    correctAnswerIndex: 2,
    explanation: "A directed graph has a cycle if and only if a DFS reveals a back edge. If there are no back edges, the graph contains no cycles and is therefore a Directed Acyclic Graph (DAG)."
  },
  {
    question: "A graph is implemented as an adjacency list. Which of the following operations takes $O(1)$ time?",
    options: [
      "Checking if an edge exists between vertex $u$ and vertex $v$.",
      "Finding the degree of a vertex (assuming the size of the adjacency list is maintained).",
      "Removing an edge from the graph.",
      "Finding the shortest path between two vertices."
    ],
    correctAnswerIndex: 1,
    explanation: "If the list size is maintained, finding the degree takes $O(1)$. Checking an edge or removing an edge takes $O(\\text{degree})$ in an adjacency list."
  },
  {
    question: "Consider a connected undirected graph with $V$ vertices and $E$ edges. If we run DFS, how many edges will belong to the DFS tree?",
    options: [
      "$V$",
      "$E$",
      "$V - 1$",
      "$E - V + 1$"
    ],
    correctAnswerIndex: 2,
    explanation: "A DFS traversal on a connected undirected graph visits all $V$ vertices and forms a spanning tree. A spanning tree of $V$ vertices always has exactly $V - 1$ edges."
  },
  {
    question: "In the context of Kosaraju's Algorithm for finding Strongly Connected Components, what is the role of the first DFS pass?",
    options: [
      "To identify the shortest paths between all nodes.",
      "To push vertices to a stack in the order of their finishing times.",
      "To directly print the strongly connected components.",
      "To reverse the edges of the graph."
    ],
    correctAnswerIndex: 1,
    explanation: "The first DFS in Kosaraju's Algorithm computes the finishing times of all vertices and pushes them onto a stack. The transposed graph is then traversed using these vertices in decreasing order of their finishing times."
  },
  {
    question: "In a graph where edge weights are either 0 or 1, which data structure is most optimal to use with BFS to find the shortest path from a source vertex?",
    options: [
      "Standard Queue",
      "Stack",
      "Double-Ended Queue (Deque)",
      "Min-Heap (Priority Queue)"
    ],
    correctAnswerIndex: 2,
    explanation: "For a 0-1 weighted graph, 0-1 BFS is used, which optimally employs a Double-Ended Queue (Deque). Edges with weight 0 are pushed to the front, and edges with weight 1 are pushed to the back, allowing the shortest path to be found in $O(V+E)$ time."
  },
  {
    question: "During a Depth First Search (DFS) of a directed graph, the starting discovery time $d[v]$ and finishing time $f[v]$ are recorded for each vertex. If vertex $u$ is a proper ancestor of vertex $v$ in the DFS forest, which of the following inequalities holds true based on the Parenthesis Theorem?",
    options: [
      "$d[u] < d[v] < f[v] < f[u]$",
      "$d[v] < d[u] < f[u] < f[v]$",
      "$d[u] < f[u] < d[v] < f[v]$",
      "$d[u] < d[v] < f[u] < f[v]$"
    ],
    correctAnswerIndex: 0,
    explanation: "According to the Parenthesis Theorem in DFS, if $u$ is an ancestor of $v$, the interval $[d[v], f[v]]$ is entirely contained within the interval $[d[u], f[u]]$. Therefore, $d[u] < d[v] < f[v] < f[u]$ is the correct relationship."
  }
];

export const graphTraversalDebug = {
  instructions: "Fix the syntax error so the code compiles correctly.",
  buggyC: "#include <stdio.h>\n\nint main() {\n    printf(\"Hello World\")\n    return 0;\n}",
  fixedC: "#include <stdio.h>\n\nint main() {\n    printf(\"Hello World\\n\");\n    return 0;\n}",
  buggyJava: "public class Main {\n    public static void main(String[] args) {\n        System.out.printl(\"Hello World\");\n    }\n}",
  fixedJava: "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello World\");\n    }\n}",
  hints: ["Check the print statement.","Missing semicolon or wrong spelling?","Fix it!"],
  expectedOutput: "Hello World"
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
  codeSnippet: `
void DFS(int u) {
    visited[u] = 1;
    printf("%d ", u);
    
    for (int i = 0; i < n; i++) {
        if (adj[u][i] == 1 && // BLANK //) {
            DFS(i);
        }
    }
}
`,
  correctCode: `
void DFS(int u) {
    visited[u] = 1;
    printf("%d ", u);
    
    for (int i = 0; i < n; i++) {
        if (adj[u][i] == 1 && !visited[i]) {
            DFS(i);
        }
    }
}
`,
  blanks: [
    {
      id: "blank1",
      text: "!visited[i]"
    }
  ]
};
