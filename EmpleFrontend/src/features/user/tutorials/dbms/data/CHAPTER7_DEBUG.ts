export const CHAPTER7_DEBUG = [
  {
    instructions: "Fix the syntax error in this query relating to ER-to-Relational Mapping.",
    buggy: "SELECT * FROM Departments WHERE Category = \"Admin\";",
    fixed: "SELECT * FROM Departments WHERE Category = 'Admin';",
    hints: ["Use single quotes for string literals."],
    expectedOutput: "Category | Status\nAdmin | OK\nAdmin | Processed"
  },
  {
    instructions: "Correct the data insertion for the Enrollments system in this ER-to-Relational Mapping exercise.",
    buggy: "INSERT INTO Enrollments VALUES 1, 'IT';",
    fixed: "INSERT INTO Enrollments VALUES (1, 'IT');",
    hints: ["Wrap the inserted values in parentheses ( )."],
    expectedOutput: "1 row(s) inserted successfully."
  },
  {
    instructions: "Correct the data insertion for the Students system in this ER-to-Relational Mapping exercise.",
    buggy: "INSERT INTO Students VALUES 1, 'New York';",
    fixed: "INSERT INTO Students VALUES (1, 'New York');",
    hints: ["Wrap the inserted values in parentheses ( )."],
    expectedOutput: "1 row(s) inserted successfully."
  }
];