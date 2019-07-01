const assert = require('../utils/assert');
const find = require('../utils/find');

module.exports = ({ annotations = [], containedIn = [] }) => {
	const brand = find.brand(annotations);
	const genre = find.genre(annotations);

	if (assert.isOpinion(genre)) {
		return find.author(annotations);
	} else {
		if (assert.isInPackage(containedIn)) {
			const pkg = containedIn[0];

			return {
				id: pkg.id,
				url: pkg.url,
				relativeUrl: pkg.relativeUrl,
				prefLabel: pkg.title
			};
		} else {
			if (assert.isGenreBranded(genre)) {
				return brand;
			}
		}
	}
};
