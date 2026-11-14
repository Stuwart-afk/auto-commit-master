
# Auto Commit Master Extension

The Auto Commit Master extension for Visual Studio Code automates the process of committing changes to Git repositories. It commits each file as its own commit, supports per-file commits via an inline button, and supports workspaces containing multiple Git repositories.

This fork extends the original project with **AI-powered Conventional Commit message generation using GitHub Copilot**. Instead of generating commit messages from filenames alone, it analyzes actual staged Git diffs to produce more meaningful and descriptive commit messages.

> Don't forget to follow the original author on [GitHub](https://github.com/safdar-azeem)!

![Preview of the Auto Commit Master extension](/images/preview.gif)

# Features

## Original Features

- **Per-file automatic committing.** New, modified, and deleted files are added or removed and committed separately.
- **Inline commit button.** Commit an individual file directly from the Source Control panel.
- **Multi-project workspace support.** Handle multiple Git repositories independently.
- **Per-repo progress notifications.** See progress while repositories are being processed.
- **Stop button.** Halt an in-flight bulk commit between file transactions.
- **Activity log.** View extension activity through the Auto Commit Master Output channel.

## My Improvements

### 1. AI-Powered Commit Message Generation

- Integrated GitHub Copilot through the VS Code Language Model API.
- Automatically analyzes staged Git diffs before generating commit messages.
- Generates messages based on actual code changes instead of relying only on filenames.
- Produces more meaningful and context-aware commit messages.

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

Generated commit messages follow this format:

```text
type(scope): short description

Detailed explanation of the changes.
```

### 3. Improved Git Diff Context

- Uses staged Git diffs with additional context lines.
- Provides Copilot with more surrounding code when analyzing changes.
- Includes instructions to carefully analyze actual changes.
- Helps prevent invented or misleading commit descriptions.

### 4. AI-Powered Single-File Commits

- Integrated Copilot-generated commit messages into the single-file commit workflow.
- Each individual file commit receives a message based on its actual staged changes.
- Maintains the original per-file commit behavior.

# Requirements

Before installing and using this fork, make sure you have:

- [Visual Studio Code](https://code.visualstudio.com/)
- [Node.js and npm](https://nodejs.org/)
- [Git](https://git-scm.com/)
- [GitHub Copilot](https://github.com/features/copilot)
- A GitHub account with access to GitHub Copilot models in VS Code.

**Important:**
- GitHub Copilot access is required for AI-generated commit messages.
- Your VS Code version must support the Language Model API used by this extension.
- You do not need an OpenAI API key.
- Copilot availability and usage are subject to GitHub's subscription and usage policies.

# Installation and Setup

## 1. Clone the Repository

Open your terminal and run:

```bash
git clone https://github.com/Stuwart-afk/auto-commit-master.git
```

Navigate into the project:

```bash
cd auto-commit-master
```

## 2. Install Dependencies

Install the required Node.js packages:

```bash
npm install
```

## 3. Sign In to GitHub Copilot

1. Open Visual Studio Code.
2. Install the GitHub Copilot extension if it is not already installed.
3. Sign in with your GitHub account.
4. Make sure you have access to Copilot models in VS Code.
5. Verify that Copilot is working before using Auto Commit Master.

No API key or manual API configuration is required.

## 4. Compile the Extension

Build the extension:

```bash
npm run compile
```

If compilation succeeds, the extension is ready for packaging.

## 5. Package the Extension

Install the VS Code Extension Manager if it is not already available:

```bash
npm install -g @vscode/vsce
```

Package the extension:

```bash
vsce package --no-yarn
```

This generates a `.vsix` file in the project directory.

## 6. Install the Extension

Install the generated VSIX package:

```bash
code --install-extension auto-commit-master-0.1.1.vsix
```

Replace the filename if your generated VSIX has a different version number.

Alternatively:

1. Open Visual Studio Code.
2. Open the Extensions panel.
3. Click the three-dot menu.
4. Select **Install from VSIX...**.
5. Select the generated `.vsix` file.

Restart or reload VS Code if necessary.

# Usage

## 1. Prepare Your Git Repository

Make sure your project is a Git repository.

If Git has not been initialized yet:

```bash
git init
```

Configure your Git identity if you have not already:

```bash
git config --global user.name "Your Name"
git config --global user.email "your-email@example.com"
```

Make sure your repository has changes before running Auto Commit Master.

## 2. Bulk: Start Button

- Open the Source Control panel.
- Click the **Auto Commit Master** button for the repository you want to process.
- The extension stages changed files individually.
- GitHub Copilot analyzes the staged changes.
- A Conventional Commit message is generated for each file.
- Each file is committed separately.
- Use the **Stop** button to halt the process between file transactions.

## 3. Single File: Inline Button

- Open the Source Control panel.
- Find the file you want to commit.
- Click the commit icon next to the file.
- The extension stages the selected file.
- Copilot generates a Conventional Commit message.
- The selected file is committed individually.

## 4. Single File: Context Menu

- Right-click a changed file in the Source Control panel.
- Select **Auto Commit Master: Commit File**.
- The extension generates an AI-powered commit message and commits the selected file.

## 5. Activity Log

Open the Command Palette and run:

```text
Auto Commit Master: Show Logs
```

Alternatively, navigate to:

```text
View → Output → Auto Commit Master
```

# Settings

| Setting | Default | Description |
|---|---|---|
| `autoCommitMaster.verbose` | `false` | Enables detailed per-file and per-Git-command logging. |

To enable verbose logging, add this to your VS Code `settings.json`:

```json
{
    "autoCommitMaster.verbose": true
}
```

# Troubleshooting

### No GitHub Copilot Models Available

If you see an error saying no Copilot models are available:

- Make sure you are signed in to GitHub in VS Code.
- Check that GitHub Copilot is installed and enabled.
- Verify that your account has access to Copilot models.
- Check whether your VS Code version supports the Language Model API.
- Reload VS Code and try again.

### Git Command Not Found

Make sure Git is installed and available in your system PATH.

Verify your installation:

```bash
git --version
```

### Compilation Errors

Make sure Node.js and npm are installed:

```bash
node --version
npm --version
```

Then reinstall dependencies and compile:

```bash
npm install
npm run compile
```

### Extension Does Not Appear

Make sure the VSIX package was installed successfully.

Check installed extensions:

```bash
code --list-extensions
```

# Notes

- AI-generated commit messages are based on staged Git diffs.
- Generated messages should still be reviewed for accuracy.
- Each changed file receives its own Git commit.
- The extension uses Git from your system PATH.
- Git must be configured with a username and email.
- GitHub Copilot access is required for AI-generated messages.
- No separate OpenAI API key is required.
- Always review your changes before pushing them to a remote repository.

# Credits

This project is based on the original **Auto Commit Master** extension by [safdar-azeem](https://github.com/safdar-azeem).

This fork builds upon the original project by introducing AI-powered Conventional Commit message generation using GitHub Copilot and the VS Code Language Model API.

All original project credits and applicable licenses belong to their respective owners.

# Author

**Fork maintainer:** [Stuwart-afk](https://github.com/Stuwart-afk)

**Original author:** [safdar-azeem](https://github.com/safdar-azeem)

# License

MIT
