const assert = require('../utils/assert');
const find = require('../utils/find');
const legacy = require('../utils/legacy-display-concept');

const about = (annotations) => {
	return annotations.find((item) => item.predicate === Predicates.About);
};

module.exports = ({ annotations = [] }) => {
	const display = find.displayTag(annotations);
	let result;

	if (display) {
		result = display;
	} else {
		const abouts = about(annotations);

		if (abouts.length) {
			result = abouts[0];
		} else {
			result = legacy(annotations);
		}
	}

	if (!result) {
		result = find.brand(annotations);
	}

	if (!result) {
		result = find.genre(annotations);
	}

	return result;
};
