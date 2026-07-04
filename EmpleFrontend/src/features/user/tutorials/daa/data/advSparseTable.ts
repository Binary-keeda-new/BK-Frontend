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
    question: "A Sparse Table is constructed for an array of $N$ elements to answer Range Minimum Queries (RMQ). What is the time complexity to build the table and to answer a single query, respectively?",
    options: [
      "O(N) and O(log N)",
      "O(N log N) and O(1)",
      "O(N log N) and O(log N)",
      "O(N) and O(1)"
    ],
    correctAnswerIndex: 1,
    explanation: "Building the Sparse Table involves computing values for all intervals of lengths that are powers of 2, taking O(N log N) time. Queries for idempotent functions like minimum can be answered in O(1) time by overlapping two intervals."
  },
  {
    question: "Consider a Sparse Table `st[][]` where `st[i][j]` stores the minimum of an interval of length $2^j$ starting at index $i$. Which of the following is the correct recurrence relation to construct the table?",
    options: [
      "st[i][j] = min(st[i][j-1], st[i + 2^(j-1)][j-1])",
      "st[i][j] = min(st[i][j-1], st[i + 2^j - 1][j-1])",
      "st[i][j] = min(st[i][j], st[i + 2^(j-1)][j])",
      "st[i][j] = min(st[i][j-1], st[i + 2^(j-1) - 1][j-1])"
    ],
    correctAnswerIndex: 0,
    explanation: "An interval of length 2^j starting at i can be split into two contiguous intervals of length 2^(j-1). The first starts at i, and the second starts at i + 2^(j-1)."
  },
  {
    question: "Which of the following operations CANNOT be queried in O(1) time using the standard overlapping technique in a Sparse Table?",
    options: [
      "Range Minimum",
      "Range Bitwise OR",
      "Range Greatest Common Divisor (GCD)",
      "Range Sum"
    ],
    correctAnswerIndex: 3,
    explanation: "The O(1) query technique relies on the operation being idempotent (i.e., f(x, x) = x). Range Sum is not idempotent, as overlapping regions will be double-counted. Sum queries take O(log N) in a Sparse Table."
  },
  {
    question: "For an array of size $N = 1000$, what is the minimum number of columns required for the Sparse Table `st[N][K]` to answer any RMQ in O(1)?",
    options: [
      "9",
      "10",
      "11",
      "12"
    ],
    correctAnswerIndex: 1,
    explanation: "The number of columns K is floor(log2(N)) + 1. For N = 1000, log2(1000) is approx 9.96. The floor is 9. Thus, powers from 2^0 up to 2^9 are needed. Total columns = 10."
  },
  {
    question: "Let the operation be finding the maximum in a range. A query is made for the interval $[L, R]$. Let $len = R - L + 1$, and $k = \\lfloor \\log_2(len) \\rfloor$. Which expression correctly retrieves the maximum for the interval $[L, R]$ in O(1) time?",
    options: [
      "max(st[L][k], st[R - 2^k][k])",
      "max(st[L][k], st[R - 2^k + 1][k])",
      "max(st[L][k], st[R - 2^(k-1)][k])",
      "max(st[L][k], st[R + 2^k - 1][k])"
    ],
    correctAnswerIndex: 1,
    explanation: "The first interval of length 2^k starts at L (covers L to L + 2^k - 1). The second interval of length 2^k must end at R, so it starts at R - 2^k + 1. The maximum of these two overlapping intervals covers the entire [L, R] range."
  },
  {
    question: "When computing Lowest Common Ancestor (LCA) of two nodes $u$ and $v$ in a tree using a Sparse Table, the problem is reduced to RMQ over which of the following arrays?",
    options: [
      "The degree array of the nodes",
      "The Euler tour (or traversal) array of the tree",
      "The path from the root to node u",
      "The Breadth-First Search (BFS) traversal array"
    ],
    correctAnswerIndex: 1,
    explanation: "LCA is reduced to RMQ by performing an Euler tour (DFS traversal) of the tree, recording node depths. The LCA of u and v corresponds to the node with the minimum depth between the first occurrences of u and v in the Euler tour array."
  },
  {
    question: "Suppose an array has $N$ elements and is subjected to frequent point updates (value at index $i$ changes). Why is Sparse Table deemed unsuitable for this scenario?",
    options: [
      "Updates take O(1) time, but memory fragmentation occurs.",
      "A point update requires updating O(N log N) states in the Sparse Table.",
      "A point update requires updating O(N) states, taking too much time compared to O(log N) in a Segment Tree.",
      "Sparse Table cannot inherently support both minimum and maximum operations simultaneously."
    ],
    correctAnswerIndex: 2,
    explanation: "A single element A[i] participates in O(N) intervals (various lengths ending at or after i). Therefore, updating a single element takes O(N) time in the worst case, compared to O(log N) in a Segment Tree."
  },
  {
    question: "An engineer decides to implement a Sparse Table to query the product of elements modulo $P$ for arbitrary ranges. They use the standard O(1) overlapping query method. What will be the consequence?",
    options: [
      "It will work correctly in O(1) time.",
      "It will result in incorrect answers due to double counting.",
      "It will throw a division by zero error.",
      "It will work correctly, but take O(log N) time instead of O(1)."
    ],
    correctAnswerIndex: 1,
    explanation: "Modular multiplication is not idempotent (a * a != a). The O(1) query method overlaps two intervals, meaning elements in the intersection will be multiplied twice, leading to an incorrect result."
  },
  {
    question: "In the precomputation of the array `log_table` used for O(1) RMQ queries, what is the correct relation for `log_table[i]` for $i \\ge 2$?",
    options: [
      "log_table[i] = log_table[i - 1] + 1",
      "log_table[i] = log_table[i / 2] + 1",
      "log_table[i] = log_table[i / 2] * 2",
      "log_table[i] = log_table[i - 1] * 2"
    ],
    correctAnswerIndex: 1,
    explanation: "The integer base-2 logarithm of `i` is exactly one greater than the base-2 logarithm of `i / 2`. Thus, `log_table[i] = log_table[i / 2] + 1`."
  },
  {
    question: "In C/C++, the bitwise shift operator `(1 << j)` is equivalent to:",
    options: [
      "2 + j",
      "j^2",
      "2^j (2 to the power of j)",
      "2 * j"
    ],
    correctAnswerIndex: 2,
    explanation: "Shifting the integer 1 left by `j` positions is mathematically equivalent to multiplying 1 by 2^j, which evaluates to 2^j."
  },
  {
    question: "If a Sparse Table is used to find the minimum in a static array of size N = $10^6$, approximately how much memory is allocated if each integer takes 4 bytes?",
    options: [
      "4 MB",
      "20 MB",
      "80 MB",
      "400 MB"
    ],
    correctAnswerIndex: 2,
    explanation: "N = 10^6. The number of columns is floor(log2(10^6)) + 1 = 19 + 1 = 20. Total integers = 10^6 * 20 = 2 * 10^7. Each integer is 4 bytes, so 4 * 2 * 10^7 = 8 * 10^7 bytes ≈ 80 MB."
  },
  {
    question: "Consider an array `A` and a corresponding Sparse Table `st[][]` correctly precomputed for Range Minimum Query. A query is made for the range `[3, 7]`. What is the value of `k`, and which two table entries are compared to answer this query in O(1)?",
    options: [
      "k = 2; compared: st[3][2] and st[5][2]",
      "k = 2; compared: st[3][2] and st[4][2]",
      "k = 3; compared: st[3][3] and st[0][3]",
      "k = 2; compared: st[3][2] and st[6][2]"
    ],
    correctAnswerIndex: 1,
    explanation: "Range [3, 7] has length 7 - 3 + 1 = 5. The largest power of 2 <= 5 is 4, so k = 2. The first interval of length 4 starts at 3 (st[3][2]). The second must end at 7, so it starts at 7 - 4 + 1 = 4 (st[4][2]). Thus, we compare st[3][2] and st[4][2]."
  }
];

export const advSparseTableDebug = {
  instructions: "Fix the syntax error so the code compiles correctly.",
  buggyC: "#include <stdio.h>\n\nint main() {\n    printf(\"Hello World\")\n    return 0;\n}",
  fixedC: "#include <stdio.h>\n\nint main() {\n    printf(\"Hello World\\n\");\n    return 0;\n}",
  buggyJava: "public class Main {\n    public static void main(String[] args) {\n        System.out.printl(\"Hello World\");\n    }\n}",
  fixedJava: "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello World\");\n    }\n}",
  hints: ["Check the print statement.","Missing semicolon or wrong spelling?","Fix it!"],
  expectedOutput: "Hello World"
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
  statement: "Complete the initialization of the `log_table` array which precomputes the floor of log base 2.",
  initialCode: `
void computeLogTable(int n) {
    log_table[1] = 0;
    for (int i = 2; i <= n; i++) {
        log_table[i] = // ???
    }
}
`,
  solution: "log_table[i / 2] + 1;",
  explanation: "For any integer i >= 2, the floor of its base-2 logarithm is exactly 1 plus the base-2 logarithm of i divided by 2 (integer division). E.g., log2(4) = log2(2) + 1 = 2."
};
