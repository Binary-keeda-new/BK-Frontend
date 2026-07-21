// CHAPTER2_DEBUG.ts
export const CHAPTER2_DEBUG = [
  {
    "instructions": "Fix the 3 bugs so this program correctly prints the age variable.",
    "buggy": "#include <stdio.h>\n\nint main() {\n    age = 20;\n    printf(\"I am %d years old.\\n\", age)\n    return 0;\n}",
    "fixed": "#include <stdio.h>\n\nint main() {\n    int age = 20;\n    printf(\"I am %d years old.\\n\", age);\n    return 0;\n}",
    "hints": [
      "Variables must be declared with a type (like 'int') before use.",
      "The printf statement is missing a semicolon."
    ],
    "expectedOutput": "I am 20 years old."
  },
  {
    "instructions": "Fix the format specifiers in this program.",
    "buggy": "#include <stdio.h>\n\nint main() {\n    float price = 9.99;\n    char letter = 'A';\n    printf(\"Price: %d\\n\", price);\n    printf(\"Letter: %s\\n\", letter);\n    return 0;\n}",
    "fixed": "#include <stdio.h>\n\nint main() {\n    float price = 9.99;\n    char letter = 'A';\n    printf(\"Price: %f\\n\", price);\n    printf(\"Letter: %c\\n\", letter);\n    return 0;\n}",
    "hints": [
      "Use '%f' to print float variables.",
      "Use '%c' to print single char variables."
    ],
    "expectedOutput": "Price: 9.990000\nLetter: A"
  },
  {
    "instructions": "Fix the compilation error regarding constants.",
    "buggy": "#include <stdio.h>\n\nint main() {\n    const int MAX = 100;\n    MAX = 200;\n    printf(\"Max is %d\\n\", MAX);\n    return 0;\n}",
    "fixed": "#include <stdio.h>\n\nint main() {\n    const int MAX = 100;\n    // MAX = 200; // Cannot modify a constant\n    printf(\"Max is %d\\n\", MAX);\n    return 0;\n}",
    "hints": [
      "You cannot reassign a value to a variable declared as 'const'."
    ],
    "expectedOutput": "Max is 100"
  }
];
