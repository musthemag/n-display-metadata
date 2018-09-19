const prefixConcept = require('./prefix');
const linkConcept = require('./link');

module.exports = (content) => {
	let prefix = prefixConcept(content);
	let link = linkConcept(content);

	if (!link && prefix) {
		link = prefix;
		prefix = undefined;
	}

	// We don't ever want something awkward like "Opinion Opinion" displayed
	if (link.prefLabel === prefix.prefLabel) {
		prefix = undefined;
	}

	return {
		prefix,
		link,
	};
};
