export const CHAPTER25_DRAG = [
  {
    instructions: "Arrange the logical steps to design the Orders schema for File Organization and Storage.",
    lines: [
      { id: "1", text: "Gather Requirements" },
      { id: "2", text: "Create ER Diagram" },
      { id: "5", text: "Create Indexes" },
      { id: "4", text: "Write CREATE TABLE statements" },
      { id: "3", text: "Normalize to 3NF" }
    ],
    order: ["1", "2", "3", "4", "5"]
  },
  {
    instructions: "Arrange the SQL execution order for a complex query on Products.",
    lines: [
      { id: "5", text: "SELECT columns" },
      { id: "3", text: "GROUP BY column" },
      { id: "6", text: "ORDER BY column" },
      { id: "2", text: "WHERE condition" },
      { id: "1", text: "FROM Products" },
      { id: "4", text: "HAVING condition" }
    ],
    order: ["1", "2", "3", "4", "5", "6"]
  }
];