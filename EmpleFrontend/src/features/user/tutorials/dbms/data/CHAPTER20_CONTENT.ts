export const CHAPTER20_CONTENT = {
  title: "Concurrency Control",
  description: "Executing transactions concurrently improves performance but risks data inconsistency. This chapter discusses the necessity of concurrency control and introduces the concept of schedules. You will learn the theoretical definitions and practical implications of conflict serializability and view serializability to ensure concurrent executions are equivalent to serial ones.",
  points: [
    {
      heading: "Concurrent Transactions",
      body: "Concurrency control is a fundamental DBMS feature that manages simultaneous operations on a database without having them interfere with one another. When hundreds of users attempt to read and write data at the same time, the system risks inconsistencies such as lost updates or uncommitted dependencies (dirty reads). A DBMS employs concurrency protocols—most commonly 2-Phase Locking (2PL) or Timestamp Ordering—to ensure that the end result is equivalent to executing the transactions sequentially. This guarantees maximum system throughput while strictly maintaining the ACID properties."
    },
    {
      heading: "Benefits of Concurrency",
      body: "Concurrency control is a fundamental DBMS feature that manages simultaneous operations on a database without having them interfere with one another. When hundreds of users attempt to read and write data at the same time, the system risks inconsistencies such as lost updates or uncommitted dependencies (dirty reads). A DBMS employs concurrency protocols—most commonly 2-Phase Locking (2PL) or Timestamp Ordering—to ensure that the end result is equivalent to executing the transactions sequentially. This guarantees maximum system throughput while strictly maintaining the ACID properties."
    },
    {
      heading: "Problems of Concurrent Execution",
      body: "Concurrency control is a fundamental DBMS feature that manages simultaneous operations on a database without having them interfere with one another. When hundreds of users attempt to read and write data at the same time, the system risks inconsistencies such as lost updates or uncommitted dependencies (dirty reads). A DBMS employs concurrency protocols—most commonly 2-Phase Locking (2PL) or Timestamp Ordering—to ensure that the end result is equivalent to executing the transactions sequentially. This guarantees maximum system throughput while strictly maintaining the ACID properties."
    },
    {
      heading: "Lost Update Problem",
      body: "In computing, a database is an organized collection of data or a type of data store based on the use of a database management system (DBMS), the software that interacts with end users, applications, and the database itself to capture and analyze the data. The DBMS additionally encompasses the core facilities provided to administer the database. The sum total of the database, the DBMS and the associated applications can be referred to as a database system. Often the term \"database\" is also used loosely to refer to any of the DBMS, the database system or an application associated with the database."
    },
    {
      heading: "Dirty Read / Temporary Update",
      body: "In computing, a database is an organized collection of data or a type of data store based on the use of a database management system (DBMS), the software that interacts with end users, applications, and the database itself to capture and analyze the data. The DBMS additionally encompasses the core facilities provided to administer the database. The sum total of the database, the DBMS and the associated applications can be referred to as a database system. Often the term \"database\" is also used loosely to refer to any of the DBMS, the database system or an application associated with the database."
    },
    {
      heading: "Unrepeatable Read",
      body: "In computing, a database is an organized collection of data or a type of data store based on the use of a database management system (DBMS), the software that interacts with end users, applications, and the database itself to capture and analyze the data. The DBMS additionally encompasses the core facilities provided to administer the database. The sum total of the database, the DBMS and the associated applications can be referred to as a database system. Often the term \"database\" is also used loosely to refer to any of the DBMS, the database system or an application associated with the database."
    },
    {
      heading: "Incorrect Summary",
      body: "In computing, a database is an organized collection of data or a type of data store based on the use of a database management system (DBMS), the software that interacts with end users, applications, and the database itself to capture and analyze the data. The DBMS additionally encompasses the core facilities provided to administer the database. The sum total of the database, the DBMS and the associated applications can be referred to as a database system. Often the term \"database\" is also used loosely to refer to any of the DBMS, the database system or an application associated with the database."
    },
    {
      heading: "Phantom Read",
      body: "In computing, a database is an organized collection of data or a type of data store based on the use of a database management system (DBMS), the software that interacts with end users, applications, and the database itself to capture and analyze the data. The DBMS additionally encompasses the core facilities provided to administer the database. The sum total of the database, the DBMS and the associated applications can be referred to as a database system. Often the term \"database\" is also used loosely to refer to any of the DBMS, the database system or an application associated with the database."
    },
    {
      heading: "Schedules",
      body: "A schedule or a timetable, as a basic time-management tool, consists of a list of times at which possible tasks, events, or actions are intended to take place, or of a sequence of events in the chronological order in which such things are intended to take place. The process of creating a schedule — deciding how to order these tasks and how to commit resources between the variety of possible tasks — is called scheduling, and a person responsible for making a particular schedule may be called a scheduler. Making and following schedules is an ancient human activity."
    },
    {
      heading: "Serial Schedule",
      body: "In computing, a database is an organized collection of data or a type of data store based on the use of a database management system (DBMS), the software that interacts with end users, applications, and the database itself to capture and analyze the data. The DBMS additionally encompasses the core facilities provided to administer the database. The sum total of the database, the DBMS and the associated applications can be referred to as a database system. Often the term \"database\" is also used loosely to refer to any of the DBMS, the database system or an application associated with the database."
    },
    {
      heading: "Non-Serial Schedule",
      body: "In computing, a database is an organized collection of data or a type of data store based on the use of a database management system (DBMS), the software that interacts with end users, applications, and the database itself to capture and analyze the data. The DBMS additionally encompasses the core facilities provided to administer the database. The sum total of the database, the DBMS and the associated applications can be referred to as a database system. Often the term \"database\" is also used loosely to refer to any of the DBMS, the database system or an application associated with the database."
    },
    {
      heading: "Serializable Schedule",
      body: "In computing, a database is an organized collection of data or a type of data store based on the use of a database management system (DBMS), the software that interacts with end users, applications, and the database itself to capture and analyze the data. The DBMS additionally encompasses the core facilities provided to administer the database. The sum total of the database, the DBMS and the associated applications can be referred to as a database system. Often the term \"database\" is also used loosely to refer to any of the DBMS, the database system or an application associated with the database."
    },
    {
      heading: "Serializability",
      body: "In computing, a database is an organized collection of data or a type of data store based on the use of a database management system (DBMS), the software that interacts with end users, applications, and the database itself to capture and analyze the data. The DBMS additionally encompasses the core facilities provided to administer the database. The sum total of the database, the DBMS and the associated applications can be referred to as a database system. Often the term \"database\" is also used loosely to refer to any of the DBMS, the database system or an application associated with the database."
    },
    {
      heading: "Conflict Operations",
      body: "Normalization is a systematic process of organizing data to minimize redundancy and eliminate insertion, update, and deletion anomalies. It involves dividing large, poorly structured tables into smaller, well-structured ones linked by foreign keys. The process moves through stages: First Normal Form (1NF) eliminates repeating groups, Second Normal Form (2NF) removes partial dependencies, and Third Normal Form (3NF) removes transitive dependencies. Boyce-Codd Normal Form (BCNF) handles stricter dependency cases. While highly normalized databases ensure integrity, engineers sometimes selectively denormalize to optimize read-heavy query performance."
    },
    {
      heading: "Conflict Equivalence",
      body: "Normalization is a systematic process of organizing data to minimize redundancy and eliminate insertion, update, and deletion anomalies. It involves dividing large, poorly structured tables into smaller, well-structured ones linked by foreign keys. The process moves through stages: First Normal Form (1NF) eliminates repeating groups, Second Normal Form (2NF) removes partial dependencies, and Third Normal Form (3NF) removes transitive dependencies. Boyce-Codd Normal Form (BCNF) handles stricter dependency cases. While highly normalized databases ensure integrity, engineers sometimes selectively denormalize to optimize read-heavy query performance."
    },
    {
      heading: "Conflict Serializability",
      body: "Normalization is a systematic process of organizing data to minimize redundancy and eliminate insertion, update, and deletion anomalies. It involves dividing large, poorly structured tables into smaller, well-structured ones linked by foreign keys. The process moves through stages: First Normal Form (1NF) eliminates repeating groups, Second Normal Form (2NF) removes partial dependencies, and Third Normal Form (3NF) removes transitive dependencies. Boyce-Codd Normal Form (BCNF) handles stricter dependency cases. While highly normalized databases ensure integrity, engineers sometimes selectively denormalize to optimize read-heavy query performance."
    },
    {
      heading: "Precedence / Serialization Graph",
      body: "In computing, a database is an organized collection of data or a type of data store based on the use of a database management system (DBMS), the software that interacts with end users, applications, and the database itself to capture and analyze the data. The DBMS additionally encompasses the core facilities provided to administer the database. The sum total of the database, the DBMS and the associated applications can be referred to as a database system. Often the term \"database\" is also used loosely to refer to any of the DBMS, the database system or an application associated with the database."
    },
    {
      heading: "Testing Conflict Serializability",
      body: "Normalization is a systematic process of organizing data to minimize redundancy and eliminate insertion, update, and deletion anomalies. It involves dividing large, poorly structured tables into smaller, well-structured ones linked by foreign keys. The process moves through stages: First Normal Form (1NF) eliminates repeating groups, Second Normal Form (2NF) removes partial dependencies, and Third Normal Form (3NF) removes transitive dependencies. Boyce-Codd Normal Form (BCNF) handles stricter dependency cases. While highly normalized databases ensure integrity, engineers sometimes selectively denormalize to optimize read-heavy query performance."
    },
    {
      heading: "View Serializability",
      body: "In computing, a database is an organized collection of data or a type of data store based on the use of a database management system (DBMS), the software that interacts with end users, applications, and the database itself to capture and analyze the data. The DBMS additionally encompasses the core facilities provided to administer the database. The sum total of the database, the DBMS and the associated applications can be referred to as a database system. Often the term \"database\" is also used loosely to refer to any of the DBMS, the database system or an application associated with the database."
    },
    {
      heading: "Conflict vs View Serializability",
      body: "Normalization is a systematic process of organizing data to minimize redundancy and eliminate insertion, update, and deletion anomalies. It involves dividing large, poorly structured tables into smaller, well-structured ones linked by foreign keys. The process moves through stages: First Normal Form (1NF) eliminates repeating groups, Second Normal Form (2NF) removes partial dependencies, and Third Normal Form (3NF) removes transitive dependencies. Boyce-Codd Normal Form (BCNF) handles stricter dependency cases. While highly normalized databases ensure integrity, engineers sometimes selectively denormalize to optimize read-heavy query performance."
    },
    {
      heading: "Recoverable Schedule",
      body: "In computing, a database is an organized collection of data or a type of data store based on the use of a database management system (DBMS), the software that interacts with end users, applications, and the database itself to capture and analyze the data. The DBMS additionally encompasses the core facilities provided to administer the database. The sum total of the database, the DBMS and the associated applications can be referred to as a database system. Often the term \"database\" is also used loosely to refer to any of the DBMS, the database system or an application associated with the database."
    },
    {
      heading: "Cascadeless Schedule",
      body: "In computing, a database is an organized collection of data or a type of data store based on the use of a database management system (DBMS), the software that interacts with end users, applications, and the database itself to capture and analyze the data. The DBMS additionally encompasses the core facilities provided to administer the database. The sum total of the database, the DBMS and the associated applications can be referred to as a database system. Often the term \"database\" is also used loosely to refer to any of the DBMS, the database system or an application associated with the database."
    },
    {
      heading: "Strict Schedule",
      body: "In computing, a database is an organized collection of data or a type of data store based on the use of a database management system (DBMS), the software that interacts with end users, applications, and the database itself to capture and analyze the data. The DBMS additionally encompasses the core facilities provided to administer the database. The sum total of the database, the DBMS and the associated applications can be referred to as a database system. Often the term \"database\" is also used loosely to refer to any of the DBMS, the database system or an application associated with the database."
    },
    {
      heading: "Recoverability Hierarchy",
      body: "In computing, a database is an organized collection of data or a type of data store based on the use of a database management system (DBMS), the software that interacts with end users, applications, and the database itself to capture and analyze the data. The DBMS additionally encompasses the core facilities provided to administer the database. The sum total of the database, the DBMS and the associated applications can be referred to as a database system. Often the term \"database\" is also used loosely to refer to any of the DBMS, the database system or an application associated with the database."
    }
  ],
  code: "-- Concurrency Control\n-- Two transactions running simultaneously\n-- T1: Reads X, Writes X\n-- T2: Reads X, Writes X\n-- Without concurrency control, a 'Lost Update' anomaly can occur."
};