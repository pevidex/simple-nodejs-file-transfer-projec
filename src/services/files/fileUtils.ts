import fs from "fs";

export interface FileArgs {
    fileName : string;
    fileHash : string;
    fileSize : number;
    fileExtension: string;
}

export const isFileArgs = (args: unknown) : args is FileArgs => {
    const fileArgs = args as FileArgs;
    return fileArgs.fileName !== undefined && typeof fileArgs.fileName === "string" &&
    fileArgs.fileHash !== undefined && typeof fileArgs.fileHash === "string" && 
    fileArgs.fileSize !== undefined && !isNaN(fileArgs.fileSize) && 
    fileArgs.fileExtension !== undefined && typeof fileArgs.fileExtension === "string";
}

export const deleteFileFromFileSystem = (path: string) => {
    try {
        fs.unlinkSync(path)
      } catch(err) {
        console.error(err)
      }
}
