const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../../app');

chai.use(chaiHttp);

let token, directorId;

describe('/api/directors tests', () => {
  before('GET token', (done) => {
    chai.request(server)
      .post('/authenticate')
      .send({username: 'deneme', password: 'deneme2'})
      .end((error, resolve) => {
        if(error)
          throw error;

        token = resolve.body.token;
        done();
      });
  });

  describe('/GET directors', () => {
    it('it should GET all the directors', (done) => {
      chai.request(server)
        .get('/api/directors')
        .set('x-access-token', token)
        .end((error, resolve) => {
          if(error)
            throw error;

          resolve.should.have.status(200);
          resolve.should.be.a('object');
          done();
        })
    });
  });

  describe('/POST director', () => {
    it('should POST a director', function postdirector(done) {
      const director = {
        name: 'emine',
        surname: 'atalar',
        bio: 'lorem ispum'
      };
      chai.request(server)
        .post('/api/directors')
        .send(director)
        .set('x-access-token', token)
        .end((error, resolve) => {
          resolve.should.have.status(200);
          resolve.should.be.a('object');
          //resolve.should.have.property('name');
          //resolve.should.have.property('surname');
          //resolve.should.have.property('bio');
          directorId = resolve.body._id;
          done();
        });
    });
  });


});
