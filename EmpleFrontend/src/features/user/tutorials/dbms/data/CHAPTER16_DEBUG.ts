export const CHAPTER16_DEBUG = [
  {
    instructions: "Correct the data insertion for the Accounts system in this Views, Indexes and Sequences exercise.",
    buggy: "INSERT INTO Accounts VALUES 1, 'Manager';",
    fixed: "INSERT INTO Accounts VALUES (1, 'Manager');",
    hints: ["Wrap the inserted values in parentheses ( )."],
    expectedOutput: "1 row(s) inserted successfully."
  },
  {
    instructions: "Resolve the ambiguous column error in this JOIN for Views, Indexes and Sequences.",
    buggy: "SELECT Phone FROM Products t1 JOIN Shipments t2 ON t1.id = t2.id;",
    fixed: "SELECT t1.Phone FROM Products t1 JOIN Students t2 ON t1.id = t2.id;",
    hints: ["Prefix the column with the table alias to remove ambiguity."],
    expectedOutput: "Phone\nData_1\nData_2"
  },
  {
    instructions: "Fix the wildcards in this search query for Views, Indexes and Sequences.",
    buggy: "SELECT * FROM Products WHERE Total LIKE 'Admin*';",
    fixed: "SELECT * FROM Products WHERE Total LIKE 'Admin%';",
    hints: ["SQL uses % instead of * for multiple character wildcards."],
    expectedOutput: "Total | Result\nAdmin_1 | Match\nAdmin_2 | Match"
  }
];