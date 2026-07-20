export const CHAPTER5_DRAG = [
  {
    instructions: "Arrange the steps to perform a standard Binary Search.",
    lines: [
      { id: "1", text: "1. Find the middle element of the array." },
      { id: "2", text: "2. If the middle element matches the target, return its index." },
      { id: "3", text: "3. If the target is less than the middle, search the left half." },
      { id: "4", text: "4. If the target is greater, search the right half." },
      { id: "5", text: "5. Repeat until the target is found or search space is empty." }
    ],
    order: ["1", "2", "3", "4", "5"]
  },
  {
    instructions: "Arrange the time complexities of searching an array from fastest (best case) to slowest (worst case).",
    lines: [
      { id: "1", text: "O(1) - Binary Search Best Case" },
      { id: "2", text: "O(log n) - Binary Search Worst Case" },
      { id: "3", text: "O(n) - Linear Search Worst Case" }
    ],
    order: ["1", "2", "3"]
  }
];