fs.readdir(path, (err, files) => {
  if(err) throw err;
  console.log(files.length);
  if(files.length == 0){
    res.render('index', { title: 'HANs'});
  }

  files.forEach((file) => {
    fs.stat(path+file, (err, stats) => {
      if(err) throw err;

      fs.readFile(path+file, (err, data) => {
        adtInfo.push(JSON.parse(data.toString()));

        res.render('index', { title: 'HANs', adts : adtInfo});
      });
    });
  });
});
