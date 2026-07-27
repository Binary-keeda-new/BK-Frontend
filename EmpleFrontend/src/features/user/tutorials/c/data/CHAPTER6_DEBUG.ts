// CHAPTER6_DEBUG.ts
export const CHAPTER6_DEBUG = [
  {
    instructions: "Fix the 3 bugs in this for loop to print numbers from 1 to 5.",
    buggy: "#include <stdio.h>\n\nint main() {\n    for (int i = 1, i <= 5, i++) {\n        printf(\"%d \", i)\n    }\n    return 0;\n}",
    fixed: "#include <stdio.h>\n\nint main() {\n    for (int i = 1; i <= 5; i++) {\n        printf(\"%d \", i);\n    }\n    return 0;\n}",
    hints: [
      "The parts of a for loop are separated by semicolons (;), not commas (,).",
      "The printf statement is missing a semicolon."
    ],
    expectedOutput: "1 2 3 4 5 "
  },
  {
    instructions: "Fix the 3 bugs in this while loop to count down from 3 to 1.",
    buggy: "#include <stdio.h>\n\nint main() {\n    int count = 3;\n    while (count > 0) \n        printf(\"%d \", count);\n        count++;\n    \n    return 0;\n}",
    fixed: "#include <stdio.h>\n\nint main() {\n    int count = 3;\n    while (count > 0) {\n        printf(\"%d \", count);\n        count--;\n    }\n    return 0;\n}",
    hints: [
      "If a while loop has multiple statements, they must be wrapped in curly braces { }.",
      "To count down, you need to decrement count (count--) rather than increment it."
    ],
    expectedOutput: "3 2 1 "
  },
  {
    instructions: "Fix the 2 bugs in this do-while loop.",
    buggy: "#include <stdio.h>\n\nint main() {\n    int num = 0;\n    do {\n        printf(\"Loop! \");\n        num++;\n    } while (num < 2)\n    return 0;\n}",
    fixed: "#include <stdio.h>\n\nint main() {\n    int num = 0;\n    do {\n        printf(\"Loop! \");\n        num++;\n    } while (num < 2);\n    return 0;\n}",
    hints: [
      "A do-while loop requires a semicolon after the while condition."
    ],
    expectedOutput: "Loop! Loop! "
  }
];
