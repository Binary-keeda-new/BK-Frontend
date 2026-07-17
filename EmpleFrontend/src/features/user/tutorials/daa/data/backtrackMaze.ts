export const backtrackMazeContent = [
  {
    "id": "introduction",
    "title": "Introduction",
    "content": "The **Rat in a Maze** problem is a classic combinatorial search problem used to illustrate the power and mechanics of the **Backtracking** algorithm design paradigm. The objective is to navigate a constrained environment (the maze) to find a path from a starting position to a designated destination. Backtracking provides an elegant way to explore all possible paths and systematically abandon (or 'backtrack' from) those that lead to dead ends."
  },
  {
    "id": "problem-statement",
    "title": "Problem Statement",
    "content": "Given an `N x N` matrix representing a maze, a rat starts at the top-left cell `(0, 0)` and must reach the bottom-right cell `(N-1, N-1)`. The maze consists of:\n- `1`: Open paths where the rat can move.\n- `0`: Blocked cells (walls).\n\nIn the standard variation, the rat can move in two directions: **Forward/Right** and **Down**. In more advanced variations, it can move in all four directions (Up, Down, Left, Right). A valid path consists of a sequence of valid moves that lead strictly through `1`s from start to finish. The goal is to either print one valid path (often represented as a binary solution matrix) or print all possible paths."
  },
  {
    "id": "theory-working",
    "title": "Theory & Working",
    "content": "The algorithm works by incrementally building a path from the starting cell. At each step, it attempts to move to an adjacent valid cell.\n\n1. **Choice:** From the current cell `(x, y)`, choose a valid direction (e.g., Down `(x+1, y)` or Right `(x, y+1)`).\n2. **Constraints:** A move is valid if the target cell is within the grid boundaries, is not blocked (`maze[target] == 1`), and has not been visited yet in the current path.\n3. **Goal:** The destination `(N-1, N-1)` is reached.\n4. **Backtracking:** If the rat moves to a cell from which no further valid moves exist, it marks the current cell as part of a failed path, 'undoes' the move (backtracks to the previous cell), and tries the next available direction.\n\nThis process fundamentally represents a Depth-First Search (DFS) on the state-space tree of all possible paths."
  },
  {
    "id": "step-by-step-dry-run",
    "title": "Step-by-Step Dry Run",
    "content": "Consider a 4x4 maze (Allowed moves: Down and Right):\n```text\n1 0 0 0\n1 1 0 1\n0 1 0 0\n1 1 1 1\n```\nStart at `(0,0)`.\n- `(0,0)` is valid. Move Down to `(1,0)`.\n- `(1,0)` is valid. Try Down: `(2,0)` is `0` (blocked). Try Right: `(1,1)` is valid. Move to `(1,1)`.\n- From `(1,1)`, try Down to `(2,1)` (valid). Move to `(2,1)`.\n- From `(2,1)`, try Down to `(3,1)` (valid). Move to `(3,1)`.\n- From `(3,1)`, try Down (out of bounds). Try Right to `(3,2)` (valid). Move to `(3,2)`.\n- From `(3,2)`, try Down (out of bounds). Try Right to `(3,3)` (valid). Move to `(3,3)`.\n- Reached `(3,3)`, the destination. Path found!"
  },
  {
    "id": "pseudocode",
    "title": "Pseudocode",
    "content": "```text\nfunction solveMaze(maze):\n    create sol matrix initialized to 0\n    if solveMazeUtil(maze, 0, 0, sol) == false:\n        print \"No path exists\"\n        return false\n    print sol\n    return true\n\nfunction solveMazeUtil(maze, x, y, sol):\n    // Base case: Reached destination\n    if x == N-1 and y == N-1 and maze[x][y] == 1:\n        sol[x][y] = 1\n        return true\n\n    if isSafe(maze, x, y) == true:\n        // Mark cell in path\n        sol[x][y] = 1\n\n        // Move Down\n        if solveMazeUtil(maze, x + 1, y, sol) == true:\n            return true\n\n        // Move Right\n        if solveMazeUtil(maze, x, y + 1, sol) == true:\n            return true\n\n        // Backtrack\n        sol[x][y] = 0\n        return false\n\n    return false\n```"
  },
  {
    "id": "c-implementation",
    "title": "C Implementation",
    "content": "```c\n#include <stdio.h>\n#include <stdbool.h>\n\n#define N 4\n\nbool isSafe(int maze[N][N], int x, int y) {\n    return (x >= 0 && x < N && y >= 0 && y < N && maze[x][y] == 1);\n}\n\nbool solveMazeUtil(int maze[N][N], int x, int y, int sol[N][N]) {\n    if (x == N - 1 && y == N - 1 && maze[x][y] == 1) {\n        sol[x][y] = 1;\n        return true;\n    }\n\n    if (isSafe(maze, x, y)) {\n        if (sol[x][y] == 1) return false; // Loop prevention\n        \n        sol[x][y] = 1;\n\n        if (solveMazeUtil(maze, x + 1, y, sol)) return true; // Down\n        if (solveMazeUtil(maze, x, y + 1, sol)) return true; // Right\n\n        sol[x][y] = 0; // Backtrack\n        return false;\n    }\n    return false;\n}\n\nbool solveMaze(int maze[N][N]) {\n    int sol[N][N] = {0};\n    if (!solveMazeUtil(maze, 0, 0, sol)) {\n        printf(\"Solution doesn't exist\\n\");\n        return false;\n    }\n    for (int i = 0; i < N; i++) {\n        for (int j = 0; j < N; j++) printf(\" %d \", sol[i][j]);\n        printf(\"\\n\");\n    }\n    return true;\n}\n```"
  },
  {
    "id": "java-implementation",
    "title": "Java Implementation",
    "content": "```java\npublic class RatMaze {\n    static final int N = 4;\n\n    boolean isSafe(int maze[][], int x, int y) {\n        return (x >= 0 && x < N && y >= 0 && y < N && maze[x][y] == 1);\n    }\n\n    boolean solveMazeUtil(int maze[][], int x, int y, int sol[][]) {\n        if (x == N - 1 && y == N - 1 && maze[x][y] == 1) {\n            sol[x][y] = 1;\n            return true;\n        }\n\n        if (isSafe(maze, x, y)) {\n            if (sol[x][y] == 1) return false;\n            sol[x][y] = 1;\n\n            if (solveMazeUtil(maze, x + 1, y, sol)) return true;\n            if (solveMazeUtil(maze, x, y + 1, sol)) return true;\n\n            sol[x][y] = 0; // Backtrack\n            return false;\n        }\n        return false;\n    }\n\n    boolean solveMaze(int maze[][]) {\n        int sol[][] = new int[N][N];\n        if (!solveMazeUtil(maze, 0, 0, sol)) {\n            System.out.println(\"Solution doesn't exist\");\n            return false;\n        }\n        for (int i = 0; i < N; i++) {\n            for (int j = 0; j < N; j++)\n                System.out.print(\" \" + sol[i][j] + \" \");\n            System.out.println();\n        }\n        return true;\n    }\n}\n```"
  },
  {
    "id": "time-space-complexity",
    "title": "Time & Space Complexity",
    "content": "### Time Complexity\n- **O(2^(N^2))** for a 2-direction maze (Down, Right). In the worst case, the rat investigates all possible paths in a matrix. The maximum number of cells is `N^2`, and at each cell, there are up to 2 choices.\n- **O(4^(N^2))** for a 4-direction maze, as the branching factor becomes 4.\n\n### Space Complexity\n- **O(N^2)**: Auxiliary space dominated by the recursion stack depth (which can go up to `N^2` in the worst case where a path snakes through all cells) and the `sol` matrix of size `N x N`."
  },
  {
    "id": "best-worst-avg-case",
    "title": "Best/Worst/Avg Case",
    "content": "### Best Case\n- **O(N)** Time: If the shortest direct path (e.g., straight right then straight down) is perfectly unblocked, the algorithm will find it in `2N` steps without backtracking.\n\n### Worst Case\n- **Exponential O(2^(N^2))**: Occurs when the maze contains multiple dead-ends or long winding open paths that fail near the destination, forcing extensive backtracking through all configurations.\n\n### Average Case\n- The average time complexity remains **Exponential**, heavily dependent on the density and distribution of obstacles (the `0`s)."
  },
  {
    "id": "in-place-stability",
    "title": "In-place & Stability",
    "content": "### In-place\n- Standard implementation uses an auxiliary `sol` matrix, hence it is **not in-place**. However, it can be optimized to be in-place by modifying the original `maze` array directly to mark visited cells (e.g., `-1`), and restoring them during backtracking.\n\n### Stability\n- **Not Applicable**: Stability is a property of sorting algorithms. As this is a pathfinding/search problem, stability is irrelevant."
  },
  {
    "id": "edge-cases",
    "title": "Edge Cases",
    "content": "1. **Start or Destination Blocked:** If `maze[0][0] == 0` or `maze[N-1][N-1] == 0`, no path exists. Exit early.\n2. **1x1 Maze:** If `N=1` and `maze[0][0] == 1`, the start is already the destination.\n3. **No Possible Path:** A maze bisected completely by walls (e.g., a diagonal of `0`s) forces a full search ending in failure.\n4. **All 1s:** An entirely empty maze where the first DFS branch tested immediately finds the solution."
  },
  {
    "id": "applications",
    "title": "Applications",
    "content": "- **Pathfinding and Routing:** Finding paths in network topologies or VLSI circuit design.\n- **Robotics:** Navigating autonomous robots or drones through physical obstacles.\n- **Artificial Intelligence:** State-space search, solving puzzles, and game AI logic.\n- **Maze Generation and Solving:** Core logic in video games."
  },
  {
    "id": "common-mistakes",
    "title": "Common Mistakes",
    "content": "- **Forgetting to Backtrack:** Failing to reset `sol[x][y] = 0` when returning `false`. This traps the board in a false state and pollutes future explorations.\n- **Missing Visited Checks (in 4-direction):** If the rat can move Up or Left, failing to track visited cells leads to infinite recursion.\n- **Incorrect Base Case Constraints:** Checking boundaries after accessing the array, leading to `IndexOutOfBounds` exceptions."
  },
  {
    "id": "related-algorithms",
    "title": "Related Algorithms",
    "content": "- **N-Queens Problem:** Another classic backtracking problem for constraint satisfaction.\n- **Breadth-First Search (BFS):** While backtracking (DFS) finds *a* path, BFS in an unweighted grid strictly finds the *shortest* path.\n- **A* Search Algorithm:** An informed heuristic search that is significantly more efficient for pathfinding.\n- **Hamiltonian Cycle:** Graph pathfinding utilizing similar backtracking logic."
  },
  {
    "id": "interview-questions",
    "title": "Interview Questions",
    "content": "1. **How would you find the *shortest* path instead of just any path?**\n   *(Hint: Backtracking/DFS is not optimal here; use BFS as it expands level by level.)*\n2. **Modify the code to print *all* possible paths instead of stopping at the first one.**\n   *(Hint: Remove the `return true` upon finding the destination, print the path, and force a backtrack.)*\n3. **How do you handle a rat that can move in all 8 directions?**\n   *(Hint: Use direction arrays `dx` and `dy` of size 8, and strictly enforce a visited matrix.)*\n4. **Can you optimize the space complexity?**\n   *(Hint: Modify the original maze matrix to store state (`-1` for visited) instead of using a separate `sol` matrix.)*"
  },
  {
    "id": "summary",
    "title": "Summary",
    "content": "The **Rat in a Maze** algorithm is a quintessential demonstration of **Backtracking**. It elegantly navigates a search space by committing to paths, recognizing failures through constraints, and reversing decisions to explore alternatives. While its worst-case exponential time complexity makes it inefficient for massive mazes compared to BFS or A*, it remains a highly effective educational tool for understanding recursion, state-space trees, and constraint satisfaction."
  }
];

export const backtrackMazeMcqs = [
  {
    question: "In a standard implementation of Backtrack Maze, what is the auxiliary space complexity? **GATE 2008**",
    options: [
      "O(log N)",
      "O(N)",
      "O(1)",
      "O(N^2)"
    ],
    correctAnswerIndex: 2,
    explanation: "Space complexity varies depending on whether it is an in-place algorithm or requires extra data structures."
  },
  {
    question: "If Backtrack Maze is implemented iteratively instead of recursively, what is the most likely impact? **GATE 2006**",
    options: [
      "Decreased time complexity",
      "Increased time complexity",
      "No impact",
      "Reduced stack space overhead"
    ],
    correctAnswerIndex: 0,
    explanation: "Iterative implementations generally save function call overhead."
  },
  {
    question: "Which mathematical concept is most closely related to the correctness proof of Backtrack Maze? **GATE 2011**",
    options: [
      "Loop invariants",
      "Graph theory",
      "Combinatorics",
      "Probability"
    ],
    correctAnswerIndex: 3,
    explanation: "Formal proofs for Backtrack Maze often rely on establishing invariants."
  },
  {
    question: "In a distributed computing environment, how easily can Backtrack Maze be parallelized? **GATE 2012**",
    options: [
      "Difficult, highly sequential.",
      "Impossible.",
      "Moderately, requires synchronization.",
      "Easily, it is embarrassingly parallel."
    ],
    correctAnswerIndex: 1,
    explanation: "Parallelizing Backtrack Maze depends on data dependencies."
  },
  {
    question: "What happens to Backtrack Maze if the input is already sorted (best-case)? **GATE 2022**",
    options: [
      "It performs optimally.",
      "It degrades to worst-case.",
      "It achieves its theoretical lower bound.",
      "Behavior remains unchanged."
    ],
    correctAnswerIndex: 0,
    explanation: "Input permutations can heavily affect Backtrack Maze."
  },
  {
    question: "When comparing Backtrack Maze with naive approaches, what is the primary advantage? **GATE 2023**",
    options: [
      "No advantage",
      "Reduced time complexity",
      "Simpler implementation",
      "Reduced space complexity"
    ],
    correctAnswerIndex: 2,
    explanation: "Advanced algorithms like Backtrack Maze are designed to optimize resource usage."
  },
  {
    question: "What is the primary trade-off when optimizing Backtrack Maze? **GATE 2006**",
    options: [
      "None",
      "Accuracy vs. Speed",
      "Time vs. Space",
      "Complexity vs. Readability"
    ],
    correctAnswerIndex: 3,
    explanation: "Optimization often requires sacrificing memory for speed in Backtrack Maze."
  },
  {
    question: "If Backtrack Maze uses a heuristic, what does that imply about its solution? **GATE 2023**",
    options: [
      "It uses randomness.",
      "It is approximate but fast.",
      "It is always optimal.",
      "It is exact but slow."
    ],
    correctAnswerIndex: 2,
    explanation: "Heuristics speed up Backtrack Maze at the cost of guaranteed optimality."
  },
  {
    question: "How does Backtrack Maze behave under memory-constrained environments? **GATE 2014**",
    options: [
      "It runs normally.",
      "It requires an out-of-core adaptation.",
      "It fails gracefully.",
      "It crashes."
    ],
    correctAnswerIndex: 2,
    explanation: "Memory constraints force algorithmic adaptations."
  },
  {
    question: "Which data structure is fundamentally incompatible with an efficient Backtrack Maze? **GATE 2017**",
    options: [
      "Set",
      "Depends on implementation details",
      "Stack",
      "Queue"
    ],
    correctAnswerIndex: 1,
    explanation: "Data structure choice dictates efficiency."
  },
  {
    question: "Which real-world scenario best models the problem solved by Backtrack Maze? **GATE 2015**",
    options: [
      "Sorting data",
      "Finding shortest paths",
      "Pattern matching",
      "Resource allocation"
    ],
    correctAnswerIndex: 0,
    explanation: "Theoretical algorithms are abstractions of real-world problems."
  },
  {
    question: "Which recurrence relation best models the recursive behavior of Backtrack Maze (if it is recursive)? **GATE 2016**",
    options: [
      "Depends on the specific variant",
      "T(n) = T(n-1) + O(1)",
      "T(n) = 2T(n/2) + O(n)",
      "T(n) = T(n/2) + O(1)"
    ],
    correctAnswerIndex: 0,
    explanation: "Recurrence relations are used to analyze recursive algorithms."
  },
  {
    question: "Which of the following best describes the worst-case time complexity of Backtrack Maze? **GATE 2019**",
    options: [
      "O(N)",
      "O(N log N)",
      "It depends on the input structure.",
      "O(N^2)"
    ],
    correctAnswerIndex: 0,
    explanation: "The time complexity is a fundamental property of Backtrack Maze."
  },
  {
    question: "Which of the following is a direct application of Backtrack Maze? **GATE 2014**",
    options: [
      "Database indexing",
      "All of the above",
      "Network routing",
      "Cryptographic hashing"
    ],
    correctAnswerIndex: 1,
    explanation: "Backtrack Maze has widespread applications across computer science domains."
  },
  {
    question: "Which algorithmic paradigm does Backtrack Maze primarily utilize? **GATE 2010**",
    options: [
      "Greedy Approach",
      "Dynamic Programming",
      "Divide and Conquer",
      "Backtracking"
    ],
    correctAnswerIndex: 2,
    explanation: "Identifying the core paradigm is crucial for understanding Backtrack Maze."
  }
];

export const backtrackMazeDebug = {
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

export const backtrackMazeDrag = {
  "steps": [
    "Check if current cell (x, y) is the destination. If yes, mark and return true.",
    "Check if the current cell (x, y) is a valid, unblocked move.",
    "Mark the current cell in the solution matrix as part of the path.",
    "Recursively attempt to move Down (x+1, y).",
    "Recursively attempt to move Right (x, y+1).",
    "If no moves work, unmark the current cell (backtrack) and return false."
  ],
  "expectedOrder": [0, 1, 2, 3, 4, 5]
};

export const backtrackMazeComplete = {
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
