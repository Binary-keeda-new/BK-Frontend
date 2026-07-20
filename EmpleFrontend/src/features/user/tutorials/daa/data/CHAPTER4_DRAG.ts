export const CHAPTER4_DRAG = [
  {
    instructions: "Arrange the steps to solve a recurrence relation using the Substitution Method.",
    lines: [
      { id: "1", text: "1. Guess the form of the solution (e.g., O(n log n))" },
      { id: "2", text: "2. Assume the guess is true for smaller values (k < n)" },
      { id: "3", text: "3. Substitute the assumption into the original recurrence" },
      { id: "4", text: "4. Prove the inequality algebraically for n" },
      { id: "5", text: "5. Find constants c and n0 to formalize the bound" }
    ],
    order: ["1", "2", "3", "4", "5"]
  },
  {
    instructions: "Identify the complexity of these recurrence relations in increasing order of running time.",
    lines: [
      { id: "1", text: "T(n) = T(n/2) + O(1)" },
      { id: "2", text: "T(n) = T(n-1) + O(1)" },
      { id: "3", text: "T(n) = 2T(n/2) + O(n)" },
      { id: "4", text: "T(n) = 4T(n/2) + O(n)" },
      { id: "5", text: "T(n) = 2T(n-1) + O(1)" }
    ],
    order: ["1", "2", "3", "4", "5"]
  }
];