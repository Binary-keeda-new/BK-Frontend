export const CHAPTER16_DRAG = [
  {
    instructions: "Arrange the phases of the Divide and Conquer paradigm.",
    lines: [
      { id: "1", text: "1. DIVIDE the problem into smaller subproblems of the same type." },
      { id: "2", text: "2. CONQUER the subproblems by solving them recursively." },
      { id: "3", text: "3. When subproblems are small enough, solve them directly (Base Case)." },
      { id: "4", text: "4. COMBINE the solutions of the subproblems to form the final solution." }
    ],
    order: ["1", "2", "3", "4"]
  },
  {
    instructions: "Match the algorithm to its Divide and Conquer time complexity recurrence.",
    lines: [
      { id: "1", text: "Binary Search: T(n) = T(n/2) + O(1)" },
      { id: "2", text: "Merge Sort: T(n) = 2T(n/2) + O(n)" },
      { id: "3", text: "Strassen's: T(n) = 7T(n/2) + O(n^2)" }
    ],
    order: ["1", "2", "3"]
  }
];