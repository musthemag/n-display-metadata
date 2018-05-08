const Predicates = require('../lib/constants/predicates');
const Types = require('../lib/constants/types');

exports.createAnnotation = function (id, prefLabel, type, predicate) {
	return {
		id,
		prefLabel,
		type: Types[type],
		predicate: Predicates[predicate]
	};
};
