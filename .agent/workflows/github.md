---
description: Perform GitHub operations like searching code, creating PRs, or managing issues.
---

# /github - GitHub Integration

$ARGUMENTS

---

## 🛠️ Task

Use the `github-mcp-server` tools via the `github-integration` skill to interact with repositories.

### Operations:

1. **Search**: Find code or issues.
2. **PR**: Create, list, or review Pull Requests.
3. **Issue**: Manage or comment on issues.
4. **GitOps**: Create features and push changes.

---

## 🤖 Execution Protocol

1. **Load Skill**: `@[.agent/skills/github-integration/SKILL.md]`
2. **Verify Setup**: Run `python3 .agent/skills/github-integration/scripts/mcp_checker.py`
3. **Analyze Intent**:
    - "find/search" -> Use `search_code` or `search_issues`
    - "pr/pull request" -> Use `list_pull_requests` or `create_pull_request`
    - "push/commit" -> Follow GitOps flow (Branch -> Push -> **MANUAL PR LINK**)
    - "diff/review" -> Use `pull_request_read` or `pull_request_review_write`
4. **Execute**: Perform the requested operation using the MCP tools.
    - **CRITICAL**: For "push/commit" tasks, DO NOT use `create_pull_request`. Instead, push the branch and return the https URL for the user to create the PR manually (e.g. `https://github.com/owner/repo/pull/new/branch`).

---

## 📝 Usage Examples

```
/github search auth middleware in fishperson113/repo
/github list prs
/github push "feat: add login" (returns PR link)
/github review pr #123
/github check status of #45
```
