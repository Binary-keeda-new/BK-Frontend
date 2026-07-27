export const CHAPTER2_DEBUG = [
  {
    instructions: "Fix the syntax error in this query relating to Database Architecture.",
    buggy: "SELECT * FROM Products WHERE ID = \"HR\";",
    fixed: "SELECT * FROM Products WHERE ID = 'HR';",
    hints: ["Use single quotes for string literals."],
    expectedOutput: "ID | Status\nHR | OK\nHR | Processed"
  },
  {
    instructions: "Correct the data insertion for the Customers system in this Database Architecture exercise.",
    buggy: "INSERT INTO Customers VALUES 1, 'Engineering';",
    fixed: "INSERT INTO Customers VALUES (1, 'Engineering');",
    hints: ["Wrap the inserted values in parentheses ( )."],
    expectedOutput: "1 row(s) inserted successfully."
  },
  {
    instructions: "Fix the wildcards in this search query for Database Architecture.",
    buggy: "SELECT * FROM Accounts WHERE Quantity LIKE '1000*';",
    fixed: "SELECT * FROM Accounts WHERE Quantity LIKE '1000%';",
    hints: ["SQL uses % instead of * for multiple character wildcards."],
    expectedOutput: "Quantity | Result\n1000_1 | Match\n1000_2 | Match"
  }
];