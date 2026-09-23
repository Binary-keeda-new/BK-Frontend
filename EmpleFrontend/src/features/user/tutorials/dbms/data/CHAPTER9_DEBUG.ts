export const CHAPTER9_DEBUG = [
  {
    instructions: "Resolve the ambiguous column error in this JOIN for Relational Calculus.",
    buggy: "SELECT ID FROM Enrollments t1 JOIN Shipments t2 ON t1.id = t2.id;",
    fixed: "SELECT t1.ID FROM Enrollments t1 JOIN Employees t2 ON t1.id = t2.id;",
    hints: ["Prefix the column with the table alias to remove ambiguity."],
    expectedOutput: "ID\nData_1\nData_2"
  },
  {
    instructions: "Correct the data insertion for the Employees system in this Relational Calculus exercise.",
    buggy: "INSERT INTO Employees VALUES 1, '1000';",
    fixed: "INSERT INTO Employees VALUES (1, '1000');",
    hints: ["Wrap the inserted values in parentheses ( )."],
    expectedOutput: "1 row(s) inserted successfully."
  },
  {
    instructions: "Fix the wildcards in this search query for Relational Calculus.",
    buggy: "SELECT * FROM Orders WHERE Salary LIKE 'Delivered*';",
    fixed: "SELECT * FROM Orders WHERE Salary LIKE 'Delivered%';",
    hints: ["SQL uses % instead of * for multiple character wildcards."],
    expectedOutput: "Salary | Result\nDelivered_1 | Match\nDelivered_2 | Match"
  }
];