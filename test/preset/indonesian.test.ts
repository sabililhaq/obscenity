import { RegExpMatcher } from '../../src/matcher/regexp/RegExpMatcher';
import {
	indonesianDataset,
	indonesianRecommendedTransformers,
	multiLanguageDataset,
} from '../../src/preset/indonesian';

describe('indonesian dataset & preset', () => {
	const indonesianMatcher = new RegExpMatcher({
		...indonesianDataset.build(),
		...indonesianRecommendedTransformers,
	});

	const multiMatcher = new RegExpMatcher({
		...multiLanguageDataset.build(),
		...indonesianRecommendedTransformers,
	});

	it('should match basic Indonesian profane words', () => {
		expect(indonesianMatcher.hasMatch('dasar anjing')).toBe(true);
		expect(indonesianMatcher.hasMatch('pantat')).toBe(true);
	});

	it('should handle Indonesian leetspeak variations', () => {
		expect(indonesianMatcher.hasMatch('4nj1n6')).toBe(true);
		expect(indonesianMatcher.hasMatch('k0nt0l')).toBe(true);
	});

	it('should respect whitelisted Indonesian phrases', () => {
		expect(indonesianMatcher.hasMatch('babi guling')).toBe(false);
		expect(indonesianMatcher.hasMatch('pantau')).toBe(false);
	});

	it('should support multi language matching (English + Indonesian)', () => {
		expect(multiMatcher.hasMatch('you fucker')).toBe(true);
		expect(multiMatcher.hasMatch('dasar anjing')).toBe(true);
	});
});
