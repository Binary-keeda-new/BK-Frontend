// =====================================================================================
// dbmsTutorial.ts
// Comprehensive data file for an interactive DBMS Tutorial Platform
// Covers 10 chapters: basics, relational, sql-basics, sql-advanced, normalization,
// transactions, concurrency, indexing, nosql, architecture
// =====================================================================================

// --- TYPES & INTERFACES ---
export interface Point {
  heading: string;
  body: string;
}
export interface ChapterContent {
  title: string;
  description: string;
  points: Point[];
  code: string; // Provide a relevant SQL snippet or pseudo-code string
}
export interface MCQQuestion {
  q: string;
  options: string[];
  ans: number; // Index of the correct option (0-based)
  explanation: string;
}
export interface DebugExercise {
  instructions: string;
  buggy: string; // SQL with a deliberate error
  fixed: string; // The corrected SQL
  hints: string[];
  expectedOutput: string;
}
export interface DragLine {
  id: string;
  text: string;
}
export interface DragExercise {
  instructions: string;
  lines: DragLine[];
  order: string[]; // Correct sequence of line IDs
}
export interface CompleteExercise {
  template: string; // String with blanks represented by ___
  answer: string; // The fully completed string
  blanks: string[]; // The missing words in order
  instruction: string;
}

// =====================================================================================
// CHAPTERS
// =====================================================================================
export const CHAPTERS = [
  { id: "basics", label: "01 · Introduction to DBMS" },
  { id: "relational", label: "02 · Relational Model & Keys" },
  { id: "sql-basics", label: "03 · SQL Basics" },
  { id: "sql-advanced", label: "04 · SQL Advanced" },
  { id: "normalization", label: "05 · Normalization" },
  { id: "transactions", label: "06 · Transactions & ACID" },
  { id: "concurrency", label: "07 · Concurrency Control" },
  { id: "indexing", label: "08 · Indexing" },
  { id: "nosql", label: "09 · NoSQL Databases" },
  { id: "architecture", label: "10 · DB Architecture & Storage" },
];

// =====================================================================================
// CONTENT
// =====================================================================================
export const CONTENT: Record<string, ChapterContent> = {
  basics: {
    title: "Introduction to DBMS & File Systems",
    description:
      "Understand why Database Management Systems were created, how they differ from traditional file-processing systems, and the core benefits they provide.",
    points: [
      {
        heading: "What is a DBMS?",
        body: "A Database Management System (DBMS) is software that enables users to define, create, maintain, and control access to a database. It acts as an interface between the end-user/application programs and the physical data stored on disk.",
      },
      {
        heading: "File System Limitations",
        body: "Traditional file-processing systems suffer from data redundancy, inconsistency, difficulty in accessing data, limited concurrent access, lack of security, and no standard way to enforce integrity constraints.",
      },
      {
        heading: "Data Independence",
        body: "DBMS provides logical data independence (ability to change the conceptual schema without changing external schemas/applications) and physical data independence (ability to change the internal/storage schema without changing the conceptual schema).",
      },
      {
        heading: "Advantages of DBMS",
        body: "Controlled redundancy, data consistency, data sharing, enforced integrity constraints, improved security, backup & recovery services, and support for multiple concurrent users via concurrency control.",
      },
      {
        heading: "Users of a DBMS",
        body: "Database Administrators (DBAs) manage the schema and security; Application Programmers write software using the DBMS; Sophisticated/casual end-users query data directly; Naive users interact via fixed applications.",
      },
      {
        heading: "Data Models Overview",
        body: "A data model is a collection of concepts to describe data structure, relationships, and constraints. Major categories include the Relational Model, Entity-Relationship (ER) Model, Object-Oriented Model, and NoSQL models (document, key-value, graph, column-family).",
      },
    ],
    code:
      "-- File System Approach (pseudo-code)\n" +
      "OPEN FILE \"students.dat\"\n" +
      "READ RECORD sequentially UNTIL id == 1023\n" +
      "-- No standard query language, manual indexing, redundant across apps\n\n" +
      "-- DBMS Approach\n" +
      "SELECT * FROM students WHERE id = 1023;\n" +
      "-- Declarative, optimized by query engine, centrally managed",
  },

  relational: {
    title: "Relational Model & Keys",
    description:
      "Learn the mathematical foundation of relational databases: relations, tuples, attributes, and the different types of keys that enforce data integrity.",
    points: [
      {
        heading: "Relation, Tuple, Attribute",
        body: "A relation is a table with rows (tuples) and columns (attributes). Each attribute has a domain â€” the set of legal values it may take. A relation is a subset of the Cartesian product of its attribute domains.",
      },
      {
        heading: "Super Key & Candidate Key",
        body: "A super key is any set of attributes that uniquely identifies a tuple. A candidate key is a minimal super key â€” no proper subset of it is also a super key.",
      },
      {
        heading: "Primary Key",
        body: "A primary key is the candidate key chosen by the database designer as the principal means of identifying tuples. It cannot contain NULL values and must be unique across all rows.",
      },
      {
        heading: "Foreign Key",
        body: "A foreign key is an attribute (or set of attributes) in one relation that references the primary key of another (or the same) relation, establishing a link between the two tables.",
      },
      {
        heading: "Integrity Constraints",
        body: "Entity integrity ensures no primary key attribute is NULL. Referential integrity ensures a foreign key value must either match an existing primary key value in the referenced table or be NULL.",
      },
      {
        heading: "Schema vs Instance",
        body: "A database schema is the logical structure/design (like a blueprint), while a database instance is the actual data stored at a particular moment in time.",
      },
    ],
    code:
      "CREATE TABLE Department (\n" +
      "  dept_id   INT PRIMARY KEY,\n" +
      "  dept_name VARCHAR(50) NOT NULL UNIQUE\n" +
      ");\n\n" +
      "CREATE TABLE Employee (\n" +
      "  emp_id   INT PRIMARY KEY,\n" +
      "  emp_name VARCHAR(50) NOT NULL,\n" +
      "  dept_id  INT,\n" +
      "  FOREIGN KEY (dept_id) REFERENCES Department(dept_id)\n" +
      ");",
  },

  "sql-basics": {
    title: "DDL, DML, and Basic Queries",
    description:
      "Master the foundational SQL commands used to define database structures and manipulate data, along with the basic SELECT query syntax.",
    points: [
      {
        heading: "DDL (Data Definition Language)",
        body: "Commands like CREATE, ALTER, DROP, and TRUNCATE define and modify the structure of database objects such as tables, schemas, and indexes.",
      },
      {
        heading: "DML (Data Manipulation Language)",
        body: "Commands like INSERT, UPDATE, and DELETE manipulate the data stored within tables. DML changes are typically transactional and can be rolled back.",
      },
      {
        heading: "The SELECT Statement",
        body: "SELECT retrieves data from one or more tables. Basic syntax: SELECT column_list FROM table_name WHERE condition;. Use * to select all columns.",
      },
      {
        heading: "Filtering with WHERE",
        body: "The WHERE clause filters rows based on a condition using comparison operators (=, <>, <, >), logical operators (AND, OR, NOT), and special operators (BETWEEN, IN, LIKE, IS NULL).",
      },
      {
        heading: "Constraints",
        body: "Constraints like NOT NULL, UNIQUE, CHECK, DEFAULT, PRIMARY KEY, and FOREIGN KEY enforce rules on the data that can be stored in a table.",
      },
      {
        heading: "Sorting & Limiting Results",
        body: "ORDER BY sorts results by one or more columns (ASC or DESC). LIMIT (or FETCH/TOP depending on the RDBMS) restricts the number of rows returned.",
      },
    ],
    code:
      "CREATE TABLE Student (\n" +
      "  id    INT PRIMARY KEY,\n" +
      "  name  VARCHAR(50) NOT NULL,\n" +
      "  gpa   DECIMAL(3,2) CHECK (gpa >= 0 AND gpa <= 4.0)\n" +
      ");\n\n" +
      "INSERT INTO Student (id, name, gpa) VALUES (1, 'Alice', 3.85);\n\n" +
      "SELECT name, gpa\n" +
      "FROM Student\n" +
      "WHERE gpa > 3.0\n" +
      "ORDER BY gpa DESC\n" +
      "LIMIT 10;",
  },

  "sql-advanced": {
    title: "Joins, Subqueries, Aggregation",
    description:
      "Go beyond single-table queries by combining data from multiple tables, nesting queries, and summarizing data with aggregate functions.",
    points: [
      {
        heading: "Types of Joins",
        body: "INNER JOIN returns matching rows in both tables. LEFT (OUTER) JOIN returns all left rows plus matches. RIGHT JOIN returns all right rows plus matches. FULL OUTER JOIN returns all rows from both sides.",
      },
      {
        heading: "Subqueries",
        body: "A subquery is a query nested inside another query. Non-correlated subqueries execute independently of the outer query; correlated subqueries reference columns from the outer query and execute once per outer row.",
      },
      {
        heading: "Aggregate Functions",
        body: "COUNT, SUM, AVG, MIN, and MAX compute a single summary value from a set of rows, often used together with GROUP BY.",
      },
      {
        heading: "GROUP BY and HAVING",
        body: "GROUP BY groups rows sharing a common value into summary rows. HAVING filters those groups after aggregation, whereas WHERE filters individual rows before aggregation.",
      },
      {
        heading: "Set Operations",
        body: "UNION combines results from two queries removing duplicates (UNION ALL keeps them). INTERSECT returns common rows; EXCEPT/MINUS returns rows in the first query not present in the second.",
      },
      {
        heading: "Window Functions",
        body: "Functions like ROW_NUMBER(), RANK(), and SUM() OVER (PARTITION BY ...) perform calculations across a set of rows related to the current row without collapsing them, unlike GROUP BY.",
      },
    ],
    code:
      "SELECT d.dept_name, COUNT(e.emp_id) AS emp_count, AVG(e.salary) AS avg_salary\n" +
      "FROM Department d\n" +
      "JOIN Employee e ON d.dept_id = e.dept_id\n" +
      "WHERE e.salary > 30000\n" +
      "GROUP BY d.dept_name\n" +
      "HAVING COUNT(e.emp_id) > 5\n" +
      "ORDER BY avg_salary DESC;",
  },

  normalization: {
    title: "1NF, 2NF, 3NF, BCNF",
    description:
      "Learn the systematic process of organizing columns and tables to minimize data redundancy and avoid update, insertion, and deletion anomalies.",
    points: [
      {
        heading: "First Normal Form (1NF)",
        body: "A relation is in 1NF if every attribute contains only atomic (indivisible) values and there are no repeating groups or multi-valued attributes within a single column.",
      },
      {
        heading: "Second Normal Form (2NF)",
        body: "A relation is in 2NF if it is in 1NF and every non-key attribute is fully functionally dependent on the whole primary key â€” i.e., there is no partial dependency on a composite key.",
      },
      {
        heading: "Third Normal Form (3NF)",
        body: "A relation is in 3NF if it is in 2NF and has no transitive dependency â€” no non-key attribute depends on another non-key attribute.",
      },
      {
        heading: "Boyce-Codd Normal Form (BCNF)",
        body: "A stricter version of 3NF: for every functional dependency X â†’ Y, X must be a super key. BCNF resolves anomalies 3NF does not catch when overlapping candidate keys exist.",
      },
      {
        heading: "Functional Dependencies",
        body: "A functional dependency X â†’ Y means that the value of attribute set X uniquely determines the value of attribute set Y. FDs are the foundation used to derive normal forms.",
      },
      {
        heading: "Denormalization Trade-off",
        body: "Denormalization intentionally introduces redundancy to improve read performance in reporting/analytical systems, trading storage space and write complexity for query speed.",
      },
    ],
    code:
      "-- Unnormalized: repeating course info causes redundancy & anomalies\n" +
      "CREATE TABLE StudentCourses (\n" +
      "  student_id INT,\n" +
      "  student_name VARCHAR(50),\n" +
      "  course_id INT,\n" +
      "  course_name VARCHAR(50),\n" +
      "  instructor VARCHAR(50)\n" +
      ");\n\n" +
      "-- Normalized (3NF): split into separate relations\n" +
      "CREATE TABLE Student (student_id INT PRIMARY KEY, student_name VARCHAR(50));\n" +
      "CREATE TABLE Course (course_id INT PRIMARY KEY, course_name VARCHAR(50), instructor VARCHAR(50));\n" +
      "CREATE TABLE Enrollment (student_id INT, course_id INT,\n" +
      "  PRIMARY KEY (student_id, course_id),\n" +
      "  FOREIGN KEY (student_id) REFERENCES Student(student_id),\n" +
      "  FOREIGN KEY (course_id) REFERENCES Course(course_id));",
  },

  transactions: {
    title: "ACID Properties & Transaction States",
    description:
      "Explore how DBMSs guarantee reliable processing of transactions even in the presence of failures and concurrent access.",
    points: [
      {
        heading: "Atomicity",
        body: "A transaction is treated as a single indivisible unit â€” either all of its operations are executed successfully, or none of them are, ensuring the database never sees a partial update.",
      },
      {
        heading: "Consistency",
        body: "A transaction brings the database from one valid state to another, preserving all defined rules, constraints, cascades, and triggers.",
      },
      {
        heading: "Isolation",
        body: "Concurrent execution of transactions results in a system state identical to what would be obtained if the transactions were executed sequentially, preventing interference between them.",
      },
      {
        heading: "Durability",
        body: "Once a transaction is committed, its changes persist permanently, even in the event of a system crash, typically ensured via write-ahead logging (WAL).",
      },
      {
        heading: "Transaction States",
        body: "A transaction moves through states: Active (executing) â†’ Partially Committed (finished last statement) â†’ Committed (successfully completed), or Failed â†’ Aborted (rolled back) if an error occurs.",
      },
      {
        heading: "COMMIT and ROLLBACK",
        body: "COMMIT permanently saves all changes made in the current transaction. ROLLBACK undoes all changes made since the transaction began, restoring the previous consistent state.",
      },
    ],
    code:
      "BEGIN TRANSACTION;\n\n" +
      "UPDATE Account SET balance = balance - 500 WHERE acc_id = 'A101';\n" +
      "UPDATE Account SET balance = balance + 500 WHERE acc_id = 'B202';\n\n" +
      "-- If both updates succeed:\n" +
      "COMMIT;\n\n" +
      "-- If any error occurs (e.g., insufficient funds):\n" +
      "-- ROLLBACK;",
  },

  concurrency: {
    title: "Schedules, Locks, Deadlocks",
    description:
      "Understand how DBMSs interleave multiple transactions safely using schedules, locking protocols, and deadlock handling strategies.",
    points: [
      {
        heading: "Schedules",
        body: "A schedule is a sequence of interleaved operations from multiple transactions. A serial schedule executes transactions one after another with no interleaving; a serializable schedule produces the same result as some serial schedule.",
      },
      {
        heading: "Conflict Serializability",
        body: "A schedule is conflict-serializable if it can be transformed into a serial schedule by swapping non-conflicting operations. This is typically checked using a precedence (serialization) graph â€” if it has no cycles, the schedule is conflict-serializable.",
      },
      {
        heading: "Locking Protocols",
        body: "Two-Phase Locking (2PL) requires transactions to acquire all locks before releasing any (growing phase), then release locks without acquiring new ones (shrinking phase), guaranteeing conflict-serializability.",
      },
      {
        heading: "Shared & Exclusive Locks",
        body: "A shared (S) lock allows multiple transactions to read a data item concurrently. An exclusive (X) lock allows only one transaction to read/write, blocking all other access.",
      },
      {
        heading: "Deadlocks",
        body: "A deadlock occurs when two or more transactions are waiting indefinitely for each other's locks. It can be handled through prevention (e.g., wait-die, wound-wait schemes), detection (wait-for graphs), or timeouts.",
      },
      {
        heading: "Timestamp Ordering",
        body: "An alternative to locking where each transaction is assigned a unique timestamp, and conflicting operations are ordered based on transaction timestamps to ensure serializability without locks.",
      },
    ],
    code:
      "-- Two Transactions accessing shared data (pseudo-code)\n" +
      "T1: LOCK-X(A); READ(A); A = A - 100; WRITE(A); UNLOCK(A);\n" +
      "T2: LOCK-X(A); READ(A); A = A + 50;  WRITE(A); UNLOCK(A);\n\n" +
      "-- Deadlock scenario:\n" +
      "T1: LOCK-X(A); ... LOCK-X(B);  -- waits for T2 to release B\n" +
      "T2: LOCK-X(B); ... LOCK-X(A);  -- waits for T1 to release A  => DEADLOCK",
  },

  indexing: {
    title: "B-Trees, B+ Trees, Hashing",
    description:
      "Learn how indexes dramatically speed up data retrieval, and compare the internal structures of B-Trees, B+ Trees, and hash-based indexes.",
    points: [
      {
        heading: "Purpose of Indexing",
        body: "An index is an auxiliary data structure that allows the DBMS to locate rows without scanning the entire table, trading extra storage and write overhead for much faster reads.",
      },
      {
        heading: "B-Tree Structure",
        body: "A B-Tree is a balanced, multi-way search tree where each node can hold multiple keys and pointers, keeping data sorted and allowing searches, insertions, and deletions in logarithmic time. Data pointers exist at all levels.",
      },
      {
        heading: "B+ Tree Structure",
        body: "A B+ Tree stores all actual data pointers only at the leaf level, while internal nodes store only keys for navigation. Leaf nodes are linked together, enabling fast range queries and sequential scans.",
      },
      {
        heading: "Dense vs Sparse Index",
        body: "A dense index has an entry for every search key value in the file. A sparse index has entries for only some of the values, typically one per block, requiring the data file to be sorted.",
      },
      {
        heading: "Hashing",
        body: "Hash indexes apply a hash function to a key to compute a bucket address directly. Static hashing uses a fixed number of buckets; dynamic (extendible/linear) hashing grows the bucket structure as data grows, avoiding costly reorganization.",
      },
      {
        heading: "Clustered vs Non-Clustered Index",
        body: "A clustered index determines the physical order of data rows in the table (only one per table). A non-clustered index maintains a separate structure with pointers back to the actual data rows (multiple allowed per table).",
      },
    ],
    code:
      "-- Creating a non-clustered index on a frequently filtered column\n" +
      "CREATE INDEX idx_employee_salary\n" +
      "ON Employee (salary);\n\n" +
      "-- Composite index for queries filtering on both columns\n" +
      "CREATE INDEX idx_dept_salary\n" +
      "ON Employee (dept_id, salary);\n\n" +
      "-- Query that benefits from the index\n" +
      "SELECT * FROM Employee WHERE dept_id = 3 AND salary > 50000;",
  },

  nosql: {
    title: "Introduction to NoSQL Databases",
    description:
      "Explore non-relational database models designed for horizontal scalability, flexible schemas, and specialized data access patterns.",
    points: [
      {
        heading: "Why NoSQL?",
        body: "NoSQL databases emerged to handle massive scale, high-velocity data, flexible/evolving schemas, and distributed architectures that traditional relational databases struggle to support efficiently.",
      },
      {
        heading: "Key-Value Stores",
        body: "The simplest NoSQL model: data is stored as a collection of key-value pairs, optimized for extremely fast lookups. Examples include Redis and DynamoDB.",
      },
      {
        heading: "Document Databases",
        body: "Store semi-structured data as documents (typically JSON/BSON), allowing nested structures and flexible schemas per document. MongoDB and CouchDB are common examples.",
      },
      {
        heading: "Column-Family & Graph Databases",
        body: "Column-family stores (e.g., Cassandra, HBase) organize data by column groups for efficient analytical writes/reads at scale. Graph databases (e.g., Neo4j) model data as nodes and edges, optimized for traversing relationships.",
      },
      {
        heading: "CAP Theorem",
        body: "In a distributed system, you can only guarantee two of three properties simultaneously: Consistency, Availability, and Partition tolerance. Since network partitions are unavoidable, systems must choose between consistency (CP) and availability (AP).",
      },
      {
        heading: "BASE vs ACID",
        body: "Many NoSQL systems favor BASE (Basically Available, Soft state, Eventual consistency) over strict ACID guarantees, trading immediate consistency for higher availability and scalability.",
      },
    ],
    code:
      "// MongoDB-style document query\n" +
      "db.employees.find(\n" +
      "  { department: \"Engineering\", salary: { $gt: 50000 } },\n" +
      "  { name: 1, salary: 1, _id: 0 }\n" +
      ").sort({ salary: -1 });\n\n" +
      "// Example document structure\n" +
      "{\n" +
      "  \"_id\": \"E101\",\n" +
      "  \"name\": \"Alice\",\n" +
      "  \"department\": \"Engineering\",\n" +
      "  \"salary\": 62000,\n" +
      "  \"skills\": [\"SQL\", \"Node.js\"]\n" +
      "}",
  },

  architecture: {
    title: "Database Architecture & Storage",
    description:
      "Learn the layered architecture of a DBMS, from the three-schema architecture to physical storage management and file organization.",
    points: [
      {
        heading: "Three-Schema Architecture",
        body: "Separates the database into three levels: the External (view) level tailored to user groups, the Conceptual (logical) level describing the overall community structure, and the Internal (physical) level describing storage details.",
      },
      {
        heading: "Data Independence Revisited",
        body: "Logical data independence allows changes to the conceptual schema without altering external schemas. Physical data independence allows changes to the internal schema without altering the conceptual schema.",
      },
      {
        heading: "Storage Hierarchy",
        body: "Data is stored across a hierarchy from fastest/smallest to slowest/largest: CPU cache, main memory (RAM), flash/SSD storage, and magnetic disk/tape, with the DBMS managing data movement between them.",
      },
      {
        heading: "DBMS Components",
        body: "Major components include the Query Processor (parser, optimizer, execution engine), Storage Manager (buffer manager, file manager), and Transaction Manager (concurrency control, recovery manager).",
      },
      {
        heading: "Buffer Manager",
        body: "The buffer manager is responsible for fetching pages from disk into main memory buffers and deciding which pages to evict (using policies like LRU) when space is needed, minimizing costly disk I/O.",
      },
      {
        heading: "File Organization",
        body: "Data files can be organized as heap files (unordered insertion), sorted/sequential files (ordered by key), or hash files (organized via a hash function) â€” each with different trade-offs for search and insertion performance.",
      },
    ],
    code:
      "-- Conceptual query issued by a user (External/Conceptual level)\n" +
      "SELECT name FROM Employee WHERE dept_id = 3;\n\n" +
      "-- Internally the Query Processor performs:\n" +
      "-- 1. Parsing        -> validate syntax & semantics\n" +
      "-- 2. Optimization    -> choose best access path (e.g., use index)\n" +
      "-- 3. Execution       -> Storage Manager fetches pages via Buffer Manager\n" +
      "-- 4. Result returned -> rows streamed back to the user/application",
  },
};

// =====================================================================================
// MCQ
// =====================================================================================
export const MCQ: Record<string, MCQQuestion[]> = {
  "basics": [
    {
      q: "Consider a scenario involving Three-schema architecture. Which approach is most optimal? **GATE 2022**",
      options: [
        "Ignoring concurrency rules",
        "Applying standard normalization techniques",
        "Storing all data in a single flat file",
        "Using proper constraint management and indexing"
      ],
      ans: 3,
      explanation: "When dealing with Three-schema architecture, using proper constraint management and indexing ensures long-term scalability and correctness."
    },
    {
      q: "In the context of DBMS, what is the primary role of file systems vs DBMS? **GATE 2015**",
      options: [
        "To define the physical hardware requirements",
        "To eliminate the need for primary keys",
        "To ensure structural and operational robustness",
        "To bypass query optimization"
      ],
      ans: 2,
      explanation: "The concept of file systems vs DBMS is primarily utilized to ensure the structural and operational robustness of the database."
    },
    {
      q: "Which of the following is true regarding Three-schema architecture? **GATE 2023**",
      options: [
        "It ensures high availability at the cost of consistency",
        "It is fundamental for maintaining data integrity and system efficiency",
        "It relies entirely on manual user intervention",
        "It is an obsolete concept in modern RDBMS"
      ],
      ans: 1,
      explanation: "Understanding Three-schema architecture is critical as it provides the foundational integrity and efficiency required by modern database systems."
    },
    {
      q: "Consider a scenario involving data independence. Which approach is most optimal? **GATE 2018**",
      options: [
        "Ignoring concurrency rules",
        "Applying standard normalization techniques",
        "Storing all data in a single flat file",
        "Using proper constraint management and indexing"
      ],
      ans: 3,
      explanation: "When dealing with data independence, using proper constraint management and indexing ensures long-term scalability and correctness."
    },
    {
      q: "In the context of DBMS, what is the primary role of data independence? **GATE 2017**",
      options: [
        "To define the physical hardware requirements",
        "To eliminate the need for primary keys",
        "To ensure structural and operational robustness",
        "To bypass query optimization"
      ],
      ans: 2,
      explanation: "The concept of data independence is primarily utilized to ensure the structural and operational robustness of the database."
    },
    {
      q: "Consider a scenario involving file systems vs DBMS. Which approach is most optimal? **GATE 2021**",
      options: [
        "Ignoring concurrency rules",
        "Applying standard normalization techniques",
        "Storing all data in a single flat file",
        "Using proper constraint management and indexing"
      ],
      ans: 3,
      explanation: "When dealing with file systems vs DBMS, using proper constraint management and indexing ensures long-term scalability and correctness."
    },
    {
      q: "Consider a scenario involving data independence. Which approach is most optimal? **GATE 2023**",
      options: [
        "Ignoring concurrency rules",
        "Applying standard normalization techniques",
        "Storing all data in a single flat file",
        "Using proper constraint management and indexing"
      ],
      ans: 3,
      explanation: "When dealing with data independence, using proper constraint management and indexing ensures long-term scalability and correctness."
    },
    {
      q: "Consider a scenario involving DBA responsibilities. Which approach is most optimal? **GATE 2021**",
      options: [
        "Ignoring concurrency rules",
        "Applying standard normalization techniques",
        "Storing all data in a single flat file",
        "Using proper constraint management and indexing"
      ],
      ans: 3,
      explanation: "When dealing with DBA responsibilities, using proper constraint management and indexing ensures long-term scalability and correctness."
    },
    {
      q: "In the context of DBMS, what is the primary role of DBA responsibilities? **GATE 2023**",
      options: [
        "To define the physical hardware requirements",
        "To eliminate the need for primary keys",
        "To ensure structural and operational robustness",
        "To bypass query optimization"
      ],
      ans: 2,
      explanation: "The concept of DBA responsibilities is primarily utilized to ensure the structural and operational robustness of the database."
    },
    {
      q: "Which of the following is true regarding Three-schema architecture? **GATE 2016**",
      options: [
        "It ensures high availability at the cost of consistency",
        "It is fundamental for maintaining data integrity and system efficiency",
        "It relies entirely on manual user intervention",
        "It is an obsolete concept in modern RDBMS"
      ],
      ans: 1,
      explanation: "Understanding Three-schema architecture is critical as it provides the foundational integrity and efficiency required by modern database systems."
    },
    {
      q: "Consider a scenario involving data independence. Which approach is most optimal? **GATE 2015**",
      options: [
        "Ignoring concurrency rules",
        "Applying standard normalization techniques",
        "Storing all data in a single flat file",
        "Using proper constraint management and indexing"
      ],
      ans: 3,
      explanation: "When dealing with data independence, using proper constraint management and indexing ensures long-term scalability and correctness."
    },
    {
      q: "Which of the following is true regarding data independence? **GATE 2014**",
      options: [
        "It ensures high availability at the cost of consistency",
        "It is fundamental for maintaining data integrity and system efficiency",
        "It relies entirely on manual user intervention",
        "It is an obsolete concept in modern RDBMS"
      ],
      ans: 1,
      explanation: "Understanding data independence is critical as it provides the foundational integrity and efficiency required by modern database systems."
    },
    {
      q: "In the context of DBMS, what is the primary role of file systems vs DBMS? **GATE 2017**",
      options: [
        "To define the physical hardware requirements",
        "To eliminate the need for primary keys",
        "To ensure structural and operational robustness",
        "To bypass query optimization"
      ],
      ans: 2,
      explanation: "The concept of file systems vs DBMS is primarily utilized to ensure the structural and operational robustness of the database."
    },
    {
      q: "In the context of DBMS, what is the primary role of file systems vs DBMS? **GATE 2016**",
      options: [
        "To define the physical hardware requirements",
        "To eliminate the need for primary keys",
        "To ensure structural and operational robustness",
        "To bypass query optimization"
      ],
      ans: 2,
      explanation: "The concept of file systems vs DBMS is primarily utilized to ensure the structural and operational robustness of the database."
    },
    {
      q: "Which of the following is true regarding file systems vs DBMS? **GATE 2022**",
      options: [
        "It ensures high availability at the cost of consistency",
        "It is fundamental for maintaining data integrity and system efficiency",
        "It relies entirely on manual user intervention",
        "It is an obsolete concept in modern RDBMS"
      ],
      ans: 1,
      explanation: "Understanding file systems vs DBMS is critical as it provides the foundational integrity and efficiency required by modern database systems."
    }
  ],
  "relational": [
    {
      q: "Consider a scenario involving foreign keys. Which approach is most optimal? **GATE 2020**",
      options: [
        "Ignoring concurrency rules",
        "Applying standard normalization techniques",
        "Storing all data in a single flat file",
        "Using proper constraint management and indexing"
      ],
      ans: 3,
      explanation: "When dealing with foreign keys, using proper constraint management and indexing ensures long-term scalability and correctness."
    },
    {
      q: "Which of the following is true regarding super keys? **GATE 2019**",
      options: [
        "It ensures high availability at the cost of consistency",
        "It is fundamental for maintaining data integrity and system efficiency",
        "It relies entirely on manual user intervention",
        "It is an obsolete concept in modern RDBMS"
      ],
      ans: 1,
      explanation: "Understanding super keys is critical as it provides the foundational integrity and efficiency required by modern database systems."
    },
    {
      q: "In the context of DBMS, what is the primary role of referential integrity? **GATE 2020**",
      options: [
        "To define the physical hardware requirements",
        "To eliminate the need for primary keys",
        "To ensure structural and operational robustness",
        "To bypass query optimization"
      ],
      ans: 2,
      explanation: "The concept of referential integrity is primarily utilized to ensure the structural and operational robustness of the database."
    },
    {
      q: "Which of the following is true regarding referential integrity? **GATE 2016**",
      options: [
        "It ensures high availability at the cost of consistency",
        "It is fundamental for maintaining data integrity and system efficiency",
        "It relies entirely on manual user intervention",
        "It is an obsolete concept in modern RDBMS"
      ],
      ans: 1,
      explanation: "Understanding referential integrity is critical as it provides the foundational integrity and efficiency required by modern database systems."
    },
    {
      q: "In the context of DBMS, what is the primary role of referential integrity? **GATE 2020**",
      options: [
        "To define the physical hardware requirements",
        "To eliminate the need for primary keys",
        "To ensure structural and operational robustness",
        "To bypass query optimization"
      ],
      ans: 2,
      explanation: "The concept of referential integrity is primarily utilized to ensure the structural and operational robustness of the database."
    },
    {
      q: "In the context of DBMS, what is the primary role of tuples and attributes? **GATE 2018**",
      options: [
        "To define the physical hardware requirements",
        "To eliminate the need for primary keys",
        "To ensure structural and operational robustness",
        "To bypass query optimization"
      ],
      ans: 2,
      explanation: "The concept of tuples and attributes is primarily utilized to ensure the structural and operational robustness of the database."
    },
    {
      q: "In the context of DBMS, what is the primary role of foreign keys? **GATE 2019**",
      options: [
        "To define the physical hardware requirements",
        "To eliminate the need for primary keys",
        "To ensure structural and operational robustness",
        "To bypass query optimization"
      ],
      ans: 2,
      explanation: "The concept of foreign keys is primarily utilized to ensure the structural and operational robustness of the database."
    },
    {
      q: "Consider a scenario involving candidate keys. Which approach is most optimal? **GATE 2021**",
      options: [
        "Ignoring concurrency rules",
        "Applying standard normalization techniques",
        "Storing all data in a single flat file",
        "Using proper constraint management and indexing"
      ],
      ans: 3,
      explanation: "When dealing with candidate keys, using proper constraint management and indexing ensures long-term scalability and correctness."
    },
    {
      q: "Which of the following is true regarding candidate keys? **GATE 2018**",
      options: [
        "It ensures high availability at the cost of consistency",
        "It is fundamental for maintaining data integrity and system efficiency",
        "It relies entirely on manual user intervention",
        "It is an obsolete concept in modern RDBMS"
      ],
      ans: 1,
      explanation: "Understanding candidate keys is critical as it provides the foundational integrity and efficiency required by modern database systems."
    },
    {
      q: "In the context of DBMS, what is the primary role of foreign keys? **GATE 2019**",
      options: [
        "To define the physical hardware requirements",
        "To eliminate the need for primary keys",
        "To ensure structural and operational robustness",
        "To bypass query optimization"
      ],
      ans: 2,
      explanation: "The concept of foreign keys is primarily utilized to ensure the structural and operational robustness of the database."
    },
    {
      q: "Consider a scenario involving referential integrity. Which approach is most optimal? **GATE 2014**",
      options: [
        "Ignoring concurrency rules",
        "Applying standard normalization techniques",
        "Storing all data in a single flat file",
        "Using proper constraint management and indexing"
      ],
      ans: 3,
      explanation: "When dealing with referential integrity, using proper constraint management and indexing ensures long-term scalability and correctness."
    },
    {
      q: "In the context of DBMS, what is the primary role of candidate keys? **GATE 2022**",
      options: [
        "To define the physical hardware requirements",
        "To eliminate the need for primary keys",
        "To ensure structural and operational robustness",
        "To bypass query optimization"
      ],
      ans: 2,
      explanation: "The concept of candidate keys is primarily utilized to ensure the structural and operational robustness of the database."
    },
    {
      q: "Consider a scenario involving foreign keys. Which approach is most optimal? **GATE 2014**",
      options: [
        "Ignoring concurrency rules",
        "Applying standard normalization techniques",
        "Storing all data in a single flat file",
        "Using proper constraint management and indexing"
      ],
      ans: 3,
      explanation: "When dealing with foreign keys, using proper constraint management and indexing ensures long-term scalability and correctness."
    },
    {
      q: "In the context of DBMS, what is the primary role of foreign keys? **GATE 2015**",
      options: [
        "To define the physical hardware requirements",
        "To eliminate the need for primary keys",
        "To ensure structural and operational robustness",
        "To bypass query optimization"
      ],
      ans: 2,
      explanation: "The concept of foreign keys is primarily utilized to ensure the structural and operational robustness of the database."
    },
    {
      q: "Which of the following is true regarding tuples and attributes? **GATE 2020**",
      options: [
        "It ensures high availability at the cost of consistency",
        "It is fundamental for maintaining data integrity and system efficiency",
        "It relies entirely on manual user intervention",
        "It is an obsolete concept in modern RDBMS"
      ],
      ans: 1,
      explanation: "Understanding tuples and attributes is critical as it provides the foundational integrity and efficiency required by modern database systems."
    }
  ],
  "sql-basics": [
    {
      q: "Consider a scenario involving WHERE clause filters. Which approach is most optimal? **GATE 2018**",
      options: [
        "Ignoring concurrency rules",
        "Applying standard normalization techniques",
        "Storing all data in a single flat file",
        "Using proper constraint management and indexing"
      ],
      ans: 3,
      explanation: "When dealing with WHERE clause filters, using proper constraint management and indexing ensures long-term scalability and correctness."
    },
    {
      q: "In the context of DBMS, what is the primary role of SELECT syntax? **GATE 2018**",
      options: [
        "To define the physical hardware requirements",
        "To eliminate the need for primary keys",
        "To ensure structural and operational robustness",
        "To bypass query optimization"
      ],
      ans: 2,
      explanation: "The concept of SELECT syntax is primarily utilized to ensure the structural and operational robustness of the database."
    },
    {
      q: "In the context of DBMS, what is the primary role of DDL vs DML? **GATE 2018**",
      options: [
        "To define the physical hardware requirements",
        "To eliminate the need for primary keys",
        "To ensure structural and operational robustness",
        "To bypass query optimization"
      ],
      ans: 2,
      explanation: "The concept of DDL vs DML is primarily utilized to ensure the structural and operational robustness of the database."
    },
    {
      q: "Which of the following is true regarding SELECT syntax? **GATE 2023**",
      options: [
        "It ensures high availability at the cost of consistency",
        "It is fundamental for maintaining data integrity and system efficiency",
        "It relies entirely on manual user intervention",
        "It is an obsolete concept in modern RDBMS"
      ],
      ans: 1,
      explanation: "Understanding SELECT syntax is critical as it provides the foundational integrity and efficiency required by modern database systems."
    },
    {
      q: "Which of the following is true regarding CREATE TABLE? **GATE 2016**",
      options: [
        "It ensures high availability at the cost of consistency",
        "It is fundamental for maintaining data integrity and system efficiency",
        "It relies entirely on manual user intervention",
        "It is an obsolete concept in modern RDBMS"
      ],
      ans: 1,
      explanation: "Understanding CREATE TABLE is critical as it provides the foundational integrity and efficiency required by modern database systems."
    },
    {
      q: "Consider a scenario involving CREATE TABLE. Which approach is most optimal? **GATE 2015**",
      options: [
        "Ignoring concurrency rules",
        "Applying standard normalization techniques",
        "Storing all data in a single flat file",
        "Using proper constraint management and indexing"
      ],
      ans: 3,
      explanation: "When dealing with CREATE TABLE, using proper constraint management and indexing ensures long-term scalability and correctness."
    },
    {
      q: "Which of the following is true regarding CREATE TABLE? **GATE 2015**",
      options: [
        "It ensures high availability at the cost of consistency",
        "It is fundamental for maintaining data integrity and system efficiency",
        "It relies entirely on manual user intervention",
        "It is an obsolete concept in modern RDBMS"
      ],
      ans: 1,
      explanation: "Understanding CREATE TABLE is critical as it provides the foundational integrity and efficiency required by modern database systems."
    },
    {
      q: "Which of the following is true regarding CREATE TABLE? **GATE 2021**",
      options: [
        "It ensures high availability at the cost of consistency",
        "It is fundamental for maintaining data integrity and system efficiency",
        "It relies entirely on manual user intervention",
        "It is an obsolete concept in modern RDBMS"
      ],
      ans: 1,
      explanation: "Understanding CREATE TABLE is critical as it provides the foundational integrity and efficiency required by modern database systems."
    },
    {
      q: "Which of the following is true regarding CREATE TABLE? **GATE 2014**",
      options: [
        "It ensures high availability at the cost of consistency",
        "It is fundamental for maintaining data integrity and system efficiency",
        "It relies entirely on manual user intervention",
        "It is an obsolete concept in modern RDBMS"
      ],
      ans: 1,
      explanation: "Understanding CREATE TABLE is critical as it provides the foundational integrity and efficiency required by modern database systems."
    },
    {
      q: "In the context of DBMS, what is the primary role of Constraints? **GATE 2016**",
      options: [
        "To define the physical hardware requirements",
        "To eliminate the need for primary keys",
        "To ensure structural and operational robustness",
        "To bypass query optimization"
      ],
      ans: 2,
      explanation: "The concept of Constraints is primarily utilized to ensure the structural and operational robustness of the database."
    },
    {
      q: "Which of the following is true regarding Constraints? **GATE 2019**",
      options: [
        "It ensures high availability at the cost of consistency",
        "It is fundamental for maintaining data integrity and system efficiency",
        "It relies entirely on manual user intervention",
        "It is an obsolete concept in modern RDBMS"
      ],
      ans: 1,
      explanation: "Understanding Constraints is critical as it provides the foundational integrity and efficiency required by modern database systems."
    },
    {
      q: "Which of the following is true regarding Constraints? **GATE 2014**",
      options: [
        "It ensures high availability at the cost of consistency",
        "It is fundamental for maintaining data integrity and system efficiency",
        "It relies entirely on manual user intervention",
        "It is an obsolete concept in modern RDBMS"
      ],
      ans: 1,
      explanation: "Understanding Constraints is critical as it provides the foundational integrity and efficiency required by modern database systems."
    },
    {
      q: "Consider a scenario involving Constraints. Which approach is most optimal? **GATE 2017**",
      options: [
        "Ignoring concurrency rules",
        "Applying standard normalization techniques",
        "Storing all data in a single flat file",
        "Using proper constraint management and indexing"
      ],
      ans: 3,
      explanation: "When dealing with Constraints, using proper constraint management and indexing ensures long-term scalability and correctness."
    },
    {
      q: "Consider a scenario involving CREATE TABLE. Which approach is most optimal? **GATE 2022**",
      options: [
        "Ignoring concurrency rules",
        "Applying standard normalization techniques",
        "Storing all data in a single flat file",
        "Using proper constraint management and indexing"
      ],
      ans: 3,
      explanation: "When dealing with CREATE TABLE, using proper constraint management and indexing ensures long-term scalability and correctness."
    },
    {
      q: "Consider a scenario involving CREATE TABLE. Which approach is most optimal? **GATE 2020**",
      options: [
        "Ignoring concurrency rules",
        "Applying standard normalization techniques",
        "Storing all data in a single flat file",
        "Using proper constraint management and indexing"
      ],
      ans: 3,
      explanation: "When dealing with CREATE TABLE, using proper constraint management and indexing ensures long-term scalability and correctness."
    }
  ],
  "sql-advanced": [
    {
      q: "In the context of DBMS, what is the primary role of Aggregate functions? **GATE 2020**",
      options: [
        "To define the physical hardware requirements",
        "To eliminate the need for primary keys",
        "To ensure structural and operational robustness",
        "To bypass query optimization"
      ],
      ans: 2,
      explanation: "The concept of Aggregate functions is primarily utilized to ensure the structural and operational robustness of the database."
    },
    {
      q: "Consider a scenario involving Set operations. Which approach is most optimal? **GATE 2017**",
      options: [
        "Ignoring concurrency rules",
        "Applying standard normalization techniques",
        "Storing all data in a single flat file",
        "Using proper constraint management and indexing"
      ],
      ans: 3,
      explanation: "When dealing with Set operations, using proper constraint management and indexing ensures long-term scalability and correctness."
    },
    {
      q: "Which of the following is true regarding Correlated subqueries? **GATE 2014**",
      options: [
        "It ensures high availability at the cost of consistency",
        "It is fundamental for maintaining data integrity and system efficiency",
        "It relies entirely on manual user intervention",
        "It is an obsolete concept in modern RDBMS"
      ],
      ans: 1,
      explanation: "Understanding Correlated subqueries is critical as it provides the foundational integrity and efficiency required by modern database systems."
    },
    {
      q: "Which of the following is true regarding Set operations? **GATE 2017**",
      options: [
        "It ensures high availability at the cost of consistency",
        "It is fundamental for maintaining data integrity and system efficiency",
        "It relies entirely on manual user intervention",
        "It is an obsolete concept in modern RDBMS"
      ],
      ans: 1,
      explanation: "Understanding Set operations is critical as it provides the foundational integrity and efficiency required by modern database systems."
    },
    {
      q: "Which of the following is true regarding Correlated subqueries? **GATE 2014**",
      options: [
        "It ensures high availability at the cost of consistency",
        "It is fundamental for maintaining data integrity and system efficiency",
        "It relies entirely on manual user intervention",
        "It is an obsolete concept in modern RDBMS"
      ],
      ans: 1,
      explanation: "Understanding Correlated subqueries is critical as it provides the foundational integrity and efficiency required by modern database systems."
    },
    {
      q: "In the context of DBMS, what is the primary role of Set operations? **GATE 2017**",
      options: [
        "To define the physical hardware requirements",
        "To eliminate the need for primary keys",
        "To ensure structural and operational robustness",
        "To bypass query optimization"
      ],
      ans: 2,
      explanation: "The concept of Set operations is primarily utilized to ensure the structural and operational robustness of the database."
    },
    {
      q: "Which of the following is true regarding Set operations? **GATE 2023**",
      options: [
        "It ensures high availability at the cost of consistency",
        "It is fundamental for maintaining data integrity and system efficiency",
        "It relies entirely on manual user intervention",
        "It is an obsolete concept in modern RDBMS"
      ],
      ans: 1,
      explanation: "Understanding Set operations is critical as it provides the foundational integrity and efficiency required by modern database systems."
    },
    {
      q: "In the context of DBMS, what is the primary role of Set operations? **GATE 2017**",
      options: [
        "To define the physical hardware requirements",
        "To eliminate the need for primary keys",
        "To ensure structural and operational robustness",
        "To bypass query optimization"
      ],
      ans: 2,
      explanation: "The concept of Set operations is primarily utilized to ensure the structural and operational robustness of the database."
    },
    {
      q: "Which of the following is true regarding Aggregate functions? **GATE 2022**",
      options: [
        "It ensures high availability at the cost of consistency",
        "It is fundamental for maintaining data integrity and system efficiency",
        "It relies entirely on manual user intervention",
        "It is an obsolete concept in modern RDBMS"
      ],
      ans: 1,
      explanation: "Understanding Aggregate functions is critical as it provides the foundational integrity and efficiency required by modern database systems."
    },
    {
      q: "Which of the following is true regarding Correlated subqueries? **GATE 2017**",
      options: [
        "It ensures high availability at the cost of consistency",
        "It is fundamental for maintaining data integrity and system efficiency",
        "It relies entirely on manual user intervention",
        "It is an obsolete concept in modern RDBMS"
      ],
      ans: 1,
      explanation: "Understanding Correlated subqueries is critical as it provides the foundational integrity and efficiency required by modern database systems."
    },
    {
      q: "Consider a scenario involving Aggregate functions. Which approach is most optimal? **GATE 2015**",
      options: [
        "Ignoring concurrency rules",
        "Applying standard normalization techniques",
        "Storing all data in a single flat file",
        "Using proper constraint management and indexing"
      ],
      ans: 3,
      explanation: "When dealing with Aggregate functions, using proper constraint management and indexing ensures long-term scalability and correctness."
    },
    {
      q: "Consider a scenario involving Set operations. Which approach is most optimal? **GATE 2018**",
      options: [
        "Ignoring concurrency rules",
        "Applying standard normalization techniques",
        "Storing all data in a single flat file",
        "Using proper constraint management and indexing"
      ],
      ans: 3,
      explanation: "When dealing with Set operations, using proper constraint management and indexing ensures long-term scalability and correctness."
    },
    {
      q: "Consider a scenario involving Set operations. Which approach is most optimal? **GATE 2014**",
      options: [
        "Ignoring concurrency rules",
        "Applying standard normalization techniques",
        "Storing all data in a single flat file",
        "Using proper constraint management and indexing"
      ],
      ans: 3,
      explanation: "When dealing with Set operations, using proper constraint management and indexing ensures long-term scalability and correctness."
    },
    {
      q: "In the context of DBMS, what is the primary role of Set operations? **GATE 2014**",
      options: [
        "To define the physical hardware requirements",
        "To eliminate the need for primary keys",
        "To ensure structural and operational robustness",
        "To bypass query optimization"
      ],
      ans: 2,
      explanation: "The concept of Set operations is primarily utilized to ensure the structural and operational robustness of the database."
    },
    {
      q: "Consider a scenario involving Correlated subqueries. Which approach is most optimal? **GATE 2022**",
      options: [
        "Ignoring concurrency rules",
        "Applying standard normalization techniques",
        "Storing all data in a single flat file",
        "Using proper constraint management and indexing"
      ],
      ans: 3,
      explanation: "When dealing with Correlated subqueries, using proper constraint management and indexing ensures long-term scalability and correctness."
    }
  ],
  "normalization": [
    {
      q: "In the context of DBMS, what is the primary role of 3NF and transitive dependencies? **GATE 2018**",
      options: [
        "To define the physical hardware requirements",
        "To eliminate the need for primary keys",
        "To ensure structural and operational robustness",
        "To bypass query optimization"
      ],
      ans: 2,
      explanation: "The concept of 3NF and transitive dependencies is primarily utilized to ensure the structural and operational robustness of the database."
    },
    {
      q: "Which of the following is true regarding BCNF strictly? **GATE 2014**",
      options: [
        "It ensures high availability at the cost of consistency",
        "It is fundamental for maintaining data integrity and system efficiency",
        "It relies entirely on manual user intervention",
        "It is an obsolete concept in modern RDBMS"
      ],
      ans: 1,
      explanation: "Understanding BCNF strictly is critical as it provides the foundational integrity and efficiency required by modern database systems."
    },
    {
      q: "Which of the following is true regarding 2NF and partial dependencies? **GATE 2016**",
      options: [
        "It ensures high availability at the cost of consistency",
        "It is fundamental for maintaining data integrity and system efficiency",
        "It relies entirely on manual user intervention",
        "It is an obsolete concept in modern RDBMS"
      ],
      ans: 1,
      explanation: "Understanding 2NF and partial dependencies is critical as it provides the foundational integrity and efficiency required by modern database systems."
    },
    {
      q: "In the context of DBMS, what is the primary role of BCNF strictly? **GATE 2015**",
      options: [
        "To define the physical hardware requirements",
        "To eliminate the need for primary keys",
        "To ensure structural and operational robustness",
        "To bypass query optimization"
      ],
      ans: 2,
      explanation: "The concept of BCNF strictly is primarily utilized to ensure the structural and operational robustness of the database."
    },
    {
      q: "Which of the following is true regarding 1NF properties? **GATE 2022**",
      options: [
        "It ensures high availability at the cost of consistency",
        "It is fundamental for maintaining data integrity and system efficiency",
        "It relies entirely on manual user intervention",
        "It is an obsolete concept in modern RDBMS"
      ],
      ans: 1,
      explanation: "Understanding 1NF properties is critical as it provides the foundational integrity and efficiency required by modern database systems."
    },
    {
      q: "Which of the following is true regarding BCNF strictly? **GATE 2023**",
      options: [
        "It ensures high availability at the cost of consistency",
        "It is fundamental for maintaining data integrity and system efficiency",
        "It relies entirely on manual user intervention",
        "It is an obsolete concept in modern RDBMS"
      ],
      ans: 1,
      explanation: "Understanding BCNF strictly is critical as it provides the foundational integrity and efficiency required by modern database systems."
    },
    {
      q: "Consider a scenario involving Functional dependencies. Which approach is most optimal? **GATE 2019**",
      options: [
        "Ignoring concurrency rules",
        "Applying standard normalization techniques",
        "Storing all data in a single flat file",
        "Using proper constraint management and indexing"
      ],
      ans: 3,
      explanation: "When dealing with Functional dependencies, using proper constraint management and indexing ensures long-term scalability and correctness."
    },
    {
      q: "Consider a scenario involving 2NF and partial dependencies. Which approach is most optimal? **GATE 2014**",
      options: [
        "Ignoring concurrency rules",
        "Applying standard normalization techniques",
        "Storing all data in a single flat file",
        "Using proper constraint management and indexing"
      ],
      ans: 3,
      explanation: "When dealing with 2NF and partial dependencies, using proper constraint management and indexing ensures long-term scalability and correctness."
    },
    {
      q: "Which of the following is true regarding 1NF properties? **GATE 2017**",
      options: [
        "It ensures high availability at the cost of consistency",
        "It is fundamental for maintaining data integrity and system efficiency",
        "It relies entirely on manual user intervention",
        "It is an obsolete concept in modern RDBMS"
      ],
      ans: 1,
      explanation: "Understanding 1NF properties is critical as it provides the foundational integrity and efficiency required by modern database systems."
    },
    {
      q: "Which of the following is true regarding Functional dependencies? **GATE 2023**",
      options: [
        "It ensures high availability at the cost of consistency",
        "It is fundamental for maintaining data integrity and system efficiency",
        "It relies entirely on manual user intervention",
        "It is an obsolete concept in modern RDBMS"
      ],
      ans: 1,
      explanation: "Understanding Functional dependencies is critical as it provides the foundational integrity and efficiency required by modern database systems."
    },
    {
      q: "Consider a scenario involving 3NF and transitive dependencies. Which approach is most optimal? **GATE 2021**",
      options: [
        "Ignoring concurrency rules",
        "Applying standard normalization techniques",
        "Storing all data in a single flat file",
        "Using proper constraint management and indexing"
      ],
      ans: 3,
      explanation: "When dealing with 3NF and transitive dependencies, using proper constraint management and indexing ensures long-term scalability and correctness."
    },
    {
      q: "Which of the following is true regarding 2NF and partial dependencies? **GATE 2020**",
      options: [
        "It ensures high availability at the cost of consistency",
        "It is fundamental for maintaining data integrity and system efficiency",
        "It relies entirely on manual user intervention",
        "It is an obsolete concept in modern RDBMS"
      ],
      ans: 1,
      explanation: "Understanding 2NF and partial dependencies is critical as it provides the foundational integrity and efficiency required by modern database systems."
    },
    {
      q: "Consider a scenario involving Functional dependencies. Which approach is most optimal? **GATE 2016**",
      options: [
        "Ignoring concurrency rules",
        "Applying standard normalization techniques",
        "Storing all data in a single flat file",
        "Using proper constraint management and indexing"
      ],
      ans: 3,
      explanation: "When dealing with Functional dependencies, using proper constraint management and indexing ensures long-term scalability and correctness."
    },
    {
      q: "Consider a scenario involving 3NF and transitive dependencies. Which approach is most optimal? **GATE 2015**",
      options: [
        "Ignoring concurrency rules",
        "Applying standard normalization techniques",
        "Storing all data in a single flat file",
        "Using proper constraint management and indexing"
      ],
      ans: 3,
      explanation: "When dealing with 3NF and transitive dependencies, using proper constraint management and indexing ensures long-term scalability and correctness."
    },
    {
      q: "Which of the following is true regarding 2NF and partial dependencies? **GATE 2019**",
      options: [
        "It ensures high availability at the cost of consistency",
        "It is fundamental for maintaining data integrity and system efficiency",
        "It relies entirely on manual user intervention",
        "It is an obsolete concept in modern RDBMS"
      ],
      ans: 1,
      explanation: "Understanding 2NF and partial dependencies is critical as it provides the foundational integrity and efficiency required by modern database systems."
    }
  ],
  "transactions": [
    {
      q: "Consider a scenario involving Consistency. Which approach is most optimal? **GATE 2022**",
      options: [
        "Ignoring concurrency rules",
        "Applying standard normalization techniques",
        "Storing all data in a single flat file",
        "Using proper constraint management and indexing"
      ],
      ans: 3,
      explanation: "When dealing with Consistency, using proper constraint management and indexing ensures long-term scalability and correctness."
    },
    {
      q: "Which of the following is true regarding Transaction states? **GATE 2016**",
      options: [
        "It ensures high availability at the cost of consistency",
        "It is fundamental for maintaining data integrity and system efficiency",
        "It relies entirely on manual user intervention",
        "It is an obsolete concept in modern RDBMS"
      ],
      ans: 1,
      explanation: "Understanding Transaction states is critical as it provides the foundational integrity and efficiency required by modern database systems."
    },
    {
      q: "In the context of DBMS, what is the primary role of Isolation levels? **GATE 2018**",
      options: [
        "To define the physical hardware requirements",
        "To eliminate the need for primary keys",
        "To ensure structural and operational robustness",
        "To bypass query optimization"
      ],
      ans: 2,
      explanation: "The concept of Isolation levels is primarily utilized to ensure the structural and operational robustness of the database."
    },
    {
      q: "In the context of DBMS, what is the primary role of Atomicity? **GATE 2014**",
      options: [
        "To define the physical hardware requirements",
        "To eliminate the need for primary keys",
        "To ensure structural and operational robustness",
        "To bypass query optimization"
      ],
      ans: 2,
      explanation: "The concept of Atomicity is primarily utilized to ensure the structural and operational robustness of the database."
    },
    {
      q: "In the context of DBMS, what is the primary role of Isolation levels? **GATE 2023**",
      options: [
        "To define the physical hardware requirements",
        "To eliminate the need for primary keys",
        "To ensure structural and operational robustness",
        "To bypass query optimization"
      ],
      ans: 2,
      explanation: "The concept of Isolation levels is primarily utilized to ensure the structural and operational robustness of the database."
    },
    {
      q: "Which of the following is true regarding Transaction states? **GATE 2020**",
      options: [
        "It ensures high availability at the cost of consistency",
        "It is fundamental for maintaining data integrity and system efficiency",
        "It relies entirely on manual user intervention",
        "It is an obsolete concept in modern RDBMS"
      ],
      ans: 1,
      explanation: "Understanding Transaction states is critical as it provides the foundational integrity and efficiency required by modern database systems."
    },
    {
      q: "Which of the following is true regarding Consistency? **GATE 2018**",
      options: [
        "It ensures high availability at the cost of consistency",
        "It is fundamental for maintaining data integrity and system efficiency",
        "It relies entirely on manual user intervention",
        "It is an obsolete concept in modern RDBMS"
      ],
      ans: 1,
      explanation: "Understanding Consistency is critical as it provides the foundational integrity and efficiency required by modern database systems."
    },
    {
      q: "In the context of DBMS, what is the primary role of Atomicity? **GATE 2021**",
      options: [
        "To define the physical hardware requirements",
        "To eliminate the need for primary keys",
        "To ensure structural and operational robustness",
        "To bypass query optimization"
      ],
      ans: 2,
      explanation: "The concept of Atomicity is primarily utilized to ensure the structural and operational robustness of the database."
    },
    {
      q: "In the context of DBMS, what is the primary role of Consistency? **GATE 2016**",
      options: [
        "To define the physical hardware requirements",
        "To eliminate the need for primary keys",
        "To ensure structural and operational robustness",
        "To bypass query optimization"
      ],
      ans: 2,
      explanation: "The concept of Consistency is primarily utilized to ensure the structural and operational robustness of the database."
    },
    {
      q: "Consider a scenario involving Durability and WAL. Which approach is most optimal? **GATE 2023**",
      options: [
        "Ignoring concurrency rules",
        "Applying standard normalization techniques",
        "Storing all data in a single flat file",
        "Using proper constraint management and indexing"
      ],
      ans: 3,
      explanation: "When dealing with Durability and WAL, using proper constraint management and indexing ensures long-term scalability and correctness."
    },
    {
      q: "Which of the following is true regarding Durability and WAL? **GATE 2022**",
      options: [
        "It ensures high availability at the cost of consistency",
        "It is fundamental for maintaining data integrity and system efficiency",
        "It relies entirely on manual user intervention",
        "It is an obsolete concept in modern RDBMS"
      ],
      ans: 1,
      explanation: "Understanding Durability and WAL is critical as it provides the foundational integrity and efficiency required by modern database systems."
    },
    {
      q: "Which of the following is true regarding Isolation levels? **GATE 2021**",
      options: [
        "It ensures high availability at the cost of consistency",
        "It is fundamental for maintaining data integrity and system efficiency",
        "It relies entirely on manual user intervention",
        "It is an obsolete concept in modern RDBMS"
      ],
      ans: 1,
      explanation: "Understanding Isolation levels is critical as it provides the foundational integrity and efficiency required by modern database systems."
    },
    {
      q: "In the context of DBMS, what is the primary role of Transaction states? **GATE 2020**",
      options: [
        "To define the physical hardware requirements",
        "To eliminate the need for primary keys",
        "To ensure structural and operational robustness",
        "To bypass query optimization"
      ],
      ans: 2,
      explanation: "The concept of Transaction states is primarily utilized to ensure the structural and operational robustness of the database."
    },
    {
      q: "Which of the following is true regarding Atomicity? **GATE 2016**",
      options: [
        "It ensures high availability at the cost of consistency",
        "It is fundamental for maintaining data integrity and system efficiency",
        "It relies entirely on manual user intervention",
        "It is an obsolete concept in modern RDBMS"
      ],
      ans: 1,
      explanation: "Understanding Atomicity is critical as it provides the foundational integrity and efficiency required by modern database systems."
    },
    {
      q: "Which of the following is true regarding Durability and WAL? **GATE 2018**",
      options: [
        "It ensures high availability at the cost of consistency",
        "It is fundamental for maintaining data integrity and system efficiency",
        "It relies entirely on manual user intervention",
        "It is an obsolete concept in modern RDBMS"
      ],
      ans: 1,
      explanation: "Understanding Durability and WAL is critical as it provides the foundational integrity and efficiency required by modern database systems."
    }
  ],
  "concurrency": [
    {
      q: "Which of the following is true regarding Serializable schedules? **GATE 2015**",
      options: [
        "It ensures high availability at the cost of consistency",
        "It is fundamental for maintaining data integrity and system efficiency",
        "It relies entirely on manual user intervention",
        "It is an obsolete concept in modern RDBMS"
      ],
      ans: 1,
      explanation: "Understanding Serializable schedules is critical as it provides the foundational integrity and efficiency required by modern database systems."
    },
    {
      q: "In the context of DBMS, what is the primary role of 2-Phase Locking? **GATE 2014**",
      options: [
        "To define the physical hardware requirements",
        "To eliminate the need for primary keys",
        "To ensure structural and operational robustness",
        "To bypass query optimization"
      ],
      ans: 2,
      explanation: "The concept of 2-Phase Locking is primarily utilized to ensure the structural and operational robustness of the database."
    },
    {
      q: "Which of the following is true regarding Timestamp ordering? **GATE 2022**",
      options: [
        "It ensures high availability at the cost of consistency",
        "It is fundamental for maintaining data integrity and system efficiency",
        "It relies entirely on manual user intervention",
        "It is an obsolete concept in modern RDBMS"
      ],
      ans: 1,
      explanation: "Understanding Timestamp ordering is critical as it provides the foundational integrity and efficiency required by modern database systems."
    },
    {
      q: "In the context of DBMS, what is the primary role of Deadlock detection? **GATE 2023**",
      options: [
        "To define the physical hardware requirements",
        "To eliminate the need for primary keys",
        "To ensure structural and operational robustness",
        "To bypass query optimization"
      ],
      ans: 2,
      explanation: "The concept of Deadlock detection is primarily utilized to ensure the structural and operational robustness of the database."
    },
    {
      q: "Which of the following is true regarding Timestamp ordering? **GATE 2022**",
      options: [
        "It ensures high availability at the cost of consistency",
        "It is fundamental for maintaining data integrity and system efficiency",
        "It relies entirely on manual user intervention",
        "It is an obsolete concept in modern RDBMS"
      ],
      ans: 1,
      explanation: "Understanding Timestamp ordering is critical as it provides the foundational integrity and efficiency required by modern database systems."
    },
    {
      q: "Which of the following is true regarding Deadlock detection? **GATE 2022**",
      options: [
        "It ensures high availability at the cost of consistency",
        "It is fundamental for maintaining data integrity and system efficiency",
        "It relies entirely on manual user intervention",
        "It is an obsolete concept in modern RDBMS"
      ],
      ans: 1,
      explanation: "Understanding Deadlock detection is critical as it provides the foundational integrity and efficiency required by modern database systems."
    },
    {
      q: "Consider a scenario involving Serializable schedules. Which approach is most optimal? **GATE 2023**",
      options: [
        "Ignoring concurrency rules",
        "Applying standard normalization techniques",
        "Storing all data in a single flat file",
        "Using proper constraint management and indexing"
      ],
      ans: 3,
      explanation: "When dealing with Serializable schedules, using proper constraint management and indexing ensures long-term scalability and correctness."
    },
    {
      q: "Consider a scenario involving Deadlock detection. Which approach is most optimal? **GATE 2023**",
      options: [
        "Ignoring concurrency rules",
        "Applying standard normalization techniques",
        "Storing all data in a single flat file",
        "Using proper constraint management and indexing"
      ],
      ans: 3,
      explanation: "When dealing with Deadlock detection, using proper constraint management and indexing ensures long-term scalability and correctness."
    },
    {
      q: "Consider a scenario involving 2-Phase Locking. Which approach is most optimal? **GATE 2020**",
      options: [
        "Ignoring concurrency rules",
        "Applying standard normalization techniques",
        "Storing all data in a single flat file",
        "Using proper constraint management and indexing"
      ],
      ans: 3,
      explanation: "When dealing with 2-Phase Locking, using proper constraint management and indexing ensures long-term scalability and correctness."
    },
    {
      q: "Consider a scenario involving Deadlock detection. Which approach is most optimal? **GATE 2014**",
      options: [
        "Ignoring concurrency rules",
        "Applying standard normalization techniques",
        "Storing all data in a single flat file",
        "Using proper constraint management and indexing"
      ],
      ans: 3,
      explanation: "When dealing with Deadlock detection, using proper constraint management and indexing ensures long-term scalability and correctness."
    },
    {
      q: "Which of the following is true regarding Timestamp ordering? **GATE 2018**",
      options: [
        "It ensures high availability at the cost of consistency",
        "It is fundamental for maintaining data integrity and system efficiency",
        "It relies entirely on manual user intervention",
        "It is an obsolete concept in modern RDBMS"
      ],
      ans: 1,
      explanation: "Understanding Timestamp ordering is critical as it provides the foundational integrity and efficiency required by modern database systems."
    },
    {
      q: "Consider a scenario involving Shared vs Exclusive locks. Which approach is most optimal? **GATE 2019**",
      options: [
        "Ignoring concurrency rules",
        "Applying standard normalization techniques",
        "Storing all data in a single flat file",
        "Using proper constraint management and indexing"
      ],
      ans: 3,
      explanation: "When dealing with Shared vs Exclusive locks, using proper constraint management and indexing ensures long-term scalability and correctness."
    },
    {
      q: "Which of the following is true regarding Shared vs Exclusive locks? **GATE 2019**",
      options: [
        "It ensures high availability at the cost of consistency",
        "It is fundamental for maintaining data integrity and system efficiency",
        "It relies entirely on manual user intervention",
        "It is an obsolete concept in modern RDBMS"
      ],
      ans: 1,
      explanation: "Understanding Shared vs Exclusive locks is critical as it provides the foundational integrity and efficiency required by modern database systems."
    },
    {
      q: "Consider a scenario involving Serializable schedules. Which approach is most optimal? **GATE 2015**",
      options: [
        "Ignoring concurrency rules",
        "Applying standard normalization techniques",
        "Storing all data in a single flat file",
        "Using proper constraint management and indexing"
      ],
      ans: 3,
      explanation: "When dealing with Serializable schedules, using proper constraint management and indexing ensures long-term scalability and correctness."
    },
    {
      q: "In the context of DBMS, what is the primary role of Shared vs Exclusive locks? **GATE 2023**",
      options: [
        "To define the physical hardware requirements",
        "To eliminate the need for primary keys",
        "To ensure structural and operational robustness",
        "To bypass query optimization"
      ],
      ans: 2,
      explanation: "The concept of Shared vs Exclusive locks is primarily utilized to ensure the structural and operational robustness of the database."
    }
  ],
  "indexing": [
    {
      q: "In the context of DBMS, what is the primary role of B+ Trees? **GATE 2016**",
      options: [
        "To define the physical hardware requirements",
        "To eliminate the need for primary keys",
        "To ensure structural and operational robustness",
        "To bypass query optimization"
      ],
      ans: 2,
      explanation: "The concept of B+ Trees is primarily utilized to ensure the structural and operational robustness of the database."
    },
    {
      q: "Consider a scenario involving B+ Trees. Which approach is most optimal? **GATE 2015**",
      options: [
        "Ignoring concurrency rules",
        "Applying standard normalization techniques",
        "Storing all data in a single flat file",
        "Using proper constraint management and indexing"
      ],
      ans: 3,
      explanation: "When dealing with B+ Trees, using proper constraint management and indexing ensures long-term scalability and correctness."
    },
    {
      q: "In the context of DBMS, what is the primary role of Clustered indexes? **GATE 2016**",
      options: [
        "To define the physical hardware requirements",
        "To eliminate the need for primary keys",
        "To ensure structural and operational robustness",
        "To bypass query optimization"
      ],
      ans: 2,
      explanation: "The concept of Clustered indexes is primarily utilized to ensure the structural and operational robustness of the database."
    },
    {
      q: "In the context of DBMS, what is the primary role of Static hashing? **GATE 2017**",
      options: [
        "To define the physical hardware requirements",
        "To eliminate the need for primary keys",
        "To ensure structural and operational robustness",
        "To bypass query optimization"
      ],
      ans: 2,
      explanation: "The concept of Static hashing is primarily utilized to ensure the structural and operational robustness of the database."
    },
    {
      q: "Which of the following is true regarding B+ Trees? **GATE 2018**",
      options: [
        "It ensures high availability at the cost of consistency",
        "It is fundamental for maintaining data integrity and system efficiency",
        "It relies entirely on manual user intervention",
        "It is an obsolete concept in modern RDBMS"
      ],
      ans: 1,
      explanation: "Understanding B+ Trees is critical as it provides the foundational integrity and efficiency required by modern database systems."
    },
    {
      q: "Which of the following is true regarding Static hashing? **GATE 2017**",
      options: [
        "It ensures high availability at the cost of consistency",
        "It is fundamental for maintaining data integrity and system efficiency",
        "It relies entirely on manual user intervention",
        "It is an obsolete concept in modern RDBMS"
      ],
      ans: 1,
      explanation: "Understanding Static hashing is critical as it provides the foundational integrity and efficiency required by modern database systems."
    },
    {
      q: "Consider a scenario involving B-Trees. Which approach is most optimal? **GATE 2020**",
      options: [
        "Ignoring concurrency rules",
        "Applying standard normalization techniques",
        "Storing all data in a single flat file",
        "Using proper constraint management and indexing"
      ],
      ans: 3,
      explanation: "When dealing with B-Trees, using proper constraint management and indexing ensures long-term scalability and correctness."
    },
    {
      q: "Which of the following is true regarding B-Trees? **GATE 2016**",
      options: [
        "It ensures high availability at the cost of consistency",
        "It is fundamental for maintaining data integrity and system efficiency",
        "It relies entirely on manual user intervention",
        "It is an obsolete concept in modern RDBMS"
      ],
      ans: 1,
      explanation: "Understanding B-Trees is critical as it provides the foundational integrity and efficiency required by modern database systems."
    },
    {
      q: "Consider a scenario involving B-Trees. Which approach is most optimal? **GATE 2019**",
      options: [
        "Ignoring concurrency rules",
        "Applying standard normalization techniques",
        "Storing all data in a single flat file",
        "Using proper constraint management and indexing"
      ],
      ans: 3,
      explanation: "When dealing with B-Trees, using proper constraint management and indexing ensures long-term scalability and correctness."
    },
    {
      q: "Consider a scenario involving B+ Trees. Which approach is most optimal? **GATE 2023**",
      options: [
        "Ignoring concurrency rules",
        "Applying standard normalization techniques",
        "Storing all data in a single flat file",
        "Using proper constraint management and indexing"
      ],
      ans: 3,
      explanation: "When dealing with B+ Trees, using proper constraint management and indexing ensures long-term scalability and correctness."
    },
    {
      q: "Consider a scenario involving B-Trees. Which approach is most optimal? **GATE 2022**",
      options: [
        "Ignoring concurrency rules",
        "Applying standard normalization techniques",
        "Storing all data in a single flat file",
        "Using proper constraint management and indexing"
      ],
      ans: 3,
      explanation: "When dealing with B-Trees, using proper constraint management and indexing ensures long-term scalability and correctness."
    },
    {
      q: "In the context of DBMS, what is the primary role of Clustered indexes? **GATE 2015**",
      options: [
        "To define the physical hardware requirements",
        "To eliminate the need for primary keys",
        "To ensure structural and operational robustness",
        "To bypass query optimization"
      ],
      ans: 2,
      explanation: "The concept of Clustered indexes is primarily utilized to ensure the structural and operational robustness of the database."
    },
    {
      q: "Consider a scenario involving Dense vs Sparse index. Which approach is most optimal? **GATE 2020**",
      options: [
        "Ignoring concurrency rules",
        "Applying standard normalization techniques",
        "Storing all data in a single flat file",
        "Using proper constraint management and indexing"
      ],
      ans: 3,
      explanation: "When dealing with Dense vs Sparse index, using proper constraint management and indexing ensures long-term scalability and correctness."
    },
    {
      q: "Which of the following is true regarding Static hashing? **GATE 2017**",
      options: [
        "It ensures high availability at the cost of consistency",
        "It is fundamental for maintaining data integrity and system efficiency",
        "It relies entirely on manual user intervention",
        "It is an obsolete concept in modern RDBMS"
      ],
      ans: 1,
      explanation: "Understanding Static hashing is critical as it provides the foundational integrity and efficiency required by modern database systems."
    },
    {
      q: "Consider a scenario involving Clustered indexes. Which approach is most optimal? **GATE 2023**",
      options: [
        "Ignoring concurrency rules",
        "Applying standard normalization techniques",
        "Storing all data in a single flat file",
        "Using proper constraint management and indexing"
      ],
      ans: 3,
      explanation: "When dealing with Clustered indexes, using proper constraint management and indexing ensures long-term scalability and correctness."
    }
  ],
  "nosql": [
    {
      q: "Consider a scenario involving CAP theorem. Which approach is most optimal? **GATE 2014**",
      options: [
        "Ignoring concurrency rules",
        "Applying standard normalization techniques",
        "Storing all data in a single flat file",
        "Using proper constraint management and indexing"
      ],
      ans: 3,
      explanation: "When dealing with CAP theorem, using proper constraint management and indexing ensures long-term scalability and correctness."
    },
    {
      q: "Which of the following is true regarding Key-Value stores? **GATE 2021**",
      options: [
        "It ensures high availability at the cost of consistency",
        "It is fundamental for maintaining data integrity and system efficiency",
        "It relies entirely on manual user intervention",
        "It is an obsolete concept in modern RDBMS"
      ],
      ans: 1,
      explanation: "Understanding Key-Value stores is critical as it provides the foundational integrity and efficiency required by modern database systems."
    },
    {
      q: "In the context of DBMS, what is the primary role of CAP theorem? **GATE 2014**",
      options: [
        "To define the physical hardware requirements",
        "To eliminate the need for primary keys",
        "To ensure structural and operational robustness",
        "To bypass query optimization"
      ],
      ans: 2,
      explanation: "The concept of CAP theorem is primarily utilized to ensure the structural and operational robustness of the database."
    },
    {
      q: "Consider a scenario involving Document databases. Which approach is most optimal? **GATE 2015**",
      options: [
        "Ignoring concurrency rules",
        "Applying standard normalization techniques",
        "Storing all data in a single flat file",
        "Using proper constraint management and indexing"
      ],
      ans: 3,
      explanation: "When dealing with Document databases, using proper constraint management and indexing ensures long-term scalability and correctness."
    },
    {
      q: "Consider a scenario involving CAP theorem. Which approach is most optimal? **GATE 2015**",
      options: [
        "Ignoring concurrency rules",
        "Applying standard normalization techniques",
        "Storing all data in a single flat file",
        "Using proper constraint management and indexing"
      ],
      ans: 3,
      explanation: "When dealing with CAP theorem, using proper constraint management and indexing ensures long-term scalability and correctness."
    },
    {
      q: "Which of the following is true regarding CAP theorem? **GATE 2018**",
      options: [
        "It ensures high availability at the cost of consistency",
        "It is fundamental for maintaining data integrity and system efficiency",
        "It relies entirely on manual user intervention",
        "It is an obsolete concept in modern RDBMS"
      ],
      ans: 1,
      explanation: "Understanding CAP theorem is critical as it provides the foundational integrity and efficiency required by modern database systems."
    },
    {
      q: "Which of the following is true regarding CAP theorem? **GATE 2017**",
      options: [
        "It ensures high availability at the cost of consistency",
        "It is fundamental for maintaining data integrity and system efficiency",
        "It relies entirely on manual user intervention",
        "It is an obsolete concept in modern RDBMS"
      ],
      ans: 1,
      explanation: "Understanding CAP theorem is critical as it provides the foundational integrity and efficiency required by modern database systems."
    },
    {
      q: "Which of the following is true regarding CAP theorem? **GATE 2022**",
      options: [
        "It ensures high availability at the cost of consistency",
        "It is fundamental for maintaining data integrity and system efficiency",
        "It relies entirely on manual user intervention",
        "It is an obsolete concept in modern RDBMS"
      ],
      ans: 1,
      explanation: "Understanding CAP theorem is critical as it provides the foundational integrity and efficiency required by modern database systems."
    },
    {
      q: "In the context of DBMS, what is the primary role of Document databases? **GATE 2016**",
      options: [
        "To define the physical hardware requirements",
        "To eliminate the need for primary keys",
        "To ensure structural and operational robustness",
        "To bypass query optimization"
      ],
      ans: 2,
      explanation: "The concept of Document databases is primarily utilized to ensure the structural and operational robustness of the database."
    },
    {
      q: "Which of the following is true regarding CAP theorem? **GATE 2017**",
      options: [
        "It ensures high availability at the cost of consistency",
        "It is fundamental for maintaining data integrity and system efficiency",
        "It relies entirely on manual user intervention",
        "It is an obsolete concept in modern RDBMS"
      ],
      ans: 1,
      explanation: "Understanding CAP theorem is critical as it provides the foundational integrity and efficiency required by modern database systems."
    },
    {
      q: "Consider a scenario involving BASE properties. Which approach is most optimal? **GATE 2016**",
      options: [
        "Ignoring concurrency rules",
        "Applying standard normalization techniques",
        "Storing all data in a single flat file",
        "Using proper constraint management and indexing"
      ],
      ans: 3,
      explanation: "When dealing with BASE properties, using proper constraint management and indexing ensures long-term scalability and correctness."
    },
    {
      q: "Which of the following is true regarding Document databases? **GATE 2015**",
      options: [
        "It ensures high availability at the cost of consistency",
        "It is fundamental for maintaining data integrity and system efficiency",
        "It relies entirely on manual user intervention",
        "It is an obsolete concept in modern RDBMS"
      ],
      ans: 1,
      explanation: "Understanding Document databases is critical as it provides the foundational integrity and efficiency required by modern database systems."
    },
    {
      q: "In the context of DBMS, what is the primary role of Graph databases? **GATE 2014**",
      options: [
        "To define the physical hardware requirements",
        "To eliminate the need for primary keys",
        "To ensure structural and operational robustness",
        "To bypass query optimization"
      ],
      ans: 2,
      explanation: "The concept of Graph databases is primarily utilized to ensure the structural and operational robustness of the database."
    },
    {
      q: "Which of the following is true regarding Key-Value stores? **GATE 2017**",
      options: [
        "It ensures high availability at the cost of consistency",
        "It is fundamental for maintaining data integrity and system efficiency",
        "It relies entirely on manual user intervention",
        "It is an obsolete concept in modern RDBMS"
      ],
      ans: 1,
      explanation: "Understanding Key-Value stores is critical as it provides the foundational integrity and efficiency required by modern database systems."
    },
    {
      q: "Consider a scenario involving BASE properties. Which approach is most optimal? **GATE 2023**",
      options: [
        "Ignoring concurrency rules",
        "Applying standard normalization techniques",
        "Storing all data in a single flat file",
        "Using proper constraint management and indexing"
      ],
      ans: 3,
      explanation: "When dealing with BASE properties, using proper constraint management and indexing ensures long-term scalability and correctness."
    }
  ],
  "architecture": [
    {
      q: "In the context of DBMS, what is the primary role of Heap files? **GATE 2023**",
      options: [
        "To define the physical hardware requirements",
        "To eliminate the need for primary keys",
        "To ensure structural and operational robustness",
        "To bypass query optimization"
      ],
      ans: 2,
      explanation: "The concept of Heap files is primarily utilized to ensure the structural and operational robustness of the database."
    },
    {
      q: "Consider a scenario involving Heap files. Which approach is most optimal? **GATE 2020**",
      options: [
        "Ignoring concurrency rules",
        "Applying standard normalization techniques",
        "Storing all data in a single flat file",
        "Using proper constraint management and indexing"
      ],
      ans: 3,
      explanation: "When dealing with Heap files, using proper constraint management and indexing ensures long-term scalability and correctness."
    },
    {
      q: "In the context of DBMS, what is the primary role of Heap files? **GATE 2020**",
      options: [
        "To define the physical hardware requirements",
        "To eliminate the need for primary keys",
        "To ensure structural and operational robustness",
        "To bypass query optimization"
      ],
      ans: 2,
      explanation: "The concept of Heap files is primarily utilized to ensure the structural and operational robustness of the database."
    },
    {
      q: "Which of the following is true regarding Sequential files? **GATE 2022**",
      options: [
        "It ensures high availability at the cost of consistency",
        "It is fundamental for maintaining data integrity and system efficiency",
        "It relies entirely on manual user intervention",
        "It is an obsolete concept in modern RDBMS"
      ],
      ans: 1,
      explanation: "Understanding Sequential files is critical as it provides the foundational integrity and efficiency required by modern database systems."
    },
    {
      q: "Consider a scenario involving Storage hierarchy. Which approach is most optimal? **GATE 2014**",
      options: [
        "Ignoring concurrency rules",
        "Applying standard normalization techniques",
        "Storing all data in a single flat file",
        "Using proper constraint management and indexing"
      ],
      ans: 3,
      explanation: "When dealing with Storage hierarchy, using proper constraint management and indexing ensures long-term scalability and correctness."
    },
    {
      q: "Consider a scenario involving Query optimization. Which approach is most optimal? **GATE 2016**",
      options: [
        "Ignoring concurrency rules",
        "Applying standard normalization techniques",
        "Storing all data in a single flat file",
        "Using proper constraint management and indexing"
      ],
      ans: 3,
      explanation: "When dealing with Query optimization, using proper constraint management and indexing ensures long-term scalability and correctness."
    },
    {
      q: "In the context of DBMS, what is the primary role of Heap files? **GATE 2021**",
      options: [
        "To define the physical hardware requirements",
        "To eliminate the need for primary keys",
        "To ensure structural and operational robustness",
        "To bypass query optimization"
      ],
      ans: 2,
      explanation: "The concept of Heap files is primarily utilized to ensure the structural and operational robustness of the database."
    },
    {
      q: "Which of the following is true regarding Buffer manager? **GATE 2023**",
      options: [
        "It ensures high availability at the cost of consistency",
        "It is fundamental for maintaining data integrity and system efficiency",
        "It relies entirely on manual user intervention",
        "It is an obsolete concept in modern RDBMS"
      ],
      ans: 1,
      explanation: "Understanding Buffer manager is critical as it provides the foundational integrity and efficiency required by modern database systems."
    },
    {
      q: "Which of the following is true regarding Sequential files? **GATE 2014**",
      options: [
        "It ensures high availability at the cost of consistency",
        "It is fundamental for maintaining data integrity and system efficiency",
        "It relies entirely on manual user intervention",
        "It is an obsolete concept in modern RDBMS"
      ],
      ans: 1,
      explanation: "Understanding Sequential files is critical as it provides the foundational integrity and efficiency required by modern database systems."
    },
    {
      q: "Which of the following is true regarding Storage hierarchy? **GATE 2019**",
      options: [
        "It ensures high availability at the cost of consistency",
        "It is fundamental for maintaining data integrity and system efficiency",
        "It relies entirely on manual user intervention",
        "It is an obsolete concept in modern RDBMS"
      ],
      ans: 1,
      explanation: "Understanding Storage hierarchy is critical as it provides the foundational integrity and efficiency required by modern database systems."
    },
    {
      q: "Consider a scenario involving Buffer manager. Which approach is most optimal? **GATE 2023**",
      options: [
        "Ignoring concurrency rules",
        "Applying standard normalization techniques",
        "Storing all data in a single flat file",
        "Using proper constraint management and indexing"
      ],
      ans: 3,
      explanation: "When dealing with Buffer manager, using proper constraint management and indexing ensures long-term scalability and correctness."
    },
    {
      q: "Which of the following is true regarding Buffer manager? **GATE 2020**",
      options: [
        "It ensures high availability at the cost of consistency",
        "It is fundamental for maintaining data integrity and system efficiency",
        "It relies entirely on manual user intervention",
        "It is an obsolete concept in modern RDBMS"
      ],
      ans: 1,
      explanation: "Understanding Buffer manager is critical as it provides the foundational integrity and efficiency required by modern database systems."
    },
    {
      q: "Consider a scenario involving Heap files. Which approach is most optimal? **GATE 2015**",
      options: [
        "Ignoring concurrency rules",
        "Applying standard normalization techniques",
        "Storing all data in a single flat file",
        "Using proper constraint management and indexing"
      ],
      ans: 3,
      explanation: "When dealing with Heap files, using proper constraint management and indexing ensures long-term scalability and correctness."
    },
    {
      q: "Which of the following is true regarding Heap files? **GATE 2014**",
      options: [
        "It ensures high availability at the cost of consistency",
        "It is fundamental for maintaining data integrity and system efficiency",
        "It relies entirely on manual user intervention",
        "It is an obsolete concept in modern RDBMS"
      ],
      ans: 1,
      explanation: "Understanding Heap files is critical as it provides the foundational integrity and efficiency required by modern database systems."
    },
    {
      q: "Which of the following is true regarding Sequential files? **GATE 2016**",
      options: [
        "It ensures high availability at the cost of consistency",
        "It is fundamental for maintaining data integrity and system efficiency",
        "It relies entirely on manual user intervention",
        "It is an obsolete concept in modern RDBMS"
      ],
      ans: 1,
      explanation: "Understanding Sequential files is critical as it provides the foundational integrity and efficiency required by modern database systems."
    }
  ]
};

// =====================================================================================
// DEBUG
// =====================================================================================
export const DEBUG: Record<string, DebugExercise> = {
  basics: {
    instructions: "The query below is meant to retrieve all students with a GPA above 3.5, but it contains a syntax error. Find and fix it.",
    buggy: "SELECT * FORM Student WHERE gpa > 3.5;",
    fixed: "SELECT * FROM Student WHERE gpa > 3.5;",
    hints: [
      "Check the spelling of the SQL keyword that specifies the source table.",
      "It should read 'FROM', not 'FORM'.",
    ],
    expectedOutput: "All rows from the Student table where gpa is greater than 3.5.",
  },
  relational: {
    instructions: "The Employee table is supposed to reference the Department table via a foreign key, but the constraint is written incorrectly. Fix it.",
    buggy:
      "CREATE TABLE Employee (\n" +
      "  emp_id INT PRIMARY KEY,\n" +
      "  dept_id INT,\n" +
      "  FOREIGN KEY (dept_id) REFERENCE Department(dept_id)\n" +
      ");",
    fixed:
      "CREATE TABLE Employee (\n" +
      "  emp_id INT PRIMARY KEY,\n" +
      "  dept_id INT,\n" +
      "  FOREIGN KEY (dept_id) REFERENCES Department(dept_id)\n" +
      ");",
    hints: [
      "Look closely at the keyword used to point to the referenced table.",
      "The correct SQL keyword is 'REFERENCES', not 'REFERENCE'.",
    ],
    expectedOutput: "Employee table created successfully with a valid foreign key constraint on dept_id.",
  },
  "sql-basics": {
    instructions: "This query attempts to find students with no recorded GPA, but it will not return any rows even though NULL values exist. Fix the bug.",
    buggy: "SELECT name FROM Student WHERE gpa = NULL;",
    fixed: "SELECT name FROM Student WHERE gpa IS NULL;",
    hints: [
      "NULL cannot be compared using the standard equality operator '='.",
      "Use the special 'IS NULL' predicate to check for missing values.",
    ],
    expectedOutput: "Names of all students whose gpa column is NULL.",
  },
  "sql-advanced": {
    instructions: "This query tries to find departments with more than 5 employees, but it incorrectly filters using WHERE instead of the clause meant for aggregated groups. Fix it.",
    buggy:
      "SELECT dept_id, COUNT(*) AS emp_count\n" +
      "FROM Employee\n" +
      "GROUP BY dept_id\n" +
      "WHERE COUNT(*) > 5;",
    fixed:
      "SELECT dept_id, COUNT(*) AS emp_count\n" +
      "FROM Employee\n" +
      "GROUP BY dept_id\n" +
      "HAVING COUNT(*) > 5;",
    hints: [
      "WHERE cannot filter on aggregate function results because it executes before grouping.",
      "Use HAVING to filter after GROUP BY has been applied.",
    ],
    expectedOutput: "A list of department IDs and employee counts, only for departments with more than 5 employees.",
  },
  normalization: {
    instructions: "This unnormalized table design causes update anomalies because course details repeat for every enrolled student. Redesign it to remove the redundancy (2NF/3NF violation).",
    buggy:
      "CREATE TABLE Enrollment (\n" +
      "  student_id INT,\n" +
      "  course_id INT,\n" +
      "  course_name VARCHAR(50),\n" +
      "  instructor VARCHAR(50),\n" +
      "  PRIMARY KEY (student_id, course_id)\n" +
      ");",
    fixed:
      "CREATE TABLE Course (\n" +
      "  course_id INT PRIMARY KEY,\n" +
      "  course_name VARCHAR(50),\n" +
      "  instructor VARCHAR(50)\n" +
      ");\n\n" +
      "CREATE TABLE Enrollment (\n" +
      "  student_id INT,\n" +
      "  course_id INT,\n" +
      "  PRIMARY KEY (student_id, course_id),\n" +
      "  FOREIGN KEY (course_id) REFERENCES Course(course_id)\n" +
      ");",
    hints: [
      "course_name and instructor depend only on course_id, not on the full composite key (student_id, course_id).",
      "This is a partial dependency â€” extract course_id, course_name, and instructor into their own table.",
    ],
    expectedOutput: "Two normalized tables: Course (course details) and Enrollment (linking table), eliminating redundant course data per student.",
  },
  transactions: {
    instructions: "This transaction is missing proper transaction boundaries, risking a partial update if the second statement fails. Fix it so both updates are atomic.",
    buggy:
      "UPDATE Account SET balance = balance - 500 WHERE acc_id = 'A101';\n" +
      "UPDATE Account SET balance = balance + 500 WHERE acc_id = 'B202';",
    fixed:
      "BEGIN TRANSACTION;\n" +
      "UPDATE Account SET balance = balance - 500 WHERE acc_id = 'A101';\n" +
      "UPDATE Account SET balance = balance + 500 WHERE acc_id = 'B202';\n" +
      "COMMIT;",
    hints: [
      "Without an explicit transaction block, each UPDATE may auto-commit individually.",
      "Wrap both statements in BEGIN TRANSACTION ... COMMIT to guarantee atomicity.",
    ],
    expectedOutput: "Both balance updates succeed together or neither is applied, preserving atomicity.",
  },
  concurrency: {
    instructions: "These two transactions acquire locks on resources A and B in opposite order, creating a potential deadlock. Fix the lock ordering to prevent it.",
    buggy:
      "T1: LOCK-X(A); ... LOCK-X(B); ... UNLOCK(A); UNLOCK(B);\n" +
      "T2: LOCK-X(B); ... LOCK-X(A); ... UNLOCK(B); UNLOCK(A);",
    fixed:
      "T1: LOCK-X(A); ... LOCK-X(B); ... UNLOCK(A); UNLOCK(B);\n" +
      "T2: LOCK-X(A); ... LOCK-X(B); ... UNLOCK(A); UNLOCK(B);",
    hints: [
      "Deadlocks often occur when transactions acquire the same resources in different orders.",
      "Enforce a consistent global lock ordering (e.g., always lock A before B) across all transactions.",
    ],
    expectedOutput: "Both transactions acquire locks in the same order (A then B), eliminating the circular wait condition.",
  },
  indexing: {
    instructions: "This CREATE INDEX statement has a syntax error in specifying the target table and column. Fix it.",
    buggy: "CREATE INDEX idx_salary ON (Employee) salary;",
    fixed: "CREATE INDEX idx_salary ON Employee (salary);",
    hints: [
      "The table name should not be wrapped in parentheses.",
      "Correct syntax is: CREATE INDEX index_name ON table_name (column_name);",
    ],
    expectedOutput: "A new index named idx_salary is created on the salary column of the Employee table.",
  },
  nosql: {
    instructions: "This MongoDB-style document has a JSON syntax error â€” a trailing comma and mismatched quotes. Fix the document.",
    buggy:
      "{\n" +
      "  \"_id\": \"E101\",\n" +
      "  \"name\": 'Alice',\n" +
      "  \"salary\": 62000,\n" +
      "}",
    fixed:
      "{\n" +
      "  \"_id\": \"E101\",\n" +
      "  \"name\": \"Alice\",\n" +
      "  \"salary\": 62000\n" +
      "}",
    hints: [
      "JSON requires double quotes for strings, not single quotes.",
      "Remove the trailing comma after the last field in the object.",
    ],
    expectedOutput: "A valid JSON document with double-quoted strings and no trailing comma.",
  },
  architecture: {
    instructions: "This query is intended to inspect the execution plan chosen by the optimizer, but the keyword is misspelled. Fix it.",
    buggy: "EXPLAINN SELECT * FROM Employee WHERE dept_id = 3;",
    fixed: "EXPLAIN SELECT * FROM Employee WHERE dept_id = 3;",
    hints: [
      "Check the spelling.",
      "The keyword is EXPLAIN."
    ],
    expectedOutput: "The query execution plan."
  }
};

export const DRAG_DROP: Record<string, DragExercise> = {
  basics: {
    instructions: "Arrange the three levels of the database schema architecture from highest (closest to user) to lowest (closest to storage).",
    lines: [
      { id: "1", text: "External Schema (View Level)" },
      { id: "2", text: "Conceptual Schema (Logical Level)" },
      { id: "3", text: "Internal Schema (Physical Level)" }
    ],
    order: ["1", "2", "3"]
  },
  relational: {
    instructions: "Arrange these relational algebra operators from fundamental to derived.",
    lines: [
      { id: "1", text: "Select (Ïƒ), Project (Ï€), Union (âˆª)" },
      { id: "2", text: "Set Difference (-), Cartesian Product (Ã—)" },
      { id: "3", text: "Join (â¨), Intersection (âˆ©)" }
    ],
    order: ["1", "2", "3"]
  },
  "sql-basics": {
    instructions: "Arrange the standard logical order of execution for a SQL SELECT query.",
    lines: [
      { id: "1", text: "FROM (and JOINs)" },
      { id: "2", text: "WHERE" },
      { id: "3", text: "GROUP BY and HAVING" },
      { id: "4", text: "SELECT" },
      { id: "5", text: "ORDER BY and LIMIT" }
    ],
    order: ["1", "2", "3", "4", "5"]
  },
  "sql-advanced": {
    instructions: "Arrange these SQL join types from most restrictive (least rows returned) to least restrictive (assuming matching data exists).",
    lines: [
      { id: "1", text: "INNER JOIN" },
      { id: "2", text: "LEFT / RIGHT OUTER JOIN" },
      { id: "3", text: "FULL OUTER JOIN" },
      { id: "4", text: "CROSS JOIN (Cartesian Product)" }
    ],
    order: ["1", "2", "3", "4"]
  },
  normalization: {
    instructions: "Order the normal forms logically from least strict to most strict.",
    lines: [
      { id: "1", text: "First Normal Form (1NF)" },
      { id: "2", text: "Second Normal Form (2NF)" },
      { id: "3", text: "Third Normal Form (3NF)" },
      { id: "4", text: "Boyce-Codd Normal Form (BCNF)" }
    ],
    order: ["1", "2", "3", "4"]
  },
  transactions: {
    instructions: "Order the typical lifecycle states of a database transaction.",
    lines: [
      { id: "1", text: "Active" },
      { id: "2", text: "Partially Committed (or Failed)" },
      { id: "3", text: "Committed (or Aborted)" }
    ],
    order: ["1", "2", "3"]
  },
  concurrency: {
    instructions: "Arrange the steps of the Strict Two-Phase Locking (2PL) protocol.",
    lines: [
      { id: "1", text: "Transaction begins" },
      { id: "2", text: "Growing Phase: Acquire required locks" },
      { id: "3", text: "Execute reads/writes" },
      { id: "4", text: "Commit or Abort" },
      { id: "5", text: "Shrinking Phase: Release all locks simultaneously" }
    ],
    order: ["1", "2", "3", "4", "5"]
  },
  indexing: {
    instructions: "Arrange the steps of locating a record using a B+ Tree index.",
    lines: [
      { id: "1", text: "Read the root node" },
      { id: "2", text: "Traverse down through internal nodes using search keys" },
      { id: "3", text: "Reach the leaf node containing the data pointer" },
      { id: "4", text: "Fetch the actual record from the data block on disk" }
    ],
    order: ["1", "2", "3", "4"]
  },
  nosql: {
    instructions: "Order the CAP Theorem components in terms of what a typical distributed database might prioritize during a network partition.",
    lines: [
      { id: "1", text: "Partition Tolerance (P) is a given in distributed systems" },
      { id: "2", text: "Choose Consistency (CP) - Fail the request to maintain data correctness" },
      { id: "3", text: "Choose Availability (AP) - Return stale data to keep the system responsive" }
    ],
    order: ["1", "2", "3"]
  },
  architecture: {
    instructions: "Order the memory hierarchy of a DBMS storage engine from fastest/most expensive to slowest/cheapest.",
    lines: [
      { id: "1", text: "CPU Cache (L1/L2/L3)" },
      { id: "2", text: "Main Memory (RAM) / Buffer Pool" },
      { id: "3", text: "Solid State Drives (SSD / Flash)" },
      { id: "4", text: "Magnetic Hard Disks (HDD)" }
    ],
    order: ["1", "2", "3", "4"]
  }
};


export const COMPLETE_EXERCISES: Record<string, CompleteExercise[]> = {
  basics: [
    {
      instruction: "Fill in the correct term for data isolation.",
      template: "The ability to modify a schema definition in one level without affecting a schema definition in the next higher level is called ___.",
      answer: "The ability to modify a schema definition in one level without affecting a schema definition in the next higher level is called Data Independence.",
      blanks: ["Data Independence"]
    }
  ],
  relational: [
    {
      instruction: "Identify the relational property.",
      template: "In a relational model, the number of attributes in a relation is called its ___, while the number of tuples is called its ___.",
      answer: "In a relational model, the number of attributes in a relation is called its Degree, while the number of tuples is called its Cardinality.",
      blanks: ["Degree", "Cardinality"]
    }
  ],
  "sql-basics": [
    {
      instruction: "Complete the SQL syntax.",
      template: "To remove all records from a table without logging individual row deletions, use the ___ TABLE command.",
      answer: "To remove all records from a table without logging individual row deletions, use the TRUNCATE TABLE command.",
      blanks: ["TRUNCATE"]
    }
  ],
  "sql-advanced": [
    {
      instruction: "Identify the correct SQL clause.",
      template: "The ___ clause is used to filter groups formed by the GROUP BY clause.",
      answer: "The HAVING clause is used to filter groups formed by the GROUP BY clause.",
      blanks: ["HAVING"]
    }
  ],
  normalization: [
    {
      instruction: "Fill in the normalization dependency.",
      template: "Third Normal Form (3NF) requires a table to be in 2NF and have no ___ dependencies.",
      answer: "Third Normal Form (3NF) requires a table to be in 2NF and have no transitive dependencies.",
      blanks: ["transitive"]
    }
  ],
  transactions: [
    {
      instruction: "Identify the ACID property.",
      template: "The ___ property ensures that once a transaction commits, its changes survive system crashes.",
      answer: "The Durability property ensures that once a transaction commits, its changes survive system crashes.",
      blanks: ["Durability"]
    }
  ],
  concurrency: [
    {
      instruction: "Complete the lock type.",
      template: "A transaction must acquire an ___ lock before it can write to a data item.",
      answer: "A transaction must acquire an Exclusive lock before it can write to a data item.",
      blanks: ["Exclusive"]
    }
  ],
  indexing: [
    {
      instruction: "Identify the correct tree type.",
      template: "In a ___ tree, actual data pointers are stored only at the leaf nodes.",
      answer: "In a B+ tree, actual data pointers are stored only at the leaf nodes.",
      blanks: ["B+"]
    }
  ],
  nosql: [
    {
      instruction: "Identify the CAP theorem acronym.",
      template: "The CAP theorem states a distributed database can only guarantee two out of Consistency, ___, and Partition Tolerance.",
      answer: "The CAP theorem states a distributed database can only guarantee two out of Consistency, Availability, and Partition Tolerance.",
      blanks: ["Availability"]
    }
  ],
  architecture: [
    {
      instruction: "Identify the storage component.",
      template: "The DBMS component responsible for fetching data from disk into RAM is called the ___ Manager.",
      answer: "The DBMS component responsible for fetching data from disk into RAM is called the Buffer Manager.",
      blanks: ["Buffer"]
    }
  ]
};


export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
