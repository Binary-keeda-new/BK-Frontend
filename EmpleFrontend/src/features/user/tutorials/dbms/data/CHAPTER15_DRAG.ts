export const CHAPTER15_DRAG = [
  {
    instructions: "Arrange the typical transaction lifecycle for Subqueries and Advanced SQL Queries.",
    lines: [
      { id: "3", text: "Log changes to write-ahead log" },
      { id: "4", text: "COMMIT TRANSACTION" },
      { id: "1", text: "BEGIN TRANSACTION" },
      { id: "2", text: "UPDATE Orders SET ..." }
    ],
    order: ["1", "2", "3", "4"]
  },
  {
    instructions: "Arrange the typical transaction lifecycle for Subqueries and Advanced SQL Queries.",
    lines: [
      { id: "1", text: "BEGIN TRANSACTION" },
      { id: "2", text: "UPDATE Transactions SET ..." },
      { id: "4", text: "COMMIT TRANSACTION" },
      { id: "3", text: "Log changes to write-ahead log" }
    ],
    order: ["1", "2", "3", "4"]
  }
];