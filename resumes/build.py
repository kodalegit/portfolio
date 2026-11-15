"""Render each resume in content.py to HTML, then print it to PDF with headless Chromium.

    python3 resumes/build.py            # all resumes
    python3 resumes/build.py backend-engineer

Set CHROME to a Chromium binary if it is not found automatically.
"""

import glob
import os
import shutil
import subprocess
import sys
from html import escape
from pathlib import Path

from content import ARTICLES, CONTACT, EDUCATION, RESUMES, SITE, WRITING_FOR, WRITING_LINE

HERE = Path(__file__).parent
OUT = HERE / "out"

CSS = """
@page { size: A4; margin: 9mm 14mm 7mm; }
:root {
  --ink: #14171c; --ink-2: #3d444f; --muted: #646c78;
  --line: #e2e5ea; --line-2: #cdd2da; --accent: #2a78d6;
}
* { box-sizing: border-box; }
html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
body {
  margin: 0; color: var(--ink); background: #fff;
  font-family: "Mona Sans", system-ui, sans-serif;
  font-size: 9pt; line-height: 1.42;
  font-variant-ligatures: none; font-feature-settings: "liga" 0, "clig" 0;
}
a { color: inherit; text-decoration: none; }
.mono { font-family: "JetBrains Mono", ui-monospace, monospace; font-size: 8.2pt; letter-spacing: -0.01em; }

header { padding-bottom: 7pt; border-bottom: 1px solid var(--line-2); margin-bottom: 4pt; }
h1 { margin: 0; font-size: 21pt; line-height: 1; font-weight: 800; font-stretch: 125%; letter-spacing: -0.02em; }
.title { margin: 4pt 0 4pt; font-size: 11pt; font-weight: 600; color: var(--accent); }
.contact { margin: 0; color: var(--ink-2); }
.contact span { white-space: nowrap; }
.contact span + span::before { content: "·"; color: var(--line-2); margin: 0 6pt; }

section { margin-top: 7.5pt; }
h2 {
  margin: 0 0 4pt; font-size: 8.8pt; font-weight: 700; font-stretch: 112%;
  letter-spacing: 0.04em; text-transform: uppercase; color: var(--ink);
  display: flex; align-items: center; gap: 6pt; break-after: avoid;
}
h2::before { content: ""; width: 7pt; height: 5pt; border-radius: 1.5pt; background: var(--accent); flex: none; }
h2::after { content: ""; flex: 1; height: 1px; background: var(--line); order: 2; }
h2 .h2-link { order: 3; font-family: "JetBrains Mono", ui-monospace, monospace; font-size: 8.2pt;
  font-weight: 400; text-transform: none; letter-spacing: -0.01em; font-stretch: 100%; color: var(--accent); }

.post { margin-top: 4.5pt; break-inside: avoid; }
.post:first-of-type { margin-top: 0; }
.post-head { display: flex; justify-content: space-between; align-items: baseline; gap: 12pt; }
.post-head h3 { margin: 0; font-size: 9.4pt; font-weight: 650; }
.post-head h3 a { text-decoration: underline; text-decoration-color: var(--line-2); text-underline-offset: 0.18em; }
.post p { margin: 0.5pt 0 0; color: var(--ink-2); }

.summary { margin: 0; color: var(--ink-2); }

.skills { margin: 0; padding: 0; list-style: none; }
.skills li { padding: 0.2pt 0; color: var(--ink-2); }
.skills b { color: var(--ink); font-weight: 650; }

.job { margin-top: 5pt; break-inside: avoid; }
.job:first-of-type { margin-top: 0; }
.job-head { display: flex; justify-content: space-between; align-items: baseline; gap: 12pt; }
.job-head h3 { margin: 0; font-size: 10pt; font-weight: 650; }
.job-head h3 .org { font-weight: 700; font-stretch: 106%; }
.job-head h3 .sep { color: var(--line-2); margin: 0 4pt; font-weight: 400; }
.job-head h3 .role { font-weight: 550; color: var(--ink-2); }
.dates { color: var(--muted); white-space: nowrap; }
.url { color: var(--muted); font-weight: 400; margin-left: 3pt; }
ul.bullets { margin: 2pt 0 0; padding-left: 12pt; }
ul.bullets li { margin: 1pt 0; padding-left: 2pt; color: var(--ink-2); }
ul.bullets li::marker { color: var(--muted); }

.edu { display: flex; justify-content: space-between; }
.edu b { font-weight: 650; }
"""


def link(text, href):
    return f'<a href="{escape(href)}">{escape(text)}</a>'


def job(entry, name=None):
    heading = name or entry["org"]
    url = ""
    if "link" in entry:
        url = f' <span class="url mono">{link(*entry["link"])}</span>'
    bullets = "".join(f"<li>{escape(b)}</li>" for b in entry["bullets"])
    return f"""
<div class="job">
  <div class="job-head">
    <h3><span class="org">{escape(heading)}</span>{url}<span class="sep">|</span><span class="role">{escape(entry["role"])}</span></h3>
    <span class="dates mono">{escape(entry["dates"])}</span>
  </div>
  <ul class="bullets">{bullets}</ul>
</div>"""


def post(slug):
    a = ARTICLES[slug]
    return f"""
<div class="post">
  <div class="post-head">
    <h3>{link(a["title"], f"{SITE}/writing/{slug}")}</h3>
    <span class="dates mono">{escape(a["project"])}, {escape(a["date"])}</span>
  </div>
  <p>{escape(a["finding"])}</p>
</div>"""


def render(r):
    contact = [CONTACT["location"], CONTACT["phone"], link(CONTACT["email"], "mailto:" + CONTACT["email"])]
    contact_html = "".join(f"<span>{c}</span>" for c in contact)
    links_html = "".join(f"<span>{link(t, h)}</span>" for t, h in CONTACT["links"])
    skills = "".join(f"<li><b>{escape(k)}:</b> {escape(v)}</li>" for k, v in r["skills"])
    jobs = "".join(job(e) for e in r["experience"])
    p = r["project"]
    posts = "".join(post(slug) for slug in WRITING_FOR.get(r["key"], []))
    edu = "".join(f'<div class="edu"><span><b>{escape(d)}</b>, {escape(s)}</span></div>' for d, s in EDUCATION)
    return f"""<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<title>Victor Kimani, {escape(r["title"].split(" | ")[0])}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Mona+Sans:wdth,wght@75..125,200..900&family=JetBrains+Mono:wght@400;500&display=block" rel="stylesheet">
<style>{CSS}</style></head>
<body>
<header>
  <h1>Victor Kimani</h1>
  <p class="title">{escape(r["title"])}</p>
  <p class="contact">{contact_html}{links_html}</p>
</header>
<section><h2>Summary</h2><p class="summary">{escape(r["summary"] + WRITING_LINE)}</p></section>
<section><h2>Technical skills</h2><ul class="skills">{skills}</ul></section>
<section><h2>Experience</h2>{jobs}</section>
<section><h2>Writing <a class="h2-link" href="{SITE}/writing">victorkimani.com/writing</a></h2>{posts}</section>
<section><h2>Selected project</h2>{job(p, p["name"])}</section>
<section><h2>Education</h2>{edu}</section>
</body></html>"""


def find_chrome():
    if os.environ.get("CHROME"):
        return os.environ["CHROME"]
    for name in ("chromium", "chromium-browser", "google-chrome", "google-chrome-stable"):
        if shutil.which(name):
            return shutil.which(name)
    hits = sorted(glob.glob(os.path.expanduser("~/.cache/ms-playwright/chromium-*/chrome-linux*/chrome")))
    if hits:
        return hits[-1]
    sys.exit("No Chromium found. Set CHROME=/path/to/chrome.")


def main():
    OUT.mkdir(exist_ok=True)
    chrome = find_chrome()
    keys = sys.argv[1:] or list(RESUMES)
    for key in keys:
        html_path = OUT / f"{key}.html"
        pdf_path = OUT / f"Victor-Kimani-{key}.pdf"
        html_path.write_text(render({**RESUMES[key], "key": key}), encoding="utf-8")
        subprocess.run(
            [chrome, "--headless", "--disable-gpu", "--no-sandbox", "--no-pdf-header-footer",
             "--virtual-time-budget=15000", "--run-all-compositor-stages-before-draw",
             f"--print-to-pdf={pdf_path.resolve()}", html_path.resolve().as_uri()],
            check=True, capture_output=True,
        )
        print(pdf_path)


if __name__ == "__main__":
    main()
