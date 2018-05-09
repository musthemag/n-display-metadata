const assert = require('../utils/assert');
const find = require('../utils/find');

module.exports = ({ annotations, containedIn }) => {
	const brand = find.brand(annotations);
	const genre = find.genre(annotations);

	if (assert.isOpinion(genre)) {
		return brand ? brand.prefLabel : null;
	} else {
		if (assert.isInPackage(containedIn)) {
			return brand ? brand.prefLabel : null;
		} else {
			if (assert.isDisplayGenre(genre)) {
				return genre.prefLabel;
			}
		}
	}
};
