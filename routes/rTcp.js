var express = require('express');
var tcpComm = require('../bin/tcpComm');
var fs = require('fs');
var router = express.Router();


router.post('/createTcpServer', (req, res) => {
  var adtInfo = {};
  adtInfo.adtName = req.body.adt;
  adtInfo.adtPort = req.body.port;
  adtInfo.adtIp = req.body.ip;

  tcpComm.createTcpServer(adtInfo, (err,success) => {
    if(err){
      res.status(416).json(err);
    }else{
      res.json(success);
    }
  });
});

router.post('/closeTcpServer', (req, res) => {
  sock.close();
  var filePath = './repository/adapter/'+ req.body.outputADT + '.json';
  fs.stat(filePath, function (err, stats) {
    console.log(stats);//here we got all information of file in stats variable
    if (err) {
        return console.error(err);
    }

    fs.unlink(filePath,function(err){
         if(err) return console.log(err);
         console.log('file deleted successfully');
    });
  });

  res.redirect('/');
});


module.exports = router;
