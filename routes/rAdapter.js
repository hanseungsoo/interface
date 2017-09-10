var express = require('express');
var fs = require('fs');
var router = express.Router();


router.get('/', (req, res) => {
  res.render('adapterCreate',{ title: 'HANs'});
});

module.exports = router;
