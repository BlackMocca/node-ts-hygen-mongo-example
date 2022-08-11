import { injectable, inject } from "inversify";
import "reflect-metadata";
import { UserRepository } from "../types";
import {
  ApdaterConnection,
  TYPES as ADAPTER_TYPES,
} from "../../../../utils/database/types";
import { User, MgoUser } from "../../../../models/user";
import { CollectionUser } from "../../../../constants/collection";
import mongoose, { Connection } from "mongoose";
import mongodb from "mongodb";
import MUUID from "uuid-mongodb";

@injectable()
export default class MongoUserRepository implements UserRepository {
  private client: ApdaterConnection;

  constructor(
    @inject(ADAPTER_TYPES.ApdaterConnection) client: ApdaterConnection
  ) {
    this.client = client;
  }

  public async getById(id: number): Promise<any> {
    let con: mongoose.Connection = this.client.getClient();

    console.log(con.host);

    return await new Promise(() => {
      return con.host;
    });
  }

  public async save(user: User): Promise<Error | undefined> {
    let con: mongoose.Connection = this.client.getClient();
    let col = con.collection(CollectionUser);
    let mgoUser = new MgoUser({
      id: MUUID.from(user.id),
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    });

    let query = {
      id: mgoUser.id,
    };
    return await col
      .updateOne(query, mgoUser, {
        upsert: true,
      })
      .then((result: mongodb.UpdateResult) => {
        if (result.upsertedCount > 0) {
          return undefined;
        }
      });
  }
}
