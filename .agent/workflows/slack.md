---
description: Slack integration command. Manage messages, channels, threads, and users directly from the chat.
---

# /slack - Slack Integration

$ARGUMENTS

---

## Purpose

This command activates the Slack integration workflow. Use it to interact with your Slack workspace without leaving the chat.

## Steps

1.  **Analyze Intent**
    *   Check if the user provided specific instructions in `$ARGUMENTS` (e.g., "send hello to #random").
    *   If yes, proceed to execution.
    *   If no, ask the user what they would like to do:
        *   Post a message?
        *   Read channel history?
        *   Reply to a thread?
        *   Find a user?

2.  **Execute with `slack` Skill**
    *   **Crucial**: You MUST load the `slack` skill instructions by reading `@[.agent/skills/slack/SKILL.md]` if you haven't already.
    *   Follow the Usage Patterns in the skill to perform the requested action.
    *   Use the available Slack MCP tools (`slack_post_message`, `slack_list_channels`, etc.).

3.  **Confirm & Report**
    *   Confirm the action was successful (e.g., "Message sent to #general").
    *   If reading data, present it clearly to the user.

---

## Examples

```
/slack
/slack send "Deploying now" to #dev-ops
/slack check recent messages in #general
/slack who is @jdoe
```
