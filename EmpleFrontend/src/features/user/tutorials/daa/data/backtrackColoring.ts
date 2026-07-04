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
    question: "What is the worst-case time complexity of the backtracking algorithm for the m-coloring problem on a graph with V vertices?",
    options: [
      "O(V^m)",
      "O(m^V)",
      "O(V!)",
      "O(m * V^2)"
    ],
    correctAnswerIndex: 1,
    explanation: "In the worst case, for each of the V vertices, the algorithm tries all m colors, leading to a state space tree of depth V and branching factor m. Hence, the time complexity is O(m^V)."
  },
  {
    question: "Which of the following graphs has a chromatic number of 2?",
    options: [
      "A complete graph K_4",
      "An odd length cycle C_5",
      "A bipartite graph",
      "A Petersen graph"
    ],
    correctAnswerIndex: 2,
    explanation: "A graph has a chromatic number of 2 if and only if it is a bipartite graph (i.e., it can be divided into two independent sets). Odd cycles have a chromatic number of 3, and complete graphs K_n have a chromatic number of n."
  },
  {
    question: "What is the minimum number of colors required to color a complete graph K_n such that no two adjacent vertices share the same color?",
    options: [
      "2",
      "n - 1",
      "n",
      "n / 2"
    ],
    correctAnswerIndex: 2,
    explanation: "In a complete graph K_n, every vertex is connected to every other vertex. Therefore, no two vertices can share the same color. Thus, exactly n colors are required."
  },
  {
    question: "Which of the following problems is polynomial-time solvable?",
    options: [
      "Determining if a graph is 2-colorable",
      "Determining if a graph is 3-colorable",
      "Finding the chromatic number of a general graph",
      "Determining if a planar graph is 3-colorable"
    ],
    correctAnswerIndex: 0,
    explanation: "Determining if a graph is 2-colorable is equivalent to checking if it is bipartite, which can be done in O(V+E) time using BFS or DFS. 3-colorability and finding the chromatic number are NP-complete problems."
  },
  {
    question: "According to Brooks' Theorem, for a connected graph G that is neither a complete graph nor an odd cycle, the chromatic number χ(G) is bounded by:",
    options: [
      "χ(G) <= Δ(G) + 1",
      "χ(G) <= Δ(G)",
      "χ(G) = Δ(G) - 1",
      "χ(G) <= 4"
    ],
    correctAnswerIndex: 1,
    explanation: "Brooks' Theorem states that for any connected undirected graph G that is not a complete graph or an odd cycle, its chromatic number is at most Δ(G), where Δ(G) is the maximum degree of any vertex in G."
  },
  {
    question: "A path graph P_n (n > 1) has n vertices. How many distinct valid 3-colorings does it have?",
    options: [
      "3^n",
      "3 * 2^(n-1)",
      "2 * 3^(n-1)",
      "3 * 2^n"
    ],
    correctAnswerIndex: 1,
    explanation: "The first vertex can be colored in 3 ways. Every subsequent vertex can be colored in 2 ways (any color except the one used by the immediately preceding vertex). Total ways = 3 * 2^(n-1)."
  },
  {
    question: "The Four Color Theorem applies to which class of graphs?",
    options: [
      "Bipartite graphs",
      "Complete graphs",
      "Planar graphs",
      "Directed acyclic graphs"
    ],
    correctAnswerIndex: 2,
    explanation: "The Four Color Theorem states that the vertices of any planar graph can be colored with at most four colors such that no two adjacent vertices share the same color."
  },
  {
    question: "During the execution of the backtracking algorithm for m-coloring, when does the algorithm decide to backtrack?",
    options: [
      "When a vertex has been successfully colored.",
      "When the current vertex can be colored with at least one color safely.",
      "When all m colors have been tried for the current vertex and none are safe.",
      "When the algorithm reaches the last vertex."
    ],
    correctAnswerIndex: 2,
    explanation: "Backtracking occurs when the algorithm reaches a dead end. In Graph Coloring, this happens when all m colors have been tested for a vertex, and all of them conflict with already colored adjacent vertices."
  },
  {
    question: "If a graph contains a triangle (a cycle of length 3), what is the absolute minimum number of colors needed to color the graph?",
    options: [
      "1",
      "2",
      "3",
      "4"
    ],
    correctAnswerIndex: 2,
    explanation: "A triangle is isomorphic to K_3. Since all 3 vertices are mutually adjacent, they must all have different colors. Thus, the chromatic number is at least 3."
  },
  {
    question: "Consider a star graph with one center node and k leaf nodes (total k+1 vertices). What is its chromatic number?",
    options: [
      "k",
      "k+1",
      "2",
      "3"
    ],
    correctAnswerIndex: 2,
    explanation: "A star graph is a bipartite graph (tree). The center node can be assigned one color, and all leaf nodes can be assigned a second color, as they are independent of each other. Therefore, exactly 2 colors are needed."
  }
];

export const backtrackColoringDebug = {
  instructions: "Fix the syntax error so the code compiles correctly.",
  buggyC: "#include <stdio.h>\n\nint main() {\n    printf(\"Hello World\")\n    return 0;\n}",
  fixedC: "#include <stdio.h>\n\nint main() {\n    printf(\"Hello World\\n\");\n    return 0;\n}",
  buggyJava: "public class Main {\n    public static void main(String[] args) {\n        System.out.printl(\"Hello World\");\n    }\n}",
  fixedJava: "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello World\");\n    }\n}",
  hints: ["Check the print statement.","Missing semicolon or wrong spelling?","Fix it!"],
  expectedOutput: "Hello World"
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
  problem: "Complete the backtracking function to solve the Graph Coloring problem.",
  codeSnippet: `
bool graphColoringUtil(bool graph[V][V], int m, int color[], int v) {
    if (v == V)
        return true;

    for (int c = 1; c <= m; c++) {
        if (isSafe(v, graph, color, c)) {
            color[v] = ___;
            if (graphColoringUtil(graph, m, color, ___) == true)
                return true;
            ___ = 0; // Backtrack
        }
    }
    return false;
}
  `,
  missingCode: ["c", "v + 1", "color[v]"],
  explanation: "When a color `c` is safe, it is assigned to `color[v]`. Then, the function recurses for the next vertex `v + 1`. If it fails to find a solution down that path, the assignment is undone by setting `color[v] = 0`."
};
