#!/usr/bin/env bash
# Apply nginx fix for GSC http://arthouse.am:443/ (400 → 301)
#
# Usage (on PRODUCTION server — site runs at 81.89.209.250):
#   ssh user@81.89.209.250
#   cd /path/to/art-house-holding
#   bash deploy/apply-nginx-497.sh
#
# Or from laptop if you have SSH:
#   DEPLOY_HOST=user@81.89.209.250 bash deploy/apply-nginx-497.sh --remote
#
set -euo pipefail

PATCH_LINE='error_page 497 =301 https://arthouse.am$request_uri;'
NGINX_SITE="${NGINX_SITE:-/etc/nginx/sites-enabled/arthouse.am}"

apply_patch() {
  if [[ ! -f "$NGINX_SITE" ]]; then
    echo "ERROR: nginx site config not found: $NGINX_SITE"
    echo "Find it with: sudo nginx -T | grep -A2 'server_name arthouse'"
    echo "Then: NGINX_SITE=/path/to/config bash $0"
    exit 1
  fi

  if grep -q 'error_page 497' "$NGINX_SITE"; then
    echo "OK: error_page 497 already present in $NGINX_SITE"
  else
    echo "Adding error_page 497 to $NGINX_SITE ..."
    sudo sed -i "/listen.*443.*ssl/a\\    $PATCH_LINE" "$NGINX_SITE"
  fi

  if grep -q 'return 301 https://arthouse.am' "$NGINX_SITE"; then
    echo "OK: HTTP→HTTPS redirect already present"
  else
    echo "WARN: Add port 80 redirect manually:"
    echo "  return 301 https://arthouse.am\$request_uri;"
  fi

  sudo nginx -t
  sudo systemctl reload nginx || sudo service nginx reload
  echo "Done. Test from laptop: npm run check:gsc:4xx"
}

if [[ "${1:-}" == "--remote" ]]; then
  HOST="${DEPLOY_HOST:?Set DEPLOY_HOST=user@81.89.209.250}"
  ssh "$HOST" "NGINX_SITE='$NGINX_SITE' bash -s" < "$(dirname "$0")/apply-nginx-497.sh"
else
  apply_patch
fi
