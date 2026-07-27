export const CHAPTER6_MCQ = [
  {
    q: "Consider a scenario in Relational Model where the Departments table's Date is frequently updated. What is a key concern? (GATE 2011)",
    options: ["Ensuring the table name is always capitalized.", "Maintaining data consistency and minimizing lock contention.", "Changing the column name every week for security.", "Hardcoding all possible values in the application code."],
    ans: 1,
    explanation: "For Relational Model, maintaining data consistency and minimizing lock contention. is the established best practice in modern DBMS architecture."
  },
  {
    q: "If you are designing a schema for Relational Model involving Suppliers and Students, what is the best approach? (GATE 2012)",
    options: ["Merge both tables into a single giant text file.", "Use random integers as the only data type.", "Establish a clear relationship using Foreign Keys on Address.", "Remove all Primary Keys to save disk space."],
    ans: 2,
    explanation: "For Relational Model, establish a clear relationship using foreign keys on address. is the established best practice in modern DBMS architecture."
  },
  {
    q: "In the context of Relational Model, how does applying consistency affect the Students table? (GATE 2013)",
    options: ["It improves overall system reliability regarding Students data.", "It causes immediate data loss in the ID column.", "It prevents any user from querying the Students table.", "It strictly requires hardware upgrades for the database."],
    ans: 0,
    explanation: "For Relational Model, it improves overall system reliability regarding students data. is the established best practice in modern DBMS architecture."
  },
  {
    q: "If you are designing a schema for Relational Model involving Customers and Invoices, what is the best approach? (GATE 2014)",
    options: ["Use random integers as the only data type.", "Establish a clear relationship using Foreign Keys on ID.", "Merge both tables into a single giant text file.", "Remove all Primary Keys to save disk space."],
    ans: 1,
    explanation: "For Relational Model, establish a clear relationship using foreign keys on id. is the established best practice in modern DBMS architecture."
  },
  {
    q: "Consider a scenario in Relational Model where the Departments table's Phone is frequently updated. What is a key concern? (GATE 2015)",
    options: ["Changing the column name every week for security.", "Hardcoding all possible values in the application code.", "Maintaining data consistency and minimizing lock contention.", "Ensuring the table name is always capitalized."],
    ans: 2,
    explanation: "For Relational Model, maintaining data consistency and minimizing lock contention. is the established best practice in modern DBMS architecture."
  },
  {
    q: "Which of the following is a common anti-pattern when dealing with Relational Model? (GATE 2016)",
    options: ["Storing comma-separated values in the ID column of the Transactions table.", "Using standard indexing techniques.", "Implementing proper backup strategies.", "Writing parameterized SQL queries."],
    ans: 0,
    explanation: "For Relational Model, storing comma-separated values in the id column of the transactions table. is the established best practice in modern DBMS architecture."
  },
  {
    q: "If you are designing a schema for Relational Model involving Orders and Invoices, what is the best approach? (GATE 2017)",
    options: ["Merge both tables into a single giant text file.", "Remove all Primary Keys to save disk space.", "Use random integers as the only data type.", "Establish a clear relationship using Foreign Keys on Quantity."],
    ans: 3,
    explanation: "For Relational Model, establish a clear relationship using foreign keys on quantity. is the established best practice in modern DBMS architecture."
  },
  {
    q: "If you are designing a schema for Relational Model involving Accounts and Employees, what is the best approach? (GATE 2018)",
    options: ["Remove all Primary Keys to save disk space.", "Merge both tables into a single giant text file.", "Establish a clear relationship using Foreign Keys on Email.", "Use random integers as the only data type."],
    ans: 2,
    explanation: "For Relational Model, establish a clear relationship using foreign keys on email. is the established best practice in modern DBMS architecture."
  },
  {
    q: "In the context of Relational Model, how does applying normalization affect the Products table? (GATE 2019)",
    options: ["It strictly requires hardware upgrades for the database.", "It prevents any user from querying the Products table.", "It causes immediate data loss in the Salary column.", "It improves overall system reliability regarding Products data."],
    ans: 3,
    explanation: "For Relational Model, it improves overall system reliability regarding products data. is the established best practice in modern DBMS architecture."
  },
  {
    q: "If you are designing a schema for Relational Model involving Employees and Students, what is the best approach? (GATE 2011)",
    options: ["Remove all Primary Keys to save disk space.", "Merge both tables into a single giant text file.", "Use random integers as the only data type.", "Establish a clear relationship using Foreign Keys on Salary."],
    ans: 3,
    explanation: "For Relational Model, establish a clear relationship using foreign keys on salary. is the established best practice in modern DBMS architecture."
  }
];