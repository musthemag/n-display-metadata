const { expect } = require('chai');
const helpers = require('./helpers');
const { prefix: subject } = require('../');

describe('Prefix', () => {
	context('when the content is tagged with the genre "opinion"', () => {
		context('and it is tagged with a brand', () => {
			const annotations = [
				helpers.createAnnotation(123, 'Opinion', 'Genre', 'ClassifiedBy'),
				helpers.createAnnotation(456, 'Authersʼ Note', 'Brand', 'ClassifiedBy'),
				helpers.createAnnotation(789, 'John Authers', 'Person', 'HasAuthor')
			];

			context('and we are not on the brand stream page', () => {
				it('returns the brand label', () => {
					const result = subject({ annotations });

					expect(result).to.equal('Authersʼ Note');
				});
			});

			context('and we are on the brand stream page', () => {
				it('returns nothing', () => {
					const context = { id: 456 };
					const result = subject({ annotations, context });

					expect(result).to.be.undefined;
				});
			});
		});

		context('and it is not tagged with a brand', () => {
			const annotations = [
				helpers.createAnnotation(123, 'Opinion', 'Genre', 'ClassifiedBy'),
				helpers.createAnnotation(789, 'John Authers', 'Person', 'HasAuthor')
			];

			it('returns nothing', () => {
				const result = subject({ annotations });

				expect(result).to.undefined;
			});
		});
	});

	context('when the content is part of a package', () => {
		const containedIn = [
			{
				title: 'A Collection'
			}
		];

		context('and it is tagged with a brand', () => {
			const annotations = [
				helpers.createAnnotation(123, 'FT Wealth', 'Brand', 'ClassifiedBy'),
				helpers.createAnnotation(456, 'Wealth Management', 'Topic', 'About')
			];

			context('and we are not on the brand stream page', () => {
				it('returns the brand label', () => {
					const result = subject({ annotations, containedIn });

					expect(result).to.equal('FT Wealth');
				});
			});

			context('and we are on the brand stream page', () => {
				it('returns nothing', () => {
					const context = { id: 123 };
					const result = subject({ annotations, containedIn, context });

					expect(result).to.be.undefined;
				});
			});
		});

		context('and it is not tagged with a brand', () => {
			const annotations = [
				helpers.createAnnotation(456, 'Wealth Management', 'Topic', 'About')
			];

			it('returns nothing', () => {
				const result = subject({ annotations, containedIn });

				expect(result).to.be.undefined;
			});
		});
	});

	context('when the genre tag is allowed to be displayed', () => {
		const annotations = [
			helpers.createAnnotation(123, 'Analysis', 'Genre', 'ClassifiedBy'),
			helpers.createAnnotation(456, 'Chinese Trade', 'Topic', 'About')
		];

		context('and we are not on the genre stream page', () => {
			it('returns the genre label', () => {
				const result = subject({ annotations });

				expect(result).to.equal('Analysis');
			});
		});

		context('and we are on the genre stream page', () => {
			it('returns nothing', () => {
				it('returns the genre label', () => {
					const context = { id: 123 };
					const result = subject({ annotations, context });

					expect(result).to.be.undefined;
				});
			});
		});
	});
});
