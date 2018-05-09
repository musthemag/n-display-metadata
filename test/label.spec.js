const { expect } = require('chai');
const helpers = require('./helpers');
const { label: subject } = require('../');

describe('Label', () => {
	const containedIn = [
		{
			title: 'Meet the work tribes'
		}
	];

	context('when the content is tagged with the genre "opinion"', () => {
		context('and it is tagged with one author', () => {
			const annotations = [
				helpers.createAnnotation(123, 'Opinion', 'Genre', 'ClassifiedBy'),
				helpers.createAnnotation(456, 'Authersʼ Note', 'Brand', 'ClassifiedBy'),
				helpers.createAnnotation(789, 'John Authers', 'Person', 'Author')
			];

			it('returns the author concept', () => {
				const result = subject({ annotations, containedIn });

				expect(result.prefLabel).to.equal('John Authers');
			});
		});

		context('and it is not tagged with one author', () => {
			const annotations = [
				helpers.createAnnotation(123, 'Opinion', 'Genre', 'ClassifiedBy'),
				helpers.createAnnotation(456, 'FT View', 'Brand', 'ClassifiedBy')
			];

			it('returns the display concept', () => {
				const result = subject({ annotations, containedIn });

				expect(result.prefLabel).to.equal('Fallback');
			});
		});
	});

	context('when the content is part of a package', () => {
		const annotations = [
			helpers.createAnnotation(123, 'Feature', 'Genre', 'ClassifiedBy'),
			helpers.createAnnotation(456, 'Work Tribes', 'Brand', 'ClassifiedBy')
		];

		it('returns the package title', () => {
			const result = subject({ annotations, containedIn });

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

			it('returns the brand label', () => {
				const result = subject({ annotations });

				expect(result.prefLabel).to.equal('The Big Read');
			});
		});

		context('and it is not tagged with a brand', () => {
			const annotations = [
				helpers.createAnnotation(123, 'Analysis', 'Genre', 'ClassifiedBy'),
				helpers.createAnnotation(789, 'Chinese Trade', 'Topic', 'About'),
			];

			it('returns the display concept', () => {
				const result = subject({ annotations });

				expect(result.prefLabel).to.equal('Fallback');
			});
		});
	});

	context('and there is a display concept', () => {
		const annotations = [
			helpers.createAnnotation(123, 'News', 'Genre', 'ClassifiedBy'),
			helpers.createAnnotation(456, 'Telecoms', 'Topic', 'About'),
		];

		it('returns the display concept', () => {
			const result = subject({ annotations });

			expect(result.prefLabel).to.equal('Fallback');
		});
	});
});
