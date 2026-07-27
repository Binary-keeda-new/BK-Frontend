export const CHAPTER11_DRAG = [
  {
    instructions: "Arrange the steps for a single iteration of Insertion Sort.",
    lines: [
      { id: "1", text: "Insert 'key' into the correct empty slot" },
      { id: "2", text: "Expand the sorted portion boundary" },
      { id: "3", text: "Compare 'key' with elements in the sorted portion" },
      { id: "4", text: "Shift elements that are greater than 'key' to the right" },
      { id: "5", text: "Pick the next element as the 'key'" }
    ],
    order: ["5", "3", "4", "1", "2"]
  },
  {
    instructions: "Order the properties of Insertion Sort from most to least applicable.",
    lines: [
      { id: "1", text: "Excellent for small datasets" },
      { id: "2", text: "Adaptive (O(n) best case)" },
      { id: "3", text: "Online (can sort as it receives data)" },
      { id: "4", text: "Stable (maintains relative order)" }
    ],
    order: ["1", "2", "3", "4"]
  }
];