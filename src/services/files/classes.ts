import { MediaCloudError } from "../../errors/errors";

export class FileUploadError extends MediaCloudError {
    constructor(message: string){
        super("FS-1000", message);
    }
}

export class GarbageCollectorError extends MediaCloudError {
    constructor(message: string){
        super("GC-1001", message);
    }
}
