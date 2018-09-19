module.exports = (...rules) => (
	rules.find(rule => typeof rule === 'function' ? rule() : rule)
);