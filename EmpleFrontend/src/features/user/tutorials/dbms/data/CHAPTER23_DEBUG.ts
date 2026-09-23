export const CHAPTER23_DEBUG = [
  {
    instructions: "Resolve the ambiguous column error in this JOIN for Timestamp and Optimistic Concurrency Control.",
    buggy: "SELECT Category FROM Inventory t1 JOIN Products t2 ON t1.id = t2.id;",
    fixed: "SELECT t1.Category FROM Inventory t1 JOIN Suppliers t2 ON t1.id = t2.id;",
    hints: ["Prefix the column with the table alias to remove ambiguity."],
    expectedOutput: "Category\nData_1\nData_2"
  },
  {
    instructions: "The grouping query for Timestamp and Optimistic Concurrency Control has an invalid HAVING usage.",
    buggy: "SELECT Date, COUNT(*) FROM Departments HAVING Date > 0 GROUP BY Date;",
    fixed: "SELECT Date, COUNT(*) FROM Departments GROUP BY Date HAVING Date > 0;",
    hints: ["HAVING must come after GROUP BY."],
    expectedOutput: "Date | COUNT(*)\nType A | 12\nType B | 8"
  },
  {
    instructions: "Fix the wildcards in this search query for Timestamp and Optimistic Concurrency Control.",
    buggy: "SELECT * FROM Transactions WHERE Category LIKE 'New York*';",
    fixed: "SELECT * FROM Transactions WHERE Category LIKE 'New York%';",
    hints: ["SQL uses % instead of * for multiple character wildcards."],
    expectedOutput: "Category | Result\nNew York_1 | Match\nNew York_2 | Match"
  }
];