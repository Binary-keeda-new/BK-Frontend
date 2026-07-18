export const CHAPTER15_MCQ = [
  {
    q: "Which of the following is true about preprocessor directives in C? **GATE 2018**",
    options: [
      "They are executed by the compiler.",
      "They must always end with a semicolon.",
      "They are processed before the compilation of the code begins.",
      "They allocate memory for variables during compile time."
    ],
    ans: 2,
    explanation: "Preprocessor directives are processed by the preprocessor before the actual compilation process begins. They manipulate the source code text."
  },
  {
    q: "Consider the following macro definition: `#define SQUARE(x) x * x`. What will be the output of `SQUARE(3 + 2)`? **GATE 2015**",
    options: ["25", "11", "10", "Error"],
    ans: 1,
    explanation: "The macro expands to 3 + 2 * 3 + 2. According to operator precedence, multiplication is evaluated first: 3 + (2 * 3) + 2 = 3 + 6 + 2 = 11."
  },
  {
    q: "What is the purpose of the `#ifndef` directive? **GATE 2012**",
    options: [
      "To check if a macro is defined.",
      "To check if a file is included.",
      "To define a macro only if it has not been defined yet.",
      "To undefine a macro."
    ],
    ans: 2,
    explanation: "`#ifndef` stands for 'if not defined'. It checks if a macro is not yet defined, allowing you to define it. It is commonly used in include guards."
  },
  {
    q: "Which of the following preprocessor directives is used to generate a compile-time error message? **GATE 2020**",
    options: ["#warning", "#error", "#pragma error", "#throw"],
    ans: 1,
    explanation: "The `#error` directive is used to produce a compiler error message and halt the compilation process."
  },
  {
    q: "What is the difference between `#include <file.h>` and `#include \"file.h\"`? **GATE 2017**",
    options: [
      "There is no difference.",
      "`<file.h>` searches only standard system directories, while `\"file.h\"` searches the current directory first.",
      "`<file.h>` searches the current directory first, while `\"file.h\"` searches standard system directories.",
      "`<file.h>` is for C++ and `\"file.h\"` is for C."
    ],
    ans: 1,
    explanation: "Angle brackets instruct the preprocessor to search for the header in standard system directories. Double quotes tell it to search in the directory of the current source file first, then system directories."
  },
  {
    q: "What is the output of `#define MACRO(a, b) a##b` when called with `MACRO(12, 34)`? **GATE 2016**",
    options: ["12 34", "1234", "46", "Compile time error"],
    ans: 1,
    explanation: "The `##` operator is the token pasting operator in C. It concatenates two tokens into one. Thus, `12` and `34` become the single token `1234`."
  },
  {
    q: "Which directive is used to remove a macro definition? **GATE 2014**",
    options: ["#remove", "#delete", "#undef", "#clear"],
    ans: 2,
    explanation: "The `#undef` directive is used to undefine a previously defined macro."
  },
  {
    q: "In conditional compilation, which directive must always be used to terminate an `#if` or `#ifdef` block? **GATE 2019**",
    options: ["#end", "#endif", "#stop", "#close"],
    ans: 1,
    explanation: "Every conditional compilation block starting with `#if`, `#ifdef`, or `#ifndef` must be properly closed with an `#endif` directive."
  },
  {
    q: "Which operator in a macro definition converts a macro argument into a string constant? **GATE 2021**",
    options: ["##", "#", "$", "@"],
    ans: 1,
    explanation: "The `#` operator, also known as the stringizing operator, converts a macro argument into a string literal."
  },
  {
    q: "What happens if a preprocessor directive is placed inside a function body? **GATE 2013**",
    options: [
      "It causes a compilation error.",
      "It is ignored by the preprocessor.",
      "It works normally, as directives are independent of C scope rules.",
      "It only affects the code within that function."
    ],
    ans: 2,
    explanation: "Preprocessor directives are processed before the compiler even sees the code, so they do not follow C scope rules. They apply from the point they appear until the end of the file."
  }
];
