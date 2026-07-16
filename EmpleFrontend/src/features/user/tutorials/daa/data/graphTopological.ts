export const graphTopologicalContent = [
  {
    title: "Introduction",
    content: "Topological Sorting is a linear ordering of vertices in a Directed Acyclic Graph (DAG) such that for every directed edge $u \\to v$, vertex $u$ comes before vertex $v$ in the ordering. It is an essential algorithm for resolving dependencies, such as scheduling tasks with precedence constraints."
  },
  {
    title: "Problem Statement",
    content: "Given a Directed Acyclic Graph (DAG) with $V$ vertices and $E$ edges, find a topological ordering of its vertices. If the graph contains a cycle, topological sorting is not possible, and the algorithm should indicate this."
  },
  {
    title: "Theory & Working",
    content: "There are two primary ways to compute a topological sort:\n\n**1. Kahn's Algorithm (BFS-based):**\n- Compute the in-degree (number of incoming edges) for each vertex.\n- Push all vertices with an in-degree of 0 into a queue.\n- While the queue is not empty, pop a vertex, add it to the topological order, and for each of its outgoing edges $(u \\to v)$, decrease the in-degree of $v$ by 1.\n- If the in-degree of $v$ becomes 0, push it into the queue.\n- If the topological order contains fewer than $V$ vertices, the graph has a cycle.\n\n**2. Depth-First Search (DFS-based):**\n- Perform a standard DFS on the graph. Keep track of visited nodes to avoid processing a node multiple times.\n- When a node finishes its exploration (i.e., all its outgoing edges are explored), push it onto a stack.\n- After the DFS completes for all components, pop elements from the stack to get the topological order."
  },
  {
    title: "Step-by-Step Dry Run",
    content: "Let's dry run Kahn's Algorithm on a graph: Vertices = {0, 1, 2, 3}, Edges = {(0→1), (0→2), (1→3), (2→3)}\n\n**Step 1:** Calculate in-degrees:\nIn-degree[0] = 0, In-degree[1] = 1, In-degree[2] = 1, In-degree[3] = 2\n\n**Step 2:** Initialize queue with 0 in-degree nodes:\nQueue: [0]\n\n**Step 3:** Process Queue:\n- Pop 0, Order: [0]. Neighbors of 0 are 1, 2. Decrement their in-degrees.\n  In-degree[1] = 0, In-degree[2] = 0. Queue: [1, 2]\n- Pop 1, Order: [0, 1]. Neighbor of 1 is 3. Decrement its in-degree.\n  In-degree[3] = 1. Queue: [2]\n- Pop 2, Order: [0, 1, 2]. Neighbor of 2 is 3. Decrement its in-degree.\n  In-degree[3] = 0. Queue: [3]\n- Pop 3, Order: [0, 1, 2, 3]. Neighbors of 3: None. Queue: []\n\nFinal Order: 0, 1, 2, 3"
  },
  {
    title: "Pseudocode",
    content: "**Kahn's Algorithm (BFS):**\n```text\nfunction TopologicalSortKahn(G, V):\n    in_degree = array of size V, initialized to 0\n    for each u in V:\n        for each v in G.adj[u]:\n            in_degree[v]++\n\n    Q = empty queue\n    for each u in V:\n        if in_degree[u] == 0:\n            Q.push(u)\n\n    count = 0\n    top_order = empty list\n\n    while Q is not empty:\n        u = Q.pop()\n        top_order.append(u)\n        count++\n\n        for each v in G.adj[u]:\n            in_degree[v]--\n            if in_degree[v] == 0:\n                Q.push(v)\n\n    if count != V:\n        return \"Cycle detected\"\n    return top_order\n```"
  },
  {
    title: "C Implementation",
    content: "```c\n#include <stdio.h>\n#include <stdlib.h>\n\n#define MAX 100\n\nvoid topologicalSortKahn(int adj[MAX][MAX], int V) {\n    int in_degree[MAX] = {0};\n    for (int i = 0; i < V; i++) {\n        for (int j = 0; j < V; j++) {\n            if (adj[i][j] == 1) {\n                in_degree[j]++;\n            }\n        }\n    }\n\n    int queue[MAX], front = 0, rear = 0;\n    for (int i = 0; i < V; i++) {\n        if (in_degree[i] == 0) {\n            queue[rear++] = i;\n        }\n    }\n\n    int count = 0, top_order[MAX];\n    while (front < rear) {\n        int u = queue[front++];\n        top_order[count++] = u;\n\n        for (int v = 0; v < V; v++) {\n            if (adj[u][v] == 1) {\n                if (--in_degree[v] == 0) {\n                    queue[rear++] = v;\n                }\n            }\n        }\n    }\n\n    if (count != V) {\n        printf(\"Graph contains a cycle\\n\");\n        return;\n    }\n\n    for (int i = 0; i < count; i++) {\n        printf(\"%d \", top_order[i]);\n    }\n    printf(\"\\n\");\n}\n```"
  },
  {
    title: "Java Implementation",
    content: "```java\nimport java.util.*;\n\npublic class TopologicalSort {\n    static void topologicalSortDFS(List<List<Integer>> adj, int V) {\n        boolean[] visited = new boolean[V];\n        Stack<Integer> stack = new Stack<>();\n\n        for (int i = 0; i < V; i++) {\n            if (!visited[i]) {\n                dfs(i, visited, stack, adj);\n            }\n        }\n\n        while (!stack.isEmpty()) {\n            System.out.print(stack.pop() + \" \");\n        }\n        System.out.println();\n    }\n\n    static void dfs(int v, boolean[] visited, Stack<Integer> stack, List<List<Integer>> adj) {\n        visited[v] = true;\n        for (Integer neighbor : adj.get(v)) {\n            if (!visited[neighbor]) {\n                dfs(neighbor, visited, stack, adj);\n            }\n        }\n        stack.push(v);\n    }\n\n    public static void main(String[] args) {\n        int V = 6;\n        List<List<Integer>> adj = new ArrayList<>(V);\n        for (int i = 0; i < V; i++) adj.add(new ArrayList<>());\n        \n        adj.get(5).add(2);\n        adj.get(5).add(0);\n        adj.get(4).add(0);\n        adj.get(4).add(1);\n        adj.get(2).add(3);\n        adj.get(3).add(1);\n        \n        topologicalSortDFS(adj, V);\n    }\n}\n```"
  },
  {
    title: "Time & Space Complexity",
    content: "**Time Complexity:** $\\mathcal{O}(V + E)$\nBoth Kahn's algorithm (BFS-based) and DFS-based topological sort visit every vertex and traverse every edge exactly once. Here, $V$ is the number of vertices and $E$ is the number of edges.\n\n**Space Complexity:** $\\mathcal{O}(V)$\n- **Kahn's:** Requires a queue of max size $V$, an array for `in_degree` of size $V$, and space to store the topological order of size $V$.\n- **DFS:** Requires a stack of size $V$ and a recursion call stack depth of up to $V$ (in the worst-case skewed graph), plus a `visited` array of size $V$. Note that if the graph is represented using an adjacency list, the space for the graph itself is $\\mathcal{O}(V + E)$."
  },
  {
    title: "Best/Worst/Avg Case",
    content: "Since Topological Sorting algorithms process every vertex and edge, their time complexity remains tightly bound to $\\mathcal{O}(V + E)$ regardless of the specific graph structure (as long as it is a DAG).\n\n- **Best Case:** $\\mathcal{O}(V + E)$\n- **Worst Case:** $\\mathcal{O}(V + E)$\n- **Average Case:** $\\mathcal{O}(V + E)$"
  },
  {
    title: "In-place & Stability",
    content: "**In-place:** No.\nTopological sorting algorithms require additional data structures like queues, stacks, or auxiliary arrays (e.g., in-degree, visited state) whose size grows proportionally with the number of vertices, meaning it takes $\\mathcal{O}(V)$ extra memory.\n\n**Stability:** Not strictly applicable, but topological orderings are generally **not unique**.\nMultiple valid topological sort orders can exist for a single DAG. For example, if vertices $A$ and $B$ have no dependencies on each other, either can come first. The specific order output depends on the implementation, such as the order in which vertices are iterated or popped from the queue/stack."
  },
  {
    title: "Edge Cases",
    content: "1. **Graph with a cycle:** Topological sort is undefined for cyclic graphs. Kahn's algorithm gracefully detects this if the sorted array has length $< V$. DFS-based requires extra logic (tracking nodes currently in the recursion stack) to detect cycles.\n2. **Disconnected components:** The graph might consist of multiple disjoint subgraphs. Both Kahn's and DFS-based algorithms handle this correctly by iterating over all vertices sequentially if they haven't been processed.\n3. **Single vertex graph:** Should trivially output the single vertex.\n4. **Graph with zero edges:** Any permutation of vertices is a valid topological sort."
  },
  {
    title: "Applications",
    content: "Topological sorting is primarily used when there are prerequisite constraints:\n- **Course scheduling:** Deciding the order to take college courses when some courses have prerequisites.\n- **Build systems (e.g., Makefiles, Maven):** Determining the order of compilation based on dependencies.\n- **Task scheduling:** Scheduling a set of tasks where some tasks must finish before others can begin.\n- **Data serialization:** Resolving dependencies when serializing interconnected objects.\n- **Deadlock detection:** Cycle detection via Kahn's algorithm helps identify unresolvable resource constraints."
  },
  {
    title: "Common Mistakes",
    content: "- **Forgetting to check for cycles:** Using DFS without a cycle detection mechanism on an arbitrary directed graph could yield an invalid \"topological sort\" even if the graph is cyclic.\n- **Reversing the DFS order:** In the DFS-based approach, you must add a node to the order *after* exploring all its neighbors (post-order), not before (pre-order).\n- **Miscalculating in-degrees:** In Kahn's algorithm, incorrectly setting initial in-degrees leads to a deadlocked queue."
  },
  {
    title: "Related Algorithms",
    content: "- **Depth-First Search (DFS):** The underlying traversal for the recursive topological sort.\n- **Breadth-First Search (BFS):** The underlying traversal for Kahn's algorithm.\n- **Kosaraju's / Tarjan's Algorithm:** Used for finding Strongly Connected Components (SCCs), which are closely related to cycles in directed graphs.\n- **Critical Path Method (CPM):** Relies on topological sorting to calculate the longest path in a project schedule."
  },
  {
    title: "Interview Questions",
    content: "1. How does Kahn's algorithm detect a cycle in a directed graph?\n2. What modifications are needed in the DFS approach to detect a cycle while sorting?\n3. Is the topological sort of a graph unique? How can you find all possible topological sorts?\n4. Can topological sorting be performed on an undirected graph? Why or why not?"
  },
  {
    title: "Summary",
    content: "Topological Sorting orders the vertices of a Directed Acyclic Graph (DAG) such that every directed edge goes from a vertex earlier in the order to a vertex later in the order. It can be implemented efficiently in $\\mathcal{O}(V + E)$ time using either Kahn's Algorithm (in-degree/BFS) or a post-order DFS. It is the fundamental algorithm for dependency resolution in scheduling, compilation, and workflow planning."
  }
];

export const graphTopologicalMcqs = [
  {
    question: "Which mathematical concept is most closely related to the correctness proof of Graph Topological? **GATE 2023**",
    options: [
      "Loop invariants",
      "Graph theory",
      "Probability",
      "Combinatorics"
    ],
    correctAnswerIndex: 2,
    explanation: "Formal proofs for Graph Topological often rely on establishing invariants."
  },
  {
    question: "Which edge case is most likely to cause a failure in a naive implementation of Graph Topological? **GATE 2007**",
    options: [
      "Extremely large inputs",
      "Negative numbers",
      "Empty input",
      "All of the above"
    ],
    correctAnswerIndex: 0,
    explanation: "Robust implementations of Graph Topological must handle boundary conditions."
  },
  {
    question: "What is the theoretical lower bound for the problem that Graph Topological solves? **GATE 2019**",
    options: [
      "NP-Hard",
      "O(N)",
      "O(N log N)",
      "O(1)"
    ],
    correctAnswerIndex: 1,
    explanation: "Lower bounds define the absolute best any algorithm can do for the problem."
  },
  {
    question: "How does Graph Topological behave under memory-constrained environments? **GATE 2012**",
    options: [
      "It requires an out-of-core adaptation.",
      "It runs normally.",
      "It crashes.",
      "It fails gracefully."
    ],
    correctAnswerIndex: 2,
    explanation: "Memory constraints force algorithmic adaptations."
  },
  {
    question: "Which of the following best describes the worst-case time complexity of Graph Topological? **GATE 2016**",
    options: [
      "O(N log N)",
      "It depends on the input structure.",
      "O(N^2)",
      "O(N)"
    ],
    correctAnswerIndex: 3,
    explanation: "The time complexity is a fundamental property of Graph Topological."
  },
  {
    question: "Which algorithmic paradigm does Graph Topological primarily utilize? **GATE 2015**",
    options: [
      "Divide and Conquer",
      "Greedy Approach",
      "Dynamic Programming",
      "Backtracking"
    ],
    correctAnswerIndex: 0,
    explanation: "Identifying the core paradigm is crucial for understanding Graph Topological."
  },
  {
    question: "Which data structure is fundamentally incompatible with an efficient Graph Topological? **GATE 2021**",
    options: [
      "Queue",
      "Stack",
      "Depends on implementation details",
      "Set"
    ],
    correctAnswerIndex: 3,
    explanation: "Data structure choice dictates efficiency."
  },
  {
    question: "In a standard implementation of Graph Topological, what is the auxiliary space complexity? **GATE 2014**",
    options: [
      "O(log N)",
      "O(N^2)",
      "O(1)",
      "O(N)"
    ],
    correctAnswerIndex: 3,
    explanation: "Space complexity varies depending on whether it is an in-place algorithm or requires extra data structures."
  },
  {
    question: "When comparing Graph Topological with naive approaches, what is the primary advantage? **GATE 2022**",
    options: [
      "Reduced time complexity",
      "No advantage",
      "Reduced space complexity",
      "Simpler implementation"
    ],
    correctAnswerIndex: 1,
    explanation: "Advanced algorithms like Graph Topological are designed to optimize resource usage."
  },
  {
    question: "In the context of Graph Topological, what does the term 'optimal substructure' imply if applicable? **GATE 2005**",
    options: [
      "The problem can be broken down into smaller, similar subproblems.",
      "It runs in linear time.",
      "The algorithm uses optimal memory.",
      "The solution is always optimal."
    ],
    correctAnswerIndex: 1,
    explanation: "Optimal substructure is a key property for many advanced algorithms like Graph Topological."
  },
  {
    question: "If Graph Topological uses a heuristic, what does that imply about its solution? **GATE 2022**",
    options: [
      "It uses randomness.",
      "It is always optimal.",
      "It is exact but slow.",
      "It is approximate but fast."
    ],
    correctAnswerIndex: 0,
    explanation: "Heuristics speed up Graph Topological at the cost of guaranteed optimality."
  },
  {
    question: "If the input size for Graph Topological is doubled, how does the execution time scale approximately in the average case? **GATE 2005**",
    options: [
      "It increases by a constant factor",
      "It remains constant",
      "It doubles",
      "It quadruples"
    ],
    correctAnswerIndex: 3,
    explanation: "Scalability is determined by the asymptotic bounds of Graph Topological."
  },
  {
    question: "If Graph Topological is implemented iteratively instead of recursively, what is the most likely impact? **GATE 2020**",
    options: [
      "Increased time complexity",
      "Reduced stack space overhead",
      "Decreased time complexity",
      "No impact"
    ],
    correctAnswerIndex: 0,
    explanation: "Iterative implementations generally save function call overhead."
  },
  {
    question: "Which real-world scenario best models the problem solved by Graph Topological? **GATE 2015**",
    options: [
      "Pattern matching",
      "Sorting data",
      "Resource allocation",
      "Finding shortest paths"
    ],
    correctAnswerIndex: 0,
    explanation: "Theoretical algorithms are abstractions of real-world problems."
  },
  {
    question: "Consider the worst-case scenario for Graph Topological. Which data structure would most likely degrade its performance? **GATE 2009**",
    options: [
      "Arrays",
      "Hash Tables",
      "Balanced Trees",
      "Linked Lists"
    ],
    correctAnswerIndex: 3,
    explanation: "Different data structures provide different access times which heavily influence Graph Topological."
  }
];

export const graphTopologicalDebug = {
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

export const graphTopologicalDrag = {
  initialCode: `void kahnAlgo(vector<int> adj[], int V) {
    vector<int> in_degree(V, 0);
    // 1. Calculate in-degrees
    for (int u = 0; u < V; u++) {
        for (int v : adj[u]) {
            ???
        }
    }

    queue<int> q;
    // 2. Enqueue vertices with 0 in-degree
    for (int i = 0; i < V; i++) {
        if (in_degree[i] == 0) {
            ???
        }
    }

    int count = 0;
    // 3. Process queue
    while (!q.empty()) {
        int u = q.front();
        q.pop();
        cout << u << " ";
        count++;

        // 4. Reduce in-degree of neighbors
        for (int v : adj[u]) {
            ???
            if (in_degree[v] == 0) {
                q.push(v);
            }
        }
    }

    // 5. Check for cycles
    if (count != V) {
        ???
    }
}`,
  options: [
    "in_degree[v]++;",
    "q.push(i);",
    "in_degree[v]--;",
    "cout << \"Cycle Detected\";"
  ],
  solution: [
    "in_degree[v]++;",
    "q.push(i);",
    "in_degree[v]--;",
    "cout << \"Cycle Detected\";"
  ],
  explanation: "1. We first compute the in-degree of each vertex by incrementing `in_degree[v]` for every edge `u -> v`.\n2. All vertices with 0 in-degree are pushed into the queue (`q.push(i)`).\n3. For each dequeued vertex, we decrement the in-degree of its adjacent vertices (`in_degree[v]--`).\n4. If the number of processed vertices is not equal to V, it implies the queue became empty prematurely due to a cycle."
};

export const graphTopologicalComplete = {
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
