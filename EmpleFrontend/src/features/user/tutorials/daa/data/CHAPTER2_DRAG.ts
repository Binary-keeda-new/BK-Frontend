export const CHAPTER2_DRAG = [
  {
    instructions: "Arrange the functions from slowest growing (smallest) to fastest growing (largest) as N approaches infinity.",
    lines: [
      { id: "1", text: "O(1) - Constant" },
      { id: "2", text: "O(log n) - Logarithmic" },
      { id: "3", text: "O(n) - Linear" },
      { id: "4", text: "O(n^2) - Quadratic" },
      { id: "5", text: "O(2^n) - Exponential" }
    ],
    order: ["1", "2", "3", "4", "5"]
  },
  {
    instructions: "Assemble the correct bitwise equivalent for calculating 2^N (2 to the power of N) in C.",
    lines: [
      { id: "1", text: "int powerOfTwo(int n) {" },
      { id: "2", text: "  // Left shifting 1 by n bits is equivalent to 1 * 2^n" },
      { id: "3", text: "  int result = 1 << n;" },
      { id: "4", text: "  return result;" },
      { id: "5", text: "}" }
    ],
    order: ["1", "2", "3", "4", "5"]
  }
];