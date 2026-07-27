export const CHAPTER28_DRAG = [
  {
    instructions: "Arrange the typical transaction lifecycle for Database Security and Authorization.",
    lines: [
      { id: "4", text: "COMMIT TRANSACTION" },
      { id: "3", text: "Log changes to write-ahead log" },
      { id: "2", text: "UPDATE Orders SET ..." },
      { id: "1", text: "BEGIN TRANSACTION" }
    ],
    order: ["1", "2", "3", "4"]
  },
  {
    instructions: "Arrange the typical transaction lifecycle for Database Security and Authorization.",
    lines: [
      { id: "1", text: "BEGIN TRANSACTION" },
      { id: "2", text: "UPDATE Courses SET ..." },
      { id: "3", text: "Log changes to write-ahead log" },
      { id: "4", text: "COMMIT TRANSACTION" }
    ],
    order: ["1", "2", "3", "4"]
  }
];