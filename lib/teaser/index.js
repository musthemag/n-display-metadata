const prefixText = require('./prefix-text');
const leadingLink = require('./leading-link');
const alternativeLink = require('./alternative-link');

module.exports = (content) => {
	const leading = leadingLink(content);
	const alternative = alternativeLink(content);

	return {
		prefix: prefixText(content),
		link: leading || alternative,
		altLink: leading ? alternative : null
	};
};
