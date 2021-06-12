import { Request, Response } from "express";
import * as DbService from "../../services/db/mongoDbService";
import { uploadFile } from "../../services/files/fileManager";
import { FileArgs } from "../../services/files/fileUtils";
import { buildMediaFile, IMediaFile } from "../models/MediaFile";
import {
    posValidateUpload,
    preValidateUpload,
    ValidationError
} from "./uploadHelper";

exports.upload = async function (req: Request, res: Response) {
  console.log("Upload start");
  console.log("Parsing file fields...");

  // build arguments object
  let args = {
    fileName: req.headers.filename,
    fileHash: req.headers.filehash,
    fileSize: req.headers.filesize,
    fileExtension: req.headers.fileextension,
  };

  console.log("Uploading file...");

  try {
    await preValidateUpload(args);
    const mediaFile: IMediaFile = buildMediaFile(args as any as FileArgs);
    await DbService.createFile(mediaFile);
    await uploadFile(req, mediaFile);
    await posValidateUpload(mediaFile);
    await DbService.completeUpload(mediaFile.id);
    return res.status(200).send();
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(error.statusCode).send({ message: error.message });
    }
    console.error(typeof error === "string" ? error : (error as Error).message);
    return res.status(500).send({ message: "Something went wrong" });
  } finally {
    console.log("Upload end");
  }
};
