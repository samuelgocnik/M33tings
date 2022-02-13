import express from "express";
import extractJWT from "../middleware/extractJWT";
import controller from "./../controllers/user";

const userRouter = express.Router();

userRouter.get("/validate", extractJWT, controller.validateToken);
userRouter.post("/register", controller.register);
userRouter.post("/login", controller.login);
userRouter.get("/login", extractJWT, controller.getIdentity);

export = userRouter;
