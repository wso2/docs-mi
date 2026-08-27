#!/bin/bash

ALLOWED_PATTERNS=(
    "^en/docs/.*\.md$"                                      # Markdown documentation files
    "^en/docs/.*\.(yaml|yml)$"                              # API specifications (OpenAPI/Swagger), config files
    "^en/mkdocs\.yml$"                                      # Navigation config (only when adding new pages)
    "^en/docs/assets/img/.*\.(png|jpg|jpeg|gif|webp)$"      # Safe image formats (NO SVG - can contain JS)
)

# Get list of files staged for commit
STAGED_FILES=()
while IFS= read -r -d '' file; do
    STAGED_FILES+=("$file")
done < <(git diff --cached --name-only -z --diff-filter=ACMR)

if [ ${#STAGED_FILES[@]} -eq 0 ]; then
    exit 0
fi

echo "Pre-commit validation: Checking staged files against whitelist..."

# Check if all changes are within allowed patterns (whitelist enforcement)
INVALID_FOUND=false

for file in "${STAGED_FILES[@]}"; do
    ALLOWED=false

    for pattern in "${ALLOWED_PATTERNS[@]}"; do
        if echo "$file" | grep -qE "$pattern"; then
            ALLOWED=true
            break
        fi
    done

    if [ "$ALLOWED" = false ]; then
        echo "COMMIT BLOCKED: File outside allowed paths: $file"
        INVALID_FOUND=true
    fi
done

if [ "$INVALID_FOUND" = true ]; then
    echo ""
    echo "========================================"
    echo "COMMIT REJECTED - WHITELIST VIOLATION"
    echo "========================================"
    echo "You attempted to commit files that are NOT on the whitelist."
    echo ""
    echo "ONLY these file patterns are allowed:"
    for pattern in "${ALLOWED_PATTERNS[@]}"; do
        echo "  - $pattern"
    done
    echo ""
    echo "Examples of FORBIDDEN files (not exhaustive):"
    echo "  - .github/workflows/* (workflow files)"
    echo "  - en/requirements.txt (dependencies)"
    echo "  - en/hooks.py (executable Python code)"
    echo "  - *.svg files (can contain JavaScript)"
    echo "  - Any configuration files not explicitly allowed above"
    echo ""
    echo "Please unstage unauthorized files before committing."
    exit 1
fi

# Check for secrets in staged changes
echo ""
echo "Scanning for secrets in staged changes..."
SECRETS_FOUND=false

TEXT_FILES=()
for file in "${STAGED_FILES[@]}"; do
    if [ "$(git show ":$file" 2>/dev/null | LC_ALL=C tr -dc '\000' | wc -c | tr -d ' ')" -gt 0 ]; then
        continue
    fi
    TEXT_FILES+=("$file")
done

if [ ${#TEXT_FILES[@]} -eq 0 ]; then
    echo "No text files to scan for secrets"
    echo "Pre-commit validation passed"
    exit 0
fi

# Get the diff of staged changes
if ! STAGED_DIFF=$(git diff --cached --no-color -- "${TEXT_FILES[@]}"); then
    echo "COMMIT BLOCKED: Unable to read staged diff for secret scanning"
    exit 1
fi

ADDED_LINES=$(printf '%s\n' "$STAGED_DIFF" | awk '
    /^\+\+\+ /      { next }
    /^@@/           { inhunk = 1; next }
    /^diff /        { inhunk = 0; next }
    inhunk && /^\+/ { print substr($0, 2) }
')

# Check for common secret patterns
if echo "$ADDED_LINES" | grep -qE '(ghp_[a-zA-Z0-9]{36}|ghs_[a-zA-Z0-9]{36}|sk-[a-zA-Z0-9]{32,}|xox[baprs]-[a-zA-Z0-9-]+|(AKIA|ASIA)[0-9A-Z]{16}|-----BEGIN [A-Z ]*PRIVATE KEY( BLOCK)?-----)' || \
   echo "$ADDED_LINES" | grep -qiE '(password|secret|api[_-]?key|token)\s*[:=]\s*["\x27][^"\x27\s]{8,}["\x27]'; then
    echo "COMMIT BLOCKED: Potential secrets detected in staged changes"
    echo ""
    echo "Detected secret-like patterns in staged changes (content redacted for security)."
    echo "$ADDED_LINES" | grep -cE '(ghp_[a-zA-Z0-9]{36}|ghs_[a-zA-Z0-9]{36}|sk-[a-zA-Z0-9]{32,}|xox[baprs]-[a-zA-Z0-9-]+|(AKIA|ASIA)[0-9A-Z]{16}|-----BEGIN [A-Z ]*PRIVATE KEY( BLOCK)?-----)' || true
    echo "$ADDED_LINES" | grep -ciE '(password|secret|api[_-]?key|token)\s*[:=]\s*["\x27][^"\x27\s]{8,}["\x27]' || true
    SECRETS_FOUND=true
fi

if [ "$SECRETS_FOUND" = true ]; then
    echo ""
    echo "========================================"
    echo "COMMIT REJECTED - SECRETS DETECTED"
    echo "========================================"
    echo "Your staged changes contain potential secrets or API keys."
    echo "Please remove sensitive data before committing."
    exit 1
fi

echo "No secrets detected"
echo "Pre-commit validation passed"
exit 0
