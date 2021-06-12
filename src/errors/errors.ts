export class MediaCloudError extends Error {
    errorCode: string;
    isPublic: boolean;
    constructor(errorCode: string, message: string, isPublic: boolean = false) {
        super();
        this.errorCode = errorCode;
        this.message = message;
        this.isPublic = isPublic;
    }
}
