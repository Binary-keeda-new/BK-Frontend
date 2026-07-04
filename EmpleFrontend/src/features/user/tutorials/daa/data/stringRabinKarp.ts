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
    question: "What is the worst-case time complexity of the Rabin-Karp string matching algorithm for a text of length N and pattern of length M?",
    options: ["O(N + M)", "O(N log M)", "O(N * M)", "O(M^2)"],
    correctAnswer: 2,
    explanation: "The worst-case occurs when every text window produces a hash collision with the pattern's hash (spurious hits). The algorithm then has to perform M character comparisons for each of the (N-M+1) windows, leading to an O(N * M) time complexity."
  },
  {
    question: "In the Rabin-Karp algorithm, spurious hits occur when:",
    options: ["The pattern is a substring of the text", "The hash value of a text window matches the pattern's hash, but the actual strings are different", "The rolling hash calculation yields a negative value", "The chosen prime number q is larger than the alphabet size"],
    correctAnswer: 1,
    explanation: "A spurious hit is a hash collision where the hash of a substring of length M matches the hash of the pattern, but the characters do not match."
  },
  {
    question: "Which mathematical property primarily allows the hash function in Rabin-Karp to update in O(1) time when the window shifts?",
    options: ["Fermat's Little Theorem", "Modular arithmetic properties (addition and subtraction)", "Chinese Remainder Theorem", "Euclidean Algorithm"],
    correctAnswer: 1,
    explanation: "The rolling hash updates in O(1) time by subtracting the contribution of the character leaving the window, multiplying by the base, adding the new character, and taking the modulo. This relies on basic modular arithmetic properties."
  },
  {
    question: "Let T = '31415' and P = '26'. Let the base d = 10 and prime q = 11. What is the hash value of the pattern P?",
    options: ["2", "4", "6", "8"],
    correctAnswer: 1,
    explanation: "Hash(P) = (2 * 10^1 + 6 * 10^0) % 11 = (20 + 6) % 11 = 26 % 11 = 4."
  },
  {
    question: "Consider a text T and pattern P. The prime q is chosen to avoid overflow. If we choose a very small prime q (e.g., q=2), what will be the effect on the algorithm's performance?",
    options: ["It will run in O(N+M) time consistently.", "It will fail to find some matches.", "It will cause an excessive number of spurious hits, degrading performance to O(N*M).", "It will cause an arithmetic overflow."],
    correctAnswer: 2,
    explanation: "A very small prime q will result in very few possible hash values (only 0 and 1 if q=2). This will cause almost every window to have a hash collision, leading to constant character comparisons and O(N*M) worst-case time."
  },
  {
    question: "How is the value 'h' computed in the preprocessing phase of Rabin-Karp, where 'd' is the alphabet size and 'M' is pattern length?",
    options: ["h = (d^M) % q", "h = (d^(M-1)) % q", "h = (d * M) % q", "h = (d / M) % q"],
    correctAnswer: 1,
    explanation: "The value 'h' is the multiplier for the most significant digit in the window of length M. It is calculated as d^(M-1) modulo q."
  },
  {
    question: "For a text window hash 't', leaving character 'T[i]', new character 'T[i+M]', base 'd', and multiplier 'h', which formula correctly updates the rolling hash for the next window?",
    options: ["t = (d * (t + T[i] * h) - T[i+M]) % q", "t = (d * (t - T[i] * h) + T[i+M]) % q", "t = (d * t - T[i] * h + T[i+M]) % q", "t = (t - T[i] * h + d * T[i+M]) % q"],
    correctAnswer: 1,
    explanation: "The correct rolling hash formula removes the leftmost character (T[i] * h), shifts the remaining characters left by multiplying by d, and adds the new character T[i+M], all modulo q."
  },
  {
    question: "Why is an explicit check like `if (t < 0) t = (t + q);` necessary during the rolling hash calculation in languages like C/C++ or Java?",
    options: ["To prevent buffer overflow in arrays.", "Because the pattern might be lexicographically smaller than the text.", "Because the modulo operator (%) on a negative number can yield a negative result.", "Because the ASCII value of the characters might be negative."],
    correctAnswer: 2,
    explanation: "In C/C++ and Java, the % operator is the remainder operator, which can produce negative results if the dividend is negative. (t - txt[i]*h) can be negative, so we must add q to keep the hash strictly non-negative."
  },
  {
    question: "Which of the following string matching algorithms is best suited for searching multiple patterns of the same length simultaneously?",
    options: ["Knuth-Morris-Pratt", "Boyer-Moore", "Rabin-Karp", "Naive String Matching"],
    correctAnswer: 2,
    explanation: "Rabin-Karp is highly suited for multiple pattern search. By computing the hash of the text window and checking against a set (or Bloom filter) of pattern hashes, it can efficiently find multiple patterns."
  },
  {
    question: "What is the expected number of spurious hits when searching a text of length N with a pattern of length M using a prime number q for modulo?",
    options: ["O(N/q)", "O(M/q)", "O(N*M)", "O(1)"],
    correctAnswer: 0,
    explanation: "Assuming the hash function distributes values uniformly, the probability of a spurious hit for any given window is 1/q. There are N-M+1 windows, so the expected number of spurious hits is roughly O(N/q)."
  },
  {
    question: "If the pattern length M is greater than the text length N, what does the Rabin-Karp algorithm do?",
    options: ["It returns index 0", "It enters an infinite loop", "It throws an OutOfBounds exception", "It gracefully terminates without finding a match"],
    correctAnswer: 3,
    explanation: "The outer loop condition usually runs from 0 to N-M. If M > N, N-M is negative, and the loop does not execute, terminating the algorithm correctly."
  },
  {
    question: "Which of the following is an advantage of the Rabin-Karp algorithm over KMP (Knuth-Morris-Pratt)?",
    options: ["It has a better worst-case time complexity.", "It requires less preprocessing time for a single pattern.", "It easily extends to 2D pattern matching and multi-pattern matching.", "It uses less auxiliary space."],
    correctAnswer: 2,
    explanation: "While KMP guarantees O(N+M) worst-case time, Rabin-Karp's hashing approach extends very naturally to multi-pattern matching and 2D pattern matching (like finding a sub-grid in an image)."
  }
];

export const stringRabinKarpDebug = {
  instructions: "Fix the syntax error so the code compiles correctly.",
  buggyC: "#include <stdio.h>\n\nint main() {\n    printf(\"Hello World\")\n    return 0;\n}",
  fixedC: "#include <stdio.h>\n\nint main() {\n    printf(\"Hello World\\n\");\n    return 0;\n}",
  buggyJava: "public class Main {\n    public static void main(String[] args) {\n        System.out.printl(\"Hello World\");\n    }\n}",
  fixedJava: "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello World\");\n    }\n}",
  hints: ["Check the print statement.","Missing semicolon or wrong spelling?","Fix it!"],
  expectedOutput: "Hello World"
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
  title: "Complete the Code: Rabin-Karp Hash Update",
  code: `// Update the rolling hash for the next window
if (i < N - M) {
    t = (d * (t - txt[i] * /* BLANK 1 */) + txt[i + M]) % /* BLANK 2 */;
    
    // Convert negative hash back to positive
    if (t < 0) {
        t = t + /* BLANK 3 */;
    }
}`,
  blanks: [
    { id: 1, answer: "h" },
    { id: 2, answer: "q" },
    { id: 3, answer: "q" }
  ]
};
