var net = require('net');
var fs = require('fs');
var spawn = require('child_process').spawn;

var sockList = [];
var properties = {};
var adapterPath = 'C:/Users/Han/Desktop/anylink7_admin/repository/adapter/'
exports.createTcpServer = function(adtInfo,callback){
  var filePath = adapterPath+adtInfo.adtName+'.json';
  fs.stat(filePath, function (err, stats) {
    if(err){
      fs.writeFile(filePath, JSON.stringify(adtInfo), 'utf-8', (err) => {
        if(err){
          callback('{"status" : "error", "resMsg" : "회선 파일 생성 실패하였습니다."}', null);
        }else{
          try{
              var child = spawn('node',[__dirname+'/tcpTemplet.js', adtInfo.adtName]);
              child.stdout.on('data', (data) => {
                var jdata = JSON.parse(data);
                if(jdata.status === 'error'){
                  fileRollBack(filePath, () => {
                    callback(jdata, null);
                  })
                }else{
                  callback(null, jdata);
                }
              });
          }catch(err){
              fileRollBack(filePath, () => {
              var jdata = JSON.parse('{"status" : "error", "resMsg" : "회선 시작이 실패하였습니다."}');
              callback(jdata, null);
            })
          }
        }
      });
    }else{
      var jdata = JSON.parse('{"status" : "error", "resMsg" : "같은 이름의 회선이 존재합니다."}');
      callback(jdata, null);
    }
  });
  function fileRollBack(filePath, callback){
    fs.stat(filePath, function (err, stats) {
      if (err) {
          callback();
      }

      fs.unlink(filePath,function(err){
           if(err) callback();
           callback();
      });
    });
  }
}
