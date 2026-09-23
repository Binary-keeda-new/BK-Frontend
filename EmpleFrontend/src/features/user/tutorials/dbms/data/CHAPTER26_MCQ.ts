export const CHAPTER26_MCQ = [
  {
    q: "If you are designing a schema for Indexing involving Orders and Products, what is the best approach? (GATE 2011)",
    options: ["Merge both tables into a single giant text file.", "Remove all Primary Keys to save disk space.", "Establish a clear relationship using Foreign Keys on ID.", "Use random integers as the only data type."],
    ans: 2,
    explanation: "For Indexing, establish a clear relationship using foreign keys on id. is the established best practice in modern DBMS architecture."
  },
  {
    q: "Consider a scenario in Indexing where the Departments table's Total is frequently updated. What is a key concern? (GATE 2012)",
    options: ["Maintaining data consistency and minimizing lock contention.", "Ensuring the table name is always capitalized.", "Hardcoding all possible values in the application code.", "Changing the column name every week for security."],
    ans: 0,
    explanation: "For Indexing, maintaining data consistency and minimizing lock contention. is the established best practice in modern DBMS architecture."
  },
  {
    q: "When writing a query related to Indexing for the Enrollments table, which SQL clause is most critical? (GATE 2013)",
    options: ["The WHERE clause to filter Email correctly.", "The DROP TABLE clause.", "The CREATE DATABASE clause.", "The ALTER SYSTEM clause."],
    ans: 0,
    explanation: "For Indexing, the where clause to filter email correctly. is the established best practice in modern DBMS architecture."
  },
  {
    q: "Consider a scenario in Indexing where the Employees table's Date is frequently updated. What is a key concern? (GATE 2014)",
    options: ["Ensuring the table name is always capitalized.", "Changing the column name every week for security.", "Hardcoding all possible values in the application code.", "Maintaining data consistency and minimizing lock contention."],
    ans: 3,
    explanation: "For Indexing, maintaining data consistency and minimizing lock contention. is the established best practice in modern DBMS architecture."
  },
  {
    q: "If you are designing a schema for Indexing involving Departments and Courses, what is the best approach? (GATE 2015)",
    options: ["Use random integers as the only data type.", "Establish a clear relationship using Foreign Keys on Date.", "Merge both tables into a single giant text file.", "Remove all Primary Keys to save disk space."],
    ans: 1,
    explanation: "For Indexing, establish a clear relationship using foreign keys on date. is the established best practice in modern DBMS architecture."
  },
  {
    q: "In the context of Indexing, how does applying consistency affect the Enrollments table? (GATE 2016)",
    options: ["It improves overall system reliability regarding Enrollments data.", "It prevents any user from querying the Enrollments table.", "It strictly requires hardware upgrades for the database.", "It causes immediate data loss in the Name column."],
    ans: 0,
    explanation: "For Indexing, it improves overall system reliability regarding enrollments data. is the established best practice in modern DBMS architecture."
  },
  {
    q: "If you are designing a schema for Indexing involving Accounts and Suppliers, what is the best approach? (GATE 2017)",
    options: ["Establish a clear relationship using Foreign Keys on ID.", "Merge both tables into a single giant text file.", "Remove all Primary Keys to save disk space.", "Use random integers as the only data type."],
    ans: 0,
    explanation: "For Indexing, establish a clear relationship using foreign keys on id. is the established best practice in modern DBMS architecture."
  },
  {
    q: "Consider a scenario in Indexing where the Employees table's ID is frequently updated. What is a key concern? (GATE 2018)",
    options: ["Changing the column name every week for security.", "Ensuring the table name is always capitalized.", "Maintaining data consistency and minimizing lock contention.", "Hardcoding all possible values in the application code."],
    ans: 2,
    explanation: "For Indexing, maintaining data consistency and minimizing lock contention. is the established best practice in modern DBMS architecture."
  },
  {
    q: "Which of the following is a common anti-pattern when dealing with Indexing? (GATE 2019)",
    options: ["Storing comma-separated values in the Role column of the Courses table.", "Writing parameterized SQL queries.", "Implementing proper backup strategies.", "Using standard indexing techniques."],
    ans: 0,
    explanation: "For Indexing, storing comma-separated values in the role column of the courses table. is the established best practice in modern DBMS architecture."
  },
  {
    q: "Consider a scenario in Indexing where the Transactions table's Address is frequently updated. What is a key concern? (GATE 2011)",
    options: ["Maintaining data consistency and minimizing lock contention.", "Ensuring the table name is always capitalized.", "Changing the column name every week for security.", "Hardcoding all possible values in the application code."],
    ans: 0,
    explanation: "For Indexing, maintaining data consistency and minimizing lock contention. is the established best practice in modern DBMS architecture."
  }
];