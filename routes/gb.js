var express = require('express');
var router = express.Router();
var giantBombApi = require('../giantBombApi');


router.get('/releases', function (req, res) {
  giantBombApi.getReleases(function (err, releases) {
    if (err) {
        return console.error(err);
    }
    
    res.status(200).json(releases);
  });
});

module.exports = router;