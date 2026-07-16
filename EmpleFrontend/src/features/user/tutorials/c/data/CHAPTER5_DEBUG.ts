// CHAPTER5_DEBUG.ts
export const CHAPTER5_DEBUG = [
  {
    instructions: "Fix the bug causing the switch statement to print the wrong grades due to fall-through.",
    buggy: `#include <stdio.h>\n\nint main() {\n    int score = 9;\n    switch(score) {\n        case 9:\n            printf("A\\n");\n        case 8:\n            printf("B\\n");\n        default:\n            printf("C\\n");\n    }\n    return 0;\n}`,
    fixed: `#include <stdio.h>\n\nint main() {\n    int score = 9;\n    switch(score) {\n        case 9:\n            printf("A\\n");\n            break;\n        case 8:\n            printf("B\\n");\n            break;\n        default:\n            printf("C\\n");\n    }\n    return 0;\n}`,
    hints: ["If case 9 executes, it will continue executing case 8 and default unless you tell it to stop.", "Add a 'break;' statement at the end of your cases."],
    expectedOutput: "A"
  },
  {
    instructions: "Fix the syntax error in the else if ladder.",
    buggy: `#include <stdio.h>\n\nint main() {\n    int val = 5;\n    if (val == 10) {\n        printf("Ten");\n    } else (val == 5) {\n        printf("Five");\n    }\n    return 0;\n}`,
    fixed: `#include <stdio.h>\n\nint main() {\n    int val = 5;\n    if (val == 10) {\n        printf("Ten");\n    } else if (val == 5) {\n        printf("Five");\n    }\n    return 0;\n}`,
    hints: ["You cannot put a condition directly next to 'else'.", "Change 'else' to 'else if' to check a second condition."],
    expectedOutput: "Five"
  },
  {
    instructions: "Fix the assignment inside the if condition.",
    buggy: `#include <stdio.h>\n\nint main() {\n    int access = 0;\n    if (access = 1) {\n        printf("Granted");\n    } else {\n        printf("Denied");\n    }\n    return 0;\n}`,
    fixed: `#include <stdio.h>\n\nint main() {\n    int access = 0;\n    if (access == 1) {\n        printf("Granted");\n    } else {\n        printf("Denied");\n    }\n    return 0;\n}`,
    hints: ["The single '=' assigns 1 to access, which evaluates to true.", "Use the double '==' relational operator to check equality."],
    expectedOutput: "Denied"
  }
];
export default CHAPTER5_DEBUG;
