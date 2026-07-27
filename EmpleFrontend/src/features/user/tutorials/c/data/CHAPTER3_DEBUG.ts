// CHAPTER3_DEBUG.ts
export const CHAPTER3_DEBUG = [
  {
    instructions: "Fix the bug related to relational and assignment operators.",
    buggy: `#include <stdio.h>\n\nint main() {\n    int a = 10, b = 10;\n    if (a = b) {\n        printf("Equal\\n");\n    }\n    return 0;\n}`,
    fixed: `#include <stdio.h>\n\nint main() {\n    int a = 10, b = 10;\n    if (a == b) {\n        printf("Equal\\n");\n    }\n    return 0;\n}`,
    hints: ["Use == to compare equality, not =.", "= is the assignment operator, which sets a to b and returns the assigned value."],
    expectedOutput: "Equal"
  },
  {
    instructions: "Fix the operator to find the remainder of division.",
    buggy: `#include <stdio.h>\n\nint main() {\n    int num = 17;\n    printf("Remainder when divided by 5 is: %d\\n", num / 5);\n    return 0;\n}`,
    fixed: `#include <stdio.h>\n\nint main() {\n    int num = 17;\n    printf("Remainder when divided by 5 is: %d\\n", num % 5);\n    return 0;\n}`,
    hints: ["The / operator performs division and returns the quotient.", "Use the modulus operator % to get the remainder."],
    expectedOutput: "Remainder when divided by 5 is: 2"
  },
  {
    instructions: "Fix the logic bug in the AND condition.",
    buggy: `#include <stdio.h>\n\nint main() {\n    int age = 20;\n    if (age > 13 & age < 19) {\n        printf("Teenager\\n");\n    } else {\n        printf("Not a teenager\\n");\n    }\n    return 0;\n}`,
    fixed: `#include <stdio.h>\n\nint main() {\n    int age = 20;\n    if (age > 13 && age < 19) {\n        printf("Teenager\\n");\n    } else {\n        printf("Not a teenager\\n");\n    }\n    return 0;\n}`,
    hints: ["& is the bitwise AND operator, not the logical AND.", "Use && for combining boolean logical conditions."],
    expectedOutput: "Not a teenager"
  }
];
export default CHAPTER3_DEBUG;
