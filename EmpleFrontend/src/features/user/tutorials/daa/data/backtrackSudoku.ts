export const backtrackSudokuContent = [
  {
    id: "intro",
    title: "1. Introduction",
    content:
      "Sudoku is a logic-based combinatorial number-placement puzzle. The goal is to fill a 9x9 grid with digits so that each column, each row, and each of the nine 3x3 subgrids contain all of the digits from 1 to 9. The backtracking algorithm solves Sudoku by trying all possible valid numbers for each empty cell and reverting (backtracking) when a conflict is found.",
  },
  {
    id: "problem-statement",
    title: "2. Problem Statement",
    content:
      "Given a partially filled 9x9 2D array `grid[9][9]`, the objective is to fill all empty cells with digits from 1 to 9. The filled grid must satisfy the following rules:\n- Each row contains exactly one of each digit from 1 to 9.\n- Each column contains exactly one of each digit from 1 to 9.\n- Each of the nine 3x3 subgrids (blocks) contains exactly one of each digit from 1 to 9.\nEmpty cells are usually represented by 0.",
  },
  {
    id: "theory",
    title: "3. Theory & Working",
    content:
      "The backtracking approach systematically searches for a solution:\n1. Find an unassigned (empty) cell.\n2. If there is no unassigned cell, the puzzle is solved.\n3. For the unassigned cell, try all numbers from 1 to 9.\n4. If a number is valid (does not violate Sudoku rules in its row, column, and 3x3 box), place the number.\n5. Recursively call the solver for the next unassigned cell.\n6. If the recursive call returns true, the current configuration is part of the solution; return true.\n7. If the recursive call returns false, the current number leads to an invalid state. Undo the assignment (backtrack by setting the cell to 0) and try the next number.\n8. If all numbers from 1 to 9 are tried and none work, return false to trigger backtracking at the previous step.",
  },
  {
    id: "dry-run",
    title: "4. Step-by-Step Dry Run",
    content:
      "Consider tracing how backtracking works on the first few cells:\n1. Find the first empty cell, say `(0, 1)`.\n2. Try placing '1'. Check if '1' is valid in row 0, col 1, and the top-left 3x3 box.\n3. If valid, set `grid[0][1] = 1`. Move to the next empty cell, say `(0, 2)`.\n4. Try placing '1' in `(0, 2)`. This is invalid because '1' is already in row 0. Try '2'. If valid, set `grid[0][2] = 2`.\n5. Move to the next cell. If at some cell `(x, y)` no number from 1 to 9 is valid, a dead end is reached.\n6. Go back to the previous cell, undo its assignment (`grid = 0`), and try the next valid number.\n7. Repeat this process until all cells are successfully filled.",
  },
  {
    id: "pseudocode",
    title: "5. Pseudocode",
    content:
      "```text\nfunction solveSudoku(grid):\n    find an empty cell (row, col)\n    if no empty cell found:\n        return true // puzzle solved\n    \n    for num from 1 to 9:\n        if isValid(grid, row, col, num):\n            grid[row][col] = num\n            \n            if solveSudoku(grid):\n                return true\n                \n            grid[row][col] = 0 // backtrack\n            \n    return false // trigger backtracking\n\nfunction isValid(grid, row, col, num):\n    check if num is in grid[row][0...8] (row check)\n    check if num is in grid[0...8][col] (column check)\n    check if num is in 3x3 box containing (row, col)\n    return true if all checks pass\n```",
  },
  {
    id: "c-impl",
    title: "6. C Implementation",
    content:
      "```c\n#include <stdio.h>\n#include <stdbool.h>\n\n#define N 9\n\nbool isSafe(int grid[N][N], int row, int col, int num) {\n    for (int x = 0; x < N; x++) {\n        if (grid[row][x] == num) return false;\n        if (grid[x][col] == num) return false;\n    }\n    \n    int startRow = row - row % 3, startCol = col - col % 3;\n    for (int i = 0; i < 3; i++)\n        for (int j = 0; j < 3; j++)\n            if (grid[i + startRow][j + startCol] == num)\n                return false;\n                \n    return true;\n}\n\nbool solveSudoku(int grid[N][N]) {\n    int row = -1, col = -1;\n    bool isEmpty = false;\n    \n    for (int i = 0; i < N; i++) {\n        for (int j = 0; j < N; j++) {\n            if (grid[i][j] == 0) {\n                row = i; col = j;\n                isEmpty = true;\n                break;\n            }\n        }\n        if (isEmpty) break;\n    }\n    \n    if (!isEmpty) return true;\n    \n    for (int num = 1; num <= 9; num++) {\n        if (isSafe(grid, row, col, num)) {\n            grid[row][col] = num;\n            if (solveSudoku(grid)) return true;\n            grid[row][col] = 0;\n        }\n    }\n    return false;\n}\n```",
  },
  {
    id: "java-impl",
    title: "7. Java Implementation",
    content:
      "```java\npublic class SudokuSolver {\n    private static final int N = 9;\n    \n    public static boolean solveSudoku(int[][] grid) {\n        int row = -1, col = -1;\n        boolean isEmpty = false;\n        \n        for (int i = 0; i < N; i++) {\n            for (int j = 0; j < N; j++) {\n                if (grid[i][j] == 0) {\n                    row = i; col = j;\n                    isEmpty = true;\n                    break;\n                }\n            }\n            if (isEmpty) break;\n        }\n        \n        if (!isEmpty) return true;\n        \n        for (int num = 1; num <= 9; num++) {\n            if (isSafe(grid, row, col, num)) {\n                grid[row][col] = num;\n                if (solveSudoku(grid)) return true;\n                grid[row][col] = 0;\n            }\n        }\n        return false;\n    }\n    \n    private static boolean isSafe(int[][] grid, int row, int col, int num) {\n        for (int d = 0; d < grid.length; d++) {\n            if (grid[row][d] == num) return false;\n            if (grid[d][col] == num) return false;\n        }\n        int sqrt = (int) Math.sqrt(grid.length);\n        int boxRowStart = row - row % sqrt;\n        int boxColStart = col - col % sqrt;\n        \n        for (int r = boxRowStart; r < boxRowStart + sqrt; r++) {\n            for (int d = boxColStart; d < boxColStart + sqrt; d++) {\n                if (grid[r][d] == num) return false;\n            }\n        }\n        return true;\n    }\n}\n```",
  },
  {
    id: "complexity",
    title: "8. Time & Space Complexity",
    content:
      "- **Time Complexity**: `O(9^m)` where `m` is the number of empty cells. In the worst case, for each empty cell, the algorithm tries 9 possibilities. Thus, if there are `m` empty cells, the complexity is bounded by `O(9^m)`. However, due to constraints, many branches are pruned early, making it much faster in practice.\n- **Space Complexity**: `O(m)` where `m` is the number of empty cells. This accounts for the recursion stack depth. In a 9x9 grid, the maximum depth of the recursion tree is 81. Therefore, the space complexity is bounded by `O(1)` as the maximum recursion depth is a constant (81).",
  },
  {
    id: "cases",
    title: "9. Best/Worst/Avg Case",
    content:
      "- **Best Case**: The grid is already filled or has very few empty cells that can be filled deterministically without backtracking. Time complexity is effectively `O(1)`.\n- **Worst Case**: `O(9^m)` where `m` is the number of empty cells. This happens when the algorithm has to explore almost all possible combinations before finding a solution or concluding no solution exists. An \"anti-Sudoku\" designed to thwart backtracking can trigger this.\n- **Average Case**: Highly dependent on the number of empty cells and their configuration. Heuristics like minimum remaining values (MRV) can significantly improve average performance by choosing the most constrained cell first.",
  },
  {
    id: "inplace-stability",
    title: "10. In-place & Stability",
    content:
      "- **In-place**: Yes. The algorithm modifies the given 2D array directly to fill in the missing numbers without allocating an auxiliary grid (other than the recursion stack).\n- **Stability**: Not applicable, as Sudoku solving is a constraint satisfaction problem, not a sorting algorithm.",
  },
  {
    id: "edge-cases",
    title: "11. Edge Cases",
    content:
      "- A completely empty grid (takes longest but yields a valid Sudoku).\n- A grid with multiple solutions (the algorithm simply returns the first one it finds).\n- An invalid initial grid (e.g., repeating numbers in a row, column, or box). The algorithm will return false immediately.\n- A completely filled valid grid (returns true without making any changes).",
  },
  {
    id: "applications",
    title: "12. Applications",
    content:
      "- Solving logic puzzles and crosswords.\n- Constraint Satisfaction Problems (CSPs).\n- Scheduling problems (e.g., university timetabling, nurse rostering).\n- Graph coloring problems (Sudoku is a specific instance of a 9-coloring problem on an 81-vertex graph).\n- Register allocation in compilers.",
  },
  {
    id: "common-mistakes",
    title: "13. Common Mistakes",
    content:
      "- **Forgetting to backtrack**: Not resetting `grid[row][col] = 0` when a recursive call returns false. This leads to invalid states being retained and corrupts the search space.\n- **Incorrect box checking logic**: Failing to correctly compute the top-left corner of the 3x3 subgrid using `row - row % 3` and `col - col % 3`.\n- **Redundant Searching**: Searching for the next empty cell from the very beginning `(0,0)` every time is inefficient. (Optimization: pass the current row/col index to continue searching).",
  },
  {
    id: "related-algorithms",
    title: "14. Related Algorithms",
    content:
      "- **N-Queens Problem**: Another classic backtracking problem based on constraint satisfaction.\n- **Graph Coloring**: Assigning colors to vertices such that no two adjacent vertices have the same color.\n- **Knights Tour**: Finding a sequence of moves for a knight on a chessboard to visit every square exactly once.\n- **Dancing Links (DLX)**: Donald Knuth's Algorithm X for solving exact cover problems, which is significantly faster for Sudoku than basic backtracking.",
  },
  {
    id: "interview-questions",
    title: "15. Interview Questions",
    content:
      "- **How does backtracking differ from a brute-force approach in Sudoku?** (Answer: Backtracking prunes the search space by checking constraints immediately, whereas pure brute force generates all `9^81` grids and then checks validity).\n- **How can you optimize the Sudoku solver?** (Answer: Precompute row/col/box states using bitmasks for `O(1)` validation, or use heuristics like Minimum Remaining Values to pick the most constrained cell first).\n- **What is the maximum recursion depth of this algorithm?** (Answer: 81, the total number of cells in a standard 9x9 grid).",
  },
  {
    id: "summary",
    title: "16. Summary",
    content:
      "The backtracking approach to solving Sudoku is an elegant demonstration of constraint satisfaction. By systematically exploring possible values and pruning invalid paths (backtracking) as early as possible, it efficiently navigates a seemingly massive search space. While worst-case time complexity is exponential, practical performance on standard puzzles is excellent. Advanced techniques like Exact Cover with Dancing Links can further optimize the process.",
  },
];

export const backtrackSudokuMcqs = [
  {
    id: "mcq-1",
    question: "What is the worst-case time complexity of the standard backtracking algorithm for an N x N Sudoku puzzle with m empty cells?",
    options: ["O(N^2)", "O(N * m)", "O(N^m)", "O(m^N)"],
    correctAnswer: 2,
    explanation: "For each of the m empty cells, the algorithm can try up to N possible numbers, leading to an O(N^m) worst-case time complexity.",
  },
  {
    id: "mcq-2",
    question: "In the context of solving a standard 9x9 Sudoku using backtracking, what is the maximum depth of the recursion tree?",
    options: ["9", "27", "81", "9^9"],
    correctAnswer: 2,
    explanation: "The maximum number of empty cells is 81. The algorithm makes one recursive call for each empty cell, so the maximum recursion depth is 81.",
  },
  {
    id: "mcq-3",
    question: "Which algorithmic paradigm does the standard Sudoku solver heavily rely on?",
    options: ["Dynamic Programming", "Greedy Strategy", "Divide and Conquer", "Backtracking"],
    correctAnswer: 3,
    explanation: "Sudoku is solved using Backtracking, which systematically tries possibilities and undoes them if they lead to an invalid state.",
  },
  {
    id: "mcq-4",
    question: "When implementing the Sudoku solver, failing to reset the cell to 0 after a recursive call returns false (omitting the backtrack step) will result in:",
    options: ["Infinite recursion", "A correct solution but slower execution", "The algorithm returning false for solvable puzzles or generating incorrect configurations", "A compilation error"],
    correctAnswer: 2,
    explanation: "If you don't reset the cell to 0, invalid guesses from dead-end branches persist in the grid, interfering with subsequent valid attempts and leading to failures.",
  },
  {
    id: "mcq-5",
    question: "A Sudoku grid can be modeled as a Graph Coloring problem. For a standard 9x9 Sudoku, how many vertices and colors are required?",
    options: ["81 vertices, 9 colors", "9 vertices, 81 colors", "81 vertices, 81 colors", "9 vertices, 9 colors"],
    correctAnswer: 0,
    explanation: "Each of the 81 cells is a vertex, and the 9 digits represent the 9 colors. Vertices in the same row, column, or block are connected by edges.",
  },
  {
    id: "mcq-6",
    question: "Consider the validation function for a 9x9 Sudoku. Which of the following expressions correctly computes the starting row index of the 3x3 subgrid containing `row`?",
    options: ["row / 3", "row % 3", "row - row % 3", "row - row / 3"],
    correctAnswer: 2,
    explanation: "`row - row % 3` perfectly rounds down to the nearest multiple of 3 (0, 3, or 6), giving the starting row of the 3x3 block.",
  },
  {
    id: "mcq-7",
    question: "If a Sudoku solver uses an array of bitmasks `rowMask[9]`, `colMask[9]`, and `boxMask[9]` to keep track of used digits, what is the time complexity of the constraint validation step?",
    options: ["O(1)", "O(9)", "O(27)", "O(81)"],
    correctAnswer: 0,
    explanation: "Using bitmasks allows for constraint checking using bitwise AND/OR operations in constant time, O(1).",
  },
  {
    id: "mcq-8",
    question: "Which of the following heuristics is most effective in speeding up the backtracking Sudoku solver's average case?",
    options: ["Picking the empty cell in a strict left-to-right, top-to-bottom order.", "Picking the empty cell with the Minimum Remaining Values (MRV).", "Picking the empty cell randomly.", "Trying numbers from 9 down to 1 instead of 1 to 9."],
    correctAnswer: 1,
    explanation: "The Minimum Remaining Values (MRV) heuristic chooses the cell with the fewest legal moves left, maximizing early pruning and vastly shrinking the search tree.",
  },
  {
    id: "mcq-9",
    question: "Which of the following problems is NOT fundamentally reducible to the Exact Cover problem, often solved efficiently by Donald Knuth's Dancing Links (Algorithm X) like Sudoku?",
    options: ["N-Queens Problem", "Minimum Spanning Tree", "Pentomino Tiling", "Graph Coloring"],
    correctAnswer: 1,
    explanation: "Minimum Spanning Tree is a polynomial-time graph optimization problem solved by Prim's or Kruskal's algorithm, unlike the NP-complete constraint satisfaction problems listed.",
  },
  {
    id: "mcq-10",
    question: "What is the space complexity of the standard backtracking Sudoku solver for an N x N grid (ignoring the input grid storage)?",
    options: ["O(1)", "O(N)", "O(N^2)", "O(2^N)"],
    correctAnswer: 2,
    explanation: "The maximum recursion depth corresponds to the maximum number of empty cells, which is N^2. Hence, the space complexity due to the call stack is O(N^2).",
  },
  {
    id: "mcq-11",
    question: "In a constraint satisfaction problem formulation of Sudoku, the constraints 'Each row, column, and box must contain all numbers from 1 to 9 exactly once' are examples of:",
    options: ["AllDifferent constraints", "Unary constraints", "Soft constraints", "Optimization constraints"],
    correctAnswer: 0,
    explanation: "An AllDifferent constraint requires that a set of variables must take distinct values, exactly what is required for rows, columns, and blocks in Sudoku.",
  },
  {
    id: "mcq-12",
    question: "If a backtracking algorithm explores a path and realizes the constraints are violated, what is the immediate next step it takes?",
    options: ["It terminates and returns false.", "It restarts the algorithm from the first cell.", "It undoes the last assignment and tries the next valid option.", "It marks the puzzle as unsolvable."],
    correctAnswer: 2,
    explanation: "Backtracking involves undoing the most recent choice and continuing the search with the next candidate value.",
  },
  {
    id: "mcq-13",
    question: "How many edges does the conflict graph of a standard 9x9 Sudoku puzzle have? (Two vertices are connected if they are in the same row, column, or 3x3 block)",
    options: ["81", "729", "810", "1620"],
    correctAnswer: 2,
    explanation: "Each of the 81 cells shares a row with 8 cells, a column with 8 cells, and a block with 4 other distinct cells. Degree = 20. Total edges = (81 * 20) / 2 = 810.",
  }
];

export const backtrackSudokuDebug = {
  code: `bool isSafe(int grid[9][9], int row, int col, int num) {
    for (int x = 0; x < 9; x++) {
        if (grid[row][x] == num) return false;
        if (grid[x][col] == num) return false;
    }
    
    int startRow = row - row % 3, startCol = col - col % 3;
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 3; j++) {
            if (grid[i + startRow][j + startRow] == num) {
                return false;
            }
        }
    }
    return true;
}`,
  buggyLine: "if (grid[i + startRow][j + startRow] == num) {",
  correctLine: "if (grid[i + startRow][j + startCol] == num) {",
  explanation: "The bug is in the condition checking the 3x3 box. It uses `startRow` for both the row and column index calculations. It should add `startCol` to `j` to correctly traverse the columns of the box."
};

export const backtrackSudokuDrag = {
  code: `bool solveSudoku(int grid[N][N]) {
    int row = -1, col = -1;
    bool isEmpty = false;
    
    // Find next empty cell
    for (int i = 0; i < N; i++) {
        for (int j = 0; j < N; j++) {
            if (grid[i][j] == 0) {
                row = i; col = j;
                isEmpty = true;
                break;
            }
        }
        if (isEmpty) break;
    }
    
    // If no empty cell is found, puzzle is solved
    if (!isEmpty) return true;
    
    for (int num = 1; num <= 9; num++) {
        if (isSafe(grid, row, col, num)) {
            grid[row][col] = num;
            
            // Recursive step
            if (solveSudoku(grid)) {
                return true;
            }
            
            // Backtrack
            grid[row][col] = 0;
        }
    }
    return false;
}`,
  options: [
    "grid[row][col] = num;",
    "grid[row][col] = 0;",
    "return true;",
    "if (solveSudoku(grid)) {",
    "if (isSafe(grid, row, col, num)) {"
  ],
  correctOrder: [
    "if (isSafe(grid, row, col, num)) {",
    "grid[row][col] = num;",
    "if (solveSudoku(grid)) {",
    "return true;",
    "grid[row][col] = 0;"
  ],
  explanation: "Inside the loop trying numbers 1-9, first check if the number is safe. If safe, assign it. Then recursively attempt to solve the rest of the grid. If the recursive call returns true, propagate the success upwards. If it fails, undo the assignment (backtrack) and try the next number."
};

export const backtrackSudokuComplete = {
  code: `bool solveSudoku(int grid[9][9]) {
    int row, col;
    bool isEmpty = false;
    
    for (int i = 0; i < 9; i++) {
        for (int j = 0; j < 9; j++) {
            if (grid[i][j] == 0) {
                row = i; col = j;
                isEmpty = true;
                break;
            }
        }
        if (isEmpty) break;
    }
    
    if (!isEmpty) __________;
    
    for (int num = 1; num <= 9; num++) {
        if (isSafe(grid, row, col, num)) {
            grid[row][col] = ________;
            
            if (__________) {
                return true;
            }
            
            grid[row][col] = ________;
        }
    }
    return false;
}`,
  solution: ["return true", "num", "solveSudoku(grid)", "0"],
  explanation: "If no empty cell is found, the puzzle is solved (`return true`). When placing a number, we assign `num` to the grid cell. Then we recursively call `solveSudoku(grid)`. If it returns false, we backtrack by resetting the cell to `0`."
};
