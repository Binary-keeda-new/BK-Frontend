export const CHAPTER15_DEBUG = [
  {
    instructions: "Fix the wildcards in this search query for Subqueries and Advanced SQL Queries.",
    buggy: "SELECT * FROM Courses WHERE Address LIKE 'Delivered*';",
    fixed: "SELECT * FROM Courses WHERE Address LIKE 'Delivered%';",
    hints: ["SQL uses % instead of * for multiple character wildcards."],
    expectedOutput: "Address | Result\nDelivered_1 | Match\nDelivered_2 | Match"
  },
  {
    instructions: "Fix the wildcards in this search query for Subqueries and Advanced SQL Queries.",
    buggy: "SELECT * FROM Enrollments WHERE Salary LIKE '1000*';",
    fixed: "SELECT * FROM Enrollments WHERE Salary LIKE '1000%';",
    hints: ["SQL uses % instead of * for multiple character wildcards."],
    expectedOutput: "Salary | Result\n1000_1 | Match\n1000_2 | Match"
  },
  {
    instructions: "Resolve the ambiguous column error in this JOIN for Subqueries and Advanced SQL Queries.",
    buggy: "SELECT Status FROM Suppliers t1 JOIN Transactions t2 ON t1.id = t2.id;",
    fixed: "SELECT t1.Status FROM Suppliers t1 JOIN Transactions t2 ON t1.id = t2.id;",
    hints: ["Prefix the column with the table alias to remove ambiguity."],
    expectedOutput: "Status\nData_1\nData_2"
  }
];