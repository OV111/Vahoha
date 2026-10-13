export default {
  minutes: 10,
  whatItIs: [
    "The command line is a text interface to your operating system. A shell (bash, zsh, PowerShell) reads the line you type, splits it into a program name and arguments, runs the program and shows its output.",
    "Most developer tools (git, npm, docker, test runners, deploy CLIs) are command-line programs first. Learning the shell means you can run, combine and automate all of them.",
  ],
  whyNow:
    "Coding agents work by running shell commands for you: installing packages, deleting files, pushing branches. If you can't read a command, you can't tell a harmless one from one that wipes a directory or leaks a secret. Approving commands you don't understand is the new copy-pasting from Stack Overflow.",
  keyIdeas: [
    {
      term: "Paths and the working directory",
      explain:
        "Every command runs from a current directory (pwd). Relative paths like ./src resolve from it; absolute paths like /home/me/app do not depend on it.",
    },
    {
      term: "Arguments and flags",
      explain:
        "Words after the program name are arguments. Flags such as -r or --force change behaviour. Quotes keep a value with spaces together as one argument.",
    },
    {
      term: "Pipes and redirection",
      explain:
        "A pipe (|) sends one program's output into the next program's input. > writes output to a file (replacing it) and >> appends to it.",
    },
    {
      term: "Exit codes",
      explain:
        "Every program exits with a number: 0 means success, anything else means failure. Scripts and CI pipelines use it to decide whether to continue.",
    },
    {
      term: "Environment variables and PATH",
      explain:
        "Key-value settings passed to every program you start. PATH is the list of directories the shell searches to find a command by name.",
    },
    {
      term: "Permissions",
      explain:
        "On Linux and macOS each file has read, write and execute permissions for its owner, its group and everyone else. A script needs the execute bit to run directly.",
    },
  ],
  tryIt: [
    {
      type: "build",
      title: "Write and run your first shell script",
      steps: [
        "Make a throwaway folder and move into it.",
        "Create the script. The first echo uses > (create or replace the file), the second uses >> (append to it).",
        "Make it executable, then run it with an argument.",
      ],
      command: `mkdir foundations-demo && cd foundations-demo
echo '#!/bin/sh' > greet.sh
echo 'echo "Hello, $1"' >> greet.sh
chmod +x greet.sh
./greet.sh Ada`,
      windows: "Use Git Bash or WSL; the commands run unchanged there. Plain PowerShell has different syntax.",
      expect: "The terminal prints Hello, Ada. Inside the script, $1 means the first argument you typed after the script name.",
    },
    {
      type: "break-fix",
      title: "Break the script's permissions, then fix them",
      steps: [
        "Remove the execute permission from the script and try to run it.",
        "Read the error. It tells you exactly what is wrong.",
        "Look at the file's permissions with ls -l. The x is missing.",
        "Give the permission back and run it again.",
      ],
      command: `chmod -x greet.sh
./greet.sh Ada
ls -l greet.sh
chmod +x greet.sh
./greet.sh Ada`,
      windows: "Use WSL for this one. In Git Bash, chmod can't change Windows file permissions, so the script keeps running and you won't see the error.",
      expect: "The first run fails with a message containing \"permission denied\" (the exact wording depends on your shell). After chmod +x it prints Hello, Ada again.",
    },
  ],
  checkYourself: [
    {
      q: "Predict, then check: what number does echo $? print right after ls /does-not-exist, and what would it print after a command that succeeds? Run both to find out.",
      a: "After the failing ls it prints a non-zero number (the exact value differs between systems). After a successful command such as true it prints 0. Zero means success; any other value means failure.",
    },
    {
      q: "You type mytool and get \"command not found\", but the file exists on disk. What is the most likely cause?",
      a: "Its directory isn't on your PATH, so the shell can't find it by name. Run it with its path (./mytool) or add the directory to PATH.",
    },
    {
      q: "An agent wants to run rm -rf \"$BUILD_DIR\"/*. Why should you check what BUILD_DIR is set to first?",
      a: "If the variable is empty, the command becomes rm -rf /* and deletes everything under the root directory it has permission to. Always know what a variable expands to before a destructive command runs.",
    },
  ],
  explainBack: {
    prompt: "In your own words: what happens between pressing Enter on ./greet.sh Ada and seeing the output, and why did chmod matter?",
    modelAnswer: "The shell splits the line into the program (./greet.sh) and its arguments (Ada), finds the file, and asks the operating system to run it. The first line, #!/bin/sh, names the interpreter that reads the script, and $1 inside it receives Ada. The operating system only runs a file that has the execute permission, which is why it failed with permission denied until chmod +x restored it.",
  },
  practice: {
    challenges: [
      { slug: "split-shell-args", title: "Split shell arguments" },
      { slug: "octal-to-symbolic", title: "Octal permissions to symbolic" },
      { slug: "grep-lines", title: "Write a mini grep" },
    ],
  },
};
