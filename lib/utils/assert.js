const Genres = require('../constants/genres');

exports.isOpinion = (annotation) => {
	return annotation && annotation.prefLabel === 'Opinion';
};

exports.isGenrePrefix = (annotation) => {
	return annotation && Genres.DisplayAsPrefix.has(annotation.prefLabel);
};

exports.isGenreBranded = (annotation) => {
	return annotation && Genres.DisplayWithBrand.has(annotation.prefLabel);
};

exports.isInPackage = (containedIn) => {
	return Array.isArray(containedIn) && containedIn.length >= 1;
};
