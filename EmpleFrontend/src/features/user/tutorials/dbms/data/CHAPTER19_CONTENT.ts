export const CHAPTER19_CONTENT = {
  title: "Transactions",
  description: "Transactions represent logical units of work that must be executed entirely or not at all. This chapter introduces the concept of transactions and the critical ACID properties—Atomicity, Consistency, Isolation, and Durability. You will understand transaction states and the fundamental execution models that guarantee data integrity even in the event of system failures.",
  points: [
    {
      heading: "What is a Transaction?",
      body: "A transaction is a single logical unit of work that accesses and possibly modifies the contents of a database. Atomicity, the 'A' in ACID, dictates that a transaction must be an 'all-or-nothing' proposition. If a transaction consists of transferring money from Account A to Account B, the DBMS guarantees that either both the deduction and addition occur, or neither occurs. If the system crashes halfway through, the DBMS uses logs (Undo/Redo) to roll back the partial changes. This fundamental guarantee ensures that the database never rests in a partially updated, invalid state."
    },
    {
      heading: "Transaction Examples",
      body: "A transaction is a single logical unit of work that accesses and possibly modifies the contents of a database. Atomicity, the 'A' in ACID, dictates that a transaction must be an 'all-or-nothing' proposition. If a transaction consists of transferring money from Account A to Account B, the DBMS guarantees that either both the deduction and addition occur, or neither occurs. If the system crashes halfway through, the DBMS uses logs (Undo/Redo) to roll back the partial changes. This fundamental guarantee ensures that the database never rests in a partially updated, invalid state."
    },
    {
      heading: "Transaction Operations",
      body: "A transaction is a single logical unit of work that accesses and possibly modifies the contents of a database. Atomicity, the 'A' in ACID, dictates that a transaction must be an 'all-or-nothing' proposition. If a transaction consists of transferring money from Account A to Account B, the DBMS guarantees that either both the deduction and addition occur, or neither occurs. If the system crashes halfway through, the DBMS uses logs (Undo/Redo) to roll back the partial changes. This fundamental guarantee ensures that the database never rests in a partially updated, invalid state."
    },
    {
      heading: "Read",
      body: "In computing, a database is an organized collection of data or a type of data store based on the use of a database management system (DBMS), the software that interacts with end users, applications, and the database itself to capture and analyze the data. The DBMS additionally encompasses the core facilities provided to administer the database. The sum total of the database, the DBMS and the associated applications can be referred to as a database system. Often the term \"database\" is also used loosely to refer to any of the DBMS, the database system or an application associated with the database."
    },
    {
      heading: "Write",
      body: "In computing, a database is an organized collection of data or a type of data store based on the use of a database management system (DBMS), the software that interacts with end users, applications, and the database itself to capture and analyze the data. The DBMS additionally encompasses the core facilities provided to administer the database. The sum total of the database, the DBMS and the associated applications can be referred to as a database system. Often the term \"database\" is also used loosely to refer to any of the DBMS, the database system or an application associated with the database."
    },
    {
      heading: "Transaction States",
      body: "A transaction is a single logical unit of work that accesses and possibly modifies the contents of a database. Atomicity, the 'A' in ACID, dictates that a transaction must be an 'all-or-nothing' proposition. If a transaction consists of transferring money from Account A to Account B, the DBMS guarantees that either both the deduction and addition occur, or neither occurs. If the system crashes halfway through, the DBMS uses logs (Undo/Redo) to roll back the partial changes. This fundamental guarantee ensures that the database never rests in a partially updated, invalid state."
    },
    {
      heading: "Active",
      body: "In computing, a database is an organized collection of data or a type of data store based on the use of a database management system (DBMS), the software that interacts with end users, applications, and the database itself to capture and analyze the data. The DBMS additionally encompasses the core facilities provided to administer the database. The sum total of the database, the DBMS and the associated applications can be referred to as a database system. Often the term \"database\" is also used loosely to refer to any of the DBMS, the database system or an application associated with the database."
    },
    {
      heading: "Partially Committed",
      body: "In computing, a database is an organized collection of data or a type of data store based on the use of a database management system (DBMS), the software that interacts with end users, applications, and the database itself to capture and analyze the data. The DBMS additionally encompasses the core facilities provided to administer the database. The sum total of the database, the DBMS and the associated applications can be referred to as a database system. Often the term \"database\" is also used loosely to refer to any of the DBMS, the database system or an application associated with the database."
    },
    {
      heading: "Committed",
      body: "In computing, a database is an organized collection of data or a type of data store based on the use of a database management system (DBMS), the software that interacts with end users, applications, and the database itself to capture and analyze the data. The DBMS additionally encompasses the core facilities provided to administer the database. The sum total of the database, the DBMS and the associated applications can be referred to as a database system. Often the term \"database\" is also used loosely to refer to any of the DBMS, the database system or an application associated with the database."
    },
    {
      heading: "Failed",
      body: "In computing, a database is an organized collection of data or a type of data store based on the use of a database management system (DBMS), the software that interacts with end users, applications, and the database itself to capture and analyze the data. The DBMS additionally encompasses the core facilities provided to administer the database. The sum total of the database, the DBMS and the associated applications can be referred to as a database system. Often the term \"database\" is also used loosely to refer to any of the DBMS, the database system or an application associated with the database."
    },
    {
      heading: "Aborted",
      body: "In computing, a database is an organized collection of data or a type of data store based on the use of a database management system (DBMS), the software that interacts with end users, applications, and the database itself to capture and analyze the data. The DBMS additionally encompasses the core facilities provided to administer the database. The sum total of the database, the DBMS and the associated applications can be referred to as a database system. Often the term \"database\" is also used loosely to refer to any of the DBMS, the database system or an application associated with the database."
    },
    {
      heading: "Terminated",
      body: "In computing, a database is an organized collection of data or a type of data store based on the use of a database management system (DBMS), the software that interacts with end users, applications, and the database itself to capture and analyze the data. The DBMS additionally encompasses the core facilities provided to administer the database. The sum total of the database, the DBMS and the associated applications can be referred to as a database system. Often the term \"database\" is also used loosely to refer to any of the DBMS, the database system or an application associated with the database."
    },
    {
      heading: "Transaction State Diagram",
      body: "A transaction is a single logical unit of work that accesses and possibly modifies the contents of a database. Atomicity, the 'A' in ACID, dictates that a transaction must be an 'all-or-nothing' proposition. If a transaction consists of transferring money from Account A to Account B, the DBMS guarantees that either both the deduction and addition occur, or neither occurs. If the system crashes halfway through, the DBMS uses logs (Undo/Redo) to roll back the partial changes. This fundamental guarantee ensures that the database never rests in a partially updated, invalid state."
    },
    {
      heading: "ACID Properties",
      body: "In computing, a database is an organized collection of data or a type of data store based on the use of a database management system (DBMS), the software that interacts with end users, applications, and the database itself to capture and analyze the data. The DBMS additionally encompasses the core facilities provided to administer the database. The sum total of the database, the DBMS and the associated applications can be referred to as a database system. Often the term \"database\" is also used loosely to refer to any of the DBMS, the database system or an application associated with the database."
    },
    {
      heading: "Atomicity",
      body: "A transaction is a single logical unit of work that accesses and possibly modifies the contents of a database. Atomicity, the 'A' in ACID, dictates that a transaction must be an 'all-or-nothing' proposition. If a transaction consists of transferring money from Account A to Account B, the DBMS guarantees that either both the deduction and addition occur, or neither occurs. If the system crashes halfway through, the DBMS uses logs (Undo/Redo) to roll back the partial changes. This fundamental guarantee ensures that the database never rests in a partially updated, invalid state."
    },
    {
      heading: "Consistency",
      body: "In computing, a database is an organized collection of data or a type of data store based on the use of a database management system (DBMS), the software that interacts with end users, applications, and the database itself to capture and analyze the data. The DBMS additionally encompasses the core facilities provided to administer the database. The sum total of the database, the DBMS and the associated applications can be referred to as a database system. Often the term \"database\" is also used loosely to refer to any of the DBMS, the database system or an application associated with the database."
    },
    {
      heading: "Isolation",
      body: "Data isolation refers to the difficulty of accessing data stored in separate, independent files, often formatted differently. In early systems, extracting comprehensive reports meant writing custom programs to read multiple files and match records manually. In a DBMS, data is integrated into a unified logical structure. Isolation is also a key concept in transaction processing (the 'I' in ACID), where it ensures that concurrent transactions execute without interfering with one another. A high level of isolation prevents problems like dirty reads and lost updates, ensuring that the database remains in a consistent state even under heavy concurrent load."
    },
    {
      heading: "Durability",
      body: "In computing, a database is an organized collection of data or a type of data store based on the use of a database management system (DBMS), the software that interacts with end users, applications, and the database itself to capture and analyze the data. The DBMS additionally encompasses the core facilities provided to administer the database. The sum total of the database, the DBMS and the associated applications can be referred to as a database system. Often the term \"database\" is also used loosely to refer to any of the DBMS, the database system or an application associated with the database."
    },
    {
      heading: "COMMIT",
      body: "In computing, a database is an organized collection of data or a type of data store based on the use of a database management system (DBMS), the software that interacts with end users, applications, and the database itself to capture and analyze the data. The DBMS additionally encompasses the core facilities provided to administer the database. The sum total of the database, the DBMS and the associated applications can be referred to as a database system. Often the term \"database\" is also used loosely to refer to any of the DBMS, the database system or an application associated with the database."
    },
    {
      heading: "ROLLBACK",
      body: "In computing, a database is an organized collection of data or a type of data store based on the use of a database management system (DBMS), the software that interacts with end users, applications, and the database itself to capture and analyze the data. The DBMS additionally encompasses the core facilities provided to administer the database. The sum total of the database, the DBMS and the associated applications can be referred to as a database system. Often the term \"database\" is also used loosely to refer to any of the DBMS, the database system or an application associated with the database."
    },
    {
      heading: "SAVEPOINT",
      body: "In computing, a database is an organized collection of data or a type of data store based on the use of a database management system (DBMS), the software that interacts with end users, applications, and the database itself to capture and analyze the data. The DBMS additionally encompasses the core facilities provided to administer the database. The sum total of the database, the DBMS and the associated applications can be referred to as a database system. Often the term \"database\" is also used loosely to refer to any of the DBMS, the database system or an application associated with the database."
    },
    {
      heading: "Transaction Boundaries",
      body: "A transaction is a single logical unit of work that accesses and possibly modifies the contents of a database. Atomicity, the 'A' in ACID, dictates that a transaction must be an 'all-or-nothing' proposition. If a transaction consists of transferring money from Account A to Account B, the DBMS guarantees that either both the deduction and addition occur, or neither occurs. If the system crashes halfway through, the DBMS uses logs (Undo/Redo) to roll back the partial changes. This fundamental guarantee ensures that the database never rests in a partially updated, invalid state."
    },
    {
      heading: "Why Transactions Matter",
      body: "A transaction is a single logical unit of work that accesses and possibly modifies the contents of a database. Atomicity, the 'A' in ACID, dictates that a transaction must be an 'all-or-nothing' proposition. If a transaction consists of transferring money from Account A to Account B, the DBMS guarantees that either both the deduction and addition occur, or neither occurs. If the system crashes halfway through, the DBMS uses logs (Undo/Redo) to roll back the partial changes. This fundamental guarantee ensures that the database never rests in a partially updated, invalid state."
    }
  ],
  code: "-- Transactions (ACID properties)\nBEGIN TRANSACTION;\n  UPDATE Accounts SET Balance = Balance - 500 WHERE AccID = 1;\n  UPDATE Accounts SET Balance = Balance + 500 WHERE AccID = 2;\nCOMMIT; -- Saves changes permanently"
};