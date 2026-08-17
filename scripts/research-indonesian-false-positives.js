/**
 * Research helper: for each Indonesian profanity pattern, list KBBI headwords
 * that contain the same core letters (candidate false positives / whitelist).
 *
 * Usage:
 *   node scripts/research-indonesian-false-positives.js
 *   node scripts/research-indonesian-false-positives.js --needle=tai
 *   node scripts/research-indonesian-false-positives.js --limit=20
 *
 * Not part of the published package runtime.
 */

const fs = require('fs');
const { join } = require('path');

const args = Object.fromEntries(
	process.argv.slice(2).map((a) => {
		const m = /^--([^=]+)=(.*)$/.exec(a);
		return m ? [m[1], m[2]] : [a.replace(/^--/, ''), true];
	}),
);

const limit = Number(args.limit || 30);
const onlyNeedle = args.needle ? String(args.needle).toLowerCase() : null;

const wordlistPath = join(__dirname, 'indonesian-words.txt');
const datasetPath = join(__dirname, '../src/preset/data/indonesian-words.json');

if (!fs.existsSync(wordlistPath)) {
	console.error('Missing scripts/indonesian-words.txt — see scripts/SOURCES.md');
	process.exit(1);
}

const words = fs
	.readFileSync(wordlistPath, 'utf8')
	.split('\n')
	.map((w) => w.trim())
	.filter(Boolean);

const dataset = JSON.parse(fs.readFileSync(datasetPath, 'utf8'));

/** Turn pattern syntax into a rough alphabetic needle, e.g. "|anj[i]ng|" → "anjing". */
function patternToNeedle(pat) {
	return pat
		.replace(/\|/g, '')
		.replace(/\[(.)\]/g, '$1')
		.replace(/[^a-zA-Z']/g, '')
		.toLowerCase();
}

function findContaining(needle) {
	if (needle.length < 3) return []; // too short; noisy
	const out = [];
	for (const word of words) {
		const lower = word.toLowerCase();
		if (lower.includes(needle) && lower !== needle) {
			out.push(word);
			if (out.length >= limit) break;
		}
	}
	return out;
}

const seenNeedles = new Set();

for (const entry of dataset) {
	const whitelist = new Set((entry.whitelistedTerms || []).map((t) => t.toLowerCase()));
	const needles = [...new Set(entry.patterns.map(patternToNeedle).filter(Boolean))];

	for (const needle of needles) {
		if (onlyNeedle && needle !== onlyNeedle && !needle.includes(onlyNeedle)) continue;
		if (seenNeedles.has(needle)) continue;
		seenNeedles.add(needle);

		const hits = findContaining(needle).filter((h) => !whitelist.has(h.toLowerCase()));
		if (hits.length === 0) continue;

		console.log(`\n[${entry.originalWord}] needle="${needle}"  (up to ${limit} KBBI hits)`);
		if (whitelist.size) console.log(`  existing whitelist: ${[...whitelist].join(', ')}`);
		for (const h of hits) console.log(`  - ${h}`);
	}
}

console.log('\nDone. Review hits and add safe phrases to whitelistedTerms in indonesian-words.json.');
