exports.db = {
    uri: 'mongodb://localhost:9000/rms',
    options: {
      server: {poolSize: 5},
    }
};

exports.token = {
  secret: 'ssongfam-rms-service'
};