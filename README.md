# n-display-metadata

[![CircleCI](https://img.shields.io/circleci/project/github/Financial-Times/n-display-metadata/master.svg)](https://circleci.com/gh/Financial-Times/n-display-metadata) [![NPM version](https://img.shields.io/npm/v/@financial-times/n-display-metadata.svg)](https://www.npmjs.com/package/@financial-times/n-display-metadata)

This module encapsulates the editorially selected logic for deciding which metadata items to display in teasers and article toppers.

## Installation

This is a [Node.js][node] module available through the [npm][npm] registry. Before installing, download and install Node.js. Node.js 6 or higher is required.

Installation is done using the [npm install][install] command:

```sh
$ npm install -S @financial-times/n-display-metadata
```

[node]: https://nodejs.org/en/
[npm]: https://www.npmjs.com/
[install]: https://docs.npmjs.com/getting-started/installing-npm-packages-locally

## Usage

This module provides a method for each use case. There are two use case supported at the moment: teaser and topper.

```js
const metadata = require('@financial-times/n-display-metadata');

const teaserMetadata = metadata.teaser(content);

const topperMetadata = metadata.topper(content);
```

References to the variable `content` refer to a content item either from the [internal enriched content API][1] or the [FT.com Elasticsearch cluster][2]. The content should have an `annotations` property (which is an array of concepts and their relationship to the content) and `containedIn` property (which is an array of packages which contain the content).

[teaser]: https://github.com/Financial-Times/o-teaser/
[1]: https://github.com/Financial-Times/types-ft-content-api/tree/master/content
[2]: https://github.com/Financial-Times/next-es-interface/tree/master/server/schemas/types


## API

### `.teaser(content)`

Returns an object with 3 properties:- `prefixText`, `link` and `altLink`. The `altLink` can be used when the current context of the teaser is the same as the `link`, e.g. to avoid displaying links to "FastFT" on the FastFT stream page. It is up to the implementor to add this logic.

### `.topper(content)`

Returns an object with 2 properties:- `prefixLink` and `mainLink`.

## Content

All

## Logic

Both teasers and toppers are capable of displaying two pieces of metadata:- a prefix and a link. Though similar decisions may be made for each, they are not strictly connected.

### How decides the display logic?

The logic for choosing which metadata to display is decided in consultation with Mus and Guy. The current decision trees can be seen in the [docs folder](https://github.com/Financial-Times/n-display-metadata/blob/master/docs/).

Teaser logic was last decided on 28/08/2018 and implemented by Matt Hinchliffe on 29/08/2018.

Topper logic was last decided on xx/xx/2018 and implemented by X on x/x/2018.
