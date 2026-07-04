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
    question: "Which of the following data structures is typically used in the implementation of Kahn's Algorithm for Topological Sorting?",
    options: ["Stack", "Queue", "Priority Queue", "Min Heap"],
    correctAnswer: 1,
    explanation: "Kahn's algorithm uses a Queue to keep track of all vertices that have an in-degree of 0."
  },
  {
    question: "A Depth-First Search based topological sort utilizes which of the following mechanisms to build the sort?",
    options: ["Pre-order traversal recording", "Post-order traversal recording with a stack", "Level-order traversal", "In-order traversal"],
    correctAnswer: 1,
    explanation: "In DFS-based topological sorting, a node is pushed onto a stack only after all its adjacent nodes have been visited (post-order). Popping the stack gives the topological order."
  },
  {
    question: "Under what condition is topological sorting possible for a given graph?",
    options: ["The graph must be a Directed Acyclic Graph (DAG)", "The graph must be an undirected graph", "The graph must be a complete graph", "The graph must contain at least one cycle"],
    correctAnswer: 0,
    explanation: "Topological sorting is only possible for Directed Acyclic Graphs (DAGs). If there is a cycle, no valid linear ordering can satisfy all dependency constraints."
  },
  {
    question: "What happens in Kahn's algorithm if the input graph contains a cycle?",
    options: ["The algorithm will loop infinitely.", "The queue will eventually become empty before all vertices are processed.", "The queue will process all vertices but produce an incorrect order.", "The algorithm will crash due to a stack overflow."],
    correctAnswer: 1,
    explanation: "If there's a cycle, the vertices in the cycle will never reach an in-degree of 0. Thus, they will never be pushed to the queue, and the algorithm will terminate with the count of processed vertices strictly less than V."
  },
  {
    question: "What is the time complexity of finding a topological sort of a graph with V vertices and E edges using adjacency lists?",
    options: ["O(V * E)", "O(V + E)", "O(V^2)", "O(V log E)"],
    correctAnswer: 1,
    explanation: "Both Kahn's and DFS algorithms visit each vertex once and traverse each edge once, leading to a linear time complexity of O(V + E) for adjacency list representations."
  },
  {
    question: "Which of the following best describes the uniqueness of a topological sort for a given DAG?",
    options: ["Every DAG has exactly one unique topological sort.", "A DAG has a unique topological sort if and only if it has a Hamiltonian path.", "A topological sort is unique only if the graph has no edges.", "A topological sort is always unique if the DAG has a single source vertex."],
    correctAnswer: 1,
    explanation: "A DAG has a unique topological ordering if and only if there is a directed path containing all the vertices (a Hamiltonian path). Otherwise, there are multiple valid orderings."
  },
  {
    question: "Consider a DAG with vertices {1, 2, 3, 4} and directed edges {(1,2), (2,3), (1,3), (3,4)}. Which of the following is a valid topological sort?",
    options: ["1, 3, 2, 4", "1, 2, 3, 4", "1, 2, 4, 3", "4, 3, 2, 1"],
    correctAnswer: 1,
    explanation: "Edges are 1->2, 2->3, 1->3, 3->4. 1 must come before 2 and 3. 2 must come before 3. 3 must come before 4. The only valid order is 1, 2, 3, 4."
  },
  {
    question: "During Kahn's algorithm, what does an in-degree of 0 signify for a vertex?",
    options: ["The vertex has no outgoing edges.", "The vertex has no incoming edges, meaning it has no prerequisites.", "The vertex is disconnected from the rest of the graph.", "The vertex is part of a cycle."],
    correctAnswer: 1,
    explanation: "An in-degree of 0 means no other vertex must come before it. Therefore, its prerequisites are satisfied, and it can be placed in the topological order."
  },
  {
    question: "In a dependency graph, if file A must be compiled before file B, how should the edge be directed for topological sorting?",
    options: ["A -> B", "B -> A", "Undirected edge between A and B", "Two directed edges: A -> B and B -> A"],
    correctAnswer: 0,
    explanation: "The edge should go from prerequisite to dependent (A -> B). Topological sort ensures A comes before B."
  },
  {
    question: "Which algorithmic paradigm is typically associated with Kahn's Algorithm for Topological Sort?",
    options: ["Divide and Conquer", "Dynamic Programming", "Greedy Method", "Decrease and Conquer / Graph Traversal"],
    correctAnswer: 3,
    explanation: "Kahn's algorithm operates by continually removing vertices with an in-degree of zero and their outgoing edges, which is a graph traversal and decrease-and-conquer approach."
  },
  {
    question: "If a given graph has N disconnected components, each being a DAG, can topological sort still be applied?",
    options: ["No, it requires the graph to be strongly connected.", "No, it requires the graph to be weakly connected.", "Yes, it can be applied and will process components independently.", "Yes, but only Kahn's algorithm works, not DFS."],
    correctAnswer: 2,
    explanation: "Both DFS and Kahn's algorithm can handle disconnected DAGs by ensuring the outer loop visits every unvisited vertex/initially checks in-degrees of all vertices."
  },
  {
    question: "When finding the lexicographically smallest topological sort, what data structure should replace the standard Queue in Kahn's algorithm?",
    options: ["Stack", "Min-Priority Queue", "Max-Priority Queue", "Deque"],
    correctAnswer: 1,
    explanation: "To get the lexicographically smallest order, at any step where multiple vertices have 0 in-degree, we should pick the smallest one. A Min-Priority Queue efficiently achieves this."
  }
];

export const graphTopologicalDebug = {
  instructions: "Fix the syntax error so the code compiles correctly.",
  buggyC: "#include <stdio.h>\n\nint main() {\n    printf(\"Hello World\")\n    return 0;\n}",
  fixedC: "#include <stdio.h>\n\nint main() {\n    printf(\"Hello World\\n\");\n    return 0;\n}",
  buggyJava: "public class Main {\n    public static void main(String[] args) {\n        System.out.printl(\"Hello World\");\n    }\n}",
  fixedJava: "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello World\");\n    }\n}",
  hints: ["Check the print statement.","Missing semicolon or wrong spelling?","Fix it!"],
  expectedOutput: "Hello World"
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
  problem: "Implement the helper function for Depth-First Search based Topological Sort. Fill in the missing statements so that nodes are pushed onto the stack after all their descendants are visited.",
  initialCode: `void dfsTopological(int u, vector<int> adj[], vector<bool>& visited, stack<int>& st) {
    // 1. Mark current node as visited
    visited[u] = true;

    // 2. Recurse for all unvisited neighbors
    for (int v : adj[u]) {
        if (!visited[v]) {
            // Recursive call
            ${1}
        }
    }

    // 3. Push current node to stack after visiting all neighbors
    ${2}
}`,
  solution: [
    "dfsTopological(v, adj, visited, st);",
    "st.push(u);"
  ],
  blankExplanation: "1. Inside the loop, we make a recursive call `dfsTopological(v, adj, visited, st);` to explore the neighbor `v` completely before moving on.\n2. Once the loop ends, meaning all reachable descendants from `u` are processed, we add `u` to the sort order by pushing it to the stack: `st.push(u);`."
};
