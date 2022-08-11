import mongoose from "mongoose";
import MongoConnection from "./connection";

export interface ApdaterConnection {
  getClient(): any;
  connect(): Promise<void>;
  close(): Promise<void>;
}

export const TYPES = {
  ApdaterConnection: Symbol.for("MongoConnection"),
};
