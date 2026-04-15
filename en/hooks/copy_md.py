import os

# Global tracker for llms.txt files
ALL_PAGES = []

def on_pre_build(config):
    global ALL_PAGES
    ALL_PAGES = []

def on_post_page(output, page, config):
    rel_url = page.file.src_path
    if not any(p["url"] == rel_url for p in ALL_PAGES):
        ALL_PAGES.append({"title": page.title, "url": rel_url})

def on_post_build(config):
    # Generating docs for Micro Integrator
    llms_path = os.path.join(config['site_dir'], "llms.txt")
    lines = [
        "# WSO2 Micro Integrator Documentation",
        "> Optimized for AI agents, LLMs, and developers",
        "",
        "## Site Map",
        "- [Comprehensive file index](./llms-full.txt)"
    ]
    with open(llms_path, "w", encoding="utf-8") as f:
        f.write("\n".join(lines))

    full_path = os.path.join(config['site_dir'], "llms-full.txt")
    full_lines = ["# WSO2 Micro Integrator - Full Document Index", ""]
    for p in sorted(ALL_PAGES, key=lambda x: x['url']):
        full_lines.append(f"- [{p['title']}](./{p['url']})")
    with open(full_path, "w", encoding="utf-8") as f:
        f.write("\n".join(full_lines))
    print(f"SUCCESS - llms.txt and llms-full.txt generated.")
