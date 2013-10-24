var fs = require('fs');
var logfile = 'message.txt';
var path = require("path");

exports.list = function (req, res) {
  path.exists(logfile, function (exists) {
    if (!exists) {
      res.writeHead(404, {"Content-Type": "text/plain"});
      res.write("404 Not Found\n");
      res.end();
      return;
    }

    fs.readFile(logfile, "binary", function (err, file) {
      if (err) {
        res.writeHead(500, {"Content-Type": "text/plain"});
        res.write(err + "\n");
        res.end();
        return;
      }

      res.writeHead(200);
      res.write(file, "binary");
      res.end();
    });
  });
};

exports.add = function (req, res) {
  var myDate = new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
  var str = myDate + ': ' + req.body.message + '\n';
  fs.appendFile(logfile, str, function (err) {
    if (err) {
      res.send('error');
    }
    console.log('The "data to append" was appended to file!');
    console.log(req.body.message)
    res.header('Access-Control-Allow-Origin', "*");
    res.send("respond with a resource");
  });
};

exports.clear = function (req, res) {
  fs.unlink(logfile, function (err) {
    if (err) {
      res.send('error');
    }
    console.log('successfully deleted /tmp/hello');
    res.header('Access-Control-Allow-Origin', "*");
    res.send("respond with a resource");
  });
};