const find = require('../utils/find');
const legacy = require('../utils/legacy-display-concept');

module.exports = ({ annotations = [] }) => {
	const display = find.displayTag(annotations);

	if (display) {
		return display;
	} else {
		// TODO: remove when more content has a display tag predicate
		return legacy(annotations);
	}
};
