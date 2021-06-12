import fs from "fs";
import path from "path";
import { Readable } from "stream";
import { IMediaFile } from "../../api/models/MediaFile";
import { FileUploadError } from "./classes";
import { FileArgs } from "./fileUtils";

export const uploadFile = function (
  readStream: Readable,
  file: IMediaFile
): Promise<undefined | FileUploadError> {
  return new Promise(function (resolve, reject) {
    if (file.path === undefined) {
      console.error("File path not specified");
      return reject(new FileUploadError("File path not specified"));
    }
    const stream = fs.createWriteStream(file.path);

    stream.on("finish", () => {
      return resolve(undefined);
    });
    stream.on("error", (error) => {
      console.error(
        `Error writing file to filesystem. Error details:\n${error}`
      );
      return reject(new FileUploadError(error.message));
    });
    stream.on("open", () => readStream.pipe(stream));
  });
};

export const doesFileHashMatch = async (file: IMediaFile): Promise<boolean> => {
  // todo
  return true;
};

export const generateFilePath = (fileArgs: FileArgs): string => {
  // todo fix this pathing
  return path.join(
    __dirname,
    `../../../repository/${fileArgs.fileHash}.${fileArgs.fileExtension}`
  );
};

export const generateFileId = (fileArgs: FileArgs): string => {
  return fileArgs.fileHash;
};
