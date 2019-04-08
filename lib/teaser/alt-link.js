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

module.exports = ({ annotations = [] }, primaryLink = {}) => {
	// Ensure that the chosen alternative link cannot match the already selected main link
	const notSelected = annotations.filter((annotation) => annotation.prefLabel !== primaryLink.prefLabel);

	// Display tags are selected by editors using TagMe and are not always set
	const display = find.displayTag(notSelected);

	if (display) {
		return display;
	} else {
		// TODO: remove when more content has a display tag predicate
		return legacy(notSelected);
	}
};
