import express, { Application } from "express";
// import { UserHTTPHandler } from "../domain/v1/user/types";
import bodyParser from "body-parser";
import cors from "cors";

export const settingGlobalMiddleware = (app: express.Application) => {
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json({ limit: "100mb" }));
};

// export const registerUserRoute = (
//   app: express.Application,
//   handler: UserHTTPHandler
// ): void => {
// respond with "hello world" when a GET request is made to the homepage
// app.get("/v1/user", handler.getById);
// POST method route
// app.post("/v1/user", handler.save);
// };
