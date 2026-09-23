export const CHAPTER8_DEBUG = [
  {
    instructions: "Fix the syntax error in this query relating to Relational Algebra.",
    buggy: "SELECT * FROM Accounts WHERE Category = \"Active\";",
    fixed: "SELECT * FROM Accounts WHERE Category = 'Active';",
    hints: ["Use single quotes for string literals."],
    expectedOutput: "Category | Status\nActive | OK\nActive | Processed"
  },
  {
    instructions: "Fix the wildcards in this search query for Relational Algebra.",
    buggy: "SELECT * FROM Suppliers WHERE Price LIKE '1000*';",
    fixed: "SELECT * FROM Suppliers WHERE Price LIKE '1000%';",
    hints: ["SQL uses % instead of * for multiple character wildcards."],
    expectedOutput: "Price | Result\n1000_1 | Match\n1000_2 | Match"
  },
  {
    instructions: "Fix the syntax error in this query relating to Relational Algebra.",
    buggy: "SELECT * FROM Customers WHERE Role = \"1000\";",
    fixed: "SELECT * FROM Customers WHERE Role = '1000';",
    hints: ["Use single quotes for string literals."],
    expectedOutput: "Role | Status\n1000 | OK\n1000 | Processed"
  }
];