const express = require('express'),
      router  = express.Router(),
      auth    = require('./auth.controller');

router.route('/login')
    .post(auth.login);

module.exports = router;