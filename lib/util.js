const DisplayGenre = require('./constants/display-genres');
const Predicates = require('./constants/predicates');
const Types = require('./constants/types');

exports.getGenre = (annotations) => {
	return Array.isArray(annotations) && annotations.find((item) => (
		item.types.includes(Types.Genre) && item.predicate === Predicates.ClassifiedBy
	));
};

exports.getBrand = (annotations) => {
	return Array.isArray(annotations) && annotations.find((item) => (
		item.types.includes(Types.Brand) && item.predicate === Predicates.ClassifiedBy
	));
};

exports.getAuthor = (annotations) => {
	const authors = Array.isArray(annotations) && annotations.filter((item) => (
		item.types.includes(Types.Person) && item.predicate === Predicates.Author
	));

	// If there are many authors we cannot pick just one
	return authors && authors.length === 1 ? authors[0] : null;
};

exports.getPackage = (containedIn) => {
	const item = containedIn[0];

	return {
		prefLabel: item.title,
		relativeUrl: item.relativeUrl,
		url: item.url
	};
};

exports.getFallback = (annotations) => {
	return { prefLabel: 'Fallback' };
};

exports.isOpinion = (annotation) => {
	return annotation && annotation.prefLabel === 'Opinion';
};

exports.isDisplayGenre = (annotation) => {
	return annotation && DisplayGenre.has(annotation.prefLabel);
};

exports.isInPackage = (containedIn) => {
	return Array.isArray(containedIn) && containedIn.length >= 1;
};
