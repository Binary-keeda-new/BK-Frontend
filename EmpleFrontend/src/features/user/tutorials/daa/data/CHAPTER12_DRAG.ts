export const CHAPTER12_DRAG = [
  {
    instructions: "Arrange the steps to perform Merge Sort recursively.",
    lines: [
      { id: "1", text: "1. If the array has 1 or 0 elements, return (Base Case)." },
      { id: "2", text: "2. Calculate the middle index of the array." },
      { id: "3", text: "3. Recursively call Merge Sort on the left half." },
      { id: "4", text: "4. Recursively call Merge Sort on the right half." },
      { id: "5", text: "5. Merge the two sorted halves back together." }
    ],
    order: ["1", "2", "3", "4", "5"]
  },
  {
    instructions: "Arrange the steps inside the Merge() function.",
    lines: [
      { id: "1", text: "1. Create temporary arrays L[] and R[]." },
      { id: "2", text: "2. Copy data from the main array into L[] and R[]." },
      { id: "3", text: "3. Compare elements of L[] and R[] and place the smaller one into the main array." },
      { id: "4", text: "4. Once one temp array is exhausted, copy the remaining elements from the other." }
    ],
    order: ["1", "2", "3", "4"]
  }
];