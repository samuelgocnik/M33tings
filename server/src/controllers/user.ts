import { Request, Response, NextFunction } from "express";
import logging from "../config/logging";
import bcrypt from "bcrypt";
import config from "../config/config";

const NAMESPACE = "User";

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, "Validate token");
  return res.json({
    message: "Authorized",
  });
};

const register = (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, "");

  const { username, pwd } = req.body;

  if (username.length < 4 || username.length > 32 || pwd.length < 6) {
    res.json({ message: "Invalid username or password" });
    return;
  }

  const saltRounds = Number(config.server.saltRounds);
  bcrypt.hash(pwd, saltRounds, (hashError, hash) => {
    if (hashError) {
      res.status(500).json(hashError);
      return;
    }

    // db.query(
    //   "INSERT INTO users (name, pwd) " +
    //     "SELECT $1, $2 " +
    //     "FROM users " +
    //     "WHERE NOT EXISTS( " +
    //     "SELECT id " +
    //     "FROM users " +
    //     "WHERE name = $1 " +
    //     ") " +
    //     "LIMIT 1",
    //   [username, hash],
    //   (error, result) => {
    //     if (error) {
    //       res.status(500).json(error);
    //       return;
    //     }
    //     if (result.rowCount == 0) {
    //       res.json({ message: "User already exists!", result: result });
    //     } else {
    //       res.json(result);
    //     }
    //   }
    // );
  });
};

const login = (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, "");
};

const getAllUsers = (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, "");
};

export default { validateToken, register, login, getAllUsers };
