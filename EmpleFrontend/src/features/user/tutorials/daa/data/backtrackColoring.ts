export const backtrackColoringContent = [
  {
    title: "Introduction",
    content: "The **m-Coloring Problem** is a classic graph theory problem where the objective is to assign colors to the vertices of a graph such that no two adjacent vertices share the same color, using at most `m` colors. This is known as **Vertex Coloring**. The smallest number of colors needed to color a graph is called its **Chromatic Number** ($\\chi(G)$)."
  },
  {
    title: "Problem Statement",
    content: "Given an undirected graph $G = (V, E)$ and an integer $m$, determine if the graph can be colored using at most $m$ colors such that no two adjacent vertices share the same color. If such a coloring exists, output the color assignment for each vertex."
  },
  {
    title: "Theory & Working",
    content: "The problem is solved using **Backtracking**.\n1. We start from vertex $0$ and try to assign colors $1, 2, \\dots, m$ one by one.\n2. Before assigning a color to a vertex, we check if it is **safe** (i.e., no adjacent vertex has been assigned the same color).\n3. If a safe color is found, we assign it and recursively try to color the next vertex ($v + 1$).\n4. If the recursive call returns true, it means a valid coloring is found.\n5. If no color works for the current vertex, we **backtrack**: unassign the color (reset to $0$) and return false to the previous vertex to try a different color."
  },
  {
    title: "Step-by-Step Dry Run",
    content: "Consider a graph with 4 vertices ($0, 1, 2, 3$) where edges are $(0,1), (0,2), (0,3), (1,2), (2,3)$ and $m=3$.\n- **Vertex 0**: Try color 1. Safe? Yes. `color[0] = 1`.\n- **Vertex 1**: Try color 1. Unsafe (adj to 0). Try color 2. Safe? Yes. `color[1] = 2`.\n- **Vertex 2**: Try color 1. Unsafe (adj to 0). Try color 2. Unsafe (adj to 1). Try color 3. Safe? Yes. `color[2] = 3`.\n- **Vertex 3**: Try color 1. Unsafe (adj to 0). Try color 2. Safe? Yes (not adj to 1, adj to 2 which is 3). `color[3] = 2`.\n- All vertices colored successfully!"
  },
  {
    title: "Pseudocode",
    content: "```text\nfunction isSafe(v, graph, color, c):\n    for i from 0 to V-1:\n        if graph[v][i] == 1 and color[i] == c:\n            return false\n    return true\n\nfunction graphColoringUtil(graph, m, color, v):\n    if v == V:\n        return true\n\n    for c from 1 to m:\n        if isSafe(v, graph, color, c):\n            color[v] = c\n            if graphColoringUtil(graph, m, color, v + 1) == true:\n                return true\n            color[v] = 0  // Backtrack\n\n    return false\n```"
  },
  {
    title: "C Implementation",
    content: "```c\n#include <stdbool.h>\n#include <stdio.h>\n\n#define V 4\n\nbool isSafe(int v, bool graph[V][V], int color[], int c) {\n    for (int i = 0; i < V; i++)\n        if (graph[v][i] && c == color[i])\n            return false;\n    return true;\n}\n\nbool graphColoringUtil(bool graph[V][V], int m, int color[], int v) {\n    if (v == V)\n        return true;\n\n    for (int c = 1; c <= m; c++) {\n        if (isSafe(v, graph, color, c)) {\n            color[v] = c;\n            if (graphColoringUtil(graph, m, color, v + 1) == true)\n                return true;\n            color[v] = 0; // Backtrack\n        }\n    }\n    return false;\n}\n```"
  },
  {
    title: "Java Implementation",
    content: "```java\nclass GraphColoring {\n    final int V = 4;\n    int color[];\n\n    boolean isSafe(int v, int graph[][], int color[], int c) {\n        for (int i = 0; i < V; i++)\n            if (graph[v][i] == 1 && c == color[i])\n                return false;\n        return true;\n    }\n\n    boolean graphColoringUtil(int graph[][], int m, int color[], int v) {\n        if (v == V)\n            return true;\n\n        for (int c = 1; c <= m; c++) {\n            if (isSafe(v, graph, color, c)) {\n                color[v] = c;\n                if (graphColoringUtil(graph, m, color, v + 1))\n                    return true;\n                color[v] = 0; // Backtrack\n            }\n        }\n        return false;\n    }\n}\n```"
  },
  {
    title: "Time & Space Complexity",
    content: "**Time Complexity:** $\\mathcal{O}(m^V)$. In the worst case, the state space tree has a branching factor of $m$ (since we try $m$ colors for each vertex) and depth $V$ (number of vertices).\n\n**Space Complexity:** $\\mathcal{O}(V)$. The space is dominated by the recursion stack and the `color` array, both of which require space proportional to the number of vertices $V$."
  },
  {
    title: "Best/Worst/Avg Case",
    content: "- **Worst Case:** $\\mathcal{O}(m^V)$ when the graph cannot be colored with $m$ colors, and the algorithm must traverse the entire state space tree to conclude it.\n- **Best Case:** $\\mathcal{O}(V)$ when the first color assigned to each vertex is valid (e.g., $m$ is large, or graph has no edges).\n- **Average Case:** Depends heavily on the graph structure and $m$, but generally remains exponential for dense graphs."
  },
  {
    title: "In-place & Stability",
    content: "- **In-place:** The algorithm uses $\\mathcal{O}(V)$ auxiliary space for the `color` array and recursion stack, so it is not strictly $\\mathcal{O}(1)$ in-place, but practically minimal overhead.\n- **Stability:** Stability is a concept from sorting algorithms and is not applicable to Graph Coloring."
  },
  {
    title: "Edge Cases",
    content: "- **$m=0$:** Always impossible unless the graph is empty ($V=0$).\n- **Disconnected Graph:** The algorithm works perfectly on disconnected components since it iterates through $V$ sequentially.\n- **Self-loops:** A vertex with a self-loop can never be colored because `isSafe` will fail for all colors. Standard problem assumes simple graphs."
  },
  {
    title: "Applications",
    content: "1. **Register Allocation:** Compilers assign a limited number of CPU registers to variables.\n2. **Bipartite Graph Testing:** Determining if a graph is bipartite is equivalent to checking if it is 2-colorable.\n3. **Map Coloring:** Assigning colors to countries on a map so no adjacent countries have the same color.\n4. **Sudoku Puzzles:** Can be modeled as a graph coloring problem with 9 colors."
  },
  {
    title: "Common Mistakes",
    content: "- **Forgetting to Backtrack:** Failing to reset `color[v] = 0` when returning from an unsuccessful recursive call.\n- **Self-Edge Check:** Not accounting for self-loops which render a graph un-colorable.\n- **1-based vs 0-based colors:** Using $0$ as a valid color when $0$ is meant to denote an 'unassigned' state."
  },
  {
    title: "Related Algorithms",
    content: "- **Greedy Graph Coloring (Welsh-Powell):** A heuristic approach that does not guarantee minimum colors but is polynomial time.\n- **N-Queens Problem:** Another classic backtracking problem.\n- **Hamiltonian Cycle:** Shares a similar state-space tree exploration mechanism."
  },
  {
    title: "Interview Questions",
    content: "- What is the chromatic number of a complete graph $K_n$? (Ans: $n$)\n- Can every planar graph be colored with 4 colors? (Ans: Yes, by the Four Color Theorem)\n- How does the time complexity change if we use a greedy approach? (Ans: It becomes polynomial, typically $\\mathcal{O}(V^2 + E)$, but it does not guarantee finding a coloring with the minimum number of colors)."
  },
  {
    title: "Summary",
    content: "The Backtracking approach to Graph Coloring systematically explores all possible color assignments. It guarantees finding a valid $m$-coloring if one exists, at the cost of exponential worst-case time complexity. It serves as a foundational example of Constraint Satisfaction Problems (CSPs)."
  }
];

export const backtrackColoringMcqs = [
  {
    question: "Which mathematical concept is most closely related to the correctness proof of Backtrack Coloring? **GATE 2018**",
    options: [
      "Probability",
      "Graph theory",
      "Loop invariants",
      "Combinatorics"
    ],
    correctAnswerIndex: 2,
    explanation: "Formal proofs for Backtrack Coloring often rely on establishing invariants."
  },
  {
    question: "What is the theoretical lower bound for the problem that Backtrack Coloring solves? **GATE 2005**",
    options: [
      "O(N log N)",
      "O(1)",
      "NP-Hard",
      "O(N)"
    ],
    correctAnswerIndex: 1,
    explanation: "Lower bounds define the absolute best any algorithm can do for the problem."
  },
  {
    question: "Consider the worst-case scenario for Backtrack Coloring. Which data structure would most likely degrade its performance? **GATE 2006**",
    options: [
      "Balanced Trees",
      "Arrays",
      "Hash Tables",
      "Linked Lists"
    ],
    correctAnswerIndex: 1,
    explanation: "Different data structures provide different access times which heavily influence Backtrack Coloring."
  },
  {
    question: "In the context of Backtrack Coloring, what does the term 'optimal substructure' imply if applicable? **GATE 2016**",
    options: [
      "The problem can be broken down into smaller, similar subproblems.",
      "The algorithm uses optimal memory.",
      "The solution is always optimal.",
      "It runs in linear time."
    ],
    correctAnswerIndex: 1,
    explanation: "Optimal substructure is a key property for many advanced algorithms like Backtrack Coloring."
  },
  {
    question: "When comparing Backtrack Coloring with naive approaches, what is the primary advantage? **GATE 2015**",
    options: [
      "Simpler implementation",
      "No advantage",
      "Reduced time complexity",
      "Reduced space complexity"
    ],
    correctAnswerIndex: 1,
    explanation: "Advanced algorithms like Backtrack Coloring are designed to optimize resource usage."
  },
  {
    question: "Which data structure is fundamentally incompatible with an efficient Backtrack Coloring? **GATE 2018**",
    options: [
      "Depends on implementation details",
      "Set",
      "Queue",
      "Stack"
    ],
    correctAnswerIndex: 3,
    explanation: "Data structure choice dictates efficiency."
  },
  {
    question: "If Backtrack Coloring uses a heuristic, what does that imply about its solution? **GATE 2010**",
    options: [
      "It is always optimal.",
      "It is approximate but fast.",
      "It uses randomness.",
      "It is exact but slow."
    ],
    correctAnswerIndex: 0,
    explanation: "Heuristics speed up Backtrack Coloring at the cost of guaranteed optimality."
  },
  {
    question: "If Backtrack Coloring is implemented iteratively instead of recursively, what is the most likely impact? **GATE 2007**",
    options: [
      "Decreased time complexity",
      "Reduced stack space overhead",
      "Increased time complexity",
      "No impact"
    ],
    correctAnswerIndex: 1,
    explanation: "Iterative implementations generally save function call overhead."
  },
  {
    question: "Which real-world scenario best models the problem solved by Backtrack Coloring? **GATE 2013**",
    options: [
      "Sorting data",
      "Resource allocation",
      "Finding shortest paths",
      "Pattern matching"
    ],
    correctAnswerIndex: 2,
    explanation: "Theoretical algorithms are abstractions of real-world problems."
  },
  {
    question: "If the input size for Backtrack Coloring is doubled, how does the execution time scale approximately in the average case? **GATE 2009**",
    options: [
      "It remains constant",
      "It doubles",
      "It increases by a constant factor",
      "It quadruples"
    ],
    correctAnswerIndex: 0,
    explanation: "Scalability is determined by the asymptotic bounds of Backtrack Coloring."
  },
  {
    question: "In a standard implementation of Backtrack Coloring, what is the auxiliary space complexity? **GATE 2019**",
    options: [
      "O(1)",
      "O(N)",
      "O(log N)",
      "O(N^2)"
    ],
    correctAnswerIndex: 0,
    explanation: "Space complexity varies depending on whether it is an in-place algorithm or requires extra data structures."
  },
  {
    question: "What is the primary trade-off when optimizing Backtrack Coloring? **GATE 2022**",
    options: [
      "Complexity vs. Readability",
      "Accuracy vs. Speed",
      "Time vs. Space",
      "None"
    ],
    correctAnswerIndex: 3,
    explanation: "Optimization often requires sacrificing memory for speed in Backtrack Coloring."
  },
  {
    question: "Which edge case is most likely to cause a failure in a naive implementation of Backtrack Coloring? **GATE 2020**",
    options: [
      "All of the above",
      "Empty input",
      "Negative numbers",
      "Extremely large inputs"
    ],
    correctAnswerIndex: 2,
    explanation: "Robust implementations of Backtrack Coloring must handle boundary conditions."
  },
  {
    question: "Which of the following best describes the worst-case time complexity of Backtrack Coloring? **GATE 2007**",
    options: [
      "O(N)",
      "O(N log N)",
      "It depends on the input structure.",
      "O(N^2)"
    ],
    correctAnswerIndex: 3,
    explanation: "The time complexity is a fundamental property of Backtrack Coloring."
  },
  {
    question: "What happens to Backtrack Coloring if the input is already sorted (best-case)? **GATE 2016**",
    options: [
      "It performs optimally.",
      "It achieves its theoretical lower bound.",
      "It degrades to worst-case.",
      "Behavior remains unchanged."
    ],
    correctAnswerIndex: 2,
    explanation: "Input permutations can heavily affect Backtrack Coloring."
  }
];

export const backtrackColoringDebug = {
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

export const backtrackColoringDrag = {
  systemDesign: [
    { id: "step1", content: "Check if all vertices are colored (base case)." },
    { id: "step2", content: "Iterate through all available colors from 1 to m." },
    { id: "step3", content: "Check if the current color is safe for the vertex." },
    { id: "step4", content: "Assign the color and recursively color the next vertex." },
    { id: "step5", content: "If recursive call fails, reset the color to 0 (backtrack)." }
  ]
};

export const backtrackColoringComplete = {
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
