export const backtrackNQueensContent = [
  {
    id: "1",
    title: "1. Introduction",
    content: "The **N-Queens problem** is a classic algorithmic problem that seeks to place N non-attacking queens on an N×N chessboard. It is a canonical example of solving constraint satisfaction problems using **Backtracking**, a technique that systematically searches for a solution by exploring all possibilities and abandoning (backtracking) paths that fail to satisfy constraints."
  },
  {
    id: "2",
    title: "2. Problem Statement",
    content: "**Problem:** Given an integer N, place N chess queens on an N×N chessboard so that no two queens threaten each other.\n\n**Constraints:**\n1. No two queens can share the same row.\n2. No two queens can share the same column.\n3. No two queens can share the same diagonal (both major and minor diagonals).\n\n**Output:** Return all possible distinct solutions or simply count the total number of valid configurations."
  },
  {
    id: "3",
    title: "3. Theory & Working",
    content: "Backtracking builds a solution incrementally, row by row (or column by column). \n\n**Key steps:**\n1. Start in the leftmost column (or top row).\n2. If all queens are placed, a valid solution is found.\n3. Try all rows in the current column. For each row:\n   - Check if the queen can be placed safely (no other queen in the same row, upper diagonal, or lower diagonal).\n   - If safe, place the queen and recursively solve for the next column.\n   - If placing the queen leads to no solution, remove it (backtrack) and try the next row.\n4. If all rows have been tried and none worked, return false to trigger backtracking in the previous column."
  },
  {
    id: "4",
    title: "4. Step-by-Step Dry Run",
    content: "Let's dry run for N = 4. We place queens column by column.\n\n- **Col 0:** Try Row 0. Safe. Place Q at (0,0).\n- **Col 1:** \n  - Row 0: attacked by (0,0).\n  - Row 1: attacked by (0,0) diagonally.\n  - Row 2: Safe. Place Q at (2,1).\n- **Col 2:**\n  - Row 0: attacked.\n  - Row 1: attacked.\n  - Row 2: attacked.\n  - Row 3: attacked.\n  No safe row! Backtrack to Col 1.\n- **Col 1:** Remove Q at (2,1). Try Row 3. Safe. Place Q at (3,1).\n- **Col 2:**\n  - Try Row 0: attacked.\n  - Try Row 1: Safe. Place Q at (1,2).\n- **Col 3:**\n  - Row 0: attacked.\n  - Row 1: attacked.\n  - Row 2: Safe. Place Q at (2,3).\n- **All 4 queens placed!** Valid configuration found."
  },
  {
    id: "5",
    title: "5. Pseudocode",
    content: "```text\nfunction solveNQueens(board, col):\n    if col >= N:\n        add board configuration to solutions\n        return true\n\n    res = false\n    for row from 0 to N-1:\n        if isSafe(board, row, col):\n            board[row][col] = 1\n            res = solveNQueens(board, col + 1) or res\n            board[row][col] = 0 // backtrack\n    return res\n\nfunction isSafe(board, row, col):\n    // Check row on left side\n    for i = 0 to col-1: if board[row][i] == 1 return false\n    // Check upper diagonal on left side\n    for i=row, j=col; i>=0 and j>=0; i--, j--: if board[i][j] == 1 return false\n    // Check lower diagonal on left side\n    for i=row, j=col; j>=0 and i<N; i++, j--: if board[i][j] == 1 return false\n    return true\n```"
  },
  {
    id: "6",
    title: "6. C Implementation",
    content: "```c\n#include <stdio.h>\n#include <stdbool.h>\n\n#define N 4\n\nvoid printSolution(int board[N][N]) {\n    for (int i = 0; i < N; i++) {\n        for (int j = 0; j < N; j++)\n            printf(\" %d \", board[i][j]);\n        printf(\"\\n\");\n    }\n    printf(\"\\n\");\n}\n\nbool isSafe(int board[N][N], int row, int col) {\n    int i, j;\n    for (i = 0; i < col; i++)\n        if (board[row][i]) return false;\n    for (i = row, j = col; i >= 0 && j >= 0; i--, j--)\n        if (board[i][j]) return false;\n    for (i = row, j = col; j >= 0 && i < N; i++, j--)\n        if (board[i][j]) return false;\n    return true;\n}\n\nbool solveNQUtil(int board[N][N], int col) {\n    if (col >= N) {\n        printSolution(board);\n        return true;\n    }\n    bool res = false;\n    for (int i = 0; i < N; i++) {\n        if (isSafe(board, i, col)) {\n            board[i][col] = 1;\n            res = solveNQUtil(board, col + 1) || res;\n            board[i][col] = 0;\n        }\n    }\n    return res;\n}\n\nvoid solveNQ() {\n    int board[N][N] = {0};\n    if (!solveNQUtil(board, 0)) {\n        printf(\"Solution does not exist\");\n    }\n}\n```"
  },
  {
    id: "7",
    title: "7. Java Implementation",
    content: "```java\npublic class NQueens {\n    final int N = 4;\n\n    void printSolution(int board[][]) {\n        for (int i = 0; i < N; i++) {\n            for (int j = 0; j < N; j++)\n                System.out.print(\" \" + board[i][j] + \" \");\n            System.out.println();\n        }\n        System.out.println();\n    }\n\n    boolean isSafe(int board[][], int row, int col) {\n        int i, j;\n        for (i = 0; i < col; i++)\n            if (board[row][i] == 1) return false;\n        for (i = row, j = col; i >= 0 && j >= 0; i--, j--)\n            if (board[i][j] == 1) return false;\n        for (i = row, j = col; j >= 0 && i < N; i++, j--)\n            if (board[i][j] == 1) return false;\n        return true;\n    }\n\n    boolean solveNQUtil(int board[][], int col) {\n        if (col >= N) {\n            printSolution(board);\n            return true;\n        }\n        boolean res = false;\n        for (int i = 0; i < N; i++) {\n            if (isSafe(board, i, col)) {\n                board[i][col] = 1;\n                res = solveNQUtil(board, col + 1) || res;\n                board[i][col] = 0; // backtrack\n            }\n        }\n        return res;\n    }\n\n    public static void main(String args[]) {\n        NQueens Queen = new NQueens();\n        int board[][] = new int[Queen.N][Queen.N];\n        Queen.solveNQUtil(board, 0);\n    }\n}\n```"
  },
  {
    id: "8",
    title: "8. Time & Space Complexity",
    content: "**Time Complexity: O(N!)**\nIn the worst case, we place a queen in each row. For the first column, we have N choices, for the second N-1 choices, and so on. Though pruning reduces the search space significantly, the upper bound is modeled as O(N!). More precisely, it is O(N^N) if we don't prune effectively, but standard backtracking bounds it to O(N!).\n\n**Space Complexity: O(N^2) or O(N)**\nThe 2D matrix takes O(N^2) space. However, if we store the board state as a 1D array where `board[i]` stores the row index of the queen in column `i`, the space is reduced to O(N). The recursion stack also requires O(N) space. Hence, optimized space complexity is O(N)."
  },
  {
    id: "9",
    title: "9. Best/Worst/Avg Case",
    content: "**Best Case:** When only the first valid solution is required, and the heuristic choice leads straight to it. Still, asymptotically, it's exponential.\n\n**Worst Case:** O(N!). If we need to find all valid configurations, the algorithm explores all valid paths and safe non-paths up to the point of failure.\n\n**Average Case:** It remains highly exponential. Performance degrades drastically as N increases beyond 15-20, necessitating advanced techniques (like SAT solvers or bitwise operations for minor speedups) for larger N."
  },
  {
    id: "10",
    title: "10. In-place & Stability",
    content: "**In-place:** Yes. Backtracking inherently reuses the same memory configuration (the board matrix or state array) by modifying it and restoring it upon backtracking.\n\n**Stability:** Stability is a property of sorting algorithms. For constraint satisfaction algorithms like N-Queens, stability is not a relevant characteristic."
  },
  {
    id: "11",
    title: "11. Edge Cases",
    content: "- **N = 1:** The trivial solution exists (place the queen at 0,0).\n- **N = 2 & N = 3:** No valid solutions exist. Queens will always attack each other regardless of placement.\n- **Large N (e.g., N > 20):** Standard backtracking becomes computationally infeasible due to the factorial time complexity. Heuristic or probabilistic algorithms (like Min-Conflicts) are preferred."
  },
  {
    id: "12",
    title: "12. Applications",
    content: "- **Constraint Satisfaction Problems (CSP):** N-Queens is the quintessential example of CSPs.\n- **Resource Allocation:** Resolving conflicting schedules or placements.\n- **VLSI Design & AI:** Algorithms similar to N-Queens routing and placements without collisions.\n- **Mathematical Recreations & Combinatorics:** Counting the number of solutions maps to deep combinatorial series (e.g., OEIS A000170)."
  },
  {
    id: "13",
    title: "13. Common Mistakes",
    content: "- **Forgetting to Un-mark (Backtrack):** The most common error is forgetting to reset `board[i][col] = 0` after returning from a failed recursive call.\n- **Checking all directions unnecessarily:** When placing column by column left-to-right, we only need to check attacks from the left side (left row, left upper diagonal, left lower diagonal). Checking the right side is redundant and wastes cycles.\n- **Not terminating properly:** Failing to return correctly after printing a solution if only one solution is needed."
  },
  {
    id: "14",
    title: "14. Related Algorithms",
    content: "- **Sudoku Solver:** Another classic backtracking problem filling a 9x9 grid.\n- **Graph Coloring:** Assigning colors to vertices such that no two adjacent vertices have the same color.\n- **Hamiltonian Cycle:** Finding a path in a graph that visits every vertex exactly once.\n- **Subset Sum / Knapsack (Backtracking variant):** Finding combinations of elements summing to a target."
  },
  {
    id: "15",
    title: "15. Interview Questions",
    content: "1. Can you optimize the `isSafe` check to O(1)? (Hint: Use arrays to keep track of occupied rows and diagonals).\n2. How many solutions exist for N=1, N=2, and N=3?\n3. Modify the code to return only the first valid configuration instead of all configurations.\n4. How would you solve the N-Rooks problem? How does it differ from N-Queens?\n5. Explain the bitwise optimized version of N-Queens."
  },
  {
    id: "16",
    title: "16. Summary",
    content: "The N-Queens problem vividly demonstrates the power and simplicity of the **Backtracking** paradigm. By systematically searching and pruning dead-end branches (where a queen is under attack), the algorithm efficiently explores an otherwise massive search space. Though its worst-case time complexity is O(N!), optimization techniques (like O(1) collision checks or bitwise representations) make it elegant and highly instructive for algorithmic problem-solving."
  }
];

export const backtrackNQueensMcqs = [
  {
    id: "nq1",
    question: "What is the worst-case time complexity of the standard Backtracking algorithm for the N-Queens problem?",
    options: [
      "O(N^2)",
      "O(2^N)",
      "O(N!)",
      "O(N^N)"
    ],
    correctAnswerIndex: 2,
    explanation: "The worst-case time complexity of the standard backtracking approach is bounded by O(N!), because we have N choices for the first column, N-1 valid rows for the second, and so forth."
  },
  {
    id: "nq2",
    question: "For which of the following values of N does the N-Queens problem have NO valid solution?",
    options: [
      "N = 1",
      "N = 2 and N = 3",
      "N = 4",
      "N = 8"
    ],
    correctAnswerIndex: 1,
    explanation: "For N=2 and N=3, it is impossible to place queens without them attacking each other. N=1 has 1 solution, and N>=4 have solutions."
  },
  {
    id: "nq3",
    question: "In the standard column-by-column backtracking approach for N-Queens, why is it sufficient to check only the left side (left row, left upper diagonal, left lower diagonal) in the `isSafe` function?",
    options: [
      "Because queens can only move leftwards.",
      "Because the right side of the board is assumed to be symmetric.",
      "Because queens are placed sequentially from left to right, meaning no queens exist on the right side yet.",
      "Because checking the right side increases time complexity to O(N!)."
    ],
    correctAnswerIndex: 2,
    explanation: "Since the algorithm places queens column by column from left to right (0 to N-1), at any point when placing a queen in column `c`, all columns > `c` are completely empty."
  },
  {
    id: "nq4",
    question: "To optimize the `isSafe` function from O(N) to O(1), one can use supplementary arrays. Which structural properties identify the two diagonals for a cell at (row, col)?",
    options: [
      "Primary diagonal: row + col is constant; Secondary diagonal: row - col is constant.",
      "Primary diagonal: row - col is constant; Secondary diagonal: row + col is constant.",
      "Primary diagonal: row * col is constant; Secondary diagonal: row / col is constant.",
      "Primary diagonal: row == col; Secondary diagonal: row != col."
    ],
    correctAnswerIndex: 1,
    explanation: "Cells on the same major (primary) diagonal have the same `row - col` value. Cells on the same minor (secondary) diagonal have the same `row + col` value."
  },
  {
    id: "nq5",
    question: "What is the space complexity of the N-Queens backtracking algorithm if we represent the board as a 1D array of size N (where array[i] = row position of queen in column i)?",
    options: [
      "O(1)",
      "O(log N)",
      "O(N)",
      "O(N^2)"
    ],
    correctAnswerIndex: 2,
    explanation: "Using a 1D array of size N requires O(N) space. The recursion stack for backtracking also goes up to depth N, taking O(N) auxiliary space. Thus, overall space complexity is O(N)."
  },
  {
    id: "nq6",
    question: "Which of the following problems is NOT typically solved using the Backtracking paradigm?",
    options: [
      "Sudoku Solver",
      "Graph Coloring",
      "Finding the Shortest Path in an unweighted graph",
      "Hamiltonian Cycle"
    ],
    correctAnswerIndex: 2,
    explanation: "Finding the shortest path in an unweighted graph is efficiently solved using Breadth-First Search (BFS), not Backtracking."
  },
  {
    id: "nq7",
    question: "When backtracking, after returning from a recursive call that explored placing a queen at `board[i][col]`, what is the immediate next step?",
    options: [
      "Increment `col` by 1.",
      "Return true to the parent function.",
      "Remove the queen from `board[i][col]` (i.e., undo the choice).",
      "Halt the execution as a solution is found."
    ],
    correctAnswerIndex: 2,
    explanation: "This is the core of backtracking. After exploring a path (whether it yielded a solution or failed), the choice is undone (`board[i][col] = 0`) to allow exploring other possibilities."
  },
  {
    id: "nq8",
    question: "Consider an N-Queens implementation. If the base case is `if (col == N) return true;`, how does the algorithm behave differently from `if (col == N) { printSolution(); return false; }`?",
    options: [
      "The first stops after finding the first valid solution; the second explores and prints all valid solutions.",
      "The first prints all solutions; the second prints none.",
      "The first crashes; the second is structurally correct.",
      "There is no difference in behavior."
    ],
    correctAnswerIndex: 0,
    explanation: "Returning `true` cascades up the recursion tree and stops the search. Returning `false` forces the algorithm to pretend the current valid configuration failed, triggering it to backtrack and find all other valid solutions."
  },
  {
    id: "nq9",
    question: "Which algorithmic strategy generates all possible states in the N-Queens problem blindly without considering constraints until a full state is formed?",
    options: [
      "Backtracking",
      "Branch and Bound",
      "Dynamic Programming",
      "Brute Force (Generate and Test)"
    ],
    correctAnswerIndex: 3,
    explanation: "Brute Force (Generate and Test) generates complete combinations before checking constraints. Backtracking is smarter as it prunes partial invalid states immediately."
  },
  {
    id: "nq10",
    question: "In bitwise optimization of the N-Queens problem, how are the constraints (row, left diagonal, right diagonal) typically represented?",
    options: [
      "As Boolean arrays",
      "As integers where each bit represents an occupied or free position",
      "As floating point numbers",
      "As linked lists"
    ],
    correctAnswerIndex: 1,
    explanation: "Bitwise N-Queens uses integers where the bits track occupied rows and diagonals. Bitwise shifts (`<<`, `>>`) easily update the diagonal constraints for the next row/column, making it extremely fast."
  }
];

export const backtrackNQueensDebug = {
  instructions: "Fix the syntax error so the code compiles correctly.",
  buggyC: "#include <stdio.h>\n\nint main() {\n    printf(\"Hello World\")\n    return 0;\n}",
  fixedC: "#include <stdio.h>\n\nint main() {\n    printf(\"Hello World\\n\");\n    return 0;\n}",
  buggyJava: "public class Main {\n    public static void main(String[] args) {\n        System.out.printl(\"Hello World\");\n    }\n}",
  fixedJava: "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello World\");\n    }\n}",
  hints: ["Check the print statement.","Missing semicolon or wrong spelling?","Fix it!"],
  expectedOutput: "Hello World"
};

export const backtrackNQueensDrag = {
  id: "drag-nqueens",
  title: "Drag and Drop: N-Queens Backtracking",
  description: "Complete the `solveNQueens` function by dragging the correct logic blocks into place.",
  options: [
    "if (col >= N)",
    "if (isSafe(board, i, col))",
    "board[i][col] = 1;",
    "board[i][col] = 0;",
    "solveNQueens(board, col + 1)"
  ],
  template: `
bool solveNQueens(int board[N][N], int col) {
    // Base Case
    ^^^0^^^ {
        return true;
    }

    for (int i = 0; i < N; i++) {
        // Check if queen can be placed
        ^^^1^^^ {
            // Place queen
            ^^^2^^^
            
            // Recurse
            if (^^^4^^^)
                return true;
                
            // Backtrack
            ^^^3^^^
        }
    }
    return false;
}
  `,
  correctOrder: [
    "if (col >= N)",
    "if (isSafe(board, i, col))",
    "board[i][col] = 1;",
    "board[i][col] = 0;",
    "solveNQueens(board, col + 1)"
  ],
  explanation: "First, check the base case (col >= N). Then loop through rows. If `isSafe`, place the queen (`board[i][col] = 1`). Then recursively solve for `col + 1`. If it fails, backtrack by setting `board[i][col] = 0`."
};

export const backtrackNQueensComplete = {
  id: "complete-nqueens",
  title: "Complete the Code: isSafe Function",
  description: "Fill in the missing conditions to check if a queen can be safely placed at `board[row][col]`. Remember we only need to check the left side.",
  codeTemplate: `
bool isSafe(int board[N][N], int row, int col) {
    int i, j;
    
    // Check this row on left side
    for (i = 0; i < col; i++)
        if (^^^0^^^) return false;
        
    // Check upper diagonal on left side
    for (i = row, j = col; i >= 0 && j >= 0; i--, j--)
        if (^^^1^^^) return false;
        
    // Check lower diagonal on left side
    for (i = row, j = col; j >= 0 && i < N; i++, j--)
        if (^^^2^^^) return false;
        
    return true;
}
  `,
  blanks: [
    "board[row][i]",
    "board[i][j]",
    "board[i][j]"
  ],
  explanation: "1) `board[row][i]` checks the same row to the left. 2) `board[i][j]` checks the upper left diagonal. 3) `board[i][j]` checks the lower left diagonal."
};
