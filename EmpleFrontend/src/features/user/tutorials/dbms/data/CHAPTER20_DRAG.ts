export const CHAPTER20_DRAG = [
  {
    instructions: "Arrange the SQL execution order for a complex query on Products.",
    lines: [
      { id: "5", text: "SELECT columns" },
      { id: "3", text: "GROUP BY column" },
      { id: "6", text: "ORDER BY column" },
      { id: "4", text: "HAVING condition" },
      { id: "2", text: "WHERE condition" },
      { id: "1", text: "FROM Products" }
    ],
    order: ["1", "2", "3", "4", "5", "6"]
  },
  {
    instructions: "Arrange the typical transaction lifecycle for Concurrency Control.",
    lines: [
      { id: "1", text: "BEGIN TRANSACTION" },
      { id: "2", text: "UPDATE Enrollments SET ..." },
      { id: "3", text: "Log changes to write-ahead log" },
      { id: "4", text: "COMMIT TRANSACTION" }
    ],
    order: ["1", "2", "3", "4"]
  }
];