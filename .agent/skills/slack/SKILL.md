---
name: slack
description: Slack integration patterns for managing messages, channels, threads, and users. Use this skill when you need to interact with a Slack workspace, including posting messages, reading history, managing channels, or looking up users.
---

# Slack

## Overview

This skill enables interaction with Slack workspaces through a set of MCP tools. It allows you to post messages, reply to threads, add reactions, read channel history, and retrieve information about users and channels.

## Core Capabilities

### 1. Messaging

Tools for sending content to Slack.

*   `slack_post_message`: Post a new message to a channel.
    *   Use when starting a new conversation or notification.
    *   Requires `channel_id`.
*   `slack_reply_to_thread`: Reply to a specific message thread.
    *   Use when continuing a discussion on a specific topic.
    *   Requires `channel_id` and the parent message's `thread_ts`.
*   `slack_add_reaction`: Add an emoji reaction to a message.
    *   Use to acknowledge or respond to a message without sending text.
    *   Requires `channel_id`, `timestamp` of the message, and `reaction` name (e.g., "thumbsup").

### 2. Reading History

Tools for retrieving past messages.

*   `slack_get_channel_history`: Get recent messages from a channel.
    *   Use to understand the context of a channel or find recent information.
    *   Supports pagination via `limit` (default 10).
*   `slack_get_thread_replies`: Get all replies in a message thread.
    *   Use to read a full conversation thread.
    *   Requires `channel_id` and `thread_ts`.

### 3. Channels

Tools for discovering channels.

*   `slack_list_channels`: List public or pre-defined channels in the workspace.
    *   Use to find the `channel_id` for a specific channel name or to browse available channels.
    *   Supports pagination via `cursor` and `limit`.

### 4. Users

Tools for identifying and inspecting users.

*   `slack_get_users`: Get a list of all users in the workspace.
    *   Use to find a user's ID or browse the user directory.
    *   Supports pagination via `cursor` and `limit`.
*   `slack_get_user_profile`: Get detailed profile information for a specific user.
    *   Use when you need more details than the basic list provides, such as specific profile fields.
    *   Requires `user_id`.

## Usage Patterns

### Retrieving a Channel ID

Before posting, you often need the channel ID.

1.  Call `slack_list_channels`.
2.  Filter the results to find the desired channel by name.
3.  Extract the `id`.

### Engaging in a Thread

To reply to a message:

1.  Find the target message using `slack_get_channel_history`.
2.  Extract the `ts` (timestamp) of the message.
3.  Call `slack_reply_to_thread` with the `thread_ts` set to the message's `ts`.

### Finding a User

To mention a user or verify their identity:

1.  Call `slack_get_users` to list users.
2.  Find the user by `real_name` or `name`.
3.  Use their `id` for mentions (`<@USER_ID>`) or further lookups.
