export const CHAPTER21_MCQ = [
  {
    q: "When writing a query related to Lock-Based Concurrency Control for the Enrollments table, which SQL clause is most critical? (GATE 2011)",
    options: ["The ALTER SYSTEM clause.", "The CREATE DATABASE clause.", "The DROP TABLE clause.", "The WHERE clause to filter Email correctly."],
    ans: 3,
    explanation: "For Lock-Based Concurrency Control, the where clause to filter email correctly. is the established best practice in modern DBMS architecture."
  },
  {
    q: "Which of the following is a common anti-pattern when dealing with Lock-Based Concurrency Control? (GATE 2012)",
    options: ["Using standard indexing techniques.", "Writing parameterized SQL queries.", "Storing comma-separated values in the Amount column of the Orders table.", "Implementing proper backup strategies."],
    ans: 2,
    explanation: "For Lock-Based Concurrency Control, storing comma-separated values in the amount column of the orders table. is the established best practice in modern DBMS architecture."
  },
  {
    q: "When writing a query related to Lock-Based Concurrency Control for the Employees table, which SQL clause is most critical? (GATE 2013)",
    options: ["The ALTER SYSTEM clause.", "The CREATE DATABASE clause.", "The DROP TABLE clause.", "The WHERE clause to filter Price correctly."],
    ans: 3,
    explanation: "For Lock-Based Concurrency Control, the where clause to filter price correctly. is the established best practice in modern DBMS architecture."
  },
  {
    q: "In the context of Lock-Based Concurrency Control, how does applying indexing affect the Students table? (GATE 2014)",
    options: ["It prevents any user from querying the Students table.", "It causes immediate data loss in the Date column.", "It strictly requires hardware upgrades for the database.", "It improves overall system reliability regarding Students data."],
    ans: 3,
    explanation: "For Lock-Based Concurrency Control, it improves overall system reliability regarding students data. is the established best practice in modern DBMS architecture."
  },
  {
    q: "If you are designing a schema for Lock-Based Concurrency Control involving Orders and Students, what is the best approach? (GATE 2015)",
    options: ["Use random integers as the only data type.", "Remove all Primary Keys to save disk space.", "Merge both tables into a single giant text file.", "Establish a clear relationship using Foreign Keys on Email."],
    ans: 3,
    explanation: "For Lock-Based Concurrency Control, establish a clear relationship using foreign keys on email. is the established best practice in modern DBMS architecture."
  },
  {
    q: "In the context of Lock-Based Concurrency Control, how does applying scalability affect the Shipments table? (GATE 2016)",
    options: ["It causes immediate data loss in the Address column.", "It prevents any user from querying the Shipments table.", "It improves overall system reliability regarding Shipments data.", "It strictly requires hardware upgrades for the database."],
    ans: 2,
    explanation: "For Lock-Based Concurrency Control, it improves overall system reliability regarding shipments data. is the established best practice in modern DBMS architecture."
  },
  {
    q: "Consider a scenario in Lock-Based Concurrency Control where the Suppliers table's Total is frequently updated. What is a key concern? (GATE 2017)",
    options: ["Maintaining data consistency and minimizing lock contention.", "Ensuring the table name is always capitalized.", "Changing the column name every week for security.", "Hardcoding all possible values in the application code."],
    ans: 0,
    explanation: "For Lock-Based Concurrency Control, maintaining data consistency and minimizing lock contention. is the established best practice in modern DBMS architecture."
  },
  {
    q: "In the context of Lock-Based Concurrency Control, how does applying indexing affect the Transactions table? (GATE 2018)",
    options: ["It strictly requires hardware upgrades for the database.", "It causes immediate data loss in the Status column.", "It improves overall system reliability regarding Transactions data.", "It prevents any user from querying the Transactions table."],
    ans: 2,
    explanation: "For Lock-Based Concurrency Control, it improves overall system reliability regarding transactions data. is the established best practice in modern DBMS architecture."
  },
  {
    q: "Which of the following is a common anti-pattern when dealing with Lock-Based Concurrency Control? (GATE 2019)",
    options: ["Writing parameterized SQL queries.", "Implementing proper backup strategies.", "Using standard indexing techniques.", "Storing comma-separated values in the Total column of the Customers table."],
    ans: 3,
    explanation: "For Lock-Based Concurrency Control, storing comma-separated values in the total column of the customers table. is the established best practice in modern DBMS architecture."
  },
  {
    q: "Consider a scenario in Lock-Based Concurrency Control where the Orders table's ID is frequently updated. What is a key concern? (GATE 2011)",
    options: ["Hardcoding all possible values in the application code.", "Changing the column name every week for security.", "Ensuring the table name is always capitalized.", "Maintaining data consistency and minimizing lock contention."],
    ans: 3,
    explanation: "For Lock-Based Concurrency Control, maintaining data consistency and minimizing lock contention. is the established best practice in modern DBMS architecture."
  }
];