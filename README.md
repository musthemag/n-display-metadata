# n-display-metadata

This module encapsulates the editorially selected logic for deciding which metadata items to display in teasers and article toppers.

## Installation

```sh
$ npm i -S @financial-times/n-display-metadata
```

## Usage

```js
const metadata = require('@financial-times/n-display-metadata');

const teaserMetadata = metadata.teaser(content);
```

References to the variable `content` refer to a content item either from the [internal enriched content API][1] or the [FT.com Elasticsearch cluster][2]. The content should have an `annotations` property (which is an array of concepts and their relationship to the content) and `containedIn` property (which is an array of packages which contain the content).

[1]: https://github.com/Financial-Times/types-ft-content-api/tree/master/content
[2]: https://github.com/Financial-Times/next-es-interface/tree/master/server/schemas/types


## API

### `.teaser(content)`

Returns an object with 3 properties:- `prefixText`, `link` and `altLink`. The `altLink` can be used when the current context of the teaser is the same as the `link`, e.g. to avoid displaying links to "FastFT" on the FastFT stream page. It is up to the implementor to add this logic.

### `.topper(content)`

Coming soon.

## Content

All

## Logic

Both teasers and toppers are capable of displaying two pieces of metadata:- a prefix and a link. Though similar decisions may be made for each, they are not strictly connected.

### Teasers

The logic for choosing which metadata to display on teasers was last decided by Mus and Guy on 10/05/2018 and implemented by Matt Hinchliffe on 11/05/2018.

The current decision trees can be seen in the [docs folder](https://github.com/Financial-Times/n-display-metadata/blob/master/docs/)
