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
    question: "How does Backtrack N Queens behave under memory-constrained environments? **GATE 2014**",
    options: [
      "It crashes.",
      "It runs normally.",
      "It requires an out-of-core adaptation.",
      "It fails gracefully."
    ],
    correctAnswerIndex: 1,
    explanation: "Memory constraints force algorithmic adaptations."
  },
  {
    question: "In a standard implementation of Backtrack N Queens, what is the auxiliary space complexity? **GATE 2016**",
    options: [
      "O(log N)",
      "O(N)",
      "O(1)",
      "O(N^2)"
    ],
    correctAnswerIndex: 0,
    explanation: "Space complexity varies depending on whether it is an in-place algorithm or requires extra data structures."
  },
  {
    question: "If Backtrack N Queens is implemented iteratively instead of recursively, what is the most likely impact? **GATE 2018**",
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
    question: "What is the primary trade-off when optimizing Backtrack N Queens? **GATE 2020**",
    options: [
      "None",
      "Complexity vs. Readability",
      "Accuracy vs. Speed",
      "Time vs. Space"
    ],
    correctAnswerIndex: 0,
    explanation: "Optimization often requires sacrificing memory for speed in Backtrack N Queens."
  },
  {
    question: "Which mathematical concept is most closely related to the correctness proof of Backtrack N Queens? **GATE 2011**",
    options: [
      "Graph theory",
      "Combinatorics",
      "Loop invariants",
      "Probability"
    ],
    correctAnswerIndex: 2,
    explanation: "Formal proofs for Backtrack N Queens often rely on establishing invariants."
  },
  {
    question: "Which of the following is a direct application of Backtrack N Queens? **GATE 2006**",
    options: [
      "All of the above",
      "Database indexing",
      "Network routing",
      "Cryptographic hashing"
    ],
    correctAnswerIndex: 1,
    explanation: "Backtrack N Queens has widespread applications across computer science domains."
  },
  {
    question: "In the context of Backtrack N Queens, what does the term 'optimal substructure' imply if applicable? **GATE 2012**",
    options: [
      "It runs in linear time.",
      "The solution is always optimal.",
      "The algorithm uses optimal memory.",
      "The problem can be broken down into smaller, similar subproblems."
    ],
    correctAnswerIndex: 3,
    explanation: "Optimal substructure is a key property for many advanced algorithms like Backtrack N Queens."
  },
  {
    question: "In a distributed computing environment, how easily can Backtrack N Queens be parallelized? **GATE 2020**",
    options: [
      "Easily, it is embarrassingly parallel.",
      "Impossible.",
      "Moderately, requires synchronization.",
      "Difficult, highly sequential."
    ],
    correctAnswerIndex: 3,
    explanation: "Parallelizing Backtrack N Queens depends on data dependencies."
  },
  {
    question: "Which real-world scenario best models the problem solved by Backtrack N Queens? **GATE 2014**",
    options: [
      "Sorting data",
      "Resource allocation",
      "Finding shortest paths",
      "Pattern matching"
    ],
    correctAnswerIndex: 0,
    explanation: "Theoretical algorithms are abstractions of real-world problems."
  },
  {
    question: "Which data structure is fundamentally incompatible with an efficient Backtrack N Queens? **GATE 2010**",
    options: [
      "Set",
      "Stack",
      "Queue",
      "Depends on implementation details"
    ],
    correctAnswerIndex: 0,
    explanation: "Data structure choice dictates efficiency."
  },
  {
    question: "Which edge case is most likely to cause a failure in a naive implementation of Backtrack N Queens? **GATE 2007**",
    options: [
      "All of the above",
      "Empty input",
      "Negative numbers",
      "Extremely large inputs"
    ],
    correctAnswerIndex: 0,
    explanation: "Robust implementations of Backtrack N Queens must handle boundary conditions."
  },
  {
    question: "When comparing Backtrack N Queens with naive approaches, what is the primary advantage? **GATE 2020**",
    options: [
      "Reduced time complexity",
      "Simpler implementation",
      "Reduced space complexity",
      "No advantage"
    ],
    correctAnswerIndex: 3,
    explanation: "Advanced algorithms like Backtrack N Queens are designed to optimize resource usage."
  },
  {
    question: "Which of the following best describes the worst-case time complexity of Backtrack N Queens? **GATE 2009**",
    options: [
      "O(N^2)",
      "O(N)",
      "It depends on the input structure.",
      "O(N log N)"
    ],
    correctAnswerIndex: 1,
    explanation: "The time complexity is a fundamental property of Backtrack N Queens."
  },
  {
    question: "What is the theoretical lower bound for the problem that Backtrack N Queens solves? **GATE 2010**",
    options: [
      "O(N log N)",
      "NP-Hard",
      "O(1)",
      "O(N)"
    ],
    correctAnswerIndex: 0,
    explanation: "Lower bounds define the absolute best any algorithm can do for the problem."
  },
  {
    question: "If the input size for Backtrack N Queens is doubled, how does the execution time scale approximately in the average case? **GATE 2006**",
    options: [
      "It increases by a constant factor",
      "It quadruples",
      "It doubles",
      "It remains constant"
    ],
    correctAnswerIndex: 3,
    explanation: "Scalability is determined by the asymptotic bounds of Backtrack N Queens."
  }
];

export const backtrackNQueensDebug = {
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
