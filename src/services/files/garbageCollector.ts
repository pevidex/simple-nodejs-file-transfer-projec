import { IMediaFile } from "../../api/models/MediaFile";
import { GarbageCollectorError } from "./classes";
import { getPossibleBrokenFiles } from "../db/mongoDbService";
import { deleteFileFromFileSystem } from "./fileUtils";

export const collectGarbage = async (file?: IMediaFile) : Promise<undefined | GarbageCollectorError>  => {
    if(file === undefined){
        await performFullClean();
        return;
    }
    deleteFileFromFileSystem(file.path)
    return;
}

const performFullClean = async () : Promise<boolean> => {
     const files = await getPossibleBrokenFiles();
     for (const file of files) {
         try {
            deleteFileFromFileSystem(file.name);
            return true;
         }
         catch (error) {
             console.log("Something went wrong while trying to delete a file");
         }
     }
     return false;
}