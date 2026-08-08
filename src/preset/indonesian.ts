import { DataSet } from '../dataset/DataSet';
import type { RegExpMatcherOptions } from '../matcher/regexp/RegExpMatcher';
import { pattern } from '../pattern/Pattern';
import { collapseDuplicatesTransformer } from '../transformer/collapse-duplicates';
import { resolveConfusablesTransformer } from '../transformer/resolve-confusables';
import { resolveLeetSpeakTransformer } from '../transformer/resolve-leetspeak';
import { toAsciiLowerCaseTransformer } from '../transformer/to-ascii-lowercase';
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
 * Sample Indonesian profane words type.
 */
export type IndonesianProfaneWord =
	| 'anjing'
	| 'babi'
	| 'kontol'
	| 'ngentot'
	| 'jancok'
	| 'goblog'
	| 'pantat';

/**
 * A functional placeholder dataset of profane Indonesian words.
 */
export const indonesianDataset = new DataSet<{
	originalWord: IndonesianProfaneWord;
}>()
	.addPhrase((phrase) =>
		phrase
			.setMetadata({ originalWord: 'anjing' })
			.addPattern(pattern`|anj[i]ng|`)
			.addPattern(pattern`|anj[e]ng|`)
	)
	.addPhrase((phrase) =>
		phrase
			.setMetadata({ originalWord: 'babi' })
			.addPattern(pattern`|babi|`)
			.addWhitelistedTerm('babi guling')
	)
	.addPhrase((phrase) =>
		phrase
			.setMetadata({ originalWord: 'kontol' })
			.addPattern(pattern`|k[o]nt[o]l`)
			.addPattern(pattern`k[o]nt[o]l|`)
	)
	.addPhrase((phrase) =>
		phrase
			.setMetadata({ originalWord: 'ngentot' })
			.addPattern(pattern`|ng[e]nt[o]t|`)
			.addPattern(pattern`|d[i]ng[e]nt[o]t|`)
	)
	.addPhrase((phrase) =>
		phrase
			.setMetadata({ originalWord: 'jancok' })
			.addPattern(pattern`|janc[o]k|`)
			.addPattern(pattern`|c[o]k|`)
	)
	.addPhrase((phrase) =>
		phrase
			.setMetadata({ originalWord: 'goblog' })
			.addPattern(pattern`|g[o]bl[o]g|`)
			.addPattern(pattern`|g[o]bl[o]k|`)
	)
	.addPhrase((phrase) =>
		phrase
			.setMetadata({ originalWord: 'pantat' })
			.addPattern(pattern`|pantat|`)
			.addWhitelistedTerm('pantau')
	);

/**
 * Combined dataset containing both English and Indonesian profane words.
 */
export const multiLanguageDataset = new DataSet<{
	originalWord: string;
}>()
	.addAll(englishDataset)
	.addAll(indonesianDataset);

