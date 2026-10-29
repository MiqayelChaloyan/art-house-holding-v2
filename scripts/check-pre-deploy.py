#!/usr/bin/env python3
"""
Pre-deploy SEO check — all Google Search Console issue categories + hreflang.

Usage:
  python3 scripts/check-pre-deploy.py                          # localhost (skips nginx)
  python3 scripts/check-pre-deploy.py http://localhost:3000 --skip-prod-only
  python3 scripts/check-pre-deploy.py https://arthouse.am      # production (all checks)
  python3 scripts/check-pre-deploy.py https://arthouse.am --workers 12

GSC URL lists: search-console/*.txt (one URL per line). Legacy .csv also accepted.
"""

from __future__ import annotations

import argparse
import csv
import re
import sys
import urllib.error
import urllib.request
import xml.etree.ElementTree as ET
from collections import Counter
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path
from typing import Literal
from urllib.parse import quote, unquote, urlparse

ROOT = Path(__file__).resolve().parents[1]
SC_DIR = ROOT / "search-console"
LOCALES = ("am", "en", "ru")
SITEMAP_NS = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
HEAD_SNIPPET_BYTES = 512_000
DEFAULT_TIMEOUT = 15

CheckResult = bool | None  # True=pass, False=fail, None=skipped

CANONICAL_TAG_RE = re.compile(
    r'<link[^>]+rel=["\']canonical["\'][^>]*>',
    re.IGNORECASE,
)
HREF_RE = re.compile(r'href=["\']([^"\']+)["\']', re.IGNORECASE)
HREFLANG_LINK_RE = re.compile(
    r'<link\b[^>]*\brel=["\']alternate["\'][^>]*>',
    re.IGNORECASE,
)
HREFLANG_HEADER_RE = re.compile(
    r'<([^>]+)>;\s*rel="alternate";\s*hreflang="([^"]+)"',
    re.IGNORECASE,
)
NOINDEX_RE = re.compile(r"noindex", re.IGNORECASE)
SOFT_404_RE = re.compile(
    r"page not found|404|lost in space|could not be found",
    re.IGNORECASE,
)

LEGACY_PATTERNS = (
    r"/designstudio/",
    r"/designstudio$",
    r"^/hy/",
    r"/lessons/",
    r"/_next/static/",
    r"\.html",
    r"/onl$",
    r"/orders$",
)
VALID_PAGE_PATTERNS = (
    r"/design/portfolios/",
    r"/design/orders/",
    r"/design/contact",
    r"/language/",
    r"/educational-center/",
    r"/design/price-list",
)

GSC_LISTS = {
    "5xx": "Server_error_(5xx)",
    "redirects": "Page_with_redirect",
    "soft-404": "Soft_404",
    "404": "Not_found_(404)",
    "duplicate-canonical": "Duplicate_without_user_selected_canonical",
    "not-indexed": "Crawled_currently_not_indexed",
}

HREFLANG_SAMPLE_PATHS = (
    "/am",
    "/en",
    "/ru",
    "/am/about",
    "/am/design",
    "/am/design/contact",
    "/am/design/portfolios",
    "/am/language",
    "/am/educational-center",
)


class NoFollowRedirect(urllib.request.HTTPErrorProcessor):
    def http_response(self, req, response):
        return response

    https_response = http_response


def is_local_base(base: str) -> bool:
    host = urlparse(base).hostname or ""
    return host in ("localhost", "127.0.0.1", "::1")


def load_url_list(stem: str) -> list[str] | None:
    for path in (SC_DIR / f"{stem}.txt", SC_DIR / f"{stem}.csv"):
        if not path.exists():
            continue
        if path.suffix == ".txt":
            urls: list[str] = []
            for line in path.read_text(encoding="utf-8").splitlines():
                line = line.strip()
                if line and not line.startswith("#") and line.lower() != "url":
                    urls.append(line)
            return urls
        urls = []
        with path.open(newline="", encoding="utf-8") as handle:
            reader = csv.reader(handle)
            next(reader, None)
            for row in reader:
                if row:
                    url = row[0].strip()
                    if url and url.lower() != "url":
                        urls.append(url)
        return urls
    return None


def to_local_url(base: str, url: str) -> str:
    parsed = urlparse(url)
    path = parsed.path or "/"
    if parsed.query:
        parts = []
        for pair in parsed.query.split("&"):
            if "=" in pair:
                key, _, value = pair.partition("=")
                parts.append(f"{quote(key, safe='')}={quote(value, safe='')}")
            else:
                parts.append(quote(pair, safe=""))
        path = f"{path}?{'&'.join(parts)}"
    return f"{base}{path}"


def fetch_head(
    url: str,
    *,
    timeout: int = DEFAULT_TIMEOUT,
) -> tuple[int, dict[str, str], str | None, str]:
    req = urllib.request.Request(
        url,
        headers={"User-Agent": "ArtHouse-PreDeploy/1.0"},
        method="HEAD",
    )
    opener = urllib.request.build_opener(NoFollowRedirect())
    try:
        with opener.open(req, timeout=timeout) as resp:
            headers = {k.lower(): v for k, v in resp.headers.items()}
            return resp.status, headers, headers.get("location"), resp.geturl()
    except urllib.error.HTTPError as e:
        headers = {k.lower(): v for k, v in e.headers.items()}
        return e.code, headers, headers.get("location"), e.geturl()
    except Exception as exc:
        return -1, {}, str(exc), url


def fetch_html_snippet(
    url: str,
    *,
    max_bytes: int = HEAD_SNIPPET_BYTES,
    timeout: int = DEFAULT_TIMEOUT,
) -> tuple[int, dict[str, str], str, str | None, str]:
    req = urllib.request.Request(
        url,
        headers={"User-Agent": "ArtHouse-PreDeploy/1.0"},
    )
    try:
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            headers = {k.lower(): v for k, v in resp.headers.items()}
            chunks: list[bytes] = []
            total = 0
            while total < max_bytes:
                chunk = resp.read(min(4096, max_bytes - total))
                if not chunk:
                    break
                chunks.append(chunk)
                total += len(chunk)
                if b"</head>" in b"".join(chunks).lower():
                    break
            body = b"".join(chunks).decode("utf-8", errors="replace")
            return resp.status, headers, body, headers.get("location"), resp.geturl()
    except urllib.error.HTTPError as e:
        try:
            body = e.read(HEAD_SNIPPET_BYTES).decode("utf-8", errors="replace")
        except Exception:
            body = ""
        headers = {k.lower(): v for k, v in e.headers.items()}
        return e.code, headers, body, headers.get("location"), e.geturl()
    except Exception as exc:
        return -1, {}, "", str(exc), url


def fetch_full(
    url: str,
    *,
    timeout: int = DEFAULT_TIMEOUT,
) -> tuple[int, dict[str, str], str, str | None, str]:
    req = urllib.request.Request(
        url,
        headers={"User-Agent": "ArtHouse-PreDeploy/1.0"},
    )
    opener = urllib.request.build_opener(NoFollowRedirect())
    try:
        with opener.open(req, timeout=timeout) as resp:
            body = resp.read().decode("utf-8", errors="replace")
            headers = {k.lower(): v for k, v in resp.headers.items()}
            return resp.status, headers, body, headers.get("location"), resp.geturl()
    except urllib.error.HTTPError as e:
        body = e.read().decode("utf-8", errors="replace")
        headers = {k.lower(): v for k, v in e.headers.items()}
        return e.code, headers, body, headers.get("location"), e.geturl()
    except Exception as exc:
        return -1, {}, "", str(exc), url


def extract_canonical(html: str) -> str | None:
    for tag in CANONICAL_TAG_RE.findall(html):
        match = HREF_RE.search(tag)
        if match:
            return match.group(1).strip().replace("&amp;", "&")
    return None


def extract_hreflangs(headers: dict[str, str], html: str = "") -> dict[str, str]:
    result: dict[str, str] = {}
    link_header = headers.get("link", "")
    if link_header:
        for part in link_header.split(","):
            part = part.strip()
            match = HREFLANG_HEADER_RE.search(part)
            if match:
                href = match.group(1).strip("<>")
                lang = match.group(2).lower()
                result[lang] = href
    if not result and html:
        for tag in HREFLANG_LINK_RE.findall(html):
            lang_match = re.search(r'hreflang=["\']([^"\']+)["\']', tag, re.I)
            href_match = HREF_RE.search(tag)
            if lang_match and href_match:
                result[lang_match.group(1).lower()] = href_match.group(1)
    return result


def classify(path: str, query: str) -> str:
    if query and ("name=" in query or "trk=" in query):
        return "legacy"
    if any(re.search(p, path) for p in LEGACY_PATTERNS):
        return "legacy"
    if "/comingSoon" in path:
        return "noindex"
    if any(re.search(p, path) for p in VALID_PAGE_PATTERNS):
        return "valid"
    return "other"


def normalize_path(url: str) -> str:
    return unquote(urlparse(url).path.rstrip("/") or "/")


def canonical_matches(path: str, canonical: str, expected: str, base: str, domain: str) -> bool:
    canonical_norm = canonical.replace("&amp;", "&").rstrip("/")
    expected_norm = expected.rstrip("/")
    canonical_path = canonical_norm
    for prefix in (domain, base, "http://localhost:3000"):
        if canonical_path.startswith(prefix):
            canonical_path = canonical_path[len(prefix) :] or "/"
            break
    return (
        canonical_norm == expected_norm
        or unquote(canonical_path) == unquote(path)
        or normalize_path(canonical_path) == normalize_path(path)
    )


def parse_sitemap_paths(body: str, base: str, domain: str) -> list[str]:
    root = ET.fromstring(body)
    paths: list[str] = []
    for url_el in root.findall(".//sm:url/sm:loc", SITEMAP_NS):
        if not url_el.text:
            continue
        loc = url_el.text.strip()
        for prefix in (domain, base):
            if loc.startswith(prefix):
                paths.append(loc[len(prefix) :] or "/")
                break
        else:
            paths.append(urlparse(loc).path or "/")
    return paths


def load_sitemap_paths(base: str, domain: str) -> tuple[list[str], str | None]:
    status, _, body, _, _ = fetch_html_snippet(f"{base}/sitemap.xml", max_bytes=512_000)
    if status != 200:
        err = f"HTTP {status}" if status != -1 else "connection refused"
        return [], err
    try:
        return parse_sitemap_paths(body, base, domain), None
    except ET.ParseError as exc:
        return [], f"invalid sitemap XML: {exc}"


def expected_hreflang_paths(pathname: str) -> dict[str, str]:
    if not re.match(r"^/(am|en|ru)(/|$)", pathname):
        return {}
    suffix = pathname[3:] if len(pathname) > 3 else ""
    return {loc: f"/{loc}{suffix}" for loc in LOCALES}


def section(title: str) -> None:
    print()
    print("=" * 60)
    print(title)
    print("=" * 60)


def ensure_server(base: str) -> None:
    status, _, _, _, _ = fetch_html_snippet(f"{base}/sitemap.xml", max_bytes=4096, timeout=8)
    if status == 200:
        return
    print()
    print(f"ERROR: Cannot reach {base}/sitemap.xml", end="")
    if status == -1:
        print(" (connection refused).")
    else:
        print(f" (HTTP {status}).")
    print()
    if is_local_base(base):
        print("Start the production build locally first:")
        print("  npm run build && npm run start")
        print("Then re-run:")
        print("  npm run check:pre-deploy")
    else:
        print("Check that the site is up and the deploy completed.")
    sys.exit(2)


def check_canonical_one(
    base: str,
    domain: str,
    path: str,
) -> tuple[str, Literal["ok", "skip", "fail"], str, str]:
    status, _, html, _, _ = fetch_html_snippet(f"{base}{path}")
    expected = f"{domain}{path}"
    if status != 200:
        return path, "skip", str(status), expected
    canonical = extract_canonical(html)
    if not canonical or canonical in (domain, f"{domain}/"):
        return path, "fail", canonical or "(missing)", expected
    if not canonical_matches(path, canonical, expected, base, domain):
        return path, "fail", canonical, expected
    return path, "ok", canonical, expected


def run_canonical(
    base: str,
    domain: str,
    paths: list[str],
    workers: int,
) -> CheckResult:
    section("1. Canonical tags (GSC: Alternate page with proper canonical)")
    if not paths:
        print("  SKIP — no sitemap paths")
        return None

    failed: list[tuple[str, str, str]] = []
    skipped = 0
    passed = 0
    done = 0
    total = len(paths)

    with ThreadPoolExecutor(max_workers=workers) as pool:
        futures = [pool.submit(check_canonical_one, base, domain, p) for p in paths]
        for future in as_completed(futures):
            done += 1
            if done % 25 == 0 or done == total:
                print(f"  Progress: {done}/{total}", flush=True)
            path, result, got, expected = future.result()
            if result == "skip":
                skipped += 1
            elif result == "fail":
                failed.append((path, got, expected))
            else:
                passed += 1

    print(f"  Sitemap URLs: {total}")
    print(f"  Passed:       {passed}")
    print(f"  Failed:       {len(failed)}")
    print(f"  Skipped:      {skipped} (non-200)")
    for path, got, expected in failed[:10]:
        print(f"    FAIL {path}")
        print(f"         got:      {got}")
        print(f"         expected: {expected}")
    if len(failed) > 10:
        print(f"    ... +{len(failed) - 10} more")
    return len(failed) == 0


def run_hreflang(base: str, domain: str, sitemap_paths: list[str]) -> CheckResult:
    section("2. Hreflang / locale alternates (International SEO)")
    paths = list(HREFLANG_SAMPLE_PATHS)
    for p in sitemap_paths[:15]:
        if p not in paths and re.match(r"^/(am|en|ru)(/|$)", p):
            paths.append(p)

    failed: list[str] = []
    for path in paths:
        status, headers, _, _ = fetch_head(f"{base}{path}")
        if status != 200:
            detail = "connection error" if status == -1 else f"HTTP {status}"
            failed.append(f"{detail} {path}")
            continue
        expected = expected_hreflang_paths(path)
        if not expected:
            continue
        found = extract_hreflangs(headers)
        if not found:
            status2, headers2, html, _, _ = fetch_html_snippet(f"{base}{path}")
            if status2 == 200:
                found = extract_hreflangs(headers2, html)
        for loc, exp_path in expected.items():
            href = found.get(loc)
            if not href:
                failed.append(f"missing hreflang={loc} on {path}")
                continue
            href_path = normalize_path(href)
            for prefix in (domain, base):
                if href.startswith(prefix):
                    href_path = normalize_path(href[len(prefix) :] or "/")
                    break
            if (
                unquote(href_path) != unquote(exp_path)
                and normalize_path(href_path) != normalize_path(exp_path)
            ):
                failed.append(
                    f"hreflang={loc} on {path}: got {href_path}, expected {exp_path}"
                )

    print(f"  Checked: {len(paths)} paths × {len(LOCALES)} locales")
    print(f"  Failed:  {len(failed)}")
    for line in failed[:15]:
        print(f"    {line}")
    if len(failed) > 15:
        print(f"    ... +{len(failed) - 15} more")
    return len(failed) == 0


def run_5xx(base: str) -> CheckResult:
    section("3. Server errors (GSC: 5xx)")
    urls = load_url_list(GSC_LISTS["5xx"])
    if urls is None:
        print(f"  SKIP — add search-console/{GSC_LISTS['5xx']}.txt")
        return None

    still_5xx: list[tuple[str, int]] = []
    counts: Counter[str] = Counter()
    for original in urls:
        local = to_local_url(base, original)
        status, _, _, _ = fetch_head(local)
        if status == -1:
            status, _, _, _, _ = fetch_html_snippet(local)
        if status >= 500:
            still_5xx.append((original, status))
        if status == -1:
            counts["error"] += 1
        elif status >= 500:
            counts["5xx"] += 1
        elif status >= 400:
            counts["4xx"] += 1
        elif status >= 300:
            counts["3xx"] += 1
        else:
            counts["2xx"] += 1

    print(f"  URLs: {len(urls)}")
    for key in ("2xx", "3xx", "4xx", "5xx", "error"):
        print(f"    {key}: {counts.get(key, 0)}")
    for original, status in still_5xx[:10]:
        print(f"    FAIL HTTP {status} {original}")
    return len(still_5xx) == 0 and counts.get("error", 0) == 0


def run_redirects(base: str) -> CheckResult:
    section("4. Redirects (GSC: Page with redirect)")
    urls = load_url_list(GSC_LISTS["redirects"])
    if urls is None:
        print(f"  SKIP — add search-console/{GSC_LISTS['redirects']}.txt")
        return None

    unexpected: list[str] = []
    for original in urls:
        local = to_local_url(base, original)
        status, _, location, _ = fetch_head(local)
        parsed = urlparse(original)
        if 300 <= status < 400:
            expected = (
                parsed.scheme == "http"
                or parsed.netloc.startswith("www.")
                or "//" in parsed.path
                or (parsed.path in ("", "/") and status in (301, 302, 307, 308))
            )
            if not expected:
                unexpected.append(f"{status} {original} -> {location}")
        elif status >= 400:
            unexpected.append(f"HTTP {status} {original}")

    print(f"  URLs: {len(urls)}")
    print(f"  Unexpected: {len(unexpected)}")
    for line in unexpected[:10]:
        print(f"    {line}")
    return len(unexpected) == 0


def run_soft_404(base: str) -> CheckResult:
    section("5. Soft 404")
    urls = load_url_list(GSC_LISTS["soft-404"])
    if urls is None:
        print(f"  SKIP — add search-console/{GSC_LISTS['soft-404']}.txt")
        return None

    soft: list[str] = []
    for original in urls:
        local = to_local_url(base, original)
        status, _, body, _, _ = fetch_html_snippet(local)
        if status == 200 and SOFT_404_RE.search(body):
            soft.append(original)

    print(f"  URLs: {len(urls)}")
    print(f"  Still soft 404: {len(soft)}")
    for url in soft:
        print(f"    {url}")
    return len(soft) == 0


def run_404(base: str) -> CheckResult:
    section("6. Not found (GSC: 404)")
    urls = load_url_list(GSC_LISTS["404"])
    if urls is None:
        print(f"  SKIP — add search-console/{GSC_LISTS['404']}.txt")
        return None

    still: list[str] = []
    for original in urls:
        local = to_local_url(base, original)
        status, _, _, _ = fetch_head(local)
        if status == 404:
            still.append(original)

    print(f"  URLs: {len(urls)}")
    print(f"  Still 404: {len(still)}")
    for url in still:
        print(f"    {url}")
    return len(still) == 0


def run_duplicate_canonical(base: str, domain: str) -> CheckResult:
    section("7. Duplicate without user-selected canonical")
    urls = load_url_list(GSC_LISTS["duplicate-canonical"])
    if urls is None:
        print(f"  SKIP — add search-console/{GSC_LISTS['duplicate-canonical']}.txt")
        return None

    failed: list[str] = []
    for original in urls:
        local = to_local_url(base, original)
        status, _, body, _, final_url = fetch_html_snippet(local)
        if status == 404:
            failed.append(f"404: {original}")
            continue
        canonical = extract_canonical(body)
        if "?" in final_url:
            failed.append(f"query string remains: {original}")
        elif not canonical:
            failed.append(f"missing canonical: {original}")
        else:
            final_path = normalize_path(final_url)
            canon_path = normalize_path(canonical)
            if canon_path != final_path and not canonical.startswith(domain + final_path):
                failed.append(f"mismatch: {original} final={final_path} canon={canonical}")

    print(f"  URLs: {len(urls)}")
    print(f"  Failed: {len(failed)}")
    for line in failed:
        print(f"    {line}")
    return len(failed) == 0


def run_not_indexed(base: str) -> CheckResult:
    section("8. Crawled — currently not indexed")
    urls = load_url_list(GSC_LISTS["not-indexed"])
    if urls is None:
        print(f"  SKIP — add search-console/{GSC_LISTS['not-indexed']}.txt")
        return None

    failed: list[str] = []
    for original in urls:
        local = to_local_url(base, original)
        parsed = urlparse(original)
        path = unquote(parsed.path)
        kind = classify(path, parsed.query)
        status, _, body, _, _ = fetch_html_snippet(local)

        if status == -1:
            failed.append(f"[error] {original}")
            continue
        if kind == "legacy":
            if status not in (301, 302, 307, 308) and status >= 400:
                failed.append(f"[legacy] HTTP {status} {original}")
            continue
        if kind == "noindex":
            if not NOINDEX_RE.search(body):
                failed.append(f"[noindex missing] {original}")
            continue
        if kind == "valid":
            if status == 404:
                failed.append(f"[404] {original}")
            elif status >= 400:
                failed.append(f"[{status}] {original}")
            elif status not in (301, 302, 307, 308) and not extract_canonical(body):
                failed.append(f"[no canonical] {original}")

    print(f"  URLs: {len(urls)}")
    print(f"  Failed: {len(failed)}")
    for line in failed[:15]:
        print(f"    {line}")
    if len(failed) > 15:
        print(f"    ... +{len(failed) - 15} more")
    return len(failed) == 0


def run_4xx(host: str) -> CheckResult:
    section("9. HTTP / 4xx (production nginx only)")
    urls = [
        f"http://{host}:443/",
        f"http://{host}/",
        f"http://{host}/am",
        f"http://{host}/en",
        f"http://{host}/ru",
        f"http://www.{host}/",
    ]
    failed: list[str] = []
    for url in urls:
        status, _, location, _ = fetch_head(url)
        if status >= 400:
            failed.append(f"HTTP {status} {url}")
        elif status in (301, 302, 307, 308):
            print(f"  OK {status} {url} -> {location}")

    print(f"  Failed: {len(failed)}")
    for line in failed:
        print(f"    {line}")
    if failed:
        print("  Fix on server 81.89.209.250: bash deploy/apply-nginx-497.sh")
    return len(failed) == 0


def main() -> None:
    parser = argparse.ArgumentParser(description="Art House pre-deploy SEO checks")
    parser.add_argument("base", nargs="?", default="http://localhost:3000")
    parser.add_argument(
        "domain",
        nargs="?",
        default="https://arthouse.am",
        help="Expected canonical domain (default: https://arthouse.am)",
    )
    parser.add_argument(
        "--skip-prod-only",
        action="store_true",
        help="Skip nginx 4xx check (default for localhost)",
    )
    parser.add_argument(
        "--include-prod-only",
        action="store_true",
        help="Run nginx 4xx check even on localhost",
    )
    parser.add_argument(
        "--workers",
        type=int,
        default=10,
        help="Parallel workers for sitemap canonical crawl (default: 10)",
    )
    args = parser.parse_args()

    base = args.base.rstrip("/")
    domain = args.domain.rstrip("/")
    host = urlparse(domain).netloc or "arthouse.am"
    skip_nginx = args.skip_prod_only or (is_local_base(base) and not args.include_prod_only)

    print("Art House — pre-deploy SEO check")
    print(f"  Fetch from:       {base}")
    print(f"  Canonical domain: {domain}")
    print(f"  Workers:          {args.workers}")
    if skip_nginx:
        print("  Nginx 4xx check:  skipped (use check:pre-deploy:prod for production)")
    if not SC_DIR.exists() or not any(SC_DIR.iterdir()):
        print(f"  GSC URL lists:    missing — add search-console/*.txt (see README.txt)")

    ensure_server(base)
    sitemap_paths, sitemap_err = load_sitemap_paths(base, domain)
    if sitemap_err:
        print(f"  Warning: sitemap reload issue: {sitemap_err}")
    print(f"  Sitemap paths:    {len(sitemap_paths)}")

    results: list[tuple[str, CheckResult]] = [
        ("canonical", run_canonical(base, domain, sitemap_paths, args.workers)),
        ("hreflang", run_hreflang(base, domain, sitemap_paths)),
        ("5xx", run_5xx(base)),
        ("redirects", run_redirects(base)),
        ("soft-404", run_soft_404(base)),
        ("404", run_404(base)),
        ("duplicate-canonical", run_duplicate_canonical(base, domain)),
        ("not-indexed", run_not_indexed(base)),
    ]
    if not skip_nginx:
        results.append(("4xx-nginx", run_4xx(host)))

    section("Summary")
    any_ran = False
    all_ok = True
    for name, ok in results:
        if ok is None:
            print(f"  [SKIP] {name}")
        elif ok:
            print(f"  [PASS] {name}")
            any_ran = True
        else:
            print(f"  [FAIL] {name}")
            any_ran = True
            all_ok = False

    print()
    if not any_ran:
        print("Only skipped checks — add search-console/*.txt and ensure server is running.")
        sys.exit(1)
    if all_ok:
        print("All run checks passed. Safe to deploy; then validate fixes in GSC.")
    else:
        print("Some checks failed. Fix before production deploy.")
        sys.exit(1)


if __name__ == "__main__":
    main()
