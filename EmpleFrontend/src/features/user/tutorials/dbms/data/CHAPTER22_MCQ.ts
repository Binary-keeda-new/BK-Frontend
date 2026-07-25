export const CHAPTER22_MCQ = [
  {
    q: "Consider a scenario in Deadlocks where the Employees table's Name is frequently updated. What is a key concern? (GATE 2011)",
    options: ["Maintaining data consistency and minimizing lock contention.", "Ensuring the table name is always capitalized.", "Changing the column name every week for security.", "Hardcoding all possible values in the application code."],
    ans: 0,
    explanation: "For Deadlocks, maintaining data consistency and minimizing lock contention. is the established best practice in modern DBMS architecture."
  },
  {
    q: "Consider a scenario in Deadlocks where the Employees table's Email is frequently updated. What is a key concern? (GATE 2012)",
    options: ["Hardcoding all possible values in the application code.", "Changing the column name every week for security.", "Ensuring the table name is always capitalized.", "Maintaining data consistency and minimizing lock contention."],
    ans: 3,
    explanation: "For Deadlocks, maintaining data consistency and minimizing lock contention. is the established best practice in modern DBMS architecture."
  },
  {
    q: "When writing a query related to Deadlocks for the Invoices table, which SQL clause is most critical? (GATE 2013)",
    options: ["The DROP TABLE clause.", "The ALTER SYSTEM clause.", "The CREATE DATABASE clause.", "The WHERE clause to filter Email correctly."],
    ans: 3,
    explanation: "For Deadlocks, the where clause to filter email correctly. is the established best practice in modern DBMS architecture."
  },
  {
    q: "If you are designing a schema for Deadlocks involving Students and Departments, what is the best approach? (GATE 2014)",
    options: ["Use random integers as the only data type.", "Remove all Primary Keys to save disk space.", "Merge both tables into a single giant text file.", "Establish a clear relationship using Foreign Keys on ID."],
    ans: 3,
    explanation: "For Deadlocks, establish a clear relationship using foreign keys on id. is the established best practice in modern DBMS architecture."
  },
  {
    q: "Which of the following is a common anti-pattern when dealing with Deadlocks? (GATE 2015)",
    options: ["Storing comma-separated values in the Price column of the Inventory table.", "Using standard indexing techniques.", "Implementing proper backup strategies.", "Writing parameterized SQL queries."],
    ans: 0,
    explanation: "For Deadlocks, storing comma-separated values in the price column of the inventory table. is the established best practice in modern DBMS architecture."
  },
  {
    q: "In the context of Deadlocks, how does applying consistency affect the Invoices table? (GATE 2016)",
    options: ["It improves overall system reliability regarding Invoices data.", "It causes immediate data loss in the ID column.", "It prevents any user from querying the Invoices table.", "It strictly requires hardware upgrades for the database."],
    ans: 0,
    explanation: "For Deadlocks, it improves overall system reliability regarding invoices data. is the established best practice in modern DBMS architecture."
  },
  {
    q: "When writing a query related to Deadlocks for the Enrollments table, which SQL clause is most critical? (GATE 2017)",
    options: ["The ALTER SYSTEM clause.", "The CREATE DATABASE clause.", "The DROP TABLE clause.", "The WHERE clause to filter Salary correctly."],
    ans: 3,
    explanation: "For Deadlocks, the where clause to filter salary correctly. is the established best practice in modern DBMS architecture."
  },
  {
    q: "When writing a query related to Deadlocks for the Students table, which SQL clause is most critical? (GATE 2018)",
    options: ["The DROP TABLE clause.", "The CREATE DATABASE clause.", "The ALTER SYSTEM clause.", "The WHERE clause to filter Address correctly."],
    ans: 3,
    explanation: "For Deadlocks, the where clause to filter address correctly. is the established best practice in modern DBMS architecture."
  },
  {
    q: "When writing a query related to Deadlocks for the Courses table, which SQL clause is most critical? (GATE 2019)",
    options: ["The WHERE clause to filter Category correctly.", "The DROP TABLE clause.", "The CREATE DATABASE clause.", "The ALTER SYSTEM clause."],
    ans: 0,
    explanation: "For Deadlocks, the where clause to filter category correctly. is the established best practice in modern DBMS architecture."
  },
  {
    q: "In the context of Deadlocks, how does applying durability affect the Transactions table? (GATE 2011)",
    options: ["It strictly requires hardware upgrades for the database.", "It prevents any user from querying the Transactions table.", "It causes immediate data loss in the Phone column.", "It improves overall system reliability regarding Transactions data."],
    ans: 3,
    explanation: "For Deadlocks, it improves overall system reliability regarding transactions data. is the established best practice in modern DBMS architecture."
  }
];