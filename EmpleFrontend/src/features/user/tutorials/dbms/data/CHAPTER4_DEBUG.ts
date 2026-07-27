export const CHAPTER4_DEBUG = [
  {
    instructions: "Fix the wildcards in this search query for Entity-Relationship Model.",
    buggy: "SELECT * FROM Customers WHERE Role LIKE 'Admin*';",
    fixed: "SELECT * FROM Customers WHERE Role LIKE 'Admin%';",
    hints: ["SQL uses % instead of * for multiple character wildcards."],
    expectedOutput: "Role | Result\nAdmin_1 | Match\nAdmin_2 | Match"
  },
  {
    instructions: "Fix the wildcards in this search query for Entity-Relationship Model.",
    buggy: "SELECT * FROM Orders WHERE Price LIKE 'Manager*';",
    fixed: "SELECT * FROM Orders WHERE Price LIKE 'Manager%';",
    hints: ["SQL uses % instead of * for multiple character wildcards."],
    expectedOutput: "Price | Result\nManager_1 | Match\nManager_2 | Match"
  },
  {
    instructions: "Correct the data insertion for the Departments system in this Entity-Relationship Model exercise.",
    buggy: "INSERT INTO Departments VALUES 1, 'HR';",
    fixed: "INSERT INTO Departments VALUES (1, 'HR');",
    hints: ["Wrap the inserted values in parentheses ( )."],
    expectedOutput: "1 row(s) inserted successfully."
  }
];