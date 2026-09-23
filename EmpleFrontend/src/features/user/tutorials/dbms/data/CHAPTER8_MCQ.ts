export const CHAPTER8_MCQ = [
  {
    q: "Which of the following is a common anti-pattern when dealing with Relational Algebra? (GATE 2011)",
    options: ["Using standard indexing techniques.", "Writing parameterized SQL queries.", "Storing comma-separated values in the Status column of the Inventory table.", "Implementing proper backup strategies."],
    ans: 2,
    explanation: "For Relational Algebra, storing comma-separated values in the status column of the inventory table. is the established best practice in modern DBMS architecture."
  },
  {
    q: "Consider a scenario in Relational Algebra where the Transactions table's Date is frequently updated. What is a key concern? (GATE 2012)",
    options: ["Ensuring the table name is always capitalized.", "Maintaining data consistency and minimizing lock contention.", "Changing the column name every week for security.", "Hardcoding all possible values in the application code."],
    ans: 1,
    explanation: "For Relational Algebra, maintaining data consistency and minimizing lock contention. is the established best practice in modern DBMS architecture."
  },
  {
    q: "If you are designing a schema for Relational Algebra involving Suppliers and Departments, what is the best approach? (GATE 2013)",
    options: ["Use random integers as the only data type.", "Merge both tables into a single giant text file.", "Establish a clear relationship using Foreign Keys on Date.", "Remove all Primary Keys to save disk space."],
    ans: 2,
    explanation: "For Relational Algebra, establish a clear relationship using foreign keys on date. is the established best practice in modern DBMS architecture."
  },
  {
    q: "Which of the following is a common anti-pattern when dealing with Relational Algebra? (GATE 2014)",
    options: ["Implementing proper backup strategies.", "Using standard indexing techniques.", "Writing parameterized SQL queries.", "Storing comma-separated values in the Quantity column of the Suppliers table."],
    ans: 3,
    explanation: "For Relational Algebra, storing comma-separated values in the quantity column of the suppliers table. is the established best practice in modern DBMS architecture."
  },
  {
    q: "Which of the following is a common anti-pattern when dealing with Relational Algebra? (GATE 2015)",
    options: ["Storing comma-separated values in the Status column of the Departments table.", "Using standard indexing techniques.", "Implementing proper backup strategies.", "Writing parameterized SQL queries."],
    ans: 0,
    explanation: "For Relational Algebra, storing comma-separated values in the status column of the departments table. is the established best practice in modern DBMS architecture."
  },
  {
    q: "If you are designing a schema for Relational Algebra involving Students and Inventory, what is the best approach? (GATE 2016)",
    options: ["Establish a clear relationship using Foreign Keys on Phone.", "Use random integers as the only data type.", "Merge both tables into a single giant text file.", "Remove all Primary Keys to save disk space."],
    ans: 0,
    explanation: "For Relational Algebra, establish a clear relationship using foreign keys on phone. is the established best practice in modern DBMS architecture."
  },
  {
    q: "If you are designing a schema for Relational Algebra involving Inventory and Employees, what is the best approach? (GATE 2017)",
    options: ["Use random integers as the only data type.", "Remove all Primary Keys to save disk space.", "Merge both tables into a single giant text file.", "Establish a clear relationship using Foreign Keys on Email."],
    ans: 3,
    explanation: "For Relational Algebra, establish a clear relationship using foreign keys on email. is the established best practice in modern DBMS architecture."
  },
  {
    q: "In the context of Relational Algebra, how does applying optimization affect the Students table? (GATE 2018)",
    options: ["It improves overall system reliability regarding Students data.", "It strictly requires hardware upgrades for the database.", "It prevents any user from querying the Students table.", "It causes immediate data loss in the Email column."],
    ans: 0,
    explanation: "For Relational Algebra, it improves overall system reliability regarding students data. is the established best practice in modern DBMS architecture."
  },
  {
    q: "When writing a query related to Relational Algebra for the Students table, which SQL clause is most critical? (GATE 2019)",
    options: ["The ALTER SYSTEM clause.", "The DROP TABLE clause.", "The WHERE clause to filter Phone correctly.", "The CREATE DATABASE clause."],
    ans: 2,
    explanation: "For Relational Algebra, the where clause to filter phone correctly. is the established best practice in modern DBMS architecture."
  },
  {
    q: "In the context of Relational Algebra, how does applying integrity affect the Students table? (GATE 2011)",
    options: ["It strictly requires hardware upgrades for the database.", "It causes immediate data loss in the Salary column.", "It prevents any user from querying the Students table.", "It improves overall system reliability regarding Students data."],
    ans: 3,
    explanation: "For Relational Algebra, it improves overall system reliability regarding students data. is the established best practice in modern DBMS architecture."
  }
];