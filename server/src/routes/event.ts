import express from "express";
import extractJWT from "../middleware/extractJWT";
import controller from "../controllers/event";

const eventsRouter = express.Router();

eventsRouter.get("/", extractJWT, controller.getEvents);
eventsRouter.post("/", extractJWT, controller.createEvent);
eventsRouter.post("/address", extractJWT, controller.createEventAddress);
eventsRouter.post("/date", extractJWT, controller.createEventDate);

export = eventsRouter;
