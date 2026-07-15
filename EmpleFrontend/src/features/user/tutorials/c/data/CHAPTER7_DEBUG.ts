// CHAPTER7_DEBUG.ts
export const CHAPTER7_DEBUG = [
  {
    "instructions": "Fix the 3 bugs preventing this program from computing a square correctly.",
    "buggy": "#include <stdio.h>\n\nint square(n) {\n    n * n;\n}\n\nint main() {\n    int result = square(5)\n    printf(\"Square: %d\\n\", result);\n    return 0;\n}",
    "fixed": "#include <stdio.h>\n\nint square(int n) {\n    return n * n;\n}\n\nint main() {\n    int result = square(5);\n    printf(\"Square: %d\\n\", result);\n    return 0;\n}",
    "hints": [
      "Function parameters need a type, e.g. int n",
      "Use the 'return' keyword to send a value back from the function",
      "The function call inside main() needs a semicolon at the end"
    ],
    "expectedOutput": "Square: 25"
  },
  {
    "instructions": "Fix the bugs in this call-by-reference function. It's supposed to double the variable's value, but it's not working.",
    "buggy": "#include <stdio.h>\n\nvoid doubleValue(int x) {\n    *x = *x * 2;\n}\n\nint main() {\n    int num = 10;\n    doubleValue(num);\n    printf(\"Doubled: %d\\n\", num);\n    return 0;\n}",
    "fixed": "#include <stdio.h>\n\nvoid doubleValue(int *x) {\n    *x = *x * 2;\n}\n\nint main() {\n    int num = 10;\n    doubleValue(&num);\n    printf(\"Doubled: %d\\n\", num);\n    return 0;\n}",
    "hints": [
      "The function parameter needs to be a pointer (int *x)",
      "When calling doubleValue(), you need to pass the address of num using '&'"
    ],
    "expectedOutput": "Doubled: 20"
  },
  {
    "instructions": "This recursive function calculates the factorial of a number, but it causes a stack overflow. Fix the 2 bugs.",
    "buggy": "#include <stdio.h>\n\nint factorial(int n) {\n    if (n = 1) return 1;\n    return n * factorial(n);\n}\n\nint main() {\n    printf(\"Factorial of 5 is %d\\n\", factorial(5));\n    return 0;\n}",
    "fixed": "#include <stdio.h>\n\nint factorial(int n) {\n    if (n == 1) return 1;\n    return n * factorial(n - 1);\n}\n\nint main() {\n    printf(\"Factorial of 5 is %d\\n\", factorial(5));\n    return 0;\n}",
    "hints": [
      "The equality check in the if-statement should be '==' instead of '='",
      "The recursive call must pass 'n - 1' to eventually reach the base case"
    ],
    "expectedOutput": "Factorial of 5 is 120"
  }
];
