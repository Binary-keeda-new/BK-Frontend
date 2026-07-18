export const CHAPTER14_MCQ = [
  {
    q: "What is the output of `5 & 3` in C? **GATE 2018**",
    options: ["1", "3", "5", "7"],
    ans: 0,
    explanation: "5 is 0101 in binary, and 3 is 0011. 0101 & 0011 = 0001, which is 1 in decimal."
  },
  {
    q: "Which operator is used to perform a bitwise XOR operation in C? **GATE 2015**",
    options: ["|", "&", "~", "^"],
    ans: 3,
    explanation: "The caret `^` symbol represents the bitwise XOR operator in C."
  },
  {
    q: "What is the result of the expression `16 >> 2`? **GATE 2019**",
    options: ["8", "4", "32", "64"],
    ans: 1,
    explanation: "Right shifting by 2 is equivalent to dividing by 2^2 (which is 4). 16 / 4 = 4. In binary: 10000 >> 2 = 00100 (4)."
  },
  {
    q: "How can you clear the nth bit of an integer `x`? **GATE 2020**",
    options: ["x |= (1 << n);", "x &= ~(1 << n);", "x ^= (1 << n);", "x &= (1 << n);"],
    ans: 1,
    explanation: "To clear a bit, we use the bitwise AND operator with a mask that has a 0 at the nth bit and 1s elsewhere. `~(1 << n)` creates this mask."
  },
  {
    q: "What does the expression `x & (x - 1)` typically achieve? **GATE 2016**",
    options: ["Sets the rightmost unset bit", "Clears the rightmost set bit", "Toggles all bits", "Checks if a number is negative"],
    ans: 1,
    explanation: "The expression `x & (x - 1)` unsets the rightmost set bit in the integer `x`. This is commonly used in algorithms like Brian Kernighan's for counting set bits."
  },
  {
    q: "What is the one's complement of 0 in a 32-bit system? **GATE 2017**",
    options: ["0", "1", "-1", "255"],
    ans: 2,
    explanation: "0 in binary is all 0s. The bitwise NOT `~0` flips all bits to 1s. In two's complement representation, all 1s represents -1."
  },
  {
    q: "Which of the following expressions sets the 4th bit (0-indexed) of a variable `num`? **GATE 2021**",
    options: ["num | 4", "num & (1 << 4)", "num |= (1 << 4)", "num ^= (1 << 4)"],
    ans: 2,
    explanation: "`1 << 4` creates a mask with only the 4th bit set. `num |= (1 << 4)` sets that bit in `num`."
  },
  {
    q: "If `a = 10` (1010 in binary) and `b = 6` (0110 in binary), what is `a ^ b`? **GATE 2014**",
    options: ["12", "4", "8", "14"],
    ans: 0,
    explanation: "XOR returns 1 if bits are different. 1010 ^ 0110 = 1100, which is 12 in decimal."
  },
  {
    q: "What will be the output of `printf(\"%d\", 2 << 3);`? **GATE 2022**",
    options: ["8", "16", "32", "64"],
    ans: 1,
    explanation: "Left shifting 2 by 3 positions is equivalent to 2 * (2^3) = 2 * 8 = 16. In binary: 0010 << 3 = 10000 (16)."
  },
  {
    q: "How do you check if a number is a power of 2 using bitwise operators? **GATE 2013**",
    options: ["(x & (x - 1)) == 0", "(x & (x + 1)) == 0", "(x ^ (x - 1)) == 0", "(x | (x - 1)) == 0"],
    ans: 0,
    explanation: "If a number is a power of 2, it has exactly one bit set. Subtracting 1 flips all bits after that set bit. So `x & (x - 1)` will be 0."
  }
];
