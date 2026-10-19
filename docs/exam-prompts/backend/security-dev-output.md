LAYER: security-dev-1

```json
[
  {
    "stem": "What does the C in the CIA triad stand for?",
    "topic": "Confidentiality, integrity & availability",
    "choices": [
      "Control, which means that every action must be approved by a manager",
      "Compliance, which means that the system follows every law of a single country",
      "Confidentiality, which means that only authorised people can read the data",
      "Cryptography, which means that all of the data must be encrypted"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does integrity mean for data?",
    "topic": "Confidentiality, integrity & availability",
    "choices": [
      "It cannot be changed in an unauthorised or undetected way",
      "It can always be read by anyone who asks for it",
      "It is stored in more than one place at the same time",
      "It is deleted automatically after a fixed amount of time has passed in storage"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does availability mean in the CIA triad?",
    "topic": "Confidentiality, integrity & availability",
    "choices": [
      "The data is visible to every user of the internet at all times",
      "The data is available for sale to partners of the company",
      "The system never needs maintenance or any kind of update",
      "Authorised users can reach the system and the data when they need them"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which attack mainly harms availability?",
    "topic": "Confidentiality, integrity & availability",
    "choices": [
      "A phishing email that steals the password of an employee",
      "A denial of service attack that overloads a server with traffic",
      "A change of a price in a database by an attacker",
      "A copy of a customer list taken from a laptop"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which control mainly protects confidentiality?",
    "topic": "Confidentiality, integrity & availability",
    "choices": [
      "Keeping a backup of the data in a second data center",
      "Encrypting data so that only holders of the key can read it",
      "Adding a second server to share the load of requests",
      "Signing the data with a key so that changes can be detected later by others"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which control mainly supports integrity?",
    "topic": "Confidentiality, integrity & availability",
    "choices": [
      "A load balancer that spreads the requests over several servers of the service",
      "A firewall rule that blocks all traffic from one country",
      "A longer password for the account of every administrator",
      "Digital signatures or hashes that reveal changes to the data"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which control mainly supports availability?",
    "topic": "Confidentiality, integrity & availability",
    "choices": [
      "Redundancy and backups, so the service survives failures",
      "Encrypting each file with a different key for every user",
      "Hiding the version of the web server in the response headers",
      "Logging every request into a file on the same server"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why do the three goals sometimes pull against each other?",
    "topic": "Confidentiality, integrity & availability",
    "choices": [
      "They never conflict, because one control serves all three",
      "Only the first goal matters, so the others can be ignored",
      "Stronger protection can make the system slower or harder to use",
      "Each goal is owned by a different company that cannot talk to others"
    ],
    "answerIdx": 2
  },
  {
    "stem": "A bank statement is changed on its way to the customer. Which goal failed?",
    "topic": "Confidentiality, integrity & availability",
    "choices": [
      "Confidentiality",
      "Availability",
      "Integrity",
      "Authenticity of the web server certificate only"
    ],
    "answerIdx": 2
  },
  {
    "stem": "A laptop with customer data is stolen and the disk is not encrypted. Which goal is at risk?",
    "topic": "Confidentiality, integrity & availability",
    "choices": [
      "Confidentiality",
      "Availability only",
      "Integrity only",
      "None, because the data is still on the disk"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a vulnerability?",
    "topic": "Threats, vulnerabilities & risk",
    "choices": [
      "An attacker who is trying to break into a system",
      "The damage that is caused by a successful attack",
      "A rule that tells staff how to react to an incident",
      "A weakness in a system that could be exploited by a threat"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a threat?",
    "topic": "Threats, vulnerabilities & risk",
    "choices": [
      "A flaw in the code that has not been fixed yet",
      "Something or someone that could exploit a vulnerability and cause harm",
      "A firewall rule that is set up the wrong way",
      "A report that lists all of the assets of a company"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How is risk usually described?",
    "topic": "Threats, vulnerabilities & risk",
    "choices": [
      "The number of security tools that a company has bought",
      "The likelihood that a threat exploits a vulnerability, combined with the impact",
      "The number of vulnerabilities found by a scanner in a month",
      "The cost of the licenses of the security team"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is an asset in a risk assessment?",
    "topic": "Threats, vulnerabilities & risk",
    "choices": [
      "A tool that is used by attackers to enter a network",
      "A list of the vulnerabilities of a system",
      "A contract with a vendor of security software",
      "Anything of value that needs protection"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which choice is a way to treat a risk by reducing it?",
    "topic": "Threats, vulnerabilities & risk",
    "choices": [
      "Applying a control, such as patching or access restrictions",
      "Pretending that the risk does not exist at all",
      "Moving the risk to a place where nobody reads the reports of the team",
      "Recording the risk once and never reviewing it again"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does it mean to accept a risk?",
    "topic": "Threats, vulnerabilities & risk",
    "choices": [
      "Ignore the risk because nobody has noticed it yet",
      "Transfer the whole risk to the customers of the product",
      "Knowingly decide to live with it",
      "Remove the asset from the inventory so the risk disappears"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is risk transfer?",
    "topic": "Threats, vulnerabilities & risk",
    "choices": [
      "Moving a vulnerability from one server to another one",
      "Passing the blame for an incident to a single employee",
      "Shifting part of the impact to another party",
      "Copying a threat model into another document"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why is a vulnerability with no known threat still worth fixing?",
    "topic": "Threats, vulnerabilities & risk",
    "choices": [
      "Threats change, so an unfixed weakness can be exploited later",
      "Vulnerabilities without any known threat are impossible to exploit in practice",
      "Fixing them is required by every browser vendor",
      "They slow down the system for all users at all times"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which factor raises the impact of an incident?",
    "topic": "Threats, vulnerabilities & risk",
    "choices": [
      "Using a popular programming language for the system",
      "Having a long name for the company that was attacked",
      "Running the system on a weekday and not at night",
      "Sensitive data or critical services being affected"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the attack surface of a system?",
    "topic": "Threats, vulnerabilities & risk",
    "choices": [
      "The total size of the code base in lines of code",
      "All of the points where an attacker can try to enter or extract data",
      "The number of servers that a company owns in total",
      "The list of employees who have a security badge"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does defense in depth mean?",
    "topic": "Defense in depth & least privilege",
    "choices": [
      "Putting a very strong lock on one single door of the system",
      "Using several layers of controls",
      "Hiding the system so that attackers cannot find it",
      "Using only the newest security product on the market"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which example shows defense in depth for a web app?",
    "topic": "Defense in depth & least privilege",
    "choices": [
      "One firewall in front of the network and nothing else",
      "A long password for the administrator and nothing else",
      "A single scan of the code before the first release",
      "A firewall, input validation, least privilege accounts and monitoring together"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the principle of least privilege say?",
    "topic": "Defense in depth & least privilege",
    "choices": [
      "Give each user and process only the access it needs for its task",
      "Give every employee full access so that their daily work is never blocked",
      "Give access to the person with the highest rank only",
      "Remove all access after the first week of employment"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why is running a service as root a problem?",
    "topic": "Defense in depth & least privilege",
    "choices": [
      "Root users cannot read the log files of the system",
      "Root services always start slower than other services",
      "If the service is compromised, the attacker gets full control of the machine",
      "Root accounts are blocked from using the network"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does separation of duties mean?",
    "topic": "Defense in depth & least privilege",
    "choices": [
      "Each team keeps its work in a different office building",
      "Each employee uses a different password for every system",
      "No single person can complete a sensitive action alone",
      "Developers and testers must never speak to each other"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does fail secure, or fail closed, mean?",
    "topic": "Defense in depth & least privilege",
    "choices": [
      "When a control fails, the system denies access instead of allowing it",
      "When a control fails, the system opens all doors so that work continues",
      "When a control fails, the system restarts without any message",
      "When a control fails, an email is sent and nothing else happens"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why should default settings be secure?",
    "topic": "Defense in depth & least privilege",
    "choices": [
      "Defaults are changed automatically by the browser of the user",
      "Attackers cannot read the default settings of a system",
      "Secure defaults make a system run faster than custom ones",
      "Many users never change defaults"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the idea behind zero trust?",
    "topic": "Defense in depth & least privilege",
    "choices": [
      "Trust every device that is inside the company network",
      "Never trust a request because of its network location, and verify each request",
      "Trust only the devices of the chief executive",
      "Trust requests that come from well known websites"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why is security by obscurity not enough?",
    "topic": "Defense in depth & least privilege",
    "choices": [
      "Hiding things is not allowed by any law",
      "Secrets about the design are eventually discovered",
      "Obscure systems cannot be updated",
      "Attackers only attack systems that are well documented"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the benefit of segmenting a network?",
    "topic": "Defense in depth & least privilege",
    "choices": [
      "It makes every request travel faster between all of the servers of the network",
      "It removes the need for authentication on internal services",
      "It lets every employee use the same account",
      "A breach in one segment does not give direct access to the others"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the HTTP status code 401 mean?",
    "topic": "Networking & HTTP basics for security",
    "choices": [
      "The request needs valid authentication credentials",
      "The request was successful and the server has no content to send back",
      "The server could not find the resource",
      "The server had an internal error"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the difference between 401 and 403?",
    "topic": "Networking & HTTP basics for security",
    "choices": [
      "403 means not authenticated, 401 means authenticated but not allowed",
      "They are the same code with two names",
      "401 means not authenticated, 403 means authenticated but not allowed",
      "401 is for pages and 403 is for images"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why does HTTPS matter for security?",
    "topic": "Networking & HTTP basics for security",
    "choices": [
      "It makes the website load faster for all visitors",
      "It hides the website from search engines",
      "It encrypts the traffic and lets the client verify the identity of the server",
      "It removes the need for passwords on the site"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What can an attacker on the same open wifi do with plain HTTP traffic?",
    "topic": "Networking & HTTP basics for security",
    "choices": [
      "Read and change it, because it is not encrypted or authenticated",
      "Nothing, because wifi traffic is always encrypted for every device on it",
      "Only see the size of the pages, never the content",
      "Only delay it by a few milliseconds"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does a cookie with the HttpOnly flag do?",
    "topic": "Networking & HTTP basics for security",
    "choices": [
      "It is sent only over plain HTTP connections",
      "It is deleted when the user closes the tab",
      "It is encrypted with the key of the server",
      "Scripts on the page cannot read it"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the Secure flag on a cookie do?",
    "topic": "Networking & HTTP basics for security",
    "choices": [
      "The cookie is protected with a password",
      "The browser sends the cookie only over HTTPS connections",
      "The cookie can never be changed by the server",
      "The cookie is shared with all websites"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the role of DNS?",
    "topic": "Networking & HTTP basics for security",
    "choices": [
      "It encrypts the pages of a website",
      "It maps domain names to IP addresses",
      "It stores the passwords of users",
      "It filters spam from emails"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why is DNS a common target of attacks?",
    "topic": "Networking & HTTP basics for security",
    "choices": [
      "DNS stores the private keys of every website",
      "DNS servers can read all of the passwords of users",
      "DNS is used only by attackers",
      "Controlling a record lets an attacker send users to a different server"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does a TCP three way handshake do?",
    "topic": "Networking & HTTP basics for security",
    "choices": [
      "It sets up a connection between two hosts before data is sent",
      "It encrypts the data that travels between two hosts",
      "It checks the password of the user before the connection is opened at all",
      "It compresses packets so that they are smaller"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which HTTP method should never change data on the server?",
    "topic": "Networking & HTTP basics for security",
    "choices": [
      "POST, since it only reads data",
      "DELETE, since it only reads data",
      "GET, since it is meant to be safe and only read",
      "PUT, since it only reads data"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is encoding?",
    "topic": "Encoding vs encryption vs hashing",
    "choices": [
      "A way of hiding data so that only the owner can read it",
      "A one way function that cannot be reversed",
      "A reversible transformation of data into another format",
      "A method for proving who sent a message"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Is Base64 a form of encryption?",
    "topic": "Encoding vs encryption vs hashing",
    "choices": [
      "No, it is only an encoding",
      "Yes, it needs a secret key to be decoded",
      "Yes, but only for images",
      "No, it is a hash that cannot be reversed"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is encryption?",
    "topic": "Encoding vs encryption vs hashing",
    "choices": [
      "A one way function that produces a fixed size value",
      "A way of writing data in another character set",
      "A method of compressing data to make it smaller",
      "A reversible transformation that needs a key to turn the data back"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is hashing?",
    "topic": "Encoding vs encryption vs hashing",
    "choices": [
      "A reversible function that needs a secret key",
      "A one way function that maps data to a fixed size value",
      "A way to split data into several parts",
      "A method of sending data through a secure tunnel"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which of these is best for storing a password?",
    "topic": "Encoding vs encryption vs hashing",
    "choices": [
      "Base64 encoding of the password",
      "A slow, salted password hash such as bcrypt or argon2",
      "AES encryption with a key stored next to the database",
      "A plain text column with strict access rights"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why is encryption the wrong tool for storing passwords?",
    "topic": "Encoding vs encryption vs hashing",
    "choices": [
      "Encrypted data cannot be stored in a database",
      "Encryption is slower than every hash function",
      "Passwords are too short to be encrypted",
      "The server would need the key"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does a salt do in password hashing?",
    "topic": "Encoding vs encryption vs hashing",
    "choices": [
      "It makes the hash of equal passwords different and defeats precomputed tables",
      "It hides the password from the user who typed it",
      "It encrypts the hash with a secret key",
      "It makes the hash shorter"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which property should a cryptographic hash have?",
    "topic": "Encoding vs encryption vs hashing",
    "choices": [
      "It is easy to compute the input from the hash",
      "It always produces a hash that is as long as the input",
      "It is hard to find two inputs with the same hash",
      "It produces a different hash for the same input every time"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is URL encoding used for?",
    "topic": "Encoding vs encryption vs hashing",
    "choices": [
      "Encrypting the query string of a url",
      "Compressing long urls for sharing",
      "Representing special characters safely inside a url",
      "Hiding the url from the browser history"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which statement about hashes of files is correct?",
    "topic": "Encoding vs encryption vs hashing",
    "choices": [
      "A matching hash shows that the file has not changed, if the hash itself is trusted",
      "A hash can be used to recover the file later",
      "A hash proves who created the file",
      "Two different files always have different hashes in practice"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the attacker mindset?",
    "topic": "The attacker mindset",
    "choices": [
      "Believing that every user wants to help the company",
      "Focusing only on the tools that an attacker uses",
      "Avoiding thinking about failure so that the team stays positive",
      "Asking how a system can be abused or made to behave in ways its designers did not intend"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why should developers learn how attacks work?",
    "topic": "The attacker mindset",
    "choices": [
      "Attacks are easier than development and everyone does them",
      "They can recognise risky patterns in their own code and design defences",
      "It is a legal requirement for all programmers",
      "Only attackers write secure code"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the first step of many attacks, which is gathering information?",
    "topic": "The attacker mindset",
    "choices": [
      "Exfiltration",
      "Reconnaissance",
      "Persistence",
      "Remediation"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does an attacker often look for in a web app?",
    "topic": "The attacker mindset",
    "choices": [
      "Pages that use bright colours in the design",
      "Comments in the code that praise the developers",
      "Websites that load images faster than average",
      "Inputs that reach interpreters, such as databases, shells or templates"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a good question for a developer to ask about each input?",
    "topic": "The attacker mindset",
    "choices": [
      "What if this value is not what I expect, and what can an attacker do with it?",
      "Will this input look good in the user interface?",
      "Is this input short enough to fit in the table?",
      "Can this input be typed on a mobile phone?"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why do attackers prefer the weakest link?",
    "topic": "The attacker mindset",
    "choices": [
      "Strong links are always monitored by the police",
      "The weakest link is always the most important system",
      "They need only one way in",
      "It saves them money to attack simple systems only"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is social engineering?",
    "topic": "The attacker mindset",
    "choices": [
      "A method of building social networks for companies that share a market",
      "A way of designing the interface of a website",
      "Manipulating people into giving access or information",
      "Writing code together with other engineers"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why is phishing effective?",
    "topic": "The attacker mindset",
    "choices": [
      "It targets people, who can be tricked even when the technology is secure",
      "It breaks strong encryption using fast computers",
      "It works only on old computers that have no updates",
      "It needs physical access to the office of the victim"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does an attacker gain by chaining small weaknesses?",
    "topic": "The attacker mindset",
    "choices": [
      "A faster network connection for the attack",
      "A legal permission to test the system",
      "More storage for the stolen data",
      "Several minor problems can combine into a serious compromise"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why is it risky to assume that nobody will find an internal endpoint?",
    "topic": "The attacker mindset",
    "choices": [
      "Internal endpoints cannot be reached from the internet in any case",
      "Attackers scan and guess paths, and internal endpoints often have weak protection",
      "Endpoints are always protected by the browser",
      "Scanners cannot find endpoints that are not linked"
    ],
    "answerIdx": 1
  }
]
```

LAYER: security-dev-2

```json
[
  {
    "stem": "What is SQL injection?",
    "topic": "Injection — SQLi & command injection",
    "choices": [
      "An attack that fills the disk of the database server",
      "An attack that reads the password file of the operating system",
      "An attack where user input changes the meaning of a query",
      "An attack that sends too many connections to the server"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a parameterized query?",
    "topic": "Injection — SQLi & command injection",
    "choices": [
      "A query where values are sent separately from the SQL text, as parameters",
      "A query that takes the name of a table as one of its parameters",
      "A query that runs several times with different values that are cached for later",
      "A query that is stored in the database itself as a view"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you write a parameterized query with pg?",
    "topic": "Injection — SQLi & command injection",
    "choices": [
      "pool.query(\"SELECT * FROM users WHERE id = \" + id)",
      "pool.query(`SELECT * FROM users WHERE id = ${id}`)",
      "pool.query(\"SELECT * FROM users WHERE id = ?\" + [id])",
      "pool.query(\"SELECT * FROM users WHERE id = $1\", [id])"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why does string concatenation of user input into SQL create a risk?",
    "topic": "Injection — SQLi & command injection",
    "choices": [
      "The result is always cached for the next user of the app",
      "The input can contain SQL that is executed as part of the query",
      "The concatenated string is too long for the database to be able to parse",
      "The database converts the input to a number and fails"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Do parameters protect the names of tables or columns?",
    "topic": "Injection — SQLi & command injection",
    "choices": [
      "Yes, parameters work for table and column names too",
      "No, identifiers cannot be parameters",
      "Yes, but only when the names are wrapped in quotes",
      "No, but they are protected when the user is logged in"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a safe way to let users choose a sort column?",
    "topic": "Injection — SQLi & command injection",
    "choices": [
      "Insert the input directly into the ORDER BY clause",
      "Escape the input with a regular expression and insert it",
      "Let the database decide which column to use",
      "Map the input to a fixed list of allowed column names"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Do ORMs such as Prisma make injection impossible?",
    "topic": "Injection — SQLi & command injection",
    "choices": [
      "No, raw query features can still be misused with string building",
      "Yes, because ORMs never send any SQL text to the database at all",
      "Yes, but only when the project is written in TypeScript and not JavaScript",
      "No, but only when the ORM runs on the client and not on the server"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the principle of least privilege add to injection defense?",
    "topic": "Injection — SQLi & command injection",
    "choices": [
      "It blocks all SQL statements that contain quotes",
      "It encrypts the values before they are sent as parameters",
      "A database user with few rights limits the damage of a successful injection",
      "It removes the need for any input validation"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which input check helps besides parameters?",
    "topic": "Injection — SQLi & command injection",
    "choices": [
      "Convert all input to upper case before it is saved",
      "Remove the word SELECT from every input value",
      "Validate type, length and format on the server before the query runs",
      "Trust the checks that the browser has already made"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What should an error response for a failed query not include?",
    "topic": "Injection — SQLi & command injection",
    "choices": [
      "The raw database error and the query text",
      "A generic message that says the request failed",
      "An id that helps to find the error in the logs",
      "The status code of the response"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is cross site scripting, or XSS?",
    "topic": "Cross-site scripting (XSS)",
    "choices": [
      "An attack that guesses passwords by trying very many combinations of characters",
      "An attack that sends so much traffic to the server that it stops answering the visitors",
      "An attack where a script on the server reads the files of another application",
      "An attack where untrusted input is run as script in the browser of another user, on your site"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the main difference between stored and reflected XSS?",
    "topic": "Cross-site scripting (XSS)",
    "choices": [
      "Reflected XSS is saved in the database, while stored XSS comes only from the address bar",
      "Stored XSS is saved by the server and shown to many users, reflected XSS comes back from a single request",
      "Stored XSS works only on mobile apps, while reflected XSS works only on desktop sites",
      "There is no difference, since both names describe the same attack in the same way"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What can an attacker do with XSS on a page where the user is signed in?",
    "topic": "Cross-site scripting (XSS)",
    "choices": [
      "Change the password of the server administrator directly in the database of the app",
      "Act as the user, read page data and send requests with the session of the user",
      "Read the source code of the backend that runs on the server",
      "Reboot the server of the application from the browser of the victim"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which defense is the main protection against XSS?",
    "topic": "Cross-site scripting (XSS)",
    "choices": [
      "Hide the login form from search engines so attackers cannot find it",
      "Limit the length of every input field to twenty characters",
      "Ask users to choose longer passwords at registration",
      "Encode output for the context where it is placed"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why is blocking the word script in input a weak defense?",
    "topic": "Cross-site scripting (XSS)",
    "choices": [
      "Attackers have many other ways to run code",
      "The word script is never used in attacks of this kind",
      "Browsers refuse to load any page that contains the word script",
      "Filters of this kind slow the server down too much"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does a Content Security Policy help with?",
    "topic": "Cross-site scripting (XSS)",
    "choices": [
      "It encrypts the cookies of the user before they are sent",
      "It checks the passwords of users against a list of leaked passwords",
      "It limits where scripts can be loaded from",
      "It speeds up the loading of images on the page"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is DOM based XSS?",
    "topic": "Cross-site scripting (XSS)",
    "choices": [
      "The server stores a script in the database and sends it to every visitor",
      "The attacker edits the DOM of a page using the developer tools of their own browser",
      "The page script reads attacker data",
      "The browser caches an old script and runs it after the user has left the site"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why is textContent safer than innerHTML for showing user text?",
    "topic": "Cross-site scripting (XSS)",
    "choices": [
      "textContent treats the value as text",
      "textContent is encrypted and innerHTML is not",
      "innerHTML is blocked by all modern browsers",
      "They behave the same, only the speed is different"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the HttpOnly flag add to the defense against XSS?",
    "topic": "Cross-site scripting (XSS)",
    "choices": [
      "It prevents the script from running at all in every case",
      "It stops the page from loading any external resource",
      "It encrypts the whole page for the user",
      "Injected scripts cannot read the session cookie"
    ],
    "answerIdx": 3
  },
  {
    "stem": "When must you sanitise HTML rather than only encode it?",
    "topic": "Cross-site scripting (XSS)",
    "choices": [
      "When the page shows only a number that a user typed",
      "When users are allowed to submit rich text with some markup that must be kept",
      "When the data is a file name that is shown in a list",
      "When the data is used only in a log file"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is cross site request forgery, or CSRF?",
    "topic": "Cross-site request forgery (CSRF)",
    "choices": [
      "An attack that reads the cookies of a user with a script that runs on the page",
      "A site makes the browser of a signed in user send a request the user did not intend",
      "An attack that guesses session identifiers by trying many values",
      "An attack that copies the database of a website over the network"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why does CSRF work against cookie based sessions?",
    "topic": "Cross-site request forgery (CSRF)",
    "choices": [
      "Cookies are always sent in plain text over every kind of network",
      "Cookies can be read by any other website that the user visits",
      "Servers cannot tell which user sent a request with a cookie",
      "Browsers attach cookies automatically to requests to the site, whichever page started them"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which request types are the main target of CSRF?",
    "topic": "Cross-site request forgery (CSRF)",
    "choices": [
      "State changing requests such as a transfer or a password change",
      "Requests for public images and stylesheets",
      "Requests that load the home page of a site",
      "Requests that check whether the server is alive and ready to answer"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does a CSRF token do?",
    "topic": "Cross-site request forgery (CSRF)",
    "choices": [
      "It encrypts the session cookie of the user",
      "It limits the number of requests that a user may send",
      "It is a secret value that the page must send back",
      "It proves that the user has a strong password"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the SameSite cookie attribute do?",
    "topic": "Cross-site request forgery (CSRF)",
    "choices": [
      "It makes the cookie visible to every subdomain of the site at once",
      "It encrypts the cookie value with a key of the server",
      "It controls whether the cookie is sent on cross site requests",
      "It removes the cookie when the tab is closed"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why should state changing actions never use GET requests?",
    "topic": "Cross-site request forgery (CSRF)",
    "choices": [
      "Links and images can trigger GET requests without the consent of the user",
      "GET requests cannot carry cookies",
      "GET requests are slower than POST requests",
      "Browsers block GET requests that change data"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Does CORS protect against CSRF by itself?",
    "topic": "Cross-site request forgery (CSRF)",
    "choices": [
      "Yes, CORS blocks every request from other origins before it is sent",
      "Yes, but only for requests that use JSON",
      "No, because CORS works only on the server and not in the browser",
      "No, simple cross site requests can still be sent, and CORS only limits reading the response"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Is an API that uses an Authorization header with a token in memory usually exposed to CSRF?",
    "topic": "Cross-site request forgery (CSRF)",
    "choices": [
      "Always, because tokens are sent automatically by the browser",
      "Much less, because the browser does not add that header by itself to cross site requests",
      "Only when the token is longer than 256 bits",
      "Yes, since headers are sent by the browser for every site"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the double submit cookie pattern?",
    "topic": "Cross-site request forgery (CSRF)",
    "choices": [
      "The cookie is sent twice on every request to double the security",
      "The token is sent in a cookie and also in the request body or header, and the server compares them",
      "The user submits a form two times to confirm an action",
      "Two cookies are created for each session with different names"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What extra check can protect a sensitive action such as changing an email?",
    "topic": "Cross-site request forgery (CSRF)",
    "choices": [
      "Make the button of the action larger on the page",
      "Hide the action in a menu that few people open",
      "Show a warning text above the form",
      "Ask the user to enter the current password or confirm with a second factor"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why must a server action check the session itself?",
    "topic": "Broken access control",
    "choices": [
      "Actions are public endpoints, so hiding the button does not protect them",
      "The user interface already checks the session and the action simply trusts it",
      "Server actions cannot be called at all when the user is signed out",
      "The session is verified by the browser of the user before each call"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What should a protected server action do when there is no session?",
    "topic": "Broken access control",
    "choices": [
      "Continue and use a default user for the request",
      "Show a message in the console and keep running",
      "Return an error or redirect before touching any data",
      "Ask the browser to send the session again in a header"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Where should authorization checks for a record live?",
    "topic": "Broken access control",
    "choices": [
      "In the button component that triggers the action in the user interface",
      "In a client side hook that reads the url of the current page",
      "On the server, next to the data access, checking ownership or role",
      "In the CSS rules that hide the buttons from the other users"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is authentication compared with authorization?",
    "topic": "Broken access control",
    "choices": [
      "Authentication proves who you are, authorization decides what you may do",
      "Authentication decides what you may do, authorization proves who you are",
      "They mean the same thing in different frameworks",
      "Authentication is done on the server, authorization in the browser"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why check ownership when a user edits a post by id?",
    "topic": "Broken access control",
    "choices": [
      "Ids are kept secret, so the check is only needed for logging purposes",
      "The database does not allow any edit to run without an ownership check",
      "The check is slow, so it is needed only while developing the feature",
      "Otherwise anyone could change the posts of others by sending another id"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How can a page redirect an unauthenticated visitor to sign in?",
    "topic": "Broken access control",
    "choices": [
      "Hide the content with CSS until the visitor has logged in to the application",
      "Check the session in the server component and call redirect",
      "Show an alert in the browser and keep the page open",
      "Ask the visitor for the password in the url"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why not rely on a client component check alone to protect data?",
    "topic": "Broken access control",
    "choices": [
      "Client components cannot read the session at all",
      "The client code can be changed or bypassed by the user",
      "Client checks are slower than server checks in every case",
      "Browsers block data requests from unauthenticated users"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the safest place to enforce access to a route handler?",
    "topic": "Broken access control",
    "choices": [
      "In a global variable that is read by every one of the handlers",
      "In the page that links to the handler from the user interface",
      "In the browser, before the request is sent to the server",
      "Inside the handler itself, before it reads or writes any data"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does a 401 response mean for an API route?",
    "topic": "Broken access control",
    "choices": [
      "The caller is not authenticated",
      "The caller is not allowed to use that resource",
      "The resource was moved to a new path",
      "The server had an internal error"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does a 403 response mean for an API route?",
    "topic": "Broken access control",
    "choices": [
      "The caller has not signed in yet and must identify themselves first",
      "The route does not exist on the server that received the request",
      "The caller is known but is not allowed to do this",
      "The body of the request is invalid and could not be parsed"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is security misconfiguration?",
    "topic": "Security misconfiguration",
    "choices": [
      "A bug in the logic of a single function of the app",
      "A password that a user chose by themselves",
      "Insecure settings, such as default passwords, open storage or verbose errors",
      "An attack that needs physical access to the server"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why are default credentials dangerous?",
    "topic": "Security misconfiguration",
    "choices": [
      "They are public knowledge, and attackers try them on every exposed service",
      "They are always strong, but difficult to remember",
      "They are valid only on the first day of use",
      "They are checked by the firewall and blocked"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the risk of showing detailed error messages to users?",
    "topic": "Security misconfiguration",
    "choices": [
      "They make the page load slower for the user",
      "They make the logs larger on the server",
      "They always confuse search engines",
      "They can reveal stack traces, file paths and versions that help an attacker"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is wrong with a storage bucket that is public by mistake?",
    "topic": "Security misconfiguration",
    "choices": [
      "It costs more than a private bucket",
      "Anyone on the internet can read or sometimes change the files in it",
      "It cannot be backed up by the provider",
      "It is slower to download from than a private one"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why disable directory listing on a web server?",
    "topic": "Security misconfiguration",
    "choices": [
      "It makes the server use less memory for each request",
      "It stops visitors from browsing the files of a folder that has no index page",
      "It is required for the server to support HTTPS",
      "It hides the version of the operating system"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a good practice for unused features and services?",
    "topic": "Security misconfiguration",
    "choices": [
      "Leave them on in case someone needs them later",
      "Hide them by renaming their urls",
      "Document them in a public wiki",
      "Turn off or remove them"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why should debug mode be off in production?",
    "topic": "Security misconfiguration",
    "choices": [
      "It can expose internal data and sometimes allow code execution",
      "It makes the application too fast for the database that has to keep up",
      "It prevents the logs from being written",
      "It is not supported by any hosting provider"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does hardening mean?",
    "topic": "Security misconfiguration",
    "choices": [
      "Making hardware stronger so that it cannot break",
      "Adding more users to the system to share the work",
      "Reducing the attack surface by removing and locking down what is not needed",
      "Encrypting every file of the server twice"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which tool or practice helps to find misconfiguration early?",
    "topic": "Security misconfiguration",
    "choices": [
      "Counting the lines of code in each file",
      "Reading the marketing pages of the cloud provider that hosts the application",
      "Configuration scanners and infrastructure as code reviews",
      "Rebooting the servers once a week"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why keep configuration in version control and review changes?",
    "topic": "Security misconfiguration",
    "choices": [
      "Mistakes are caught before release, and every change has an author and a history",
      "It makes the application faster when it starts",
      "Version control encrypts all of the secrets by itself",
      "Reviews are not needed once a file is committed"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is server side request forgery, or SSRF?",
    "topic": "SSRF & insecure deserialization",
    "choices": [
      "The attacker makes the browser of a user send a request without consent",
      "The attacker sends a very large file to fill the disk of the server",
      "The attacker changes the url of a page in the address bar of their own browser",
      "The attacker makes the server send requests to a place of the attacker choosing"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why is the cloud metadata address a common SSRF target?",
    "topic": "SSRF & insecure deserialization",
    "choices": [
      "It is a public website with the passwords of every cloud user",
      "It can return credentials of the machine, and it is reachable from the server itself",
      "It is the only address that a firewall cannot block",
      "It stores the source code of the application"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which feature often leads to SSRF?",
    "topic": "SSRF & insecure deserialization",
    "choices": [
      "Showing the current date on a page",
      "Fetching a url that was provided by the user",
      "Sorting a list of products by price",
      "Setting the language of the interface that the visitor has chosen for the site"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a good defense against SSRF?",
    "topic": "SSRF & insecure deserialization",
    "choices": [
      "Trust any url that starts with https",
      "Check that the url is shorter than 100 characters",
      "Hide the server behind a longer domain name",
      "Allow only known hosts, block internal address ranges and do not follow redirects blindly"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is insecure deserialization?",
    "topic": "SSRF & insecure deserialization",
    "choices": [
      "Turning untrusted data into objects in a way that lets an attacker run code or change logic",
      "Storing objects in a database without an index",
      "Sending large objects over a slow network",
      "Converting objects to text with the wrong date format"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why is deserializing data from the client risky when the format can create arbitrary objects?",
    "topic": "SSRF & insecure deserialization",
    "choices": [
      "Clients cannot send objects to servers at all",
      "Objects are always larger than text",
      "The data can choose which classes are built, and their methods may run harmful code",
      "The server loses the type information of each field"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a safer approach than native object deserialization for data from outside?",
    "topic": "SSRF & insecure deserialization",
    "choices": [
      "Accept any serialized object and check it afterwards",
      "Allow only users that have a long password",
      "Use a simple format such as JSON with a schema check",
      "Encrypt the serialized object with a key stored in the client"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why validate the response and the redirects when a server fetches a url for a user?",
    "topic": "SSRF & insecure deserialization",
    "choices": [
      "A harmless looking host can redirect to an internal address",
      "Responses are always signed by the remote host",
      "Redirects are disabled by default on every server, so there is no risk at all",
      "Validation makes the request faster"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why does network segmentation help against SSRF?",
    "topic": "SSRF & insecure deserialization",
    "choices": [
      "Segments encrypt all of the requests of the server",
      "Segments remove the need for any validation in the code",
      "Segmentation blocks requests to the public internet",
      "Even if the server is tricked, it may not be able to reach sensitive internal systems"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a sign that an endpoint may be vulnerable to SSRF?",
    "topic": "SSRF & insecure deserialization",
    "choices": [
      "It returns a JSON list of products",
      "It accepts a url or host from the user and the server makes the request itself",
      "It requires a login before it answers",
      "It sets a cookie in the response"
    ],
    "answerIdx": 1
  }
]
```

LAYER: security-dev-3

```json
[
  {
    "stem": "Why should passwords be hashed before being stored?",
    "topic": "Password storage — bcrypt, argon2",
    "choices": [
      "So the stored passwords take up less space in the users collection",
      "So users can read their passwords back after they have forgotten them",
      "So a database leak does not reveal the real passwords",
      "So the server can include the password in the emails it sends out"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why is bcrypt preferred over a plain fast hash like SHA 256 for passwords?",
    "topic": "Password storage — bcrypt, argon2",
    "choices": [
      "It is deliberately slow and tunable, which makes guessing attacks costly",
      "It produces a shorter hash that takes up less space in the users collection",
      "It encrypts the password in a way that can be decrypted later by the server",
      "It does not need any random data, so the same input is always hashed alike"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a salt?",
    "topic": "Password storage — bcrypt, argon2",
    "choices": [
      "A secret key that is stored only in the browser of the user who signs up",
      "A second password that the user must remember and enter after the first one",
      "A list of banned passwords that the server checks before it saves a new user",
      "A random value added to each password so equal passwords hash differently"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the cost factor in bcrypt control?",
    "topic": "Password storage — bcrypt, argon2",
    "choices": [
      "How long the password that the user chooses is allowed to be at most",
      "How much work each hash takes, which slows attackers down",
      "How many users are allowed to log in at the same moment on the server",
      "The size of the database column that holds the stored hash of the password"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you check a login password against the stored bcrypt hash?",
    "topic": "Password storage — bcrypt, argon2",
    "choices": [
      "Hash the password again with bcrypt.hash and compare strings directly",
      "Use bcrypt.compare with the plain password and the stored hash",
      "Decrypt the stored hash and compare the result",
      "Send the hash to the browser to compare"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why does hashing the same password twice with bcrypt give different results?",
    "topic": "Password storage — bcrypt, argon2",
    "choices": [
      "The cost factor changes every time",
      "The algorithm is random by design for the whole result",
      "The database changes the value",
      "Each hash uses a new random salt"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Is hashing the same as encryption?",
    "topic": "Password storage — bcrypt, argon2",
    "choices": [
      "No, hashing is one way, while encryption can be reversed with a key",
      "Yes, they are two names for the same operation on stored passwords",
      "Yes, but hashing is used only for files and encryption only for text",
      "No, hashing always needs a secret key, while encryption never needs one"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which is a bad way to store passwords?",
    "topic": "Password storage — bcrypt, argon2",
    "choices": [
      "Saving a bcrypt hash with a salt",
      "Saving a hash from a slow algorithm built for passwords",
      "Saving them as plain text in the users collection",
      "Saving a hash with a high cost factor"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What should the login error say when the email or password is wrong?",
    "topic": "Password storage — bcrypt, argon2",
    "choices": [
      "The exact field that failed, so the user knows what to correct next",
      "The stored hash of the password, so the user can compare it by hand",
      "A generic message that does not say which of the two was wrong",
      "The number of attempts that remain, and nothing else about the login"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does bcrypt include in its output string?",
    "topic": "Password storage — bcrypt, argon2",
    "choices": [
      "The algorithm version, cost and salt, together with the hash",
      "Only the hash itself, with no other data stored beside it",
      "The original password, kept inside an encrypted block at the end",
      "The user id and the email address that the hash was made for"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the main difference between sessions and tokens for authentication?",
    "topic": "Sessions vs tokens",
    "choices": [
      "A session works only in the browser and a token only on mobile phones",
      "A token needs a database table and a session needs none at all",
      "They are the same thing with two names in different frameworks",
      "A session keeps state on the server and the client holds an id"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Where is the state of a classic server side session stored?",
    "topic": "Sessions vs tokens",
    "choices": [
      "Inside the token that the browser keeps in local storage between two visits",
      "On the server, in memory or in a database or cache, keyed by a session id",
      "In the url of every page that the user visits",
      "In the DNS records of the domain of the app"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a benefit of server side sessions?",
    "topic": "Sessions vs tokens",
    "choices": [
      "They need no storage on the server at all",
      "The server can revoke a session at any time",
      "They are faster than every other approach in all cases",
      "They never expire on their own and need no cookie"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a benefit of stateless tokens such as JWTs?",
    "topic": "Sessions vs tokens",
    "choices": [
      "They can be revoked instantly without any extra work",
      "They are encrypted by default, so nobody who holds one can read the payload",
      "They never need to be signed or checked",
      "Any server that has the key can verify them without a shared session store"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a downside of JWTs for sessions?",
    "topic": "Sessions vs tokens",
    "choices": [
      "A token is hard to revoke before it expires unless you keep extra state",
      "A JWT cannot be sent in an HTTP header",
      "A JWT can only be used on one server",
      "A JWT needs a database lookup for every claim"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Where is the session id usually kept in the browser?",
    "topic": "Sessions vs tokens",
    "choices": [
      "In a global variable on the window object, where every script can read it",
      "In the url as a path segment",
      "In an HttpOnly cookie that scripts cannot read",
      "In a hidden field of every form"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does it mean that a JWT is self contained?",
    "topic": "Sessions vs tokens",
    "choices": [
      "The token stores a pointer to a row in the session table of the server",
      "The token is encrypted so only the original server can open it",
      "The token carries its own claims and signature",
      "The token is valid for ever once it has been issued to a client"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the role of a refresh token?",
    "topic": "Sessions vs tokens",
    "choices": [
      "It gets a new access token without asking the user to log in again",
      "It stores the password of the user for the next login",
      "It signs the access token before it is sent",
      "It replaces the secret key of the server when that key reaches its expiry date"
    ],
    "answerIdx": 0
  },
  {
    "stem": "When might sessions be the simpler choice?",
    "topic": "Sessions vs tokens",
    "choices": [
      "For an API that has to be called by many unrelated services and clients",
      "For a mobile app that has no cookies",
      "For static sites that have no server",
      "For a single web app where you want easy logout and revocation"
    ],
    "answerIdx": 3
  },
  {
    "stem": "When might tokens be a good choice?",
    "topic": "Sessions vs tokens",
    "choices": [
      "For apps that must revoke access in one second at all times",
      "For APIs used by several clients or services, where a shared session store is awkward",
      "For pages that have no users",
      "For servers that cannot verify signatures"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a JSON Web Token?",
    "topic": "JWT structure, signing & pitfalls",
    "choices": [
      "An encrypted file that stores the password of the user for later logins",
      "A signed token that carries claims about a user and can be verified by the server",
      "A cookie that the browser creates on its own after the user has logged in",
      "A database record that the server uses to keep track of open sessions"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What are the three parts of a JWT?",
    "topic": "JWT structure, signing & pitfalls",
    "choices": [
      "Key, value and hash, joined by dots in a fixed order",
      "Header, body and footer, as in an email message layout",
      "Token, secret and salt, as used for password storage",
      "Header, payload and signature"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Is the payload of a normal signed JWT encrypted?",
    "topic": "JWT structure, signing & pitfalls",
    "choices": [
      "No, it is only encoded, so anyone can read it",
      "Yes, only the server that issued it is able to read the claims",
      "Yes, but the signature part stays visible to every client",
      "It depends on which browser the user has when the token is read"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why should you not put a password in a JWT payload?",
    "topic": "JWT structure, signing & pitfalls",
    "choices": [
      "The payload is too small to hold a password in a valid token",
      "Passwords inside a payload make the signature of the token invalid",
      "Anyone holding the token can decode and read the payload",
      "Browsers refuse to send tokens that contain a password to servers"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the server do to verify a JWT?",
    "topic": "JWT structure, signing & pitfalls",
    "choices": [
      "Look the token up by its text in the users collection of the database",
      "Decrypt the payload using the password that the user has chosen",
      "Check the signature with the secret or public key, and check the expiry",
      "Ask the browser to confirm that the token is the one it was given"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why do access tokens usually have a short lifetime?",
    "topic": "JWT structure, signing & pitfalls",
    "choices": [
      "A stolen token stops working soon",
      "Short tokens are smaller to send",
      "The signature cannot be checked after an hour",
      "Browsers delete long tokens"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the purpose of a refresh token?",
    "topic": "JWT structure, signing & pitfalls",
    "choices": [
      "To store the password of the user safely on the server side",
      "To sign the access token before it is sent to the browser",
      "To replace the secret key of the server when it expires",
      "To get a new access token without logging in again"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why should refresh tokens be stored and revocable on the server side?",
    "topic": "JWT structure, signing & pitfalls",
    "choices": [
      "So that the server is able to read the password of the user again later",
      "So a stolen or logged out token can be rejected before it expires",
      "So that the token never expires and the user stays logged in forever",
      "So that the browser is allowed to skip the check of the token signature"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which claim sets when a JWT stops being valid?",
    "topic": "JWT structure, signing & pitfalls",
    "choices": [
      "iat",
      "exp",
      "sub",
      "iss"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What happens if the signing secret of your JWT is leaked?",
    "topic": "JWT structure, signing & pitfalls",
    "choices": [
      "Nothing happens, because the payload of every token is encrypted anyway",
      "Only the tokens that were issued a long time ago stop working for users",
      "The tokens that the server issues from then on become much longer",
      "Anyone can forge valid tokens, so the secret must be rotated"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What problem does OAuth 2.0 solve?",
    "topic": "OAuth2 grant types",
    "choices": [
      "It lets an app get limited access to a user account at another service without the password",
      "It stores the passwords of users in an encrypted database for the app",
      "It proves the identity of a user to the app with a digital certificate",
      "It encrypts the traffic between the browser and the app"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which roles take part in the authorization code flow?",
    "topic": "OAuth2 grant types",
    "choices": [
      "The user, the browser and the database only",
      "The client, the router and the firewall",
      "The user, the client app, the authorization server and the resource server",
      "The developer, the tester and the product owner"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why is the authorization code flow with PKCE recommended for public clients such as single page apps?",
    "topic": "OAuth2 grant types",
    "choices": [
      "It removes the need for a login page at the provider",
      "It makes the access token never expire",
      "It stops a stolen code from being exchanged for tokens without the secret verifier",
      "It lets the client keep a secret in the source code"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the scope of an access token describe?",
    "topic": "OAuth2 grant types",
    "choices": [
      "The permissions that the token grants",
      "The time at which the token expires",
      "The network from which the token can be used",
      "The name of the app that wants the token"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why was the implicit grant removed from current best practice?",
    "topic": "OAuth2 grant types",
    "choices": [
      "It was too slow for modern browsers",
      "It needed a secret that clients could not keep",
      "It only worked for desktop apps",
      "Tokens were returned in the url"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the client credentials grant used for?",
    "topic": "OAuth2 grant types",
    "choices": [
      "A user signing in with a social account on a phone",
      "A service that calls an API as itself",
      "A user resetting a password by email",
      "A browser app that has no backend"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the state parameter protect against?",
    "topic": "OAuth2 grant types",
    "choices": [
      "Theft of the refresh token from the database",
      "Cross site request forgery on the redirect back to the client",
      "Brute force attempts on the login form",
      "Replay of expired passwords"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What should a client check on the redirect uri?",
    "topic": "OAuth2 grant types",
    "choices": [
      "It must be shorter than 255 characters",
      "It must use a well known top level domain, such as com or org",
      "It can be any address that the user types",
      "It must match exactly a value registered for the client"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why keep access tokens short lived and use refresh tokens?",
    "topic": "OAuth2 grant types",
    "choices": [
      "A leaked access token is useful for a short time, and the refresh token is protected more strongly",
      "Refresh tokens are faster to verify than access tokens",
      "Access tokens cannot be stored in memory",
      "Refresh tokens never need to be revoked"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Where should a confidential backend client keep its client secret?",
    "topic": "OAuth2 grant types",
    "choices": [
      "In the url of the redirect after sign in",
      "In the local storage of the browser of each user",
      "In a secret store or an environment variable on the server, never in client code",
      "In a public repository next to the code"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does OpenID Connect add to OAuth 2.0?",
    "topic": "OpenID Connect",
    "choices": [
      "A way to store the passwords of users in the provider",
      "A replacement for HTTPS on the login pages",
      "An identity layer, so the client learns who the user is through an ID token",
      "A limit on the number of users of an app"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is an ID token in OpenID Connect?",
    "topic": "OpenID Connect",
    "choices": [
      "A signed token, usually a JWT, with claims about the authentication of the user",
      "An opaque string that the client sends to every api",
      "A password that the provider sends by email",
      "A cookie that identifies the browser of the user"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the difference between an access token and an ID token?",
    "topic": "OpenID Connect",
    "choices": [
      "The access token is for the client to learn the identity, the ID token is for an API",
      "They are two names for the same token",
      "The ID token is always encrypted and the access token is not",
      "The ID token is for the client to learn the identity, the access token is for calling an API"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which claim in an ID token identifies the user at the provider?",
    "topic": "OpenID Connect",
    "choices": [
      "iss, the address of the client",
      "sub, the subject identifier",
      "aud, the password of the user",
      "exp, the name of the user"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What must a client verify in an ID token?",
    "topic": "OpenID Connect",
    "choices": [
      "Only that the token is a valid JSON document",
      "The signature, the issuer, the audience and the expiry",
      "Only that the token is shorter than a thousand characters in total",
      "Only that the token starts with the letters ey"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the nonce in an OpenID Connect request for?",
    "topic": "OpenID Connect",
    "choices": [
      "It encrypts the ID token with the key of the user",
      "It sets how long the user stays signed in",
      "It names the application at the provider",
      "It ties the ID token to the session of the client and prevents replay"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why should an app not use the email claim alone as the unique user id?",
    "topic": "OpenID Connect",
    "choices": [
      "Emails can change or be reused",
      "Emails are never included in tokens",
      "Emails are too short to be unique",
      "Providers refuse to return emails"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the discovery document of an OpenID provider?",
    "topic": "OpenID Connect",
    "choices": [
      "A PDF that explains the terms of service",
      "A log of the users who signed in recently",
      "A well known JSON document with the endpoints and keys of the provider",
      "A list of the apps that are banned by the provider"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does single sign on give users?",
    "topic": "OpenID Connect",
    "choices": [
      "One password that is the same for all websites",
      "A way to avoid using passwords in any form",
      "One login at a provider that gives access to several applications",
      "A single account shared by the whole company"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why is relying on a trusted identity provider often better than building a login system?",
    "topic": "OpenID Connect",
    "choices": [
      "The provider handles passwords, MFA and abuse protection that are easy to get wrong",
      "Providers never have outages or security incidents",
      "It removes the need for any authorization in the app",
      "It makes the app work without an internet connection"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is multi factor authentication?",
    "topic": "Multi-factor authentication",
    "choices": [
      "Using two passwords of the same kind in a row",
      "Logging in from two different devices at the same moment in time",
      "Asking the same security question twice",
      "Proving identity with two or more different kinds of factors"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which pair is an example of two different factors?",
    "topic": "Multi-factor authentication",
    "choices": [
      "A password and a security question that the user chose at registration",
      "A password and a code from an authenticator app",
      "Two different passwords",
      "A username and an email address"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why are SMS codes weaker than authenticator apps or security keys?",
    "topic": "Multi-factor authentication",
    "choices": [
      "SMS messages are always encrypted from end to end between the two phones",
      "Numbers can be hijacked with SIM swapping or intercepted",
      "Phones cannot read SMS codes",
      "SMS codes can only be used once a year"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How does a time based one time password work?",
    "topic": "Multi-factor authentication",
    "choices": [
      "The server sends the same code every day",
      "The user types a code that never changes",
      "The code is the hash of the password of the user",
      "Both sides derive a short code from a shared secret and the current time"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which factor type is most resistant to phishing?",
    "topic": "Multi-factor authentication",
    "choices": [
      "A hardware security key or passkey bound to the real site",
      "A code sent by email",
      "A code sent by SMS",
      "A secret question"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a passkey?",
    "topic": "Multi-factor authentication",
    "choices": [
      "A long password that the browser remembers",
      "A code that is printed on a card",
      "A credential based on public key cryptography, bound to a site and unlocked by the device",
      "A cookie that never expires"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why provide recovery codes for MFA?",
    "topic": "Multi-factor authentication",
    "choices": [
      "They let attackers skip the second factor",
      "They replace the password of the account",
      "Users can regain access if they lose the second factor, without weakening the process",
      "They are used to encrypt the account"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is MFA fatigue?",
    "topic": "Multi-factor authentication",
    "choices": [
      "Attackers send many approval prompts until a tired user accepts one",
      "Users forget the second factor after a long time",
      "The MFA server becomes slow under load",
      "The authenticator app drains the battery of the phone of the user"
    ],
    "answerIdx": 0
  },
  {
    "stem": "When should an app ask for step up authentication?",
    "topic": "Multi-factor authentication",
    "choices": [
      "On every single page view of the site",
      "Only at the time when the account is created",
      "Never, after the first login",
      "Before sensitive actions, such as changing the email or making a large payment"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a good rate limit idea for MFA code entry?",
    "topic": "Multi-factor authentication",
    "choices": [
      "Allow unlimited attempts because the code expires",
      "Limit the attempts and lock or slow down",
      "Allow attempts only from the home country",
      "Show the code to the user after three failures"
    ],
    "answerIdx": 1
  }
]
```

LAYER: security-dev-4

```json
[
  {
    "stem": "What is role based access control, or RBAC?",
    "topic": "RBAC vs ABAC vs ReBAC",
    "choices": [
      "Permissions are decided for each request by a long list of attributes of the user",
      "Permissions are granted by the owner of each single object in the system",
      "Permissions are assigned to roles, and users get access through the roles they have",
      "Every user receives all permissions until an administrator removes the ones they should not have"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is attribute based access control, or ABAC?",
    "topic": "RBAC vs ABAC vs ReBAC",
    "choices": [
      "Decisions use attributes of the user, the resource and the context, such as department or time",
      "Decisions use only the name of the role of the user, such as editor or admin",
      "Decisions are made by the owner of the file that is being accessed at the time",
      "Decisions are fixed in the database and never change after the account is created"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is relationship based access control, or ReBAC?",
    "topic": "RBAC vs ABAC vs ReBAC",
    "choices": [
      "Access depends on the network from which the request is sent to the server",
      "Access is given by the age of the account of the user in the system",
      "Access is granted to everyone who knows the url of the object that they want",
      "Access follows relationships between objects, such as owner of a folder, member of a team"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a downside of pure RBAC in large systems?",
    "topic": "RBAC vs ABAC vs ReBAC",
    "choices": [
      "Roles cannot be assigned to users, so every permission must be given directly to them",
      "Role explosion, with many special roles created to handle small differences",
      "It cannot express any kind of permission, so another model is always needed",
      "It needs no administration at all, so the roles never have to be reviewed"
    ],
    "answerIdx": 1
  },
  {
    "stem": "When is ABAC a better fit than RBAC?",
    "topic": "RBAC vs ABAC vs ReBAC",
    "choices": [
      "When there are only two kinds of users in the system and rules never change",
      "When rules depend on context, such as allow access only to documents of your own region",
      "When nobody needs to audit who can do what in the application",
      "When the system has no resources that need to be protected from users"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which model fits sharing a document with a specific person, like in a document editor?",
    "topic": "RBAC vs ABAC vs ReBAC",
    "choices": [
      "RBAC with one role for each document, created when the document is shared",
      "A single global admin role for all users, so that sharing is always possible",
      "No access control at all, because documents are shared by their own links",
      "ReBAC, since access follows the relation between the user and the document"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a permission in an RBAC system?",
    "topic": "RBAC vs ABAC vs ReBAC",
    "choices": [
      "A specific allowed action on a resource, such as read invoice",
      "A person who works in the company and is allowed to enter the building",
      "A password of a user that is stored in the directory of the system",
      "A network address from which the requests of a user are accepted"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is role inheritance?",
    "topic": "RBAC vs ABAC vs ReBAC",
    "choices": [
      "A user takes the password of the manager when they are promoted in the team",
      "A role is deleted when the last user leaves the team that used it",
      "A role gets the permissions of another role, such as admin including editor",
      "A role is copied to every new user who joins the company"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the risk of giving a user several roles with overlapping permissions?",
    "topic": "RBAC vs ABAC vs ReBAC",
    "choices": [
      "The user cannot log in any more, because the roles conflict with each other",
      "The roles stop working in the database when two of them share a permission",
      "The effective permissions can be larger than intended and hard to review",
      "The user will always be blocked, since the system cannot decide which role wins"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why is it useful to log access decisions?",
    "topic": "RBAC vs ABAC vs ReBAC",
    "choices": [
      "You can audit who accessed what and investigate misuse",
      "Logs make the access checks faster, because decisions are cached in the log file",
      "Logs remove the need for roles, since the history shows who may do what",
      "Logs prevent users from sharing passwords with each other in the company"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the principle of least privilege require for service accounts?",
    "topic": "Principle of least privilege",
    "choices": [
      "Give all services the same powerful account to keep the setup simple",
      "Share one account between the services of a team so that it is easy to rotate",
      "Use the account of a developer for the service so that it can be traced",
      "Give each service only the permissions that its task needs"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why are broad wildcard permissions in cloud roles risky?",
    "topic": "Principle of least privilege",
    "choices": [
      "Wildcards stop the role from being assigned to any user of the cloud account at all",
      "A leaked credential could access many resources, not only those that are needed",
      "Wildcards make the account expire after a short time without any warning",
      "Providers block all roles that use wildcards, so they never work in practice"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is privilege creep?",
    "topic": "Principle of least privilege",
    "choices": [
      "Permissions of users are removed automatically each week by the directory",
      "Users collect extra permissions over time as their duties change",
      "Servers slowly use more memory as more permissions are added to them",
      "Administrators forget their passwords because they have too many accounts"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How can privilege creep be reduced?",
    "topic": "Principle of least privilege",
    "choices": [
      "Give all users admin rights from the start so nobody needs to ask again",
      "Disable the logging of access, so that old permissions are not recorded",
      "Create more roles for every new project, so that each team has its own",
      "Review access regularly and remove permissions that are no longer needed"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is just in time access?",
    "topic": "Principle of least privilege",
    "choices": [
      "Elevated permissions are granted for a limited time when they are requested",
      "Permissions are granted a year before they are needed, to avoid long delays",
      "Access that is open to everyone during working hours of the company",
      "A backup account that is always active in case the main one fails"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why should administrators use separate accounts for daily work?",
    "topic": "Principle of least privilege",
    "choices": [
      "Admin accounts cannot read email, so they need a separate one for it",
      "It makes the daily account faster to log in to than the admin one",
      "If the daily account is compromised, the attacker does not get admin rights",
      "It is required by browsers, which refuse to open pages while signed in as an administrator"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does it mean to deny by default?",
    "topic": "Principle of least privilege",
    "choices": [
      "Access is allowed unless a rule forbids it, so only exceptions are written",
      "All access is allowed for logged in users until the end of the day",
      "Access is refused unless a rule explicitly allows it",
      "Access is decided by random choice when no rule matches a request"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why restrict database accounts used by an application?",
    "topic": "Principle of least privilege",
    "choices": [
      "A flaw in the app could then only do what that account is allowed to do",
      "Database accounts must be restricted by law in all countries",
      "Restricted accounts are faster at running the queries of the application",
      "Applications do not need any database account to read their data"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a good scope for an API key given to a partner?",
    "topic": "Principle of least privilege",
    "choices": [
      "Full access to the whole API forever, so that the partner is never blocked",
      "The same key that the internal team uses, to keep the setup simple",
      "Access to the database credentials, so the partner can check the data",
      "Only the endpoints and data that the partner needs, with an expiry"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why should access for departed employees be removed quickly?",
    "topic": "Principle of least privilege",
    "choices": [
      "Departed employees are not allowed to read mail by law, so accounts are closed",
      "Accounts that stay active can be misused, and nobody notices because the person has left",
      "Active accounts slow down the directory of the company as it grows",
      "Removing access is only done once a year during the annual audit"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is object level authorization?",
    "topic": "Object-level authorization",
    "choices": [
      "Checking that the user is signed in before any page loads",
      "Checking that the current user may access the specific record that is requested, not only the endpoint",
      "Checking that the endpoint url is spelled correctly",
      "Checking that the object has a valid format"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why is it not enough to check that a user is signed in before returning an invoice by id?",
    "topic": "Object-level authorization",
    "choices": [
      "Invoices are public documents that all users may read",
      "The id of an invoice is secret, so it cannot be guessed",
      "The database refuses to return an invoice without a login",
      "Any signed in user could request the invoice of another customer by changing the id"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Where should the ownership check be placed?",
    "topic": "Object-level authorization",
    "choices": [
      "On the server, in the code or query that loads the object, using the identity from the session",
      "In the browser, by hiding the links to other records",
      "In the url, by adding the user name to the path",
      "In the stylesheet of the page"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How can a query enforce ownership by design?",
    "topic": "Object-level authorization",
    "choices": [
      "Load the record first and compare it in the template",
      "Check the ownership only in the front end",
      "Include the user or tenant id in the where clause, such as where id equals the id and owner equals the session user",
      "Use a longer identifier for the record"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why take the user id from the session and not from the request body?",
    "topic": "Object-level authorization",
    "choices": [
      "The body is always encrypted",
      "The session is slower to read",
      "A client can send any id in the body, but the session is set by the server",
      "Request bodies cannot contain ids"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What status code is often returned when a user asks for an object that they may not see?",
    "topic": "Object-level authorization",
    "choices": [
      "404 or 403, chosen so that it does not leak whether the object exists",
      "200 with the full object",
      "500 with a stack trace",
      "301 to the login page"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What can go wrong with list endpoints?",
    "topic": "Object-level authorization",
    "choices": [
      "They return the records in the wrong colour",
      "They are too short to be useful",
      "They cannot be paginated",
      "They may return records of other users if the filter by owner is missing"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why test object level authorization with two accounts?",
    "topic": "Object-level authorization",
    "choices": [
      "Two accounts are needed to test the speed",
      "Using the id of one user while signed in as the other shows whether the check works",
      "It is the only way to test registration",
      "It reduces the number of tests"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a common mistake with nested resources such as /orders/5/items/9?",
    "topic": "Object-level authorization",
    "choices": [
      "Using too many slashes in the url",
      "Checking the order but not that item 9 belongs to that order",
      "Naming the items with numbers",
      "Returning json instead of xml"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which design reduces the chance of forgetting an ownership check?",
    "topic": "Object-level authorization",
    "choices": [
      "Copying the check into each handler by hand",
      "Relying on code review only",
      "Hiding the endpoints",
      "A shared data access layer or policy function that every handler uses"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a policy engine?",
    "topic": "Policy engines (OPA / Cedar)",
    "choices": [
      "A component that decides if a request is allowed, based on rules written separately from the code",
      "A tool that enforces password length for all of the accounts in a directory",
      "A server that hosts the policy documents of the company for the staff",
      "A firewall that blocks all traffic that is not on a short allow list"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is Open Policy Agent, or OPA?",
    "topic": "Policy engines (OPA / Cedar)",
    "choices": [
      "A tool that scans the code for vulnerabilities and reports them to developers",
      "A password manager for teams that stores secrets in an encrypted vault",
      "A general purpose policy engine that evaluates rules written in Rego",
      "A load balancer for web servers that spreads requests between instances"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is Cedar?",
    "topic": "Policy engines (OPA / Cedar)",
    "choices": [
      "A library for encrypting files with keys that are held in the cloud",
      "A web framework for Java that provides routing and templates",
      "An authorization policy language and engine for fine grained access control",
      "A scheduler of background jobs that runs tasks at fixed times"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why separate policy from application code?",
    "topic": "Policy engines (OPA / Cedar)",
    "choices": [
      "Rules can be reviewed, tested and changed without redeploying every service",
      "Code in many places gets faster this way, since rules run inside the services",
      "Applications cannot contain any rules, so they must be kept apart",
      "Policy engines replace authentication, so users no longer need to sign in"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the usual input of a policy decision?",
    "topic": "Policy engines (OPA / Cedar)",
    "choices": [
      "The source code of the application that is making the request",
      "The password of the user and the key of the application",
      "The list of all users of the system and their roles",
      "The subject, the action, the resource and the context"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a PDP and a PEP in authorization architecture?",
    "topic": "Policy engines (OPA / Cedar)",
    "choices": [
      "The PDP stores passwords and the PEP stores logs of the decisions",
      "The decision point decides, and the enforcement point applies the decision",
      "They are two names for the same component in different products",
      "The PEP decides and the PDP renders the pages for the users"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why is it useful to test policies with automated tests?",
    "topic": "Policy engines (OPA / Cedar)",
    "choices": [
      "Tests make policies run faster, because they compile the rules in advance",
      "A policy change can silently open access, and tests catch such regressions",
      "Policies cannot be changed once they have been tested and approved",
      "Tests remove the need for reviews, so changes can go straight to production"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a risk of leaving authorization checks to each developer in each handler?",
    "topic": "Policy engines (OPA / Cedar)",
    "choices": [
      "Handlers become too fast, so the checks run before the data is ready",
      "Developers cannot read the policy, so they ignore it in the code",
      "The code is no longer compiled, because policy is not part of the program",
      "Checks can be forgotten or implemented in different ways"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a deny overrides rule?",
    "topic": "Policy engines (OPA / Cedar)",
    "choices": [
      "If any matching rule denies, the final decision is deny",
      "The first allow always wins over all denies, whatever the order of the rules",
      "Every rule is ignored when a deny exists in another system of the company",
      "The decision is made by a vote of all of the users of the application"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why version and review policies like code?",
    "topic": "Policy engines (OPA / Cedar)",
    "choices": [
      "Versioning makes policies run in parallel on all of the servers at once",
      "Reviews are not needed for rules, since they are only configuration",
      "Changes have an author, a history and can be rolled back",
      "Policies cannot be stored in a repository, so they live in a database"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is multi tenancy?",
    "topic": "Multi-tenancy isolation",
    "choices": [
      "One user has several accounts in a system, such as work and personal",
      "One server runs several programming languages for different applications",
      "One system serves several customers, called tenants, whose data must be kept apart",
      "One company has several offices in different countries and time zones"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the biggest risk in a multi tenant application?",
    "topic": "Multi-tenancy isolation",
    "choices": [
      "One tenant gaining access to the data of another tenant",
      "The application using too many colours in the interface for each customer",
      "The database having too few tables to store the data of all tenants",
      "Users choosing weak usernames when they register to a tenant"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a common way to enforce tenant isolation in queries?",
    "topic": "Multi-tenancy isolation",
    "choices": [
      "Trust a tenant id sent in the url by the client, which saves a lookup",
      "Use a single shared account for all tenants to keep the code simple",
      "Hide the tenant name in the interface, so that users cannot see it",
      "Always filter by the tenant id taken from the session, not from user input"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does row level security do in a database?",
    "topic": "Multi-tenancy isolation",
    "choices": [
      "It encrypts every row with a different password that the user must supply",
      "The database filters rows based on policies, so queries only see allowed rows",
      "It limits the number of rows in a table to a fixed maximum",
      "It deletes rows when they are old, so that tables stay small"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What are the trade offs of a database per tenant compared with a shared schema?",
    "topic": "Multi-tenancy isolation",
    "choices": [
      "Weaker isolation and more cost, because each tenant needs its own server",
      "Stronger isolation and easier backups per tenant, but more cost and operations",
      "Less isolation, but fewer backups, since all tenants share one database",
      "No difference in any aspect, since both designs work the same way"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why can a cache be a tenant isolation risk?",
    "topic": "Multi-tenancy isolation",
    "choices": [
      "Caches always encrypt the data per tenant, so no mix up can happen",
      "Caches cannot store tenant data, because it is too large to keep in memory",
      "Caches are cleared on every request, so they never hold old data",
      "Keys that do not include the tenant can return the data of another tenant"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What can go wrong with background jobs in a multi tenant system?",
    "topic": "Multi-tenancy isolation",
    "choices": [
      "A job may run without the tenant context and touch the wrong data",
      "Jobs always run for one tenant only, so context is never an issue",
      "Jobs cannot read from the database, so they never touch tenant data",
      "Jobs are too slow to matter, so they are not included in isolation tests"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why test isolation with two tenants in automated tests?",
    "topic": "Multi-tenancy isolation",
    "choices": [
      "Two tenants are enough to test the performance of the whole system",
      "It is the only way to test the login page of an application",
      "It shows that one tenant cannot read or change the data of the other",
      "It reduces the size of the test code, since both use the same data"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the noisy neighbour problem?",
    "topic": "Multi-tenancy isolation",
    "choices": [
      "One tenant makes noise in the logs that other tenants have to read",
      "A tenant has the same name as another tenant and gets mixed up",
      "One tenant uses so many resources that others get a slower service",
      "Two tenants share a password and can sign in to each other"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How can resource limits help in a shared system?",
    "topic": "Multi-tenancy isolation",
    "choices": [
      "Quotas and rate limits stop one tenant from exhausting capacity",
      "Limits remove the need for isolation, since tenants cannot see each other",
      "Limits make all tenants equal in size, which keeps billing simple",
      "They increase the capacity of the server, so all tenants get more"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a missing function level access check?",
    "topic": "Common access-control bugs",
    "choices": [
      "A function that returns the wrong type of value when it is called",
      "A check that makes a function run slowly when many users call it",
      "A compiler warning about code that is never used in the application",
      "A user can call an admin endpoint because only the menu hides it"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is an insecure direct object reference, or IDOR?",
    "topic": "Common access-control bugs",
    "choices": [
      "Using a database index in a wrong way that slows down a query",
      "Changing an id in a request gives access to an object that belongs to someone else",
      "Referencing a file that does not exist in the storage of the server",
      "Calling a function with the wrong type of argument in a request"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why are random identifiers not a complete fix for IDOR?",
    "topic": "Common access-control bugs",
    "choices": [
      "Random ids are always short, so they can be guessed within a few tries",
      "They make guessing harder, but the server still must check ownership",
      "Random ids cannot be stored in a database column of normal size",
      "They stop the database from working when they are used as keys"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a horizontal privilege escalation?",
    "topic": "Common access-control bugs",
    "choices": [
      "Becoming an administrator of the system without being given the role",
      "Reading the logs of a server that the user has no access to",
      "Using a faster network than the one that the user is allowed to use",
      "Accessing data of another user with the same level of rights"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a vertical privilege escalation?",
    "topic": "Common access-control bugs",
    "choices": [
      "Gaining a higher level of rights than you should have, such as admin",
      "Accessing data of another user who has the same level of rights",
      "Moving files between folders that the user is not allowed to open",
      "Using more memory than the quota of the account allows"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why is client side hiding of buttons not access control?",
    "topic": "Common access-control bugs",
    "choices": [
      "Browsers block hidden buttons, so users cannot use the functions behind them",
      "Buttons are never sent to the server, so they cannot be abused",
      "The user can still send the request directly, so the server must check",
      "Hidden buttons run faster, which is why they are used for security"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is mass assignment, and why is it dangerous?",
    "topic": "Common access-control bugs",
    "choices": [
      "Assigning one task to many developers at once so it finishes faster",
      "Updating many rows with a single query in a database transaction",
      "Binding request fields to an object lets users set fields such as role or isAdmin",
      "Assigning many ids to one user so that they can read many records"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How can mass assignment be prevented?",
    "topic": "Common access-control bugs",
    "choices": [
      "Accept only an allow list of fields for each operation",
      "Accept all fields and remove the dangerous ones later in the code",
      "Hide the fields in the user interface so that nobody can edit them",
      "Rename the sensitive fields so that attackers cannot guess their names"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why check authorization on every request, even for internal calls?",
    "topic": "Common access-control bugs",
    "choices": [
      "Internal calls are always trusted, since they come from the same network",
      "Checks make internal calls faster, because they skip the extra lookups",
      "Authorization is required only on the first request of a session",
      "A compromised or buggy service must not be able to access everything"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a good way to find access control bugs?",
    "topic": "Common access-control bugs",
    "choices": [
      "Read only the documentation of the API and trust that it is accurate",
      "Test every endpoint with users of different roles and with other users ids",
      "Run the application on a faster server so that checks finish in time",
      "Count the number of endpoints and compare it with the previous release of the app"
    ],
    "answerIdx": 1
  }
]
```

LAYER: security-dev-5

```json
[
  {
    "stem": "What is a cryptographic hash function?",
    "topic": "Hashing & HMAC",
    "choices": [
      "A function that encrypts data with a key so that it can be decrypted later by the owner",
      "A function that compresses a file so that it takes up less space on the disk",
      "A function that maps any input to a fixed size output and is hard to reverse",
      "A function that generates a random key for each new user of the application"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which hash algorithms are considered broken for security uses such as signatures?",
    "topic": "Hashing & HMAC",
    "choices": [
      "MD5 and SHA 1, since collisions can be found",
      "SHA 256 and SHA 3, since they are too new to have been checked by researchers",
      "bcrypt and argon2, because they are too slow to be used in a real system",
      "HMAC and AES, since they are not hash functions and so are not safe"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is an HMAC?",
    "topic": "Hashing & HMAC",
    "choices": [
      "A hash that anyone can compute from the message without having any key",
      "A way to encrypt a message so that it can be read later by the receiver",
      "A certificate that proves who owns a domain name and who has issued it",
      "A hash based message authentication code made from a hash and a secret key"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does an HMAC prove?",
    "topic": "Hashing & HMAC",
    "choices": [
      "The message is secret from everyone who does not know the key that was used",
      "The message was not changed and was created by someone who knows the key",
      "The sender has a valid TLS certificate that was issued by a trusted authority",
      "The message was sent at a specific time and has not been delayed on the way"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why not use a plain hash such as SHA 256 of a secret plus a message as a signature?",
    "topic": "Hashing & HMAC",
    "choices": [
      "SHA 256 cannot be used with secrets, since it only works on public data",
      "Some hash designs allow length extension, so HMAC is the safe construction",
      "The result would be too long to send over a network in a single packet",
      "Plain hashes always contain the secret in clear text inside the output"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a collision in a hash function?",
    "topic": "Hashing & HMAC",
    "choices": [
      "The same input producing two different hashes when it is run on two machines",
      "A hash that is longer than the input that was used to compute it",
      "A hash function that has no output when the input is very short",
      "Two different inputs that produce the same hash"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the purpose of a salt in password hashing?",
    "topic": "Hashing & HMAC",
    "choices": [
      "It makes equal passwords produce different hashes and defeats precomputed tables",
      "It encrypts the hash so that it can be decrypted later by the server",
      "It makes the hash shorter to store in a database column of limited size",
      "It proves that the password that was chosen is long enough to be safe"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why use a slow hash such as argon2 for passwords?",
    "topic": "Hashing & HMAC",
    "choices": [
      "It makes logging in faster for the user, because the check is simple",
      "It allows the password to be recovered by the server if the user forgets it",
      "It makes each guess expensive for an attacker who steals the hashes",
      "It removes the need for salts, since each hash is already different"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What should be compared with a constant time comparison?",
    "topic": "Hashing & HMAC",
    "choices": [
      "Names of users in a list, since a name is a secret as well",
      "The size of two files, to see whether they contain the same text",
      "Secrets, such as HMAC values or tokens, to avoid timing leaks",
      "The dates of two records in a database, before they are merged"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How can hashes verify the integrity of a downloaded file?",
    "topic": "Hashing & HMAC",
    "choices": [
      "Compare its hash with a trusted published value",
      "Compare the size of the file only, since a changed file has a different size",
      "Open the file and read its first line to see whether it looks right",
      "Encrypt the file again with the same key and compare both results"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is symmetric encryption?",
    "topic": "Symmetric encryption (AES-GCM)",
    "choices": [
      "Two different keys are used, one public and one private, for the same data",
      "No key is used at all, only a hash of the message and a salt",
      "The key is derived from the public certificate of a website each time",
      "The same key is used to encrypt and to decrypt the data"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why is AES a common choice for encrypting data?",
    "topic": "Symmetric encryption (AES-GCM)",
    "choices": [
      "It is a hash function that cannot be reversed and so can protect any data",
      "It is a well studied standard that is fast and secure when used with the right mode",
      "It needs no key at all, since the algorithm is kept secret by the vendor",
      "It was designed for signing emails, and is rarely used for any other task"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does AES GCM provide besides secrecy?",
    "topic": "Symmetric encryption (AES-GCM)",
    "choices": [
      "A free certificate for the website that uses it to prove its identity",
      "Authentication of the data, so changes are detected",
      "Compression of the data, so that the encrypted result is smaller",
      "A way to share the key over an open network without any risk"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why is ECB mode a bad choice?",
    "topic": "Symmetric encryption (AES-GCM)",
    "choices": [
      "It is too slow for any practical use on modern hardware and large files",
      "It cannot encrypt more than one block of data with the same key",
      "It requires a public key to work, which makes it hard to deploy",
      "Equal blocks of plaintext give equal blocks of ciphertext, which leaks patterns"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is an initialization vector, or nonce, in encryption?",
    "topic": "Symmetric encryption (AES-GCM)",
    "choices": [
      "A value that makes each encryption unique, which must not be reused with the same key in GCM",
      "A secret password that protects the encryption key from being guessed",
      "A hash of the message that is added at the end of the data",
      "A list of the users who are allowed to read the encrypted data"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What can happen if a nonce is reused with the same key in AES GCM?",
    "topic": "Symmetric encryption (AES-GCM)",
    "choices": [
      "The message becomes smaller because repeated blocks are removed by the mode",
      "The key is replaced by a new one that the receiver has to learn",
      "An attacker may recover plaintext relations and forge messages",
      "The encryption becomes faster, since the cipher can reuse its state"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the main challenge of symmetric encryption between two parties?",
    "topic": "Symmetric encryption (AES-GCM)",
    "choices": [
      "Making the data short enough to fit into a single block of the cipher",
      "Finding a computer with enough memory to run the encryption routine",
      "Sharing the key securely without exposing it",
      "Keeping the algorithm secret so that attackers cannot study how it works"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why should you not invent your own encryption algorithm?",
    "topic": "Symmetric encryption (AES-GCM)",
    "choices": [
      "Secure designs need years of public review, and custom ones usually have flaws",
      "Governments forbid it by law in all countries of the world",
      "It is impossible to run custom code in a program on a modern system",
      "It always makes the encrypted data bigger than the original data"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does full disk encryption protect against?",
    "topic": "Symmetric encryption (AES-GCM)",
    "choices": [
      "Malware that runs on a device while it is turned on and unlocked",
      "Attacks over the network against the services that run on the machine",
      "Phishing emails that trick a user into giving away their password",
      "Data being read from a lost or stolen device that is turned off"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a key derivation function used for?",
    "topic": "Symmetric encryption (AES-GCM)",
    "choices": [
      "Encrypting a large file so that only the owner of the key can read it",
      "Turning a password or a secret into strong key material, slowly if needed",
      "Signing a certificate so that it can be trusted by a browser",
      "Compressing a key so that it fits into a small hardware device"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is asymmetric encryption?",
    "topic": "Asymmetric encryption & key exchange",
    "choices": [
      "One shared secret key that is used by both parties for every message",
      "A pair of keys, where the public key encrypts or verifies and the private key decrypts or signs",
      "A hash that can be reversed with a password that is stored with it",
      "A way of encoding data into text so that it can be sent in an email"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which key must be kept secret in a key pair?",
    "topic": "Asymmetric encryption & key exchange",
    "choices": [
      "The public key, since it identifies the owner of the pair",
      "Both of them, since anyone who has either one can read the data",
      "Neither of them, because keys are protected by the certificate authority",
      "The private key"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why is asymmetric encryption usually used to exchange a symmetric key and not to encrypt all data?",
    "topic": "Asymmetric encryption & key exchange",
    "choices": [
      "It is much slower, so the bulk data is encrypted with a symmetric cipher",
      "It cannot encrypt more than one letter, so long data has to be split",
      "It makes the message unreadable for the recipient, who has no key",
      "It does not need keys, so the process is not different from hashing"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is Diffie Hellman used for?",
    "topic": "Asymmetric encryption & key exchange",
    "choices": [
      "Hashing passwords before they are stored in a database of users",
      "Compressing messages so that they travel faster over a slow network",
      "Two parties agree on a shared secret over an open channel",
      "Signing certificates so that browsers trust them without a warning"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does forward secrecy give?",
    "topic": "Asymmetric encryption & key exchange",
    "choices": [
      "The server never needs a key, because every session has its own secret",
      "Future sessions are free of charge for customers who have paid before",
      "Past sessions stay secret even if a long term key is stolen later",
      "All messages are stored for later, so that they can be read by the owner"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which asymmetric algorithms are in common use today?",
    "topic": "Asymmetric encryption & key exchange",
    "choices": [
      "RSA and elliptic curve algorithms such as ECDSA and Ed25519",
      "AES and ChaCha20, which are used to encrypt large amounts of data",
      "MD5 and SHA 1, which are used to hash data and to sign messages",
      "bcrypt and scrypt, which are used to hash passwords for storage"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why are elliptic curve keys attractive?",
    "topic": "Asymmetric encryption & key exchange",
    "choices": [
      "They need no private key, since the public key is enough to decrypt",
      "They are immune to every attack in the future, including quantum ones",
      "They encrypt data faster than AES, so they are used for large files",
      "They give strong security with much shorter keys than RSA"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What happens if a private key is leaked?",
    "topic": "Asymmetric encryption & key exchange",
    "choices": [
      "Nothing, because the public key protects the data of the owner anyway",
      "Anyone can impersonate the owner or decrypt data, so the key must be replaced",
      "The public key stops working by itself and a new pair is created",
      "The data is deleted from the server that held the key pair"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why should keys be generated with a secure random source?",
    "topic": "Asymmetric encryption & key exchange",
    "choices": [
      "Random keys are shorter than other keys, so they are easier to store",
      "Predictable keys can be guessed by attackers",
      "Secure random sources are faster than the other sources of numbers",
      "Keys must look like words, so that people can remember them"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a key exchange protocol used in TLS for?",
    "topic": "Asymmetric encryption & key exchange",
    "choices": [
      "Storing the passwords of users in a form that cannot be read",
      "Compressing the web pages so that they are smaller to send",
      "Blocking attackers who try to connect from known bad addresses",
      "Creating fresh session keys for each connection"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does a digital signature provide?",
    "topic": "Digital signatures & certificates",
    "choices": [
      "Proof of who created the data and that it was not changed",
      "Secrecy of the message from all readers who do not have the key",
      "Compression of the message so that it is smaller to store",
      "A faster network connection between the sender and the receiver"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How is a signature created?",
    "topic": "Digital signatures & certificates",
    "choices": [
      "The sender encrypts the data with the public key of the receiver",
      "The receiver signs the data with the private key of the sender",
      "The sender signs a hash of the data with the private key",
      "The server hashes the password of the sender and stores the result"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How is a signature verified?",
    "topic": "Digital signatures & certificates",
    "choices": [
      "With the private key of the signer, which only the signer should have",
      "With the password of the receiver, which is checked by the server",
      "With the public key of the signer",
      "With a copy of the message that has been encrypted twice"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is an X.509 certificate?",
    "topic": "Digital signatures & certificates",
    "choices": [
      "A signed document that binds a public key to an identity, such as a domain name",
      "A password for a web server that is stored in a certificate store",
      "An encrypted copy of a database that is sent to a backup site",
      "A list of blocked websites that is kept by the browser"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a certificate authority?",
    "topic": "Digital signatures & certificates",
    "choices": [
      "A company that sells antivirus software and updates for it",
      "A server that stores the passwords of a website in an encrypted form",
      "A tool that generates random numbers for the keys of users",
      "A trusted party that signs certificates after checking identity or domain control"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a chain of trust?",
    "topic": "Digital signatures & certificates",
    "choices": [
      "A list of servers that share one password and trust each other",
      "A certificate is signed by an intermediate, which is signed by a root that the client trusts",
      "A chain of emails between two users who confirm each other",
      "A series of encrypted backups where each one protects the last"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why do certificates have an expiry date?",
    "topic": "Digital signatures & certificates",
    "choices": [
      "Browsers cannot read old certificates, so they have to be renewed often",
      "It limits the damage of a leaked key and forces regular checks",
      "The signature gets weaker every day and eventually stops working",
      "It saves storage on the server, because old certificates are deleted"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does certificate revocation do?",
    "topic": "Digital signatures & certificates",
    "choices": [
      "Extends the lifetime of a certificate so that it needs less renewal",
      "Copies a certificate to a new server so that it can be used there",
      "Changes the domain of a certificate to the one that the owner chooses",
      "Marks a certificate as no longer trusted before it expires"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is code signing used for?",
    "topic": "Digital signatures & certificates",
    "choices": [
      "Showing who published a program and that it was not altered",
      "Encrypting the program so that it cannot be run by other people",
      "Making a program run faster by marking it as trusted by the system",
      "Compressing a program so that it is smaller to download"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why verify the hostname of a certificate and not only its signature?",
    "topic": "Digital signatures & certificates",
    "choices": [
      "Hostnames are encrypted inside certificates, so they cannot be read",
      "Signatures can only be checked by hostnames, not by public keys",
      "A valid certificate for another site would otherwise be accepted",
      "Hostname checks speed up connections, so they are used for performance"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does TLS provide for a connection?",
    "topic": "TLS & the handshake",
    "choices": [
      "Only a faster connection, because the data is compressed before it is sent",
      "Only compression of the traffic, so that pages are smaller to send",
      "Encryption, integrity and authentication of the server, and optionally the client",
      "Only hiding of the IP address of the client from the server"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What happens in the TLS handshake?",
    "topic": "TLS & the handshake",
    "choices": [
      "The parties agree on a version and ciphers, authenticate and create shared session keys",
      "The client sends its password to the server, which stores it for later",
      "The server sends the whole website to the client in an encrypted form",
      "The client downloads the certificate of the router in its network"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which TLS versions should be used today?",
    "topic": "TLS & the handshake",
    "choices": [
      "SSL 2.0 and SSL 3.0, which were the first versions of the protocol",
      "TLS 1.0 only, because newer versions are not widely supported",
      "Any version, since all of them give the same level of security",
      "TLS 1.2 and TLS 1.3"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why is TLS 1.3 considered better than older versions?",
    "topic": "TLS & the handshake",
    "choices": [
      "It needs no certificates, since the keys are derived from the domain",
      "It removes weak options, is faster and gives forward secrecy by design",
      "It allows plain text fallback for old clients that cannot use encryption",
      "It works only on new computers, so old devices are blocked from it"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a downgrade attack?",
    "topic": "TLS & the handshake",
    "choices": [
      "An attacker lowers the speed of a server until it cannot answer",
      "An attacker forces the use of an older, weaker protocol or cipher",
      "An attacker deletes the certificate of a site to make it unavailable",
      "An attacker reduces the size of the key so that it is easier to break"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does HSTS do?",
    "topic": "TLS & the handshake",
    "choices": [
      "Blocks requests from other websites to the pages of the site",
      "Encrypts the cookies of the user so that scripts cannot read them",
      "Compresses the responses of the server to make them smaller",
      "Tells browsers to use HTTPS only for a site for a period of time"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is certificate pinning?",
    "topic": "TLS & the handshake",
    "choices": [
      "The client accepts only expected certificates or keys for a service",
      "The server prints the certificate on the page so that users can check it",
      "The certificate is stored in a cookie of the user for later visits",
      "The client trusts every certificate that a server presents to it"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does mutual TLS add?",
    "topic": "TLS & the handshake",
    "choices": [
      "The server hides its certificate so that attackers cannot copy it",
      "The data is sent twice, once with each of the two keys",
      "The client also presents a certificate, so both sides authenticate",
      "Browsers cache the certificate for a year, so it needs no check"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why is disabling certificate verification in code a serious problem?",
    "topic": "TLS & the handshake",
    "choices": [
      "It makes the connection slower, because the check is done once more",
      "It is blocked by the compiler, so the code would not build at all",
      "Anyone on the path can pretend to be the server and read or change data",
      "It only affects the log files, which will contain extra messages"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does an expired certificate cause for users?",
    "topic": "TLS & the handshake",
    "choices": [
      "Browsers show warnings or block access, and trust in the site drops",
      "Nothing, because certificates are only decorative on a website",
      "The site loads faster, since the browser skips the check of the key",
      "The passwords of users are reset by the browser for their safety"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why is key management often harder than choosing the algorithm?",
    "topic": "Key management & secrets",
    "choices": [
      "Algorithms change every week, so the keys have to be changed with them",
      "Keys are too long to type, so people make many mistakes",
      "Every key needs a new algorithm, so teams must pick a new one each time",
      "Keys must be generated, stored, rotated and revoked safely over their whole life"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a key management service or HSM for?",
    "topic": "Key management & secrets",
    "choices": [
      "Printing keys on paper so that they can be kept in a locked safe",
      "Storing keys in a protected place and performing operations without exposing the key",
      "Generating usernames for the services that need to use the keys",
      "Sending keys by email to the people who need them for their work"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is key rotation?",
    "topic": "Key management & secrets",
    "choices": [
      "Turning the key around in the lock of the door to the server room",
      "Replacing a key by a new one on a schedule or after a suspected leak",
      "Copying a key to many servers so that every machine has the same one",
      "Making a key shorter so that it can be used with older software"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why should keys and secrets never be committed to source control?",
    "topic": "Key management & secrets",
    "choices": [
      "Repositories cannot store text files that contain long random strings",
      "They make the repository too large to be cloned quickly by others",
      "Git encrypts them wrongly, so they cannot be used after a clone",
      "Anyone with access to the repository or its history can read them"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is envelope encryption?",
    "topic": "Key management & secrets",
    "choices": [
      "Data is encrypted with a data key, and that key is encrypted with a master key",
      "A message is put into a paper envelope so that it can be mailed",
      "Data is encrypted twice with the same key to double the protection",
      "The envelope is a type of certificate that is used by the browser"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why separate the keys of different environments or purposes?",
    "topic": "Key management & secrets",
    "choices": [
      "Separate keys are faster, because each service has fewer keys to search",
      "Keys can be shared safely this way, since each group has its own copy",
      "A leak in one place does not expose everything else",
      "The compiler needs separate keys for every environment it builds"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What should happen to a secret that has been leaked?",
    "topic": "Key management & secrets",
    "choices": [
      "Hide the repository from others and hope that nobody has copied it",
      "Wait and see whether the secret is used before any action is taken",
      "Revoke and rotate it at once, then find how it leaked",
      "Change the name of the secret in the settings and keep the value"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How should an application receive its secrets at run time?",
    "topic": "Key management & secrets",
    "choices": [
      "From a secrets manager or the environment of the platform, with limited access",
      "From a text file in the public folder of the website for easy access",
      "From a url parameter of each request that the service receives",
      "From a comment in the code that the build tool removes at deploy"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why log access to keys and secrets?",
    "topic": "Key management & secrets",
    "choices": [
      "Logs make the keys longer, which makes them harder to guess",
      "Logs are needed to decrypt data that was protected with the key",
      "Logs replace rotation, since old keys can be found again from them",
      "Unusual use can show a compromise and supports audits"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does least privilege mean for a key?",
    "topic": "Key management & secrets",
    "choices": [
      "All services can use all keys, which keeps the setup simple for the team",
      "Each service can use only the keys and operations it needs",
      "Keys are given to the largest team, which manages them for the others",
      "Keys are shown to users so that they can check that data is safe"
    ],
    "answerIdx": 1
  }
]
```

LAYER: security-dev-6

```json
[
  {
    "stem": "What is the goal of input sanitisation and validation?",
    "topic": "Input validation & allow-lists",
    "choices": [
      "To make the input longer so that it is harder to guess for attackers",
      "To encrypt the input before it is saved to the database of the app",
      "To make sure user input has the expected form before it is used",
      "To compress the input so that it takes less space in the request"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is SQL or NoSQL injection?",
    "topic": "Input validation & allow-lists",
    "choices": [
      "An attack where input changes the meaning of a database query",
      "An attack that fills the disk of the server with very large files",
      "An attack on the DNS server that redirects visitors to a wrong address",
      "An attack that reads the cookies of a user from another website"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How can a request body like { \"email\": { \"$ne\": null } } cause a problem in a MongoDB query?",
    "topic": "Input validation & allow-lists",
    "choices": [
      "It makes the request larger, which can slow the server down a little",
      "It encrypts the filter so that the database cannot read it correctly",
      "It creates a new collection with the name of the operator in the body",
      "The object is read as an operator"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is cross site scripting?",
    "topic": "Input validation & allow-lists",
    "choices": [
      "An attack on the password file of the server that reads stored hashes",
      "An attack that makes the browser run attacker script in the context of your site",
      "An attack that blocks the network of the server with a very large number of requests",
      "An attack on the DNS records so that visitors reach another server"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which practice helps prevent cross site scripting in React?",
    "topic": "Input validation & allow-lists",
    "choices": [
      "Turning off JSX in the build settings so that no markup is generated",
      "Rendering data as text and avoiding dangerouslySetInnerHTML with untrusted content",
      "Using only class components, because they escape their output in a stricter way",
      "Putting scripts in the url so that the browser can check them first"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the purpose of rate limiting on a login route?",
    "topic": "Input validation & allow-lists",
    "choices": [
      "To make the page load faster for each of the logged in users",
      "To encrypt the traffic that is sent to the login route of the API",
      "To log every user out after a fixed number of minutes in the app",
      "To slow brute force guessing of passwords"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the helmet package do in Express?",
    "topic": "Input validation & allow-lists",
    "choices": [
      "Sets several security related HTTP headers",
      "Encrypts the database so that stored documents cannot be read",
      "Hashes the passwords of users before they reach the controller",
      "Parses the JSON bodies of requests that the server receives"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which item is on the OWASP Top 10 list of common risks?",
    "topic": "Input validation & allow-lists",
    "choices": [
      "Slow images that are served without any compression applied",
      "Large bundles that take a long time to download on slow phones",
      "Broken access control",
      "Missing comments in the source code of the application"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why should error messages sent to clients avoid stack traces?",
    "topic": "Input validation & allow-lists",
    "choices": [
      "They are too short to be useful to the developers who need to read them",
      "They are not valid JSON, so clients are not able to parse them",
      "They can reveal internal paths and library versions to attackers",
      "They slow the response down because the stack has to be built"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the principle of least privilege?",
    "topic": "Input validation & allow-lists",
    "choices": [
      "Give each user and service only the access it needs",
      "Give every user admin rights so that nobody is blocked from working",
      "Give every service the same key so that it is easier to manage",
      "Remove all access after one day so that stale accounts do not remain"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is output encoding?",
    "topic": "Output encoding & escaping",
    "choices": [
      "Compressing the output so that pages load faster",
      "Encrypting the response so that only the user can read it",
      "Changing the language of the output for the visitor",
      "Converting special characters to a safe form for the place where data is shown"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why must encoding match the output context?",
    "topic": "Output encoding & escaping",
    "choices": [
      "All contexts use exactly the same rules",
      "HTML text, attributes, urls and scripts each have different dangerous characters",
      "Encoding is only needed for numbers",
      "Browsers choose the context by themselves"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which encoding is correct for placing a value inside an HTML text node?",
    "topic": "Output encoding & escaping",
    "choices": [
      "URL encoding with percent signs",
      "HTML entity encoding, such as turning the less than sign into an entity",
      "Base64 encoding of the whole value",
      "No encoding, since text is safe"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which encoding fits a value placed into a url query parameter?",
    "topic": "Output encoding & escaping",
    "choices": [
      "HTML entity encoding only, which is the standard for all contexts",
      "Removing all vowels",
      "Converting to upper case",
      "Percent encoding of reserved characters"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does a templating engine with auto escaping do by default?",
    "topic": "Output encoding & escaping",
    "choices": [
      "It encodes variables for HTML",
      "It removes all templates from the page",
      "It stores the variables in a database",
      "It hides the variables from the developer"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why is disabling auto escaping for convenience risky?",
    "topic": "Output encoding & escaping",
    "choices": [
      "It makes the page slower to render",
      "It removes the need for validation",
      "Any variable that holds user data can inject markup or script",
      "It changes the fonts of the page"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Is validating input a replacement for output encoding?",
    "topic": "Output encoding & escaping",
    "choices": [
      "Yes, valid input is always safe in every output",
      "Yes, but only for numbers",
      "No, validation reduces bad data",
      "No, because encoding is only for the database"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a risk of building a shell command from user input?",
    "topic": "Output encoding & escaping",
    "choices": [
      "The input can add commands",
      "The command runs more slowly",
      "The shell cannot start",
      "The input will be converted to upper case"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a safer way to call a program with user supplied values?",
    "topic": "Output encoding & escaping",
    "choices": [
      "Concatenate the values into a command string",
      "Write the values to a file and run it",
      "Ask the user to type the full command",
      "Pass arguments as an array to an API that does not use a shell"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why should the content type and charset of a response be set correctly?",
    "topic": "Output encoding & escaping",
    "choices": [
      "Charsets make files smaller",
      "Browsers may otherwise guess the type and treat data as script",
      "Content types are only for images",
      "Responses are not sent without them"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does a parameterized query do?",
    "topic": "Parameterized queries",
    "choices": [
      "Runs the query faster by caching the result",
      "Sends the SQL and the values separately",
      "Encrypts the values of the query",
      "Stores the query in a view"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why does string concatenation of user input into SQL cause SQL injection?",
    "topic": "Parameterized queries",
    "choices": [
      "The query becomes too long for the database",
      "The database rejects all strings",
      "The input is converted to numbers",
      "Input can change the structure of the query that the database runs"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Does escaping quotes by hand give the same protection as parameters?",
    "topic": "Parameterized queries",
    "choices": [
      "No, it is easy to get wrong and misses cases such as encodings",
      "Yes, escaping is always enough for every database and every character set",
      "Yes, but only for numbers",
      "No, because quotes are not special in SQL"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Can table or column names be parameters in a prepared statement?",
    "topic": "Parameterized queries",
    "choices": [
      "Yes, they work like values",
      "Yes, but only in some languages",
      "No, identifiers must come from a fixed allow list",
      "No, because names are secret"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Do ORMs make SQL injection impossible?",
    "topic": "Parameterized queries",
    "choices": [
      "Yes, because ORMs never send SQL",
      "Yes, but only with TypeScript",
      "No, raw query features and string building can still be vulnerable",
      "No, because ORMs run on the client"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a good way to let users choose a sort column?",
    "topic": "Parameterized queries",
    "choices": [
      "Map the input to a fixed list of allowed column names",
      "Insert the input directly into ORDER BY",
      "Escape the input with a regular expression that removes quotes",
      "Let the database guess the column"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which account setting limits the damage of an injection?",
    "topic": "Parameterized queries",
    "choices": [
      "A database user with superuser rights, which is convenient for the developers",
      "A database user shared with the developers",
      "A database without any user",
      "A database user with the fewest permissions that the app needs"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why do NoSQL databases still need injection protection?",
    "topic": "Parameterized queries",
    "choices": [
      "NoSQL databases have no queries",
      "Operators in user input, such as a query object, can change the meaning of a filter",
      "NoSQL data is always encrypted",
      "Injection works only in SQL"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What should an error from the database never show to the user?",
    "topic": "Parameterized queries",
    "choices": [
      "A generic message",
      "The raw error and the query text",
      "A request id",
      "The status code"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why use stored procedures only with care?",
    "topic": "Parameterized queries",
    "choices": [
      "They are always safe in every design",
      "They cannot take any parameters",
      "They are slower than every query",
      "They help only if they use parameters inside and do not build SQL strings"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the NEXT_PUBLIC prefix do for an environment variable?",
    "topic": "Secrets management",
    "choices": [
      "Includes it in the browser bundle, so it is visible to everyone",
      "Makes it available only to server components and route handlers",
      "Encrypts the value before it is added to the bundle",
      "Hides it from the build logs of the host"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which variables must never use the NEXT_PUBLIC prefix?",
    "topic": "Secrets management",
    "choices": [
      "Values such as the public name of the site and its language",
      "Public analytics ids and publishable keys",
      "Secrets such as private keys and database passwords",
      "The url of the home page of the site"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Where should secrets live in development?",
    "topic": "Secrets management",
    "choices": [
      "In a file named secrets.txt in the public folder",
      "In the source code, next to the function that uses them",
      "In a local .env file that is ignored by git",
      "In the readme, so the whole team can find them"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why commit a .env.example file?",
    "topic": "Secrets management",
    "choices": [
      "It documents the names of the variables without any real values",
      "It lets the application start without any real configuration being present",
      "It is required by Next.js in order to load all of the other env files",
      "It stores a backup copy of the real secrets for the members of the team"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What should you do if a secret was committed to git?",
    "topic": "Secrets management",
    "choices": [
      "Delete the commit and keep using the same secret",
      "Rename the repository so that the secret cannot be found by search",
      "Add the file to gitignore and keep the secret",
      "Rotate it, since deleting the commit does not undo the exposure"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Where do you set secrets for a deployed Next.js app?",
    "topic": "Secrets management",
    "choices": [
      "In a file that is committed to the main branch of the repository",
      "In the settings of the hosting platform, per environment",
      "In the browser, through the developer tools",
      "In the url of the deployed site"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why use different secrets for preview and production?",
    "topic": "Secrets management",
    "choices": [
      "Production secrets cannot be used in preview builds because of platform rules",
      "A leak or a mistake in preview cannot affect real customers",
      "Preview builds are not allowed to read any variable",
      "The host rotates the secrets every time you deploy"
    ],
    "answerIdx": 1
  },
  {
    "stem": "When is an environment variable read at build time versus runtime?",
    "topic": "Secrets management",
    "choices": [
      "It is always read at build time and is never read a second time",
      "It is always read at runtime, every time that a user visits",
      "It is read only once, at the moment when the repository is first cloned",
      "It depends on whether the code runs while building or while serving requests"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How can you fail fast when a required variable is missing?",
    "topic": "Secrets management",
    "choices": [
      "Validate the environment at startup and throw a clear error",
      "Use an empty string and let the code carry on running without the variable",
      "Catch every error that happens in the app and ignore all of them silently",
      "Add the variable to the public bundle so that it is available as a fallback"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the principle of least privilege for API keys?",
    "topic": "Secrets management",
    "choices": [
      "Give each key every permission that exists so that nothing is ever blocked",
      "Share one single key between all of the services to keep the setup simple",
      "Give each key only the permissions it needs, and nothing more",
      "Remove the permissions from a key after it has been used for one request"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does secure by default mean?",
    "topic": "Secure defaults & error handling",
    "choices": [
      "Security options are off until the user turns them on in the settings",
      "Defaults are chosen to be as simple as possible",
      "The safest settings are active unless someone chooses otherwise",
      "Defaults are hidden from administrators"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why is it important that errors fail safely?",
    "topic": "Secure defaults & error handling",
    "choices": [
      "A failure should not leave the system in an open state or reveal secrets",
      "Failures should open the system to keep users happy",
      "Errors should be ignored so the program continues",
      "Failures should be reported to the user with all details"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What should an error page show to end users?",
    "topic": "Secure defaults & error handling",
    "choices": [
      "The stack trace together with the version of the framework in use",
      "The database query that failed",
      "The environment variables",
      "A short generic message and perhaps a reference id"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Where should detailed errors be recorded?",
    "topic": "Secure defaults & error handling",
    "choices": [
      "In the browser console of the user",
      "In server side logs, with care not to include secrets",
      "In the url of the next page",
      "In a public file"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a danger of catching an exception and continuing silently?",
    "topic": "Secure defaults & error handling",
    "choices": [
      "The program becomes more secure",
      "The program may skip a security check and act on invalid state",
      "The exception is shown twice",
      "The log file grows"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why should authorization failures return the same response for missing and forbidden objects in some cases?",
    "topic": "Secure defaults & error handling",
    "choices": [
      "The same response is faster",
      "Different answers are not allowed by the HTTP standard in any case",
      "It makes the code shorter",
      "Different answers can reveal which objects exist"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why use allow lists instead of block lists for input?",
    "topic": "Secure defaults & error handling",
    "choices": [
      "Block lists miss new variants",
      "Allow lists are longer to write, so they are safer",
      "Block lists are required by law",
      "Allow lists are only for numbers"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a secure default for a new cookie?",
    "topic": "Secure defaults & error handling",
    "choices": [
      "No flags, so it works everywhere",
      "Readable by scripts, which is convenient for the front end developers",
      "HttpOnly, Secure and a restrictive SameSite value",
      "Valid for ten years"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why should new accounts and tokens get minimal permissions?",
    "topic": "Secure defaults & error handling",
    "choices": [
      "Minimal rights make the signup of new accounts faster for users",
      "Tokens cannot hold permissions",
      "Extra rights can be added when needed",
      "It is required by browsers"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does it mean to deny access when a check cannot be completed?",
    "topic": "Secure defaults & error handling",
    "choices": [
      "If the policy service is down or errors, the request is refused",
      "The request is allowed so users are not blocked",
      "The request is queued for ever",
      "The check is skipped"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a software supply chain attack?",
    "topic": "Dependency & supply-chain hygiene",
    "choices": [
      "An attacker steals physical goods in transit",
      "An attacker floods a shipping company website",
      "An attacker copies the source of a competitor",
      "An attacker compromises a dependency or build step so that malicious code reaches many users"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why are transitive dependencies a risk?",
    "topic": "Dependency & supply-chain hygiene",
    "choices": [
      "They are always safer than direct ones",
      "A package you never chose can still run code in your app",
      "They cannot have vulnerabilities",
      "They are not installed in production"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does a lock file do for security and reproducibility?",
    "topic": "Dependency & supply-chain hygiene",
    "choices": [
      "It encrypts the dependencies",
      "It pins the exact versions that were installed",
      "It removes unused packages",
      "It makes the packages download more slowly because they are checked"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is typosquatting?",
    "topic": "Dependency & supply-chain hygiene",
    "choices": [
      "A spelling mistake in a comment",
      "A website with an expired certificate",
      "A password with a typo",
      "A malicious package with a name close to a popular one"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why check a package before adding it?",
    "topic": "Dependency & supply-chain hygiene",
    "choices": [
      "Its maintenance, popularity and permissions can show whether it is trustworthy",
      "Packages are always reviewed by the registry",
      "The package manager blocks all risky packages",
      "Small packages are never malicious"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does software composition analysis do?",
    "topic": "Dependency & supply-chain hygiene",
    "choices": [
      "It rewrites your code to use fewer packages",
      "It tests the speed of the application",
      "It scans dependencies for known vulnerabilities and licenses",
      "It encrypts the dependency folder"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why keep dependencies updated regularly?",
    "topic": "Dependency & supply-chain hygiene",
    "choices": [
      "Updates always make the program faster",
      "Old versions are removed from the registry",
      "Fixes for known vulnerabilities are released in new versions",
      "Updates are required by the compiler"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a software bill of materials?",
    "topic": "Dependency & supply-chain hygiene",
    "choices": [
      "A list of the components and versions that are inside a piece of software",
      "An invoice for software licenses",
      "A list of employees who wrote the code",
      "A document that shows the price of a product"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why avoid running install scripts of unknown packages in CI with access to secrets?",
    "topic": "Dependency & supply-chain hygiene",
    "choices": [
      "Scripts make the build slower",
      "Scripts are not supported in CI",
      "Secrets cannot be read by scripts",
      "A malicious script could read tokens and send them out"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a good practice for build and release pipelines?",
    "topic": "Dependency & supply-chain hygiene",
    "choices": [
      "Give the pipeline admin rights for everything",
      "Use least privilege tokens, protected branches and verified, reproducible builds",
      "Let anyone change the pipeline without review",
      "Store secrets in the pipeline logs"
    ],
    "answerIdx": 1
  }
]
```

LAYER: security-dev-7

```json
[
  {
    "stem": "What does a DNS A record do?",
    "topic": "HTTPS & certificate management",
    "choices": [
      "Maps a domain name to the name of another domain",
      "Stores the text that proves who owns the domain",
      "Maps a domain name to an IPv4 address",
      "Redirects visitors from http to https automatically"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does a CNAME record do?",
    "topic": "HTTPS & certificate management",
    "choices": [
      "Points a name, such as www, to another domain name",
      "Points a domain to an email server for incoming mail",
      "Stores the certificate of the website for visitors",
      "Maps a domain to a physical address"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why do you need HTTPS on a production site?",
    "topic": "HTTPS & certificate management",
    "choices": [
      "It makes pages load faster because the files are compressed more strongly in transit",
      "It hides the url of the page from the browser history of the visitor",
      "It allows the site to be indexed by search engines, and by nobody else",
      "It encrypts the traffic and lets the browser verify the identity of the server"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does a TLS certificate prove?",
    "topic": "HTTPS & certificate management",
    "choices": [
      "That the code of the website contains no bugs and no security problems at all",
      "That the server controls the domain, as confirmed by a certificate authority",
      "That the owner of the site has paid for a plan on the hosting platform",
      "That every visitor of the site is using a modern and updated browser"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What do platforms like Vercel usually do about certificates?",
    "topic": "HTTPS & certificate management",
    "choices": [
      "Ask you to buy a certificate and install it on the server by hand",
      "Issue and renew them automatically for your custom domain",
      "Disable HTTPS for custom domains until a paid plan is chosen",
      "Copy the certificate from the repository of the project"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What can DNS propagation delay cause after you change a record?",
    "topic": "HTTPS & certificate management",
    "choices": [
      "The old records are removed from every server worldwide at the same instant",
      "The site becomes unavailable for a full day for all of the users",
      "The certificate of the domain is revoked by the authority",
      "Some visitors still reach the old address until cached records expire"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the purpose of redirecting http to https?",
    "topic": "HTTPS & certificate management",
    "choices": [
      "Make sure visitors always use the encrypted connection",
      "Make the site appear in search results at a higher position",
      "Remove the need for a certificate on the server",
      "Hide the real domain name from the visitor"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does HSTS tell the browser?",
    "topic": "HTTPS & certificate management",
    "choices": [
      "Never keep a cached copy of the pages of this site on the device",
      "Block every request to the site that comes from another domain",
      "Always use HTTPS for this site for a given period of time",
      "Load the site only from a local copy that is kept on the device"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which setting do you add to a domain to point it at a hosting platform?",
    "topic": "HTTPS & certificate management",
    "choices": [
      "A new line that is added to the package.json file of the project",
      "A header that is added to the response of the API of the project",
      "A DNS record created at the domain registrar or DNS provider",
      "A rule that is added to the Dockerfile of the application"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What should you check first if a custom domain shows a certificate warning?",
    "topic": "HTTPS & certificate management",
    "choices": [
      "Whether the domain points at the host and the certificate was issued for that name",
      "Whether the browser has a newer version of the JavaScript engine installed",
      "Whether the database of the application is up and running correctly",
      "Whether the front end code uses the latest version of React"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is CORS?",
    "topic": "CORS done right",
    "choices": [
      "A server setting that encrypts the traffic between two different origins on the web",
      "A tool that compresses the responses before they reach the browser",
      "A database permission system that limits who may read documents",
      "A browser rule that decides if a page may read a response from another origin"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What counts as a different origin?",
    "topic": "CORS done right",
    "choices": [
      "A different path on the same host",
      "A different scheme, host or port",
      "A different query string",
      "A different hash fragment"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which response header allows a specific origin to read the response?",
    "topic": "CORS done right",
    "choices": [
      "Content-Security-Policy",
      "Access-Control-Allow-Origin",
      "X-Frame-Options",
      "Strict-Transport-Security"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a preflight request?",
    "topic": "CORS done right",
    "choices": [
      "A request that loads the page faster by fetching its resources early",
      "A request that checks the SSL certificate of the server before the page loads",
      "A request that the server sends to the browser to see if it is online",
      "An OPTIONS request that the browser sends first to ask for permission"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why is Access-Control-Allow-Origin set to the asterisk unsafe with credentials?",
    "topic": "CORS done right",
    "choices": [
      "Browsers refuse the wildcard with cookies, and it would let any site call the API",
      "It slows down the response because every origin has to be checked on each request",
      "It removes the cookie from the request before the server can read it",
      "It only works in Firefox, while other browsers ignore the header completely"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Does CORS protect the server from receiving requests?",
    "topic": "CORS done right",
    "choices": [
      "Yes, it blocks every unwanted request before it reaches the server",
      "Yes, it stops attackers from sending requests that carry their own scripts",
      "No, it only controls whether the browser lets a page read the response",
      "It protects only the database and has no effect on the HTTP layer"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which Express package is commonly used to set CORS headers?",
    "topic": "CORS done right",
    "choices": [
      "helmet",
      "morgan",
      "cors",
      "dotenv"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the Access-Control-Allow-Credentials header do?",
    "topic": "CORS done right",
    "choices": [
      "Allows the browser to include cookies in cross origin requests",
      "Gives the user a login token that the browser stores for later requests",
      "Hides the response from the page unless the user is logged in as an admin",
      "Encrypts the cookies so that scripts on the page cannot read their values"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why does a request made with curl not show CORS errors?",
    "topic": "CORS done right",
    "choices": [
      "curl does not use the HTTP protocol that browsers use for pages",
      "The server turns CORS off for every client that is named curl",
      "curl is faster than a browser, so it finishes before CORS applies",
      "CORS is enforced by browsers and not by other clients"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which setting should a production API use for allowed origins?",
    "topic": "CORS done right",
    "choices": [
      "The wildcard, so that every origin may call the API in the same way",
      "A list of the exact front end origins",
      "Only localhost, so the API cannot be used from any real domain",
      "No origin at all, so the API answers requests from servers only"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the Content Security Policy header control?",
    "topic": "Security headers & CSP",
    "choices": [
      "Which users are allowed to sign in to the application",
      "Which sources of scripts, styles and other content the browser may load for the page",
      "How long cookies are kept in the browser of a visitor",
      "Which methods the server accepts for each url"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why does a strict CSP reduce the impact of XSS?",
    "topic": "Security headers & CSP",
    "choices": [
      "It removes all user input from the page",
      "It encrypts the cookies of the user",
      "It prevents the server from sending any script",
      "Injected inline scripts and scripts from unknown sources are blocked by the browser"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the X-Content-Type-Options nosniff header do?",
    "topic": "Security headers & CSP",
    "choices": [
      "Stops the browser from guessing another content type for a response",
      "Hides the version of the server from visitors",
      "Stops the response from being cached",
      "Encrypts the type of files that are served"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does X-Frame-Options or frame-ancestors help to prevent?",
    "topic": "Security headers & CSP",
    "choices": [
      "Cross site request forgery with cookies",
      "SQL injection in forms",
      "Clickjacking, where a site is embedded in a frame to trick clicks",
      "Brute force attacks on logins"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does Strict-Transport-Security do?",
    "topic": "Security headers & CSP",
    "choices": [
      "Blocks requests from other websites",
      "Compresses all responses",
      "Tells browsers to use HTTPS only for the site for a period of time",
      "Hides the IP address of the server"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the Referrer-Policy header control?",
    "topic": "Security headers & CSP",
    "choices": [
      "How much of the url is sent to other sites in the Referer header",
      "Which sites may link to your pages",
      "The language of the pages",
      "The speed of redirects"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why is a CSP that allows unsafe inline scripts weak?",
    "topic": "Security headers & CSP",
    "choices": [
      "It makes pages load faster",
      "It blocks every script on the site",
      "It is not supported by browsers",
      "It permits the same injected scripts that the policy should block"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a CSP report only mode for?",
    "topic": "Security headers & CSP",
    "choices": [
      "Hiding the policy from users",
      "Testing a policy and collecting violations without blocking content",
      "Reporting the speed of pages",
      "Blocking all requests"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which tool helps to set many security headers in Express?",
    "topic": "Security headers & CSP",
    "choices": [
      "dotenv",
      "helmet",
      "morgan",
      "cors only"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why should security headers be tested after each deploy?",
    "topic": "Security headers & CSP",
    "choices": [
      "Headers are removed by browsers after a day, so they must be set again",
      "Headers are required only in development",
      "Testing headers makes them stronger",
      "A proxy or a framework change can remove or alter them"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is rate limiting?",
    "topic": "Rate limiting & throttling",
    "choices": [
      "Restricting how many requests a client may make in a period of time",
      "Making every response slower on purpose",
      "Limiting the size of the database",
      "Compressing requests"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why rate limit a login endpoint more strictly than other endpoints?",
    "topic": "Rate limiting & throttling",
    "choices": [
      "Login pages are the slowest pages",
      "Users prefer slow logins",
      "It slows down password guessing and credential stuffing",
      "Logins are cheaper for the server than other requests, so limits can be higher"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which status code tells a client that it has been rate limited?",
    "topic": "Rate limiting & throttling",
    "choices": [
      "404 Not Found",
      "301 Moved Permanently",
      "429 Too Many Requests",
      "503 Service Unavailable only"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the token bucket algorithm?",
    "topic": "Rate limiting & throttling",
    "choices": [
      "Tokens are added over time, and each request spends one",
      "A bucket of passwords for users",
      "A list of tokens that never expires and is stored on the client for later",
      "A method to encrypt tokens"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a risk of limiting only by IP address?",
    "topic": "Rate limiting & throttling",
    "choices": [
      "IP addresses are always unique to one person, so limits by address are exact",
      "Limits by IP are not possible",
      "IP limits stop all attacks",
      "Many users can share one IP, and attackers can use many IPs"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Where should counters live when an app runs on several instances?",
    "topic": "Rate limiting & throttling",
    "choices": [
      "In the memory of each instance separately",
      "In a shared store such as Redis",
      "In the browser of the client",
      "In a text file next to the code"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does a Retry-After header tell the client?",
    "topic": "Rate limiting & throttling",
    "choices": [
      "When the certificate of the server expires and has to be renewed by the owner",
      "How long to wait before trying again",
      "Which server to use next",
      "How large the response is"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why combine rate limits with account lockout carefully?",
    "topic": "Rate limiting & throttling",
    "choices": [
      "Lockout never affects real users",
      "Lockout is required for every system",
      "Rate limits already lock all accounts, so there is no extra risk for users",
      "Attackers can lock real users out on purpose"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is credential stuffing?",
    "topic": "Rate limiting & throttling",
    "choices": [
      "Trying leaked username and password pairs from other sites against your login",
      "Guessing passwords one letter at a time",
      "Stuffing a database with fake users",
      "Encrypting credentials twice"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What other control helps against credential stuffing?",
    "topic": "Rate limiting & throttling",
    "choices": [
      "A longer title on the login page",
      "Hiding the login url",
      "Multi factor authentication and checks against known leaked passwords",
      "A bigger server"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is an API key?",
    "topic": "API authentication & keys",
    "choices": [
      "A password for a human user",
      "An encryption key for the database",
      "A secret string that identifies the calling application, usually sent in a header",
      "A certificate for the server"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Where should an API key be sent?",
    "topic": "API authentication & keys",
    "choices": [
      "In a header over HTTPS, never in a url that can be logged",
      "In the query string of every url",
      "In a public javascript file of the site, so that every page can read it",
      "In the title of the page"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a weakness of API keys alone?",
    "topic": "API authentication & keys",
    "choices": [
      "They cannot be created",
      "They expire every second",
      "They are too long to send",
      "They are bearer secrets, so anyone who has one can use it until it is revoked"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why give each client its own API key?",
    "topic": "API authentication & keys",
    "choices": [
      "Keys are cheaper this way",
      "You can revoke one client and see its use without affecting others",
      "Shared keys are more secure",
      "The server needs unique keys to start"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What should an API key permission model include?",
    "topic": "API authentication & keys",
    "choices": [
      "Full access for every key",
      "Scopes that limit what each key can do, and an expiry or rotation",
      "No limits, since keys are secret",
      "Permissions stored inside the key text"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How can a token be short lived and still convenient for clients?",
    "topic": "API authentication & keys",
    "choices": [
      "Make all tokens last ten years",
      "Share one token between all clients",
      "Store tokens in urls",
      "Use refresh tokens or re authentication to get new access tokens"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why should an API check authentication on every request?",
    "topic": "API authentication & keys",
    "choices": [
      "There is no session state to trust",
      "Checks make the server faster",
      "Only the first request needs credentials",
      "Browsers check them for you"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does it mean to store API keys hashed on the server side?",
    "topic": "API authentication & keys",
    "choices": [
      "Clients receive the hash instead of the key, which they then send back",
      "Keys are shorter that way",
      "A database leak does not reveal the keys that clients use",
      "Hashes are used to encrypt requests"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a good response to a leaked API key?",
    "topic": "API authentication & keys",
    "choices": [
      "Wait and see if it is used",
      "Rename the key",
      "Revoke it, issue a new one and review the logs for misuse",
      "Tell nobody"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why log API key identifiers but not the full secret value?",
    "topic": "API authentication & keys",
    "choices": [
      "You can trace use without exposing the secret in logs",
      "Logs cannot store long strings",
      "Identifiers are secret",
      "Secrets are always visible in logs, so a partial value does not matter"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is broken object level authorization in the OWASP API Top 10?",
    "topic": "OWASP API Security Top 10",
    "choices": [
      "An API that is too slow",
      "An API with too many fields",
      "An API that uses the wrong colours",
      "An API lets a user access objects of others by changing an id"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is broken authentication in an API?",
    "topic": "OWASP API Security Top 10",
    "choices": [
      "An API that cannot log users out of a mobile app",
      "Weak or missing checks of identity",
      "An API without documentation",
      "An API that returns too much data"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is excessive data exposure?",
    "topic": "OWASP API Security Top 10",
    "choices": [
      "The API receives too much traffic",
      "The API returns more fields than the client needs, relying on the client to hide them",
      "The API logs too little data",
      "The API has too many users"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is unrestricted resource consumption?",
    "topic": "OWASP API Security Top 10",
    "choices": [
      "The API running out of disk by itself",
      "A user who uses the API too often with permission",
      "A bug that crashes the API",
      "Missing limits on requests, payload size or costly operations that lets an attacker exhaust resources"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is broken function level authorization in an API?",
    "topic": "OWASP API Security Top 10",
    "choices": [
      "Users can call administrative functions because the server does not check roles",
      "A function that returns the wrong type",
      "A function that runs for too long",
      "A function with no tests"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why are shadow or old API versions a risk?",
    "topic": "OWASP API Security Top 10",
    "choices": [
      "Old versions are always safer",
      "They cannot be reached from outside",
      "Forgotten endpoints may lack updates, protection or monitoring",
      "They use less memory"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why should an API avoid returning verbose errors?",
    "topic": "OWASP API Security Top 10",
    "choices": [
      "Errors are not allowed in APIs, since clients only need the status code",
      "They make responses too small",
      "They can reveal internals that help an attacker",
      "They slow down logging"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is server side request forgery in an API?",
    "topic": "OWASP API Security Top 10",
    "choices": [
      "A feature that fetches a url from the user can be abused to reach internal systems",
      "A client sending too many requests",
      "A forged certificate",
      "A request with a missing header"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why is an inventory of all API endpoints important?",
    "topic": "OWASP API Security Top 10",
    "choices": [
      "Inventories make APIs faster",
      "Inventories replace authentication",
      "They are needed to compile the API",
      "You cannot protect or monitor endpoints that you do not know about"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which approach reduces mass assignment in APIs?",
    "topic": "OWASP API Security Top 10",
    "choices": [
      "Bind all body fields to the model",
      "Accept only explicitly allowed fields and reject unknown ones",
      "Hide the fields in the documentation",
      "Rename the sensitive fields"
    ],
    "answerIdx": 1
  }
]
```

LAYER: security-dev-8

```json
[
  {
    "stem": "What is threat modeling?",
    "topic": "Threat modeling with STRIDE",
    "choices": [
      "A test that sends many requests to a live server to see at which load it fails",
      "A list of all the vulnerabilities that a scanner found in the code of a project",
      "A structured way to find what can go wrong in a design, and decide what to do about it",
      "A document that describes the employees of a company and their security roles"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does STRIDE stand for?",
    "topic": "Threat modeling with STRIDE",
    "choices": [
      "Spoofing, Tampering, Repudiation, Information disclosure, Denial of service, Elevation of privilege",
      "Security, Trust, Risk, Integrity, Defence, Encryption",
      "Scanning, Testing, Reporting, Isolating, Deploying, Escalating",
      "Secrets, Tokens, Roles, Identities, Domains, Endpoints"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which STRIDE category describes an attacker pretending to be another user?",
    "topic": "Threat modeling with STRIDE",
    "choices": [
      "Tampering",
      "Repudiation",
      "Denial of service",
      "Spoofing"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which STRIDE category describes changing data in transit or in storage without permission?",
    "topic": "Threat modeling with STRIDE",
    "choices": [
      "Spoofing",
      "Tampering",
      "Information disclosure",
      "Repudiation"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does repudiation mean in STRIDE?",
    "topic": "Threat modeling with STRIDE",
    "choices": [
      "A user steals the password of another user and then signs in as them",
      "A user can deny having done an action because there is no reliable record",
      "A server runs out of memory because too many requests arrive at the same time",
      "A user reads data that belongs to other people because a check is missing"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which control mainly answers the threat of repudiation?",
    "topic": "Threat modeling with STRIDE",
    "choices": [
      "Stronger password rules for all users, so that guessing becomes harder for attackers",
      "Encrypting the database at rest so that a stolen disk cannot be read",
      "Adding more web servers behind a load balancer to handle heavy traffic",
      "Secure audit logging that cannot be altered by the user"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which control addresses the threat of spoofing?",
    "topic": "Threat modeling with STRIDE",
    "choices": [
      "Strong authentication, such as multi factor authentication",
      "Rate limiting on public pages, so that automated clients are slowed down",
      "Compression of responses, so that pages load faster for users on slow lines",
      "Daily backups of the database, so that data can be restored after a loss"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which control addresses denial of service?",
    "topic": "Threat modeling with STRIDE",
    "choices": [
      "Logging every request in plain text on the same server for later review",
      "Hashing every password twice before it is saved in the user table",
      "Rate limiting, resource quotas and redundancy",
      "Using longer session identifiers so that they are harder to guess"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a data flow diagram used for in threat modeling?",
    "topic": "Threat modeling with STRIDE",
    "choices": [
      "It lists the passwords of the users of the system for the security team",
      "It measures the speed of each service and shows the slowest parts",
      "It shows components, data stores and trust boundaries, where threats are looked for",
      "It is a plan of the office network, with the rooms and the cables"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a trust boundary?",
    "topic": "Threat modeling with STRIDE",
    "choices": [
      "A line where data passes between parts with different levels of trust",
      "The wall around the office building of the company, with its guards and cameras",
      "The limit of the budget of the security team for the coming year",
      "The edge of the screen in the user interface of an application"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is an attack surface map?",
    "topic": "Attack surface mapping",
    "choices": [
      "A picture of the office where the servers are kept, with the locks marked",
      "A list of all of the users of the system and the passwords they use",
      "A graph of the speed of the network connections between the servers",
      "An overview of all the places where an attacker can interact with or enter the system"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which of these is part of the attack surface of a web application?",
    "topic": "Attack surface mapping",
    "choices": [
      "Only the home page of the site, because the other pages need a login",
      "Public endpoints, input fields, file uploads, third party integrations and admin panels",
      "Only the database tables, because they are the only place that holds data",
      "Only the font files used by the pages, since they are loaded from outside"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why should the attack surface be kept small?",
    "topic": "Attack surface mapping",
    "choices": [
      "A small attack surface makes pages load faster in every browser that is used",
      "Fewer entry points mean fewer places to defend and to get wrong",
      "Attackers only look at large applications, so small ones are never attacked",
      "It reduces the cost of electricity for the servers that run the application"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How can unused endpoints become a risk?",
    "topic": "Attack surface mapping",
    "choices": [
      "Unused endpoints are deleted by the framework automatically after a few weeks",
      "They make the response of the other endpoints slower than before",
      "They are encrypted by default, so no attacker can ever call them",
      "They may be forgotten, unpatched and unmonitored, yet reachable"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What are shadow assets?",
    "topic": "Attack surface mapping",
    "choices": [
      "Systems or services that exist but are not known or managed by the security team",
      "Servers that are turned off and kept in a store room for emergencies",
      "Files with dark colours that are used in the design of the application",
      "Backups stored in a safe that only the managers of the company can open"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why do third party libraries and services expand the attack surface?",
    "topic": "Attack surface mapping",
    "choices": [
      "Third party code is always reviewed by the vendor of the browser before it is used",
      "They run only in the test environment, so production is not affected at all",
      "A weakness in them can affect your system, even if your own code is correct",
      "They cannot access any data, since they are separated from the application"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is an exposure of a cloud storage bucket an example of?",
    "topic": "Attack surface mapping",
    "choices": [
      "A hardware failure of a disk in a data center that holds the files",
      "A software license problem that stops a service from starting at all",
      "Attack surface created by a configuration mistake",
      "A network speed problem between the application and its customers"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which tool or activity helps to list exposed hosts and ports of your own systems?",
    "topic": "Attack surface mapping",
    "choices": [
      "A port scan and an asset inventory, run with permission",
      "A word processor that can open a text file with the list of servers",
      "A spreadsheet of salaries that is kept by the human resources team",
      "A video call with the owners of each system, in which they list their hosts"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why include people and processes in the attack surface?",
    "topic": "Attack surface mapping",
    "choices": [
      "People are never targeted by attackers, since they do not hold any access",
      "Processes cannot be changed, so they are outside of the area that is modeled",
      "Technology is the only target, because attackers work only with software",
      "Phishing and weak procedures can be as effective as technical flaws"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the purpose of reducing privileges on exposed services?",
    "topic": "Attack surface mapping",
    "choices": [
      "Exposed services need more privileges to run, so they are given administrator rights",
      "If one is compromised, the attacker gains less access to the rest",
      "It makes the service faster, because fewer permissions have to be checked",
      "It hides the service from the users and from the monitoring tools"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is reconnaissance in a security test?",
    "topic": "Recon & enumeration",
    "choices": [
      "Deleting the logs of the target so that nobody can see what was done",
      "Gathering information about the target before testing it",
      "Writing the final report of the findings for the management of the company",
      "Fixing the vulnerabilities that were found by the first scan of the system"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the difference between passive and active reconnaissance?",
    "topic": "Recon & enumeration",
    "choices": [
      "Passive means using a slow connection and active means using a fast one",
      "Active is legal and passive is not, since passive work needs no permission",
      "They are two names for the same activity, used by different companies",
      "Passive collects public information without touching the target, active interacts with the target"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why must a penetration test have written permission and a defined scope?",
    "topic": "Recon & enumeration",
    "choices": [
      "Testing systems without authorisation is illegal, and scope sets what is allowed",
      "Scope is only a suggestion for the testers, who decide what to test",
      "Permission is needed only for large companies that have a security team",
      "Written scope slows down the work, so it is left out for small projects"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is enumeration in a test?",
    "topic": "Recon & enumeration",
    "choices": [
      "Counting the employees of a company from public pages of its website",
      "Encrypting the results of a scan so that only the tester can read them",
      "Listing users, services, versions and endpoints of the target in more detail",
      "Deleting the test data that was created during the first stage of the work"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does a banner or version disclosure help an attacker do?",
    "topic": "Recon & enumeration",
    "choices": [
      "Make the page load faster by using the compressed version of the software",
      "Find the physical address of the server where the application is hosted",
      "Look up known vulnerabilities for that exact software version",
      "Reset the password of an administrator through the help desk of the company"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why use a test environment for risky checks when it is possible?",
    "topic": "Recon & enumeration",
    "choices": [
      "Mistakes cannot damage the production service or its users",
      "Test environments are always identical to production, so results never differ",
      "Production cannot be tested at all, so only test systems are ever used",
      "Testing is not allowed on any real system under any kind of agreement"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is subdomain discovery used for in a test?",
    "topic": "Recon & enumeration",
    "choices": [
      "Changing the DNS records of the target to point to a server of the tester",
      "Hiding the main website of the target behind a new address",
      "Increasing the traffic to the main website so that it can be measured",
      "Finding forgotten or less protected hosts under the same domain"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is directory brute forcing, in the context of testing a web app?",
    "topic": "Recon & enumeration",
    "choices": [
      "Guessing passwords of administrators from the internet until one of them works",
      "Trying common paths to find hidden pages or files, within the agreed scope",
      "Deleting folders on the server to find out which ones are in use",
      "Encrypting folders so that other testers cannot see the structure of the site"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why are rate and impact important during active testing?",
    "topic": "Recon & enumeration",
    "choices": [
      "Scans never affect a service, so the rate can be set as high as possible",
      "Heavy scans can disturb the service, so they must follow the rules of engagement",
      "Higher rates give better results, so the scan should run at full speed",
      "The rate is chosen by the target, which sends a list of limits every day"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What should a tester record during recon?",
    "topic": "Recon & enumeration",
    "choices": [
      "Only the final conclusion of the test, so that the notes stay short",
      "Nothing, to save time, since the tools keep all of the history",
      "The passwords of all users that were seen while looking around the system",
      "Findings, evidence and the actions taken, so that results are reproducible"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is an intercepting proxy such as Burp Suite?",
    "topic": "Using Burp Suite & proxies",
    "choices": [
      "A tool that sits between the browser and the server, so requests can be inspected and changed",
      "A firewall that blocks all of the traffic between the browser and the server",
      "A server that hosts websites and runs the code of the application",
      "A tool that writes the code of the website for the developers"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why is a proxy useful for testing a web application?",
    "topic": "Using Burp Suite & proxies",
    "choices": [
      "It encrypts the site for visitors and keeps their requests private",
      "It makes requests faster by caching the pages that the browser asks for",
      "You can see the exact requests, modify parameters and replay them",
      "It removes the need for HTTPS, since requests can be read in plain text"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What must be done to inspect HTTPS traffic with a proxy in your own test browser?",
    "topic": "Using Burp Suite & proxies",
    "choices": [
      "Turn off HTTPS on the server, so that the proxy can read the traffic",
      "Delete the certificates of the website from the system of the tester",
      "Trust the certificate of the proxy in that browser, only for testing",
      "Use a different DNS server so that the proxy can resolve the addresses"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the repeater function of such a proxy allow?",
    "topic": "Using Burp Suite & proxies",
    "choices": [
      "Sending a modified request many times and comparing the responses",
      "Repeating the page in the browser so that it can be shown to others",
      "Repeating the whole user interface on a second screen of the tester",
      "Copying the website to the machine of the tester for offline use"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is fuzzing?",
    "topic": "Using Burp Suite & proxies",
    "choices": [
      "Writing documentation for the system and its components for the team",
      "Increasing the volume of the logs so that more events can be seen",
      "Compressing inputs so that they can be sent through slow networks",
      "Sending many unexpected or malformed inputs to find errors or weaknesses"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why can a proxy show problems that the user interface hides?",
    "topic": "Using Burp Suite & proxies",
    "choices": [
      "The interface hides all errors by law, so a proxy is the only way to see them",
      "The server may accept requests that the interface never sends, such as hidden fields or other ids",
      "The proxy changes the server code so that hidden problems become visible",
      "Browsers block all fields that the application does not need to display"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a good use of a proxy history during a test?",
    "topic": "Using Burp Suite & proxies",
    "choices": [
      "Delete all requests after the test so that no data is left on the machine",
      "Review requests for secrets, tokens and parameters that could be abused",
      "Share them publicly so that other testers can reproduce the findings",
      "Ignore them, since the interface already shows everything that matters"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What do you need to be careful about when saving proxy logs?",
    "topic": "Using Burp Suite & proxies",
    "choices": [
      "Logs are always empty, so there is nothing that needs protecting",
      "Logs are public by default, so they may be shared without restrictions",
      "Logs are encrypted by the proxy automatically, so they are always safe",
      "They can contain passwords, tokens and personal data that must be protected"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the benefit of automation in a scanner combined with manual testing?",
    "topic": "Using Burp Suite & proxies",
    "choices": [
      "Scanners find known patterns fast, and people find logic flaws that tools miss",
      "Manual testing is not needed any more, because scanners find every flaw",
      "Scanners understand business logic perfectly, so people only review reports",
      "Scanners never produce false positives, so their findings can be trusted blindly"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a false positive?",
    "topic": "Using Burp Suite & proxies",
    "choices": [
      "A vulnerability that was missed by the scanner and stays in the application",
      "A vulnerability that has been fixed and then reported again by mistake",
      "A reported issue that is not a real vulnerability",
      "A new vulnerability that is introduced by the fix of an earlier one"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What should a good penetration test report contain?",
    "topic": "Exploiting then reporting findings",
    "choices": [
      "Only the list of tools that were used and the dates of each scan",
      "Only the names of the testers and the company that they work for",
      "Clear findings with evidence, impact, steps to reproduce and recommendations",
      "Only screenshots with no text, so that readers can see the pages"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why rate findings by severity?",
    "topic": "Exploiting then reporting findings",
    "choices": [
      "The team can fix the most serious and most likely problems first",
      "Severity decides the price of the report, so higher ratings cost more",
      "All findings must be fixed at the same time, so ranking is not needed",
      "Severity is only decoration, so it has no influence on the work plan"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a proof of concept in a finding?",
    "topic": "Exploiting then reporting findings",
    "choices": [
      "A full attack that deletes data on the system, to show how bad it could be",
      "A theory about the weakness that has not been tested on the system",
      "A commercial offer for software that would remove the weakness",
      "A minimal demonstration that shows the issue is real, without causing harm"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why avoid destructive actions when exploiting during a test?",
    "topic": "Exploiting then reporting findings",
    "choices": [
      "Destructive actions are always required to prove a risk to the owner",
      "The goal is to prove the risk, not to damage the system or its data",
      "Systems repair themselves after tests, so damage is not a real concern",
      "Only attackers care about damage, so testers can ignore it completely"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does remediation mean?",
    "topic": "Exploiting then reporting findings",
    "choices": [
      "Finding the vulnerability by scanning the system for known weaknesses",
      "Fixing or reducing the risk of a vulnerability",
      "Hiding the vulnerability from the users until the next release",
      "Selling the details of the vulnerability to a broker for a fee"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why retest after a fix?",
    "topic": "Exploiting then reporting findings",
    "choices": [
      "Retests are required by browsers before they accept the new version",
      "Fixes never work, so every change has to be repeated at least twice",
      "It makes the report longer, which is what the customers expect",
      "It confirms that the issue is really fixed and that nothing new was broken"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is chaining findings in a report?",
    "topic": "Exploiting then reporting findings",
    "choices": [
      "Showing how several smaller issues combine into a larger impact",
      "Writing the findings in one long sentence so that they are linked",
      "Sending the findings to several people at the same time by email",
      "Deleting duplicates from the list so that only unique ones remain"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How should sensitive data seen during a test be handled?",
    "topic": "Exploiting then reporting findings",
    "choices": [
      "Copy it to a personal laptop so that it can be analysed later at home",
      "Share it with friends who work in security, to get a second opinion",
      "Access it only as much as needed, protect it and delete it according to the agreement",
      "Post it online with the names removed, so that others can learn from it"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why explain business impact and not only technical detail?",
    "topic": "Exploiting then reporting findings",
    "choices": [
      "Technical detail is forbidden in reports, so only the impact is written",
      "Business people do not read reports, so the impact is not important",
      "Decision makers need to understand the risk to prioritise work",
      "Impact is always the same for every finding, so it needs no explanation"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a good way to write a recommendation?",
    "topic": "Exploiting then reporting findings",
    "choices": [
      "Be specific and practical, with a suggested fix and where to apply it",
      "Say that the system should be more secure, and leave the details to the team",
      "Blame the developers by name, so that they pay attention next time",
      "Ask for a larger budget only, since money solves most of the problems"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is responsible disclosure?",
    "topic": "Responsible disclosure",
    "choices": [
      "Publishing a vulnerability immediately so that everyone can protect themselves",
      "Selling the details to the highest bidder before the owner has been told",
      "Using the vulnerability to gain access for yourself and proving it later",
      "Reporting a vulnerability privately to the owner and giving time to fix it before going public"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a vulnerability disclosure policy?",
    "topic": "Responsible disclosure",
    "choices": [
      "A list of employees who may speak to journalists about incidents",
      "A published statement of how to report issues and what testers may do",
      "A contract for buying security software from a trusted vendor",
      "A set of passwords for researchers who test the systems of the company"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a bug bounty program?",
    "topic": "Responsible disclosure",
    "choices": [
      "A list of bugs that nobody is allowed to fix until the next year",
      "An organisation rewards researchers who report valid vulnerabilities within the rules",
      "A tax on software companies that have many customers",
      "A game for children that teaches them how computers work"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What should a researcher do after finding a vulnerability in a service they do not own?",
    "topic": "Responsible disclosure",
    "choices": [
      "Download all data to prove the point and then send it to the owner",
      "Tell social media first, so that the owner is forced to react quickly",
      "Change the data to show that the problem is real and can be abused",
      "Stop testing beyond what is needed and report it through the proper channel"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why is it important not to access more data than needed to prove an issue?",
    "topic": "Responsible disclosure",
    "choices": [
      "It limits harm to users and shows good faith",
      "More data makes the report better, so testers should take as much as possible",
      "Access to data is always allowed once a vulnerability has been found",
      "The owner cannot see what was accessed, so it does not matter"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a typical coordinated disclosure timeline?",
    "topic": "Responsible disclosure",
    "choices": [
      "One hour before the fix, so that the vendor has no time to hide the issue",
      "Details are published before reporting, to put pressure on the vendor",
      "A reasonable period, such as 90 days, for the vendor to fix before details are published",
      "No fixes are ever made, so the timeline has no end date"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is security.txt?",
    "topic": "Responsible disclosure",
    "choices": [
      "A list of passwords on the server that testers may use for their checks",
      "A security scan result that is published on the main page of a site",
      "A file with contact information for reporting vulnerabilities, at a well known path",
      "A copy of the license of the software that the site is running"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why do clear safe harbour terms help researchers?",
    "topic": "Responsible disclosure",
    "choices": [
      "They explain what is allowed and reduce the fear of legal action when acting in good faith",
      "They give researchers access to all systems, so no scope is needed",
      "They remove the need for a scope, since everything is allowed",
      "They replace all laws, so researchers cannot be taken to court"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What should an organisation do when it receives a report?",
    "topic": "Responsible disclosure",
    "choices": [
      "Ignore it and hope it goes away, since reports are often wrong",
      "Block the reporter, so that no further messages arrive",
      "Delete the report, so that nobody else can read the details",
      "Acknowledge it quickly, triage it, fix it and keep the reporter informed"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the risk of publishing exploit details before a fix is available?",
    "topic": "Responsible disclosure",
    "choices": [
      "Nothing, because attackers never read reports that are written by others",
      "Attackers can use the information against users who are not yet protected",
      "The vendor will fix it faster in every case, so publishing is safe",
      "The details are always wrong, so attackers cannot use them"
    ],
    "answerIdx": 1
  }
]
```

LAYER: security-dev-9

```json
[
  {
    "stem": "What does SAST stand for and what does it do?",
    "topic": "SAST & DAST tools",
    "choices": [
      "Secure application session testing, which checks the sessions of users who are logged in",
      "Server access security tracking, which records who connects to the servers of a company",
      "Static application security testing, which analyses source code for flaws without running it",
      "Software architecture security training, which teaches developers how to design systems safely"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does DAST do?",
    "topic": "SAST & DAST tools",
    "choices": [
      "Tests a running application from the outside by sending requests and watching the responses",
      "Reads the source code of the application without running it and looks for patterns",
      "Scans the third party packages that the application depends on for known flaws",
      "Checks the configuration of the build server and the permissions of its users"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which problems is SAST good at finding?",
    "topic": "SAST & DAST tools",
    "choices": [
      "Misconfigured response headers and certificates that only appear when the application is deployed",
      "Weak passwords that real users have chosen on the live system after launch",
      "Slow database queries that appear only when many visitors use the application",
      "Patterns in the code such as injection sinks, hard coded secrets and unsafe functions"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which problems can DAST find that SAST often cannot?",
    "topic": "SAST & DAST tools",
    "choices": [
      "Patterns in the source code, such as unsafe function calls and string built queries",
      "Issues that appear only at runtime, such as missing headers or misconfigured servers",
      "Hard coded secrets and API keys that have been committed to the repository",
      "Vulnerable libraries that are listed in the dependency files of the project"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a downside of SAST tools?",
    "topic": "SAST & DAST tools",
    "choices": [
      "They cannot read source code and only work on applications that are already running",
      "They can report many false positives and need tuning",
      "They only work on servers that are running, and never during the development stage",
      "They never report anything, because they cannot understand the languages of the project"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a downside of DAST tools?",
    "topic": "SAST & DAST tools",
    "choices": [
      "They can read only the source code and cannot send any request to the application",
      "They work only before the code is written and need design documents as input",
      "They find only style problems, such as inconsistent names and unused variables",
      "They need a running application and may not show the line of code that is at fault"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is IAST?",
    "topic": "SAST & DAST tools",
    "choices": [
      "Instrumentation inside the running app that observes tests to find vulnerabilities",
      "A tool that reads the source of the application on paper and marks risky lines",
      "A tool that scans only the network around the application for open ports",
      "A type of password manager that is built into the framework of the application"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why use both SAST and DAST?",
    "topic": "SAST & DAST tools",
    "choices": [
      "They find exactly the same problems, so using both is only a matter of habit",
      "One of them makes the other unnecessary, so a team should pick the cheaper one",
      "They find different kinds of problems, so together they give wider coverage",
      "They only work together on release days, when the application is deployed"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why should scanner results be triaged by a person?",
    "topic": "SAST & DAST tools",
    "choices": [
      "Results are always correct and need no review by anyone before developers act on them",
      "Triage is done automatically by the compiler when the code is built for release",
      "Tools cannot know the context, so findings need review for impact and false positives",
      "Scanners fix every issue by themselves, so a person only needs to approve the pull request"
    ],
    "answerIdx": 2
  },
  {
    "stem": "When can a SAST scan be run in the development process?",
    "topic": "SAST & DAST tools",
    "choices": [
      "On every commit or pull request, so that issues are found early and are cheap to fix",
      "Only once a year, when an external auditor asks for a report about the code",
      "Only after the product is retired, to learn from the code that was shipped",
      "Only on the day of the release, when there is no time left for fixes"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is software composition analysis, or SCA?",
    "topic": "Dependency & SCA scanning",
    "choices": [
      "Analysing the speed of the application under load to find slow components",
      "Checking how the code is split into modules and whether the layers are clean",
      "Reviewing the design documents of the system for missing security requirements",
      "Finding known vulnerabilities and licenses in the third party components of an application"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Where do SCA tools get their data about known vulnerabilities?",
    "topic": "Dependency & SCA scanning",
    "choices": [
      "The source code of the application itself, which contains a list of its own flaws",
      "Public vulnerability databases, such as the CVE list and vendor advisory databases",
      "The log files of the production server, where scanners read past errors",
      "Random guesses that the scanner makes about packages with old version numbers"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a CVE?",
    "topic": "Dependency & SCA scanning",
    "choices": [
      "A type of encryption that is used to protect data stored in databases",
      "A public identifier for a specific known vulnerability",
      "A company that sells vulnerability scanners to development teams",
      "A kind of password that must be changed every thirty days by all users"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does CVSS describe?",
    "topic": "Dependency & SCA scanning",
    "choices": [
      "The speed of a network connection between the scanner and the registry",
      "The size of a library, measured in the lines of code that it contains",
      "The number of users that are affected by a vulnerability in a library",
      "A score that expresses the severity of a vulnerability"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why is a high CVSS score not the only thing to consider?",
    "topic": "Dependency & SCA scanning",
    "choices": [
      "Exploitability in your context, exposure of the component and available fixes matter too",
      "A high score means that the vulnerability is already fixed in all of the versions",
      "Scores are always wrong, so teams should ignore them and decide by feeling",
      "Only low scores matter, because high scores are not possible in real systems"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why scan transitive dependencies too?",
    "topic": "Dependency & SCA scanning",
    "choices": [
      "Transitive packages are never installed in production, so they cannot cause harm",
      "They are checked by the registry before download, so scanning them is a duplicate",
      "A vulnerable package pulled in indirectly still runs in your application",
      "They cannot have vulnerabilities, because only direct dependencies are ever attacked"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What should you do when a vulnerable dependency has no fix yet?",
    "topic": "Dependency & SCA scanning",
    "choices": [
      "Ignore it forever, since a vulnerability without a fix cannot be handled in any way",
      "Remove the scanner from the pipeline until the maintainers publish a new version",
      "Assess exposure, apply a workaround or mitigation, and track it until a fix exists",
      "Rename the package in the lock file so that the scanner can no longer find it"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a benefit of automated pull requests that update dependencies?",
    "topic": "Dependency & SCA scanning",
    "choices": [
      "Fixes arrive quickly, and the tests of the pipeline can show whether each update is safe",
      "Updates are merged without any tests, which saves time for the whole team",
      "They remove the need for a lock file, since versions are chosen automatically",
      "They make the code run faster, because newer versions are always optimised"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why does the license of a dependency matter for security programs?",
    "topic": "Dependency & SCA scanning",
    "choices": [
      "Licenses decide the execution speed of the package inside the application",
      "Licenses hide known vulnerabilities from the scanners of the pipeline",
      "Licenses change the programming language that a package is written in",
      "Legal obligations and risks can come with a package, so they are tracked together"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does a lock file help with in SCA?",
    "topic": "Dependency & SCA scanning",
    "choices": [
      "It encrypts the packages so that attackers cannot read the code of the libraries",
      "Scanners can see the exact versions that are used",
      "It deletes old packages from the registry when a new version is published",
      "It makes scans slower, because it forces the scanner to compare every file"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why scan for secrets in repositories?",
    "topic": "Secret scanning",
    "choices": [
      "Secrets make a repository faster to clone, so teams often keep them in the code",
      "Keys, tokens and passwords committed by mistake can be used by attackers",
      "Secrets are required in source code for the application to be able to start",
      "Scanners can create new secrets for the team when the old ones expire"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What can secret scanning tools detect?",
    "topic": "Secret scanning",
    "choices": [
      "The speed of the build and the time that each pipeline job needs to finish",
      "The size of the repository and the number of large files that it contains",
      "The number of authors who have committed to the repository during a year",
      "Patterns of known token formats and high entropy strings"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why is deleting a committed secret in a later commit not enough?",
    "topic": "Secret scanning",
    "choices": [
      "It stays in the history and may already be copied, so it must be rotated",
      "Git removes it automatically from all clones when a newer commit hides the line",
      "Secrets cannot be seen in the history, so a later commit is already enough",
      "The scanner will hide the secret from users once it has been reported"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Where is it best to catch secrets?",
    "topic": "Secret scanning",
    "choices": [
      "Only after a year, during a security review of all repositories of the company",
      "Only on the production server, after the application has been deployed",
      "Before the commit with a pre commit hook, and again in the pipeline as a second check",
      "Only when users complain that something has been leaked to the public"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a false positive in secret scanning?",
    "topic": "Secret scanning",
    "choices": [
      "A real secret that the scanner failed to find and that stays in the repository",
      "A secret that was rotated and no longer works on any of the systems",
      "A string that looks like a secret but is not, such as a harmless test value",
      "An entry of a password manager that was copied into a document by mistake"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How can a team reduce accidental secrets?",
    "topic": "Secret scanning",
    "choices": [
      "Use environment variables or a secrets manager and keep sample values in example files",
      "Put secrets in the code for convenience, since the repository is private anyway",
      "Share secrets in the chat of the team, so that everyone has the latest value",
      "Use the same secret for all environments, so there is only one value to track"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What should happen first when a real secret is found in a public repository?",
    "topic": "Secret scanning",
    "choices": [
      "Make the repository private and do nothing else, because nobody will find the secret",
      "Delete the file in a new commit and wait to see whether the secret is misused",
      "Tell nobody about it and hope that no attacker has copied the repository",
      "Revoke and rotate it at once, then clean up and review for misuse"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why scan not only the current code but also the history?",
    "topic": "Secret scanning",
    "choices": [
      "History is not stored by git, so only the current files can contain secrets",
      "Old commits can contain secrets that are still valid",
      "History is encrypted by git, so old commits can never expose a secret",
      "History contains only documentation, which never has a token inside of it"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is entropy based detection?",
    "topic": "Secret scanning",
    "choices": [
      "Measuring the temperature of the servers that run the scanner and the pipeline",
      "Looking for strings that look random, which often indicates keys or tokens",
      "Counting the lines of each file to decide which files may contain keys",
      "Checking the age of each commit to find secrets that were added long ago"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why should scanner configuration allow known test values to be ignored?",
    "topic": "Secret scanning",
    "choices": [
      "It disables the scanner for the whole repository so that no more alerts arrive",
      "It hides all secrets from the report, including the ones that are real",
      "It is required by law for every company that scans its code repositories",
      "It reduces noise, so that real findings get attention"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why scan container images?",
    "topic": "Container image scanning",
    "choices": [
      "Images can contain vulnerable packages from the base image or from your own layers",
      "Images cannot be vulnerable, since they are built from trusted base images only",
      "Scanners make images smaller, so scanning is mainly a way of saving space",
      "Containers do not run any code of their own, so there is nothing to scan"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which image choices reduce the findings of a scanner?",
    "topic": "Container image scanning",
    "choices": [
      "Adding more tools to the image, so that problems can be fixed inside the container",
      "Using the largest base image that is available, because it has the most fixes",
      "Smaller base images, and removing the packages that the application does not need",
      "Using old versions of the base image, since they have been tested longer"
    ],
    "answerIdx": 2
  },
  {
    "stem": "When should an image be scanned?",
    "topic": "Container image scanning",
    "choices": [
      "Only once, when the image is created, because its content never changes later",
      "Only after an incident has been reported, to find out what went wrong",
      "At build time in CI, and again regularly, since new vulnerabilities are published later",
      "Never, if the image ran well during testing and passed all of the unit tests"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does a scanner report for an image layer?",
    "topic": "Container image scanning",
    "choices": [
      "Known vulnerabilities in installed packages and sometimes misconfigurations",
      "The speed of the layer when it is pulled over a slow connection of the registry",
      "The size of the logs that the layer writes while the container is running",
      "The name of the author who built the layer and the date of the build"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why does running a container as root matter for security?",
    "topic": "Container image scanning",
    "choices": [
      "Root containers are faster in all cases, so they are used for performance reasons",
      "Root is required for all containers, so there is no real choice about it",
      "It stops scanners from working, because they cannot read root owned files",
      "If an attacker escapes the application, they have more power in the container"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is an image signature useful for?",
    "topic": "Container image scanning",
    "choices": [
      "Compressing the image so that it can be pulled faster from a distant registry",
      "Verifying that an image was built by a trusted pipeline and was not changed",
      "Making the image run faster by skipping the checks of the container runtime",
      "Encrypting the image layers so that only the owner of the registry can read them"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why pin base images by digest?",
    "topic": "Container image scanning",
    "choices": [
      "Digests are shorter than tags, which makes the file that lists the images smaller",
      "The exact content is fixed, so a changed tag cannot surprise you",
      "Digests make images smaller, because duplicate layers are removed by the registry",
      "Tags are not allowed by registries, so a digest is the only way to refer to an image"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a distroless image?",
    "topic": "Container image scanning",
    "choices": [
      "An image of a full Linux distribution with every tool that an administrator needs",
      "An image that has no layers, so that it is stored as one single file",
      "An image without any files, which is used only as a placeholder in tests",
      "An image with only the application and its runtime, with no shell or package manager"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why avoid storing secrets in image layers?",
    "topic": "Container image scanning",
    "choices": [
      "Anyone who can pull the image can read them from the layers",
      "Layers are encrypted by the registry, so nobody can read a secret inside of them",
      "Secrets are removed by the registry when an image is pushed to a repository",
      "Images are never shared, so a secret inside a layer stays inside the team"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What can a admission policy do in an orchestrator?",
    "topic": "Container image scanning",
    "choices": [
      "Make images larger by adding extra layers that contain security tools and scanners",
      "Delete the registry when an image fails a check, so that it cannot be pulled",
      "Block deployments of images that fail checks, such as unsigned or vulnerable ones",
      "Compress the logs of the cluster so that they use less space on the disk"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a security gate in a CI pipeline?",
    "topic": "Security gates in CI/CD",
    "choices": [
      "A physical door at the office that only the members of the security team can open",
      "A password that is needed to start the CI tool every time that it is restarted",
      "A check that must pass before the pipeline continues or before the code is released",
      "A tool that deletes failing tests so that the pipeline can continue to deploy"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why set a gate on the severity of findings?",
    "topic": "Security gates in CI/CD",
    "choices": [
      "Critical issues can block a release, while lesser issues can be tracked and fixed later",
      "All findings must block every release, so a severity gate would be redundant",
      "Gates must never block a release, so severity is used only for reporting",
      "Severity is not known to tools, so it has to be decided by hand each time"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a risk of gates that block too easily?",
    "topic": "Security gates in CI/CD",
    "choices": [
      "The pipeline becomes faster, because failing builds are stopped before they start",
      "Fewer issues are reported, because developers fix problems before tools find them",
      "Builds never fail, since the gate is only a warning that nobody has to read",
      "Developers may bypass the process or ignore the tools if the gates are too noisy"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What makes a security gate effective?",
    "topic": "Security gates in CI/CD",
    "choices": [
      "Very long scans that nobody reads, so that the results can be archived later",
      "Fast, reliable results with clear guidance on how to fix findings",
      "Random failures that make developers retry the job until the build turns green",
      "Hidden rules that are known only to the security team, so they cannot be avoided"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Where should security checks run on a pull request?",
    "topic": "Security gates in CI/CD",
    "choices": [
      "Only on the laptop of one person, who reviews all of the code by hand",
      "In the pipeline automatically, with the results visible to the author of the change",
      "Only after the merge, when the change is already in the main branch",
      "Only once a month, in a batch together with all of the other repositories"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why protect the main branch with reviews and required checks?",
    "topic": "Security gates in CI/CD",
    "choices": [
      "Protected branches make git faster, because fewer commits have to be stored",
      "Reviews are optional for security, since automated tools find every problem",
      "Required checks delete code that does not pass, so the history stays clean",
      "Unreviewed or unchecked changes cannot reach production easily"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What should the pipeline itself be protected against?",
    "topic": "Security gates in CI/CD",
    "choices": [
      "Unauthorised changes and leaks of its secrets, since it has powerful access",
      "Nothing, since the pipeline is internal and so it cannot be reached by attackers",
      "Only physical theft of the servers where the pipeline runs and stores its logs",
      "Only slow builds, because security problems never affect the build system"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How can pipeline tokens follow least privilege?",
    "topic": "Security gates in CI/CD",
    "choices": [
      "Use one admin token for all jobs, so that permissions never block a build",
      "Print the tokens in the logs, so that failures can be debugged more easily",
      "Give each job only the permissions and time that it needs",
      "Share the same tokens between teams, so that fewer secrets have to be stored"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is an exception process for a gate?",
    "topic": "Security gates in CI/CD",
    "choices": [
      "A way to turn off the gate for ever, without notes or any approval of the risk",
      "A secret way to skip checks that only the administrators of the pipeline know",
      "A documented, time limited way to accept a risk with approval",
      "A removal of the whole pipeline when a check fails more than three times"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why track the metrics of findings and fix times?",
    "topic": "Security gates in CI/CD",
    "choices": [
      "They show whether the process is working and where to improve",
      "Metrics are secret and must not be shared outside of the security team",
      "Metrics replace scans, so that the pipeline can run without any scanner",
      "They are required for the compiler to be able to build the application"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does shift left mean in security?",
    "topic": "Shifting security left",
    "choices": [
      "Moving servers to the left side of the room so that they can be reached easily",
      "Making the interface left aligned for languages that are written from right to left",
      "Doing security work only after the release, when the first reports arrive",
      "Doing security work earlier in the development lifecycle"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why is fixing a flaw early cheaper than later?",
    "topic": "Shifting security left",
    "choices": [
      "Late fixes are free, because the original developers have already moved to a new team",
      "Less code depends on it, and fewer people are affected",
      "Early fixes need more people, so they are more expensive than fixes after release",
      "Cost does not change over time, because every bug takes the same effort to fix"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which practice is an example of shifting left?",
    "topic": "Shifting security left",
    "choices": [
      "Running a scan only after the release, when the code is already in production",
      "Threat modeling during design and running scans in pull requests",
      "Ignoring security until the annual audit, and then fixing everything at once",
      "Hiring a tester at the end of the project to look for security problems"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What role do developers play in DevSecOps?",
    "topic": "Shifting security left",
    "choices": [
      "They are not involved in security, since a separate team handles all of it",
      "They only write documentation about security, which the security team reads later",
      "They hand all security to one person, who approves every change by hand",
      "They take shared responsibility for security, supported by tools and training"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why provide secure coding training?",
    "topic": "Shifting security left",
    "choices": [
      "Developers can avoid common flaws and also understand the findings of the tools",
      "Training is a replacement for tools, so scanners can be switched off afterwards",
      "Training makes code run faster, because developers write more efficient code",
      "Training is only for managers, who decide the budget for security work"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a security champion?",
    "topic": "Shifting security left",
    "choices": [
      "A tool that blocks attacks at the network edge of the company automatically",
      "A manager who approves the budgets of security projects for the whole company",
      "A developer in a team who helps others with security questions and reviews",
      "A person who tests the application only at the end of the project"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why make the secure way the easy way?",
    "topic": "Shifting security left",
    "choices": [
      "People always choose the hard way, so convenience has no effect on their behaviour",
      "Easy paths are always insecure, so the secure way must stay difficult to use",
      "People follow secure paths that are convenient, such as templates and libraries",
      "Convenience is irrelevant, since staff follow rules that are written in a policy"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is infrastructure as code scanning?",
    "topic": "Shifting security left",
    "choices": [
      "Checking templates for insecure settings before the resources are created in the cloud",
      "Writing code for printers and other devices that are part of the office network",
      "Scanning hardware in the data center for physical faults before it is installed",
      "Counting the servers of a company and comparing the number to the invoices"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why are post incident learnings fed back into earlier stages?",
    "topic": "Shifting security left",
    "choices": [
      "Incidents are never repeated, so there is nothing to feed back into earlier stages",
      "Learnings are kept secret, so that only the incident team can read them",
      "They replace the pipeline, which can be switched off after a review is done",
      "Lessons can become checks, tests or training that help to prevent a repeat of the incident"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a sign of a mature DevSecOps culture?",
    "topic": "Shifting security left",
    "choices": [
      "Security is a separate team that works alone and reviews the work at the end",
      "Security is part of everyday work and findings are fixed quickly and openly",
      "Findings are hidden from other teams, so that the product looks safe to customers",
      "Scans are run once a year, before the audit, so the effort stays low"
    ],
    "answerIdx": 1
  }
]
```

LAYER: security-dev-10

```json
[
  {
    "stem": "Why add logging to a backend service?",
    "topic": "Security logging & monitoring",
    "choices": [
      "Logs make the server respond faster, because requests are written to disk first",
      "Logs are required for the server to start, since it reads them at boot",
      "Developers can understand what happened when something goes wrong in production",
      "Logs replace the need for a database, because every record is kept in them"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a structured log?",
    "topic": "Security logging & monitoring",
    "choices": [
      "A log entry with fields such as level, time and request id that tools can search",
      "A log written as one long sentence of free text that is easy for people to read",
      "A log that is stored only in the memory of the process and lost at restart",
      "A log that is printed only during development and switched off in production"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which log levels are commonly used?",
    "topic": "Security logging & monitoring",
    "choices": [
      "red, green, blue and yellow, which are the colours used in terminal output",
      "start, middle, end and stop, which describe the phases of a request",
      "small, medium, large and huge, which describe the size of each entry",
      "debug, info, warn and error"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What should you never write to logs?",
    "topic": "Security logging & monitoring",
    "choices": [
      "The time of each request that was handled by the service in the last hour",
      "Passwords, tokens and other secrets, or personal data without a reason",
      "The status code of each response, because it is public information anyway",
      "The name of the route that was called, since it never contains any data"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a request id useful for?",
    "topic": "Security logging & monitoring",
    "choices": [
      "Making the request run faster on the server by caching its result in memory",
      "Following one request across several log lines and services",
      "Encrypting the body of the request so that logs cannot be read by others",
      "Limiting how many requests a single user can send during one minute"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does monitoring add on top of logs?",
    "topic": "Security logging & monitoring",
    "choices": [
      "A copy of every log line stored for ever, so that nothing is ever lost",
      "A faster database for the application, which removes the need for caching",
      "A way to edit the code of the live server without a new deployment",
      "Metrics and alerts that tell you when the system is unhealthy"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which metrics give a quick view of the health of a web service?",
    "topic": "Security logging & monitoring",
    "choices": [
      "Error rate, latency and traffic",
      "Number of files in the project and the total size of its folder on disk",
      "Number of developers on the team and the lines of code they changed",
      "The colour theme and the font of the application, as chosen by designers"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a health check endpoint used for?",
    "topic": "Security logging & monitoring",
    "choices": [
      "It lists all users of the service for the administrators of the platform",
      "It restarts the database every few minutes to free memory that is leaking",
      "A platform or monitor calls it to see whether the service is alive and ready",
      "It shows the source code of the service to the operators who debug it"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why alert on symptoms such as the error rate and not on every log line?",
    "topic": "Security logging & monitoring",
    "choices": [
      "Individual log lines cannot be read by any tool that is used for monitoring",
      "Symptoms are easier to hide from the team, so alerts would be too noisy",
      "Alerts stay useful and are not drowned in noise",
      "Alerts on every log line are not allowed by the logging libraries in use"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a sensible first step after an alert for a spike in errors?",
    "topic": "Security logging & monitoring",
    "choices": [
      "Check whether it started with a recent change and roll back if the impact is high",
      "Wait a week to see whether the problem goes away without any action by the team",
      "Delete the monitoring tool so that the alerts stop coming into the channel",
      "Add new features to the service to make up for the failed requests"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is detection in security operations?",
    "topic": "Detection & alerting",
    "choices": [
      "Preventing every attack with a firewall alone, so that no events need to be watched",
      "Deleting suspicious files after they are found by chance during a backup",
      "Fixing the code of the application after a release, when users report bugs",
      "Spotting signs of an attack or misuse in logs and events, as early as possible"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a SIEM?",
    "topic": "Detection & alerting",
    "choices": [
      "A tool that writes the code of web applications from a short description of them",
      "A system that collects and correlates security logs and raises alerts",
      "A device that cools the servers in a data center to prevent overheating",
      "A password manager that is shared by the whole security team of a company"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why correlate events from several sources?",
    "topic": "Detection & alerting",
    "choices": [
      "Correlation reduces the size of logs automatically, so that storage costs less",
      "A single event may look harmless, but a pattern across systems can show an attack",
      "Events from one source are always enough to see a complete attack pattern",
      "Correlation removes the need for alerts, because people read the raw logs"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is an indicator of compromise?",
    "topic": "Detection & alerting",
    "choices": [
      "A strong password that is used to protect the account of an administrator",
      "A type of firewall rule that blocks traffic from countries with many attackers",
      "A job title in the team, for a person who investigates incidents",
      "A trace such as a hash, domain or address that suggests a system was attacked"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What makes an alert actionable?",
    "topic": "Detection & alerting",
    "choices": [
      "It has context, a clear meaning and a defined response",
      "It fires thousands of times a day, so that responders always have something to do",
      "It says that something happened, without any further details about the event",
      "It is sent to nobody in particular, so everyone can look at it when free"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is alert fatigue?",
    "topic": "Detection & alerting",
    "choices": [
      "Alerts getting tired and stopping to work after they have fired too many times",
      "Servers running out of power while they process a long list of alerts",
      "Responders start ignoring alerts because there are too many noisy ones",
      "A new type of attack that uses alerts to exhaust the energy of staff"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How can alert quality be improved?",
    "topic": "Detection & alerting",
    "choices": [
      "Add more alerts for every possible event, so that nothing is ever missed",
      "Turn off all alerts at night, since attackers are only active during the day",
      "Tune rules, remove noise and review which alerts led to real findings",
      "Make alerts louder, so that responders cannot miss them in the channel"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a baseline in detection?",
    "topic": "Detection & alerting",
    "choices": [
      "A picture of normal behaviour that helps to see unusual activity",
      "A list of passwords that are most often used by the users of a system",
      "The lowest price of a security tool when it is bought in large amounts",
      "The first line of every log file, which shows the name of the service"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which event is worth an alert on a web application?",
    "topic": "Detection & alerting",
    "choices": [
      "A user viewing the home page of the site, which is a normal event",
      "A static image being loaded by the browser as part of the page",
      "A page using a bright colour in the design of the interface",
      "Many failed logins for one account followed by a success"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why test detection rules?",
    "topic": "Detection & alerting",
    "choices": [
      "Tests make the rules faster, because they are compiled when they are checked",
      "You learn whether a real attack would actually raise an alert",
      "Rules never need testing, since a vendor has already verified them all",
      "Tests delete the rules that fire too often, so that alerts stay quiet"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What are the main phases of incident response?",
    "topic": "The incident response lifecycle",
    "choices": [
      "Panic, blame, delete, ignore, forget and repeat, in the order they happen",
      "Preparation, detection, containment, eradication, recovery and lessons learned",
      "Design, code, test, deploy, run and retire, as in a software lifecycle",
      "Hiring, training, buying, selling, signing and closing, as in a business"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is containment?",
    "topic": "The incident response lifecycle",
    "choices": [
      "Fixing the root cause of the incident in the code of the application",
      "Writing the final report of the incident for the board of the company",
      "Telling the press about the incident before customers hear about it",
      "Limiting the spread and impact of an incident, such as isolating a host or disabling an account"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is eradication?",
    "topic": "The incident response lifecycle",
    "choices": [
      "Removing the cause of the incident, such as malware or a malicious account",
      "Making a backup of the system before anyone has looked at what happened",
      "Hiding the incident from customers until the next audit of the company",
      "Starting a new project to replace the system that was affected"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is recovery?",
    "topic": "The incident response lifecycle",
    "choices": [
      "Deleting all of the data on the affected systems to remove any trace",
      "Buying new servers every time an incident happens and discarding the old ones",
      "Restoring systems to normal operation safely and monitoring for a repeat",
      "Closing the company until every trace of the attack has been removed"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why is preparation the most important phase?",
    "topic": "The incident response lifecycle",
    "choices": [
      "Incidents are always simple, so a written plan is not needed in advance",
      "Preparation can be done during the incident, when the team has more time",
      "Roles, tools, contacts and runbooks are needed before an incident starts",
      "It is only needed for large companies that have a full time security team"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a runbook?",
    "topic": "The incident response lifecycle",
    "choices": [
      "A documented set of steps for handling a type of incident or task",
      "A book about running that the security team reads to stay in good shape",
      "A list of the servers that run a service and the people who own them",
      "A type of software license that is used for monitoring tools"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why preserve evidence during an incident?",
    "topic": "The incident response lifecycle",
    "choices": [
      "Evidence is always deleted by law after an incident, so keeping it is not allowed",
      "It makes systems faster, because logs that are kept are indexed by the platform",
      "It is not important once the attack has been stopped and systems work again",
      "It supports analysis, and it may be needed for legal or insurance purposes"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why define who is in charge during an incident?",
    "topic": "The incident response lifecycle",
    "choices": [
      "Leaders are not needed in incidents, because the technical team knows what to do",
      "Clear roles avoid confusion, delays and conflicting actions",
      "Everyone should act alone, since coordination slows the response down",
      "Roles slow down the response, so they are only defined after the incident"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why communicate clearly during an incident?",
    "topic": "The incident response lifecycle",
    "choices": [
      "Communication should be avoided during an incident, to stop rumours from spreading",
      "Teams, management and sometimes customers need accurate and timely information",
      "Only attackers need information about an incident, so the team keeps quiet",
      "Silence helps the response, since fewer people ask questions about progress"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What should you do before wiping a compromised system?",
    "topic": "The incident response lifecycle",
    "choices": [
      "Wipe it immediately without any record, so that the attacker cannot return",
      "Ask the attacker for permission, since the system may still be in use",
      "Move the machine to the office and keep it turned on for a few days",
      "Capture logs and a forensic copy where possible, so the cause can be understood"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a post mortem?",
    "topic": "Post-mortems & root-cause analysis",
    "choices": [
      "A review after an incident to understand what happened and how to improve",
      "A medical examination that is done on staff who worked during an incident",
      "A search for the person who made a mistake, so that they can be dismissed",
      "A report that hides the details of what happened from other teams"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why should post mortems be blameless?",
    "topic": "Post-mortems & root-cause analysis",
    "choices": [
      "Nobody is ever responsible for anything, so reports can stay empty of facts",
      "Blame makes teams faster, since people work harder to avoid being named",
      "People share facts openly, and the focus stays on fixing systems and processes",
      "Reports must be secret, so only the managers can read their content"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is root cause analysis?",
    "topic": "Post-mortems & root-cause analysis",
    "choices": [
      "Writing the name of the person who made the mistake in the report",
      "Counting the number of alerts that fired during the time of the incident",
      "Looking for the underlying reasons for an incident, not only the first visible symptom",
      "Deleting the logs of the incident so that they cannot be misused later"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a technique to dig deeper into causes?",
    "topic": "Post-mortems & root-cause analysis",
    "choices": [
      "Asking why repeatedly, known as the five whys",
      "Asking who is guilty five times until somebody admits the mistake",
      "Guessing a cause and stopping as soon as the first one sounds likely",
      "Counting the number of servers in the environment and comparing them"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What should a post mortem produce?",
    "topic": "Post-mortems & root-cause analysis",
    "choices": [
      "Only a story about the incident, without any actions or owners",
      "Only a list of mistakes that were made by individuals during the work",
      "A reward for the team that responded the fastest to the incident",
      "Findings and concrete actions with owners and dates"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the timeline in a post mortem for?",
    "topic": "Post-mortems & root-cause analysis",
    "choices": [
      "It decides the budget of the team for the next year of operations",
      "It shows the order of events, which helps to find gaps in detection and response",
      "It is a list of meetings that were held while the incident was running",
      "It shows the colours of the dashboard that the team used to watch it"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why track follow up actions to completion?",
    "topic": "Post-mortems & root-cause analysis",
    "choices": [
      "Actions are not important, since the incident is already over for the team",
      "Without follow up the same incident can happen again",
      "Tracking makes incidents longer, because people spend time on reports",
      "Reports are enough, since nobody needs to check what happens after them"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What can be learned from an incident that was detected late?",
    "topic": "Post-mortems & root-cause analysis",
    "choices": [
      "Nothing, since it was late and there is no way to improve the detection",
      "That detection is not needed, because attackers always announce themselves",
      "That servers should be turned off whenever an alert is raised",
      "Where logging, alerts or monitoring need to improve"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why share lessons learned within the organisation?",
    "topic": "Post-mortems & root-cause analysis",
    "choices": [
      "Other teams can avoid the same problem",
      "Lessons are secrets, so they stay inside the team that handled the incident",
      "Sharing creates more incidents, because attackers read internal documents",
      "It is against policy, since reports may only be read by the auditor"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a near miss and why review it?",
    "topic": "Post-mortems & root-cause analysis",
    "choices": [
      "An event that never happens, which is why nobody has to review it",
      "A successful attack that was stopped only after data had been stolen",
      "An event that almost caused harm, which shows weaknesses before damage",
      "A broken tool that has to be replaced before the next incident"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is GDPR mainly about?",
    "topic": "GDPR, SOC 2 & PCI basics",
    "choices": [
      "Rules for building websites faster, so that they pass performance tests",
      "A standard for credit cards that applies to all companies in the world",
      "Protecting personal data and the rights of people in the European Union",
      "A network protocol that encrypts personal data between two servers"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does data minimisation mean?",
    "topic": "GDPR, SOC 2 & PCI basics",
    "choices": [
      "Collect and keep only the personal data that you really need",
      "Compress all data, so that it uses less storage in the databases",
      "Delete all data every day, so that nothing is ever kept for long",
      "Collect as much data as possible, in case it is useful at some point"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What rights do people have under GDPR?",
    "topic": "GDPR, SOC 2 & PCI basics",
    "choices": [
      "The right to see the source code of every system that processes their data",
      "The right to free software from every company that stores their data",
      "The right to change laws that apply to the company that holds the data",
      "Access, correction, deletion and portability of their data, among others"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What must organisations do after a personal data breach, according to GDPR?",
    "topic": "GDPR, SOC 2 & PCI basics",
    "choices": [
      "Wait a year before saying anything, so that the cause can be found first",
      "Notify the authority within 72 hours when required, and sometimes the people affected",
      "Never tell anyone, because breaches are handled inside the company only",
      "Only tell the press, so that people hear about it from the news"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is SOC 2?",
    "topic": "GDPR, SOC 2 & PCI basics",
    "choices": [
      "A programming language that is used to write security tools for audits",
      "An audit framework that reports on controls for security, availability and other trust criteria",
      "A type of firewall that is sold to companies that need compliance",
      "A password standard that sets the length of passwords for employees"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is PCI DSS?",
    "topic": "GDPR, SOC 2 & PCI basics",
    "choices": [
      "A standard for building bridges and other large structures",
      "A tool for scanning websites for slow pages and missing images",
      "A law about airlines and the data that they keep about passengers",
      "A standard for organisations that handle payment card data"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why do compliance and security differ?",
    "topic": "GDPR, SOC 2 & PCI basics",
    "choices": [
      "Compliance shows that rules are met, but security is about real protection",
      "They are exactly the same, so a certificate proves that a system is secure",
      "Compliance replaces security, so no technical controls are needed after an audit",
      "Security is only paperwork, so it can be handled by the legal department alone"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a data processing agreement?",
    "topic": "GDPR, SOC 2 & PCI basics",
    "choices": [
      "A list of the processors that are installed in the computers of a company",
      "An encryption algorithm that protects personal data inside of databases",
      "A contract that sets how a provider handles personal data for you",
      "A server configuration that decides which processes may run at night"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why keep records of where personal data is stored?",
    "topic": "GDPR, SOC 2 & PCI basics",
    "choices": [
      "Records are for decoration, so they are only shown to visitors of the office",
      "Records slow systems down, so it is better not to write them at all",
      "You cannot protect, delete or report on data that you cannot find",
      "Data should be hidden from the company, so records would be a risk"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the purpose of an audit log in compliance?",
    "topic": "GDPR, SOC 2 & PCI basics",
    "choices": [
      "It records who did what, which supports investigations and proof of control",
      "It stores the passwords of all users in a place that auditors can read",
      "It speeds up the database by writing queries to a separate place",
      "It replaces backups, since every change can be replayed from it"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why have written security policies?",
    "topic": "Security policies & training",
    "choices": [
      "Policies are for decoration, so they are only printed for the visitors",
      "Policies must be secret, so only the managers know the real rules",
      "They replace technical controls, so the systems need no other protection",
      "People know what is expected, and behaviour can be checked and improved"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What makes a policy effective?",
    "topic": "Security policies & training",
    "choices": [
      "It is long and complex, so that it covers every case that can happen",
      "It is short, clear, accessible and enforced in practice",
      "It is never updated, so everyone knows that the rules stay stable",
      "It is only in the head of the managers, who decide each case alone"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why train all staff on security?",
    "topic": "Security policies & training",
    "choices": [
      "Only security staff need training, since others do not handle any data",
      "People are targets, and awareness reduces successful phishing and mistakes",
      "Training is a legal secret, so it is not given to ordinary staff",
      "Training stops all attacks, so no other measures are needed after it"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a good way to test awareness?",
    "topic": "Security policies & training",
    "choices": [
      "Punish everyone who clicks, so that they learn to avoid the links",
      "Never test, since testing staff makes them nervous and less productive",
      "Send real malware to the staff to see who opens the attachment",
      "Run simulated phishing exercises and use the results to teach, not to punish"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why is onboarding a good time for security training?",
    "topic": "Security policies & training",
    "choices": [
      "New staff learn the rules before they get access to systems",
      "They already know everything, so onboarding needs no security content",
      "Onboarding is too busy, so security is better left until the second year",
      "Training is not needed for new staff, who rarely have any access"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the role of leadership in security culture?",
    "topic": "Security policies & training",
    "choices": [
      "They are exempt from the rules, because they manage the company",
      "They only buy tools, and leave the use of them to the technical staff",
      "They set priorities, give resources and show the right behaviour",
      "They avoid the topic, so that staff feel free to work as they like"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why review policies regularly?",
    "topic": "Security policies & training",
    "choices": [
      "Policies never change, so a review is a waste of time for the team",
      "Reviews make policies longer, which is why they should be avoided",
      "Threats, technology and laws change, so policies must stay current",
      "They are reviewed by attackers, who report missing rules to the company"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What should an acceptable use policy cover?",
    "topic": "Security policies & training",
    "choices": [
      "What employees may and may not do with company systems and data",
      "The colour of the logo of the company and how it may be used",
      "The times of lunch breaks and the rooms in which they are taken",
      "The layout of the office and where each person has to sit"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How can exceptions to policy be handled safely?",
    "topic": "Security policies & training",
    "choices": [
      "By ignoring the policy whenever it is inconvenient for the business",
      "By asking no questions, so that nobody has to write anything down",
      "By hiding the exception from the auditors until they come back",
      "With documented approval, a time limit and compensating controls"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why measure security awareness and incident reporting rates?",
    "topic": "Security policies & training",
    "choices": [
      "Metrics are not allowed in security, so they are never collected",
      "They show whether training works and whether people feel safe reporting",
      "They replace training, so staff do not need any lessons on the topic",
      "They make reports shorter, which is the main reason why they are used"
    ],
    "answerIdx": 1
  }
]
```

