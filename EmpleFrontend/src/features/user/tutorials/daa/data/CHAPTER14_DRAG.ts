export const CHAPTER14_DRAG = [
  {
    instructions: "Arrange the steps to perform Heap Sort on an unsorted array.",
    lines: [
      { id: "1", text: "1. Treat the array as a complete binary tree." },
      { id: "2", text: "2. Build a Max-Heap by calling heapify from the bottom up." },
      { id: "3", text: "3. Swap the root (maximum element) with the last element of the heap." },
      { id: "4", text: "4. Reduce the conceptual size of the heap by 1." },
      { id: "5", text: "5. Call heapify on the new root to restore the Max-Heap property. Repeat." }
    ],
    order: ["1", "2", "3", "4", "5"]
  },
  {
    instructions: "Arrange the nodes representing the path to the root from node at index 5 in a 0-indexed array.",
    lines: [
      { id: "1", text: "Node at index 5 (Child)" },
      { id: "2", text: "Node at index 2 (Parent of 5)" },
      { id: "3", text: "Node at index 0 (Root, Parent of 2)" }
    ],
    order: ["1", "2", "3"]
  }
];