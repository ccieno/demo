#!/usr/bin/env node
// update-pages.js
// Scans all HTML files in this directory, finds pages with "Zoom" or "ZM" in the title,
// strips the prefix, and rewrites the pages array in index.html.
// Run manually or automatically via the git pre-commit hook.

const fs = require('fs');
const path = require('path');

const dir = __dirname;
const indexPath = path.join(dir, 'index.html');

// Read all .html files except index.html
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') && f !== 'index.html');

const pages = [];

for (const file of files) {
  const content = fs.readFileSync(path.join(dir, file), 'utf8');
  const match = content.match(/<title>([^<]+)<\/title>/i);
  if (!match) continue;

  const title = match[1].trim();
  if (!/zoom|^zm\s/i.test(title)) continue;

  // Strip leading "Zoom & ", "Zoom and ", "ZM & ", "ZM and ", "Zoom - ", "Zoom " prefixes
  const label = title.replace(/^(zoom|zm)\s*(&|and|-)\s*/i, '').trim();

  pages.push({ label, file });
}

// Sort alphabetically by label
pages.sort((a, b) => a.label.localeCompare(b.label));

// Disambiguate duplicate labels by appending the filename
const labelCounts = {};
for (const p of pages) labelCounts[p.label] = (labelCounts[p.label] || 0) + 1;

for (const p of pages) {
  if (labelCounts[p.label] > 1) {
    p.label = `${p.label} (${p.file.replace('.html', '')})`;
  }
}

// Build the new pages array string
const indent = '      ';
const lines = pages.map(p => `${indent}{ label: "${p.label}", file: "${p.file}" },`);
const newArray = `    const pages = [\n${lines.join('\n')}\n    ];`;

// Replace the existing pages array in index.html
const indexContent = fs.readFileSync(indexPath, 'utf8');
const updated = indexContent.replace(/    const pages = \[[\s\S]*?\];/, newArray);

if (updated === indexContent) {
  console.log('update-pages: no changes needed.');
} else {
  fs.writeFileSync(indexPath, updated, 'utf8');
  console.log(`update-pages: updated ${pages.length} pages in index.html`);
}
