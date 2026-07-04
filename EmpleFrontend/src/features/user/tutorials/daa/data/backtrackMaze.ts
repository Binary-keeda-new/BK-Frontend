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
    "question": "Which algorithmic paradigm is strictly followed by the standard Rat in a Maze solver that explores paths and abandons dead-ends?",
    "options": [
      "Dynamic Programming",
      "Greedy Method",
      "Backtracking",
      "Branch and Bound"
    ],
    "answer": "Backtracking",
    "explanation": "Backtracking is used as it explores all possible paths and abandons (backtracks) when it encounters a dead-end (0 or out of bounds)."
  },
  {
    "question": "In a 2-direction (Down, Right) Rat in a Maze problem on an NxN grid, what is the maximum number of recursive calls in the worst-case state space tree (upper bound)?",
    "options": [
      "O(N^2)",
      "O(N!)",
      "O(2^(N^2))",
      "O(4^N)"
    ],
    "answer": "O(2^(N^2))",
    "explanation": "At each of the maximum N^2 cells, there are 2 choices (Down, Right). Thus, the state space tree has an upper bound complexity of O(2^(N^2))."
  },
  {
    "question": "If the maze allows the rat to move in 4 directions (Up, Down, Left, Right), what additional state must be tracked to prevent infinite recursion?",
    "options": [
      "The shortest path length",
      "A heuristic value for each cell",
      "A 'visited' matrix or marker",
      "The total number of walls"
    ],
    "answer": "A 'visited' matrix or marker",
    "explanation": "In 4-directional movement, the rat can easily move Right then Left infinitely. A visited state prevents revisiting nodes in the current path."
  },
  {
    "question": "For a standard backtracking solution finding ANY valid path, what underlying graph traversal does the recursion tree most closely resemble?",
    "options": [
      "Breadth-First Search (BFS)",
      "Depth-First Search (DFS)",
      "Dijkstra's Algorithm",
      "Kruskal's Algorithm"
    ],
    "answer": "Depth-First Search (DFS)",
    "explanation": "Backtracking goes as deep as possible along a single path until it hits a dead end before reverting, which is fundamentally a DFS approach."
  },
  {
    "question": "Consider an NxN maze where all cells are `1` (no blocked cells). The rat can move Down and Right. How many valid distinct paths exist from (0,0) to (N-1, N-1)?",
    "options": [
      "2N",
      "2^N",
      "(2N)! / (N! * N!)",
      "(2N-2)! / ((N-1)! * (N-1)!)"
    ],
    "answer": "(2N-2)! / ((N-1)! * (N-1)!)",
    "explanation": "The rat must make exactly (N-1) Down moves and (N-1) Right moves. The number of paths is the combinations of these moves: C((N-1)+(N-1), N-1) = C(2N-2, N-1)."
  },
  {
    "question": "Why is Backtracking (DFS) generally not preferred for finding the SHORTEST path in a maze with multiple valid paths?",
    "options": [
      "It requires more space than BFS.",
      "It cannot traverse cyclic graphs.",
      "It terminates at the first valid path found, which may not be the shortest.",
      "It evaluates heuristic functions too slowly."
    ],
    "answer": "It terminates at the first valid path found, which may not be the shortest.",
    "explanation": "DFS simply finds a path to the destination without guaranteeing optimality. BFS explores level by level, ensuring the first path found is the shortest."
  },
  {
    "question": "In the `solveMazeUtil` function, what is the purpose of the line `sol[x][y] = 0;` after the recursive calls?",
    "options": [
      "To mark the destination as reached.",
      "To initialize the solution matrix.",
      "To undo the choice because the current path did not lead to a solution (Backtracking).",
      "To optimize the space complexity to O(1)."
    ],
    "answer": "To undo the choice because the current path did not lead to a solution (Backtracking).",
    "explanation": "This line is the core of backtracking. It unmarks the cell so that it can be used in other exploratory paths if needed."
  },
  {
    "question": "What is the auxiliary space complexity of the standard recursive Rat in a Maze algorithm on an NxN grid (excluding the `sol` matrix)?",
    "options": [
      "O(1)",
      "O(N)",
      "O(N^2)",
      "O(2^N)"
    ],
    "answer": "O(N^2)",
    "explanation": "The maximum depth of the recursion tree can be N^2 if the rat traverses every cell before reaching the destination."
  },
  {
    "question": "If `maze[0][0] = 0` in an NxN maze, what is the output of the standard Rat in a Maze backtracking algorithm?",
    "options": [
      "The algorithm enters an infinite loop.",
      "The algorithm returns true but the sol matrix is empty.",
      "The algorithm throws a NullPointerException.",
      "The algorithm immediately returns false (No path exists)."
    ],
    "answer": "The algorithm immediately returns false (No path exists).",
    "explanation": "The start position is blocked. The base `isSafe` condition will fail on the very first cell, causing an immediate backtrack/termination."
  },
  {
    "question": "In a Branch and Bound approach to the maze problem (compared to pure Backtracking), which of the following is true?",
    "options": [
      "Branch and Bound is only used for decision problems.",
      "Branch and Bound would use a bounding function/heuristic to prune suboptimal paths early.",
      "Branch and Bound guarantees O(N) time complexity.",
      "Branch and Bound strictly uses a LIFO queue."
    ],
    "answer": "Branch and Bound would use a bounding function/heuristic to prune suboptimal paths early.",
    "explanation": "Branch and Bound is generally used for optimization problems and utilizes a heuristic/bound to avoid exploring sub-trees that cannot yield a better solution."
  },
  {
    "question": "If you are asked to print ALL possible paths in the maze instead of just one, which of the following changes must be made to the base case `if (x == N-1 && y == N-1)`?",
    "options": [
      "Return true unconditionally.",
      "Print the path, unmark the destination, and return false to force backtracking.",
      "Terminate the program immediately using exit(0).",
      "Store the path in a queue and return true."
    ],
    "answer": "Print the path, unmark the destination, and return false to force backtracking.",
    "explanation": "To find all paths, you must simulate a failure after finding a successful path. Returning false (or simply not returning true) forces the algorithm to backtrack and find alternatives."
  },
  {
    "question": "Which of the following scenarios represents the BEST case time complexity for the Rat in a Maze algorithm (2-directional)?",
    "options": [
      "The maze is completely empty (all 1s), and the algorithm checks Right before Down.",
      "The maze has a single valid straight path matching the algorithm's first directional preference.",
      "The maze is an alternating checkerboard pattern of 1s and 0s.",
      "The destination cell is blocked."
    ],
    "answer": "The maze has a single valid straight path matching the algorithm's first directional preference.",
    "explanation": "If the only open path perfectly aligns with the algorithm's priority (e.g., Down then Right), it will reach the destination without any backtracking, taking O(N) time."
  }
];

export const backtrackMazeDebug = {
  instructions: "Fix the syntax error so the code compiles correctly.",
  buggyC: "#include <stdio.h>\n\nint main() {\n    printf(\"Hello World\")\n    return 0;\n}",
  fixedC: "#include <stdio.h>\n\nint main() {\n    printf(\"Hello World\\n\");\n    return 0;\n}",
  buggyJava: "public class Main {\n    public static void main(String[] args) {\n        System.out.printl(\"Hello World\");\n    }\n}",
  fixedJava: "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello World\");\n    }\n}",
  hints: ["Check the print statement.","Missing semicolon or wrong spelling?","Fix it!"],
  expectedOutput: "Hello World"
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
  "blankCode": "bool isSafe(int maze[N][N], int x, int y) {\n    // Check if x and y are within bounds and maze[x][y] is open\n    return (x >= 0 && x < N && y >= 0 && ____ && maze[x][y] == ____);\n}",
  "correctCode": "bool isSafe(int maze[N][N], int x, int y) {\n    // Check if x and y are within bounds and maze[x][y] is open\n    return (x >= 0 && x < N && y >= 0 && y < N && maze[x][y] == 1);\n}",
  "blanks": [
    {
      "id": "blank1",
      "correctValue": "y < N"
    },
    {
      "id": "blank2",
      "correctValue": "1"
    }
  ]
};
