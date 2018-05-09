const Predicates = require('../lib/constants/predicates');
const Types = require('../lib/constants/types');

exports.createAnnotation = function (prefLabel, type, predicate) {
	return {
		prefLabel,
		types: [ Types[type] ],
		directType: Types[type],
		predicate: Predicates[predicate]
	};
};
