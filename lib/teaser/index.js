const prefixText = require('./prefix-text');
const primaryLink = require('./primary-link');
const secondaryLink = require('./secondary-link');

module.exports = (content) => {
	const prefix = prefixText(content);
	const primary = primaryLink(content);
	const secondary = secondaryLink(content);

	return {
		prefix,
		primaryLink: primary || secondary,
		secondaryLink: primary ? secondary : null
	};
};
