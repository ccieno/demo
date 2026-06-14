# Cloudflare Access setup

`eno.solutions` is a Cloudflare Pages site. Access is enforced at the CDN edge — no changes to the HTML files are required. Cloudflare Access intercepts every request and redirects unauthenticated users to the Google SSO login page.

## Script setup

Create a Cloudflare API token with:

- Account scope: your Cloudflare account
- Permission: `Access: Apps and Policies Write`

Then run:

```sh
export CLOUDFLARE_API_TOKEN="..."
export ALLOW_EMAIL="your-email@example.com"
scripts/configure-access.sh
```

The script creates or updates:

- Self-hosted Access app: `eno.solutions`
- Allow policy: `Allow owner`
- Include rule: exact email from `ALLOW_EMAIL`
- `auto_redirect_to_identity: true` — users are sent straight to Google login

## Dashboard setup (alternative)

Cloudflare Zero Trust > Access > Applications > Add application:

- Type: Self-hosted
- Name: Eno Solutions Demo
- Domain: `eno.solutions`
- Policy action: Allow
- Include: Emails, `your-email@example.com`
- Session duration: 24 hours
- Enable: Auto-redirect to identity provider

## Sharing pages with prospects

To grant temporary access to a specific prospect, add their email (or email domain) to the policy's include list. For time-limited access, set a shorter session duration or use a separate "Bypass" policy for a specific path.

Alternatively, to share a single OPP page without requiring Google login for the prospect, you can create a Service Token and embed it in the URL using Cloudflare Access service auth — but the simplest option is to add their email to the allow list.
