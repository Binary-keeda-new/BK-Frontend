export const CHAPTER4_COMPLETE = [
  {
    instruction: "Complete the formula for Case 1 of the Master Theorem. T(n) = Θ(________)",
    template: `// If f(n) = O(n^c) where c < log_b(a)
// Then the time complexity is:
T(n) = Θ(n^________);`,
    answer: "log_b(a)",
    blanks: ["log_b(a)"]
  },
  {
    instruction: "Complete the recurrence relation for Binary Search.",
    template: `// Binary search recursively calls itself on half the array
// and does a constant O(1) comparison.
T(n) = ________ * T(n/2) + O(1);`,
    answer: "1",
    blanks: ["1"]
  }
];