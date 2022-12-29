import { RequestHandler } from "express";
import { HttpError } from "../common/error";
import { verifyToken } from "../auth/auth.utils";

export const authMiddleware: RequestHandler = async (req, res, next) => {
  try {
    const accessToken =
      req.cookies["authorization"] || req.headers["authorization"];
    console.log(accessToken);
    if (!accessToken) throw new HttpError(401, "Not Authorized");
    const verifiedToken = await verifyToken({
      token: accessToken,
      type: "ACCESS",
    });
    if (!verifiedToken) throw new HttpError(401, "Not Authorized");
    (req as any).userId = verifiedToken.id;
    next();
  } catch (error) {
    next(error);
  }
};
