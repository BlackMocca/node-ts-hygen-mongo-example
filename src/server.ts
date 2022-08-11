import container from "./bootstrap";
import "reflect-metadata";

import express from "express";
import bodyParser from "body-parser";
import { env } from "./constants/config";
import MongoConnection from "./utils/database/connection";
import MongoUserRepository from "./domain/v1/user/repository/mongo_repository";
import { UserRepository, TYPES, UserUsecase } from "./domain/v1/user/types";
import UserLogic from "./domain/v1/user/usecase/user_ucase";
import UserController from "./domain/v1/user/http/user_controller";
import mongoose from "mongoose";
import { ApdaterConnection } from "./utils/database/types";
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
let userController: UserController;
// userUs = container.get("UserUsecase");
// userUs.getById(1);

var serveApp = async (config: ServeAppConfig): Promise<void> => {
  /* enabling router */
  /* inject user Repo */
  // userRepo = <UserRepository>new MongoUserRepository(config.mongoClient);

  /* inject usecase */
  // userUs = <UserUsecase>new UserLogic(userRepo);

  /* enable handler */
  // userController = new UserController(userUs);
  // userRepo = <UserRepository>container.get("UserRepository");
  // userUs = <UserUsecase>container.get("UserUsecase");
  // userController = <UserController>container.get("UserController");

  /* registerUserRoute */
  // registerUserRoute(httpApp, userController);

  httpApp.listen(env.PORT, () => {
    console.log(`server is running on http://127.0.0.1:${env.PORT}`);
  });
};

var bootstrapApp = async () => {
  let mongoAdapter = new MongoConnection(env.MONGODB_URI);
  await mongoAdapter.connect();

  let serveAppConfig = new AppConfig(<ApdaterConnection>mongoAdapter);
  await serveApp(serveAppConfig);
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
