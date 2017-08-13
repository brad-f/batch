import _ from 'lodash';
import chai from 'chai';
import Batch from './Batch';

const redactAlphaLetters = input => input.replace(/[a-z]/gi, '#');
const redactNumbers = input => input.replace(/[0-9]/g, '#');
const redact = _.flow([redactAlphaLetters, redactNumbers]);

describe('Batch', () => {
  it('is started with generated batchId', (done) => {
    const test = (event) => {
      try {
        chai.expect(redact(event.batchId)).to.be.eql('########-####-####-####-############');
        return done();
      } catch(error) {
        return done(error);
      }
    };
    const batch = new Batch();
    batch.on('started', test);
    batch.start();
  });

  it('is started with passed batchId', (done) => {
    const batchId = 'test';
    const test = (event) => {
      try {
        chai.expect(event.batchId).to.be.eql(batchId);
        return done();
      } catch(error) {
        return done(error);
      }
    };
    const batch = new Batch({ batchId });
    batch.on('started', test);
    batch.start();
  });
});
