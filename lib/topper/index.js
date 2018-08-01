const prefixConcept = require('./prefix');
const linkConcept = require('./link');

module.exports = (content) => {
	let prefix = prefixConcept(content);
	let link = linkConcept(content);

	if (!link && prefix) {
		link = prefix;
		prefix = undefined;
	}

	if (link.prefLabel === prefix.prefLabel) {
		// TODO: find a decent alternative rather than show two repetitve labels
		// eg Opinion Opinion
	}

	return {
		prefix,
		link,
	};
};
