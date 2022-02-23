import logging from "../config/logging";
import { Request, Response } from "express";
import pool from "../config/postgresql";
import { QueryResult } from "pg";
import { IParticipantCreate } from "../interfaces/participant";

const NAMESPACE = "Participants";

const createParticipant = (req: Request, res: Response) => {
  logging.info(NAMESPACE, "Adding participant to event");

  const data: IParticipantCreate = req.body;
  if (!data.user_id || !data.event_id || !data.going) {
    res.json({ message: "Invalid participant data" });
    return;
  }

  pool.query(
    "INSERT INTO participant ",
    [data.user_id, data.event_id, data.going],
    (error: Error, result: QueryResult<any>) => {
      if (error) {
        res.status(500).json({ error, message: error.message });
      } else if (result.rowCount == 0) {
        res.json({ message: "Nothing changed" });
      } else {
        res.json(result);
      }
    }
  );
};

export default { createParticipant };
