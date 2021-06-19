import * as DbService from "../../services/db/mongoDbService";
import { Request, Response } from "express";

export const deleteFile = async (req: Request, res: Response) : Promise<Response> => {
    const fileId = req.params.fileId;
    if(fileId !== undefined) {
        console.log(`Deleting file with id: ${fileId}`);
        const file = await DbService.getMediaFileById(fileId);
        if(!file) {
            console.log(`fileId ${fileId} does not exist`);
            return res.status(400).send({message: "fileId does not exist"});
        }
        if(file.deletionDate) {
            console.log(`fileId ${fileId} was already marked for deletion`);
            return res.status(400).send({message: "File already marked for deletion"});
        }
        try {
            console.log(`Marking file for deletion`);
            await DbService.markFileToBeDeleted(fileId);
            console.log(`File marked for deletion`);
            return res.status(200).send({message: "File marked for deletion"});
        }
        catch(error) {
            console.log(`Some unknown error occurred:\n${error}`);
            return res.status(500).send({message: "Something went wrong"});
        }
    }
    console.log("fileId missing");
    return res.status(400).send({message: "fileId missing"})
}