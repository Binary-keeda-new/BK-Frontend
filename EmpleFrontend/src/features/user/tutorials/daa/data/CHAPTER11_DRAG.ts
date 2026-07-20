export const CHAPTER11_DRAG = [
  {
    instructions: "Arrange the steps to perform one iteration (inserting one element) in Insertion Sort.",
    lines: [
      { id: "1", text: "1. Select the first unsorted element as the 'key'." },
      { id: "2", text: "2. Compare the 'key' with elements in the sorted portion from right to left." },
      { id: "3", text: "3. If a sorted element is greater than the 'key', shift it right." },
      { id: "4", text: "4. Repeat shifting until you find a smaller element or reach the start." },
      { id: "5", text: "5. Place the 'key' in the newly vacated space." }
    ],
    order: ["1", "2", "3", "4", "5"]
  },
  {
    instructions: "Arrange the array states as the number '2' is inserted into the sorted portion [4, 5, 8].",
    lines: [
      { id: "1", text: "Initial state: [4, 5, 8, 2]" },
      { id: "2", text: "Shift 8 right: [4, 5, _, 8] (key=2)" },
      { id: "3", text: "Shift 5 right: [4, _, 5, 8] (key=2)" },
      { id: "4", text: "Shift 4 right: [_, 4, 5, 8] (key=2)" },
      { id: "5", text: "Insert key: [2, 4, 5, 8]" }
    ],
    order: ["1", "2", "3", "4", "5"]
  }
];