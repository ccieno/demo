# demo — Prospect Demo Pages

Branded demo pages for individual prospects. Each HTML file embeds the Zoom Contact Centre Web SDK pre-configured with a specific customer's branding.

**Deployed at:** `demo.eno.solutions` (publicly accessible, no SSO)

Previously served from `eno.solutions` — moved to `demo.eno.solutions` to free the apex domain and consolidate the subdomain architecture.

## What it does

Each page loads custom CSS with the prospect's brand colours and background image, fetches the ZCC SDK API key at runtime from a Cloudflare Worker (`zoom-sdk-config`), and renders the Zoom Contact Centre chat/voice widget in the prospect's brand context.

## Landing page

`index.html` — searchable hub page at `demo.eno.solutions/`. Type a company name to filter and navigate to any demo page.

## Demo pages

| File | Prospect |
|------|----------|
| `OPP-005231702.html` | Lawcris |
| `OPP-005479673.html` | NHS |
| `OPP-005508584.html` | Biocare |
| `OPP-005518825.html` | Calor |
| `OPP-005529040.html` | NHS |
| `OPP-005555945.html` | myDentist |
| `OPP-005561323.html` | Flint Bishop |
| `OPP-005571806.html` | NHS |
| `OPP-005574438.html` | NHS KCHFT |
| `OPP-005574438B.html` | NHS KCHFT (B) |
| `OPP-005577377.html` | On The Beach |
| `OPP-005577543.html` | WBAH |
| `OPP-005583108.html` | Brymec |
| `OPP-005584906.html` | Hudgells |
| `OPP-005586634.html` | Selective Marketplace |
| `OPP-005597471.html` | TFP |
| `OPP-005607616.html` | Freightlink |
| `OPP-005607656.html` | TH White |
| `OPP-005609360.html` | Training at Work |
| `OPP-005635215.html` | Oak Tyres |
| `bakery.html` | Bakery demo |
| `bettys.html` | Bettys and Taylors |
| `boswell.html` | Alan Boswell |
| `cameron.html` | Tara Group |
| `csg.html` | CSG |
| `expat.html` | Expat |
| `gamcare.html` | GamCare |
| `hotel.html` | Hotel demo |
| `itsm.html` | NHS ITSM |
| `majesty.html` | Majesty Apartments |
| `nanopore.html` | Oxford Nanopore Technologies |
| `nrla.html` | NRLA |
| `payhawk.html` | Payhawk |
| `spencer.html` | Spencer |
| `tropical.html` | Tropical Sky |
| `vulcan.html` | Vulcan Two |

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
├── prospect.html        # One file per prospect
├── img/                 # Prospect logos and background images
├── mancave-snooker/     # Mancave Snooker app privacy policy (served at privacy.eno.solutions/)
├── wrangler.jsonc       # Worker config — routes demo.eno.solutions/*
└── scripts/             # Legacy SSO scripts (no longer needed)
```
