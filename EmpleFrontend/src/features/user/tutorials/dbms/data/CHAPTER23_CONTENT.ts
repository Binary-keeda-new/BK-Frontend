export const CHAPTER23_CONTENT = {
  title: "Timestamp and Optimistic Concurrency Control",
  description: "Not all databases use locking for concurrency. This chapter explores alternative, optimistic protocols. You will delve into timestamp ordering protocols, which assign unique timestamps to transactions to determine serializability. It also covers the Thomas Write Rule and validation-based protocols that check for conflicts only at the end of a transaction.",
  points: [
    {
      heading: "Timestamp Ordering",
      body: "In computing, a database is an organized collection of data or a type of data store based on the use of a database management system (DBMS), the software that interacts with end users, applications, and the database itself to capture and analyze the data. The DBMS additionally encompasses the core facilities provided to administer the database. The sum total of the database, the DBMS and the associated applications can be referred to as a database system. Often the term \"database\" is also used loosely to refer to any of the DBMS, the database system or an application associated with the database."
    },
    {
      heading: "Transaction Timestamp",
      body: "A transaction is a single logical unit of work that accesses and possibly modifies the contents of a database. Atomicity, the 'A' in ACID, dictates that a transaction must be an 'all-or-nothing' proposition. If a transaction consists of transferring money from Account A to Account B, the DBMS guarantees that either both the deduction and addition occur, or neither occurs. If the system crashes halfway through, the DBMS uses logs (Undo/Redo) to roll back the partial changes. This fundamental guarantee ensures that the database never rests in a partially updated, invalid state."
    },
    {
      heading: "Read Timestamp",
      body: "In computing, a database is an organized collection of data or a type of data store based on the use of a database management system (DBMS), the software that interacts with end users, applications, and the database itself to capture and analyze the data. The DBMS additionally encompasses the core facilities provided to administer the database. The sum total of the database, the DBMS and the associated applications can be referred to as a database system. Often the term \"database\" is also used loosely to refer to any of the DBMS, the database system or an application associated with the database."
    },
    {
      heading: "Write Timestamp",
      body: "In computing, a database is an organized collection of data or a type of data store based on the use of a database management system (DBMS), the software that interacts with end users, applications, and the database itself to capture and analyze the data. The DBMS additionally encompasses the core facilities provided to administer the database. The sum total of the database, the DBMS and the associated applications can be referred to as a database system. Often the term \"database\" is also used loosely to refer to any of the DBMS, the database system or an application associated with the database."
    },
    {
      heading: "Basic Timestamp Ordering",
      body: "In computing, a database is an organized collection of data or a type of data store based on the use of a database management system (DBMS), the software that interacts with end users, applications, and the database itself to capture and analyze the data. The DBMS additionally encompasses the core facilities provided to administer the database. The sum total of the database, the DBMS and the associated applications can be referred to as a database system. Often the term \"database\" is also used loosely to refer to any of the DBMS, the database system or an application associated with the database."
    },
    {
      heading: "Thomas Write Rule",
      body: "In computing, a database is an organized collection of data or a type of data store based on the use of a database management system (DBMS), the software that interacts with end users, applications, and the database itself to capture and analyze the data. The DBMS additionally encompasses the core facilities provided to administer the database. The sum total of the database, the DBMS and the associated applications can be referred to as a database system. Often the term \"database\" is also used loosely to refer to any of the DBMS, the database system or an application associated with the database."
    },
    {
      heading: "Timestamp Ordering vs Locking",
      body: "In computing, a database is an organized collection of data or a type of data store based on the use of a database management system (DBMS), the software that interacts with end users, applications, and the database itself to capture and analyze the data. The DBMS additionally encompasses the core facilities provided to administer the database. The sum total of the database, the DBMS and the associated applications can be referred to as a database system. Often the term \"database\" is also used loosely to refer to any of the DBMS, the database system or an application associated with the database."
    },
    {
      heading: "Validation-Based Protocol",
      body: "In computing, a database is an organized collection of data or a type of data store based on the use of a database management system (DBMS), the software that interacts with end users, applications, and the database itself to capture and analyze the data. The DBMS additionally encompasses the core facilities provided to administer the database. The sum total of the database, the DBMS and the associated applications can be referred to as a database system. Often the term \"database\" is also used loosely to refer to any of the DBMS, the database system or an application associated with the database."
    },
    {
      heading: "Optimistic Concurrency Control",
      body: "Concurrency control is a fundamental DBMS feature that manages simultaneous operations on a database without having them interfere with one another. When hundreds of users attempt to read and write data at the same time, the system risks inconsistencies such as lost updates or uncommitted dependencies (dirty reads). A DBMS employs concurrency protocols—most commonly 2-Phase Locking (2PL) or Timestamp Ordering—to ensure that the end result is equivalent to executing the transactions sequentially. This guarantees maximum system throughput while strictly maintaining the ACID properties."
    },
    {
      heading: "Read Phase",
      body: "In computing, a database is an organized collection of data or a type of data store based on the use of a database management system (DBMS), the software that interacts with end users, applications, and the database itself to capture and analyze the data. The DBMS additionally encompasses the core facilities provided to administer the database. The sum total of the database, the DBMS and the associated applications can be referred to as a database system. Often the term \"database\" is also used loosely to refer to any of the DBMS, the database system or an application associated with the database."
    },
    {
      heading: "Validation Phase",
      body: "In computing, a database is an organized collection of data or a type of data store based on the use of a database management system (DBMS), the software that interacts with end users, applications, and the database itself to capture and analyze the data. The DBMS additionally encompasses the core facilities provided to administer the database. The sum total of the database, the DBMS and the associated applications can be referred to as a database system. Often the term \"database\" is also used loosely to refer to any of the DBMS, the database system or an application associated with the database."
    },
    {
      heading: "Write Phase",
      body: "In computing, a database is an organized collection of data or a type of data store based on the use of a database management system (DBMS), the software that interacts with end users, applications, and the database itself to capture and analyze the data. The DBMS additionally encompasses the core facilities provided to administer the database. The sum total of the database, the DBMS and the associated applications can be referred to as a database system. Often the term \"database\" is also used loosely to refer to any of the DBMS, the database system or an application associated with the database."
    },
    {
      heading: "Multi-Version Concurrency Control (MVCC)",
      body: "Concurrency control is a fundamental DBMS feature that manages simultaneous operations on a database without having them interfere with one another. When hundreds of users attempt to read and write data at the same time, the system risks inconsistencies such as lost updates or uncommitted dependencies (dirty reads). A DBMS employs concurrency protocols—most commonly 2-Phase Locking (2PL) or Timestamp Ordering—to ensure that the end result is equivalent to executing the transactions sequentially. This guarantees maximum system throughput while strictly maintaining the ACID properties."
    },
    {
      heading: "Introduction to Snapshot Isolation",
      body: "Data isolation refers to the difficulty of accessing data stored in separate, independent files, often formatted differently. In early systems, extracting comprehensive reports meant writing custom programs to read multiple files and match records manually. In a DBMS, data is integrated into a unified logical structure. Isolation is also a key concept in transaction processing (the 'I' in ACID), where it ensures that concurrent transactions execute without interfering with one another. A high level of isolation prevents problems like dirty reads and lost updates, ensuring that the database remains in a consistent state even under heavy concurrent load."
    }
  ],
  code: "-- Timestamp Concurrency Control\n-- Transactions are assigned a unique timestamp.\n-- If an older transaction tries to write to a data item already updated \n-- by a newer transaction, it is aborted and restarted."
};