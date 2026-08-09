import { DataSet } from '../dataset/DataSet';
import type { RegExpMatcherOptions } from '../matcher/regexp/RegExpMatcher';
/**
 * Transformers to be used when matching blacklisted patterns with the
 * [[indonesianDataset | Indonesian word dataset]].
 */
export declare const indonesianRecommendedBlacklistMatcherTransformers: (import("..").SimpleTransformerContainer | import("..").StatefulTransformerContainer)[];
/**
 * Transformers to be used when matching whitelisted terms with the
 * [[indonesianDataset | Indonesian word dataset]].
 */
export declare const indonesianRecommendedWhitelistMatcherTransformers: (import("..").SimpleTransformerContainer | import("..").StatefulTransformerContainer)[];
/**
 * Recommended transformers for the [[indonesianDataset]].
 */
export declare const indonesianRecommendedTransformers: Pick<RegExpMatcherOptions, 'blacklistMatcherTransformers' | 'whitelistMatcherTransformers'>;
/**
 * Indonesian profane words type.
 */
export type IndonesianProfaneWord = string;
/**
 * Dataset of profane Indonesian words loaded from JSON.
 *
 * Note: Dynamic parseRawPattern() has a slight startup compilation overhead
 * compared to static TS ASTs, but allows storing words & whitelists cleanly in JSON.
 */
export declare const indonesianDataset: DataSet<{
    originalWord: IndonesianProfaneWord;
}>;
/**
 * Combined dataset containing both English and Indonesian profane words.
 */
export declare const multiLanguageDataset: DataSet<{
    originalWord: string;
}>;
