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

export const getMediaFileById = async (
  fileId: string
): Promise<IMediaFile | null> => {
  return MediaFile.findOne({ id: fileId }).exec();
};

export const createFile = async (file: IMediaFile): Promise<IMediaFile> => {
  return MediaFile.create(file);
};

export const completeUpload = async (id: string) => {
  return MediaFile.updateOne(
    { id: id },
    { $set: { state: FileState.STABLE, uploadDate: new Date() } }
  ).exec();
};

export const markFileToBeDeleted = async (
  id: string,
  force: boolean = false
) => {
  const thirtyDaysInMilliseconds = 1000 * 3600 * 24 * 30;
  return MediaFile.updateOne(
    { id: id },
    {
      $set: {
        deletionDate: new Date(
          Date.now() + (force ? 0 : thirtyDaysInMilliseconds)
        ),
      },
    }
  ).exec();
};

export const getPossibleBrokenFiles = async () : Promise<IMediaFile[]> => {
  /**
   * Todo in the future:
   * Other files can be broken. This query should return other files to 
   * get their health checked
   */
  return MediaFile.find({$or: [{ state: FileState.CORRUPTED }]}).exec();
};

