import { Request, Response } from "express";
import { uploadFile } from "../../files/fileManagement";
import { isFileArgs } from "../../files/fileUtils";

exports.upload = function(req: Request, res: Response) {
    
    console.log("Upload start");
    console.log("Parsing file fields...");

    let args = {
            fileName : req.headers.filename, 
            fileHash : req.headers.filehash, 
            fileSize : req.headers.filesize,
            fileExtension : req.headers.fileextension,
    }

    if (!isFileArgs(args)){
        return res.status(400).send({response: "Missing headers"});
    }

    console.log("Uploading file...");

    uploadFile(req, args)
    .catch(() => res.status(400))
    .then(() => res.status(200))
    .finally(() => res.send());
    
    console.log("Upload end");
};

