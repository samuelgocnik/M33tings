import { Request, Response, NextFunction } from "express";
import { QueryResult } from "pg";
import logging from "../config/logging";
import pool from "../config/postgresql";
import { IEvent } from "../interfaces/event";

const NAMESPACE = "Events";

const getEvents = (_req: Request, res: Response) => {
  logging.info(NAMESPACE, "Getting all events");

  pool.query(
    "SELECT event.id as id, event.name, note, ed.proceedings_time, all_participants, row_to_json(ea) AS address, event.created_at FROM event " +
      // include participants
      "LEFT JOIN ( " +
      "SELECT par.event_id as id, array_agg(json_build_object('name', u.name, 'going' ,par.going)) AS all_participants " +
      "FROM participant par " +
      "JOIN users u ON u.id = par.user_id " +
      "GROUP BY par.event_id " +
      ") u USING (id) " +
      // include date
      "INNER JOIN event_date ed ON ed.event_id = event.id AND ed.id = (SELECT MAX(id) from event_date WHERE event_date.event_id = event.id) " +
      // include address
      "LEFT JOIN event_address ea ON EA.event_id = event.id AND ea.id = (SELECT MAX(id) from event_address WHERE event_address.event_id = event.id) " +
      // order
      "ORDER BY ed.proceedings_time",

    (error: Error, result: QueryResult<any>) => {
      if (error) {
        res.status(500).json({ error, message: error.message });
      } else if (result) {
        res.json({ result: result.rows });
      }
    }
  );
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
      "WITH event_insert AS ( " +
      "INSERT INTO event (creator_id, name, note) " +
      "VALUES ($1, $2, $3) RETURNING * " +
      "), date_insert AS ( " +
      "INSERT INTO event_date (event_id, proceedings_time) " +
      "VALUES ((select event_insert.id from event_insert), $4) " +
      ") " +
      "INSERT INTO event_address (event_id, street, street_number, city, country) " +
      "VALUES ((select event_insert.id from event_insert), $5, $6, $7, $8)";
    params.push(
      data.address.street,
      data.address.street_number,
      data.address.city,
      data.address.country
    );
  } else {
    query =
      "WITH event_insert AS ( " +
      "INSERT INTO event (creator_id, name, note) " +
      "VALUES ($1, $2, $3) RETURNING * " +
      ") " +
      "INSERT INTO event_date (event_id, proceedings_time) " +
      "VALUES ((select event_insert.id from event_insert), $4)";
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