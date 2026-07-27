export const CHAPTER12_DRAG = [
  {
    instructions: "Order the operations of Merge Sort (Divide & Conquer).",
    lines: [
      { id: "1", text: "Check base case (l < r)" },
      { id: "2", text: "Merge the two sorted halves" },
      { id: "3", text: "Recursively sort the left half [l..m]" },
      { id: "4", text: "Recursively sort the right half [m+1..r]" },
      { id: "5", text: "Calculate middle index m" }
    ],
    order: ["1", "5", "3", "4", "2"]
  },
  {
    instructions: "Arrange the steps inside the Merge procedure.",
    lines: [
      { id: "1", text: "Allocate memory for temporary arrays L and R" },
      { id: "2", text: "Copy any remaining elements from L or R" },
      { id: "3", text: "Compare elements and copy smallest back to original array" },
      { id: "4", text: "Calculate sizes of two subarrays" },
      { id: "5", text: "Copy data into temporary arrays" }
    ],
    order: ["4", "1", "5", "3", "2"]
  }
];