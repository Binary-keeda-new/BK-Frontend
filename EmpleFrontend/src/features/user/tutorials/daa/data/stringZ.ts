export const stringZContent = [
  {
    title: "1. Introduction",
    content: "The Z Algorithm is a linear time string matching algorithm used to find all occurrences of a pattern within a text. It operates by constructing a 'Z-array' which stores the length of the longest substring starting from each index that is also a prefix of the string. Its main advantage is simplicity and avoiding the need for complex state machines or failure functions like those in the KMP algorithm."
  },
  {
    title: "2. Problem Statement",
    content: "Given a text string `T` of length `N` and a pattern string `P` of length `M`, find all starting indices in `T` where `P` occurs as a substring. The algorithm should perform this search in linear time, i.e., O(N + M)."
  },
  {
    title: "3. Theory & Working",
    content: "The Z Algorithm concatenates the pattern and text with a special character (e.g., `$`) that doesn't appear in either string: `S = P + '$' + T`. It then calculates the Z-array for this new string `S`.\n\nThe Z-array `Z` is defined such that `Z[i]` is the length of the longest substring starting from `S[i]` which is also a prefix of `S`. \nTo compute `Z[i]` efficiently, the algorithm maintains an interval `[L, R]` which is the rightmost segment matching a prefix of `S`.\n- If `i > R`: We find the match explicitly by comparing characters, then update `L` and `R`.\n- If `i <= R`: We are within a previously matched segment. We can use the previously computed `Z[i - L]` to optimize. Let `k = i - L`.\n  - If `Z[k] < R - i + 1`: `Z[i] = Z[k]`.\n  - If `Z[k] >= R - i + 1`: We know at least `R - i + 1` characters match. We start explicitly matching from `R + 1` onwards and update `L` and `R`."
  },
  {
    title: "4. Step-by-Step Dry Run",
    content: "Pattern `P = \"ab\"`, Text `T = \"aab\"`.\nConcatenated string `S = \"ab$aab\"`.\nLength = 6. Initialize `Z = [0, 0, 0, 0, 0, 0]`, `L = 0, R = 0`.\n\n- **i = 1 ('b')**: `i > R`. Match explicitly: `S[1]` ('b') != `S[0]` ('a'). `Z[1] = 0`.\n- **i = 2 ('$')**: `i > R`. `S[2]` != `S[0]`. `Z[2] = 0`.\n- **i = 3 ('a')**: `i > R`. Match explicitly: `S[3]` == `S[0]` ('a'), `S[4]` != `S[1]` ('b' != 'a'). Match length = 1. `Z[3] = 1`. Update `L = 3, R = 3`.\n- **i = 4 ('a')**: `i > R` (since 4 > 3). Match explicitly: `S[4]` == `S[0]` ('a'), `S[5]` == `S[1]` ('b'). Match length = 2. `Z[4] = 2`. Update `L = 4, R = 5`.\n- **i = 5 ('b')**: `i <= R` (5 <= 5). `k = 5 - L = 1`. `Z[1] = 0`. Since `0 < 5 - 5 + 1`, `Z[5] = Z[1] = 0`.\n\nFinal Z-array: `[0, 0, 0, 1, 2, 0]`. Matches where `Z[i] == length(P)` (which is 2). `Z[4] == 2`, corresponding to index `4 - 2 - 1 = 1` in the text."
  },
  {
    title: "5. Pseudocode",
    content: `function getZarr(S):
    n = length(S)
    Z = array of size n, initialized to 0
    L = 0, R = 0
    for i = 1 to n - 1:
        if i > R:
            L = i, R = i
            while R < n and S[R - L] == S[R]:
                R++
            Z[i] = R - L
            R--
        else:
            k = i - L
            if Z[k] < R - i + 1:
                Z[i] = Z[k]
            else:
                L = i
                while R < n and S[R - L] == S[R]:
                    R++
                Z[i] = R - L
                R--
    return Z

function search(T, P):
    S = P + "$" + T
    Z = getZarr(S)
    for i = 0 to length(Z) - 1:
        if Z[i] == length(P):
            print "Pattern found at index", i - length(P) - 1`
  },
  {
    title: "6. C Implementation",
    content: `#include <stdio.h>
#include <string.h>
#include <stdlib.h>

void getZarr(char *str, int Z[]) {
    int n = strlen(str);
    int L = 0, R = 0;
    for (int i = 1; i < n; ++i) {
        if (i > R) {
            L = R = i;
            while (R < n && str[R - L] == str[R]) R++;
            Z[i] = R - L;
            R--;
        } else {
            int k = i - L;
            if (Z[k] < R - i + 1)
                Z[i] = Z[k];
            else {
                L = i;
                while (R < n && str[R - L] == str[R]) R++;
                Z[i] = R - L;
                R--;
            }
        }
    }
}

void search(char *text, char *pattern) {
    int m = strlen(pattern), n = strlen(text);
    char *concat = (char *)malloc(m + n + 2);
    strcpy(concat, pattern);
    strcat(concat, "$");
    strcat(concat, text);
    
    int l = strlen(concat);
    int *Z = (int *)calloc(l, sizeof(int));
    getZarr(concat, Z);
    
    for (int i = 0; i < l; ++i) {
        if (Z[i] == m) {
            printf("Pattern found at index %d\\n", i - m - 1);
        }
    }
    free(concat);
    free(Z);
}`
  },
  {
    title: "7. Java Implementation",
    content: `public class ZAlgorithm {
    private static void getZarr(String str, int[] Z) {
        int n = str.length();
        int L = 0, R = 0;
        for (int i = 1; i < n; ++i) {
            if (i > R) {
                L = R = i;
                while (R < n && str.charAt(R - L) == str.charAt(R)) {
                    R++;
                }
                Z[i] = R - L;
                R--;
            } else {
                int k = i - L;
                if (Z[k] < R - i + 1) {
                    Z[i] = Z[k];
                } else {
                    L = i;
                    while (R < n && str.charAt(R - L) == str.charAt(R)) {
                        R++;
                    }
                    Z[i] = R - L;
                    R--;
                }
            }
        }
    }

    public static void search(String text, String pattern) {
        String concat = pattern + "$" + text;
        int l = concat.length();
        int[] Z = new int[l];
        getZarr(concat, Z);
        
        for (int i = 0; i < l; ++i) {
            if (Z[i] == pattern.length()) {
                System.out.println("Pattern found at index " + (i - pattern.length() - 1));
            }
        }
    }
}`
  },
  {
    title: "8. Time & Space Complexity",
    content: "**Time Complexity:** `O(N + M)`\nWhere `N` is the length of the text and `M` is the length of the pattern. Constructing the Z-array takes linear time proportional to the length of the concatenated string because the `R` boundary never decreases and only advances up to `N + M`. Therefore, the inner `while` loop runs at most `N + M` times overall.\n\n**Space Complexity:** `O(N + M)`\nThe algorithm requires creating a concatenated string `P + '$' + T` and an integer array `Z` of the same size, which dictates a linear space overhead."
  },
  {
    title: "9. Best/Worst/Avg Case",
    content: "- **Best Case Time:** `O(N + M)`: The linear scan and Z-array calculation scales strictly with the size of the string. E.g., when characters do not match early on.\n- **Worst Case Time:** `O(N + M)`: Even if all characters in the string are identical (e.g., searching \"aaa\" in \"aaaaaaa\"), the algorithm performs a linear number of character comparisons because `R` prevents redundant checks.\n- **Average Case Time:** `O(N + M)`"
  },
  {
    title: "10. In-place & Stability",
    content: "- **In-place:** No, the Z Algorithm is not in-place. It requires `O(N + M)` auxiliary space for the Z-array and the concatenated string.\n- **Stability:** Not applicable, as this is a pattern matching algorithm rather than a sorting algorithm."
  },
  {
    title: "11. Edge Cases",
    content: "- `M > N`: The pattern is longer than the text. Handled gracefully; `Z[i]` will never reach `M` within the text segment.\n- `M == 0`: Empty pattern. Depends on implementation (usually returns all indices or index 0, handled as a pre-check).\n- Text and Pattern contain overlapping valid matches. Handled naturally as the algorithm evaluates each starting position independently."
  },
  {
    title: "12. Applications",
    content: "- String matching / Substring search in text editors and search engines.\n- Detecting periodic properties or repeating substrings within a string.\n- Bio-informatics (e.g., DNA sequence matching)."
  },
  {
    title: "13. Common Mistakes",
    content: "- Forgetting the separator character (e.g., `$`), causing matches to falsely bleed across the boundary between pattern and text.\n- Incorrectly updating the `[L, R]` window indices (off-by-one errors during `R++` or `R--`).\n- Confusing the condition `Z[k] < R - i + 1` with `Z[k] <= R - i + 1`."
  },
  {
    title: "14. Related Algorithms",
    content: "- **KMP (Knuth-Morris-Pratt):** Both have `O(N + M)` time, but KMP builds an LPS (Longest Prefix Suffix) array. Z-array computes the longest common prefix of a suffix and the string itself.\n- **Rabin-Karp:** Uses hashing to find matches in `O(N + M)` average time, but `O(N * M)` worst case.\n- **Boyer-Moore:** Scans characters right-to-left, offering sub-linear performance in best-case practical scenarios."
  },
  {
    title: "15. Interview Questions",
    content: "1. How does the `[L, R]` window guarantee that the Z Algorithm operates in `O(N)` time?\n2. What is the fundamental difference between KMP's LPS array and the Z-array?\n3. Why is a special character used to join the pattern and the text?\n4. Can the space complexity of the Z Algorithm be improved to `O(M)` instead of `O(N + M)`? (Yes, by keeping only a window of the Z-array for the text and evaluating text on-the-fly)."
  },
  {
    title: "16. Summary",
    content: "The Z Algorithm is an elegant, linear-time string searching algorithm. By creating a concatenated string and carefully computing the Z-array using previously computed values and the `[L, R]` window, it eliminates redundant comparisons. It runs in guaranteed `O(N + M)` time and offers a more straightforward prefix-matching concept compared to KMP."
  }
];

export const stringZMcqs = [
  {
    question: "Which edge case is most likely to cause a failure in a naive implementation of String Z? **GATE 2016**",
    options: [
      "Empty input",
      "Extremely large inputs",
      "Negative numbers",
      "All of the above"
    ],
    correctAnswerIndex: 1,
    explanation: "Robust implementations of String Z must handle boundary conditions."
  },
  {
    question: "Which data structure is fundamentally incompatible with an efficient String Z? **GATE 2009**",
    options: [
      "Stack",
      "Set",
      "Depends on implementation details",
      "Queue"
    ],
    correctAnswerIndex: 0,
    explanation: "Data structure choice dictates efficiency."
  },
  {
    question: "Which of the following best describes the worst-case time complexity of String Z? **GATE 2016**",
    options: [
      "O(N log N)",
      "O(N)",
      "O(N^2)",
      "It depends on the input structure."
    ],
    correctAnswerIndex: 1,
    explanation: "The time complexity is a fundamental property of String Z."
  },
  {
    question: "What happens to String Z if the input is already sorted (best-case)? **GATE 2020**",
    options: [
      "Behavior remains unchanged.",
      "It degrades to worst-case.",
      "It performs optimally.",
      "It achieves its theoretical lower bound."
    ],
    correctAnswerIndex: 1,
    explanation: "Input permutations can heavily affect String Z."
  },
  {
    question: "If the input size for String Z is doubled, how does the execution time scale approximately in the average case? **GATE 2021**",
    options: [
      "It remains constant",
      "It quadruples",
      "It increases by a constant factor",
      "It doubles"
    ],
    correctAnswerIndex: 0,
    explanation: "Scalability is determined by the asymptotic bounds of String Z."
  },
  {
    question: "Which real-world scenario best models the problem solved by String Z? **GATE 2013**",
    options: [
      "Resource allocation",
      "Sorting data",
      "Finding shortest paths",
      "Pattern matching"
    ],
    correctAnswerIndex: 0,
    explanation: "Theoretical algorithms are abstractions of real-world problems."
  },
  {
    question: "In a standard implementation of String Z, what is the auxiliary space complexity? **GATE 2017**",
    options: [
      "O(N)",
      "O(1)",
      "O(log N)",
      "O(N^2)"
    ],
    correctAnswerIndex: 0,
    explanation: "Space complexity varies depending on whether it is an in-place algorithm or requires extra data structures."
  },
  {
    question: "In a distributed computing environment, how easily can String Z be parallelized? **GATE 2021**",
    options: [
      "Easily, it is embarrassingly parallel.",
      "Difficult, highly sequential.",
      "Impossible.",
      "Moderately, requires synchronization."
    ],
    correctAnswerIndex: 0,
    explanation: "Parallelizing String Z depends on data dependencies."
  },
  {
    question: "How does String Z behave under memory-constrained environments? **GATE 2017**",
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
    question: "If String Z is implemented iteratively instead of recursively, what is the most likely impact? **GATE 2010**",
    options: [
      "No impact",
      "Reduced stack space overhead",
      "Increased time complexity",
      "Decreased time complexity"
    ],
    correctAnswerIndex: 2,
    explanation: "Iterative implementations generally save function call overhead."
  },
  {
    question: "What is the primary trade-off when optimizing String Z? **GATE 2019**",
    options: [
      "Complexity vs. Readability",
      "Accuracy vs. Speed",
      "Time vs. Space",
      "None"
    ],
    correctAnswerIndex: 0,
    explanation: "Optimization often requires sacrificing memory for speed in String Z."
  },
  {
    question: "If String Z uses a heuristic, what does that imply about its solution? **GATE 2020**",
    options: [
      "It is approximate but fast.",
      "It is exact but slow.",
      "It is always optimal.",
      "It uses randomness."
    ],
    correctAnswerIndex: 0,
    explanation: "Heuristics speed up String Z at the cost of guaranteed optimality."
  },
  {
    question: "Which recurrence relation best models the recursive behavior of String Z (if it is recursive)? **GATE 2017**",
    options: [
      "T(n) = T(n/2) + O(1)",
      "Depends on the specific variant",
      "T(n) = T(n-1) + O(1)",
      "T(n) = 2T(n/2) + O(n)"
    ],
    correctAnswerIndex: 0,
    explanation: "Recurrence relations are used to analyze recursive algorithms."
  },
  {
    question: "Which of the following is a direct application of String Z? **GATE 2006**",
    options: [
      "Cryptographic hashing",
      "Database indexing",
      "All of the above",
      "Network routing"
    ],
    correctAnswerIndex: 3,
    explanation: "String Z has widespread applications across computer science domains."
  },
  {
    question: "In the context of String Z, what does the term 'optimal substructure' imply if applicable? **GATE 2016**",
    options: [
      "The algorithm uses optimal memory.",
      "The solution is always optimal.",
      "It runs in linear time.",
      "The problem can be broken down into smaller, similar subproblems."
    ],
    correctAnswerIndex: 2,
    explanation: "Optimal substructure is a key property for many advanced algorithms like String Z."
  }
];

export const stringZDebug = {
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

export const stringZDrag = {
  title: "Z Algorithm Steps",
  description: "Drag and drop the steps to correctly build the Z-array and perform pattern matching.",
  items: [
    { id: "step1", text: "Create a concatenated string: S = Pattern + '$' + Text." },
    { id: "step2", text: "Initialize L = 0, R = 0 to represent the boundaries of the rightmost match." },
    { id: "step3", text: "Iterate from i = 1 to length(S) - 1." },
    { id: "step4", text: "If i > R, explicitly match characters from S[i] and S[0] to find Z[i]." },
    { id: "step5", text: "If i <= R, use Z[i - L] to optimize, extending R only if necessary." },
    { id: "step6", text: "Check if Z[i] equals the pattern length to find matches." }
  ]
};

export const stringZComplete = {
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
