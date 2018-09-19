const assert = require('../utils/assert');
const find = require('../utils/find');
const findMatch = require('../utils/find-match');
const legacy = require('../utils/legacy-display-concept');

const about = annotations => (
	annotations.find(
		item => item.predicate === Predicates.About
	)
);

module.exports = ({ annotations = [] }) => {
	const brand = find.brand(annotations);
	const genre = find.genre(annotations);

	return findMatch(
		// For Opinion content we prefer to display the Brand if there is one
		assert.isOpinion(genre) && brand,

		// Else... use the Editorial specified displayTag if there is one
		() => find.displayTag(annotations),

		// Else... show any random "about" annotation
		() => about(annotations),

		// Else... use the legacy displayConcept logic
		// TODO: remove once
		() => legacy(annotations),

		// Else... if there really isn't anything else we can
		//				display show the brand or the genre
		brand || genre,
	);
};
