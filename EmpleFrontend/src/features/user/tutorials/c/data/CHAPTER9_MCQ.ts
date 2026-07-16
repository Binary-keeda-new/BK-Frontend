export const CHAPTER9_MCQ = [
  {
    q: "What is the output of the following code? \n```c\nchar str[] = \"GATE\";\nprintf(\"%lu\", sizeof(str));\n``` **GATE 2011**",
    options: ["4", "5", "8", "Compiler Error"],
    ans: 1,
    explanation: "The sizeof operator includes the null terminator `\\0`, so the size of \"GATE\" is 4 characters plus 1 null terminator, which is 5."
  },
  {
    q: "Which function is used to compare two strings in C?",
    options: ["stringcmp()", "strcmp()", "compare()", "strcompare()"],
    ans: 1,
    explanation: "`strcmp()` is the standard library function defined in `<string.h>` used to compare two strings."
  },
  {
    q: "Consider the following code:\n```c\nchar *p = \"Hello\";\nchar q[] = \"Hello\";\n```\nWhich of the following statements is true? **GATE 2005**",
    options: ["Both p and q can be modified", "Neither p nor q can be modified", "p can be modified, but q cannot", "q can be modified, but p cannot"],
    ans: 3,
    explanation: "`q` is an array initialized with \"Hello\", so its contents can be modified. `p` is a pointer to a string literal in read-only memory, so modifying the string it points to leads to undefined behavior."
  },
  {
    q: "What does the `strlen()` function return?",
    options: ["The number of characters including the null terminator", "The number of characters excluding the null terminator", "The size of the array holding the string", "The memory address of the first character"],
    ans: 1,
    explanation: "`strlen()` calculates the length of a given string up to, but not including, the null terminator."
  },
  {
    q: "What is the output of the following code snippet?\n```c\nchar s1[] = \"abc\";\nchar s2[] = \"abc\";\nif(s1 == s2)\n    printf(\"Equal\");\nelse\n    printf(\"Unequal\");\n``` **GATE 2010**",
    options: ["Equal", "Unequal", "Syntax Error", "Undefined Behavior"],
    ans: 1,
    explanation: "The `==` operator compares the base addresses of the two arrays `s1` and `s2`, which are stored in different memory locations. Therefore, it prints \"Unequal\"."
  },
  {
    q: "Which format specifier is used to read a string containing spaces using `scanf`?",
    options: ["%s", "%c", "%[^\\n]", "%d"],
    ans: 2,
    explanation: "`%[^\\n]` inside `scanf` tells it to read characters until a newline is encountered, allowing it to read strings with spaces."
  },
  {
    q: "What happens if the destination array is too small when using `strcpy()`?",
    options: ["The string is truncated", "A runtime error or buffer overflow occurs", "Compilation error", "The array automatically resizes"],
    ans: 1,
    explanation: "C does not perform bounds checking. If the destination array is too small, `strcpy()` writes past the end of the array, causing a buffer overflow and undefined behavior."
  },
  {
    q: "What is the output of the following code?\n```c\nchar str[10] = \"C\";\nprintf(\"%lu %lu\", strlen(str), sizeof(str));\n```",
    options: ["1 1", "1 10", "2 10", "2 2"],
    ans: 1,
    explanation: "`strlen(str)` is 1 because there is only one character 'C' before the null terminator. `sizeof(str)` is 10 because the array size was explicitly declared as 10."
  },
  {
    q: "Which of the following functions appends one string to another?",
    options: ["stradd()", "strcat()", "strcpy()", "strappend()"],
    ans: 1,
    explanation: "`strcat()` stands for string concatenate and is used to append the source string to the destination string."
  },
  {
    q: "What will be printed by the following code?\n```c\nchar str[] = \"Exam\";\nprintf(\"%c\", str[4]);\n``` **GATE 2004**",
    options: ["m", "Garbage value", "Null character (nothing printed visible)", "Compilation Error"],
    ans: 2,
    explanation: "`str[4]` accesses the 5th element of the array, which is the null terminator `\\0` automatically added at the end of the string literal."
  }
];
