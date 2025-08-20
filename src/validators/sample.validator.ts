import { error } from "console";
import { body, validationResult } from "express-validator";
import { ApiError } from "../utils/api-error";
import { Request, Response, NextFunction } from "express";

export const validateCreateSample = [
    body("name").notEmpty().withMessage("Name is Required").isString(),

    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            throw new ApiError(errors.array()[0].msg, 400)
        }
        next()
    }
]

export const validateSendEmail = [
    body("email").notEmpty().withMessage("Email is Required").isEmail(),

    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            throw new ApiError(errors.array()[0].msg, 400)
        }
        next()
    }
]