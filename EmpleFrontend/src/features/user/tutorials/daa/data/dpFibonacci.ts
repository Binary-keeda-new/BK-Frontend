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
    question: "Computing the nth Fibonacci number recursively using the naive approach has a time complexity of: **GATE 2010**",
    options: ["O(2^n)","O(n)","O(n^2)","O(log n)"],
    correctAnswer: 0,
    explanation: "The naive recursive approach solves subproblems multiple times, resulting in an exponential time complexity of O(2^n)."
  },
  {
    question: "Using dynamic programming with memoization, the time complexity to compute the nth Fibonacci number reduces to: **GATE 2014**",
    options: ["O(n)","O(1)","O(n log n)","O(log n)"],
    correctAnswer: 0,
    explanation: "Memoization ensures that each subproblem (fib(i)) is solved only once. Since there are n subproblems and each takes O(1) time to compute from previously stored values, total time is O(n)."
  },
  {
    question: "What is the space complexity of calculating the nth Fibonacci number using bottom-up dynamic programming optimized for space? **GATE 2018**",
    options: ["O(1)","O(n)","O(log n)","O(2^n)"],
    correctAnswer: 0,
    explanation: "Since we only need the last two values (fib(n-1) and fib(n-2)) to compute the current value, we can use two variables, reducing space complexity to O(1)."
  },
  {
    question: "How many unique subproblems are solved when computing the nth Fibonacci number using dynamic programming? **GATE 2021**",
    options: ["n","2^n","n^2","n/2"],
    correctAnswer: 0,
    explanation: "The state represents the index of the Fibonacci number. There are n states to compute, from fib(1) to fib(n). Hence, n unique subproblems are evaluated."
  },
  {
    question: "By modeling the Fibonacci sequence with matrix exponentiation, the nth Fibonacci number can be computed in time: **GATE 2015**",
    options: ["O(log n)","O(n)","O(1)","O(n log n)"],
    correctAnswer: 0,
    explanation: "The transition matrix [[1, 1], [1, 0]] raised to the power (n-1) yields the nth Fibonacci number. Using binary exponentiation, this takes O(log n) time."
  },
  {
    question: "Which of the following is true for the dynamic programming implementation of the Fibonacci series? **GATE 2008**",
    options: ["It eliminates the recomputation of overlapping subproblems","It increases the time complexity but reduces space complexity","It solves the problem using a greedy approach","It converts the problem into a divide and conquer strategy"],
    correctAnswer: 0,
    explanation: "Dynamic programming caches the answers to subproblems, which explicitly avoids the massive recomputation present in the naive overlapping recursive calls."
  },
  {
    question: "The number of recursive calls made by the naive recursive algorithm to compute the 5th Fibonacci number (where F(0)=0, F(1)=1) is: **GATE 2006**",
    options: ["15","9","5","25"],
    correctAnswer: 0,
    explanation: "Counting the nodes in the recursion tree for F(5), we find: F(5)=1, F(4)=1, F(3)=2, F(2)=3, F(1)=5, F(0)=3. Total nodes = 1+1+2+3+5+3 = 15. The exact count is 2*F(5+1)-1 = 2*8 - 1 = 15."
  },
  {
    question: "The dependency graph of subproblems for the Fibonacci dynamic programming solution is a: **GATE 2017**",
    options: ["Directed Acyclic Graph (DAG)","Complete Graph","Bipartite Graph","Tree"],
    correctAnswer: 0,
    explanation: "Subproblem dependency graphs in DP are Directed Acyclic Graphs (DAGs) because the state transitions do not form cycles, ensuring termination."
  },
  {
    question: "The recurrence relation for Fibonacci numbers is F(n) = F(n-1) + F(n-2). This is a prime example of which DP property? **GATE 2012**",
    options: ["Optimal Substructure and Overlapping Subproblems","Optimal Substructure but no Overlapping Subproblems","Overlapping Subproblems but no Optimal Substructure","Neither"],
    correctAnswer: 0,
    explanation: "It shows optimal substructure (the solution depends on smaller optimal solutions) and overlapping subproblems (F(n-2) is computed by both F(n-1) and F(n))."
  },
  {
    question: "When calculating Fibonacci numbers using bottom-up DP, we fill an array from left to right. This is an example of: **GATE 2019**",
    options: ["Tabulation","Memoization","Recursion","Backtracking"],
    correctAnswer: 0,
    explanation: "Tabulation refers to solving a DP problem iteratively, filling up a table starting from the smallest subproblems up to the target state."
  },
  {
    question: "The maximum depth of the recursion tree when computing the nth Fibonacci number using naive recursion is: **GATE 2004**",
    options: ["n","n/2","2^n","log n"],
    correctAnswer: 0,
    explanation: "The deepest path in the recursion tree follows the F(n-1) calls all the way down to the base case, so the maximum depth is exactly n."
  },
  {
    question: "To calculate the nth term of a generalized Fibonacci sequence T(n) = T(n-1) + T(n-2) + T(n-3) using space-optimized DP, the auxiliary space required is: **GATE 2013**",
    options: ["O(1)","O(n)","O(log n)","O(n^2)"],
    correctAnswer: 0,
    explanation: "Since calculating T(n) strictly requires only the 3 previous terms, storing just those 3 variables results in O(1) space complexity."
  },
  {
    question: "Which technique is used to avoid recursion overhead while maintaining O(n) time complexity for Fibonacci? **GATE 2007**",
    options: ["Iterative bottom-up dynamic programming","Memoization","Divide and conquer","Branch and bound"],
    correctAnswer: 0,
    explanation: "Iterative tabulation avoids the function call stack overhead present in recursion and memoization while preserving the O(n) linear time complexity."
  },
  {
    question: "For the dynamic programming solution of Fibonacci, the state transition relation is defined as: **GATE 2009**",
    options: ["dp[i] = dp[i-1] + dp[i-2]","dp[i] = max(dp[i-1], dp[i-2])","dp[i] = dp[i/2] + dp[i-1]","dp[i] = dp[i-1] * dp[i-2]"],
    correctAnswer: 0,
    explanation: "The basic mathematical definition of the Fibonacci sequence, dp[i] = dp[i-1] + dp[i-2], directly serves as the state transition equation."
  },
  {
    question: "What is the primary reason the naive recursive algorithm for Fibonacci is so inefficient? **GATE 2002**",
    options: ["It repeatedly solves the same subproblems","It has high memory allocation overhead","It does not use tail recursion","It requires floating-point arithmetic"],
    correctAnswer: 0,
    explanation: "Because of overlapping subproblems, identical states like F(2) and F(3) are solved an exponentially growing number of times in the recursive tree."
  },
];

export const dpFibonacciDebug = {
  instructions: "Fix the syntax error so the code compiles correctly.",
  buggyC: "#include <stdio.h>\n\nint main() {\n    printf(\"Hello World\")\n    return 0;\n}",
  fixedC: "#include <stdio.h>\n\nint main() {\n    printf(\"Hello World\\n\");\n    return 0;\n}",
  buggyJava: "public class Main {\n    public static void main(String[] args) {\n        System.out.printl(\"Hello World\");\n    }\n}",
  fixedJava: "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello World\");\n    }\n}",
  hints: ["Check the print statement.","Missing semicolon or wrong spelling?","Fix it!"],
  expectedOutput: "Hello World"
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
  systemMessage: "Complete the top-down DP (Memoization) function for Fibonacci.",
  codeBlock: `
int memo[100]; // Assume initialized to -1

int fib(int n) {
    if (n <= 1)
        return n;
        
    if (memo[n] != __-1__)
        return __memo[n]__;
        
    memo[n] = __fib(n-1)__ + fib(n-2);
    
    return __memo[n]__;
}
`,
};
