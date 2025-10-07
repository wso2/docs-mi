# Search Boost Tool

This directory contains tools to add search boost metadata to connector documentation files.

## add-search-boost

Automatically adds search boost frontmatter to the latest connector documentation files to prioritize them in search results.

### Usage

```bash
# From the en directory
python tools/add-search-boost.py

# Or make it executable and run directly
chmod +x tools/add-search-boost.py
./tools/add-search-boost.py
```

**Requirements:** Python 3.6+

### What It Does

1. Scans the list of latest connector documentation files
2. Checks if each file already has search boost metadata
3. Adds the following frontmatter to files that don't have it:
   ```yaml
   ---
   search:
     boost: 2
   ---
   ```
4. Skips files that already have boost metadata or other frontmatter
5. Provides a summary of processed, skipped, and error files

### Output

The script provides colored terminal output:
- **Green**: Successfully processed files
- **Yellow**: Skipped files (already have boost or other frontmatter)
- **Red**: Errors or files not found

### Exit Codes

- `0`: Success (all files processed or skipped)
- `1`: Errors occurred (files not found or processing errors)

### Maintenance

To add new connector documentation files to the boost list:

1. Edit the script
2. Add the file path to the `CONNECTORS` list/array
3. Run the script

### Example Output

```
==================================================
Adding Search Boost to Connector Documentation
==================================================

ADDED boost to: reference/connectors/email-connector/email-connector-example.md
SKIPPED (already has boost): reference/connectors/jira-connector/jira-connector-overview.md
NOT FOUND: reference/connectors/old-connector/overview.md

==================================================
SUMMARY:
  Processed: 45
  Skipped: 5
  Not Found: 1
  Errors: 0
==================================================
```