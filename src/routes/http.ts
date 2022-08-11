import express from "express";
import { UserHTTPHandler } from "../domain/v1/user/types";
import bodyParser from "body-parser";

const httpApp = express();
httpApp.use(bodyParser.urlencoded({ extended: true }));
httpApp.use(bodyParser.json({ limit: "100mb" }));

export const registerUserRoute = (
  app: express.Express,
  handler: UserHTTPHandler
): void => {
  // respond with "hello world" when a GET request is made to the homepage
  app.get("/v1/user", handler.getById);

  // POST method route
  app.post("/v1/user", handler.save);
};

export default httpApp;
