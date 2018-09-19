const assert = require('../utils/assert');
const find = require('../utils/find');

module.exports = ({ annotations = [] }) => {
	const genre = find.genre(annotations);

	if (assert.isOpinion(genre)) {
		return genre;
	} else {
		const brand = find.brand(annotations);
		if (brand) {
			return brand;
		}
	}
};
