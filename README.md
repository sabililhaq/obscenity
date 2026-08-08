# Obscenity Bahasa Indonesia
Dataset Bahasa Indonesia untuk Obscenity.

Silakan kontribusi ke file ini:
https://github.com/sabililhaq/obscenity/blob/indonesian/src/preset/data/indonesian-words.json

⚠️ Trigger warning: file tersebut berisi kata-kata kasar/eksplisit.

## Latar belakang

Saya pernah develop fitur chatting di company, dan salah satu masalahnya adalah filtering kata-kata kasar.

Selain itu, dari diskusi dengan teman yang pernah kerja di salah satu perusahaan yang juga membutuhkan fitur sensor kata, ternyata masalahnya nggak selalu cuma soal kata kasar. Nama orang tertentu, termasuk nama CEO, juga kadang perlu ikut di-sensor. Jadi kebutuhan filtering di dunia nyata bisa lebih luas daripada sekadar punya daftar swear words.

Terus, saya juga main game. Kalau pernah main game online, mungkin sudah tahu sendiri player Indonesia bisa se-toxic apa 😭. https://www.kompasiana.com/maxcosgaming3278/5e5f55f5097f367c0268f6c2/player-indonesia-adalah-player-tertoxic

Nah, masalahnya bukan cuma gimana cara mendeteksi kata kasar, tapi juga gimana supaya nggak salah nuduh. (**false positive**)

Contohnya:

sukonto legowo
babi guling
Taiwan

Jangan sampai kata/frasa yang sebenarnya normal malah ikut ke-censor gara-gara mengandung substring yang dianggap kasar.

## Obscenity fork

Awalnya saya mau bikin profanity filter dari awal, tapi ternyata sudah ada Obscenity yang konsepnya cukup menarik.

Salah satunya adalah leet word transformation.

Jadi, orang yang mau menghindari sensor bisa aja nulis:

anjing
4nj1ng
4nj!ng

Daripada harus masukin semua variasi tersebut satu-satu ke dataset, Obscenity bisa melakukan transformasi terlebih dahulu sebelum melakukan matching.

Kontribusi

Kalau mau kontribusi, terutama untuk data Bahasa Indonesia, silakan cek:

https://github.com/sabililhaq/obscenity/blob/indonesian/src/preset/data/indonesian-words.json

Di situ ada daftar kata kasar dan whitelist-nya.

Contohnya babi masuk sebagai kata yang perlu difilter, tapi babi guling ada di whitelist karena itu frasa normal.

Jadi kalau kalian nemu:

kata kasar Bahasa Indonesia yang belum ada
variasi penulisan yang sering dipakai
kata/frasa yang kena false positive
whitelist yang menurut kalian perlu ditambahkan

langsung contribute aja ke dataset tersebut.

# Obscenity

> Robust, extensible profanity filter for NodeJS.

<a href="https://github.com/jo3-l/obscenity/actions"><img src="https://img.shields.io/github/actions/workflow/status/jo3-l/obscenity/.github/workflows/continuous-integration.yml?branch=main&style=for-the-badge" alt="Build status"></a>
<a href="https://app.codecov.io/gh/jo3-l/obscenity/"><img src="https://img.shields.io/codecov/c/github/jo3-l/obscenity?style=for-the-badge" alt="Codecov status"></a>
<a href="https://npmjs.com/package/obscenity"><img src="https://img.shields.io/npm/v/obscenity?style=for-the-badge" alt="npm version"></a>
<img src='https://img.shields.io/github/languages/top/jo3-l/serenity.svg?style=for-the-badge' alt='Language'/>
<a href="https://github.com/jo3-l/obscenity/blob/main/LICENSE.md"><img src="https://img.shields.io/github/license/jo3-l/obscenity?style=for-the-badge" alt="License"></a>

## Why Obscenity?

- **Accurate:** Though Obscenity is far from perfect (as with all profanity filters), it makes reducing false positives as simple as possible: adding whitelisted phrases is as easy as adding a new string to an array, and using word boundaries is equally simple.
- **Robust:** Obscenity's transformer-based design allows it to match on variants of phrases other libraries are typically unable to, e.g. `fuuuuuuuckkk`, `ʃṳ𝒸𝗄`, `wordsbeforefuckandafter` and so on. There's no need to manually write out all the variants either: just adding the pattern `fuck` will match all of the cases above by default.
- **Extensible:** With Obscenity, you aren't locked into anything - removing phrases that you don't agree with from the default set of words is trivial, as is disabling any transformations you don't like (perhaps you feel that leet-speak decoding is too error-prone for you).

## Installation

```shell
$ npm install obscenity
$ yarn add obscenity
$ pnpm add obscenity
```

## Example usage

First, import Obscenity:

```javascript
const { RegExpMatcher, TextCensor, englishDataset, englishRecommendedTransformers } = require('obscenity');
```

Or, in TypeScript/ESM:

```typescript
import { RegExpMatcher, TextCensor, englishDataset, englishRecommendedTransformers } from 'obscenity';
```

Now, we can create a new matcher using the English preset.

```javascript
const matcher = new RegExpMatcher({
	...englishDataset.build(),
	...englishRecommendedTransformers,
});
```

Now, we can use our matcher to search for profanities in the text. Here's two examples of what you can do:

**Check if there are any matches in some text:**

```javascript
if (matcher.hasMatch('fuck you')) {
	console.log('The input text contains profanities.');
}
// The input text contains profanities.
```

**Output the positions of all matches along with the original word used:**

```javascript
// Pass "true" as the "sorted" parameter so the matches are sorted by their position.
const matches = matcher.getAllMatches('ʃ𝐟ʃὗƈｋ ỹоứ 𝔟ⁱẗ𝙘ɦ', true);
for (const match of matches) {
	const { phraseMetadata, startIndex, endIndex } = englishDataset.getPayloadWithPhraseMetadata(match);
	console.log(`Match for word ${phraseMetadata.originalWord} found between ${startIndex} and ${endIndex}.`);
}
// Match for word fuck found between 0 and 6.
// Match for word bitch found between 12 and 18.
```

**Censoring matched text:**

To censor text, we'll need to import another class: the `TextCensor`.
Some other imports and creation of the matcher have been elided for simplicity.

```javascript
const { TextCensor, ... } = require('obscenity');
// ...
const censor = new TextCensor();
const input = 'fuck you little bitch';
const matches = matcher.getAllMatches(input);
console.log(censor.applyTo(input, matches));
// %@$% you little **%@%
```

This is just a small slice of what Obscenity can do: for more, check out the [documentation](#documentation).

## Accuracy

> **Note:** As with all swear filters, Obscenity is not perfect (nor will it ever be). Use its output as a heuristic, and not as the sole judge of whether some content is appropriate or not.

With the English preset, Obscenity (correctly) finds matches in all of the following texts:

- you are a little **fuck**er
- **fk** you
- **ffuk** you
- i like **a$$es**
- <!-- biome-ignore format --> ʃ𝐟ʃὗƈｋ ỹоứ

...and it **does not match** on the following:

- the **pen is** mightier than the sword
- i love banan**as s**o yeah
- this song seems really b**anal**
- g**rape**s are really yummy

## Documentation

For a step-by-step guide on how to use Obscenity, check out the [guide](./docs/guide).

Otherwise, refer to the [auto-generated API documentation](./docs/reference).

## Contributing

Issues can be reported using the [issue tracker](https://github.com/jo3-l/obscenity/issues).
If you'd like to submit a pull request, please read the [contribution guide](./CONTRIBUTING.md) first.

## License

MIT
