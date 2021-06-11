import { Readable } from "stream";
import fs from "fs";
import path from "path";
import { FileArgs } from "./fileUtils";

export const uploadFile = function(readStream: Readable, args: FileArgs) {
    return new Promise(function(resolve,reject){
        const filePath = path.join(__dirname, `../../repository/${args.fileName}`);
        const stream = fs.createWriteStream(filePath);

        stream.on('finish', () => {
            return resolve("done");
        })
        stream.on('error', () => {
            return reject("error");
        })
        stream.on('open', () => readStream.pipe(stream));
    })
};
