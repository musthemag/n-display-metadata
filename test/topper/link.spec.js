const { expect } = require('chai');
const helpers = require('../helpers');
const subject = require('../../lib/teaser/link');

describe('Topper Link', () => {

	context('when content has a display tag', () => {
		const annotations = [
			helpers.createAnnotation('Immirgration', 'Topic', 'About'),
			helpers.createAnnotation('Brexit', 'Topic', 'About'),
			helpers.createAnnotation('Brexit', 'Topic', 'DisplayTag'),
			helpers.createAnnotation('UK Politics', 'Topic', 'About')
		];

		it('returns the display tag', () => {
			const result = subject({ annotations });

			expect(result.prefLabel).to.equal('Brexit');
		});
	});

	context('when content does not have a display tag', () => {
		const annotations = [
			helpers.createAnnotation('Immirgration', 'Topic', 'About'),
			helpers.createAnnotation('Brexit', 'Topic', 'About'),
			helpers.createAnnotation('UK Politics', 'Topic', 'About')
		];

		it('returns the first about tag', () => {
			const result = subject({ annotations });

			expect(result.prefLabel).to.equal('Immirgration');
		});
	});

	context('when content does not have any "about" tags', () => {
		const annotations = [
			helpers.createAnnotation('Immirgration', 'Topic', 'Mentions'),
			helpers.createAnnotation('Brexit', 'Topic', 'Mentions'),
			helpers.createAnnotation('Analysis', 'Genre', 'ClassifiedBy'),
			helpers.createAnnotation('UK Politics', 'Topic', 'Mentions')
		];

		// TODO: mock the legacy function... ensure it returns the result of that

		it('returns the first about tag', () => {
			const result = subject({ annotations });
			// TODO: should return the mock
			expect(result.prefLabel).to.equal('Immirgration');
		});
	});

	context('when content does not have any tags', () => {
		const annotations = [];

		it('returns undefined', () => {
			const result = subject({ annotations });

			expect(result.prefLabel).to.be.undefined;
		});
	});

});
