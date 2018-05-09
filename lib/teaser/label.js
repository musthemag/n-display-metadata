const assert = require('../utils/assert');
const find = require('../utils/find');

module.exports = ({ annotations, containedIn }) => {
	const brand = find.brand(annotations);
	const genre = find.genre(annotations);
	const fallback = find.fallback(annotations);

	if (assert.isOpinion(genre)) {
		return find.author(annotations) || fallback;
	}

	if (assert.isInPackage(containedIn)) {
		const package = containedIn[0];

		return {
			prefLabel: package.title,
			url: package.url
		};
	}

	if (assert.isDisplayGenre(genre)) {
		return brand || fallback;
	}

	return fallback;
};
