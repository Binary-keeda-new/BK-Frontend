export const CHAPTER24_DEBUG = [
  {
    instructions: "The grouping query for Database Recovery has an invalid HAVING usage.",
    buggy: "SELECT Date, COUNT(*) FROM Students HAVING Date > 0 GROUP BY Date;",
    fixed: "SELECT Date, COUNT(*) FROM Students GROUP BY Date HAVING Date > 0;",
    hints: ["HAVING must come after GROUP BY."],
    expectedOutput: "Date | COUNT(*)\nType A | 12\nType B | 8"
  },
  {
    instructions: "Resolve the ambiguous column error in this JOIN for Database Recovery.",
    buggy: "SELECT ID FROM Products t1 JOIN Accounts t2 ON t1.id = t2.id;",
    fixed: "SELECT t1.ID FROM Products t1 JOIN Inventory t2 ON t1.id = t2.id;",
    hints: ["Prefix the column with the table alias to remove ambiguity."],
    expectedOutput: "ID\nData_1\nData_2"
  },
  {
    instructions: "Fix the wildcards in this search query for Database Recovery.",
    buggy: "SELECT * FROM Products WHERE Quantity LIKE 'Engineering*';",
    fixed: "SELECT * FROM Products WHERE Quantity LIKE 'Engineering%';",
    hints: ["SQL uses % instead of * for multiple character wildcards."],
    expectedOutput: "Quantity | Result\nEngineering_1 | Match\nEngineering_2 | Match"
  }
];