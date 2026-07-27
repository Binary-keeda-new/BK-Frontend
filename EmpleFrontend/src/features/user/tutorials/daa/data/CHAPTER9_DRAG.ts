export const CHAPTER9_DRAG = [
  {
    instructions: "Arrange the phases of a single pass of Bubble Sort.",
    lines: [
      { id: "1", text: "Compare adjacent elements arr[j] and arr[j+1]" },
      { id: "2", text: "Largest element bubbles to the end" },
      { id: "3", text: "Swap if they are in the wrong order" },
      { id: "4", text: "Start at the first element" },
      { id: "5", text: "Move to the next adjacent pair" }
    ],
    order: ["4", "1", "3", "5", "2"]
  },
  {
    instructions: "Order the iterations for array [3, 2, 1] using Bubble Sort.",
    lines: [
      { id: "1", text: "Pass 2: Swap 2,1 -> [1, 2, 3]" },
      { id: "2", text: "Pass 3: No swaps, sorted!" },
      { id: "3", text: "Initial Array: [3, 2, 1]" },
      { id: "4", text: "Pass 1: Swap 3,2 -> Swap 3,1 -> [2, 1, 3]" }
    ],
    order: ["3", "4", "1", "2"]
  }
];