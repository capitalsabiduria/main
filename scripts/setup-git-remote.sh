#!/usr/bin/env bash
set -euo pipefail

if [[ $# -ne 1 ]]; then
  echo "Usage: $0 <github-repo-url>"
  echo "Example: $0 https://github.com/your-org/your-repo.git"
  exit 1
fi

REMOTE_URL="$1"

if git remote get-url origin >/dev/null 2>&1; then
  git remote set-url origin "$REMOTE_URL"
  echo "Updated existing 'origin' remote to: $REMOTE_URL"
else
  git remote add origin "$REMOTE_URL"
  echo "Added 'origin' remote: $REMOTE_URL"
fi

echo "Current remotes:"
git remote -v
