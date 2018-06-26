const find = require('../utils/find');
const assert = require('../utils/assert');

module.exports = ({ annotations = [] }) => {
	const genreConcept = find.genre(annotations);
	const authorConcept = find.author(annotations);
	const isOpinion = assert.isOpinion(genreConcept);
	const isColumn = Boolean(isOpinion && authorConcept);

	return { isOpinion, isColumn };
};
