var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'express' })
})
router.get('/site', function(req,res,next) {
  res.render('site');
})
router.get('/map', function(req,res,next) {
  res.render('index.html');
})

module.exports = router;
