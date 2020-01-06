var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/commodity', function(req, res, next) {
  res.render('commodity');
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.get('/register', function(req, res, next) {
  res.render('register');
});

router.get('/myfavourite', function(req, res, next) {
  res.render('myfavourite');
});

router.get('/myaccount', function(req, res, next) {
  res.render('myaccount');
});

router.get('/orderinformation', function(req, res, next) {
  res.render('orderinformation');
});

router.get('/newitems', function(req, res, next) {
  res.render('newitems');
});

router.get('/managementitems', function(req, res, next) {
  res.render('managementitems');
});

router.get('/wishlist', function(req, res, next) {
  res.render('wishlist');
});

router.get('/newwishlist', function(req, res, next) {
  res.render('newwishlist');
});

router.get('/announcement', function(req, res, next) {
  res.render('announcement');
});

router.get('/guide', function(req, res, next) {
  res.render('guide');
});

router.get('/commonproblem', function(req, res, next) {
  res.render('commonproblem');
});

router.get('/chatroom', function(req, res, next) {
  res.render('chatroom');
});

router.get('/advancedsearch', function(req, res, next) {
  res.render('advancedsearch');
});

router.get('/category', function(req, res, next) {
  res.render('category');
});






module.exports = router;
