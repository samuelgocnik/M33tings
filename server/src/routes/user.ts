import express from "express";
import extractJWT from "../middleware/extractJWT";
import controller from "./../controllers/user";

const usersRouter = express.Router();

usersRouter.get("/validate", extractJWT, controller.validateToken);
usersRouter.post("/register", controller.register);
usersRouter.post("/login", controller.login);
usersRouter.get("/login", controller.getIdentity);

export = usersRouter;
