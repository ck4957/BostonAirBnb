var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var AirbnbHome = require('../models/AirbnbHome.js');

/* GET /airbnb homes listing. */
router.get('/', function(req, res, next) {
  AirbnbHome.find(function (err, homes) {
    if (err) return next(err);
    res.json(homes);
  });
});

/* GET /airbnbhomes by /id */
router.get('/:id', function(req, res, next) {
  AirbnbHome.findById(req.params.id, function (err, post) {
    console.log(err)
    if (err) return next(err);
    res.json(post);
  });
});

/* PUT /Update Airbnb Home Records/:id */
router.put('/:id', function(req, res, next) {
  AirbnbHome.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE Entire Airbnb Home /Records/:id */
router.delete('/:id', function(req, res, next) {
  AirbnbHome.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* POST  Create new Airbnb Home Record */
router.post('/', function(req, res, next) {
  AirbnbHome.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
