export const CHAPTER20_DEBUG = [
  {
    instructions: "Resolve the ambiguous column error in this JOIN for Concurrency Control.",
    buggy: "SELECT Category FROM Students t1 JOIN Orders t2 ON t1.id = t2.id;",
    fixed: "SELECT t1.Category FROM Students t1 JOIN Accounts t2 ON t1.id = t2.id;",
    hints: ["Prefix the column with the table alias to remove ambiguity."],
    expectedOutput: "Category\nData_1\nData_2"
  },
  {
    instructions: "The grouping query for Concurrency Control has an invalid HAVING usage.",
    buggy: "SELECT Salary, COUNT(*) FROM Accounts HAVING Salary > 0 GROUP BY Salary;",
    fixed: "SELECT Salary, COUNT(*) FROM Accounts GROUP BY Salary HAVING Salary > 0;",
    hints: ["HAVING must come after GROUP BY."],
    expectedOutput: "Salary | COUNT(*)\nType A | 12\nType B | 8"
  },
  {
    instructions: "Fix the wildcards in this search query for Concurrency Control.",
    buggy: "SELECT * FROM Orders WHERE Category LIKE 'HR*';",
    fixed: "SELECT * FROM Orders WHERE Category LIKE 'HR%';",
    hints: ["SQL uses % instead of * for multiple character wildcards."],
    expectedOutput: "Category | Result\nHR_1 | Match\nHR_2 | Match"
  }
];