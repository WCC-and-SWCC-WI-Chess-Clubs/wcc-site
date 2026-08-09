#!/bin/bash
# Usage:
#   ./build.sh               — build only (root-based, for Amplify / Docker / local nginx)
#   ./build.sh local         — build + deploy to local nginx at /usr/local/nginx/html/
#   ./build.sh docker        — build Docker image + run at http://localhost:8080
#   ./build.sh aws           — build + deploy to AWS Amplify
#
# Docker image:
#   docker build -t wcc .
#   docker run -p 8080:80 wcc
#   (The Dockerfile runs this same build internally.)
#
# Standalone site: deployed at the root of its own webserver, so this is
# a single `vite build` with base=/ — no sub-site path stripping needed.

set -e

DEPLOY="${1:-}"
AMPLIFY_APP_ID="d33fjpa788668a"
AMPLIFY_BRANCH="production"
AWS_PROFILE="wcc"
LOCAL_PORT="8080"

usage() {
  echo "Usage: $0 [local|docker|aws]"
  echo ""
  echo "  local   Build frontend and deploy to local nginx (/usr/local/nginx/html)"
  echo "  docker  Build fresh Docker image and run it"
  echo "  aws     Build, package, and redeploy to AWS Amplify"
  echo ""
  echo "When deploying to AWS, first run:  aws login --profile $AWS_PROFILE"
  echo ""
  exit 1
}

# ── Build ────────────────────────────────────────────────────────────
function app_build() {
    rm -rf build
    echo "Building WCC site (base=/)..."
    npm run build -- --base=/
    # vite writes straight to build/ (see vite.config.js outDir). Its output
    # modes can be owner-only (e.g. 600) depending on how this repo was
    # checked out. Normalize to world-readable so the webserver's own user
    # (nginx, docker, etc.) can actually serve everything — otherwise static
    # assets like PDFs 403 even though the SPA shell (index.html) loads fine
    # via try_files.
    find build -type d -exec chmod 755 {} \;
    find build -type f -exec chmod 644 {} \;
}

# ── Package ───────────────────────────────────────────────────────────
function app_package() {
    echo "Zipping build/ -> dist/wcc.zip..."
    rm -rf dist
    mkdir -p dist
    (cd build && zip -qr ../dist/wcc.zip .)
}

# ── Deploy targets ───────────────────────────────────────────────────
function cmd_local() {
    cp -a build/. /usr/local/nginx/html/
    echo "Deployed to local nginx"
}

function cmd_docker() {
    docker build -t wcc .
    docker rm -f wcc 2>/dev/null || true
    docker run -d -p $LOCAL_PORT:80 --name wcc wcc
    echo "Running at http://localhost:$LOCAL_PORT"
}

function cmd_aws() {
    AMPLIFY_APP_ID="${AMPLIFY_APP_ID:?Need AMPLIFY_APP_ID}"

    echo "Creating Amplify deployment..."
    DEPLOY_JSON=$(aws amplify create-deployment \
        --app-id "$AMPLIFY_APP_ID" \
        --branch-name "$AMPLIFY_BRANCH" \
        --profile $AWS_PROFILE \
        --output json)

    JOB_ID=$(echo "$DEPLOY_JSON" | python3 -c "import sys,json; print(json.load(sys.stdin)['jobId'])")
    ZIP_UPLOAD_URL=$(echo "$DEPLOY_JSON" | python3 -c "import sys,json; print(json.load(sys.stdin)['zipUploadUrl'])")

    echo "Uploading dist/wcc.zip (job $JOB_ID)..."
    curl -s -w "\nHTTP %{http_code}\n" \
        -H "Content-Type: application/zip" \
        --upload-file dist/wcc.zip \
        "$ZIP_UPLOAD_URL"

    echo "Starting deployment..."
    aws amplify start-deployment \
        --app-id "$AMPLIFY_APP_ID" \
        --branch-name "$AMPLIFY_BRANCH" \
        --job-id "$JOB_ID" \
        --profile $AWS_PROFILE \
        --output json

    echo "Deployment started (job $JOB_ID)!"
}

# ── Entry point ──────────────────────────────────────────────────────
[[ $# -ne 1 ]] && usage

app_build
app_package

case "$1" in
  local)  cmd_local  ;;
  docker) cmd_docker ;;
  aws)    cmd_aws    ;;
  *)      usage      ;;
esac
