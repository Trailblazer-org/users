import { NextFunction, Request, Response } from "express";

async function middlewareCheckOrigin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.headers.host === "localhost:8000") {
    next();
  }

  return res.status(403).send("Direct request is forbidden");
}

export default middlewareCheckOrigin;
