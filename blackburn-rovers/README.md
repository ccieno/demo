# Blackburn Rovers FC - co-browse demo

Four-page click-through of rovers.co.uk used to demo Zoom Contact Center
(ZVA chat, hand-off to an agent, then Cobrowse).

URL once deployed: `/blackburn-rovers/` (folder with `index.html`).

## Flow (click anywhere on a page to go to the next one)

| # | File | Source | Notes |
|---|------|--------|-------|
| 1 | `index.html` | `img/home.jpg` (screenshot) | Home. ZVA chat starts here. |
| 2 | `hospitality-faqs.html` | `img/hospitality-faqs.jpg` (screenshot) | Hospitality FAQs. |
| 3 | `executive-boxes.html` | real DOM, rebuilt from a saved page | **Cobrowse page.** Pricing accordions are open by default. |
| 4 | `matchday-itineraries.html` | real DOM, rebuilt from a saved page | **Cobrowse page.** Last page: click does nothing. |

Pages 1-2 are images because Cobrowse is not shown there. Pages 3-4 are real HTML
because Cobrowse mirrors the live DOM (a flat image would give the agent nothing to see).

## Zoom web tag

Each page has a `ZOOM-WEB-TAG-START/END` marker before `</body>`.

1. Paste your tag into `zoom-tag.html` (keep `data-enable-zcb="true"` for Cobrowse).
2. `python3 set-web-tag.py` writes it into all four pages. Safe to re-run.

Tenant prerequisites (Zoom docs, Configuring Zoom Cobrowse): Cobrowse enabled in
Contact Center > Preferences, enabled on the queue (Policy tab), ZCC Premium or Elite licence,
agent on a custom role with Cobrowse enabled.

## Click-through behaviour (`js/demo-nav.js`)

- Only clicks inside `#page` navigate, so the chat widget and Cobrowse invite/banner are never hijacked.
- Add `?nonav` to any URL to turn click-through off for that page load (handy for a rehearsal or
  when annotating without the customer accidentally moving on).
- Text selection does not trigger navigation.

## How pages 3-4 were made

Saved with the browser ("Save as MHTML"), then converted: CSS/images/fonts extracted into `assets/`,
scripts removed, cookie banner / accessibility widget / iframes removed, all links neutralised
(`href="#"`) so nothing leaves the demo (including eticketing.co.uk and Sodexo links),
images over 800 KB recompressed to WebP, and the JS-driven accordions opened.
Three images that lost their `src` when captured were restored from the saved page
(hero, "Book today", "Clayton & Douglas") and the matchday hero is cropped from `img/hospitality-faqs.jpg`.

## Known limits

- Menus, carousels and download buttons are static (no JS). That is deliberate: less to go wrong mid-demo.
- Home screenshot ends at the hospitality tiles (screenshot height limit); page background matches the cut.
- Not tested with a live Zoom tag: confirm Cobrowse keeps its session when moving page 3 -> 4.
