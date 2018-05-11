const assert = require('../utils/assert');
const find = require('../utils/find');

module.exports = ({ annotations, containedIn }) => {
	const brand = find.brand(annotations);
	const genre = find.genre(annotations);

	if (assert.isOpinion(genre)) {
		return find.author(annotations);
	} else {
		if (assert.isInPackage(containedIn)) {
			return {
				prefLabel: containedIn[0].title,
				url: containedIn[0].url
			};
		} else {
			if (assert.isGenreBranded(genre)) {
				return brand;
			}
		}
	}
};
