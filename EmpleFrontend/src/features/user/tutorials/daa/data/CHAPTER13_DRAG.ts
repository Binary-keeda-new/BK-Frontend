export const CHAPTER13_DRAG = [
  {
    instructions: "Arrange the steps to perform Quick Sort.",
    lines: [
      { id: "1", text: "1. Choose an element as a pivot (e.g., the last element)." },
      { id: "2", text: "2. Partition the array so all elements smaller than the pivot are to its left." },
      { id: "3", text: "3. Place the pivot in its final sorted position." },
      { id: "4", text: "4. Recursively call Quick Sort on the left sub-array." },
      { id: "5", text: "5. Recursively call Quick Sort on the right sub-array." }
    ],
    order: ["1", "2", "3", "4", "5"]
  },
  {
    instructions: "Arrange the time complexities of Quick Sort from fastest to slowest.",
    lines: [
      { id: "1", text: "O(n log n) - Best Case (Pivot is the median)" },
      { id: "2", text: "O(n log n) - Average Case (Pivot is random)" },
      { id: "3", text: "O(n^2) - Worst Case (Array is already sorted, pivot is last element)" }
    ],
    order: ["1", "2", "3"]
  }
];