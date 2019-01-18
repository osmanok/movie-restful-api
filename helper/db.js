const mongoose = require('mongoose');

module.exports = () => {
  mongoose.connect('mongodb://movie_user:asd123@ds161024.mlab.com:61024/movie-api', {useMongeClient: true});
  mongoose.connection.on('open', () => {
    console.log("MongoDB: conntected");
  });
  mongoose.connection.on('error', (err) => {
    console.log("MongoDB: error", err);
  });

  mongoose.Promise = global.Promise;
};