import { IUser } from "../interfaces/user";
import logging from "../config/logging";
import jwt from "jsonwebtoken";
import config from "../config/config";
import pool from "../config/postgresql";
import { QueryResult } from "pg";

const NAMESPACE = "Auth";

// verify if is user allowed to edit event -> user has to be creator of event

const verifyEventCreator = (event_id: string, user_id: number): boolean => {
  logging.info(NAMESPACE, `Attempting to verify use for event editing`);

  pool.query(
    "SELECT creator_id FROM event WHERE id = $1",
    [event_id],
    (error: Error, result: QueryResult<any>) => {
      if (error) {
        return false;
      } else if (result && result.rowCount == 0) {
        return false;
      } else {
        return result.rows[0].creator_id == user_id;
      }
    }
  );
  return false;
};

export default verifyEventCreator;
