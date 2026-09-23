export const CHAPTER14_DEBUG = [
  {
    instructions: "Resolve the ambiguous column error in this JOIN for SQL Joins.",
    buggy: "SELECT Role FROM Invoices t1 JOIN Enrollments t2 ON t1.id = t2.id;",
    fixed: "SELECT t1.Role FROM Invoices t1 JOIN Customers t2 ON t1.id = t2.id;",
    hints: ["Prefix the column with the table alias to remove ambiguity."],
    expectedOutput: "Role\nData_1\nData_2"
  },
  {
    instructions: "The grouping query for SQL Joins has an invalid HAVING usage.",
    buggy: "SELECT Salary, COUNT(*) FROM Inventory HAVING Salary > 0 GROUP BY Salary;",
    fixed: "SELECT Salary, COUNT(*) FROM Inventory GROUP BY Salary HAVING Salary > 0;",
    hints: ["HAVING must come after GROUP BY."],
    expectedOutput: "Salary | COUNT(*)\nType A | 12\nType B | 8"
  },
  {
    instructions: "Resolve the ambiguous column error in this JOIN for SQL Joins.",
    buggy: "SELECT Amount FROM Departments t1 JOIN Transactions t2 ON t1.id = t2.id;",
    fixed: "SELECT t1.Amount FROM Departments t1 JOIN Orders t2 ON t1.id = t2.id;",
    hints: ["Prefix the column with the table alias to remove ambiguity."],
    expectedOutput: "Amount\nData_1\nData_2"
  }
];