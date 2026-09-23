export const CHAPTER15_DEBUG = [
  {
    instructions: "Fix the Counting Sort array initialization",
    buggy: "let count = new Array(max).fill(0);",
    fixed: "let count = new Array(max + 1).fill(0);",
    hints: ["You need to include the max value as an index."],
    expectedOutput: "Array size max+1"
  }
];