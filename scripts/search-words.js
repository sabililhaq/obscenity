const repl = require('repl');
const fs = require('fs');
const { join } = require('path');

/**
 * Interactive dictionary search for whitelist / false-positive research.
 *
 * Usage:
 *   node scripts/search-words.js          # English (default)
 *   node scripts/search-words.js en
 *   node scripts/search-words.js id       # Indonesian (pinned KBBI snapshot)
 *
 * Query syntax:
 *   foo   — contains "foo"
 *   ^foo  — starts with "foo"
 *   foo$  — ends with "foo"
 */

const DICTS = {
	en: 'english-words.txt',
	english: 'english-words.txt',
	id: 'indonesian-words.txt',
	indonesian: 'indonesian-words.txt',
};

const dictKey = (process.argv[2] || 'en').toLowerCase();
const dictFile = DICTS[dictKey];

if (!dictFile) {
	console.error(`Unknown dictionary "${dictKey}". Use: en | id`);
	process.exit(1);
}

const dictPath = join(__dirname, dictFile);
if (!fs.existsSync(dictPath)) {
	console.error(`Dictionary not found: ${dictPath}`);
	console.error('See scripts/SOURCES.md for how to restore the pinned Indonesian list.');
	process.exit(1);
}

const words = fs
	.readFileSync(dictPath, { encoding: 'utf8' })
	.split('\n')
	.map((w) => w.trim())
	.filter(Boolean);

console.log(`Loaded ${words.length} entries from ${dictFile} (${dictKey}).`);
console.log('Query: substring | ^prefix | suffix$   (Ctrl+D to exit)\n');

repl.start({
	prompt: `${dictKey}> `,
	eval: (cmd, _, __, cb) => {
		cmd = cmd.trim().toLowerCase();
		if (!cmd) {
			cb(undefined, []);
			return;
		}

		let prefixAnchor = cmd.startsWith('^');
		if (prefixAnchor) cmd = cmd.slice(1);

		let suffixAnchor = cmd.endsWith('$');
		if (suffixAnchor) cmd = cmd.slice(0, -1);

		const result = [];
		for (const word of words) {
			const lower = word.toLowerCase();
			let ok = false;
			if (prefixAnchor) ok = lower.startsWith(cmd);
			else if (suffixAnchor) ok = lower.endsWith(cmd);
			else ok = lower.includes(cmd);
			if (ok) result.push(word);
		}

		cb(undefined, result);
	},
	writer: (output) => {
		if (!Array.isArray(output) || output.length === 0) {
			return 'No words found matching the query given.';
		}
		const limit = 200;
		const shown = output.slice(0, limit);
		const extra =
			output.length > limit ? `\n\n… and ${output.length - limit} more (showing first ${limit})` : '';
		return `${output.length} words found:\n\n${shown.join('\n')}${extra}`;
	},
});
