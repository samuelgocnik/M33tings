import { Request, Response, NextFunction } from "express";
import logging from "../config/logging";
import bcryptjs from "bcrypt";
import config from "../config/config";
import pool from "../config/postgresql";
import signJWT from "../functions/signJWT";
import { IUser } from "../interfaces/user";
import { QueryResult } from "pg";

const NAMESPACE = "User";

const validateToken = (req: Request, res: Response) => {
  logging.info(NAMESPACE, "Validate token");
  return res.json({
    message: "Authorized",
  });
};

// Register user. Inser user's name and hashed password to database and handle errors.
const register = (req: Request, res: Response) => {
  logging.info(NAMESPACE, "Register user");

  if (!req.body.name || !req.body.pwd) {
    res.json({ message: "Invalid user's body data" });
    return;
  }

  const { name, pwd } = req.body;

  if (name.length < 4 || name.length > 32 || pwd.length < 6) {
    res.json({ message: "Invalid username or password" });
    return;
  }

  logging.info(NAMESPACE, `kokot ${name} ${pwd}`);

  const saltRounds = Number(config.server.saltRounds);
  bcryptjs.hash(pwd, saltRounds, (hashError, hash) => {
    if (hashError) {
      res.status(500).json({ error: hashError, message: hashError.message });
      return;
    }

    pool.query(
      "INSERT INTO users (name, pwd) " +
        `SELECT $1, $2 ` +
        "FROM users " +
        "WHERE NOT EXISTS( " +
        "SELECT id " +
        "FROM users " +
        `WHERE name = $1 ` +
        ") " +
        "LIMIT 1",
      [name, hash],
      (error: Error, result: QueryResult<any>) => {
        if (error) {
          res.status(500).json({ message: error.message, error });
        } else if (result && result.rowCount == 0) {
          res.json({ message: "User already exists!", result });
        } else {
          res.json(result);
        }
      }
    );
  });
};

// Login user and his sign json web token, which will be returned and stored in local storage.
const login = (req: Request, res: Response) => {
  logging.info(NAMESPACE, "Login user");

  if (!req.body.name || !req.body.pwd) {
    res.status(501).json({ message: "Invalid user's body data" });
    return;
  }

  const { name, pwd } = req.body;

  pool.query(
    `SELECT * FROM users WHERE name = $1`,
    [name],
    (error: Error, result: QueryResult<any>) => {
      if (error) {
        res.status(500).json({ message: error.message, error });
      } else if (result.rowCount > 0) {
        bcryptjs.compare(pwd, result.rows[0].pwd, (err, same) => {
          if (err) {
            res.status(501).json({ message: err.message, error: err });
          } else if (same) {
            const user: IUser = {
              _id: result.rows[0].id,
              name: result.rows[0].name,
              picture: result.rows[0].picture,
              created_at: result.rows[0].created_at,
            };
            // create token
            signJWT(user, (error, token) => {
              if (error) {
                logging.info(NAMESPACE, "unable to sign jwt");

                res.status(401).json({
                  message: "Unable to sign JWT",
                  error,
                });
              } else if (token) {
                res.json({
                  auth: true,
                  token: token,
                  message: "Auth successful",
                  user,
                });
              }
            });
          } else {
            res.json({
              auth: false,
              token: null,
              message: "Password mismatch!",
              user: null,
            });
          }
        });
      } else {
        res.json({ message: "User doesn't exist!" });
      }
    }
  );
};

// Retrieve user's identity according to his id extracted from json web token and stored in locals.
const getIdentity = (req: Request, res: Response) => {
  logging.info(NAMESPACE, "Login user based on token");

  pool.query(
    "SELECT * FROM users WHERE id = $1",
    [res.locals.userId],
    (error: Error, result: QueryResult<any>) => {
      if (error) {
        res.status(500).json({ message: error.message, error });
      } else if (result.rowCount == 0) {
        res.json({ message: "User doesn't exists!", result });
      } else {
        res.json({ user: result.rows[0] });
      }
    }
  );
};

export default { validateToken, register, login, getIdentity };
