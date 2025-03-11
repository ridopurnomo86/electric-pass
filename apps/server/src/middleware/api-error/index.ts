import { NextFunction, Request, Response } from "express";
import createError from "http-errors";

declare type WebError = Error & { status?: number };
export const errorHandler = (err: WebError, req: Request, res: Response): void => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  const errStatus = err.status || 500;
  const errMsg = err.message || "Something went wrong";

  res.status(errStatus).json({
    type: "error",
    status: errStatus,
    message: errMsg,
    stack: process.env.NODE_ENV === "development" ? err.stack : {},
  });
};

export const errorNotFoundHandler = (req: Request, res: Response, next: NextFunction): void => {
  next(createError(404, "Not Found"));
};
