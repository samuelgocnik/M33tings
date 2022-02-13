import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../config/config";
import logging from "../config/logging";

const NAMESPACE = "Auth";

// get the token of request's header and check if it's valid
const extractJWT = (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, "Validating token");

  const token: string | undefined = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "No authentication token was provided!" });
    return;
  }
  jwt.verify(token, config.server.token.secret, (error, decoded) => {
    if (error) {
      res.status(404).json({ message: error.message, error });
      return;
    }
    res.locals.userId = decoded.id;
    next();
  });
};

export default extractJWT;
