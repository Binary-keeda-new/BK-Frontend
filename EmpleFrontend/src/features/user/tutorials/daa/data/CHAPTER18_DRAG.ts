export const CHAPTER18_DRAG = [
  {
    instructions: "Arrange the general steps to solve a problem using Bottom-Up Dynamic Programming.",
    lines: [
      { id: "1", text: "1. Define the state representing the subproblems (e.g., dp[i])." },
      { id: "2", text: "2. Identify the base cases and initialize the DP table." },
      { id: "3", text: "3. Formulate the state transition relation (how a state depends on previous states)." },
      { id: "4", text: "4. Iterate through the table from smallest to largest subproblems, filling it." },
      { id: "5", text: "5. Return the value in the table corresponding to the main problem." }
    ],
    order: ["1", "2", "3", "4", "5"]
  },
  {
    instructions: "Match the concept to its paradigm: (1) Memoization, (2) Tabulation, (3) Greedy.",
    lines: [
      { id: "1", text: "1. Top-Down recursion with caching." },
      { id: "2", text: "2. Bottom-Up iteration using an array/table." },
      { id: "3", text: "3. Making the locally optimal choice without looking back." }
    ],
    order: ["1", "2", "3"]
  }
];