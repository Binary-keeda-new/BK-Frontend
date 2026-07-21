// CHAPTER4_CONTENT.ts
export const CHAPTER4_CONTENT = {
  title: "Input/Output in C",
  description: `A program isn't very useful if it can't interact with the outside world! Standard Input and Output (I/O) operations allow your C program to be dynamic, reading data directly from the user's keyboard and printing formatted results back to the screen. Provided by the essential <stdio.h> standard library, functions like printf() and scanf() are your gateway to interaction. In this chapter, we'll dive deep into format specifiers, buffer flushing, and the subtle differences between various input functions to make your programs truly interactive.`,
  points: [
    {
      heading: "printf() Function",
      body: "The `printf()` function is used to output text and variables to the console. It requires format specifiers to know how to display different data types.\n\nExample:\n```c\nint score = 95;\nprintf(\"Your score is %d!\\n\", score);\n```"
    },
    {
      heading: "scanf() Function",
      body: "The `scanf()` function reads formatted input from the standard input (keyboard). You MUST use the `&` (address-of) operator before the variable name so `scanf` knows where to store the data in memory.\n\nExample:\n```c\nint age;\nprintf(\"Enter age: \");\nscanf(\"%d\", &age); // & sends the memory address of 'age'\n```"
    },
    {
      heading: "Format Specifiers",
      body: "Format specifiers begin with `%` and determine the type of data being read or printed: `%d` (int), `%f` (float), `%c` (char), `%s` (string).\n\nExample:\n```c\nfloat pi = 3.14;\nprintf(\"Value of pi is %.2f\", pi); // %.2f restricts to 2 decimal places\n```"
    },
    {
      heading: "Single Character I/O",
      body: "For reading and writing single characters efficiently without formatting, you can use `getchar()` and `putchar()`.\n\nExample:\n```c\nchar ch = getchar(); // Waits for user to type one character\nputchar(ch);         // Prints that character\n```"
    },
    {
      heading: "String Input: gets() vs fgets()",
      body: "While `scanf` stops reading strings at the first space, `fgets()` reads an entire line including spaces safely. (Never use the outdated `gets()` as it is unsafe and causes buffer overflows).\n\nExample:\n```c\nchar name[50];\nfgets(name, sizeof(name), stdin); // Safely reads a full name\n```"
    },
    {
      heading: "Buffer Flushing",
      body: "Standard output (`stdout`) is typically line-buffered. This means text might not appear on the screen immediately until a newline (`\\n`) is printed. You can manually force the buffer to print using `fflush(stdout)`.\n\nExample:\n```c\nprintf(\"Processing...\");\nfflush(stdout); // Forces \"Processing...\" to display immediately\n```"
    },
    {
      heading: "Return Values of I/O Functions",
      body: "Both `printf()` and `scanf()` return integer values. `printf` returns the number of characters printed, while `scanf` returns the number of items successfully read and assigned. This is very useful for input validation.\n\nExample:\n```c\nint age;\nint read_count = scanf(\"%d\", &age);\nif (read_count != 1) {\n    printf(\"Invalid input. Expected an integer.\\n\");\n}\n```"
    }
  ],
  code: `#include <stdio.h>

int main() {
    int age;
    float weight;
    char initial;

    // 1. Reading a single character
    printf("Enter your first initial: ");
    scanf("%c", &initial);

    // 2. Reading an integer
    printf("Enter your age: ");
    scanf("%d", &age); // The '&' is critically important here!

    // 3. Reading a float
    printf("Enter your weight in kg: ");
    scanf("%f", &weight);

    // 4. Outputting all the formatted data
    printf("\\n--- Profile ---\\n");
    printf("Initial: %c\\n", initial);
    printf("Age: %d years\\n", age);
    printf("Weight: %.2f kg\\n", weight); // Limits to 2 decimal places

    return 0;
}`
};