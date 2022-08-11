import "reflect-metadata";
import container from "./bootstrap";

import express from "express";
import bodyParser from "body-parser";
import { env } from "./constants/config";
import MongoConnection from "./utils/database/connection";
import MongoUserRepository from "./domain/v1/user/repository/mongo_repository";
import {
  UserRepository,
  TYPES,
  UserUsecase,
  UserHTTPHandler,
} from "./domain/v1/user/types";
import UserLogic from "./domain/v1/user/usecase/user_ucase";
import UserController from "./domain/v1/user/http/user_controller";
import mongoose from "mongoose";
import {
  ApdaterConnection,
  TYPES as ADAPTER_TYPES,
} from "./utils/database/types";
import httpApp, { registerUserRoute } from "./routes/http";

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
let userController: UserHTTPHandler;

var serveApp = async (): Promise<void> => {};

var bootstrapApp = async () => {
  try {
    /* enabling router */
    /* inject user Repo */
    userRepo = await container.getAsync<UserRepository>(TYPES.UserRepository);

    /* inject usecase */
    // userUs = <UserUsecase>new UserLogic(userRepo);
    userUs = container.get<UserUsecase>(TYPES.UserUsecase);

    /* enable handler */
    userController = container.get<UserHTTPHandler>(TYPES.UserHTTPHandler);

    /* registerUserRoute */
    registerUserRoute(httpApp, userController);

    httpApp.listen(env.PORT, () => {
      console.log(`server is running on http://127.0.0.1:${env.PORT}`);
    });

    await serveApp();
  } catch (err) {
    console.log(err);
  }
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
