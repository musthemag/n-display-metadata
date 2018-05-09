const DisplayableGenre = require('./constants/displayable-genres');
const Predicates = require('./constants/predicates');
const Types = require('./constants/types');

const getGenre = (annotations) => {
	return Array.isArray(annotations) && annotations.find((item) => (
		item.directType === Types.Genre && item.predicate === Predicates.ClassifiedBy
	));
};

const getBrand = (annotations) => {
	return Array.isArray(annotations) && annotations.find((item) => (
		item.directType === Types.Brand && item.predicate === Predicates.ClassifiedBy
	));
};

const inPackage = (containedIn) => {
	return Array.isArray(containedIn) && containedIn.length >= 1;
};

const inContext = (annotation, context) => {
	return annotation && context && annotation.id === context.id;
};

const isOpinion = (annotation) => {
	return annotation && annotation.prefLabel === 'Opinion';
};

const isDisplayableGenre = (annotation) => {
	return annotation && DisplayableGenre.has(annotation.prefLabel);
};

module.exports = ({ annotations, containedIn, context }) => {
	const brand = getBrand(annotations);
	const genre = getGenre(annotations);

	if (isOpinion(genre)) {
		if (brand && !inContext(brand, context)) {
			return brand.prefLabel;
		} else {
			return;
		}
	}

	if (inPackage(containedIn)) {
		if (brand && !inContext(brand, context)) {
			return brand.prefLabel;
		} else {
			return;
		}
	}

	if (isDisplayableGenre(genre)) {
		if (!inContext(genre, context)) {
			return genre.prefLabel;
		} else {
			return;
		}
	}
};
