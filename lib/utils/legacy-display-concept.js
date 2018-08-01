const DisplayConcept = require('../constants/display-concept');

// Legacy display concept waterfall logic
// <https://github.com/Financial-Times/next-es-interface/pull/1063>
module.exports = (annotations) => {
	const filtered = annotations.filter(({ types }) => {
		return types.every((type) => !DisplayConcept.IgnoreTypes.has(type));
	});

	for (const [value, type] of DisplayConcept.PriorityOrder) {
		const result = filtered.find((item) => {
			const prop = item[type];
			return Array.isArray(prop) ? prop.includes(value) : prop === value;
		});

		if (result) {
			return result;
		}
	}
};