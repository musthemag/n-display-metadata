const { expect } = require('chai');
const helpers = require('../helpers');
const Types = require('../../lib/constants/types');
const Predicates = require('../../lib/constants/predicates');
const subject = require('../../lib/teaser/alt-link');

describe('Teaser Alternative Link', () => {
	context('with display tag', () => {
		const fixture = [
			helpers.createAnnotation('UK Trade', 'Topic', 'About'),
			helpers.createAnnotation('Brexit', 'Topic', 'MajorMentions'),
			helpers.createAnnotation('Companies', 'Section', 'PrimarilyClassifiedBy'),
			helpers.createAnnotation('The Big Read', 'Brand', 'DisplayTag')
		];

		it('picks the "display tag"', () => {
			const result = subject({ annotations: fixture });
			expect(result.prefLabel).to.equal('The Big Read');
		});
	});

	context('with legacy display context waterfall', () => {
		const fixture = [
			helpers.createAnnotation('Brexit', 'Topic', 'MajorMentions'),
			helpers.createAnnotation('Unilever', 'Organisation', 'MajorMentions'),
			helpers.createAnnotation('HSBC', 'Organisation', 'Mentions'),
			helpers.createAnnotation('Special Report', 'Genre', 'ClassifiedBy'),
			helpers.createAnnotation('Companies', 'Section', 'PrimarilyClassifiedBy'),
			helpers.createAnnotation('UK Politics & Policy', 'Section', 'ClassifiedBy'),
			helpers.createAnnotation('United Kingdom', 'Location', 'Mentions'),
			helpers.createAnnotation('Innovation', 'Topic', 'Mentions'),
			helpers.createAnnotation('The Big Read', 'Brand', 'ClassifiedBy'),
			helpers.createAnnotation('UK Trade', 'Topic', 'About'),
			helpers.createAnnotation('Brian Groom', 'Person', 'Author'),
		];

		it('picks first type "about" annotation', () => {
			const result = subject({ annotations: fixture });
			expect(result.prefLabel).to.equal('UK Trade');
		});

		it('picks second type "isPrimarilyClassifiedBy"', () => {
			const annotations = fixture.filter(({ predicate }) => (
				predicate !== Predicates.About
			));

			const result = subject({ annotations });
			expect(result.prefLabel).to.equal('Companies');
		});

		it('picks third type "topic"', () => {
			const annotations = fixture.filter(({ predicate }) => (
				predicate !== Predicates.About
				&& predicate !== Predicates.PrimarilyClassifiedBy
			));

			const result = subject({ annotations });
			expect(result.prefLabel).to.equal('Brexit');
		});

		it('picks fourth type "section"', () => {
			const annotations = fixture.filter(({ directType, predicate }) => (
				predicate !== Predicates.About
				&& predicate !== Predicates.PrimarilyClassifiedBy
				&& directType !== Types.Topic
			));

			const result = subject({ annotations });
			expect(result.prefLabel).to.equal('UK Politics & Policy');
		});

		it('picks fifth type "brand"', () => {
			const annotations = fixture.filter(({ directType, predicate }) => (
				predicate !== Predicates.About
				&& predicate !== Predicates.PrimarilyClassifiedBy
				&& directType !== Types.Topic
				&& directType !== Types.Section
			));

			const result = subject({ annotations });
			expect(result.prefLabel).to.equal('The Big Read');
		});

		it('picks sixth type "isClassifiedBy"', () => {
			const annotations = fixture.filter(({ directType, predicate }) => (
				predicate !== Predicates.About
				&& predicate !== Predicates.PrimarilyClassifiedBy
				&& directType !== Types.Topic
				&& directType !== Types.Section
				&& directType !== Types.Brand
			));

			const result = subject({ annotations });
			expect(result.prefLabel).to.equal('Special Report');
		});

		it('returns nothing if there is no eligible fallback annotation', () => {
			const annotations = fixture.filter(({ directType, predicate }) => (
				predicate !== Predicates.About
				&& predicate !== Predicates.PrimarilyClassifiedBy
				&& directType !== Types.Topic
				&& directType !== Types.Section
				&& directType !== Types.Brand
				&& predicate !== Predicates.ClassifiedBy
			));

			const result = subject({ annotations });
			expect(result).to.be.undefined;
		});
	});

	context('with a primary link selected', () => {
		const fixture = [
			helpers.createAnnotation('UK Trade', 'Topic', 'About'),
			helpers.createAnnotation('Brexit', 'Topic', 'MajorMentions'),
			helpers.createAnnotation('Companies', 'Section', 'PrimarilyClassifiedBy'),
			helpers.createAnnotation('The Big Read', 'Brand', 'DisplayTag')
		];

		const primaryLink = { prefLabel: 'The Big Read' };

		it('picks the next fallback annotation', () => {
			const result = subject({ annotations: fixture }, primaryLink);
			expect(result.prefLabel).to.equal('UK Trade');
		});
	});
});
