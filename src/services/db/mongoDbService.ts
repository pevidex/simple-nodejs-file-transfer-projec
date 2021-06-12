import mongoose from "mongoose";
import MediaFile, { FileState, IMediaFile } from "../../api/models/MediaFile";

export const initDbService = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/media_cloud_db", {
      useNewUrlParser: true,
    });
  } catch (error) {
    console.error(error);
  }
};

export const getMediaFileByHash = async (
  fileHash: string
): Promise<IMediaFile | null> => {
  return MediaFile.findOne({ hash: fileHash }).exec();
};

export const createFile = async (file: IMediaFile): Promise<IMediaFile> => {
  return MediaFile.create(file);
};

export const completeUpload = async (
  id: string,
): Promise<any> => {
  return MediaFile.updateOne({ id: id }, { $set: { state: FileState.STABLE, uploadDate: new Date() } }).exec();
};
