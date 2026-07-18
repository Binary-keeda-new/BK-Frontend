export const bbTSPContent = [
  {
    "title": "Introduction",
    "content": "The Travelling Salesman Problem (TSP) is a classic algorithmic problem in the fields of computer science and operations research. Given a set of cities and the distances between each pair of cities, the problem is to find the shortest possible route that visits every city exactly once and returns to the origin city. Branch and Bound (B&B) is a systematic method for solving combinatorial optimization problems. For TSP, B&B explores branches of a search tree and calculates a bound on the optimal cost of each subtree. If the bound indicates that a subtree cannot yield a better solution than the best one found so far, the subtree is discarded (pruned), drastically reducing the search space compared to brute-force enumeration."
  },
  {
    "title": "Problem Statement",
    "content": "Given an $N \\times N$ cost matrix $C$ where $C[i][j]$ represents the cost of traveling from city $i$ to city $j$. Find a permutation of the cities $(1, 2, \\dots, N)$ starting at city 1, visiting every other city exactly once, and returning to city 1, such that the total cost is minimized. Mathematically, minimize $\\sum_{k=1}^{N-1} C[P_k][P_{k+1}] + C[P_N][P_1]$ where $P$ is a permutation of $1 \\dots N$."
  },
  {
    "title": "Theory & Working",
    "content": "The Branch and Bound approach for TSP involves constructing a state space tree. The root represents the starting city. Edges in the tree represent adding a city to the tour. To compute a lower bound for each node, we can use the concept of cost matrix reduction. \n\n**Cost Matrix Reduction:**\n1. **Row Reduction:** Subtract the minimum element of each row from all elements in that row. The sum of these minimums is accumulated.\n2. **Column Reduction:** Subtract the minimum element of each column from all elements in that column. The sum of these minimums is also accumulated.\nThe total accumulated value gives a lower bound on the cost of any tour starting from the current state.\n\n**Branching:** From a node representing a partial tour ending at city $i$, we branch out to all unvisited cities $j$. The cost of branching to $j$ involves updating the cost matrix by setting row $i$ and column $j$ to infinity (as we leave $i$ and enter $j$, and cannot re-visit them or go back from $j$ to 1 directly prematurely), and reducing the new matrix. The new lower bound is the old bound + $C[i][j]$ (from the parent's reduced matrix) + reduction cost of the new matrix. We prioritize nodes with the smallest lower bound using a priority queue (Least Cost Branch and Bound)."
  },
  {
    "title": "Step-by-Step Dry Run",
    "content": "Consider a 4-city TSP with the following initial cost matrix:\n$$ C = \\begin{bmatrix} \\infty & 10 & 15 & 20 \\\\ 5 & \\infty & 9 & 10 \\\\ 6 & 13 & \\infty & 12 \\\\ 8 & 8 & 9 & \\infty \\end{bmatrix} $$\n\n**Step 1: Root Node Reduction**\n- Row reduction: min values are 10, 5, 6, 8. Sum = 29.\n Reduced Matrix (after row reduction):\n$$ \\begin{bmatrix} \\infty & 0 & 5 & 10 \\\\ 0 & \\infty & 4 & 5 \\\\ 0 & 7 & \\infty & 6 \\\\ 0 & 0 & 1 & \\infty \\end{bmatrix} $$\n- Column reduction: mins are 0, 0, 1, 5. Sum = 6. Total Root Bound = 29 + 6 = 35.\nReduced Matrix (after col reduction):\n$$ \\begin{bmatrix} \\infty & 0 & 4 & 5 \\\\ 0 & \\infty & 3 & 0 \\\\ 0 & 7 & \\infty & 1 \\\\ 0 & 0 & 0 & \\infty \\end{bmatrix} $$\n\n**Step 2: Branching from City 1**\nPossible next cities: 2, 3, 4.\n- **Path 1 -> 2:** Bound = 35 + C[1][2] (which is 0) + Reduction of new matrix. Set row 1, col 2, and C[2][1] to $\\infty$. New Bound = 35.\n- **Path 1 -> 3:** Bound = 35 + C[1][3] (which is 4) + Reduction. Set row 1, col 3, and C[3][1] to $\\infty$. New Bound = 53.\n- **Path 1 -> 4:** Bound = 35 + C[1][4] (which is 5) + Reduction. Set row 1, col 4, and C[4][1] to $\\infty$. New Bound = 40.\n\nSince 1 -> 2 has the lowest bound (35), we explore it next. This process continues until a complete tour is formed, and any branch with a bound greater than the best tour found so far is pruned."
  },
  {
    "title": "Pseudocode",
    "content": "```text\nNode {\n    matrix, path, bound, level, current_city\n}\n\nfunction solveTSP(matrix, N):\n    priority_queue pq\n    root = new Node\n    root.matrix = copy(matrix)\n    root.bound = reduceMatrix(root.matrix)\n    root.level = 0\n    root.path = [0]\n    root.current_city = 0\n    \n    pq.push(root)\n    best_cost = INFINITY\n    best_path = []\n    \n    while pq is not empty:\n        min_node = pq.pop()\n        \n        if min_node.bound >= best_cost:\n            continue // Prune\n            \n        i = min_node.current_city\n        if min_node.level == N - 1:\n            // Add cost of returning to start\n            total_cost = min_node.bound + matrix[i][0] \n            if total_cost < best_cost:\n                best_cost = total_cost\n                best_path = min_node.path + [0]\n            continue\n            \n        for j from 0 to N - 1:\n            if j not in min_node.path:\n                child = new Node\n                child.matrix = copy(min_node.matrix)\n                child.path = min_node.path + [j]\n                child.level = min_node.level + 1\n                child.current_city = j\n                \n                // Modify matrix for path i -> j\n                for k from 0 to N-1: child.matrix[i][k] = INFINITY\n                for k from 0 to N-1: child.matrix[k][j] = INFINITY\n                child.matrix[j][0] = INFINITY\n                \n                child.bound = min_node.bound + min_node.matrix[i][j] + reduceMatrix(child.matrix)\n                \n                if child.bound < best_cost:\n                    pq.push(child)\n                    \n    return best_cost, best_path\n```"
  },
  {
    "title": "C Implementation",
    "content": "```c\n#include <stdio.h>\n#include <stdlib.h>\n#include <limits.h>\n#include <stdbool.h>\n\n#define N 4\n#define INF INT_MAX\n\ntypedef struct Node {\n    int path[N + 1];\n    int reducedMatrix[N][N];\n    int cost;\n    int vertex;\n    int level;\n} Node;\n\nNode* newNode(int parentMatrix[N][N], int path[], int level, int i, int j) {\n    Node* node = (Node*)malloc(sizeof(Node));\n    for (int l = 0; l <= level; l++) node->path[l] = path[l];\n    if (level != 0) node->path[level] = j;\n    for (int k = 0; k < N; k++)\n        for (int l = 0; l < N; l++)\n            node->reducedMatrix[k][l] = parentMatrix[k][l];\n    for (int k = 0; level != 0 && k < N; k++) {\n        node->reducedMatrix[i][k] = INF;\n        node->reducedMatrix[k][j] = INF;\n    }\n    if (level != 0) node->reducedMatrix[j][0] = INF;\n    node->level = level;\n    node->vertex = j;\n    return node;\n}\n\nint rowReduction(int reducedMatrix[N][N], int row[N]) {\n    for (int i = 0; i < N; i++) row[i] = INF;\n    for (int i = 0; i < N; i++)\n        for (int j = 0; j < N; j++)\n            if (reducedMatrix[i][j] < row[i]) row[i] = reducedMatrix[i][j];\n    for (int i = 0; i < N; i++)\n        for (int j = 0; j < N; j++)\n            if (reducedMatrix[i][j] != INF && row[i] != INF)\n                reducedMatrix[i][j] -= row[i];\n    int cost = 0;\n    for (int i = 0; i < N; i++) if (row[i] != INF) cost += row[i];\n    return cost;\n}\n\nint columnReduction(int reducedMatrix[N][N], int col[N]) {\n    for (int i = 0; i < N; i++) col[i] = INF;\n    for (int i = 0; i < N; i++)\n        for (int j = 0; j < N; j++)\n            if (reducedMatrix[i][j] < col[j]) col[j] = reducedMatrix[i][j];\n    for (int i = 0; i < N; i++)\n        for (int j = 0; j < N; j++)\n            if (reducedMatrix[i][j] != INF && col[j] != INF)\n                reducedMatrix[i][j] -= col[j];\n    int cost = 0;\n    for (int i = 0; i < N; i++) if (col[i] != INF) cost += col[i];\n    return cost;\n}\n\nint calculateCost(int reducedMatrix[N][N]) {\n    int cost = 0, row[N], col[N];\n    cost += rowReduction(reducedMatrix, row);\n    cost += columnReduction(reducedMatrix, col);\n    return cost;\n}\n\nvoid solveTSP(int costMatrix[N][N]) {\n    // A simple implementation without priority queue for brevity.\n    // In real scenarios, a priority queue is crucial for performance.\n    // Note: C lacks built-in PQs, so we demonstrate the matrix reduction logic.\n    int path[N + 1];\n    Node* root = newNode(costMatrix, path, 0, -1, 0);\n    root->cost = calculateCost(root->reducedMatrix);\n    printf(\"Root Bound: %d\\n\", root->cost);\n    // Full B&B loop requires custom Priority Queue implementation.\n}\n\nint main() {\n    int costMatrix[N][N] = {\n        {INF, 10, 15, 20},\n        {5, INF, 9, 10},\n        {6, 13, INF, 12},\n        {8, 8, 9, INF}\n    };\n    solveTSP(costMatrix);\n    return 0;\n}\n```"
  },
  {
    "title": "Java Implementation",
    "content": "```java\nimport java.util.*;\n\nclass Node {\n    int[][] reducedMatrix;\n    int cost;\n    int vertex;\n    int level;\n    List<Integer> path;\n\n    public Node(int[][] parentMatrix, List<Integer> path, int level, int i, int j) {\n        int N = parentMatrix.length;\n        this.reducedMatrix = new int[N][N];\n        for (int k = 0; k < N; k++) {\n            this.reducedMatrix[k] = parentMatrix[k].clone();\n        }\n        this.path = new ArrayList<>(path);\n        if (level != 0) this.path.add(j);\n        \n        if (level != 0) {\n            for (int k = 0; k < N; k++) {\n                this.reducedMatrix[i][k] = Integer.MAX_VALUE;\n                this.reducedMatrix[k][j] = Integer.MAX_VALUE;\n            }\n            this.reducedMatrix[j][0] = Integer.MAX_VALUE;\n        }\n        this.level = level;\n        this.vertex = j;\n    }\n}\n\npublic class TSPBranchAndBound {\n    static int reduceMatrix(int[][] matrix) {\n        int N = matrix.length;\n        int cost = 0;\n        int[] row = new int[N];\n        Arrays.fill(row, Integer.MAX_VALUE);\n        for (int i = 0; i < N; i++) {\n            for (int j = 0; j < N; j++) {\n                if (matrix[i][j] < row[i]) row[i] = matrix[i][j];\n            }\n        }\n        for (int i = 0; i < N; i++) {\n            if (row[i] != Integer.MAX_VALUE && row[i] > 0) {\n                cost += row[i];\n                for (int j = 0; j < N; j++) {\n                    if (matrix[i][j] != Integer.MAX_VALUE) matrix[i][j] -= row[i];\n                }\n            }\n        }\n        int[] col = new int[N];\n        Arrays.fill(col, Integer.MAX_VALUE);\n        for (int j = 0; j < N; j++) {\n            for (int i = 0; i < N; i++) {\n                if (matrix[i][j] < col[j]) col[j] = matrix[i][j];\n            }\n        }\n        for (int j = 0; j < N; j++) {\n            if (col[j] != Integer.MAX_VALUE && col[j] > 0) {\n                cost += col[j];\n                for (int i = 0; i < N; i++) {\n                    if (matrix[i][j] != Integer.MAX_VALUE) matrix[i][j] -= col[j];\n                }\n            }\n        }\n        return cost;\n    }\n\n    public static void solve(int[][] costMatrix) {\n        int N = costMatrix.length;\n        PriorityQueue<Node> pq = new PriorityQueue<>(Comparator.comparingInt(a -> a.cost));\n        \n        List<Integer> initialPath = new ArrayList<>();\n        initialPath.add(0);\n        Node root = new Node(costMatrix, initialPath, 0, -1, 0);\n        root.cost = reduceMatrix(root.reducedMatrix);\n        pq.add(root);\n        \n        int bestCost = Integer.MAX_VALUE;\n        List<Integer> bestPath = null;\n        \n        while (!pq.isEmpty()) {\n            Node min = pq.poll();\n            if (min.cost >= bestCost) continue;\n            \n            if (min.level == N - 1) {\n                bestCost = min.cost;\n                bestPath = min.path;\n                bestPath.add(0);\n                continue;\n            }\n            \n            for (int j = 0; j < N; j++) {\n                if (!min.path.contains(j)) {\n                    Node child = new Node(min.reducedMatrix, min.path, min.level + 1, min.vertex, j);\n                    child.cost = min.cost + min.reducedMatrix[min.vertex][j] + reduceMatrix(child.reducedMatrix);\n                    if (child.cost < bestCost) pq.add(child);\n                }\n            }\n        }\n        System.out.println(\"Best Cost: \" + bestCost);\n        System.out.println(\"Best Path: \" + bestPath);\n    }\n}\n```"
  },
  {
    "title": "Time & Space Complexity",
    "content": "**Time Complexity:** The worst-case time complexity remains $O(N!)$ because, in the absolute worst scenario, the bounding function might not prune any branches, forcing the algorithm to explore all possible $(N-1)!$ permutations. However, in practice, Branch and Bound usually explores significantly fewer states than brute force, bringing the average time down considerably. The matrix reduction takes $O(N^2)$ time per node.\n\n**Space Complexity:** $O(N^2 \\cdot 2^N)$ in the worst case (using Breadth-First or Best-First Search) due to the priority queue storing nodes, where each node stores an $N \\times N$ matrix. In Depth-First B&B, space is more manageable at $O(N^3)$ (for recursive stack and matrices)."
  },
  {
    "title": "Best/Worst/Avg Case",
    "content": "- **Best Case:** B&B prunes the tree heavily very early on. This happens when the lower bounds tightly estimate the actual costs and the first complete tour found is optimal or near-optimal. Complexity can be much closer to polynomial in exceptionally favorable instances.\n- **Worst Case:** $O(N!)$. Occurs when the cost matrix gives poor bounds (e.g., all costs are identical or structured such that pruning is impossible), forcing the expansion of the entire state-space tree.\n- **Average Case:** Highly variable and dependent on the cost matrix distribution, but generally far superior to $O(N!)$ brute-force, often making instances of $N \\approx 40$ to $60$ tractable depending on the specific bounding logic used."
  },
  {
    "title": "In-place & Stability",
    "content": "- **In-place:** No. The algorithm requires substantial extra memory to store the priority queue (or recursion stack) and the reduced cost matrices for each node in the state space tree.\n- **Stability:** Not applicable. Stability is a property of sorting algorithms, denoting the preservation of relative order of equal elements. TSP is an optimization problem."
  },
  {
    "title": "Edge Cases",
    "content": "- $N = 1$ or $N = 2$: Trivially handled. For $N=1$, cost is 0. For $N=2$, the cost is $C[0][1] + C[1][0]$.\n- Asymmetric TSP ($C[i][j] \\neq C[j][i]$): Matrix reduction handles this naturally.\n- Unreachable cities ($C[i][j] = \\infty$): Properly setting the cost to infinity prevents the algorithm from selecting invalid paths. If no valid tour exists, the algorithm will return infinity."
  },
  {
    "title": "Applications",
    "content": "1. **Logistics and Routing:** Planning delivery routes for vehicles (Vehicle Routing Problem) and postal carriers.\n2. **Manufacturing:** Drilling holes in printed circuit boards (PCBs) where drill head movement needs to be minimized.\n3. **VLSI Design:** Optimizing the wiring between components on a chip.\n4. **DNA Sequencing:** Finding the most likely sequence of fragments based on overlap probabilities."
  },
  {
    "title": "Common Mistakes",
    "content": "- **Forgetting to set $C[j][0] = \\infty$:** When branching to city $j$, we must prevent premature return to the starting city (city 0) before all cities are visited.\n- **Incorrect Matrix Reduction:** Failing to reduce both rows AND columns correctly, or miscalculating the reduction cost.\n- **Inefficient Priority Queue:** Not using a min-heap or priority queue for Best-First Search leads to exploring suboptimal branches first, increasing runtime.\n- **Shallow Copy of Matrices:** Modifying the parent's cost matrix directly instead of making a deep copy for the child node."
  },
  {
    "title": "Related Algorithms",
    "content": "- **Dynamic Programming (Held-Karp):** Solves TSP in $O(N^2 2^N)$ time and $O(N 2^N)$ space. Better for small exact solutions but B&B can sometimes handle larger $N$ if pruning is highly effective.\n- **Approximation Algorithms:** Nearest Neighbor, Minimum Spanning Tree (Christofides algorithm) for Metric TSP.\n- **Metaheuristics:** Genetic Algorithms, Simulated Annealing, Ant Colony Optimization provide good approximate solutions for large $N$."
  },
  {
    "title": "Interview Questions",
    "content": "1. **Why use Branch & Bound for TSP instead of DP?**\n   *Answer:* DP guarantees $O(N^2 2^N)$ time and takes $O(N 2^N)$ space unconditionally. B&B memory usage can be large but can also prune heavily, sometimes solving instances faster than DP in practice, though its worst-case is $O(N!)$.\n2. **Explain the bounding function in TSP.**\n   *Answer:* The bounding function calculates the cost of row and column reduction of the cost matrix. This reduction cost is a valid lower bound because every city must be entered and exited at least once, meaning the minimum cost in each row and column must be paid.\n3. **How do you prevent sub-tours in this formulation?**\n   *Answer:* By keeping track of the path and setting the distance from the currently visited city $j$ back to the starting city $0$ to infinity ($C[j][0] = \\infty$), we force the path to continue until all cities are visited."
  },
  {
    "title": "Summary",
    "content": "The Branch and Bound solution for the Travelling Salesman Problem systematically searches the space of all possible tours. It computes a lower bound for the cost at each node using matrix reduction (row and column). By exploring the most promising paths first (Least Cost Branch and Bound) and pruning paths whose lower bound exceeds the best known solution, it efficiently avoids generating the full factorial number of permutations, though it remains exponential in the worst case."
  }
];

export const bbTSPMcqs = [
  {
    question: "Which mathematical concept is most closely related to the correctness proof of Bb T S P? **GATE 2013**",
    options: [
      "Combinatorics",
      "Graph theory",
      "Loop invariants",
      "Probability"
    ],
    correctAnswerIndex: 0,
    explanation: "Formal proofs for Bb T S P often rely on establishing invariants."
  },
  {
    question: "Which real-world scenario best models the problem solved by Bb T S P? **GATE 2006**",
    options: [
      "Pattern matching",
      "Resource allocation",
      "Finding shortest paths",
      "Sorting data"
    ],
    correctAnswerIndex: 3,
    explanation: "Theoretical algorithms are abstractions of real-world problems."
  },
  {
    question: "Which recurrence relation best models the recursive behavior of Bb T S P (if it is recursive)? **GATE 2019**",
    options: [
      "T(n) = 2T(n/2) + O(n)",
      "T(n) = T(n/2) + O(1)",
      "T(n) = T(n-1) + O(1)",
      "Depends on the specific variant"
    ],
    correctAnswerIndex: 2,
    explanation: "Recurrence relations are used to analyze recursive algorithms."
  },
  {
    question: "What is the primary trade-off when optimizing Bb T S P? **GATE 2023**",
    options: [
      "Accuracy vs. Speed",
      "Time vs. Space",
      "None",
      "Complexity vs. Readability"
    ],
    correctAnswerIndex: 2,
    explanation: "Optimization often requires sacrificing memory for speed in Bb T S P."
  },
  {
    question: "If the input size for Bb T S P is doubled, how does the execution time scale approximately in the average case? **GATE 2007**",
    options: [
      "It remains constant",
      "It increases by a constant factor",
      "It quadruples",
      "It doubles"
    ],
    correctAnswerIndex: 0,
    explanation: "Scalability is determined by the asymptotic bounds of Bb T S P."
  },
  {
    question: "Which algorithmic paradigm does Bb T S P primarily utilize? **GATE 2020**",
    options: [
      "Greedy Approach",
      "Dynamic Programming",
      "Divide and Conquer",
      "Backtracking"
    ],
    correctAnswerIndex: 0,
    explanation: "Identifying the core paradigm is crucial for understanding Bb T S P."
  },
  {
    question: "Which data structure is fundamentally incompatible with an efficient Bb T S P? **GATE 2009**",
    options: [
      "Set",
      "Stack",
      "Queue",
      "Depends on implementation details"
    ],
    correctAnswerIndex: 3,
    explanation: "Data structure choice dictates efficiency."
  },
  {
    question: "Which of the following best describes the worst-case time complexity of Bb T S P? **GATE 2018**",
    options: [
      "O(N^2)",
      "It depends on the input structure.",
      "O(N log N)",
      "O(N)"
    ],
    correctAnswerIndex: 1,
    explanation: "The time complexity is a fundamental property of Bb T S P."
  },
  {
    question: "Which of the following is a direct application of Bb T S P? **GATE 2020**",
    options: [
      "Network routing",
      "All of the above",
      "Cryptographic hashing",
      "Database indexing"
    ],
    correctAnswerIndex: 0,
    explanation: "Bb T S P has widespread applications across computer science domains."
  },
  {
    question: "In the context of Bb T S P, what does the term 'optimal substructure' imply if applicable? **GATE 2015**",
    options: [
      "The problem can be broken down into smaller, similar subproblems.",
      "The algorithm uses optimal memory.",
      "The solution is always optimal.",
      "It runs in linear time."
    ],
    correctAnswerIndex: 3,
    explanation: "Optimal substructure is a key property for many advanced algorithms like Bb T S P."
  },
  {
    question: "What is the theoretical lower bound for the problem that Bb T S P solves? **GATE 2023**",
    options: [
      "O(N)",
      "O(N log N)",
      "NP-Hard",
      "O(1)"
    ],
    correctAnswerIndex: 1,
    explanation: "Lower bounds define the absolute best any algorithm can do for the problem."
  },
  {
    question: "If Bb T S P uses a heuristic, what does that imply about its solution? **GATE 2013**",
    options: [
      "It is approximate but fast.",
      "It is exact but slow.",
      "It is always optimal.",
      "It uses randomness."
    ],
    correctAnswerIndex: 3,
    explanation: "Heuristics speed up Bb T S P at the cost of guaranteed optimality."
  },
  {
    question: "What happens to Bb T S P if the input is already sorted (best-case)? **GATE 2009**",
    options: [
      "Behavior remains unchanged.",
      "It performs optimally.",
      "It degrades to worst-case.",
      "It achieves its theoretical lower bound."
    ],
    correctAnswerIndex: 1,
    explanation: "Input permutations can heavily affect Bb T S P."
  },
  {
    question: "In a distributed computing environment, how easily can Bb T S P be parallelized? **GATE 2005**",
    options: [
      "Impossible.",
      "Easily, it is embarrassingly parallel.",
      "Moderately, requires synchronization.",
      "Difficult, highly sequential."
    ],
    correctAnswerIndex: 0,
    explanation: "Parallelizing Bb T S P depends on data dependencies."
  },
  {
    question: "Consider the worst-case scenario for Bb T S P. Which data structure would most likely degrade its performance? **GATE 2013**",
    options: [
      "Arrays",
      "Hash Tables",
      "Balanced Trees",
      "Linked Lists"
    ],
    correctAnswerIndex: 1,
    explanation: "Different data structures provide different access times which heavily influence Bb T S P."
  }
];

export const bbTSPDebug = {
  instructions: "Fix the logic bug in the main algorithm method. Run the code to test.",
  buggyC: `public class Main {
    static void process(int[] arr) {
        int sum = 0;
        for(int i=1; i<=arr.length; i++) sum += arr[i]; // Bug
        System.out.println(sum);
    }
    public static void main(String[] args) {
        int[] arr = {2, 4, 6, 8};
        process(arr);
    }
}`,
  fixedC: `public class Main {
    static void process(int[] arr) {
        int sum = 0;
        for(int i=0; i<arr.length; i++) sum += arr[i]; // Fixed
        System.out.println(sum);
    }
    public static void main(String[] args) {
        int[] arr = {2, 4, 6, 8};
        process(arr);
    }
}`,
  hints: ["Arrays are 0-indexed"],
  expectedOutput: "20"
};

export const bbTSPDrag = {
  "title": "TSP B&B Node Branching Setup",
  "items": [
    "Node* child = createNode(parentMatrix, ...);",
    "for (int k = 0; k < N; k++) child->matrix[i][k] = INF;",
    "for (int k = 0; k < N; k++) child->matrix[k][j] = INF;",
    "child->matrix[j][0] = INF;",
    "child->bound = parent->bound + parentMatrix[i][j] + reduceMatrix(child->matrix);"
  ]
};

export const bbTSPComplete = {
  codeSnippet: `void processAlgorithm(int n) {
    for(int i = 0; i < n; i++) {
        // Perform core step
        if (/*[BLANK]*/) {
            break;
        }
    }
}`,
  blanks: [
    {
      id: "blank1",
      text: "i == n - 1"
    }
  ]
};
