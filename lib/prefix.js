const util = require('./util');

module.exports = ({ annotations, containedIn }) => {
	const brand = util.getBrand(annotations);
	const genre = util.getGenre(annotations);

	if (util.isOpinion(genre)) {
		return brand ? brand.prefLabel : null;
	}

	if (util.inPackage(containedIn)) {
		return brand ? brand.prefLabel : null;
	}

	if (util.isDisplayGenre(genre)) {
		return genre.prefLabel;
	}
};
