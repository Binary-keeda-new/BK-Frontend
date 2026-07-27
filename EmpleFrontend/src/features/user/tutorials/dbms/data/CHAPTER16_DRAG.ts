export const CHAPTER16_DRAG = [
  {
    instructions: "Arrange the logical steps to design the Inventory schema for Views, Indexes and Sequences.",
    lines: [
      { id: "3", text: "Normalize to 3NF" },
      { id: "2", text: "Create ER Diagram" },
      { id: "1", text: "Gather Requirements" },
      { id: "5", text: "Create Indexes" },
      { id: "4", text: "Write CREATE TABLE statements" }
    ],
    order: ["1", "2", "3", "4", "5"]
  },
  {
    instructions: "Arrange the typical transaction lifecycle for Views, Indexes and Sequences.",
    lines: [
      { id: "1", text: "BEGIN TRANSACTION" },
      { id: "2", text: "UPDATE Enrollments SET ..." },
      { id: "4", text: "COMMIT TRANSACTION" },
      { id: "3", text: "Log changes to write-ahead log" }
    ],
    order: ["1", "2", "3", "4"]
  }
];