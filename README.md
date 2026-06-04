# demo — Prospect Demo Pages

A GitHub Pages site hosting bespoke, branded demo pages for individual prospects. Each HTML file embeds the Zoom Contact Centre Web SDK pre-configured with a specific customer's branding.

**Deployed at:** `eno.solutions`

## What it does

Each page (`OPP-XXXXXXX.html`) is a lightweight branded wrapper that loads the ZCC Web SDK and presents a demo experience tailored to a specific prospect or opportunity. Pages are named after Salesforce opportunity IDs for easy tracking.

## How it works

Each page:
1. Loads custom CSS to apply the prospect's brand colours and background image
2. Embeds the ZCC Web SDK script with a specific API key and environment (`us01`, `eu01`, etc.)
3. The SDK renders the Zoom Contact Centre chat/voice widget in the prospect's brand context

## Adding a new demo page

1. Duplicate an existing `OPP-XXXXXXX.html` file
2. Rename it to match the new opportunity ID
3. Update the branding (background image, colours, title)
4. Set the correct `data-apikey` and `data-env` attributes on the ZCC SDK script tag
5. Add any prospect logo to the `img/` folder
6. Commit and push — GitHub Pages deploys automatically

## Structure

```
demo/
├── OPP-XXXXXXX.html   # One file per prospect opportunity
├── img/               # Prospect logos and background images
└── CNAME              # Custom domain config (eno.solutions)
```
