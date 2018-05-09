const { expect } = require('chai');
const helpers = require('../helpers');
const subject = require('../../lib/teaser/prefix-text');

describe('Teaser Prefix Text', () => {
	const containedIn = [
		{
			title: 'Meet the work tribes'
		}
	];

	context('when the content is tagged with the genre "opinion"', () => {
		context('and it is tagged with a brand', () => {
			const annotations = [
				helpers.createAnnotation('Opinion', 'Genre', 'ClassifiedBy'),
				helpers.createAnnotation('Authersʼ Note', 'Brand', 'ClassifiedBy'),
				helpers.createAnnotation('John Authers', 'Person', 'Author')
			];

			it('returns the brand label', () => {
				const result = subject({ annotations, containedIn });

				expect(result).to.equal('Authersʼ Note');
			});
		});

		context('and it is not tagged with a brand', () => {
			const annotations = [
				helpers.createAnnotation('Opinion', 'Genre', 'ClassifiedBy'),
				helpers.createAnnotation('John Authers', 'Person', 'Author')
			];

			it('returns nothing', () => {
				const result = subject({ annotations, containedIn });

				expect(result).to.be.undefined;
			});
		});
	});

	context('when the content is part of a package', () => {
		context('and it is tagged with a brand', () => {
			const annotations = [
				helpers.createAnnotation('Feature', 'Genre', 'ClassifiedBy'),
				helpers.createAnnotation('Work Tribes', 'Brand', 'ClassifiedBy')
			];

			it('returns the brand label', () => {
				const result = subject({ annotations, containedIn });

				expect(result).to.equal('Work Tribes');
			});
		});

		context('and it is not tagged with a brand', () => {
			const annotations = [
				helpers.createAnnotation('Wealth Management', 'Topic', 'About')
			];

			it('returns nothing', () => {
				const result = subject({ annotations, containedIn });

				expect(result).to.be.undefined;
			});
		});
	});

	context('when the genre tag is allowed to be displayed', () => {
		const annotations = [
			helpers.createAnnotation('Analysis', 'Genre', 'ClassifiedBy'),
			helpers.createAnnotation('The Big Read', 'Brand', 'ClassifiedBy'),
			helpers.createAnnotation('Chinese Trade', 'Topic', 'About'),
		];

		it('returns the genre label', () => {
			const result = subject({ annotations });

			expect(result).to.equal('Analysis');
		});
	});
});
