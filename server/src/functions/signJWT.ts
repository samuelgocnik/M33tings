import { IUser } from "../interfaces/user";
import logging from "../config/logging";
import jwt from "jsonwebtoken";
import config from "../config/config";

const NAMESPACE = "Auth";

const signJWT = (
  user: IUser,
  callback: (error: Error | null, token: string | null) => void
): void => {
  logging.info(NAMESPACE, `Attempting to sign jwt for ${user.name}`);

  try {
    jwt.sign(
      { user: user.name, id: user._id },
      config.server.token.secret,
      {
        issuer: config.server.token.issuer,
        expiresIn: config.server.token.expireTime,
        algorithm: "HS256",
      },
      (error, token) => {
        if (error) {
          callback(error, null);
        } else if (token) {
          callback(null, token);
        }
      }
    );
  } catch (error) {
    callback(error, null);
  }
};

export default signJWT;
