export const CHAPTER4_CONTENT = {
  title: "Recurrence Relations",
  description: "Master the techniques for solving Recurrence Relations, which are essential for analyzing recursive algorithms like Merge Sort and Quick Sort. You will learn multiple methods for solving recursive equations: the Iteration Method, the Substitution Method, the Recursion Tree Method, and the highly efficient Master Theorem for instantly solving common recurrences.",
  points: [
    {
      heading: "Recursive equations",
      body: "A recurrence relation is an equation that recursively defines a sequence or a function in terms of itself. In algorithm analysis, they are used to express the time complexity of recursive algorithms. For example, Merge Sort splits the data into two halves and merges them in linear time, yielding the relation $T(n) = 2T(n/2) + O(n)$."
    },
    {
      heading: "Iteration Method",
      body: "The Iteration Method (or Expansion Method) involves expanding the recurrence repeatedly until a pattern emerges, expressing it as a summation, and then evaluating the sum.\n\nExample for $T(n) = T(n-1) + c$:\n$T(n) = (T(n-2) + c) + c = T(n-2) + 2c$\nContinuing this $k$ times yields $T(n-k) + kc$.\nWhen $k = n$, we reach the base case $T(0) + nc = O(n)$."
    },
    {
      heading: "Substitution Method",
      body: "The Substitution Method involves guessing the asymptotic bound and then using mathematical induction to prove that our guess is correct. It is a powerful method but requires good intuition to make the correct initial guess.\n\nSteps:\n1. Guess the form of the solution (e.g., $O(n \\log n)$).\n2. Use mathematical induction to prove the guess holds true for constants $c$ and $n_0$."
    },
    {
      heading: "Recursion Tree",
      body: "A Recursion Tree is a visual tool to solve recurrence relations. Each node represents the cost of a single subproblem. By summing the costs across each level of the tree, and then summing those level-totals, we determine the total cost of the algorithm.\n\nFor $T(n) = 2T(n/2) + n$:\n- Level 0 cost: $n$\n- Level 1 cost: $n/2 + n/2 = n$\n- There are $\\log_2(n)$ levels, so total cost is $O(n \\log n)$."
    },
    {
      heading: "Master Theorem",
      body: "The Master Theorem provides a direct, formulaic way to solve recurrences of the form $T(n) = aT(n/b) + f(n)$, where $a \\ge 1$, $b > 1$, and $f(n)$ is asymptotically positive.\n\nCompare $f(n)$ to $n^{\\log_b a}$:\n1. If $f(n)$ is polynomially smaller, $T(n) = \\Theta(n^{\\log_b a})$.\n2. If they are the same rate, $T(n) = \\Theta(n^{\\log_b a} \\log n)$.\n3. If $f(n)$ is polynomially larger (and meets regularity condition), $T(n) = \\Theta(f(n))$."
    }
  ],
  code: "// Example of a recursive function whose complexity is analyzed using Recurrences\n#include <stdio.h>\n\n// T(n) = 2T(n/2) + O(1)\n// Using Master Theorem: a=2, b=2, f(n)=O(1)\n// n^(log_2 2) = n^1 = n\n// Since f(n) < n^1, T(n) = O(n)\nvoid example_recursive(int n) {\n    if (n <= 1) return;\n    printf(\"Processing %d\\n\", n);\n    \n    example_recursive(n / 2);\n    example_recursive(n / 2);\n}\n"
};