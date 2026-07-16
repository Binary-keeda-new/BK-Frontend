// CHAPTER3_CONTENT.ts
export const CHAPTER3_CONTENT = {
  title: "Operators in C",
  description: `Operators are the fundamental building blocks of logic and computation. They are special symbols that instruct the compiler to perform specific mathematical, relational, or logical manipulations on your data. C provides a rich and highly efficient set of built-in operators that allow you to do everything from simple arithmetic to complex bit-level manipulation. In this chapter, we will master arithmetic, relational, logical, assignment, and bitwise operators, and understand how Operator Precedence determines the order of expression evaluation.`,
  points: [
    {
      heading: "Arithmetic Operators",
      body: "Used to perform common mathematical operations such as addition (+), subtraction (-), multiplication (*), division (/), and modulo (%).\n\nExample:\n```c\nint sum = 10 + 5;      // 15\nint remainder = 10 % 3; // 1 (Modulo gives the remainder)\n```"
    },
    {
      heading: "Relational Operators",
      body: "Used to compare two values. They return 1 (true) if the comparison is correct, and 0 (false) otherwise. Common operators include ==, !=, <, >, <=, >=.\n\nExample:\n```c\nint a = 5, b = 10;\nprintf(\"%d\", a == b); // Outputs 0 (false)\nprintf(\"%d\", a < b);  // Outputs 1 (true)\n```"
    },
    {
      heading: "Logical Operators",
      body: "Used to combine multiple conditions. The operators are && (logical AND), || (logical OR), and ! (logical NOT).\n\nExample:\n```c\nint age = 20;\n// True only if BOTH conditions are true\nif (age >= 18 && age < 30) {\n    printf(\"Young Adult\");\n}\n```"
    },
    {
      heading: "Assignment Operators",
      body: "Used to assign values to variables. Compound assignment operators (+=, -=, *=, /=) perform an operation and assign the result simultaneously.\n\nExample:\n```c\nint x = 10;\nx += 5; // Equivalent to: x = x + 5;\n// x is now 15\n```"
    },
    {
      heading: "Increment/Decrement Operators",
      body: "The ++ and -- operators add or subtract 1 from a variable. They can be used as prefix (++x) or postfix (x++).\n\nExample:\n```c\nint count = 5;\ncount++; // count becomes 6\n--count; // count becomes 5 again\n```"
    },
    {
      heading: "Bitwise Operators",
      body: "Used to perform operations at the binary bit level. Includes AND (&), OR (|), XOR (^), NOT (~), Left Shift (<<), and Right Shift (>>).\n\nExample:\n```c\nint a = 5;      // 0101 in binary\nint b = a << 1; // Shifts left by 1 bit: 1010 (which is 10)\n```"
    },
    {
      heading: "Sizeof Operator",
      body: "The `sizeof` operator returns the size (in bytes) of a variable or data type. It is crucial for dynamic memory allocation later on.\n\nExample:\n```c\nint memoryNeeded = sizeof(int); // Usually returns 4 bytes\n```"
    }
  ],
  code: `#include <stdio.h>

int main() {
    int a = 15;
    int b = 4;

    // 1. Arithmetic & Modulo
    printf("Addition: %d\\n", a + b);
    printf("Modulo (remainder): %d\\n", a % b); // 15 divided by 4 leaves 3

    // 2. Relational & Logical combined
    // (a > 10) is true, and (b > 5) is false. 
    // True && False evaluates to False (0)
    if (a > 10 && b > 5) {
        printf("Both conditions are true.\\n");
    } else {
        printf("One or both conditions are false.\\n");
    }

    // 3. Increment / Compound Assignment
    b++;      // b is now 5
    a += 10;  // a is now 25
    printf("After increment: a=%d, b=%d\\n", a, b);

    // 4. Sizeof
    printf("Size of int: %zu bytes\\n", sizeof(a));

    return 0;
}`
};