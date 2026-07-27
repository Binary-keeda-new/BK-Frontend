// CHAPTER7_MCQ.ts
export const CHAPTER7_MCQ = [
  {
    q: "What is the return type of a function that does not return any value? **GATE 2005**",
    "options": ["int", "null", "void", "empty"],
    "ans": 2,
    "explanation": "In C, 'void' is used as a return type to specify that the function does not return a value."
  },
  {
    q: "Which of the following is true about function prototypes? **GATE 2004**",
    "options": [
      "They are mandatory for all functions.",
      "They tell the compiler about the function's name, return type, and parameters.",
      "They define the actual body of the function.",
      "They must be written inside the main function."
    ],
    "ans": 1,
    "explanation": "A prototype provides the compiler with information about a function's signature before its actual definition is encountered."
  },
  {
    q: "What happens when you pass arguments to a function by value? **GATE 2004**",
    "options": [
      "The actual variable's memory address is passed.",
      "A copy of the variable is passed to the function.",
      "Changes inside the function affect the original variable.",
      "The function cannot modify the copied value at all."
    ],
    "ans": 1,
    "explanation": "In call by value, a copy of the actual argument is created. Modifying this copy does not affect the original variable in the caller function."
  },
  {
    q: "What is the output of the following code?\n```c\nvoid foo(int x) { x = 10; }\nint main() {\n    int y = 5;\n    foo(y);\n    printf(\"%d\", y);\n    return 0;\n}\n``` **GATE 2008**",
    "options": ["10", "5", "0", "Compilation Error"],
    "ans": 1,
    "explanation": "Because 'y' is passed by value, the assignment 'x = 10' inside 'foo' modifies the local copy 'x', not 'y'. Thus, 'y' remains 5."
  },
  {
    q: "How do you pass a variable by reference in C? **GATE 2006**",
    "options": [
      "By passing the variable's name.",
      "By passing the variable with a reference keyword.",
      "By passing the variable's memory address using pointers.",
      "C does not support call by reference natively."
    ],
    "ans": 2,
    "explanation": "C natively achieves call by reference by passing memory addresses using pointers (e.g., passing '&var' and receiving it as '*ptr')."
  },
  {
    q: "What is essential for a recursive function to prevent a stack overflow? **GATE 2014**",
    "options": [
      "A static variable",
      "A loop structure",
      "A base case",
      "A global variable"
    ],
    "ans": 2,
    "explanation": "A base case is a terminating condition that stops the recursive calls. Without it, the function will call itself infinitely, leading to a stack overflow."
  },
  {
    q: "What is the scope of a variable declared inside a function? **GATE 2011**",
    "options": [
      "It can be accessed anywhere in the program.",
      "It can only be accessed within the function where it is declared.",
      "It can be accessed by all functions in the same file.",
      "It remains in memory even after the program terminates."
    ],
    "ans": 1,
    "explanation": "Variables declared inside a function have local scope; they are created when the function is called and destroyed when it exits."
  },
  {
    q: "What does the `static` keyword do when applied to a local variable in a function? **GATE 2010**",
    "options": [
      "It makes the variable global.",
      "It prevents the variable from being modified.",
      "It retains the variable's value between consecutive function calls.",
      "It initializes the variable to a random garbage value."
    ],
    "ans": 2,
    "explanation": "A static local variable is initialized only once and retains its value between function calls, instead of being destroyed and recreated."
  },
  {
    q: "What is the default return type of a function in C if none is specified? (Historically in C89/C90) **GATE 2018**",
    "options": ["void", "int", "char", "float"],
    "ans": 1,
    "explanation": "In older C standards like C89/C90, if no return type is specified, the compiler assumes it returns an 'int'. (Though modern C99+ requires explicit typing)."
  },
  {
    q: "Which of the following functions is a standard library function in C? **GATE 2008**",
    "options": ["main()", "printf()", "myFunc()", "calculate()"],
    "ans": 1,
    "explanation": "printf() is a standard library function declared in <stdio.h>. main() is user-defined but required, while myFunc and calculate are strictly user-defined."
  }
];
