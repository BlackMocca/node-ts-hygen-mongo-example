import "reflect-metadata";
import { Container } from "inversify";
import MongoUserRepository from "./domain/v1/user/repository/mongo_repository";
import UserLogic from "./domain/v1/user/usecase/user_ucase";
import UserController from "./domain/v1/user/http/user_controller";
import { UserRepository, TYPES, UserUsecase } from "./domain/v1/user/types";
import {
  ApdaterConnection,
  TYPES as ADAPTER_TYPES,
} from "./utils/database/types";
import MongoConnection from "./utils/database/connection";

export const container = new Container({
  autoBindInjectable: true,
  skipBaseClassChecks: true,
  defaultScope: "Singleton",
});

container
  .bind<ApdaterConnection>(ADAPTER_TYPES.ApdaterConnection)
  .to(MongoConnection)
  .inSingletonScope();

container
  .bind<UserRepository>(TYPES.UserRepository)
  .to(MongoUserRepository)
  .inSingletonScope();

container.bind<UserUsecase>(TYPES.UserUsecase).to(UserLogic).inSingletonScope();

container.bind(TYPES.UserController).to(UserController).inSingletonScope();

export default container;
