export const dpFibonacciContent = [
  {
    title: "1. Introduction",
    content: "The Fibonacci sequence is a classic mathematical series where each number is the sum of the two preceding ones, usually starting with 0 and 1. Computing the $N$-th Fibonacci number using a naive recursive approach leads to exponential time complexity due to the redundant calculation of overlapping subproblems. Dynamic Programming (DP) optimizes this by storing the results of subproblems, reducing the time complexity to linear."
  },
  {
    title: "2. Problem Statement",
    content: "Given an integer $N$, find the $N$-th Fibonacci number $F(N)$.\nThe sequence is defined mathematically as:\n$F(0) = 0$\n$F(1) = 1$\n$F(N) = F(N-1) + F(N-2)$ for $N > 1$."
  },
  {
    title: "3. Theory & Working",
    content: "The Fibonacci problem exhibits two key properties required for DP:\n1. **Optimal Substructure**: The solution to $F(N)$ can be constructed from solutions to $F(N-1)$ and $F(N-2)$.\n2. **Overlapping Subproblems**: The recursive tree evaluates the same Fibonacci numbers multiple times (e.g., $F(5)$ evaluates $F(3)$ twice). \n\nDynamic Programming provides two main strategies:\n- **Top-Down (Memoization)**: We solve the problem recursively but cache the result of each subproblem in an array or hash map. If a subproblem is encountered again, its cached value is returned.\n- **Bottom-Up (Tabulation)**: We iteratively compute the sequence from the base cases ($F(0)$ and $F(1)$) up to $N$, storing each result in an array.\n- **Space Optimization**: In tabulation, computing $F(N)$ only requires the last two values ($F(N-1)$ and $F(N-2)$). Thus, the entire array is unnecessary, and we can achieve $O(1)$ space using just two variables."
  },
  {
    title: "4. Step-by-Step Dry Run",
    content: "Let's trace the bottom-up space-optimized approach for $N=5$.\n\nBase variables: `prev2 = 0` ($F(0)$), `prev1 = 1` ($F(1)$)\n\nIterate $i$ from 2 to 5:\n- **i = 2**: `curr = prev1 + prev2` = 1 + 0 = 1. Update: `prev2 = 1`, `prev1 = 1`\n- **i = 3**: `curr = prev1 + prev2` = 1 + 1 = 2. Update: `prev2 = 1`, `prev1 = 2`\n- **i = 4**: `curr = prev1 + prev2` = 2 + 1 = 3. Update: `prev2 = 2`, `prev1 = 3`\n- **i = 5**: `curr = prev1 + prev2` = 3 + 2 = 5. Update: `prev2 = 3`, `prev1 = 5`\n\nResult is `prev1` (which is 5). $F(5) = 5$."
  },
  {
    title: "5. Pseudocode",
    content: "Space-Optimized Bottom-Up:\n```\nfunction fibonacci(n):\n    if n == 0 return 0\n    prev2 = 0\n    prev1 = 1\n    for i from 2 to n:\n        curr = prev1 + prev2\n        prev2 = prev1\n        prev1 = curr\n    return prev1\n```"
  },
  {
    title: "6. C Implementation",
    content: "Space-Optimized DP approach in C:\n```c\n#include <stdio.h>\n\nlong long fibonacci(int n) {\n    if (n == 0) return 0;\n    long long prev2 = 0;\n    long long prev1 = 1;\n    \n    for (int i = 2; i <= n; i++) {\n        long long curr = prev1 + prev2;\n        prev2 = prev1;\n        prev1 = curr;\n    }\n    return prev1;\n}\n\nint main() {\n    int n = 50;\n    printf(\"F(%d) = %lld\\n\", n, fibonacci(n));\n    return 0;\n}\n```"
  },
  {
    title: "7. Java Implementation",
    content: "Bottom-up tabulation with $O(N)$ space in Java:\n```java\npublic class Fibonacci {\n    public static long fib(int n) {\n        if (n == 0) return 0;\n        long[] dp = new long[n + 1];\n        dp[0] = 0;\n        dp[1] = 1;\n        \n        for (int i = 2; i <= n; i++) {\n            dp[i] = dp[i-1] + dp[i-2];\n        }\n        return dp[n];\n    }\n    \n    public static void main(String[] args) {\n        int n = 50;\n        System.out.println(\"F(\" + n + \") = \" + fib(n));\n    }\n}\n```"
  },
  {
    title: "8. Time & Space Complexity",
    content: "- **Time Complexity**: $O(N)$. We compute the $i$-th Fibonacci number exactly once for each $i$ from 2 to $N$.\n- **Space Complexity**: \n  - $O(N)$ for recursive Memoization (call stack + array) and Tabulation (DP array).\n  - $O(1)$ for the space-optimized iterative approach, as only two variables are maintained."
  },
  {
    title: "9. Best/Worst/Avg Case",
    content: "Since computing $F(N)$ strictly requires evaluating all preceding values linearly, the time complexity remains identical across all cases:\n- **Best, Worst, and Average Case Time Complexity**: $\\Theta(N)$."
  },
  {
    title: "10. In-place & Stability",
    content: "- **In-place**: The space-optimized dynamic programming approach is in-place ($O(1)$ auxiliary space).\n- **Stability**: Not applicable, as this is a mathematical computation algorithm, not a sorting algorithm."
  },
  {
    title: "11. Edge Cases",
    content: "- $N = 0$: Must be handled explicitly as loop bounds often assume $N \\geq 2$.\n- $N = 1$: Also an explicit base case in many formulations.\n- **Integer Overflow**: Fibonacci numbers grow exponentially (specifically, at the rate of the golden ratio $\\phi^N$). Standard 32-bit integers overflow at $F(47)$, and 64-bit integers overflow at $F(93)$. For larger $N$, BigInteger classes or arbitrary-precision arithmetic must be used."
  },
  {
    title: "12. Applications",
    content: "- **Combinatorial Problems**: Counting ways to tile a $2 \\times N$ board or climbing $N$ stairs (with steps of 1 or 2).\n- **Financial Modeling & Trading**: Fibonacci retracement levels in technical analysis.\n- **Algorithm Design**: Fibonacci heaps and Fibonacci search technique.\n- **Nature & Architecture**: Modeling population growth and proportions."
  },
  {
    title: "13. Common Mistakes",
    content: "- Failing to consider integer overflow for $N > 46$ (with 32-bit signed integers).\n- Unnecessary $O(N)$ space allocation when only $O(1)$ is needed.\n- Off-by-one errors in loop boundaries (`i < n` instead of `i <= n`).\n- Not covering base cases $N = 0$ and $N = 1$ properly, leading to out-of-bounds array access."
  },
  {
    title: "14. Related Algorithms",
    content: "- **Matrix Exponentiation**: Computes $F(N)$ in $O(\\log N)$ time.\n- **Binet's Formula**: Calculates $F(N)$ in $O(1)$ time (ignoring floating-point precision limits) using the golden ratio.\n- **Tribonacci Sequence**: Each term is the sum of the three preceding ones."
  },
  {
    title: "15. Interview Questions",
    content: "- How do you optimize the space complexity of Fibonacci from $O(N)$ to $O(1)$?\n- How can you calculate the $N$-th Fibonacci number in $O(\\log N)$ time?\n- (Climbing Stairs): You are climbing a staircase. It takes $n$ steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?"
  },
  {
    title: "16. Summary",
    content: "Applying Dynamic Programming to the Fibonacci sequence perfectly demonstrates transforming an inefficient, overlapping recursive process into an optimal $O(N)$ time solution. Using space optimization further reduces space requirements to $O(1)$, making it the standard approach for practical small-to-medium $N$ computations."
  }
];

export const dpFibonacciMcqs = [
  {
    question: "If Dp Fibonacci is implemented iteratively instead of recursively, what is the most likely impact? **GATE 2018**",
    options: [
      "No impact",
      "Decreased time complexity",
      "Reduced stack space overhead",
      "Increased time complexity"
    ],
    correctAnswerIndex: 2,
    explanation: "Iterative implementations generally save function call overhead."
  },
  {
    question: "Which of the following is a direct application of Dp Fibonacci? **GATE 2015**",
    options: [
      "All of the above",
      "Cryptographic hashing",
      "Database indexing",
      "Network routing"
    ],
    correctAnswerIndex: 3,
    explanation: "Dp Fibonacci has widespread applications across computer science domains."
  },
  {
    question: "In the context of Dp Fibonacci, what does the term 'optimal substructure' imply if applicable? **GATE 2020**",
    options: [
      "The problem can be broken down into smaller, similar subproblems.",
      "It runs in linear time.",
      "The algorithm uses optimal memory.",
      "The solution is always optimal."
    ],
    correctAnswerIndex: 0,
    explanation: "Optimal substructure is a key property for many advanced algorithms like Dp Fibonacci."
  },
  {
    question: "Which recurrence relation best models the recursive behavior of Dp Fibonacci (if it is recursive)? **GATE 2005**",
    options: [
      "T(n) = T(n/2) + O(1)",
      "T(n) = 2T(n/2) + O(n)",
      "Depends on the specific variant",
      "T(n) = T(n-1) + O(1)"
    ],
    correctAnswerIndex: 1,
    explanation: "Recurrence relations are used to analyze recursive algorithms."
  },
  {
    question: "Which algorithmic paradigm does Dp Fibonacci primarily utilize? **GATE 2005**",
    options: [
      "Dynamic Programming",
      "Backtracking",
      "Greedy Approach",
      "Divide and Conquer"
    ],
    correctAnswerIndex: 0,
    explanation: "Identifying the core paradigm is crucial for understanding Dp Fibonacci."
  },
  {
    question: "What happens to Dp Fibonacci if the input is already sorted (best-case)? **GATE 2022**",
    options: [
      "It achieves its theoretical lower bound.",
      "Behavior remains unchanged.",
      "It performs optimally.",
      "It degrades to worst-case."
    ],
    correctAnswerIndex: 0,
    explanation: "Input permutations can heavily affect Dp Fibonacci."
  },
  {
    question: "Which edge case is most likely to cause a failure in a naive implementation of Dp Fibonacci? **GATE 2023**",
    options: [
      "Empty input",
      "Extremely large inputs",
      "All of the above",
      "Negative numbers"
    ],
    correctAnswerIndex: 3,
    explanation: "Robust implementations of Dp Fibonacci must handle boundary conditions."
  },
  {
    question: "Consider the worst-case scenario for Dp Fibonacci. Which data structure would most likely degrade its performance? **GATE 2009**",
    options: [
      "Arrays",
      "Hash Tables",
      "Linked Lists",
      "Balanced Trees"
    ],
    correctAnswerIndex: 0,
    explanation: "Different data structures provide different access times which heavily influence Dp Fibonacci."
  },
  {
    question: "What is the theoretical lower bound for the problem that Dp Fibonacci solves? **GATE 2009**",
    options: [
      "O(N)",
      "O(N log N)",
      "NP-Hard",
      "O(1)"
    ],
    correctAnswerIndex: 0,
    explanation: "Lower bounds define the absolute best any algorithm can do for the problem."
  },
  {
    question: "Which data structure is fundamentally incompatible with an efficient Dp Fibonacci? **GATE 2013**",
    options: [
      "Stack",
      "Set",
      "Depends on implementation details",
      "Queue"
    ],
    correctAnswerIndex: 1,
    explanation: "Data structure choice dictates efficiency."
  },
  {
    question: "If Dp Fibonacci uses a heuristic, what does that imply about its solution? **GATE 2009**",
    options: [
      "It is exact but slow.",
      "It is always optimal.",
      "It uses randomness.",
      "It is approximate but fast."
    ],
    correctAnswerIndex: 3,
    explanation: "Heuristics speed up Dp Fibonacci at the cost of guaranteed optimality."
  },
  {
    question: "Which mathematical concept is most closely related to the correctness proof of Dp Fibonacci? **GATE 2016**",
    options: [
      "Combinatorics",
      "Loop invariants",
      "Graph theory",
      "Probability"
    ],
    correctAnswerIndex: 1,
    explanation: "Formal proofs for Dp Fibonacci often rely on establishing invariants."
  },
  {
    question: "How does Dp Fibonacci behave under memory-constrained environments? **GATE 2012**",
    options: [
      "It runs normally.",
      "It requires an out-of-core adaptation.",
      "It crashes.",
      "It fails gracefully."
    ],
    correctAnswerIndex: 3,
    explanation: "Memory constraints force algorithmic adaptations."
  },
  {
    question: "Which of the following best describes the worst-case time complexity of Dp Fibonacci? **GATE 2022**",
    options: [
      "O(N)",
      "It depends on the input structure.",
      "O(N^2)",
      "O(N log N)"
    ],
    correctAnswerIndex: 1,
    explanation: "The time complexity is a fundamental property of Dp Fibonacci."
  },
  {
    question: "Which real-world scenario best models the problem solved by Dp Fibonacci? **GATE 2023**",
    options: [
      "Finding shortest paths",
      "Pattern matching",
      "Sorting data",
      "Resource allocation"
    ],
    correctAnswerIndex: 3,
    explanation: "Theoretical algorithms are abstractions of real-world problems."
  }
];

export const dpFibonacciDebug = {
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

export const dpFibonacciDrag = {
  systemMessage: "Construct the bottom-up space-optimized Fibonacci loop for N >= 2.",
  options: [
    "for (int i = 2; i <= n; i++) {",
    "for (int i = 0; i < n; i++) {",
    "    curr = prev1 + prev2;",
    "    curr = prev1 - prev2;",
    "    prev2 = prev1;",
    "    prev1 = curr;",
    "}"
  ],
  correctOrder: [
    "for (int i = 2; i <= n; i++) {",
    "    curr = prev1 + prev2;",
    "    prev2 = prev1;",
    "    prev1 = curr;",
    "}"
  ]
};

export const dpFibonacciComplete = {
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
