const util = require('./util');

module.exports = ({ annotations, containedIn, context }) => {
	const brand = util.getBrand(annotations);
	const genre = util.getGenre(annotations);

	if (util.isOpinion(genre)) {
		if (brand && !util.inContext(brand, context)) {
			return brand.prefLabel;
		} else {
			return;
		}
	}

	if (util.inPackage(containedIn)) {
		if (brand && !util.inContext(brand, context)) {
			return brand.prefLabel;
		} else {
			return;
		}
	}

	if (util.isDisplayableGenre(genre)) {
		if (!util.inContext(genre, context)) {
			return genre.prefLabel;
		} else {
			return;
		}
	}
};
