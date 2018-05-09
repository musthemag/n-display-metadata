const Types = require('../constants/types');
const Predicates = require('../constants/predicates');

exports.Ignore = new Set([
	Types.Organisation,
	Types.Person,
	Types.Location,
	Types.SpecialReport
]);

exports.Priority = new Map([
	[ Predicates.About, 'predicate' ],
	[ Predicates.PrimarilyClassifiedBy, 'predicate' ],
	[ Types.Topic, 'types' ],
	[ Types.Section, 'types' ],
	[ Types.Brand, 'types' ],
	[ Predicates.ClassifiedBy, 'predicate' ]
]);
