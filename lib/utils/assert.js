const Genres = require('../constants/genres');
const Types = require('../constants/types');

exports.isOpinion = (annotation) => {
	return Boolean(annotation) && annotation.types.includes(Types.Genre) && annotation.prefLabel === 'Opinion';
};

exports.isGenrePrefix = (annotation) => {
	return Boolean(annotation) && Genres.DisplayAsPrefix.has(annotation.prefLabel);
};

exports.isGenreBranded = (annotation) => {
	return Boolean(annotation) && Genres.DisplayWithBrand.has(annotation.prefLabel);
};

exports.isInPackage = (containedIn) => {
	return Array.isArray(containedIn) && containedIn.length >= 1;
};
