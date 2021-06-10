const net = require('net');
const fs = require('fs');
const http = require('http');
const { pipeline } = require('stream');

var options = {
    host: "localhost",
    port: 3000,
    path: '/tasks',
    method: 'GET'
  };
  
  http.request(options, function(res) {
      
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
        const socket = new net.Socket();
        socket.connect(JSON.parse(chunk).port, 'localhost', function() {
            console.log('Connected');
            const fileStream = fs.createReadStream('./samples/didelet.png', { highWaterMark: 16384, end: 2 * 1024 * 1024 * 1024 }); // read 2GB of zeros, replace with real file
            console.log('New file transfer');
    
            pipeline(
                fileStream,
                socket,
                (error) => {
                if (error) { console.error(error) }
                console.log('File transfer done');
                }
            );
        });
    });
  }).end();

  request.post({
    url: 'localhost/tasks',
    formData: {
      file: {
        value: fs.createReadStream('./samples/didelet.png', { highWaterMark: 16384, end: 2 * 1024 * 1024 * 1024 }),
        options: {
          knownLength: req.headers['content-length']
        }
      }
    }
  }, function (err, r, body) {
      console.log("test")
  })