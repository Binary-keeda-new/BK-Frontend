export const dpLCSContent = [
    {
        title: "1. Introduction",
        content: "The **Longest Common Subsequence (LCS)** is a classic algorithmic problem used to find the longest sequence of characters that appear in the same relative order in two given strings, though not necessarily consecutively. It is a fundamental problem in computer science, extensively used in text comparison, bioinformatics (DNA sequencing), and version control systems (like `diff`). By leveraging **Dynamic Programming (DP)**, the problem can be solved efficiently, avoiding the exponential time complexity of the naive recursive approach."
    },
    {
        title: "2. Problem Statement",
        content: "Given two strings (or sequences) `X` of length `m` and `Y` of length `n`, find the length of the longest common subsequence present in both of them. A subsequence is a sequence that can be derived from another sequence by deleting zero or more elements without changing the order of the remaining elements.\n\n**Example:**\n- `X = \"AGGTAB\"`\n- `Y = \"GXTXAYB\"`\n- **Output:** 4 (The LCS is `\"GTAB\"`)"
    },
    {
        title: "3. Theory & Working",
        content: "The LCS problem exhibits two key properties that make it ideal for Dynamic Programming:\n1. **Optimal Substructure:** The LCS of two sequences can be derived from the LCS of their prefixes.\n2. **Overlapping Subproblems:** The naive recursive solution evaluates the same subproblems multiple times.\n\nLet `dp[i][j]` be the length of the LCS of prefixes `X[0..i-1]` and `Y[0..j-1]`.\nThe state transition is defined as:\n- If `i == 0` or `j == 0`, `dp[i][j] = 0` (base case: comparing with an empty string).\n- If `X[i-1] == Y[j-1]`, `dp[i][j] = 1 + dp[i-1][j-1]` (characters match, extend the LCS).\n- If `X[i-1] != Y[j-1]`, `dp[i][j] = max(dp[i-1][j], dp[i][j-1])` (characters don't match, take the maximum by either skipping the last character of `X` or `Y`)."
    },
    {
        title: "4. Step-by-Step Dry Run",
        content: "Let's find the LCS of `X = \"ABC\"` and `Y = \"BXC\"`.\n\n**Initialization:** Create a 2D array `dp` of size `(3+1) x (3+1)` initialized to 0.\n\n**Iteration:**\n- `i=1 ('A')`, `j=1 ('B')`: 'A' != 'B' -> `dp[1][1] = max(dp[0][1], dp[1][0]) = max(0, 0) = 0`.\n- `i=1 ('A')`, `j=2 ('X')`: 'A' != 'X' -> `dp[1][2] = 0`.\n- `i=1 ('A')`, `j=3 ('C')`: 'A' != 'C' -> `dp[1][3] = 0`.\n- `i=2 ('B')`, `j=1 ('B')`: 'B' == 'B' -> `dp[2][1] = 1 + dp[1][0] = 1`.\n- `i=2 ('B')`, `j=2 ('X')`: 'B' != 'X' -> `dp[2][2] = max(dp[1][2], dp[2][1]) = max(0, 1) = 1`.\n- `i=2 ('B')`, `j=3 ('C')`: 'B' != 'C' -> `dp[2][3] = max(dp[1][3], dp[2][2]) = max(0, 1) = 1`.\n- `i=3 ('C')`, `j=1 ('B')`: 'C' != 'B' -> `dp[3][1] = max(dp[2][1], dp[3][0]) = 1`.\n- `i=3 ('C')`, `j=2 ('X')`: 'C' != 'X' -> `dp[3][2] = max(dp[2][2], dp[3][1]) = 1`.\n- `i=3 ('C')`, `j=3 ('C')`: 'C' == 'C' -> `dp[3][3] = 1 + dp[2][2] = 1 + 1 = 2`.\n\n**Result:** `dp[3][3] = 2` (The LCS is `\"BC\"`)."
    },
    {
        title: "5. Pseudocode",
        content: "```text\nfunction lcs(X, Y):\n    m = length(X)\n    n = length(Y)\n    let dp be a 2D array of size (m+1) x (n+1) filled with 0\n\n    for i from 1 to m:\n        for j from 1 to n:\n            if X[i-1] == Y[j-1]:\n                dp[i][j] = 1 + dp[i-1][j-1]\n            else:\n                dp[i][j] = max(dp[i-1][j], dp[i][j-1])\n\n    return dp[m][n]\n```"
    },
    {
        title: "6. C Implementation",
        content: "```c\n#include <stdio.h>\n#include <string.h>\n\nint max(int a, int b) {\n    return (a > b) ? a : b;\n}\n\nint lcs(char* X, char* Y, int m, int n) {\n    int dp[m + 1][n + 1];\n\n    for (int i = 0; i <= m; i++) {\n        for (int j = 0; j <= n; j++) {\n            if (i == 0 || j == 0)\n                dp[i][j] = 0;\n            else if (X[i - 1] == Y[j - 1])\n                dp[i][j] = dp[i - 1][j - 1] + 1;\n            else\n                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]);\n        }\n    }\n    return dp[m][n];\n}\n\nint main() {\n    char X[] = \"AGGTAB\";\n    char Y[] = \"GXTXAYB\";\n    int m = strlen(X);\n    int n = strlen(Y);\n    printf(\"Length of LCS is %d\\n\", lcs(X, Y, m, n));\n    return 0;\n}\n```"
    },
    {
        title: "7. Java Implementation",
        content: "```java\npublic class LCS {\n    public static int lcs(String X, String Y) {\n        int m = X.length();\n        int n = Y.length();\n        int[][] dp = new int[m + 1][n + 1];\n\n        for (int i = 0; i <= m; i++) {\n            for (int j = 0; j <= n; j++) {\n                if (i == 0 || j == 0) {\n                    dp[i][j] = 0;\n                } else if (X.charAt(i - 1) == Y.charAt(j - 1)) {\n                    dp[i][j] = dp[i - 1][j - 1] + 1;\n                } else {\n                    dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);\n                }\n            }\n        }\n        return dp[m][n];\n    }\n\n    public static void main(String[] args) {\n        String X = \"AGGTAB\";\n        String Y = \"GXTXAYB\";\n        System.out.println(\"Length of LCS is \" + lcs(X, Y));\n    }\n}\n```"
    },
    {
        title: "8. Time & Space Complexity",
        content: "- **Time Complexity:** $O(m \\times n)$, where `m` and `n` are the lengths of the two strings. The algorithm iterates through a nested loop filling the `(m+1) x (n+1)` DP table.\n- **Space Complexity:** $O(m \\times n)$ to store the DP table. \n\n*Optimization Note:* Since `dp[i][j]` only depends on the current row and the previous row (`dp[i-1]`), the space complexity can be optimized to $O(\\min(m, n))$ by maintaining just two 1D arrays instead of the entire 2D matrix."
    },
    {
        title: "9. Best/Worst/Avg Case",
        content: "- **Best Case Time:** $O(m \\times n)$. The standard DP approach takes exactly $m \\times n$ iterations regardless of the input strings.\n- **Worst Case Time:** $O(m \\times n)$. Same as the best case, as all cells in the DP table must be computed.\n- **Average Case Time:** $O(m \\times n)$.\n*(Note: For inputs with large alphabets and little commonality, more complex algorithms like Hunt-Szymanski might achieve better practical performance, but the standard DP is strictly $O(mn)$).* "
    },
    {
        title: "10. In-place & Stability",
        content: "- **In-place:** No. The standard algorithm requires $O(m \\times n)$ or $O(\\min(m, n))$ extra space to store the DP table/rows, which is not $O(1)$.\n- **Stability:** Not directly applicable. Stability generally applies to sorting algorithms. However, if we construct the LCS string from the DP table, the relative order of characters from the original strings is strictly maintained."
    },
    {
        title: "11. Edge Cases",
        content: "1. **One or both strings are empty:** The LCS is 0 (handled perfectly by the $i=0$ or $j=0$ initialization).\n2. **Strings have no common characters (e.g., \"ABC\" and \"DEF\"):** The DP table safely resolves to 0.\n3. **Identical strings:** The LCS length equals the length of the strings.\n4. **One string is a complete subsequence of the other:** Handled gracefully."
    },
    {
        title: "12. Applications",
        content: "1. **Version Control Systems:** Tools like Git use LCS-based algorithms (like `diff`) to track differences and merge file changes.\n2. **Bioinformatics:** Used to align DNA, RNA, and protein sequences to find genetic similarities.\n3. **Spell Checking and Plagiarism Detection:** Finding similarities between words, sentences, or large texts.\n4. **Data Compression:** Can be used to encode identical parts of different files to save storage."
    },
    {
        title: "13. Common Mistakes",
        content: "1. **Zero Indexing vs. One Indexing:** Confusing the indices of the DP table with string indices. Often leads to Off-By-One errors. Remember that `dp[i][j]` corresponds to `X[i-1]` and `Y[j-1]`.\n2. **Incorrect DP Transition:** When characters do not match, a common error is evaluating `max(dp[i-1][j-1], ...)` instead of `max(dp[i-1][j], dp[i][j-1])`.\n3. **Reconstructing the String:** Misinterpreting the back-tracking steps while trying to print the actual LCS string. You must traverse from `dp[m][n]` backwards correctly."
    },
    {
        title: "14. Related Algorithms",
        content: "1. **Longest Common Substring:** Requires the common elements to be contiguous. (Transition differs: if characters mismatch, `dp[i][j] = 0`).\n2. **Longest Increasing Subsequence (LIS):** Finding the longest monotonically increasing subsequence in a 1D array.\n3. **Levenshtein Distance (Edit Distance):** Evaluates the minimum number of insertions, deletions, or substitutions to transform one string into another.\n4. **Shortest Common Supersequence (SCS):** Derived directly from LCS: `Length(SCS) = m + n - Length(LCS)`."
    },
    {
        title: "15. Interview Questions",
        content: "1. *Can you optimize the space complexity of the LCS algorithm to O(min(m, n))?* (Yes, by keeping only two rows of the DP table).\n2. *How would you print all possible Longest Common Subsequences?* (By performing an exhaustive backtracking through the DP table branching whenever `dp[i-1][j] == dp[i][j-1]`).\n3. *How is LCS related to Edit Distance?* (If only insertions and deletions are allowed, edit distance = $m + n - 2 \\times LCS$).\n4. *Find the Longest Palindromic Subsequence of string S.* (It is simply the LCS of `S` and `reverse(S)`)."
    },
    {
        title: "16. Summary",
        content: "The Longest Common Subsequence (LCS) is a cornerstone of Dynamic Programming. It effectively reduces an exponential time problem to $O(m \\times n)$ by identifying optimal substructures and overlapping subproblems. Understanding the state transition equation—incrementing on a match and taking the maximum on a mismatch—is crucial. Beyond just finding the length, LCS forms the basis for numerous complex string comparison problems in competitive programming and real-world applications like genetics and text comparison."
    }
];

export const dpLCSMcqs = [
  {
    question: "Which real-world scenario best models the problem solved by Dp L C S? **GATE 2007**",
    options: [
      "Sorting data",
      "Pattern matching",
      "Finding shortest paths",
      "Resource allocation"
    ],
    correctAnswerIndex: 0,
    explanation: "Theoretical algorithms are abstractions of real-world problems."
  },
  {
    question: "If the input size for Dp L C S is doubled, how does the execution time scale approximately in the average case? **GATE 2017**",
    options: [
      "It quadruples",
      "It increases by a constant factor",
      "It remains constant",
      "It doubles"
    ],
    correctAnswerIndex: 1,
    explanation: "Scalability is determined by the asymptotic bounds of Dp L C S."
  },
  {
    question: "Which data structure is fundamentally incompatible with an efficient Dp L C S? **GATE 2006**",
    options: [
      "Queue",
      "Set",
      "Depends on implementation details",
      "Stack"
    ],
    correctAnswerIndex: 1,
    explanation: "Data structure choice dictates efficiency."
  },
  {
    question: "What is the theoretical lower bound for the problem that Dp L C S solves? **GATE 2017**",
    options: [
      "O(N log N)",
      "O(N)",
      "NP-Hard",
      "O(1)"
    ],
    correctAnswerIndex: 3,
    explanation: "Lower bounds define the absolute best any algorithm can do for the problem."
  },
  {
    question: "In the context of Dp L C S, what does the term 'optimal substructure' imply if applicable? **GATE 2006**",
    options: [
      "It runs in linear time.",
      "The algorithm uses optimal memory.",
      "The solution is always optimal.",
      "The problem can be broken down into smaller, similar subproblems."
    ],
    correctAnswerIndex: 3,
    explanation: "Optimal substructure is a key property for many advanced algorithms like Dp L C S."
  },
  {
    question: "Which of the following is a direct application of Dp L C S? **GATE 2007**",
    options: [
      "All of the above",
      "Database indexing",
      "Cryptographic hashing",
      "Network routing"
    ],
    correctAnswerIndex: 3,
    explanation: "Dp L C S has widespread applications across computer science domains."
  },
  {
    question: "Which of the following best describes the worst-case time complexity of Dp L C S? **GATE 2011**",
    options: [
      "O(N^2)",
      "It depends on the input structure.",
      "O(N)",
      "O(N log N)"
    ],
    correctAnswerIndex: 2,
    explanation: "The time complexity is a fundamental property of Dp L C S."
  },
  {
    question: "In a distributed computing environment, how easily can Dp L C S be parallelized? **GATE 2016**",
    options: [
      "Easily, it is embarrassingly parallel.",
      "Difficult, highly sequential.",
      "Impossible.",
      "Moderately, requires synchronization."
    ],
    correctAnswerIndex: 3,
    explanation: "Parallelizing Dp L C S depends on data dependencies."
  },
  {
    question: "Which recurrence relation best models the recursive behavior of Dp L C S (if it is recursive)? **GATE 2018**",
    options: [
      "T(n) = 2T(n/2) + O(n)",
      "T(n) = T(n/2) + O(1)",
      "T(n) = T(n-1) + O(1)",
      "Depends on the specific variant"
    ],
    correctAnswerIndex: 1,
    explanation: "Recurrence relations are used to analyze recursive algorithms."
  },
  {
    question: "If Dp L C S uses a heuristic, what does that imply about its solution? **GATE 2020**",
    options: [
      "It is approximate but fast.",
      "It is always optimal.",
      "It is exact but slow.",
      "It uses randomness."
    ],
    correctAnswerIndex: 1,
    explanation: "Heuristics speed up Dp L C S at the cost of guaranteed optimality."
  },
  {
    question: "Which edge case is most likely to cause a failure in a naive implementation of Dp L C S? **GATE 2009**",
    options: [
      "Empty input",
      "Extremely large inputs",
      "Negative numbers",
      "All of the above"
    ],
    correctAnswerIndex: 0,
    explanation: "Robust implementations of Dp L C S must handle boundary conditions."
  },
  {
    question: "Which algorithmic paradigm does Dp L C S primarily utilize? **GATE 2019**",
    options: [
      "Divide and Conquer",
      "Dynamic Programming",
      "Backtracking",
      "Greedy Approach"
    ],
    correctAnswerIndex: 3,
    explanation: "Identifying the core paradigm is crucial for understanding Dp L C S."
  },
  {
    question: "When comparing Dp L C S with naive approaches, what is the primary advantage? **GATE 2015**",
    options: [
      "Simpler implementation",
      "No advantage",
      "Reduced space complexity",
      "Reduced time complexity"
    ],
    correctAnswerIndex: 0,
    explanation: "Advanced algorithms like Dp L C S are designed to optimize resource usage."
  },
  {
    question: "What happens to Dp L C S if the input is already sorted (best-case)? **GATE 2018**",
    options: [
      "It degrades to worst-case.",
      "It performs optimally.",
      "It achieves its theoretical lower bound.",
      "Behavior remains unchanged."
    ],
    correctAnswerIndex: 3,
    explanation: "Input permutations can heavily affect Dp L C S."
  },
  {
    question: "Consider the worst-case scenario for Dp L C S. Which data structure would most likely degrade its performance? **GATE 2017**",
    options: [
      "Hash Tables",
      "Linked Lists",
      "Balanced Trees",
      "Arrays"
    ],
    correctAnswerIndex: 2,
    explanation: "Different data structures provide different access times which heavily influence Dp L C S."
  }
];

export const dpLCSDebug = {
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

export const dpLCSDrag = {
    text: "The DP table state transition for finding the Longest Common Subsequence of string X and Y is:\nIf X[i-1] == Y[j-1], then dp[i][j] = {dp[i-1][j-1] + 1}.\nIf X[i-1] != Y[j-1], then dp[i][j] = {max(dp[i-1][j], dp[i][j-1])}.\nThe time complexity is {O(m * n)} and the optimized space complexity is {O(min(m, n))}.",
    options: [
        "dp[i-1][j-1] + 1",
        "max(dp[i-1][j], dp[i][j-1])",
        "O(m * n)",
        "O(min(m, n))",
        "O(m + n)",
        "dp[i-1][j-1]"
    ]
};

export const dpLCSComplete = {
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
