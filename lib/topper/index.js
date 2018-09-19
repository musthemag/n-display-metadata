const prefixConcept = require('./prefix');
const linkConcept = require('./link');

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
