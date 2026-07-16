export const CHAPTER15_CONTENT = {
  title: "Preprocessor Directives",
  description: "The C preprocessor is a macro processor that is used automatically by the C compiler to transform your program before actual compilation. It allows you to define macros, include header files, conditionally compile code, and perform other compile-time directives, making your code more modular, readable, and portable.",
  points: [
    {
      heading: "Introduction to Preprocessor Directives",
      body: "Preprocessor directives in C are lines in your program that start with a `#`. They are not program statements but directives for the preprocessor, which runs before the compiler. They don't end with a semicolon.\n\nExample:\n```c\n#include <stdio.h>\n#define PI 3.14\n```"
    },
    {
      heading: "File Inclusion Directives",
      body: "The `#include` directive tells the preprocessor to insert the contents of another file into the source code at the point where the directive is found. Use angle brackets `< >` for standard library files and double quotes `\" \"` for your own header files.\n\nExample:\n```c\n#include <math.h>\n#include \"myheader.h\"\n```"
    },
    {
      heading: "Macro Definition Directives",
      body: "The `#define` directive allows you to create constants and macros. A macro is a fragment of code that has been given a name. Whenever the name is used, it is replaced by the contents of the macro.\n\nExample:\n```c\n#define SQUARE(x) ((x) * (x))\nint area = SQUARE(5); // Becomes ((5) * (5))\n```"
    },
    {
      heading: "Conditional Compilation",
      body: "Directives like `#ifdef`, `#ifndef`, `#if`, `#else`, `#elif`, and `#endif` allow you to include or exclude parts of the program based on various conditions. This is extremely useful for cross-platform development.\n\nExample:\n```c\n#define DEBUG\n\n#ifdef DEBUG\n  printf(\"Debug mode is ON\\n\");\n#endif\n```"
    },
    {
      heading: "Undefining Macros and Other Directives",
      body: "The `#undef` directive removes a previously defined macro. Other directives include `#pragma`, which issues compiler-specific commands, and `#error`, which forces the compiler to stop and output a specific error message.\n\nExample:\n```c\n#define TEMP 100\n#undef TEMP // TEMP is no longer defined\n```"
    }
  ],
  codeDescription: "Comprehensive Example showing file inclusion, macro definitions, and conditional compilation.",
  code: `#include <stdio.h>\n\n#define MAX_LIMIT 100\n#define MIN(a, b) ((a) < (b) ? (a) : (b))\n#define FEATURE_ENABLED\n\nint main() {\n    int x = 50;\n    int y = 75;\n    \n    // Using simple macro\n    printf("The max limit is %d\\n", MAX_LIMIT);\n    \n    // Using parameterized macro\n    printf("The minimum of %d and %d is %d\\n", x, y, MIN(x, y));\n    \n    // Conditional compilation\n#ifdef FEATURE_ENABLED\n    printf("Special feature is enabled!\\n");\n#else\n    printf("Special feature is disabled.\\n");\n#endif\n    \n    return 0;\n}`
};
