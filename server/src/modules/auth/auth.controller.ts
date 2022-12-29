import { RequestHandler } from "express";
import * as authService from "./auth.service";
import { UserLoginModel, UserRegisterModel } from "./auth.models";
import { NODE_ENV } from "../common/config";
import { HttpError } from "../common/error";

const COOKIE_OPTIONS = {
  secure: NODE_ENV === "production",
  httpOnly: true,
  maxAge: 59 * 60 * 1000, // Expires in 59 minutes
};
export const registerHandler: RequestHandler = async (req, res, next) => {
  try {
    const userData = req.body as UserRegisterModel;
    const { user, tokens } = await authService.registerUser(userData);
    res
      .cookie("authorization", tokens.accessToken, COOKIE_OPTIONS)
      .status(201)
      .json({ user, refreshToken: tokens.refreshToken });
  } catch (error) {
    next(error);
  }
};
export const loginHandler: RequestHandler = async (req, res, next) => {
  try {
    const userData = req.body as UserLoginModel;
    const { user, tokens } = await authService.loginUser(userData);
    res
      .cookie("authorization", tokens.accessToken, COOKIE_OPTIONS)
      .status(200)
      .json({ user, refreshToken: tokens.refreshToken });
  } catch (error) {
    next(error);
  }
};
export const refreshHandler: RequestHandler = async (req, res, next) => {
  try {
    const token = req.body.refreshToken as string | undefined;
    if (!token) throw new HttpError(401, "Not Authorized");
    const newToken = await authService.refreshUser(token);
    res
      .cookie("authorization", newToken, COOKIE_OPTIONS)
      .status(200)
      .json({ message: "Access Refreshed" });
  } catch (error) {
    next(error);
  }
};
