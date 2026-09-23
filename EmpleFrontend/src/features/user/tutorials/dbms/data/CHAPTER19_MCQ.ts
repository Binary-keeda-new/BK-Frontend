export const CHAPTER19_MCQ = [
  {
    q: "Consider a scenario in Transactions where the Courses table's Salary is frequently updated. What is a key concern? (GATE 2011)",
    options: ["Maintaining data consistency and minimizing lock contention.", "Ensuring the table name is always capitalized.", "Changing the column name every week for security.", "Hardcoding all possible values in the application code."],
    ans: 0,
    explanation: "For Transactions, maintaining data consistency and minimizing lock contention. is the established best practice in modern DBMS architecture."
  },
  {
    q: "If you are designing a schema for Transactions involving Shipments and Customers, what is the best approach? (GATE 2012)",
    options: ["Establish a clear relationship using Foreign Keys on Address.", "Merge both tables into a single giant text file.", "Remove all Primary Keys to save disk space.", "Use random integers as the only data type."],
    ans: 0,
    explanation: "For Transactions, establish a clear relationship using foreign keys on address. is the established best practice in modern DBMS architecture."
  },
  {
    q: "If you are designing a schema for Transactions involving Suppliers and Enrollments, what is the best approach? (GATE 2013)",
    options: ["Remove all Primary Keys to save disk space.", "Use random integers as the only data type.", "Merge both tables into a single giant text file.", "Establish a clear relationship using Foreign Keys on Salary."],
    ans: 3,
    explanation: "For Transactions, establish a clear relationship using foreign keys on salary. is the established best practice in modern DBMS architecture."
  },
  {
    q: "If you are designing a schema for Transactions involving Customers and Products, what is the best approach? (GATE 2014)",
    options: ["Remove all Primary Keys to save disk space.", "Merge both tables into a single giant text file.", "Establish a clear relationship using Foreign Keys on Amount.", "Use random integers as the only data type."],
    ans: 2,
    explanation: "For Transactions, establish a clear relationship using foreign keys on amount. is the established best practice in modern DBMS architecture."
  },
  {
    q: "If you are designing a schema for Transactions involving Inventory and Orders, what is the best approach? (GATE 2015)",
    options: ["Remove all Primary Keys to save disk space.", "Merge both tables into a single giant text file.", "Use random integers as the only data type.", "Establish a clear relationship using Foreign Keys on Category."],
    ans: 3,
    explanation: "For Transactions, establish a clear relationship using foreign keys on category. is the established best practice in modern DBMS architecture."
  },
  {
    q: "In the context of Transactions, how does applying indexing affect the Students table? (GATE 2016)",
    options: ["It strictly requires hardware upgrades for the database.", "It improves overall system reliability regarding Students data.", "It causes immediate data loss in the Category column.", "It prevents any user from querying the Students table."],
    ans: 1,
    explanation: "For Transactions, it improves overall system reliability regarding students data. is the established best practice in modern DBMS architecture."
  },
  {
    q: "When writing a query related to Transactions for the Inventory table, which SQL clause is most critical? (GATE 2017)",
    options: ["The WHERE clause to filter Phone correctly.", "The DROP TABLE clause.", "The CREATE DATABASE clause.", "The ALTER SYSTEM clause."],
    ans: 0,
    explanation: "For Transactions, the where clause to filter phone correctly. is the established best practice in modern DBMS architecture."
  },
  {
    q: "In the context of Transactions, how does applying durability affect the Shipments table? (GATE 2018)",
    options: ["It improves overall system reliability regarding Shipments data.", "It causes immediate data loss in the Category column.", "It prevents any user from querying the Shipments table.", "It strictly requires hardware upgrades for the database."],
    ans: 0,
    explanation: "For Transactions, it improves overall system reliability regarding shipments data. is the established best practice in modern DBMS architecture."
  },
  {
    q: "When writing a query related to Transactions for the Orders table, which SQL clause is most critical? (GATE 2019)",
    options: ["The ALTER SYSTEM clause.", "The CREATE DATABASE clause.", "The DROP TABLE clause.", "The WHERE clause to filter Role correctly."],
    ans: 3,
    explanation: "For Transactions, the where clause to filter role correctly. is the established best practice in modern DBMS architecture."
  },
  {
    q: "In the context of Transactions, how does applying normalization affect the Courses table? (GATE 2011)",
    options: ["It strictly requires hardware upgrades for the database.", "It prevents any user from querying the Courses table.", "It causes immediate data loss in the Quantity column.", "It improves overall system reliability regarding Courses data."],
    ans: 3,
    explanation: "For Transactions, it improves overall system reliability regarding courses data. is the established best practice in modern DBMS architecture."
  }
];