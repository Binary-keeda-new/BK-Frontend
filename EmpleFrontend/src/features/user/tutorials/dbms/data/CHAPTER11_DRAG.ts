export const CHAPTER11_DRAG = [
  {
    instructions: "Arrange the SQL execution order for a complex query on Shipments.",
    lines: [
      { id: "1", text: "FROM Shipments" },
      { id: "6", text: "ORDER BY column" },
      { id: "4", text: "HAVING condition" },
      { id: "2", text: "WHERE condition" },
      { id: "5", text: "SELECT columns" },
      { id: "3", text: "GROUP BY column" }
    ],
    order: ["1", "2", "3", "4", "5", "6"]
  },
  {
    instructions: "Arrange the SQL execution order for a complex query on Courses.",
    lines: [
      { id: "1", text: "FROM Courses" },
      { id: "2", text: "WHERE condition" },
      { id: "6", text: "ORDER BY column" },
      { id: "3", text: "GROUP BY column" },
      { id: "5", text: "SELECT columns" },
      { id: "4", text: "HAVING condition" }
    ],
    order: ["1", "2", "3", "4", "5", "6"]
  }
];