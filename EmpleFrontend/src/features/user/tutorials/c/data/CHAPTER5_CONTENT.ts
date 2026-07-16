// CHAPTER5_CONTENT.ts
export const CHAPTER5_CONTENT = {
  title: "Decision Making",
  description: `By default, a computer executes code linearly, line by line. Control flow statements break this linear execution, giving your programs the intelligence to make decisions and the endurance to repeat tasks automatically. They are the true 'brain' of your code. In this chapter, you will learn how to branch your logic using if-else statements and switch cases, and how to harness the power of loops (for, while, do-while) to write highly efficient, automated, and scalable programs.`,
  points: [
    {
      heading: "The if Statement",
      body: "The simple `if` statement evaluates a condition. If the condition is true (non-zero), the block of code inside the curly braces is executed. If it's false (zero), the block is skipped.\n\nExample:\n```c\nint score = 85;\nif (score >= 50) {\n    printf(\"You passed!\\n\");\n}\n```"
    },
    {
      heading: "The if-else Statement",
      body: "An `if-else` statement provides an alternative path. If the condition in the `if` block is false, the code inside the `else` block executes instead.\n\nExample:\n```c\nint num = 10;\nif (num % 2 == 0) {\n    printf(\"Even\\n\");\n} else {\n    printf(\"Odd\\n\");\n}\n```"
    },
    {
      heading: "Nested if Statements",
      body: "You can place an `if` statement inside another `if` or `else` block. This is called nesting and is used when you need to test a secondary condition only if the first condition is met.\n\nExample:\n```c\nif (age >= 18) {\n    if (hasLicense) {\n        printf(\"Can drive\\n\");\n    }\n}\n```"
    },
    {
      heading: "The else-if Ladder",
      body: "When you have multiple distinct conditions to check in sequence, use an `else if` ladder. The program evaluates each condition from top to bottom. As soon as one condition evaluates to true, its block runs, and the rest of the ladder is skipped.\n\nExample:\n```c\nif (score >= 90) {\n    printf(\"A\\n\");\n} else if (score >= 80) {\n    printf(\"B\\n\");\n} else {\n    printf(\"C\\n\");\n}\n```"
    },
    {
      heading: "The switch Statement",
      body: "The `switch` statement is an elegant alternative to an `else if` ladder when comparing a single integer or character variable against several constant values.\n\nExample:\n```c\nint day = 3;\nswitch (day) {\n    case 1: printf(\"Monday\"); break;\n    case 2: printf(\"Tuesday\"); break;\n    case 3: printf(\"Wednesday\"); break;\n    default: printf(\"Invalid day\");\n}\n```"
    },
    {
      heading: "The break Statement",
      body: "Inside a `switch` statement, the `break` keyword stops execution and completely exits the switch block. Without a `break`, execution \"falls through\" and runs all subsequent cases, which is a very common bug.\n\nExample:\n```c\nswitch (val) {\n    case 1: \n        printf(\"One\"); \n        break; // Stops here if val is 1\n    case 2:\n        printf(\"Two\");\n}\n```"
    },
    {
      heading: "The continue Statement",
      body: "The `continue` statement skips the remaining code inside the current iteration of a loop and jumps straight to the next iteration. (It is strictly for loops, not for `switch` or raw `if` statements without a loop context).\n\nExample:\n```c\nfor (int i = 0; i < 5; i++) {\n    if (i == 2) continue; // Skips printing 2\n    printf(\"%d \", i);\n}\n// Output: 0 1 3 4\n```"
    },
    {
      heading: "The goto Statement",
      body: "The `goto` statement allows you to jump to a specific labelled line of code anywhere in the same function.\nWhile powerful, it makes code extremely hard to read and debug (known as \"spaghetti code\"), and its use is strongly discouraged.\n\nExample:\n```c\n    int i = 0;\nstart_loop:\n    if (i >= 5) goto end_loop;\n    printf(\"%d \", i);\n    i++;\n    goto start_loop;\nend_loop:\n    printf(\"Done\\n\");\n```"
    },
    {
      heading: "Ternary Operator as a Decision",
      body: "The ternary operator `? :` acts as a shorthand for simple `if-else` assignments.\n\nExample:\n```c\nint a = 10, b = 20;\nint max = (a > b) ? a : b;\nprintf(\"Max is %d\\n\", max);\n```"
    },
    {
      heading: "Nested switch Statements",
      body: "Just like `if` statements, a `switch` statement can be placed inside another `switch` statement. While syntactically legal, it can become hard to read, so it should be heavily commented and formatted carefully.\n\nExample:\n```c\nswitch (courseType) {\n    case 1: // CS\n        switch (year) {\n            case 1: printf(\"CS First Year\"); break;\n        }\n        break;\n}\n```"
    }
  ],
  code: `#include <stdio.h>

int main() {
    int score = 85;

    // else-if Ladder Example
    if (score >= 90) {
        printf("Grade: A\\n");
    } else if (score >= 80) {
        printf("Grade: B\\n");
    } else {
        printf("Grade: C\\n");
    }

    // Switch Statement Example
    char grade = 'B';
    switch (grade) {
        case 'A':
            printf("Excellent!\\n");
            break;
        case 'B':
            printf("Well done!\\n");
            break; // If missing, it will fall through to C
        case 'C':
            printf("Passed.\\n");
            break;
        default:
            printf("Invalid grade.\\n");
    }

    return 0;
}`
};
export default CHAPTER5_CONTENT;
