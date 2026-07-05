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
    question: "What is the time complexity of the Z algorithm to find a pattern of length M in a text of length N?",
    options: [
      "O(N)",
      "O(M)",
      "O(N * M)",
      "O(N + M)"
    ],
    correctAnswerIndex: 3,
    explanation: "The Z algorithm computes the Z-array for the concatenated string of length N + M, processing each character linearly and bounded by the rightmost match index R. Hence, time complexity is O(N + M)."
  },
  {
    question: "What is the primary purpose of inserting a special character (like '$') between the pattern and the text in the Z algorithm?",
    options: [
      "To distinguish the start of the string.",
      "To prevent matches from falsely continuing past the boundary of the pattern into the text.",
      "To reduce the space complexity.",
      "To avoid integer overflow in the Z-array."
    ],
    correctAnswerIndex: 1,
    explanation: "The special character acts as a separator ensuring that a matching prefix cannot exceed the length of the pattern, thus cleanly identifying exact pattern occurrences."
  },
  {
    question: "Let Z be the Z-array for the string S = P + '$' + T. If Z[i] = M (where M is the length of pattern P), where does the match start in the original text T? (Assume 0-indexed text)",
    options: [
      "i - M",
      "i - M - 1",
      "i + M",
      "i"
    ],
    correctAnswerIndex: 1,
    explanation: "The index `i` is in the concatenated string. The text starts after pattern and '$', so we subtract pattern length M and 1 (for '$') to get the index in T: i - M - 1."
  },
  {
    question: "Consider the Z-array construction for a string S. Which of the following defines the value Z[i]?",
    options: [
      "The length of the longest prefix of S that is also a suffix of S[0...i].",
      "The length of the longest substring starting at S[i] that is also a prefix of S.",
      "The length of the longest palindrome starting at i.",
      "The number of matching characters between S[i...N] and T[i...N]."
    ],
    correctAnswerIndex: 1,
    explanation: "By definition, Z[i] stores the length of the longest substring starting from S[i] which is identical to the prefix of the string S."
  },
  {
    question: "In the Z algorithm, if i <= R and Z[k] < R - i + 1 (where k = i - L), what is the value of Z[i] assigned?",
    options: [
      "R - i + 1",
      "Z[k]",
      "Z[i - L] + 1",
      "0"
    ],
    correctAnswerIndex: 1,
    explanation: "When Z[k] is strictly less than the remaining matched segment R - i + 1, it means the prefix match starting at i definitively ends before R. Thus, Z[i] is exactly Z[k]."
  },
  {
    question: "In the worst case, how many character comparisons does the Z algorithm make across the entire concatenated string S of length K?",
    options: [
      "Exactly K comparisons",
      "At most 2K comparisons",
      "At most K^2 / 2 comparisons",
      "O(K log K) comparisons"
    ],
    correctAnswerIndex: 1,
    explanation: "Every character comparison either results in a mismatch or extends R. Since R can be extended at most K times and mismatches are bounded, the number of character comparisons is at most 2K, ensuring linear time."
  },
  {
    question: "If S = 'aabcaabxaaaz', what is the value of Z[4]?",
    options: [
      "1",
      "2",
      "3",
      "4"
    ],
    correctAnswerIndex: 2,
    explanation: "Index 4 is 'a' (the substring is 'aabxaaaz'). The prefix of S is 'aabc...'. Matching 'aab' with 'aab' gives a length of 3."
  },
  {
    question: "Which of the following is true comparing KMP and the Z algorithm?",
    options: [
      "KMP uses O(N) space, while Z algorithm requires O(M) space.",
      "KMP builds an array of longest prefix suffixes, whereas Z algorithm builds an array of longest prefixes.",
      "Z algorithm handles multiple pattern searches faster than KMP.",
      "KMP has an O(N) time complexity, whereas Z algorithm is O(N^2)."
    ],
    correctAnswerIndex: 1,
    explanation: "KMP relies on the LPS (Longest Prefix Suffix) array to shift the pattern, while Z algorithm computes lengths of substrings matching the prefix directly."
  },
  {
    question: "What happens in the Z algorithm if i <= R and Z[i - L] >= R - i + 1?",
    options: [
      "Z[i] is directly set to Z[i - L].",
      "L and R remain unchanged, and Z[i] is set to R - i + 1.",
      "L is updated to i, and R is expanded through explicit character matching.",
      "The algorithm terminates because a full match is found."
    ],
    correctAnswerIndex: 2,
    explanation: "If Z[i - L] exceeds or meets the boundary, we know at least R - i + 1 characters match. We must explicitly match characters starting from R+1, and update L to i and R to the new boundary."
  },
  {
    question: "What is the worst-case space complexity of the standard Z algorithm?",
    options: [
      "O(1)",
      "O(M)",
      "O(N)",
      "O(N + M)"
    ],
    correctAnswerIndex: 3,
    explanation: "The standard algorithm creates a concatenated string of length N + M + 1 and an array Z of the same size, resulting in O(N + M) space."
  },
  {
    question: "If the pattern P is not found in the text T, what is the maximum value in the Z-array for any index corresponding to the text segment?",
    options: [
      "M",
      "M - 1",
      "N",
      "0"
    ],
    correctAnswerIndex: 1,
    explanation: "If P is not present, no match of length M exists. Thus, the longest match in the text segment can be at most M - 1."
  },
  {
    question: "Can the space complexity of the Z Algorithm be optimized to O(M) instead of O(N + M) for finding pattern matches?",
    options: [
      "No, the Z-array fundamentally requires O(N + M) space.",
      "Yes, by only storing the Z-values of the pattern and evaluating text characters on-the-fly dynamically.",
      "Yes, by discarding the text completely after the first pass.",
      "No, because the L and R pointers require O(N) space."
    ],
    correctAnswerIndex: 1,
    explanation: "Yes, you can precompute the Z-array for the pattern, and then stream the text characters using the L and R window, retaining only the state required to map back to the pattern's Z-array, reducing auxiliary space to O(M)."
  }
];

export const stringZDebug = {
  instructions: "Fix the syntax error so the code compiles correctly.",
  buggyC: "#include <stdio.h>\n\nint main() {\n    printf(\"Hello World\")\n    return 0;\n}",
  fixedC: "#include <stdio.h>\n\nint main() {\n    printf(\"Hello World\\n\");\n    return 0;\n}",
  buggyJava: "public class Main {\n    public static void main(String[] args) {\n        System.out.printl(\"Hello World\");\n    }\n}",
  fixedJava: "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello World\");\n    }\n}",
  hints: ["Check the print statement.","Missing semicolon or wrong spelling?","Fix it!"],
  expectedOutput: "Hello World"
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
  title: "Complete the Z-Array Calculation",
  description: "Fill in the missing expressions to complete the `getZarr` function.",
  code: `void getZarr(string str, int Z[]) {
    int n = str.length();
    int L = 0, R = 0;
    for (int i = 1; i < n; ++i) {
        if (i > R) {
            L = R = i;
            while (R < n && str[R - L] == str[R])
                // 1. Advance the Right pointer
                BLANK_1;
            Z[i] = R - L;
            R--;
        } else {
            int k = i - L;
            if (Z[k] < R - i + 1)
                // 2. Assign the previously computed Z-value
                Z[i] = BLANK_2;
            else {
                L = i;
                while (R < n && str[R - L] == str[R])
                    // 3. Advance the Right pointer explicitly
                    BLANK_3;
                Z[i] = R - L;
                R--;
            }
        }
    }
}`,
  blanks: [
    {
      id: "BLANK_1",
      answer: "R++",
      options: ["R++", "L++", "i++", "R--"]
    },
    {
      id: "BLANK_2",
      answer: "Z[k]",
      options: ["Z[i]", "Z[k]", "R - i + 1", "Z[i - R]"]
    },
    {
      id: "BLANK_3",
      answer: "R++",
      options: ["L++", "R++", "i++", "R--"]
    }
  ]
};
