import { RegExpMatcher } from "../../src/matcher/regexp/RegExpMatcher";
import {
  indonesianDataset,
  indonesianRecommendedTransformers,
} from "../../src/preset/indonesian";

describe("indonesian dataset & preset", () => {
  const indonesianMatcher = new RegExpMatcher({
    ...indonesianDataset.build(),
    ...indonesianRecommendedTransformers,
  });

  it("should match basic Indonesian profane words", () => {
    expect(indonesianMatcher.hasMatch("dasar anjing")).toBe(true);
    expect(indonesianMatcher.hasMatch("pantat")).toBe(true);
    expect(indonesianMatcher.hasMatch("goblok")).toBe(true);
    expect(indonesianMatcher.hasMatch("brengsek")).toBe(true);
    expect(indonesianMatcher.hasMatch("diancok")).toBe(true);
    expect(indonesianMatcher.hasMatch("sundal")).toBe(true);
    expect(indonesianMatcher.hasMatch("koplak")).toBe(true);
  });

  it("should handle Indonesian leetspeak variations", () => {
    expect(indonesianMatcher.hasMatch("4nj1n6")).toBe(true);
    expect(indonesianMatcher.hasMatch("k0nt0l")).toBe(true);
  });

  it("should handle non-ASCII Indonesian obfuscation", () => {
    expect(indonesianMatcher.hasMatch("𝓪𝓷𝓳𝓲𝓷𝓰")).toBe(true);
  });

  it("should handle repeated Indonesian letters", () => {
    expect(indonesianMatcher.hasMatch("anjiiiing")).toBe(true);
  });

  it("should respect whitelisted Indonesian phrases", () => {
    expect(indonesianMatcher.hasMatch("babi guling")).toBe(false);
    expect(indonesianMatcher.hasMatch("pantau")).toBe(false);
    expect(indonesianMatcher.hasMatch("Taiwan")).toBe(false);
  });
});
