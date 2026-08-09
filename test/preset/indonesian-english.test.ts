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
});
