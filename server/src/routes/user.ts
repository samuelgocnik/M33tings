import express from "express";
import controller from "./../controllers/user";

const userRouter = express.Router();

userRouter.get("/validate", controller.validateToken);
userRouter.get("/register", controller.register);
userRouter.get("/login", controller.login);

export = userRouter;
