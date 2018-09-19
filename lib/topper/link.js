const assert = require('../utils/assert');
const find = require('../utils/find');
const legacy = require('../utils/legacy-display-concept');

const about = (annotations) => {
	return annotations.find((item) => item.predicate === Predicates.About);
};

module.exports = ({ annotations = [] }) => {
	const brand = find.brand(annotations);
	const genre = find.genre(annotations);

	const rules = [
		assert.isOpinion(genre) && brand,
		() => find.displayTag(annotations),
		() => about(annotations),
		() => legacy(annotations),
		brand || genre,
	];

	let result;

	do {
		const rule = rules.shift();
		result = typeof rule === 'function' ? rule() : rule;
	} while (!result && rules.length);

	return result;
};
