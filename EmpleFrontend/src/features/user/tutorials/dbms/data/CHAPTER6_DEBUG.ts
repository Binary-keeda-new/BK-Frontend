export const CHAPTER6_DEBUG = [
  {
    instructions: "The grouping query for Relational Model has an invalid HAVING usage.",
    buggy: "SELECT Price, COUNT(*) FROM Customers HAVING Price > 0 GROUP BY Price;",
    fixed: "SELECT Price, COUNT(*) FROM Customers GROUP BY Price HAVING Price > 0;",
    hints: ["HAVING must come after GROUP BY."],
    expectedOutput: "Price | COUNT(*)\nType A | 12\nType B | 8"
  },
  {
    instructions: "Fix the wildcards in this search query for Relational Model.",
    buggy: "SELECT * FROM Transactions WHERE Amount LIKE 'Sales*';",
    fixed: "SELECT * FROM Transactions WHERE Amount LIKE 'Sales%';",
    hints: ["SQL uses % instead of * for multiple character wildcards."],
    expectedOutput: "Amount | Result\nSales_1 | Match\nSales_2 | Match"
  },
  {
    instructions: "Correct the data insertion for the Suppliers system in this Relational Model exercise.",
    buggy: "INSERT INTO Suppliers VALUES 1, 'Admin';",
    fixed: "INSERT INTO Suppliers VALUES (1, 'Admin');",
    hints: ["Wrap the inserted values in parentheses ( )."],
    expectedOutput: "1 row(s) inserted successfully."
  }
];