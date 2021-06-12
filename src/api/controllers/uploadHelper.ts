import { MediaCloudError } from "../../errors/errors";
import * as DbService from "../../services/db/mongoDbService";
import { doesFileHashMatch } from "../../services/files/fileManager";
import { isFileArgs } from "../../services/files/fileUtils";
import { IMediaFile } from "../models/MediaFile";


export class ValidationError extends MediaCloudError {
    statusCode: number;
    constructor(statusCode: number, message: string, errorCode?: string) {
        super(errorCode? errorCode : "VAL-1000", message, true);
        this.statusCode = statusCode;
    }
}

/**
 * Receives an unknown object to be validated. There are two validations:
 * 1) Match @param args object against @type {FileArgs}
 * 2) Check if @param args matches an existent file
 *
 * Returns a proper response object to be used by the caller
 *
 * @param {unknown} args object to be validated
 * @returns {Promise<ValidationResult>} contain the result of the validation
 */
export const preValidateUpload = async (args: unknown): Promise<void> => {
  // Validation 1) check if it is FileArgs
  if (!isFileArgs(args)) {
    throw new ValidationError(400, "Missing headers", "VAL-1001");
  }

  // Validation 2) Check if file already exists
  if ((await DbService.getMediaFileByHash(args.fileHash)) !== null) {
    throw new ValidationError(400, "File already exists in disk", "VAL-1002");
  }
};

/**
 * Validation to be performed after the file upload
 *
 * @param {IMediaFile} file object to be validated
 * @returns {Promise<ValidationResult>} contain the result of the validation
 */
export const posValidateUpload = async (file: IMediaFile): Promise<boolean> => {
  return doesFileHashMatch(file);
};
