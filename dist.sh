#!/bin/bash

# Deploy static website to S3
# Usage: ./dist.sh <bucket-name>
# Example: ./dist.sh my-website-bucket

set -e

BUCKET="${1}"

if [ -z "$BUCKET" ]; then
  echo "Usage: $0 <s3-bucket-name>"
  exit 1
fi

S3_TARGET="s3://${BUCKET}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "Deploying to ${S3_TARGET}..."

# Upload root-level files (non-recursive, files only)
aws s3 sync "${SCRIPT_DIR}" "${S3_TARGET}" \
  --exclude "*" \
  --include "*.html" \
  --include "*.txt" \
  --include "*.xml" \
  --include "*.ico" \
  --include "*.json" \
  --delete \
  --exclude "*/*" \
  --profile s3_deploy

# Upload content folders
for FOLDER in css downloads games images js; do
  if [ -d "${SCRIPT_DIR}/${FOLDER}" ]; then
    echo "  Syncing ${FOLDER}/..."
    aws s3 sync "${SCRIPT_DIR}/${FOLDER}" "${S3_TARGET}/${FOLDER}" --delete --profile s3_deploy
  else
    echo "  Skipping ${FOLDER}/ (not found)"
  fi
done

echo "Done."
