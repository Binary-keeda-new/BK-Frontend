// CHAPTER3_MCQ.ts
export const CHAPTER3_MCQ = [
  {
    q: "What is the output of `5 / 2` in C? **GATE 2010**",
    options: ["2.5", "2", "3", "Error"],
    ans: 1,
    explanation: "Division between two integers truncates the decimal part, so 5 / 2 results in 2."
  },
  {
    q: "Which operator is used to find the remainder of a division? **GATE 2008**",
    options: ["/", "%", "//", "mod"],
    ans: 1,
    explanation: "The modulus operator `%` returns the remainder of an integer division."
  },
  {
    q: "In C, what does the expression `(10 == 10)` evaluate to? **GATE 2014**",
    options: ["true", "1", "0", "false"],
    ans: 1,
    explanation: "Relational operators return 1 for true and 0 for false. C does not have built-in boolean keywords before C99."
  },
  {
    q: "What is the result of `0 && 5`? **GATE 2018**",
    options: ["1", "5", "0", "Error"],
    ans: 2,
    explanation: "The Logical AND `&&` returns true (1) only if both operands are non-zero. Since the first is 0, the result is 0."
  },
  {
    q: "Which operator is a Ternary operator? **GATE 2017**",
    options: ["?:", "::", "->", "++"],
    ans: 0,
    explanation: "The conditional operator `? :` is the only operator in C that takes three operands."
  },
  {
    q: "If `int x = 5; int y = x++;`, what is the value of `y`? **GATE 2015**",
    options: ["4", "5", "6", "Garbage"],
    ans: 1,
    explanation: "Postfix `x++` assigns the current value of x (5) to y first, and then increments x to 6."
  },
  {
    q: "What is the associativity of the assignment operator `=`? **GATE 2022**",
    options: ["Left to Right", "Right to Left", "None", "Top to Bottom"],
    ans: 1,
    explanation: "Assignment evaluates from right to left, which is why `a = b = c;` assigns c to b, and then b to a."
  },
  {
    q: "What does the `sizeof` operator return? **GATE 2018**",
    options: ["Size in bits", "Size in bytes", "Length of a string", "Memory address"],
    ans: 1,
    explanation: "`sizeof` returns the amount of memory allocated for a variable or data type in bytes."
  },
  {
    q: "Which bitwise operator shifts bits to the left? **GATE 2005**",
    options: ["<<", ">>", "^", "~"],
    ans: 0,
    explanation: "The `<<` operator shifts bits to the left, effectively multiplying the number by 2 for each shift."
  },
  {
    q: "What is the value of `int a = (1, 2, 3);`? **GATE 2011**",
    options: ["1", "2", "3", "Syntax Error"],
    ans: 2,
    explanation: "The comma operator evaluates from left to right and returns the value of the rightmost expression, which is 3."
  }
];
export default CHAPTER3_MCQ;
