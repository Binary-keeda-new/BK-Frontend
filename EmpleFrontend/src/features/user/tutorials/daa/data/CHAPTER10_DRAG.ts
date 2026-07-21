export const CHAPTER10_DRAG = [
  {
    instructions: "Arrange the steps to perform one complete pass of Selection Sort.",
    lines: [
      { id: "1", text: "1. Set the first unsorted element as the initial minimum." },
      { id: "2", text: "2. Iterate through the remaining unsorted elements." },
      { id: "3", text: "3. If a smaller element is found, update the minimum index." },
      { id: "4", text: "4. After checking all elements, swap the minimum with the first unsorted element." },
      { id: "5", text: "5. The boundary between sorted and unsorted moves right by one." }
    ],
    order: ["1", "2", "3", "4", "5"]
  },
  {
    instructions: "Arrange the state of the array [8, 3, 5, 2] after each pass of Selection Sort.",
    lines: [
      { id: "1", text: "Initial: [8, 3, 5, 2]" },
      { id: "2", text: "Pass 1 (min is 2, swap 8): [2, 3, 5, 8]" },
      { id: "3", text: "Pass 2 (min is 3, no swap): [2, 3, 5, 8]" },
      { id: "4", text: "Pass 3 (min is 5, no swap): [2, 3, 5, 8]" }
    ],
    order: ["1", "2", "3", "4"]
  }
];