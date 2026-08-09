"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.multiLanguageDataset = exports.indonesianDataset = exports.indonesianRecommendedTransformers = exports.indonesianRecommendedWhitelistMatcherTransformers = exports.indonesianRecommendedBlacklistMatcherTransformers = void 0;
const DataSet_1 = require("../dataset/DataSet");
const Pattern_1 = require("../pattern/Pattern");
const collapse_duplicates_1 = require("../transformer/collapse-duplicates");
const resolve_confusables_1 = require("../transformer/resolve-confusables");
const resolve_leetspeak_1 = require("../transformer/resolve-leetspeak");
const to_ascii_lowercase_1 = require("../transformer/to-ascii-lowercase");
const indonesian_words_json_1 = __importDefault(require("./data/indonesian-words.json"));
const english_1 = require("./english");
/**
 * Transformers to be used when matching blacklisted patterns with the
 * [[indonesianDataset | Indonesian word dataset]].
 */
exports.indonesianRecommendedBlacklistMatcherTransformers = [
    (0, resolve_confusables_1.resolveConfusablesTransformer)(),
    (0, resolve_leetspeak_1.resolveLeetSpeakTransformer)(),
    (0, to_ascii_lowercase_1.toAsciiLowerCaseTransformer)(),
    (0, collapse_duplicates_1.collapseDuplicatesTransformer)({
        defaultThreshold: 1,
        customThresholds: new Map([
            ['a', 2],
            ['b', 2],
            ['g', 2],
            ['k', 2],
            ['o', 2],
            ['e', 2],
            ['l', 2],
            ['s', 2],
        ]),
    }),
];
/**
 * Transformers to be used when matching whitelisted terms with the
 * [[indonesianDataset | Indonesian word dataset]].
 */
exports.indonesianRecommendedWhitelistMatcherTransformers = [
    (0, to_ascii_lowercase_1.toAsciiLowerCaseTransformer)(),
    (0, collapse_duplicates_1.collapseDuplicatesTransformer)({
        defaultThreshold: Number.POSITIVE_INFINITY,
        customThresholds: new Map([[' ', 1]]),
    }),
];
/**
 * Recommended transformers for the [[indonesianDataset]].
 */
exports.indonesianRecommendedTransformers = {
    blacklistMatcherTransformers: exports.indonesianRecommendedBlacklistMatcherTransformers,
    whitelistMatcherTransformers: exports.indonesianRecommendedWhitelistMatcherTransformers,
};
/**
 * Dataset of profane Indonesian words loaded from JSON.
 *
 * Note: Dynamic parseRawPattern() has a slight startup compilation overhead
 * compared to static TS ASTs, but allows storing words & whitelists cleanly in JSON.
 */
exports.indonesianDataset = new DataSet_1.DataSet();
for (const entry of indonesian_words_json_1.default) {
    exports.indonesianDataset.addPhrase((phrase) => {
        phrase.setMetadata({ originalWord: entry.originalWord });
        for (const pat of entry.patterns) {
            phrase.addPattern((0, Pattern_1.parseRawPattern)(pat));
        }
        if (entry.whitelistedTerms) {
            for (const term of entry.whitelistedTerms) {
                phrase.addWhitelistedTerm(term);
            }
        }
        return phrase;
    });
}
/**
 * Combined dataset containing both English and Indonesian profane words.
 */
exports.multiLanguageDataset = new DataSet_1.DataSet()
    .addAll(english_1.englishDataset)
    .addAll(exports.indonesianDataset);
