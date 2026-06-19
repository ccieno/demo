# demo — Prospect Demo Pages

Branded demo pages for individual prospects. Each HTML file embeds the Zoom Contact Centre Web SDK pre-configured with a specific customer's branding.

**Deployed at:** `demo.eno.solutions` (publicly accessible, no SSO)

Previously served from `eno.solutions` — moved to `demo.eno.solutions` to free the apex domain and consolidate the subdomain architecture.

## What it does

Each page loads custom CSS with the prospect's brand colours and background image, fetches the ZCC SDK API key at runtime from a Cloudflare Worker (`zoom-sdk-config`), and renders the Zoom Contact Centre chat/voice widget in the prospect's brand context.

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
2. Rename it to match the new opportunity
3. Update branding (background image, colours, title)
4. Set the correct `data-env` attribute (`us01` or `eu01`)
5. Add any prospect logo to the `img/` folder
6. Commit and push — Cloudflare deploys automatically

> **Note:** The API key is fetched at runtime from `zoom-sdk-config` — do not hardcode it in the HTML.

## DNS

Add a CNAME record in Cloudflare DNS:
- **Name:** `demo`
- **Target:** your Workers route (or `eno.solutions` if using a CNAME redirect)
- **Proxy:** enabled

## Structure

```
demo/
├── prospect.html      # One file per prospect
├── img/               # Prospect logos and background images
├── wrangler.jsonc     # Worker config — routes demo.eno.solutions/*
└── scripts/           # Legacy SSO scripts (no longer needed)
```
