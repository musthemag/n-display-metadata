const prefixText = require('./prefix-text');
const primaryLink = require('./primary-link');
const fallbackLink = require('./fallback-link');

module.exports = (content) => {
	const prefix = prefixText(content);
	const primary = primaryLink(content);
	const fallback = fallbackLink(content);

	return {
		prefix,
		primary: primary || fallback,
		fallback: primary ? fallback : null
	};
};
