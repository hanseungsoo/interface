var express = require('express');
var fs = require('fs');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'HANs'});
});

module.exports = router;
