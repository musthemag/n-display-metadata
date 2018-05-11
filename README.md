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

## API

### `.teaser(content)`

Returns an object with 3 properties:- `prefixText`, `link` and `altLink`. The `altLink` can be used when the current context of the teaser is the same as the `link`, e.g. to avoid displaying links to "FastFT" on the FastFT stream page.

### `.topper(content)`

TODO

## Logic

Both teasers and toppers are capable of displaying two pieces of metadata:- a prefix and a link. Though similar decisions may be made for each, they are not strictly connected.

### Teasers

The logic for choosing which metadata to display on teasers was last decided by Mus and Guy on 10/05/2018 and implemented by Matt Hinchliffe on 11/05/2018.

The current decision trees can be seen in the [docs folder](https://github.com/Financial-Times/n-display-metadata/blob/master/docs/)
