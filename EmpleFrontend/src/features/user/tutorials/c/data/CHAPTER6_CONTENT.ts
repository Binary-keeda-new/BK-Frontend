// CHAPTER6_CONTENT.ts
export const CHAPTER6_CONTENT = {
  title: "Loops in C",
  description: `As your programs grow larger and more complex, writing everything inside main() becomes a nightmare to manage. Functions allow you to break down massive problems into smaller, manageable, and highly reusable blocks of code. They promote modularity, making your code easier to read, test, and debug. In this chapter, we will learn how to define and call custom functions, understand the critical difference between pass-by-value and pass-by-reference, and explore the concept of scope and recursion.`,
  points: [
    {
      heading: "The for Loop",
      body: "The `for` loop is ideal when you know exactly how many times you want to iterate. It has three parts: initialization, condition, and increment/decrement.\n\nExample:\n```c\nfor (int i = 1; i <= 5; i++) {\n    printf(\"%d \", i);\n}\n// Prints: 1 2 3 4 5 \n```"
    },
    {
      heading: "The while Loop",
      body: "The `while` loop executes its block of code as long as the condition remains true. It is best used when the number of iterations is unknown beforehand.\n\nExample:\n```c\nint i = 1;\nwhile (i <= 5) {\n    printf(\"%d \", i);\n    i++;\n}\n```"
    },
    {
      heading: "The do-while Loop",
      body: "The `do-while` loop is a variant of the while loop. It evaluates its condition at the bottom of the loop instead of the top, ensuring the code runs at least once.\n\nExample:\n```c\nint i = 10;\ndo {\n    printf(\"%d \", i);\n    i++;\n} while (i < 5);\n// Prints 10 once, then exits because 10 is not < 5\n```"
    },
    {
      heading: "Infinite Loops",
      body: "A loop becomes infinite if its condition never becomes false. This can happen by mistake, but it is sometimes used intentionally (e.g., in game engines or servers) with a `break` statement inside.\n\nExample:\n```c\nwhile (1) {\n    printf(\"Running forever...\\n\");\n    // Needs a break condition to exit\n}\n```"
    },
    {
      heading: "Nested Loops",
      body: "Loops can be placed inside other loops. The inner loop finishes all its iterations for every single iteration of the outer loop. This is commonly used for 2D arrays (matrices) or pattern printing.\n\nExample:\n```c\nfor (int i = 1; i <= 3; i++) {       // Rows\n    for (int j = 1; j <= 3; j++) {   // Columns\n        printf(\"* \");\n    }\n    printf(\"\\n\");\n}\n```"
    },
    {
      heading: "The break and continue Statements",
      body: "The `break` statement immediately terminates the loop completely.\nThe `continue` statement skips the rest of the current iteration and jumps to the next one.\n\nExample:\n```c\nfor (int i = 1; i <= 5; i++) {\n    if (i == 3) continue; // Skip 3\n    if (i == 5) break;    // Stop at 5\n    printf(\"%d \", i);\n}\n// Prints: 1 2 4 \n```"
    }
  ],
  code: `#include <stdio.h>

int main() {
    // 1. FOR LOOP
    printf("For Loop: ");
    for (int i = 1; i <= 5; i++) {
        printf("%d ", i);
    }
    printf("\\n");

    // 2. WHILE LOOP
    printf("While Loop: ");
    int w = 1;
    while (w <= 5) {
        printf("%d ", w);
        w++;
    }
    printf("\\n");

    // 3. DO-WHILE LOOP
    printf("Do-While Loop: ");
    int d = 10;
    do {
        printf("%d ", d);
        d++;
    } while (d <= 5); // Will print 10 once
    printf("\\n");

    // 4. NESTED LOOPS
    printf("Nested Loops Pattern:\\n");
    for (int i = 1; i <= 3; i++) {
        for (int j = 1; j <= i; j++) {
            printf("* ");
        }
        printf("\\n");
    }

    return 0;
}`
};