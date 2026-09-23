export const CHAPTER2_DEBUG = [
  {
    instructions: "Fix the function calculating powers of 2 to avoid overflow.",
    buggy: "long long power_of_two(int n) {\n    return 1 << n;\n}",
    fixed: "long long power_of_two(int n) {\n    return 1LL << n;\n}",
    hints: ["1 is a 32-bit integer by default.", "Use 1LL to shift as a 64-bit integer."],
    expectedOutput: "Correct power of 2 calculated."
  },
  {
    instructions: "Correct the logarithm base 2 calculation.",
    buggy: "int log2_floor(int n) {\n    int res = 0;\n    while(n > 0) {\n        res++;\n        n >>= 1;\n    }\n    return res;\n}",
    fixed: "int log2_floor(int n) {\n    int res = 0;\n    while(n > 1) {\n        res++;\n        n >>= 1;\n    }\n    return res;\n}",
    hints: ["The while loop goes one step too far.", "For n=1, log2(1) should be 0, but the bug returns 1."],
    expectedOutput: "Correct floor of log2 returned."
  },
  {
    instructions: "Fix the parity check (even/odd) using bitwise operators.",
    buggy: "bool is_even(int n) {\n    return (n & 1) == 1;\n}",
    fixed: "bool is_even(int n) {\n    return (n & 1) == 0;\n}",
    hints: ["If n & 1 is 1, the number is odd.", "Even numbers have a 0 in their least significant bit."],
    expectedOutput: "Correctly identifies even numbers."
  }
];