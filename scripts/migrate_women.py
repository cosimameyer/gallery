#!/usr/bin/env python3
"""
Migrate content/amazing-women-in-tech/index.md to per-person directory structure.
Merges gallery bio text with metadata from community-bots/metadata/events.json.

Creates:
  content/amazing-women-in-tech/<slug>/index.md   ← all metadata
  (images are moved separately via git mv)

Run from the gallery repo root.
"""

import json
import re
import sys
from pathlib import Path

import yaml

GALLERY_ROOT = Path(__file__).parent.parent
EVENTS_JSON = Path("/Users/cosima/Downloads/own_projects/community-bots/metadata/events.json")
WOMEN_DIR = GALLERY_ROOT / "content/amazing-women-in-tech"
INDEX_MD = WOMEN_DIR / "index.md"


# ── YAML helpers ─────────────────────────────────────────────────────────────

class _LiteralStr(str):
    """Marks a string for YAML literal-block scalar (|) output."""


def _literal_representer(dumper, data):
    return dumper.represent_scalar("tag:yaml.org,2002:str", data, style="|")


yaml.add_representer(_LiteralStr, _literal_representer, Dumper=yaml.SafeDumper)


def _safe_dump(data: dict) -> str:
    return yaml.dump(data, Dumper=yaml.SafeDumper, allow_unicode=True,
                     default_flow_style=False, sort_keys=False)


# ── Parsing helpers ───────────────────────────────────────────────────────────

def parse_frontmatter(path: Path) -> dict:
    text = path.read_text()
    parts = text.split("---")
    if len(parts) < 3:
        raise ValueError(f"No frontmatter found in {path}")
    return yaml.safe_load(parts[1])


def title_to_name_bio(title: str) -> tuple[str, str]:
    """Split 'Name<br><br>✨ line1<br>✨ line2' → (name, bio_gallery)."""
    if "<br><br>" not in title:
        return title.strip(), ""
    name_part, bio_part = title.split("<br><br>", 1)
    name = name_part.strip()
    lines = [l.strip() for l in re.split(r"<br\s*/?>", bio_part) if l.strip()]
    return name, _LiteralStr("\n".join(lines))


def slug_from_src(src: str) -> str:
    return Path(src).stem


# ── Main ──────────────────────────────────────────────────────────────────────

def main() -> None:
    # Load events.json
    events: list[dict] = json.loads(EVENTS_JSON.read_text())
    events_by_name: dict[str, dict] = {}
    events_by_slug: dict[str, dict] = {}
    for ev in events:
        events_by_name[ev["name"].lower().strip()] = ev
        img_slug = Path(ev["img"]).stem.replace("_small", "")
        events_by_slug[img_slug] = ev

    # Parse index.md frontmatter
    fm = parse_frontmatter(INDEX_MD)
    resources: list[dict] = fm.get("resources", [])

    git_mv: list[str] = []

    for res in resources:
        src = res.get("src", "")
        params = res.get("params") or {}

        # Skip the cover image
        if params.get("cover"):
            continue

        slug = slug_from_src(src)
        title = res.get("title") or ""
        name, bio_gallery = title_to_name_bio(title)
        alt = params.get("alt", "")

        # Look up events.json (try slug first, then display name)
        ev = events_by_slug.get(slug) or events_by_name.get(name.lower().strip())

        date = ev["date"] if ev else ""
        bluesky = ev.get("bluesky", "") if ev else ""
        wiki_link = ev.get("wiki_link", "") if ev else ""

        desc_bluesky = ev.get("description_bluesky", "") if ev else ""
        desc_mastodon = ev.get("description_mastodon", "") if ev else ""

        bio_bluesky = _LiteralStr(desc_bluesky) if desc_bluesky else ""
        bio_mastodon = _LiteralStr(desc_mastodon) if desc_mastodon else ""

        # Create person directory
        person_dir = WOMEN_DIR / slug
        person_dir.mkdir(exist_ok=True)

        # Build frontmatter
        person_fm = {
            "name": name,
            "anniversary": date,
            "alt": alt,
            "wiki_link": wiki_link,
            "bluesky": bluesky,
            "bio_gallery": bio_gallery,
            "bio_bluesky": bio_bluesky,
            "bio_mastodon": bio_mastodon,
        }

        index_path = person_dir / "index.md"
        index_path.write_text(f"---\n{_safe_dump(person_fm)}---\n")
        print(f"✓  {index_path.relative_to(GALLERY_ROOT)}")

        git_mv.append(
            f"git mv content/amazing-women-in-tech/{src} "
            f"content/amazing-women-in-tech/{slug}/{src}"
        )

    print(f"\n# Run these git mv commands next:\n")
    for cmd in git_mv:
        print(cmd)


if __name__ == "__main__":
    main()
