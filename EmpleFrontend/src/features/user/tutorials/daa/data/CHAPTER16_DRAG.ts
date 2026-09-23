export const CHAPTER16_DRAG = [
  {
    instructions: "Order the steps to solve Fractional Knapsack.",
    lines: [
      { id: "1", text: "Add whole items while capacity permits" },
      { id: "2", text: "Sort items in descending order of ratio" },
      { id: "3", text: "Take fractional part of the next item to fill capacity" },
      { id: "4", text: "Subtract item weight from capacity" },
      { id: "5", text: "Calculate value/weight ratio for each item" }
    ],
    order: ["5", "2", "1", "4", "3"]
  },
  {
    instructions: "Arrange the components required to prove a Greedy algorithm is correct.",
    lines: [
      { id: "1", text: "Apply an Exchange Argument" },
      { id: "2", text: "Show the Greedy solution is as good or better" },
      { id: "3", text: "Establish Optimal Substructure" },
      { id: "4", text: "Define the Greedy Choice" },
      { id: "5", text: "Assume an optimal solution exists" }
    ],
    order: ["4", "5", "1", "2", "3"]
  }
];