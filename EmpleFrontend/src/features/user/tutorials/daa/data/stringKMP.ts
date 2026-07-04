export const stringKMPContent = {
  title: "Knuth-Morris-Pratt (KMP) Algorithm",
  points: [
    {
      title: "1. Introduction",
      description: "The Knuth-Morris-Pratt (KMP) algorithm is an efficient string matching algorithm that searches for occurrences of a 'word' or 'pattern' within a main 'text string'. Invented by Donald Knuth, Vaughan Pratt, and James H. Morris in 1970, it significantly improves upon the naive string matching approach by avoiding redundant comparisons."
    },
    {
      title: "2. Problem Statement",
      description: "Given a text string $T$ of length $N$ and a pattern string $P$ of length $M$, the objective is to find all starting indices in $T$ where $P$ occurs as a substring, or to determine that $P$ does not exist in $T$. The goal is to achieve this in linear time $O(N + M)$."
    },
    {
      title: "3. Theory & Working",
      description: "The core idea behind KMP is that whenever a mismatch occurs, the algorithm already has some knowledge of the characters in the text that matched the pattern before the mismatch. KMP uses this information to avoid backtracking the text pointer. This is achieved by precomputing an array called LPS (Longest Proper Prefix which is also Suffix). The LPS array stores the length of the maximum matching proper prefix and suffix for every sub-pattern. During the search, if a mismatch happens after some matches, KMP uses the LPS array to shift the pattern to a new position, ensuring that the previously matched characters align correctly."
    },
    {
      title: "4. Step-by-Step Dry Run",
      description: "Pattern $P$ = `ABABCABAB`, Text $T$ = `ABABDABACDABABCABAB`\n\n**Step 1: Compute LPS Array for P**\n- P: A B A B C A B A B\n- LPS: 0 0 1 2 0 1 2 3 4\n\n**Step 2: Search Phase**\n- Compare P with T from index 0. `ABAB` matches, but $T[4]$ ('D') $\neq$ $P[4]$ ('C').\n- Mismatch at $j=4$. We look at `LPS[4-1] = LPS[3] = 2`.\n- We keep text pointer $i=4$, shift pattern pointer $j$ to $2$. The new comparison aligns the prefix `AB` of P with the suffix `AB` of the matched part.\n- Next, compare $T[4]$ ('D') with $P[2]$ ('A'). Mismatch. $j = LPS[1] = 0$.\n- Compare $T[4]$ with $P[0]$. Mismatch. Since $j=0$, we increment $i=5$.\n- The process continues without backtracking $i$, eventually matching the full pattern at index 10."
    },
    {
      title: "5. Pseudocode",
      description: "```text\nfunction computeLPS(P):\n    M = length(P)\n    lps = array of size M, initialized to 0\n    len = 0, i = 1\n    while i < M:\n        if P[i] == P[len]:\n            len++\n            lps[i] = len\n            i++\n        else:\n            if len != 0:\n                len = lps[len - 1]\n            else:\n                lps[i] = 0\n                i++\n    return lps\n\nfunction KMPSearch(T, P):\n    N = length(T), M = length(P)\n    lps = computeLPS(P)\n    i = 0, j = 0\n    while i < N:\n        if P[j] == T[i]:\n            i++, j++\n        if j == M:\n            print 'Pattern found at index ', i - j\n            j = lps[j - 1]\n        else if i < N and P[j] != T[i]:\n            if j != 0:\n                j = lps[j - 1]\n            else:\n                i++\n```"
    },
    {
      title: "6. C Implementation",
      description: "C implementation of KMP Algorithm:",
      code: "#include <stdio.h>\n#include <string.h>\n\nvoid computeLPS(char* pat, int M, int* lps) {\n    int len = 0;\n    lps[0] = 0;\n    int i = 1;\n    while (i < M) {\n        if (pat[i] == pat[len]) {\n            len++;\n            lps[i] = len;\n            i++;\n        } else {\n            if (len != 0) {\n                len = lps[len - 1];\n            } else {\n                lps[i] = 0;\n                i++;\n            }\n        }\n    }\n}\n\nvoid KMPSearch(char* txt, char* pat) {\n    int N = strlen(txt);\n    int M = strlen(pat);\n    int lps[M];\n    computeLPS(pat, M, lps);\n    int i = 0, j = 0;\n    while (i < N) {\n        if (pat[j] == txt[i]) {\n            j++; i++;\n        }\n        if (j == M) {\n            printf(\"Pattern found at index %d\\n\", i - j);\n            j = lps[j - 1];\n        } else if (i < N && pat[j] != txt[i]) {\n            if (j != 0) j = lps[j - 1];\n            else i++;\n        }\n    }\n}",
      language: "c"
    },
    {
      title: "7. Java Implementation",
      description: "Java implementation of KMP Algorithm:",
      code: "public class KMP {\n    void computeLPS(String pat, int M, int[] lps) {\n        int len = 0, i = 1;\n        lps[0] = 0;\n        while (i < M) {\n            if (pat.charAt(i) == pat.charAt(len)) {\n                len++;\n                lps[i] = len;\n                i++;\n            } else {\n                if (len != 0) {\n                    len = lps[len - 1];\n                } else {\n                    lps[i] = 0;\n                    i++;\n                }\n            }\n        }\n    }\n\n    void search(String txt, String pat) {\n        int N = txt.length(), M = pat.length();\n        int[] lps = new int[M];\n        computeLPS(pat, M, lps);\n        int i = 0, j = 0;\n        while (i < N) {\n            if (pat.charAt(j) == txt.charAt(i)) {\n                j++; i++;\n            }\n            if (j == M) {\n                System.out.println(\"Found pattern at index \" + (i - j));\n                j = lps[j - 1];\n            } else if (i < N && pat.charAt(j) != txt.charAt(i)) {\n                if (j != 0) j = lps[j - 1];\n                else i++;\n            }\n        }\n    }\n}",
      language: "java"
    },
    {
      title: "8. Time & Space Complexity",
      description: "Time Complexity: $O(N + M)$, where $N$ is the length of the text and $M$ is the length of the pattern. The algorithm processes the text array without ever moving the pointer backward, and computing the LPS array takes $O(M)$ time.\nSpace Complexity: $O(M)$ due to the dynamically or statically allocated LPS array of size equal to the length of the pattern."
    },
    {
      title: "9. Best/Worst/Avg Case",
      description: "Best Case: $O(N)$. Occurs when the pattern immediately mismatches at the first character across the text, preventing any inner operations. Construction is always $O(M)$.\nWorst Case: $O(N + M)$. The most demanding scenarios (like $T$ = 'AAAAAAA', $P$ = 'AAAB') still do not force the algorithm to perform more than $2N$ comparisons.\nAverage Case: $O(N + M)$, demonstrating consistent linear-time performance."
    },
    {
      title: "10. In-place & Stability",
      description: "In-place: No. KMP requires $O(M)$ auxiliary space to store the LPS array.\nStability: Not applicable in the context of sorting. However, if 'stability' denotes whether it finds overlapping or consecutive matches in the correct order, KMP effectively processes text sequentially and can find all overlapping occurrences without skipping."
    },
    {
      title: "11. Edge Cases",
      description: "1. The pattern is longer than the text ($M > N$): Automatically impossible to find, handled effectively as the main loop will terminate immediately.\n2. The pattern is empty: Customarily returns index 0 or requires an early return condition.\n3. The text is entirely uniform and pattern consists of the same character: Handled beautifully in $O(N)$ with no pathological slowdown."
    },
    {
      title: "12. Applications",
      description: "KMP is extensively used in text editors for \"Find\" features, intrusion detection systems, DNA sequence matching, and searching within extremely large log files where backtracking a data stream would be prohibitively slow."
    },
    {
      title: "13. Common Mistakes",
      description: "A common pitfall is the recursive backward jump `len = lps[len - 1]` inside the LPS computation and search phases. Beginners often mistakenly try `len--` or `j--`, which ruins the time complexity and correctness of skipping redundant checks. Ensure you always look up the previously computed prefix boundaries."
    },
    {
      title: "14. Related Algorithms",
      description: "- Rabin-Karp: Uses rolling hashing. Great for multiple pattern search.\n- Boyer-Moore: Starts matching from the end of the pattern. Generally faster in practice for typical text due to the \"bad character\" and \"good suffix\" heuristics.\n- Aho-Corasick: An extension of KMP for matching multiple patterns simultaneously using a prefix trie."
    },
    {
      title: "15. Interview Questions",
      description: "1. Why does KMP guarantee $O(N)$ comparisons during the search phase despite having a nested while-loop equivalent logic?\n2. What does `lps[i]` physically represent for a given substring?\n3. Dry run the KMP algorithm for $P$ = \"AAAA\" and $T$ = \"AAAAABAA\".\n4. Modify KMP to count the number of non-overlapping occurrences."
    },
    {
      title: "16. Summary",
      description: "The Knuth-Morris-Pratt algorithm fundamentally transformed substring searching by proving it could be done in guaranteed linear time. By formalizing the concept of a Longest Proper Prefix which is also a Suffix (LPS), it eliminates all wasteful backtracking on the primary text."
    }
  ]
};

export const stringKMPMcqs = [
  {
    question: "What does LPS stand for in the context of the Knuth-Morris-Pratt (KMP) algorithm?",
    options: ["Longest Palindrome Suffix", "Longest Proper Prefix which is also Suffix", "Lowest Prefix Sum", "Linear Pattern Search"],
    correctOption: 1,
    explanation: "In KMP, LPS stands for 'Longest Proper Prefix which is also Suffix'. It is an array used to store the length of the maximum matching proper prefix and suffix for every sub-pattern to prevent unnecessary backtracking."
  },
  {
    question: "Consider a pattern P = 'AABAACAABAA'. What is the value of the LPS array at the last index?",
    options: ["3", "4", "5", "6"],
    correctOption: 2,
    explanation: "The full pattern is 'AABAACAABAA'. The proper prefix 'AABAA' (length 5) matches the suffix 'AABAA'. Therefore, the value at the last index of the LPS array is 5."
  },
  {
    question: "Which of the following describes the worst-case time complexity of the KMP algorithm for finding a pattern of length M in a text of length N?",
    options: ["O(N * M)", "O(N log M)", "O(N + M)", "O(M)"],
    correctOption: 2,
    explanation: "The KMP algorithm constructs the LPS array in O(M) time and processes the text in O(N) time. Since the text pointer never backtracks, the worst-case time complexity is bounded strictly by O(N + M)."
  },
  {
    question: "In the KMP algorithm, if a mismatch occurs at text index `i` and pattern index `j` (where `j > 0`), what is the next step for `j`?",
    options: ["j = 0", "j = j - 1", "j = lps[j - 1]", "j = lps[j]"],
    correctOption: 2,
    explanation: "When a mismatch occurs at pattern index `j`, KMP utilizes the LPS array to find the longest proper prefix that was a suffix of the characters matched so far. The pattern pointer updates to `j = lps[j - 1]`."
  },
  {
    question: "If all characters in the text and pattern are identical (e.g., T = 'AAAAAA', P = 'AAA'), how many times does the KMP algorithm backtrack the text pointer `i`?",
    options: ["0 times", "N - M times", "M times", "Depends on the LPS array"],
    correctOption: 0,
    explanation: "The primary efficiency of the KMP algorithm stems from the fact that it NEVER backtracks the text pointer `i`. It only shifts the pattern pointer `j` using the LPS array."
  },
  {
    question: "For a given pattern string P, what is always the value of `lps[0]`?",
    options: ["-1", "0", "1", "Cannot be determined"],
    correctOption: 1,
    explanation: "A proper prefix must be strictly shorter than the string itself. For a single character string (length 1), there is no proper prefix. Therefore, `lps[0]` is always mathematically 0."
  },
  {
    question: "Let the LPS array of a pattern be `[0, 1, 0, 1, 2]`. If a mismatch occurs at index `j = 4` of the pattern, what index of the pattern will be compared next?",
    options: ["0", "1", "2", "3"],
    correctOption: 1,
    explanation: "Mismatch occurs at `j = 4`. The algorithm updates `j` to `lps[j - 1] = lps[4 - 1] = lps[3]`. Based on the array provided, `lps[3] = 1`. Hence, the next comparison happens at pattern index 1."
  },
  {
    question: "In comparison to the Naive string matching algorithm, what trade-off does the KMP algorithm make?",
    options: ["Uses O(M) extra space to achieve linear time.", "Sacrifices linear time for constant space.", "Requires the text to be sorted beforehand.", "Uses recursion which may cause stack overflow."],
    correctOption: 0,
    explanation: "The KMP algorithm uses an auxiliary array (LPS) of size M, thus taking O(M) extra space, to avoid the O(N * M) time complexity of the Naive algorithm and guarantee O(N + M) time."
  },
  {
    question: "What is the primary advantage of the Boyer-Moore algorithm over KMP for large practical alphabets (like English text)?",
    options: ["Boyer-Moore does not use extra space.", "Boyer-Moore is easier to implement.", "Boyer-Moore can skip multiple characters in the text, leading to sub-linear time in practice.", "KMP cannot handle overlapping matches."],
    correctOption: 2,
    explanation: "Boyer-Moore matches the pattern from right to left and uses the 'bad character' heuristic, which allows it to skip sections of the text entirely. In practice, this often makes it faster than KMP for regular text."
  },
  {
    question: "Consider a pattern of length M and text of length N. What is the maximum number of character comparisons KMP will make in the search phase alone?",
    options: ["N", "2N", "N + M", "N * M"],
    correctOption: 1,
    explanation: "In the search phase, either the text pointer `i` increases, or `i - j` increases (when `j` is reduced via the LPS array). Since `i` goes up to N and `i - j` can also increase at most N times, the number of comparisons is bounded by 2N."
  }
];

export const stringKMPDebug = {
  instructions: "Fix the syntax error so the code compiles correctly.",
  buggyC: "#include <stdio.h>\n\nint main() {\n    printf(\"Hello World\")\n    return 0;\n}",
  fixedC: "#include <stdio.h>\n\nint main() {\n    printf(\"Hello World\\n\");\n    return 0;\n}",
  buggyJava: "public class Main {\n    public static void main(String[] args) {\n        System.out.printl(\"Hello World\");\n    }\n}",
  fixedJava: "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello World\");\n    }\n}",
  hints: ["Check the print statement.","Missing semicolon or wrong spelling?","Fix it!"],
  expectedOutput: "Hello World"
};

export const stringKMPDrag = {
  title: "Assemble the KMP Search Loop",
  blocks: [
    "while (i < N) {",
    "    if (pat[j] == txt[i]) {",
    "        j++; i++;",
    "    }",
    "    if (j == M) {",
    "        return i - j; // Match found",
    "    } else if (i < N && pat[j] != txt[i]) {",
    "        if (j != 0) j = lps[j - 1];",
    "        else i++;",
    "    }",
    "}"
  ],
  correctOrder: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
};

export const stringKMPComplete = {
  title: "Complete the LPS Construction Logic",
  code: "void computeLPS(char* pat, int M, int* lps) {\n    int len = 0;\n    lps[0] = 0;\n    int i = 1;\n    while (i < M) {\n        if (pat[i] == pat[len]) {\n            len++;\n            lps[i] = /*[BLANK]*/;\n            i++;\n        } else {\n            if (len != 0) {\n                len = /*[BLANK]*/;\n            } else {\n                lps[i] = /*[BLANK]*/;\n                i++;\n            }\n        }\n    }\n}",
  blanks: ["len", "lps[len - 1]", "0"],
  explanation: "If a match occurs, we increment `len` and assign `lps[i] = len`. If there's a mismatch and `len != 0`, we backtrack by setting `len = lps[len - 1]`. If `len == 0`, we simply assign `lps[i] = 0` and increment `i`."
};
