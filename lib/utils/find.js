const Predicates = require('../constants/predicates');
const Types = require('../constants/types');

exports.genre = (annotations) => {
	return annotations.find((item) => (
		item.types.includes(Types.Genre) && item.predicate === Predicates.ClassifiedBy
	));
};

exports.brand = (annotations) => {
	return annotations.find((item) => (
		// It's important to specify the predicate to avoid picking implicit annotations
		item.types.includes(Types.Brand) && item.predicate === Predicates.ClassifiedBy
	));
};

exports.author = (annotations) => {
	const authors = annotations.filter((item) => (
		item.types.includes(Types.Person) && item.predicate === Predicates.Author
	));

	// If there are multiple authors then we cannot pick only one
	return authors && authors.length === 1 ? authors[0] : undefined;
};
