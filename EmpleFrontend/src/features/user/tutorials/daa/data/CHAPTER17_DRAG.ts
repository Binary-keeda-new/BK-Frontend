export const CHAPTER17_DRAG = [
  {
    instructions: "Arrange the steps to solve the Fractional Knapsack problem using a Greedy approach.",
    lines: [
      { id: "1", text: "1. Calculate the value/weight ratio for every item." },
      { id: "2", text: "2. Sort the items in descending order based on this ratio." },
      { id: "3", text: "3. Iterate through the sorted items." },
      { id: "4", text: "4. If an item fits fully, add its full value and subtract its weight from capacity." },
      { id: "5", text: "5. If it doesn't fit fully, add the fractional value that fits and terminate." }
    ],
    order: ["1", "2", "3", "4", "5"]
  },
  {
    instructions: "Arrange the properties required for a Greedy Algorithm to work.",
    lines: [
      { id: "1", text: "Optimal Substructure: The optimal solution contains optimal solutions to subproblems." },
      { id: "2", text: "Greedy Choice Property: A global optimum can be reached by making a local optimum choice." },
      { id: "3", text: "Result: The greedy algorithm is guaranteed to find the global optimum." }
    ],
    order: ["1", "2", "3"]
  }
];