export const CHAPTER9_DRAG = [
  {
    instructions: "Arrange the steps to perform one complete pass of Bubble Sort.",
    lines: [
      { id: "1", text: "1. Start at the first element (index 0)." },
      { id: "2", text: "2. Compare the current element with the next element." },
      { id: "3", text: "3. If the current element is greater, swap them." },
      { id: "4", text: "4. Move to the next adjacent pair and repeat." },
      { id: "5", text: "5. Stop when you reach the end of the unsorted portion." }
    ],
    order: ["1", "2", "3", "4", "5"]
  },
  {
    instructions: "Arrange the state of the array [4, 2, 5, 1] after each swap during the first pass of Bubble Sort.",
    lines: [
      { id: "1", text: "Initial: [4, 2, 5, 1]" },
      { id: "2", text: "Swap 1 (4,2): [2, 4, 5, 1]" },
      { id: "3", text: "Swap 2 (5,1): [2, 4, 1, 5] (End of Pass 1)" }
    ],
    order: ["1", "2", "3"]
  }
];