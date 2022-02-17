import express from "express";
import extractJWT from "../middleware/extractJWT";
import controller from "../controllers/event";

const eventsRouter = express.Router();

eventsRouter.get("/", controller.getEvents);
eventsRouter.post("/", controller.createEvent);
eventsRouter.post("/address", controller.createEventAddress);
eventsRouter.post("/date", controller.createEventDate);

export = eventsRouter;
