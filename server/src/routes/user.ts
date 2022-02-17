import express from "express";
import extractJWT from "../middleware/extractJWT";
import controller from "./../controllers/user";

const usersRouter = express.Router();

usersRouter.get("/validate", extractJWT, controller.validateToken);
usersRouter.post("/register", extractJWT, controller.register);
usersRouter.post("/login", extractJWT, controller.login);
usersRouter.get("/login", extractJWT, controller.getIdentity);

export = usersRouter;
