const util = require('./util');

module.exports = ({ annotations, displayConcept, containedIn, context }) => {
	const brand = util.getBrand(annotations);
	const genre = util.getGenre(annotations);

	if (util.isOpinion(genre)) {
		const author = util.getAuthor(annotations);

		if (author && !util.inContext(author, context)) {
			return author;
		} else {
			// goto display concept bit
		}
	}
};
