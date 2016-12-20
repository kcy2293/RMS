global.env = process.env.NODE_ENV || 'production';
/*******************
 * modules
 *******************/
const express = require('express'),
      path    = require('path'),
      logger  = require('morgan'),
      http    = require('http'),
      multer  = require('multer'),
      compression = require('compression'),
      bodyParser  = require('body-parser');

/*******************
 * setup express
 *******************/
const app = express();
const port = '7000';
app.set('port', port);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(logger('dev'));
app.use(compression());
app.use(express.static(path.join(__dirname, 'dist')));

/*******************
 * routing
 *******************/
/*
var userRouter = require('./routes/users/users.router'),
		reservRouter = require('./routes/reservation/reserv.router'),
		accountRouter = require('./routes/account/account.router'),
		settingRouter = require('./routes/setting/setting.router');
*/

app.get(`*`, (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/*
app.use('/api/users', userRouter);
app.use('/api/reservation', reservRouter);
app.use('/api/account', accountRouter);
app.use('/api/setting', settingRouter);
*/

/*******************
 * upload file
 *******************/
/*
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'views/img/decoImages')
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname)
  }
});

var upload = multer({
  storage: storage
}).array('files[]');

app.post('/decoImage', function(req, res) {
  upload(req, res, function(err) {
    if (err) {
      res.json(err);
      return;
    }
    res.json({
			message: "uploaded!"
		});
  })
});
*/

/*******************
 * database
 *******************/
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const config = require('./config');
mongoose.connect(config.db.uri, config.db.options, function(err) {
  if (err) {
    console.log('mongodb err : '+ err);
    throw err;
  }
});

/*******************
 * http server open
 *******************/
const httpServer = http.createServer(app);

httpServer.listen(port, () => {
  console.log(`HTTP Server listening on port ${port}`);
});