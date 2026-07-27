export const CHAPTER29_DEBUG = [
  {
    instructions: "Fix the wildcards in this search query for Distributed Databases.",
    buggy: "SELECT * FROM Accounts WHERE Category LIKE 'Engineering*';",
    fixed: "SELECT * FROM Accounts WHERE Category LIKE 'Engineering%';",
    hints: ["SQL uses % instead of * for multiple character wildcards."],
    expectedOutput: "Category | Result\nEngineering_1 | Match\nEngineering_2 | Match"
  },
  {
    instructions: "Fix the syntax error in this query relating to Distributed Databases.",
    buggy: "SELECT * FROM Enrollments WHERE Role = \"Pending\";",
    fixed: "SELECT * FROM Enrollments WHERE Role = 'Pending';",
    hints: ["Use single quotes for string literals."],
    expectedOutput: "Role | Status\nPending | OK\nPending | Processed"
  },
  {
    instructions: "Fix the syntax error in this query relating to Distributed Databases.",
    buggy: "SELECT * FROM Products WHERE Amount = \"Engineering\";",
    fixed: "SELECT * FROM Products WHERE Amount = 'Engineering';",
    hints: ["Use single quotes for string literals."],
    expectedOutput: "Amount | Status\nEngineering | OK\nEngineering | Processed"
  }
];