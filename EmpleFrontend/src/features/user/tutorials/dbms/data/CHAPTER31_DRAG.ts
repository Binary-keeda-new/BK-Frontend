export const CHAPTER31_DRAG = [
  {
    instructions: "Arrange the SQL execution order for a complex query on Students.",
    lines: [
      { id: "6", text: "ORDER BY column" },
      { id: "3", text: "GROUP BY column" },
      { id: "2", text: "WHERE condition" },
      { id: "5", text: "SELECT columns" },
      { id: "1", text: "FROM Students" },
      { id: "4", text: "HAVING condition" }
    ],
    order: ["1", "2", "3", "4", "5", "6"]
  },
  {
    instructions: "Arrange the typical transaction lifecycle for Database Design and Case Studies.",
    lines: [
      { id: "2", text: "UPDATE Accounts SET ..." },
      { id: "1", text: "BEGIN TRANSACTION" },
      { id: "3", text: "Log changes to write-ahead log" },
      { id: "4", text: "COMMIT TRANSACTION" }
    ],
    order: ["1", "2", "3", "4"]
  }
];