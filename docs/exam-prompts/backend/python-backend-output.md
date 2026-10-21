LAYER: py-1

```json
[
  {
    "stem": "What does 7 / 2 evaluate to in Python 3?",
    "topic": "Variables, types, strings, numbers, booleans",
    "choices": [
      "3",
      "4",
      "3.5",
      "3.0"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Using floor division, what is the value of -7 // 2 in Python 3?",
    "topic": "Variables, types, strings, numbers, booleans",
    "choices": [
      "-4",
      "-3",
      "-3.5",
      "-4.0"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Given s = 'abc', what happens when you run s[0] = 'x'?",
    "topic": "Variables, types, strings, numbers, booleans",
    "choices": [
      "The string becomes 'xbc' because indexing assigns in place",
      "IndexError, because index 0 is reserved for the string length",
      "ValueError, because 'x' is not a valid replacement character",
      "TypeError, because str objects do not support item assignment"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does bool('0') return?",
    "topic": "Variables, types, strings, numbers, booleans",
    "choices": [
      "True",
      "False",
      "ValueError",
      "0"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why does 0.1 + 0.2 == 0.3 evaluate to False in Python?",
    "topic": "Variables, types, strings, numbers, booleans",
    "choices": [
      "Floats are stored in binary, so most decimal fractions are only approximated",
      "Python compares floats by object identity rather than by value",
      "The + operator converts both operands to integers before adding",
      "Python rounds float results down after every addition operation"
    ],
    "answerIdx": 0
  },
  {
    "stem": "With x = 5, what does f'{x * 2}' produce?",
    "topic": "Variables, types, strings, numbers, booleans",
    "choices": [
      "'10'",
      "'x * 2'",
      "'55'",
      "10 as an int"
    ],
    "answerIdx": 0
  },
  {
    "stem": "If a = [1, 2] and b = [1, 2], what do a == b and a is b return?",
    "topic": "Variables, types, strings, numbers, booleans",
    "choices": [
      "True and True",
      "True and False",
      "False and False",
      "False and True"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why is it legal to write x = 5 and later x = 'five'?",
    "topic": "Variables, types, strings, numbers, booleans",
    "choices": [
      "Python converts the old value to a string before rebinding the name",
      "A variable's type is fixed at first use but Python ignores the mismatch",
      "Names are just labels bound to objects; the type belongs to the object, not the name",
      "Python creates a second variable named x inside a new scope"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does 'python'[1:4] return?",
    "topic": "Variables, types, strings, numbers, booleans",
    "choices": [
      "'pyth'",
      "'ytho'",
      "'tho'",
      "'yth'"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which of these values is falsy in a boolean context?",
    "topic": "Variables, types, strings, numbers, booleans",
    "choices": [
      "' '",
      "'False'",
      "[0]",
      "''"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the key difference between a list and a tuple?",
    "topic": "Lists, tuples, sets, dicts — operations and comprehensions",
    "choices": [
      "Tuples can only hold numbers, while lists can hold any object type",
      "Tuples are immutable, so their items cannot be reassigned after creation",
      "Lists are stored in sorted order, while tuples keep insertion order",
      "Tuples are always faster to index, while lists cannot be indexed"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does len(set([1, 1, 2, 3, 3])) return?",
    "topic": "Lists, tuples, sets, dicts — operations and comprehensions",
    "choices": [
      "5",
      "2",
      "4",
      "3"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What happens when you run d = {[1, 2]: 'a'}?",
    "topic": "Lists, tuples, sets, dicts — operations and comprehensions",
    "choices": [
      "The dict is created and the key is stored as the tuple (1, 2)",
      "KeyError, because the list has not been defined as a key yet",
      "TypeError, because a list is unhashable and cannot be a dict key",
      "The dict is created and the list can later be mutated freely"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does [x * x for x in range(4)] produce?",
    "topic": "Lists, tuples, sets, dicts — operations and comprehensions",
    "choices": [
      "[1, 4, 9, 16]",
      "[0, 2, 4, 6]",
      "[0, 1, 4, 9]",
      "[0, 1, 2, 3]"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does [x for x in range(6) if x % 2] produce?",
    "topic": "Lists, tuples, sets, dicts — operations and comprehensions",
    "choices": [
      "[0, 2, 4]",
      "[1, 3, 5]",
      "[0, 1, 2, 3, 4, 5]",
      "[2, 4, 6]"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does d.get('missing', 0) do when 'missing' is not a key of d?",
    "topic": "Lists, tuples, sets, dicts — operations and comprehensions",
    "choices": [
      "Raises KeyError, just as d['missing'] would",
      "Returns 0 without raising an error",
      "Inserts 'missing' into d with the value 0",
      "Returns None because the default is ignored"
    ],
    "answerIdx": 1
  },
  {
    "stem": "After a = [1, 2, 3]; b = a; b.append(4), what is a?",
    "topic": "Lists, tuples, sets, dicts — operations and comprehensions",
    "choices": [
      "[1, 2, 3], because assignment copies the list into b",
      "[4], because append replaces the list contents entirely",
      "[1, 2, 3, 4], because append also copies b back into a",
      "[1, 2, 3, 4], because a and b refer to the same list object"
    ],
    "answerIdx": 3
  },
  {
    "stem": "After a = [[1], [2]]; b = a.copy(); b[0].append(9), what is a?",
    "topic": "Lists, tuples, sets, dicts — operations and comprehensions",
    "choices": [
      "[[1], [2]], because copy() duplicates every nested list too",
      "[[1, 9], [2]], because copy() is shallow and inner lists are shared",
      "[[1, 9], [2, 9]], because append applies to every inner list",
      "[[9], [2]], because append replaces the inner list"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does {1, 2, 3} & {2, 3, 4} evaluate to?",
    "topic": "Lists, tuples, sets, dicts — operations and comprehensions",
    "choices": [
      "{1, 2, 3, 4}",
      "{1, 4}",
      "{1}",
      "{2, 3}"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why is checking membership with 'x in my_set' usually faster than 'x in my_list' on large data?",
    "topic": "Lists, tuples, sets, dicts — operations and comprehensions",
    "choices": [
      "Sets keep their items sorted, so Python can use binary search",
      "Sets store each item once, so there are fewer items to compare",
      "Lists must be converted to tuples before every membership test",
      "Sets use hashing, giving average constant-time lookup instead of a linear scan"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which values does for i in range(3) assign to i?",
    "topic": "Control flow — if/else, for/while, break/continue",
    "choices": [
      "0, 1, 2",
      "1, 2, 3",
      "0, 1, 2, 3",
      "1, 2"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does a break statement do inside a loop?",
    "topic": "Control flow — if/else, for/while, break/continue",
    "choices": [
      "Skips the rest of the current iteration only",
      "Pauses the loop until the next function call",
      "Exits the innermost loop immediately",
      "Exits the whole program with a status code"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does a continue statement do inside a loop?",
    "topic": "Control flow — if/else, for/while, break/continue",
    "choices": [
      "Ends the loop and runs the code after it",
      "Restarts the loop from its first item",
      "Skips the rest of the current iteration and moves to the next one",
      "Raises StopIteration to signal the loop is done"
    ],
    "answerIdx": 2
  },
  {
    "stem": "When does the else block of a for loop run?",
    "topic": "Control flow — if/else, for/while, break/continue",
    "choices": [
      "When the loop finishes without hitting a break",
      "Only when the loop body never executed at all",
      "Every time an iteration is skipped by continue",
      "Only when the loop is exited by a break"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is wrong with: x = 0\nwhile x < 3:\n    print(x)",
    "topic": "Control flow — if/else, for/while, break/continue",
    "choices": [
      "print cannot be called inside a while loop",
      "x is never changed, so the loop never ends",
      "The loop runs zero times because x starts at 0",
      "while needs an else clause to be valid"
    ],
    "answerIdx": 1
  },
  {
    "stem": "In an if / elif / else chain where several conditions are true, which branch runs?",
    "topic": "Control flow — if/else, for/while, break/continue",
    "choices": [
      "Only the first branch whose condition is true",
      "Every branch whose condition is true, in order",
      "Only the last branch whose condition is true",
      "The else branch, since multiple conditions conflict"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does list(enumerate(['a', 'b'])) return?",
    "topic": "Control flow — if/else, for/while, break/continue",
    "choices": [
      "[('a', 0), ('b', 1)]",
      "[(1, 'a'), (2, 'b')]",
      "['a', 'b']",
      "[(0, 'a'), (1, 'b')]"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the expression 0 or 'x' evaluate to?",
    "topic": "Control flow — if/else, for/while, break/continue",
    "choices": [
      "'x'",
      "0",
      "True",
      "False"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does 'yes' if n > 0 else 'no' do?",
    "topic": "Control flow — if/else, for/while, break/continue",
    "choices": [
      "Always evaluates to 'yes' because it comes first",
      "Evaluates to 'yes' when n > 0, otherwise to 'no'",
      "Raises SyntaxError because it lacks a colon",
      "Assigns 'yes' or 'no' to n based on its sign"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which values does range(2, 10, 3) generate?",
    "topic": "Control flow — if/else, for/while, break/continue",
    "choices": [
      "2, 5, 8, 10",
      "3, 6, 9",
      "2, 3, 10",
      "2, 5, 8"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does this print? def f(x, items=[]):\n    items.append(x)\n    return items\nf(1)\nprint(f(2))",
    "topic": "Functions — args, kwargs, default values, return",
    "choices": [
      "[2], because each call gets a fresh default list",
      "[1], because the first call fixes the result",
      "[1, 2], because the default list is created once and reused",
      "[2, 1], because new items are inserted at the front"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does *args collect in a function definition?",
    "topic": "Functions — args, kwargs, default values, return",
    "choices": [
      "Extra positional arguments, as a tuple",
      "Extra keyword arguments, as a dict",
      "All arguments, as a list in call order",
      "Only the arguments that have default values"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does **kwargs collect in a function definition?",
    "topic": "Functions — args, kwargs, default values, return",
    "choices": [
      "Extra positional arguments, as a tuple",
      "Every argument that has a default value",
      "Extra keyword arguments, as a dict",
      "Keyword arguments, as a list of pairs"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does a function return if it has no return statement?",
    "topic": "Functions — args, kwargs, default values, return",
    "choices": [
      "None",
      "0",
      "An empty string",
      "The last expression evaluated"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Given def f(a, *, b): ..., what happens when you call f(1, 2)?",
    "topic": "Functions — args, kwargs, default values, return",
    "choices": [
      "It works and sets b to 2",
      "TypeError, because b must be passed by keyword",
      "It works and ignores the second argument",
      "SyntaxError at the point of definition"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does f(*[1, 2]) do when f takes two parameters?",
    "topic": "Functions — args, kwargs, default values, return",
    "choices": [
      "Passes the list as one argument, so f receives [1, 2]",
      "Passes only the first item and discards the rest",
      "Unpacks the list so f receives 1 and 2 as separate arguments",
      "Raises TypeError because lists cannot be unpacked"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does this print? x = 1\ndef f():\n    x = 2\nf()\nprint(x)",
    "topic": "Functions — args, kwargs, default values, return",
    "choices": [
      "2, because functions modify the outer variable",
      "1, because the assignment inside f creates a local x",
      "None, because f returns nothing and x is reset",
      "UnboundLocalError, because x is used before it is defined"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does return a, b actually return?",
    "topic": "Functions — args, kwargs, default values, return",
    "choices": [
      "Two separate values, one per caller variable",
      "A single tuple (a, b)",
      "A list [a, b]",
      "Only b, since the last value wins"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why is f(a=1, 2) invalid?",
    "topic": "Functions — args, kwargs, default values, return",
    "choices": [
      "Positional arguments cannot follow keyword arguments in a call",
      "Keyword arguments must be written after the closing parenthesis",
      "Numbers cannot be passed positionally if a name is given",
      "The parameter a would receive two values"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a limitation of a lambda expression?",
    "topic": "Functions — args, kwargs, default values, return",
    "choices": [
      "It can accept only one parameter at a time",
      "Its body must be a single expression, with no statements",
      "It cannot be passed as an argument to other functions",
      "It cannot return a value to its caller"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the main purpose of a virtual environment created with python -m venv?",
    "topic": "Modules & packages — import, __init__, pip, venv",
    "choices": [
      "To make the code run faster by compiling it ahead of time",
      "To sandbox the program so it cannot touch the file system",
      "To install a different operating system layer for Python",
      "To isolate a project's installed packages from other projects and the system Python"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does an __init__.py file do in a directory?",
    "topic": "Modules & packages — import, __init__, pip, venv",
    "choices": [
      "Lists the pip packages the directory depends on",
      "Compiles the directory's modules into one binary file",
      "Marks the directory as a regular package and runs when the package is imported",
      "Declares which functions are allowed to be called from outside"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does pip freeze > requirements.txt do?",
    "topic": "Modules & packages — import, __init__, pip, venv",
    "choices": [
      "Writes every installed package with its exact version to the file",
      "Locks the virtual environment so no more packages can be added",
      "Downloads all dependencies listed on PyPI into the file",
      "Uninstalls all packages and records their names in the file"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the difference between import math and from math import sqrt?",
    "topic": "Modules & packages — import, __init__, pip, venv",
    "choices": [
      "The first binds the module name math, the second binds sqrt directly in the current namespace",
      "The first imports only the name math, the second imports the whole module quietly",
      "The first runs the module once, the second runs it every time sqrt is called",
      "They are identical, since Python always imports the whole module"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does if __name__ == '__main__': guard against?",
    "topic": "Modules & packages — import, __init__, pip, venv",
    "choices": [
      "Running the file twice if it is imported by two modules",
      "Running the file without administrator rights",
      "Importing the file from outside its own package",
      "Running the block when the file is imported rather than executed directly"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why do circular imports between two modules cause trouble?",
    "topic": "Modules & packages — import, __init__, pip, venv",
    "choices": [
      "Python refuses to import any module that has more than one dependency",
      "One module may be only partly initialized when the other tries to use its names",
      "Python re-runs both files forever until memory runs out",
      "Each module overwrites the other's globals during import"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Where does Python look first when resolving import foo?",
    "topic": "Modules & packages — import, __init__, pip, venv",
    "choices": [
      "The site-packages folder only, before any other location",
      "Already-loaded modules in sys.modules, then the paths in sys.path",
      "Every folder on the system drive, in alphabetical order",
      "The PyPI index, then the local project folder"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Inside a package, what does from . import utils mean?",
    "topic": "Modules & packages — import, __init__, pip, venv",
    "choices": [
      "Import every module from the current working directory",
      "Import a top-level module named utils from site-packages",
      "Import utils from the parent of the package",
      "Import the sibling module utils from the current package"
    ],
    "answerIdx": 3
  },
  {
    "stem": "With a virtual environment activated, where does pip install requests put the package?",
    "topic": "Modules & packages — import, __init__, pip, venv",
    "choices": [
      "Into that environment's own site-packages directory",
      "Into the system-wide Python, shared by every project",
      "Into the current directory, next to your script",
      "Into a global cache that is read-only"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What happens if two different files both run import config?",
    "topic": "Modules & packages — import, __init__, pip, venv",
    "choices": [
      "The module code runs again for each importing file",
      "The module code runs once and later imports reuse the cached module object",
      "The second import raises ImportError as a duplicate",
      "Each file gets its own independent copy of the module"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why is with open('f.txt') as f: preferred over calling open and close manually?",
    "topic": "File I/O — open, read, write, with statement",
    "choices": [
      "It makes the file read faster by loading it into memory first",
      "It locks the file so other programs cannot read it meanwhile",
      "The file is closed automatically even if an exception occurs in the block",
      "It converts the file contents into a list of lines"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does opening an existing file with mode 'w' do?",
    "topic": "File I/O — open, read, write, with statement",
    "choices": [
      "Appends new text to the end of the existing content",
      "Raises FileExistsError so data is never lost",
      "Opens it for reading and writing without changes",
      "Truncates it to empty, then writes from the start"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does mode 'a' do when opening a file?",
    "topic": "File I/O — open, read, write, with statement",
    "choices": [
      "Overwrites the file from the first byte",
      "Opens the file read-only for analysis",
      "Writes new data at the end, keeping existing content",
      "Opens the file in binary mode for reading"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why is for line in f often better than f.read() on a very large file?",
    "topic": "File I/O — open, read, write, with statement",
    "choices": [
      "It yields one line at a time instead of loading the whole file into memory",
      "It decodes the file faster by skipping character encoding",
      "It reads the file in reverse so the newest data comes first",
      "It caches the whole file in RAM for later iterations"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the benefit of passing encoding='utf-8' to open() in text mode?",
    "topic": "File I/O — open, read, write, with statement",
    "choices": [
      "The file is compressed while writing to save disk space",
      "The file is opened in binary mode automatically",
      "Newlines are converted to the Unix style only",
      "The result does not depend on the platform's default encoding"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does open('img.png', 'rb') return when you call read() on it?",
    "topic": "File I/O — open, read, write, with statement",
    "choices": [
      "A str with the image pixels as characters",
      "A list of integer pixel values",
      "A dict with the image metadata",
      "Raw bytes, not decoded text"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What happens when you open('missing.txt', 'r') and the file does not exist?",
    "topic": "File I/O — open, read, write, with statement",
    "choices": [
      "An empty file is created and opened",
      "None is returned instead of a file object",
      "FileNotFoundError is raised",
      "An empty string is returned on read"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is an advantage of pathlib.Path('data') / 'file.txt' over string concatenation?",
    "topic": "File I/O — open, read, write, with statement",
    "choices": [
      "It checks that the file exists before building the path",
      "It always creates the missing parent folders",
      "It builds paths with the correct separator for the operating system",
      "It converts the path to an absolute URL"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does json.load(f) do compared with json.loads(s)?",
    "topic": "File I/O — open, read, write, with statement",
    "choices": [
      "load parses a string; loads reads from a file object",
      "load returns a list; loads returns a dict",
      "load reads JSON from a file object; loads parses a JSON string",
      "load validates the schema; loads only parses"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Does f.write('hi') add a newline after the text?",
    "topic": "File I/O — open, read, write, with statement",
    "choices": [
      "Yes, write always ends with a newline",
      "No, you must include '\\n' yourself",
      "Only when the file was opened in text mode",
      "Only when called inside a with block"
    ],
    "answerIdx": 1
  }
]
```

LAYER: py-2

```json
[
  {
    "stem": "What does the @property decorator let you do on a method?",
    "topic": "OOP — classes, inheritance, dunder methods, dataclasses",
    "choices": [
      "Cache its result permanently after the first call",
      "Access it like an attribute, without parentheses",
      "Make it callable only from inside the class body",
      "Turn it into a method shared by every subclass"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which dunder method makes len(obj) work on your own class?",
    "topic": "OOP — classes, inheritance, dunder methods, dataclasses",
    "choices": [
      "__len__",
      "__size__",
      "__count__",
      "__length__"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does super().__init__() do inside a subclass initializer?",
    "topic": "OOP — classes, inheritance, dunder methods, dataclasses",
    "choices": [
      "Creates a brand new parent instance stored on the subclass",
      "Copies every attribute from the parent class onto self",
      "Runs the next class's __init__ in the method resolution order",
      "Calls the parent __init__ only if the subclass defines no __init__"
    ],
    "answerIdx": 2
  },
  {
    "stem": "A class defines __repr__ but not __str__. What does print(obj) show?",
    "topic": "OOP — classes, inheritance, dunder methods, dataclasses",
    "choices": [
      "The default <ClassName object at 0x...> text",
      "An AttributeError, since __str__ is missing",
      "Nothing, because print needs __str__ to display objects",
      "The result of __repr__, because str() falls back to it"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which methods does @dataclass generate automatically by default?",
    "topic": "OOP — classes, inheritance, dunder methods, dataclasses",
    "choices": [
      "__init__, __hash__ and __lt__",
      "__str__, __len__ and __iter__",
      "__new__, __del__ and __bool__",
      "__init__, __repr__ and __eq__"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What happens with a dataclass field declared as tags: list = []?",
    "topic": "OOP — classes, inheritance, dunder methods, dataclasses",
    "choices": [
      "Every instance gets its own fresh empty list automatically",
      "ValueError, because mutable defaults must use field(default_factory=list)",
      "The list is shared silently with no error being raised",
      "TypeError, because dataclass fields cannot have defaults"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the first parameter received by a @classmethod?",
    "topic": "OOP — classes, inheritance, dunder methods, dataclasses",
    "choices": [
      "The class itself, conventionally named cls",
      "The instance the method was called on",
      "The module in which the class is defined",
      "The parent class of the current class"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What happens to hashing when a class defines __eq__ but not __hash__?",
    "topic": "OOP — classes, inheritance, dunder methods, dataclasses",
    "choices": [
      "Python reuses the default hash, which is based on memory address",
      "Instances become unhashable, so they cannot be set members or dict keys",
      "Python hashes the instance from the return value of __eq__",
      "Instances stay hashable, but equal objects get different hashes"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Given class C(A, B), in which order does Python search for an attribute?",
    "topic": "OOP — classes, inheritance, dunder methods, dataclasses",
    "choices": [
      "C, then B, then A, since later bases override earlier ones",
      "A, then B, then C, since parents are always searched first",
      "C only, unless the attribute is requested through super()",
      "C, then A, then B, then their parents following the MRO"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does a @staticmethod receive automatically as its first argument?",
    "topic": "OOP — classes, inheritance, dunder methods, dataclasses",
    "choices": [
      "Nothing; it takes only the arguments you pass",
      "The instance, as with a normal method",
      "The class, as with a classmethod",
      "The name of the method being called"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does placing @deco directly above def f(): ... do?",
    "topic": "Decorators — function decorators, wraps, parameterized decorators",
    "choices": [
      "Calls deco once for every call of f",
      "Copies f's body into deco at import time",
      "Rebinds the name f to deco(f)",
      "Wraps f in a try block that calls deco on error"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Without functools.wraps, what does decorated.__name__ return for a typical wrapper?",
    "topic": "Decorators — function decorators, wraps, parameterized decorators",
    "choices": [
      "'wrapper', the inner function's name",
      "The original function's name, since decorators keep it",
      "'decorated', based on the decorator's variable name",
      "None, because the metadata is removed entirely"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does functools.wraps(func) do when applied to a wrapper?",
    "topic": "Decorators — function decorators, wraps, parameterized decorators",
    "choices": [
      "Runs func once ahead of time to validate its signature",
      "Makes the wrapper run in a separate thread from func",
      "Copies metadata like __name__ and __doc__ from func onto the wrapper",
      "Prevents func from being decorated a second time"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What structure does @repeat(3) require when repeat takes an argument?",
    "topic": "Decorators — function decorators, wraps, parameterized decorators",
    "choices": [
      "A single wrapper that accepts both the count and the function",
      "A function that returns a decorator, which in turn returns a wrapper",
      "A class that must inherit from the built-in decorator type",
      "A function that returns the count of repetitions as an int"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why do generic decorators usually define the wrapper as def wrapper(*args, **kwargs)?",
    "topic": "Decorators — function decorators, wraps, parameterized decorators",
    "choices": [
      "So it can forward any call signature to the wrapped function",
      "So the wrapper can change the number of arguments freely",
      "So Python skips argument checks on the original function",
      "So the wrapper runs faster than a fixed signature would"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What happens if a wrapper calls func(*args, **kwargs) but does not return its result?",
    "topic": "Decorators — function decorators, wraps, parameterized decorators",
    "choices": [
      "Python returns the last value that func computed automatically",
      "Callers receive None instead of the function's real return value",
      "The decorator raises a TypeError at definition time",
      "The wrapped function's return value is stored in wrapper.result"
    ],
    "answerIdx": 1
  },
  {
    "stem": "With @a above @b above def f, which expression does f become?",
    "topic": "Decorators — function decorators, wraps, parameterized decorators",
    "choices": [
      "b(a(f))",
      "a(b(f))",
      "a(f) + b(f)",
      "a(f) if b(f) else f"
    ],
    "answerIdx": 1
  },
  {
    "stem": "When does the decorator function itself run for @deco def f(): ...?",
    "topic": "Decorators — function decorators, wraps, parameterized decorators",
    "choices": [
      "Every time f is called, before its body runs",
      "Only the first time f is called, then it is cached",
      "When the module is garbage collected on exit",
      "Once, when the def statement executes and the name f is bound"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does @functools.lru_cache do to a function?",
    "topic": "Decorators — function decorators, wraps, parameterized decorators",
    "choices": [
      "Caches only the most recent call regardless of arguments",
      "Runs the function in a background thread pool",
      "Caches return values by arguments, which must be hashable",
      "Records execution time and writes it to a log file"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which method must a class define for its instances to be used as a decorator?",
    "topic": "Decorators — function decorators, wraps, parameterized decorators",
    "choices": [
      "__enter__",
      "__init_subclass__",
      "__getattr__",
      "__call__"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does calling a function that contains yield return?",
    "topic": "Generators & iterators — yield, send, StopIteration",
    "choices": [
      "The first yielded value, immediately",
      "A list of every value the function would yield",
      "None, until the generator is started with start()",
      "A generator object, without running the body yet"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does next(gen) raise when the generator has no more values?",
    "topic": "Generators & iterators — yield, send, StopIteration",
    "choices": [
      "IndexError",
      "EOFError",
      "GeneratorExit",
      "StopIteration"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why is a generator often more memory-efficient than a list for large sequences?",
    "topic": "Generators & iterators — yield, send, StopIteration",
    "choices": [
      "It compresses its values with a built-in algorithm",
      "It stores values on disk rather than in memory",
      "It produces one value at a time instead of storing them all",
      "It deletes the previous values as soon as the list is built"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How does (x * x for x in range(3)) differ from [x * x for x in range(3)]?",
    "topic": "Generators & iterators — yield, send, StopIteration",
    "choices": [
      "The first returns a tuple; the second returns a list",
      "The first runs in a separate thread; the second does not",
      "The first only works with ranges; the second accepts any iterable",
      "The first is a lazy generator; the second builds the full list at once"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does gen.send(10) do inside a generator that is paused at x = yield?",
    "topic": "Generators & iterators — yield, send, StopIteration",
    "choices": [
      "Appends 10 to the generator's list of yielded values",
      "Restarts the generator from its first line with x as 10",
      "Resumes it and makes the yield expression evaluate to 10",
      "Sends 10 to the caller as the next yielded value"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which two methods does an object need to follow the iterator protocol?",
    "topic": "Generators & iterators — yield, send, StopIteration",
    "choices": [
      "__enter__ and __exit__",
      "__getitem__ and __setitem__",
      "__call__ and __len__",
      "__iter__ and __next__"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What happens if you loop over the same generator object twice?",
    "topic": "Generators & iterators — yield, send, StopIteration",
    "choices": [
      "The second loop produces nothing, since the generator is exhausted",
      "The generator restarts and yields everything again",
      "The second loop raises a RuntimeError",
      "The second loop yields only the last value again"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does yield from sub() do inside a generator?",
    "topic": "Generators & iterators — yield, send, StopIteration",
    "choices": [
      "Yields the sub generator object itself as one value",
      "Runs sub() to completion and discards its values",
      "Delegates to sub() and yields each of its values in turn",
      "Starts sub() in parallel with the outer generator"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How does a for loop know when an iterator is finished?",
    "topic": "Generators & iterators — yield, send, StopIteration",
    "choices": [
      "It checks the length of the iterator before every pass",
      "It waits for the iterator to return None",
      "It catches the StopIteration raised by next() and ends quietly",
      "It calls a close() method after the final item"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What happens when you call send('hi') on a just-created generator that has not started?",
    "topic": "Generators & iterators — yield, send, StopIteration",
    "choices": [
      "The value is queued and used at the first yield",
      "The generator starts and ignores the value silently",
      "StopIteration, since nothing has been yielded yet",
      "TypeError, because the first send must be None"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the name after as in with open('f') as f: receive?",
    "topic": "Context managers — __enter__/__exit__, contextlib",
    "choices": [
      "The value returned by __exit__",
      "The object's __repr__ string",
      "A copy of the context manager object",
      "The value returned by __enter__"
    ],
    "answerIdx": 3
  },
  {
    "stem": "When is __exit__ called relative to an exception raised inside the with block?",
    "topic": "Context managers — __enter__/__exit__, contextlib",
    "choices": [
      "It is skipped, and the exception propagates untouched",
      "It runs only if the exception is a subclass of OSError",
      "It still runs, and receives the exception details",
      "It runs after the exception has been handled outside"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What happens if __exit__ returns True after an exception in the block?",
    "topic": "Context managers — __enter__/__exit__, contextlib",
    "choices": [
      "The exception is re-raised with a modified traceback",
      "The with block is retried from the top",
      "The exception is suppressed and execution continues after the with",
      "The program terminates after cleanup is complete"
    ],
    "answerIdx": 2
  },
  {
    "stem": "In a function decorated with @contextmanager, which code acts as __enter__?",
    "topic": "Context managers — __enter__/__exit__, contextlib",
    "choices": [
      "The code before the yield",
      "The code after the yield",
      "The return statement at the end",
      "The decorator's own arguments"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does with contextlib.suppress(FileNotFoundError): do?",
    "topic": "Context managers — __enter__/__exit__, contextlib",
    "choices": [
      "Logs FileNotFoundError and then retries the block",
      "Converts FileNotFoundError into a warning message",
      "Ignores FileNotFoundError raised inside the block and carries on",
      "Prevents the files in the block from being created"
    ],
    "answerIdx": 2
  },
  {
    "stem": "In with open(a) as f, open(b) as g:, in what order are the files closed?",
    "topic": "Context managers — __enter__/__exit__, contextlib",
    "choices": [
      "f first, then g, in the order of opening",
      "Both at once, in parallel",
      "g first, then f, in reverse of opening order",
      "Only the last one is closed automatically"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why use try/finally around the yield in a @contextmanager generator?",
    "topic": "Context managers — __enter__/__exit__, contextlib",
    "choices": [
      "Without it, the generator would yield its value twice",
      "Without it, cleanup code is skipped when the body raises an exception",
      "Without it, the with statement cannot return a value",
      "Without it, Python never calls the code before the yield"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which tool lets you manage a number of context managers decided at runtime?",
    "topic": "Context managers — __enter__/__exit__, contextlib",
    "choices": [
      "contextlib.ExitStack",
      "contextlib.nullcontext",
      "contextlib.redirect_stdout",
      "contextlib.closing"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which methods does async with call on the object?",
    "topic": "Context managers — __enter__/__exit__, contextlib",
    "choices": [
      "__enter__ and __exit__ inside a thread",
      "__await__ and __close__",
      "__aiter__ and __anext__",
      "__aenter__ and __aexit__"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does a class need so that with Timer() as t: works?",
    "topic": "Context managers — __enter__/__exit__, contextlib",
    "choices": [
      "A __with__ method taking a block",
      "A close() method and a name attribute",
      "An __iter__ method returning itself",
      "__enter__ and __exit__ methods"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the Python interpreter do with a type hint such as x: int = 'hello'?",
    "topic": "Type hints — annotations, Optional, Union, TypedDict, mypy",
    "choices": [
      "Raises TypeError as soon as the line runs",
      "Converts the value to int automatically",
      "Nothing at runtime; hints are not enforced by the interpreter",
      "Raises a warning only when running with -W flags"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is mypy used for?",
    "topic": "Type hints — annotations, Optional, Union, TypedDict, mypy",
    "choices": [
      "Enforcing annotations while the program is executing",
      "Static type checking of annotated code without running it",
      "Generating annotations automatically at import time",
      "Formatting source code to match PEP 8"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does Optional[str] mean?",
    "topic": "Type hints — annotations, Optional, Union, TypedDict, mypy",
    "choices": [
      "Either a str or None",
      "A str that has a default value",
      "A str that may be left out of a call",
      "A str or an empty string"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which is the modern equivalent of Union[int, str]?",
    "topic": "Type hints — annotations, Optional, Union, TypedDict, mypy",
    "choices": [
      "int + str",
      "[int, str]",
      "int or str",
      "int | str"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does a TypedDict describe?",
    "topic": "Type hints — annotations, Optional, Union, TypedDict, mypy",
    "choices": [
      "The expected keys and value types of a dict",
      "A dict subclass with its own methods at runtime",
      "A dict that checks its values when assigned",
      "A dict whose keys are always sorted"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which is the preferred modern way to annotate a list of ints?",
    "topic": "Type hints — annotations, Optional, Union, TypedDict, mypy",
    "choices": [
      "list[int]",
      "List(int)",
      "[int]",
      "list<int>"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does Callable[[int], str] describe?",
    "topic": "Type hints — annotations, Optional, Union, TypedDict, mypy",
    "choices": [
      "A function taking an int or a str and returning nothing",
      "A class with an int attribute and a str method",
      "A function taking one int and returning a str",
      "A function taking a list of ints and returning a str"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the annotation -> None on a function signify?",
    "topic": "Type hints — annotations, Optional, Union, TypedDict, mypy",
    "choices": [
      "The function may return any type at all",
      "The function is not expected to return a value",
      "The function returns the string 'None'",
      "The function can only be called with no arguments"
    ],
    "answerIdx": 1
  },
  {
    "stem": "For def f(x: Optional[int]): ..., is the argument x required in a call?",
    "topic": "Type hints — annotations, Optional, Union, TypedDict, mypy",
    "choices": [
      "No, Optional makes the argument skippable",
      "Yes, Optional only allows None; it does not give a default",
      "No, x defaults to None automatically",
      "Yes, but only when running mypy"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How does a value of type Any differ from object for a type checker?",
    "topic": "Type hints — annotations, Optional, Union, TypedDict, mypy",
    "choices": [
      "Any only accepts None, while object accepts everything",
      "Any disables checks on it, while object only allows operations every object supports",
      "Any is checked at runtime, while object is checked statically",
      "Any must be imported at runtime, while object cannot be annotated"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you define a custom exception in Python?",
    "topic": "Error handling — custom exceptions, exception chaining",
    "choices": [
      "Call Exception.create('AppError') and store the result",
      "Subclass Exception, such as class AppError(Exception): pass",
      "Add an @exception decorator above a function",
      "Subclass BaseException, since Exception is reserved for built-ins"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does raise NewError() from err do?",
    "topic": "Error handling — custom exceptions, exception chaining",
    "choices": [
      "Raises err again after NewError has been handled",
      "Sets err as the explicit __cause__ of the new exception",
      "Replaces err in the traceback without keeping it",
      "Catches err and ignores NewError"
    ],
    "answerIdx": 1
  },
  {
    "stem": "If you raise a new exception inside an except block without using from, what does Python do?",
    "topic": "Error handling — custom exceptions, exception chaining",
    "choices": [
      "Discards the original exception and its traceback",
      "Raises both exceptions at the same time",
      "Chains the old one automatically as __context__",
      "Re-raises the original and ignores the new one"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why should except ValueError come before except Exception in the same try?",
    "topic": "Error handling — custom exceptions, exception chaining",
    "choices": [
      "Python runs every handler, so order only affects the log output",
      "Specific handlers are only valid after a broad one",
      "Exception handlers are checked in alphabetical order of class names",
      "The first matching handler wins, so broad handlers placed first would hide specific ones"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why is a bare except: usually discouraged?",
    "topic": "Error handling — custom exceptions, exception chaining",
    "choices": [
      "It cannot be combined with a finally clause",
      "It also catches KeyboardInterrupt and SystemExit",
      "It only catches errors raised by built-in functions",
      "It hides the traceback from the logging module"
    ],
    "answerIdx": 1
  },
  {
    "stem": "When does the finally block run?",
    "topic": "Error handling — custom exceptions, exception chaining",
    "choices": [
      "Always, whether or not an exception occurred",
      "Only when an exception was raised and handled",
      "Only when the try block finishes without errors",
      "Only when no except clause matched"
    ],
    "answerIdx": 0
  },
  {
    "stem": "When does the else clause of a try statement run?",
    "topic": "Error handling — custom exceptions, exception chaining",
    "choices": [
      "When the try block raised no exception",
      "When an exception was raised and handled",
      "Only if a finally clause is also present",
      "When the exception is a subclass of Exception"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does a bare raise do inside an except block?",
    "topic": "Error handling — custom exceptions, exception chaining",
    "choices": [
      "Re-raises the current exception with its original traceback",
      "Raises a generic RuntimeError instead",
      "Clears the current exception and continues",
      "Raises a new exception with the same message but a fresh traceback"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you catch two exception types with one handler?",
    "topic": "Error handling — custom exceptions, exception chaining",
    "choices": [
      "except (KeyError, IndexError) as e:",
      "except KeyError, IndexError as e:",
      "except KeyError and IndexError as e:",
      "except [KeyError, IndexError] as e:"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does raise NewError() from None do?",
    "topic": "Error handling — custom exceptions, exception chaining",
    "choices": [
      "Raises NewError with no message attached",
      "Suppresses the automatic exception context display",
      "Re-raises the previous exception unchanged",
      "Marks the exception as unhandled by except clauses"
    ],
    "answerIdx": 1
  }
]
```
