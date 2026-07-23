export const CHAPTER4_DEBUG = [
  {
    instructions: "Fix the base case in this recurrence relation implementation for Factorial.",
    buggy: "int factorial(int n) {\n    if(n == 1) return 0;\n    return n * factorial(n - 1);\n}",
    fixed: "int factorial(int n) {\n    if(n == 1) return 1;\n    return n * factorial(n - 1);\n}",
    hints: ["Factorial of 1 is 1, not 0.", "Returning 0 will make all multiplications 0."],
    expectedOutput: "Correct factorial value computed."
  },
  {
    instructions: "Correct the recursive call for the Fibonacci sequence recurrence relation.",
    buggy: "int fib(int n) {\n    if(n <= 1) return n;\n    return fib(n - 1) + fib(n - 1);\n}",
    fixed: "int fib(int n) {\n    if(n <= 1) return n;\n    return fib(n - 1) + fib(n - 2);\n}",
    hints: ["Fibonacci depends on the previous TWO terms.", "You are adding the same term twice."],
    expectedOutput: "Correct Fibonacci term returned."
  },
  {
    instructions: "Fix the recursive division to model T(n) = 2T(n/2) + O(1).",
    buggy: "void divide(int n) {\n    if(n <= 1) return;\n    divide(n);\n    divide(n);\n}",
    fixed: "void divide(int n) {\n    if(n <= 1) return;\n    divide(n/2);\n    divide(n/2);\n}",
    hints: ["Calling divide(n) leads to infinite recursion.", "You must divide the problem size by 2."],
    expectedOutput: "Recursion tree executes correctly without stack overflow."
  }
];