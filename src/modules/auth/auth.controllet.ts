import { Request, Response } from "express";
import { AuthService } from "./auth.service";

export class AuthController {
  private authService: AuthService

  constructor() {
    this.authService = new AuthService()
  }

  forgotPassword = async (req: Request, res: Response) => {
    const result = await this.authService.forgotPassword(req.body);
    res.status(200).send(result);
  };

  resetPassword = async (req: Request, res: Response) => {
    const authUserId = res.locals.user.id;
    const result = await this.authService.resetPassword(req.body, authUserId);
    res.status(200).send(result);
  };
}
