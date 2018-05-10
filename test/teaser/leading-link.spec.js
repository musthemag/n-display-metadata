const { expect } = require('chai');
const helpers = require('../helpers');
const subject = require('../../lib/teaser/leading-link');

describe('Teaser Leading Link', () => {
	const containedIn = [
		{
			title: 'Meet the work tribes'
		}
	];

	context('when the content is tagged with the genre "opinion"', () => {
		context('and it is tagged with one author', () => {
			const annotations = [
				helpers.createAnnotation('Opinion', 'Genre', 'ClassifiedBy'),
				helpers.createAnnotation('Authersʼ Note', 'Brand', 'ClassifiedBy'),
				helpers.createAnnotation('John Authers', 'Person', 'Author')
			];

			it('returns the author concept', () => {
				const result = subject({ annotations, containedIn });

				expect(result.prefLabel).to.equal('John Authers');
			});
		});

		context('and it is not tagged with one author', () => {
			const annotations = [
				helpers.createAnnotation('Opinion', 'Genre', 'ClassifiedBy'),
				helpers.createAnnotation('FT View', 'Brand', 'ClassifiedBy')
			];

			it('returns nothing', () => {
				const result = subject({ annotations, containedIn });

				expect(result).to.be.undefined;
			});
		});
	});

	context('when the content is part of a package', () => {
		const annotations = [
			helpers.createAnnotation('Feature', 'Genre', 'ClassifiedBy'),
			helpers.createAnnotation('Work Tribes', 'Brand', 'ClassifiedBy')
		];

		it('returns the package title', () => {
			const result = subject({ annotations, containedIn });

			expect(result.prefLabel).to.equal('Meet the work tribes');
		});
	});

	context('when the genre tag is allowed to be displayed', () => {
		context('and it is tagged with a brand', () => {
			const annotations = [
				helpers.createAnnotation('Analysis', 'Genre', 'ClassifiedBy'),
				helpers.createAnnotation('The Big Read', 'Brand', 'ClassifiedBy'),
				helpers.createAnnotation('Chinese Trade', 'Topic', 'About'),
			];

			it('returns the brand label', () => {
				const result = subject({ annotations });

				expect(result.prefLabel).to.equal('The Big Read');
			});
		});

		context('and it is not tagged with a brand', () => {
			const annotations = [
				helpers.createAnnotation('Analysis', 'Genre', 'ClassifiedBy'),
				helpers.createAnnotation('Chinese Trade', 'Topic', 'About'),
			];

			it('returns nothing', () => {
				const result = subject({ annotations });

				expect(result).to.be.undefined;
			});
		});
	});
});
