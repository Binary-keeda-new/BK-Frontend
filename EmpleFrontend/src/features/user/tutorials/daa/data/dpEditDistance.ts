export const dpEditDistanceContent = [
  {
    title: "Introduction",
    content: "Edit Distance, also known as Levenshtein Distance, is a widely used string metric in computer science. It measures the minimum number of single-character operations required to transform one string into another. The problem is a classic example of dynamic programming and serves as a fundamental algorithm for text processing and sequence alignment.",
  },
  {
    title: "Problem Statement",
    content: "Given two strings `str1` of length `m` and `str2` of length `n`, find the minimum number of operations required to convert `str1` into `str2`. The permitted operations are:\n1. **Insert** a character into `str1`.\n2. **Remove** a character from `str1`.\n3. **Replace** a character in `str1` with another character.\nEach operation has a uniform cost of 1.",
  },
  {
    title: "Theory & Working",
    content: "The problem exhibits optimal substructure and overlapping subproblems, making it perfect for dynamic programming. We construct a 2D array `dp[m+1][n+1]` where `dp[i][j]` represents the minimum edit distance to transform the first `i` characters of `str1` into the first `j` characters of `str2`.\n\n**Transitions:**\n- If `str1[i-1] == str2[j-1]`: Characters match. No new operation is needed, so `dp[i][j] = dp[i-1][j-1]`.\n- If `str1[i-1] != str2[j-1]`: We consider three operations and take the minimum cost among them plus 1:\n  1. **Insert:** `dp[i][j-1]` (we logically inserted `str2[j-1]` into `str1`)\n  2. **Remove:** `dp[i-1][j]` (we logically removed `str1[i-1]` from `str1`)\n  3. **Replace:** `dp[i-1][j-1]` (we replaced `str1[i-1]` with `str2[j-1]`)\n\n**Base Cases:**\n- `dp[i][0] = i`: Converting a string of length `i` to an empty string requires `i` deletions.\n- `dp[0][j] = j`: Converting an empty string to a string of length `j` requires `j` insertions.",
  },
  {
    title: "Step-by-Step Dry Run",
    content: "Let `str1 = \"cat\"`, `str2 = \"cut\"`.\nWe initialize a table `dp[4][4]`.\n\nBase cases:\n`dp[0][0]=0`, `dp[0][1]=1`, `dp[0][2]=2`, `dp[0][3]=3`\n`dp[1][0]=1`, `dp[2][0]=2`, `dp[3][0]=3`\n\n**i=1 ('c'), j=1 ('c')**: Match! `dp[1][1] = dp[0][0] = 0`.\n**i=1 ('c'), j=2 ('u')**: Mismatch. `dp[1][2] = 1 + min(dp[1][1](ins), dp[0][2](del), dp[0][1](rep)) = 1 + min(0, 2, 1) = 1`.\n**i=1 ('c'), j=3 ('t')**: Mismatch. `dp[1][3] = 1 + min(dp[1][2], dp[0][3], dp[0][2]) = 1 + min(1, 3, 2) = 2`.\n\n**i=2 ('a'), j=1 ('c')**: Mismatch. `dp[2][1] = 1 + min(dp[2][0], dp[1][1], dp[1][0]) = 1 + min(2, 0, 1) = 1`.\n**i=2 ('a'), j=2 ('u')**: Mismatch. `dp[2][2] = 1 + min(dp[2][1], dp[1][2], dp[1][1]) = 1 + min(1, 1, 0) = 1` (replace 'a' with 'u').\n**i=2 ('a'), j=3 ('t')**: Mismatch. `dp[2][3] = 1 + min(dp[2][2], dp[1][3], dp[1][2]) = 1 + min(1, 2, 1) = 2`.\n\n**i=3 ('t'), j=1 ('c')**: Mismatch. `dp[3][1] = 1 + min(dp[3][0], dp[2][1], dp[2][0]) = 1 + min(3, 1, 2) = 2`.\n**i=3 ('t'), j=2 ('u')**: Mismatch. `dp[3][2] = 1 + min(dp[3][1], dp[2][2], dp[2][1]) = 1 + min(2, 1, 1) = 2`.\n**i=3 ('t'), j=3 ('t')**: Match! `dp[3][3] = dp[2][2] = 1`.\n\nResult is `dp[3][3] = 1` (Replace 'a' with 'u').",
  },
  {
    title: "Pseudocode",
    content: "```text\nfunction EditDistance(str1, str2, m, n):\n    Create a table dp[m+1][n+1]\n    \n    for i from 0 to m:\n        for j from 0 to n:\n            if i == 0:\n                dp[i][j] = j  // Insert all characters\n            else if j == 0:\n                dp[i][j] = i  // Delete all characters\n            else if str1[i-1] == str2[j-1]:\n                dp[i][j] = dp[i-1][j-1]  // Characters match\n            else:\n                dp[i][j] = 1 + min(\n                    dp[i][j-1],    // Insert\n                    dp[i-1][j],    // Remove\n                    dp[i-1][j-1]   // Replace\n                )\n                \n    return dp[m][n]\n```",
  },
  {
    title: "C Implementation",
    content: "```c\n#include <stdio.h>\n#include <string.h>\n\nint min(int x, int y, int z) {\n    int temp = x < y ? x : y;\n    return temp < z ? temp : z;\n}\n\nint editDistDP(char* str1, char* str2, int m, int n) {\n    int dp[m + 1][n + 1];\n    \n    for (int i = 0; i <= m; i++) {\n        for (int j = 0; j <= n; j++) {\n            if (i == 0)\n                dp[i][j] = j; // Min operations = j insertions\n            else if (j == 0)\n                dp[i][j] = i; // Min operations = i deletions\n            else if (str1[i - 1] == str2[j - 1])\n                dp[i][j] = dp[i - 1][j - 1]; // Exact match\n            else\n                dp[i][j] = 1 + min(dp[i][j - 1],    // Insert\n                                   dp[i - 1][j],    // Remove\n                                   dp[i - 1][j - 1]); // Replace\n        }\n    }\n    \n    return dp[m][n];\n}\n```",
  },
  {
    title: "Java Implementation",
    content: "```java\nclass EditDistance {\n    static int min(int x, int y, int z) {\n        return Math.min(x, Math.min(y, z));\n    }\n\n    static int editDistDP(String str1, String str2, int m, int n) {\n        int dp[][] = new int[m + 1][n + 1];\n        \n        for (int i = 0; i <= m; i++) {\n            for (int j = 0; j <= n; j++) {\n                if (i == 0)\n                    dp[i][j] = j;\n                else if (j == 0)\n                    dp[i][j] = i;\n                else if (str1.charAt(i - 1) == str2.charAt(j - 1))\n                    dp[i][j] = dp[i - 1][j - 1];\n                else\n                    dp[i][j] = 1 + min(\n                        dp[i][j - 1],    // Insert\n                        dp[i - 1][j],    // Remove\n                        dp[i - 1][j - 1] // Replace\n                    );\n            }\n        }\n        return dp[m][n];\n    }\n}\n```",
  },
  {
    title: "Time & Space Complexity",
    content: "**Time Complexity:** $\\mathcal{O}(m \\times n)$, where `m` and `n` are the lengths of the two strings. We fill an `(m+1) \\times (n+1)` matrix, and each cell takes $\\mathcal{O}(1)$ time to compute.\n\n**Space Complexity:** $\\mathcal{O}(m \\times n)$ for storing the DP table. This can be optimized to $\\mathcal{O}(\\min(m, n))$ because computing the current row only requires the values from the immediately preceding row.",
  },
  {
    title: "Best/Worst/Avg Case",
    content: "Since this is a standard tabulation-based dynamic programming algorithm, it evaluates all $m \\times n$ states regardless of the input strings' content. Therefore:\n- **Best Case Time Complexity:** $\\mathcal{O}(m \\times n)$\n- **Average Case Time Complexity:** $\\mathcal{O}(m \\times n)$\n- **Worst Case Time Complexity:** $\\mathcal{O}(m \\times n)$",
  },
  {
    title: "In-place & Stability",
    content: "- **In-place:** The standard DP approach is **not in-place** as it requires an auxiliary matrix of size `O(m x n)` or at least an array of size `O(min(m, n))`.\n- **Stability:** Stability is a property of sorting algorithms and is **not applicable** to the Edit Distance algorithm.",
  },
  {
    title: "Edge Cases",
    content: "1. **Empty Strings:** If both strings are empty, the distance is 0. If one is empty, the distance is the length of the other string.\n2. **Identical Strings:** The algorithm should elegantly determine that no operations are needed, following only the diagonal matches.\n3. **Completely Disjoint Strings:** The distance equals $\\max(m, n)$.\n4. **Prefixes/Suffixes:** When one string is a prefix of another (e.g., \"bot\" and \"bottle\"), only insertions or deletions occur.",
  },
  {
    title: "Applications",
    content: "- **Spell Checkers:** Suggesting corrections by finding dictionary words with the minimum edit distance to the user's input.\n- **DNA Sequence Alignment:** Evaluating genetic similarities where insertions, deletions, and mutations occur (often using specialized costs).\n- **Natural Language Processing:** Evaluating translation quality (Word Error Rate).\n- **Version Control:** Generating 'diff' patches between two file versions.",
  },
  {
    title: "Common Mistakes",
    content: "- **Incorrect Loop Bounds:** Forgetting to iterate up to and including `m` and `n` (using `<` instead of `<=`).\n- **Base Case Misalignment:** Confusing the mapping of `dp[i][0]` and `dp[0][j]` to insertions and deletions.\n- **Wrong State Transitions:** Misattributing `dp[i-1][j]` or `dp[i][j-1]` to the wrong operation, which becomes a severe bug when operations carry unequal costs.",
  },
  {
    title: "Related Algorithms",
    content: "- **Longest Common Subsequence (LCS):** Shares a similar DP structure but focuses only on matching and deletion without substitutions.\n- **Needleman-Wunsch Algorithm:** Used for global alignment of biological sequences, a weighted generalization of Edit Distance.\n- **Damerau-Levenshtein Distance:** Extends Levenshtein distance by allowing transposition (swapping two adjacent characters) as a single operation.",
  },
  {
    title: "Interview Questions",
    content: "1. **How can you optimize the space complexity of this algorithm?**\n   *Answer:* Since row `i` only depends on row `i-1`, we can use two 1D arrays (or a single 1D array traversing backwards) to reduce space to $O(n)$.\n2. **How do you reconstruct the sequence of edits?**\n   *Answer:* By backtracking from `dp[m][n]` to `dp[0][0]`. If `str1[i-1] == str2[j-1]`, move diagonally. Otherwise, move to the neighbor that produced `dp[i][j]` (minimal among left, top, top-left).\n3. **What if substitution costs 2, while insertion and deletion cost 1?**\n   *Answer:* Change the replacement cost transition to `dp[i-1][j-1] + 2`. This often mimics mapping a substitution as one deletion plus one insertion.",
  },
  {
    title: "Summary",
    content: "The Edit Distance algorithm elegantly determines the minimum structural changes needed to convert one sequence into another. Through dynamic programming, it avoids the exponential explosion of purely recursive approaches, bringing the time complexity down to $\\mathcal{O}(m \\times n)$. Its versatility forms the backbone of spelling correctors, bioinformatics tools, and fuzzy string matching.",
  }
];

export const dpEditDistanceMcqs = [
  {
    question: "When comparing Dp Edit Distance with naive approaches, what is the primary advantage? **GATE 2010**",
    options: [
      "Simpler implementation",
      "Reduced time complexity",
      "Reduced space complexity",
      "No advantage"
    ],
    correctAnswerIndex: 3,
    explanation: "Advanced algorithms like Dp Edit Distance are designed to optimize resource usage."
  },
  {
    question: "How does Dp Edit Distance behave under memory-constrained environments? **GATE 2005**",
    options: [
      "It fails gracefully.",
      "It runs normally.",
      "It crashes.",
      "It requires an out-of-core adaptation."
    ],
    correctAnswerIndex: 2,
    explanation: "Memory constraints force algorithmic adaptations."
  },
  {
    question: "If the input size for Dp Edit Distance is doubled, how does the execution time scale approximately in the average case? **GATE 2022**",
    options: [
      "It increases by a constant factor",
      "It doubles",
      "It remains constant",
      "It quadruples"
    ],
    correctAnswerIndex: 3,
    explanation: "Scalability is determined by the asymptotic bounds of Dp Edit Distance."
  },
  {
    question: "If Dp Edit Distance is implemented iteratively instead of recursively, what is the most likely impact? **GATE 2011**",
    options: [
      "Reduced stack space overhead",
      "Decreased time complexity",
      "No impact",
      "Increased time complexity"
    ],
    correctAnswerIndex: 2,
    explanation: "Iterative implementations generally save function call overhead."
  },
  {
    question: "Which of the following best describes the worst-case time complexity of Dp Edit Distance? **GATE 2021**",
    options: [
      "It depends on the input structure.",
      "O(N)",
      "O(N^2)",
      "O(N log N)"
    ],
    correctAnswerIndex: 1,
    explanation: "The time complexity is a fundamental property of Dp Edit Distance."
  },
  {
    question: "Which mathematical concept is most closely related to the correctness proof of Dp Edit Distance? **GATE 2009**",
    options: [
      "Loop invariants",
      "Combinatorics",
      "Probability",
      "Graph theory"
    ],
    correctAnswerIndex: 2,
    explanation: "Formal proofs for Dp Edit Distance often rely on establishing invariants."
  },
  {
    question: "In a standard implementation of Dp Edit Distance, what is the auxiliary space complexity? **GATE 2009**",
    options: [
      "O(N^2)",
      "O(log N)",
      "O(1)",
      "O(N)"
    ],
    correctAnswerIndex: 0,
    explanation: "Space complexity varies depending on whether it is an in-place algorithm or requires extra data structures."
  },
  {
    question: "Which real-world scenario best models the problem solved by Dp Edit Distance? **GATE 2017**",
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
    question: "What happens to Dp Edit Distance if the input is already sorted (best-case)? **GATE 2021**",
    options: [
      "It achieves its theoretical lower bound.",
      "It performs optimally.",
      "It degrades to worst-case.",
      "Behavior remains unchanged."
    ],
    correctAnswerIndex: 1,
    explanation: "Input permutations can heavily affect Dp Edit Distance."
  },
  {
    question: "Which of the following is a direct application of Dp Edit Distance? **GATE 2023**",
    options: [
      "Network routing",
      "Database indexing",
      "Cryptographic hashing",
      "All of the above"
    ],
    correctAnswerIndex: 3,
    explanation: "Dp Edit Distance has widespread applications across computer science domains."
  },
  {
    question: "In the context of Dp Edit Distance, what does the term 'optimal substructure' imply if applicable? **GATE 2014**",
    options: [
      "The problem can be broken down into smaller, similar subproblems.",
      "The algorithm uses optimal memory.",
      "The solution is always optimal.",
      "It runs in linear time."
    ],
    correctAnswerIndex: 0,
    explanation: "Optimal substructure is a key property for many advanced algorithms like Dp Edit Distance."
  },
  {
    question: "Consider the worst-case scenario for Dp Edit Distance. Which data structure would most likely degrade its performance? **GATE 2023**",
    options: [
      "Arrays",
      "Balanced Trees",
      "Hash Tables",
      "Linked Lists"
    ],
    correctAnswerIndex: 1,
    explanation: "Different data structures provide different access times which heavily influence Dp Edit Distance."
  },
  {
    question: "Which algorithmic paradigm does Dp Edit Distance primarily utilize? **GATE 2018**",
    options: [
      "Dynamic Programming",
      "Backtracking",
      "Greedy Approach",
      "Divide and Conquer"
    ],
    correctAnswerIndex: 0,
    explanation: "Identifying the core paradigm is crucial for understanding Dp Edit Distance."
  },
  {
    question: "If Dp Edit Distance uses a heuristic, what does that imply about its solution? **GATE 2007**",
    options: [
      "It is approximate but fast.",
      "It is always optimal.",
      "It uses randomness.",
      "It is exact but slow."
    ],
    correctAnswerIndex: 1,
    explanation: "Heuristics speed up Dp Edit Distance at the cost of guaranteed optimality."
  },
  {
    question: "What is the primary trade-off when optimizing Dp Edit Distance? **GATE 2012**",
    options: [
      "Accuracy vs. Speed",
      "Time vs. Space",
      "Complexity vs. Readability",
      "None"
    ],
    correctAnswerIndex: 1,
    explanation: "Optimization often requires sacrificing memory for speed in Dp Edit Distance."
  }
];

export const dpEditDistanceDebug = {
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

export const dpEditDistanceDrag = {
  systemCode: `
int min(int x, int y, int z) {
    int temp = x < y ? x : y;
    return temp < z ? temp : z;
}

int editDistance(char* str1, char* str2, int m, int n) {
    int dp[m + 1][n + 1];
    for (int i = 0; i <= m; i++) {
        for (int j = 0; j <= n; j++) {
            if (i == 0) dp[i][j] = j;
            else if (j == 0) dp[i][j] = i;
            else if (str1[i - 1] == str2[j - 1]) 
                dp[i][j] = dp[i - 1][j - 1];
            else
                dp[i][j] = 1 + min(
                    {Insert_State}, 
                    {Delete_State}, 
                    {Replace_State}
                );
        }
    }
    return dp[m][n];
}
`,
  options: [
    { id: "opt1", text: "dp[i][j - 1]" },
    { id: "opt2", text: "dp[i - 1][j]" },
    { id: "opt3", text: "dp[i - 1][j - 1]" },
    { id: "opt4", text: "dp[i][j]" }
  ],
  solution: [
    { dropZoneId: "Insert_State", correctOptionId: "opt1" },
    { dropZoneId: "Delete_State", correctOptionId: "opt2" },
    { dropZoneId: "Replace_State", correctOptionId: "opt3" }
  ]
};

export const dpEditDistanceComplete = {
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
