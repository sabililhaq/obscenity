import { RegExpMatcher } from "../../src/matcher/regexp/RegExpMatcher";
import {
  indonesianRecommendedTransformers,
  multiLanguageDataset,
} from "../../src/preset/indonesian";

describe("indonesian + english multi-language preset", () => {
  const multiMatcher = new RegExpMatcher({
    ...multiLanguageDataset.build(),
    ...indonesianRecommendedTransformers,
  });

  it("should support multi language matching (English + Indonesian)", () => {
    expect(multiMatcher.hasMatch("you fucker")).toBe(true);
    expect(multiMatcher.hasMatch("dasar anjing")).toBe(true);
  });

  it("should match English and Indonesian terms in the same sentence", () => {
    expect(multiMatcher.hasMatch("you fucking bangsat")).toBe(true);
    expect(multiMatcher.hasMatch("what a bitch, dasar goblok")).toBe(true);
    expect(multiMatcher.hasMatch("stop watching bokep and porn")).toBe(true);
  });

  it("should match expanded Indonesian terms via multi-language dataset", () => {
    expect(multiMatcher.hasMatch("sontoloyo")).toBe(true);
    expect(multiMatcher.hasMatch("mampus")).toBe(true);
    expect(multiMatcher.hasMatch("haram jadah")).toBe(true);
    expect(multiMatcher.hasMatch("shit")).toBe(true);
    expect(multiMatcher.hasMatch("dick")).toBe(true);
  });

  it("should still respect Indonesian whitelists in multi-language mode", () => {
    expect(multiMatcher.hasMatch("babi guling")).toBe(false);
    expect(multiMatcher.hasMatch("sarapan")).toBe(false);
    expect(multiMatcher.hasMatch("Taiwan")).toBe(false);
  });
});
