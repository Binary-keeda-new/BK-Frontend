export const CHAPTER5_DRAG = [
  {
    instructions: "Arrange the typical transaction lifecycle for Enhanced ER Model.",
    lines: [
      { id: "1", text: "BEGIN TRANSACTION" },
      { id: "4", text: "COMMIT TRANSACTION" },
      { id: "2", text: "UPDATE Transactions SET ..." },
      { id: "3", text: "Log changes to write-ahead log" }
    ],
    order: ["1", "2", "3", "4"]
  },
  {
    instructions: "Arrange the logical steps to design the Products schema for Enhanced ER Model.",
    lines: [
      { id: "4", text: "Write CREATE TABLE statements" },
      { id: "1", text: "Gather Requirements" },
      { id: "2", text: "Create ER Diagram" },
      { id: "5", text: "Create Indexes" },
      { id: "3", text: "Normalize to 3NF" }
    ],
    order: ["1", "2", "3", "4", "5"]
  }
];