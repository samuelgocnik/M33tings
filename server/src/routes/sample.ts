import express from "express";
import controller from "./../controllers/sample";

const sampleRouter = express.Router();

sampleRouter.get("/ping", controller.sampleHealthCheck);

export = sampleRouter;
