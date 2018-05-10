const find = require('../utils/find');
const DisplayConcept = require('../constants/display-concept');

// Legacy display concept waterfall logic
// <https://github.com/Financial-Times/next-es-interface/pull/1063>
const legacy = (annotations) => {
	const filtered = annotations.filter(({ types }) => {
		return types.every((type) => !DisplayConcept.IgnoreTypes.has(type));
	});

	for (const [ value, type ] of DisplayConcept.PriorityOrder) {
		const result = filtered.find((item) => {
			const prop = item[type];
			return Array.isArray(prop) ? prop.includes(value) : prop === value;
		});

		if (result) {
			return result;
		}
	}
};

module.exports = (annotations) => {
	const display = find.display(annotations);

	if (display) {
		return display;
	} else {
		return legacy(annotations);
	}
};
