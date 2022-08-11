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
import { env } from "./constants/config";

export const container = new Container({
  // autoBindInjectable: true,
  // skipBaseClassChecks: true,
  defaultScope: "Singleton",
});

container
  .bind<ApdaterConnection>(ADAPTER_TYPES.ApdaterConnection)
  .toDynamicValue(async (context): Promise<ApdaterConnection> => {
    let mongoAdapter = new MongoConnection(env.MONGODB_URI);
    await mongoAdapter.connect();
    return Promise.resolve(<ApdaterConnection>mongoAdapter);
  });

container
  .bind<UserRepository>(TYPES.UserRepository)
  .to(MongoUserRepository)
  .inSingletonScope();

container.bind<UserUsecase>(TYPES.UserUsecase).to(UserLogic).inSingletonScope();

container.bind(TYPES.UserHTTPHandler).to(UserController).inSingletonScope();

export default container;
