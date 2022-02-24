import logging from "../config/logging";
import { Request, Response } from "express";
import pool from "../config/postgresql";
import { QueryResult } from "pg";
import {
  IParticipantCreate,
  IParticipantDelete,
  IParticipantUpdate,
} from "../interfaces/participant";

const NAMESPACE = "Participants";

const createParticipant = (req: Request, res: Response) => {
  logging.info(NAMESPACE, "Adding participant to event");

  const data: IParticipantCreate = req.body;
  if (!data.user_id || !data.event_id || data.going === undefined) {
    res.status(400).json({ message: "Invalid participant data" });
    return;
  }

  pool.query(
    "INSERT INTO participant (user_id, event_id, going) VALUES ($1, $2, $3) RETURNING *",
    [data.user_id, data.event_id, data.going],
    (error: Error, result: QueryResult<any>) => {
      if (error) {
        res.status(500).json({ error, message: error.message });
      } else if (result.rowCount == 0) {
        res.status(400).json({ message: "Could not add user to event" });
      } else {
        res.json(result.rows[0]);
      }
    }
  );
};

const updateParticipant = (req: Request, res: Response) => {
  logging.info(NAMESPACE, "Updating participant data");

  const data: IParticipantUpdate = req.body;
  if (!data.id || data.going === undefined) {
    res.status(400).json({ message: "Invalid participant data" });
    return;
  }

  pool.query(
    "UPDATE participant SET going = $2 WHERE id = $1",
    [data.id, data.going],
    (error: Error, result: QueryResult<any>) => {
      if (error) {
        res.status(500).json({ error, message: error.message });
      } else if (result.rowCount == 0) {
        res.status(400).json({ message: "Could not update participant data" });
      } else {
        res.json(result);
      }
    }
  );
};

const deleteParticipant = (req: Request, res: Response) => {
  logging.info(NAMESPACE, "Deleting participant from event");

  const data: IParticipantDelete = req.body;
  if (!data.id) {
    res.status(400).json({ message: "Invalid participant data" });
    return;
  }

  pool.query(
    "DELETE FROM participant WHERE id = $1",
    [data.id],
    (error: Error, result: QueryResult<any>) => {
      if (error) {
        res.status(500).json({ error, message: error.message });
      } else if (result.rowCount == 0) {
        res
          .status(400)
          .json({ message: "Could not delete participant from event" });
      } else {
        res.json(result);
      }
    }
  );
};

export default { createParticipant, updateParticipant, deleteParticipant };
