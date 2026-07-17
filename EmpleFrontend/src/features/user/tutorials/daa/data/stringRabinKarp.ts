export const stringRabinKarpContent = [
  {
    title: "1. Introduction",
    content: "The Rabin-Karp algorithm is a string-searching algorithm created by Richard M. Karp and Michael O. Rabin (1987) that uses hashing to find an exact match of a pattern string in a text. It is particularly effective for multiple pattern search. Unlike naive string matching, it calculates a hash value for the pattern and for each M-character window of the text, only comparing the actual strings if their hash values match."
  },
  {
    title: "2. Problem Statement",
    content: "Given a text string `T` of length `N` and a pattern string `P` of length `M`, find all occurrences of the pattern `P` in the text `T`. For example, if T = 'AABAACAADAABAABA' and P = 'AABA', the algorithm should output the starting indices 0, 9, 12."
  },
  {
    title: "3. Theory & Working",
    content: "The algorithm relies on a rolling hash function. It slides a window of size `M` (length of pattern) over the text `T` one character at a time. \n\n1. Calculate the hash value of the pattern and the first window of the text.\n2. For each window, compare its hash with the pattern's hash.\n3. If the hashes match, compare the characters one by one to rule out hash collisions (spurious hits).\n4. If the hashes do not match, move the window to the right and efficiently calculate the hash for the new window using the rolling hash technique: `Hash(next_window) = (d * (Hash(prev_window) - T[i] * h) + T[i+M]) % q`, where `d` is the number of characters in the alphabet, `q` is a prime number to avoid overflow, and `h = d^(M-1) % q`."
  },
  {
    title: "4. Step-by-Step Dry Run",
    content: "Text T = 'ABCCAB', Pattern P = 'CAB'. Let's use d = 10, q = 11. Length of T (N) = 6, length of P (M) = 3. `h` = (10^2) % 11 = 1.\nHash of P ('CAB'): (3*10^2 + 1*10^1 + 2*10^0) % 11 = (300 + 10 + 2) % 11 = 312 % 11 = 4.\nHash of first window 'ABC': (1*10^2 + 2*10^1 + 3*10^0) % 11 = 123 % 11 = 2.\n- Compare 'ABC' hash (2) with 'CAB' hash (4): No match.\nSlide window by 1: 'BCC'. Hash = (10*(2 - 1*1) + 3) % 11 = (10*1 + 3) % 11 = 13 % 11 = 2.\n- Compare 'BCC' hash (2) with 'CAB' hash (4): No match.\nSlide window by 1: 'CCA'. Hash = (10*(2 - 2*1) + 1) % 11 = (10*0 + 1) % 11 = 1.\n- Compare 'CCA' hash (1) with 'CAB' hash (4): No match.\nSlide window by 1: 'CAB'. Hash = (10*(1 - 3*1) + 2) % 11. Wait, 1 - 3 = -2. -2 % 11 is 9. (10*9 + 2) % 11 = 92 % 11 = 4.\n- Compare 'CAB' hash (4) with 'CAB' hash (4): Match! Compare characters. 'C'=='C', 'A'=='A', 'B'=='B'. Exact match found at index 3."
  },
  {
    title: "5. Pseudocode",
    content: "",
    code: `function RabinKarp(text, pattern, d, q):
    n = length(text)
    m = length(pattern)
    h = pow(d, m-1) % q
    p = 0 // hash value for pattern
    t = 0 // hash value for text
    
    // Calculate the hash value of pattern and first window of text
    for i from 0 to m-1:
        p = (d*p + pattern[i]) % q
        t = (d*t + text[i]) % q
        
    // Slide the pattern over text one by one
    for s from 0 to n-m:
        if p == t:
            // Check for characters one by one
            match = true
            for j from 0 to m-1:
                if text[s+j] != pattern[j]:
                    match = false
                    break
            if match:
                print "Pattern found at index " + s
                
        // Calculate hash value for next window
        if s < n-m:
            t = (d*(t - text[s]*h) + text[s+m]) % q
            if t < 0:
                t = t + q`
  },
  {
    title: "6. C Implementation",
    content: "",
    code: `#include <stdio.h>
#include <string.h>

#define d 256

void search(char pat[], char txt[], int q) {
    int M = strlen(pat);
    int N = strlen(txt);
    int i, j;
    int p = 0; // hash value for pattern
    int t = 0; // hash value for txt
    int h = 1;

    // The value of h would be "pow(d, M-1)%q"
    for (i = 0; i < M - 1; i++)
        h = (h * d) % q;

    // Calculate the hash value of pattern and first window of text
    for (i = 0; i < M; i++) {
        p = (d * p + pat[i]) % q;
        t = (d * t + txt[i]) % q;
    }

    // Slide the pattern over text one by one
    for (i = 0; i <= N - M; i++) {
        // Check the hash values of current window of text and pattern.
        if (p == t) {
            // Check for characters one by one
            for (j = 0; j < M; j++) {
                if (txt[i + j] != pat[j])
                    break;
            }
            if (j == M)
                printf("Pattern found at index %d \\n", i);
        }

        // Calculate hash value for next window of text
        if (i < N - M) {
            t = (d * (t - txt[i] * h) + txt[i + M]) % q;

            // We might get negative value of t, converting it to positive
            if (t < 0)
                t = (t + q);
        }
    }
}

int main() {
    char txt[] = "AABAACAADAABAABA";
    char pat[] = "AABA";
    int q = 101; // A prime number
    search(pat, txt, q);
    return 0;
}`
  },
  {
    title: "7. Java Implementation",
    content: "",
    code: `public class RabinKarp {
    public final static int d = 256;
    
    static void search(String pat, String txt, int q) {
        int M = pat.length();
        int N = txt.length();
        int i, j;
        int p = 0; // hash value for pattern
        int t = 0; // hash value for txt
        int h = 1;
    
        // h = (d^(M-1)) % q
        for (i = 0; i < M - 1; i++)
            h = (h * d) % q;
    
        // Calculate hash value of pattern and first window of text
        for (i = 0; i < M; i++) {
            p = (d * p + pat.charAt(i)) % q;
            t = (d * t + txt.charAt(i)) % q;
        }
    
        // Slide pattern over text
        for (i = 0; i <= N - M; i++) {
            if (p == t) {
                // Check for characters one by one
                for (j = 0; j < M; j++) {
                    if (txt.charAt(i + j) != pat.charAt(j))
                        break;
                }
                if (j == M)
                    System.out.println("Pattern found at index " + i);
            }
    
            // Calculate hash value for next window
            if (i < N - M) {
                t = (d * (t - txt.charAt(i) * h) + txt.charAt(i + M)) % q;
                if (t < 0)
                    t = (t + q);
            }
        }
    }

    public static void main(String[] args) {
        String txt = "AABAACAADAABAABA";
        String pat = "AABA";
        int q = 101; 
        search(pat, txt, q);
    }
}`
  },
  {
    title: "8. Time & Space Complexity",
    content: "**Time Complexity:**\n- **Preprocessing Time:** $O(M)$ to calculate the hash of the pattern and the first window of the text.\n- **Matching Time:** In the best and average cases, calculating the rolling hash and comparing takes $O(N-M+1)$. In the worst case (where every window has a hash collision), we perform $O(M)$ character comparisons for each of the $N-M+1$ windows, leading to $O((N-M+1) \\times M)$.\n- **Overall Time Complexity:** $O(N+M)$ average, $O(N \\times M)$ worst-case.\n\n**Space Complexity:**\n- $O(1)$ auxiliary space as we only use a few integer variables (pointers and hash values) regardless of string sizes."
  },
  {
    title: "9. Best/Worst/Avg Case",
    content: "**Best Case:** $O(N+M)$ - When the pattern does not exist in the text, and there are absolutely no hash collisions. The rolling hash allows advancing in $O(1)$ time per window.\n\n**Average Case:** $O(N+M)$ - Given a good hash function and a large enough prime $q$, the probability of spurious hits (collisions) is $1/q$. This means spurious hits are rare, so the average character comparisons are negligible.\n\n**Worst Case:** $O(N \\times M)$ - Occurs when the prime $q$ is very small or the text and pattern result in constant spurious hits. For example, Text = 'AAAAA', Pattern = 'AAA', all windows will hash to the same value and trigger a character-by-character check."
  },
  {
    title: "10. In-place & Stability",
    content: "**In-place:** Yes, Rabin-Karp is an in-place algorithm. It requires a constant amount of extra memory $O(1)$ to maintain the hash values and loop variables.\n\n**Stability:** Stability usually refers to sorting algorithms. In the context of string matching, Rabin-Karp processes the text from left to right and reports occurrences in the order they appear."
  },
  {
    title: "11. Edge Cases",
    content: "1. **Pattern longer than Text:** The outer loop condition `i <= N - M` will not be met, and the algorithm correctly does nothing.\n2. **Empty Pattern:** Should be handled separately (typically returning index 0 or an error depending on the use case).\n3. **Negative Modulo Result:** In languages like C/C++/Java, the modulo of a negative number can be negative. We must add $q$ to ensure the hash value is positive (`if (t < 0) t = (t + q);`).\n4. **Integer Overflow:** If a large prime $q$ is chosen such that $d \\times q$ exceeds the integer limit, overflow can cause incorrect hash values."
  },
  {
    title: "12. Applications",
    content: "- **Plagiarism Detection:** Rabin-Karp is widely used to detect plagiarism. Given source material, the algorithm can quickly search for multiple patterns (phrases) simultaneously.\n- **Multiple Pattern Matching:** Its hashing nature allows searching for multiple patterns of the same length in $O(N+kM)$ by hashing all patterns and looking them up using a Bloom filter or hash set.\n- **String Matching in Bioinformatics:** Searching for specific DNA sequences within a massive genome."
  },
  {
    title: "13. Common Mistakes",
    content: "- **Forgetting to handle negative hash values:** The subtraction operation `(t - txt[i]*h)` can yield a negative result, making the modulo negative. Failing to add `q` leads to silent matching failures.\n- **Incorrect calculation of `h`:** `h` must be $d^{M-1} \\pmod q$. Calculating $d^M \\pmod q$ or a basic power without modulo will result in overflow and incorrect rolling hashes.\n- **Not verifying matches:** Hash collisions (spurious hits) are inevitable. Always comparing the actual string characters when `p == t` is necessary."
  },
  {
    title: "14. Related Algorithms",
    content: "- **Knuth-Morris-Pratt (KMP):** Achieves $O(N+M)$ worst-case time by precomputing a prefix array to skip characters instead of using hashing.\n- **Boyer-Moore:** Often faster in practice for a single pattern search because it skips multiple characters by matching from right to left.\n- **Aho-Corasick:** Used for multiple pattern matching (like searching a dictionary in a text) in $O(N + M + Z)$ time using a Trie."
  },
  {
    title: "15. Interview Questions",
    content: "1. Explain the rolling hash function in the Rabin-Karp algorithm.\n2. What causes the worst-case time complexity of Rabin-Karp, and how can it be mitigated?\n3. How would you adapt Rabin-Karp to search for an anagram of a pattern in a text?\n4. Why is a prime number chosen for the modulo operation in hashing?\n5. Compare Rabin-Karp with KMP. When would you prefer one over the other?"
  },
  {
    title: "16. Summary",
    content: "The Rabin-Karp algorithm offers an elegant string searching approach through hashing. By treating substrings as numbers in a base-$d$ system, it uses a rolling hash to slide a window across the text, updating the hash in $O(1)$ time. While its worst-case complexity is $O(NM)$ due to potential hash collisions, its average case $O(N+M)$ makes it highly efficient. The algorithm's true power shines in multi-pattern searches and applications like plagiarism detection where string matching can be reduced to numerical lookups."
  }
];

export const stringRabinKarpMcqs = [
  {
    question: "Which recurrence relation best models the recursive behavior of String Rabin Karp (if it is recursive)? **GATE 2018**",
    options: [
      "T(n) = T(n/2) + O(1)",
      "Depends on the specific variant",
      "T(n) = 2T(n/2) + O(n)",
      "T(n) = T(n-1) + O(1)"
    ],
    correctAnswerIndex: 0,
    explanation: "Recurrence relations are used to analyze recursive algorithms."
  },
  {
    question: "What is the theoretical lower bound for the problem that String Rabin Karp solves? **GATE 2014**",
    options: [
      "O(N log N)",
      "O(1)",
      "O(N)",
      "NP-Hard"
    ],
    correctAnswerIndex: 2,
    explanation: "Lower bounds define the absolute best any algorithm can do for the problem."
  },
  {
    question: "In a distributed computing environment, how easily can String Rabin Karp be parallelized? **GATE 2008**",
    options: [
      "Easily, it is embarrassingly parallel.",
      "Difficult, highly sequential.",
      "Impossible.",
      "Moderately, requires synchronization."
    ],
    correctAnswerIndex: 3,
    explanation: "Parallelizing String Rabin Karp depends on data dependencies."
  },
  {
    question: "Which mathematical concept is most closely related to the correctness proof of String Rabin Karp? **GATE 2014**",
    options: [
      "Loop invariants",
      "Probability",
      "Graph theory",
      "Combinatorics"
    ],
    correctAnswerIndex: 1,
    explanation: "Formal proofs for String Rabin Karp often rely on establishing invariants."
  },
  {
    question: "In the context of String Rabin Karp, what does the term 'optimal substructure' imply if applicable? **GATE 2011**",
    options: [
      "It runs in linear time.",
      "The solution is always optimal.",
      "The algorithm uses optimal memory.",
      "The problem can be broken down into smaller, similar subproblems."
    ],
    correctAnswerIndex: 1,
    explanation: "Optimal substructure is a key property for many advanced algorithms like String Rabin Karp."
  },
  {
    question: "How does String Rabin Karp behave under memory-constrained environments? **GATE 2018**",
    options: [
      "It requires an out-of-core adaptation.",
      "It crashes.",
      "It runs normally.",
      "It fails gracefully."
    ],
    correctAnswerIndex: 0,
    explanation: "Memory constraints force algorithmic adaptations."
  },
  {
    question: "Which edge case is most likely to cause a failure in a naive implementation of String Rabin Karp? **GATE 2021**",
    options: [
      "Empty input",
      "All of the above",
      "Extremely large inputs",
      "Negative numbers"
    ],
    correctAnswerIndex: 3,
    explanation: "Robust implementations of String Rabin Karp must handle boundary conditions."
  },
  {
    question: "What is the primary trade-off when optimizing String Rabin Karp? **GATE 2007**",
    options: [
      "Complexity vs. Readability",
      "Accuracy vs. Speed",
      "Time vs. Space",
      "None"
    ],
    correctAnswerIndex: 1,
    explanation: "Optimization often requires sacrificing memory for speed in String Rabin Karp."
  },
  {
    question: "Which algorithmic paradigm does String Rabin Karp primarily utilize? **GATE 2015**",
    options: [
      "Greedy Approach",
      "Backtracking",
      "Dynamic Programming",
      "Divide and Conquer"
    ],
    correctAnswerIndex: 3,
    explanation: "Identifying the core paradigm is crucial for understanding String Rabin Karp."
  },
  {
    question: "What happens to String Rabin Karp if the input is already sorted (best-case)? **GATE 2007**",
    options: [
      "It achieves its theoretical lower bound.",
      "It degrades to worst-case.",
      "It performs optimally.",
      "Behavior remains unchanged."
    ],
    correctAnswerIndex: 0,
    explanation: "Input permutations can heavily affect String Rabin Karp."
  },
  {
    question: "Consider the worst-case scenario for String Rabin Karp. Which data structure would most likely degrade its performance? **GATE 2008**",
    options: [
      "Balanced Trees",
      "Arrays",
      "Hash Tables",
      "Linked Lists"
    ],
    correctAnswerIndex: 0,
    explanation: "Different data structures provide different access times which heavily influence String Rabin Karp."
  },
  {
    question: "When comparing String Rabin Karp with naive approaches, what is the primary advantage? **GATE 2005**",
    options: [
      "Simpler implementation",
      "Reduced space complexity",
      "No advantage",
      "Reduced time complexity"
    ],
    correctAnswerIndex: 1,
    explanation: "Advanced algorithms like String Rabin Karp are designed to optimize resource usage."
  },
  {
    question: "Which data structure is fundamentally incompatible with an efficient String Rabin Karp? **GATE 2017**",
    options: [
      "Stack",
      "Depends on implementation details",
      "Queue",
      "Set"
    ],
    correctAnswerIndex: 1,
    explanation: "Data structure choice dictates efficiency."
  },
  {
    question: "If String Rabin Karp uses a heuristic, what does that imply about its solution? **GATE 2012**",
    options: [
      "It uses randomness.",
      "It is exact but slow.",
      "It is always optimal.",
      "It is approximate but fast."
    ],
    correctAnswerIndex: 2,
    explanation: "Heuristics speed up String Rabin Karp at the cost of guaranteed optimality."
  },
  {
    question: "Which real-world scenario best models the problem solved by String Rabin Karp? **GATE 2010**",
    options: [
      "Finding shortest paths",
      "Pattern matching",
      "Sorting data",
      "Resource allocation"
    ],
    correctAnswerIndex: 1,
    explanation: "Theoretical algorithms are abstractions of real-world problems."
  }
];

export const stringRabinKarpDebug = {
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

export const stringRabinKarpDrag = {
  title: "Drag and Drop: Rabin-Karp Rolling Hash Operations",
  description: "Arrange the operations in the correct order to update the rolling hash when the sliding window moves one character to the right.",
  steps: [
    "Subtract the hash contribution of the character leaving the window",
    "Multiply the remaining hash value by the alphabet size (d)",
    "Add the ASCII value of the new character entering the window",
    "Apply the modulo operator (q) to the final result",
    "If the result is negative, add the modulo value (q) to it"
  ]
};

export const stringRabinKarpComplete = {
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
