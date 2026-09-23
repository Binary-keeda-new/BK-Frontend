export const CHAPTER19_DEBUG = [
  {
    instructions: "Fix the syntax error in this query relating to Transactions.",
    buggy: "SELECT * FROM Customers WHERE Address = \"1000\";",
    fixed: "SELECT * FROM Customers WHERE Address = '1000';",
    hints: ["Use single quotes for string literals."],
    expectedOutput: "Address | Status\n1000 | OK\n1000 | Processed"
  },
  {
    instructions: "Correct the data insertion for the Customers system in this Transactions exercise.",
    buggy: "INSERT INTO Customers VALUES 1, 'Manager';",
    fixed: "INSERT INTO Customers VALUES (1, 'Manager');",
    hints: ["Wrap the inserted values in parentheses ( )."],
    expectedOutput: "1 row(s) inserted successfully."
  },
  {
    instructions: "Correct the data insertion for the Products system in this Transactions exercise.",
    buggy: "INSERT INTO Products VALUES 1, 'Sales';",
    fixed: "INSERT INTO Products VALUES (1, 'Sales');",
    hints: ["Wrap the inserted values in parentheses ( )."],
    expectedOutput: "1 row(s) inserted successfully."
  }
];