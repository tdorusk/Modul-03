import { Router } from "express";
import { AuthController } from "./auth.controllet";
import { JwtMiddleware } from "../../middlewares/jwt.middleware";

export class AuthRouter {
  private router: Router;
  private authController: AuthController;
  private jwtMiddleware: JwtMiddleware;


  constructor() {
    this.router = Router();
    this.authController = new AuthController();
    this.jwtMiddleware = new JwtMiddleware()
    this.initializedRoutes();
  }

  private initializedRoutes = () => {
    this.router.post("/forgot-password", this.authController.forgotPassword)
    this.router.patch(
      "/reset-password", 
      this.jwtMiddleware.
      verifyToken(process.env.JWT_SECRET!), 
      this.authController.resetPassword)
  };


  getRouter = () => {
    return this.router;
  };
}
