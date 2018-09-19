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

This module provides a method for each use case. Currently there is just one method for choosing which metadata to display on the [teaser].

// TODO: figure out what the sentence above means and adapt it. Also update the code example and explanation below

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

Returns an object with 2 properties:- `prefix` and `link`. The prefix can be a link or text.

## Content

All

## Logic

Both teasers and toppers are capable of displaying two pieces of metadata:- a prefix and a link. Though similar decisions may be made for each, they are not strictly connected.

### Teasers

The logic for choosing which metadata to display on teasers was last decided by Mus and Guy on 28/08/2018 and implemented by Matt Hinchliffe on 29/08/2018.

The current decision trees can be seen in the [docs folder](https://github.com/Financial-Times/n-display-metadata/blob/master/docs/).

### Toppers

The logic for choosing which metadata to display in the article topper above the headline was last decided by Mus and Guy on xx/xx/2018 and implemented by Luke Kavanagh on xx/xx/2018

The current decision tree can be seen in the [docs folder](https://github.com/Financial-Times/n-display-metadata/blob/master/docs/).
