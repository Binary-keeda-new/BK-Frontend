export const CHAPTER10_DRAG = [
  {
    instructions: "Arrange the steps for a single pass of Selection Sort.",
    lines: [
      { id: "1", text: "If a smaller element is found, update the minimum index" },
      { id: "2", text: "Swap the found minimum with the first unsorted element" },
      { id: "3", text: "Assume the first unsorted element is the minimum" },
      { id: "4", text: "Scan the remaining unsorted elements" },
      { id: "5", text: "Advance the boundary of the sorted array" }
    ],
    order: ["3", "4", "1", "2", "5"]
  },
  {
    instructions: "Order the properties of Selection Sort.",
    lines: [
      { id: "1", text: "Is inherently an unstable sort" },
      { id: "2", text: "Never makes more than O(n) swaps" },
      { id: "3", text: "Useful when memory write is a costly operation" },
      { id: "4", text: "Always runs in O(n^2) time regardless of input" }
    ],
    order: ["2", "3", "4", "1"]
  }
];