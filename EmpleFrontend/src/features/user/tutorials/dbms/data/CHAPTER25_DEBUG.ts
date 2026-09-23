export const CHAPTER25_DEBUG = [
  {
    instructions: "Fix the wildcards in this search query for File Organization and Storage.",
    buggy: "SELECT * FROM Suppliers WHERE Date LIKE '1000*';",
    fixed: "SELECT * FROM Suppliers WHERE Date LIKE '1000%';",
    hints: ["SQL uses % instead of * for multiple character wildcards."],
    expectedOutput: "Date | Result\n1000_1 | Match\n1000_2 | Match"
  },
  {
    instructions: "Fix the syntax error in this query relating to File Organization and Storage.",
    buggy: "SELECT * FROM Courses WHERE Salary = \"Manager\";",
    fixed: "SELECT * FROM Courses WHERE Salary = 'Manager';",
    hints: ["Use single quotes for string literals."],
    expectedOutput: "Salary | Status\nManager | OK\nManager | Processed"
  },
  {
    instructions: "Fix the syntax error in this query relating to File Organization and Storage.",
    buggy: "SELECT * FROM Students WHERE Salary = \"Pending\";",
    fixed: "SELECT * FROM Students WHERE Salary = 'Pending';",
    hints: ["Use single quotes for string literals."],
    expectedOutput: "Salary | Status\nPending | OK\nPending | Processed"
  }
];