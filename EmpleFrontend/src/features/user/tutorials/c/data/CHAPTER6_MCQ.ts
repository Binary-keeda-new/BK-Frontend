// CHAPTER6_MCQ.ts
export const CHAPTER6_MCQ = [
  {
    q: "Which loop is guaranteed to execute its block of code at least once? **GATE 2010**",
    options: [
      "for loop",
      "while loop",
      "do-while loop",
      "None of the above"
    ],
    ans: 2,
    explanation: "The `do-while` loop evaluates its condition after the loop body has executed, meaning the body will always run at least one time regardless of the condition."
  },
  {
    q: "What is the output of the following C code?\n```c\nint i = 0;\nwhile (i < 3) {\n    printf(\"%d\", i);\n    i++;\n}\n``` **GATE 2010**",
    options: [
      "012",
      "123",
      "0123",
      "Syntax error"
    ],
    ans: 0,
    explanation: "The loop runs for i=0, i=1, and i=2. When i becomes 3, the condition (i < 3) is false, and the loop terminates. Therefore, it prints 012."
  },
  {
    q: "Which of the following is a valid infinite loop in C? **GATE 2017**",
    options: [
      "for(;;)",
      "while(1)",
      "do{}while(1);",
      "All of the above"
    ],
    ans: 3,
    explanation: "All three constructs correctly form an infinite loop in C. `for(;;)` has empty condition which defaults to true, and `1` evaluates to true in C."
  },
  {
    q: "What does the `break` statement do when placed inside a loop? **GATE 2014**",
    options: [
      "It skips the current iteration and goes to the next.",
      "It terminates the loop immediately.",
      "It pauses the program.",
      "It exits the entire program."
    ],
    ans: 1,
    explanation: "The `break` statement immediately breaks out of the innermost enclosing loop or switch statement."
  },
  {
    q: "What does the `continue` statement do when placed inside a loop? **GATE 2004**",
    options: [
      "It terminates the loop immediately.",
      "It restarts the program.",
      "It skips the remaining statements in the current iteration and proceeds to the next iteration.",
      "It breaks out of nested loops."
    ],
    ans: 2,
    explanation: "The `continue` statement jumps to the evaluation of the loop condition (or increment in a for loop), effectively skipping the rest of the current iteration."
  },
  {
    q: "Consider the following code:\n```c\nfor (int i = 0; i < 5; i++);\n    printf(\"%d\", i);\n``` **GATE 2008**",
    options: [
      "01234",
      "5",
      "Compilation error",
      "Undefined behavior"
    ],
    ans: 2,
    explanation: "Because `int i` is declared inside the `for` loop, its scope is restricted to the loop. The semicolon `;` immediately after the loop makes the loop body empty. The `printf` tries to access `i` outside its scope, causing a compilation error."
  },
  {
    q: "How many times will this loop execute?\n```c\nint x = 5;\nwhile (x == 5) {\n    printf(\"Hello\");\n    x = 4;\n}\n``` **GATE 2005**",
    options: [
      "0",
      "1",
      "5",
      "Infinite"
    ],
    ans: 1,
    explanation: "The condition `x == 5` is true initially, so the loop runs once. Inside, `x` is set to 4, so the condition becomes false on the next check."
  },
  {
    q: "In a `for` loop, which part is executed first and only once? **GATE 2004**",
    options: [
      "The condition",
      "The increment/decrement",
      "The initialization",
      "The loop body"
    ],
    ans: 2,
    explanation: "The initialization expression of a `for` loop is executed only once when the loop begins."
  },
  {
    q: "What is the missing part to print 10, 8, 6, 4, 2?\n```c\nfor (int i = 10; i > 0; ____) {\n    printf(\"%d \", i);\n}\n``` **GATE 2006**",
    options: [
      "i--",
      "i = i - 1",
      "i -= 2",
      "i / 2"
    ],
    ans: 2,
    explanation: "The sequence decreases by 2 each time, so the decrement step must be `i -= 2` or `i = i - 2`."
  },
  {
    q: "Can a `while` loop be completely converted into a `for` loop? **GATE 2012**",
    options: [
      "Yes, always.",
      "No, never.",
      "Only if the number of iterations is known.",
      "Only if it doesn't contain a break statement."
    ],
    ans: 0,
    explanation: "Any `while` loop can be converted to a `for` loop by leaving the initialization and increment sections blank, e.g., `for (; condition; ) { ... }`."
  }
];
