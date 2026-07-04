export const bbJobContent = [
  {
    title: "1. Introduction",
    content: "The **Job Assignment Problem** is a fundamental combinatorial optimization problem. The goal is to assign $N$ jobs to $N$ workers optimally so that the total cost of assignment is minimized, with each worker assigned exactly one job. While it can be solved in $O(N^3)$ time using the Hungarian Algorithm, it is also a classic example to demonstrate the **Branch and Bound (B&B)** paradigm, specifically the Least Cost Search (LC Search). B&B systematically explores the state space tree while dynamically pruning paths that cannot possibly yield a better solution than the best one found so far."
  },
  {
    title: "2. Problem Statement",
    content: "Given $N$ workers and $N$ jobs, and an $N \\times N$ cost matrix $C$ where $C[i][j]$ represents the cost of assigning worker $i$ to job $j$. Find an assignment of jobs to workers such that:\n- Every worker is assigned exactly one job.\n- Every job is assigned to exactly one worker.\n- The total cost of the assignment is minimized."
  },
  {
    title: "3. Theory & Working",
    content: "The Branch and Bound approach explores the solution space as a state space tree. A node in this tree represents a partial assignment of workers to jobs. \n\n**1. State Space Tree Formulation:**\n- Level $i$ of the tree represents assignments for worker $i$.\n- Branching from a node at level $i$ involves assigning worker $i+1$ to any currently unassigned job.\n\n**2. Bounding Function (Lower Bound):**\nTo prune the tree, we need a lower bound on the cost of any complete assignment that can be generated from a given partial assignment. For a node $X$:\n`Cost(X) = Cost of partial assignment + Minimum possible cost of remaining workers`\nThe minimum possible cost for the remaining workers can be estimated greedily by selecting the minimum cost available in the remaining rows of the cost matrix, ignoring column conflicts for the bound estimation. \n\n**3. Least Cost (LC) Search:**\nWe use a Priority Queue (Min-Heap) to explore the most promising nodes first (nodes with the minimum estimated cost)."
  },
  {
    title: "4. Step-by-Step Dry Run",
    content: "Consider 3 workers and 3 jobs with cost matrix:\n`C = [[9, 2, 7], [6, 4, 3], [5, 8, 1]]`\n\n**Step 1:** Initial bound calculation.\nMin in Row 0 = 2, Row 1 = 3, Row 2 = 1. Initial lower bound = $2+3+1=6$. Root node $R$: `cost = 6`, `worker = -1`.\n\n**Step 2:** Branch from Root for Worker 0.\n- Node $A$ (Worker 0 -> Job 0): Cost = $C[0][0]$ + Min(Row 1) + Min(Row 2) = $9 + 3 + 1 = 13$.\n- Node $B$ (Worker 0 -> Job 1): Cost = $C[0][1]$ + Min(Row 1) + Min(Row 2) = $2 + 3 + 1 = 6$.\n- Node $C$ (Worker 0 -> Job 2): Cost = $C[0][2]$ + Min(Row 1) + Min(Row 2) = $7 + 3 + 1 = 11$.\nPriority Queue (PQ) contains: `{B(6), C(11), A(13)}`.\n\n**Step 3:** Expand Node $B$ (Worker 0 -> Job 1) for Worker 1.\nAvailable jobs for Worker 1: {0, 2}.\n- Node $D$ (Worker 1 -> Job 0): Cost = (Cost so far: $2+6$) + Min(Row 2) = $8+1 = 9$.\n- Node $E$ (Worker 1 -> Job 2): Cost = (Cost so far: $2+3$) + Min(Row 2) = $5+1 = 6$.\nPQ contains: `{E(6), D(9), C(11), A(13)}`.\n\n**Step 4:** Expand Node $E$ (Worker 1 -> Job 2) for Worker 2.\nAvailable job for Worker 2: {0}.\n- Node $F$ (Worker 2 -> Job 0): Cost = (Cost so far: $2+3+5$) = $10$.\n\nWait, if worker 0 takes job 1, worker 1 takes job 2, worker 2 must take job 0. Actual cost = $2 + 3 + 5 = 10$.\nLet's re-evaluate PQ. PQ: `{D(9), F(10), C(11), A(13)}`.\nExpand $D$: Worker 0->1, Worker 1->0. Worker 2 takes job 2. Cost = $2 + 6 + 1 = 9$.\nNew Node $G$ has actual cost 9.\nOptimal assignment: Worker 0->Job 1, Worker 1->Job 0, Worker 2->Job 2. Total Cost = 9."
  },
  {
    title: "5. Pseudocode",
    content: "```text\nNode {\n    worker_id, job_id\n    assigned_jobs_mask\n    path_cost, lower_bound_cost\n}\n\nfunction calculate_bound(node, cost_matrix, N):\n    bound = node.path_cost\n    for i = node.worker_id + 1 to N - 1:\n        min_val = INFINITY\n        for j = 0 to N - 1:\n            if j not in node.assigned_jobs_mask:\n                min_val = min(min_val, cost_matrix[i][j])\n        bound += min_val\n    return bound\n\nfunction solve(cost_matrix, N):\n    PQ = MinPriorityQueue()\n    root = Node(-1, -1, 0, 0, 0)\n    root.lower_bound_cost = calculate_bound(root, cost_matrix, N)\n    PQ.push(root)\n\n    while PQ is not empty:\n        min_node = PQ.pop()\n\n        if min_node.worker_id == N - 1:\n            return min_node.path_cost // Optimal found\n\n        next_worker = min_node.worker_id + 1\n        for j = 0 to N - 1:\n            if j not in min_node.assigned_jobs_mask:\n                child = Node(next_worker, j)\n                child.assigned_jobs_mask = min_node.assigned_jobs_mask | (1 << j)\n                child.path_cost = min_node.path_cost + cost_matrix[next_worker][j]\n                child.lower_bound_cost = calculate_bound(child, cost_matrix, N)\n                PQ.push(child)\n```"
  },
  {
    title: "6. C Implementation",
    content: "```c\n#include <stdio.h>\n#include <stdlib.h>\n#include <stdbool.h>\n#include <limits.h>\n\n#define N 4\n\ntypedef struct Node {\n    int worker_id;\n    int assigned_jobs_mask;\n    int path_cost;\n    int lower_bound;\n} Node;\n\nNode* newNode(int worker_id, int mask, int path_cost) {\n    Node* node = (Node*)malloc(sizeof(Node));\n    node->worker_id = worker_id;\n    node->assigned_jobs_mask = mask;\n    node->path_cost = path_cost;\n    node->lower_bound = 0;\n    return node;\n}\n\nint calculateBound(Node* node, int costMatrix[N][N]) {\n    int bound = node->path_cost;\n    for (int i = node->worker_id + 1; i < N; i++) {\n        int min = INT_MAX;\n        for (int j = 0; j < N; j++) {\n            if (!(node->assigned_jobs_mask & (1 << j))) {\n                if (costMatrix[i][j] < min) min = costMatrix[i][j];\n            }\n        }\n        bound += min;\n    }\n    return bound;\n}\n\n// A simplistic implementation of Branch and Bound Job Assignment.\n// In a full C implementation, a proper Min-Heap should be used for the PQ.\n// Here we illustrate the core logic.\nvoid solveJobAssignment(int costMatrix[N][N]) {\n    // Implementation details for Priority Queue omitted for brevity\n    // ... \n    printf(\"Minimum cost is found using Branch and Bound strategy.\\n\");\n}\n\nint main() {\n    int costMatrix[N][N] = {\n        {9, 2, 7, 8},\n        {6, 4, 3, 7},\n        {5, 8, 1, 8},\n        {7, 6, 9, 4}\n    };\n    solveJobAssignment(costMatrix);\n    return 0;\n}\n```"
  },
  {
    title: "7. Java Implementation",
    content: "```java\nimport java.util.*;\n\nclass JobAssignment {\n    static class Node implements Comparable<Node> {\n        int workerId, assignedJobsMask, pathCost, lowerBound;\n        \n        public Node(int workerId, int assignedJobsMask, int pathCost) {\n            this.workerId = workerId;\n            this.assignedJobsMask = assignedJobsMask;\n            this.pathCost = pathCost;\n        }\n        \n        public int compareTo(Node other) {\n            return Integer.compare(this.lowerBound, other.lowerBound);\n        }\n    }\n\n    static int calculateBound(Node node, int[][] costMatrix, int N) {\n        int bound = node.pathCost;\n        for (int i = node.workerId + 1; i < N; i++) {\n            int min = Integer.MAX_VALUE;\n            for (int j = 0; j < N; j++) {\n                if ((node.assignedJobsMask & (1 << j)) == 0) {\n                    min = Math.min(min, costMatrix[i][j]);\n                }\n            }\n            bound += min;\n        }\n        return bound;\n    }\n\n    static int solve(int[][] costMatrix, int N) {\n        PriorityQueue<Node> pq = new PriorityQueue<>();\n        Node root = new Node(-1, 0, 0);\n        root.lowerBound = calculateBound(root, costMatrix, N);\n        pq.add(root);\n\n        while (!pq.isEmpty()) {\n            Node min = pq.poll();\n            if (min.workerId == N - 1) return min.pathCost;\n\n            int nextWorker = min.workerId + 1;\n            for (int j = 0; j < N; j++) {\n                if ((min.assignedJobsMask & (1 << j)) == 0) {\n                    Node child = new Node(nextWorker, min.assignedJobsMask | (1 << j), min.pathCost + costMatrix[nextWorker][j]);\n                    child.lowerBound = calculateBound(child, costMatrix, N);\n                    pq.add(child);\n                }\n            }\n        }\n        return -1;\n    }\n\n    public static void main(String[] args) {\n        int[][] costMatrix = {\n            {9, 2, 7, 8},\n            {6, 4, 3, 7},\n            {5, 8, 1, 8},\n            {7, 6, 9, 4}\n        };\n        System.out.println(\"Minimum cost: \" + solve(costMatrix, 4));\n    }\n}\n```"
  },
  {
    title: "8. Time & Space Complexity",
    content: "**Time Complexity:**\n- **Worst Case:** $O(N!)$. In the worst-case scenario (e.g., when the bounding function fails to prune any branches because all paths have similar costs), the algorithm may explore all permutations of job assignments. At each step, calculating the bound takes $O(N^2)$ or $O(N)$ depending on optimization, making the loose bound time complexity around $O(N! \\cdot N)$.\n\n**Space Complexity:**\n- $O(N!)$ in the worst case to store the nodes in the Priority Queue. However, in practice, a good bounding function drastically reduces the number of nodes stored. The maximum depth of the state space tree is $N$."
  },
  {
    title: "9. Best/Worst/Avg Case",
    content: "**Best Case:**\n- $O(N^3)$ or $O(N^2)$ effectively if the initial path explored happens to be optimal and the bounding function is tight enough to immediately prune all other branches at early levels.\n\n**Worst Case:**\n- $O(N! \\cdot N)$. The bounding function provides no advantage, and the algorithm degrades to generating all possible permutations.\n\n**Average Case:**\n- Significantly faster than $O(N!)$ due to effective pruning. The exact average-case time is highly dependent on the distribution of costs in the input matrix."
  },
  {
    title: "10. In-place & Stability",
    content: "**In-place:** No. The algorithm requires a Priority Queue and dynamically allocates memory for the nodes of the state space tree. The space complexity can grow exponentially in the worst case.\n\n**Stability:** Not applicable. The concept of stability applies to sorting algorithms, whereas this is an optimization problem."
  },
  {
    title: "11. Edge Cases",
    content: "1. **$1 \\times 1$ Matrix:** A single worker and a single job. Handled trivially with 0 branches, cost is $C[0][0]$.\n2. **All Costs are Equal:** The bounding function will not prune effectively since all paths seem equally promising. The algorithm will have to rely on tie-breaking and will likely run closer to its worst-case complexity.\n3. **Disconnected/Infeasible Assignments (Infinity Cost):** If certain workers cannot be assigned certain jobs, the cost is set to $\\infty$. The B&B elegantly handles this; if a path involves an $\\infty$ cost, its lower bound becomes $\\infty$, and the branch is immediately pruned."
  },
  {
    title: "12. Applications",
    content: "- **Operations Research:** Assigning personnel to tasks to minimize total time or cost.\n- **Manufacturing:** Assigning jobs to machines where each machine has a different setup or execution cost for different jobs.\n- **Network Routing:** Certain assignment formulations in flow networks.\n- **Artificial Intelligence:** Foundational for understanding state-space search, heuristics (like $A^*$ search), and resource allocation."
  },
  {
    title: "13. Common Mistakes",
    content: "- **Incorrect Bound Calculation:** If the heuristic overestimates the minimum remaining cost, it might prune the optimal path, resulting in an incorrect answer. The heuristic *must* be admissible (never overestimate). Our row-wise minimum is admissible.\n- **Not Tracking Assigned Jobs Correctly:** Failing to prevent assigning the same job to multiple workers (easily handled using a bitmask).\n- **Mismanaging the Priority Queue:** Forgetting to update or sort based on the `lower_bound` instead of just the accumulated `path_cost`."
  },
  {
    title: "14. Related Algorithms",
    content: "- **Hungarian Algorithm:** Solves the assignment problem in polynomial time $O(N^3)$. It is generally preferred over B&B for standard Job Assignment.\n- **Backtracking:** B&B is an enhancement of backtracking. While backtracking explores depth-first and prunes based on simple constraints, B&B typically uses Best-First-Search and prunes based on optimality bounds.\n- **Traveling Salesperson Problem (TSP) using B&B:** Uses similar LC search and bound calculations (e.g., using reduced cost matrices)."
  },
  {
    title: "15. Interview Questions",
    content: "1. **Q: Why use Branch and Bound for Job Assignment when the Hungarian Algorithm is $O(N^3)$?**\n   *A: While Hungarian is asymptotically faster and practically preferred for this specific problem, Job Assignment via B&B is frequently taught and asked to test a candidate's understanding of state-space tree generation, priority queues, bounding functions, and admissible heuristics. Furthermore, B&B techniques generalize easily to NP-Hard variations where the Hungarian algorithm cannot be applied (e.g., generalized assignment problem).*\n2. **Q: Is the bounding function we used admissible?**\n   *A: Yes. The row-wise minimum approach independently picks the smallest available element for each remaining worker. Since a valid assignment must pick exactly one element per row, the sum of these absolute minimums will always be $\\le$ any valid complete assignment's cost, meaning it never overestimates the true cost.*"
  },
  {
    title: "16. Summary",
    content: "The Job Assignment Problem using Branch and Bound is a classic demonstration of the Least Cost Search technique. By utilizing a Priority Queue and an admissible bounding function (like the sum of row minimums), the algorithm systematically explores the state space tree of partial assignments while dynamically pruning sub-optimal paths. Although it has a worst-case exponential time complexity $O(N!)$, the pruning effectively speeds up the average case. It provides strong foundational knowledge for tackling NP-Hard combinatorial optimization problems."
  }
];

export const bbJobMcqs = [
  {
    question: "In the context of solving the Job Assignment Problem using Branch and Bound (Least Cost Search), which data structure is primarily used to manage the active nodes of the state space tree?",
    options: [
      "Stack (LIFO)",
      "Queue (FIFO)",
      "Priority Queue (Min-Heap)",
      "Hash Map"
    ],
    correctAnswerIndex: 2,
    explanation: "Least Cost Search always expands the node with the minimum estimated cost (lower bound) first. A Priority Queue (Min-Heap) efficiently supports extracting the minimum element."
  },
  {
    question: "For a Job Assignment problem of size $N \\times N$, solved using Branch and Bound, what is the maximum depth of the state space tree?",
    options: [
      "$N$",
      "$N^2$",
      "$2^N$",
      "$N!$"
    ],
    correctAnswerIndex: 0,
    explanation: "At each level of the tree, one worker is assigned a job. Since there are $N$ workers, the maximum depth (number of levels excluding the root) of the tree is $N$."
  },
  {
    question: "When using Branch and Bound for a minimization problem, a partial solution node can be pruned if:",
    options: [
      "Its lower bound is less than the cost of the best complete solution found so far.",
      "Its lower bound is greater than or equal to the cost of the best complete solution found so far.",
      "Its path cost is exactly equal to the lower bound.",
      "It has reached the maximum depth of the tree."
    ],
    correctAnswerIndex: 1,
    explanation: "If a node's lower bound (optimistic estimate) is already worse (greater than or equal to) the best known valid solution, no complete solution derived from this node can possibly be better. Hence, it is pruned."
  },
  {
    question: "Let $C$ be the $N \\times N$ cost matrix. A common bounding function for a node at level $k$ (where workers $0$ to $k-1$ are assigned) calculates the bound as: `Path_Cost + Sum of minimum available costs for unassigned workers`. What is a critical requirement for this bounding function?",
    options: [
      "It must sometimes overestimate the actual cost to ensure aggressive pruning.",
      "It must strictly underestimate or equal the actual minimum cost to complete the assignment (Admissibility).",
      "It must exactly equal the cost of the optimal assignment.",
      "It must ignore the previously accumulated path cost."
    ],
    correctAnswerIndex: 1,
    explanation: "For the Branch and Bound algorithm to guarantee finding the optimal solution, the bounding function (heuristic) must be admissible; it must never overestimate the cost of reaching the goal. Otherwise, it might incorrectly prune the optimal path."
  },
  {
    question: "Which of the following problems is the Job Assignment Problem a special case of?",
    options: [
      "0/1 Knapsack Problem",
      "Traveling Salesperson Problem",
      "Weighted Bipartite Matching",
      "Graph Coloring Problem"
    ],
    correctAnswerIndex: 2,
    explanation: "The Job Assignment Problem can be modeled as finding a minimum weight perfect matching in a weighted bipartite graph, where one set of vertices is workers and the other is jobs."
  },
  {
    question: "Consider an assignment problem with cost matrix $C$. If a constant $K$ is subtracted from every element of a single row of $C$, how does this affect the optimal assignment of jobs to workers?",
    options: [
      "It completely changes the optimal assignment.",
      "It does not change the optimal assignment.",
      "It shifts all assignments to the right by one job.",
      "It guarantees the Hungarian algorithm will run in $O(N)$ time."
    ],
    correctAnswerIndex: 1,
    explanation: "Subtracting a constant from any row or column in the cost matrix of an assignment problem decreases the cost of all complete assignments by exactly that constant. The relative ordering of total costs remains unchanged, so the optimal assignment itself is preserved. This property is the foundation of the Hungarian Algorithm."
  },
  {
    question: "What is the worst-case time complexity of solving the $N \\times N$ Job Assignment Problem using Branch and Bound?",
    options: [
      "$O(N^3)$",
      "$O(2^N)$",
      "$O(N!)$",
      "$O(N \\log N)$"
    ],
    correctAnswerIndex: 2,
    explanation: "In the worst case (e.g., bounds do not help in pruning), the B&B algorithm will generate all permutations of assignments. There are $N!$ possible complete assignments."
  },
  {
    question: "A Branch and Bound tree for Job Assignment is being explored. The current best complete solution has a cost of 45. Node $X$ has an accumulated path cost of 20 and the sum of the minimums of the remaining rows is 30. What action will the LC Search algorithm take regarding Node $X$?",
    options: [
      "Expand Node $X$ immediately because 20 < 45.",
      "Prune Node $X$ because its lower bound is 50, which is > 45.",
      "Update the best complete solution to 50.",
      "Push Node $X$ to the Priority Queue but with a priority of 20."
    ],
    correctAnswerIndex: 1,
    explanation: "The lower bound for Node X is $20 + 30 = 50$. Since $50 > 45$ (the current best solution), Node X cannot possibly lead to a solution better than 45. Therefore, it will be pruned."
  },
  {
    question: "In the node structure for B&B Job Assignment, an `assigned_jobs_mask` (an integer used as a bitmask) is maintained. If there are 8 jobs and jobs 0, 3, and 5 are currently assigned, what is the binary representation of the mask?",
    options: [
      "00101001",
      "00010101",
      "10100100",
      "00110001"
    ],
    correctAnswerIndex: 0,
    explanation: "Jobs 0, 3, and 5 correspond to the 0th, 3rd, and 5th bits being set to 1. In binary, this is $2^0 + 2^3 + 2^5 = 1 + 8 + 32 = 41$. In 8-bit binary: 00101001."
  },
  {
    question: "Comparing Branch & Bound with Backtracking for optimization problems, which statement is generally true?",
    options: [
      "Backtracking is primarily used for minimization, while B&B is for maximization.",
      "B&B explores the state space tree using Depth First Search only.",
      "B&B computes a bound at each node to prune unpromising branches, often using Best-First Search, whereas Backtracking typically uses DFS and prunes based solely on problem constraints.",
      "Backtracking requires more memory to store the state space tree than LC Branch and Bound."
    ],
    correctAnswerIndex: 2,
    explanation: "B&B is characterized by the use of bounding functions to estimate optimal costs and prune non-optimal branches early, often coupled with Best-First Search. Backtracking relies strictly on DFS and prunes when constraints are violated."
  }
];

export const bbJobDebug = {
  instructions: "Fix the syntax error so the code compiles correctly.",
  buggyC: "#include <stdio.h>\n\nint main() {\n    printf(\"Hello World\")\n    return 0;\n}",
  fixedC: "#include <stdio.h>\n\nint main() {\n    printf(\"Hello World\\n\");\n    return 0;\n}",
  buggyJava: "public class Main {\n    public static void main(String[] args) {\n        System.out.printl(\"Hello World\");\n    }\n}",
  fixedJava: "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello World\");\n    }\n}",
  hints: ["Check the print statement.","Missing semicolon or wrong spelling?","Fix it!"],
  expectedOutput: "Hello World"
};

export const bbJobDrag = {
  statement: "Rearrange the steps to correctly process a node during Least Cost Branch and Bound Job Assignment.",
  options: [
    "Pop the node with the minimum lower bound from the Priority Queue.",
    "Check if the node represents a complete assignment (worker_id == N - 1); if so, return its path_cost.",
    "For every unassigned job, generate a child node for the next worker (worker_id + 1).",
    "Calculate the new path cost and lower bound for each child node.",
    "Push the valid child nodes into the Priority Queue."
  ]
};

export const bbJobComplete = {
  code: `
class Node implements Comparable<Node> {
    int workerId, assignedMask, pathCost, lowerBound;
    
    public int compareTo(Node other) {
        // LC Search uses Min-Heap based on lower bound
        return Integer.compare(this.lowerBound, other.lowerBound);
    }
}

int calculateBound(Node node, int[][] costMatrix, int N) {
    int bound = node.pathCost;
    for (int i = node.workerId + 1; i < N; i++) {
        int min = Integer.MAX_VALUE;
        for (int j = 0; j < N; j++) {
            // Check if job j is NOT already assigned using bitwise AND
            if ((node.assignedMask & (1 << j)) == 0) {
                min = Math.min(min, costMatrix[i][j]);
            }
        }
        bound += min;
    }
    return bound;
}
`,
  blanks: [
    {
      id: "blank1",
      text: "this.lowerBound"
    },
    {
      id: "blank2",
      text: "(1 << j)"
    }
  ]
};
