const flags = require('./flags');
const prefixText = require('./prefix-text');
const link = require('./link');
const altLink = require('./alt-link');

module.exports = (content) => {
	const selectedLink = link(content);
	const selectedAltLink = altLink(content, selectedLink);

	return {
		flags: flags(content),
		prefixText: prefixText(content),
		link: selectedLink || selectedAltLink,
		altLink: selectedLink ? selectedAltLink : null
	};
};
