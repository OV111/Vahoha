export default {
  minutes: 12,
  whatItIs: [
    "Version control records every change to your code as a history you can inspect, undo and share. Git, the standard tool, stores that history as a chain of commits: snapshots of the project, each pointing to the one before it.",
    "Branches let you work on a change without touching the main line. When it's ready you merge it back, usually through a pull request that someone reviews first. That is how teams change one codebase at the same time without overwriting each other.",
  ],
  whyNow:
    "An AI edit can touch dozens of files in seconds. Small commits make that safe: you can see exactly what changed, review it as a diff, and throw it away with one command if it's wrong. Without version control, a bad AI change is a mess you clean up by hand.",
  keyIdeas: [
    {
      term: "Commit",
      explain:
        "A snapshot of staged changes with a message and an author. Good commits are small and do one thing, so the history explains itself and a single commit can be reverted cleanly.",
    },
    {
      term: "Staging area",
      explain:
        "git add chooses which changes go into the next commit. It lets you split unrelated edits into separate commits instead of one big one.",
    },
    {
      term: "Branch",
      explain:
        "A movable label pointing at a commit. Creating one is cheap, so the normal habit is one branch per change.",
    },
    {
      term: "Merge and conflicts",
      explain:
        "Merging combines two lines of history. A conflict happens when both sides changed the same lines; Git stops and you decide what the result should be.",
    },
    {
      term: "Remote",
      explain:
        "A shared copy of the repository, such as one on GitHub. You push your commits to it and pull or fetch other people's.",
    },
    {
      term: "Undo safely",
      explain:
        "git revert adds a new commit that reverses an old one, which is safe on shared branches. git reset rewrites history, so keep it to commits nobody else has pulled.",
    },
  ],
  tryIt: [
    {
      type: "build",
      title: "Make a repository and your first commit",
      steps: [
        "Make a throwaway folder and turn it into a repository.",
        "Create a file, stage it with git add, and commit it.",
        "Read the history. If Git says it doesn't know who you are, run git config --global user.name and user.email with your own details, then commit again.",
      ],
      command: `mkdir git-demo && cd git-demo
git init
echo "hello" > notes.txt
git add notes.txt
git commit -m "Add notes"
git log --oneline`,
      windows: "Use Git Bash; the commands run unchanged. PowerShell's echo > can write a different text encoding.",
      expect: "One commit in the log, with a short hash and the message \"Add notes\".",
    },
    {
      type: "break-fix",
      title: "Cause a merge conflict, then resolve it",
      steps: [
        "On a new branch, change the first line of notes.txt and commit it.",
        "Go back to the original branch, change the same line differently, and commit.",
        "Merge the feature branch. Git cannot choose between the two edits and stops.",
        "Run git status, then open notes.txt. Git marked both versions between <<<<<<<, ======= and >>>>>>>.",
        "Edit the file to the one line you want, removing the marker lines. Stage it with git add and finish with git commit --no-edit.",
      ],
      command: `git switch -c feature
echo "from feature" > notes.txt
git commit -am "Change notes on feature"
git switch -
echo "from main" > notes.txt
git commit -am "Change notes on main"
git merge feature`,
      expect: "The merge prints CONFLICT (content): Merge conflict in notes.txt and \"Automatic merge failed; fix conflicts and then commit the result.\" Nothing is lost: both versions are in the file until you choose.",
    },
  ],
  checkYourself: [
    {
      q: "You changed two unrelated things in the same file. How do you commit them separately?",
      a: "Stage only part of the file with git add -p, commit, then stage and commit the rest.",
    },
    {
      q: "A bad commit is already pushed to main and teammates have pulled it. Revert or reset?",
      a: "Revert. It adds a new commit that undoes the change without rewriting history others already have. Resetting a shared branch forces everyone else to repair their copies.",
    },
    {
      q: "Predict, then check: after you finish the conflict above, how many parents does the merge commit have? Run git log --graph --oneline to find out.",
      a: "Two: one from each branch. The graph shows both lines of history joining at that commit.",
    },
  ],
  explainBack: {
    prompt: "In your own words: why does Git have a staging area, and what is a merge conflict actually telling you?",
    modelAnswer: "The staging area lets you choose exactly which changes go into the next commit, so unrelated edits can become separate, readable commits. A merge conflict means both branches changed the same part of a file in different ways and Git can't know which is right. Nothing is broken: both versions are in the file, and you decide the final content and commit it.",
  },
  practice: {
    challenges: [],
  },
};
