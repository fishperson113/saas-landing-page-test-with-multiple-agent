#!/usr/bin/env python3
"""
GitHub MCP Functional Checker
-----------------------------
This script initiates the protocol for verifying the GitHub MCP server.
It does NOT check environment variables (as these may be internal to the server process).
Instead, it instructs the Agent to perform a functional "ping" using the tool itself.

Usage:
    python3 .agent/skills/github-integration/scripts/mcp_checker.py
"""

import sys

def main():
    print("🔍 GitHub MCP Functional Verification")
    print("=====================================")
    print("")
    print("To verify that the GitHub MCP server is reachable and authorized:")
    print("")
    print("👉 ACTION REQUIRED FOR AGENT:")
    print("   1. Execute the tool: `mcp_github-mcp-server_get_me`")
    print("   2. If the tool returns a User object (login, id, etc.) -> ✅ SUCCESS")
    print("   3. If the tool fails or returns an error -> ❌ FAILURE")
    print("")
    print("⚠️  NOTE TO AGENT: Do not attempt to fix configuration errors automatically.")
    print("   If the check fails, simply notify the user that the MCP server is not responding.")
    
    # We exit with 0 to indicate the *protocol* started successfully.
    # The actual check is the tool call that follows.
    sys.exit(0)

if __name__ == "__main__":
    main()
