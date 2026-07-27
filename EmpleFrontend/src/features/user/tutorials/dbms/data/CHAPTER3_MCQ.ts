export const CHAPTER3_MCQ = [
  {
    q: "If you are designing a schema for Data Models involving Departments and Departments, what is the best approach? (GATE 2011)",
    options: ["Establish a clear relationship using Foreign Keys on Name.", "Merge both tables into a single giant text file.", "Remove all Primary Keys to save disk space.", "Use random integers as the only data type."],
    ans: 0,
    explanation: "For Data Models, establish a clear relationship using foreign keys on name. is the established best practice in modern DBMS architecture."
  },
  {
    q: "If you are designing a schema for Data Models involving Orders and Courses, what is the best approach? (GATE 2012)",
    options: ["Use random integers as the only data type.", "Establish a clear relationship using Foreign Keys on Amount.", "Merge both tables into a single giant text file.", "Remove all Primary Keys to save disk space."],
    ans: 1,
    explanation: "For Data Models, establish a clear relationship using foreign keys on amount. is the established best practice in modern DBMS architecture."
  },
  {
    q: "If you are designing a schema for Data Models involving Departments and Invoices, what is the best approach? (GATE 2013)",
    options: ["Use random integers as the only data type.", "Remove all Primary Keys to save disk space.", "Merge both tables into a single giant text file.", "Establish a clear relationship using Foreign Keys on Address."],
    ans: 3,
    explanation: "For Data Models, establish a clear relationship using foreign keys on address. is the established best practice in modern DBMS architecture."
  },
  {
    q: "In the context of Data Models, how does applying redundancy affect the Students table? (GATE 2014)",
    options: ["It prevents any user from querying the Students table.", "It strictly requires hardware upgrades for the database.", "It causes immediate data loss in the Phone column.", "It improves overall system reliability regarding Students data."],
    ans: 3,
    explanation: "For Data Models, it improves overall system reliability regarding students data. is the established best practice in modern DBMS architecture."
  },
  {
    q: "If you are designing a schema for Data Models involving Orders and Courses, what is the best approach? (GATE 2015)",
    options: ["Establish a clear relationship using Foreign Keys on Date.", "Merge both tables into a single giant text file.", "Remove all Primary Keys to save disk space.", "Use random integers as the only data type."],
    ans: 0,
    explanation: "For Data Models, establish a clear relationship using foreign keys on date. is the established best practice in modern DBMS architecture."
  },
  {
    q: "Consider a scenario in Data Models where the Orders table's Category is frequently updated. What is a key concern? (GATE 2016)",
    options: ["Hardcoding all possible values in the application code.", "Changing the column name every week for security.", "Ensuring the table name is always capitalized.", "Maintaining data consistency and minimizing lock contention."],
    ans: 3,
    explanation: "For Data Models, maintaining data consistency and minimizing lock contention. is the established best practice in modern DBMS architecture."
  },
  {
    q: "Which of the following is a common anti-pattern when dealing with Data Models? (GATE 2017)",
    options: ["Writing parameterized SQL queries.", "Using standard indexing techniques.", "Storing comma-separated values in the Total column of the Shipments table.", "Implementing proper backup strategies."],
    ans: 2,
    explanation: "For Data Models, storing comma-separated values in the total column of the shipments table. is the established best practice in modern DBMS architecture."
  },
  {
    q: "Which of the following is a common anti-pattern when dealing with Data Models? (GATE 2018)",
    options: ["Storing comma-separated values in the Total column of the Students table.", "Using standard indexing techniques.", "Implementing proper backup strategies.", "Writing parameterized SQL queries."],
    ans: 0,
    explanation: "For Data Models, storing comma-separated values in the total column of the students table. is the established best practice in modern DBMS architecture."
  },
  {
    q: "In the context of Data Models, how does applying querying affect the Courses table? (GATE 2019)",
    options: ["It improves overall system reliability regarding Courses data.", "It causes immediate data loss in the Email column.", "It prevents any user from querying the Courses table.", "It strictly requires hardware upgrades for the database."],
    ans: 0,
    explanation: "For Data Models, it improves overall system reliability regarding courses data. is the established best practice in modern DBMS architecture."
  },
  {
    q: "Which of the following is a common anti-pattern when dealing with Data Models? (GATE 2011)",
    options: ["Writing parameterized SQL queries.", "Implementing proper backup strategies.", "Using standard indexing techniques.", "Storing comma-separated values in the Quantity column of the Invoices table."],
    ans: 3,
    explanation: "For Data Models, storing comma-separated values in the quantity column of the invoices table. is the established best practice in modern DBMS architecture."
  }
];