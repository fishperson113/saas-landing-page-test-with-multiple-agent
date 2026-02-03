---
name: github-integration
description: Comprehensive guide for interacting with GitHub repositories. Use this skill when you need to perform ANY GitHub operation: searching code/issues, creating/managing PRs, reviewing code, managing issues, or exploring repository content.
---

# GitHub Integration Skill

This skill provides a complete guide for using the `github-mcp-server` tools to manage repositories, code, pull requests, and issues.

## 🌟 Core Capabilities

### 1. Code & Repository Exploration
- **Search Code**: `mcp_github-mcp-server_search_code` - Search code
- **Search Repos**: `mcp_github-mcp-server_search_repositories` - Search repositories
- **Get File Content**: `mcp_github-mcp-server_get_file_contents` - Get file or directory contents
- **List Commits**: `mcp_github-mcp-server_list_commits` - List commits
- **Get Commit**: `mcp_github-mcp-server_get_commit` - Get commit details
- **List Branches**: `mcp_github-mcp-server_list_branches` - List branches
- **List Tags**: `mcp_github-mcp-server_list_tags` - List tags
- **Get Tag**: `mcp_github-mcp-server_get_tag` - Get tag details
- **List Releases**: `mcp_github-mcp-server_list_releases` - List releases
- **Get Latest Release**: `mcp_github-mcp-server_get_latest_release` - Get latest release
- **Get Release by Tag**: `mcp_github-mcp-server_get_release_by_tag` - Get a release by tag name
- **Get Label**: `mcp_github-mcp-server_get_label` - Get a specific label from a repository.

### 2. Pull Request Management
- **List PRs**: `mcp_github-mcp-server_list_pull_requests` - List pull requests
- **Search PRs**: `mcp_github-mcp-server_search_pull_requests` - Search pull requests
- **Get PR Details**: `mcp_github-mcp-server_pull_request_read` - Get details for a single pull request
- **Create PR**: `mcp_github-mcp-server_create_pull_request` - Open new pull request
- **Update PR**: `mcp_github-mcp-server_update_pull_request` - Edit pull request
- **Update PR Branch**: `mcp_github-mcp-server_update_pull_request_branch` - Update pull request branch
- **Merge PR**: `mcp_github-mcp-server_merge_pull_request` - Merge pull request
- **Review PR**: `mcp_github-mcp-server_pull_request_review_write` - Write operations on PR reviews
- **Add Review Comment**: `mcp_github-mcp-server_add_comment_to_pending_review` - Add review comment to pending review
- **Request Copilot Review**: `mcp_github-mcp-server_request_copilot_review` - Request Copilot review

### 3. Issue Tracking & Management
- **List Issues**: `mcp_github-mcp-server_list_issues` - List issues
- **Search Issues**: `mcp_github-mcp-server_search_issues` - Search issues
- **Read Issue**: `mcp_github-mcp-server_issue_read` - Get issue details
- **Write Issue**: `mcp_github-mcp-server_issue_write` - Create or update issue
- **Issue Types**: `mcp_github-mcp-server_list_issue_types` - List available issue types
- **Sub-Issue Write**: `mcp_github-mcp-server_sub_issue_write` - Change sub-issue
- **Add Comment**: `mcp_github-mcp-server_add_issue_comment` - Add comment to issue
- **Assign Copilot**: `mcp_github-mcp-server_assign_copilot_to_issue` - Assign Copilot to issue

### 4. File & Branch Operations
- **Push Files**: `mcp_github-mcp-server_push_files` - Push files to repository
- **Create/Update File**: `mcp_github-mcp-server_create_or_update_file` - Create or update file
- **Delete File**: `mcp_github-mcp-server_delete_file` - Delete file
- **Create Branch**: `mcp_github-mcp-server_create_branch` - Create branch

### 5. Repository Administration
- **Create Repository**: `mcp_github-mcp-server_create_repository` - Create repository
- **Fork Repository**: `mcp_github-mcp-server_fork_repository` - Fork repository

### 6. Users & Teams
- **Get Me**: `mcp_github-mcp-server_get_me` - Get my user profile
- **Search Users**: `mcp_github-mcp-server_search_users` - Search users
- **Get Teams**: `mcp_github-mcp-server_get_teams` - Get teams
- **Get Team Members**: `mcp_github-mcp-server_get_team_members` - Get team members

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
