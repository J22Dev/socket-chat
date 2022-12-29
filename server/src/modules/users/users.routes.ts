import { Router } from "express";
import * as userController from "./users.controller";
import { valMiddleware } from "../middleware/validate.middleware";
import { getUserModel, getUsersModel, updateUserModel } from "./users.models";
export const userRouter = Router();

userRouter.get(
  "/:userId",
  valMiddleware(getUserModel),
  userController.getUserHandler
);
userRouter.get(
  "/",
  valMiddleware(getUsersModel),
  userController.getUsersHandler
);
userRouter.patch(
  "/:userId",
  valMiddleware(updateUserModel),
  userController.updateUserHandler
);
userRouter.get("/:userId/profile", userController.getUserProfile);
userRouter.post("/:userId/profile", userController.createUserProfile);
userRouter.patch("/:userId/profile", userController.updateUserProfile);
userRouter.delete("/:userId", userController.deleteUserHandler);
userRouter.patch("/:userId", userController.updateUserHandler);
