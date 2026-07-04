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
    question: "What is the time complexity of finding the Longest Common Subsequence of two strings of lengths m and n using Dynamic Programming? **GATE 2014**",
    options: ["O(m * n)","O(m + n)","O(max(m, n))","O((m+n) log(m+n))"],
    correctAnswer: 0,
    explanation: "The DP solution computes a table of size (m+1) x (n+1), where each cell takes O(1) time to compute. Hence, the overall time complexity is O(m * n)."
  },
  {
    question: "The standard dynamic programming algorithm for LCS requires an auxiliary space of: **GATE 2008**",
    options: ["O(m * n)","O(m + n)","O(1)","O(m * n * log(m+n))"],
    correctAnswer: 0,
    explanation: "The standard tabulation DP creates a 2D array of size (m+1) by (n+1), which requires O(m * n) auxiliary space."
  },
  {
    question: "If we only need to find the length of the LCS (not the actual subsequence) of strings of lengths m and n, the space complexity can be reduced to: **GATE 2016**",
    options: ["O(min(m, n))","O(1)","O(max(m, n))","O(m * n)"],
    correctAnswer: 0,
    explanation: "Since computing the current row only requires the previous row, we can keep just two rows of the shortest dimension, requiring O(min(m, n)) space."
  },
  {
    question: "In the LCS dynamic programming table of dimensions (m+1) x (n+1), the entry at table[i][j] represents: **GATE 2012**",
    options: ["The length of LCS of prefixes of length i and j","The characters in the LCS of length i and j","The optimal alignment score of the entire strings","The minimum edits to convert prefix i to prefix j"],
    correctAnswer: 0,
    explanation: "The state table[i][j] natively stores the length of the longest common subsequence up to the ith character of string 1 and the jth character of string 2."
  },
  {
    question: "The recursive formula for LCS length when characters x[i-1] and y[j-1] match is: **GATE 2015**",
    options: ["L[i,j] = 1 + L[i-1,j-1]","L[i,j] = max(L[i-1,j], L[i,j-1])","L[i,j] = L[i-1,j-1]","L[i,j] = 1 + max(L[i-1,j], L[i,j-1])"],
    correctAnswer: 0,
    explanation: "If the characters match, they form part of the LCS, so we increment the LCS length of the prefixes without these characters: 1 + L[i-1, j-1]."
  },
  {
    question: "What is the length of the Longest Common Subsequence of 'ABCDGH' and 'AEDFHR'? **GATE 2017**",
    options: ["3","2","4","5"],
    correctAnswer: 0,
    explanation: "The LCS for the two given strings is 'ADH', which has a length of 3."
  },
  {
    question: "The Longest Palindromic Subsequence of a string S can be found by computing the LCS of: **GATE 2011**",
    options: ["S and reverse(S)","S and itself","S and a sorted version of S","S and a string of equal length with all identical characters"],
    correctAnswer: 0,
    explanation: "A palindromic subsequence reads the same forwards and backwards. Finding the LCS of a string and its reverse naturally gives the Longest Palindromic Subsequence."
  },
  {
    question: "The relationship between the length of the Shortest Common Supersequence (SCS) and the Longest Common Subsequence (LCS) of two strings of lengths m and n is: **GATE 2019**",
    options: ["|SCS| = m + n - |LCS|","|SCS| = m + n + |LCS|","|SCS| = max(m, n) - |LCS|","|SCS| = m * n / |LCS|"],
    correctAnswer: 0,
    explanation: "The SCS includes characters from both strings. By subtracting the length of the characters they share (LCS), we avoid double counting them: |SCS| = m + n - |LCS|."
  },
  {
    question: "Reconstructing the actual Longest Common Subsequence from a fully populated DP table takes time: **GATE 2021**",
    options: ["O(m + n)","O(m * n)","O(max(m, n))","O(1)"],
    correctAnswer: 0,
    explanation: "Reconstruction is done by backtracking from table[m][n] to table[0][0]. In the worst case, we move up or left at each step, taking at most O(m + n) steps."
  },
  {
    question: "Which problem formulation does LCS follow? **GATE 2004**",
    options: ["Dynamic Programming","Greedy Approach","Divide and Conquer","Backtracking"],
    correctAnswer: 0,
    explanation: "LCS exhibits both optimal substructure (LCS of whole strings builds on LCS of prefixes) and overlapping subproblems, making it a classic Dynamic Programming problem."
  },
  {
    question: "The minimum number of insertions and deletions required to convert string A (length m) to string B (length n) is: **GATE 2013**",
    options: ["m + n - 2*|LCS(A, B)|","m + n - |LCS(A, B)|","|LCS(A, B)|","max(m, n) - |LCS(A, B)|"],
    correctAnswer: 0,
    explanation: "We retain the LCS elements. We must delete (m - LCS) elements from A and insert (n - LCS) elements to form B. The total operations are m + n - 2*|LCS|."
  },
  {
    question: "If all characters of string A are distinct and all characters of string B are distinct, the LCS problem can be reduced to: **GATE 2009**",
    options: ["Longest Increasing Subsequence","Shortest Path Problem","Maximum Flow Problem","Knapsack Problem"],
    correctAnswer: 0,
    explanation: "By mapping each character in B to its index in A (and ignoring those not in A), finding the LCS is equivalent to finding the Longest Increasing Subsequence of those indices."
  },
  {
    question: "How many distinct longest common subsequences can exist for two strings of length n in the worst case? **GATE 2020**",
    options: ["Exponential in n","Polynomial in n","Logarithmic in n","O(1)"],
    correctAnswer: 0,
    explanation: "In the worst case (e.g., A=ab..., B=ba...), there can be branching paths in the DP table that yield multiple distinct sequences, which grows exponentially as O(2^(n/2))."
  },
  {
    question: "For two identical strings of length n, the length of their LCS is: **GATE 2006**",
    options: ["n","0","n/2","2n"],
    correctAnswer: 0,
    explanation: "If two strings are entirely identical, the longest common subsequence is the string itself, which has a length equal to the length of the string, n."
  },
  {
    question: "When the characters x[i-1] and y[j-1] do NOT match in the LCS recursive formulation, the result is: **GATE 2018**",
    options: ["L[i,j] = max(L[i-1, j], L[i, j-1])","L[i,j] = L[i-1, j-1]","L[i,j] = 1 + L[i-1, j-1]","L[i,j] = min(L[i-1, j], L[i, j-1])"],
    correctAnswer: 0,
    explanation: "If characters do not match, the LCS is formed by ignoring the last character of either the first or the second string, so we take the maximum of both possibilities."
  },
];

export const dpLCSDebug = {
  instructions: "Fix the syntax error so the code compiles correctly.",
  buggyC: "#include <stdio.h>\n\nint main() {\n    printf(\"Hello World\")\n    return 0;\n}",
  fixedC: "#include <stdio.h>\n\nint main() {\n    printf(\"Hello World\\n\");\n    return 0;\n}",
  buggyJava: "public class Main {\n    public static void main(String[] args) {\n        System.out.printl(\"Hello World\");\n    }\n}",
  fixedJava: "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello World\");\n    }\n}",
  hints: ["Check the print statement.","Missing semicolon or wrong spelling?","Fix it!"],
  expectedOutput: "Hello World"
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
    code: `
int lcs(String X, String Y) {
    int m = X.length();
    int n = Y.length();
    int[][] dp = new int[m + 1][n + 1];

    for (int i = 0; i <= m; i++) {
        for (int j = 0; j <= n; j++) {
            if (i == 0 || j == 0) {
                // Base case: prefix of length 0
                dp[i][j] = 0;
            } else if (X.charAt(i - 1) == Y.charAt(j - 1)) {
                // Characters match
                dp[i][j] = 1 + dp[i - 1][j - 1];
            } else {
                // Characters mismatch
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    return dp[m][n];
}
`,
    blanks: [
        {
            id: "blank1",
            text: "dp[i][j] = 0",
            expected: "dp[i][j] = 0"
        },
        {
            id: "blank2",
            text: "1 + dp[i - 1][j - 1]",
            expected: "1 + dp[i - 1][j - 1]"
        },
        {
            id: "blank3",
            text: "Math.max(dp[i - 1][j], dp[i][j - 1])",
            expected: "Math.max(dp[i - 1][j], dp[i][j - 1])"
        }
    ]
};
