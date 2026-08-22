#!/usr/bin/env bash
set -euo pipefail

PROJECT_DIR="/home/ubuntu/veterinary-clinic-demo"
PUBLIC_VARS=(
  VITE_APP_ID
  OAUTH_SERVER_URL
  VITE_OAUTH_PORTAL_URL
  OWNER_OPEN_ID
  OWNER_NAME
  BUILT_IN_FORGE_API_URL
  VITE_FRONTEND_FORGE_API_URL
  GOOGLE_APPS_SCRIPT_INTAKE_URL
  VITE_ANALYTICS_ENDPOINT
  VITE_ANALYTICS_WEBSITE_ID
  VITE_APP_LOGO
  VITE_APP_TITLE
)
SECRET_VARS=(
  DATABASE_URL
  JWT_SECRET
  BUILT_IN_FORGE_API_KEY
  VITE_FRONTEND_FORGE_API_KEY
  APPOINTMENT_INTAKE_SECRET
)

add_var() {
  local name="$1"
  local target="$2"
  local value="${!name-}"
  if [[ -z "$value" ]]; then
    printf 'Skipping unavailable variable: %s\n' "$name" >&2
    return 0
  fi

  if [[ "$target" == "production" || "$target" == "preview" ]]; then
    printf '%s' "$value" | pnpm dlx vercel env add "$name" "$target" --scope keion-cmds-projects --sensitive --yes >/dev/null
  else
    printf '%s' "$value" | pnpm dlx vercel env add "$name" "$target" --scope keion-cmds-projects --yes >/dev/null
  fi
}

cd "$PROJECT_DIR"
for target in production preview development; do
  for name in "${PUBLIC_VARS[@]}"; do
    add_var "$name" "$target"
  done
  for name in "${SECRET_VARS[@]}"; do
    add_var "$name" "$target"
  done
done

printf 'Vercel environment synchronization completed without printing values.\n'
