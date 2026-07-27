export const CHAPTER10_DRAG = [
  {
    instructions: "Arrange the typical transaction lifecycle for Introduction to SQL.",
    lines: [
      { id: "1", text: "BEGIN TRANSACTION" },
      { id: "2", text: "UPDATE Departments SET ..." },
      { id: "4", text: "COMMIT TRANSACTION" },
      { id: "3", text: "Log changes to write-ahead log" }
    ],
    order: ["1", "2", "3", "4"]
  },
  {
    instructions: "Arrange the typical transaction lifecycle for Introduction to SQL.",
    lines: [
      { id: "4", text: "COMMIT TRANSACTION" },
      { id: "1", text: "BEGIN TRANSACTION" },
      { id: "2", text: "UPDATE Enrollments SET ..." },
      { id: "3", text: "Log changes to write-ahead log" }
    ],
    order: ["1", "2", "3", "4"]
  }
];