import "reflect-metadata";
import { container } from "./bootstrap";

import express, { Application } from "express";
import bodyParser from "body-parser";
import { env } from "./constants/config";
import MongoConnection from "./utils/database/connection";
import MongoUserRepository from "./domain/v1/user/repository/mongo_repository";
import { UserRepository, TYPES, UserUsecase } from "./domain/v1/user/types";
import UserLogic from "./domain/v1/user/usecase/user_ucase";
import { UserController } from "./domain/v1/user/http/user_controller";
import mongoose from "mongoose";
import { InversifyExpressServer } from "inversify-express-utils";
import {
  ApdaterConnection,
  TYPES as ADAPTER_TYPES,
} from "./utils/database/types";
import { settingGlobalMiddleware } from "./routes/http";

interface ServeAppConfig {
  mongoClient: ApdaterConnection;
}

class AppConfig implements ServeAppConfig {
  mongoClient: ApdaterConnection;

  public constructor(adapter: ApdaterConnection) {
    this.mongoClient = adapter;
  }
}

let userRepo: UserRepository;
let userUs: UserUsecase;

var bootstrapApp = async () => {
  /* enabling router */
  /* inject user Repo */
  // userRepo = await container.getAsync<UserRepository>(TYPES.UserRepository);

  /* inject usecase */
  // userUs = container.get<UserUsecase>(TYPES.UserUsecase);

  /* enable handler */
  // userController = container.get<UserHTTPHandler>(TYPES.UserHTTPHandler);
  /* registerUserRoute */
  // registerUserRoute(app, userController);

  // let server = httpApp.listen(env.PORT, () => {
  // console.log(`server is running on http://127.0.0.1:${env.PORT}`);
  // });
  // build the server instance

  const server = new InversifyExpressServer(container);
  server.setConfig(async (app: express.Application) => {
    settingGlobalMiddleware(app);
  });

  const instance = server.build();
  console.info(`server is running on http://127.0.0.1:${env.PORT}`);
  instance.listen(env.PORT);
  // log to the console to indicate the server has been started
};

bootstrapApp();

// process.on("SIGINT", async (signal: NodeJS.Signals) => {
//   console.log("sigint");
//   await mongoAdapter.close();
// });
// process.on("SIGTERM", async (signal: NodeJS.Signals) => {
//   console.log("signterm");
//   await mongoAdapter.close();
// });
