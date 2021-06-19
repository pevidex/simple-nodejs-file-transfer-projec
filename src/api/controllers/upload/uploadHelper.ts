import { MediaCloudError } from "../../../errors/errors";
import { isFileArgs } from "../../../services/files/fileUtils";
import { FileState, IMediaFile } from "../../models/MediaFile";
import * as DbService from "../../../services/db/mongoDbService";

export class ValidationError extends MediaCloudError {
  statusCode: number;
  constructor(statusCode: number, message: string, errorCode?: string) {
    super(errorCode ? errorCode : "VAL-1000", message, true);
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
export const preValidateUpload = async (
  args: unknown
): Promise<ValidationError | boolean> => {
  // Validation 1) check if it is FileArgs
  if (!isFileArgs(args)) {
    return new ValidationError(400, "Missing or invalid headers", "VAL-1001");
  }

  // Validation 2) Check if file already exists
  const dbFile = await DbService.getMediaFileById(args.fileHash);
  if (
    dbFile !== null &&
    (dbFile.state === FileState.STABLE || dbFile.state === FileState.PREPARING)
  ) {
    return new ValidationError(400, "File already exists in disk", "VAL-1002");
  }

  return true;
};

/**
 * Validation to be performed after the file upload
 *
 * @param {IMediaFile} file object to be validated
 * @returns {Promise<ValidationResult>} contain the result of the validation
 */
export const posValidateUpload = async (
  file: IMediaFile,
  fileHash: string
): Promise<boolean | ValidationError> => {
  if (fileHash !== file.hash) {
    console.log(fileHash)
    console.log(file.hash)
    return new ValidationError(
      400,
      "Hash does not correspond to file",
      "VAL-1003"
    );
  }
  return true;
};
