"use strict";
var net = require('net');
var fs = require('fs');
var path = require('path');
var uploadPath = path.join(__dirname, 'copy.png');
exports.list_all_tasks = function (req, res) {
    var filePath = path.join(__dirname, "/image.jpg");
    var stream = fs.createWriteStream(filePath);
    stream.on('open', function () { return req.pipe(stream); });
};
