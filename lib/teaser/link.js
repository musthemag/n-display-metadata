const assert = require('../utils/assert');
const find = require('../utils/find');
const findMatch = require('../utils/find-match');

const packageLink = package => ({
	id: package.id,
	url: package.url,
	prefLabel: package.title || 'Package title',
});

module.exports = ({ annotations = [], containedIn = [] }) => {
	const genre = find.genre(annotations);

	return findMatch(

		// Show the author's name if the content is Opinion and there is a single author
		assert.isOpinion(genre) && find.author(annotations),

		// Else... Show the Package if this content is one
		() => assert.isInPackage(containedIn) && packageLink(containedIn[0]),

		// Else... For certain Genres (Eg Analysis and Explainer) we'll display the Brand if one exists
		() => assert.isGenreBranded(genre) && find.brand(annotations)
	);
};
