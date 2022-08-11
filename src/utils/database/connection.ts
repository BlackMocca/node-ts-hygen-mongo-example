import mongoose from "mongoose";
import { env } from "../../constants/config";
import { ApdaterConnection } from "./types";

export default class MongoConnection implements ApdaterConnection {
  private uri: string;
  private client: mongoose.Connection;

  public constructor(uri: string) {
    // const mcon = mongoose.createConnection(uri, {
    //   serverSelectionTimeoutMS: 5000,
    //   autoIndex: false,
    //   autoCreate: false,
    // });
    this.uri = uri;
    // this.client = mcon;
  }

  public getClient(): any {
    return this.client;
  }

  public async connect(): Promise<void> {
    let mcon = mongoose.createConnection(this.uri, {
      serverSelectionTimeoutMS: 5000,
      autoIndex: false,
      autoCreate: false,
    });

    return await mcon
      .asPromise()
      .then((data) => {
        console.info("connect with mongodb success");
        this.client = data;
      })
      .catch((err: mongoose.Error) => {
        console.error("fail to connect mongodb: ", err);
        process.exit(1);
      });
  }

  public async close(): Promise<void> {
    return await this.client
      .close()
      .then(() => {
        console.log("close mongodb success");
      })
      .catch((err) => {
        console.log("fail to close connection mongodb", err);
      });
  }
}
