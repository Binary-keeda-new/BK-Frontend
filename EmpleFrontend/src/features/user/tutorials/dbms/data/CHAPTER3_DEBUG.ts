export const CHAPTER3_DEBUG = [
  {
    instructions: "Fix the wildcards in this search query for Data Models.",
    buggy: "SELECT * FROM Departments WHERE Total LIKE 'Delivered*';",
    fixed: "SELECT * FROM Departments WHERE Total LIKE 'Delivered%';",
    hints: ["SQL uses % instead of * for multiple character wildcards."],
    expectedOutput: "Total | Result\nDelivered_1 | Match\nDelivered_2 | Match"
  },
  {
    instructions: "Resolve the ambiguous column error in this JOIN for Data Models.",
    buggy: "SELECT Status FROM Accounts t1 JOIN Products t2 ON t1.id = t2.id;",
    fixed: "SELECT t1.Status FROM Accounts t1 JOIN Shipments t2 ON t1.id = t2.id;",
    hints: ["Prefix the column with the table alias to remove ambiguity."],
    expectedOutput: "Status\nData_1\nData_2"
  },
  {
    instructions: "Resolve the ambiguous column error in this JOIN for Data Models.",
    buggy: "SELECT Price FROM Transactions t1 JOIN Orders t2 ON t1.id = t2.id;",
    fixed: "SELECT t1.Price FROM Transactions t1 JOIN Courses t2 ON t1.id = t2.id;",
    hints: ["Prefix the column with the table alias to remove ambiguity."],
    expectedOutput: "Price\nData_1\nData_2"
  }
];