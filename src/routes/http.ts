import express from "express";
import UserController from "../domain/v1/user/http/user_controller";
import bodyParser from "body-parser";

const httpApp = express();
httpApp.use(bodyParser.urlencoded({ extended: true }));
httpApp.use(bodyParser.json({ limit: "100mb" }));

export const registerUserRoute = (
  app: express.Express,
  handler: UserController
): void => {
  // respond with "hello world" when a GET request is made to the homepage
  app.get("/v1/user", handler.getById);

  // POST method route
  app.post("/v1/user", handler.save);
};

export default httpApp;
