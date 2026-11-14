
# Auto Commit Master Extension

The Auto Commit Master extension for Visual Studio Code automates the process of committing changes to Git repositories. It commits each file as its own commit (so history stays clean and timestamps are correct), supports per-file commits via an inline button, and is safe to use in workspaces that contain multiple Git repositories side by side.

This fork extends the original project with **AI-powered Conventional Commit message generation using GitHub Copilot**. Instead of generating commit messages from filenames alone, it analyzes actual staged Git diffs to produce more meaningful and descriptive commit messages.

> Don't forget to follow the original author on [GitHub](https://github.com/safdar-azeem)!

![Preview of the Auto Commit Master extension](/images/preview.gif)

# Features

## Original Features

- **Per-file automatic committing.** New, modified, and deleted files are added (or removed) and committed as separate commits — one commit per file.

- **Multi-project workspace support.** When two or more Git repositories are opened inside the same parent folder, each repository is handled independently.

- **Inline commit button on every file row.** Each file in the Source Control panel gets a small commit icon. One click commits only that file. The right-click "Auto Commit Master: Commit File" entry is also available.

- **Per-repo progress notifications.** Progress is shown for the project being processed; clean projects are skipped.

- **Stop button.** Halt an in-flight bulk commit cleanly between file transactions.

- **Activity log.** Every step is logged to a dedicated Auto Commit Master Output channel (`View → Output → Auto Commit Master`). Enable `autoCommitMaster.verbose` in settings to get detailed logs.

## My Improvements

### 1. AI-Powered Commit Message Generation

- Integrated GitHub Copilot using the VS Code Language Model API.
- Automatically analyzes staged Git diffs before generating commit messages.
- Generates messages based on actual code changes instead of relying only on filenames.
- Helps produce more meaningful, descriptive, and context-aware commit messages.

### 2. Conventional Commits Integration

Automatically generates commit messages following the Conventional Commits specification.

Supported commit types:

| Type | Purpose |
|---|---|
| `feat` | Introduces a new feature |
| `fix` | Fixes a bug |
| `docs` | Documentation changes |
| `style` | Formatting and styling changes |
| `refactor` | Code restructuring |
| `perf` | Performance improvements |
| `test` | Test-related changes |
| `build` | Build system changes |
| `ci` | CI/CD changes |
| `chore` | Maintenance tasks |

Generated commit headers follow this format:

```text
type(scope): short description

Detailed explanation of the changes.
```

### 3. Improved Git Diff Context

- Uses staged Git diffs with additional context lines.
- Provides Copilot with more surrounding code when analyzing changes.
- Includes instructions to carefully analyze the actual changes.
- Helps prevent invented or misleading commit descriptions.

### 4. AI-Powered Single-File Commits

- Integrated Copilot-generated commit messages into the single-file commit workflow.
- Each individual file commit receives a message based on its actual staged changes.
- Maintains the original per-file commit behavior.

# Requirements

- Visual Studio Code with support for the Language Model API.
- Git installed and configured with a username and email.
- GitHub Copilot access and sign-in.
- Access to an available Copilot language model.

# Usage

- Open Visual Studio Code.
- Make sure you have a Git repository initialized in your workspace.
- Make sure GitHub Copilot is available and signed in.
- Open the Git Source Control panel from the Activity Bar.

### Bulk: Start button

- In the Source Control panel, click the **Auto Commit Master** button for the project you want to commit.
- The extension processes changed files individually.
- GitHub Copilot analyzes the staged changes and generates a Conventional Commit message for each file.
- Each file is committed separately.
- If the workspace contains multiple Git projects, each repository is processed independently.
- Click the **Stop** button to halt the process between file transactions.

### Single file: Inline button

- In the Source Control panel, find the file you want to commit.
- Click the small commit icon that appears next to it.
- The extension stages the selected file.
- GitHub Copilot analyzes its changes and generates a Conventional Commit message.
- Only that file is committed.

### Single file: Context menu

- In the Source Control panel, right-click a single changed file.
- Pick **Auto Commit Master: Commit File**.
- The extension generates an AI-powered commit message and commits the selected file.

### Activity log

- Open the Command Palette and run **Auto Commit Master: Show Logs**, or pick **View → Output → Auto Commit Master**.
- The log auto-opens whenever you run a command, so you can watch the flow in real time.

# Settings

| Setting | Default | Description |
|---|---|---|
| `autoCommitMaster.verbose` | `false` | Enable detailed per-file and per-git-command logging. Useful when investigating issues. |

# Notes

- Commit messages are generated using GitHub Copilot and the staged Git diff.
- AI-generated commit messages may occasionally need manual review.
- The extension requires GitHub Copilot access. It does not require a separate OpenAI API key.
- The extension uses `git` from your `PATH`. Make sure Git is installed and configured with a username and email.
- Each changed file is committed separately.
- Review your changes before pushing them to a remote repository.

# Credits

This project is based on the original **Auto Commit Master** extension by [safdar-azeem](https://github.com/safdar-azeem).

This fork builds upon the original project by introducing AI-powered Conventional Commit message generation using GitHub Copilot.

All original project credits and applicable licenses belong to their respective owners.

# License

MIT
