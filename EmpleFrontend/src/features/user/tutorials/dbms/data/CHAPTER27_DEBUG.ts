export const CHAPTER27_DEBUG = [
  {
    instructions: "Correct the data insertion for the Students system in this Query Processing and Optimization exercise.",
    buggy: "INSERT INTO Students VALUES 1, '2023-01-01';",
    fixed: "INSERT INTO Students VALUES (1, '2023-01-01');",
    hints: ["Wrap the inserted values in parentheses ( )."],
    expectedOutput: "1 row(s) inserted successfully."
  },
  {
    instructions: "Resolve the ambiguous column error in this JOIN for Query Processing and Optimization.",
    buggy: "SELECT Phone FROM Inventory t1 JOIN Orders t2 ON t1.id = t2.id;",
    fixed: "SELECT t1.Phone FROM Inventory t1 JOIN Shipments t2 ON t1.id = t2.id;",
    hints: ["Prefix the column with the table alias to remove ambiguity."],
    expectedOutput: "Phone\nData_1\nData_2"
  },
  {
    instructions: "Fix the syntax error in this query relating to Query Processing and Optimization.",
    buggy: "SELECT * FROM Employees WHERE Total = \"500\";",
    fixed: "SELECT * FROM Employees WHERE Total = '500';",
    hints: ["Use single quotes for string literals."],
    expectedOutput: "Total | Status\n500 | OK\n500 | Processed"
  }
];