# demo — v2

A GitHub Pages site hosting bespoke, branded demo pages for individual prospects. Each HTML file embeds the Zoom Contact Centre Web SDK pre-configured with a specific customer's branding.

**Deployed at:** `eno.solutions`

## What it does

Each pageis a lightweight branded wrapper that loads the ZCC Web SDK and presents a demo experience tailored to a specific prospect or opportunity. Pages are named after Salesforce opportunity IDs for easy tracking.

## How it works today 14.6.26

Each page:
1. Loads custom CSS to apply the prospect's brand colours and background image
2. Fetches the ZCC SDK API key at runtime from a Cloudflare Worker (`zoom-sdk-config.github-b13.workers.dev/config`) — the key is never stored in the HTML source
3. Dynamically injects the ZCC Web SDK script tag with the retrieved key and the appropriate environment (`us01`, `eu01`, etc.)
4. The SDK renders the Zoom Contact Centre chat/voice widget in the prospect's brand context

## Demo pages

| File | Prospect |
|------|----------|
| `bettys.html` | Bettys and Taylors |
| `boswell.html` | Boswell |
| `nanopore.html` | Oxford Nanopore Technologies |
| `bakery.html` | Bakery demo |
| `hotel.html` | Hotel demo |
| `gamcare.html` | GamCare |
| `nrla.html` | NRLA |
| `expat.html` | Expat |
| `tropical.html` | Tropical |
| `csg.html` | CSG |
| `cameron.html` | Cameron |
| `payhawk.html` | Payhawk |
| `itsm.html` | ITSM demo |
| `spencer.html` | Spencer |
| `vulcan.html` | Vulcan |

## Adding a new page

1. Duplicate an existing html file
2. Rename it to match the new opportunity ID
3. Update the branding (background image, colours, title)
4. Set the correct `data-env` attribute in the script block (e.g. `us01` or `eu01`)
5. Add any prospect logo to the `img/` folder
6. Commit and push — GitHub Pages deploys automatically

> **Note:** The API key is fetched dynamically from the Cloudflare Worker — do not hardcode it in the HTML.

## Access / SSO

`eno.solutions` is **publicly accessible** — no Google SSO is required. Demo pages are shared directly with prospects via URL.

To re-enable Google SSO (e.g. for internal use):

```sh
export CLOUDFLARE_API_TOKEN="..."
export ALLOW_EMAIL="your-email@example.com"
scripts/configure-access.sh
```

To remove SSO again:

```sh
export CLOUDFLARE_API_TOKEN="..."
scripts/remove-access.sh
```

Both scripts require a Cloudflare API token with `Access: Apps and Policies Write` permission.

## Structure

```
demo/
├── prospect.html      # One file per prospect opportunity
├── img/               # Prospect logos and background images
├── scripts/
│   ├── configure-access.sh  # Enable Google SSO via Cloudflare Access
│   └── remove-access.sh     # Remove SSO (make site public)
└── CNAME              # Custom domain config (eno.solutions)
```
