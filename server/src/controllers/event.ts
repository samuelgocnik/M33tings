import { Request, Response, NextFunction } from "express";
import { QueryResult } from "pg";
import logging from "../config/logging";
import pool from "../config/postgresql";
import { IEvent } from "../interfaces/event";

const NAMESPACE = "Events";

const getEvents = (_req: Request, res: Response) => {
  logging.info(NAMESPACE, "Getting all events");

  pool.query("", (error: Error, result: QueryResult<any>) => {
    if (error) {
      res.status(500).json({ error, message: error.message });
    } else if (result) {
      res.json({ result: result.rows });
    }
  });
};

const createEvent = (req: Request, res: Response) => {
  logging.info(NAMESPACE, "Creating event");

  const data: IEvent = req.body;
  if (!data || !data.name || !data.note || !data.date) {
    res.json({ message: "Invalid event data" });
    return;
  }

  let query: string = "";
  let params = [res.locals.userId, data.name, data.note, data.date];
  if (data.address) {
    if (
      !data.address.street ||
      !data.address.street_number ||
      !data.address.city ||
      !data.address.country
    ) {
      res.json({ message: "Invalid event address data" });
      return;
    }
    query =
      "WITH insert1 AS ( " +
      "INSERT INTO event (creator_id, name, note) " +
      "VALUES ($1, $2, $3) RETURNING id as created_event_id " +
      "), insert2 AS ( " +
      // use it like INSERT dsfds sdfsd 
      //             SELECT
      "INSERT INTO event_date (event_id, proceedings_time) VALUES (created_event_id, $4) RETURNING id as date_id " +
      ") " +
      "INSERT INTO event_address (event_id, street, street_number, city, country) " +
      "SELECT (created_event_id, $5, $6, $7, $8) FROM insert1";

    params.concat(
      data.address.street,
      data.address.street_number,
      data.address.city,
      data.address.country
    );
  } else {
    query =
      "WITH insert1 AS ( " +
      "INSERT INTO event (creator_id, name, note) " +
      "VALUES ($1, $2, $3) RETURNING id as event_id " +
      ") " +
      "INSERT INTO event_date (event_id, proceedings_time) " +
      "SELECT (event_id, $4) FROM insert1";
  }

  pool.query(query, params, (error, result) => {
    if (error) {
      res.status(500).json({ error, message: error.message });
    } else if (result && result.rowCount == 0) {
      res.json({ message: "Could not create a new event!" });
    } else {
      res.json(result);
    }
  });
};

export default { getEvents, createEvent };
