export const CHAPTER21_DEBUG = [
  {
    instructions: "Resolve the ambiguous column error in this JOIN for Lock-Based Concurrency Control.",
    buggy: "SELECT Quantity FROM Customers t1 JOIN Shipments t2 ON t1.id = t2.id;",
    fixed: "SELECT t1.Quantity FROM Customers t1 JOIN Inventory t2 ON t1.id = t2.id;",
    hints: ["Prefix the column with the table alias to remove ambiguity."],
    expectedOutput: "Quantity\nData_1\nData_2"
  },
  {
    instructions: "Resolve the ambiguous column error in this JOIN for Lock-Based Concurrency Control.",
    buggy: "SELECT Name FROM Courses t1 JOIN Shipments t2 ON t1.id = t2.id;",
    fixed: "SELECT t1.Name FROM Courses t1 JOIN Students t2 ON t1.id = t2.id;",
    hints: ["Prefix the column with the table alias to remove ambiguity."],
    expectedOutput: "Name\nData_1\nData_2"
  },
  {
    instructions: "Resolve the ambiguous column error in this JOIN for Lock-Based Concurrency Control.",
    buggy: "SELECT Amount FROM Courses t1 JOIN Orders t2 ON t1.id = t2.id;",
    fixed: "SELECT t1.Amount FROM Courses t1 JOIN Employees t2 ON t1.id = t2.id;",
    hints: ["Prefix the column with the table alias to remove ambiguity."],
    expectedOutput: "Amount\nData_1\nData_2"
  }
];