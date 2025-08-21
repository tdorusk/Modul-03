import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/api-error";
import { verify } from "jsonwebtoken";

export class JwtMiddleware {
  verifyToken = (secretKey: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization?.split(" ")[1];

        if(!token) {
            throw new ApiError("No Token Provided", 400);
        }

        verify(token, secretKey, (err, payload) => {
            if(err) throw new ApiError("Token expired/Invalid Token", 401);
            res.locals.user = payload;
            next();
        });
    };
  };
}