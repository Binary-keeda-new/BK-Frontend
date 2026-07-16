export const CHAPTER15_DEBUG = [
  {
    title: "Macro Side Effects",
    instruction: "Fix the bug in the following code. The macro is causing unexpected side effects.",
    buggy: `#include <stdio.h>\n#define MAX(a, b) (a > b ? a : b)\n\nint main() {\n    int x = 5, y = 6;\n    int z = MAX(x++, y++);\n    printf("%d %d %d", x, y, z);\n    return 0;\n}`,
    fixed: `#include <stdio.h>\n\ninline int max_func(int a, int b) {\n    return a > b ? a : b;\n}\n\nint main() {\n    int x = 5, y = 6;\n    int z = max_func(x++, y++);\n    printf("%d %d %d", x, y, z);\n    return 0;\n}`,
    expectedOutput: "6 7 6",
    hints: [
      "Macros do text substitution, which can evaluate arguments multiple times.",
      "If you pass `x++` to the `MAX` macro, it gets evaluated as `(x++ > y++ ? x++ : y++)`.",
      "Use an inline function instead to evaluate arguments only once."
    ]
  },
  {
    title: "Missing Parentheses in Macro",
    instruction: "Fix the bug in the following code. The macro is not calculating the correct value due to operator precedence.",
    buggy: `#include <stdio.h>\n#define MULTIPLY(a, b) a * b\n\nint main() {\n    int result = MULTIPLY(2 + 3, 4);\n    printf("%d", result);\n    return 0;\n}`,
    fixed: `#include <stdio.h>\n#define MULTIPLY(a, b) ((a) * (b))\n\nint main() {\n    int result = MULTIPLY(2 + 3, 4);\n    printf("%d", result);\n    return 0;\n}`,
    expectedOutput: "20",
    hints: [
      "The macro `MULTIPLY(2 + 3, 4)` expands to `2 + 3 * 4`.",
      "Multiplication has higher precedence than addition.",
      "Wrap macro arguments in parentheses to ensure proper evaluation."
    ]
  },
  {
    title: "Unclosed Conditional Directive",
    instruction: "Fix the bug in the following code. The conditional compilation block is missing its closing directive.",
    buggy: `#include <stdio.h>\n#define DEBUG\n\nint main() {\n#ifdef DEBUG\n    printf("Debug is enabled.\\n");\n    return 0;\n}`,
    fixed: `#include <stdio.h>\n#define DEBUG\n\nint main() {\n#ifdef DEBUG\n    printf("Debug is enabled.\\n");\n#endif\n    return 0;\n}`,
    expectedOutput: "Debug is enabled.",
    hints: [
      "Every `#ifdef` must have a corresponding closing directive.",
      "The compiler will throw an 'unterminated #ifdef' error.",
      "Add `#endif` at the end of the conditionally compiled block."
    ]
  }
];
