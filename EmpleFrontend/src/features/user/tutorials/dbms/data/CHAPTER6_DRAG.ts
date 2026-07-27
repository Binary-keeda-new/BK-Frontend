export const CHAPTER6_DRAG = [
  {
    instructions: "Arrange the typical transaction lifecycle for Relational Model.",
    lines: [
      { id: "3", text: "Log changes to write-ahead log" },
      { id: "4", text: "COMMIT TRANSACTION" },
      { id: "2", text: "UPDATE Inventory SET ..." },
      { id: "1", text: "BEGIN TRANSACTION" }
    ],
    order: ["1", "2", "3", "4"]
  },
  {
    instructions: "Arrange the SQL execution order for a complex query on Products.",
    lines: [
      { id: "2", text: "WHERE condition" },
      { id: "6", text: "ORDER BY column" },
      { id: "1", text: "FROM Products" },
      { id: "3", text: "GROUP BY column" },
      { id: "4", text: "HAVING condition" },
      { id: "5", text: "SELECT columns" }
    ],
    order: ["1", "2", "3", "4", "5", "6"]
  }
];