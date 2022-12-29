import { Router } from "express";
import * as userController from "./users.controller";
export const userRouter = Router();

userRouter.get("/:userId", userController.getUserHandler);
userRouter.get("/", userController.getUsersHandler);
userRouter.get("/:userId/profile", userController.getUserProfile);
userRouter.post("/:userId/profile", userController.createUserProfile);
userRouter.patch("/:userId/profile", userController.updateUserProfile);
userRouter.delete("/:userId", userController.deleteUserHandler);
userRouter.patch("/:userId", userController.updateUserHandler);
