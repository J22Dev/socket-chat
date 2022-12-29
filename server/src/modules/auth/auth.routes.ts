import { Router } from "express";
import * as authController from "./auth.controller";
import { valMiddleware } from "../middleware/validate.middleware";
import { userLoginModel, userRegisterModel } from "./auth.models";
export const authRouter = Router();

authRouter.post(
  "/register",
  valMiddleware(userRegisterModel),
  authController.registerHandler
);
authRouter.post(
  "/login",
  valMiddleware(userLoginModel),
  authController.loginHandler
);
authRouter.post("/refresh", authController.refreshHandler);
