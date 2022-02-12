import { Request, Response, NextFunction } from "express";
import logging from "../config/logging";

const NAMESPACE = "Sample controller";

const sampleHealthCheck = (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, "Sample health check route called");

  return res.json({
    message: "pong",
  });
};

export default { sampleHealthCheck };
