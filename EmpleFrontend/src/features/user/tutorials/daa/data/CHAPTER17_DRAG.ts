export const CHAPTER17_DRAG = [
  {
    instructions: "Order the steps for solving a problem using Dynamic Programming.",
    lines: [
      { id: "1", text: "Identify the Base Cases" },
      { id: "2", text: "Choose Memoization or Tabulation" },
      { id: "3", text: "Extract the final answer from the DP table" },
      { id: "4", text: "Define the State variables" },
      { id: "5", text: "Formulate the State Transition relation" }
    ],
    order: ["4", "5", "1", "2", "3"]
  },
  {
    instructions: "Contrast the features of Memoization vs Tabulation by mapping the workflow.",
    lines: [
      { id: "1", text: "Start from the target state (Top-Down)" },
      { id: "2", text: "Iteratively build up to the target state" },
      { id: "3", text: "Start from the base cases (Bottom-Up)" },
      { id: "4", text: "Recursively break into subproblems" }
    ],
    order: ["1", "4", "3", "2"]
  }
];