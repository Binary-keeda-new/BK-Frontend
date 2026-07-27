export const CHAPTER2_DRAG = [
  {
    instructions: "Arrange the typical transaction lifecycle for Database Architecture.",
    lines: [
      { id: "1", text: "BEGIN TRANSACTION" },
      { id: "2", text: "UPDATE Suppliers SET ..." },
      { id: "3", text: "Log changes to write-ahead log" },
      { id: "4", text: "COMMIT TRANSACTION" }
    ],
    order: ["1", "2", "3", "4"]
  },
  {
    instructions: "Arrange the logical steps to design the Transactions schema for Database Architecture.",
    lines: [
      { id: "4", text: "Write CREATE TABLE statements" },
      { id: "1", text: "Gather Requirements" },
      { id: "3", text: "Normalize to 3NF" },
      { id: "5", text: "Create Indexes" },
      { id: "2", text: "Create ER Diagram" }
    ],
    order: ["1", "2", "3", "4", "5"]
  }
];