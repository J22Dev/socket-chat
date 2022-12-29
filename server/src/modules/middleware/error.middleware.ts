import { ErrorRequestHandler } from "express";

export const errorMiddleware: ErrorRequestHandler = async (
  err,
  req,
  res,
  next
) => {
  console.log(err);
  let message: string = err.hasOwnProperty("message")
      ? err.message
      : "Internal Error",
    statusCode: number = err.hasOwnProperty("statusCode")
      ? err.statusCode
      : 500;
  res.status(statusCode).json({ statusCode, message });
};
