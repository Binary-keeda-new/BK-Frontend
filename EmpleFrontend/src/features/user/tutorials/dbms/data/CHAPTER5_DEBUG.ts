export const CHAPTER5_DEBUG = [
  {
    instructions: "The grouping query for Enhanced ER Model has an invalid HAVING usage.",
    buggy: "SELECT Price, COUNT(*) FROM Orders HAVING Price > 0 GROUP BY Price;",
    fixed: "SELECT Price, COUNT(*) FROM Orders GROUP BY Price HAVING Price > 0;",
    hints: ["HAVING must come after GROUP BY."],
    expectedOutput: "Price | COUNT(*)\nType A | 12\nType B | 8"
  },
  {
    instructions: "Correct the data insertion for the Products system in this Enhanced ER Model exercise.",
    buggy: "INSERT INTO Products VALUES 1, '500';",
    fixed: "INSERT INTO Products VALUES (1, '500');",
    hints: ["Wrap the inserted values in parentheses ( )."],
    expectedOutput: "1 row(s) inserted successfully."
  },
  {
    instructions: "Correct the data insertion for the Enrollments system in this Enhanced ER Model exercise.",
    buggy: "INSERT INTO Enrollments VALUES 1, 'HR';",
    fixed: "INSERT INTO Enrollments VALUES (1, 'HR');",
    hints: ["Wrap the inserted values in parentheses ( )."],
    expectedOutput: "1 row(s) inserted successfully."
  }
];