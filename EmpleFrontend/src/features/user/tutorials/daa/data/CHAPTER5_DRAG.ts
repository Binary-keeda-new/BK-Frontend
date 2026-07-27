export const CHAPTER5_DRAG = [
  {
    instructions: "Order the steps of the Linear Search algorithm.",
    lines: [
      { id: "1", text: "If match found, return the index" },
      { id: "2", text: "If not match, move to next element" },
      { id: "3", text: "Compare current element with target" },
      { id: "4", text: "Start from the first element (index 0)" },
      { id: "5", text: "If end of array reached, return -1" }
    ],
    order: ["4", "3", "1", "2", "5"]
  },
  {
    instructions: "Arrange the properties of Linear Search.",
    lines: [
      { id: "1", text: "Does not require sorted data" },
      { id: "2", text: "O(1) space complexity" },
      { id: "3", text: "O(n) worst-case time complexity" },
      { id: "4", text: "Examines every element sequentially" }
    ],
    order: ["1", "4", "3", "2"]
  }
];