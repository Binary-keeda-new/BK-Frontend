export const CHAPTER14_DRAG = [
  {
    instructions: "Order the phases of Heap Sort.",
    lines: [
      { id: "1", text: "Interpret the array as a binary tree" },
      { id: "2", text: "Swap root (max) with the last element" },
      { id: "3", text: "Heapify the root to restore Max Heap property" },
      { id: "4", text: "Build a Max Heap (O(n))" },
      { id: "5", text: "Reduce heap size by 1" }
    ],
    order: ["1", "4", "2", "5", "3"]
  },
  {
    instructions: "Arrange the node calculations for a 0-indexed binary heap.",
    lines: [
      { id: "1", text: "Left Child Node: 2*i + 1" },
      { id: "2", text: "Parent Node: (i - 1) / 2" },
      { id: "3", text: "Last Non-Leaf Node: (n / 2) - 1" },
      { id: "4", text: "Right Child Node: 2*i + 2" }
    ],
    order: ["2", "1", "4", "3"]
  }
];