const { expect } = require('chai');
const helpers = require('../helpers');
const Predicates = require('../../lib/constants/predicates');
const Types = require('../../lib/constants/types');
const subject = require('../../').teaser.fallback;

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

describe('Teaser Fallback Label', () => {
	context('with legacy display context waterfall', () => {
		it('picks first type "about" annotation', () => {
			const annotations = fixture;

			expect(subject(annotations).prefLabel).to.equal('UK Trade');
		});

		it('picks second type "isPrimarilyClassifiedBy"', () => {
			const annotations = fixture.filter(({ predicate }) => (
				predicate !== Predicates.About
			));

			expect(subject(annotations).prefLabel).to.equal('Companies');
		});

		it('picks third type "topic"', () => {
			const annotations = fixture.filter(({ predicate }) => (
				predicate !== Predicates.About
				&& predicate !== Predicates.PrimarilyClassifiedBy
			));

			expect(subject(annotations).prefLabel).to.equal('Brexit');
		});

		it('picks fourth type "section"', () => {
			const annotations = fixture.filter(({ directType, predicate }) => (
				predicate !== Predicates.About
				&& predicate !== Predicates.PrimarilyClassifiedBy
				&& directType !== Types.Topic
			));

			expect(subject(annotations).prefLabel).to.equal('UK Politics & Policy');
		});

		it('picks fifth type "brand"', () => {
			const annotations = fixture.filter(({ directType, predicate }) => (
				predicate !== Predicates.About
				&& predicate !== Predicates.PrimarilyClassifiedBy
				&& directType !== Types.Topic
				&& directType !== Types.Section
			));

			expect(subject(annotations).prefLabel).to.equal('The Big Read');
		});

		it('picks sixth type "isClassifiedBy"', () => {
			const annotations = fixture.filter(({ directType, predicate }) => (
				predicate !== Predicates.About
				&& predicate !== Predicates.PrimarilyClassifiedBy
				&& directType !== Types.Topic
				&& directType !== Types.Section
				&& directType !== Types.Brand
			));

			expect(subject(annotations).prefLabel).to.equal('Special Report');
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

			expect(subject(annotations)).to.be.undefined;
		});
	});
});
