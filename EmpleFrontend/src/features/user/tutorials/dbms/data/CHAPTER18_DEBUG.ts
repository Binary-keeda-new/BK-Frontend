export const CHAPTER18_DEBUG = [
  {
    instructions: "Fix the syntax error in this query relating to Normalization.",
    buggy: "SELECT * FROM Products WHERE Total = \"Delivered\";",
    fixed: "SELECT * FROM Products WHERE Total = 'Delivered';",
    hints: ["Use single quotes for string literals."],
    expectedOutput: "Total | Status\nDelivered | OK\nDelivered | Processed"
  },
  {
    instructions: "Fix the syntax error in this query relating to Normalization.",
    buggy: "SELECT * FROM Enrollments WHERE Date = \"Delivered\";",
    fixed: "SELECT * FROM Enrollments WHERE Date = 'Delivered';",
    hints: ["Use single quotes for string literals."],
    expectedOutput: "Date | Status\nDelivered | OK\nDelivered | Processed"
  },
  {
    instructions: "Fix the wildcards in this search query for Normalization.",
    buggy: "SELECT * FROM Enrollments WHERE ID LIKE '2023-01-01*';",
    fixed: "SELECT * FROM Enrollments WHERE ID LIKE '2023-01-01%';",
    hints: ["SQL uses % instead of * for multiple character wildcards."],
    expectedOutput: "ID | Result\n2023-01-01_1 | Match\n2023-01-01_2 | Match"
  }
];