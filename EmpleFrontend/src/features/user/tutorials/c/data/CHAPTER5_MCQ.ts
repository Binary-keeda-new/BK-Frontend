// CHAPTER5_MCQ.ts
export const CHAPTER5_MCQ = [
  {
    q: "What is the purpose of the `break` statement inside a `switch` block? **GATE 2006**",
    options: ["To exit the program", "To jump to the default case", "To exit the switch block immediately", "To pause execution"],
    ans: 2,
    explanation: "The break statement terminates the execution of the switch block, preventing fall-through to the next cases."
  },
  {
    q: "What happens if you omit the `break` statement in a matching `switch` case? **GATE 2017**",
    options: ["Compilation Error", "Infinite loop", "It falls through and executes the next cases", "It skips the default case"],
    ans: 2,
    explanation: "In C, switch statements fall through by default, meaning execution continues down into the following cases until a break is hit."
  },
  {
    q: "Which data types are allowed as the condition in a `switch` statement? **GATE 2022**",
    options: ["float and double", "int and char", "strings and arrays", "any type"],
    ans: 1,
    explanation: "A switch statement condition can only evaluate to integral types like int, char, and enum. Floating-point and strings are not allowed."
  },
  {
    q: "What does an `if` statement consider as 'true'? **GATE 2014**",
    options: ["Only the number 1", "Any non-zero value", "Only boolean variables", "Any positive value"],
    ans: 1,
    explanation: "In C, any non-zero value (positive or negative) evaluates to true. Only 0 evaluates to false."
  },
  {
    q: "Can you use an `else` block without a preceding `if` block? **GATE 2022**",
    options: ["Yes, if there is a switch", "Yes, it acts as a default", "No, it causes a syntax error", "No, it causes a runtime error"],
    ans: 2,
    explanation: "An `else` block is strictly bound to a preceding `if` block. Using it on its own results in a compilation error."
  },
  {
    q: "What is the primary drawback of using the `goto` statement? **GATE 2019**",
    options: ["It is too slow", "It causes syntax errors", "It creates 'spaghetti code' that is hard to maintain", "It doesn't work in C"],
    ans: 2,
    explanation: "While valid, `goto` makes execution jump unpredictably, making the logic incredibly difficult to trace and debug."
  },
  {
    q: "In an `else if` ladder, how many blocks will execute if multiple conditions are true? **GATE 2011**",
    options: ["All of them", "None of them", "Only the first one that evaluates to true", "The last one"],
    ans: 2,
    explanation: "An `else if` ladder stops evaluating as soon as it finds the first true condition, executing only that specific block."
  },
  {
    q: "What is a nested `if` statement? **GATE 2004**",
    options: ["An if inside an if", "Multiple ifs in a row", "An if inside a switch", "An if without an else"],
    ans: 0,
    explanation: "Nesting refers to placing an `if` block completely inside the body of another `if` or `else` block."
  },
  {
    q: "Which operator provides a shorthand for a simple `if-else` statement? **GATE 2018**",
    options: ["Conditional (Ternary)", "Comma", "Logical AND", "Bitwise OR"],
    ans: 0,
    explanation: "The ternary operator `condition ? true_val : false_val` serves as a concise shorthand for if-else assignments."
  },
  {
    q: "Is the `default` case mandatory in a `switch` statement? **GATE 2017**",
    options: ["Yes, always", "No, it is entirely optional", "Yes, but only if there are more than 3 cases", "No, but it must be placed at the very top if used"],
    ans: 1,
    explanation: "The `default` case is optional. If no cases match and there is no default, the switch block simply does nothing."
  }
];
export default CHAPTER5_MCQ;
