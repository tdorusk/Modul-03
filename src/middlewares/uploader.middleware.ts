import { NextFunction, Request, Response } from "express";
import core, { fromBuffer } from "file-type/core";
import multer from "multer";
import { ApiError } from "../utils/api-error";

export class UploadMiddleware {
    upload = () => {
        const storage = multer.memoryStorage();

        const limits = { fileSize: 2 * 1024 * 1024 }; // 2mb

        return multer ({ storage, limits });
    };

    fileFilter = (allowTypes: core.MimeType[]) => {
        return async (req: Request, res: Response, next: NextFunction) => {
        const files = req.files as { [fieldname: string]: Express.Multer.File[] };

        if(!files || Object.values(files).length === 0) {
            return next();
        }

        for (const fieldname in files) {
            const fileArray = files[fieldname];
            for (const file of fileArray) {
                const type = await fromBuffer(file.buffer);
    
                if (!type || !allowTypes.includes(type.mime)) {
                    throw new ApiError("Invalid file type", 400);
                }
            }
        }


        next();
    };
    };
}