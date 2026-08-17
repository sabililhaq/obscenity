# Research wordlists

These files are **not** used at runtime by the library. They exist only for
maintainer research (false-positive hunting, whitelist candidates, pattern
design).

## `english-words.txt`

Large English vocabulary list used by `search-words.js` (default dictionary).

## `indonesian-words.txt`

Pinned snapshot of the KBBI v6.1.0 raw headword list from
[aryakdaniswara/kbbi-v6-wordlist](https://github.com/aryakdaniswara/kbbi-v6-wordlist).

| Field | Value |
| --- | --- |
| Upstream repo | `https://github.com/aryakdaniswara/kbbi-v6-wordlist` |
| Pinned commit | `2f71c68296f07b89ad18376fed34355810c3c64b` |
| Upstream file | `all_entries_v6.1.0.txt` |
| Local file | `scripts/indonesian-words.txt` |
| Approx. lines | ~194,692 |
| SHA-256 | `1bcff38f4b61977a35884b75f1a14606804deba900bda3547897af73330773fc` |

### Re-fetch / verify pin

```bash
curl -sL \
  "https://raw.githubusercontent.com/aryakdaniswara/kbbi-v6-wordlist/2f71c68296f07b89ad18376fed34355810c3c64b/all_entries_v6.1.0.txt" \
  -o scripts/indonesian-words.txt

shasum -a 256 scripts/indonesian-words.txt
# expect: 1bcff38f4b61977a35884b75f1a14606804deba900bda3547897af73330773fc
```

### License / usage note

The list is extracted from KBBI material. Keep it for **local research and
tests** in this fork. Do not treat it as freely redistributable product data
without checking upstream and KBBI terms.

### Usage

```bash
# Interactive search (English, default)
node scripts/search-words.js
node scripts/search-words.js en

# Interactive search (Indonesian KBBI snapshot)
node scripts/search-words.js id

# Scan Indonesian profanity patterns for dictionary collisions
node scripts/research-indonesian-false-positives.js
```
