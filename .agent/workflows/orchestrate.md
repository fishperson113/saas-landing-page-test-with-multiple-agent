---
description: Master orchestrator that routes tasks to specialized workflows AND assigns the right agents.
---

# /orchestrate - Universal Task Router & Squad Leader

$ARGUMENTS

---

## 🚀 Purpose

This workflow acts as the **Central Command**. It has two primary responsibilities:
1.  **Route** the request to the correct specialized workflow.
2.  **Assign** the correct "Squad" of agents (specialists) to execute the task, potentially in parallel.

---

## 🚦 Protocol

### Step 1: Analyze Intent & Route

Read the user's request and categorize it into one of these paths:

| Intent | Workflow to Trigger | Description |
| :--- | :--- | :--- |
| **New App/Project** | `@[.agent/workflows/create.md]` | Building something from scratch. |
| **New Feature** | `@[.agent/workflows/enhance.md]` | Adding features to existing app. |
| **Fixing Bugs** | `@[.agent/workflows/debug.md]` | Fixing errors, issues, or broken code. |
| **UI/UX Design** | `@[.agent/workflows/ui-ux-pro-max.md]` | Designing interfaces, CSS, or aesthetics. |
| **Deployment** | `@[.agent/workflows/deploy.md]` | Shipping to production/staging. |
| **Testing** | `@[.agent/workflows/test.md]` | Running or writing tests. |
| **Planning** | `@[.agent/workflows/plan.md]` | creating detailed project plans. |
| **Brainstorming** | `@[.agent/workflows/brainstorm.md]` | Ideation, exploring options, trade-offs. |
| **Server/Preview** | `@[.agent/workflows/preview.md]` | Managing local dev servers. |
| **Status Check** | `@[.agent/workflows/status.md]` | Checking project health/progress. |

### Step 2: Select Your Squad (Agent Assignment)

Before executing the workflow, **identify which specialists you need**. Do not try to do everything alone if you have a team.

**Available Agents:**
- **Frontend/Design**: `@[.agent/agents/frontend-specialist.md]`, `@[.agent/agents/mobile-developer.md]`, `@[.agent/agents/game-developer.md]`
- **Backend/Data**: `@[.agent/agents/backend-specialist.md]`, `@[.agent/agents/database-architect.md]`, `@[.agent/agents/code-archaeologist.md]`
- **Quality/Security**: `@[.agent/agents/qa-automation-engineer.md]`, `@[.agent/agents/security-auditor.md]`, `@[.agent/agents/penetration-tester.md]`, `@[.agent/agents/debugger.md]`
- **Product/Process**: `@[.agent/agents/product-manager.md]`, `@[.agent/agents/product-owner.md]`, `@[.agent/agents/project-planner.md]`, `@[.agent/agents/devops-engineer.md]`
- **Optimization**: `@[.agent/agents/performance-optimizer.md]`, `@[.agent/agents/seo-specialist.md]`

**Selection Logic:**
- **Single Domain?** (e.g., "Change button color") -> Assign **1 Agent** (`frontend-specialist`).
- **Full Stack?** (e.g., "Add user api and login page") -> Assign **Squad** (`frontend-specialist` + `backend-specialist`).
- **Unknown?** -> Assign `explorer-agent` or `code-archaeologist` first.

### Step 3: Execution (Dispatch)

**IF Multiple Agents are required:**
1.  **Use Parallel Pattern**: Explicitly state "Running parallel agents: [Agent A] acting on [File A] and [Agent B] acting on [File B]".
2.  **Orchestrate**: You (the Orchestrator) manage the state, while the "agents" (you changing persona) do the work.

**Instruction to Agent:**
1.  **Announce**: "Routing to `/[workflow]` with squad: `@[agent-1]`, `@[agent-2]`..."
2.  **Read**: Use `view_file` to read the **Target Workflow** AND the **Selected Agent Profiles**.
3.  **Execute**: Follow the steps in the *Target Workflow*, applying the wisdom/constraints from the *Agent Profiles*.

---

## 📝 Examples

**User:** "Build a new API for user login."
**Action:**
1.  **Route**: `/create` (or `/enhance`)
2.  **Squad**: `backend-specialist` (API), `database-architect` (Schema), `security-auditor` (Auth).
3.  **Execute**: Load `.agent/workflows/create.md` and apply Backend/Security rules.

**User:** "My app is slow and the SEO score is bad."
**Action:**
1.  **Route**: `/debug` (or `/enhance`)
2.  **Squad**: `performance-optimizer`, `seo-specialist`.
3.  **Execute**: Load `.agent/workflows/enhance.md` with focus on those domains.