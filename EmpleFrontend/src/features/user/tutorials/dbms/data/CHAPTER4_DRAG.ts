export const CHAPTER4_DRAG = [
  {
    instructions: "Arrange the SQL execution order for a complex query on Students.",
    lines: [
      { id: "4", text: "HAVING condition" },
      { id: "5", text: "SELECT columns" },
      { id: "3", text: "GROUP BY column" },
      { id: "2", text: "WHERE condition" },
      { id: "1", text: "FROM Students" },
      { id: "6", text: "ORDER BY column" }
    ],
    order: ["1", "2", "3", "4", "5", "6"]
  },
  {
    instructions: "Arrange the typical transaction lifecycle for Entity-Relationship Model.",
    lines: [
      { id: "1", text: "BEGIN TRANSACTION" },
      { id: "4", text: "COMMIT TRANSACTION" },
      { id: "3", text: "Log changes to write-ahead log" },
      { id: "2", text: "UPDATE Suppliers SET ..." }
    ],
    order: ["1", "2", "3", "4"]
  }
];