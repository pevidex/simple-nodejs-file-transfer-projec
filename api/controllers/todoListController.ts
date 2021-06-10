const net = require('net');
const fs = require('fs');
const path = require('path'); 

const uploadPath = path.join(__dirname, 'copy.png');

exports.list_all_tasks = function(req: any, res: any) {

    console.log(`1`);
    req.pipe(req.busboy); // Pipe it trough busboy
    console.log(`2`);
 
    req.busboy.on('file', (fieldname: string, file: any, filename: string) => {
        console.log(`Upload of '${filename}' started`);
 
        // Create a write stream of the new file
        const fstream = fs.createWriteStream(path.join(uploadPath, filename));
        // Pipe it trough
        file.pipe(fstream);
 
        // On finish of the upload
        fstream.on('close', () => {
            console.log(`Upload of '${filename}' finished`);
            res.redirect('back');
        });
    });
};

