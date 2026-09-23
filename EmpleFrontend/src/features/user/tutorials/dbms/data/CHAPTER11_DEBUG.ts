export const CHAPTER11_DEBUG = [
  {
    instructions: "The grouping query for SQL Data Definition & Constraints has an invalid HAVING usage.",
    buggy: "SELECT ID, COUNT(*) FROM Courses HAVING ID > 0 GROUP BY ID;",
    fixed: "SELECT ID, COUNT(*) FROM Courses GROUP BY ID HAVING ID > 0;",
    hints: ["HAVING must come after GROUP BY."],
    expectedOutput: "ID | COUNT(*)\nType A | 12\nType B | 8"
  },
  {
    instructions: "Fix the syntax error in this query relating to SQL Data Definition & Constraints.",
    buggy: "SELECT * FROM Employees WHERE Salary = \"500\";",
    fixed: "SELECT * FROM Employees WHERE Salary = '500';",
    hints: ["Use single quotes for string literals."],
    expectedOutput: "Salary | Status\n500 | OK\n500 | Processed"
  },
  {
    instructions: "Fix the wildcards in this search query for SQL Data Definition & Constraints.",
    buggy: "SELECT * FROM Inventory WHERE Date LIKE 'Admin*';",
    fixed: "SELECT * FROM Inventory WHERE Date LIKE 'Admin%';",
    hints: ["SQL uses % instead of * for multiple character wildcards."],
    expectedOutput: "Date | Result\nAdmin_1 | Match\nAdmin_2 | Match"
  }
];