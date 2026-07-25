export const CHAPTER22_DEBUG = [
  {
    instructions: "The grouping query for Deadlocks has an invalid HAVING usage.",
    buggy: "SELECT Status, COUNT(*) FROM Suppliers HAVING Status > 0 GROUP BY Status;",
    fixed: "SELECT Status, COUNT(*) FROM Suppliers GROUP BY Status HAVING Status > 0;",
    hints: ["HAVING must come after GROUP BY."],
    expectedOutput: "Status | COUNT(*)\nType A | 12\nType B | 8"
  },
  {
    instructions: "Fix the wildcards in this search query for Deadlocks.",
    buggy: "SELECT * FROM Shipments WHERE Name LIKE '500*';",
    fixed: "SELECT * FROM Shipments WHERE Name LIKE '500%';",
    hints: ["SQL uses % instead of * for multiple character wildcards."],
    expectedOutput: "Name | Result\n500_1 | Match\n500_2 | Match"
  },
  {
    instructions: "Fix the wildcards in this search query for Deadlocks.",
    buggy: "SELECT * FROM Employees WHERE Status LIKE 'Engineering*';",
    fixed: "SELECT * FROM Employees WHERE Status LIKE 'Engineering%';",
    hints: ["SQL uses % instead of * for multiple character wildcards."],
    expectedOutput: "Status | Result\nEngineering_1 | Match\nEngineering_2 | Match"
  }
];