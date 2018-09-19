const prefixConcept = require('./prefix-link');
const linkConcept = require('./main-link');

module.exports = (content) => {
	let prefixLink = prefixConcept(content);
	let mainLink = linkConcept(content);

	if (!mainLink && prefixLink) {
		mainLink = prefixLink;
		prefixLink = undefined;
	}

	// We don't ever want something awkward like "Opinion Opinion" displayed
	if (mainLink.prefLabel === prefixLink.prefLabel) {
		prefixLink = undefined;
	}

	return {
		prefixLink,
		mainLink,
	};
};
