export const CHAPTER31_DEBUG = [
  {
    instructions: "Fix the syntax error in this query relating to Database Design and Case Studies.",
    buggy: "SELECT * FROM Transactions WHERE Name = \"Sales\";",
    fixed: "SELECT * FROM Transactions WHERE Name = 'Sales';",
    hints: ["Use single quotes for string literals."],
    expectedOutput: "Name | Status\nSales | OK\nSales | Processed"
  },
  {
    instructions: "Fix the wildcards in this search query for Database Design and Case Studies.",
    buggy: "SELECT * FROM Accounts WHERE ID LIKE 'Sales*';",
    fixed: "SELECT * FROM Accounts WHERE ID LIKE 'Sales%';",
    hints: ["SQL uses % instead of * for multiple character wildcards."],
    expectedOutput: "ID | Result\nSales_1 | Match\nSales_2 | Match"
  },
  {
    instructions: "Fix the wildcards in this search query for Database Design and Case Studies.",
    buggy: "SELECT * FROM Customers WHERE Date LIKE 'Manager*';",
    fixed: "SELECT * FROM Customers WHERE Date LIKE 'Manager%';",
    hints: ["SQL uses % instead of * for multiple character wildcards."],
    expectedOutput: "Date | Result\nManager_1 | Match\nManager_2 | Match"
  }
];