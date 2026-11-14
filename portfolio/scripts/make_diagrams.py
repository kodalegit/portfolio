"""Diagrams for the articles, written as theme-aware SVG.

The site inlines these files, so every colour is a CSS variable from
app/globals.css and the diagrams follow the light and dark themes. Titles and
subtitles live in the article as HTML, so they are dropped from the SVG.

Run from the portfolio folder (standard library only):
    python3 scripts/make_diagrams.py
"""
import re
from pathlib import Path

OUT = Path(__file__).resolve().parent.parent / "content" / "diagrams"
BLUE, BLUE_BG, ORANGE, ORANGE_BG = "var(--d-blue)", "var(--d-blue-bg)", "var(--d-orange)", "var(--d-blue-bg)"
INK, INK2, MUTED, LINE, PANEL = "var(--ink)", "var(--ink-2)", "var(--muted)", "var(--line-2)", "var(--d-panel)"
WHITE = "var(--surface)"
SCALE = 1.08  # Mona Sans is narrower than the DejaVu Sans these layouts were drawn for
TOP = 92  # everything above this was the title block


def svg(w, h, body):
    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 {TOP} {w} {h - TOP}" class="diagram-svg">
<defs>
  <marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="{INK2}"/></marker>
  <marker id="arrb" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="{BLUE}"/></marker>
  <marker id="arro" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="{ORANGE}"/></marker>
</defs>
{body}
</svg>"""


def text(x, y, s, size=15, color=INK, anchor="start", weight="normal", family=None):
    cls = ' class="dm"' if family else ""
    return f'<text x="{x}" y="{y}" font-size="{round(size * SCALE, 1)}" fill="{color}" text-anchor="{anchor}" font-weight="{weight}"{cls}>{s}</text>'


def box(x, y, w, h, lines, fill=PANEL, stroke=LINE, size=15, color=INK, sw=1.5, dash=None):
    d = f' stroke-dasharray="{dash}"' if dash else ""
    out = [f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="8" fill="{fill}" stroke="{stroke}" stroke-width="{sw}"{d}/>']
    lh = size * 1.35
    y0 = y + h / 2 - lh * (len(lines) - 1) / 2 + size * 0.35
    for i, ln in enumerate(lines):
        weight = "bold" if i == 0 and len(lines) > 1 else "normal"
        out.append(text(x + w / 2, y0 + i * lh, ln, size if i == 0 else size - 2, color if i == 0 else INK2, "middle", weight))
    return "\n".join(out)


def arrow(x1, y1, x2, y2, color=INK2, marker="arr", dash=None, path=None):
    d = f' stroke-dasharray="{dash}"' if dash else ""
    geom = path or f"M{x1},{y1} L{x2},{y2}"
    return f'<path d="{geom}" fill="none" stroke="{color}" stroke-width="2"{d} marker-end="url(#{marker})"/>'


def themeable(content, name):
    """Moves var() colours into style attributes, which every browser resolves,
    and gives marker ids a per-diagram suffix so several diagrams can share a page."""
    def fix(tag):
        t = tag.group(0)
        props = re.findall(r'\s(fill|stroke)="(var\([^)]*\))"', t)
        if not props:
            return t
        t = re.sub(r'\s(fill|stroke)="var\([^)]*\)"', "", t)
        style = ";".join(f"{k}:{v}" for k, v in props)
        return re.sub(r"(/?>)$", f' style="{style}"\\1', t, count=1)
    content = re.sub(r"<[a-z]+\b[^<>]*>", fix, content)
    for m in ("arr", "arrb", "arro"):
        content = content.replace(f'id="{m}"', f'id="{m}-{name}"').replace(f"url(#{m})", f"url(#{m}-{name})")
    return content


def write(folder, name, content):
    lines = content.split("\n")
    titles = [re.sub(r"<[^>]+>", "", l) for l in lines if re.match(r'<text x="40" y="(50|80)"', l)]
    content = "\n".join(l for l in lines if not re.match(r'<text x="40" y="(50|80)"', l))
    p = OUT / folder / f"{name}.svg"
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(themeable(content, name))
    print(f"{folder}/{name}: " + " / ".join(titles))


# --- Pelmio: repair turns versus the agent loop ----------------------------
def pelmio_flows():
    b = [text(40, 50, "Two designs for drafting an activity", 24, weight="bold"),
         text(40, 80, "Both end at the same compiler. Only a draft that compiles reaches the teacher.", 15, INK2)]
    # Lane 1
    b.append(text(40, 135, "Repair turns, adopted", 17, BLUE, weight="bold"))
    b.append(box(40, 155, 200, 80, ["Structured call", "instructions + notes"], BLUE_BG, BLUE))
    b.append(box(300, 155, 200, 80, ["Validator", "schema and rules"]))
    b.append(box(560, 155, 200, 80, ["Compiler", "checks against engine"]))
    b.append(box(820, 155, 160, 80, ["Teacher", "reviews draft"]))
    b += [arrow(240, 195, 298, 195), arrow(500, 195, 558, 195), arrow(760, 195, 818, 195)]
    b.append(text(789, 185, "pass", 13, INK2, "middle"))
    b.append(arrow(0, 0, 0, 0, ORANGE, "arro", path="M530,235 C530,290 140,290 140,237"))
    b.append(text(335, 300, "Findings go back in the same conversation. Up to 2 repair turns.", 14, ORANGE, "middle"))
    # Lane 2
    b.append(f'<line x1="40" y1="335" x2="980" y2="335" stroke="{LINE}" stroke-width="1"/>')
    b.append(text(40, 380, "Agent loop with engine tools, trialled", 17, INK2, weight="bold"))
    b.append(box(40, 400, 200, 80, ["Model", "up to 6 calls"], BLUE_BG, BLUE))
    b.append(box(40, 540, 200, 80, ["Read-only tools", "check results, find quotes"]))
    b.append(box(300, 400, 200, 80, ["Judge hook", "compiles each draft"]))
    b.append(box(560, 400, 200, 80, ["Compiler", "final check"]))
    b.append(box(820, 400, 160, 80, ["Teacher", "reviews draft"]))
    b += [arrow(120, 480, 120, 538), arrow(160, 540, 160, 482)]
    b.append(text(110, 515, "ask", 13, INK2, "end"))
    b.append(text(170, 515, "result", 13, INK2))
    b += [arrow(240, 440, 298, 440), arrow(500, 440, 558, 440), arrow(760, 440, 818, 440)]
    b.append(text(270, 430, "draft", 13, INK2, "middle"))
    b.append(text(530, 430, "pass", 13, INK2, "middle"))
    b.append(text(789, 430, "pass", 13, INK2, "middle"))
    b.append(arrow(0, 0, 0, 0, ORANGE, "arro", path="M400,480 C400,520 270,520 242,470"))
    b.append(text(420, 512, "findings", 13, ORANGE))
    b.append(text(300, 600, "Last call has no tools, so the model must submit a draft.", 14, INK2))
    b.append(text(300, 622, "At the limit, the best judged draft goes to the compiler.", 14, INK2))
    write("pelmio-agent-loops", "repair-vs-loop", svg(1020, 660, "\n".join(b)))


# --- Uwazo pgvector: HNSW filters after the index search -------------------
def hnsw_post_filter():
    b = [text(40, 50, "Why a per-user filter starves HNSW", 24, weight="bold"),
         text(40, 80, "The index returns ef_search = 40 candidates. Postgres applies the user filter afterwards.", 15, INK2)]
    mine = {6, 27}
    def row(y, label, owned, extra=""):
        out = [text(40, y - 30, label, 16, weight="bold")]
        for i in range(40):
            cx, cy = 60 + (i % 20) * 34, y + (i // 20) * 34
            fill, stroke = (BLUE, BLUE) if i in owned else (WHITE, MUTED)
            out.append(f'<circle cx="{cx}" cy="{cy}" r="11" fill="{fill}" stroke="{stroke}" stroke-width="1.5"/>')
        out.append(extra)
        return out
    b += row(150, "1. Index search: 40 nearest chunks from all users", mine)
    b.append(arrow(370, 210, 370, 255))
    b.append(text(385, 238, "where user_id = :user", 15, INK2, family="DejaVu Sans Mono, monospace"))
    b.append(text(40, 300, "2. After the filter: 2 rows left, the query wanted 5", 16, weight="bold"))
    for i in range(5):
        cx = 60 + i * 34
        if i < 2:
            b.append(f'<circle cx="{cx}" cy="330" r="11" fill="{BLUE}"/>')
        else:
            b.append(f'<circle cx="{cx}" cy="330" r="11" fill=WHITE stroke="{ORANGE}" stroke-width="1.5" stroke-dasharray="4 3"/>')
    b.append(text(240, 335, "3 missing results", 15, ORANGE))
    b.append(f'<circle cx="60" cy="390" r="8" fill="{BLUE}"/>')
    b.append(text(78, 395, "chunk owned by this user, about 1 in 40 with 40 users", 14, INK2))
    b.append(f'<line x1="40" y1="425" x2="740" y2="425" stroke="{LINE}"/>')
    b.append(text(40, 460, "With hnsw.iterative_scan = relaxed_order, the index keeps searching", 15, INK))
    b.append(text(40, 484, "until enough rows pass the filter. Recall stayed at 0.98 or above.", 15, INK))
    write("uwazo-pgvector", "hnsw-post-filter", svg(780, 510, "\n".join(b)))


# --- Uwazo branching: the message tree -------------------------------------
def message_tree():
    b = [text(40, 50, "One conversation, stored as a tree", 24, weight="bold"),
         text(40, 80, "The user sees the path from the active leaf back to the root.", 15, INK2)]
    W, H = 300, 64
    nodes = {
        "u1": (250, 120, ["u1  user", "Is VAT due on exported services?"], True),
        "a1": (60, 250, ["a1  assistant", "first answer"], False),
        "a2": (440, 250, ["a2  assistant", "regenerated answer"], True),
        "u2": (440, 380, ["u2  user", "What records prove the export?"], True),
        "a3": (440, 510, ["a3  assistant", "answer"], True),
    }
    def edge(p, c):
        px, py = nodes[p][0] + W / 2, nodes[p][1] + H
        cx, cy = nodes[c][0] + W / 2, nodes[c][1]
        on = nodes[p][3] and nodes[c][3]
        my = (py + cy) / 2
        return arrow(0, 0, 0, 0, BLUE if on else MUTED, "arrb" if on else "arr",
                     dash=None if on else "5 4", path=f"M{px},{py} C{px},{my} {cx},{my} {cx},{cy - 2}")
    for p, c in [("u1", "a1"), ("u1", "a2"), ("a2", "u2"), ("u2", "a3")]:
        b.append(edge(p, c))
    for k, (x, y, lines, on) in nodes.items():
        b.append(box(x, y, W, H, lines, BLUE_BG if on else WHITE, BLUE if on else MUTED, 15, sw=2 if on else 1.5,
                     dash=None if on else "5 4"))
    b.append(text(60 + W / 2, 345, "kept, reachable with the", 13, INK2, "middle"))
    b.append(text(60 + W / 2, 363, "&lt; 1/2 &gt; switcher on a2", 13, INK2, "middle"))
    b.append(text(600, 205, "regenerate adds a sibling", 13, INK2))
    b.append(box(790, 517, 170, 50, ["active_leaf_id = a3"], WHITE, INK2, 14))
    b.append(arrow(788, 542, 742, 542))
    b.append(text(40, 625, "Stored as a flat list. Each message has a parent_id.", 14, INK2))
    b.append(text(40, 647, "The model gets the same path: u1, a2, u2, a3.", 14, INK2))
    write("uwazo-branching", "message-tree", svg(1000, 670, "\n".join(b)))


# --- Uwazo branching: the id swap ------------------------------------------
def id_swap():
    b = [text(40, 50, "Swapping the temporary id", 24, weight="bold"),
         text(40, 80, "The server owns ids. The client switches to them before any later request.", 15, INK2)]
    CX, SX = 330, 790
    b.append(box(CX - 90, 105, 180, 46, ["Browser"], BLUE_BG, BLUE))
    b.append(box(SX - 90, 105, 180, 46, ["Server"]))
    for x in (CX, SX):
        b.append(f'<line x1="{x}" y1="151" x2="{x}" y2="600" stroke="{LINE}" stroke-width="2" stroke-dasharray="6 5"/>')
    def note(x, y, lines, anchor="start"):
        return "\n".join(text(x, y + i * 20, ln, 14, INK2 if i else INK, anchor) for i, ln in enumerate(lines))
    def msg(y, l2r, label, color=INK2, marker="arr"):
        x1, x2 = (CX, SX - 4) if l2r else (SX, CX + 4)
        return arrow(x1, y, x2, y, color, marker) + text((CX + SX) / 2, y - 10, label, 14, INK, "middle")
    mono = "DejaVu Sans Mono, monospace"
    b.append(note(40, 190, ["1. Show the message at once", "id = tmp-7f3, parent = a2"]))
    b.append(msg(260, True, "send  { parent_id: a2, content }"))
    b.append(note(SX + 15, 290, ["2. Save it", "id = u2"]))
    b.append(msg(345, False, "created  { id: u2 }", BLUE, "arrb"))
    b.append(note(40, 380, ["3. Replace tmp-7f3 with u2", "in the message id, in any child's", "parent_id, and in the active leaf"]))
    b.append(msg(480, False, "tokens for a3, parent u2"))
    b.append(msg(560, True, "regenerate  { parent_id: u2 }", BLUE, "arrb"))
    b.append(note(SX + 15, 590, ["Server finds u2"]))
    b.append(text(40, 640, "Before the fix, step 3 did not exist. A quick regenerate sent tmp-7f3, which the server had never seen.", 14, ORANGE))
    write("uwazo-branching", "id-swap-sequence", svg(1000, 665, "\n".join(b)))


# --- Uwazo agent design: current graph ---------------------------------------
def current_graph():
    b = [text(40, 50, "Uwazo's current research graph", 24, weight="bold"),
         text(40, 80, "A gatekeeper routes each message. Deep research is a separate agent behind a toggle.", 15, INK2)]
    b.append(box(40, 200, 150, 64, ["Message"]))
    b.append(box(240, 200, 170, 64, ["Gatekeeper", "action + complexity"], BLUE_BG, BLUE))
    b.append(arrow(190, 232, 238, 232))
    # Branches
    b.append(box(480, 110, 180, 56, ["Direct answer", "greetings, vague asks"]))
    b.append(box(480, 200, 150, 64, ["Planner", "list of searches"], BLUE_BG, BLUE))
    b.append(box(660, 200, 150, 64, ["Searches", "all at once"]))
    b.append(box(840, 200, 140, 64, ["Writer", "cites sources"], BLUE_BG, BLUE))
    b.append(box(480, 320, 330, 64, ["Deep research agent", "searches, reads, decides, repeats"], BLUE_BG, BLUE))
    b.append(arrow(0, 0, 0, 0, path="M410,222 C445,222 445,138 478,138"))
    b.append(arrow(410, 232, 478, 232))
    b.append(arrow(0, 0, 0, 0, path="M410,244 C445,244 445,352 478,352"))
    b.append(arrow(630, 232, 658, 232))
    b.append(arrow(810, 232, 838, 232))
    b.append(text(325, 330, "deep research on", 13, INK2, "middle"))
    b.append(text(40, 440, "Blue boxes are calls to the main model. Each web search adds summariser calls.", 14, INK2))
    b.append(text(40, 462, "The searches are planned before any result comes back.", 14, INK2))
    write("uwazo-agent-design", "current-graph", svg(1020, 490, "\n".join(b)))


# --- Uwazo agent design: proposed --------------------------------------------
def proposed_design():
    b = [text(40, 50, "Proposed: one agent by default, subagents for depth", 24, weight="bold"),
         text(40, 80, "The agent decides whether to search, and searches again when results are thin.", 15, INK2)]
    b.append(box(40, 150, 150, 64, ["Message"]))
    b.append(box(260, 140, 260, 84, ["Research agent", "writer's citation rules", "tool budget"], BLUE_BG, BLUE))
    b.append(arrow(190, 182, 258, 182))
    b.append(box(620, 150, 200, 64, ["Answer"]))
    b.append(arrow(520, 182, 618, 182))
    b.append(box(260, 290, 260, 56, ["Tools", "statutes, case law, web"]))
    b += [arrow(370, 224, 370, 288), arrow(410, 290, 410, 226)]
    b.append(text(360, 262, "search", 13, INK2, "end"))
    b.append(text(420, 262, "results", 13, INK2))
    b.append(f'<line x1="40" y1="390" x2="980" y2="390" stroke="{LINE}"/>')
    b.append(text(40, 430, "Deep research", 17, INK2, weight="bold"))
    b.append(box(40, 455, 260, 84, ["Research agent", "splits the question,", "writes from summaries"], BLUE_BG, BLUE))
    for i, y in enumerate((440, 520, 600)):
        b.append(box(420, y, 230, 56, [f"Subagent {i + 1}", "own tools, budget, context"], WHITE, BLUE))
        b.append(arrow(0, 0, 0, 0, BLUE, "arrb", path=f"M300,497 C360,497 360,{y + 28} 418,{y + 28}"))
    b.append(text(690, 502, "Each returns a short summary,", 14, INK2))
    b.append(text(690, 524, "so long search results stay out", 14, INK2))
    b.append(text(690, 546, "of the main conversation.", 14, INK2))
    b.append(text(40, 690, "Not yet tested. The default agent was tested as a prototype.", 14, ORANGE))
    write("uwazo-agent-design", "proposed-design", svg(1020, 715, "\n".join(b)))


# --- Pelmio eval lessons: the review loop -----------------------------------
def review_loop():
    b = [text(40, 50, "Review findings become checks", 24, weight="bold"),
         text(40, 80, "Every problem that becomes a check is one less thing for a person to look for.", 15, INK2)]
    b.append(box(40, 130, 170, 70, ["Draft", "from the AI model"], BLUE_BG, BLUE))
    b.append(box(270, 130, 220, 70, ["Automatic checks", "structure, quotes, answers"]))
    b.append(box(550, 130, 200, 70, ["Review", "a fixed list of questions"]))
    b.append(box(810, 130, 170, 70, ["Teacher", "approves"]))
    b += [arrow(210, 165, 268, 165), arrow(490, 165, 548, 165), arrow(750, 165, 808, 165)]
    b.append(text(519, 155, "pass", 13, INK2, "middle"))
    b.append(arrow(0, 0, 0, 0, ORANGE, "arro", path="M650,200 C650,280 380,280 380,203"))
    b.append(text(515, 300, "A problem review keeps finding becomes a new check", 14, ORANGE, "middle"))
    b.append(text(40, 360, "Became checks", 16, weight="bold"))
    for i, ln in enumerate(["Disagreement must be quoted from the source",
                            "No internal reference codes in what learners see",
                            "Feedback cannot mention results that never happened"]):
        b.append(text(40, 390 + i * 24, "- " + ln, 14, INK2))
    b.append(text(560, 360, "Still for a person", 16, weight="bold"))
    for i, ln in enumerate(["Does the problem feel realistic to a local learner?",
                            "Does the final question make learners think?",
                            "Would a teacher use this as is?"]):
        b.append(text(560, 390 + i * 24, "- " + ln, 14, INK2))
    write("pelmio-eval-lessons", "review-loop", svg(1020, 470, "\n".join(b)))


for f in (pelmio_flows, hnsw_post_filter, message_tree, id_swap, current_graph, proposed_design, review_loop):
    f()
print("diagrams written")
