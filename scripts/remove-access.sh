#!/usr/bin/env bash
set -euo pipefail

# Removes the Cloudflare Access application for eno.solutions,
# making the demo site publicly accessible without SSO.
# To re-enable SSO, run scripts/configure-access.sh.

ACCOUNT_ID="${ACCOUNT_ID:-b1311a3efb25667db13a32cf4760998f}"
APP_DOMAIN="${APP_DOMAIN:-eno.solutions}"

if [[ -z "${CLOUDFLARE_API_TOKEN:-}" ]]; then
  echo "Set CLOUDFLARE_API_TOKEN to a token with Access: Apps and Policies Write." >&2
  exit 1
fi

api() {
  local method="$1"
  local path="$2"
  curl -sS -X "$method" "https://api.cloudflare.com/client/v4$path" \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -H "Content-Type: application/json"
}

apps_path="/accounts/$ACCOUNT_ID/access/apps"
existing_app_id="$(api GET "$apps_path" | jq -r --arg domain "$APP_DOMAIN" '.result[]? | select(.domain == $domain) | .id' | head -n 1)"

if [[ -z "$existing_app_id" ]]; then
  echo "No Access application found for $APP_DOMAIN — already public."
  exit 0
fi

echo "Deleting Access application $existing_app_id for $APP_DOMAIN..."
response="$(api DELETE "$apps_path/$existing_app_id")"
echo "$response" | jq -e '.success == true' >/dev/null

echo "Done. https://$APP_DOMAIN is now publicly accessible (no SSO)."
echo "To re-enable SSO, run: scripts/configure-access.sh"
