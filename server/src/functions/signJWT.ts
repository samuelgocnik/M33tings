import { IUser } from "../interfaces/user";
import logging from "../config/logging";
import jwt from "jsonwebtoken";
import config from "../config/config";

const NAMESPACE = "Auth";

const signJWT = (
  user: IUser,
  callback: (error: Error | null, token: string | null) => void
): void => {
  const timeSinceEpoch = new Date().getTime();
  const expirationTime =
    timeSinceEpoch + Number(config.server.token.expireTime) * 1000;
  const expirationTimeInSeconds = Math.floor(expirationTime / 1000);

  logging.info(NAMESPACE, `Attempting to sign jwt for ${user.username}`);

  try {
    jwt.sign(
      { user: user.username },
      config.server.token.secret,
      {
        issuer: config.server.token.issuer,
        expiresIn: expirationTimeInSeconds,
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
    logging.info(NAMESPACE, error.message, error);
    callback(error, null);
  }
};

export default signJWT;
