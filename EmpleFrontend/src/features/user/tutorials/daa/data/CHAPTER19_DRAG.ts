export const CHAPTER19_DRAG = [
  {
    instructions: "Match the scenario with the type of Tradeoff applied.",
    lines: [
      { id: "1", text: "Using a Hash Map for fast O(1) lookups: TRADING SPACE FOR TIME" },
      { id: "2", text: "Compressing a large video file into a ZIP: TRADING TIME FOR SPACE" },
      { id: "3", text: "Applying Memoization to a recursive function: TRADING SPACE FOR TIME" }
    ],
    order: ["1", "2", "3"]
  },
  {
    instructions: "Arrange the space complexities from most efficient (least space) to least efficient.",
    lines: [
      { id: "1", text: "O(1) - Constant (e.g., In-place sorts like Heap Sort)" },
      { id: "2", text: "O(log n) - Logarithmic (e.g., Quick Sort recursion stack)" },
      { id: "3", text: "O(n) - Linear (e.g., Merge Sort auxiliary array)" },
      { id: "4", text: "O(n^2) - Quadratic (e.g., 2D DP Table)" }
    ],
    order: ["1", "2", "3", "4"]
  }
];