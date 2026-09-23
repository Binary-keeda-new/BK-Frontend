export const CHAPTER13_DEBUG = [
  {
    instructions: "Correct the data insertion for the Accounts system in this SQL Functions and Aggregation exercise.",
    buggy: "INSERT INTO Accounts VALUES 1, 'Active';",
    fixed: "INSERT INTO Accounts VALUES (1, 'Active');",
    hints: ["Wrap the inserted values in parentheses ( )."],
    expectedOutput: "1 row(s) inserted successfully."
  },
  {
    instructions: "Fix the syntax error in this query relating to SQL Functions and Aggregation.",
    buggy: "SELECT * FROM Employees WHERE Status = \"IT\";",
    fixed: "SELECT * FROM Employees WHERE Status = 'IT';",
    hints: ["Use single quotes for string literals."],
    expectedOutput: "Status | Status\nIT | OK\nIT | Processed"
  },
  {
    instructions: "Fix the syntax error in this query relating to SQL Functions and Aggregation.",
    buggy: "SELECT * FROM Courses WHERE Quantity = \"HR\";",
    fixed: "SELECT * FROM Courses WHERE Quantity = 'HR';",
    hints: ["Use single quotes for string literals."],
    expectedOutput: "Quantity | Status\nHR | OK\nHR | Processed"
  }
];