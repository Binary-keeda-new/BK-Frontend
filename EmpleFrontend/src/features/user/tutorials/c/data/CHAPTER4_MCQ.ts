// CHAPTER4_MCQ.ts
export const CHAPTER4_MCQ = [
  {
    q: "Which header file is strictly required to use `printf()` and `scanf()`? **GATE 2015**",
    options: ["<conio.h>", "<stdlib.h>", "<stdio.h>", "<math.h>"],
    ans: 2,
    explanation: "Standard Input Output (stdio.h) contains the declarations for basic I/O functions like printf and scanf."
  },
  {
    q: "What is the correct format specifier to print a memory address? **GATE 2004**",
    options: ["%d", "%m", "%p", "%a"],
    ans: 2,
    explanation: "The `%p` format specifier is used to print pointer values (memory addresses), usually in hexadecimal format."
  },
  {
    q: "What does `%.3f` do in a printf statement? **GATE 2018**",
    options: ["Prints 3 floats", "Rounds the float to 3 decimal places", "Prints the float 3 times", "Adds 3 spaces before the float"],
    ans: 1,
    explanation: "The `.3` precision modifier tells printf to output exactly 3 digits after the decimal point."
  },
  {
    q: "Why does `scanf(\"%s\", name);` not require the `&` operator? **GATE 2010**",
    options: ["scanf automatically adds it", "Strings are global", "An array name acts as a pointer to its first element", "It's a compiler bug"],
    ans: 2,
    explanation: "In C, the name of an array automatically evaluates to the memory address of its first element, so `&` is redundant."
  },
  {
    q: "Which function is best for reading a string that contains spaces (like a full name)? **GATE 2008**",
    options: ["scanf(\"%s\")", "gets()", "fgets()", "getchar()"],
    ans: 2,
    explanation: "`fgets()` is safe and reads until a newline, whereas `scanf` stops at the first space. `gets()` is deprecated because it is unsafe and causes buffer overflows."
  },
  {
    q: "What is the purpose of the `\\n` escape sequence? **GATE 2017**",
    options: ["Null character", "Next variable", "Newline", "No operation"],
    ans: 2,
    explanation: "`\\n` moves the cursor to the beginning of the next line on the screen."
  },
  {
    q: "What happens if you type \"Hello World\" into `scanf(\"%s\", str);`? **GATE 2018**",
    options: ["str becomes 'Hello World'", "str becomes 'Hello'", "str becomes 'World'", "The program crashes"],
    ans: 1,
    explanation: "scanf with `%s` stops reading at the first whitespace character it encounters."
  },
  {
    q: "Which function automatically appends a newline character `\\n` after printing a string? **GATE 2004**",
    options: ["printf()", "puts()", "putchar()", "fprintf()"],
    ans: 1,
    explanation: "`puts()` prints a string and automatically adds a newline at the end, making it convenient for simple text."
  },
  {
    q: "If you want to print a literal backslash `\\`, what escape sequence should you use? **GATE 2017**",
    options: ["\\", "\\/", "\\\\", "//"],
    ans: 2,
    explanation: "Since a single backslash initiates an escape sequence, you must use a double backslash `\\\\` to print one literal backslash."
  },
  {
    q: "What does `getchar()` do? **GATE 2006**",
    options: ["Reads a string from a file", "Reads a single character from standard input", "Gets the length of a char array", "None of the above"],
    ans: 1,
    explanation: "`getchar()` reads exactly one character from the standard input buffer (usually the keyboard)."
  }
];
export default CHAPTER4_MCQ;
