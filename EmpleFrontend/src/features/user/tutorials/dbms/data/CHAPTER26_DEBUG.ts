export const CHAPTER26_DEBUG = [
  {
    instructions: "Fix the syntax error in this query relating to Indexing.",
    buggy: "SELECT * FROM Inventory WHERE Total = \"Delivered\";",
    fixed: "SELECT * FROM Inventory WHERE Total = 'Delivered';",
    hints: ["Use single quotes for string literals."],
    expectedOutput: "Total | Status\nDelivered | OK\nDelivered | Processed"
  },
  {
    instructions: "The grouping query for Indexing has an invalid HAVING usage.",
    buggy: "SELECT Address, COUNT(*) FROM Employees HAVING Address > 0 GROUP BY Address;",
    fixed: "SELECT Address, COUNT(*) FROM Employees GROUP BY Address HAVING Address > 0;",
    hints: ["HAVING must come after GROUP BY."],
    expectedOutput: "Address | COUNT(*)\nType A | 12\nType B | 8"
  },
  {
    instructions: "Fix the syntax error in this query relating to Indexing.",
    buggy: "SELECT * FROM Customers WHERE Total = \"2023-01-01\";",
    fixed: "SELECT * FROM Customers WHERE Total = '2023-01-01';",
    hints: ["Use single quotes for string literals."],
    expectedOutput: "Total | Status\n2023-01-01 | OK\n2023-01-01 | Processed"
  }
];