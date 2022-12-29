import { RequestHandler } from "express";
import * as userService from "./users.service";
import { GetUsersModel, UpdateUserModel } from "./users.models";
export const getUserHandler: RequestHandler = async (req, res, next) => {
  try {
    if (
      !("userId" in req.params) ||
      ("userId" in req.params && !parseInt(req.params.userId))
    )
      return res.status(400).json({ message: "Must provide an id" });
    const userId = parseInt(req.params.userId);
    const foundUser = await userService.getUser(userId);
    res.status(200).json({ user: foundUser });
  } catch (error) {
    next(error);
  }
};

export const getUsersHandler: RequestHandler = async (req, res, next) => {
  try {
    const query = req.query as unknown as GetUsersModel;
    const users = await userService.getUsers(query);
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const updateUserHandler: RequestHandler = async (req, res, next) => {
  try {
    if (
      !("userId" in req.params) ||
      ("userId" in req.params && !parseInt(req.params.userId))
    )
      return res.status(400).json({ message: "Must provide an id" });
    const userId = parseInt(req.params.userId);
    const userData = req.body as UpdateUserModel;
    await userService.updateUser({ ...userData, userId });
    res.status(200).json({ message: "User Updated" });
  } catch (error) {
    next(error);
  }
};

export const deleteUserHandler: RequestHandler = async (req, res, next) => {
  try {
    if (
      !("userId" in req.params) ||
      ("userId" in req.params && !parseInt(req.params.userId))
    )
      return res.status(400).json({ message: "Must provide an id" });
    const userId = parseInt(req.params.userId);
    await userService.deleteUser(userId);
    return res.status(200).json({ message: "User Deleted" });
  } catch (error) {
    next(error);
  }
};

export const createUserProfile: RequestHandler = async (req, res, next) => {
  try {
  } catch (error) {}
};

export const getUserProfile: RequestHandler = async (req, res, next) => {
  try {
  } catch (error) {}
};

export const updateUserProfile: RequestHandler = async (req, res, next) => {
  try {
  } catch (error) {}
};
