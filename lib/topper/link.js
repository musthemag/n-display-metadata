const assert = require('../utils/assert');
const find = require('../utils/find');
const legacy = require('../utils/legacy-display-concept');

const about = (annotations) => {
	return annotations.find((item) => item.predicate === Predicates.About);
};

module.exports = ({ annotations = [] }) => {
	const display = find.displayTag(annotations);

	if (display) {
		return display;
	} else {
		const abouts = about(annotations);

		if (abouts.length) {
			return abouts[0];
		} else {
			return legacy(annotations);
		}
	}
};
