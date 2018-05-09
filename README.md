# n-display-metadata

This module encapsulates the editorially selected logic for deciding which metadata items to display in teasers and article toppers. The metadata items may be a [concept] or a reference to a parent [package].

[concept]: https://github.com/Financial-Times/types-ft-content-api/blob/master/concepts/Concept.d.ts
[package]: https://github.com/Financial-Times/types-ft-content-api/blob/master/content/Package.d.ts

## Installation

```sh
$ npm i -S @financial-times/n-display-metadata
```

## Usage

```js
const metadata = require('@financial-times/n-display-metadata');

const teaserMeta = metadata.teaser(content);
```

## Logic

Both teasers and toppers are capable of displaying two pieces of metadata:- a text prefix and a link. The two pieces of information are connected.

### Teasers

The logic for choosing annotations to display on teasers was decided by Mus and Guy on 03/05/2018 and implemented by Matt Hinchliffe on 09/05/2018.

The decision trees can be seen here:-

- [prefix](https://github.com/Financial-Times/n-concept-selector/blob/master/docs/Teaser_Prefix_2018-05-03.png)
- [link](https://github.com/Financial-Times/n-concept-selector/blob/master/docs/Teaser_Tag_2018-05-03.png)
