var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home', welcome: 'Express' });
});
/* GET server error(500 page) page. */
router.get('/generate500', function (req, res, next) {
     var newError = new Error('Internal Server Error');
     newError.status = 500;
     next(newError);
});

/* GET about page. */
router.get('/about', function (req, res, next) {
     res.render('about', { title: 'About', version: '0.9.0' });
});

module.exports = router;
