export const CHAPTER17_CONTENT = {
  title: "Functional Dependencies",
  description: "Functional Dependencies (FDs) are the theoretical foundation of database normalization. This chapter focuses on identifying relationships between attributes where one attribute uniquely determines another. You will learn how to apply Armstrong's axioms, calculate the closure of a set of FDs, and systematically determine the candidate keys for any given relation.",
  points: [
    {
      heading: "Introduction to Functional Dependency",
      body: "In computing, a database is an organized collection of data or a type of data store based on the use of a database management system (DBMS), the software that interacts with end users, applications, and the database itself to capture and analyze the data. The DBMS additionally encompasses the core facilities provided to administer the database. The sum total of the database, the DBMS and the associated applications can be referred to as a database system. Often the term \"database\" is also used loosely to refer to any of the DBMS, the database system or an application associated with the database."
    },
    {
      heading: "Determinants",
      body: "In mathematics, the determinant is a scalar-valued function of the entries of a square matrix. The determinant of a matrix A is commonly denoted det(A), det A, or |A|. Its value characterizes some properties of the matrix and the linear map represented, on a given basis, by the matrix. In particular, the determinant is nonzero if and only if the matrix is invertible and the corresponding linear map is an isomorphism. However, if the determinant is zero, the matrix is referred to as singular, meaning it does not have an inverse."
    },
    {
      heading: "Trivial Functional Dependency",
      body: "In computing, a database is an organized collection of data or a type of data store based on the use of a database management system (DBMS), the software that interacts with end users, applications, and the database itself to capture and analyze the data. The DBMS additionally encompasses the core facilities provided to administer the database. The sum total of the database, the DBMS and the associated applications can be referred to as a database system. Often the term \"database\" is also used loosely to refer to any of the DBMS, the database system or an application associated with the database."
    },
    {
      heading: "Non-Trivial Functional Dependency",
      body: "In computing, a database is an organized collection of data or a type of data store based on the use of a database management system (DBMS), the software that interacts with end users, applications, and the database itself to capture and analyze the data. The DBMS additionally encompasses the core facilities provided to administer the database. The sum total of the database, the DBMS and the associated applications can be referred to as a database system. Often the term \"database\" is also used loosely to refer to any of the DBMS, the database system or an application associated with the database."
    },
    {
      heading: "Completely Non-Trivial FD",
      body: "In computing, a database is an organized collection of data or a type of data store based on the use of a database management system (DBMS), the software that interacts with end users, applications, and the database itself to capture and analyze the data. The DBMS additionally encompasses the core facilities provided to administer the database. The sum total of the database, the DBMS and the associated applications can be referred to as a database system. Often the term \"database\" is also used loosely to refer to any of the DBMS, the database system or an application associated with the database."
    },
    {
      heading: "Full Functional Dependency",
      body: "In computing, a database is an organized collection of data or a type of data store based on the use of a database management system (DBMS), the software that interacts with end users, applications, and the database itself to capture and analyze the data. The DBMS additionally encompasses the core facilities provided to administer the database. The sum total of the database, the DBMS and the associated applications can be referred to as a database system. Often the term \"database\" is also used loosely to refer to any of the DBMS, the database system or an application associated with the database."
    },
    {
      heading: "Partial Dependency",
      body: "In computing, a database is an organized collection of data or a type of data store based on the use of a database management system (DBMS), the software that interacts with end users, applications, and the database itself to capture and analyze the data. The DBMS additionally encompasses the core facilities provided to administer the database. The sum total of the database, the DBMS and the associated applications can be referred to as a database system. Often the term \"database\" is also used loosely to refer to any of the DBMS, the database system or an application associated with the database."
    },
    {
      heading: "Transitive Dependency",
      body: "In computing, a database is an organized collection of data or a type of data store based on the use of a database management system (DBMS), the software that interacts with end users, applications, and the database itself to capture and analyze the data. The DBMS additionally encompasses the core facilities provided to administer the database. The sum total of the database, the DBMS and the associated applications can be referred to as a database system. Often the term \"database\" is also used loosely to refer to any of the DBMS, the database system or an application associated with the database."
    },
    {
      heading: "Multivalued Dependency – Introduction",
      body: "In computing, a database is an organized collection of data or a type of data store based on the use of a database management system (DBMS), the software that interacts with end users, applications, and the database itself to capture and analyze the data. The DBMS additionally encompasses the core facilities provided to administer the database. The sum total of the database, the DBMS and the associated applications can be referred to as a database system. Often the term \"database\" is also used loosely to refer to any of the DBMS, the database system or an application associated with the database."
    },
    {
      heading: "Functional Dependency Sets",
      body: "In computing, a database is an organized collection of data or a type of data store based on the use of a database management system (DBMS), the software that interacts with end users, applications, and the database itself to capture and analyze the data. The DBMS additionally encompasses the core facilities provided to administer the database. The sum total of the database, the DBMS and the associated applications can be referred to as a database system. Often the term \"database\" is also used loosely to refer to any of the DBMS, the database system or an application associated with the database."
    },
    {
      heading: "Armstrong's Axioms",
      body: "In computing, a database is an organized collection of data or a type of data store based on the use of a database management system (DBMS), the software that interacts with end users, applications, and the database itself to capture and analyze the data. The DBMS additionally encompasses the core facilities provided to administer the database. The sum total of the database, the DBMS and the associated applications can be referred to as a database system. Often the term \"database\" is also used loosely to refer to any of the DBMS, the database system or an application associated with the database."
    },
    {
      heading: "Reflexivity",
      body: "In computing, a database is an organized collection of data or a type of data store based on the use of a database management system (DBMS), the software that interacts with end users, applications, and the database itself to capture and analyze the data. The DBMS additionally encompasses the core facilities provided to administer the database. The sum total of the database, the DBMS and the associated applications can be referred to as a database system. Often the term \"database\" is also used loosely to refer to any of the DBMS, the database system or an application associated with the database."
    },
    {
      heading: "Augmentation",
      body: "In computing, a database is an organized collection of data or a type of data store based on the use of a database management system (DBMS), the software that interacts with end users, applications, and the database itself to capture and analyze the data. The DBMS additionally encompasses the core facilities provided to administer the database. The sum total of the database, the DBMS and the associated applications can be referred to as a database system. Often the term \"database\" is also used loosely to refer to any of the DBMS, the database system or an application associated with the database."
    },
    {
      heading: "Transitivity",
      body: "In computing, a database is an organized collection of data or a type of data store based on the use of a database management system (DBMS), the software that interacts with end users, applications, and the database itself to capture and analyze the data. The DBMS additionally encompasses the core facilities provided to administer the database. The sum total of the database, the DBMS and the associated applications can be referred to as a database system. Often the term \"database\" is also used loosely to refer to any of the DBMS, the database system or an application associated with the database."
    },
    {
      heading: "Derived Rules",
      body: "In computing, a database is an organized collection of data or a type of data store based on the use of a database management system (DBMS), the software that interacts with end users, applications, and the database itself to capture and analyze the data. The DBMS additionally encompasses the core facilities provided to administer the database. The sum total of the database, the DBMS and the associated applications can be referred to as a database system. Often the term \"database\" is also used loosely to refer to any of the DBMS, the database system or an application associated with the database."
    },
    {
      heading: "Union",
      body: "In computing, a database is an organized collection of data or a type of data store based on the use of a database management system (DBMS), the software that interacts with end users, applications, and the database itself to capture and analyze the data. The DBMS additionally encompasses the core facilities provided to administer the database. The sum total of the database, the DBMS and the associated applications can be referred to as a database system. Often the term \"database\" is also used loosely to refer to any of the DBMS, the database system or an application associated with the database."
    },
    {
      heading: "Decomposition",
      body: "In computing, a database is an organized collection of data or a type of data store based on the use of a database management system (DBMS), the software that interacts with end users, applications, and the database itself to capture and analyze the data. The DBMS additionally encompasses the core facilities provided to administer the database. The sum total of the database, the DBMS and the associated applications can be referred to as a database system. Often the term \"database\" is also used loosely to refer to any of the DBMS, the database system or an application associated with the database."
    },
    {
      heading: "Pseudotransitivity",
      body: "In computing, a database is an organized collection of data or a type of data store based on the use of a database management system (DBMS), the software that interacts with end users, applications, and the database itself to capture and analyze the data. The DBMS additionally encompasses the core facilities provided to administer the database. The sum total of the database, the DBMS and the associated applications can be referred to as a database system. Often the term \"database\" is also used loosely to refer to any of the DBMS, the database system or an application associated with the database."
    },
    {
      heading: "Attribute Closure",
      body: "In computing, a database is an organized collection of data or a type of data store based on the use of a database management system (DBMS), the software that interacts with end users, applications, and the database itself to capture and analyze the data. The DBMS additionally encompasses the core facilities provided to administer the database. The sum total of the database, the DBMS and the associated applications can be referred to as a database system. Often the term \"database\" is also used loosely to refer to any of the DBMS, the database system or an application associated with the database."
    },
    {
      heading: "Finding Candidate Keys",
      body: "Keys are critical elements in relational databases used to identify records and establish relationships. A Primary Key uniquely identifies each row in a table and cannot be null. A Candidate Key is a column or set of columns that could potentially serve as the primary key. A Foreign Key is a field in one table that links to the primary key of another table, enforcing referential integrity. Without clearly defined keys, databases would suffer from duplicate records, orphaned data, and a complete inability to perform JOIN operations efficiently."
    },
    {
      heading: "Closure of Functional Dependency Sets",
      body: "In computing, a database is an organized collection of data or a type of data store based on the use of a database management system (DBMS), the software that interacts with end users, applications, and the database itself to capture and analyze the data. The DBMS additionally encompasses the core facilities provided to administer the database. The sum total of the database, the DBMS and the associated applications can be referred to as a database system. Often the term \"database\" is also used loosely to refer to any of the DBMS, the database system or an application associated with the database."
    },
    {
      heading: "Canonical / Minimal Cover",
      body: "In computing, a database is an organized collection of data or a type of data store based on the use of a database management system (DBMS), the software that interacts with end users, applications, and the database itself to capture and analyze the data. The DBMS additionally encompasses the core facilities provided to administer the database. The sum total of the database, the DBMS and the associated applications can be referred to as a database system. Often the term \"database\" is also used loosely to refer to any of the DBMS, the database system or an application associated with the database."
    },
    {
      heading: "Extraneous Attributes",
      body: "In computing, a database is an organized collection of data or a type of data store based on the use of a database management system (DBMS), the software that interacts with end users, applications, and the database itself to capture and analyze the data. The DBMS additionally encompasses the core facilities provided to administer the database. The sum total of the database, the DBMS and the associated applications can be referred to as a database system. Often the term \"database\" is also used loosely to refer to any of the DBMS, the database system or an application associated with the database."
    },
    {
      heading: "Redundant Functional Dependencies",
      body: "In computing, a database is an organized collection of data or a type of data store based on the use of a database management system (DBMS), the software that interacts with end users, applications, and the database itself to capture and analyze the data. The DBMS additionally encompasses the core facilities provided to administer the database. The sum total of the database, the DBMS and the associated applications can be referred to as a database system. Often the term \"database\" is also used loosely to refer to any of the DBMS, the database system or an application associated with the database."
    },
    {
      heading: "GATE Problems on Functional Dependencies",
      body: "In computing, a database is an organized collection of data or a type of data store based on the use of a database management system (DBMS), the software that interacts with end users, applications, and the database itself to capture and analyze the data. The DBMS additionally encompasses the core facilities provided to administer the database. The sum total of the database, the DBMS and the associated applications can be referred to as a database system. Often the term \"database\" is also used loosely to refer to any of the DBMS, the database system or an application associated with the database."
    }
  ],
  code: "-- Functional Dependencies\n-- If EmpID -> Name, Department\n-- Then knowing EmpID uniquely determines the other fields.\n-- In SQL, this is enforced by making EmpID the PRIMARY KEY.\nALTER TABLE Employees ADD PRIMARY KEY (EmpID);"
};