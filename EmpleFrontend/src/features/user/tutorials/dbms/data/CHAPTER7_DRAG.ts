export const CHAPTER7_DRAG = [
  {
    instructions: "Arrange the SQL execution order for a complex query on Transactions.",
    lines: [
      { id: "3", text: "GROUP BY column" },
      { id: "2", text: "WHERE condition" },
      { id: "6", text: "ORDER BY column" },
      { id: "4", text: "HAVING condition" },
      { id: "1", text: "FROM Transactions" },
      { id: "5", text: "SELECT columns" }
    ],
    order: ["1", "2", "3", "4", "5", "6"]
  },
  {
    instructions: "Arrange the SQL execution order for a complex query on Inventory.",
    lines: [
      { id: "3", text: "GROUP BY column" },
      { id: "2", text: "WHERE condition" },
      { id: "6", text: "ORDER BY column" },
      { id: "5", text: "SELECT columns" },
      { id: "1", text: "FROM Inventory" },
      { id: "4", text: "HAVING condition" }
    ],
    order: ["1", "2", "3", "4", "5", "6"]
  }
];