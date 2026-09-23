export const CHAPTER1_DEBUG = [
  {
    instructions: "Resolve the ambiguous column error in this JOIN for Introduction to Database Management Systems.",
    buggy: "SELECT Price FROM Invoices t1 JOIN Students t2 ON t1.id = t2.id;",
    fixed: "SELECT t1.Price FROM Invoices t1 JOIN Departments t2 ON t1.id = t2.id;",
    hints: ["Prefix the column with the table alias to remove ambiguity."],
    expectedOutput: "Price\nData_1\nData_2"
  },
  {
    instructions: "Fix the wildcards in this search query for Introduction to Database Management Systems.",
    buggy: "SELECT * FROM Invoices WHERE Quantity LIKE '1000*';",
    fixed: "SELECT * FROM Invoices WHERE Quantity LIKE '1000%';",
    hints: ["SQL uses % instead of * for multiple character wildcards."],
    expectedOutput: "Quantity | Result\n1000_1 | Match\n1000_2 | Match"
  },
  {
    instructions: "Fix the syntax error in this query relating to Introduction to Database Management Systems.",
    buggy: "SELECT * FROM Products WHERE Role = \"2023-01-01\";",
    fixed: "SELECT * FROM Products WHERE Role = '2023-01-01';",
    hints: ["Use single quotes for string literals."],
    expectedOutput: "Role | Status\n2023-01-01 | OK\n2023-01-01 | Processed"
  }
];