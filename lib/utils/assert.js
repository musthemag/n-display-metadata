const DisplayGenre = require('../constants/display-genres');

exports.isOpinion = (annotation) => {
	return annotation && annotation.prefLabel === 'Opinion';
};

exports.isDisplayGenre = (annotation) => {
	return annotation && DisplayGenre.has(annotation.prefLabel);
};

exports.isInPackage = (containedIn) => {
	return Array.isArray(containedIn) && containedIn.length >= 1;
};
