export const CHAPTER12_DEBUG = [
  {
    instructions: "The grouping query for SQL Data Manipulation has an invalid HAVING usage.",
    buggy: "SELECT Total, COUNT(*) FROM Courses HAVING Total > 0 GROUP BY Total;",
    fixed: "SELECT Total, COUNT(*) FROM Courses GROUP BY Total HAVING Total > 0;",
    hints: ["HAVING must come after GROUP BY."],
    expectedOutput: "Total | COUNT(*)\nType A | 12\nType B | 8"
  },
  {
    instructions: "Fix the wildcards in this search query for SQL Data Manipulation.",
    buggy: "SELECT * FROM Enrollments WHERE Category LIKE 'HR*';",
    fixed: "SELECT * FROM Enrollments WHERE Category LIKE 'HR%';",
    hints: ["SQL uses % instead of * for multiple character wildcards."],
    expectedOutput: "Category | Result\nHR_1 | Match\nHR_2 | Match"
  },
  {
    instructions: "Resolve the ambiguous column error in this JOIN for SQL Data Manipulation.",
    buggy: "SELECT Category FROM Invoices t1 JOIN Inventory t2 ON t1.id = t2.id;",
    fixed: "SELECT t1.Category FROM Invoices t1 JOIN Enrollments t2 ON t1.id = t2.id;",
    hints: ["Prefix the column with the table alias to remove ambiguity."],
    expectedOutput: "Category\nData_1\nData_2"
  }
];