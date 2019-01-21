const chai = require('chai');
const cahiHttp = require('chai-http');
const should = chai.should();
const server = require('../../app');

chai.use(cahiHttp);

let token, movieId;

describe('/api/movies tests', () => {
  before((done) => {
    chai.request(server)
      .post('/authenticate')
      .send({username: 'deneme', password: 'deneme2' })
      .end((err, res) => {
        token = res.body.token;
        done();
      });
  });

  describe('/GET movies', () => {
    it('it should GET all the movies', (done) => {
      chai.request(server)
        .get('/api/movies')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          done();
        });
    });
  });

  describe('/POST movie', () => {
    it('it should POST a movie', (done) => {
      const movie = {
        title: 'deneme',
        director_id: '5c41e1d2c0ca87384d388cff',
        category: 'comedy',
        country: 'Turkey',
        year: 1945,
        imdb_score: 8
      };
      chai.request(server)
        .post('/api/movies')
        .send(movie)
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.a('object');
          res.body.should.have.property('title');
          res.body.should.have.property('director_id');
          res.body.should.have.property('category');
          res.body.should.have.property('country');
          res.body.should.have.property('year');
          res.body.should.have.property('imdb_score');
          movieId = res.body._id;
          done();
        });
    });
  });

  describe('/GET/:movie_id movie', () => {
    it('it should GET a movie by yhe given id', (done) => {
      chai.request(server)
        .get('/api/movies/'+ movieId)
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.have.be.a('object');
          res.body.should.have.property('title');
          res.body.should.have.property('director_id');
          res.body.should.have.property('category');
          res.body.should.have.property('country');
          res.body.should.have.property('year');
          res.body.should.have.property('imdb_score');
          res.body.should.have.property('_id').eql(movieId);
          done();
        });
    });
  });

  describe('/PUT/:movie_id movie', () => {
    it('it should UPDATE a movie given by id', (done) => {
      const movie = {
        title: 'deneme222323',
        director_id: '5c41e1d2c0ca87384d388cff',
        category: 'action',
        country: 'france',
        year: 2020,
        imdb_score: 1
      };
      chai.request(server)
        .put('/api/movies/'+ movieId)
        .send(movie)
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.a('object');
          res.body.should.have.property('title').eql(movie.title);
          res.body.should.have.property('director_id').eql(movie.director_id);
          res.body.should.have.property('category').eql(movie.category);
          res.body.should.have.property('country').eql(movie.country);
          res.body.should.have.property('year').eql(movie.year);
          res.body.should.have.property('imdb_score').eql(movie.imdb_score);
          done();
        });
    });
  });

  describe('/DELETE/:movie_id movie', () => {
    it('it should DELETE a movie given by id', (done) => {
      chai.request(server)
        .delete('/api/movies/'+ movieId)
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.a('object');
          res.body.should.have.property('status').eql(1);
          done();
        });
    });
  });

});