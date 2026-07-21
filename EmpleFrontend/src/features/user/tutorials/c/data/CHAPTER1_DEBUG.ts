// CHAPTER1_DEBUG.ts
export const CHAPTER1_DEBUG = [
  {
    "instructions": "Fix the 3 bugs preventing this Hello World program from compiling and running.",
    "buggy": "include <stdio.h>\n\nint main() {\n    printf(\"Hello, World!\\n\")\n    return 0;\n}",
    "fixed": "#include <stdio.h>\n\nint main() {\n    printf(\"Hello, World!\\n\");\n    return 0;\n}",
    "hints": [
      "Preprocessor directives must start with a '#' symbol.",
      "The printf statement is missing a semicolon at the end."
    ],
    "expectedOutput": "Hello, World!"
  },
  {
    "instructions": "Fix the syntax errors in this program so it prints correctly.",
    "buggy": "#include <stdio.h>\n\nvoid main() {\n    print(\"Welcome to C!\\n\");\n}",
    "fixed": "#include <stdio.h>\n\nint main() {\n    printf(\"Welcome to C!\\n\");\n    return 0;\n}",
    "hints": [
      "The standard return type for main is 'int', not 'void'.",
      "The function to print text is 'printf', not 'print'.",
      "Don't forget to return 0 at the end of main."
    ],
    "expectedOutput": "Welcome to C!"
  },
  {
    "instructions": "Fix the bugs in this program involving comments and basic syntax.",
    "buggy": "#include <stdio.h>\n\n/* This is a \n   multi-line comment *\n\nint main() {\n    printf(\"Testing comments.\\n\");\n    return 0;\n}",
    "fixed": "#include <stdio.h>\n\n/* This is a \n   multi-line comment */\n\nint main() {\n    printf(\"Testing comments.\\n\");\n    return 0;\n}",
    "hints": [
      "The multi-line comment isn't closed properly. It should end with '*/'."
    ],
    "expectedOutput": "Testing comments."
  }
];
