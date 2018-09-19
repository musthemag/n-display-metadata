const { expect } = require('chai');
const helpers = require('../helpers');
const subject = require('../../lib/teaser/prefix-link');

describe('Topper Prefix Link', () => {

	context('when the content is tagged with the genre "opinion"', () => {

		context('and it is tagged with a brand', () => {
			const annotations = [
				helpers.createAnnotation('Opinion', 'Genre', 'ClassifiedBy'),
				helpers.createAnnotation('Authersʼ Note', 'Brand', 'ClassifiedBy'),
				helpers.createAnnotation('John Authers', 'Person', 'Author')
			];

			it('returns the opinion genre', () => {
				const result = subject({ annotations });

				expect(result).to.equal('Opinion');
			});
		});

		context('and it is not tagged with a brand', () => {
			const annotations = [
				helpers.createAnnotation('Opinion', 'Genre', 'ClassifiedBy'),
				helpers.createAnnotation('John Authers', 'Person', 'Author')
			];

			it('returns the opinion genre', () => {
				const result = subject({ annotations });

				expect(result).to.equal('Opinion');
			});
		});

		context('and no other tags', () => {
			const annotations = [
				helpers.createAnnotation('Opinion', 'Genre', 'ClassifiedBy')
			];

			it('returns the opinion genre', () => {
				const result = subject({ annotations });

				expect(result).to.equal('Opinion');
			});
		});
	});

	context('when the content is tagged with a brand', () => {

		context('and it is tagged with a genre', () => {
			const annotations = [
				helpers.createAnnotation('Analysis', 'Genre', 'ClassifiedBy'),
				helpers.createAnnotation('fastFT', 'Brand', 'ClassifiedBy'),
				helpers.createAnnotation('John Authers', 'Person', 'Author')
			];

			it('returns the brand', () => {
				const result = subject({ annotations });

				expect(result).to.equal('fastFT');
			});
		});

	});

	context('when the content has no brand and the genre is not "opinion"', () => {

		const annotations = [
			helpers.createAnnotation('Analysis', 'Genre', 'ClassifiedBy'),
			helpers.createAnnotation('Bond markets', 'Topic', 'About'),
			helpers.createAnnotation('John Authers', 'Person', 'Author')
		];

		it('returns undefined', () => {
			const result = subject({ annotations });

			expect(result).to.be.undefined;
		});

	});

	context('when the content has no annotations', () => {

		const annotations = [];

		it('returns undefined', () => {
			const result = subject({ annotations });

			expect(result).to.be.undefined;
		});

	});

});
