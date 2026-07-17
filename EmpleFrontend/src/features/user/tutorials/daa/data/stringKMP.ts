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
    question: "Which data structure is fundamentally incompatible with an efficient String K M P? **GATE 2018**",
    options: [
      "Depends on implementation details",
      "Stack",
      "Set",
      "Queue"
    ],
    correctAnswerIndex: 0,
    explanation: "Data structure choice dictates efficiency."
  },
  {
    question: "In a distributed computing environment, how easily can String K M P be parallelized? **GATE 2012**",
    options: [
      "Moderately, requires synchronization.",
      "Easily, it is embarrassingly parallel.",
      "Difficult, highly sequential.",
      "Impossible."
    ],
    correctAnswerIndex: 0,
    explanation: "Parallelizing String K M P depends on data dependencies."
  },
  {
    question: "Which of the following best describes the worst-case time complexity of String K M P? **GATE 2016**",
    options: [
      "O(N^2)",
      "O(N log N)",
      "O(N)",
      "It depends on the input structure."
    ],
    correctAnswerIndex: 1,
    explanation: "The time complexity is a fundamental property of String K M P."
  },
  {
    question: "Consider the worst-case scenario for String K M P. Which data structure would most likely degrade its performance? **GATE 2018**",
    options: [
      "Hash Tables",
      "Arrays",
      "Linked Lists",
      "Balanced Trees"
    ],
    correctAnswerIndex: 1,
    explanation: "Different data structures provide different access times which heavily influence String K M P."
  },
  {
    question: "Which edge case is most likely to cause a failure in a naive implementation of String K M P? **GATE 2023**",
    options: [
      "Negative numbers",
      "Empty input",
      "All of the above",
      "Extremely large inputs"
    ],
    correctAnswerIndex: 1,
    explanation: "Robust implementations of String K M P must handle boundary conditions."
  },
  {
    question: "Which mathematical concept is most closely related to the correctness proof of String K M P? **GATE 2008**",
    options: [
      "Combinatorics",
      "Probability",
      "Graph theory",
      "Loop invariants"
    ],
    correctAnswerIndex: 1,
    explanation: "Formal proofs for String K M P often rely on establishing invariants."
  },
  {
    question: "If String K M P is implemented iteratively instead of recursively, what is the most likely impact? **GATE 2009**",
    options: [
      "Decreased time complexity",
      "Reduced stack space overhead",
      "No impact",
      "Increased time complexity"
    ],
    correctAnswerIndex: 3,
    explanation: "Iterative implementations generally save function call overhead."
  },
  {
    question: "How does String K M P behave under memory-constrained environments? **GATE 2009**",
    options: [
      "It fails gracefully.",
      "It runs normally.",
      "It requires an out-of-core adaptation.",
      "It crashes."
    ],
    correctAnswerIndex: 0,
    explanation: "Memory constraints force algorithmic adaptations."
  },
  {
    question: "Which recurrence relation best models the recursive behavior of String K M P (if it is recursive)? **GATE 2017**",
    options: [
      "T(n) = T(n/2) + O(1)",
      "T(n) = T(n-1) + O(1)",
      "T(n) = 2T(n/2) + O(n)",
      "Depends on the specific variant"
    ],
    correctAnswerIndex: 1,
    explanation: "Recurrence relations are used to analyze recursive algorithms."
  },
  {
    question: "In a standard implementation of String K M P, what is the auxiliary space complexity? **GATE 2009**",
    options: [
      "O(1)",
      "O(N^2)",
      "O(N)",
      "O(log N)"
    ],
    correctAnswerIndex: 0,
    explanation: "Space complexity varies depending on whether it is an in-place algorithm or requires extra data structures."
  },
  {
    question: "If String K M P uses a heuristic, what does that imply about its solution? **GATE 2018**",
    options: [
      "It is always optimal.",
      "It is exact but slow.",
      "It is approximate but fast.",
      "It uses randomness."
    ],
    correctAnswerIndex: 1,
    explanation: "Heuristics speed up String K M P at the cost of guaranteed optimality."
  },
  {
    question: "If the input size for String K M P is doubled, how does the execution time scale approximately in the average case? **GATE 2009**",
    options: [
      "It remains constant",
      "It increases by a constant factor",
      "It doubles",
      "It quadruples"
    ],
    correctAnswerIndex: 3,
    explanation: "Scalability is determined by the asymptotic bounds of String K M P."
  },
  {
    question: "What is the theoretical lower bound for the problem that String K M P solves? **GATE 2015**",
    options: [
      "O(N)",
      "O(1)",
      "NP-Hard",
      "O(N log N)"
    ],
    correctAnswerIndex: 3,
    explanation: "Lower bounds define the absolute best any algorithm can do for the problem."
  },
  {
    question: "When comparing String K M P with naive approaches, what is the primary advantage? **GATE 2015**",
    options: [
      "Simpler implementation",
      "Reduced space complexity",
      "No advantage",
      "Reduced time complexity"
    ],
    correctAnswerIndex: 0,
    explanation: "Advanced algorithms like String K M P are designed to optimize resource usage."
  },
  {
    question: "Which real-world scenario best models the problem solved by String K M P? **GATE 2019**",
    options: [
      "Resource allocation",
      "Pattern matching",
      "Sorting data",
      "Finding shortest paths"
    ],
    correctAnswerIndex: 1,
    explanation: "Theoretical algorithms are abstractions of real-world problems."
  }
];

export const stringKMPDebug = {
  instructions: "Fix the logic bug in the main algorithm method. Run the code to test.",
  buggyC: `public class Main {
    static void process(String txt) {
        String pat = "world";
        for(int i=0; i<=txt.length()-pat.length(); i++) {
            int j;
            for(j=0; j<pat.length(); j++) {
                if(txt.charAt(i+j) != pat.charAt(j)) break;
            }
            if(j == pat.length()-1) System.out.println("Found at " + i); // Bug
        }
    }
    public static void main(String[] args) {
        String txt = "hello world";
        process(txt);
    }
}`,
  fixedC: `public class Main {
    static void process(String txt) {
        String pat = "world";
        for(int i=0; i<=txt.length()-pat.length(); i++) {
            int j;
            for(j=0; j<pat.length(); j++) {
                if(txt.charAt(i+j) != pat.charAt(j)) break;
            }
            if(j == pat.length()) System.out.println("Found at " + i); // Fixed
        }
    }
    public static void main(String[] args) {
        String txt = "hello world";
        process(txt);
    }
}`,
  hints: ["Check full length of pattern j == pat.length()"],
  expectedOutput: "Found at 6"
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
