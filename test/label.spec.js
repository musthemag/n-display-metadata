const { expect } = require('chai');
const helpers = require('./helpers');
const { label: subject } = require('../');

describe('Label', () => {
	const displayConcept = helpers.createAnnotation(111, 'Technology', 'Topic', 'About');

	context('when the content is tagged with the genre "opinion"', () => {
		context('and it is tagged with one author', () => {
			const annotations = [
				helpers.createAnnotation(123, 'Opinion', 'Genre', 'ClassifiedBy'),
				helpers.createAnnotation(456, 'Authersʼ Note', 'Brand', 'ClassifiedBy'),
				helpers.createAnnotation(789, 'John Authers', 'Person', 'HasAuthor')
			];

			context('and we are not on the author stream page', () => {
				it('returns the author concept', () => {
					const result = subject({ annotations, displayConcept });

					expect(result.prefLabel).to.equal('John Authers');
				});
			});

			context('and we are on the author stream page', () => {
				it('returns the display concept', () => {
					const context = { id: 456 };

					const result = subject({ annotations, displayConcept, context });

					expect(result.prefLabel).to.equal('John Authers');
				});
			});
		});

		context('and it is not tagged with one author', () => {
			const annotations = [
				helpers.createAnnotation(123, 'Opinion', 'Genre', 'ClassifiedBy'),
				helpers.createAnnotation(456, 'FT View', 'Brand', 'ClassifiedBy')
			];

			context('and it has a display concept selected', () => {
				context('and we are not on the display concept stream page', () => {
					it('returns the display concept', () => {
						const result = subject({ annotations, displayConcept });

						expect(result.prefLabel).to.equal('Technology');
					});
				});

				context('and we are on the display concept stream page', () => {
					it('returns nothing', () => {
						const context = { id: 111 };
						const result = subject({ annotations, displayConcept, context });

						expect(result).to.be.undefined;
					});
				});
			});
		});
	});

	context('when the content is part of a package', () => {
		const annotations = [
			helpers.createAnnotation(123, 'Feature', 'Genre', 'ClassifiedBy'),
			helpers.createAnnotation(456, 'Work Tribes', 'Brand', 'ClassifiedBy')
		];

		const containedIn = [
			{
				title: 'Meet the work tribes'
			}
		];

		it('returns the package title', () => {
			const result = subject({ annotations, displayConcept, containedIn });

			expect(result.prefLabel).to.equal('Meet the work tribes');
		});
	});

	context('when the genre tag is allowed to be displayed', () => {
		context('and it is tagged with a brand', () => {
			const annotations = [
				helpers.createAnnotation(123, 'Analysis', 'Genre', 'ClassifiedBy'),
				helpers.createAnnotation(456, 'The Big Read', 'Brand', 'ClassifiedBy'),
				helpers.createAnnotation(789, 'Chinese Trade', 'Topic', 'About'),
			];

			context('and we are not on the brand stream page', () => {
				it('returns the brand label', () => {
					const result = subject({ annotations, displayConcept });

					expect(result.prefLabel).to.equal('The Big Read');
				});
			});

			context('and we are on the brand stream page', () => {
				it('returns the display concept', () => {
					const context = { id: 456 };
					const result = subject({ annotations, displayConcept, context });

					expect(result.prefLabel).to.equal('Technology');
				});
			});
		});

		context('and it is not tagged with a brand', () => {
			const annotations = [
				helpers.createAnnotation(123, 'Analysis', 'Genre', 'ClassifiedBy'),
				helpers.createAnnotation(789, 'Chinese Trade', 'Topic', 'About'),
			];

			context('and it has a display concept selected', () => {
				context('and we are not on the display concept stream page', () => {
					it('returns the display concept', () => {
						const result = subject({ annotations, displayConcept });

						expect(result.prefLabel).to.equal('Technology');
					});
				});

				context('and we are on the display concept stream page', () => {
					it('returns nothing', () => {
						const context = { id: 111 };
						const result = subject({ annotations, displayConcept, context });

						expect(result).to.be.undefined;
					});
				});
			});
		});
	});

	context('and it has a display concept selected', () => {
		const annotations = [
			helpers.createAnnotation(123, 'News', 'Genre', 'ClassifiedBy'),
			helpers.createAnnotation(456, 'Telecoms', 'Topic', 'About'),
		];

		context('and we are not on the display concept stream page', () => {
			it('returns the display concept', () => {
				const result = subject({ annotations, displayConcept });

				expect(result.prefLabel).to.equal('Technology');
			});
		});

		context('and we are on the display concept stream page', () => {
			it('returns nothing', () => {
				const context = { id: 111 };
				const result = subject({ annotations, displayConcept, context });

				expect(result).to.be.undefined;
			});
		});
	});
});
