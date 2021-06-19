import { Request, Response } from "express";
import * as DbService from "../../../services/db/mongoDbService";
import {
  abortFileUpload,
  uploadFileToLocalDisk,
} from "../../../services/files/fileManager";
import { FileArgs } from "../../../services/files/fileUtils";
import { buildMediaFile, IMediaFile } from "../../models/MediaFile";
import {
  posValidateUpload,
  preValidateUpload,
  ValidationError,
} from "./uploadHelper";

export const uploadFile = async (
  req: Request,
  res: Response
): Promise<Response> => {
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

  // pre validations
  const preValidationsResult = await preValidateUpload(args);
  if (preValidationsResult instanceof ValidationError) {
    console.log(
      `Failed upload in pre validations\n reason: ${preValidationsResult.message}`
    );
    return res
      .status(preValidationsResult.statusCode)
      .send({ message: preValidationsResult.message });
  }
  const mediaFile: IMediaFile = buildMediaFile(args as any as FileArgs);

  try {
    await DbService.createFile(mediaFile);
    const fileHash = await uploadFileToLocalDisk(req, mediaFile);

    // pos validations
    const posValidationsResult = await posValidateUpload(mediaFile, fileHash);
    if (posValidationsResult instanceof ValidationError) {
      console.log(
        `File hash does not correspond to file. \nrequest hash: ${mediaFile.hash}\ncalculated hash: ${fileHash}`
      );
      abortFileUpload(mediaFile);
      return res
        .status(posValidationsResult.statusCode)
        .send({ message: posValidationsResult.message });
    }

    // set file state as stable
    console.log("Completing upload");
    await DbService.completeUpload(mediaFile.id);
    return res.status(200).send();
  } catch (error) {
    abortFileUpload(mediaFile);
    console.error(typeof error === "string" ? error : error.message);
    return res.status(500).send({ message: "Something went wrong" });
  } finally {
    console.log("Upload end");
  }
};
