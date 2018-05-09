const util = require('../util');

module.exports = ({ annotations, containedIn }) => {
	const brand = util.getBrand(annotations);
	const genre = util.getGenre(annotations);
	const fallback = util.getFallback(annotations);

	if (util.isOpinion(genre) ) {
		return util.getAuthor(annotations) || fallback;
	}

	if (util.inPackage(containedIn)) {
		return util.getPackage(containedIn);
	}

	if (util.isDisplayGenre(genre)) {
		return brand || fallback;
	}

	return fallback;
};
