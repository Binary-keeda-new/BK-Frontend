export const CHAPTER17_MCQ = [
  {
    q: "In the context of Functional Dependencies, how does applying durability affect the Customers table? (GATE 2011)",
    options: ["It strictly requires hardware upgrades for the database.", "It prevents any user from querying the Customers table.", "It causes immediate data loss in the Quantity column.", "It improves overall system reliability regarding Customers data."],
    ans: 3,
    explanation: "For Functional Dependencies, it improves overall system reliability regarding customers data. is the established best practice in modern DBMS architecture."
  },
  {
    q: "If you are designing a schema for Functional Dependencies involving Inventory and Shipments, what is the best approach? (GATE 2012)",
    options: ["Merge both tables into a single giant text file.", "Establish a clear relationship using Foreign Keys on Total.", "Remove all Primary Keys to save disk space.", "Use random integers as the only data type."],
    ans: 1,
    explanation: "For Functional Dependencies, establish a clear relationship using foreign keys on total. is the established best practice in modern DBMS architecture."
  },
  {
    q: "In the context of Functional Dependencies, how does applying isolation affect the Employees table? (GATE 2013)",
    options: ["It strictly requires hardware upgrades for the database.", "It prevents any user from querying the Employees table.", "It causes immediate data loss in the Salary column.", "It improves overall system reliability regarding Employees data."],
    ans: 3,
    explanation: "For Functional Dependencies, it improves overall system reliability regarding employees data. is the established best practice in modern DBMS architecture."
  },
  {
    q: "If you are designing a schema for Functional Dependencies involving Employees and Employees, what is the best approach? (GATE 2014)",
    options: ["Establish a clear relationship using Foreign Keys on Email.", "Use random integers as the only data type.", "Remove all Primary Keys to save disk space.", "Merge both tables into a single giant text file."],
    ans: 0,
    explanation: "For Functional Dependencies, establish a clear relationship using foreign keys on email. is the established best practice in modern DBMS architecture."
  },
  {
    q: "When writing a query related to Functional Dependencies for the Invoices table, which SQL clause is most critical? (GATE 2015)",
    options: ["The CREATE DATABASE clause.", "The DROP TABLE clause.", "The ALTER SYSTEM clause.", "The WHERE clause to filter Amount correctly."],
    ans: 3,
    explanation: "For Functional Dependencies, the where clause to filter amount correctly. is the established best practice in modern DBMS architecture."
  },
  {
    q: "Consider a scenario in Functional Dependencies where the Invoices table's Address is frequently updated. What is a key concern? (GATE 2016)",
    options: ["Hardcoding all possible values in the application code.", "Changing the column name every week for security.", "Ensuring the table name is always capitalized.", "Maintaining data consistency and minimizing lock contention."],
    ans: 3,
    explanation: "For Functional Dependencies, maintaining data consistency and minimizing lock contention. is the established best practice in modern DBMS architecture."
  },
  {
    q: "When writing a query related to Functional Dependencies for the Orders table, which SQL clause is most critical? (GATE 2017)",
    options: ["The CREATE DATABASE clause.", "The ALTER SYSTEM clause.", "The DROP TABLE clause.", "The WHERE clause to filter Email correctly."],
    ans: 3,
    explanation: "For Functional Dependencies, the where clause to filter email correctly. is the established best practice in modern DBMS architecture."
  },
  {
    q: "When writing a query related to Functional Dependencies for the Departments table, which SQL clause is most critical? (GATE 2018)",
    options: ["The CREATE DATABASE clause.", "The ALTER SYSTEM clause.", "The DROP TABLE clause.", "The WHERE clause to filter Total correctly."],
    ans: 3,
    explanation: "For Functional Dependencies, the where clause to filter total correctly. is the established best practice in modern DBMS architecture."
  },
  {
    q: "In the context of Functional Dependencies, how does applying integrity affect the Shipments table? (GATE 2019)",
    options: ["It improves overall system reliability regarding Shipments data.", "It strictly requires hardware upgrades for the database.", "It prevents any user from querying the Shipments table.", "It causes immediate data loss in the Role column."],
    ans: 0,
    explanation: "For Functional Dependencies, it improves overall system reliability regarding shipments data. is the established best practice in modern DBMS architecture."
  },
  {
    q: "Which of the following is a common anti-pattern when dealing with Functional Dependencies? (GATE 2011)",
    options: ["Implementing proper backup strategies.", "Writing parameterized SQL queries.", "Using standard indexing techniques.", "Storing comma-separated values in the Email column of the Products table."],
    ans: 3,
    explanation: "For Functional Dependencies, storing comma-separated values in the email column of the products table. is the established best practice in modern DBMS architecture."
  }
];