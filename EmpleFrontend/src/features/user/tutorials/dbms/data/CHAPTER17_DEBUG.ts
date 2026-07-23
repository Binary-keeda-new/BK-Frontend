export const CHAPTER17_DEBUG = [
  {
    instructions: "Resolve the ambiguous column error in this JOIN for Functional Dependencies.",
    buggy: "SELECT ID FROM Customers t1 JOIN Suppliers t2 ON t1.id = t2.id;",
    fixed: "SELECT t1.ID FROM Customers t1 JOIN Invoices t2 ON t1.id = t2.id;",
    hints: ["Prefix the column with the table alias to remove ambiguity."],
    expectedOutput: "ID\nData_1\nData_2"
  },
  {
    instructions: "Correct the data insertion for the Transactions system in this Functional Dependencies exercise.",
    buggy: "INSERT INTO Transactions VALUES 1, 'HR';",
    fixed: "INSERT INTO Transactions VALUES (1, 'HR');",
    hints: ["Wrap the inserted values in parentheses ( )."],
    expectedOutput: "1 row(s) inserted successfully."
  },
  {
    instructions: "Correct the data insertion for the Enrollments system in this Functional Dependencies exercise.",
    buggy: "INSERT INTO Enrollments VALUES 1, '1000';",
    fixed: "INSERT INTO Enrollments VALUES (1, '1000');",
    hints: ["Wrap the inserted values in parentheses ( )."],
    expectedOutput: "1 row(s) inserted successfully."
  }
];