LAYER: rails-dev-1

```json
[
  {
    "stem": "How do you interpolate a variable into a Ruby string?",
    "topic": "Variables, methods, and blocks",
    "choices": [
      "With the + operator and a percent sign before the variable",
      "With single quotes and ${name}, as in 'Hello ${name}'",
      "With a backtick string and @name placed inside it",
      "With double quotes and #{name}, as in \"Hello #{name}\""
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does a method return when it has no explicit return statement?",
    "topic": "Variables, methods, and blocks",
    "choices": [
      "Always nil, because Ruby requires an explicit return",
      "The value of its last evaluated expression",
      "The first argument that was passed to the method",
      "The name of the method as a symbol"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which values are falsy in Ruby?",
    "topic": "Variables, methods, and blocks",
    "choices": [
      "Only nil and false",
      "Only false",
      "Any empty collection and the number zero",
      "nil, false, 0 and an empty string"
    ],
    "answerIdx": 0
  },
  {
    "stem": "By Ruby convention, what does a question mark at the end of a method name such as empty? signal?",
    "topic": "Variables, methods, and blocks",
    "choices": [
      "It returns a boolean",
      "It modifies the object in place",
      "It accepts an optional argument",
      "It raises an exception on failure"
    ],
    "answerIdx": 0
  },
  {
    "stem": "By Ruby convention, what does an exclamation mark at the end of a method name such as map! signal?",
    "topic": "Variables, methods, and blocks",
    "choices": [
      "A method that returns a boolean value",
      "A more dangerous variant",
      "A private method that outsiders cannot call",
      "A method that runs in a background thread"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a block in Ruby?",
    "topic": "Variables, methods, and blocks",
    "choices": [
      "A section of the file that runs only once at load time",
      "A data structure for storing key-value pairs",
      "An anonymous chunk of code passed to a method",
      "A group of variables sharing one namespace"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does yield do inside a method?",
    "topic": "Variables, methods, and blocks",
    "choices": [
      "Returns a value from the method and stops it",
      "Calls the block that was passed to the method",
      "Creates a new thread for the method body",
      "Pauses the program until input arrives"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the difference between a Proc and a lambda regarding return?",
    "topic": "Variables, methods, and blocks",
    "choices": [
      "A return inside a lambda exits the lambda",
      "A return inside a proc exits only the proc, while in a lambda it exits the method",
      "They behave identically for return",
      "Neither allows return statements"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does puts add compared with print?",
    "topic": "Variables, methods, and blocks",
    "choices": [
      "A trailing newline after the output",
      "A timestamp before each message",
      "Automatic JSON formatting of the value",
      "Color to the terminal output"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the safe navigation operator in user&.name?",
    "topic": "Variables, methods, and blocks",
    "choices": [
      "Makes the name attribute read-only so that it cannot be assigned afterwards",
      "Converts name to a string safely",
      "Skips the call when user is not saved",
      "Returns nil instead of raising an error when user is nil"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which method transforms every element of an array into a new array?",
    "topic": "Arrays, hashes, and enumerables",
    "choices": [
      "each",
      "inject",
      "select",
      "map"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does each return when used on an array?",
    "topic": "Arrays, hashes, and enumerables",
    "choices": [
      "A new array of the block results",
      "The original array",
      "The number of elements iterated",
      "The last element of the array"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does select { |n| n.even? } return?",
    "topic": "Arrays, hashes, and enumerables",
    "choices": [
      "The first element for which the block is truthy",
      "The count of elements for which the block is truthy",
      "The original array with odd numbers removed in place",
      "A new array with only the elements for"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does reduce(0) { |sum, n| sum + n } compute?",
    "topic": "Arrays, hashes, and enumerables",
    "choices": [
      "The largest element, with 0 as the minimum",
      "The sum of the elements, starting from 0",
      "A new array of partial sums",
      "The count of the elements"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you read the value for key :name from the hash user?",
    "topic": "Arrays, hashes, and enumerables",
    "choices": [
      "user.name only, for every hash",
      "user[:name]",
      "user->name",
      "user.get(name)"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the difference between a symbol and a string in Ruby?",
    "topic": "Arrays, hashes, and enumerables",
    "choices": [
      "Symbols are immutable and unique, so identical symbols are the same object",
      "Strings are unique, while symbols are copied each time",
      "Symbols are always longer than strings",
      "Symbols can be modified in place after creation, while strings are always frozen"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does hash.fetch(:age, 18) do when :age is missing?",
    "topic": "Arrays, hashes, and enumerables",
    "choices": [
      "Returns nil",
      "Raises a KeyError always",
      "Adds :age to the hash with a nil value",
      "Returns the default value 18"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does hash.each_with_object({}) help build?",
    "topic": "Arrays, hashes, and enumerables",
    "choices": [
      "A frozen copy of the hash",
      "A hash with default values for every key",
      "A sorted list of the hash's keys",
      "A new collection while iterating"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does group_by return?",
    "topic": "Arrays, hashes, and enumerables",
    "choices": [
      "The most common element",
      "A count of each distinct element",
      "An array of arrays sorted alphabetically by the result of the given block",
      "A hash mapping each block result to an array of matching elements"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the Enumerable method tally do?",
    "topic": "Arrays, hashes, and enumerables",
    "choices": [
      "Sums all numeric elements",
      "Sorts elements by frequency into an array",
      "Removes duplicates in place",
      "Counts occurrences of each element"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you define a class with an initializer in Ruby?",
    "topic": "Classes, modules, and mixins",
    "choices": [
      "def User(name) @name = name end",
      "class User; def initialize(name); @name = name; end; end",
      "class User { constructor(name) { this.name = name } }",
      "class User; def new(name); self.name = name; end; end"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does attr_accessor :name define?",
    "topic": "Classes, modules, and mixins",
    "choices": [
      "A class method named name",
      "A private constant named name",
      "A getter and a setter for @name",
      "Only a getter for @name"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a module used for?",
    "topic": "Classes, modules, and mixins",
    "choices": [
      "Creating instances with new",
      "Storing configuration files",
      "Grouping methods and constants",
      "Defining a class that cannot be extended"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does include SomeModule in a class do?",
    "topic": "Classes, modules, and mixins",
    "choices": [
      "Adds the module's methods as instance methods of the class",
      "Makes the module's methods class methods",
      "Copies the module's methods into every class in the program",
      "Imports a file from disk"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does extend SomeModule do on a class?",
    "topic": "Classes, modules, and mixins",
    "choices": [
      "Adds the module's methods as class methods",
      "Adds the module's methods as instance methods",
      "Makes the class inherit from the module",
      "Loads the module at runtime from the network"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the method resolution order when a class includes a module?",
    "topic": "Classes, modules, and mixins",
    "choices": [
      "Alphabetical by method name",
      "The superclass first, then the class, and the included modules come last",
      "The class first, then its included modules, then its superclass",
      "Included modules first, then the class"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does private do in a class body?",
    "topic": "Classes, modules, and mixins",
    "choices": [
      "Prevents the methods from being overridden",
      "Hides the class from other files",
      "Makes the methods run faster",
      "Makes the following methods callable only"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is duck typing?",
    "topic": "Classes, modules, and mixins",
    "choices": [
      "Using an object based on the methods it responds to rather than its class",
      "Preventing objects from changing",
      "Converting objects to strings before use",
      "Declaring types for every variable so that objects are checked before they run"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does def self.build define?",
    "topic": "Classes, modules, and mixins",
    "choices": [
      "A private instance method",
      "A constant",
      "A class method",
      "A module"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does super do inside a method?",
    "topic": "Classes, modules, and mixins",
    "choices": [
      "Stops the method immediately",
      "Calls the same method in the parent class or next module in the chain",
      "Creates a copy of the object",
      "Makes the method public so that subclasses can call it from outside the object"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a Ruby symbol?",
    "topic": "Symbols and ranges",
    "choices": [
      "A numeric constant",
      "An immutable, interned identifier written like :status",
      "A kind of block",
      "A mutable string created from a quote that Ruby copies each time it is used"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why are symbols commonly used as hash keys?",
    "topic": "Symbols and ranges",
    "choices": [
      "Hash keys must always be symbols",
      "They can hold multiple values",
      "They are lightweight and compare quickly",
      "They are encrypted by Ruby so that the keys cannot be read from the memory"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does (1..5) create?",
    "topic": "Symbols and ranges",
    "choices": [
      "An array [1, 5]",
      "A range from 1 to 5 inclusive",
      "A hash with keys 1 and 5",
      "A string '1..5'"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does (1...5) differ in?",
    "topic": "Symbols and ranges",
    "choices": [
      "It counts down",
      "It is a string range",
      "It excludes the end value 5",
      "It includes 6"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you iterate over a range with a block?",
    "topic": "Symbols and ranges",
    "choices": [
      "for i in 1..3 do end only in Rails",
      "range(1, 3).forEach(i)",
      "(1..3).each { |i| puts i }",
      "1.to(3) => puts"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does :name.to_proc enable in names.map(&:upcase)?",
    "topic": "Symbols and ranges",
    "choices": [
      "Sorting names in place",
      "Skipping elements that are nil",
      "Calling the named method on each element",
      "Converting the names array into a hash that maps each name to its length"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the splat operator * do in def log(*args)?",
    "topic": "Symbols and ranges",
    "choices": [
      "Expands a hash into variables",
      "Multiplies the arguments together and returns the product to the caller",
      "Collects extra positional arguments into an array",
      "Marks the arguments as optional keywords"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does ** do in def build(**options)?",
    "topic": "Symbols and ranges",
    "choices": [
      "Collects keyword arguments into a hash",
      "Raises numbers to a power and passes the result to the options hash",
      "Passes a block",
      "Doubles the arguments"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the output type of 'a'..'e' converted with to_a?",
    "topic": "Symbols and ranges",
    "choices": [
      "A hash that maps each letter to its position inside the range",
      "An array of strings ['a', 'b', 'c', 'd', 'e']",
      "A single string 'abcde'",
      "An empty array"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which comparison method do Range#cover? and include? both support?",
    "topic": "Symbols and ranges",
    "choices": [
      "Checking whether a value lies within the range",
      "Freezing the range",
      "Sorting the values of the range in ascending order before the check runs",
      "Copying the range"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a gem?",
    "topic": "Gems and Bundler",
    "choices": [
      "A kind of method",
      "A Ruby syntax feature that lets a method accept a block as its last argument",
      "A built-in class",
      "A packaged Ruby library that can be installed and required"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the purpose of a Gemfile?",
    "topic": "Gems and Bundler",
    "choices": [
      "Storing the application's database",
      "Compiling Ruby code",
      "Defining Rails routes",
      "Declaring the gems a project depends on"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does Gemfile.lock record?",
    "topic": "Gems and Bundler",
    "choices": [
      "The environment variables",
      "The exact gem versions that were resolved and installed",
      "The list of unused gems that bundler recommends removing from the project",
      "The Ruby source code"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does bundle install do?",
    "topic": "Gems and Bundler",
    "choices": [
      "Updates every gem to its latest available version and rewrites the lock file",
      "Installs gems listed in the Gemfile at their locked versions",
      "Creates a new Gemfile",
      "Removes gems from the system"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does bundle exec do?",
    "topic": "Gems and Bundler",
    "choices": [
      "Runs a command using the gem versions from the Gemfile.lock",
      "Compiles the application into a single file before running the command",
      "Deletes unused gems",
      "Executes the Gemfile as Ruby code only"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does ~> 7.1 mean in a Gemfile version constraint?",
    "topic": "Gems and Bundler",
    "choices": [
      "Any version from 7.1 up to",
      "Anything above 7.1, including 9.0",
      "Versions below 7.1",
      "Exactly 7.1"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you load a gem's code in a plain Ruby script?",
    "topic": "Gems and Bundler",
    "choices": [
      "import 'json'",
      "load.gem 'json'",
      "include 'json'",
      "require 'json'"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why group gems under :development and :test?",
    "topic": "Gems and Bundler",
    "choices": [
      "They are free in those environments",
      "They are faster in those environments",
      "They're installed only where needed",
      "Rails requires every gem to be grouped"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a risk of not committing Gemfile.lock for an application?",
    "topic": "Gems and Bundler",
    "choices": [
      "Different machines may resolve different versions and behave differently",
      "Gems stop installing, because bundler refuses to resolve versions without it",
      "Rails removes the gems",
      "Ruby crashes on startup"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does bundle update rails do?",
    "topic": "Gems and Bundler",
    "choices": [
      "Reinstalls Ruby itself so that the gem can use the newest interpreter version",
      "Rolls back to the first version",
      "Deletes the Gemfile.lock",
      "Updates rails and its dependencies within the Gemfile constraints"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you rescue an exception in Ruby?",
    "topic": "Exception handling",
    "choices": [
      "risky or handle(e)",
      "on_error risky do |e| end",
      "try { risky } catch (e) { handle }, which is the syntax used by Ruby 3",
      "begin; risky; rescue StandardError => e; handle; end"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does ensure do?",
    "topic": "Exception handling",
    "choices": [
      "Prevents exceptions from being raised",
      "Runs only when no exception is raised",
      "Runs its block whether or not an exception occurred",
      "Runs only when an exception is raised, so that the error can be reported"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does retry do inside a rescue block?",
    "topic": "Exception handling",
    "choices": [
      "Ignores the exception",
      "Re-runs the begin block from the start",
      "Exits the program",
      "Raises the exception again to the caller, without running the begin block"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why rescue a specific exception class instead of a bare rescue Exception?",
    "topic": "Exception handling",
    "choices": [
      "Specific classes are required by Ruby",
      "Bare rescue is slower, because Ruby has to check every class in the hierarchy",
      "Rescuing everything can hide serious problems like interrupts and system errors",
      "Exception cannot be rescued"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does raise 'oops' do?",
    "topic": "Exception handling",
    "choices": [
      "Returns the string oops",
      "Prints oops and continues running the program with the next statement",
      "Raises a RuntimeError with that message",
      "Logs oops to a file"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you define a custom error class?",
    "topic": "Exception handling",
    "choices": [
      "error MyError",
      "class MyError < Object; end",
      "class MyError < StandardError; end",
      "def MyError; end"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the default exception class rescued by a bare rescue clause?",
    "topic": "Exception handling",
    "choices": [
      "StandardError",
      "RuntimeError only",
      "SystemExit",
      "Exception"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does raise (with no arguments) inside a rescue block do?",
    "topic": "Exception handling",
    "choices": [
      "Ends the block quietly",
      "Clears the exception",
      "Raises a new empty exception",
      "Re-raises the current exception"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a good reason to define custom exceptions in an application?",
    "topic": "Exception handling",
    "choices": [
      "Callers can rescue specific failure types and respond appropriately",
      "They run faster",
      "They are required by Rails",
      "Ruby forbids built-in errors in apps, so each failure needs its own class"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the benefit of failing fast with a clear error?",
    "topic": "Exception handling",
    "choices": [
      "Tests become unnecessary",
      "Problems surface close to their cause and are easier to fix",
      "Errors are hidden from users",
      "Programs run faster because failed code paths are skipped by the interpreter"
    ],
    "answerIdx": 1
  }
]
```

LAYER: rails-dev-2

```json
[
  {
    "stem": "Which directory holds a Rails app's models, views and controllers?",
    "topic": "Rails project structure",
    "choices": [
      "config, which holds routes and environment settings",
      "app",
      "db, which holds migrations and the schema file",
      "lib, which holds shared code that is loaded on demand"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Where are routes defined in a Rails app?",
    "topic": "Rails project structure",
    "choices": [
      "config/routes.rb",
      "db/routes.rb, next to the schema and the migrations",
      "app/routes/index.rb, one file per controller in the project",
      "lib/tasks/routes.rake, which Rake loads when the server starts"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the purpose of the db directory?",
    "topic": "Rails project structure",
    "choices": [
      "The compiled assets that browsers download",
      "The cached views that Rails renders at boot",
      "Migrations, the schema file and seeds",
      "The logs that the server writes during each request"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Where does Rails keep environment-specific settings such as production.rb?",
    "topic": "Rails project structure",
    "choices": [
      "lib/environments, which is read by the Rake tasks",
      "app/environments, loaded together with the models",
      "config/environments",
      "db/environments, which holds one database per setting"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the public directory for?",
    "topic": "Rails project structure",
    "choices": [
      "Static files served directly",
      "Uploaded files that are deleted at every deploy",
      "The generated documentation for each model class",
      "Controllers that can be called without logging in"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the Gemfile at the project root define?",
    "topic": "Rails project structure",
    "choices": [
      "The gem dependencies of the application",
      "The deployment settings for the hosting provider",
      "The database tables and their columns",
      "The routes and the controllers behind them"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Where do background job classes live by default?",
    "topic": "Rails project structure",
    "choices": [
      "app/workers/jobs/queue",
      "app/jobs",
      "config/jobs",
      "lib/jobs/background"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What lives in the log directory?",
    "topic": "Rails project structure",
    "choices": [
      "Compiled JavaScript bundles for the browser",
      "Database backups created by migrations",
      "Test fixtures for the model tests",
      "Log files such as development.log"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is bin/rails?",
    "topic": "Rails project structure",
    "choices": [
      "A file that stores the application's routes",
      "A script that compiles stylesheets only",
      "A folder of binary images that the asset pipeline serves from the public directory",
      "The executable that runs Rails commands like server and console"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does app/helpers contain?",
    "topic": "Rails project structure",
    "choices": [
      "View helper modules that are available in templates",
      "Classes that help the database connect",
      "Helper scripts for deploying the application",
      "Test helpers that are loaded in every spec"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does get '/posts', to: 'posts#index' route to?",
    "topic": "Routes, controllers, and views",
    "choices": [
      "A view named posts_index.html",
      "The show action of PostController",
      "The index action of PostsController",
      "A model method called index"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does resources :posts generate?",
    "topic": "Routes, controllers, and views",
    "choices": [
      "Seven RESTful routes for posts",
      "A controller file with seven empty methods",
      "A single route for the posts index only",
      "A database table named posts"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the path helper for the posts index route?",
    "topic": "Routes, controllers, and views",
    "choices": [
      "index_posts",
      "posts_url_path",
      "post_index_path",
      "posts_path"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which command lists all the routes of the application?",
    "topic": "Routes, controllers, and views",
    "choices": [
      "bin/rails show routes",
      "bin/rails app:routes",
      "bin/rails list:routes",
      "bin/rails routes"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What file does the posts#show action render by default?",
    "topic": "Routes, controllers, and views",
    "choices": [
      "app/views/posts/show.html.erb",
      "app/controllers/posts/show.erb",
      "app/views/post_show.html",
      "config/views/posts/show.html"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you pass data from a controller to its view?",
    "topic": "Routes, controllers, and views",
    "choices": [
      "Call render with a global variable",
      "Write to the session",
      "Assign instance variables such as @post",
      "Return a hash from the action"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which method gets URL parameters like the id in /posts/5?",
    "topic": "Routes, controllers, and views",
    "choices": [
      "params[:id]",
      "request.id",
      "url[:id]",
      "path.id"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does redirect_to posts_path do?",
    "topic": "Routes, controllers, and views",
    "choices": [
      "Reloads the controller class",
      "Sends the browser to a new URL with a redirect response",
      "Writes a log entry for the route",
      "Renders the posts view without a new request, keeping the current URL as it is"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the show action usually do?",
    "topic": "Routes, controllers, and views",
    "choices": [
      "Lists every record of the model so that the user can pick one of them to edit",
      "Loads one record and renders it",
      "Deletes a record",
      "Creates a record"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a before_action in a controller?",
    "topic": "Routes, controllers, and views",
    "choices": [
      "A migration that runs before the database",
      "A view helper that runs after rendering",
      "A callback that runs before the listed actions",
      "A route constraint"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does MVC stand for in Rails?",
    "topic": "The MVC pattern",
    "choices": [
      "Method, Value, Callback",
      "Mapper, Viewer, Compiler",
      "Module, Variable, Class",
      "Model, View, Controller"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the role of the model?",
    "topic": "The MVC pattern",
    "choices": [
      "Rendering HTML for the browser",
      "Compiling assets",
      "Mapping URLs to code",
      "Business data and rules"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the role of the controller?",
    "topic": "The MVC pattern",
    "choices": [
      "Manages the gem dependencies",
      "Draws the final HTML layout",
      "Stores data in tables and enforces the rules that records have to follow when saved",
      "Receives requests, coordinates models and chooses a response"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the role of the view?",
    "topic": "The MVC pattern",
    "choices": [
      "Handles database migrations",
      "Presents data, typically as HTML",
      "Stores the session",
      "Decides which route to call"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which layer should contain complex business rules ideally?",
    "topic": "The MVC pattern",
    "choices": [
      "The Gemfile",
      "Models or service objects",
      "Views, next to the markup",
      "Routes"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why keep logic out of views?",
    "topic": "The MVC pattern",
    "choices": [
      "The browser forbids logic",
      "Views cannot run Ruby code, so every condition has to be computed in the controller",
      "Views stay simple and easier to read and test",
      "Views are compiled before models"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the 'fat model, skinny controller' idea suggest?",
    "topic": "The MVC pattern",
    "choices": [
      "Controllers stay thin by pushing logic into the model layer",
      "Views should contain the model logic",
      "Models should only hold data fields, with all of the rules kept in the controller",
      "Controllers should do all the work"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which class does ApplicationController usually serve as?",
    "topic": "The MVC pattern",
    "choices": [
      "A view helper",
      "The base class for models, which gives each model its connection to the database",
      "The router",
      "The base class for the other controllers"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the request flow in Rails?",
    "topic": "The MVC pattern",
    "choices": [
      "View, then controller, then router",
      "Router, then controller action",
      "Model, then router, then view",
      "Database, then browser, then controller"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does render do in a controller?",
    "topic": "The MVC pattern",
    "choices": [
      "Opens a database connection",
      "Produces the response body from a template or other content",
      "Runs a migration",
      "Redirects the browser to a new URL and ends the current request immediately"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does convention over configuration mean?",
    "topic": "Convention over configuration",
    "choices": [
      "Every setting must be written out explicitly",
      "Sensible defaults reduce the setup",
      "Conventions apply only to the database",
      "Configuration files are forbidden"
    ],
    "answerIdx": 1
  },
  {
    "stem": "By convention, a Post model maps to which table?",
    "topic": "Convention over configuration",
    "choices": [
      "post_table",
      "Posts",
      "post",
      "posts"
    ],
    "answerIdx": 3
  },
  {
    "stem": "By convention, PostsController handles which URLs under resources :posts?",
    "topic": "Convention over configuration",
    "choices": [
      "/posts and /posts/:id",
      "/controllers/posts",
      "/post",
      "/index"
    ],
    "answerIdx": 0
  },
  {
    "stem": "By convention, where does Rails look for the view of PostsController#index?",
    "topic": "Convention over configuration",
    "choices": [
      "app/views/posts/index",
      "app/posts/views",
      "app/views/index/posts",
      "views/posts_index"
    ],
    "answerIdx": 0
  },
  {
    "stem": "By convention, what is the primary key column called?",
    "topic": "Convention over configuration",
    "choices": [
      "key",
      "id",
      "pk",
      "primary"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the naming convention for file posts_controller.rb reflect?",
    "topic": "Convention over configuration",
    "choices": [
      "The snake_case file name matches the class PostsController",
      "The file name must end in .rails",
      "The class name must be lowercase",
      "Any name works, because Rails scans every file for classes that inherit from the base"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the benefit of following Rails conventions?",
    "topic": "Convention over configuration",
    "choices": [
      "Faster hardware, because Rails compiles conventional code into native machine code",
      "Automatic tests",
      "Smaller databases",
      "Less code and easier onboarding because projects look alike"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What happens if you break a convention, such as a custom table name?",
    "topic": "Convention over configuration",
    "choices": [
      "Rails silently picks a name for the table from the model and ignores the new setting",
      "Rails deletes the model",
      "You must configure it explicitly, for example with table_name",
      "The app refuses to start"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does autoloading rely on to find classes?",
    "topic": "Convention over configuration",
    "choices": [
      "A list in config/classes.yml",
      "Constant names matching file paths",
      "Manual require statements",
      "The Gemfile.lock"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which foreign key name does Rails expect for a post's author by convention?",
    "topic": "Convention over configuration",
    "choices": [
      "post_author",
      "author",
      "id_author",
      "author_id"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does bin/rails console give you?",
    "topic": "The Rails console",
    "choices": [
      "A log viewer",
      "A web page listing the routes and the controllers of the running application",
      "An interactive Ruby session with the app loaded",
      "A graphical database tool"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a safe way to experiment with data changes in the console?",
    "topic": "The Rails console",
    "choices": [
      "Run it on production, where the data is realistic and you can check the results",
      "Disable validations",
      "Edit the database file",
      "Run bin/rails console --sandbox so changes roll back on exit"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you load the latest version of a changed file in a running console?",
    "topic": "The Rails console",
    "choices": [
      "Delete the log",
      "Run bundle update",
      "Restart the computer",
      "Call reload!"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which console call finds a record with id 1?",
    "topic": "The Rails console",
    "choices": [
      "Post.find(1)",
      "Post.fetch(1)",
      "Post.get(1)",
      "Post.id(1)"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does Post.count return?",
    "topic": "The Rails console",
    "choices": [
      "The number of columns in the posts table, as defined by the latest schema",
      "The number of controllers",
      "The number of rows in the posts table",
      "The number of routes"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the last line of console output show for an expression?",
    "topic": "The Rails console",
    "choices": [
      "The environment",
      "The routes",
      "Its return value",
      "The log"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why avoid the production console for casual experiments?",
    "topic": "The Rails console",
    "choices": [
      "Production has no models",
      "The console cannot connect",
      "The console is read-only",
      "Changes affect real data"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which console command shows a model's attributes and types?",
    "topic": "The Rails console",
    "choices": [
      "Post.fields_list, which prints every attribute and the type that it was saved with",
      "Post.column_names or Post.columns",
      "Post.describe!",
      "Post.schema_dump"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does Post.first return?",
    "topic": "The Rails console",
    "choices": [
      "All records of the posts table, ordered by the time they were created",
      "The last record",
      "The first record ordered by primary key, or nil",
      "A count"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How can you test a view helper in the console?",
    "topic": "The Rails console",
    "choices": [
      "Edit the Gemfile",
      "Open the browser",
      "Use helper.method_name",
      "Call it from routes"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does bin/rails generate model Post title:string do?",
    "topic": "Generators and scaffolding",
    "choices": [
      "Installs a gem",
      "Creates a model file",
      "Creates a database server",
      "Starts the server"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does bin/rails generate scaffold Post title:string produce?",
    "topic": "Generators and scaffolding",
    "choices": [
      "Only a migration that adds the table, with no model, controller or views in the app",
      "Only a view",
      "Only a model test",
      "A model, migration, controller, views and routes for CRUD"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a downside of scaffolds in real projects?",
    "topic": "Generators and scaffolding",
    "choices": [
      "They generate generic code you usually need to adapt",
      "They cannot run until every generated file has been renamed by hand in the project",
      "They require extra gems",
      "They delete data"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which command undoes a generator's files?",
    "topic": "Generators and scaffolding",
    "choices": [
      "bin/rails destroy model Post",
      "bin/rails undo model Post",
      "bin/rails revert Post",
      "bin/rails remove Post"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What do you need to run after generating a migration?",
    "topic": "Generators and scaffolding",
    "choices": [
      "bin/rails db:start",
      "bin/rails db:migrate",
      "bin/rails assets:clean",
      "bin/rails server"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does bin/rails generate controller Pages home do?",
    "topic": "Generators and scaffolding",
    "choices": [
      "Starts a Pages server",
      "Creates a Pages controller with a home action and view",
      "Creates a Pages table",
      "Creates a Pages model together with a migration for the pages table"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you see available generators?",
    "topic": "Generators and scaffolding",
    "choices": [
      "bin/rails show generators",
      "bin/rails list generators",
      "bin/rails generate",
      "bin/rails help generators-list"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why read generated code before keeping it?",
    "topic": "Generators and scaffolding",
    "choices": [
      "It's encrypted",
      "Generated code is always perfect, so reading it only slows down the work",
      "You should understand and trim what you commit",
      "It will be deleted"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the --skip-... style option on generators do?",
    "topic": "Generators and scaffolding",
    "choices": [
      "Leaves out specific generated pieces",
      "Deletes the app",
      "Skips the whole command and reports that nothing has been generated for the app",
      "Runs tests only"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What do generated migration filenames start with?",
    "topic": "Generators and scaffolding",
    "choices": [
      "The gem name",
      "A random word",
      "A timestamp",
      "The model name"
    ],
    "answerIdx": 2
  }
]
```

LAYER: rails-dev-3

```json
[
  {
    "stem": "What is an Active Record migration?",
    "topic": "Models and migrations",
    "choices": [
      "A view template for rendering database tables",
      "A cached query kept in memory between two requests",
      "A command that copies records from one database server to another one in the cluster",
      "A Ruby file that describes a versioned change to the database schema"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which command creates a migration that adds an email column to users?",
    "topic": "Models and migrations",
    "choices": [
      "bin/rails generate migration AddEmailToUsers email:string",
      "bin/rails generate column users email:string, which also updates db/schema.rb",
      "bin/rails new migration email users",
      "bin/rails db:add_column users email"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does bin/rails db:migrate do?",
    "topic": "Models and migrations",
    "choices": [
      "Reverts the most recent migration only",
      "Compiles the models into SQL files",
      "Runs pending migrations and updates db/schema.rb",
      "Deletes the database and recreates it from the seeds"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does bin/rails db:rollback do?",
    "topic": "Models and migrations",
    "choices": [
      "Reverts the most recent migration",
      "Reverts every migration in the project",
      "Deletes the schema file",
      "Reruns the last migration forward"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is db/schema.rb?",
    "topic": "Models and migrations",
    "choices": [
      "A backup of the production data",
      "A file that stores the seed data for tables",
      "A hand-written list of the pending migrations that Rails applies in the given order",
      "A snapshot of the current database structure generated from migrations"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the change method in a migration allow?",
    "topic": "Models and migrations",
    "choices": [
      "Rails can reverse many migration steps automatically on rollback",
      "Rails runs the migration twice for safety, once forward and once in the other direction",
      "The migration skips the schema file",
      "The migration runs only in production"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why should you not edit a migration that has been shared and run elsewhere?",
    "topic": "Models and migrations",
    "choices": [
      "Edited migrations delete the data automatically",
      "Rails forbids editing any file in db/migrate",
      "Other environments already ran the old version",
      "Git cannot track changes to migrations"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which column type stores a long block of text?",
    "topic": "Models and migrations",
    "choices": [
      "varchar, which Rails does not support",
      "blob, which only stores binary files",
      "text",
      "string, which is limited to 255 characters in every database"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does t.references :user add in a create_table block?",
    "topic": "Models and migrations",
    "choices": [
      "A validation for the user",
      "A user_id column, usually with an index and foreign key option",
      "A new users table that is created and linked to the table of the current model",
      "A method named user on the model"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does null: false on a column do?",
    "topic": "Models and migrations",
    "choices": [
      "Hides the column from forms",
      "Makes the column read-only",
      "Prevents the column from storing NULL at the database level",
      "Allows empty strings only, because NULL is replaced by the database default value"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What do the letters CRUD stand for?",
    "topic": "CRUD with Active Record",
    "choices": [
      "Cache, Retrieve, Unlock, Drop",
      "Create, Read, Update, Delete",
      "Copy, Run, Undo, Deploy",
      "Compile, Render, Upload, Download"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which line creates and saves a new post in one step?",
    "topic": "CRUD with Active Record",
    "choices": [
      "Post.insert_one(title: 'Hello')",
      "Post.make!(title: 'Hello').commit",
      "Post.add(title: 'Hello')",
      "Post.create(title: 'Hello')"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the difference between new and create?",
    "topic": "CRUD with Active Record",
    "choices": [
      "They are identical",
      "new builds an unsaved object",
      "new saves the object, while create only builds it",
      "create works only in the console"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does Post.find(99) do when no record exists?",
    "topic": "CRUD with Active Record",
    "choices": [
      "Returns nil silently so that the caller can decide what to do next",
      "Creates a new empty record",
      "Returns an empty array",
      "Raises ActiveRecord::RecordNotFound"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does find_by(email: 'a@b.com') return when nothing matches?",
    "topic": "CRUD with Active Record",
    "choices": [
      "An empty array",
      "nil",
      "A new record",
      "Raises RecordNotFound"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you update a record's title and save it in one step?",
    "topic": "CRUD with Active Record",
    "choices": [
      "Post.set(post, title: 'New')",
      "post.update(title: 'New')",
      "post.change!(title: 'New')",
      "post.save(title: 'New') only"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does post.destroy do?",
    "topic": "CRUD with Active Record",
    "choices": [
      "Hides the record without deleting it",
      "Deletes the record and runs its callbacks",
      "Deletes the whole table",
      "Sets all attributes to nil"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the difference between destroy and delete?",
    "topic": "CRUD with Active Record",
    "choices": [
      "delete runs callbacks, while destroy skips them",
      "delete skips callbacks, while destroy runs them",
      "They are the same method",
      "delete is only available for associations"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does save return when validations fail?",
    "topic": "CRUD with Active Record",
    "choices": [
      "false",
      "An exception is always raised",
      "The record with errors removed",
      "nil"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does save! do on a failed validation?",
    "topic": "CRUD with Active Record",
    "choices": [
      "Logs a warning only",
      "Raises ActiveRecord::RecordInvalid",
      "Returns false and keeps the changes in memory without raising any exception",
      "Skips validations"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you declare that a User has many posts?",
    "topic": "Associations",
    "choices": [
      "has_many :posts in User",
      "belongs_to :posts in User",
      "many :posts in User",
      "has_one :posts in Post"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which side of a one-to-many association holds the foreign key?",
    "topic": "Associations",
    "choices": [
      "A separate join table always",
      "The has_many side, such as users.post_id",
      "Neither",
      "The belongs_to side, such as posts.user_id"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does belongs_to :user in Post require by default in recent Rails?",
    "topic": "Associations",
    "choices": [
      "A table named belongs",
      "A migration named belongs_to",
      "Nothing; users are optional",
      "A user to be present"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which association needs a join table?",
    "topic": "Associations",
    "choices": [
      "has_and_belongs_to_many or has_many :through",
      "has_many without options",
      "belongs_to",
      "has_one, because each side of the pair stores the other record's primary key"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does dependent: :destroy do on has_many :comments?",
    "topic": "Associations",
    "choices": [
      "Archives the comments",
      "Prevents the parent from being destroyed while child comments still exist",
      "Destroys the comments when the parent is destroyed",
      "Copies the comments"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does has_many :through allow?",
    "topic": "Associations",
    "choices": [
      "A single-table relationship in which a record is linked to rows of its own table",
      "Querying two databases",
      "Deleting tables in the database",
      "Many-to-many with a join model that can hold extra attributes"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does user.posts.build(title: 'Hi') do?",
    "topic": "Associations",
    "choices": [
      "Saves a new post and links it to the user in the same database transaction",
      "Builds a new unsaved post linked to the user",
      "Finds posts with the title Hi",
      "Deletes a post"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How can you avoid N+1 queries when listing posts with their authors?",
    "topic": "Associations",
    "choices": [
      "Call author in a loop",
      "Use includes(:author)",
      "Use find_by",
      "Use destroy_all"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does a polymorphic association allow?",
    "topic": "Associations",
    "choices": [
      "Multiple databases",
      "A model to belong to more than one other model through one association",
      "Dynamic method names",
      "A model to have no table of its own and read its columns from the parent model"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does has_one differ from has_many in?",
    "topic": "Associations",
    "choices": [
      "It expects at most one associated record",
      "It deletes records",
      "It works only with joins",
      "It needs no foreign key because the associated record is stored in the same row"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does validates :title, presence: true do?",
    "topic": "Validations",
    "choices": [
      "Capitalizes the title",
      "Hides the title",
      "Requires title to be present for the record to be valid",
      "Creates a title column in the database table when the model class is first loaded"
    ],
    "answerIdx": 2
  },
  {
    "stem": "When do Active Record validations run by default?",
    "topic": "Validations",
    "choices": [
      "When the model class loads",
      "Before save, create and update",
      "Only in production",
      "On every query"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How can you check validation errors on a record?",
    "topic": "Validations",
    "choices": [
      "record.problems",
      "record.check_all",
      "record.errors.full_messages",
      "record.warnings, which lists the problems that were found while saving the record"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does validates :email, uniqueness: true have as a limitation?",
    "topic": "Validations",
    "choices": [
      "It cannot be combined with other validations",
      "It runs after the record is saved",
      "It works only for numbers",
      "It has a race condition"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which validation checks length between 3 and 50?",
    "topic": "Validations",
    "choices": [
      "validates :name, size: 3..50 only",
      "validates :name, length: { in: 3..50 }",
      "validates :name, between: 3..50",
      "validates :name, range: 3, 50"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the format validation use?",
    "topic": "Validations",
    "choices": [
      "The column's SQL type",
      "A list of file extensions",
      "A date format string only, which is checked against the value of the column",
      "A regular expression through the with option"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does validate :custom_check (singular) let you do?",
    "topic": "Validations",
    "choices": [
      "Run a custom method that adds errors",
      "Skip all of the other validations on the model for the record that is being saved",
      "Define a column",
      "Disable the database"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the difference between a validation and a database constraint?",
    "topic": "Validations",
    "choices": [
      "They are the same",
      "Validations run in the database",
      "Constraints run only in tests",
      "A validation runs in the app"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does valid? do?",
    "topic": "Validations",
    "choices": [
      "Checks the schema",
      "Deletes invalid records",
      "Runs validations and returns true or false without saving",
      "Saves the record when every validation passes and returns the saved instance"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How can you skip validations (to be avoided in most cases)?",
    "topic": "Validations",
    "choices": [
      "save!(none)",
      "save.bypass",
      "save(validate: false)",
      "save(skip: true)"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a scope in Active Record?",
    "topic": "Query interface and scopes",
    "choices": [
      "A named, chainable query defined on the model",
      "A view helper",
      "A route namespace",
      "A visibility keyword that controls which methods other classes are allowed to call"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you define a scope for published posts?",
    "topic": "Query interface and scopes",
    "choices": [
      "scope :published, -> { where(published: true) }",
      "scope :published { where published }, which Rails evaluates lazily on each call",
      "published :scope, where: true",
      "def self.published = true"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does Post.where(published: true).order(created_at: :desc) return?",
    "topic": "Query interface and scopes",
    "choices": [
      "A relation of published posts",
      "A single post",
      "An array that is already loaded",
      "A count"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why is a relation called lazy?",
    "topic": "Query interface and scopes",
    "choices": [
      "It never runs",
      "It runs once at boot and then keeps the results cached for the rest of the process",
      "The query runs only when the results are needed",
      "It runs in the browser"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does pluck(:title) do?",
    "topic": "Query interface and scopes",
    "choices": [
      "Returns an array of title values",
      "Returns the first title column only as a record",
      "Renames the column",
      "Deletes titles"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does Post.where(\"title = '#{params[:q]}'\") risk?",
    "topic": "Query interface and scopes",
    "choices": [
      "SQL injection, because user input goes into the SQL string",
      "Nothing, since Rails escapes strings automatically",
      "Slow queries only, since Rails already escapes every string that it interpolates",
      "A syntax error"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the safe way to pass user input into a where clause?",
    "topic": "Query interface and scopes",
    "choices": [
      "Post.where('title = ?', params[:q]) or a hash condition",
      "Concatenating with +",
      "String interpolation, since Rails escapes the value before it reaches the database",
      "eval"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does limit(10).offset(20) do?",
    "topic": "Query interface and scopes",
    "choices": [
      "Deletes 10 records",
      "Returns 20 records after the first 10, starting from the newest ones in the table",
      "Returns every 10th record",
      "Returns 10 records starting after the first 20"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does exists? return?",
    "topic": "Query interface and scopes",
    "choices": [
      "A count",
      "The SQL string",
      "true or false depending on whether a matching record exists",
      "The matching record, or nil when the table does not contain any such record"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does joins(:comments) do?",
    "topic": "Query interface and scopes",
    "choices": [
      "Loads comments into memory eagerly",
      "Creates a comments table",
      "Deletes comments",
      "Adds an INNER JOIN to the query"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which gem lets Rails talk to PostgreSQL?",
    "topic": "Switching to PostgreSQL",
    "choices": [
      "mysql2",
      "sqlite3",
      "pg",
      "redis"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Where do you configure the database connection in Rails?",
    "topic": "Switching to PostgreSQL",
    "choices": [
      "app/models/database.rb",
      "Gemfile.lock",
      "config/routes.rb",
      "config/database.yml"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you create the databases for the configured environments?",
    "topic": "Switching to PostgreSQL",
    "choices": [
      "bin/rails db:start",
      "bin/rails new:database",
      "bin/rails db:create",
      "bin/rails db:init!"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why use PostgreSQL in development if production uses PostgreSQL?",
    "topic": "Switching to PostgreSQL",
    "choices": [
      "It is the only option for development, since other databases need extra gems to run",
      "SQLite cannot store text",
      "Behavior matches production, avoiding surprises",
      "PostgreSQL needs no setup"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a risk of developing on SQLite while deploying on PostgreSQL?",
    "topic": "Switching to PostgreSQL",
    "choices": [
      "SQLite cannot run migrations, so the schema file has to be edited by hand for each change",
      "SQLite prevents testing",
      "Rails refuses to start",
      "Differences in types and SQL can hide bugs until production"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How should the database password reach the app in production?",
    "topic": "Switching to PostgreSQL",
    "choices": [
      "Through an environment variable such as DATABASE_URL",
      "Hard-coded in database.yml and committed, so every developer uses the same password",
      "In the README",
      "In a public JavaScript file"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does DATABASE_URL contain?",
    "topic": "Switching to PostgreSQL",
    "choices": [
      "The app's routes",
      "The connection details of the database in one URL",
      "The path to the schema file and the number of the latest migration that was applied",
      "The list of pending migrations"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does bin/rails db:setup do?",
    "topic": "Switching to PostgreSQL",
    "choices": [
      "Deletes all databases and then starts the server with the configured seed data",
      "Runs only the seeds",
      "Starts the server",
      "Creates the database, loads the schema and seeds it"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does bin/rails db:reset do?",
    "topic": "Switching to PostgreSQL",
    "choices": [
      "Reverts the last migration only and keeps the rows that were added in the meantime",
      "Drops the database and recreates it from the schema and seeds",
      "Clears logs",
      "Updates gems"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which database feature helps prevent duplicates reliably?",
    "topic": "Switching to PostgreSQL",
    "choices": [
      "A view",
      "A comment on the column",
      "A unique index",
      "A model callback only"
    ],
    "answerIdx": 2
  }
]
```

LAYER: rails-dev-4

```json
[
  {
    "stem": "What does <%= @post.title %> do in an ERB template?",
    "topic": "ERB templates and layouts",
    "choices": [
      "Declares @post as a new instance variable for the template",
      "Evaluates the Ruby expression",
      "Runs the Ruby code but prints nothing into the page output",
      "Comments out the line so that it is skipped during rendering"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does <% ... %> (without =) do?",
    "topic": "ERB templates and layouts",
    "choices": [
      "Imports a file from the app/views directory",
      "Runs Ruby code without printing its return value",
      "Defines a partial inside the current template",
      "Prints the value with no HTML escaping applied"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How does ERB protect against XSS by default in Rails?",
    "topic": "ERB templates and layouts",
    "choices": [
      "It blocks inline JavaScript in all browsers",
      "It removes every script tag from the database",
      "It encrypts the template output",
      "It HTML-escapes values printed with <%= %>"
    ],
    "answerIdx": 3
  },
  {
    "stem": "When should you use raw or html_safe?",
    "topic": "ERB templates and layouts",
    "choices": [
      "For every user-provided string, so that it is shown exactly as it was typed",
      "To make pages load faster",
      "To translate text",
      "Only for content you trust completely, since it skips escaping"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a layout in Rails?",
    "topic": "ERB templates and layouts",
    "choices": [
      "A template that wraps views",
      "A database table",
      "A routing file",
      "A CSS grid system for pages"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which call inserts the current view's content into the layout?",
    "topic": "ERB templates and layouts",
    "choices": [
      "<%= render_layout %>",
      "<%= include_view %>",
      "<%= yield %>",
      "<%= content_here %>"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which helper outputs the CSRF meta tags in the layout head?",
    "topic": "ERB templates and layouts",
    "choices": [
      "csrf_meta_tags",
      "protect_tags",
      "security_head",
      "form_tokens"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How can a view add content to a named section of the layout?",
    "topic": "ERB templates and layouts",
    "choices": [
      "With content_for :title and yield :title in the layout",
      "With a JavaScript include",
      "By editing the layout from the controller",
      "With a global variable"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How does a controller pick a different layout?",
    "topic": "ERB templates and layouts",
    "choices": [
      "By editing routes.rb",
      "By renaming the view file so that it matches the name of the layout it needs",
      "By adding a gem",
      "With layout 'admin' in the controller"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which file extension indicates an HTML template using ERB?",
    "topic": "ERB templates and layouts",
    "choices": [
      "html.rb",
      "rb.html",
      "html.erb",
      "erb.html"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a partial?",
    "topic": "Partials and helpers",
    "choices": [
      "A reusable fragment of a view",
      "A migration that has been half applied",
      "A model that is only partly saved",
      "A route that matches part of the URL"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How are partial file names written?",
    "topic": "Partials and helpers",
    "choices": [
      "With a trailing underscore",
      "In the config folder",
      "In uppercase",
      "With a leading underscore"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does render @posts do?",
    "topic": "Partials and helpers",
    "choices": [
      "Renders a single combined post that contains the fields of every record at once",
      "Loads the posts from the cache",
      "Renders the _post partial once for each post in the collection",
      "Redirects to the posts index"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you pass a local variable to a partial?",
    "topic": "Partials and helpers",
    "choices": [
      "render 'post', post: @post",
      "render 'post' with @post",
      "render partial: post",
      "pass(:post, @post)"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What are view helpers?",
    "topic": "Partials and helpers",
    "choices": [
      "Ruby methods available in views, such as link_to",
      "Test utilities",
      "Extra database tables that Rails creates for each view in the application",
      "JavaScript libraries"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does link_to 'Home', root_path generate?",
    "topic": "Partials and helpers",
    "choices": [
      "An anchor tag pointing at the root path",
      "A JavaScript redirect",
      "A button that submits a form",
      "A script tag"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Where do you define your own view helper methods?",
    "topic": "Partials and helpers",
    "choices": [
      "In config/initializers only",
      "In modules under app/helpers",
      "In db/seeds.rb",
      "In app/models"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why move complex logic from a view into a helper?",
    "topic": "Partials and helpers",
    "choices": [
      "Helpers run on the client, so they can respond to clicks without a request",
      "Helpers are cached forever",
      "Views cannot call methods",
      "Views stay readable and the logic can be tested"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the image_tag helper do?",
    "topic": "Partials and helpers",
    "choices": [
      "Builds an img tag with the correct asset path",
      "Resizes an image",
      "Stores an image in the database",
      "Uploads an image to the server and stores the file path in the database"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a benefit of rendering a collection with render @posts over looping with render inside?",
    "topic": "Partials and helpers",
    "choices": [
      "It disables partial caching, so each record is rendered again on every request",
      "It's concise and Rails can optimize the collection rendering",
      "It skips escaping",
      "It changes the database"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which helper builds a form for an Active Record object?",
    "topic": "Form helpers and strong params",
    "choices": [
      "build_form @post",
      "form_with model: @post",
      "post_form @post",
      "form_for_model @post only"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What do strong parameters protect against?",
    "topic": "Form helpers and strong params",
    "choices": [
      "Slow database queries that are caused by loading too many columns of a record",
      "Expired sessions",
      "Cross-site scripting",
      "Mass assignment of fields the user should not set"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which call whitelists title and body for a post?",
    "topic": "Form helpers and strong params",
    "choices": [
      "params.safe(:title, :body)",
      "params.allow(:title, :body), which marks the keys as safe for the whole request",
      "params.require(:post).permit(:title, :body)",
      "params.only(:post, :title)"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What happens to unpermitted parameters when creating a record?",
    "topic": "Form helpers and strong params",
    "choices": [
      "They're saved anyway, because Rails trusts every field that the form submits",
      "They're ignored (and may be logged) or raise, depending on configuration",
      "They're encrypted",
      "They're moved to the session"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why is params.permit! (permit all) dangerous?",
    "topic": "Form helpers and strong params",
    "choices": [
      "It breaks routing",
      "It disables CSRF protection",
      "It makes forms slower, because Rails must then check every field of the request",
      "Users could set any attribute, such as an admin flag"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does form_with generate for a new record by default?",
    "topic": "Form helpers and strong params",
    "choices": [
      "A JavaScript-only form",
      "A form without any action",
      "A form that sends GET requests only",
      "A form that POSTs to the create route for the model"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How does Rails send PATCH from an HTML form that supports only GET and POST?",
    "topic": "Form helpers and strong params",
    "choices": [
      "With a special HTTP version",
      "With a hidden _method field",
      "With a JavaScript redirect",
      "With a different port"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the authenticity token in a form do?",
    "topic": "Form helpers and strong params",
    "choices": [
      "Selects the layout",
      "Compresses the request",
      "Protects against cross-site request forgery",
      "Identifies the user's browser type"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you show validation errors in a form?",
    "topic": "Form helpers and strong params",
    "choices": [
      "Render the layout again",
      "Call flash.errors",
      "Loop over @post.errors.full_messages",
      "Print @post.status, which lists the validation problems for every field"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does f.text_field :title produce?",
    "topic": "Form helpers and strong params",
    "choices": [
      "A select list of titles",
      "An input for the title attribute, prefilled from the model",
      "A hidden database column",
      "A paragraph of text that shows the current title without allowing edits"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the flash in Rails?",
    "topic": "Flash messages",
    "choices": [
      "A caching layer",
      "A permanent storage for user data",
      "A hash for messages that survive one redirect",
      "An animation helper"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you set a success notice before redirecting?",
    "topic": "Flash messages",
    "choices": [
      "flash_forever 'Saved'",
      "session.notice = 'Saved' only",
      "redirect_to @post, notice: 'Saved'",
      "render notice: 'Saved' only"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How long does a flash message normally last?",
    "topic": "Flash messages",
    "choices": [
      "Forever",
      "Until the user logs out",
      "For one hour",
      "For the next request"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does flash.now do?",
    "topic": "Flash messages",
    "choices": [
      "Repeats the message forever",
      "Saves the message to the database so that it is available on later requests",
      "Makes the message available in the current request only",
      "Sends an email"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which keys does Rails commonly use for flash types?",
    "topic": "Flash messages",
    "choices": [
      "notice and alert",
      "info and fatal",
      "success_only and failure_only",
      "okay and bad"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Where is the flash usually displayed?",
    "topic": "Flash messages",
    "choices": [
      "In the layout, so every page can show it",
      "Only in controllers, since views have no access to the flash messages",
      "Only in routes",
      "In the migration"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why avoid putting large objects in the flash?",
    "topic": "Flash messages",
    "choices": [
      "It makes the database large",
      "It's stored in the session",
      "Flash messages cannot hold strings",
      "Objects are not allowed in Ruby"
    ],
    "answerIdx": 1
  },
  {
    "stem": "After a failed create, why use render :new instead of redirect_to?",
    "topic": "Flash messages",
    "choices": [
      "Because redirect is not allowed",
      "Because the flash is cleared by redirect",
      "Because render is faster for all cases",
      "So the form keeps the entered values"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What status code is recommended with render :new after a failed create in Rails 7+ with Turbo?",
    "topic": "Flash messages",
    "choices": [
      "200 OK",
      "301 Moved Permanently",
      "422 Unprocessable Entity",
      "404 Not Found"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the Post/Redirect/Get pattern prevent?",
    "topic": "Flash messages",
    "choices": [
      "Slow database queries that result when the same form is submitted many times",
      "Missing validations",
      "Cross-site scripting",
      "Duplicate submissions when the user refreshes after a POST"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the asset pipeline do?",
    "topic": "The asset pipeline",
    "choices": [
      "Serves and fingerprints static assets like CSS, JS and images",
      "Manages database connections",
      "Compiles Ruby into machine code so that the pages are rendered more quickly",
      "Handles background jobs"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why are asset file names fingerprinted with a digest?",
    "topic": "The asset pipeline",
    "choices": [
      "It encrypts the file",
      "Browsers can cache them long term",
      "The digest hides the file from users",
      "It makes files smaller"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which helper links a stylesheet in the layout?",
    "topic": "The asset pipeline",
    "choices": [
      "link_style 'application'",
      "stylesheet_link_tag 'application'",
      "style_tag 'application'",
      "css_include 'application', which adds the file to the page's head section"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which helper includes JavaScript for importmap-based apps?",
    "topic": "The asset pipeline",
    "choices": [
      "script_bundle_tag, which compiles every module into a single bundled file",
      "js_import_all",
      "javascript_importmap_tags",
      "importmap_loader"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is importmap-rails used for?",
    "topic": "The asset pipeline",
    "choices": [
      "Importing database maps from a file into the tables of the application",
      "Mapping URLs to controllers",
      "Using JavaScript modules in the browser without a bundling step",
      "Importing CSV files"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does Propshaft do in modern Rails?",
    "topic": "The asset pipeline",
    "choices": [
      "Runs migrations",
      "Compiles Ruby code into a single optimized file before the server starts",
      "Serves assets with digested names in a simpler pipeline",
      "Manages gems"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Where do app-specific static assets normally live?",
    "topic": "The asset pipeline",
    "choices": [
      "public/uploads only",
      "app/assets",
      "lib/assets only",
      "config/assets"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does assets:precompile do in production deploys?",
    "topic": "The asset pipeline",
    "choices": [
      "Prepares assets for serving, including digested filenames",
      "Installs gems",
      "Clears the cache",
      "Compiles the models into SQL so that the database can run them faster"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why must the public/assets folder be rebuilt on deploy when assets change?",
    "topic": "The asset pipeline",
    "choices": [
      "Git deletes them",
      "Assets are stored in the database",
      "Rails forbids reuse of old asset files, so they are deleted at every request",
      "Old fingerprinted files would be stale or missing"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What happens when you request an asset path in development?",
    "topic": "The asset pipeline",
    "choices": [
      "The server refuses the request",
      "A 500 error is returned",
      "The request is queued",
      "Assets are served on the fly"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How can stylesheets be organized in app/assets/stylesheets?",
    "topic": "Importing stylesheets",
    "choices": [
      "Only in one file with no imports, because Rails cannot link several stylesheets",
      "As separate files linked or imported into application.css",
      "Inside models",
      "Inside routes"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does CSS @import do?",
    "topic": "Importing stylesheets",
    "choices": [
      "Runs a script",
      "Pulls another stylesheet into the current one",
      "Creates a database table",
      "Imports a Ruby gem so that its helpers are available to the stylesheet"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which CSS tooling is a common default for new Rails apps?",
    "topic": "Importing stylesheets",
    "choices": [
      "Tailwind CSS via tailwindcss-rails, or plain CSS",
      "Sass, compiled by the Rails server again on every browser request",
      "Less, compiled by the visitor's browser when the page is loaded",
      "Bootstrap, which every new Rails app includes without choosing any option"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a benefit of utility classes like Tailwind's?",
    "topic": "Importing stylesheets",
    "choices": [
      "Styling directly in markup",
      "Faster Ruby execution",
      "Smaller migrations",
      "Automatic database indexes"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does bin/dev do in a Rails app with a CSS build step?",
    "topic": "Importing stylesheets",
    "choices": [
      "Deploys the app to the configured host once the CSS watcher has finished",
      "Resets the database",
      "Starts the server and the CSS watcher together",
      "Runs tests"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why keep CSS organized by component or purpose?",
    "topic": "Importing stylesheets",
    "choices": [
      "Rails demands it",
      "It speeds up the server",
      "Browsers require it, and refuse to load a stylesheet that is not split by component",
      "It's easier to find, change and avoid conflicting rules"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does a CSS reset or base layer do?",
    "topic": "Importing stylesheets",
    "choices": [
      "Compresses images",
      "Adds JavaScript",
      "Deletes all CSS from the page so that the layout can be styled from scratch",
      "Normalizes default browser styles for consistency"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does minification do to CSS?",
    "topic": "Importing stylesheets",
    "choices": [
      "Converts CSS to Ruby",
      "Adds comments and whitespace to CSS so that the code is easier to read later",
      "Removes whitespace and comments to reduce file size",
      "Changes colors"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a risk of very specific selectors and !important everywhere?",
    "topic": "Importing stylesheets",
    "choices": [
      "The server crashes when a selector is more specific than the markup it styles",
      "Styles become hard to override and maintain",
      "Pages cannot load",
      "Assets stop fingerprinting"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Where should you put a rule that only applies on one page?",
    "topic": "Importing stylesheets",
    "choices": [
      "In a scoped file or a class used by that page's markup",
      "In routes.rb",
      "In the Gemfile",
      "In a migration, so that the style is stored together with the page's database row"
    ],
    "answerIdx": 0
  }
]
```

LAYER: rails-dev-5

```json
[
  {
    "stem": "How does the Rails session identify a returning visitor?",
    "topic": "Sessions and cookies",
    "choices": [
      "A signed, encrypted cookie that carries the session data or an id",
      "The browser's user agent string, saved in the database",
      "The visitor's IP address, stored in the routes file and checked on every request",
      "A hidden field that is added to every GET request"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you store a user id in the session after login?",
    "topic": "Sessions and cookies",
    "choices": [
      "cookies.permanent.user = user",
      "session[:user_id] = user.id",
      "params[:user_id] = user.id",
      "flash[:user_id] = user.id"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why does Rails sign and encrypt the session cookie?",
    "topic": "Sessions and cookies",
    "choices": [
      "So the cookie can be larger than the browser's usual limit of four kilobytes",
      "So users cannot read or tamper with its contents",
      "So it works without HTTPS",
      "So it is shared between all apps"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does reset_session do after login?",
    "topic": "Sessions and cookies",
    "choices": [
      "Deletes the users table",
      "Logs out every user on the site by clearing the session store of the server",
      "Clears the session and starts a new one, helping prevent session fixation",
      "Refreshes the page"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which cookie attribute stops JavaScript from reading a cookie?",
    "topic": "Sessions and cookies",
    "choices": [
      "HttpOnly",
      "Path",
      "SameSite",
      "Domain"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the secure flag on a cookie do?",
    "topic": "Sessions and cookies",
    "choices": [
      "Encrypts the cookie value",
      "Shares the cookie with subdomains",
      "Prevents the server from reading it",
      "Sends the cookie only over HTTPS"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the downside of storing a lot of data in a cookie session?",
    "topic": "Sessions and cookies",
    "choices": [
      "Cookies have a size limit of about 4 KB",
      "Cookies are deleted after one page view",
      "Cookies cannot store strings",
      "Cookies cannot be encrypted"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the purpose of a 'remember me' cookie?",
    "topic": "Sessions and cookies",
    "choices": [
      "Skipping CSRF checks",
      "Storing the password for autofill so the browser can sign the user in again",
      "Speeding up the database",
      "Keeping the user logged in after the session ends, using a long-lived token"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Where does Rails store the secret used to sign cookies?",
    "topic": "Sessions and cookies",
    "choices": [
      "In the public folder, where the web server can read it for each of the requests",
      "In credentials, such as config/credentials.yml.enc with the master key",
      "In the Gemfile",
      "In the browser"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What happens if the secret key base leaks?",
    "topic": "Sessions and cookies",
    "choices": [
      "Nothing, since cookies are public anyway and the key only changes their file size",
      "Gems are removed",
      "Only logs are exposed",
      "Attackers may forge signed cookies, so it must be rotated"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is Devise?",
    "topic": "User signup and login with Devise",
    "choices": [
      "A gem that provides ready-made authentication for Rails",
      "A CSS framework that styles the sign-in forms and the layout of the account pages",
      "A deployment tool",
      "A database adapter"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which command installs Devise's initializer?",
    "topic": "User signup and login with Devise",
    "choices": [
      "bin/rails add devise",
      "bin/rails generate devise:install",
      "bin/rails devise:start, which also creates the User model and its migration",
      "bin/rails new devise"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which command creates a Devise-enabled User model?",
    "topic": "User signup and login with Devise",
    "choices": [
      "bin/rails generate user devise",
      "bin/rails devise:model User",
      "bin/rails create devise User",
      "bin/rails generate devise User"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which Devise helper restricts a controller to signed-in users?",
    "topic": "User signup and login with Devise",
    "choices": [
      "skip_before_action :user",
      "before_action :require_login_all",
      "before_action :authenticate_user!",
      "authorize_user_only!"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does current_user return in a Devise app?",
    "topic": "User signup and login with Devise",
    "choices": [
      "The first user in the table",
      "The user id as a string",
      "An array of all users",
      "The signed-in user, or nil"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which Devise module handles password reset emails?",
    "topic": "User signup and login with Devise",
    "choices": [
      "lockable",
      "trackable",
      "confirmable",
      "recoverable"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the confirmable module add?",
    "topic": "User signup and login with Devise",
    "choices": [
      "Password hashing",
      "Faster logins, because the confirmed email address replaces the password check",
      "Social login",
      "Email confirmation before an account becomes active"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the lockable module do?",
    "topic": "User signup and login with Devise",
    "choices": [
      "Locks the database table so that no new users can be created for a while",
      "Locks an account after too many failed login attempts",
      "Locks a file",
      "Hides the login form"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does Rails' has_secure_password offer as a lighter alternative to Devise?",
    "topic": "User signup and login with Devise",
    "choices": [
      "A complete admin dashboard with user lists, charts and a built-in permission editor",
      "Social logins",
      "bcrypt password hashing plus authenticate and validations via a password_digest column",
      "Email confirmation and password reset"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which column does has_secure_password expect?",
    "topic": "User signup and login with Devise",
    "choices": [
      "hash_value",
      "password_digest",
      "password",
      "encrypted_text"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How should passwords be stored?",
    "topic": "Password security",
    "choices": [
      "As reversible encrypted text",
      "As a salted hash created with a slow algorithm such as bcrypt",
      "As plain text, so that support staff can read them back when users forget them",
      "As an MD5 digest"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why use a slow hashing algorithm for passwords?",
    "topic": "Password security",
    "choices": [
      "It allows passwords to be recovered",
      "It makes brute-force guessing expensive",
      "It shortens the stored hash",
      "It reduces server load"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does a salt prevent?",
    "topic": "Password security",
    "choices": [
      "Identical passwords producing identical hashes, and precomputed rainbow tables",
      "Cookie theft",
      "Users choosing short passwords, because the salt adds extra characters to each one",
      "Login attempts"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which parameters should be filtered from Rails logs?",
    "topic": "Password security",
    "choices": [
      "Nothing should be filtered",
      "Passwords and tokens, via config.filter_parameters",
      "Only the page path, since the other request parameters are never written to logs",
      "All GET params"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why show 'Invalid email or password' instead of saying which was wrong?",
    "topic": "Password security",
    "choices": [
      "It's required by HTTP",
      "It speeds up the login",
      "It is shorter to type, and the browser can then autofill the error message",
      "It avoids revealing which accounts exist"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What helps protect the login endpoint against password guessing?",
    "topic": "Password security",
    "choices": [
      "Rate limiting, such as rack-attack or built-in rate_limit",
      "Larger databases",
      "Longer cookies",
      "Hiding the login URL so that attackers cannot find the page to attack it"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a reasonable password policy today?",
    "topic": "Password security",
    "choices": [
      "Banning all numbers",
      "Limiting the maximum length to 8",
      "Minimum length and checking against known breached passwords",
      "Requiring a symbol and a forced change of the password every ninety days"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What should happen to existing sessions when a user changes their password?",
    "topic": "Password security",
    "choices": [
      "The account is deleted",
      "The password is emailed",
      "Other sessions should be invalidated",
      "Nothing, since sessions stay valid until their cookies expire on their own"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why require HTTPS for login pages?",
    "topic": "Password security",
    "choices": [
      "Rails demands it for the form helper",
      "Browsers block forms on HTTP",
      "Credentials would otherwise travel in plain text",
      "HTTPS speeds up bcrypt, because encrypted connections hash the password for the server"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is credential stuffing?",
    "topic": "Password security",
    "choices": [
      "Trying leaked email-password pairs from other sites against your login",
      "Reusing a session",
      "Filling the database with fake users",
      "Stuffing a form with random text until the server rejects the submitted request"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is Pundit?",
    "topic": "Authorization with Pundit",
    "choices": [
      "A database tool",
      "A gem for authentication that adds sign-in, sign-up and password reset to an app",
      "A test framework",
      "A gem that organizes authorization using policy classes"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does a policy method like update? return?",
    "topic": "Authorization with Pundit",
    "choices": [
      "A SQL string",
      "A redirect",
      "The updated record, after the policy has changed its attributes and saved it",
      "true or false for whether the user may perform the action"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you check authorization in a controller with Pundit?",
    "topic": "Authorization with Pundit",
    "choices": [
      "authorize @post",
      "can? @post",
      "check_policy @post",
      "allow @post"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does Pundit's policy_scope help with?",
    "topic": "Authorization with Pundit",
    "choices": [
      "Choosing a database",
      "Limiting a list of records to those the user may see",
      "Defining routes",
      "Scoping CSS rules so that stylesheets apply only to the page that is being shown"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does verify_authorized do?",
    "topic": "Authorization with Pundit",
    "choices": [
      "Verifies the user's email address before the action is allowed to continue running",
      "Checks the CSRF token",
      "Raises an error if an action forgot to call authorize",
      "Verifies migrations"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the difference between authentication and authorization?",
    "topic": "Authorization with Pundit",
    "choices": [
      "Authentication decides permissions",
      "Authentication proves who you are",
      "Authorization identifies the user",
      "They are the same"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What exception does Pundit raise when authorization fails?",
    "topic": "Authorization with Pundit",
    "choices": [
      "ActiveRecord::RecordNotFound",
      "SecurityError only",
      "Pundit::NotAuthorizedError",
      "Pundit::Unauthenticated"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you usually respond to a NotAuthorizedError?",
    "topic": "Authorization with Pundit",
    "choices": [
      "Ignore it, because the user already knows that the action was not allowed",
      "Delete the record",
      "Rescue it and show a 403 page or redirect with a message",
      "Log out every user"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why centralize authorization in policy classes?",
    "topic": "Authorization with Pundit",
    "choices": [
      "Policies replace validations",
      "It removes the database",
      "Rules are reusable, testable",
      "Policies run in the browser"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Where do Pundit policies live by default?",
    "topic": "Authorization with Pundit",
    "choices": [
      "config/policies",
      "app/policies",
      "lib/auth",
      "app/permissions"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is role-based access control (RBAC)?",
    "topic": "Roles and permissions",
    "choices": [
      "Granting permissions through roles such as admin or editor",
      "Using a different database per user",
      "Restricting access by IP address only",
      "Giving every user every permission, which removes the need for authorization checks"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How can a simple role be stored on a user?",
    "topic": "Roles and permissions",
    "choices": [
      "An enum column such as role on the users table",
      "A cookie called role that the browser sends with every request to the server",
      "A text file",
      "A JavaScript variable"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does enum role: { user: 0, admin: 1 } give you?",
    "topic": "Roles and permissions",
    "choices": [
      "A migration rollback",
      "Predicates like admin? and scopes like User.admin",
      "A new table called roles, with one row for each of the values in the hash",
      "A route"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why shouldn't a role be settable through mass assignment from a public form?",
    "topic": "Roles and permissions",
    "choices": [
      "Forms cannot send integers",
      "Roles are stored encrypted, so a form cannot send a value that matches them",
      "A user could promote themselves to admin",
      "Rails blocks all enums"
    ],
    "answerIdx": 2
  },
  {
    "stem": "When do roles become insufficient?",
    "topic": "Roles and permissions",
    "choices": [
      "When using HTTPS",
      "When permissions depend on the specific record, such as ownership",
      "When there are more than two users, because roles can only describe two groups",
      "When using Postgres"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the principle of least privilege?",
    "topic": "Roles and permissions",
    "choices": [
      "Give every user admin rights so that nobody is blocked while working in the app",
      "Allow access by default",
      "Give users only the access they need",
      "Remove all roles"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How should the first admin be created safely?",
    "topic": "Roles and permissions",
    "choices": [
      "Through a seed, console or setup task, not a public sign-up field",
      "By guessing a URL",
      "By a hidden form field on the sign-up page that is set to true for the owner",
      "By cookie"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does a permission check for 'edit own post' compare?",
    "topic": "Roles and permissions",
    "choices": [
      "The post's user with the current user",
      "The post's title with the user's name",
      "The session size",
      "The route name"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why log permission denials?",
    "topic": "Roles and permissions",
    "choices": [
      "They are required by Rails",
      "Logs speed up requests",
      "They help spot misuse",
      "They prevent errors"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a risk of checking roles only in the UI?",
    "topic": "Roles and permissions",
    "choices": [
      "The UI cannot read roles, so the buttons will not appear for any user at all",
      "Roles are encrypted",
      "Requests can be sent directly, bypassing the hidden buttons",
      "Browsers ignore buttons"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does before_action :authenticate_user! do on a controller?",
    "topic": "Protecting controller actions",
    "choices": [
      "Runs at boot",
      "Authenticates after the action has run, so that its result can be checked",
      "Deletes sessions",
      "Redirects unauthenticated visitors before any action runs"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you exempt the index action from a before_action?",
    "topic": "Protecting controller actions",
    "choices": [
      "before_action :authenticate_user!, only: :all",
      "skip :index",
      "before_action :authenticate_user!, except: [:index]",
      "except_action :index"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which HTTP status fits an unauthenticated API request?",
    "topic": "Protecting controller actions",
    "choices": [
      "201 Created",
      "302 Found",
      "404 Not Found",
      "401 Unauthorized"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which status fits an authenticated user who lacks permission?",
    "topic": "Protecting controller actions",
    "choices": [
      "401 Unauthorized",
      "200 OK",
      "400 Bad Request",
      "403 Forbidden"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why should destructive actions use DELETE or POST, not GET?",
    "topic": "Protecting controller actions",
    "choices": [
      "Browsers cache DELETE",
      "GET requests can be triggered by links and prefetching without user intent",
      "Rails blocks GET",
      "GET is slower than DELETE or POST because the server must also render a page"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does protect_from_forgery (CSRF protection) require on non-GET form submissions?",
    "topic": "Protecting controller actions",
    "choices": [
      "A valid authenticity token",
      "An API key in the URL",
      "A cookie named admin",
      "A second password"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you find a record only among the current user's records?",
    "topic": "Protecting controller actions",
    "choices": [
      "current_user.posts.find(params[:id])",
      "Post.last",
      "Post.all.sample",
      "Post.find(params[:id]) alone, which already limits the result to the user's posts"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why scope lookups through the current user?",
    "topic": "Protecting controller actions",
    "choices": [
      "It's faster to type, because the association builds the query without needing an id",
      "It disables validations",
      "It caches results",
      "Other users' ids then return not found, preventing access to their records"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is an insecure direct object reference (IDOR)?",
    "topic": "Protecting controller actions",
    "choices": [
      "A cached partial",
      "Referencing an object in JavaScript through the id attribute of an HTML element",
      "A slow query",
      "Accessing another user's data by changing an id in the request"
    ],
    "answerIdx": 3
  },
  {
    "stem": "After a failed authentication, where should a redirect usually send the user?",
    "topic": "Protecting controller actions",
    "choices": [
      "The sign-in page, with the intended destination remembered",
      "A 500 page",
      "The admin dashboard",
      "The home page without a message, so the user is not told that anything went wrong"
    ],
    "answerIdx": 0
  }
]
```

LAYER: rails-dev-6

```json
[
  {
    "stem": "What does Turbo Drive do by default?",
    "topic": "Turbo Drive and navigation",
    "choices": [
      "Caches the whole database on the client for offline navigation",
      "Rewrites every link on the page so that it opens in a new browser tab each time",
      "Replaces the server with JavaScript that renders every view locally",
      "Intercepts link clicks and form submits and swaps the page body without a full reload"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What kind of response does Turbo Drive expect from the server?",
    "topic": "Turbo Drive and navigation",
    "choices": [
      "JSON that a client framework turns into elements afterwards",
      "A binary stream that the browser decodes before showing the page",
      "A compiled JavaScript bundle for each page the user opens",
      "Normal HTML responses, rendered by the same controllers and views"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does data-turbo=\"false\" on a link or form do?",
    "topic": "Turbo Drive and navigation",
    "choices": [
      "Turns off JavaScript for every element inside the page body",
      "Forces the request to be sent over a WebSocket connection",
      "Hides the link from the page until the Turbo cache has finished preparing its preview",
      "Disables Turbo handling so the browser performs a normal navigation"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why does Turbo Drive keep the same JavaScript context between pages?",
    "topic": "Turbo Drive and navigation",
    "choices": [
      "Each page loads in an iframe that shares the cookies of its parent",
      "The server sends the JavaScript again but the browser ignores it",
      "The browser stores the previous page in a second tab until it is needed",
      "Only the body changes"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What happens to the browser's back button with Turbo Drive?",
    "topic": "Turbo Drive and navigation",
    "choices": [
      "The back button reloads the first page that the user opened",
      "The back button triggers a POST request to the previous URL",
      "The back button is disabled until the next full page load occurs",
      "Turbo restores the previous page from its cache or by fetching it"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which status code should a failed form submission return for Turbo to render errors?",
    "topic": "Turbo Drive and navigation",
    "choices": [
      "200 OK with an empty body in all cases",
      "204 No Content together with a flash message",
      "422 Unprocessable Entity",
      "302 Found with the error message in the location header"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What should a successful form submission do for Turbo?",
    "topic": "Turbo Drive and navigation",
    "choices": [
      "Redirect, so Turbo follows to the new page",
      "Return JSON with the created record",
      "Render the same page with a 200 status and a notice",
      "Close the connection without a response"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How can you show a progress bar during slow navigation?",
    "topic": "Turbo Drive and navigation",
    "choices": [
      "The browser always shows a progress bar for every fetch call",
      "Rails inserts a loading page before every link",
      "You must add a polling script that checks the server every second",
      "Turbo displays a built-in progress bar for slow page loads"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the Turbo preview cache?",
    "topic": "Turbo Drive and navigation",
    "choices": [
      "A snapshot shown instantly",
      "A file that stores the user's session in the page",
      "A copy of the database kept inside the browser",
      "A list of the routes the server accepts"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you mark a page that must not be cached for previews?",
    "topic": "Turbo Drive and navigation",
    "choices": [
      "Send the page over HTTP instead of HTTPS",
      "Remove the layout so that nothing is stored",
      "Add the turbo-cache-control meta tag with no-preview",
      "Rename the controller so that it skips caching"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a Turbo Frame?",
    "topic": "Turbo Frames",
    "choices": [
      "A section of the page that updates independently when links or forms inside it are used",
      "A database view that returns part of a table",
      "A CSS box model utility for sizing page layouts",
      "A browser window that hosts a second copy of the application inside the first page"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which element represents a frame?",
    "topic": "Turbo Frames",
    "choices": [
      "<div data-frame=\"...\">",
      "<iframe turbo>",
      "<turbo-frame id=\"...\">",
      "<frame turbo=\"...\">"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How does Turbo know which part of the response to use for a frame?",
    "topic": "Turbo Frames",
    "choices": [
      "It replaces the whole page with the response",
      "It takes the first div in the response body and swaps it into the frame element",
      "It looks for a turbo-frame with the same id in the response",
      "It reads a header that names the CSS class to use"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does a link with data-turbo-frame=\"_top\" do inside a frame?",
    "topic": "Turbo Frames",
    "choices": [
      "Scrolls the frame to its top edge",
      "Opens the link in a new window above the page",
      "Navigates the whole page instead of only the frame",
      "Loads the link at the top of the HTTP request queue"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the src attribute on a turbo-frame allow?",
    "topic": "Turbo Frames",
    "choices": [
      "Choosing the layout used to render the page",
      "Loading the frame's content lazily from a URL",
      "Pointing the frame at an image file",
      "Declaring the JavaScript that runs inside the frame"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a good use of a lazy-loaded frame?",
    "topic": "Turbo Frames",
    "choices": [
      "Loading a slow or below-the-fold section after the main page is shown",
      "Storing form data in the browser",
      "Avoiding authentication on a sensitive section",
      "Replacing the router with client-side logic so that every URL is rendered in the browser"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What happens when a form inside a frame fails validation (422)?",
    "topic": "Turbo Frames",
    "choices": [
      "The browser shows a blank page",
      "The frame re-renders with the errors from the response",
      "The form is submitted again automatically",
      "The whole page reloads and loses its state, since frames cannot show a failed response"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why is it useful for responses to include the matching frame even if they are full pages?",
    "topic": "Turbo Frames",
    "choices": [
      "Browsers refuse responses without frames",
      "Turbo extracts only the needed frame",
      "The server must send two pages for each request",
      "Frames speed up database queries"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do inline edits typically work with frames?",
    "topic": "Turbo Frames",
    "choices": [
      "The page uses a modal library written in jQuery",
      "The show view and edit form share a frame id",
      "Each field is a separate route",
      "The edit page opens in a popup window"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which attribute makes a frame navigation update the browser URL?",
    "topic": "Turbo Frames",
    "choices": [
      "data-turbo-action=\"advance\"",
      "data-turbo-state=\"save\"",
      "data-frame-history=\"true\"",
      "data-turbo-url=\"push\""
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a Turbo Stream?",
    "topic": "Turbo Streams",
    "choices": [
      "A log file read by the server",
      "A response format that updates several parts of the page with actions like append or replace",
      "A video protocol that is built into browsers so that pages can be shown while they download",
      "A database cursor over large tables"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which Turbo Stream action adds content to the end of a target element?",
    "topic": "Turbo Streams",
    "choices": [
      "append",
      "attach",
      "push_back",
      "insert_last"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How does a stream choose what to update?",
    "topic": "Turbo Streams",
    "choices": [
      "It targets CSS files",
      "It targets rows in the database",
      "It targets elements by their DOM id",
      "It targets controllers by name"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What content type does a controller respond with for a Turbo Stream?",
    "topic": "Turbo Streams",
    "choices": [
      "application/json",
      "text/vnd.turbo-stream.html",
      "application/octet-stream",
      "text/plain"
    ],
    "answerIdx": 1
  },
  {
    "stem": "When are Turbo Stream responses returned for form submissions?",
    "topic": "Turbo Streams",
    "choices": [
      "Always, for every response, so controllers never need to render a normal HTML page",
      "Only in production",
      "When the request accepts the turbo-stream format",
      "Only for GET requests"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does turbo_stream.remove \"post_#{@post.id}\" do?",
    "topic": "Turbo Streams",
    "choices": [
      "Redirects to the posts index",
      "Hides the element using CSS only",
      "Deletes the post from the database and then removes the element from the page",
      "Removes the element with that id from the page"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why use dom_id(@post) to build element ids?",
    "topic": "Turbo Streams",
    "choices": [
      "It gives consistent, unique ids that match across views and streams",
      "It creates the database row",
      "It encrypts the id for security, so that other users cannot guess the id of a record",
      "It shortens the HTML"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a benefit of Turbo Streams over a full redirect after create?",
    "topic": "Turbo Streams",
    "choices": [
      "Only the changed parts of the page update, with no full navigation",
      "The URL changes automatically",
      "The server skips validations, because stream responses are never saved to the database",
      "The browser stores less data"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does turbo_stream.replace do?",
    "topic": "Turbo Streams",
    "choices": [
      "Reloads the target from the cache",
      "Swaps the target element with new content",
      "Appends content after the target",
      "Removes the target without replacement"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What must you remember when a stream response updates a list with a flash message?",
    "topic": "Turbo Streams",
    "choices": [
      "Flashes need JavaScript only",
      "Flashes are cleared by Turbo",
      "Also update the element that displays the flash",
      "Streams cannot show flashes, so the notice has to be moved to a cookie instead"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is Stimulus?",
    "topic": "Stimulus controllers",
    "choices": [
      "A full single-page app framework with its own router, state store and component system",
      "A small JavaScript framework that attaches behavior to HTML with data attributes",
      "A CSS library for animations",
      "A server-side templating engine"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you attach a Stimulus controller to an element?",
    "topic": "Stimulus controllers",
    "choices": [
      "onload=\"hello()\"",
      "data-controller=\"hello\"",
      "stimulus=\"hello\"",
      "class=\"controller:hello\""
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you call a controller method when a button is clicked?",
    "topic": "Stimulus controllers",
    "choices": [
      "data-action=\"click->hello#greet\"",
      "onclick=\"hello.greet\"",
      "data-click=\"greet\"",
      "data-method=\"hello:greet\""
    ],
    "answerIdx": 0
  },
  {
    "stem": "What are Stimulus targets?",
    "topic": "Stimulus controllers",
    "choices": [
      "CSS selectors for styling",
      "URLs the controller redirects to after the user has finished interacting with the page",
      "Named elements inside a controller that the code can access",
      "Database tables for the controller"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you declare a target named output in a controller?",
    "topic": "Stimulus controllers",
    "choices": [
      "targets: output",
      "this.output = new Target()",
      "static targets = [\"output\"]",
      "data-target-output"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What do Stimulus values (data-hello-count-value) provide?",
    "topic": "Stimulus controllers",
    "choices": [
      "Database default values that are copied into the controller when the page is first rendered",
      "Typed state read from data attributes, with change callbacks",
      "Global constants",
      "CSS variables"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which lifecycle callback runs when a controller connects to the DOM?",
    "topic": "Stimulus controllers",
    "choices": [
      "start()",
      "mount()",
      "init()",
      "connect()"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why is Stimulus a good fit with server-rendered HTML?",
    "topic": "Stimulus controllers",
    "choices": [
      "It replaces templates with components",
      "It requires a build step for each template",
      "The HTML stays the source of truth",
      "It disables Turbo"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What file naming convention maps to data-controller=\"hello\"?",
    "topic": "Stimulus controllers",
    "choices": [
      "hello_controller.js",
      "controller_hello.js",
      "hello.stimulus",
      "hello.js only"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What happens when Turbo replaces part of the page that contains Stimulus controllers?",
    "topic": "Stimulus controllers",
    "choices": [
      "The controllers stop working until reload",
      "Controllers are duplicated",
      "New controllers connect automatically",
      "You must call a setup function manually"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is Action Cable?",
    "topic": "Real-time updates over WebSockets",
    "choices": [
      "A background job runner",
      "A caching library",
      "Rails' framework for WebSocket connections and channels",
      "A cable for connecting servers in a cluster so that they can share their file systems"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does broadcasts_to do on a model with Turbo?",
    "topic": "Real-time updates over WebSockets",
    "choices": [
      "Sends Turbo Stream updates over Action Cable when the model changes",
      "Encrypts the record",
      "Broadcasts the database schema",
      "Prints the model to the console whenever it changes, so developers can debug updates"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which helper subscribes a page to a stream?",
    "topic": "Real-time updates over WebSockets",
    "choices": [
      "turbo_stream_from",
      "live_from",
      "stream_subscribe",
      "cable_for"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a pub/sub adapter's role for Action Cable in production?",
    "topic": "Real-time updates over WebSockets",
    "choices": [
      "Storing user sessions in the browser",
      "Rendering views on the server and sending the finished HTML to each connected client",
      "Compiling assets",
      "Delivering broadcasts between multiple server processes, often via Redis or Solid Cable"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a limitation of the async adapter used in development?",
    "topic": "Real-time updates over WebSockets",
    "choices": [
      "It requires an API key",
      "It's too slow to test, because broadcasts are delayed until the next background job",
      "It only works with Postgres",
      "It works only within a single process"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why authorize channel subscriptions?",
    "topic": "Real-time updates over WebSockets",
    "choices": [
      "Subscriptions never carry data",
      "Otherwise anyone could subscribe",
      "The browser blocks all channels",
      "Channels are encrypted automatically"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a good use of real-time broadcasting in an app?",
    "topic": "Real-time updates over WebSockets",
    "choices": [
      "Sending a one-off report",
      "Compiling Sass into CSS so that all connected users see the same stylesheet changes",
      "Migrating tables",
      "Showing new comments or notifications to other users instantly"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What fallback should you think about if the WebSocket is disconnected?",
    "topic": "Real-time updates over WebSockets",
    "choices": [
      "Crash the app",
      "Delete the page",
      "Clients should recover state",
      "Nothing, since sockets never disconnect"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which transport does Action Cable use?",
    "topic": "Real-time updates over WebSockets",
    "choices": [
      "SMTP",
      "SSH",
      "FTP",
      "WebSockets"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What should broadcast payloads avoid?",
    "topic": "Real-time updates over WebSockets",
    "choices": [
      "HTML, because a broadcast should only contain plain data that clients format themselves",
      "Sensitive data that not every subscriber may see",
      "Short ids",
      "Turbo Stream actions"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does progressive enhancement mean?",
    "topic": "Progressive enhancement",
    "choices": [
      "Pages get slower over time",
      "Pages work with basic HTML",
      "Pages work only with JavaScript",
      "Pages require a modern browser"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why does a Turbo-based app still work if JavaScript fails to load?",
    "topic": "Progressive enhancement",
    "choices": [
      "The server runs the JavaScript",
      "The page uses a fallback app",
      "Browsers emulate Turbo automatically whenever the JavaScript bundle fails to download",
      "Links and forms are plain HTML that the server handles"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a benefit of server-rendered HTML for SEO and accessibility?",
    "topic": "Progressive enhancement",
    "choices": [
      "Content is present in the initial response",
      "Crawlers prefer slow pages",
      "JavaScript is never needed",
      "Screen readers cannot read JavaScript apps at all"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which practice keeps forms accessible?",
    "topic": "Progressive enhancement",
    "choices": [
      "Associate labels with inputs",
      "Use divs with click handlers",
      "Disable keyboard navigation",
      "Hide errors from screen readers"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What should happen to focus after a Turbo navigation or stream update?",
    "topic": "Progressive enhancement",
    "choices": [
      "Leave it on the removed element",
      "Move it to the browser toolbar",
      "Nothing is possible",
      "Manage focus so keyboard"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why choose a link or button element instead of a div with a click handler?",
    "topic": "Progressive enhancement",
    "choices": [
      "Divs cannot be clicked",
      "They are rendered faster by the browser, because divs must be parsed twice for events",
      "They provide keyboard support and semantics by default",
      "Buttons never need CSS"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a risk of replacing too much of the page with streams?",
    "topic": "Progressive enhancement",
    "choices": [
      "Browsers limit streams to ten per day",
      "State and focus can be lost",
      "The server stops working",
      "Streams delete the database"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How can you test that the page works without JavaScript?",
    "topic": "Progressive enhancement",
    "choices": [
      "Disable JavaScript in the browser and use the main flows",
      "Use only mobile devices",
      "Turn off the server",
      "Delete the layout so that the stylesheets and scripts no longer load with the page"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does a graceful fallback for a stream response look like?",
    "topic": "Progressive enhancement",
    "choices": [
      "A server error",
      "An alert box",
      "A blank response with a 200 status, so that the page stays as it was before the request",
      "A redirect that renders the full page when streams are not supported"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why is this approach attractive for a small team?",
    "topic": "Progressive enhancement",
    "choices": [
      "It requires a separate front-end team",
      "Most of the logic stays in Ruby",
      "It removes the need for a server",
      "It removes the need for tests"
    ],
    "answerIdx": 1
  }
]
```

LAYER: rails-dev-7

```json
[
  {
    "stem": "What is Active Job?",
    "topic": "Active Job basics",
    "choices": [
      "A built-in scheduler that replaces the operating system's cron",
      "A tool for compiling assets in the background after each request",
      "A framework for declaring jobs that can run on different queue backends",
      "A database table that stores the status of every web request"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which command generates a job class?",
    "topic": "Active Job basics",
    "choices": [
      "bin/rails generate job SendWelcome",
      "bin/rails generate queue SendWelcome",
      "bin/rails generate worker SendWelcome",
      "bin/rails generate task SendWelcome"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which method defines the work of a job?",
    "topic": "Active Job basics",
    "choices": [
      "perform",
      "call",
      "run",
      "execute"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you enqueue a job to run as soon as a worker is free?",
    "topic": "Active Job basics",
    "choices": [
      "SendWelcomeJob.delay(user)",
      "SendWelcomeJob.enqueue_at(user)",
      "SendWelcomeJob.perform_later(user)",
      "SendWelcomeJob.perform_now(user)"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does perform_now do?",
    "topic": "Active Job basics",
    "choices": [
      "Queues the job for the next free worker and returns control to the caller at once",
      "Schedules the job for midnight",
      "Runs the job immediately in the current process",
      "Cancels the job"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why pass a record (or its id) instead of serialized data to perform_later?",
    "topic": "Active Job basics",
    "choices": [
      "The database is not available inside jobs",
      "Records are always copied as full JSON",
      "Jobs cannot receive any arguments, so the data has to be read from the database",
      "Active Job serializes records with GlobalID and reloads them when the job runs"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What happens if a record is deleted before its job runs?",
    "topic": "Active Job basics",
    "choices": [
      "The job fails with a deserialization error unless you discard on that error",
      "Rails deletes the job",
      "The job always succeeds",
      "The job recreates the record from the arguments and then continues with its work"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why use jobs for sending emails or calling slow APIs?",
    "topic": "Active Job basics",
    "choices": [
      "Jobs run in the browser",
      "Jobs make emails smaller",
      "Emails cannot be sent from controllers",
      "The web request finishes quickly"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which queue adapter is Rails' default, running jobs on a thread pool inside the web process?",
    "topic": "Active Job basics",
    "choices": [
      "resque, which forks a new process for every job",
      "sidekiq, which runs jobs in a separate worker process",
      "delayed, which stores each job in a database table",
      "async"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a downside of the in-process async adapter in production?",
    "topic": "Active Job basics",
    "choices": [
      "Jobs are lost if the process restarts",
      "It doesn't support Ruby",
      "It's too expensive to run, because every job needs a separate server instance",
      "It needs a license"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is Sidekiq?",
    "topic": "Sidekiq and Redis",
    "choices": [
      "A database adapter",
      "A background job processor that uses Redis and threads",
      "A CSS preprocessor",
      "A web server for Rails that handles requests with several worker processes"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does Sidekiq need to run?",
    "topic": "Sidekiq and Redis",
    "choices": [
      "A Redis server and a separate worker process",
      "A second Rails app",
      "A MongoDB cluster that stores the jobs and the results of the workers",
      "A browser"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which command starts a Sidekiq worker?",
    "topic": "Sidekiq and Redis",
    "choices": [
      "bin/rails sidekiq:start_web",
      "bundle exec worker",
      "bin/jobs run all",
      "bundle exec sidekiq"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you tell Active Job to use Sidekiq?",
    "topic": "Sidekiq and Redis",
    "choices": [
      "Rails detects it automatically with no configuration",
      "config.active_job.queue_adapter = :sidekiq",
      "job_adapter = sidekiq in the Gemfile",
      "require 'sidekiq' in routes.rb"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why are Sidekiq jobs run by multiple threads a reason for thread-safe code?",
    "topic": "Sidekiq and Redis",
    "choices": [
      "Several jobs share the same process memory at once",
      "Ruby disallows threads",
      "Threads are disabled by Redis",
      "Jobs run on separate machines only, so memory is never shared between them"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the Sidekiq web UI used for?",
    "topic": "Sidekiq and Redis",
    "choices": [
      "Editing models and records of the application's database through a web form",
      "Writing migrations",
      "Monitoring queues, retries, scheduled and dead jobs",
      "Rendering views"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a named queue useful for?",
    "topic": "Sidekiq and Redis",
    "choices": [
      "Giving jobs passwords so that only authorized workers are able to run them",
      "Encrypting arguments",
      "Splitting the database",
      "Prioritizing important jobs, such as critical before default"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What should job arguments be?",
    "topic": "Sidekiq and Redis",
    "choices": [
      "Simple, serializable values such as ids, strings and numbers",
      "Large objects with open connections, so that workers can reuse their state",
      "Procs and lambdas",
      "File handles"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is an advantage of Rails' database-backed adapters such as Solid Queue?",
    "topic": "Sidekiq and Redis",
    "choices": [
      "They are always faster than Redis",
      "No extra Redis dependency",
      "They avoid workers entirely",
      "They run in the browser"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How many worker processes should you run in production?",
    "topic": "Sidekiq and Redis",
    "choices": [
      "Exactly one forever, because more workers would run the same job twice",
      "None",
      "One per user",
      "Enough to keep queue latency acceptable, scaled with load"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you schedule a job to run in 10 minutes?",
    "topic": "Scheduling and retries",
    "choices": [
      "SendReminderJob.later(10)",
      "SendReminderJob.sleep(10.minutes)",
      "SendReminderJob.set(wait: 10.minutes).perform_later(user)",
      "SendReminderJob.perform_later(user, 10), which waits ten minutes before it runs"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does retry_on do in a job class?",
    "topic": "Scheduling and retries",
    "choices": [
      "Retries every job in the application again when the server boots up",
      "Retries failing HTTP requests only",
      "Retries the job on a specified error, with optional wait and attempts",
      "Retries migrations"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does discard_on do?",
    "topic": "Scheduling and retries",
    "choices": [
      "Drops the job when a specified error happens, without retrying",
      "Deletes the job class from the application when the named error happens",
      "Hides errors in logs",
      "Discards the whole queue"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is exponential backoff?",
    "topic": "Scheduling and retries",
    "choices": [
      "Repeating a job at a constant speed until the dependent service recovers",
      "Increasing the wait between retries so a struggling service can recover",
      "Doubling the number of workers",
      "Running jobs in reverse order"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why make jobs idempotent?",
    "topic": "Scheduling and retries",
    "choices": [
      "Rails requires it",
      "A retry or duplicate run then does not repeat side effects",
      "Idempotent jobs skip the queue",
      "Idempotent jobs run in parallel only, so they never block other workers"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How can you run a recurring task every night?",
    "topic": "Scheduling and retries",
    "choices": [
      "With a scheduler such as cron, Sidekiq-Cron or Solid Queue recurring tasks",
      "With a CSS animation",
      "With a loop in a controller action that sleeps until the time of the night arrives",
      "With a database trigger only"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a risk of long-running jobs?",
    "topic": "Scheduling and retries",
    "choices": [
      "They hold workers and can block other jobs, so split or batch the work",
      "They are cached by the browser",
      "They corrupt migrations, because long jobs hold locks on the schema table",
      "They cannot access the database"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does job timeout protection help with?",
    "topic": "Scheduling and retries",
    "choices": [
      "Chooses the queue",
      "Encrypts jobs",
      "Stops hung jobs from blocking workers forever",
      "Speeds up queries by cancelling the slow database calls made by the job"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Where are retries and scheduled jobs stored in Sidekiq?",
    "topic": "Scheduling and retries",
    "choices": [
      "In a view",
      "In Redis",
      "In the log file",
      "In the browser"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why should scheduled jobs check current state when they run?",
    "topic": "Scheduling and retries",
    "choices": [
      "Jobs forget their arguments",
      "Jobs never run later",
      "The data may have changed",
      "State is cleared on boot"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is Action Mailer?",
    "topic": "Action Mailer",
    "choices": [
      "A JavaScript mailer",
      "A database of addresses",
      "A tool that reads incoming mail only",
      "The Rails component for building"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which command generates a mailer?",
    "topic": "Action Mailer",
    "choices": [
      "bin/rails generate email UserMailer, which creates the class and the view",
      "bin/rails new mailer UserMailer",
      "bin/rails generate mailer UserMailer welcome",
      "bin/rails mailer:create"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you deliver a mail in the background?",
    "topic": "Action Mailer",
    "choices": [
      "UserMailer.welcome.send_later",
      "UserMailer.welcome(user).deliver_later",
      "UserMailer.later(:welcome)",
      "UserMailer.welcome(user).deliver_now"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does deliver_now do?",
    "topic": "Action Mailer",
    "choices": [
      "Queues the email so that a background worker sends it a little later",
      "Cancels the email",
      "Previews the email",
      "Sends the email immediately in the current process"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Where do mailer view templates live?",
    "topic": "Action Mailer",
    "choices": [
      "app/views/user_mailer",
      "config/mail",
      "app/mailers/views",
      "lib/mailers"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why provide both HTML and text versions of an email?",
    "topic": "Action Mailer",
    "choices": [
      "HTML emails are never delivered",
      "Text emails are encrypted",
      "Some clients show only text",
      "Rails demands two files"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which setting configures SMTP delivery?",
    "topic": "Action Mailer",
    "choices": [
      "config.mail.send_to, which names the SMTP server that receives the messages",
      "config.smtp.enable = true",
      "config.action_mailer.smtp_settings",
      "action_mailer.url"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why set default_url_options for mailers?",
    "topic": "Action Mailer",
    "choices": [
      "To hide the sender",
      "So emails load faster, because the host name is cached by the mail server",
      "To encrypt links",
      "Email links need full URLs with a host, since there is no request"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How should SMTP credentials be provided in production?",
    "topic": "Action Mailer",
    "choices": [
      "Through credentials or environment variables",
      "In public JavaScript",
      "Hard-coded in the mailer class so that every environment uses the same login",
      "In the email template"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a mailer's relation to controllers?",
    "topic": "Action Mailer",
    "choices": [
      "Mailers cannot use views, so the message body has to be built from strings",
      "Mailers are routes",
      "Mailers render JSON",
      "It's similar: an action prepares data and renders a view"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you preview an email during development?",
    "topic": "Email templates and previews",
    "choices": [
      "By reading logs only",
      "With a mailer preview class at /rails/mailers",
      "By sending it to real customers first and checking that the layout looks right",
      "By opening the database"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Where do mailer previews live by default?",
    "topic": "Email templates and previews",
    "choices": [
      "app/previews, next to the mailers that they are meant to display",
      "test/mailers/previews or spec/mailers/previews",
      "config/previews",
      "public/mailers"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What tool catches outgoing development emails in a local inbox?",
    "topic": "Email templates and previews",
    "choices": [
      "bundler",
      "rake",
      "git, which stores each outgoing development email as a commit in the repository",
      "letter_opener or MailCatcher/Mailpit"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why avoid heavy CSS in email templates?",
    "topic": "Email templates and previews",
    "choices": [
      "Email forbids color, so any CSS in the template would cause the message to bounce",
      "Browsers block it",
      "Email clients support only limited CSS, so inline styles are safer",
      "Rails removes all CSS"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a good practice for unsubscribe links in marketing mail?",
    "topic": "Email templates and previews",
    "choices": [
      "Require a password",
      "Include a working, easy unsubscribe link",
      "Hide the link in the footer so that fewer recipients are able to find it",
      "Make it expire immediately"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why use absolute image URLs in emails?",
    "topic": "Email templates and previews",
    "choices": [
      "Absolute URLs are shorter",
      "Images are blocked by Rails whenever the path of the file starts with a slash",
      "Relative paths do not resolve in email clients",
      "Images cannot be hosted"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you write a mailer test?",
    "topic": "Email templates and previews",
    "choices": [
      "Deliver the mail in test mode and assert on ActionMailer::Base.deliveries",
      "Use the production inbox",
      "Open the browser and check the message in a real inbox after each change",
      "Run bundle update"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What should an email template avoid including?",
    "topic": "Email templates and previews",
    "choices": [
      "A greeting",
      "A footer",
      "Sensitive data that doesn't need to be sent by email",
      "The user's name, because personalized messages are usually flagged as spam"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How can links in emails avoid being used by others?",
    "topic": "Email templates and previews",
    "choices": [
      "Use sequential ids in the URL, which are easy to remember and to share",
      "Put the password in the link",
      "Use signed, expiring tokens for sensitive actions",
      "Never expire them"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the subject line set with in a mailer?",
    "topic": "Email templates and previews",
    "choices": [
      "subject = in the view",
      "mail(to:, subject:)",
      "The route",
      "The layout"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What happens to a job that fails all its retries in Sidekiq?",
    "topic": "Job error handling",
    "choices": [
      "It runs forever",
      "It moves to the dead set for manual review",
      "It is deleted from Redis immediately, together with the error that it raised",
      "It restarts the server"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why report job errors to an error tracker?",
    "topic": "Job error handling",
    "choices": [
      "Jobs cannot log",
      "Trackers speed up jobs",
      "Errors are always visible in the browser",
      "Failures in the background are otherwise silent"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does rescue_from do in Active Job?",
    "topic": "Job error handling",
    "choices": [
      "Handles exceptions raised by perform in one place",
      "Deletes the job",
      "Skips tests",
      "Rescues the web server when a job raises an error that the worker cannot handle"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a poison job?",
    "topic": "Job error handling",
    "choices": [
      "A job from a hacker",
      "A job with a long name",
      "A job that deletes data",
      "A job that always fails"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How can you limit the damage of a poison job?",
    "topic": "Job error handling",
    "choices": [
      "Disable workers",
      "Cap the retry attempts and move it to a dead queue for review",
      "Delete the queue",
      "Retry forever, because every failure is temporary and the job will succeed in the end"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What should you log when a job fails?",
    "topic": "Job error handling",
    "choices": [
      "Only the word failed, because details of the arguments should never be logged",
      "The job class, arguments summary, error and attempt number",
      "User passwords",
      "Nothing"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What should happen after fixing a bug that caused jobs to fail?",
    "topic": "Job error handling",
    "choices": [
      "Reset the schema",
      "Ignore them",
      "Delete the app and deploy again, since failed jobs cannot be run a second time",
      "Retry the failed jobs from the dead set or queue UI"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why alert on queue latency and size?",
    "topic": "Job error handling",
    "choices": [
      "Growing queues signal that workers are down or overloaded",
      "Queues must always be empty, so any job that waits means that a bug exists",
      "Alerts speed up jobs",
      "Latency is unrelated"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the benefit of dead-letter handling?",
    "topic": "Job error handling",
    "choices": [
      "It increases speed",
      "Failed work is preserved for inspection instead of silently disappearing",
      "It encrypts jobs",
      "It hides errors from the logs so that the team is not distracted by them"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why test jobs with the test adapter?",
    "topic": "Job error handling",
    "choices": [
      "Jobs cannot be tested, because their code runs outside the Rails environment",
      "It uses production Redis",
      "It sends real email",
      "You can assert jobs were enqueued without running real workers"
    ],
    "answerIdx": 3
  }
]
```

LAYER: rails-dev-8

```json
[
  {
    "stem": "What does rails new myapp --api produce?",
    "topic": "API-only controllers",
    "choices": [
      "An app that can only be reached over WebSockets",
      "An app that stores every response in the database",
      "A slimmer app without views, sessions and browser middleware",
      "A full app that also generates a JavaScript single-page client"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which class do controllers in an API-only app inherit from?",
    "topic": "API-only controllers",
    "choices": [
      "ApplicationView, which renders data as JSON objects",
      "ActionController::API",
      "ActionController::JSON, which formats all responses automatically",
      "ActionController::Base, which still includes the view rendering stack"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the usual response to a successful POST that creates a record?",
    "topic": "API-only controllers",
    "choices": [
      "302 Found redirecting to the new record's HTML page",
      "201 Created with the new resource and a Location header",
      "200 OK with an empty body and no resource",
      "204 No Content so the client must fetch the record again"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you respond with JSON from an action?",
    "topic": "API-only controllers",
    "choices": [
      "return @post.to_html",
      "send_file @post",
      "render template: 'posts/show.json' only",
      "render json: @post"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which status fits a successful DELETE with no body?",
    "topic": "API-only controllers",
    "choices": [
      "301 Moved Permanently to the collection",
      "204 No Content",
      "201 Created, because the request changed server state",
      "202 Accepted, because deletions are always queued"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why disable CSRF protection checks for token-based API controllers?",
    "topic": "API-only controllers",
    "choices": [
      "Because APIs have no security requirements",
      "Requests aren't made from browser sessions with cookies",
      "Because Rails removes tokens from JSON bodies automatically",
      "Because CSRF tokens only work for GET requests in Rails"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the Rails router namespace :api do?",
    "topic": "API-only controllers",
    "choices": [
      "Disables the other routes in the application",
      "Adds authentication to all of the nested routes",
      "Creates a separate database for the API controllers",
      "Prefixes routes with /api"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does rescue_from ActiveRecord::RecordNotFound commonly do in an API base controller?",
    "topic": "API-only controllers",
    "choices": [
      "Ignores the request and returns an empty array",
      "Creates the missing record automatically from the request",
      "Retries the lookup until the record appears",
      "Renders a 404 JSON error instead of raising a 500"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why keep controllers thin in an API?",
    "topic": "API-only controllers",
    "choices": [
      "Controllers cannot access the database, so all queries have to live in models",
      "Rails limits the size of controller files",
      "Business logic in models or services is easier to reuse and test",
      "Thin controllers respond faster by default"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which header should clients send to say they accept JSON?",
    "topic": "API-only controllers",
    "choices": [
      "Authorization: json",
      "Host: application/json",
      "Accept: application/json",
      "Content-Length: json"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does Rails' to_json produce for an Active Record object by default?",
    "topic": "Serializing JSON responses",
    "choices": [
      "A JSON string containing all the attributes of the record",
      "A YAML document of the associations",
      "An HTML snippet of the record's fields",
      "Only the id and the timestamps of the record, without any of its attributes"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why use serializers instead of rendering models directly?",
    "topic": "Serializing JSON responses",
    "choices": [
      "Serializers make the database queries faster by default",
      "You control the exposed fields",
      "Models cannot be converted to JSON without them",
      "Serializers add authentication to every response"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which library (or approach) is commonly used for explicit JSON views?",
    "topic": "Serializing JSON responses",
    "choices": [
      "Webpacker",
      "Jbuilder or a serializer gem such as Blueprinter",
      "Capybara",
      "Sprockets, which renders the JSON of an object from an asset manifest file"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What file extension does a Jbuilder template use?",
    "topic": "Serializing JSON responses",
    "choices": [
      "show.json.erb only",
      "show.builder.json",
      "show.jbuilder.html",
      "show.json.jbuilder"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What risk comes from rendering a User model with render json: user?",
    "topic": "Serializing JSON responses",
    "choices": [
      "It deletes the user",
      "It requires a view file",
      "It always returns an empty object, because the password digest is excluded",
      "It might include sensitive fields such as the password digest"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the only option (render json: @post, only: [:id, :title]) do?",
    "topic": "Serializing JSON responses",
    "choices": [
      "Limits the response to a single record per request",
      "Restricts the request to the listed HTTP verbs",
      "Includes only the listed attributes in the JSON",
      "Allows only the listed users to see the record"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How should errors be represented in a JSON API?",
    "topic": "Serializing JSON responses",
    "choices": [
      "With a consistent structure that includes a message and field details",
      "With a different shape in every action",
      "As plain HTML pages with the stack trace so that clients can read the failure",
      "As an empty response with only a status code"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a benefit of including pagination metadata in a list response?",
    "topic": "Serializing JSON responses",
    "choices": [
      "It encrypts the list",
      "Clients know the total pages",
      "It makes the JSON valid",
      "It reduces the number of columns"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the N+1 query risk when serializing a list of posts with authors?",
    "topic": "Serializing JSON responses",
    "choices": [
      "The database locks the authors table",
      "JSON generation is single-threaded",
      "Authors can't be serialized in Rails when the association is loaded lazily",
      "Each post triggers a separate author query unless you eager load"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which ActiveRecord method helps avoid that N+1 problem?",
    "topic": "Serializing JSON responses",
    "choices": [
      "find_by(:author)",
      "readonly(:author)",
      "destroy_all(:author)",
      "includes(:author)"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why version an API?",
    "topic": "Versioning endpoints",
    "choices": [
      "Existing clients keep working when the behavior changes",
      "It improves database speed",
      "Versions make responses smaller because old fields are removed from each release",
      "Rails requires it"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a common way to version a REST API?",
    "topic": "Versioning endpoints",
    "choices": [
      "A cookie named version",
      "A different database per version",
      "A random token in the body",
      "A URL prefix such as /api/v1"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How can versions be organized in a Rails app?",
    "topic": "Versioning endpoints",
    "choices": [
      "Namespaced controllers such as Api::V1::PostsController",
      "One file per HTTP verb",
      "A gem per release",
      "One controller with a version variable that every action checks before it responds"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is an alternative to URL versioning?",
    "topic": "Versioning endpoints",
    "choices": [
      "The user's IP address",
      "A cache key",
      "A custom header or media type for the API version",
      "A different HTTP method for each version, such as PATCH for the second one"
    ],
    "answerIdx": 2
  },
  {
    "stem": "When should you create a new API version?",
    "topic": "Versioning endpoints",
    "choices": [
      "For every bug fix, so that clients can choose the version they want to use",
      "For every new field",
      "Every week",
      "When making a breaking change that existing clients cannot handle"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which of these is usually a non-breaking change?",
    "topic": "Versioning endpoints",
    "choices": [
      "Renaming an existing field so that the name matches the one in the database",
      "Removing a field that clients use",
      "Changing a field's type",
      "Adding a new optional field to a response"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How can you give clients time to move to a new API version?",
    "topic": "Versioning endpoints",
    "choices": [
      "Hide the new version",
      "Return random errors",
      "Announce a deprecation period",
      "Remove the old version immediately"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the Sunset header communicate?",
    "topic": "Versioning endpoints",
    "choices": [
      "A planned date after",
      "The time of the server's sunset",
      "The size of a response",
      "The expiry of a cookie"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a downside of maintaining many API versions?",
    "topic": "Versioning endpoints",
    "choices": [
      "Rails stops routing",
      "Clients stop using the API",
      "Versions make the code faster",
      "More code to test and support"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Where should shared logic between versions live?",
    "topic": "Versioning endpoints",
    "choices": [
      "In models, services or concerns used by both versions",
      "Copied into each version's controller so that versions stay independent of each other",
      "In the routes file",
      "In the Gemfile"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is token authentication?",
    "topic": "Token authentication",
    "choices": [
      "The client sends a token in each request to prove its identity",
      "The browser stores the session id in a cookie",
      "The user types a password for every request",
      "The server remembers the client's IP address and trusts requests from that address"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which header normally carries a bearer token?",
    "topic": "Token authentication",
    "choices": [
      "Content-Type: <token>",
      "Cookie-Token: <token>",
      "Authorization: Bearer <token>",
      "X-Token-Name: <token>, which is the standard header for passing a bearer token"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why store API tokens hashed in the database?",
    "topic": "Token authentication",
    "choices": [
      "Tokens can't be stored as strings",
      "A database leak wouldn't directly reveal usable tokens",
      "Hashed tokens are shorter, so they take up less space in the database column",
      "Hashing makes tokens expire"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does has_secure_token do?",
    "topic": "Token authentication",
    "choices": [
      "Creates a session",
      "Signs cookies",
      "Generates a unique random token attribute on a model",
      "Encrypts the whole model so that every attribute is unreadable in the database"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a JWT?",
    "topic": "Token authentication",
    "choices": [
      "A type of Rails view",
      "A cookie flag",
      "A signed token that carries claims and can be verified without a database lookup",
      "A database table of tokens that the server checks on every incoming request"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a weakness of long-lived tokens?",
    "topic": "Token authentication",
    "choices": [
      "They are too short to be guessed, so attackers cannot find a valid one easily",
      "A stolen token remains useful for a long time",
      "They cannot be sent over HTTPS",
      "They are always revoked"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How can the server end a token's validity early?",
    "topic": "Token authentication",
    "choices": [
      "Rename the controller",
      "Revoke or delete it, or keep a denylist",
      "Wait for the browser to clear it",
      "Restart the database"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why should tokens only be sent over HTTPS?",
    "topic": "Token authentication",
    "choices": [
      "HTTPS shortens tokens, because the connection compresses them before they are sent",
      "HTTP compresses them",
      "Plain HTTP exposes them to anyone who can see the traffic",
      "Tokens are invalid on HTTP"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What response fits a missing or invalid token?",
    "topic": "Token authentication",
    "choices": [
      "401 Unauthorized",
      "201 Created",
      "500 Internal Server Error",
      "404 Not Found"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How would you authenticate a request in a base API controller?",
    "topic": "Token authentication",
    "choices": [
      "A gem named routes",
      "A migration",
      "A view helper that reads the token from the template of the response",
      "A before_action that finds the user from the Authorization header"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is CORS?",
    "topic": "CORS and rate limiting",
    "choices": [
      "A browser mechanism controlling which origins may read responses from your API",
      "A Ruby test framework that checks requests coming from other domains",
      "A database lock",
      "A server-side cache"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which gem is commonly used to configure CORS in Rails?",
    "topic": "CORS and rate limiting",
    "choices": [
      "capybara",
      "rack-cors",
      "sprockets",
      "rack-mini-profiler"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why avoid origins '*' with credentials in production?",
    "topic": "CORS and rate limiting",
    "choices": [
      "It disables HTTPS",
      "Browsers ignore it",
      "It lets any website make credentialed requests to your API",
      "It makes the API slower, because browsers must check every origin separately"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a CORS preflight request?",
    "topic": "CORS and rate limiting",
    "choices": [
      "A request for the cached copy of a page that the browser sends before it shows it",
      "A request sent by the server to itself",
      "A request that deletes cookies",
      "An OPTIONS request the browser sends before certain cross-origin requests"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does rate limiting protect an API from?",
    "topic": "CORS and rate limiting",
    "choices": [
      "Abuse and overload from too many requests by a client",
      "Cross-site scripting attacks that insert JavaScript into pages shown to users",
      "SQL injection",
      "Slow migrations"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which gem is widely used for throttling in Rails apps?",
    "topic": "CORS and rate limiting",
    "choices": [
      "puma",
      "pg",
      "devise",
      "rack-attack"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which status code is returned when a client is throttled?",
    "topic": "CORS and rate limiting",
    "choices": [
      "503 Service Unavailable",
      "429 Too Many Requests",
      "401 Unauthorized",
      "404 Not Found"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which header tells a client how long to wait after being throttled?",
    "topic": "CORS and rate limiting",
    "choices": [
      "Retry-After",
      "Location",
      "Accept",
      "Content-Type"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why key a rate limit on token or user id as well as IP?",
    "topic": "CORS and rate limiting",
    "choices": [
      "Rate limits need a database table",
      "Tokens are shorter than IPs",
      "IPs are never available in Rails, so limits must always be based on tokens",
      "Many users can share an IP address, and one user can use many IPs"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Where is rate-limit state usually kept?",
    "topic": "CORS and rate limiting",
    "choices": [
      "In a fast shared store such as Redis or the Rails cache",
      "In the browser, where each client counts its own requests and stops at the limit",
      "In the Gemfile",
      "In a view"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why document an API?",
    "topic": "API documentation",
    "choices": [
      "It prevents bugs automatically",
      "Rails requires it",
      "Clients can use it correctly",
      "Documentation makes the API faster"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is OpenAPI (Swagger)?",
    "topic": "API documentation",
    "choices": [
      "A CSS framework",
      "A standard format for describing REST APIs, usable to generate docs and clients",
      "A Ruby web server that serves API documentation pages from the app's routes",
      "A database driver"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which Rails-friendly tool generates OpenAPI docs from request specs?",
    "topic": "API documentation",
    "choices": [
      "kaminari",
      "capybara",
      "rswag",
      "devise"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What should API docs include for each endpoint?",
    "topic": "API documentation",
    "choices": [
      "Only the author's name",
      "Only the controller file name, because clients can read the rest of the code",
      "Path, method, parameters, example requests and responses, and errors",
      "Only the database table"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why keep documentation close to tests?",
    "topic": "API documentation",
    "choices": [
      "It's less likely to drift out of date from the real behavior",
      "Docs run faster",
      "Tests cannot be written without it, since specs are generated from the pages",
      "It reduces gem count"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is an advantage of providing example requests in docs?",
    "topic": "API documentation",
    "choices": [
      "Developers can try the API quickly and understand the format",
      "They replace authentication, because clients can reuse the sample token directly",
      "They hide errors",
      "They are required for HTTPS"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a changelog useful for in an API?",
    "topic": "API documentation",
    "choices": [
      "Encrypting traffic",
      "Telling clients what changed between versions",
      "Hiding deprecated endpoints so that clients can no longer see what changed",
      "Listing database rows"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What belongs in the documentation of error responses?",
    "topic": "API documentation",
    "choices": [
      "Status codes, error format and what clients should do",
      "Only the word error, since the details differ for every response",
      "Database credentials",
      "Server stack traces"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How can you let developers explore an API interactively?",
    "topic": "API documentation",
    "choices": [
      "With a routes file only",
      "With a generated Swagger UI page",
      "With a migration",
      "With a Gemfile entry that opens the routes file in the browser for readers"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What's a good habit when you add a new endpoint?",
    "topic": "API documentation",
    "choices": [
      "Document it only in chat",
      "Skip the tests",
      "Update the specs and documentation in the same change",
      "Add documentation next year, when the endpoint is stable and fewer changes occur"
    ],
    "answerIdx": 2
  }
]
```

LAYER: rails-dev-9

```json
[
  {
    "stem": "What is an N+1 query?",
    "topic": "N plus one queries and eager loading",
    "choices": [
      "A join of N tables that produces duplicated rows",
      "One query that returns N rows, followed by a second query that counts all of them",
      "A query that is repeated N times because it has no index",
      "One query for a list plus one extra query per item to load a relation"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which method preloads associated records to avoid N+1?",
    "topic": "N plus one queries and eager loading",
    "choices": [
      "readonly",
      "pluck",
      "touch",
      "includes"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the difference between includes and joins?",
    "topic": "N plus one queries and eager loading",
    "choices": [
      "includes builds only an INNER JOIN, while joins loads the records",
      "They are identical in every case",
      "includes loads associated records",
      "joins loads records lazily, and includes never loads them"
    ],
    "answerIdx": 2
  },
  {
    "stem": "When does preload differ from eager_load?",
    "topic": "N plus one queries and eager loading",
    "choices": [
      "preload uses a JOIN, while eager_load runs separate queries",
      "preload runs separate queries",
      "preload works only on has_one, and eager_load only on has_many",
      "They are aliases with no differences"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which gem can warn about N+1 queries in development?",
    "topic": "N plus one queries and eager loading",
    "choices": [
      "pundit",
      "bullet",
      "devise",
      "rack-cors"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How can counter caches help?",
    "topic": "N plus one queries and eager loading",
    "choices": [
      "Caching whole pages for each user so that the counts never need to be rendered",
      "Counting requests per second",
      "Storing a child count on the parent avoids a COUNT query per record",
      "Caching database connections"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does strict_loading do?",
    "topic": "N plus one queries and eager loading",
    "choices": [
      "Prevents any query from running inside views, so data must be loaded in controllers",
      "Raises or logs when an association is lazily loaded, surfacing N+1 issues",
      "Blocks writes to associations",
      "Locks tables for reading"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does pluck(:id) avoid compared with map(&:id)?",
    "topic": "N plus one queries and eager loading",
    "choices": [
      "Using indexes",
      "Instantiating full Active Record objects",
      "Running the query itself, since pluck reads the ids from the Rails query cache",
      "Using the database"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why can loading all records with all be risky?",
    "topic": "N plus one queries and eager loading",
    "choices": [
      "It can use a lot of memory",
      "It locks the whole database",
      "It deletes the cache",
      "It always raises an error"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does find_each do?",
    "topic": "N plus one queries and eager loading",
    "choices": [
      "Loads records in batches and yields them one at a time",
      "Finds each table",
      "Finds duplicates",
      "Finds the first record of the table and then yields it to the block once"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is fragment caching?",
    "topic": "Fragment and Russian doll caching",
    "choices": [
      "Caching the whole database in memory so that no query reaches the server again",
      "Caching Ruby bytecode",
      "Caching a rendered part of a view so it isn't re-rendered each time",
      "Caching only images"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which helper wraps a view fragment in a cache?",
    "topic": "Fragment and Russian doll caching",
    "choices": [
      "cache",
      "memoize",
      "keep",
      "store_view"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is Russian doll caching?",
    "topic": "Fragment and Russian doll caching",
    "choices": [
      "Caching only the outer layout",
      "Storing dolls in the cache",
      "Caching the same data in two databases so that a failure of one still works",
      "Nested fragment caches where inner changes update the outer keys via touch"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does belongs_to :post, touch: true do?",
    "topic": "Fragment and Russian doll caching",
    "choices": [
      "Deletes the parent when the child is deleted, so no orphaned records remain",
      "Caches the parent forever",
      "Locks the parent record",
      "Updates the parent post's updated_at when the child changes"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why do cache keys include the record's updated_at (or cache_version)?",
    "topic": "Fragment and Russian doll caching",
    "choices": [
      "Timestamps make keys shorter",
      "Changed records get a new key",
      "Rails requires it for security",
      "Keys must contain dates"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a cache store?",
    "topic": "Fragment and Russian doll caching",
    "choices": [
      "A route",
      "A migration",
      "The backend holding cached values, such as memory, Redis or Memcached",
      "A shop module that stores the products and orders of the Rails application"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does Rails.cache.fetch('key') { ... } do?",
    "topic": "Fragment and Russian doll caching",
    "choices": [
      "Locks the key",
      "Deletes the key",
      "Always runs the block and overwrites the stored value with the newest result",
      "Returns the cached value, or runs the block and stores its result"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a risk of caching personalized fragments under a shared key?",
    "topic": "Fragment and Russian doll caching",
    "choices": [
      "Rails clears the key",
      "Caches cannot store HTML, so personalised views must be rendered on every request",
      "The page becomes slower",
      "One user may see another user's content"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the usual way to invalidate caches in Rails?",
    "topic": "Fragment and Russian doll caching",
    "choices": [
      "Delete the database",
      "Change the key, such as with updated_at, rather than deleting entries by hand",
      "Rename the controller",
      "Restart the browser so that every visitor fetches a fresh copy of each fragment"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why is HTTP caching (ETag, stale?) also useful?",
    "topic": "Fragment and Russian doll caching",
    "choices": [
      "It compresses the database",
      "It encrypts cookies",
      "It speeds up Ruby by skipping the interpreter when a response was seen before",
      "The server can answer 304 Not Modified and skip rendering a response body"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does a database index do?",
    "topic": "Database indexing",
    "choices": [
      "Prevents deletions",
      "Encrypts the column so that its values cannot be read without the database key",
      "Speeds up lookups on a column at the cost of write speed and storage",
      "Copies the table"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you add an index in a migration?",
    "topic": "Database indexing",
    "choices": [
      "index :posts, :user_id, :speed",
      "make_index posts.user_id",
      "create_fast :posts",
      "add_index :posts, :user_id"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which columns should usually be indexed?",
    "topic": "Database indexing",
    "choices": [
      "Foreign keys and columns used in frequent where, join and order clauses",
      "Every column in the table, because the database needs an index for each lookup",
      "Only text columns",
      "Only primary keys"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does a unique index enforce?",
    "topic": "Database indexing",
    "choices": [
      "No two rows share the same value (or combination) in the indexed columns",
      "That the column is encrypted, so that two rows cannot show the same stored text",
      "That the table has one row",
      "That the column is the primary key"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a composite index?",
    "topic": "Database indexing",
    "choices": [
      "An index that is shared between databases",
      "An index on a view",
      "Two indexes with the same name",
      "An index on several columns"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why does column order in a composite index matter?",
    "topic": "Database indexing",
    "choices": [
      "The index helps queries that use its leftmost columns",
      "It decides the primary key",
      "The database ignores order",
      "The order only affects how the columns are displayed in the database console"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does EXPLAIN (or explain in Active Record) show?",
    "topic": "Database indexing",
    "choices": [
      "The table's owner",
      "The query's author and the time it was run, taken from the database log file",
      "How the database plans to run the query, including index use",
      "The Ruby backtrace"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does a sequential scan indicate?",
    "topic": "Database indexing",
    "choices": [
      "The table is empty",
      "The database reads the whole table, which may be slow for large tables",
      "The index is perfect and the database has used it for every lookup in the query",
      "The query is cached"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the cost of too many indexes?",
    "topic": "Database indexing",
    "choices": [
      "Slower writes and more storage",
      "Slower reads always",
      "Tables cannot be queried",
      "Migrations fail"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why add a unique index in addition to a uniqueness validation?",
    "topic": "Database indexing",
    "choices": [
      "It makes the form faster",
      "Validations can race, but the database guarantees uniqueness",
      "Indexes replace the model",
      "Validations don't work in production, because model callbacks are skipped there"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a service object?",
    "topic": "Service objects",
    "choices": [
      "A database table",
      "A gem for HTTP requests that retries calls to external services automatically",
      "A plain Ruby class that performs one business operation",
      "A type of route"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a common convention for service objects?",
    "topic": "Service objects",
    "choices": [
      "A call method that performs the operation",
      "An initialize with no arguments only",
      "A view",
      "A migration"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why extract logic into service objects?",
    "topic": "Service objects",
    "choices": [
      "To speed up the database",
      "Because Rails forbids long methods, so every method has to be moved to a class",
      "To keep models and controllers small and logic easy to test",
      "To avoid using classes"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Where do service objects usually live?",
    "topic": "Service objects",
    "choices": [
      "config/services",
      "db/services",
      "app/views",
      "app/services"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a risk of service objects?",
    "topic": "Service objects",
    "choices": [
      "Too many tiny classes can scatter logic and add indirection",
      "They can't be used with controllers",
      "They break Active Record, because models cannot be passed to plain Ruby classes",
      "They delete tests"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How should a service object report failure?",
    "topic": "Service objects",
    "choices": [
      "By ignoring errors",
      "With a result object or an exception that callers can handle",
      "By calling exit",
      "By printing to the screen, so that the person running the code sees the problem"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What makes a service object easy to test?",
    "topic": "Service objects",
    "choices": [
      "It reads from the browser's cookies, so the tests must also open a real session",
      "It takes its dependencies as arguments and has no hidden global state",
      "It calls the network directly",
      "It uses sleep"
    ],
    "answerIdx": 1
  },
  {
    "stem": "When is a service object unnecessary?",
    "topic": "Service objects",
    "choices": [
      "For migrations",
      "For every action",
      "Never, because every operation in a Rails app should have its own service class",
      "For simple CRUD that a model or controller handles clearly"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a form object used for?",
    "topic": "Service objects",
    "choices": [
      "Handling a form that spans several models, with its own validations",
      "Rendering HTML for a single record and sending the markup to the browser at once",
      "Styling forms",
      "Storing sessions"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the single responsibility principle?",
    "topic": "Service objects",
    "choices": [
      "A file should have one class and one line",
      "A class should have one reason to change",
      "A class should have one method",
      "A model should have one column"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a concern in Rails?",
    "topic": "Concerns and refactoring",
    "choices": [
      "A background job",
      "A database view",
      "A module that extracts shared behavior using ActiveSupport::Concern",
      "A security issue that has to be reported to the maintainers of the framework"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Where do model concerns live?",
    "topic": "Concerns and refactoring",
    "choices": [
      "lib/concerns",
      "config/concerns",
      "app/models/concerns",
      "app/concerns/models only"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a drawback of using concerns just to shrink a large model?",
    "topic": "Concerns and refactoring",
    "choices": [
      "Concerns break routes",
      "Concerns delete methods from the model when they are included, which hides behavior",
      "Concerns are slower than classes",
      "The code is hidden in other files but the model's responsibilities stay the same"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the included block in a concern do?",
    "topic": "Concerns and refactoring",
    "choices": [
      "Prints logs",
      "Runs at boot for the whole application, before any model has been loaded",
      "Defines routes",
      "Runs class-level code, such as associations and scopes, when included"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is refactoring?",
    "topic": "Concerns and refactoring",
    "choices": [
      "Fixing bugs",
      "Adding new features to the application without changing any of its structure",
      "Changing code's structure without changing its behavior",
      "Deleting tests"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why refactor with tests in place?",
    "topic": "Concerns and refactoring",
    "choices": [
      "Tests confirm behavior stays the same while the structure changes",
      "Tests are not needed, because refactoring never changes the way the code behaves",
      "Tests slow refactors",
      "Tests change the code"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a code smell?",
    "topic": "Concerns and refactoring",
    "choices": [
      "A slow server",
      "A sign in code that may indicate a deeper design problem",
      "A failing test",
      "A syntax error that stops the program from running when the file is loaded"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the Rails 'fat model' risk look like?",
    "topic": "Concerns and refactoring",
    "choices": [
      "A model without validations",
      "A model without a table",
      "A model with too many responsibilities and hard-to-follow methods",
      "A model with too few columns, which forces the controller to store extra data"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a good first step before extracting a class?",
    "topic": "Concerns and refactoring",
    "choices": [
      "Delete the old code first so that no duplicate logic remains in the project",
      "Write or confirm tests around the existing behavior",
      "Add a new gem",
      "Rename the file"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the Rubocop tool for?",
    "topic": "Concerns and refactoring",
    "choices": [
      "Managing gems",
      "Compiling assets",
      "Enforcing style and flagging some code issues automatically",
      "Running the server and restarting it whenever a file in the project changes"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What should you do before optimizing performance?",
    "topic": "Monitoring and profiling",
    "choices": [
      "Measure to find the real bottleneck",
      "Rewrite the slow part in another language before profiling the application",
      "Remove all queries",
      "Add caching to everything"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which tool shows per-request timing and SQL in development?",
    "topic": "Monitoring and profiling",
    "choices": [
      "puma",
      "jbuilder",
      "rack-mini-profiler",
      "bullet only"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is an APM service used for in production?",
    "topic": "Monitoring and profiling",
    "choices": [
      "Compiling assets and publishing the fingerprinted files to the CDN after deploys",
      "Writing migrations",
      "Formatting code",
      "Tracking response times, errors and traces over time"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you spot slow requests in Rails logs?",
    "topic": "Monitoring and profiling",
    "choices": [
      "Look at the Gemfile",
      "Count the lines in the log file and compare the total with the previous day",
      "Check file sizes",
      "Look at the Completed lines with durations and view/DB timings"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a memory leak symptom in a Rails process?",
    "topic": "Monitoring and profiling",
    "choices": [
      "The server is fast at first and then becomes slower as the number of users falls",
      "Memory grows over time and doesn't return to a stable level",
      "Logs are empty",
      "CPU is zero"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does a flame graph show?",
    "topic": "Monitoring and profiling",
    "choices": [
      "Where time is spent across the call stack",
      "Which gems are installed and how many versions of each one the app has loaded",
      "The route list",
      "The database schema"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why use structured logging with request ids?",
    "topic": "Monitoring and profiling",
    "choices": [
      "It replaces monitoring",
      "Logs become shorter, because the request id replaces the message of each entry",
      "You can trace one request across logs and services",
      "It speeds up queries"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What should alerts be based on?",
    "topic": "Monitoring and profiling",
    "choices": [
      "Symptoms users feel, such as error rate and latency",
      "Every metric the app exposes, so that a change in any value is reported at once",
      "The weather",
      "The number of commits"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which production tool collects exceptions with context?",
    "topic": "Monitoring and profiling",
    "choices": [
      "An error tracker such as Sentry or Honeybadger",
      "rails routes",
      "rake",
      "bundle, which records every exception raised while the gems are being installed"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a load test used for?",
    "topic": "Monitoring and profiling",
    "choices": [
      "Formatting code",
      "Seeing how the app behaves under many concurrent requests",
      "Counting users",
      "Checking spelling in the views by sending many requests with different words"
    ],
    "answerIdx": 1
  }
]
```

LAYER: rails-dev-10

```json
[
  {
    "stem": "What is RSpec?",
    "topic": "Model and request specs with RSpec",
    "choices": [
      "A tool for deploying Ruby apps to cloud servers automatically",
      "A gem that formats Ruby code according to a style guide",
      "A database adapter that records every query in a spec file",
      "A behavior-driven testing framework for Ruby with describe"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does a model spec usually test?",
    "topic": "Model and request specs with RSpec",
    "choices": [
      "The HTML rendered by the full page in a real browser",
      "The speed of the web server under heavy traffic",
      "How the app behaves when deployed behind a load balancer",
      "Validations, associations and methods of a single model"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which matcher checks that two values are equal in RSpec?",
    "topic": "Model and request specs with RSpec",
    "choices": [
      "actual.should_be expected, which replaced the older syntax",
      "check(actual).same_as(expected)",
      "assert actual === expected, which RSpec adds to every example",
      "expect(actual).to eq(expected)"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does a request spec exercise?",
    "topic": "Model and request specs with RSpec",
    "choices": [
      "An HTTP request through routing",
      "The CSS of a page in several screen sizes",
      "A single pure Ruby function with all dependencies stubbed",
      "Only the migration files of the application"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which helper sends a GET request in a request spec?",
    "topic": "Model and request specs with RSpec",
    "choices": [
      "visit '/posts', which also opens a real browser",
      "request.fetch('/posts')",
      "http.get '/posts', which starts a new server",
      "get '/posts'"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you assert that a response has status 200?",
    "topic": "Model and request specs with RSpec",
    "choices": [
      "expect(response).to have_http_status(:ok)",
      "response.must_be :ok",
      "expect(response.code).to be_a(String)",
      "assert response == 200"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the purpose of let in RSpec?",
    "topic": "Model and request specs with RSpec",
    "choices": [
      "Skips an example when the value is nil",
      "Starts a transaction around each example",
      "Declares a global constant for the whole suite that every example can modify",
      "Defines a lazily evaluated helper that is memoized per example"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does before do in a spec?",
    "topic": "Model and request specs with RSpec",
    "choices": [
      "Rolls back the database after each example",
      "Prevents the example from running",
      "Runs once after the whole suite finishes",
      "Runs setup code before each example in the group"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why should each spec be independent of the others?",
    "topic": "Model and request specs with RSpec",
    "choices": [
      "Order and shared state then cannot cause random failures",
      "RSpec refuses to run specs that share data",
      "Independent specs always run faster than dependent ones",
      "Independent specs are required for coverage reports"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does mocking or stubbing an external API call help you do?",
    "topic": "Model and request specs with RSpec",
    "choices": [
      "Make the production service faster by caching its responses inside the test run",
      "Skip writing assertions",
      "Test your code without depending on the network or a real service",
      "Replace the database in production"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What are system tests in Rails?",
    "topic": "System tests with Capybara",
    "choices": [
      "Tests that check operating system settings and the versions of installed gems",
      "Unit tests for helper methods",
      "Browser-driven tests that exercise the app like a user would",
      "Tests that run only on the CI server"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is Capybara?",
    "topic": "System tests with Capybara",
    "choices": [
      "A library that simulates user interactions with the page in tests",
      "A deployment platform",
      "A gem for background job processing",
      "A tool that compiles CSS and JavaScript so the assets can be tested in a page"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which Capybara method opens a page?",
    "topic": "System tests with Capybara",
    "choices": [
      "goto '/posts'",
      "open '/posts'",
      "visit '/posts'",
      "load_page '/posts'"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you click a button labeled 'Save' in Capybara?",
    "topic": "System tests with Capybara",
    "choices": [
      "click_on 'Save' or click_button 'Save'",
      "tap 'Save' now",
      "press 'Save'->run, which sends the form without loading the page in a browser",
      "submit('Save').click"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you fill in a field labeled 'Title'?",
    "topic": "System tests with Capybara",
    "choices": [
      "fill_in 'Title', with: 'Hello'",
      "set_field 'Title', 'Hello'",
      "type 'Title' => 'Hello'",
      "input('Title').text = 'Hello'"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does assert_text (or expect(page).to have_content) do?",
    "topic": "System tests with Capybara",
    "choices": [
      "Waits for the text to appear",
      "Changes the text on the page",
      "Prints the text to the console only",
      "Reads the text from the database"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why does Capybara retry assertions for a short time?",
    "topic": "System tests with Capybara",
    "choices": [
      "Browsers require retries",
      "Assertions fail randomly in Ruby, so every check has to be run several times",
      "Pages with JavaScript update asynchronously, so content may appear a moment later",
      "Retrying makes tests run in parallel"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why are system tests slower than model tests?",
    "topic": "System tests with Capybara",
    "choices": [
      "They use smaller datasets",
      "They run on the database only",
      "They use more gems",
      "They drive a real browser"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How should you balance system tests with other tests?",
    "topic": "System tests with Capybara",
    "choices": [
      "Write system tests for each method",
      "Write only system tests",
      "Never write system tests",
      "Keep a few for critical flows"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What helps debug a failing system test?",
    "topic": "System tests with Capybara",
    "choices": [
      "Screenshots and the page HTML saved on failure",
      "Running it in production",
      "Deleting the test and writing it again from the start with new sample data",
      "Disabling the browser"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What are fixtures in Rails testing?",
    "topic": "Fixtures and factories",
    "choices": [
      "Reusable layouts for views that are loaded into the test database before specs",
      "Gems that generate controllers",
      "Predefined sample data, written in YAML, loaded into the test database",
      "Compiled JavaScript bundles"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Where do fixtures live by default?",
    "topic": "Fixtures and factories",
    "choices": [
      "db/fixtures",
      "test/fixtures",
      "config/fixtures",
      "app/fixtures"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a downside of fixtures as the suite grows?",
    "topic": "Fixtures and factories",
    "choices": [
      "They only work with SQLite",
      "Shared global data becomes hard to understand and keeps coupling tests together",
      "They are written in binary",
      "They cannot be loaded into a database, so every spec has to insert its own rows"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is FactoryBot?",
    "topic": "Fixtures and factories",
    "choices": [
      "A gem for background jobs",
      "A tool for running migrations",
      "A robot that deploys code to the servers when the test suite has passed",
      "A library for building test objects with default attributes"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you define a factory for a user with an email sequence?",
    "topic": "Fixtures and factories",
    "choices": [
      "factory :user, email: :sequence",
      "user = build(:user, email: 1..n), which creates one user for each number in the range",
      "factory :user do sequence(:email) { |n| \"user#{n}@example.com\" } end",
      "define_user email: next"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the difference between build and create in FactoryBot?",
    "topic": "Fixtures and factories",
    "choices": [
      "build saves the object, while create does not",
      "They are identical",
      "create only works in the console",
      "build creates an unsaved object"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why prefer build over create when persistence isn't needed?",
    "topic": "Fixtures and factories",
    "choices": [
      "It avoids validations",
      "It creates fewer methods",
      "It avoids database writes, making tests faster",
      "It's required by RSpec, since create is not available in model specs"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a trait in FactoryBot?",
    "topic": "Fixtures and factories",
    "choices": [
      "A mocking helper",
      "A Ruby module for views that adds helper methods to the rendered templates",
      "A named variation of a factory, such as :admin",
      "A database column type"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What problem can cascading factory associations cause?",
    "topic": "Fixtures and factories",
    "choices": [
      "Rails refuses to load them",
      "Many records are created for a simple test, slowing it down",
      "The tests always pass",
      "Factories stop working once an association points to another factory in the suite"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why should tests create the data they need explicitly?",
    "topic": "Fixtures and factories",
    "choices": [
      "It's the only way to use RSpec",
      "Data is not allowed in tests",
      "Each test is readable",
      "It makes tests longer on purpose"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is continuous integration?",
    "topic": "Continuous integration",
    "choices": [
      "Automatically building and testing every change when it is pushed",
      "Writing documentation after release",
      "Reviewing code once a quarter",
      "Deploying manually on Fridays after the whole team has checked the changes by hand"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which service can run a Rails test suite on every push?",
    "topic": "Continuous integration",
    "choices": [
      "Rubocop alone",
      "GitHub Actions",
      "Capybara",
      "Bundler"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why run the tests against a real database service in CI?",
    "topic": "Continuous integration",
    "choices": [
      "CI cannot use SQLite, because the runners do not include a file system for it",
      "It matches production behavior better than a different engine",
      "It makes Ruby faster",
      "Databases are required by Git"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does caching the bundle in CI do?",
    "topic": "Continuous integration",
    "choices": [
      "Deletes old gems from the runner so that the next job starts with an empty cache",
      "Speeds up runs by reusing installed gems",
      "Encrypts the Gemfile",
      "Runs migrations"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What should a failing CI run do to a pull request?",
    "topic": "Continuous integration",
    "choices": [
      "Skip the check",
      "Block merging until the problem is fixed",
      "Merge it automatically, since failing runs are usually caused by temporary problems",
      "Delete the branch"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which checks belong in a typical Rails CI pipeline?",
    "topic": "Continuous integration",
    "choices": [
      "Only formatting",
      "Tests, linting and a security scan such as brakeman",
      "Only the server start, since the tests are slower than a quick boot check",
      "Only database dumps"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does Brakeman do?",
    "topic": "Continuous integration",
    "choices": [
      "Manages gems",
      "Compiles assets",
      "Speeds up the server by skipping the checks that Rails runs on each request",
      "Statically scans Rails code for common security issues"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why keep CI fast?",
    "topic": "Continuous integration",
    "choices": [
      "It reduces the number of tests",
      "Slow pipelines discourage frequent pushes and delay feedback",
      "It encrypts code",
      "Faster CI shortens gem names, which in turn makes the bundle install quicker"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a flaky test?",
    "topic": "Continuous integration",
    "choices": [
      "A test that has no assertions",
      "A test written in another language",
      "A test that sometimes passes",
      "A test that always passes"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How should secrets be given to CI?",
    "topic": "Continuous integration",
    "choices": [
      "In the README",
      "In the repository, so that every developer and runner has the same values",
      "In test names",
      "As encrypted secrets or environment variables, never committed"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does a Dockerfile do?",
    "topic": "Containerizing Rails",
    "choices": [
      "Describes how to build an image of the app and its dependencies",
      "Compiles views",
      "Stores database rows",
      "Lists the app's routes and the controllers that handle each of the requests"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why use a multi-stage Docker build?",
    "topic": "Containerizing Rails",
    "choices": [
      "The final image can omit build tools",
      "It disables caching",
      "It encrypts the image",
      "It runs several apps in one container"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the default Rails Dockerfile include for production?",
    "topic": "Containerizing Rails",
    "choices": [
      "Test fixtures only",
      "Bundled gems, precompiled assets and a command to start the server",
      "The developer's local database, so that the image starts with realistic sample data",
      "The .git folder"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How should the database be handled in containers?",
    "topic": "Containerizing Rails",
    "choices": [
      "As a separate service or managed database, not inside the app container",
      "In a view",
      "Inside the app image, so the data is deployed together with the application code",
      "In the Gemfile"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why should containers be stateless where possible?",
    "topic": "Containerizing Rails",
    "choices": [
      "Containers cannot write files",
      "They can be replaced or scaled",
      "Stateless containers are always faster",
      "State is illegal"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do secrets such as RAILS_MASTER_KEY reach a container?",
    "topic": "Containerizing Rails",
    "choices": [
      "Stored in the Dockerfile",
      "Written in the README",
      "Through environment variables or the platform's secret store",
      "Baked into the image at build time, so every container has the same key"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does exposing port 3000 in a container mean?",
    "topic": "Containerizing Rails",
    "choices": [
      "The app uses port 3000 on the host automatically",
      "The port is opened for the whole internet automatically",
      "The app inside listens on that port",
      "The port is closed"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a health check endpoint for?",
    "topic": "Containerizing Rails",
    "choices": [
      "Counting users and reporting their number to the dashboard of the platform",
      "Deploying",
      "Compiling assets",
      "Letting the platform know the app is running and ready"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does .dockerignore do?",
    "topic": "Containerizing Rails",
    "choices": [
      "Ignores failing builds",
      "Hides ports",
      "Deletes containers that were built from files which are no longer in the project",
      "Keeps files out of the build context, such as .git and logs"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why pin base image versions?",
    "topic": "Containerizing Rails",
    "choices": [
      "Docker requires it",
      "Builds are reproducible and don't change unexpectedly",
      "It disables security updates forever",
      "Images become faster because pinned layers are always stored in the registry cache"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What typically runs at deploy time for a Rails app?",
    "topic": "Deploying to a cloud host",
    "choices": [
      "A full database reset",
      "Asset precompilation and database migrations",
      "Deleting logs",
      "Only a server restart, since assets and the database are prepared during development"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why is running db:migrate on deploy risky for large tables?",
    "topic": "Deploying to a cloud host",
    "choices": [
      "Migrations skip validations",
      "Long migrations can lock tables",
      "Migrations delete data by default",
      "Migrations never work in production"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a zero-downtime deploy?",
    "topic": "Deploying to a cloud host",
    "choices": [
      "Never deploying",
      "Turning the site off",
      "Deploying only at night, when no visitors are on the site to notice the change",
      "Switching to a new release without interrupting users"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What do platform services like Render or Fly.io provide?",
    "topic": "Deploying to a cloud host",
    "choices": [
      "Hosting that runs your app, often from a container or Git push",
      "A test framework",
      "A Ruby linter that checks the style of the code before each release is published",
      "A CSS library"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What should you verify after a deploy?",
    "topic": "Deploying to a cloud host",
    "choices": [
      "Only the commit message",
      "Only the Gemfile, because the pages are already tested before the release",
      "The app boots, key pages work and error rates stay normal",
      "Nothing"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What makes rollbacks easier?",
    "topic": "Deploying to a cloud host",
    "choices": [
      "Changing the database by hand",
      "Keeping the previous release available and migrations backward-compatible",
      "Skipping tests",
      "Deleting old releases so that only the newest version is ever kept on the server"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why set RAILS_ENV=production on the server?",
    "topic": "Deploying to a cloud host",
    "choices": [
      "The app loads production settings such as caching and eager loading",
      "It enables debugging pages",
      "It changes the Ruby version",
      "It makes the server cheaper, because Rails then starts fewer worker processes"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Where should logs go in a containerized deployment?",
    "topic": "Deploying to a cloud host",
    "choices": [
      "To standard output, collected by the platform",
      "To the browser",
      "To the Gemfile",
      "To a file inside the container only, which the platform reads after the stop"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does RAILS_LOG_TO_STDOUT help with?",
    "topic": "Deploying to a cloud host",
    "choices": [
      "Disables logs completely, so the platform stores nothing from the app process",
      "Writes logs to the database",
      "Lets container platforms collect logs from the process output",
      "Encrypts logs"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a good practice for background workers on deploy?",
    "topic": "Deploying to a cloud host",
    "choices": [
      "Delete the queue",
      "Leave them running old code forever",
      "Restart them so they load the new code",
      "Run them in the browser"
    ],
    "answerIdx": 2
  }
]
```
