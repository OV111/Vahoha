LAYER: db-engineer-1

```json
[
  {
    "stem": "In a relational database, what does a single row in a table represent?",
    "topic": "Relational model — tables, rows, columns",
    "choices": [
      "One record of the entity the table describes",
      "One attribute that every record in the table has a value for",
      "One index entry that points at data stored somewhere else",
      "One relationship between two separate tables in the schema"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does a column in a relational table define?",
    "topic": "Relational model — tables, rows, columns",
    "choices": [
      "A single stored record together with all of its related child records",
      "A saved query result that is refreshed each time the table is read",
      "A named attribute with a data type that every row holds a value for",
      "A link that connects the table to the primary key of another table"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does NULL mean in a relational database?",
    "topic": "Relational model — tables, rows, columns",
    "choices": [
      "The value is the number zero, which every numeric column treats as empty",
      "The value is missing or unknown, not zero or empty text",
      "The value is an empty string, the standard placeholder for a missing entry",
      "The row was deleted and is waiting for the engine's cleanup process"
    ],
    "answerIdx": 1
  },
  {
    "stem": "By the relational model, what order are the rows of a table returned in when the query has no ORDER BY?",
    "topic": "Relational model — tables, rows, columns",
    "choices": [
      "No guaranteed order unless ORDER BY is used",
      "Insertion order, since rows are appended to the table file",
      "Ascending order of the primary key, because the key is clustered",
      "Order of the latest update, with the newest row first"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why do relational designs keep customers and orders in separate tables instead of one wide table?",
    "topic": "Relational model — tables, rows, columns",
    "choices": [
      "So each order row stays small enough that constraint checks can be skipped",
      "So that one table never has to hold more than a single primary key",
      "So customer details are stored once, not repeated on every order",
      "So joins run faster than any single-table query could ever run"
    ],
    "answerIdx": 2
  },
  {
    "stem": "In relational algebra, what does projection do?",
    "topic": "Relational model — tables, rows, columns",
    "choices": [
      "Chooses the rows that satisfy a condition",
      "Combines rows from two relations on matching values",
      "Chooses specific columns from a relation",
      "Renames the relation so it can be reused in a query"
    ],
    "answerIdx": 2
  },
  {
    "stem": "In relational algebra, what does selection do?",
    "topic": "Relational model — tables, rows, columns",
    "choices": [
      "Keeps only the named columns of the relation",
      "Merges two relations that have the same columns",
      "Keeps only the rows that satisfy a condition",
      "Sorts the relation by the chosen columns"
    ],
    "answerIdx": 2
  },
  {
    "stem": "In practical terms, what is a relation in the relational model?",
    "topic": "Relational model — tables, rows, columns",
    "choices": [
      "A foreign key constraint that links one table to another table",
      "A join result that the database stores permanently on disk",
      "A view that spans several databases at the same time",
      "A table: a set of rows sharing the same columns"
    ],
    "answerIdx": 3
  },
  {
    "stem": "A table has no key and no unique constraint, and you insert two rows with identical values in every column. What happens in most SQL databases?",
    "topic": "Relational model — tables, rows, columns",
    "choices": [
      "The second insert is rejected, since the relational model forbids duplicate rows",
      "The two rows are silently merged into one row by the storage engine",
      "Both are stored, since tables allow duplicate rows unless a key forbids them",
      "The second row is stored only when the table is marked as temporary"
    ],
    "answerIdx": 2
  },
  {
    "stem": "You run ALTER TABLE users ADD COLUMN nickname TEXT on a table that already holds rows. What do the existing rows get for the new column?",
    "topic": "Relational model — tables, rows, columns",
    "choices": [
      "They are deleted so the table can be rebuilt with the new shape",
      "Nothing; only rows inserted afterwards have the column",
      "NULL, or the column's DEFAULT value if one was declared",
      "An empty string, regardless of how the column was declared"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why is NUMERIC or DECIMAL usually preferred to FLOAT for storing prices?",
    "topic": "Data types & schemas",
    "choices": [
      "It can represent fractions, which floating point types cannot represent",
      "It stores exact decimal values, avoiding binary rounding errors",
      "It always takes up less disk space than any floating point column",
      "It is the only numeric type that SUM and AVG can operate on"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the schema of a database describe?",
    "topic": "Data types & schemas",
    "choices": [
      "The rows that are currently stored in each table",
      "The backup copies that have been taken of the database",
      "The list of users who are connected right now",
      "Tables, columns, data types and constraints"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does a column's data type enforce?",
    "topic": "Data types & schemas",
    "choices": [
      "The physical order in which its rows are written to disk files",
      "Which kinds of values it may hold; others are rejected or converted",
      "The largest number of rows that the table may be allowed to hold",
      "Which database users are permitted to read values from the column"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why store a date in a DATE or TIMESTAMP column rather than as text like '03/04/2025'?",
    "topic": "Data types & schemas",
    "choices": [
      "The database can validate, sort and calculate with real dates",
      "Text columns cannot hold the slash character that dates use",
      "Date columns always take up less disk space than text columns",
      "Text columns cannot be compared inside a WHERE clause at all"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which column type best fits a flag that says whether a user account is active?",
    "topic": "Data types & schemas",
    "choices": [
      "TEXT holding the words yes and no",
      "FLOAT holding 0.0 or 1.0",
      "BOOLEAN",
      "TIMESTAMP holding the last login time"
    ],
    "answerIdx": 2
  },
  {
    "stem": "In a strictly typed engine such as PostgreSQL, what happens if you insert the text 'abc' into an INTEGER column?",
    "topic": "Data types & schemas",
    "choices": [
      "The value is stored as 0",
      "The value is stored as NULL",
      "The insert fails with an error",
      "The value is stored as text and converted on read"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why might you choose BIGINT over INTEGER for the primary key of a table that will grow to billions of rows?",
    "topic": "Data types & schemas",
    "choices": [
      "BIGINT keys always sort faster than INTEGER keys in an index",
      "INTEGER columns cannot be given auto-increment behavior",
      "INTEGER columns are not allowed to serve as a primary key",
      "A 32-bit integer runs out at about 2.1 billion values"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does a DEFAULT value in a column definition do?",
    "topic": "Data types & schemas",
    "choices": [
      "It replaces NULL with that value in the output of every SELECT",
      "It sets the smallest value that the column will accept",
      "It copies the value from the previously inserted row in the table",
      "It supplies a value when an INSERT omits the column"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Changing a column from TEXT to INTEGER on a table with millions of rows can be expensive because:",
    "topic": "Data types & schemas",
    "choices": [
      "The change must be applied to all other tables in the database",
      "The database may have to validate and rewrite every existing row",
      "The server has to be restarted for type changes to apply",
      "Existing rows are dropped and need to be reloaded from backup"
    ],
    "answerIdx": 1
  },
  {
    "stem": "In PostgreSQL, what is a schema?",
    "topic": "Data types & schemas",
    "choices": [
      "A separate server process that serves exactly one database",
      "A special kind of index kept for the system catalog tables",
      "A file that holds a backup copy of one single table",
      "A namespace inside a database that groups objects"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does a primary key guarantee?",
    "topic": "Primary & foreign keys",
    "choices": [
      "Rows are stored on disk sorted by the value of the key column",
      "The key column is encrypted so its values cannot be read back",
      "A row that has a primary key can never be updated or deleted",
      "Each row is uniquely identifiable and the key is never NULL"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does a foreign key constraint do?",
    "topic": "Primary & foreign keys",
    "choices": [
      "The referenced row's data is copied into the child table automatically",
      "Lookups on the child table become faster even without an index",
      "The referenced table is prevented from holding any other rows",
      "The value must match a key in the referenced table, or be NULL"
    ],
    "answerIdx": 3
  },
  {
    "stem": "orders.customer_id references customers.id. You insert an order with customer_id 999, but no such customer exists. What happens?",
    "topic": "Primary & foreign keys",
    "choices": [
      "The order is stored and customer_id is changed to NULL",
      "The order is stored and a blank customer row is created",
      "The insert is rejected with a foreign key violation",
      "The order is stored but marked as invalid"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How many primary keys can one table have?",
    "topic": "Primary & foreign keys",
    "choices": [
      "One, though it can span several columns",
      "As many as the table has columns",
      "One per index that exists on the table",
      "Two: a clustered key and a non-clustered key"
    ],
    "answerIdx": 0
  },
  {
    "stem": "A table enrollments has the composite primary key (student_id, course_id). What does this guarantee?",
    "topic": "Primary & foreign keys",
    "choices": [
      "Each student_id can appear only once in the whole table",
      "Each pair of student and course appears at most once",
      "Each course_id can appear only once in the whole table",
      "The student_id and course_id values must always be equal"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Can a foreign key column hold NULL?",
    "topic": "Primary & foreign keys",
    "choices": [
      "No, every foreign key column must hold a value that exists",
      "Only when the referenced primary key also holds a NULL",
      "Yes, unless declared NOT NULL; NULL means no related row",
      "Only in MySQL, where the standard rules are relaxed a bit"
    ],
    "answerIdx": 2
  },
  {
    "stem": "A foreign key must point at columns that are:",
    "topic": "Primary & foreign keys",
    "choices": [
      "A primary key or a column with a unique constraint",
      "Any column in the parent table with a matching type",
      "Only a column that is named id in the parent table",
      "Only a column that is covered by a hash index"
    ],
    "answerIdx": 0
  },
  {
    "stem": "In a one-to-many relationship between authors and books, where does the foreign key go?",
    "topic": "Primary & foreign keys",
    "choices": [
      "In authors, as a book_id column",
      "In books, as an author_id column",
      "In both tables, each pointing at the other",
      "In a third table that every one-to-many relation needs"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you model a many-to-many relationship between students and courses?",
    "topic": "Primary & foreign keys",
    "choices": [
      "With a column on students that lists course ids separated by commas",
      "With a junction table that has foreign keys to both",
      "With a foreign key on courses that points at a single student",
      "With a composite primary key on the students table"
    ],
    "answerIdx": 1
  },
  {
    "stem": "A customer row is referenced by orders, and the foreign key uses the default behavior with no cascade. What happens when you DELETE that customer?",
    "topic": "Primary & foreign keys",
    "choices": [
      "The customer's orders are deleted along with it",
      "The orders stay and their customer_id is set to NULL",
      "The delete is rejected while orders still reference it",
      "The customer is deleted and the orders keep a dangling id"
    ],
    "answerIdx": 2
  },
  {
    "stem": "A transfer debits account A and then credits account B. If the credit fails, the debit must be undone. Which ACID property is this?",
    "topic": "ACID properties",
    "choices": [
      "Consistency",
      "Isolation",
      "Durability",
      "Atomicity"
    ],
    "answerIdx": 3
  },
  {
    "stem": "The server loses power right after COMMIT returns. After restart the committed data is still there. Which ACID property is this?",
    "topic": "ACID properties",
    "choices": [
      "Atomicity",
      "Isolation",
      "Consistency",
      "Durability"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Two concurrent transactions should not see each other's half-finished changes. Which ACID property covers this?",
    "topic": "ACID properties",
    "choices": [
      "Isolation",
      "Durability",
      "Atomicity",
      "Consistency"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does consistency mean in ACID?",
    "topic": "ACID properties",
    "choices": [
      "Every replica of the database holds the same data at the same instant",
      "A transaction moves the database from one valid state to another",
      "Every read is guaranteed to return the most recent write",
      "Transactions run strictly one at a time in the order they began"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does ROLLBACK do?",
    "topic": "ACID properties",
    "choices": [
      "Undoes the last transaction that was committed",
      "Restores the database from the most recent backup",
      "Undoes all changes made in the current transaction",
      "Undoes only the most recent statement in the transaction"
    ],
    "answerIdx": 2
  },
  {
    "stem": "A transaction runs three UPDATE statements and the second one raises an error. If the transaction is rolled back, which updates take effect?",
    "topic": "ACID properties",
    "choices": [
      "None of them",
      "Only the first",
      "Only the first and the third",
      "Only the second"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which mechanism do most relational engines use to provide durability?",
    "topic": "ACID properties",
    "choices": [
      "A write-ahead log flushed to disk before the commit returns",
      "Keeping the whole database cached in RAM and flushing it nightly",
      "A nightly backup that is replayed against the data after a crash",
      "Locking every table for the whole time that a write is running"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is auto-commit mode?",
    "topic": "ACID properties",
    "choices": [
      "All statements in a session are grouped into one large transaction",
      "Each statement is its own transaction, committed at once",
      "A transaction stays open until the connection is closed",
      "ACID guarantees are switched off for the whole session"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why do you group related statements into one transaction?",
    "topic": "ACID properties",
    "choices": [
      "So they all succeed or all fail together",
      "So they can run in parallel on separate CPU cores",
      "So that locks are never needed",
      "So that the data is backed up automatically"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why do databases offer several isolation levels?",
    "topic": "ACID properties",
    "choices": [
      "Each level provides a different degree of durability",
      "Lower levels give atomicity only and skip the other properties",
      "Stricter isolation prevents more anomalies but reduces concurrency",
      "Higher levels bypass the write-ahead log for speed"
    ],
    "answerIdx": 2
  },
  {
    "stem": "In a client/server database, where does the database engine run?",
    "topic": "Client/server architecture",
    "choices": [
      "In a server process that clients reach over the network",
      "Inside each client application's own process, as a library",
      "Inside the web browser of the person using the application",
      "Inside the operating system kernel as a built-in service"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a connection string?",
    "topic": "Client/server architecture",
    "choices": [
      "A SQL query that joins two tables on a shared key column",
      "Text with the host, port, database name and credentials",
      "An encrypted copy of the data that is sent to the client",
      "The ordered list of statements that make up a transaction"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a database driver?",
    "topic": "Client/server architecture",
    "choices": [
      "A library that speaks the database's wire protocol for the app",
      "A stored procedure that handles user logins on the server",
      "A special kind of index that is used on very large tables",
      "A hardware controller that manages the disks of the server"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why do applications use a connection pool?",
    "topic": "Client/server architecture",
    "choices": [
      "To cache the results of every query inside the client app",
      "To spread a single query across several database servers",
      "To encrypt every packet exchanged with the database",
      "Opening a connection is costly, so connections are reused"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does a database server do when a client sends it a SQL string?",
    "topic": "Client/server architecture",
    "choices": [
      "Sends the text back so the client can run it locally",
      "Stores the text and runs it the next time the client connects",
      "Compiles it into the client application's binary",
      "Parses it, plans it, executes it and returns the results"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How does SQLite differ from PostgreSQL architecturally?",
    "topic": "Client/server architecture",
    "choices": [
      "SQLite is a separate server while PostgreSQL runs inside the app",
      "Both are network servers, but they listen on different ports",
      "Both are embedded libraries, but PostgreSQL keeps data in memory",
      "SQLite runs inside the app and reads a file; PostgreSQL is a server"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why should an application send user input as query parameters instead of concatenating it into the SQL text?",
    "topic": "Client/server architecture",
    "choices": [
      "It makes the query run in parallel on several cores",
      "It encrypts the value before it reaches the server",
      "The value is never parsed as SQL, which prevents SQL injection",
      "It lets the server skip authentication for that query"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Many clients connect to one database server at once. What keeps their concurrent changes from corrupting data?",
    "topic": "Client/server architecture",
    "choices": [
      "Each client works on its own private copy of the database",
      "Clients are served strictly in the order they connected",
      "The operating system serializes all writes to the data files",
      "Concurrency control inside the server, such as locking or MVCC"
    ],
    "answerIdx": 3
  },
  {
    "stem": "In a typical web application, which component talks to the database directly?",
    "topic": "Client/server architecture",
    "choices": [
      "The user's browser",
      "The backend application server",
      "The CDN in front of the site",
      "The DNS server"
    ],
    "answerIdx": 1
  },
  {
    "stem": "The application server runs in a different region from the database. What is the main effect?",
    "topic": "Client/server architecture",
    "choices": [
      "Every query pays extra round-trip time, so chatty code slows down",
      "Nothing changes, because SQL does not depend on location at all",
      "Only large write statements are affected by the extra distance",
      "Transactions lose their durability guarantee over long distances"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which of these is a typical strength of relational databases?",
    "topic": "SQL vs NoSQL overview",
    "choices": [
      "Strong consistency, joins and constraints over structured data",
      "Storing records with no schema and no way to relate them",
      "Scaling out across many nodes with no design effort",
      "Answering every read faster than an in-memory store"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What kind of database is MongoDB?",
    "topic": "SQL vs NoSQL overview",
    "choices": [
      "A document database",
      "A key-value store",
      "A wide-column store",
      "A graph database"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What kind of database is Redis primarily?",
    "topic": "SQL vs NoSQL overview",
    "choices": [
      "An in-memory key-value store",
      "A document database",
      "A relational database",
      "A graph database"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which workload fits a relational database best?",
    "topic": "SQL vs NoSQL overview",
    "choices": [
      "A session cache where entries expire automatically after a delay",
      "A graph of friends where queries walk links of varying depth",
      "A leaderboard that is rebuilt from scratch every single hour",
      "An order system whose multi-table transactions must stay consistent"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the term NoSQL refer to?",
    "topic": "SQL vs NoSQL overview",
    "choices": [
      "A single database product built to replace the SQL language",
      "A family of non-relational stores, like document or key-value",
      "Databases that keep all of their data only in memory",
      "Databases that cannot be queried with any query language"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Two documents live in the same MongoDB collection. What can be true of them?",
    "topic": "SQL vs NoSQL overview",
    "choices": [
      "They must have identical fields",
      "They can have different fields",
      "They must list their fields in the same order",
      "They must match a schema declared before the first insert"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a typical trade-off of embedding related data inside one document?",
    "topic": "SQL vs NoSQL overview",
    "choices": [
      "Reads of the whole record are always slower than with joins",
      "It guarantees that no data is ever stored in more than one place",
      "Reads are fast, but duplicated data is harder to keep in sync",
      "It removes the need for any index on the collection"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why were many NoSQL stores designed to scale out easily?",
    "topic": "SQL vs NoSQL overview",
    "choices": [
      "They store data less durably, so each write needs fewer resources",
      "Records are self-contained, so they spread over nodes without joins",
      "They use faster disks than relational databases are able to use",
      "They skip the network layer when their nodes talk to each other"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which statement about SQL and NoSQL today is accurate?",
    "topic": "SQL vs NoSQL overview",
    "choices": [
      "NoSQL databases cannot maintain secondary indexes of any kind",
      "SQL databases cannot store JSON documents in any column type",
      "NoSQL databases never provide any consistency guarantees at all",
      "Many NoSQL stores support transactions, and many SQL ones store JSON"
    ],
    "answerIdx": 3
  },
  {
    "stem": "A wide-column store such as Cassandra is best suited to:",
    "topic": "SQL vs NoSQL overview",
    "choices": [
      "Ad hoc analytical queries that join many different tables",
      "Write-heavy workloads on many nodes, with known access patterns",
      "Small single-server apps that depend on foreign keys",
      "Workloads that depend on multi-row ACID transactions"
    ],
    "answerIdx": 1
  }
]
```
