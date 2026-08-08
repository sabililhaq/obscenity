import { DataSet } from '../dataset/DataSet';
import type { RegExpMatcherOptions } from '../matcher/regexp/RegExpMatcher';
import { parseRawPattern } from '../pattern/Pattern';
import { collapseDuplicatesTransformer } from '../transformer/collapse-duplicates';
import { resolveConfusablesTransformer } from '../transformer/resolve-confusables';
import { resolveLeetSpeakTransformer } from '../transformer/resolve-leetspeak';
import { toAsciiLowerCaseTransformer } from '../transformer/to-ascii-lowercase';
import wordsData from './data/indonesian-words.json';
import { englishDataset } from './english';

/**
 * Transformers to be used when matching blacklisted patterns with the
 * [[indonesianDataset | Indonesian word dataset]].
 */
export const indonesianRecommendedBlacklistMatcherTransformers = [
	resolveConfusablesTransformer(),
	resolveLeetSpeakTransformer(),
	toAsciiLowerCaseTransformer(),
	collapseDuplicatesTransformer({
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
export const indonesianRecommendedWhitelistMatcherTransformers = [
	toAsciiLowerCaseTransformer(),
	collapseDuplicatesTransformer({
		defaultThreshold: Number.POSITIVE_INFINITY,
		customThresholds: new Map([[' ', 1]]),
	}),
];

/**
 * Recommended transformers for the [[indonesianDataset]].
 */
export const indonesianRecommendedTransformers: Pick<
	RegExpMatcherOptions,
	'blacklistMatcherTransformers' | 'whitelistMatcherTransformers'
> = {
	blacklistMatcherTransformers: indonesianRecommendedBlacklistMatcherTransformers,
	whitelistMatcherTransformers: indonesianRecommendedWhitelistMatcherTransformers,
};

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
export const indonesianDataset = new DataSet<{
	originalWord: IndonesianProfaneWord;
}>();

for (const entry of wordsData) {
	indonesianDataset.addPhrase((phrase) => {
		phrase.setMetadata({ originalWord: entry.originalWord });

		for (const pat of entry.patterns) {
			phrase.addPattern(parseRawPattern(pat));
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
export const multiLanguageDataset = new DataSet<{
	originalWord: string;
}>()
	.addAll(englishDataset)
	.addAll(indonesianDataset);
