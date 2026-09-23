export const CHAPTER18_MCQ = [
  {
    q: "When writing a query related to Normalization for the Orders table, which SQL clause is most critical? (GATE 2011)",
    options: ["The ALTER SYSTEM clause.", "The WHERE clause to filter ID correctly.", "The DROP TABLE clause.", "The CREATE DATABASE clause."],
    ans: 1,
    explanation: "For Normalization, the where clause to filter id correctly. is the established best practice in modern DBMS architecture."
  },
  {
    q: "Consider a scenario in Normalization where the Transactions table's Role is frequently updated. What is a key concern? (GATE 2012)",
    options: ["Hardcoding all possible values in the application code.", "Maintaining data consistency and minimizing lock contention.", "Ensuring the table name is always capitalized.", "Changing the column name every week for security."],
    ans: 1,
    explanation: "For Normalization, maintaining data consistency and minimizing lock contention. is the established best practice in modern DBMS architecture."
  },
  {
    q: "In the context of Normalization, how does applying durability affect the Departments table? (GATE 2013)",
    options: ["It improves overall system reliability regarding Departments data.", "It causes immediate data loss in the Phone column.", "It prevents any user from querying the Departments table.", "It strictly requires hardware upgrades for the database."],
    ans: 0,
    explanation: "For Normalization, it improves overall system reliability regarding departments data. is the established best practice in modern DBMS architecture."
  },
  {
    q: "If you are designing a schema for Normalization involving Transactions and Inventory, what is the best approach? (GATE 2014)",
    options: ["Use random integers as the only data type.", "Remove all Primary Keys to save disk space.", "Merge both tables into a single giant text file.", "Establish a clear relationship using Foreign Keys on Category."],
    ans: 3,
    explanation: "For Normalization, establish a clear relationship using foreign keys on category. is the established best practice in modern DBMS architecture."
  },
  {
    q: "In the context of Normalization, how does applying indexing affect the Invoices table? (GATE 2015)",
    options: ["It causes immediate data loss in the Phone column.", "It improves overall system reliability regarding Invoices data.", "It prevents any user from querying the Invoices table.", "It strictly requires hardware upgrades for the database."],
    ans: 1,
    explanation: "For Normalization, it improves overall system reliability regarding invoices data. is the established best practice in modern DBMS architecture."
  },
  {
    q: "Which of the following is a common anti-pattern when dealing with Normalization? (GATE 2016)",
    options: ["Storing comma-separated values in the Phone column of the Accounts table.", "Using standard indexing techniques.", "Implementing proper backup strategies.", "Writing parameterized SQL queries."],
    ans: 0,
    explanation: "For Normalization, storing comma-separated values in the phone column of the accounts table. is the established best practice in modern DBMS architecture."
  },
  {
    q: "Consider a scenario in Normalization where the Transactions table's Address is frequently updated. What is a key concern? (GATE 2017)",
    options: ["Changing the column name every week for security.", "Ensuring the table name is always capitalized.", "Maintaining data consistency and minimizing lock contention.", "Hardcoding all possible values in the application code."],
    ans: 2,
    explanation: "For Normalization, maintaining data consistency and minimizing lock contention. is the established best practice in modern DBMS architecture."
  },
  {
    q: "Consider a scenario in Normalization where the Suppliers table's Salary is frequently updated. What is a key concern? (GATE 2018)",
    options: ["Maintaining data consistency and minimizing lock contention.", "Hardcoding all possible values in the application code.", "Ensuring the table name is always capitalized.", "Changing the column name every week for security."],
    ans: 0,
    explanation: "For Normalization, maintaining data consistency and minimizing lock contention. is the established best practice in modern DBMS architecture."
  },
  {
    q: "When writing a query related to Normalization for the Shipments table, which SQL clause is most critical? (GATE 2019)",
    options: ["The WHERE clause to filter Name correctly.", "The ALTER SYSTEM clause.", "The CREATE DATABASE clause.", "The DROP TABLE clause."],
    ans: 0,
    explanation: "For Normalization, the where clause to filter name correctly. is the established best practice in modern DBMS architecture."
  },
  {
    q: "When writing a query related to Normalization for the Suppliers table, which SQL clause is most critical? (GATE 2011)",
    options: ["The WHERE clause to filter Email correctly.", "The DROP TABLE clause.", "The CREATE DATABASE clause.", "The ALTER SYSTEM clause."],
    ans: 0,
    explanation: "For Normalization, the where clause to filter email correctly. is the established best practice in modern DBMS architecture."
  }
];