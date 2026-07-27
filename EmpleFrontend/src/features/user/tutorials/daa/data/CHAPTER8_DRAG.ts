export const CHAPTER8_DRAG = [
  {
    instructions: "Order the algorithmic paradigms used in sorting.",
    lines: [
      { id: "1", text: "Iterative Comparison (e.g., Bubble, Selection)" },
      { id: "2", text: "Divide and Conquer (e.g., Merge, Quick Sort)" },
      { id: "3", text: "Incremental Insertion (e.g., Insertion Sort)" },
      { id: "4", text: "Non-Comparison Counting (e.g., Radix, Counting Sort)" }
    ],
    order: ["1", "3", "2", "4"]
  },
  {
    instructions: "Match the sorting terminology from most to least memory-efficient.",
    lines: [
      { id: "1", text: "Iterative Sorting (O(1) but variable overhead)" },
      { id: "2", text: "Out-of-place Sorting (O(n) auxiliary array)" },
      { id: "3", text: "Recursive Sorting (O(log n) call stack)" },
      { id: "4", text: "In-place Sorting (O(1) auxiliary space)" }
    ],
    order: ["4", "1", "3", "2"]
  }
];