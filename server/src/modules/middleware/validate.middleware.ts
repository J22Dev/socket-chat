import z from "zod";
import { RequestHandler } from "express";

export const valMiddleware: (schema: z.AnyZodObject) => RequestHandler =
  (schema) => async (req, res, next) => {
    try {
      await schema.parseAsync({
        body: req.body,
        params: req.params,
        query: req.query,
      });
      next();
    } catch (error) {
      next(error);
    }
  };
