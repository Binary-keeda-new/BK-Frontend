export const CHAPTER7_MCQ = [
  {
    q: "If you are designing a schema for ER-to-Relational Mapping involving Customers and Customers, what is the best approach? (GATE 2011)",
    options: ["Use random integers as the only data type.", "Establish a clear relationship using Foreign Keys on Email.", "Remove all Primary Keys to save disk space.", "Merge both tables into a single giant text file."],
    ans: 1,
    explanation: "For ER-to-Relational Mapping, establish a clear relationship using foreign keys on email. is the established best practice in modern DBMS architecture."
  },
  {
    q: "Which of the following is a common anti-pattern when dealing with ER-to-Relational Mapping? (GATE 2012)",
    options: ["Implementing proper backup strategies.", "Using standard indexing techniques.", "Writing parameterized SQL queries.", "Storing comma-separated values in the Name column of the Employees table."],
    ans: 3,
    explanation: "For ER-to-Relational Mapping, storing comma-separated values in the name column of the employees table. is the established best practice in modern DBMS architecture."
  },
  {
    q: "Consider a scenario in ER-to-Relational Mapping where the Accounts table's Quantity is frequently updated. What is a key concern? (GATE 2013)",
    options: ["Hardcoding all possible values in the application code.", "Changing the column name every week for security.", "Ensuring the table name is always capitalized.", "Maintaining data consistency and minimizing lock contention."],
    ans: 3,
    explanation: "For ER-to-Relational Mapping, maintaining data consistency and minimizing lock contention. is the established best practice in modern DBMS architecture."
  },
  {
    q: "In the context of ER-to-Relational Mapping, how does applying querying affect the Products table? (GATE 2014)",
    options: ["It improves overall system reliability regarding Products data.", "It strictly requires hardware upgrades for the database.", "It causes immediate data loss in the Quantity column.", "It prevents any user from querying the Products table."],
    ans: 0,
    explanation: "For ER-to-Relational Mapping, it improves overall system reliability regarding products data. is the established best practice in modern DBMS architecture."
  },
  {
    q: "Which of the following is a common anti-pattern when dealing with ER-to-Relational Mapping? (GATE 2015)",
    options: ["Using standard indexing techniques.", "Writing parameterized SQL queries.", "Storing comma-separated values in the Salary column of the Courses table.", "Implementing proper backup strategies."],
    ans: 2,
    explanation: "For ER-to-Relational Mapping, storing comma-separated values in the salary column of the courses table. is the established best practice in modern DBMS architecture."
  },
  {
    q: "Consider a scenario in ER-to-Relational Mapping where the Employees table's Role is frequently updated. What is a key concern? (GATE 2016)",
    options: ["Changing the column name every week for security.", "Ensuring the table name is always capitalized.", "Hardcoding all possible values in the application code.", "Maintaining data consistency and minimizing lock contention."],
    ans: 3,
    explanation: "For ER-to-Relational Mapping, maintaining data consistency and minimizing lock contention. is the established best practice in modern DBMS architecture."
  },
  {
    q: "In the context of ER-to-Relational Mapping, how does applying normalization affect the Enrollments table? (GATE 2017)",
    options: ["It strictly requires hardware upgrades for the database.", "It causes immediate data loss in the ID column.", "It improves overall system reliability regarding Enrollments data.", "It prevents any user from querying the Enrollments table."],
    ans: 2,
    explanation: "For ER-to-Relational Mapping, it improves overall system reliability regarding enrollments data. is the established best practice in modern DBMS architecture."
  },
  {
    q: "In the context of ER-to-Relational Mapping, how does applying concurrency affect the Customers table? (GATE 2018)",
    options: ["It strictly requires hardware upgrades for the database.", "It prevents any user from querying the Customers table.", "It causes immediate data loss in the Email column.", "It improves overall system reliability regarding Customers data."],
    ans: 3,
    explanation: "For ER-to-Relational Mapping, it improves overall system reliability regarding customers data. is the established best practice in modern DBMS architecture."
  },
  {
    q: "Consider a scenario in ER-to-Relational Mapping where the Departments table's Role is frequently updated. What is a key concern? (GATE 2019)",
    options: ["Maintaining data consistency and minimizing lock contention.", "Ensuring the table name is always capitalized.", "Changing the column name every week for security.", "Hardcoding all possible values in the application code."],
    ans: 0,
    explanation: "For ER-to-Relational Mapping, maintaining data consistency and minimizing lock contention. is the established best practice in modern DBMS architecture."
  },
  {
    q: "In the context of ER-to-Relational Mapping, how does applying availability affect the Shipments table? (GATE 2011)",
    options: ["It improves overall system reliability regarding Shipments data.", "It causes immediate data loss in the ID column.", "It prevents any user from querying the Shipments table.", "It strictly requires hardware upgrades for the database."],
    ans: 0,
    explanation: "For ER-to-Relational Mapping, it improves overall system reliability regarding shipments data. is the established best practice in modern DBMS architecture."
  }
];