export const CHAPTER24_MCQ = [
  {
    q: "If you are designing a schema for Database Recovery involving Courses and Employees, what is the best approach? (GATE 2011)",
    options: ["Use random integers as the only data type.", "Merge both tables into a single giant text file.", "Remove all Primary Keys to save disk space.", "Establish a clear relationship using Foreign Keys on Name."],
    ans: 3,
    explanation: "For Database Recovery, establish a clear relationship using foreign keys on name. is the established best practice in modern DBMS architecture."
  },
  {
    q: "If you are designing a schema for Database Recovery involving Orders and Customers, what is the best approach? (GATE 2012)",
    options: ["Use random integers as the only data type.", "Establish a clear relationship using Foreign Keys on Status.", "Merge both tables into a single giant text file.", "Remove all Primary Keys to save disk space."],
    ans: 1,
    explanation: "For Database Recovery, establish a clear relationship using foreign keys on status. is the established best practice in modern DBMS architecture."
  },
  {
    q: "When writing a query related to Database Recovery for the Enrollments table, which SQL clause is most critical? (GATE 2013)",
    options: ["The ALTER SYSTEM clause.", "The CREATE DATABASE clause.", "The DROP TABLE clause.", "The WHERE clause to filter Role correctly."],
    ans: 3,
    explanation: "For Database Recovery, the where clause to filter role correctly. is the established best practice in modern DBMS architecture."
  },
  {
    q: "In the context of Database Recovery, how does applying optimization affect the Invoices table? (GATE 2014)",
    options: ["It improves overall system reliability regarding Invoices data.", "It prevents any user from querying the Invoices table.", "It strictly requires hardware upgrades for the database.", "It causes immediate data loss in the Category column."],
    ans: 0,
    explanation: "For Database Recovery, it improves overall system reliability regarding invoices data. is the established best practice in modern DBMS architecture."
  },
  {
    q: "If you are designing a schema for Database Recovery involving Invoices and Customers, what is the best approach? (GATE 2015)",
    options: ["Establish a clear relationship using Foreign Keys on Name.", "Use random integers as the only data type.", "Remove all Primary Keys to save disk space.", "Merge both tables into a single giant text file."],
    ans: 0,
    explanation: "For Database Recovery, establish a clear relationship using foreign keys on name. is the established best practice in modern DBMS architecture."
  },
  {
    q: "Which of the following is a common anti-pattern when dealing with Database Recovery? (GATE 2016)",
    options: ["Storing comma-separated values in the Status column of the Products table.", "Writing parameterized SQL queries.", "Using standard indexing techniques.", "Implementing proper backup strategies."],
    ans: 0,
    explanation: "For Database Recovery, storing comma-separated values in the status column of the products table. is the established best practice in modern DBMS architecture."
  },
  {
    q: "When writing a query related to Database Recovery for the Courses table, which SQL clause is most critical? (GATE 2017)",
    options: ["The WHERE clause to filter Phone correctly.", "The ALTER SYSTEM clause.", "The DROP TABLE clause.", "The CREATE DATABASE clause."],
    ans: 0,
    explanation: "For Database Recovery, the where clause to filter phone correctly. is the established best practice in modern DBMS architecture."
  },
  {
    q: "Consider a scenario in Database Recovery where the Shipments table's Category is frequently updated. What is a key concern? (GATE 2018)",
    options: ["Maintaining data consistency and minimizing lock contention.", "Changing the column name every week for security.", "Ensuring the table name is always capitalized.", "Hardcoding all possible values in the application code."],
    ans: 0,
    explanation: "For Database Recovery, maintaining data consistency and minimizing lock contention. is the established best practice in modern DBMS architecture."
  },
  {
    q: "Which of the following is a common anti-pattern when dealing with Database Recovery? (GATE 2019)",
    options: ["Using standard indexing techniques.", "Writing parameterized SQL queries.", "Storing comma-separated values in the Amount column of the Orders table.", "Implementing proper backup strategies."],
    ans: 2,
    explanation: "For Database Recovery, storing comma-separated values in the amount column of the orders table. is the established best practice in modern DBMS architecture."
  },
  {
    q: "If you are designing a schema for Database Recovery involving Shipments and Departments, what is the best approach? (GATE 2011)",
    options: ["Use random integers as the only data type.", "Remove all Primary Keys to save disk space.", "Merge both tables into a single giant text file.", "Establish a clear relationship using Foreign Keys on Category."],
    ans: 3,
    explanation: "For Database Recovery, establish a clear relationship using foreign keys on category. is the established best practice in modern DBMS architecture."
  }
];