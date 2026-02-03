---
name: github-integration
description: Comprehensive guide for interacting with GitHub repositories. Use this skill when you need to perform ANY GitHub operation: searching code/issues, creating/managing PRs, reviewing code, managing issues, or exploring repository content.
---

# GitHub Integration Skill

This skill provides a complete guide for using the `github-mcp-server` tools to manage repositories, code, pull requests, and issues.

## 🌟 Core Capabilities

### 1. Code Exploration & Search
- **Search Code**: `mcp_github-mcp-server_search_code` (Use for precise symbol/pattern finding)
- **Get File Content**: `mcp_github-mcp-server_get_file_contents` (Read specific files)
- **Search Repos**: `mcp_github-mcp-server_search_repositories` (Find projects)
- **List Commits**: `mcp_github-mcp-server_list_commits` (History persistence)

### 2. Pull Request Management
- **List PRs**: `mcp_github-mcp-server_list_pull_requests`
- **Create PR**: `mcp_github-mcp-server_create_pull_request`
- **Update PR**: `mcp_github-mcp-server_update_pull_request`
- **Review PR**: `mcp_github-mcp-server_pull_request_review_write`
- **Get Diff**: `mcp_github-mcp-server_pull_request_read` (method="get_diff")

### 3. Issue Tracking
- **Search Issues**: `mcp_github-mcp-server_search_issues`
- **Read Issue**: `mcp_github-mcp-server_issue_read`
- **Create/Update**: `mcp_github-mcp-server_issue_write`
- **Comments**: `mcp_github-mcp-server_add_issue_comment`

### 4. File Operations
- **Push Files**: `mcp_github-mcp-server_push_files` (Preferred for multi-file commits)
- **Create/Update Single**: `mcp_github-mcp-server_create_or_update_file`
- **Create Branch**: `mcp_github-mcp-server_create_branch`

---

## 🛡️ Setup Verification

Before starting complex GitHub operations, verify that the environment and MCP server are correctly configured.

**Protocol:**
1. Run the checker script to initiate the protocol:
   ```bash
   python3 .agent/skills/github-integration/scripts/mcp_checker.py
   ```
2. **Functional Test (MANDATORY)**:
   - The Agent MUST call `mcp_github-mcp-server_get_me`.
   - **Success**: If tool returns user details.
   - **Failure**: If tool errors or times out.
   
3. **Failure Handling**:
   - If the check fails, **STOP**.
   - Notify the user immediately: "GitHub MCP Server is not responding. Please check your configuration."
   - **DO NOT** attempt to debug or fix the environment variables yourself.

---

## 🛠️ Workflows

### A. Searching & Navigating Code
*Best for: "Find where X is defined", "Exploring a new repo"*

1. **Search**: Start with `search_code` to find relevant files.
   ```python
   # Example: Find auth middleware
   search_code(query="auth middleware repo:owner/repo")
   ```
2. **Read**: Use `get_file_contents` to read the specific file code.
3. **Context**: Use `list_commits` if you need to understand recent changes.

### B. Creating a Feature (GitOps)
*Best for: "Implement feature X and push it"*

1. **Branch**: Create a new branch from default.
   ```python
   create_branch(owner="...", repo="...", branch="feature/new-feature")
   ```
2. **Edit**: Prepare your file changes.
3. **Push**: Use `push_files` to commit changes atomically.
   ```python
   push_files(
       owner="...", repo="...", branch="feature/new-feature",
       message="feat: add new feature",
       files=[{"path": "src/main.ts", "content": "..."}]
   )
   ```
4. **PR**: Open a Pull Request.
   ```python
   create_pull_request(title="feat: add new feature", head="feature/new-feature", base="main", ...)
   ```

### C. Reviewing & Commenting
*Best for: "Review this PR", "Check these changes"*

1. **Get Context**: `pull_request_read(method="get_diff")` to see changes.
2. **Analyze**: Read the actual files if diff is insufficient.
3. **Comment**:
   - **General**: `add_issue_comment` (for PR level comments)
   - **Review**: `pull_request_review_write` (APPROVE, REQUEST_CHANGES, or COMMENT)
   - **Inline**: `add_comment_to_pending_review` (specific lines)

---

## 💡 Best Practices

1. **Search First**: Don't guess file paths. Use `search_code` to locate files accurately.
2. **Atomic Pushes**: Prefer `push_files` over multiple single `create_or_update_file` calls to keep history clean.
3. **Descriptive PRs**: Always provide a meaningful title and body when creating PRs.
4. **Check Status**: Use `command_status` (if applicable) or verify via `get_file_contents` after updates.
5. **Rate Limits**: Be mindful of API usage. Don't loop excessively without checking results.

---

## ❌ Anti-Patterns

- **Blind Edits**: Editing files without reading them first.
- **Empty PRs**: Creating PRs without content or description.
- **Spamming Comments**: creating multiple single comments instead of one review.
