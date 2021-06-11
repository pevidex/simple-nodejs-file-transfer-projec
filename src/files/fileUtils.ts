
export interface FileArgs {
    fileName : string;
    fileHash : string;
    fileSize : number;
    fileExtension: string;
}

export const isFileArgs = (args: any) : args is FileArgs => {
    return (args as FileArgs).fileName !== undefined && 
    (args as FileArgs).fileHash !== undefined && 
    (args as FileArgs).fileSize !== undefined && 
    (args as FileArgs).fileExtension !== undefined
}