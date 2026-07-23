export const CHAPTER14_MCQ = [
  {
    q: "In the context of SQL Joins, how does applying availability affect the Products table? (GATE 2011)",
    options: ["It strictly requires hardware upgrades for the database.", "It improves overall system reliability regarding Products data.", "It causes immediate data loss in the Total column.", "It prevents any user from querying the Products table."],
    ans: 1,
    explanation: "For SQL Joins, it improves overall system reliability regarding products data. is the established best practice in modern DBMS architecture."
  },
  {
    q: "Consider a scenario in SQL Joins where the Customers table's ID is frequently updated. What is a key concern? (GATE 2012)",
    options: ["Ensuring the table name is always capitalized.", "Hardcoding all possible values in the application code.", "Changing the column name every week for security.", "Maintaining data consistency and minimizing lock contention."],
    ans: 3,
    explanation: "For SQL Joins, maintaining data consistency and minimizing lock contention. is the established best practice in modern DBMS architecture."
  },
  {
    q: "Which of the following is a common anti-pattern when dealing with SQL Joins? (GATE 2013)",
    options: ["Implementing proper backup strategies.", "Writing parameterized SQL queries.", "Using standard indexing techniques.", "Storing comma-separated values in the Status column of the Employees table."],
    ans: 3,
    explanation: "For SQL Joins, storing comma-separated values in the status column of the employees table. is the established best practice in modern DBMS architecture."
  },
  {
    q: "Which of the following is a common anti-pattern when dealing with SQL Joins? (GATE 2014)",
    options: ["Writing parameterized SQL queries.", "Implementing proper backup strategies.", "Using standard indexing techniques.", "Storing comma-separated values in the Name column of the Shipments table."],
    ans: 3,
    explanation: "For SQL Joins, storing comma-separated values in the name column of the shipments table. is the established best practice in modern DBMS architecture."
  },
  {
    q: "Which of the following is a common anti-pattern when dealing with SQL Joins? (GATE 2015)",
    options: ["Using standard indexing techniques.", "Storing comma-separated values in the Role column of the Students table.", "Writing parameterized SQL queries.", "Implementing proper backup strategies."],
    ans: 1,
    explanation: "For SQL Joins, storing comma-separated values in the role column of the students table. is the established best practice in modern DBMS architecture."
  },
  {
    q: "In the context of SQL Joins, how does applying integrity affect the Accounts table? (GATE 2016)",
    options: ["It prevents any user from querying the Accounts table.", "It strictly requires hardware upgrades for the database.", "It improves overall system reliability regarding Accounts data.", "It causes immediate data loss in the Total column."],
    ans: 2,
    explanation: "For SQL Joins, it improves overall system reliability regarding accounts data. is the established best practice in modern DBMS architecture."
  },
  {
    q: "If you are designing a schema for SQL Joins involving Departments and Accounts, what is the best approach? (GATE 2017)",
    options: ["Use random integers as the only data type.", "Merge both tables into a single giant text file.", "Remove all Primary Keys to save disk space.", "Establish a clear relationship using Foreign Keys on Amount."],
    ans: 3,
    explanation: "For SQL Joins, establish a clear relationship using foreign keys on amount. is the established best practice in modern DBMS architecture."
  },
  {
    q: "When writing a query related to SQL Joins for the Courses table, which SQL clause is most critical? (GATE 2018)",
    options: ["The ALTER SYSTEM clause.", "The CREATE DATABASE clause.", "The DROP TABLE clause.", "The WHERE clause to filter Role correctly."],
    ans: 3,
    explanation: "For SQL Joins, the where clause to filter role correctly. is the established best practice in modern DBMS architecture."
  },
  {
    q: "If you are designing a schema for SQL Joins involving Enrollments and Courses, what is the best approach? (GATE 2019)",
    options: ["Establish a clear relationship using Foreign Keys on Phone.", "Use random integers as the only data type.", "Remove all Primary Keys to save disk space.", "Merge both tables into a single giant text file."],
    ans: 0,
    explanation: "For SQL Joins, establish a clear relationship using foreign keys on phone. is the established best practice in modern DBMS architecture."
  },
  {
    q: "When writing a query related to SQL Joins for the Inventory table, which SQL clause is most critical? (GATE 2011)",
    options: ["The CREATE DATABASE clause.", "The DROP TABLE clause.", "The WHERE clause to filter Role correctly.", "The ALTER SYSTEM clause."],
    ans: 2,
    explanation: "For SQL Joins, the where clause to filter role correctly. is the established best practice in modern DBMS architecture."
  }
];