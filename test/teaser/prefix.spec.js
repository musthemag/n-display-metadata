const { expect } = require('chai');
const helpers = require('../helpers');
const subject = require('../../').teaser.prefix;

describe('Teaser Prefix', () => {
	const containedIn = [
		{
			title: 'Meet the work tribes'
		}
	];

	context('when the content is tagged with the genre "opinion"', () => {
		context('and it is tagged with a brand', () => {
			const annotations = [
				helpers.createAnnotation(123, 'Opinion', 'Genre', 'ClassifiedBy'),
				helpers.createAnnotation(456, 'Authersʼ Note', 'Brand', 'ClassifiedBy'),
				helpers.createAnnotation(789, 'John Authers', 'Person', 'Author')
			];

			it('returns the brand label', () => {
				const result = subject({ annotations, containedIn });

				expect(result).to.equal('Authersʼ Note');
			});
		});

		context('and it is not tagged with a brand', () => {
			const annotations = [
				helpers.createAnnotation(123, 'Opinion', 'Genre', 'ClassifiedBy'),
				helpers.createAnnotation(789, 'John Authers', 'Person', 'Author')
			];

			it('returns nothing', () => {
				const result = subject({ annotations, containedIn });

				expect(result).to.null;
			});
		});
	});

	context('when the content is part of a package', () => {
		context('and it is tagged with a brand', () => {
			const annotations = [
				helpers.createAnnotation(123, 'Feature', 'Genre', 'ClassifiedBy'),
				helpers.createAnnotation(456, 'Work Tribes', 'Brand', 'ClassifiedBy')
			];

			it('returns the brand label', () => {
				const result = subject({ annotations, containedIn });

				expect(result).to.equal('Work Tribes');
			});
		});

		context('and it is not tagged with a brand', () => {
			const annotations = [
				helpers.createAnnotation(456, 'Wealth Management', 'Topic', 'About')
			];

			it('returns nothing', () => {
				const result = subject({ annotations, containedIn });

				expect(result).to.be.null;
			});
		});
	});

	context('when the genre tag is allowed to be displayed', () => {
		const annotations = [
			helpers.createAnnotation(123, 'Analysis', 'Genre', 'ClassifiedBy'),
			helpers.createAnnotation(456, 'The Big Read', 'Brand', 'ClassifiedBy'),
			helpers.createAnnotation(789, 'Chinese Trade', 'Topic', 'About'),
		];

		it('returns the genre label', () => {
			const result = subject({ annotations });

			expect(result).to.equal('Analysis');
		});
	});
});
