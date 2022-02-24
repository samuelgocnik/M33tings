import express from "express";
import extractJWT from "../middleware/extractJWT";
import controller from "./../controllers/participant";

const participantRouter = express.Router();

participantRouter.post("/", extractJWT, controller.createParticipant);
participantRouter.put("/", extractJWT, controller.updateParticipant);
participantRouter.delete("/", extractJWT, controller.deleteParticipant);

export = participantRouter;
