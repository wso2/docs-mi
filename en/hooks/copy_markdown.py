import html as html_lib
import os
import fnmatch


def on_post_build(config, **kwargs):
    docs_dir = config["docs_dir"]
    site_dir = config["site_dir"]

    # Get exclude patterns from the exclude plugin config
    exclude_patterns = []
    plugins = config.get("plugins", {})
    if "exclude" in plugins:
        exclude_config = plugins["exclude"]
        if isinstance(exclude_config, dict) and "glob" in exclude_config:
            exclude_patterns = exclude_config["glob"]

    for root, _dirs, files in os.walk(docs_dir):
        for filename in files:
            if not filename.endswith(".md"):
                continue

            src = os.path.join(root, filename)
            rel = os.path.relpath(src, docs_dir)

            # Check if file matches any exclude pattern
            should_skip = False
            for pattern in exclude_patterns:
                if fnmatch.fnmatch(rel, pattern) or fnmatch.fnmatch(rel, f"{pattern}/*"):
                    should_skip = True
                    break
            if should_skip:
                continue

            dst_dir = os.path.join(site_dir, rel)
            # Remove any raw .md file that a previous hook may have created at this path
            if os.path.isfile(dst_dir):
                os.remove(dst_dir)
            os.makedirs(dst_dir, exist_ok=True)

            with open(src, encoding="utf-8") as f:
                content = f.read()

            page = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>{html_lib.escape(filename)}</title>
<style>
  body {{
    font-family: monospace;
    font-size: 0.85rem;
    line-height: 1.6;
    white-space: pre-wrap;
    word-break: break-word;
    padding: 1.5rem;
    margin: 0;
    color: #24292f;
    background: #ffffff;
  }}
</style>
</head>
<body>{html_lib.escape(content)}</body>
</html>"""

            with open(os.path.join(dst_dir, "index.html"), "w", encoding="utf-8") as f:
                f.write(page)
