export const CHAPTER16_MCQ = [
  {
    q: "If you are designing a schema for Views, Indexes and Sequences involving Accounts and Students, what is the best approach? (GATE 2011)",
    options: ["Use random integers as the only data type.", "Establish a clear relationship using Foreign Keys on ID.", "Merge both tables into a single giant text file.", "Remove all Primary Keys to save disk space."],
    ans: 1,
    explanation: "For Views, Indexes and Sequences, establish a clear relationship using foreign keys on id. is the established best practice in modern DBMS architecture."
  },
  {
    q: "Consider a scenario in Views, Indexes and Sequences where the Students table's Status is frequently updated. What is a key concern? (GATE 2012)",
    options: ["Maintaining data consistency and minimizing lock contention.", "Changing the column name every week for security.", "Hardcoding all possible values in the application code.", "Ensuring the table name is always capitalized."],
    ans: 0,
    explanation: "For Views, Indexes and Sequences, maintaining data consistency and minimizing lock contention. is the established best practice in modern DBMS architecture."
  },
  {
    q: "In the context of Views, Indexes and Sequences, how does applying consistency affect the Students table? (GATE 2013)",
    options: ["It prevents any user from querying the Students table.", "It causes immediate data loss in the Quantity column.", "It strictly requires hardware upgrades for the database.", "It improves overall system reliability regarding Students data."],
    ans: 3,
    explanation: "For Views, Indexes and Sequences, it improves overall system reliability regarding students data. is the established best practice in modern DBMS architecture."
  },
  {
    q: "When writing a query related to Views, Indexes and Sequences for the Inventory table, which SQL clause is most critical? (GATE 2014)",
    options: ["The ALTER SYSTEM clause.", "The DROP TABLE clause.", "The CREATE DATABASE clause.", "The WHERE clause to filter Date correctly."],
    ans: 3,
    explanation: "For Views, Indexes and Sequences, the where clause to filter date correctly. is the established best practice in modern DBMS architecture."
  },
  {
    q: "When writing a query related to Views, Indexes and Sequences for the Transactions table, which SQL clause is most critical? (GATE 2015)",
    options: ["The CREATE DATABASE clause.", "The DROP TABLE clause.", "The ALTER SYSTEM clause.", "The WHERE clause to filter Status correctly."],
    ans: 3,
    explanation: "For Views, Indexes and Sequences, the where clause to filter status correctly. is the established best practice in modern DBMS architecture."
  },
  {
    q: "If you are designing a schema for Views, Indexes and Sequences involving Accounts and Students, what is the best approach? (GATE 2016)",
    options: ["Use random integers as the only data type.", "Remove all Primary Keys to save disk space.", "Merge both tables into a single giant text file.", "Establish a clear relationship using Foreign Keys on Amount."],
    ans: 3,
    explanation: "For Views, Indexes and Sequences, establish a clear relationship using foreign keys on amount. is the established best practice in modern DBMS architecture."
  },
  {
    q: "If you are designing a schema for Views, Indexes and Sequences involving Products and Orders, what is the best approach? (GATE 2017)",
    options: ["Establish a clear relationship using Foreign Keys on Date.", "Merge both tables into a single giant text file.", "Remove all Primary Keys to save disk space.", "Use random integers as the only data type."],
    ans: 0,
    explanation: "For Views, Indexes and Sequences, establish a clear relationship using foreign keys on date. is the established best practice in modern DBMS architecture."
  },
  {
    q: "In the context of Views, Indexes and Sequences, how does applying normalization affect the Students table? (GATE 2018)",
    options: ["It strictly requires hardware upgrades for the database.", "It prevents any user from querying the Students table.", "It causes immediate data loss in the Name column.", "It improves overall system reliability regarding Students data."],
    ans: 3,
    explanation: "For Views, Indexes and Sequences, it improves overall system reliability regarding students data. is the established best practice in modern DBMS architecture."
  },
  {
    q: "When writing a query related to Views, Indexes and Sequences for the Inventory table, which SQL clause is most critical? (GATE 2019)",
    options: ["The CREATE DATABASE clause.", "The DROP TABLE clause.", "The WHERE clause to filter Quantity correctly.", "The ALTER SYSTEM clause."],
    ans: 2,
    explanation: "For Views, Indexes and Sequences, the where clause to filter quantity correctly. is the established best practice in modern DBMS architecture."
  },
  {
    q: "Which of the following is a common anti-pattern when dealing with Views, Indexes and Sequences? (GATE 2011)",
    options: ["Using standard indexing techniques.", "Storing comma-separated values in the Name column of the Customers table.", "Writing parameterized SQL queries.", "Implementing proper backup strategies."],
    ans: 1,
    explanation: "For Views, Indexes and Sequences, storing comma-separated values in the name column of the customers table. is the established best practice in modern DBMS architecture."
  }
];