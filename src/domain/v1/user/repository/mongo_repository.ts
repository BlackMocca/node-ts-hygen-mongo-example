import { injectable, inject } from "inversify";
import "reflect-metadata";
import { UserRepository } from "../types";
import { ApdaterConnection } from "../../../../utils/database/types";
import { User } from "../../../../models/user";
import { CollectionUser } from "../../../../constants/collection";
import mongoose, { Connection } from "mongoose";
import mongodb from "mongodb";

@injectable()
export default class MongoUserRepository implements UserRepository {
  private client: ApdaterConnection;

  constructor(@inject("ApdaterConnection") client: ApdaterConnection) {
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

    let query = {
      id: user.id,
    };
    return await col
      .updateOne(query, user, {
        upsert: true,
      })
      .then((result: mongodb.UpdateResult) => {
        console.log(result);
        if (result.upsertedCount > 0) {
          return undefined;
        }
      });
  }
}
