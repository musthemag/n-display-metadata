const assert = require('../utils/assert');
const find = require('../utils/find');

module.exports = ({ annotations, containedIn }) => {
	const brand = find.brand(annotations);
	const genre = find.genre(annotations);

	if (assert.isOpinion(genre)) {
		return find.author(annotations);
	} else {
		if (assert.isInPackage(containedIn)) {
			// "package" is reserved for future use by the language
			const pkg = containedIn[0];

			return {
				prefLabel: pkg.title,
				url: pkg.url
			};
		} else {
			if (assert.isDisplayGenre(genre)) {
				return brand;
			}
		}
	}
};
