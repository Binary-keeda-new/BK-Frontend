export const advSparseTableContent = [
  {
    id: "intro",
    title: "1. Introduction",
    content: "A Sparse Table is an advanced data structure used to answer range queries on a static array. It is highly acclaimed for answering Range Minimum Queries (RMQ) or Range Maximum Queries in **O(1)** time after an **O(N log N)** preprocessing step. It is heavily utilized for **idempotent** operations—operations where combining a value with itself yields the same value (e.g., `min`, `max`, `gcd`, `bitwise AND`/`OR`)."
  },
  {
    id: "problem-statement",
    title: "2. Problem Statement",
    content: "Given an array `A` of size `N`, answer `Q` queries of the form `query(L, R)` efficiently.\n- **Constraint:** The array is static (no updates).\n- **Query:** Find the minimum element in the subarray `A[L...R]`.\nA naive approach takes $O(N)$ per query, resulting in $O(Q \\times N)$. A Segment Tree takes $O(\\log N)$ per query. For very large $Q$, we need an approach that answers each query in $O(1)$ time."
  },
  {
    id: "theory-working",
    title: "3. Theory & Working",
    content: "The core idea of a Sparse Table is to precompute the answers for all intervals whose lengths are powers of 2. For an array of size $N$, the maximum power of 2 length is $\\lfloor \\log_2 N \\rfloor$. We maintain a 2D array `st[i][j]` which stores the answer for the interval starting at index `i` of length $2^j$ (i.e., interval $[i, i + 2^j - 1]$).\n\n**Preprocessing:**\n- `st[i][0] = A[i]` (Interval of length $2^0 = 1$ is the element itself).\n- For $j > 0$, the interval of length $2^j$ can be split into two halves of length $2^{j-1}$:\n  `st[i][j] = min(st[i][j-1], st[i + 2^{j-1}][j-1])`.\n\n**Querying:**\nTo answer `query(L, R)` for an idempotent operation, we find the largest power of 2, say $2^k$, that fits in the length of the interval $len = R - L + 1$. We then take the minimum of two overlapping intervals of length $2^k$ that cover $[L, R]$ entirely:\n`ans = min(st[L][k], st[R - 2^k + 1][k])`."
  },
  {
    id: "dry-run",
    title: "4. Step-by-Step Dry Run",
    content: "Let's dry run the preprocessing for array `A = [7, 2, 3, 0, 5]`.\n$N = 5, \\lfloor \\log_2 5 \\rfloor = 2$. Table dimensions: $5 \\times 3$.\n\n**j = 0 (length 1):**\nst[i][0] = [7, 2, 3, 0, 5]\n\n**j = 1 (length 2):**\nst[0][1] = min(st[0][0], st[1][0]) = min(7, 2) = 2\nst[1][1] = min(st[1][0], st[2][0]) = min(2, 3) = 2\nst[2][1] = min(st[2][0], st[3][0]) = min(3, 0) = 0\nst[3][1] = min(st[3][0], st[4][0]) = min(0, 5) = 0\n\n**j = 2 (length 4):**\nst[0][2] = min(st[0][1], st[2][1]) = min(2, 0) = 0\nst[1][2] = min(st[1][1], st[3][1]) = min(2, 0) = 0\n\n**Query(1, 4):**\n$L=1, R=4$, length $= 4$. Largest power of 2 is $k=2$ ($2^2 = 4$).\nAnswer $= \\min(st[1][2], st[4 - 4 + 1][2]) = \\min(st[1][2], st[1][2]) = 0$."
  },
  {
    id: "pseudocode",
    title: "5. Pseudocode",
    content: "```text\n// Precomputation\nfor i from 0 to N-1:\n    st[i][0] = A[i]\n\nfor j from 1 to log2(N):\n    for i from 0 to N - (1 << j):\n        st[i][j] = min(st[i][j-1], st[i + (1 << (j-1))][j-1])\n\n// Precompute logs for O(1) query\nlog[1] = 0\nfor i from 2 to N:\n    log[i] = log[i/2] + 1\n\n// Query L to R\nfunction query(L, R):\n    k = log[R - L + 1]\n    return min(st[L][k], st[R - (1 << k) + 1][k])\n```"
  },
  {
    id: "c-implementation",
    title: "6. C Implementation",
    content: "```c\n#include <stdio.h>\n#include <math.h>\n\n#define MAXN 100000\n#define MAXLOG 20\n\nint st[MAXN][MAXLOG];\nint log_table[MAXN + 1];\n\nint min(int a, int b) { return a < b ? a : b; }\n\nvoid buildSparseTable(int arr[], int n) {\n    // Compute logs\n    log_table[1] = 0;\n    for (int i = 2; i <= n; i++)\n        log_table[i] = log_table[i/2] + 1;\n        \n    // Base case: intervals of length 1\n    for (int i = 0; i < n; i++)\n        st[i][0] = arr[i];\n        \n    // Compute for lengths 2^j\n    for (int j = 1; (1 << j) <= n; j++) {\n        for (int i = 0; i + (1 << j) <= n; i++) {\n            st[i][j] = min(st[i][j - 1], st[i + (1 << (j - 1))][j - 1]);\n        }\n    }\n}\n\nint query(int L, int R) {\n    int k = log_table[R - L + 1];\n    return min(st[L][k], st[R - (1 << k) + 1][k]);\n}\n```"
  },
  {
    id: "java-implementation",
    title: "7. Java Implementation",
    content: "```java\npublic class SparseTable {\n    int[][] st;\n    int[] logTable;\n    \n    public SparseTable(int[] arr) {\n        int n = arr.length;\n        int maxLog = (int) (Math.log(n) / Math.log(2)) + 1;\n        st = new int[n][maxLog];\n        logTable = new int[n + 1];\n        \n        logTable[1] = 0;\n        for (int i = 2; i <= n; i++) {\n            logTable[i] = logTable[i / 2] + 1;\n        }\n        \n        for (int i = 0; i < n; i++) {\n            st[i][0] = arr[i];\n        }\n        \n        for (int j = 1; (1 << j) <= n; j++) {\n            for (int i = 0; i + (1 << j) <= n; i++) {\n                st[i][j] = Math.min(st[i][j - 1], st[i + (1 << (j - 1))][j - 1]);\n            }\n        }\n    }\n    \n    public int query(int L, int R) {\n        int k = logTable[R - L + 1];\n        return Math.min(st[L][k], st[R - (1 << k) + 1][k]);\n    }\n}\n```"
  },
  {
    id: "complexity",
    title: "8. Time & Space Complexity",
    content: "- **Time Complexity (Preprocessing):** $O(N \\log N)$. The outer loop runs $\\log N$ times and inner loop runs up to $N$ times.\n- **Time Complexity (Query):** $O(1)$ for idempotent operations (like min, max, gcd) because we only overlap two precomputed intervals. For non-idempotent operations like sum, the query takes $O(\\log N)$.\n- **Space Complexity:** $O(N \\log N)$ to store the 2D table `st[N][logN]`, plus $O(N)$ for the `log` lookup array."
  },
  {
    id: "best-worst-avg",
    title: "9. Best/Worst/Avg Case",
    content: "- **Best Case Time:** Preprocessing is firmly $O(N \\log N)$, querying is $O(1)$.\n- **Average Case Time:** Preprocessing $O(N \\log N)$, querying $O(1)$.\n- **Worst Case Time:** Preprocessing $O(N \\log N)$, querying $O(1)$.\nSince the array is static, the algorithm executes unconditionally without input-dependent variations."
  },
  {
    id: "inplace-stability",
    title: "10. In-place & Stability",
    content: "- **In-place:** No. The algorithm explicitly requires $O(N \\log N)$ auxiliary space to allocate the table and $O(N)$ for the precomputed logarithms.\n- **Stability:** Not applicable. Sparse Table is a data structure for querying, not a sorting algorithm."
  },
  {
    id: "edge-cases",
    title: "11. Edge Cases",
    content: "- **Array of Size 1:** Handled perfectly, $\\log(1) = 0$, table resolves in one column.\n- **$L = R$ (Query length 1):** Overlaps identically, $k = 0$, returns `min(st[L][0], st[L][0]) = A[L]`.\n- **Memory Constraints:** For massive $N$ (e.g., $N > 10^7$), an $N \\times \\log N$ table might exceed typical RAM/Memory Limits in competitive programming."
  },
  {
    id: "applications",
    title: "12. Applications",
    content: "- **Lowest Common Ancestor (LCA):** LCA in a tree can be reduced to RMQ over the tree's Euler Tour in $O(N)$ preprocessing and $O(1)$ query time.\n- **Longest Common Prefix (LCP):** Used in Suffix Arrays to answer LCP of any two suffixes in $O(1)$ time.\n- **Static Array Queries:** Anytime we need heavy querying on static data for min/max/gcd."
  },
  {
    id: "common-mistakes",
    title: "13. Common Mistakes",
    content: "- **Using Sparse Table for Updates:** Sparse Table is **strictly** for static arrays. Rebuilding takes $O(N \\log N)$, making updates too slow.\n- **Off-by-One in Queries:** Incorrectly calculating the second interval index. It must be `R - (1 << k) + 1`.\n- **Overlapping Non-Idempotent Operations:** Using the $O(1)$ trick for queries like `Sum`. Summing overlapping intervals double-counts the intersection. (For sum, you must combine non-overlapping blocks in $O(\\log N)$)."
  },
  {
    id: "related-algorithms",
    title: "14. Related Algorithms",
    content: "- **Segment Tree:** Handles dynamic arrays (with updates) in $O(\\log N)$ query time, using $O(N)$ space.\n- **Fenwick Tree (BIT):** Best for prefix sums and point updates, uses $O(N)$ space, operations are $O(\\log N)$.\n- **Cartesian Tree (Farach-Colton and Bender):** Reduces RMQ space back to $O(N)$ while keeping $O(1)$ query and $O(N)$ preprocessing."
  },
  {
    id: "interview-questions",
    title: "15. Interview Questions",
    content: "- *Why can Sparse Table answer RMQ in O(1) but sum in O(log N)?* (Because min is idempotent ($min(x,x)=x$), so overlapping intervals don't affect the result. Sum is not.)\n- *How can you implement updates in a Sparse Table?* (You can't efficiently. If updates are needed, a Segment Tree is the correct choice.)\n- *What is the maximum space required for an array of size $10^5$?* ($10^5 \\times \\lceil \\log_2(10^5) \\rceil = 10^5 \\times 17 \\approx 1.7 \\times 10^6$ integers.)"
  },
  {
    id: "summary",
    title: "16. Summary",
    content: "The Sparse Table is an elegant data structure providing an optimal **O(1)** query time for idempotent operations on a static array, at the cost of **O(N log N)** preprocessing time and space. While its inability to handle updates limits its general-purpose usage, it remains the gold standard for pure static Range Minimum Query (RMQ) problems and LCA resolution."
  }
];

export const advSparseTableMcqs = [
  {
    question: "In the context of Adv Sparse Table, what does the term 'optimal substructure' imply if applicable? **GATE 2016**",
    options: [
      "The solution is always optimal.",
      "The algorithm uses optimal memory.",
      "The problem can be broken down into smaller, similar subproblems.",
      "It runs in linear time."
    ],
    correctAnswerIndex: 1,
    explanation: "Optimal substructure is a key property for many advanced algorithms like Adv Sparse Table."
  },
  {
    question: "In a distributed computing environment, how easily can Adv Sparse Table be parallelized? **GATE 2009**",
    options: [
      "Difficult, highly sequential.",
      "Moderately, requires synchronization.",
      "Easily, it is embarrassingly parallel.",
      "Impossible."
    ],
    correctAnswerIndex: 3,
    explanation: "Parallelizing Adv Sparse Table depends on data dependencies."
  },
  {
    question: "How does Adv Sparse Table behave under memory-constrained environments? **GATE 2008**",
    options: [
      "It runs normally.",
      "It crashes.",
      "It fails gracefully.",
      "It requires an out-of-core adaptation."
    ],
    correctAnswerIndex: 3,
    explanation: "Memory constraints force algorithmic adaptations."
  },
  {
    question: "Which recurrence relation best models the recursive behavior of Adv Sparse Table (if it is recursive)? **GATE 2019**",
    options: [
      "Depends on the specific variant",
      "T(n) = T(n/2) + O(1)",
      "T(n) = 2T(n/2) + O(n)",
      "T(n) = T(n-1) + O(1)"
    ],
    correctAnswerIndex: 1,
    explanation: "Recurrence relations are used to analyze recursive algorithms."
  },
  {
    question: "Which of the following is a direct application of Adv Sparse Table? **GATE 2011**",
    options: [
      "Database indexing",
      "Network routing",
      "Cryptographic hashing",
      "All of the above"
    ],
    correctAnswerIndex: 2,
    explanation: "Adv Sparse Table has widespread applications across computer science domains."
  },
  {
    question: "If Adv Sparse Table uses a heuristic, what does that imply about its solution? **GATE 2014**",
    options: [
      "It is approximate but fast.",
      "It is exact but slow.",
      "It is always optimal.",
      "It uses randomness."
    ],
    correctAnswerIndex: 3,
    explanation: "Heuristics speed up Adv Sparse Table at the cost of guaranteed optimality."
  },
  {
    question: "Which of the following best describes the worst-case time complexity of Adv Sparse Table? **GATE 2010**",
    options: [
      "It depends on the input structure.",
      "O(N log N)",
      "O(N)",
      "O(N^2)"
    ],
    correctAnswerIndex: 3,
    explanation: "The time complexity is a fundamental property of Adv Sparse Table."
  },
  {
    question: "Which mathematical concept is most closely related to the correctness proof of Adv Sparse Table? **GATE 2010**",
    options: [
      "Combinatorics",
      "Loop invariants",
      "Probability",
      "Graph theory"
    ],
    correctAnswerIndex: 0,
    explanation: "Formal proofs for Adv Sparse Table often rely on establishing invariants."
  },
  {
    question: "Which real-world scenario best models the problem solved by Adv Sparse Table? **GATE 2013**",
    options: [
      "Finding shortest paths",
      "Pattern matching",
      "Sorting data",
      "Resource allocation"
    ],
    correctAnswerIndex: 3,
    explanation: "Theoretical algorithms are abstractions of real-world problems."
  },
  {
    question: "When comparing Adv Sparse Table with naive approaches, what is the primary advantage? **GATE 2006**",
    options: [
      "Simpler implementation",
      "No advantage",
      "Reduced time complexity",
      "Reduced space complexity"
    ],
    correctAnswerIndex: 2,
    explanation: "Advanced algorithms like Adv Sparse Table are designed to optimize resource usage."
  },
  {
    question: "What is the theoretical lower bound for the problem that Adv Sparse Table solves? **GATE 2012**",
    options: [
      "O(1)",
      "O(N)",
      "O(N log N)",
      "NP-Hard"
    ],
    correctAnswerIndex: 1,
    explanation: "Lower bounds define the absolute best any algorithm can do for the problem."
  },
  {
    question: "Which edge case is most likely to cause a failure in a naive implementation of Adv Sparse Table? **GATE 2011**",
    options: [
      "Negative numbers",
      "All of the above",
      "Extremely large inputs",
      "Empty input"
    ],
    correctAnswerIndex: 3,
    explanation: "Robust implementations of Adv Sparse Table must handle boundary conditions."
  },
  {
    question: "What happens to Adv Sparse Table if the input is already sorted (best-case)? **GATE 2013**",
    options: [
      "It performs optimally.",
      "It achieves its theoretical lower bound.",
      "It degrades to worst-case.",
      "Behavior remains unchanged."
    ],
    correctAnswerIndex: 1,
    explanation: "Input permutations can heavily affect Adv Sparse Table."
  },
  {
    question: "If Adv Sparse Table is implemented iteratively instead of recursively, what is the most likely impact? **GATE 2017**",
    options: [
      "Increased time complexity",
      "Decreased time complexity",
      "No impact",
      "Reduced stack space overhead"
    ],
    correctAnswerIndex: 2,
    explanation: "Iterative implementations generally save function call overhead."
  },
  {
    question: "If the input size for Adv Sparse Table is doubled, how does the execution time scale approximately in the average case? **GATE 2018**",
    options: [
      "It doubles",
      "It increases by a constant factor",
      "It quadruples",
      "It remains constant"
    ],
    correctAnswerIndex: 3,
    explanation: "Scalability is determined by the asymptotic bounds of Adv Sparse Table."
  }
];

export const advSparseTableDebug = {
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

export const advSparseTableDrag = {
  statement: "Drag the correct statements to construct the RMQ query function for a Sparse Table.",
  dropzones: [
    "int k = log_table[__];",
    "int left_val = st[__][k];",
    "int right_val = st[__][k];",
    "return min(__, __);"
  ],
  options: [
    "R - L + 1",
    "L",
    "R - (1 << k) + 1",
    "left_val, right_val"
  ],
  correctOrder: [
    "R - L + 1",
    "L",
    "R - (1 << k) + 1",
    "left_val, right_val"
  ]
};

export const advSparseTableComplete = {
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
