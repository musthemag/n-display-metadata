const { expect } = require('chai');
const helpers = require('../helpers');
const subject = require('../../lib/teaser/flags');

describe('Teaser Flags', () => {
	context('when the content is tagged with the genre "opinion"', () => {
		it('flags the content as an opinion piece', () => {
			const result = subject({
				annotations: [
					helpers.createAnnotation('Opinion', 'Genre', 'ClassifiedBy')
				]
			});

			expect(result.isOpinion).to.equal(true);
		});

		context('and the content has one author', () => {
			it('flags the content as a column piece', () => {
				const result = subject({
					annotations: [
						helpers.createAnnotation('Opinion', 'Genre', 'ClassifiedBy'),
						helpers.createAnnotation('John Authers', 'Person', 'Author')
					]
				});

				expect(result.isColumn).to.equal(true);
			});
		});

		context('and the content does not have one author', () => {
			it('does not flag the content as a column piece', () => {
				const result = subject({
					annotations: [
						helpers.createAnnotation('Opinion', 'Genre', 'ClassifiedBy'),
						helpers.createAnnotation('John Authers', 'Person', 'Author'),
						helpers.createAnnotation('Lucy Kellaway', 'Person', 'Author')
					]
				});

				expect(result.isColumn).to.equal(false);
			});
		});
	});

	context('when the content is not tagged with the genre "opinion"', () => {
		it('does not flag the content as an opinion piece', () => {
			const result = subject({ annotations: [] });
			expect(result.isOpinion).to.equal(false);
		});

		it('does not flag the content as a column piece', () => {
			const result = subject({
				annotations: [
					helpers.createAnnotation('John Authers', 'Person', 'Author')
				]
			});

			expect(result.isColumn).to.equal(false);
		});
	});
});
