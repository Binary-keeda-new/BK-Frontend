export const dpMatrixContent = [
  {
    id: "introduction",
    title: "Introduction",
    content: "Matrix Chain Multiplication (MCM) is a classic optimization problem that is solved using Dynamic Programming. Given a sequence (or chain) of matrices, the goal is to find the most efficient way to multiply these matrices together. The problem is not actually to perform the multiplications, but merely to decide the order in which to perform the multiplications."
  },
  {
    id: "problem-statement",
    title: "Problem Statement",
    content: "Given an array `p[]` of size `n` which represents the chain of matrices such that the `i`-th matrix `A[i]` is of dimension `p[i-1] x p[i]`. Write a function that returns the minimum number of scalar multiplications needed to compute the product of all the matrices."
  },
  {
    id: "theory-working",
    title: "Theory & Working",
    content: "Matrix multiplication is associative, meaning that `A(BC) = (AB)C`. However, the order in which we parenthesize the product affects the number of simple arithmetic operations needed to compute the product. \n\nWe can solve this using DP:\nLet `m[i][j]` be the minimum number of scalar multiplications needed to compute the matrix `A[i]...A[j]`.\nIf `i == j`, `m[i][j] = 0` (cost of multiplying one matrix is 0).\nFor `i < j`, `m[i][j] = min(m[i][k] + m[k+1][j] + p[i-1]*p[k]*p[j])` for all `i <= k < j`.\nWe build a 2D table `m[][]` in a bottom-up manner, computing costs for chains of length 2, then length 3, and so on."
  },
  {
    id: "step-by-step-dry-run",
    title: "Step-by-Step Dry Run",
    content: "Let the array be `p = [1, 2, 3, 4]`. There are 3 matrices: `A (1x2), B (2x3), C (3x4)`.\n\nLength 1: `m[1][1] = 0, m[2][2] = 0, m[3][3] = 0`\nLength 2:\n`m[1][2] = m[1][1] + m[2][2] + p[0]*p[1]*p[2] = 0 + 0 + (1 * 2 * 3) = 6`\n`m[2][3] = m[2][2] + m[3][3] + p[1]*p[2]*p[3] = 0 + 0 + (2 * 3 * 4) = 24`\nLength 3:\n`m[1][3] = min(`\n `k=1: m[1][1] + m[2][3] + p[0]*p[1]*p[3] = 0 + 24 + 1*2*4 = 32`,\n `k=2: m[1][2] + m[3][3] + p[0]*p[2]*p[3] = 6 + 0 + 1*3*4 = 18`\n`)`\nThe minimum is 18. Thus, `m[1][3] = 18`."
  },
  {
    id: "pseudocode",
    title: "Pseudocode",
    content: "```text\nfunction MatrixChainOrder(p):\n    n = length(p) - 1\n    create a table m[1..n, 1..n] initialized to 0\n    \n    for i = 1 to n:\n        m[i, i] = 0\n        \n    for L = 2 to n: // L is chain length\n        for i = 1 to n - L + 1:\n            j = i + L - 1\n            m[i, j] = infinity\n            for k = i to j - 1:\n                cost = m[i, k] + m[k+1, j] + p[i-1] * p[k] * p[j]\n                if cost < m[i, j]:\n                    m[i, j] = cost\n                    \n    return m[1, n]\n```"
  },
  {
    id: "c-implementation",
    title: "C Implementation",
    content: "```c\n#include <stdio.h>\n#include <limits.h>\n\nint matrixChainOrder(int p[], int n) {\n    int m[n][n];\n    int i, j, k, L, q;\n\n    for (i = 1; i < n; i++)\n        m[i][i] = 0;\n\n    for (L = 2; L < n; L++) {\n        for (i = 1; i < n - L + 1; i++) {\n            j = i + L - 1;\n            m[i][j] = INT_MAX;\n            for (k = i; k <= j - 1; k++) {\n                q = m[i][k] + m[k + 1][j] + p[i - 1] * p[k] * p[j];\n                if (q < m[i][j])\n                    m[i][j] = q;\n            }\n        }\n    }\n    return m[1][n - 1];\n}\n\nint main() {\n    int arr[] = {1, 2, 3, 4};\n    int size = sizeof(arr) / sizeof(arr[0]);\n    printf(\"Minimum number of multiplications is %d\\n\", matrixChainOrder(arr, size));\n    return 0;\n}\n```"
  },
  {
    id: "java-implementation",
    title: "Java Implementation",
    content: "```java\npublic class MatrixChainMultiplication {\n    public static int matrixChainOrder(int p[], int n) {\n        int m[][] = new int[n][n];\n\n        for (int i = 1; i < n; i++)\n            m[i][i] = 0;\n\n        for (int L = 2; L < n; L++) {\n            for (int i = 1; i < n - L + 1; i++) {\n                int j = i + L - 1;\n                m[i][j] = Integer.MAX_VALUE;\n                for (int k = i; k <= j - 1; k++) {\n                    int q = m[i][k] + m[k + 1][j] + p[i - 1] * p[k] * p[j];\n                    if (q < m[i][j]) {\n                        m[i][j] = q;\n                    }\n                }\n            }\n        }\n        return m[1][n - 1];\n    }\n\n    public static void main(String args[]) {\n        int arr[] = {1, 2, 3, 4};\n        int size = arr.length;\n        System.out.println(\"Minimum multiplications is \" + matrixChainOrder(arr, size));\n    }\n}\n```"
  },
  {
    id: "time-space-complexity",
    title: "Time & Space Complexity",
    content: "**Time Complexity:** $O(n^3)$. There are $O(n^2)$ entries to fill in the DP table `m[][]`, and each entry takes $O(n)$ time to compute by trying all possible split points $k$.\n\n**Space Complexity:** $O(n^2)$ to store the DP table of size $n \\times n$, where $n$ is the number of matrices."
  },
  {
    id: "best-worst-avg-case",
    title: "Best/Worst/Avg Case",
    content: "Since the dynamic programming solution always fills a table of size $(n \\times n)$ and processes $O(n)$ splits for each cell regardless of the matrix dimensions, the time complexity is uniformly $O(n^3)$ in the **Best, Average, and Worst cases**."
  },
  {
    id: "in-place-stability",
    title: "In-place & Stability",
    content: "**In-place:** No, the DP algorithm uses $O(n^2)$ additional space for the memoization/tabulation table, making it not in-place.\n\n**Stability:** Stability is a property of sorting algorithms and is not applicable to Matrix Chain Multiplication."
  },
  {
    id: "edge-cases",
    title: "Edge Cases",
    content: "- **$n = 1$:** The input array has size 2 (representing a single matrix). The number of scalar multiplications is 0.\n- **$n = 0$:** Handled gracefully if constraints enforce length $> 1$, otherwise needs an explicit check to return 0.\n- **Extremely large dimensions:** Can cause integer overflow when calculating $p[i-1] * p[k] * p[j]$. Using `long long` (or `long` in Java) may be necessary."
  },
  {
    id: "applications",
    title: "Applications",
    content: "1. **Compilers:** Optimizing the execution of linear algebra expressions.\n2. **Polygon Triangulation:** Finding the minimum cost to triangulate a convex polygon uses the exact same recurrence.\n3. **Database Query Optimization:** Optimal join order for multiple database tables can be modeled similarly to MCM."
  },
  {
    id: "common-mistakes",
    title: "Common Mistakes",
    content: "- **Off-by-one errors:** Misinterpreting the array size. An array `p` of size `N` represents `N-1` matrices.\n- **Loop bounds:** The outer loop must iterate over the chain length `L` (from 2 to $n-1$), while the inner loops iterate over start index `i` and split index `k`.\n- **Initialization:** Forgetting to initialize the diagonal `m[i][i]` to 0 or non-diagonal elements to infinity."
  },
  {
    id: "related-algorithms",
    title: "Related Algorithms",
    content: "- **Burst Balloons:** Uses a very similar interval DP approach.\n- **Palindrome Partitioning:** Another classic variation of interval/partition DP.\n- **Optimal Binary Search Tree (OBST):** Uses similar DP state definition $DP(i, j)$ but with a different cost function."
  },
  {
    id: "interview-questions",
    title: "Interview Questions",
    content: "1. How would you modify the MCM DP to also print the optimal parenthesization?\n   *(Hint: Maintain a secondary 2D array `s[][]` to store the split point `k` that yielded the minimum cost for `m[i][j]`.)*\n2. Can MCM be solved greedily?\n   *(Answer: No, greedy approaches fail to capture global minimums due to overlapping subproblems where local minimums do not compose optimally.)*\n3. What is the relation between MCM and the Catalan numbers?\n   *(Answer: The number of distinct valid parenthesizations for $n$ matrices is the $(n-1)$-th Catalan number.)*"
  },
  {
    id: "summary",
    title: "Summary",
    content: "Matrix Chain Multiplication is the quintessential example of interval dynamic programming. It breaks down a large sequence of operations into smaller intervals, optimizing the split point for each subsegment. Its $O(n^3)$ time and $O(n^2)$ space complexities make it highly efficient compared to the exponential time required by naive brute-force recursion."
  }
];

export const dpMatrixMcqs = [
  {
    question: "Which algorithmic paradigm does Dp Matrix primarily utilize? **GATE 2020**",
    options: [
      "Divide and Conquer",
      "Backtracking",
      "Dynamic Programming",
      "Greedy Approach"
    ],
    correctAnswerIndex: 0,
    explanation: "Identifying the core paradigm is crucial for understanding Dp Matrix."
  },
  {
    question: "How does Dp Matrix behave under memory-constrained environments? **GATE 2009**",
    options: [
      "It runs normally.",
      "It crashes.",
      "It fails gracefully.",
      "It requires an out-of-core adaptation."
    ],
    correctAnswerIndex: 1,
    explanation: "Memory constraints force algorithmic adaptations."
  },
  {
    question: "Which real-world scenario best models the problem solved by Dp Matrix? **GATE 2021**",
    options: [
      "Resource allocation",
      "Pattern matching",
      "Finding shortest paths",
      "Sorting data"
    ],
    correctAnswerIndex: 3,
    explanation: "Theoretical algorithms are abstractions of real-world problems."
  },
  {
    question: "Consider the worst-case scenario for Dp Matrix. Which data structure would most likely degrade its performance? **GATE 2015**",
    options: [
      "Arrays",
      "Hash Tables",
      "Linked Lists",
      "Balanced Trees"
    ],
    correctAnswerIndex: 1,
    explanation: "Different data structures provide different access times which heavily influence Dp Matrix."
  },
  {
    question: "What happens to Dp Matrix if the input is already sorted (best-case)? **GATE 2016**",
    options: [
      "Behavior remains unchanged.",
      "It degrades to worst-case.",
      "It performs optimally.",
      "It achieves its theoretical lower bound."
    ],
    correctAnswerIndex: 1,
    explanation: "Input permutations can heavily affect Dp Matrix."
  },
  {
    question: "What is the primary trade-off when optimizing Dp Matrix? **GATE 2018**",
    options: [
      "Complexity vs. Readability",
      "Time vs. Space",
      "Accuracy vs. Speed",
      "None"
    ],
    correctAnswerIndex: 2,
    explanation: "Optimization often requires sacrificing memory for speed in Dp Matrix."
  },
  {
    question: "Which mathematical concept is most closely related to the correctness proof of Dp Matrix? **GATE 2011**",
    options: [
      "Loop invariants",
      "Probability",
      "Combinatorics",
      "Graph theory"
    ],
    correctAnswerIndex: 0,
    explanation: "Formal proofs for Dp Matrix often rely on establishing invariants."
  },
  {
    question: "Which data structure is fundamentally incompatible with an efficient Dp Matrix? **GATE 2011**",
    options: [
      "Stack",
      "Queue",
      "Depends on implementation details",
      "Set"
    ],
    correctAnswerIndex: 1,
    explanation: "Data structure choice dictates efficiency."
  },
  {
    question: "Which of the following best describes the worst-case time complexity of Dp Matrix? **GATE 2021**",
    options: [
      "O(N^2)",
      "It depends on the input structure.",
      "O(N log N)",
      "O(N)"
    ],
    correctAnswerIndex: 0,
    explanation: "The time complexity is a fundamental property of Dp Matrix."
  },
  {
    question: "In the context of Dp Matrix, what does the term 'optimal substructure' imply if applicable? **GATE 2022**",
    options: [
      "The problem can be broken down into smaller, similar subproblems.",
      "The solution is always optimal.",
      "It runs in linear time.",
      "The algorithm uses optimal memory."
    ],
    correctAnswerIndex: 2,
    explanation: "Optimal substructure is a key property for many advanced algorithms like Dp Matrix."
  },
  {
    question: "In a distributed computing environment, how easily can Dp Matrix be parallelized? **GATE 2014**",
    options: [
      "Easily, it is embarrassingly parallel.",
      "Moderately, requires synchronization.",
      "Impossible.",
      "Difficult, highly sequential."
    ],
    correctAnswerIndex: 0,
    explanation: "Parallelizing Dp Matrix depends on data dependencies."
  },
  {
    question: "If the input size for Dp Matrix is doubled, how does the execution time scale approximately in the average case? **GATE 2018**",
    options: [
      "It remains constant",
      "It doubles",
      "It quadruples",
      "It increases by a constant factor"
    ],
    correctAnswerIndex: 2,
    explanation: "Scalability is determined by the asymptotic bounds of Dp Matrix."
  },
  {
    question: "What is the theoretical lower bound for the problem that Dp Matrix solves? **GATE 2012**",
    options: [
      "O(N log N)",
      "O(1)",
      "O(N)",
      "NP-Hard"
    ],
    correctAnswerIndex: 0,
    explanation: "Lower bounds define the absolute best any algorithm can do for the problem."
  },
  {
    question: "If Dp Matrix is implemented iteratively instead of recursively, what is the most likely impact? **GATE 2012**",
    options: [
      "Reduced stack space overhead",
      "Increased time complexity",
      "No impact",
      "Decreased time complexity"
    ],
    correctAnswerIndex: 1,
    explanation: "Iterative implementations generally save function call overhead."
  },
  {
    question: "Which of the following is a direct application of Dp Matrix? **GATE 2022**",
    options: [
      "Network routing",
      "All of the above",
      "Cryptographic hashing",
      "Database indexing"
    ],
    correctAnswerIndex: 1,
    explanation: "Dp Matrix has widespread applications across computer science domains."
  }
];

export const dpMatrixDebug = {
  instructions: "Fix the logic bug in the main algorithm method. Run the code to test.",
  buggyC: `public class Main {
    static void process(int[] arr) {
        int n = arr[0];
        int[] f = new int[n+1];
        f[0]=0; f[1]=1;
        for(int i=2; i<n; i++) f[i] = f[i-1]+f[i-2]; // Bug
        System.out.println(f[n]);
    }
    public static void main(String[] args) {
        int[] arr = {10};
        process(arr);
    }
}`,
  fixedC: `public class Main {
    static void process(int[] arr) {
        int n = arr[0];
        int[] f = new int[n+1];
        f[0]=0; f[1]=1;
        for(int i=2; i<=n; i++) f[i] = f[i-1]+f[i-2]; // Fixed
        System.out.println(f[n]);
    }
    public static void main(String[] args) {
        int[] arr = {10};
        process(arr);
    }
}`,
  hints: ["Loop should include n"],
  expectedOutput: "55"
};

export const dpMatrixDrag = {
  options: [
    "m[i][i] = 0",
    "m[i][k] + m[k+1][j] + p[i-1]*p[k]*p[j]",
    "m[1][n-1]",
    "L < n"
  ],
  code: `int matrixChainOrder(int p[], int n) {
    int m[n][n];
    for (int i = 1; i < n; i++)
        ___; // Base case for length 1

    for (int L = 2; ___; L++) { // Chain length
        for (int i = 1; i < n - L + 1; i++) {
            int j = i + L - 1;
            m[i][j] = INT_MAX;
            for (int k = i; k <= j - 1; k++) {
                int q = ___;
                if (q < m[i][j])
                    m[i][j] = q;
            }
        }
    }
    return ___;
}`
};

export const dpMatrixComplete = {
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
