import mongoose from "mongoose";
import { env } from "../constants/config";
import { ApdaterConnection } from "./types";

export class MongoConnection implements ApdaterConnection {
  private client: mongoose.Connection;

  public constructor(uri: string) {
    const mcon = mongoose.createConnection(env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      autoIndex: false,
      autoCreate: false,
    });

    this.client = mcon;
  }

  public getClient(): any {
    return this.client;
  }

  public connect(): Promise<void> {
    return this.client
      .asPromise()
      .then((data: mongoose.Connection) => {
        console.info(`connection mongo successful`);
      })
      .catch((err: mongoose.MongooseError) => {
        console.error(err);
        process.exit(1);
      });
  }

  public close(): Promise<void> {
    return this.client.close();
  }
}
