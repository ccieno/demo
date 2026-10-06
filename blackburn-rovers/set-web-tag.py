#!/usr/bin/env python3
"""Paste your Zoom Contact Center web tag into every page of this demo.

1. Put the tag (the <script ... data-apikey=... data-env=... src=...></script> block
   copied from Admin > CX management > Campaign Management > Embed Web Tag) in zoom-tag.html.
   Remember to add data-enable-zcb="true" if you want Cobrowse (see README).
2. Run:  python3 set-web-tag.py
Safe to re-run: it only replaces what sits between the ZOOM-WEB-TAG markers.
"""
import glob, os, re, sys
here = os.path.dirname(os.path.abspath(__file__))
tag = open(os.path.join(here, 'zoom-tag.html'), encoding='utf-8').read().strip()
if 'your_apikey' in tag:
    sys.exit('zoom-tag.html still has the placeholder - paste your real web tag first.')
pat = re.compile(r'(<!-- ZOOM-WEB-TAG-START -->).*?(<!-- ZOOM-WEB-TAG-END -->)', re.S)
for f in sorted(glob.glob(os.path.join(here, '*.html'))):
    if os.path.basename(f) == 'zoom-tag.html': continue
    s = open(f, encoding='utf-8').read()
    n, c = pat.subn(lambda m: m.group(1) + '\n' + tag + '\n' + m.group(2), s)
    if c: open(f, 'w', encoding='utf-8').write(n); print('updated', os.path.basename(f))
