import { IMediaFile } from "../../api/models/MediaFile";
import { GarbageCollectorError } from "./classes";

export const collectGarbage = (file?: IMediaFile) : undefined | GarbageCollectorError  => {
    if(!file){
        performFullClean();
    }
    // todo: clean single file
    return;
}

const performFullClean = () => {
    /**
     * todo: check full filesystem and clean non existent files. Requires sync
     * with local db
     */
}