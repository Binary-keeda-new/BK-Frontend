// CHAPTER7_CONTENT.ts
export const CHAPTER7_CONTENT = {
  title: "Functions",
  description: `Pointers are arguably the most powerful—and most notorious—feature in the C programming language. Unlike standard variables that store values, pointers store raw memory addresses. While they can be intimidating at first, pointers unlock the true potential of C: direct hardware manipulation, dynamic memory allocation, and ultra-efficient array and string handling. In this chapter, we will demystify pointers, explore pointer arithmetic, and learn how to safely navigate your computer's memory space.`,
  points: [
    {
      heading: "Function Declaration & Definition",
      body: "A function must be declared (or prototyped) before it is used, and defined somewhere in the program. The declaration tells the compiler about the function's name, return type, and parameters.\n\nExample:\n```c\n// Declaration (Prototype)\nint add(int a, int b);\n\n// Definition\nint add(int a, int b) {\n    return a + b;\n}\n```"
    },
    {
      heading: "Calling a Function",
      body: "To use a function, you call it by passing the required arguments. The program execution jumps to the function, executes it, and returns to the calling point.\n\nExample:\n```c\nint result = add(5, 3); // Calling the function\nprintf(\"Result is %d\", result);\n```"
    },
    {
      heading: "Arguments and Return Values",
      body: "Functions can take inputs (arguments) and return an output (return value). If a function doesn't return anything, its return type is `void`.\n\nExample:\n```c\nvoid greet(char name[]) {\n    printf(\"Hello, %s!\\n\", name);\n}\n```"
    },
    {
      heading: "Call by Value",
      body: "In C, arguments are passed by value by default. This means a copy of the actual value is passed to the function. Modifying the parameter inside the function does not affect the original variable.\n\nExample:\n```c\nvoid change(int x) {\n    x = 10; // Only changes the local copy\n}\n```"
    },
    {
      heading: "Call by Reference",
      body: "To modify the original variable, you must pass its memory address (reference) using pointers. The function can then modify the value at that address.\n\nExample:\n```c\nvoid changeReal(int *x) {\n    *x = 10; // Changes the actual variable in memory\n}\n```"
    },
    {
      heading: "Recursion",
      body: "A function that calls itself is known as a recursive function. It must always have a **base case** to stop the recursion; otherwise, it will crash the program with a Stack Overflow.\n\nExample:\n```c\nint factorial(int n) {\n    if (n <= 1) return 1; // Base case\n    return n * factorial(n - 1);\n}\n```"
    },
    {
      heading: "Scope of Variables (Local & Global)",
      body: "Variables declared inside a function are **local** to that function and cannot be accessed outside. Variables declared outside all functions are **global** and can be accessed anywhere.\n\nExample:\n```c\nint globalVar = 100; // Accessible everywhere\n\nvoid func() {\n    int localVar = 50; // Only accessible inside func()\n}\n```"
    },
    {
      heading: "Static Variables",
      body: "A `static` local variable retains its value between multiple function calls. It is initialized only once when the function is first called.\n\nExample:\n```c\nvoid counter() {\n    static int count = 0; // Initialized once\n    count++;\n    printf(\"%d \", count);\n}\n```"
    }
  ],
  code: `#include <stdio.h>

// Function Prototypes
void greet();
int multiply(int x, int y);
void increment(int *val);
int sumTo(int n);

int main() {
    // Basic call
    greet();

    // Call with arguments and return
    int res = multiply(4, 5);
    printf("4 * 5 = %d\\n", res);

    // Call by reference
    int num = 10;
    increment(&num);
    printf("After increment: %d\\n", num);

    // Recursion
    printf("Sum to 3: %d\\n", sumTo(3));

    return 0;
}

// Definitions
void greet() {
    printf("Hello from function!\\n");
}

int multiply(int x, int y) {
    return x * y;
}

void increment(int *val) {
    (*val)++;
}

int sumTo(int n) {
    if (n == 0) return 0;
    return n + sumTo(n - 1);
}`
};