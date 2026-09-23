export const CHAPTER30_DEBUG = [
  {
    instructions: "Fix the wildcards in this search query for NoSQL Databases.",
    buggy: "SELECT * FROM Accounts WHERE Phone LIKE '2023-01-01*';",
    fixed: "SELECT * FROM Accounts WHERE Phone LIKE '2023-01-01%';",
    hints: ["SQL uses % instead of * for multiple character wildcards."],
    expectedOutput: "Phone | Result\n2023-01-01_1 | Match\n2023-01-01_2 | Match"
  },
  {
    instructions: "Resolve the ambiguous column error in this JOIN for NoSQL Databases.",
    buggy: "SELECT ID FROM Departments t1 JOIN Employees t2 ON t1.id = t2.id;",
    fixed: "SELECT t1.ID FROM Departments t1 JOIN Shipments t2 ON t1.id = t2.id;",
    hints: ["Prefix the column with the table alias to remove ambiguity."],
    expectedOutput: "ID\nData_1\nData_2"
  },
  {
    instructions: "The grouping query for NoSQL Databases has an invalid HAVING usage.",
    buggy: "SELECT Salary, COUNT(*) FROM Orders HAVING Salary > 0 GROUP BY Salary;",
    fixed: "SELECT Salary, COUNT(*) FROM Orders GROUP BY Salary HAVING Salary > 0;",
    hints: ["HAVING must come after GROUP BY."],
    expectedOutput: "Salary | COUNT(*)\nType A | 12\nType B | 8"
  }
];