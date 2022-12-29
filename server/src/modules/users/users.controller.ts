import { RequestHandler } from "express";
import * as userService from "./users.service";
export const getUserHandler: RequestHandler = async (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId);
    const foundUser = await userService.getUser(userId);
    res.status(200).json({ user: foundUser });
  } catch (error) {
    next(error);
  }
};

export const getUsersHandler: RequestHandler = async (req, res, next) => {
  try {
    let take = 10,
      index = 0;
    const { term, limit, page } = req.query;
    if (limit) take = parseInt(limit as string);
    if (page) index = (parseInt(page as string) - 1) * take;
    const foundUsers = await userService.getUsers({
      term: (term as string) ?? "",
      take,
      index,
    });
    res.status(200).json(foundUsers);
  } catch (error) {
    next(error);
  }
};

export const updateUserHandler: RequestHandler = async (req, res, next) => {
  try {
  } catch (error) {}
};

export const deleteUserHandler: RequestHandler = async (req, res, next) => {
  try {
  } catch (error) {}
};

export const getUserProfile: RequestHandler = async (req, res, next) => {
  try {
  } catch (error) {}
};

export const createUserProfile: RequestHandler = async (req, res, next) => {
  try {
  } catch (error) {}
};

export const updateUserProfile: RequestHandler = async (req, res, next) => {
  try {
  } catch (error) {}
};
