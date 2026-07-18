// CHAPTER1_BASICS.ts
export const CHAPTER1_BASICS = {
  title: "Introduction to C",
  description: `Welcome to the world of C! Created by Dennis Ritchie in 1972, C is a powerful, general-purpose programming language that sits close to the hardware. It is highly efficient, giving you direct memory control and raw speed. Serving as the foundation for modern languages like C++, Java, and Python, mastering C will give you a profound understanding of how computers execute programs under the hood. In this chapter, we will explore the evolution of C, the structure of a C program, and the compilation process that turns your code into executable machine instructions.`,
  points: [
    {
      heading: "Evolution of Programming Languages",
      body: "Programming languages evolved from Machine Language to Assembly Language and finally High-Level Languages. C represents an important milestone because it combines low-level hardware access with high-level programming constructs.\n\nExample:\n```c\n// C allows direct memory access (low-level)\nint *ptr = &memory;\n// But also provides high-level constructs (if, while)\nif (condition) {\n    // do something\n}\n```"
    },
    {
      heading: "BCPL → B → C",
      body: "BCPL inspired the B language, which was later improved by Dennis Ritchie into C. C added data types, improved syntax and greater efficiency, making it suitable for operating system development.\n\nExample:\n```c\n// B was typeless, but C introduced data types:\nint age = 25;\nchar grade = 'A';\nfloat pi = 3.14;\n```"
    },
    {
      heading: "Dennis Ritchie",
      body: "Dennis Ritchie created C while working at Bell Labs. Together with Ken Thompson, he rewrote the UNIX operating system in C, proving that an OS could be written in a portable high-level language.\n\nExample:\n```c\n// Fun fact: UNIX is still fundamentally written in C!\nprintf(\"Thank you, Dennis Ritchie!\\n\");\n```"
    },
    {
      heading: "Structure of a C Program",
      body: "A typical C program contains preprocessor directives, global declarations, the main() function and optional user-defined functions.\n\nExample:\n```c\n#include <stdio.h> // Preprocessor\n\nint global_var = 10; // Global declaration\n\nint main() {         // Main function\n    return 0;\n}\n```"
    },
    {
      heading: "Comments",
      body: "Single-line comments begin with // while multi-line comments are enclosed between /* and */. Comments improve readability and are ignored by the compiler.\n\nExample:\n```c\n// This is a single line comment\n\n/* \n   This is a \n   multi-line comment \n*/\n```"
    },
    {
      heading: "Compilation",
      body: "Source `.c` → Compiler `gcc` → Object file → Executable. A C program must be compiled into machine code before the computer can run it.\n\nExample:\n```bash\n# Compile the program and name the executable 'hello'\ngcc hello.c -o hello\n\n# Run the executable\n./hello\n```"
    },
    {
      heading: "Keywords",
      body: "Keywords are reserved words in C that have special meaning to the compiler. Words like `int`, `return`, `if`, `for`, and `while` cannot be used as your own variable names.\n\nExample:\n```c\n// VALID\nint myAge = 25;\n\n// INVALID (Compiler Error because 'return' is a keyword)\nint return = 25;\n```"
    },
    {
      heading: "Header Files",
      body: "Header files (ending in `.h`) declare function prototypes that can be shared across multiple files. For instance, `#include <stdio.h>` imports standard input/output functions like `printf()`.\n\nExample:\n```c\n// Imports math functions like sqrt()\n#include <math.h>\n\n// Imports string functions like strlen()\n#include <string.h>\n```"
    },
    {
      heading: "main() Return Success",
      body: "The `main()` function must return an integer (`int`). Returning `0` signals successful execution to the operating system, while non-zero values signal that an error occurred.\n\nExample:\n```c\nint main() {\n    // do some work...\n\n    // 0 tells the OS \"Everything worked fine!\"\n    return 0;\n}\n```"
    }
  ],
  code: `#include <stdio.h> // Step 1: Include standard I/O library

// Step 2: The main function where execution begins
int main() {
    // Step 3: Use printf to output text to the console
    printf("Welcome to C Programming!\\n");
    
    // '\\n' is an escape sequence that moves the cursor to the next line
    printf("This is your first C program.\\n");

    // Step 4: Return 0 indicates the program executed successfully
    return 0;
}`
};