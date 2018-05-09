const DisplayableGenre = require('./constants/displayable-genres');
const Predicates = require('./constants/predicates');
const Types = require('./constants/types');

exports.getGenre = (annotations) => {
	return Array.isArray(annotations) && annotations.find((item) => (
		item.directType === Types.Genre && item.predicate === Predicates.ClassifiedBy
	));
};

exports.getBrand = (annotations) => {
	return Array.isArray(annotations) && annotations.find((item) => (
		item.directType === Types.Brand && item.predicate === Predicates.ClassifiedBy
	));
};

exports.getAuthor = (annotations) => {
	const authors = Array.isArray(annotations) && annotations.filter((item) => (
		item.predicate === Predicates.Author
	));

	// If there are many authors we cannot pick just one
	return authors && authors.length === 1 ? authors[0] : null;
};

exports.isOpinion = (annotation) => {
	return annotation && annotation.prefLabel === 'Opinion';
};

exports.isDisplayableGenre = (annotation) => {
	return annotation && DisplayableGenre.has(annotation.prefLabel);
};

exports.inPackage = (containedIn) => {
	return Array.isArray(containedIn) && containedIn.length >= 1;
};

exports.inContext = (annotation, context) => {
	return annotation && context && annotation.id === context.id;
};
