import { Schema, model } from "mongoose";
import { generateFileId, generateFilePath } from "../../services/files/fileManager";
import { FileArgs } from "../../services/files/fileUtils";

export interface IMediaFile {
  name: string;
  id: string;
  hash: string;
  extension: string;
  size: number;
  state: FileState;
  path: string;
  rowCreationDate?: Date;
  uploadDate?: Date;
  deletionDate?: Date;
  lastAccessDate?: Date;
}

export enum FileState {
  PREPARING = "PREPARING",
  CORRUPTED = "CORRUPTED",
  STABLE = "STABLE",
  DELETED = "DELETED",
}

const MediaFileSchema = new Schema({
  name: {
    type: String,
    required: "File name",
  },
  id: {
    type: String,
    required: "File id",
  },
  hash: {
    type: String,
    required: "File hash",
  },
  extension: {
    type: String,
    required: "File extension",
  },
  size: {
    type: Number,
    required: "File size in bytes",
  },
  path: {
    type: String,
    required: "Path file",
  },
  state: {
    type: String,
    required: "Current state of file",
  },
  rowCreationDate: {
    type: Date,
    default: Date.now,
  },
  uploadDate: {
    type: Date,
  },
  deletionDate: {
    type: Date,
    default: null
  },
  lastAccessDate: {
    type: Date,
    default: Date.now,
  },
});

export const buildMediaFile = (fileArgs: FileArgs) : IMediaFile => {
  return {
    name: fileArgs.fileName,
    id: generateFileId(fileArgs),
    hash: fileArgs.fileHash,
    extension: fileArgs.fileExtension,
    size: fileArgs.fileSize,
    state: FileState.PREPARING,
    path: generateFilePath(fileArgs),
  }
}

// Export the model and return an IMediaFile interface
export default model<IMediaFile>("MediaFile", MediaFileSchema);
