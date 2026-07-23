export const CHAPTER28_DEBUG = [
  {
    instructions: "The grouping query for Database Security and Authorization has an invalid HAVING usage.",
    buggy: "SELECT Category, COUNT(*) FROM Departments HAVING Category > 0 GROUP BY Category;",
    fixed: "SELECT Category, COUNT(*) FROM Departments GROUP BY Category HAVING Category > 0;",
    hints: ["HAVING must come after GROUP BY."],
    expectedOutput: "Category | COUNT(*)\nType A | 12\nType B | 8"
  },
  {
    instructions: "The grouping query for Database Security and Authorization has an invalid HAVING usage.",
    buggy: "SELECT Price, COUNT(*) FROM Shipments HAVING Price > 0 GROUP BY Price;",
    fixed: "SELECT Price, COUNT(*) FROM Shipments GROUP BY Price HAVING Price > 0;",
    hints: ["HAVING must come after GROUP BY."],
    expectedOutput: "Price | COUNT(*)\nType A | 12\nType B | 8"
  },
  {
    instructions: "Fix the syntax error in this query relating to Database Security and Authorization.",
    buggy: "SELECT * FROM Products WHERE Price = \"Manager\";",
    fixed: "SELECT * FROM Products WHERE Price = 'Manager';",
    hints: ["Use single quotes for string literals."],
    expectedOutput: "Price | Status\nManager | OK\nManager | Processed"
  }
];