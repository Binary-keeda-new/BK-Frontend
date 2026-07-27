export const CHAPTER13_DRAG = [
  {
    instructions: "Order the execution steps of Quick Sort.",
    lines: [
      { id: "1", text: "Partition array so smaller elements are on the left" },
      { id: "2", text: "Recursively apply to left and right subarrays" },
      { id: "3", text: "Place pivot in its correct sorted position" },
      { id: "4", text: "Select a pivot element" },
      { id: "5", text: "Partition array so larger elements are on the right" }
    ],
    order: ["4", "1", "5", "3", "2"]
  },
  {
    instructions: "Arrange the variables tracking the Lomuto Partition scheme.",
    lines: [
      { id: "1", text: "'high' stores the pivot element" },
      { id: "2", text: "'i' tracks the boundary of smaller elements" },
      { id: "3", text: "Swap pivot with arr[i+1] at the end" },
      { id: "4", text: "'j' iterates through the array" },
      { id: "5", text: "Swap arr[i] and arr[j] when arr[j] < pivot" }
    ],
    order: ["1", "4", "2", "5", "3"]
  }
];