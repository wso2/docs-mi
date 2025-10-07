#!/usr/bin/env python3
"""
Add search boost metadata to latest connector documentation.

This script automatically adds search boost frontmatter to the latest connector
documentation files to prioritize them in search results.

Usage:
    python add-search-boost.py
"""

import os
import sys
from pathlib import Path

# List of latest connector documentation files to boost
CONNECTORS = [
    "reference/connectors/amazons3-connector/amazons3-connector-overview.md",
    "reference/connectors/amazonlambda-connector/amazonlambda-connector-overview.md",
    "reference/connectors/amazondynamodb-connector/amazondynamodb-connector-overview.md",
    "reference/connectors/amazonsqs-connector/amazonsqs-connector-overview.md",
    "reference/connectors/email-connector/email-connector-example.md",
    "reference/connectors/email-connector/email-connector-config.md",
    "reference/connectors/file-connector/file-connector-overview.md",
    "reference/connectors/file-connector/5.x/file-connector-example.md",
    "reference/connectors/file-connector/5.x/file-connector-config.md",
    "reference/connectors/gmail-connector/gmail-connector-overview.md",
    "reference/connectors/gmail-connector/gmail-connector-example.md",
    "reference/connectors/gmail-connector/gmail-connector-config.md",
    "reference/connectors/google-spreadsheet-connector/google-spreadsheet-overview.md",
    "reference/connectors/google-spreadsheet-connector/google-spreadsheet-connector-example.md",
    "reference/connectors/google-spreadsheet-connector/google-spreadsheet-connector-config.md",
    "reference/connectors/google-pubsub-connector/googlepubsub-connector-overview.md",
    "reference/connectors/google-pubsub-connector/googlepubsub-connector-example.md",
    "reference/connectors/google-pubsub-connector/googlepubsub-connector-reference.md",
    "reference/connectors/iso8583-connector/iso8583-connector-overview.md",
    "reference/connectors/iso8583-connector/iso8583-connector-example.md",
    "reference/connectors/iso8583-connector/iso8583-connector-reference.md",
    "reference/connectors/jira-connector/jira-connector-overview.md",
    "reference/connectors/jira-connector/jira-connector-config.md",
    "reference/connectors/jira-connector/jira-connector-example.md",
    "reference/connectors/kafka-connector/kafka-connector-overview.md",
    "reference/connectors/kafka-connector/kafka-connector-producer-example.md",
    "reference/connectors/kafka-connector/kafka-connector-config.md",
    "reference/connectors/ldap-connector/ldap-connector-overview.md",
    "reference/connectors/ldap-connector/ldap-connector-example.md",
    "reference/connectors/ldap-connector/ldap-server-configuration.md",
    "reference/connectors/microsoft-azure-storage-connector/microsoft-azure-overview.md",
    "reference/connectors/microsoft-azure-storage-connector/2.x/microsoft-azure-storage-connector-example.md",
    "reference/connectors/microsoft-azure-storage-connector/2.x/microsoft-azure-storage-reference.md",
    "reference/connectors/mongodb-connector/mongodb-connector-overview.md",
    "reference/connectors/mongodb-connector/3.x/mongodb-connector-example.md",
    "reference/connectors/mongodb-connector/3.x/mongodb-connector-config.md",
    "reference/connectors/redis-connector/redis-connector-overview.md",
    "reference/connectors/redis-connector/redis-connector-example.md",
    "reference/connectors/redis-connector/2.7.x/redis-connector-reference.md",
    "reference/connectors/salesforce-connectors/sf-overview.md",
    "reference/connectors/salesforce-connectors/3.x/sf-rest-connector-config.md",
    "reference/connectors/salesforce-connectors/3.x/sf-rest-connector-example.md",
    "reference/connectors/servicenow-connector/servicenow-overview.md",
    "reference/connectors/servicenow-connector/servicenow-connector-config.md",
    "reference/connectors/servicenow-connector/servicenow-connector-example.md",
    "reference/connectors/smpp-connector/smpp-connector-overview.md",
    "reference/connectors/smpp-connector/smpp-connector-example.md",
    "reference/connectors/smpp-connector/smpp-connector-config.md",
    "reference/connectors/twitter-connector/twitter-connector-overview.md",
    "reference/connectors/twitter-connector/4.x/twitter-connector-example.md",
    "reference/connectors/twitter-connector/4.x/twitter-connector-reference.md"
]

# Boost metadata to add
BOOST_METADATA = """---
search:
  boost: 2
---

"""


class Colors:
    """ANSI color codes for terminal output."""
    GREEN = '\033[92m'
    YELLOW = '\033[93m'
    RED = '\033[91m'
    CYAN = '\033[96m'
    RESET = '\033[0m'
    BOLD = '\033[1m'


def print_colored(message, color=Colors.RESET):
    """Print colored message to terminal."""
    print(f"{color}{message}{Colors.RESET}")


def has_boost_metadata(content):
    """Check if content already has search boost metadata."""
    return content.startswith("---\nsearch:\n  boost:")


def has_other_frontmatter(content):
    """Check if content has other frontmatter."""
    return content.startswith("---\n") and not has_boost_metadata(content)


def add_boost_to_file(file_path):
    """
    Add search boost metadata to a file.
    
    Returns:
        str: Status message ('processed', 'skipped', or 'error')
    """
    try:
        # Read file content
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Check if already has boost metadata
        if has_boost_metadata(content):
            print_colored(f"SKIPPED (already has boost): {file_path}", Colors.YELLOW)
            return 'skipped'
        
        # Check if has other frontmatter
        if has_other_frontmatter(content):
            print_colored(f"SKIPPED (has other frontmatter): {file_path}", Colors.YELLOW)
            return 'skipped'
        
        # Add boost metadata at the beginning
        new_content = BOOST_METADATA + content
        
        # Write back to file
        with open(file_path, 'w', encoding='utf-8', newline='\n') as f:
            f.write(new_content)
        
        print_colored(f"ADDED boost to: {file_path}", Colors.GREEN)
        return 'processed'
        
    except Exception as e:
        print_colored(f"ERROR processing: {file_path} - {e}", Colors.RED)
        return 'error'


def main():
    """Main function to process all connector files."""
    # Get the docs directory (parent of tools directory)
    script_dir = Path(__file__).parent
    docs_dir = script_dir.parent / 'docs'
    
    if not docs_dir.exists():
        print_colored(f"ERROR: docs directory not found at {docs_dir}", Colors.RED)
        sys.exit(1)
    
    print_colored("\n" + "="*50, Colors.CYAN)
    print_colored("Adding Search Boost to Connector Documentation", Colors.CYAN)
    print_colored("="*50 + "\n", Colors.CYAN)
    
    # Counters
    processed_count = 0
    skipped_count = 0
    error_count = 0
    not_found_count = 0
    
    # Process each connector file
    for connector in CONNECTORS:
        file_path = docs_dir / connector
        
        if not file_path.exists():
            print_colored(f"NOT FOUND: {connector}", Colors.RED)
            not_found_count += 1
            continue
        
        result = add_boost_to_file(file_path)
        
        if result == 'processed':
            processed_count += 1
        elif result == 'skipped':
            skipped_count += 1
        elif result == 'error':
            error_count += 1
    
    # Print summary
    print_colored("\n" + "="*50, Colors.CYAN)
    print_colored("SUMMARY:", Colors.CYAN + Colors.BOLD)
    print_colored(f"  Processed: {processed_count}", Colors.GREEN)
    print_colored(f"  Skipped: {skipped_count}", Colors.YELLOW)
    print_colored(f"  Not Found: {not_found_count}", Colors.RED)
    print_colored(f"  Errors: {error_count}", Colors.RED)
    print_colored("="*50 + "\n", Colors.CYAN)
    
    # Exit with appropriate status code
    if error_count > 0 or not_found_count > 0:
        sys.exit(1)
    else:
        sys.exit(0)


if __name__ == "__main__":
    main()
