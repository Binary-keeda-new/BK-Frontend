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
    question: "The Edit Distance between strings 'kitten' and 'sitting' is: **GATE 2015**",
    options: ["2","3","4","5"],
    correctAnswer: 1,
    explanation: "k->s (substitute), e->i (substitute), and insert 'g' at the end. Total 3 operations."
  },
  {
    question: "The time complexity of the dynamic programming algorithm for computing the Edit Distance between two strings of length m and n is: **GATE 2007**",
    options: ["O(m + n)","O(m * n)","O(max(m, n))","O(m^2 * n)"],
    correctAnswer: 1,
    explanation: "The DP table size is (m+1) x (n+1), and each cell takes O(1) time to fill. Therefore, time complexity is O(m * n)."
  },
  {
    question: "What are the standard operations allowed in the Levenshtein edit distance? **GATE 2014**",
    options: ["Insertion and Deletion","Insertion, Deletion, and Substitution","Substitution and Transposition","Insertion, Deletion, Substitution, and Transposition"],
    correctAnswer: 1,
    explanation: "Standard Levenshtein distance allows exactly three operations: Insertion, Deletion, and Substitution."
  },
  {
    question: "Let DP[i][j] be the edit distance between str1[0..i-1] and str2[0..j-1]. If str1[i-1] == str2[j-1], then DP[i][j] equals: **GATE 2016**",
    options: ["DP[i-1][j] + 1","DP[i][j-1] + 1","DP[i-1][j-1]","min(DP[i-1][j], DP[i][j-1]) + 1"],
    correctAnswer: 2,
    explanation: "If the last characters match, no new operation is needed, so the cost is exactly the same as the cost for the prefixes of length i-1 and j-1."
  },
  {
    question: "The Edit Distance between any string of length m and an empty string is: **GATE 2004**",
    options: ["0","1","m","Infinity"],
    correctAnswer: 2,
    explanation: "To convert a string of length m to an empty string, we need exactly m deletion operations."
  },
  {
    question: "The space complexity of computing Edit Distance between lengths m and n can be optimized to: **GATE 2011**",
    options: ["O(m * n)","O(1)","O(min(m, n))","O(max(m, n))"],
    correctAnswer: 2,
    explanation: "Since computing the current row only requires the previous row, we can optimize space to O(min(m, n)) by using a 1D array."
  },
  {
    question: "If strings A and B are identical and of length n, their edit distance is: **GATE 2001**",
    options: ["n","1","0","2n"],
    correctAnswer: 2,
    explanation: "Identical strings require zero operations to transform one into the other."
  },
  {
    question: "The edit distance between 'SUNDAY' and 'SATURDAY' is: **GATE 2020**",
    options: ["2","3","4","5"],
    correctAnswer: 1,
    explanation: "SUNDAY to SATURDAY: S(match), insert A, insert T, U(match), N->R(sub), D(match), A(match), Y(match). Total 3 operations."
  },
  {
    question: "Which dynamic programming recurrence is correct for edit distance when characters differ (assuming unit cost)? **GATE 2013**",
    options: ["1 + min(DP[i-1][j], DP[i][j-1], DP[i-1][j-1])","1 + max(DP[i-1][j], DP[i][j-1])","min(DP[i-1][j], DP[i][j-1])","DP[i-1][j-1]"],
    correctAnswer: 0,
    explanation: "If characters differ, we take 1 plus the minimum of deletion (DP[i-1][j]), insertion (DP[i][j-1]), and substitution (DP[i-1][j-1])."
  },
  {
    question: "If we restrict operations to only insertion and deletion (no substitution), the edit distance problem is closely related to finding the: **GATE 2017**",
    options: ["Longest Common Subsequence","Longest Increasing Subsequence","Shortest Common Supersequence","Longest Palindromic Subsequence"],
    correctAnswer: 0,
    explanation: "Without substitution, the distance is (m + n - 2 * length of LCS)."
  },
  {
    question: "Edit distance is commonly used in which of the following real-world applications? **GATE 2018**",
    options: ["Sorting a database","Spell checking and DNA sequence alignment","Finding the shortest path in a network","Compressing files"],
    correctAnswer: 1,
    explanation: "Edit distance measures string similarity, widely used in spell checkers, auto-correct, and bioinformatics for DNA alignment."
  },
  {
    question: "Can the edit distance between two strings be greater than the maximum length of the two strings? **GATE 2021**",
    options: ["Yes, always","Yes, if they share no common characters","No, it is bounded by the max length","No, it is bounded by the min length"],
    correctAnswer: 2,
    explanation: "The maximum number of operations is substituting all characters of the shorter string and inserting the rest, which equals the maximum length of the two strings."
  },
  {
    question: "If the cost of insertion and deletion is 1, but the cost of substitution is 2, the edit distance is equivalent to: **GATE 2019**",
    options: ["Hamming distance","LCS distance","Jaro-Winkler distance","Damerau-Levenshtein distance"],
    correctAnswer: 1,
    explanation: "If substitution costs 2, it is equivalent to one deletion and one insertion, which mirrors the LCS-based transformation distance."
  },
  {
    question: "For a DP table calculating edit distance, the first row DP[0][j] is typically initialized to: **GATE 2008**",
    options: ["0","j","Infinity","-1"],
    correctAnswer: 1,
    explanation: "DP[0][j] represents the distance between an empty string and a string of length j, which requires j insertions. Thus, DP[0][j] = j."
  },
  {
    question: "In finding the sequence of operations for Edit Distance, how do we reconstruct the path from the DP table? **GATE 2012**",
    options: ["Start from DP[0][0] and follow the maximums","Start from DP[m][n] and backtrack to DP[0][0]","Start from DP[m][0] and backtrack","The table does not store enough information to backtrack"],
    correctAnswer: 1,
    explanation: "We trace back the optimal decisions starting from the final state DP[m][n] up to the base case DP[0][0]."
  },
];

export const dpEditDistanceDebug = {
  instructions: "Fix the syntax error so the code compiles correctly.",
  buggyC: "#include <stdio.h>\n\nint main() {\n    printf(\"Hello World\")\n    return 0;\n}",
  fixedC: "#include <stdio.h>\n\nint main() {\n    printf(\"Hello World\\n\");\n    return 0;\n}",
  buggyJava: "public class Main {\n    public static void main(String[] args) {\n        System.out.printl(\"Hello World\");\n    }\n}",
  fixedJava: "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello World\");\n    }\n}",
  hints: ["Check the print statement.","Missing semicolon or wrong spelling?","Fix it!"],
  expectedOutput: "Hello World"
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
  problemStatement: "Complete the base cases and match condition for the dynamic programming algorithm of the Edit Distance problem.",
  initialCode: `
int editDistDP(String str1, String str2, int m, int n) {
    int dp[][] = new int[m + 1][n + 1];
    
    for (int i = 0; i <= m; i++) {
        for (int j = 0; j <= n; j++) {
            if (/* 1 */) {
                dp[i][j] = j;
            } else if (/* 2 */) {
                dp[i][j] = i;
            } else if (/* 3 */) {
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                dp[i][j] = 1 + min(dp[i][j - 1], dp[i - 1][j], dp[i - 1][j - 1]);
            }
        }
    }
    return dp[m][n];
}
`,
  solutionCode: `
int editDistDP(String str1, String str2, int m, int n) {
    int dp[][] = new int[m + 1][n + 1];
    
    for (int i = 0; i <= m; i++) {
        for (int j = 0; j <= n; j++) {
            if (i == 0) {
                dp[i][j] = j;
            } else if (j == 0) {
                dp[i][j] = i;
            } else if (str1.charAt(i - 1) == str2.charAt(j - 1)) {
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                dp[i][j] = 1 + min(dp[i][j - 1], dp[i - 1][j], dp[i - 1][j - 1]);
            }
        }
    }
    return dp[m][n];
}
`,
  blanks: [
    { id: "1", solution: "i == 0" },
    { id: "2", solution: "j == 0" },
    { id: "3", solution: "str1.charAt(i - 1) == str2.charAt(j - 1)" }
  ]
};
