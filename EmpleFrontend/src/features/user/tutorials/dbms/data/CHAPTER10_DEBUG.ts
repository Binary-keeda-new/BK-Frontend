export const CHAPTER10_DEBUG = [
  {
    instructions: "Resolve the ambiguous column error in this JOIN for Introduction to SQL.",
    buggy: "SELECT Salary FROM Orders t1 JOIN Products t2 ON t1.id = t2.id;",
    fixed: "SELECT t1.Salary FROM Orders t1 JOIN Suppliers t2 ON t1.id = t2.id;",
    hints: ["Prefix the column with the table alias to remove ambiguity."],
    expectedOutput: "Salary\nData_1\nData_2"
  },
  {
    instructions: "The grouping query for Introduction to SQL has an invalid HAVING usage.",
    buggy: "SELECT Total, COUNT(*) FROM Courses HAVING Total > 0 GROUP BY Total;",
    fixed: "SELECT Total, COUNT(*) FROM Courses GROUP BY Total HAVING Total > 0;",
    hints: ["HAVING must come after GROUP BY."],
    expectedOutput: "Total | COUNT(*)\nType A | 12\nType B | 8"
  },
  {
    instructions: "Fix the syntax error in this query relating to Introduction to SQL.",
    buggy: "SELECT * FROM Courses WHERE Salary = \"HR\";",
    fixed: "SELECT * FROM Courses WHERE Salary = 'HR';",
    hints: ["Use single quotes for string literals."],
    expectedOutput: "Salary | Status\nHR | OK\nHR | Processed"
  }
];