var net = require('net');
var fs = require('fs');
var properties = {};
var adapterPath = 'C:/Users/Han/Desktop/anylink7_admin/repository/adapter/'
var server = net.createServer((server) => {
  server.on('end', () => {
    console.log('client disconnected');
  });
  server.on('connect', () => {
    console.log('client connected!!');
  });
  server.on('close', () => {
    console.log('server stopped!!');
  });
  server.on('data', (data) => {
    server.write(data.toString());
  });
});

fs.readFile(adapterPath+process.argv[2]+'.json', (err,data) => {
  if(err){
    process.stdout.write('{"status" : "error", "resMsg" : "회선 파일 생성 실패하였습니다."}');
  }else{
    try{
      var jdata = JSON.parse(data);
      server.listen(jdata.adtPort,() => {
                process.stdout.write('{"status" : "success", "resMsg" : "회선 생성 성공하였습니다."}');
              })
    }catch(err){
      process.stdout.write('{"status" : "error", "resMsg" : "회선 시작을 실패하였습니다."}');
      process.exit(1);
    }
  }
})
process.on('uncaughtException', (err) => {
  process.stdout.write('{"status" : "error", "resMsg" : "회선 정보를 확인하세요."}');
  process.exit(1);
});
