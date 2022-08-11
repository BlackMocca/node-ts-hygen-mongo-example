import "reflect-metadata";
import { Container } from "inversify";
import MongoUserRepository from "./domain/v1/user/repository/mongo_repository";
import UserLogic from "./domain/v1/user/usecase/user_ucase";
import "./domain/v1/user/http/user_controller";
import { UserRepository, TYPES, UserUsecase } from "./domain/v1/user/types";
import {
  ApdaterConnection,
  TYPES as ADAPTER_TYPES,
} from "./utils/database/types";
import MongoConnection from "./utils/database/connection";
import { env } from "./constants/config";
import { interfaces, TYPE as ExpressTYPE } from "inversify-express-utils";

let container = new Container({
  // autoBindInjectable: true,
  // skipBaseClassChecks: true,
  defaultScope: "Singleton",
});

container
  .bind<ApdaterConnection>(ADAPTER_TYPES.ApdaterConnection)
  // .toConstantValue(new MongoConnection(env.MONGODB_URI));
  .toDynamicValue((context): ApdaterConnection => {
    let mongoAdapter = new MongoConnection(env.MONGODB_URI);
    (async () => {
      await mongoAdapter.connect();
    })();
    return <ApdaterConnection>mongoAdapter;
  });

container
  .bind<UserRepository>(TYPES.UserRepository)
  .to(MongoUserRepository)
  .inSingletonScope();

container.bind<UserUsecase>(TYPES.UserUsecase).to(UserLogic).inSingletonScope();

// container
//   .bind<interfaces.Controller>(ExpressTYPE.Controller)
//   .to(UserController)
//   .whenTargetNamed("UserController");

export { container };
