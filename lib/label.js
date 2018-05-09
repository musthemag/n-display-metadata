const util = require('./util');

module.exports = ({ annotations, displayConcept, containedIn, context }) => {
	const brand = util.getBrand(annotations);
	const genre = util.getGenre(annotations);

	if (util.isOpinion(genre)) {
		const authors = util.getAuthors(annotations);

		if (authors.length === 1) {
			if (!util.inContext(authors[0], context)) {
				return authors[0];
			} else {
				// goto display concept bit
			}
		} else {
			// goto display concept bit
		}
	}
};
