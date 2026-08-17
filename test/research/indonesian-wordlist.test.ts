import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Smoke tests for the pinned KBBI research wordlist.
 * This file is for maintainer research tooling, not product runtime behavior.
 */
describe("pinned Indonesian research wordlist (KBBI snapshot)", () => {
  const wordlistPath = join(
    __dirname,
    "../../scripts/indonesian-words.txt",
  );

  // Pinned: aryakdaniswara/kbbi-v6-wordlist@2f71c68296f07b89ad18376fed34355810c3c64b
  const expectedSha256 =
    "1bcff38f4b61977a35884b75f1a14606804deba900bda3547897af73330773fc";

  it("exists under scripts/", () => {
    expect(existsSync(wordlistPath)).toBe(true);
  });

  it("matches the pinned commit checksum", () => {
    const buf = readFileSync(wordlistPath);
    const hash = createHash("sha256").update(buf).digest("hex");
    expect(hash).toBe(expectedSha256);
  });

  it("contains expected vocabulary useful for whitelist research", () => {
    const words = new Set(
      readFileSync(wordlistPath, "utf8")
        .split("\n")
        .map((w) => w.trim().toLowerCase())
        .filter(Boolean),
    );

    // Legitimate words that often collide with short Indonesian patterns.
    expect(words.has("sarapan")).toBe(true); // vs sarap
    expect(words.has("asuransi")).toBe(true); // vs asu
    expect(words.has("pantau")).toBe(true); // vs pantat
    expect(words.has("detail")).toBe(true); // vs tai
  });

  it("supports substring search like search-words.js", () => {
    const lines = readFileSync(wordlistPath, "utf8")
      .split("\n")
      .map((w) => w.trim())
      .filter(Boolean);

    const needle = "sarap";
    const hits = lines.filter((w) => w.toLowerCase().includes(needle));
    expect(hits.some((w) => w.toLowerCase() === "sarapan")).toBe(true);
    expect(hits.length).toBeGreaterThan(1);
  });
});
