const chai = require('chai');
const cahiHttp = require('chai-http');
const should = chai.should();
const server = require('../../app');

chai.use(cahiHttp);

describe('Node server', () => {
  it('(GET /) returns the home page', (done) => {
    chai.request(server)
      .get('/')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});