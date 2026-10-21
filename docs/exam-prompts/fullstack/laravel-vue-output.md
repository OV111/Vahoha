LAYER: laravel-vue-1

```json
[
  {
    "stem": "How does a PHP variable name begin?",
    "topic": "Variables, types, and control flow",
    "choices": [
      "With the let keyword followed by the name",
      "With an at sign, as in other scripting languages",
      "With a hash symbol that marks it as a variable",
      "With a dollar sign"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the === operator check in PHP?",
    "topic": "Variables, types, and control flow",
    "choices": [
      "That the two values are equal after type juggling is applied",
      "That value and type are both identical",
      "That two objects were created by the same constructor call",
      "That the left value is strictly larger than the right one"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the null coalescing operator ?? do in $name = $input ?? 'guest'?",
    "topic": "Variables, types, and control flow",
    "choices": [
      "Uses $input unless it is null or unset, otherwise 'guest'",
      "Throws an exception when $input has not been defined before use",
      "Assigns 'guest' to $input and then copies it into $name",
      "Uses $input unless it is any falsy value, including 0 and an empty string"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the result of (int) '42abc' in PHP?",
    "topic": "Variables, types, and control flow",
    "choices": [
      "42",
      "The string is returned unchanged",
      "0, because the string is not entirely numeric",
      "A TypeError is thrown for the malformed string"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does declare(strict_types=1) change?",
    "topic": "Variables, types, and control flow",
    "choices": [
      "All warnings in the file are converted into thrown exceptions",
      "Scalar type declarations stop coercing values between types in that file",
      "Variables must be declared with a type before first use",
      "The file is compiled ahead of time for faster execution"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which loop is the clearest way to iterate every item in an array?",
    "topic": "Variables, types, and control flow",
    "choices": [
      "repeat",
      "loop",
      "foreach",
      "do-until"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the match expression offer over switch?",
    "topic": "Variables, types, and control flow",
    "choices": [
      "Loose comparison that treats '1' and 1 as the same case",
      "Strict comparison, a returned value and no fall-through",
      "Automatic conversion of every case into a string",
      "The ability to run several branches in order"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the spaceship operator <=> return?",
    "topic": "Variables, types, and control flow",
    "choices": [
      "-1, 0 or 1 depending on whether the left side is smaller",
      "A boolean that tells whether both sides have the same type",
      "The difference between the two operands as a number",
      "An array holding the sorted pair of operands"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which values does PHP treat as falsy?",
    "topic": "Variables, types, and control flow",
    "choices": [
      "0, an empty string, null and an empty array",
      "Any string that starts with a zero character",
      "Every value that is not exactly true",
      "Only false and null"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What happens when you use single quotes, as in 'Hello $name'?",
    "topic": "Variables, types, and control flow",
    "choices": [
      "The variable is interpolated, just as with double quotes",
      "The string is escaped for safe use in HTML output",
      "The string is treated as a PHP expression and evaluated",
      "The variable is not interpolated and the text is literal"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does a function parameter with a default value, such as function greet($name = 'friend'), allow?",
    "topic": "Functions and arrays",
    "choices": [
      "The parameter becomes a constant that cannot be passed in",
      "The argument type is locked to a string",
      "The function is called automatically when the file loads",
      "The argument can be omitted and the default is used"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the return type declaration function total(): int require?",
    "topic": "Functions and arrays",
    "choices": [
      "The function is called immediately and the result cached as an int",
      "The function must return an integer",
      "The function accepts only integer arguments",
      "The function prints an integer instead of returning one"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does array_map($fn, $items) return?",
    "topic": "Functions and arrays",
    "choices": [
      "The first item for which $fn returns true",
      "The original array modified in place by $fn",
      "A single value combined from all items by $fn",
      "A new array with $fn applied to each item"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which function keeps only the elements that pass a test?",
    "topic": "Functions and arrays",
    "choices": [
      "array_walk",
      "array_filter",
      "array_reduce",
      "array_merge"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is an associative array in PHP?",
    "topic": "Functions and arrays",
    "choices": [
      "An array that can hold only objects",
      "An array whose keys are strings or chosen identifiers",
      "An array that is sorted by its values automatically",
      "An array that is shared across requests"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the spread operator do in [...$a, ...$b]?",
    "topic": "Functions and arrays",
    "choices": [
      "Expands both arrays into one new array",
      "Converts both arrays into JSON strings",
      "Removes duplicate keys from the first array",
      "Compares the two arrays element by element"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does an arrow function fn($x) => $x * 2 capture automatically?",
    "topic": "Functions and arrays",
    "choices": [
      "Every global variable in the script",
      "Nothing, since it can use only its own parameters",
      "Variables from the enclosing scope, by reference",
      "Variables from the enclosing scope, by value"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the difference between passing by value and by reference?",
    "topic": "Functions and arrays",
    "choices": [
      "By reference creates a deep copy of the data",
      "There is no difference for arrays",
      "By value lets the function change the caller's variable",
      "By reference lets the function change the caller's variable"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the null-safe operator in $user?->profile?->bio do when $user is null?",
    "topic": "Functions and arrays",
    "choices": [
      "Returns an empty string for the bio",
      "Creates an empty user object on the fly",
      "Throws a TypeError at the first arrow",
      "Returns null without raising an error"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which function checks that a key exists in an array even when its value is null?",
    "topic": "Functions and arrays",
    "choices": [
      "isset",
      "empty",
      "in_array",
      "array_key_exists"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is an interface in PHP?",
    "topic": "Classes, interfaces, and traits",
    "choices": [
      "A group of constants shared by all classes",
      "A contract listing method signatures a class must implement",
      "A class that can be instantiated and extended freely",
      "A file that autoloads classes"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a trait used for?",
    "topic": "Classes, interfaces, and traits",
    "choices": [
      "Declaring a class that cannot be extended",
      "Creating an object without calling its constructor",
      "Reusing methods across unrelated classes",
      "Forcing a class to implement a set of methods without bodies"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does constructor property promotion do?",
    "topic": "Classes, interfaces, and traits",
    "choices": [
      "Promotes private properties to public after the object is created",
      "Creates getter methods automatically",
      "Declares and assigns properties directly from constructor parameters",
      "Moves the constructor to a parent class"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the readonly modifier on a property guarantee?",
    "topic": "Classes, interfaces, and traits",
    "choices": [
      "It can be initialized once and then not changed",
      "It is not serialized when the object is converted to JSON",
      "It can be read only from inside the same class",
      "It is stored in a read-only region of memory"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the difference between an abstract class and an interface?",
    "topic": "Classes, interfaces, and traits",
    "choices": [
      "An abstract class can hold shared code",
      "An interface can hold shared state, while an abstract class cannot",
      "An abstract class can be instantiated directly, while an interface cannot",
      "An interface can extend only one other interface"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does static mean on a method?",
    "topic": "Classes, interfaces, and traits",
    "choices": [
      "It is available only inside the constructor",
      "It cannot be overridden or called more than once",
      "It belongs to the class",
      "It runs automatically when the class is loaded"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the visibility keyword protected allow?",
    "topic": "Classes, interfaces, and traits",
    "choices": [
      "Access only from the same file",
      "Access from any code in the application",
      "Access only from the constructor",
      "Access from the class itself"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does enum Status: string { case Active = 'active'; } define?",
    "topic": "Classes, interfaces, and traits",
    "choices": [
      "A backed enumeration with a fixed set of cases",
      "A function that returns a string",
      "A class with an automatic constructor",
      "A constant array that can be changed at runtime"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is late static binding with static:: used for?",
    "topic": "Classes, interfaces, and traits",
    "choices": [
      "Resolving class names at compile time only",
      "Binding a method to one specific instance",
      "Referring to the class that was actually called, not the one that defined the method",
      "Preventing a class from being extended"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What do magic methods like __toString do?",
    "topic": "Classes, interfaces, and traits",
    "choices": [
      "Replace the need for a constructor",
      "Run automatically in specific situations",
      "Can only be called from static contexts",
      "Are generated by the framework at deploy time"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the namespace keyword do?",
    "topic": "Namespaces and autoloading",
    "choices": [
      "Turns a class into a singleton",
      "Groups names so classes with the same name do not collide",
      "Marks a file as executable",
      "Imports a class from another file"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does use App\\Models\\User; do at the top of a file?",
    "topic": "Namespaces and autoloading",
    "choices": [
      "Registers the class as a service in the container",
      "Copies the class into the current namespace",
      "Lets you refer to the class as User in that file",
      "Loads and executes the file immediately"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is PSR-4?",
    "topic": "Namespaces and autoloading",
    "choices": [
      "A rule for formatting code with four spaces",
      "A standard that maps namespaces to directory paths for autoloading",
      "A protocol for sending HTTP requests",
      "A database interface specification"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does Composer's autoloader do?",
    "topic": "Namespaces and autoloading",
    "choices": [
      "Installs missing PHP extensions",
      "Runs tests automatically",
      "Loads a class file the first time that class is used",
      "Compiles PHP into machine code"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Where is the autoloader normally included in a Laravel project?",
    "topic": "Namespaces and autoloading",
    "choices": [
      "config/app.php",
      "bootstrap/cache",
      "vendor/autoload.php",
      "public/css"
    ],
    "answerIdx": 2
  },
  {
    "stem": "A class is moved to a new folder but the namespace is not updated. What is the likely result?",
    "topic": "Namespaces and autoloading",
    "choices": [
      "Composer deletes the file",
      "The class works but runs slower",
      "The autoloader cannot find the class",
      "PHP updates the namespace by itself"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does ::class return, as in User::class?",
    "topic": "Namespaces and autoloading",
    "choices": [
      "A list of the class's methods",
      "A new instance of the class",
      "The fully qualified class name as a string",
      "The file path of the class"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why use aliases like use App\\Models\\User as AppUser?",
    "topic": "Namespaces and autoloading",
    "choices": [
      "To avoid a name clash between two imported classes",
      "To make the class load faster",
      "To change the class's visibility",
      "To hide the class from other files"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What happens if two classes in the same namespace share a name?",
    "topic": "Namespaces and autoloading",
    "choices": [
      "The second one silently overrides the first",
      "PHP raises a fatal error for the duplicate declaration",
      "Both are merged into one class",
      "PHP renames the second class"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which directory structure convention does Laravel follow with the App namespace?",
    "topic": "Namespaces and autoloading",
    "choices": [
      "app/ maps to the App\\ namespace",
      "vendor/ maps to the App\\ namespace",
      "src/ maps to the App\\ namespace",
      "public/ maps to the App\\ namespace"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is Composer?",
    "topic": "Composer and packages",
    "choices": [
      "A database migration tool",
      "A web server for PHP applications",
      "A templating engine",
      "A dependency manager for PHP"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which file lists a project's required packages and their version constraints?",
    "topic": "Composer and packages",
    "choices": [
      "composer.lock",
      "package.json",
      "vendor/autoload.php",
      "composer.json"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does composer.lock do?",
    "topic": "Composer and packages",
    "choices": [
      "Lists the PHP extensions on the server",
      "Pins the exact versions that were installed",
      "Locks the project so nobody can edit it",
      "Stores the autoloader cache"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Should vendor/ be committed to version control?",
    "topic": "Composer and packages",
    "choices": [
      "Yes, so deploys never need Composer",
      "No, it is regenerated from composer.json and composer.lock",
      "Only in production branches",
      "Yes, but only the autoload file"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the constraint ^10.0 allow?",
    "topic": "Composer and packages",
    "choices": [
      "Versions from 10.0 up to",
      "Only exactly 10.0",
      "Versions from 9.0 up to 10.0",
      "Any version above 10.0, including 20.0"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the difference between require and require-dev?",
    "topic": "Composer and packages",
    "choices": [
      "require-dev packages are needed only for development",
      "require packages are installed only on the first run",
      "They behave the same but are sorted differently",
      "require-dev packages are installed only in production"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does composer install do when a lock file exists?",
    "topic": "Composer and packages",
    "choices": [
      "Updates every package to the newest version",
      "Installs only development packages",
      "Deletes the lock file",
      "Installs the exact locked versions"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does composer update do?",
    "topic": "Composer and packages",
    "choices": [
      "Removes unused packages only",
      "Updates PHP itself on the server",
      "Resolves the newest versions allowed by the constraints and rewrites the lock file",
      "Reinstalls the same locked versions"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why run composer install --no-dev in production?",
    "topic": "Composer and packages",
    "choices": [
      "To skip development-only packages",
      "To skip the autoloader",
      "To avoid creating a lock file",
      "To install packages faster than normal by using newer versions"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is Packagist?",
    "topic": "Composer and packages",
    "choices": [
      "A PHP code formatter",
      "A testing framework",
      "A hosting provider for Laravel apps",
      "The main public repository of Composer packages"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does try/catch do?",
    "topic": "Error handling",
    "choices": [
      "Runs the catch block before the try block",
      "Logs every statement in the try block",
      "Prevents all errors from being thrown",
      "Handles an exception so the program can recover or report it"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the finally block do?",
    "topic": "Error handling",
    "choices": [
      "Runs before the try block starts",
      "Runs only when no exception is thrown",
      "Runs whether or not an exception was thrown",
      "Runs only when an exception is thrown"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the base interface that all throwable errors and exceptions implement?",
    "topic": "Error handling",
    "choices": [
      "ErrorException only",
      "Throwable",
      "Catchable",
      "Error only"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the difference between Exception and Error in PHP 7+?",
    "topic": "Error handling",
    "choices": [
      "Error cannot be caught",
      "Exception is for engine problems, and Error is for user code",
      "Both implement Throwable, and Error covers engine-level problems such as type errors",
      "They are the same class with two names"
    ],
    "answerIdx": 2
  },
  {
    "stem": "When should you create a custom exception class?",
    "topic": "Error handling",
    "choices": [
      "To silence warnings",
      "To avoid writing try/catch anywhere",
      "To represent a specific failure the caller may want to handle separately",
      "To speed up the code"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does throw do?",
    "topic": "Error handling",
    "choices": [
      "Prints a message to the screen",
      "Stops the PHP process immediately",
      "Raises an exception, interrupting normal flow",
      "Returns a value from a function"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a bad practice in error handling?",
    "topic": "Error handling",
    "choices": [
      "Catching an exception and ignoring it silently",
      "Rethrowing a more specific exception",
      "Using finally to release resources",
      "Logging the exception with context"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which setting should be off in production so users don't see stack traces?",
    "topic": "Error handling",
    "choices": [
      "max_execution_time",
      "memory_limit",
      "error_log",
      "display_errors (APP_DEBUG in Laravel)"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does set_error_handler allow?",
    "topic": "Error handling",
    "choices": [
      "Converting PHP warnings and notices into custom handling",
      "Changing the language of error messages",
      "Disabling the logger",
      "Preventing fatal errors from ever occurring"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why catch specific exception types rather than Throwable everywhere?",
    "topic": "Error handling",
    "choices": [
      "Because catch blocks only accept one type per file",
      "So unexpected problems are not hidden",
      "Because specific exceptions run faster",
      "Because Throwable cannot be caught"
    ],
    "answerIdx": 1
  }
]
```

LAYER: laravel-vue-2

```json
[
  {
    "stem": "Which Laravel directory holds your application's controllers and models?",
    "topic": "Project structure and Artisan",
    "choices": [
      "public, which is the web server's document root",
      "app",
      "storage, which holds logs and compiled views",
      "bootstrap, which holds the framework's startup files"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the purpose of the public directory?",
    "topic": "Project structure and Artisan",
    "choices": [
      "It is the web root, holding index.php and compiled assets",
      "It holds the application's configuration for each environment",
      "It stores uploaded files that must never be served to the browser",
      "It contains the Eloquent models used to query the database"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Where are route definitions for browser pages kept?",
    "topic": "Project structure and Artisan",
    "choices": [
      "app/Http/Routes.php, loaded by the service container",
      "resources/views/routes.blade.php, compiled with the templates",
      "routes/web.php",
      "config/routes.php, read when the framework boots"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the resources directory for?",
    "topic": "Project structure and Artisan",
    "choices": [
      "Database migration files that describe schema changes",
      "Compiled caches and log files that the framework writes",
      "Views, raw frontend assets and language files",
      "The vendor packages installed by Composer"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the storage directory contain?",
    "topic": "Project structure and Artisan",
    "choices": [
      "Logs, cached files, sessions and uploaded files",
      "The seeders and factories used to fill the database",
      "The compiled JavaScript and CSS served to visitors",
      "The source code of the framework itself and its packages"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the vendor directory contain?",
    "topic": "Project structure and Artisan",
    "choices": [
      "Packages installed by Composer",
      "Blade templates for the application",
      "Files uploaded by users of the application",
      "Database migrations created by developers"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the artisan file?",
    "topic": "Project structure and Artisan",
    "choices": [
      "A configuration file for the web server",
      "Laravel's command-line entry point for running commands",
      "A database seeder run during deployment",
      "A template that renders error pages"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which command starts the local development server?",
    "topic": "Project structure and Artisan",
    "choices": [
      "php artisan start:server",
      "composer run server",
      "php artisan app:launch",
      "php artisan serve"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which command creates a new controller class?",
    "topic": "Project structure and Artisan",
    "choices": [
      "php artisan generate controller PostController",
      "composer make controller PostController",
      "php artisan new:controller PostController",
      "php artisan make:controller PostController"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which command lists all registered routes?",
    "topic": "Project structure and Artisan",
    "choices": [
      "php artisan route:list",
      "php artisan list:routes",
      "php artisan routes:show",
      "php artisan app:routes"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which line defines a GET route for /posts that calls a closure?",
    "topic": "Routing and controllers",
    "choices": [
      "Route::any('/posts')->returns('posts');",
      "Route::view('/posts')->closure('posts');",
      "Route::get('/posts', fn () => 'posts');",
      "Router::get('/posts', 'posts');"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you define a route parameter for a post id?",
    "topic": "Routing and controllers",
    "choices": [
      "Route::get('/posts/{id}', ...)",
      "Route::get('/posts/[id]', ...)",
      "Route::get('/posts/:id', ...)",
      "Route::get('/posts/<id>', ...)"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does Route::resource('posts', PostController::class) create?",
    "topic": "Routing and controllers",
    "choices": [
      "A database table named posts",
      "A Blade view for each controller action",
      "A single route that calls every method of the controller",
      "A set of conventional CRUD routes for the controller"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does a named route, such as ->name('posts.show'), allow?",
    "topic": "Routing and controllers",
    "choices": [
      "Hiding the route from the route list",
      "Caching the response of that route",
      "Renaming the controller method that handles the request",
      "Generating URLs with route('posts.show'"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the role of a controller?",
    "topic": "Routing and controllers",
    "choices": [
      "To receive a request",
      "To store the HTML structure of a page",
      "To define the database schema",
      "To compile frontend assets"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does route model binding do for Route::get('/posts/{post}', ...) with a Post type-hint?",
    "topic": "Routing and controllers",
    "choices": [
      "Caches every Post in memory for the request",
      "Converts the route to use POST instead of GET",
      "Fetches the Post for the given id",
      "Creates a new Post whenever the route is visited"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a single-action controller?",
    "topic": "Routing and controllers",
    "choices": [
      "A controller with an __invoke method that handles one route",
      "A controller that can handle only GET requests",
      "A controller that accepts exactly one parameter",
      "A controller shared across all routes"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which HTTP verb should a route use to delete a post?",
    "topic": "Routing and controllers",
    "choices": [
      "PATCH",
      "DELETE",
      "HEAD",
      "GET"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why group routes with Route::prefix('admin')->group(...)?",
    "topic": "Routing and controllers",
    "choices": [
      "To make the routes load faster",
      "To share a URL prefix",
      "To hide them from the route list",
      "To convert them to API routes"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is route caching (php artisan route:cache) meant for?",
    "topic": "Routing and controllers",
    "choices": [
      "Backing up route files",
      "Storing route responses for visitors",
      "Speeding up route registration in production",
      "Encrypting URLs"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is Blade?",
    "topic": "Blade templates",
    "choices": [
      "A command-line tool for deployment",
      "A JavaScript framework",
      "A database abstraction layer",
      "Laravel's templating engine"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How does Blade print a variable with HTML escaping?",
    "topic": "Blade templates",
    "choices": [
      "{!! $name !!}",
      "@print($name)",
      "<?= $name ?>",
      "{{ $name }}"
    ],
    "answerIdx": 3
  },
  {
    "stem": "When should you use {!! $html !!}?",
    "topic": "Blade templates",
    "choices": [
      "For printing numbers",
      "For values that come from user input",
      "For all variables, to improve speed",
      "Only for trusted HTML that you want output unescaped"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which Blade directive loops over a collection?",
    "topic": "Blade templates",
    "choices": [
      "@each-loop",
      "@foreach",
      "@iterate",
      "@repeat"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does @extends('layouts.app') do in a Blade view?",
    "topic": "Blade templates",
    "choices": [
      "Loads a JavaScript file",
      "Makes the view inherit from the named layout",
      "Imports PHP classes into the view",
      "Copies the layout into the database"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does @yield('content') in a layout do?",
    "topic": "Blade templates",
    "choices": [
      "Prints the current route's name",
      "Returns a value from a controller method",
      "Defines a placeholder that child views fill with @section",
      "Pauses the template until data loads"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What are Blade components (<x-alert />) used for?",
    "topic": "Blade templates",
    "choices": [
      "Reusable pieces of markup",
      "Running scheduled tasks",
      "Connecting to the database",
      "Defining HTTP routes"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does @csrf add inside a form?",
    "topic": "Blade templates",
    "choices": [
      "A tracking cookie",
      "A captcha challenge",
      "A link that logs the user out",
      "A hidden token that protects against cross-site request forgery"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which directive shows content only for authenticated users?",
    "topic": "Blade templates",
    "choices": [
      "@member",
      "@auth",
      "@logged",
      "@session"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you include a partial view named sidebar?",
    "topic": "Blade templates",
    "choices": [
      "@require('sidebar')",
      "@include('sidebar')",
      "@load('sidebar')",
      "@import('sidebar')"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you read an input field called email in a controller?",
    "topic": "Request and response handling",
    "choices": [
      "$_REQUEST['email'] only",
      "$request->input('email')",
      "$this->email",
      "Request::fetch('email')"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which return value from a controller sends JSON?",
    "topic": "Request and response handling",
    "choices": [
      "return text($data);",
      "return redirect()->json($data);",
      "return view('json', $data);",
      "return response()->json($data);"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you redirect to a named route?",
    "topic": "Request and response handling",
    "choices": [
      "return redirect()->route('posts.index');",
      "return go('posts.index');",
      "return view()->route('posts.index');",
      "return url()->redirect('posts.index');"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does $request->validate([...]) do?",
    "topic": "Request and response handling",
    "choices": [
      "Checks input against rules",
      "Encrypts the request body",
      "Sends the request to an external validation service",
      "Logs the request for later review"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the old('email') helper return?",
    "topic": "Request and response handling",
    "choices": [
      "The previous value stored in the database",
      "The value submitted on the previous request, after a validation failure",
      "The user's last login email",
      "The default email set in the config"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you return a custom status code, such as 201, with JSON?",
    "topic": "Request and response handling",
    "choices": [
      "response()->json($data, 201)",
      "return 201 + $data",
      "json($data)->status('201')",
      "response($data)->code(201)->json()"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which method gets a file uploaded in a form field called avatar?",
    "topic": "Request and response handling",
    "choices": [
      "$request->input('avatar') only",
      "Request::upload('avatar')",
      "$_FILES->avatar",
      "$request->file('avatar')"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does a 404 status mean?",
    "topic": "Request and response handling",
    "choices": [
      "The request was malformed",
      "The user is not authenticated",
      "The requested resource was not found",
      "The server crashed"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does abort(403) do?",
    "topic": "Request and response handling",
    "choices": [
      "Redirects to the home page",
      "Stops the request and returns a forbidden response",
      "Logs the user out",
      "Rolls back the database"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you flash a one-time message to the next request?",
    "topic": "Request and response handling",
    "choices": [
      "cookie()->set('status', 'Saved!');",
      "session()->forever('status', 'Saved!');",
      "return view('status', 'Saved!');",
      "return back()->with('status', 'Saved!');"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Where does Laravel read environment-specific values such as database credentials?",
    "topic": "Configuration and environment",
    "choices": [
      "The public folder",
      "The routes folder",
      "The .env file",
      "The Blade views"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why should .env not be committed to version control?",
    "topic": "Configuration and environment",
    "choices": [
      "It is too large for Git to handle",
      "Composer ignores it automatically",
      "Laravel deletes it on deploy",
      "It contains secrets and values specific to each environment"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you read a config value in application code?",
    "topic": "Configuration and environment",
    "choices": [
      "getenv()->app.name",
      "$_ENV['app.name'] only",
      "env('app.name') everywhere",
      "config('app.name')"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why call env() only inside config files?",
    "topic": "Configuration and environment",
    "choices": [
      "After configuration caching, env() outside config files returns null",
      "Because Laravel forbids it in controllers",
      "Because env() is slower than config()",
      "Because env() can only read numbers"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does php artisan config:cache do?",
    "topic": "Configuration and environment",
    "choices": [
      "Clears the .env file",
      "Compiles Blade templates",
      "Combines config files into one cached file for faster loading",
      "Backs up the database"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does APP_DEBUG=true do?",
    "topic": "Configuration and environment",
    "choices": [
      "Turns on the queue worker",
      "Enables HTTPS",
      "Shows detailed error pages",
      "Makes the application faster"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the purpose of APP_KEY?",
    "topic": "Configuration and environment",
    "choices": [
      "Identifying the server to Composer",
      "Authenticating to the database",
      "Naming the application in logs",
      "Encrypting data such as cookies"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Where do you configure the default database connection?",
    "topic": "Configuration and environment",
    "choices": [
      "routes/web.php",
      "config/database.php, using values from .env",
      "public/index.php",
      "resources/views/db.blade.php"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does php artisan key:generate do?",
    "topic": "Configuration and environment",
    "choices": [
      "Creates a new database user",
      "Generates SSH keys",
      "Creates a new application key in .env",
      "Creates API tokens for users"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Different values per environment (local, staging, production) are best handled by:",
    "topic": "Configuration and environment",
    "choices": [
      "Keeping separate code branches for each value",
      "Editing config files before every deployment",
      "Setting different environment variables or .env files",
      "Using different Laravel versions"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is middleware in Laravel?",
    "topic": "Middleware basics",
    "choices": [
      "A Blade directive for layouts",
      "Code that inspects or modifies requests before they reach a route, or responses after",
      "A package that connects to a database",
      "A class that stores user preferences"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which middleware ensures that only logged-in users reach a route?",
    "topic": "Middleware basics",
    "choices": [
      "guest",
      "throttle",
      "signed",
      "auth"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you apply middleware to a single route?",
    "topic": "Middleware basics",
    "choices": [
      "Route::get(...)->middleware('auth');",
      "Route::get(...)->guard('auth');",
      "Route::get(...)->only('auth');",
      "Route::auth()->get(...);"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the throttle middleware do?",
    "topic": "Middleware basics",
    "choices": [
      "Limits how many requests a client can make in a time window",
      "Slows down the server on purpose for testing",
      "Caches pages for logged-in users",
      "Compresses responses"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the signature of a basic middleware's handle method?",
    "topic": "Middleware basics",
    "choices": [
      "handle(Response $response)",
      "handle(Request $request, Closure $next)",
      "handle(array $config)",
      "handle(string $route)"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does returning $next($request) do in middleware?",
    "topic": "Middleware basics",
    "choices": [
      "Runs the request twice",
      "Passes the request on to the next layer",
      "Redirects to the home page",
      "Stops the request with an empty page"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How can middleware end a request early?",
    "topic": "Middleware basics",
    "choices": [
      "By editing the .env file",
      "By throwing the request away silently",
      "By returning a response or redirect",
      "By calling exit() in the route"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does a middleware group such as web typically include?",
    "topic": "Middleware basics",
    "choices": [
      "API token handling only",
      "Only database migrations",
      "Session, cookie and CSRF handling",
      "Frontend asset bundling"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Where are middleware aliases and groups configured in recent Laravel versions?",
    "topic": "Middleware basics",
    "choices": [
      "bootstrap/app.php",
      "routes/api.php only",
      "config/middleware.php only",
      "public/index.php"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a good use for after-middleware (acting on the response)?",
    "topic": "Middleware basics",
    "choices": [
      "Connecting to the database",
      "Validating input before the controller",
      "Adding headers to every response",
      "Choosing which route to run"
    ],
    "answerIdx": 2
  }
]
```

LAYER: laravel-vue-3

```json
[
  {
    "stem": "What is a migration in Laravel?",
    "topic": "Migrations and schema",
    "choices": [
      "A Blade template for rendering tables",
      "A cached query result stored between requests",
      "A script that copies data from one server to another",
      "A versioned PHP file that describes a database schema change"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which command creates a new migration to create a posts table?",
    "topic": "Migrations and schema",
    "choices": [
      "php artisan make:migration create_posts_table",
      "php artisan new:table posts --migration",
      "composer make migration posts",
      "php artisan db:create posts"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which command runs all pending migrations?",
    "topic": "Migrations and schema",
    "choices": [
      "php artisan schema:apply",
      "php artisan migrate:start",
      "php artisan migrate",
      "php artisan db:run"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the down method of a migration for?",
    "topic": "Migrations and schema",
    "choices": [
      "Reversing the changes made by up",
      "Running the migration a second time in production",
      "Deleting the migration file after it has run",
      "Creating a backup of the table before changes"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does php artisan migrate:rollback do?",
    "topic": "Migrations and schema",
    "choices": [
      "Reruns only the latest migration without reverting it",
      "Reverts every migration in a single step",
      "Deletes the database entirely and recreates it",
      "Reverts the most recent batch of migrations"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does $table->id() create in a migration?",
    "topic": "Migrations and schema",
    "choices": [
      "An auto-incrementing big integer primary key",
      "A random UUID string column",
      "A unique index on the name column",
      "A column that stores the user's id from the session"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does $table->timestamps() add?",
    "topic": "Migrations and schema",
    "choices": [
      "A trigger that logs all queries",
      "A single timestamp column called time",
      "created_at and updated_at columns",
      "An index sorted by creation date"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why add a new migration instead of editing one that has already run in production?",
    "topic": "Migrations and schema",
    "choices": [
      "Old migrations are cached permanently by Composer",
      "Editing a migration deletes the table's data on the next request",
      "Other environments have already applied the old version",
      "Laravel forbids editing any migration file"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does $table->string('title')->nullable() do?",
    "topic": "Migrations and schema",
    "choices": [
      "Creates a title column that is hidden from queries",
      "Creates a title column that may hold null",
      "Creates a title column that must always be unique",
      "Creates a title column with no maximum length"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does php artisan migrate:fresh do?",
    "topic": "Migrations and schema",
    "choices": [
      "Rolls back one batch and reapplies it",
      "Creates a backup before migrating",
      "Drops all tables and runs every migration again",
      "Runs only new migrations and keeps the data"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is an Eloquent model?",
    "topic": "Eloquent models and CRUD",
    "choices": [
      "A migration written in PHP",
      "A class that represents a database table and its rows",
      "A class that renders a view for the page and returns the compiled HTML to the browser",
      "A file that defines a route"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How does Laravel infer the table name for the Post model?",
    "topic": "Eloquent models and CRUD",
    "choices": [
      "By using the exact class name: Post",
      "By checking the .env file",
      "By reading the first migration that mentions it",
      "By pluralizing the snake_case class name: posts"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which line creates and saves a new post?",
    "topic": "Eloquent models and CRUD",
    "choices": [
      "Post::new('Hello')->commit();",
      "Post::create(['title' => 'Hello']);",
      "Post::insertInto(['title' => 'Hello']);",
      "Post::make('Hello')->persist();"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What must be set on a model before using create() with an array?",
    "topic": "Eloquent models and CRUD",
    "choices": [
      "The $timestamps property to false",
      "The $connection property",
      "The $casts property",
      "The $fillable (or $guarded) property"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is mass assignment protection for?",
    "topic": "Eloquent models and CRUD",
    "choices": [
      "Locking the table during writes",
      "Stopping users from setting fields they should not control",
      "Encrypting the database",
      "Preventing a model from being saved twice"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which method returns all rows of the model as a collection?",
    "topic": "Eloquent models and CRUD",
    "choices": [
      "Post::rows()",
      "Post::all()",
      "Post::fetchAll()",
      "Post::list()"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does Post::findOrFail($id) do when the id doesn't exist?",
    "topic": "Eloquent models and CRUD",
    "choices": [
      "Returns null silently and lets the rest of the code continue to run as usual",
      "Throws a not-found exception that becomes a 404 response",
      "Creates an empty post",
      "Returns the first post instead"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you update a model after changing an attribute?",
    "topic": "Eloquent models and CRUD",
    "choices": [
      "$post->commit(), which writes the changes and closes the open transaction",
      "$post->title = 'New'; $post->save();",
      "Post::refresh($post);",
      "$post->push('title');"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does $post->delete() do on a model without soft deletes?",
    "topic": "Eloquent models and CRUD",
    "choices": [
      "Removes the row from the table",
      "Marks the row as hidden",
      "Sets all columns to null",
      "Moves it to another table"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does SoftDeletes provide?",
    "topic": "Eloquent models and CRUD",
    "choices": [
      "A backup of the table",
      "A deleted_at timestamp so rows can be hidden and restored",
      "A faster delete for large tables that skips the model events and observers",
      "Automatic deletion of related models only"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you define that a User has many Posts?",
    "topic": "Relationships",
    "choices": [
      "public function posts() { return $this->hasMany(Post::class); }",
      "public function posts() { return $this->belongsTo(Post::class); }",
      "public $posts = Post::class;",
      "public function posts() { return Post::all(); }"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which side of a one-to-many relationship holds the foreign key?",
    "topic": "Relationships",
    "choices": [
      "A separate table is always required",
      "The 'one' side, such as users.post_id",
      "Neither; Eloquent stores keys in the cache",
      "The 'many' side, such as posts.user_id"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does belongsTo define?",
    "topic": "Relationships",
    "choices": [
      "A one-to-one relationship without a foreign key",
      "A relationship that deletes the parent automatically",
      "A many-to-many relationship through a pivot table",
      "The inverse of a hasMany"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which relationship type needs a pivot table?",
    "topic": "Relationships",
    "choices": [
      "belongsToMany",
      "morphOne",
      "belongsTo",
      "hasOne"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you access a user's posts after defining the relation?",
    "topic": "Relationships",
    "choices": [
      "$user::posts",
      "$user->posts()->all",
      "$user->posts",
      "$user->getPosts"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the difference between $user->posts and $user->posts()?",
    "topic": "Relationships",
    "choices": [
      "The first returns a query builder, while the second returns the loaded collection",
      "The second runs a migration",
      "They always return the same thing",
      "The first returns the loaded collection, while the second returns a query builder"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What problem does eager loading with with('posts') solve?",
    "topic": "Relationships",
    "choices": [
      "Slow migrations",
      "The N+1 query problem",
      "Missing foreign keys",
      "Mass assignment errors"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you create a post that belongs to a user through the relation?",
    "topic": "Relationships",
    "choices": [
      "$user->posts = [...]",
      "$user->posts()->create([...])",
      "Post::belongsTo($user)->save()",
      "$user->attach('posts', [...])"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does hasOneThrough let you do?",
    "topic": "Relationships",
    "choices": [
      "Join two databases",
      "Reach a distant related model through an intermediate model",
      "Link a model to itself only",
      "Create two relationships at once from a single method on the parent model"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does onDelete('cascade') on a foreign key do?",
    "topic": "Relationships",
    "choices": [
      "Deletes child rows when the parent row is deleted",
      "Sets the child's name to null",
      "Copies the parent row",
      "Prevents the parent from being deleted"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the query builder?",
    "topic": "Query builder",
    "choices": [
      "A class that renders HTML forms",
      "A library for caching pages",
      "A fluent interface for building SQL queries with PHP method calls",
      "A graphical tool for drawing the tables and relations of a database schema"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which call returns posts where views is greater than 100?",
    "topic": "Query builder",
    "choices": [
      "DB::posts()->filter('views > 100');",
      "DB::table('posts')->where('views', '>', 100)->get();",
      "DB::from('posts')->greater('views', 100);",
      "DB::select('posts', 'views', 100);"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why use bindings instead of concatenating user input into SQL?",
    "topic": "Query builder",
    "choices": [
      "To turn off logging",
      "To avoid using indexes",
      "To prevent SQL injection",
      "To make queries shorter"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does orderBy('created_at', 'desc') do?",
    "topic": "Query builder",
    "choices": [
      "Limits the results to one row",
      "Groups results by month",
      "Sorts results oldest first",
      "Sorts results with the newest first"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the difference between get() and first()?",
    "topic": "Query builder",
    "choices": [
      "get() returns one row, while first() returns all rows",
      "get() returns a collection",
      "first() deletes the row",
      "They are identical"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does paginate(15) do?",
    "topic": "Query builder",
    "choices": [
      "Sets a time limit of 15 seconds",
      "Caches 15 queries",
      "Returns only the fifteenth item from the result set and discards the rest",
      "Returns 15 items per page with page links and metadata"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you run several writes so that they all succeed or all fail?",
    "topic": "Query builder",
    "choices": [
      "DB::transaction(function () { ... });",
      "DB::batch(function () { ... });",
      "DB::lock()->all(...)",
      "DB::atomic()->run(...)"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does count() do in a query chain?",
    "topic": "Query builder",
    "choices": [
      "Returns the first matching row",
      "Returns an array of ids",
      "Deletes matching rows",
      "Returns the number of matching rows"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does a join do in a query?",
    "topic": "Query builder",
    "choices": [
      "Sorts rows alphabetically",
      "Copies a table",
      "Combines rows from two tables on matching columns",
      "Splits one table into two tables that share the same primary key column"
    ],
    "answerIdx": 2
  },
  {
    "stem": "When might you prefer the query builder over Eloquent?",
    "topic": "Query builder",
    "choices": [
      "Only for deleting tables",
      "Only when using SQLite",
      "For complex reporting queries where model hydration is unnecessary",
      "Never, because Eloquent is always required for every query in the framework"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a seeder?",
    "topic": "Seeders and factories",
    "choices": [
      "A class that inserts initial or sample data into the database",
      "A class that runs tests",
      "A class that sends emails",
      "A class that creates the tables and columns of the database schema from code"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which command runs the database seeders?",
    "topic": "Seeders and factories",
    "choices": [
      "php artisan db:seed",
      "php artisan seed:run",
      "php artisan fill:db",
      "php artisan migrate:data"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a model factory used for?",
    "topic": "Seeders and factories",
    "choices": [
      "Generating fake model instances for seeding and tests",
      "Building HTML forms",
      "Creating new controller classes with the routes and views already wired together",
      "Compiling frontend assets"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you create five fake users with a factory?",
    "topic": "Seeders and factories",
    "choices": [
      "Factory::users(5)->make();",
      "User::factory(5)->fake();",
      "User::factory()->count(5)->create();",
      "User::seed(5);"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the difference between make() and create() on a factory?",
    "topic": "Seeders and factories",
    "choices": [
      "make() builds models in memory, while create() also saves them",
      "They are identical",
      "create() only works in production",
      "make() saves models, while create() only builds them in memory"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which library does Laravel factories use to generate fake names and emails?",
    "topic": "Seeders and factories",
    "choices": [
      "Faker",
      "Carbon",
      "Composer",
      "Guzzle"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you define related data in a factory?",
    "topic": "Seeders and factories",
    "choices": [
      "With a relationship method like has() or for(), or a nested factory in definition()",
      "By storing it in .env",
      "By editing the migration so that the related tables are filled when it runs",
      "It is not possible"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why avoid running seeders that wipe data in production?",
    "topic": "Seeders and factories",
    "choices": [
      "Seeders do not work in production",
      "They are always slower in production",
      "Production has no database",
      "They can destroy real data"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does php artisan migrate:fresh --seed do?",
    "topic": "Seeders and factories",
    "choices": [
      "Runs only the seeder",
      "Creates a backup before seeding",
      "Rebuilds the schema and then seeds the database",
      "Seeds the database and then deletes the tables"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a state in a factory?",
    "topic": "Seeders and factories",
    "choices": [
      "A saved snapshot of the database that can be restored between test runs later",
      "A record of failed seeds",
      "A cache of generated values",
      "A variation of the default attributes, such as an admin user"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which .env keys configure a MySQL connection?",
    "topic": "Connecting MySQL",
    "choices": [
      "APP_DB and APP_PASS",
      "MYSQL_URL only, because Laravel does not read any other connection variables",
      "DB_CONNECTION, DB_HOST, DB_PORT, DB_DATABASE, DB_USERNAME, DB_PASSWORD",
      "SQL_SERVER and SQL_KEY"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What PHP extension is needed to talk to MySQL with PDO?",
    "topic": "Connecting MySQL",
    "choices": [
      "gd",
      "intl",
      "curl",
      "pdo_mysql"
    ],
    "answerIdx": 3
  },
  {
    "stem": "A migration fails with 'Access denied for user'. What should you check first?",
    "topic": "Connecting MySQL",
    "choices": [
      "The Blade templates, since an access error is raised while a view is rendered",
      "The CSS files",
      "The DB_USERNAME and DB_PASSWORD values and the user's privileges",
      "The route definitions"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does config:clear help with after changing .env?",
    "topic": "Connecting MySQL",
    "choices": [
      "Deletes the database and rebuilds it using the migration files in the project",
      "Resets migrations",
      "Removes a stale cached configuration so new values load",
      "Clears the browser cache"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why use a dedicated database user with limited privileges for the app?",
    "topic": "Connecting MySQL",
    "choices": [
      "It makes queries faster",
      "It is required by Laravel",
      "It avoids needing migrations",
      "It limits damage if credentials leak"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a safe way to handle a local database?",
    "topic": "Connecting MySQL",
    "choices": [
      "Use separate databases for development, testing and production",
      "Use the production database for all environments",
      "Share one database among all developers' machines without isolation",
      "Commit database dumps with passwords"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does php artisan db:show help with?",
    "topic": "Connecting MySQL",
    "choices": [
      "Clearing views",
      "Inspecting connection details and tables",
      "Seeding data into every table that has a matching model class in the project",
      "Running tests"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the charset utf8mb4 enable in MySQL?",
    "topic": "Connecting MySQL",
    "choices": [
      "Faster numeric operations for columns that store large integers and decimals",
      "Encrypted columns",
      "Case-sensitive table names",
      "Storing the full range of Unicode characters, including emoji"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is connection pooling's usual role when scaling PHP apps?",
    "topic": "Connecting MySQL",
    "choices": [
      "Caching rendered HTML pages so that repeat visitors never reach the database",
      "Reusing database connections so many requests don't overload the server",
      "Encrypting tokens",
      "Compressing files"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why test migrations on a copy of production data before a risky change?",
    "topic": "Connecting MySQL",
    "choices": [
      "To skip writing a down method",
      "To make migrations run faster in production",
      "To find locking or data problems before they affect real users",
      "To avoid committing the migration"
    ],
    "answerIdx": 2
  }
]
```

LAYER: laravel-vue-4

```json
[
  {
    "stem": "What is a Form Request class in Laravel?",
    "topic": "Form requests and validation",
    "choices": [
      "A middleware that blocks every request lacking a form token",
      "A class that holds authorization",
      "A Blade component that renders an HTML form with its inputs",
      "A model that stores the submitted form data in the database"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which command generates a form request named StorePostRequest?",
    "topic": "Form requests and validation",
    "choices": [
      "php artisan request:create StorePostRequest",
      "php artisan make:request StorePostRequest",
      "php artisan new:validation StorePostRequest",
      "php artisan make:form StorePostRequest"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Where do you declare validation rules in a form request?",
    "topic": "Form requests and validation",
    "choices": [
      "In the routes file next to the route definition",
      "In the constructor of the controller",
      "In the .env file under a VALIDATION key",
      "In the rules() method"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the rule 'required|email|max:255' mean?",
    "topic": "Form requests and validation",
    "choices": [
      "The field may be empty, but if present it must be 255 characters",
      "The field must be an email stored in a column named max",
      "The field is optional and trimmed to 255 characters",
      "The field must be present"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What happens when form request validation fails for a normal web request?",
    "topic": "Form requests and validation",
    "choices": [
      "The user is redirected back with errors and old input",
      "The controller runs with empty data",
      "The request is silently ignored",
      "The server returns a 500 error page because the rules could not be applied"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What status code does a failed validation return for a JSON request?",
    "topic": "Form requests and validation",
    "choices": [
      "500 Internal Server Error",
      "204 No Content",
      "422 Unprocessable Entity",
      "404 Not Found"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the unique:users,email rule check?",
    "topic": "Form requests and validation",
    "choices": [
      "That no existing row in users already has that email",
      "That the email exists in the users table",
      "That the email is unique among the fields of the request",
      "That the user has only one email address"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you display a validation error for the title field in Blade?",
    "topic": "Form requests and validation",
    "choices": [
      "@error('title') {{ $message }} @enderror",
      "{{ error('title') }} only",
      "{{ $errors->title }} only, because errors are stored as properties of the view",
      "@validation('title')"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why is client-side validation not enough?",
    "topic": "Form requests and validation",
    "choices": [
      "Client-side validation is blocked by Laravel",
      "Browsers cannot validate email addresses at all",
      "Servers ignore data from forms",
      "Users can bypass the browser"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the authorize() method of a form request decide?",
    "topic": "Form requests and validation",
    "choices": [
      "Whether the response should be cached",
      "Which database to use for the request",
      "Whether the current user may make this request",
      "Whether the validation rules should run twice"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is CSRF?",
    "topic": "CSRF protection",
    "choices": [
      "An attack that tricks a logged-in user's browser into sending an unwanted request",
      "A database injection technique that alters stored queries",
      "A way to read another user's session id out of the URL of a shared link",
      "A method for guessing passwords by trying many combinations"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How does Laravel protect against CSRF by default?",
    "topic": "CSRF protection",
    "choices": [
      "It blocks every request that comes from a different domain than the app itself",
      "It disables cookies on POST requests",
      "It hashes each request body before it reaches the controller",
      "It requires a token with state-changing requests from the web middleware group"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does @csrf output inside a form?",
    "topic": "CSRF protection",
    "choices": [
      "A CSS class for styling the form",
      "A cookie that identifies the user's browser",
      "A hidden input containing the CSRF token",
      "A script that sends the form with Ajax"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which kind of request needs a CSRF token?",
    "topic": "CSRF protection",
    "choices": [
      "POST, PUT, PATCH and DELETE requests from the browser",
      "GET requests only, because they are the only ones that change server state",
      "Only requests sent from JavaScript",
      "Requests to static files"
    ],
    "answerIdx": 0
  },
  {
    "stem": "A form submit returns a 419 page. What is the likely cause?",
    "topic": "CSRF protection",
    "choices": [
      "The CSRF token is missing or expired",
      "The user lacks permission",
      "The database connection failed",
      "The route does not exist"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How does a form send a DELETE request, since HTML forms support only GET and POST?",
    "topic": "CSRF protection",
    "choices": [
      "With a hidden _method field using @method('DELETE')",
      "By using a different HTTP version",
      "By renaming the route file to delete.php so the server treats it as a delete",
      "By setting the form's enctype to delete"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How can JavaScript clients send the CSRF token with requests?",
    "topic": "CSRF protection",
    "choices": [
      "In the response body only",
      "As an X-CSRF-TOKEN header",
      "They don't need to",
      "In the URL as a query string"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which routes are typically excluded from CSRF checks?",
    "topic": "CSRF protection",
    "choices": [
      "All routes that use the POST verb, since POST requests never change any data",
      "Routes behind the auth middleware",
      "Routes that render Blade views",
      "Stateless API routes using token authentication"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why is a CSRF token tied to the user's session?",
    "topic": "CSRF protection",
    "choices": [
      "So an attacker's site cannot guess a valid token for the victim",
      "So the token never changes",
      "So the server needs no database",
      "So the token can be reused by anyone who visits the site from any location"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What should you do about GET routes that change data (such as GET /delete/5)?",
    "topic": "CSRF protection",
    "choices": [
      "Use them freely, since GET requests are always safe to repeat and never need a token",
      "Avoid them, because they can be triggered by links or images without a token",
      "Cache them for speed",
      "Add a second token to the URL"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you flash a success message to the next request?",
    "topic": "Flash messages and old input",
    "choices": [
      "cookie('status', 'Saved') in the controller",
      "redirect()->route('posts.index')->with('status', 'Saved')",
      "return view('posts.index', 'Saved')",
      "session()->put('status', 'Saved') on every request"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you read the flashed value in Blade?",
    "topic": "Flash messages and old input",
    "choices": [
      "$status only, set by the router",
      "$request->old('status')",
      "flash('status') from a helper package",
      "session('status')"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does flashed data do after the next request?",
    "topic": "Flash messages and old input",
    "choices": [
      "It's copied to every later request",
      "It stays until the user logs out",
      "It's removed automatically",
      "It's saved in the database"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is old('title') used for?",
    "topic": "Flash messages and old input",
    "choices": [
      "Showing the previous version of a saved record from the revision history table",
      "Refilling a form field with the previous input after a validation error",
      "Reading the oldest row from the table",
      "Restoring a deleted post"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which method keeps old input when redirecting back manually?",
    "topic": "Flash messages and old input",
    "choices": [
      "oldInput()",
      "retain()",
      "keepInput()",
      "withInput()"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why flash messages instead of storing them in a normal session value?",
    "topic": "Flash messages and old input",
    "choices": [
      "They are encrypted differently",
      "They work without cookies",
      "They are faster to write to the session",
      "They disappear after being shown"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is @error('email') used for?",
    "topic": "Flash messages and old input",
    "choices": [
      "Throwing an exception from inside the template so the page stops rendering",
      "Checking whether the email field has a validation error",
      "Logging the email to the error log",
      "Rendering a 500 page"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the $errors variable contain in Blade views?",
    "topic": "Flash messages and old input",
    "choices": [
      "The error log of the current user",
      "A list of HTTP errors seen by the server",
      "A message bag of validation errors",
      "The latest exception thrown by the application"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you show all error messages in a list?",
    "topic": "Flash messages and old input",
    "choices": [
      "@each($errors)",
      "{{ $errors->list() }}",
      "@foreach ($errors->all() as $error)",
      "@foreach ($errors as $error) only if not empty"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which session driver stores data in files by default in older Laravel versions?",
    "topic": "Flash messages and old input",
    "choices": [
      "memcached",
      "file",
      "cookie",
      "array"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is Laravel Breeze?",
    "topic": "Laravel Breeze authentication",
    "choices": [
      "A deployment service for Laravel apps",
      "A full admin panel with a visual page builder and drag and drop content blocks",
      "A minimal starter kit that scaffolds authentication routes, controllers and views",
      "A payment library for subscriptions"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which command installs Breeze's scaffolding after requiring the package?",
    "topic": "Laravel Breeze authentication",
    "choices": [
      "php artisan auth:scaffold",
      "composer breeze install",
      "php artisan breeze:install",
      "php artisan make:auth breeze"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which stacks can Breeze scaffold for the frontend?",
    "topic": "Laravel Breeze authentication",
    "choices": [
      "Only Svelte",
      "Only Blade",
      "Only Blade templates, because the starter kit cannot generate anything else",
      "Blade, Livewire, Vue or React with Inertia, and API"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does Auth::attempt($credentials) do?",
    "topic": "Laravel Breeze authentication",
    "choices": [
      "Resets the user's password",
      "Creates a new user record from the credentials and then signs that user in",
      "Checks the credentials and logs the user in if they match",
      "Sends the credentials to a third party"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How are passwords stored by Laravel's default authentication?",
    "topic": "Laravel Breeze authentication",
    "choices": [
      "As hashes created with Hash::make (bcrypt or argon)",
      "As plain text in the users table, so that administrators can read them back",
      "As MD5 digests",
      "As reversible encrypted strings"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does Auth::user() return?",
    "topic": "Laravel Breeze authentication",
    "choices": [
      "The currently authenticated user, or null",
      "A list of all users",
      "The id of the last user created",
      "The user's password hash"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the 'verified' middleware require?",
    "topic": "Laravel Breeze authentication",
    "choices": [
      "That the request uses HTTPS",
      "That the user has verified their email address",
      "That the request carries a signed URL that has not yet reached its expiry time",
      "That the user is an administrator"
    ],
    "answerIdx": 1
  },
  {
    "stem": "After login, why regenerate the session?",
    "topic": "Laravel Breeze authentication",
    "choices": [
      "To make the session expire sooner",
      "To delete the user's data",
      "To clear the CSRF token",
      "To prevent session fixation attacks"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does Auth::logout() alone leave for you to handle?",
    "topic": "Laravel Breeze authentication",
    "choices": [
      "Deleting the user's account together with all of the records that belong to it",
      "Disabling the middleware",
      "Invalidating the session and regenerating the token",
      "Clearing the database"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why add rate limiting to the login route?",
    "topic": "Laravel Breeze authentication",
    "choices": [
      "To make the page faster",
      "To prevent logout",
      "To remove the CSRF token",
      "To slow down password guessing"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a gate in Laravel?",
    "topic": "Authorization with gates and policies",
    "choices": [
      "A closure that decides whether a user may perform an action",
      "A route group with a prefix",
      "A middleware that opens a database connection before the controller starts to run",
      "A class that sends notifications"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a policy?",
    "topic": "Authorization with gates and policies",
    "choices": [
      "A validation rule set",
      "A class that groups authorization logic for a specific model",
      "A configuration file that sets the lifetime of the session and the cookie names",
      "A database constraint"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which command generates a policy for Post?",
    "topic": "Authorization with gates and policies",
    "choices": [
      "php artisan policy:new Post",
      "php artisan make:policy PostPolicy --model=Post",
      "php artisan auth:policy Post",
      "php artisan make:gate PostPolicy, which creates a gate class for the Post model"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you check a policy in a controller?",
    "topic": "Authorization with gates and policies",
    "choices": [
      "Auth::policy($post)->update();",
      "$post->can_update();",
      "$this->authorize('update', $post);",
      "policy($post)->run('update');"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you check authorization inside a Blade view?",
    "topic": "Authorization with gates and policies",
    "choices": [
      "@allow('update', $post)",
      "@if (policy('update'))",
      "@can('update', $post) ... @endcan",
      "@permission('update')"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What status does a failed authorization usually return?",
    "topic": "Authorization with gates and policies",
    "choices": [
      "200 OK",
      "401 Unauthorized",
      "403 Forbidden",
      "404 Not Found"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why use policies instead of if checks scattered through controllers?",
    "topic": "Authorization with gates and policies",
    "choices": [
      "Policies are faster than if statements",
      "Authorization rules are centralized",
      "Policies replace the database",
      "Controllers cannot contain conditions"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How can an admin be allowed to do everything?",
    "topic": "Authorization with gates and policies",
    "choices": [
      "With a before() method on the policy or a Gate::before callback",
      "By disabling the authorization system",
      "By giving the admin the database password",
      "By editing the vendor directory so that every authorization check returns true"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the difference between authentication and authorization?",
    "topic": "Authorization with gates and policies",
    "choices": [
      "Authentication is for APIs only",
      "They mean the same thing",
      "Authentication decides what you can do, authorization proves who you are",
      "Authentication proves who you are, authorization decides what you can do"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Where are policies registered in recent Laravel versions?",
    "topic": "Authorization with gates and policies",
    "choices": [
      "They must be listed in config/policies.php",
      "They are declared in routes/web.php",
      "They are read from the .env file",
      "They are auto-discovered when named after the model"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a session?",
    "topic": "Sessions",
    "choices": [
      "A single request and its response, which the server forgets once it is sent",
      "Server-side state tied to a visitor across requests, identified by a cookie",
      "A cached copy of a page",
      "A database transaction"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which session drivers does Laravel support?",
    "topic": "Sessions",
    "choices": [
      "Only the file driver, because other drivers need extra packages to be installed",
      "file, cookie, database, redis and others",
      "Only memory",
      "Only file"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Where is the session driver configured?",
    "topic": "Sessions",
    "choices": [
      "SESSION_DRIVER in .env and config/session.php",
      "app/Models",
      "resources/views",
      "routes/web.php, in the same place as the definitions of the session routes"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you store a value in the session?",
    "topic": "Sessions",
    "choices": [
      "session(['key' => 'value']);",
      "$_SESSION['key'] = 'value'; only",
      "cache()->session('key', 'value');",
      "Session::push('key')->value();"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why use the database or Redis driver in production when running multiple servers?",
    "topic": "Sessions",
    "choices": [
      "They make the session cookies smaller, which reduces the size of every request",
      "They are required by Blade",
      "All servers can read the same session data",
      "They avoid the need for HTTPS"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does session()->regenerate() do?",
    "topic": "Sessions",
    "choices": [
      "Copies the session to another user",
      "Extends the cookie lifetime",
      "Deletes the session data",
      "Creates a new session id"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does session()->flush() do?",
    "topic": "Sessions",
    "choices": [
      "Sends the session to the browser",
      "Renews the CSRF token only",
      "Saves the session to disk",
      "Removes all data from the session"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What cookie attribute stops JavaScript from reading the session cookie?",
    "topic": "Sessions",
    "choices": [
      "Domain",
      "SameSite",
      "HttpOnly",
      "Path"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the 'remember me' feature?",
    "topic": "Sessions",
    "choices": [
      "A setting that stores the user's password in the browser so it can be reused",
      "A long-lived cookie that logs a user back in after the session expires",
      "A cache of recently viewed pages",
      "A way to skip passwords entirely"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is an idle session timeout designed to reduce?",
    "topic": "Sessions",
    "choices": [
      "Risk from unattended logged-in devices",
      "The number of cookies",
      "Page load time",
      "Database size, since idle sessions are stored in the users table as extra rows"
    ],
    "answerIdx": 0
  }
]
```

LAYER: laravel-vue-5

```json
[
  {
    "stem": "What does v-if do compared with v-show?",
    "topic": "Template syntax and directives",
    "choices": [
      "v-if adds or removes the element from the DOM, while v-show only toggles its CSS display",
      "v-if runs once at startup, while v-show re-evaluates its condition on every mouse event",
      "v-if hides the element with CSS display none, while v-show removes it from the DOM entirely",
      "v-if re-renders the whole component each time, while v-show only works on top-level elements"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why does v-for need a :key binding on list items?",
    "topic": "Template syntax and directives",
    "choices": [
      "It sets the HTML id attribute that browsers use to jump to an item from the URL",
      "It lets Vue track each item's identity, so elements are reused on reorder",
      "It tells Vue how many items to render before showing a loading indicator",
      "It encrypts each item's data before it is passed to the child component"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does {{ message }} do in a Vue template?",
    "topic": "Template syntax and directives",
    "choices": [
      "Renders message as raw HTML so markup inside the string takes effect",
      "Renders the value of message as escaped text and updates when it changes",
      "Evaluates message once at mount time and never updates the output",
      "Declares a new reactive variable named message inside the template"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does v-bind:href='url' (or :href='url') do?",
    "topic": "Template syntax and directives",
    "choices": [
      "Listens for a change event on the element's href property",
      "Defines a new method named href on the component instance",
      "Binds the href attribute to the value of the url expression",
      "Creates a two-way link between the element and the url variable"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is v-html used for, and why is it risky?",
    "topic": "Template syntax and directives",
    "choices": [
      "It inserts raw HTML, which can enable cross-site scripting with untrusted content",
      "It compiles a string into a component, which can break scoped styles in child elements",
      "It loads an HTML file from the server, which can slow the first render of the page",
      "It converts Markdown to HTML, which can remove line breaks from the source text"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does v-on:click='save' (or @click='save') do?",
    "topic": "Template syntax and directives",
    "choices": [
      "Calls save once while the template is first compiled",
      "Replaces the element's default click behavior permanently",
      "Binds a variable named click to the save function",
      "Runs the save handler when the element is clicked"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why is it discouraged to use v-if and v-for on the same element?",
    "topic": "Template syntax and directives",
    "choices": [
      "Their precedence is confusing; a computed list or wrapping template is clearer",
      "The element is rendered twice in the DOM, which doubles the memory used",
      "Vue throws an error at build time whenever both directives appear together",
      "Only v-for is evaluated, so v-if is silently ignored on that element"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the v-else directive require in the template?",
    "topic": "Template syntax and directives",
    "choices": [
      "A computed property with the same name as the condition",
      "A matching v-for on the parent element above it",
      "An explicit key attribute on the element that follows it",
      "An immediately preceding sibling element with v-if or v-else-if"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the template tag with v-if do when you need to toggle several elements?",
    "topic": "Template syntax and directives",
    "choices": [
      "Renders a real template element that browsers display as an empty block",
      "Groups the elements for the condition without adding an extra wrapper to the DOM",
      "Caches the elements so they are not re-created when the condition flips",
      "Makes the inner elements render before the surrounding component finishes mounting"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does v-model on a text input do?",
    "topic": "Template syntax and directives",
    "choices": [
      "Reads the input value once when the component mounts",
      "Prevents the user from typing anything not in the variable",
      "Sends the input value to the server whenever it changes",
      "Keeps the input value and a variable in sync in both directions"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does ref(0) return in Vue 3?",
    "topic": "Reactivity with ref and reactive",
    "choices": [
      "A reactive object whose value is read and written through .value",
      "A plain number that updates the template when reassigned",
      "A copy of the number that is frozen after the component mounts",
      "A function that returns the current number each time it is called"
    ],
    "answerIdx": 0
  },
  {
    "stem": "In a template, how do you read a ref named count that was returned from setup?",
    "topic": "Reactivity with ref and reactive",
    "choices": [
      "As {{ count() }}, since refs are functions in templates",
      "As {{ count }}, since top-level refs are unwrapped in templates",
      "As {{ count.value }}, since templates never unwrap refs",
      "As {{ $count }}, using the reactive prefix from the instance"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the difference between ref and reactive?",
    "topic": "Reactivity with ref and reactive",
    "choices": [
      "ref works only with objects, while reactive works only with primitives like strings",
      "ref is evaluated lazily, while reactive is evaluated once at component creation",
      "ref values are shared across all components, while reactive objects are private to one component",
      "ref wraps any value behind .value; reactive makes an object deeply reactive"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What happens if you destructure a reactive object, such as const { count } = state?",
    "topic": "Reactivity with ref and reactive",
    "choices": [
      "Vue throws a warning and refuses to render the component",
      "The variable stays reactive and updates whenever state.count changes",
      "The extracted variable loses reactivity and will not update the template",
      "The whole state object is copied and frozen to prevent mutation"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does toRefs(state) help you do?",
    "topic": "Reactivity with ref and reactive",
    "choices": [
      "Convert every property of the object into a plain string",
      "Freeze the state object so no property can be reassigned",
      "Copy the state into session storage between page loads",
      "Destructure a reactive object and keep each property reactive"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why does Vue 3 use Proxies for reactivity?",
    "topic": "Reactivity with ref and reactive",
    "choices": [
      "They keep a second copy of the data on the server",
      "They convert objects to JSON each time a property is read",
      "They make objects immutable so changes are impossible to miss",
      "They let Vue detect added and deleted properties as well as changes"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does shallowRef do?",
    "topic": "Reactivity with ref and reactive",
    "choices": [
      "Tracks nested properties but ignores reassignment of .value",
      "Creates a ref that cannot be changed after it is first set",
      "Creates a ref that is shared by every component in the app",
      "Tracks changes to .value only, not to nested properties"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What happens when you mutate an item inside a ref array, such as list.value.push(4)?",
    "topic": "Reactivity with ref and reactive",
    "choices": [
      "Nothing updates, since arrays inside a ref are never tracked",
      "The template updates, since the array held by the ref is reactive",
      "The template updates only after a nextTick call is made",
      "Vue throws an error because arrays must be replaced entirely"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the purpose of nextTick?",
    "topic": "Reactivity with ref and reactive",
    "choices": [
      "Delaying a function by one second to avoid flicker",
      "Running code on a background thread after the page loads",
      "Waiting until Vue has applied pending DOM updates",
      "Cancelling the next reactive update that was queued"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which statement about reactive() is accurate?",
    "topic": "Reactivity with ref and reactive",
    "choices": [
      "It is deprecated in Vue 3 and replaced entirely by ref",
      "It works on objects only and returns a Proxy of the original",
      "It works on any value, including numbers and strings",
      "It returns a new copy that never affects the original object"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How does a parent pass data into a child component?",
    "topic": "Components and props",
    "choices": [
      "By calling a method on the child's instance from the parent",
      "Through props declared on the child and bound in the parent's template",
      "Through a global store that the child reads automatically",
      "By emitting an event from the parent that the child listens to"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does defineProps do in script setup?",
    "topic": "Components and props",
    "choices": [
      "Imports props from a file in the project's props folder",
      "Declares which props the component accepts, with optional types",
      "Passes the component's data to its parent",
      "Creates a ref for each prop and registers it with the router"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why shouldn't a child component mutate a prop directly?",
    "topic": "Components and props",
    "choices": [
      "Props flow one way, so mutating them hides where data changes",
      "Props are copied for each render, so the change is lost on the next tick",
      "Props are frozen by the browser, so mutation always throws an error",
      "Mutating a prop deletes it from the parent's state permanently"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you give a prop a default value in a component?",
    "topic": "Components and props",
    "choices": [
      "By declaring a computed property with the same name as the prop",
      "Using the withDefaults helper or a default in the props definition",
      "By assigning a value to the prop inside the template",
      "By adding a default attribute to the component's root element"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does a slot do in a component?",
    "topic": "Components and props",
    "choices": [
      "Reserves memory for child components before they mount",
      "Defines a CSS rule that applies to the component's children",
      "Stores a value that the parent and child share through events",
      "Lets the parent supply template content that the child renders"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What are scoped slots used for?",
    "topic": "Components and props",
    "choices": [
      "Letting the child pass data back into the parent's slot content",
      "Rendering slot content only after the parent is unmounted",
      "Applying scoped CSS to the content placed inside a slot",
      "Restricting a slot so only one parent component can fill it"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the scoped attribute on a style block do?",
    "topic": "Components and props",
    "choices": [
      "Loads the styles only after the page becomes visible",
      "Removes unused selectors from the stylesheet during development",
      "Limits the styles to the current component's elements",
      "Applies the styles to every component in the application"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the best use of provide and inject?",
    "topic": "Components and props",
    "choices": [
      "Sharing a value between two unrelated browser tabs",
      "Replacing the router for navigation between components",
      "Passing data deep down a component tree without threading props",
      "Sending events upward from a child to the nearest parent"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does a dynamic component, <component :is='view'>, do?",
    "topic": "Components and props",
    "choices": [
      "Registers the component globally for the whole application",
      "Mounts the component twice so the animation can run",
      "Renders whichever component the view value points to",
      "Creates a new component at runtime from a template string"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why define props with explicit types?",
    "topic": "Components and props",
    "choices": [
      "Vue warns about wrong types in development and the API is documented",
      "The types are required for the component to render",
      "The types stop invalid props from ever reaching the child at runtime",
      "The types make the component load faster in the browser"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How does a child component tell its parent something happened?",
    "topic": "Events and v-model",
    "choices": [
      "By calling the parent's methods using the global window object",
      "By writing to the parent's variables directly through a shared reference",
      "By changing a prop, which the parent then watches",
      "By emitting an event that the parent listens for with @event-name"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does defineEmits do in script setup?",
    "topic": "Events and v-model",
    "choices": [
      "Lists the props that the component sends to its children",
      "Creates a global event bus shared with other components",
      "Registers every DOM event listener found in the template",
      "Declares the events the component can emit, optionally with types"
    ],
    "answerIdx": 3
  },
  {
    "stem": "On a custom component, what does v-model use by default in Vue 3?",
    "topic": "Events and v-model",
    "choices": [
      "A modelValue prop and an update:modelValue event",
      "A model prop and a change event",
      "A value prop and an input event",
      "A v-model attribute stored on the root element"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the .prevent modifier do in @submit.prevent='save'?",
    "topic": "Events and v-model",
    "choices": [
      "Blocks the event from reaching child components",
      "Calls event.preventDefault() before running the handler",
      "Delays the handler until the form is validated",
      "Stops the handler from running more than once"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does v-model.trim do on an input?",
    "topic": "Events and v-model",
    "choices": [
      "Limits the input to a maximum number of characters",
      "Prevents the user from typing spaces anywhere in the text",
      "Removes leading and trailing whitespace from the bound value",
      "Converts the value to a number before assigning it"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the .lazy modifier on v-model change?",
    "topic": "Events and v-model",
    "choices": [
      "It prevents the model from updating when the field is empty",
      "It syncs on the change event instead of every input event",
      "It loads the component only when it scrolls into view",
      "It delays rendering of the input until the page is idle"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How can one component have multiple v-models in Vue 3?",
    "topic": "Events and v-model",
    "choices": [
      "By repeating the same v-model attribute on the element",
      "By wrapping the component in a template with several refs",
      "By naming each one, such as v-model:title and v-model:author",
      "It is not possible; a component can have only one v-model"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the .once modifier on an event listener do?",
    "topic": "Events and v-model",
    "choices": [
      "Prevents the event from firing again until the page is reloaded",
      "Calls the handler only when the event happens the first time on a given element type",
      "Runs the handler a single time, then removes it",
      "Waits until all other listeners have completed before running"
    ],
    "answerIdx": 2
  },
  {
    "stem": "A checkbox group uses v-model with the same array on several checkboxes. What does the array hold?",
    "topic": "Events and v-model",
    "choices": [
      "Booleans indicating the state of each checkbox",
      "The labels of the unchecked checkboxes only",
      "The values of the checkboxes that are currently checked",
      "The ids of every checkbox in the group, checked or not"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the role of $event in @input='update($event)'?",
    "topic": "Events and v-model",
    "choices": [
      "It passes the previous value of the input",
      "It passes the native event object to the handler",
      "It passes the parent component's emitted payload",
      "It passes a new event created by Vue with the input's data"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does a computed property do?",
    "topic": "Computed and watchers",
    "choices": [
      "Caches a derived value and recalculates only when its dependencies change",
      "Stores a value that can be modified directly from the template",
      "Watches a value and runs a side effect when it changes",
      "Runs a function every time the component renders, regardless of dependencies"
    ],
    "answerIdx": 0
  },
  {
    "stem": "When should you use a computed property instead of a method in a template?",
    "topic": "Computed and watchers",
    "choices": [
      "When the result depends on reactive state and benefits from caching",
      "When the function must run on every render",
      "When the logic performs an API call as soon as the component loads",
      "When you need to pass different arguments each time you call it"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which is the best use of watch?",
    "topic": "Computed and watchers",
    "choices": [
      "Registering a child component for conditional rendering",
      "Running a side effect, such as an API call, when a value changes",
      "Deriving a value from other values for display in the template",
      "Declaring a prop's type and default value"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How does watchEffect differ from watch?",
    "topic": "Computed and watchers",
    "choices": [
      "watchEffect gives you the old and new value as arguments",
      "watchEffect runs only after the first change of a single named source",
      "watchEffect runs at once and tracks every reactive value it reads",
      "watchEffect works only on computed properties, while watch works on refs"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the { immediate: true } option do for a watcher?",
    "topic": "Computed and watchers",
    "choices": [
      "Runs the callback on the server instead of in the browser",
      "Runs the callback right away, not only after the first change",
      "Makes the callback run before every other watcher in the app",
      "Stops the watcher after its first execution"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does { deep: true } do for a watcher on an object?",
    "topic": "Computed and watchers",
    "choices": [
      "Makes the watcher read the object from the previous render",
      "Stops tracking the object after its first mutation",
      "Triggers the callback when nested properties change",
      "Creates a deep copy of the object for the callback"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Should a computed property have side effects such as changing other state?",
    "topic": "Computed and watchers",
    "choices": [
      "No, it should be pure and only derive a value",
      "Yes, but only when the computed has a setter defined",
      "Yes, side effects are the main purpose of computed properties",
      "No, because Vue blocks any assignment inside computed"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does a writable computed need?",
    "topic": "Computed and watchers",
    "choices": [
      "Both a get and a set function",
      "A watcher that updates the dependency",
      "A ref returned from setup with the same name",
      "A prop that is passed down from the parent"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the callback signature of watch(source, callback)?",
    "topic": "Computed and watchers",
    "choices": [
      "callback(source)",
      "callback(oldValue, newValue)",
      "callback(newValue, oldValue)",
      "callback(event, value)"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What happens when a watcher is created inside setup?",
    "topic": "Computed and watchers",
    "choices": [
      "It keeps running after the component unmounts, which can leak memory",
      "It must be stopped manually with a returned function in every case",
      "Vue stops it automatically when the component unmounts",
      "It runs only on the server during server-side rendering"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the Composition API?",
    "topic": "Composition API",
    "choices": [
      "A router feature for combining several pages into one",
      "A replacement for templates that renders components with JavaScript only",
      "A build plugin that compiles components into web components",
      "A way to organize component logic with functions like ref and computed"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does <script setup> do?",
    "topic": "Composition API",
    "choices": [
      "Declares the component's name and registers it globally",
      "Executes the script once on the server before any component mounts",
      "A compile-time shorthand that exposes top-level bindings to the template",
      "Disables reactivity so the script runs faster"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a composable?",
    "topic": "Composition API",
    "choices": [
      "A plugin that is registered globally in the application entry file",
      "A directive that can be attached to any element",
      "A component that renders no template and only contains styles",
      "A function that uses reactivity APIs to encapsulate reusable stateful logic"
    ],
    "answerIdx": 3
  },
  {
    "stem": "By convention, how are composables named?",
    "topic": "Composition API",
    "choices": [
      "With a Vue suffix, such as counterVue",
      "With a compose prefix, such as composeCounter",
      "With a lowercase name matching the file's extension",
      "With a use prefix, such as useCounter"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which lifecycle hook runs after the component's DOM has been inserted?",
    "topic": "Composition API",
    "choices": [
      "onRendered",
      "onMounted",
      "onBeforeMount",
      "onCreated"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a good reason to extract logic into a composable?",
    "topic": "Composition API",
    "choices": [
      "Sharing the same reactive logic between several components",
      "Hiding the logic from the browser's developer tools",
      "Making the component's template render before its script runs",
      "Keeping the component's CSS separate from the markup"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does onUnmounted help you do?",
    "topic": "Composition API",
    "choices": [
      "Cleaning up timers, listeners or subscriptions on removal",
      "Reset every ref in the component to its starting value",
      "Cancel all in-flight network requests in the application",
      "Preload the next route while the component is still visible"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What should a composable that adds a window event listener do?",
    "topic": "Composition API",
    "choices": [
      "Leave the listener in place for the life of the page",
      "Add the listener again every time the component updates",
      "Store the listener on the router so it is cleaned up there",
      "Remove the listener in onUnmounted to avoid leaks"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does it mean when a composable returns refs and functions?",
    "topic": "Composition API",
    "choices": [
      "Only the functions are exposed, while the refs stay private",
      "The component loses reactivity until it calls a refresh function",
      "The refs are converted to plain values on return",
      "The calling component can use them, and reactivity is preserved"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you access the props object inside script setup without destructuring losing reactivity?",
    "topic": "Composition API",
    "choices": [
      "Use the object returned by defineProps, or toRefs",
      "Read props from the global window object",
      "Copy the props into plain variables at the top of the script",
      "Use this.$props from inside the setup function"
    ],
    "answerIdx": 0
  }
]
```

LAYER: laravel-vue-6

```json
[
  {
    "stem": "Where are API routes defined in a Laravel app?",
    "topic": "API routes and controllers",
    "choices": [
      "app/Http/Api.php, which the framework loads at boot time",
      "routes/web.php, because every route in Laravel shares one file",
      "config/api.php, as an array of path and handler pairs",
      "routes/api.php, which gets the /api prefix"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How does the api middleware group differ from web?",
    "topic": "API routes and controllers",
    "choices": [
      "It adds sessions and CSRF protection to every request automatically",
      "It forces every response to be rendered as an HTML page",
      "It disables routing so that controllers are called directly",
      "It has no session or CSRF handling"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which HTTP verb and path would create a post in a RESTful API?",
    "topic": "API routes and controllers",
    "choices": [
      "PUT /api/posts",
      "PATCH /api/posts/new",
      "GET /api/posts/create",
      "POST /api/posts"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does Route::apiResource('posts', PostController::class) omit compared with resource()?",
    "topic": "API routes and controllers",
    "choices": [
      "The store route that saves a new post",
      "The update and destroy routes that change posts",
      "The index and show routes that list or fetch posts",
      "The create and edit routes that only serve HTML forms"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which status code should a successful creation return?",
    "topic": "API routes and controllers",
    "choices": [
      "204 No Content, because nothing is returned",
      "202 Accepted, because the creation is queued",
      "200 OK, because every success uses the same code",
      "201 Created"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which status code fits a successful deletion with no body?",
    "topic": "API routes and controllers",
    "choices": [
      "201 Created",
      "202 Accepted",
      "204 No Content",
      "301 Moved Permanently"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why should API controllers return JSON rather than views?",
    "topic": "API routes and controllers",
    "choices": [
      "Clients such as Vue or mobile apps consume data",
      "Browsers refuse to display HTML from an API route",
      "Views cannot be used inside controllers in Laravel",
      "JSON responses are always cached by the framework"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the Accept: application/json request header tell Laravel?",
    "topic": "API routes and controllers",
    "choices": [
      "That the response should be compressed",
      "That the route is an API route",
      "That the request body contains JSON data",
      "That the client wants JSON"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you generate a controller for an API resource?",
    "topic": "API routes and controllers",
    "choices": [
      "php artisan make:controller PostController --api",
      "php artisan make:rest PostController",
      "php artisan make:api PostController",
      "php artisan make:controller PostController --json"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the benefit of keeping API versions in the URL (e.g. /api/v1)?",
    "topic": "API routes and controllers",
    "choices": [
      "It makes the routes load faster",
      "The URL shortens the response body",
      "Old clients keep working",
      "It removes the need for authentication"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is an API Resource class in Laravel?",
    "topic": "API resources and transformers",
    "choices": [
      "A class that transforms a model into the JSON structure you expose",
      "A middleware that signs responses",
      "A migration that creates API tokens",
      "A class that stores files uploaded by API clients and returns their public URLs"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which command creates a resource class named PostResource?",
    "topic": "API resources and transformers",
    "choices": [
      "php artisan api:resource PostResource",
      "php artisan make:json PostResource",
      "php artisan make:resource PostResource",
      "php artisan make:transformer PostResource"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which method of a resource defines the output array?",
    "topic": "API resources and transformers",
    "choices": [
      "format",
      "render",
      "toArray",
      "serialize"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why use a resource instead of returning a model directly?",
    "topic": "API resources and transformers",
    "choices": [
      "Resources make queries run faster",
      "Models cannot be converted to JSON in Laravel",
      "You control exactly which fields are exposed",
      "Returning a model throws an exception"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does PostResource::collection($posts) do?",
    "topic": "API resources and transformers",
    "choices": [
      "Sorts the posts alphabetically",
      "Wraps each post in the resource",
      "Combines all posts into a single resource",
      "Deletes the posts from the database after formatting them"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How can a resource include a relation only if it was eager loaded?",
    "topic": "API resources and transformers",
    "choices": [
      "With whenLoaded('author')",
      "With includeRelation('author')",
      "With maybe('author')",
      "With loadIfNeeded('author')"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the default wrapper key around resource data?",
    "topic": "API resources and transformers",
    "choices": [
      "payload",
      "data",
      "items",
      "result"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How can you remove the default data wrapper?",
    "topic": "API resources and transformers",
    "choices": [
      "Return the model instead",
      "Call JsonResource::withoutWrapping()",
      "Delete the resource class so that Laravel falls back to returning the model",
      "Set APP_WRAP=false in .env"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the advantage of hiding fields like password and internal ids in a resource?",
    "topic": "API resources and transformers",
    "choices": [
      "The response is guaranteed to be cached",
      "They cannot leak to API clients by accident",
      "Validation becomes unnecessary",
      "Clients can read the database directly"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How can a resource add conditional fields?",
    "topic": "API resources and transformers",
    "choices": [
      "With when($condition, $value)",
      "With a config flag in .env",
      "With the @if Blade directive",
      "With if($condition) inside the route file"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does paginate(15) return in an API controller wrapped in a resource collection?",
    "topic": "Pagination and filtering",
    "choices": [
      "A random sample of fifteen rows",
      "The items plus links",
      "Only the fifteenth item",
      "All items, split into files"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the difference between paginate and simplePaginate?",
    "topic": "Pagination and filtering",
    "choices": [
      "simplePaginate skips the total count query and only offers next and previous",
      "paginate is available only for API routes",
      "simplePaginate returns every row at once, while paginate returns only the first page",
      "They are identical"
    ],
    "answerIdx": 0
  },
  {
    "stem": "When is cursor pagination preferable?",
    "topic": "Pagination and filtering",
    "choices": [
      "When clients need to jump to page 500 directly",
      "For tiny tables with fewer than ten rows where an offset query is fast enough",
      "For large, frequently changing datasets where deep offsets are slow",
      "For tables without an id column"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How can an endpoint support ?status=published filtering?",
    "topic": "Pagination and filtering",
    "choices": [
      "Create a new route for every possible status value that clients may request",
      "Read request()->query('status') and add a where clause when present",
      "Store the filter in the session",
      "Filter the results in the browser only"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How should an API handle sorting such as ?sort=-created_at safely?",
    "topic": "Pagination and filtering",
    "choices": [
      "Pass the raw input straight into orderByRaw so that clients can sort by any expression",
      "Ignore sorting parameters entirely",
      "Map allowed sort fields from a whitelist and ignore others",
      "Sort after loading all rows into memory"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why whitelist filterable and sortable columns?",
    "topic": "Pagination and filtering",
    "choices": [
      "To skip validation of the query string",
      "To rename the columns in the database",
      "To make the JSON response smaller by dropping every column that the client did not ask for",
      "To prevent clients from querying columns they shouldn't, or causing slow or unsafe queries"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does a package like spatie/laravel-query-builder provide?",
    "topic": "Pagination and filtering",
    "choices": [
      "A convention for filtering",
      "A tool for deploying APIs",
      "A faster database driver",
      "A replacement for Eloquent"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why limit the maximum page size an API client can request?",
    "topic": "Pagination and filtering",
    "choices": [
      "To prevent heavy queries",
      "To hide the total number of rows",
      "To save disk space on the client",
      "To make the API return 201 more often"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which part of a paginated response tells the client the total number of pages?",
    "topic": "Pagination and filtering",
    "choices": [
      "The cookie",
      "The meta section, such as last_page",
      "The HTTP method used for the request, which changes for each page of results",
      "The Content-Type header"
    ],
    "answerIdx": 1
  },
  {
    "stem": "A client needs the next page of results. Which approach is typical?",
    "topic": "Pagination and filtering",
    "choices": [
      "Send a DELETE request",
      "Query the database directly",
      "Follow the next link provided in the response",
      "Re-run the previous request with a larger limit"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is Laravel Sanctum?",
    "topic": "Token auth with Sanctum",
    "choices": [
      "A full OAuth2 server with authorization codes",
      "A lightweight package for API token",
      "A package for encrypting database columns",
      "A tool for managing queues"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which trait lets a User model create personal access tokens?",
    "topic": "Token auth with Sanctum",
    "choices": [
      "SoftDeletes",
      "HasApiTokens",
      "HasFactory",
      "Notifiable"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How does a client send a Sanctum token with a request?",
    "topic": "Token auth with Sanctum",
    "choices": [
      "Authorization: Bearer <token> header",
      "A query string named token, always",
      "The request body only",
      "A cookie called sanctum_token set by JavaScript"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which middleware protects API routes with Sanctum?",
    "topic": "Token auth with Sanctum",
    "choices": [
      "token:sanctum",
      "guest:sanctum",
      "auth:sanctum",
      "verified:api"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Where are Sanctum tokens stored on the server?",
    "topic": "Token auth with Sanctum",
    "choices": [
      "In the browser's localStorage",
      "As plain text in the session file, so the server can show them to the owner again",
      "As hashed values in the personal_access_tokens table",
      "In the .env file"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a token ability (scope) in Sanctum?",
    "topic": "Token auth with Sanctum",
    "choices": [
      "The expiry date of the token",
      "A label that limits what a token is allowed to do",
      "The user's role in the database",
      "The IP address allowed to use the token"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does revoking a token do?",
    "topic": "Token auth with Sanctum",
    "choices": [
      "Changes its abilities to all",
      "Extends its lifetime by renewing the expiry date to a later point in time",
      "Creates a copy for another user",
      "Deletes it, so it can no longer authenticate"
    ],
    "answerIdx": 3
  },
  {
    "stem": "For a first-party SPA on the same top-level domain, which Sanctum mode is recommended?",
    "topic": "Token auth with Sanctum",
    "choices": [
      "Long-lived bearer tokens stored in localStorage",
      "HTTP Basic authentication on every request",
      "Cookie-based session authentication with CSRF protection",
      "No authentication"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why is storing a long-lived token in localStorage risky?",
    "topic": "Token auth with Sanctum",
    "choices": [
      "A cross-site scripting bug could let an attacker read and reuse it",
      "Tokens in localStorage cannot be sent to the server",
      "localStorage encrypts tokens with a weak key",
      "Browsers delete localStorage on every refresh"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What response should an API return for a request with an invalid token?",
    "topic": "Token auth with Sanctum",
    "choices": [
      "404 Not Found",
      "500 Internal Server Error",
      "401 Unauthorized",
      "200 OK with an error field"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is rate limiting?",
    "topic": "Rate limiting",
    "choices": [
      "Delaying the page's render",
      "Limiting the number of database tables",
      "Restricting how many requests a client may make in a period",
      "Reducing the size of responses by compressing the JSON before it is returned"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which middleware applies rate limits to routes?",
    "topic": "Rate limiting",
    "choices": [
      "throttle",
      "guard",
      "speed",
      "limit.db"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Where are named rate limiters defined in Laravel?",
    "topic": "Rate limiting",
    "choices": [
      "With RateLimiter::for() in a service provider or bootstrap code",
      "In the Blade layout",
      "In the routes file as comments, which Laravel parses when it registers the routes",
      "In the database seeders"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What status code is returned when a client exceeds the limit?",
    "topic": "Rate limiting",
    "choices": [
      "408 Request Timeout",
      "503 Service Unavailable",
      "403 Forbidden",
      "429 Too Many Requests"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which response header tells the client how long to wait before retrying?",
    "topic": "Rate limiting",
    "choices": [
      "Allow",
      "Content-Length",
      "Accept",
      "Retry-After"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why key a rate limiter by user id or token rather than only by IP address?",
    "topic": "Rate limiting",
    "choices": [
      "User ids are shorter strings",
      "Many users can share an IP",
      "Tokens never change",
      "IP addresses are not available in Laravel"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which routes deserve stricter limits?",
    "topic": "Rate limiting",
    "choices": [
      "Documentation pages",
      "Static image routes and other endpoints that only return files with no side effects",
      "The home page",
      "Login, password reset and other abuse-prone endpoints"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Where does Laravel keep rate limiter counters by default?",
    "topic": "Rate limiting",
    "choices": [
      "In the browser",
      "In the session cookie",
      "In the configured cache store",
      "In the users table"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a risk of using the file cache driver for rate limiting across multiple servers?",
    "topic": "Rate limiting",
    "choices": [
      "The limit becomes permanent",
      "Requests are blocked at the DNS level",
      "Files cannot store numbers",
      "Each server counts separately"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does a rate limit of 60 per minute mean in practice?",
    "topic": "Rate limiting",
    "choices": [
      "The server must respond within 60 milliseconds",
      "A client gets at most 60 requests in each one-minute window",
      "The database holds only 60 rows",
      "Tokens expire after 60 uses"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a good structure for an API error response?",
    "topic": "Error responses",
    "choices": [
      "An empty body for all errors",
      "A consistent JSON body with a message and field errors where relevant",
      "Plain HTML with a full stack trace so that developers can debug failures quickly",
      "A different format on every endpoint"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does Laravel return by default for validation failures on a JSON request?",
    "topic": "Error responses",
    "choices": [
      "500 with a stack trace",
      "302 redirect to the form",
      "200 OK with a body that contains the single word failed and the list of fields",
      "422 with a message and an errors object keyed by field"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How are model-not-found errors turned into 404 responses?",
    "topic": "Error responses",
    "choices": [
      "The exception handler converts ModelNotFoundException into a 404",
      "The database driver returns the HTTP status code together with the empty result set",
      "The browser decides the status",
      "The route file lists all valid ids"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why must APP_DEBUG be false in production APIs?",
    "topic": "Error responses",
    "choices": [
      "Detailed error output can leak secrets",
      "Debug mode makes responses smaller",
      "Production servers cannot run debug code",
      "Debug mode disables the database"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Where can you customize how exceptions are rendered?",
    "topic": "Error responses",
    "choices": [
      "Only in the Blade views, because the API cannot change how errors are rendered",
      "In composer.json",
      "In the migrations",
      "In the exception handling configuration (bootstrap/app.php or the handler)"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which status code fits 'you are logged in but may not do this'?",
    "topic": "Error responses",
    "choices": [
      "400 Bad Request",
      "401 Unauthorized",
      "403 Forbidden",
      "409 Conflict"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does a 409 Conflict typically indicate?",
    "topic": "Error responses",
    "choices": [
      "The user must log in",
      "The request conflicts with the current state, such as a duplicate",
      "The server is down for maintenance, so the client should retry after some time",
      "The URL does not exist"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What should an API do on an unexpected server exception?",
    "topic": "Error responses",
    "choices": [
      "Log it with context and return a generic 500 message",
      "Crash the PHP process",
      "Return 200 with an empty body",
      "Return the full stack trace to the client"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why include a machine-readable error code in error responses?",
    "topic": "Error responses",
    "choices": [
      "It replaces HTTP status codes",
      "It is required by JSON",
      "It reduces the response size, because codes are shorter than the full error messages",
      "Clients can react to specific cases without parsing message text"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How can clients and servers share one error format across endpoints?",
    "topic": "Error responses",
    "choices": [
      "By documenting it only in the README",
      "By centralizing rendering in the exception handler",
      "By copying the format into each controller",
      "By returning HTML"
    ],
    "answerIdx": 1
  }
]
```

LAYER: laravel-vue-7

```json
[
  {
    "stem": "What does axios.get('/api/posts') return?",
    "topic": "API calls with Axios",
    "choices": [
      "The parsed JSON array directly, without a promise, so the result can be used at once",
      "A callback that must be passed in as the second argument",
      "A promise that resolves with a response object whose data holds the body",
      "An observable that emits each post as it arrives"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Where is the parsed JSON body of an Axios response found?",
    "topic": "API calls with Axios",
    "choices": [
      "response.data",
      "response.result",
      "response.body",
      "response.json()"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How does Axios treat a 404 or 500 response by default?",
    "topic": "API calls with Axios",
    "choices": [
      "It rejects the promise",
      "It redirects the browser to an error page",
      "It resolves normally and marks the data as null",
      "It retries the request three times before giving up"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does axios.create({ baseURL: '/api' }) provide?",
    "topic": "API calls with Axios",
    "choices": [
      "A global change that affects all other libraries",
      "A proxy that rewrites responses from the backend",
      "A configured instance that prefixes every request with the base URL",
      "A new server that listens on the /api path and forwards requests to Laravel"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is an Axios interceptor used for?",
    "topic": "API calls with Axios",
    "choices": [
      "Blocking requests from other browser tabs",
      "Replacing the browser's fetch function in all libraries",
      "Running code on every request or response",
      "Compressing images before they are uploaded"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you send a JSON body with a POST using Axios?",
    "topic": "API calls with Axios",
    "choices": [
      "axios.post({ title: 'Hello' }, url)",
      "axios.send(url, 'POST', title)",
      "axios.post(url).body({ title: 'Hello' })",
      "axios.post(url, { title: 'Hello' })"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why set the Accept: application/json header on API calls to Laravel?",
    "topic": "API calls with Axios",
    "choices": [
      "Laravel then returns validation",
      "It tells the server which port to use",
      "It encrypts the body of the request",
      "It makes the server respond faster"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the problem with calling the API directly inside many components?",
    "topic": "API calls with Axios",
    "choices": [
      "Axios only works inside the router",
      "Components cannot use async functions",
      "The browser limits the number of components that can call APIs",
      "Duplicated URLs and error handling are hard to change"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does CORS control?",
    "topic": "API calls with Axios",
    "choices": [
      "Whether passwords are hashed before being sent",
      "How quickly the server responds to requests that come from other origins",
      "How many cookies a site may set",
      "Which other origins the browser lets read responses from your API"
    ],
    "answerIdx": 3
  },
  {
    "stem": "A Vue dev server on port 5173 calls Laravel on port 8000 and the browser blocks it. What is the likely cause?",
    "topic": "API calls with Axios",
    "choices": [
      "A missing or restrictive CORS configuration on the Laravel side",
      "An out-of-date Composer lock file",
      "A syntax error in a Vue template that stops the request from being built",
      "The database is not running"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is Pinia?",
    "topic": "State management with Pinia",
    "choices": [
      "A CSS framework with utility classes",
      "The official state management library for Vue",
      "A build tool for bundling Vue apps",
      "A routing library for single-page apps"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does defineStore('posts', ...) return?",
    "topic": "State management with Pinia",
    "choices": [
      "A composable such as usePostsStore that gives access to the store",
      "A route definition for the posts page",
      "The store instance itself, created immediately as a singleton",
      "A Vue component that renders the posts"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which part of a store holds reactive data?",
    "topic": "State management with Pinia",
    "choices": [
      "getters",
      "plugins",
      "actions",
      "state"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Where should async API calls normally live in a Pinia store?",
    "topic": "State management with Pinia",
    "choices": [
      "In the router configuration",
      "In actions",
      "In the template, inside expressions",
      "In getters, because they return values"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What do getters in a store resemble?",
    "topic": "State management with Pinia",
    "choices": [
      "Computed properties derived from state",
      "Route guards run before navigation",
      "Methods that mutate the state directly",
      "Event listeners attached to the window"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you keep destructured state reactive from a store?",
    "topic": "State management with Pinia",
    "choices": [
      "Spread the store into plain variables",
      "Convert it with JSON.stringify",
      "Use storeToRefs(store)",
      "Wrap each value in setTimeout"
    ],
    "answerIdx": 2
  },
  {
    "stem": "When is a store a better fit than component state?",
    "topic": "State management with Pinia",
    "choices": [
      "When only a single component reads a value that never has to be shared",
      "When the value is a constant",
      "When the value never changes",
      "When several components need to share and update the same data"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why avoid putting every piece of data in a global store?",
    "topic": "State management with Pinia",
    "choices": [
      "Local state is simpler",
      "Pinia stores can hold only five values",
      "Global stores slow down the browser by default",
      "Stores cannot hold arrays"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What happens to Pinia state when the user reloads the page?",
    "topic": "State management with Pinia",
    "choices": [
      "It's saved to the server automatically",
      "It resets unless you persist it",
      "It's restored from the router",
      "It's kept in Laravel's session"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a typical store for an authenticated app?",
    "topic": "State management with Pinia",
    "choices": [
      "A store that holds the CSS classes",
      "A store that compiles templates",
      "A store for server routes",
      "An auth store that holds the user"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does Vue Router do in a single-page app?",
    "topic": "Vue Router",
    "choices": [
      "Compiles Vue templates into JavaScript",
      "Stores the global state of the app",
      "Maps URLs to components",
      "Fetches data from the server for every component"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which component renders the matched route's component?",
    "topic": "Vue Router",
    "choices": [
      "<RouterLink />",
      "<Teleport />",
      "<RouterView />",
      "<KeepAlive />"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why use <RouterLink> instead of a plain <a>?",
    "topic": "Vue Router",
    "choices": [
      "It navigates on the client",
      "It automatically fetches the data for the page",
      "It converts the link into a button",
      "It prevents the link from being indexed"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you define a route with a dynamic id?",
    "topic": "Vue Router",
    "choices": [
      "{ path: '/posts/{id}', component: Post }",
      "{ path: '/posts/:id', component: Post }",
      "{ path: '/posts/<id>', component: Post }",
      "{ path: '/posts/[id]', component: Post }"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you read the id inside the component?",
    "topic": "Vue Router",
    "choices": [
      "this.$id",
      "useRoute().params.id",
      "window.params.id",
      "useRouter().id"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does router.push('/login') do?",
    "topic": "Vue Router",
    "choices": [
      "Navigates to the login route programmatically",
      "Adds a Laravel route",
      "Sends a POST request to /login with the stored credentials of the user",
      "Reloads the browser"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the difference between history mode and hash mode?",
    "topic": "Vue Router",
    "choices": [
      "History mode uses clean URLs",
      "Hash mode requires server rendering",
      "History mode uses #, and hash mode uses clean URLs",
      "They are identical"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why does a direct visit to /posts/5 in history mode need a server fallback?",
    "topic": "Vue Router",
    "choices": [
      "Browsers refuse to load nested paths",
      "Vue Router stops working on refresh otherwise by design",
      "The server must return index.html",
      "The server must delete the route"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which hook lets you run code before every navigation?",
    "topic": "Vue Router",
    "choices": [
      "onRoute",
      "router.beforeEach",
      "router.afterAll",
      "router.start"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is lazy loading a route component?",
    "topic": "Vue Router",
    "choices": [
      "Rendering the route on the server",
      "Loading all components at the same time as the app",
      "Using a dynamic import",
      "Deleting the component after use"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Where are API tokens often kept in a Vue SPA?",
    "topic": "Handling auth tokens",
    "choices": [
      "In the URL path",
      "In a CSS file",
      "In the page title, where every component can read it from document.title",
      "In memory or an HTTP-only cookie, depending on the security model"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a risk of storing a token in localStorage?",
    "topic": "Handling auth tokens",
    "choices": [
      "Browsers wipe localStorage on tab switch",
      "Tokens in localStorage cannot be sent to the server",
      "JavaScript from an XSS attack can read it",
      "It makes requests slower"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How can an Axios interceptor help with tokens?",
    "topic": "Handling auth tokens",
    "choices": [
      "It can store tokens in the database",
      "It can attach the Authorization header to every request",
      "It can bypass CORS",
      "It can generate brand new tokens inside the browser without asking the server"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What should the client do when the API returns 401?",
    "topic": "Handling auth tokens",
    "choices": [
      "Retry the same request forever",
      "Ignore the error",
      "Delete the user's account",
      "Clear the stored auth state"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a refresh token flow?",
    "topic": "Handling auth tokens",
    "choices": [
      "Using a longer-lived token to obtain new short-lived access tokens",
      "Copying the password to the cookie",
      "Reloading the page every minute so that the session never reaches its end",
      "Regenerating the CSRF token only"
    ],
    "answerIdx": 0
  },
  {
    "stem": "For a first-party SPA served from the same site, what does Sanctum's cookie mode avoid?",
    "topic": "Handling auth tokens",
    "choices": [
      "Using routes",
      "Using the database",
      "Storing bearer tokens in JavaScript-accessible storage",
      "Using HTTPS, which cookie-based authentication cannot work together with"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Before logging in with Sanctum cookie authentication, what must the SPA request?",
    "topic": "Handling auth tokens",
    "choices": [
      "The user's password hash, which the server needs to start the session",
      "A random port number",
      "/sanctum/csrf-cookie to receive the CSRF cookie",
      "The database schema"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why send credentials: true (withCredentials) in Axios for cookie auth?",
    "topic": "Handling auth tokens",
    "choices": [
      "So requests are cached",
      "So passwords are hashed in the browser before they are sent to the server",
      "So responses are compressed",
      "So the browser includes cookies on cross-origin requests"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What should happen to client state on logout?",
    "topic": "Handling auth tokens",
    "choices": [
      "Clear the user and token",
      "Delete the Laravel session folder from the browser",
      "Only hide the user's name",
      "Reload the page without clearing anything"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why not decode and trust a JWT's role on the client for authorization?",
    "topic": "Handling auth tokens",
    "choices": [
      "JWTs cannot hold roles",
      "Decoding takes too long",
      "Browsers reject JWTs",
      "Clients can alter it"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which states should a data-fetching component represent?",
    "topic": "Loading and error states",
    "choices": [
      "Only loading",
      "Loading, success and error",
      "Only the success state, because failures are handled by the browser itself",
      "Only error"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why show a loading indicator?",
    "topic": "Loading and error states",
    "choices": [
      "It speeds up the request by telling the server to prioritize this client",
      "It tells users the app is working and avoids confusion",
      "It reduces server load",
      "It is required by Axios"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a good way to show a failed request?",
    "topic": "Loading and error states",
    "choices": [
      "A console log only",
      "An infinite spinner",
      "A blank screen, so that users are not distracted by technical details",
      "A clear message with a retry option"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How can you avoid a flash of empty content on fast connections?",
    "topic": "Loading and error states",
    "choices": [
      "Remove all loading states",
      "Block rendering until the user clicks",
      "Delay showing the spinner slightly",
      "Fetch data twice"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Where should the loading flag normally be set to false?",
    "topic": "Loading and error states",
    "choices": [
      "Before the request starts",
      "In a finally block, after success or failure",
      "Only in the success branch, because errors keep the indicator on screen",
      "Only in the error branch"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a skeleton screen?",
    "topic": "Loading and error states",
    "choices": [
      "A server-rendered page",
      "A page with only a header and a footer that is shown when data is missing",
      "A placeholder layout that resembles the final content while data loads",
      "An error page"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How can you cancel an in-flight request when a component unmounts?",
    "topic": "Loading and error states",
    "choices": [
      "With an AbortController signal passed to Axios",
      "By calling window.stop only",
      "By deleting the component file so the pending request is never created",
      "It cannot be cancelled"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What problem can race conditions cause in search-as-you-type?",
    "topic": "Loading and error states",
    "choices": [
      "The browser blocks typing",
      "The router loses its history",
      "An older, slower response can overwrite a newer one",
      "The server crashes when two requests arrive within the same few milliseconds"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does debouncing a search input do?",
    "topic": "Loading and error states",
    "choices": [
      "Sends a request for every single key press, so results are always up to date",
      "Caches every key",
      "Waits until the user pauses typing before sending a request",
      "Disables the input"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How should validation errors (422) from Laravel be shown?",
    "topic": "Loading and error states",
    "choices": [
      "Show the raw JSON of the response in an alert so developers can read it",
      "Map the errors object to the matching form fields",
      "Ignore them and retry",
      "Redirect to the home page"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a route guard?",
    "topic": "Protected client routes",
    "choices": [
      "A database constraint",
      "A function that can allow, redirect or block navigation to a route",
      "A CSS rule that decides which routes are visible to the user's browser",
      "A server firewall"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you mark a route as requiring login?",
    "topic": "Protected client routes",
    "choices": [
      "Add a password to the URL",
      "Rename the route to private",
      "Place the route in a separate file only",
      "Add meta: { requiresAuth: true }"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What should a guard do for an unauthenticated user visiting /dashboard?",
    "topic": "Protected client routes",
    "choices": [
      "Redirect to /login, keeping the intended destination",
      "Log in as a guest admin",
      "Delete the dashboard route",
      "Show the dashboard anyway and hide the data inside it after a short delay"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How can you send the user back after login?",
    "topic": "Protected client routes",
    "choices": [
      "Clear the history",
      "Reload the page",
      "Always send them to the home page, since the original path is no longer known",
      "Pass the original path in a query parameter such as redirect"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why must the server still enforce authorization on protected data?",
    "topic": "Protected client routes",
    "choices": [
      "Routes cannot be protected on the client",
      "Client-side guards can be bypassed by calling the API directly",
      "Browsers disable guards in production",
      "Guards are checked by Laravel itself, so the API cannot be called without them"
    ],
    "answerIdx": 1
  },
  {
    "stem": "When should the app fetch the current user so guards have data?",
    "topic": "Protected client routes",
    "choices": [
      "After the user clicks logout, since only then is the account state needed",
      "Before the first navigation is resolved, for example during app start",
      "Only on the server",
      "Never"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does router.beforeEach return to cancel a navigation?",
    "topic": "Protected client routes",
    "choices": [
      "null",
      "undefined",
      "true",
      "false"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you protect a group of routes under /admin?",
    "topic": "Protected client routes",
    "choices": [
      "Use a parent route with meta or a guard that child routes inherit",
      "Add a guard to every child route by hand, since parent routes cannot be guarded",
      "Hide the links",
      "Rename the folder"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What should the UI show a logged-in user without permission for a page?",
    "topic": "Protected client routes",
    "choices": [
      "A blank page",
      "A 403-style message or redirect with an explanation",
      "A 500 error",
      "The page's content anyway, with the restricted buttons greyed out by the client"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do guards interact with a token expiring while the user is on a page?",
    "topic": "Protected client routes",
    "choices": [
      "The page automatically refreshes the token",
      "The browser logs the user out",
      "Nothing can happen until a reload",
      "API calls return 401"
    ],
    "answerIdx": 3
  }
]
```

LAYER: laravel-vue-8

```json
[
  {
    "stem": "Why use queues in a web application?",
    "topic": "Queues and workers",
    "choices": [
      "To compile templates ahead of time for every route",
      "To keep a log of all requests the server has ever handled",
      "To move slow work out of the request",
      "To store user sessions in a faster database table"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does a queue worker do?",
    "topic": "Queues and workers",
    "choices": [
      "Rotates the log files when they reach a size limit",
      "Runs as a separate process that picks up queued jobs",
      "Rebuilds the frontend assets each time a file changes",
      "Serves the application's pages to browsers over HTTP"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which command starts a worker that processes jobs?",
    "topic": "Queues and workers",
    "choices": [
      "php artisan queue:listen --force, which also restarts the web server for you",
      "php artisan queue:work",
      "php artisan queue:listen --once-only-never",
      "php artisan worker:start"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which queue drivers does Laravel support out of the box?",
    "topic": "Queues and workers",
    "choices": [
      "Only the database driver",
      "Only Redis",
      "Only the sync driver, because every other driver needs a separate package",
      "sync, database, Redis, SQS, Beanstalkd and others"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the sync driver do?",
    "topic": "Queues and workers",
    "choices": [
      "Disables the queue entirely",
      "Runs the job immediately within the current request",
      "Sends the job to a remote server where it is executed on a dedicated worker",
      "Stores the job in a file for later"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why use Redis as a queue backend instead of the database driver in busy apps?",
    "topic": "Queues and workers",
    "choices": [
      "It removes the need for workers",
      "It handles high job throughput with lower overhead",
      "It encrypts each job automatically",
      "It stores jobs permanently without any limit"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What happens to queued jobs when the worker is not running?",
    "topic": "Queues and workers",
    "choices": [
      "They are deleted after one minute",
      "They run in the browser",
      "They are executed by the web server during the next incoming HTTP request",
      "They wait in the queue until a worker starts"
    ],
    "answerIdx": 3
  },
  {
    "stem": "After you deploy new code, what should you do with long-running queue workers?",
    "topic": "Queues and workers",
    "choices": [
      "Delete the queue table",
      "Nothing, since workers reload every file on each job",
      "Run migrations again",
      "Restart them, because they keep the old code in memory"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What keeps a queue worker running on a production server?",
    "topic": "Queues and workers",
    "choices": [
      "The browser tab that started it",
      "Composer",
      "A process monitor such as Supervisor",
      "The cron schedule alone"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the purpose of named queues, like high and default?",
    "topic": "Queues and workers",
    "choices": [
      "Splitting the database into tables",
      "Choosing the HTTP method of jobs",
      "Letting workers process important jobs first",
      "Giving each job a unique password so that only the right worker can run it"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you create a job class?",
    "topic": "Jobs and dispatching",
    "choices": [
      "php artisan make:job SendWelcomeEmail",
      "composer require job SendWelcomeEmail",
      "php artisan make:task SendWelcomeEmail",
      "php artisan queue:create SendWelcomeEmail"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which method of a job contains the work to be done?",
    "topic": "Jobs and dispatching",
    "choices": [
      "execute",
      "handle",
      "run",
      "process"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you dispatch a job to the queue?",
    "topic": "Jobs and dispatching",
    "choices": [
      "new SendWelcomeEmail($user)->run();",
      "SendWelcomeEmail::dispatch($user);",
      "Job::send(SendWelcomeEmail::class);",
      "queue(SendWelcomeEmail, $user);"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which interface makes a job run on the queue rather than immediately?",
    "topic": "Jobs and dispatching",
    "choices": [
      "Runnable",
      "Dispatchable",
      "Queueable",
      "ShouldQueue"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why pass a model's id or a model with SerializesModels rather than a large object?",
    "topic": "Jobs and dispatching",
    "choices": [
      "Models cannot be serialized in PHP",
      "It makes the job run before the request",
      "Queues can store only integers, so models always have to be converted by hand",
      "Only the identifier is stored in the queue and the model is reloaded when the job runs"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does $tries control on a job?",
    "topic": "Jobs and dispatching",
    "choices": [
      "How many users the job affects",
      "How many seconds the job may run",
      "How many times a failing job is attempted before it is marked failed",
      "How many workers can run the job at the same time on one server"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does a job's backoff setting do?",
    "topic": "Jobs and dispatching",
    "choices": [
      "Waits between retry attempts",
      "Removes the job from the queue",
      "Speeds up the job on later attempts",
      "Increases the number of workers"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does delay() do when dispatching a job?",
    "topic": "Jobs and dispatching",
    "choices": [
      "Cancels the job after the delay",
      "Postpones when the job becomes available to workers",
      "Waits in the web request until the job finishes",
      "Slows the worker down permanently"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is job chaining?",
    "topic": "Jobs and dispatching",
    "choices": [
      "Combining several jobs into a single database row",
      "Sending the same job to many queues",
      "Running jobs in parallel on every worker",
      "Running jobs one after another"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why should jobs be idempotent when possible?",
    "topic": "Jobs and dispatching",
    "choices": [
      "Idempotent jobs run faster because Laravel skips the queue for them entirely",
      "Idempotent jobs don't need workers",
      "Laravel only accepts idempotent jobs",
      "Retries or duplicates then don't cause repeated side effects"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does Laravel's task scheduler replace?",
    "topic": "Scheduling tasks",
    "choices": [
      "Many separate cron entries with a single one that runs schedule:run",
      "Database migrations",
      "The need for queue workers, since scheduled tasks can run the jobs directly",
      "The web server's configuration"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which cron entry is needed to drive the scheduler?",
    "topic": "Scheduling tasks",
    "choices": [
      "A job that runs php artisan queue:work every hour",
      "A job that restarts the web server daily",
      "No cron entry; the scheduler runs itself",
      "A job that runs php artisan schedule:run every minute"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Where are scheduled tasks defined in recent Laravel versions?",
    "topic": "Scheduling tasks",
    "choices": [
      "routes/console.php (or the Schedule definition in bootstrap)",
      "resources/views",
      "config/schedule.json",
      "routes/web.php, next to the routes that handle browser requests for pages"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you schedule an Artisan command to run daily?",
    "topic": "Scheduling tasks",
    "choices": [
      "cron('reports:send', 'daily');",
      "Task::daily('reports:send');",
      "Schedule::command('reports:send')->daily();",
      "Schedule::run('reports:send')->each('day');"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does ->withoutOverlapping() do?",
    "topic": "Scheduling tasks",
    "choices": [
      "Runs the task twice at the same time so that no scheduled run is ever missed",
      "Deletes the previous run's output",
      "Moves the task to another server",
      "Skips a run if the previous run of the same task is still going"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does ->onOneServer() help with?",
    "topic": "Scheduling tasks",
    "choices": [
      "Running a task on every server at once so that all of the copies stay equal",
      "Moving the task to the database",
      "Hiding the task from logs",
      "Running a task on only one server when the app runs on several"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How can you check what the scheduler will run?",
    "topic": "Scheduling tasks",
    "choices": [
      "php artisan queue:schedule",
      "php artisan list:tasks",
      "php artisan schedule:list",
      "php artisan cron:show"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why avoid long-running work directly in a scheduled closure?",
    "topic": "Scheduling tasks",
    "choices": [
      "It can block later tasks",
      "Closures cannot run PHP code",
      "It makes cron stop running",
      "The scheduler forbids loops"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which timezone issue can affect scheduled tasks?",
    "topic": "Scheduling tasks",
    "choices": [
      "Timezones are ignored by cron entirely",
      "Tasks run in the user's browser timezone",
      "Tasks only run in UTC no matter what",
      "The scheduler uses the app's timezone"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does ->runInBackground() do?",
    "topic": "Scheduling tasks",
    "choices": [
      "Lets a command run without blocking other scheduled tasks",
      "Runs the task in the user's browser once the page has finished its loading",
      "Hides the command output from the logs",
      "Disables the scheduler"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a Mailable?",
    "topic": "Mailables and notifications",
    "choices": [
      "A class that represents an email message",
      "A route for incoming mail",
      "A middleware that signs emails",
      "A queue driver for mail that stores the messages in the database for delivery"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you send a mailable to a user?",
    "topic": "Mailables and notifications",
    "choices": [
      "$user->email(WelcomeMail::class);",
      "Mailer::deliver(new WelcomeMail($user));",
      "Mail::to($user)->send(new WelcomeMail($user));",
      "Mail::send($user, WelcomeMail::class);"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you send a mail through the queue without blocking the request?",
    "topic": "Mailables and notifications",
    "choices": [
      "Mail::sync($user);",
      "Mail::to($user)->queue(new WelcomeMail($user));",
      "Mail::to($user)->later(), which runs the delivery in the web request after the response",
      "Mail::background($user);"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which driver is useful for local development so no real email is sent?",
    "topic": "Mailables and notifications",
    "choices": [
      "array, since it delivers to inboxes",
      "sendmail to real addresses",
      "log, or a catcher service such as Mailpit",
      "smtp with production credentials"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a Notification in Laravel?",
    "topic": "Mailables and notifications",
    "choices": [
      "A log entry written by the framework",
      "A type of middleware",
      "A message sent through one or more channels such as mail, database or Slack",
      "A browser pop-up shown by JavaScript whenever the server sends a new message"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you send a notification to a user?",
    "topic": "Mailables and notifications",
    "choices": [
      "Notification::broadcast($user);",
      "$user->notify(new InvoicePaid($invoice));",
      "$user->message(new InvoicePaid());",
      "notify($invoice)->toUser();"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which trait must the User model use to receive notifications?",
    "topic": "Mailables and notifications",
    "choices": [
      "SoftDeletes",
      "Notifiable",
      "Queueable",
      "HasApiTokens"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the benefit of the database notification channel?",
    "topic": "Mailables and notifications",
    "choices": [
      "Notifications are sent faster than email because they skip the queue completely",
      "It sends push messages to phones",
      "Notifications can be shown inside the app and marked as read",
      "It removes the need for a user model"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why queue notifications and emails?",
    "topic": "Mailables and notifications",
    "choices": [
      "Sending relies on external services that can be slow or fail",
      "They must be sent from the browser",
      "Queued mail is never delivered",
      "They are required to be encrypted before they can leave the application server"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How can you preview a mailable during development?",
    "topic": "Mailables and notifications",
    "choices": [
      "Use curl against the database",
      "Read the vendor directory",
      "Send it to production users",
      "Return it from a route"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is an event in Laravel?",
    "topic": "Events and listeners",
    "choices": [
      "A signal that something happened, which listeners can react to",
      "A scheduled task that Laravel runs at a fixed time every day by itself",
      "A Blade directive",
      "A database migration"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a listener?",
    "topic": "Events and listeners",
    "choices": [
      "A validation rule",
      "A class that handles an event when it is dispatched",
      "A scheduled closure",
      "A route handler for incoming requests that matches a URL to a controller method"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you dispatch an event?",
    "topic": "Events and listeners",
    "choices": [
      "Listener::run(OrderShipped);",
      "trigger(OrderShipped, $order);",
      "OrderShipped::dispatch($order);",
      "event.fire(OrderShipped);"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How are listeners connected to events in recent Laravel versions?",
    "topic": "Events and listeners",
    "choices": [
      "Only through a hand-written array in config/events.php",
      "By naming files in the routes folder",
      "By decorating the controller",
      "They are auto-discovered from type-hints in the handle method"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How can a listener run in the background?",
    "topic": "Events and listeners",
    "choices": [
      "Implement ShouldQueue on the listener",
      "Return false from handle so that Laravel moves the listener to the background",
      "Add a sleep call",
      "Wrap it in a try/catch"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why use events instead of putting all side effects in one controller method?",
    "topic": "Events and listeners",
    "choices": [
      "Events run faster than normal code because they skip the request lifecycle",
      "Events replace the need for tests",
      "Controllers cannot send emails",
      "Decoupling lets you add or remove reactions without editing the core code"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is an observer for Eloquent models?",
    "topic": "Events and listeners",
    "choices": [
      "A trait for soft deletes",
      "A class that reacts to model events such as created or updated",
      "A package for monitoring server health that reports CPU use and memory",
      "A type of database index"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a risk of overusing events?",
    "topic": "Events and listeners",
    "choices": [
      "Flow becomes hard to follow",
      "Events can only run once",
      "Events block HTTP requests forever",
      "Events increase the database size"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which Laravel feature broadcasts events to the browser in real time?",
    "topic": "Events and listeners",
    "choices": [
      "The query builder",
      "Route model binding",
      "Blade components, which push updated markup to every open browser tab",
      "Event broadcasting with channels (for example Reverb or Pusher)"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What should a listener do if it can fail independently?",
    "topic": "Events and listeners",
    "choices": [
      "Be queued and retried, so the main request doesn't fail",
      "Throw the error back to the user so that they can submit the form again",
      "Be copied into the controller so that the failure is handled in one place",
      "Run only during scheduled maintenance windows, outside the request cycle"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Where do jobs go when they exhaust all retries?",
    "topic": "Failed job handling",
    "choices": [
      "They are emailed to the user",
      "They return to the front of the queue forever",
      "The failed_jobs table",
      "They are deleted silently"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which command retries failed jobs?",
    "topic": "Failed job handling",
    "choices": [
      "php artisan failed:reset",
      "php artisan queue:retry all",
      "php artisan queue:fix",
      "php artisan jobs:repeat"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you see failed jobs?",
    "topic": "Failed job handling",
    "choices": [
      "php artisan failed:show",
      "php artisan queue:history",
      "php artisan queue:failed",
      "php artisan job:errors"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the failed() method on a job allow?",
    "topic": "Failed job handling",
    "choices": [
      "Changing the queue driver",
      "Skipping retries entirely and marking the job as processed with no further work",
      "Running cleanup or alerts when the job finally fails",
      "Marking the job as successful"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why include a timeout on jobs?",
    "topic": "Failed job handling",
    "choices": [
      "A stuck job shouldn't block a worker indefinitely",
      "It encrypts the job",
      "It makes jobs run twice as fast by giving each worker a higher priority",
      "It reduces the table size"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does queue:work --tries=3 do?",
    "topic": "Failed job handling",
    "choices": [
      "Attempts each job up to three times before failing it",
      "Starts three workers that each process the queue with their own retry limits",
      "Limits the queue to three jobs",
      "Retries failed jobs three days later"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which tool provides a dashboard for Redis queues in Laravel?",
    "topic": "Failed job handling",
    "choices": [
      "Dusk",
      "Horizon",
      "Telescope only",
      "Pint"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a sensible practice for permanently failing jobs?",
    "topic": "Failed job handling",
    "choices": [
      "Alert someone and investigate the cause before retrying",
      "Delete them without looking, since failed jobs are never worth investigating",
      "Ignore the table",
      "Retry forever with no limit"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What problem can unbounded retries cause?",
    "topic": "Failed job handling",
    "choices": [
      "Workers crash on startup",
      "A broken job can repeat endlessly and overload services",
      "The queue table disappears",
      "Jobs run faster than expected because failed attempts are skipped by workers"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why log context (ids, payload summary) when a job fails?",
    "topic": "Failed job handling",
    "choices": [
      "It is required by Redis",
      "It hides the failure from users",
      "It makes the cause easier to diagnose later",
      "It speeds up the next attempt by caching the payload inside the worker"
    ],
    "answerIdx": 2
  }
]
```

LAYER: laravel-vue-9

```json
[
  {
    "stem": "What is the N+1 query problem?",
    "topic": "Eager loading and N plus one",
    "choices": [
      "A query that joins N tables into a single result set",
      "One query loads every table in the database before the page renders",
      "A query that runs N times because the cache was cleared N times",
      "One query loads a list"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which Eloquent method prevents N+1 by loading relations up front?",
    "topic": "Eager loading and N plus one",
    "choices": [
      "preload()->author",
      "lazy('author')",
      "join('author')",
      "with('author')"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does Model::preventLazyLoading() do in development?",
    "topic": "Eager loading and N plus one",
    "choices": [
      "Disables relations completely in production",
      "Caches all relations forever",
      "Throws when a relation is lazy loaded",
      "Loads every relation automatically"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does load() do on an existing model or collection?",
    "topic": "Eager loading and N plus one",
    "choices": [
      "Loads the pending migrations for the model before the next query is run",
      "Eager loads relations after the model has been retrieved",
      "Reloads the model from disk",
      "Deletes unused relations"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How can you eager load only some columns of a relation?",
    "topic": "Eager loading and N plus one",
    "choices": [
      "with(['author' => 'id,name'])",
      "with('author:id,name')",
      "with('author')->only('id', 'name')",
      "with('author.select(id,name)')"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does withCount('comments') add to each post?",
    "topic": "Eager loading and N plus one",
    "choices": [
      "The full comments array for each post, loaded through an extra query per post",
      "A foreign key column",
      "A comments_count attribute without loading the comments",
      "A cache entry for comments"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why is loading 10,000 rows into memory with get() risky?",
    "topic": "Eager loading and N plus one",
    "choices": [
      "Laravel refuses to load more than 1,000 rows",
      "It can exhaust memory",
      "It deletes the loaded rows",
      "It locks the table for every other user"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does chunk(500, fn) do?",
    "topic": "Eager loading and N plus one",
    "choices": [
      "Runs 500 queries in parallel",
      "Processes records in batches of 500 to limit memory use",
      "Splits a table into 500 partitions that the database stores on separate disks",
      "Limits the table to 500 rows"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which tool shows the number of queries per request during development?",
    "topic": "Eager loading and N plus one",
    "choices": [
      "Laravel Debugbar or Telescope",
      "Pint",
      "Blade",
      "Composer, which lists the number of queries that each request has executed"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does DB::listen allow?",
    "topic": "Eager loading and N plus one",
    "choices": [
      "Logging each executed query for inspection",
      "Subscribing to queue events only",
      "Opening a websocket",
      "Listening for incoming HTTP requests"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is Redis often used for in Laravel?",
    "topic": "Caching with Redis",
    "choices": [
      "Storing compiled Blade templates so that views are rendered without any PHP",
      "Compiling frontend assets",
      "Cache, queues and sessions in memory",
      "Managing Composer packages"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you cache the result of an expensive query for ten minutes?",
    "topic": "Caching with Redis",
    "choices": [
      "Cache::remember('key', 600, fn () => ...)",
      "Cache::put('key')->minutes(10)->query()",
      "cache('key')->ttl('10m')",
      "Cache::forever('key', 10)"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does Cache::remember do?",
    "topic": "Caching with Redis",
    "choices": [
      "Deletes the oldest key",
      "Stores values only in the browser",
      "Always recomputes and overwrites the cache",
      "Returns the cached value"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is cache invalidation?",
    "topic": "Caching with Redis",
    "choices": [
      "Encrypting cached data so that old entries cannot be read after a change",
      "Moving the cache to a new server",
      "Compressing the cache",
      "Removing or updating cached data when the source data changes"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why can caching a response for a logged-in user under a shared key be a bug?",
    "topic": "Caching with Redis",
    "choices": [
      "The cache stores only anonymous data, so a shared key is always the safe choice",
      "Another user may receive the first user's data",
      "Keys cannot contain user ids",
      "Cached data is automatically deleted"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does php artisan optimize do in production?",
    "topic": "Caching with Redis",
    "choices": [
      "Defragments the database",
      "Optimizes images in the public folder",
      "Caches config, routes and other framework files for faster boot",
      "Rewrites the application code so that it runs faster on the production server"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a cache tag useful for?",
    "topic": "Caching with Redis",
    "choices": [
      "Encrypting keys",
      "Changing the cache driver",
      "Naming cache files on disk so that each tag has its own readable file name",
      "Clearing a related group of cached items together"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a cache stampede?",
    "topic": "Caching with Redis",
    "choices": [
      "Keys are overwritten by mistake",
      "The cache grows too large and the server begins evicting random keys at once",
      "The cache driver crashes",
      "Many requests recompute the same expired value at once"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which Laravel feature helps prevent a stampede for a hot key?",
    "topic": "Caching with Redis",
    "choices": [
      "View caching",
      "Atomic locks with Cache::lock",
      "Config caching",
      "Route caching, which stores the compiled route list for faster application boot"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How should you decide a cache lifetime?",
    "topic": "Caching with Redis",
    "choices": [
      "Always one second",
      "Randomly",
      "Always the maximum lifetime that the driver allows, so values never need a refresh",
      "Based on how stale the data can safely be"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a service class in a Laravel app?",
    "topic": "Service classes and repositories",
    "choices": [
      "A database migration",
      "A class that renders views and returns the finished HTML to the controller",
      "A plain class that holds business logic outside controllers",
      "A class that holds routes"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why keep controllers thin?",
    "topic": "Service classes and repositories",
    "choices": [
      "Because PHP limits controller size",
      "Because controllers cannot call services",
      "To reduce route count",
      "So logic can be reused"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the repository pattern?",
    "topic": "Service classes and repositories",
    "choices": [
      "An abstraction over data access",
      "A pattern for storing files in Git",
      "A way to render pages",
      "A form of caching"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a downside of wrapping Eloquent in repositories for simple apps?",
    "topic": "Service classes and repositories",
    "choices": [
      "Extra layers and boilerplate with little benefit",
      "Eloquent stops working once a repository wraps it, so queries need raw SQL",
      "Migrations fail",
      "Queries become slower by default"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do services usually get their dependencies in Laravel?",
    "topic": "Service classes and repositories",
    "choices": [
      "By static properties",
      "By reading the .env file",
      "By calling global helper functions only, because constructors cannot take classes",
      "Through constructor injection resolved by the service container"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does binding an interface to an implementation in the container allow?",
    "topic": "Service classes and repositories",
    "choices": [
      "Swapping implementations without changing the code that depends on the interface",
      "Encrypting method calls",
      "Hiding classes from Composer",
      "Making classes load faster because Composer no longer has to scan the namespace"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a single-responsibility class?",
    "topic": "Service classes and repositories",
    "choices": [
      "A class that holds all logic",
      "A class with only one method call",
      "A class with one clear reason to change",
      "A class that cannot be tested"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which approach makes business logic easiest to test?",
    "topic": "Service classes and repositories",
    "choices": [
      "Put it in routes",
      "Put it in plain classes that don't depend on HTTP or views",
      "Put it in Blade templates, so the logic runs next to the markup that shows it",
      "Put it in migrations"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is an action class (like CreateOrder)?",
    "topic": "Service classes and repositories",
    "choices": [
      "A small class that performs one use case",
      "A route group that applies the same prefix and middleware to many controllers",
      "A type of middleware",
      "A database table"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does dependency inversion suggest?",
    "topic": "Service classes and repositories",
    "choices": [
      "Depend on the framework version",
      "Depend on abstractions rather than concrete classes",
      "Depend on the database schema",
      "Depend on global state so that every class can reach the same shared variables"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does a database index do?",
    "topic": "Database indexing",
    "choices": [
      "Copies a table",
      "Encrypts a column so that its values cannot be read without the application key",
      "Speeds up lookups on a column at the cost of extra storage and slower writes",
      "Locks rows permanently"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which columns are good candidates for an index?",
    "topic": "Database indexing",
    "choices": [
      "Columns used often in where",
      "Columns that are never queried",
      "Only text columns",
      "Every column in every table"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you add an index in a migration?",
    "topic": "Database indexing",
    "choices": [
      "$table->key('email')->speed();",
      "$table->fast('email');",
      "$table->index('email');",
      "$table->search('email');"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does a unique index guarantee?",
    "topic": "Database indexing",
    "choices": [
      "The column is the primary key",
      "The column accepts only numbers",
      "The column is encrypted, so that its values cannot be read by other users",
      "No two rows share the same value in the indexed column"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a composite index?",
    "topic": "Database indexing",
    "choices": [
      "One index covering several columns",
      "An index on a view",
      "Two copies of the same index",
      "An index shared between tables"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why does column order matter in a composite index?",
    "topic": "Database indexing",
    "choices": [
      "The database ignores order",
      "Queries can use the index efficiently from its leftmost columns",
      "Column order only affects display",
      "The index is sorted alphabetically by column name"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which tool shows how the database executes a query?",
    "topic": "Database indexing",
    "choices": [
      "DESCRIBE only",
      "EXPLAIN",
      "COMMIT",
      "SHOW TABLES"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does a full table scan mean?",
    "topic": "Database indexing",
    "choices": [
      "The database locks the table",
      "The database reads the cache",
      "The database reads only the index and never touches the rows of the table",
      "The database reads every row to find matches"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a trade-off of adding many indexes?",
    "topic": "Database indexing",
    "choices": [
      "Writes get slower and storage grows",
      "Reads get slower",
      "Migrations stop working",
      "Tables stop accepting inserts"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why add a foreign key index on posts.user_id?",
    "topic": "Database indexing",
    "choices": [
      "It encrypts the id",
      "Joins and lookups by user are faster",
      "It prevents deleting users, because the index blocks removal of related rows",
      "It changes the primary key"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why return only the fields clients need from an API?",
    "topic": "API resource optimization",
    "choices": [
      "Clients cannot read large responses",
      "It's required by Laravel",
      "Smaller responses are faster",
      "JSON cannot hold many fields"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why avoid loading relations in a resource that were not eager loaded?",
    "topic": "API resource optimization",
    "choices": [
      "It breaks JSON syntax",
      "It's slower to write",
      "It triggers extra queries for each item",
      "Resources cannot access relations"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How can an API reduce payload size for large lists?",
    "topic": "API resource optimization",
    "choices": [
      "Remove authentication",
      "Return all rows at once so the client can paginate and filter the data itself",
      "Add more headers",
      "Paginate and limit the fields returned"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which HTTP feature lets clients skip downloading unchanged data?",
    "topic": "API resource optimization",
    "choices": [
      "Cookie",
      "Content-Length, which tells the client whether the body has changed since the last call",
      "User-Agent",
      "ETag with conditional requests"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does gzip or Brotli compression do for API responses?",
    "topic": "API resource optimization",
    "choices": [
      "Makes queries faster",
      "Encrypts the JSON so that proxies between the server and client cannot read it",
      "Reduces transferred bytes for text data like JSON",
      "Removes null fields"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the benefit of caching a public, rarely changing API response?",
    "topic": "API resource optimization",
    "choices": [
      "Fewer database queries and faster replies",
      "Better password security because cached responses are hashed before they are stored",
      "Smaller migrations",
      "Fewer routes"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why avoid heavy computation inside resource toArray methods?",
    "topic": "API resource optimization",
    "choices": [
      "It breaks pagination",
      "It runs for every item",
      "It changes the JSON keys",
      "Resources cannot call functions"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does returning the total count for every request cost?",
    "topic": "API resource optimization",
    "choices": [
      "A migration",
      "A cache clear",
      "An extra count query, which can be slow on large tables",
      "Nothing, since the database already stores the total number of rows in each table"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a good approach for expensive dashboard numbers?",
    "topic": "API resource optimization",
    "choices": [
      "Calculate them in the browser from all rows, which the API has to return first",
      "Precompute or cache them rather than calculating on every request",
      "Refresh them with every keystroke",
      "Hide them"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which header lets clients cache a response for a period?",
    "topic": "API resource optimization",
    "choices": [
      "Host",
      "Authorization",
      "Cache-Control with max-age",
      "Accept-Language, which tells the browser how long a response may be reused"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is Laravel Telescope?",
    "topic": "Profiling and debugging",
    "choices": [
      "A debugging tool that records requests, queries, jobs and exceptions",
      "A package for deploying the application to servers with a single Artisan command",
      "A mail provider",
      "A frontend framework"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why not enable Telescope or Debugbar freely in production?",
    "topic": "Profiling and debugging",
    "choices": [
      "They delete logs",
      "They disable caching",
      "They expose sensitive data",
      "They are unavailable on Linux"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which function quickly dumps a value and stops execution?",
    "topic": "Profiling and debugging",
    "choices": [
      "log()",
      "print_r() only",
      "stop()",
      "dd()"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Where does Laravel write logs by default?",
    "topic": "Profiling and debugging",
    "choices": [
      "vendor/logs",
      "public/logs",
      "resources/logs",
      "storage/logs"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does a profiler tell you?",
    "topic": "Profiling and debugging",
    "choices": [
      "Whether code is formatted",
      "Where time and memory are spent",
      "Which routes exist",
      "Which packages are outdated"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What should you do before optimizing a slow endpoint?",
    "topic": "Profiling and debugging",
    "choices": [
      "Measure to find the actual bottleneck",
      "Rewrite it in another language",
      "Add caching everywhere",
      "Remove all queries"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is an APM tool used for in production?",
    "topic": "Profiling and debugging",
    "choices": [
      "Generating migrations",
      "Compiling frontend assets and publishing them to the CDN after every deployment",
      "Monitoring performance, errors and traces over time",
      "Formatting code"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How can you find slow queries in production?",
    "topic": "Profiling and debugging",
    "choices": [
      "Enable a slow query log or query monitoring",
      "Guess based on table names, then add indexes to every table that seems large",
      "Disable logging",
      "Delete indexes"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does Xdebug help with?",
    "topic": "Profiling and debugging",
    "choices": [
      "Step debugging and profiling PHP code",
      "Sending mail",
      "Managing queues",
      "Minifying CSS and JavaScript files so that pages download more quickly in browsers"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why add performance tests or budgets to CI?",
    "topic": "Profiling and debugging",
    "choices": [
      "Code needs no review",
      "Regressions are caught before release",
      "Servers scale automatically",
      "Tests run faster, because the pipeline skips unit tests whenever a budget exists"
    ],
    "answerIdx": 1
  }
]
```

LAYER: laravel-vue-10

```json
[
  {
    "stem": "What is Pest?",
    "topic": "Feature and unit tests with Pest",
    "choices": [
      "A package manager that installs PHP extensions for testing",
      "A browser extension that records user actions into scripts",
      "A deployment tool that copies tests onto the production server",
      "A PHP testing framework with an expressive syntax"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How does a basic Pest test look?",
    "topic": "Feature and unit tests with Pest",
    "choices": [
      "class HomeTest extends Spec { public function run() }",
      "test: home page => { ... }",
      "describe.run('home', () => { ... });",
      "it('has a home page', function () { ... });"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a feature test in Laravel?",
    "topic": "Feature and unit tests with Pest",
    "choices": [
      "A test written to check CSS rules against a design file",
      "A test that runs only in the browser with real users",
      "A test of a single pure function in complete isolation",
      "A test that exercises a larger slice"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a unit test?",
    "topic": "Feature and unit tests with Pest",
    "choices": [
      "A test of a small piece of logic in isolation from the framework and database",
      "A test that restores the production database",
      "A test that drives the whole application through a browser, from login to checkout",
      "A test that reviews code style"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which helper sends a GET request in a feature test?",
    "topic": "Feature and unit tests with Pest",
    "choices": [
      "Request::fetch('/posts')",
      "visit('/posts')->run()",
      "http('/posts')->send()",
      "$this->get('/posts')"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you assert a JSON API response returned a 201 status?",
    "topic": "Feature and unit tests with Pest",
    "choices": [
      "$response->assertCreated();",
      "assert($response == 201);",
      "$response->expectStatus('created');",
      "$response->check(201)->json();"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you act as a logged-in user in a test?",
    "topic": "Feature and unit tests with Pest",
    "choices": [
      "session(['user' => $user])->start()",
      "$this->login($user)->persist()",
      "Auth::fake($user)->run()",
      "$this->actingAs($user)"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does Mail::fake() do in a test?",
    "topic": "Feature and unit tests with Pest",
    "choices": [
      "Generates fake email addresses",
      "Deletes the mail configuration",
      "Sends emails to a test inbox on the internet so that you can read them later",
      "Prevents real emails and lets you assert what would have been sent"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does Queue::fake() let you assert?",
    "topic": "Feature and unit tests with Pest",
    "choices": [
      "That a job was dispatched",
      "That Redis is installed",
      "That workers are running",
      "That the queue table exists"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why should tests be independent of each other?",
    "topic": "Feature and unit tests with Pest",
    "choices": [
      "Independent tests always run faster because Pest executes each one on its own server",
      "Tests run in the browser",
      "Order and shared state then don't cause random failures",
      "Pest requires it"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which library is commonly used to test Vue components?",
    "topic": "Vue component testing",
    "choices": [
      "Laravel Dusk only, since it is the sole library that can mount Vue components",
      "Blade",
      "Vue Test Utils with Vitest",
      "Composer"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does mount() from Vue Test Utils do?",
    "topic": "Vue component testing",
    "choices": [
      "Renders a component in a test environment so you can interact with it",
      "Compiles the Vue app for production",
      "Starts the Laravel server",
      "Mounts a disk on the server so that the component files can be read at runtime"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What should a component test usually assert?",
    "topic": "Vue component testing",
    "choices": [
      "The order of imports",
      "The private variable names inside the component",
      "Visible output and behavior from the user's perspective",
      "The number of lines in the template"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you simulate a click in Vue Test Utils?",
    "topic": "Vue component testing",
    "choices": [
      "await wrapper.find('button').trigger('click')",
      "click(wrapper, 'button')",
      "wrapper.click('button')->run(), which dispatches the event through the router",
      "wrapper.dispatch('button')"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why await after triggering an event in a Vue test?",
    "topic": "Vue component testing",
    "choices": [
      "The DOM updates asynchronously on the next tick",
      "Vitest requires awaiting every line",
      "The server needs time to respond, so the test must wait for the HTTP reply",
      "Events take a minute to fire"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you avoid real network calls in component tests?",
    "topic": "Vue component testing",
    "choices": [
      "Mock the API module or Axios",
      "Remove the template",
      "Run the tests against production",
      "Disable the component"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a risk of snapshot-only component tests?",
    "topic": "Vue component testing",
    "choices": [
      "They delete component code",
      "They cannot run on CI",
      "They can be updated blindly",
      "They only work with Options API"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How would you test a component that reads from a Pinia store?",
    "topic": "Vue component testing",
    "choices": [
      "Use localStorage only",
      "Skip the store",
      "Edit the production store so that it contains the state the component needs",
      "Create a testing Pinia with initial state and mount with it"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does shallowMount do compared with mount?",
    "topic": "Vue component testing",
    "choices": [
      "Runs the tests slower",
      "Mounts the component twice so that the first render can be compared to the second",
      "Mounts only the template",
      "Stubs child components so you test one component alone"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What belongs in an end-to-end test rather than a component test?",
    "topic": "Vue component testing",
    "choices": [
      "A full user flow across pages, the API and the database",
      "A computed property",
      "The text of one button, which depends on nothing outside the component itself",
      "A CSS class"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which trait resets the database between tests?",
    "topic": "Database testing",
    "choices": [
      "WithFaker",
      "Notifiable",
      "RefreshDatabase",
      "HasFactory"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why use a separate database for tests?",
    "topic": "Database testing",
    "choices": [
      "Laravel forbids using the main database",
      "Tests can reset data",
      "Migrations cannot run twice",
      "Tests are faster only on separate databases"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which database is often used for fast tests?",
    "topic": "Database testing",
    "choices": [
      "Excel files",
      "SQLite in memory",
      "A shared production MySQL",
      "MongoDB only"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a risk of testing against SQLite when production uses MySQL?",
    "topic": "Database testing",
    "choices": [
      "Migrations are skipped",
      "Pest cannot connect to it",
      "SQLite cannot store text columns, so the tests would need to use numeric ids only",
      "Behavior differences can hide bugs that appear only in production"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you create test data conveniently?",
    "topic": "Database testing",
    "choices": [
      "Copying production rows",
      "Typing the SQL for each row by hand in every test that needs data to exist",
      "Model factories, such as User::factory()->create()",
      "Editing seeders during the test"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which assertion checks that a row exists in the database?",
    "topic": "Database testing",
    "choices": [
      "$this->assertTable('posts')->has('Hello');",
      "$this->expectRow('posts', 'Hello');",
      "assert(DB::has('posts'));",
      "$this->assertDatabaseHas('posts', ['title' => 'Hello']);"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does assertDatabaseMissing check?",
    "topic": "Database testing",
    "choices": [
      "That the database is offline",
      "That a migration did not run",
      "That a matching row does not exist",
      "That a table does not exist"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does DatabaseTransactions do?",
    "topic": "Database testing",
    "choices": [
      "Copies the database",
      "Commits every test permanently so that the next test can reuse the same rows",
      "Wraps each test in a transaction that is rolled back afterwards",
      "Disables foreign keys"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why avoid depending on seed data inside tests?",
    "topic": "Database testing",
    "choices": [
      "Seeders are always too slow",
      "Tests should create the data they need to stay clear and independent",
      "Seed data is encrypted",
      "Seeders cannot run in tests, because the test environment has no database access"
    ],
    "answerIdx": 1
  },
  {
    "stem": "When might you use RefreshDatabase over DatabaseTransactions?",
    "topic": "Database testing",
    "choices": [
      "When tests use no database",
      "When you never use migrations and build the schema by hand before each test run",
      "When you want migrations re-run to match the latest schema",
      "When running only unit tests"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is Laravel Sail?",
    "topic": "Containerizing with Docker and Sail",
    "choices": [
      "A Docker-based local development environment for Laravel",
      "A frontend build tool",
      "A testing library",
      "A cloud host for Laravel apps that deploys the code from a Git repository"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why use Docker for development?",
    "topic": "Containerizing with Docker and Sail",
    "choices": [
      "It encrypts the source code",
      "Everyone gets the same runtime",
      "It removes the need for a database",
      "It makes PHP faster by default"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which command starts a Sail environment?",
    "topic": "Containerizing with Docker and Sail",
    "choices": [
      "php artisan docker:start",
      "./vendor/bin/sail up",
      "sail --install",
      "docker laravel run"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does a docker-compose file define?",
    "topic": "Containerizing with Docker and Sail",
    "choices": [
      "The routes of the application",
      "The services, such as PHP",
      "The Blade layout",
      "The test cases"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a volume in Docker used for?",
    "topic": "Containerizing with Docker and Sail",
    "choices": [
      "Defining ports",
      "Persisting or sharing data outside the container's lifetime",
      "Increasing the audio of the container so that its logs are easier to listen to",
      "Compressing images"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What should a production image avoid containing?",
    "topic": "Containerizing with Docker and Sail",
    "choices": [
      "PHP itself",
      "Development dependencies and secrets baked into layers",
      "The application code, because Docker images are not allowed to contain any PHP files",
      "A web server"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does a multi-stage Docker build help with?",
    "topic": "Containerizing with Docker and Sail",
    "choices": [
      "Creating backups",
      "Sharing a database between containers",
      "Running several different apps in one container so that they share their ports",
      "Producing a smaller final image by leaving build tools behind"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How should secrets reach a container in production?",
    "topic": "Containerizing with Docker and Sail",
    "choices": [
      "Committed in the repository",
      "As environment variables or secrets provided by the platform",
      "Written on the image's welcome page",
      "Hard-coded in the Dockerfile so that every build uses the same secret values"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why pin versions of base images and packages?",
    "topic": "Containerizing with Docker and Sail",
    "choices": [
      "It disables security patches forever",
      "Docker requires it",
      "Builds are reproducible and don't change unexpectedly",
      "Images become larger because pinned packages cannot be compressed by the registry"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does port mapping 8080:80 mean?",
    "topic": "Containerizing with Docker and Sail",
    "choices": [
      "The container uses 8080 ports",
      "Container port 8080 forwards to host port 80",
      "Both ports are blocked",
      "Host port 8080 forwards to container port 80"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does npm run build do for a Vue app using Vite?",
    "topic": "Building Vue for production",
    "choices": [
      "Creates optimized, minified static assets for production",
      "Seeds the database",
      "Runs the Laravel queue",
      "Starts the development server with hot reloading so that changes appear at once"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How does Laravel load Vite-built assets in Blade?",
    "topic": "Building Vue for production",
    "choices": [
      "With the @vite directive",
      "With the public/index.php file",
      "With @asset only",
      "With a script tag to node_modules"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why are built assets given hashed file names?",
    "topic": "Building Vue for production",
    "choices": [
      "The names make files smaller",
      "Browsers can cache them for a long time while new builds get new names",
      "The names hide the source code, so users cannot read it from the browser",
      "Hashes are required by Blade"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Where does the production build output go in a standard Laravel + Vite setup?",
    "topic": "Building Vue for production",
    "choices": [
      "public/build",
      "vendor/vite",
      "resources/build",
      "storage/app"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Should node_modules be deployed to production for a built Vue app?",
    "topic": "Building Vue for production",
    "choices": [
      "Only the package.json",
      "No, only the built assets are needed",
      "Only the .env",
      "Yes, always, because the built app loads its packages from that folder at runtime"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is tree shaking?",
    "topic": "Building Vue for production",
    "choices": [
      "Compressing the database",
      "Reordering routes",
      "Removing unused exports from the bundle",
      "Deleting old Git branches that are no longer needed after the feature has shipped"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why set the correct VITE_ environment variables at build time?",
    "topic": "Building Vue for production",
    "choices": [
      "They only affect Laravel",
      "They are read from the server at runtime",
      "They're embedded into the bundle",
      "They are encrypted"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What should you check before deploying a new build?",
    "topic": "Building Vue for production",
    "choices": [
      "That the developer's laptop is fast enough to run the production build locally",
      "That node_modules is large",
      "That comments are removed manually",
      "That it works in a production-like environment, such as a preview"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does code splitting give a Vue SPA?",
    "topic": "Building Vue for production",
    "choices": [
      "Automatic testing",
      "Server rendering",
      "A single large file that contains all of the routes and is loaded on the first visit",
      "Smaller initial downloads, since route code loads when needed"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What happens if a browser caches an old index.html pointing to deleted hashed files?",
    "topic": "Building Vue for production",
    "choices": [
      "Laravel regenerates them",
      "Assets can 404, so the HTML should not be cached for long",
      "The browser fixes it",
      "Nothing, since the build tool never deletes the files that earlier pages refer to"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What steps usually run on every deployment of a Laravel app?",
    "topic": "Deploying to a cloud host",
    "choices": [
      "Rebuild the operating system",
      "Install dependencies, build assets, run migrations and cache config",
      "Rename the repository",
      "Delete the database and restore it from the latest backup before the new code runs"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why run php artisan migrate --force in a deployment script?",
    "topic": "Deploying to a cloud host",
    "choices": [
      "It resets the app key",
      "It applies migrations without the interactive production prompt",
      "It speeds up queries",
      "It deletes old data from the tables so that the new schema can be applied cleanly"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which Laravel setting must be false in production?",
    "topic": "Deploying to a cloud host",
    "choices": [
      "APP_TIMEZONE",
      "APP_URL",
      "APP_NAME",
      "APP_DEBUG"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which web server directive ensures all requests go through public/index.php?",
    "topic": "Deploying to a cloud host",
    "choices": [
      "A try_files or rewrite rule to index.php",
      "A rule that serves .env",
      "A rule that blocks all PHP files so that only static assets are served directly",
      "A rule for the vendor folder"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why must the web root point to the public directory, not the project root?",
    "topic": "Deploying to a cloud host",
    "choices": [
      "The public folder holds the database",
      "Laravel cannot start otherwise, because the framework locates its files from there",
      "Otherwise .env and source files could be exposed",
      "It makes the site faster"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does zero-downtime deployment aim to avoid?",
    "topic": "Deploying to a cloud host",
    "choices": [
      "Using a database",
      "Visible downtime or errors while a new release is being switched in",
      "Writing tests",
      "Using version control, because every release is kept in the repository's history"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What should be part of a deployment's safety net?",
    "topic": "Deploying to a cloud host",
    "choices": [
      "A quick rollback path to the previous release",
      "Skipping tests",
      "Turning off logs",
      "Deleting backups after each release so that the storage cost stays predictable"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do queue workers fit into a deployment?",
    "topic": "Deploying to a cloud host",
    "choices": [
      "Restart them so they load the new code",
      "Move them to the browser",
      "Leave them running forever on old code",
      "Delete the queue"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why run tests in CI before deploying?",
    "topic": "Deploying to a cloud host",
    "choices": [
      "Tests deploy the code, so CI is the quickest way to publish a new version",
      "CI replaces code review",
      "Catch regressions before they reach production",
      "It makes migrations unnecessary"
    ],
    "answerIdx": 2
  },
  {
    "stem": "After deployment, what is a useful check?",
    "topic": "Deploying to a cloud host",
    "choices": [
      "Disable monitoring",
      "Wait a week",
      "Smoke test key pages",
      "Reset all user passwords"
    ],
    "answerIdx": 2
  }
]
```
