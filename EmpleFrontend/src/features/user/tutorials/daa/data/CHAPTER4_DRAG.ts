export const CHAPTER4_DRAG = [
  {
    instructions: "Order the steps of the Substitution Method.",
    lines: [
      { id: "1", text: "Substitute into the recurrence" },
      { id: "2", text: "Assume it holds for smaller values" },
      { id: "3", text: "Guess the form of the solution" },
      { id: "4", text: "Prove the bounds via induction" }
    ],
    order: ["3", "2", "1", "4"]
  },
  {
    instructions: "Arrange the components of Master Theorem T(n) = aT(n/b) + f(n).",
    lines: [
      { id: "1", text: "'f(n)' determines cost of division and merging" },
      { id: "2", text: "Compare f(n) with n^log_b(a)" },
      { id: "3", text: "'b' determines the factor by which subproblem size shrinks" },
      { id: "4", text: "'a' determines number of subproblems" }
    ],
    order: ["4", "3", "1", "2"]
  }
];